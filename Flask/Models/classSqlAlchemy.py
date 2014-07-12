from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (Table,
                        Column,
                        Integer,
                        String,
                        Float,
                        Boolean,
                        ForeignKey,
                        DateTime)

from sqlalchemy.orm import (relationship,
                            class_mapper)

Base = declarative_base()

get_class = lambda x: globals()[x]


def serialize(model):
    """Transforms a model into a dictionary which can be dumped to JSON."""
    # first we get the names of all the columns on your model
    columns = [c.key for c in class_mapper(model.__class__).columns]
    # then we return their values in a dict
    return dict((c, getattr(model, c)) for c in columns)


def get_column_names(model):
    return [c.name for c in model.__table__.columns]


def analyse_fields(model, fields):
    accepted_fields = dict((k, v) for k, v in fields.items() if hasattr(model, k))
    sub_models_fields = dict((f, accepted_fields.pop(f)) for f in model.subModels if f in accepted_fields)
    return accepted_fields, sub_models_fields


class AddonsBase():
    def __init__(self):
        pass

    subModels = {}
    uniqueKey = None
    onDuplicateUpdate = False
    returnIfExists = False

    def to_dict(self):
        json_record = serialize(self)
        for m in self.subModels:
            records = [serialize(record) for record in getattr(self, m)]
            json_record[m] = records
        return json_record

    def update_record(self, session, **kwargs):
        model = self.__class__
        accepted_fields, sub_models_fields = analyse_fields(model, kwargs)
        query = session.query(model).filter_by(id=accepted_fields["id"])
        record = query.first()
        [setattr(record, k, v) for k, v in accepted_fields.items()]
        for k, v in sub_models_fields.items():
            record.append_sub_models(session, k, self.subModels[k], v)
        return record

    def create_record(self, session, **kwargs):
        model = self.__class__

        accepted_fields, sub_models_fields = analyse_fields(model, kwargs)

        if self.uniqueKey is not None:
            query = session.query(model).filter(
                getattr(model, self.uniqueKey) == accepted_fields[self.uniqueKey])
            record = query.first()
            if not record:
                record = model(**accepted_fields)
                session.add(record)
            elif self.returnIfExists:
                pass
            elif self.onDuplicateUpdate:
                query.update(kwargs)
            else:
                raise ValueError('%s with %s %s already exist' % (
                    model, self.uniqueKey, accepted_fields[self.uniqueKey]))
            for k, v in sub_models_fields.items():
                record.append_sub_models(session, k, self.subModels[k], v)
        else:
            record = model(**accepted_fields)
            session.add(record)

        return record

    def append_sub_models(self, session, field_name, class_name, records):
        model = get_class(class_name)
        setattr(
            self, field_name,
            [model().create_record(session, name=r) for r in records]
        )


class logs(Base):
    __tablename__ = 'logs'

    def __init__(self, context, ref_id, value, operation, date, field=None, previous_value=None, user=None):
        self.user = user
        self.field = field
        self.previous_value = previous_value
        self.date = date
        self.operation = operation
        self.value = value
        self.ref_id = ref_id
        self.context = context

    id = Column(Integer, primary_key=True)
    context = Column(String, nullable=False)
    ref_id = Column(String, nullable=False)
    field = Column(String, nullable=True)
    value = Column(String, nullable=False)
    previous_value = Column(String, nullable=True)
    operation = Column(String, nullable=False)
    date = Column(DateTime, nullable=False)
    user = Column(String, nullable=True)


class Person(Base, AddonsBase):
    __tablename__ = 'Person'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=True)
    lastName = Column(String, nullable=True)
    contactName = Column(String, nullable=True)
    email = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    cell = Column(String, nullable=True)
    fax = Column(String, nullable=True)
    address = Column(String, nullable=True)
    postalCode = Column(String, nullable=True)
    city = Column(String, nullable=True)
    province = Column(String, nullable=True)
    isActive = Column(Boolean, nullable=True)
    note = Column(String, nullable=True)

class Client(Person):
    __tablename__ = 'Client'
    id = Column(Integer, ForeignKey(Person.id), primary_key=True)


class Employe(Person):
    __tablename__ = 'Employe'
    id = Column(Integer, ForeignKey(Person.id), primary_key=True)
    password = Column(String, nullable=True)
    isAdmin = Column(Integer, nullable=True)
    login = Column(String, nullable=True)
    hourRate = Column(Float(precision=2))


class Chantier(Base, AddonsBase):
    __tablename__ = 'Chantier'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    clientId = Column(Integer, ForeignKey(Client.id), nullable=True)
    note = Column(String, nullable=True)
    status = Column(String, nullable=True)
    creationDate = Column(String, nullable=True)
    startDate = Column(String, nullable=True)
    endDate = Column(String, nullable=True)
    lastUpdate = Column(String, nullable=True)


class EmployeHour(Base, AddonsBase):
    __tablename__ = 'EmployeHour'
    id = Column(Integer, primary_key=True)
    employeId = Column(Integer, ForeignKey(Employe.id), nullable=False)
    workDate = Column(String, nullable=True)
    hours = Column(Float(precision=11))
    chantierId = Column(Integer, ForeignKey(Chantier.id))
    checked = Column(Integer, nullable=True)
    hourRate = Column(Float(precision=2))


class Soustraitant(Person):
    __tablename__ = 'Soustraitant'
    id = Column(Integer, ForeignKey(Person.id), primary_key=True)
    name = Column(String, nullable=False, unique=True)
    webSite = Column(String, nullable=True)
    rbqLicense = Column(String, nullable=True)
    tpsNumber = Column(String, nullable=True)
    specialites = relationship("Specialite",
                               secondary=lambda: SoustraitantsLinkSpecialites,
                               backref="soustraitants"
                               )
    subModels = {'specialites': 'Specialite'}
    uniqueKey = 'name'
    onDuplicateUpdate = True


class Specialite(Base, AddonsBase):
    __tablename__ = 'Specialite'
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False, unique=True)

    uniqueKey = 'name'
    returnIfExists = True

    def __repr__(self):
        return "<Specialite(name='%s')>" % (self.name)

SoustraitantsLinkSpecialites = Table('soustraitantsLinkSpecialites', Base.metadata,
                                     Column('Soustraitants_id', Integer, ForeignKey(
                                         Soustraitant.id), primary_key=True),
                                     Column('specialites_id', Integer, ForeignKey(
                                         'Specialite.id'), primary_key=True)
                                     )


