from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import (Table,
						Column,
						Integer,
						String,
						Float,
						ForeignKey)

from sqlalchemy.orm import relationship, backref

Base = declarative_base()

class Chantiers(Base):
	__tablename__ = 'chantiers'
	id = 					Column(Integer, primary_key=True)
	name = 					Column(String, nullable=False)
	clientId = 				Column(Integer, ForeignKey('clients.id'), nullable=True)
	note = 					Column(String, nullable=True)
	status = 				Column(String, nullable=True)
	creationDate = 			Column(String, nullable=True)
	startDate = 			Column(String, nullable=True)
	endDate = 				Column(String, nullable=True)
	lastUpdate = 			Column(String, nullable=True)
class Chantiers_link_documents(Base):	
	__tablename__ = 'chantiers_link_documents'
	chantierId = 			Column(Integer, primary_key=True)
	documentId = 			Column(Integer, primary_key=True)
class Clients(Base):	
	__tablename__ = 'clients'
	id = 					Column(Integer, primary_key=True)
	prenom = 				Column(String, nullable=True)
	nom = 					Column(String, nullable=True)
	phone = 				Column(String, nullable=True)
	cell = 					Column(String, nullable=True)
	fax = 					Column(String, nullable=True)
	adresse = 				Column(String, nullable=True)
	codePostal = 			Column(String, nullable=True)
	mail =  				Column(String, nullable=True)
	ville = 				Column(String, nullable=True)
	province = 				Column(String, nullable=True)
	actif = 				Column(Integer, nullable=True)
	note = 					Column(String, nullable=True)
	lastUpdate = 			Column(String, nullable=True)
class Document_type(Base):	
	__tablename__ = 'document_type'
	id = 					Column(Integer, primary_key=True)
	name = 					Column(String, nullable=False)
class Documents(Base):	
	__tablename__ = 'documents'
	id = 					Column(Integer, primary_key=True)
	name = 					Column(String, nullable=False)
	path = 					Column(String, nullable=True)
	type = 					Column(Integer, nullable=True)
	size = 					Column(Integer, nullable=True)
	extension = 			Column(String, nullable=True)
	note = 					Column(String, nullable=True)
	creationDate = 			Column(String, nullable=True)
class Employes(Base):	
	__tablename__ = 'employes'	
	id = 					Column(Integer, primary_key=True)
	prenom = 				Column(String, nullable=True)
	nom = 					Column(String, nullable=True)
	mail = 			    	Column(String, nullable=True)
	password = 				Column(String, nullable=True)
	phone = 				Column(String, nullable=True)
	cell = 					Column(String, nullable=True)
	adresse = 				Column(String, nullable=True)
	codePostal = 			Column(String, nullable=True)
	ville = 				Column(String, nullable=True)
	province = 				Column(String, nullable=True)
	admin = 				Column(Integer, nullable=True)
	login = 				Column(String, nullable=True)
	actif = 				Column(Integer, nullable=True)
	coutHoraire = 			Column(Float(precision=2))
	lastUpdate = 			Column(String, nullable=True)
	photo = 				Column(String)
	photoSize = 			Column(Float())
	photoExtension = 		Column(String)
class Employes_hours(Base):	
	__tablename__ = 'employes_hours'	
	id = 					Column(Integer, primary_key=True)
	employeId = 			Column(Integer, nullable=True)
	workDate = 				Column(String, nullable=True)
	hours = 				Column(Float(precision=11))
	chantierId = 			Column(Integer)
	checked = 				Column(Integer, nullable=True)
	coutHoraire = 			Column(Integer, nullable=True)
class Mails(Base):	
	__tablename__ = 'mails'
	id = 					Column(Integer, primary_key=True)
	message = 				Column(String, nullable=True)
	creationDate = 			Column(String, nullable=True)
	subject = 				Column(String, nullable=True)
	employe_id = 			Column(Integer)
	chantier_id = 			Column(Integer)
	sentDate = 				Column(String)
	sent = 					Column(Integer, nullable=True)
class Mails_link_documents(Base):	
	__tablename__ = 'mails_link_documents'
	mailId = 				Column(Integer, primary_key=True)
	documentId = 			Column(Integer, primary_key=True)

Soustraitants_link_specialites = Table('soustraitants_link_specialites', Base.metadata,
    Column('soustraitants_id', Integer, ForeignKey('soustraitants.id')),
    Column('specialites_id', Integer, ForeignKey('specialites.id'))
)
class Soustraitants(Base):	
	__tablename__ = 'soustraitants'
	id = 					Column(Integer, primary_key=True)
	name = 					Column(String, nullable=False)
	contactName = 			Column(String)
	phone = 				Column(String)
	cell = 					Column(String)
	fax = 					Column(String)
	adresse = 				Column(String)
	codePostal = 			Column(String)
	mail =  				Column(String)
	siteWeb = 				Column(String)
	licenseRbq = 			Column(String)
	tps = 					Column(String)
	ville = 				Column(String)
	province = 				Column(String)
	actif = 				Column(Integer)
	note = 					Column(String)
	lastUpdate = 			Column(String)
	specialites = relationship("Specialites",
                    secondary=Soustraitants_link_specialites,
                    backref="Soustraitants")
class Soustraitants_link_documents(Base):	
	__tablename__ = 'soustraitants_link_documents'
	id = 					Column(Integer, primary_key=True)
	sousTraitantId = 		Column(Integer, nullable=True)
	documentId = 			Column(Integer, nullable=True)
class Soustraitants_link_mails(Base):	
	__tablename__ = 'soustraitants_link_mails'	
	soustraitants_id = 		Column(Integer, ForeignKey('soustraitants.id'), primary_key=True)
	mails_id = 				Column(Integer, ForeignKey('mails.id'), primary_key=True)
	sentDate = 				Column(String)
class Soustraitants_notes(Base):	
	__tablename__ = 'soustraitants_notes'
	id = 					Column(Integer, primary_key=True)
	sousTraitantId = 		Column(Integer, nullable=True)
	note = 					Column(String, nullable=True)
	employeId = 			Column(Integer)
class Specialites(Base):	
	__tablename__ = 'specialites'
	id = 					Column(Integer, primary_key=True)
	name = 					Column(String, nullable=False)
