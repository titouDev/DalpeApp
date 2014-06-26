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

def serialize(model):
    """Transforms a model into a dictionary which can be dumped to JSON."""
    # first we get the names of all the columns on your model
    columns = [c.key for c in class_mapper(model.__class__).columns]
    # then we return their values in a dict
    return dict((c, getattr(model, c)) for c in columns)

class AddonsBase():
    def toJson(self):
        return serialize(self)

    

class chantiers(Base, AddonsBase):
    __tablename__ = 'chantiers'
    id =                    Column(Integer, primary_key=True)
    name =                  Column(String, nullable=False)
    clientId =              Column(Integer, ForeignKey('clients.id'), nullable=True)
    note =                  Column(String, nullable=True)
    status =                Column(String, nullable=True)
    creationDate =          Column(String, nullable=True)
    startDate =             Column(String, nullable=True)
    endDate =               Column(String, nullable=True)
    lastUpdate =            Column(String, nullable=True)
class Chantiers_link_documents(Base, AddonsBase):   
    __tablename__ = 'chantiers_link_documents'
    chantierId =            Column(Integer, primary_key=True)
    documentId =            Column(Integer, primary_key=True)
class clients(Base, AddonsBase):    
    __tablename__ = 'clients'
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

class document_type(Base, AddonsBase):  
    __tablename__ = 'document_type'
    id =                    Column(Integer, primary_key=True)
    name =                  Column(String, nullable=False)

class documents(Base, AddonsBase):  
    __tablename__ = 'documents'
    id =                    Column(Integer, primary_key=True)
    name =                  Column(String, nullable=False)
    path =                  Column(String, nullable=True)
    type =                  Column(Integer, nullable=True)
    size =                  Column(Integer, nullable=True)
    extension =             Column(String, nullable=True)
    note =                  Column(String, nullable=True)
    creationDate =          Column(String, nullable=True)
    

class employes(Base, AddonsBase):   
    __tablename__ = 'employes'  
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
class employes_hours(Base, AddonsBase): 
    __tablename__ = 'employes_hours'    
    id =                    Column(Integer, primary_key=True)
    employeId =             Column(Integer, nullable=True)
    workDate =              Column(String, nullable=True)
    hours =                 Column(Float(precision=11))
    chantierId =            Column(Integer)
    checked =               Column(Integer, nullable=True)
    coutHoraire =           Column(Integer, nullable=True)
class Mails(Base, AddonsBase):  
    __tablename__ = 'mails'
    id =                    Column(Integer, primary_key=True)
    message =               Column(String, nullable=True)
    creationDate =          Column(String, nullable=True)
    subject =               Column(String, nullable=True)
    employe_id =            Column(Integer)
    chantier_id =           Column(Integer)
    sentDate =              Column(String)
    sent =                  Column(Integer, nullable=True)
class Mails_link_documents(Base, AddonsBase):   
    __tablename__ = 'mails_link_documents'
    mailId =                Column(Integer, primary_key=True)
    documentId =            Column(Integer, primary_key=True)

Soustraitants_link_specialites = Table('soustraitants_link_specialites', Base.metadata,
    Column('soustraitants_id', Integer, ForeignKey('soustraitants.id'), primary_key=True),
    Column('specialites_id', Integer, ForeignKey('specialites.id'), primary_key=True)
)
class sousTraitants(Base, AddonsBase):  
    __tablename__ = 'soustraitants'
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
    specialites = relationship("specialites",
                    secondary=lambda: Soustraitants_link_specialites,
                    backref="sousTraitants"
                    )
    documents = relationship("documents",
                    secondary=lambda: Soustraitants_link_documents,
                    backref="soustraitants")
    def toJson(self):
        
        specialites = [serialize(s) for s in self.specialites]
        dictRecord = serialize(self)
        dictRecord["specialites"] = specialites
        return dictRecord

class Soustraitants_link_mails(Base, AddonsBase):   
    __tablename__ = 'soustraitants_link_mails'  
    soustraitants_id =      Column(Integer, ForeignKey('soustraitants.id'), primary_key=True)
    mails_id =              Column(Integer, ForeignKey('mails.id'), primary_key=True)
    sentDate =              Column(String)
class Soustraitants_notes(Base, AddonsBase):    
    __tablename__ = 'soustraitants_notes'
    id =                    Column(Integer, primary_key=True)
    sousTraitantId =        Column(Integer, nullable=True)
    note =                  Column(String, nullable=True)
    employeId =             Column(Integer)
class specialites(Base, AddonsBase):    
    __tablename__ = 'specialites'
    id =                    Column(Integer, primary_key=True)
    name =                  Column(String, nullable=False, unique=True)
    
    def __repr__(self):
        return "<Specialites(name='%s')>" % (self.name)
Soustraitants_link_documents = Table('soustraitants_link_documents', Base.metadata,   
    Column('id',Integer, primary_key=True),
    Column('sousTraitantId', Integer, ForeignKey('soustraitants.id'), nullable=False),
    Column('documentId', Integer, ForeignKey('documents.id'), nullable=False)
)
