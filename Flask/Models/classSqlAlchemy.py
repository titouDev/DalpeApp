from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (Table,
                        Column,
                        Integer,
                        String,
                        Text,
                        Float,
                        Boolean,
                        ForeignKey,
                        DateTime)

from sqlalchemy.orm import (relationship,
                            joinedload,
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

    def get_records(self, session, **kwargs):
        model = self.__class__
        query = session.query(model)
        for sm in self.subModels.keys():
            query = query.options(joinedload(sm))

        accepted_filters = set(get_column_names(model)) & kwargs.viewkeys()
        if accepted_filters:
            for f in accepted_filters:
                if type(kwargs[f]) is list:
                    query = query.filter(getattr(model, f).in_(kwargs[f]))
                else:
                    query = query.filter(getattr(model, f) == kwargs[f])

        return query.all()

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
        subModel = get_class(class_name)
        setattr(
            self, field_name,
            [subModel().create_record(session, name=r) for r in records]
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
    context = Column(String(50), nullable=False)
    ref_id = Column(String(50), nullable=False)
    field = Column(String(50), nullable=True)
    value = Column(Text, nullable=False)
    previous_value = Column(Text, nullable=True)
    operation = Column(String(20), nullable=False)
    date = Column(DateTime, nullable=False)
    user = Column(String(50), nullable=True)


class Person(Base, AddonsBase):
    __tablename__ = 'Person'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=True)
    lastName = Column(String(255), nullable=True)
    contactName = Column(String(255), nullable=True)
    email = Column(String(255), nullable=True)
    phone = Column(String(255), nullable=True)
    cell = Column(String(255), nullable=True)
    fax = Column(String(255), nullable=True)
    address = Column(String(255), nullable=True)
    postalCode = Column(String(255), nullable=True)
    city = Column(String(255), nullable=True)
    province = Column(String(255), nullable=True)
    isActive = Column(Boolean, nullable=True)
    note = Column(String(255), nullable=True)

class Client(Person):
    __tablename__ = 'Client'
    id = Column(Integer, ForeignKey(Person.id), primary_key=True)


class Employe(Person):
    __tablename__ = 'Employe'
    id = Column(Integer, ForeignKey(Person.id), primary_key=True)
    password = Column(String(255), nullable=True)
    isAdmin = Column(Integer, nullable=True)
    login = Column(String(255), nullable=True, unique=True)
    hourRate = Column(Float(precision=2))


class Chantier(Base, AddonsBase):
    __tablename__ = 'Chantier'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False)
    clientId = Column(Integer, ForeignKey(Client.id), nullable=True)
    note = Column(String(255), nullable=True)
    status = Column(String(255), nullable=True)
    creationDate = Column(String(255), nullable=True)
    startDate = Column(String(255), nullable=True)
    endDate = Column(String(255), nullable=True)
    lastUpdate = Column(String(255), nullable=True)


class EmployeHour(Base, AddonsBase):
    __tablename__ = 'EmployeHour'
    id = Column(Integer, primary_key=True)
    employeId = Column(Integer, ForeignKey(Employe.id), nullable=False)
    workDate = Column(String(255), nullable=False)
    hours = Column(Float(precision=11), nullable=False)
    chantierId = Column(Integer, ForeignKey(Chantier.id), nullable=True)
    checked = Column(Integer, nullable=True)
    hourRate = Column(Float(precision=2))


class Soustraitant(Person):
    __tablename__ = 'Soustraitant'
    id = Column(Integer, ForeignKey(Person.id), primary_key=True)
    name = Column(String(255), nullable=False, unique=True)
    webSite = Column(String(255), nullable=True)
    rbqLicense = Column(String(255), nullable=True)
    tpsNumber = Column(String(255), nullable=True)
    specialites = relationship("Specialite",
                               secondary=lambda: SoustraitantsLinkSpecialites,
                               backref="soustraitants"
                               )
    subModels = {'specialites': 'Specialite'}
    uniqueKey = 'name'
    onDuplicateUpdate = False


class Specialite(Base, AddonsBase):
    __tablename__ = 'Specialite'
    id = Column(Integer, primary_key=True)
    name = Column(String(255), nullable=False, unique=True)

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


