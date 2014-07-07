from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (Table,
                        Column,
                        Integer,
                        String,
                        Float,
                        ForeignKey)

from sqlalchemy.orm import (relationship,
                            backref,
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


class AddonsBase():
    subModels = {}
    uniqueKey=None
    onDuplicateUpdate=False
    returnIfExists=False
    def toJson(self):
        jsonRecord = serialize(self)
        for m in self.subModels:
            records = [serialize(record) for record in getattr(self, m)]
            jsonRecord[m] = records
        return jsonRecord


    def updateRecord(self, session, **kwargs):
        model = self.__class__
        otherKwargs = kwargs.viewkeys() - set(get_column_names(model))
        rejectedKwargs = dict((k, kwargs.pop(k)) for k in otherKwargs)
        query = session.query(model).filter_by(id=kwargs["id"])
        query.update(kwargs)
        record = query.first()
        for k, v in rejectedKwargs.items():
            record._appendSubModels(session, k, self.subModels[k], v)
        return record

    def createRecord(self, session, **kwargs):
        model=self.__class__

        otherKwargs = kwargs.viewkeys() - set(get_column_names(model))
        rejectedKwargs = dict((k, kwargs.pop(k)) for k in otherKwargs)
        if self.uniqueKey is not None:
            query = session.query(model).filter(getattr(model, self.uniqueKey) == kwargs[self.uniqueKey])
            record = query.first()
            if not record:
                record = model(**kwargs)
                session.add(record)
            elif self.returnIfExists:
                pass
            elif self.onDuplicateUpdate:
                query.update(kwargs)
            else:
                raise ValueError('%s with %s %s already exist' % (modelName, self.uniqueKey, kwargs[self.uniqueKey]))
            for k, v in rejectedKwargs.items():
                record._appendSubModels(session, k, self.subModels[k], v)
            return record
        else:
            record = model(**kwargs)
            session.add(record)
            return record

    def _appendSubModels(self, session, fieldName, className, records):
        model = get_class(className)
        setattr(self, fieldName, [model().createRecord(session, name=r) for r in records])



class Chantiers(Base, AddonsBase):
    __tablename__ = 'Chantiers'
    id =                    Column(Integer, primary_key=True)
    name =                  Column(String, nullable=False)
    clientId =              Column(Integer, ForeignKey('Clients.id'), nullable=True)
    note =                  Column(String, nullable=True)
    status =                Column(String, nullable=True)
    creationDate =          Column(String, nullable=True)
    startDate =             Column(String, nullable=True)
    endDate =               Column(String, nullable=True)
    lastUpdate =            Column(String, nullable=True)
class ChantiersLinkDocuments(Base, AddonsBase):
    __tablename__ = 'ChantiersLinkDocuments'
    chantierId =            Column(Integer, primary_key=True)
    documentId =            Column(Integer, primary_key=True)
class Clients(Base, AddonsBase):
    __tablename__ = 'Clients'
    id =                    Column(Integer, primary_key=True)
    prenom =                Column(String, nullable=True)
    nom =                   Column(String, nullable=True)
    phone =                 Column(String, nullable=True)
    cell =                  Column(String, nullable=True)
    fax =                   Column(String, nullable=True)
    adresse =               Column(String, nullable=True)
    codePostal =            Column(String, nullable=True)
    mail =                  Column(String, nullable=True)
    ville =                 Column(String, nullable=True)
    province =              Column(String, nullable=True)
    actif =                 Column(Integer, nullable=True)
    note =                  Column(String, nullable=True)
    lastUpdate =            Column(String, nullable=True)

class DocumentType(Base, AddonsBase):
    __tablename__ = 'DocumentType'
    id =                    Column(Integer, primary_key=True)
    name =                  Column(String, nullable=False)

class Documents(Base, AddonsBase):
    __tablename__ = 'Documents'
    id =                    Column(Integer, primary_key=True)
    name =                  Column(String, nullable=False)
    path =                  Column(String, nullable=True)
    type =                  Column(Integer, nullable=True)
    size =                  Column(Integer, nullable=True)
    extension =             Column(String, nullable=True)
    note =                  Column(String, nullable=True)
    creationDate =          Column(String, nullable=True)


class Employes(Base, AddonsBase):
    __tablename__ = 'Employes'
    id =                    Column(Integer, primary_key=True)
    prenom =                Column(String, nullable=True)
    nom =                   Column(String, nullable=True)
    mail =                  Column(String, nullable=True)
    password =              Column(String, nullable=True)
    phone =                 Column(String, nullable=True)
    cell =                  Column(String, nullable=True)
    adresse =               Column(String, nullable=True)
    codePostal =            Column(String, nullable=True)
    ville =                 Column(String, nullable=True)
    province =              Column(String, nullable=True)
    admin =                 Column(Integer, nullable=True)
    login =                 Column(String, nullable=True)
    actif =                 Column(Integer, nullable=True)
    coutHoraire =           Column(Float(precision=2))
    lastUpdate =            Column(String, nullable=True)
    photo =                 Column(String)
    photoSize =             Column(Float())
    photoExtension =        Column(String)

class EmployeHours(Base, AddonsBase):
    __tablename__ = 'EmployeHours'
    id =                    Column(Integer, primary_key=True)
    employeId =             Column(Integer, ForeignKey('Employes.id'), nullable=False)

    workDate =              Column(String, nullable=True)
    hours =                 Column(Float(precision=11))
    chantierId =            Column(Integer)
    checked =               Column(Integer, nullable=True)
    coutHoraire =           Column(Integer, nullable=True)
class Mails(Base, AddonsBase):
    __tablename__ = 'Mails'
    id =                    Column(Integer, primary_key=True)
    message =               Column(String, nullable=True)
    creationDate =          Column(String, nullable=True)
    subject =               Column(String, nullable=True)
    employe_id =            Column(Integer)
    chantier_id =           Column(Integer)
    sentDate =              Column(String)
    sent =                  Column(Integer, nullable=True)
class MailsLinkDocuments(Base, AddonsBase):
    __tablename__ = 'mailsLinkDocuments'
    mailId =                Column(Integer, primary_key=True)
    documentId =            Column(Integer, primary_key=True)

SoustraitantsLinkSpecialites = Table('soustraitantsLinkSpecialites', Base.metadata,
    Column('Soustraitants_id', Integer, ForeignKey('Soustraitants.id'), primary_key=True),
    Column('specialites_id', Integer, ForeignKey('Specialites.id'), primary_key=True)
)
class SousTraitants(Base, AddonsBase):
    __tablename__ = 'Soustraitants'
    id =                    Column(Integer, primary_key=True)
    name =                  Column(String, nullable=False, unique=True)
    contactName =           Column(String)
    phone =                 Column(String)
    cell =                  Column(String)
    fax =                   Column(String)
    adresse =               Column(String)
    codePostal =            Column(String)
    mail =                  Column(String)
    siteWeb =               Column(String)
    licenseRbq =            Column(String)
    tps =                   Column(String)
    ville =                 Column(String)
    province =              Column(String)
    actif =                 Column(Integer)
    note =                  Column(String)
    lastUpdate =            Column(String)
    specialites = relationship("Specialites",
                    secondary=lambda: SoustraitantsLinkSpecialites,
                    backref="sousTraitants"
                    )
    documents = relationship("Documents",
                    secondary=lambda: SoustraitantsLinkDocuments,
                    backref="sousTraitants")
    subModels = {'specialites':'Specialites',
                'documents':'Documents'
    }
    uniqueKey='name'
    onDuplicateUpdate=True

class SoustraitantsLinkMails(Base, AddonsBase):
    __tablename__ = 'SoustraitantsLinkMails'
    soustraitants_id =      Column(Integer, ForeignKey('Soustraitants.id'), primary_key=True)
    mails_id =              Column(Integer, ForeignKey('Mails.id'), primary_key=True)
    sentDate =              Column(String)
class SoustraitantsNotes(Base, AddonsBase):
    __tablename__ = 'SoustraitantsNotes'
    id =                    Column(Integer, primary_key=True)
    sousTraitantId =        Column(Integer, nullable=True)
    note =                  Column(String, nullable=True)
    employeId =             Column(Integer)
class Specialites(Base, AddonsBase):
    __tablename__ = 'Specialites'
    id =                    Column(Integer, primary_key=True)
    name =                  Column(String, nullable=False, unique=True)

    uniqueKey='name'
    returnIfExists=True

    def __repr__(self):
        return "<Specialites(name='%s')>" % (self.name)
SoustraitantsLinkDocuments = Table('SoustraitantsLinkDocuments', Base.metadata,
    Column('id',Integer, primary_key=True),
    Column('sousTraitantId', Integer, ForeignKey('Soustraitants.id'), nullable=False),
    Column('documentId', Integer, ForeignKey('Documents.id'), nullable=False)
)
