class Chantiers(Base):
	__tablename__ = 'chantiers',
	id = 					Column(Integer, primary_key=True, nullable=False),
	name = 					Column(String, nullable=False),
	clientId = 				Column(Integer, ForeignKey('clients.id'), nullable=False),
	note = 					Column(String, nullable=False),
	status = 				Column(String, nullable=False),
	creationDate = 			Column(String, nullable=False),
	startDate = 			Column(String, nullable=False),
	endDate = 				Column(String, nullable=False),
	lastUpdate = 			Column(String, nullable=False), schema=None)
class Chantiers_link_documents(Base):	
	__tablename__ = 'chantiers_link_documents',	
	chantierId = 			Column(Integer, primary_key=True, nullable=False),
	documentId = 			Column(Integer, primary_key=True, nullable=False), schema=None)
class Clients(Base):	
	__tablename__ = 'clients',	
	id = 					Column(Integer, primary_key=True, nullable=False),
	prenom = 				Column(String, nullable=False),
	nom = 					Column(String, nullable=False),
	phone = 				Column(String, nullable=False),
	cell = 					Column(String, nullable=False),
	fax = 					Column(String, nullable=False),
	adresse = 				Column(String, nullable=False),
	codePostal = 			Column(String, nullable=False),
	email = 				Column(String, nullable=False),
	ville = 				Column(String, nullable=False),
	province = 				Column(String, nullable=False),
	actif = 				Column(Integer, nullable=False),
	note = 					Column(String, nullable=False),
	lastUpdate = 			Column(String, nullable=False), schema=None)
class Document_type(Base):	
	__tablename__ = 'document_type',	
	id = 					Column(Integer, primary_key=True, nullable=False),
	name = 					Column(String, nullable=False), schema=None)
class Documents(Base):	
	__tablename__ = 'documents',	
	id = 					Column(Integer, primary_key=True, nullable=False),
	name = 					Column(String, nullable=False),
	path = 					Column(String, nullable=False),
	type = 					Column(Integer, nullable=False),
	size = 					Column(Integer, nullable=False),
	extension = 			Column(String, nullable=False),
	note = 					Column(String, nullable=False),
	creationDate = 			Column(String, nullable=False), schema=None)
class Employes(Base):	
	__tablename__ = 'employes',	
	id = 					Column(Integer, primary_key=True, nullable=False),
	prenom = 				Column(String, nullable=False),
	nom = 					Column(String, nullable=False),
	email = 				Column(String, nullable=False),
	password = 				Column(String, nullable=False),
	phone = 				Column(String, nullable=False),
	cell = 					Column(String, nullable=False),
	adresse = 				Column(String, nullable=False),
	codePostal = 			Column(String, nullable=False),
	ville = 				Column(String, nullable=False),
	province = 				Column(String, nullable=False),
	admin = 				Column(Integer, nullable=False),
	login = 				Column(String, nullable=False),
	actif = 				Column(Integer, nullable=False),
	coutHoraire = 			Column(Float(), ),
	lastUpdate = 			Column(String, nullable=False),
	photo = 				Column(String, ),
	photoSize = 			Column(Float(), ),
	photoExtension = 		Column(String, ), schema=None)
class Employes_hours(Base):	
	__tablename__ = 'employes_hours',	
	id = 					Column(Integer, primary_key=True, nullable=False),
	employeId = 			Column(Integer, nullable=False),
	workDate = 				Column(String, nullable=False),
	hours = 				Column(Float(precision=11), ),
	chantierId = 			Column(Integer, ),
	checked = 				Column(Integer, nullable=False),
	coutHoraire = 			Column(Integer, nullable=False), schema=None)
class Mails(Base):	
	__tablename__ = 'mails',	
	id = 					Column(Integer, primary_key=True, nullable=False),
	message = 				Column(String, nullable=False),
	creationDate = 			Column(String, nullable=False),
	subject = 				Column(String, nullable=False),
	employe_id = 			Column(Integer, ),
	chantier_id = 			Column(Integer, ),
	sentDate = 				Column(String, ),
	sent = 					Column(Integer, nullable=False), schema=None)
class Mails_link_documents(Base):	
	__tablename__ = 'mails_link_documents',	
	mailId = 				Column(Integer, primary_key=True, nullable=False),
	documentId = 			Column(Integer, primary_key=True, nullable=False), schema=None)
class Soustraitants(Base):	
	__tablename__ = 'soustraitants',	
	id = 					Column(Integer, primary_key=True, nullable=False),
	name = 					Column(String, nullable=False),
	contactName = 			Column(String, ),
	phone = 				Column(String, ),
	cell = 					Column(String, ),
	fax = 					Column(String, ),
	adresse = 				Column(String, ),
	codePostal = 			Column(String, ),
	email = 				Column(String, ),
	siteWeb = 				Column(String, ),
	licenseRbq = 			Column(String, ),
	tps = 					Column(String, ),
	ville = 				Column(String, ),
	province = 				Column(String, ),
	actif = 				Column(Integer, ),
	note = 					Column(String, ),
	lastUpdate = 			Column(String, ), schema=None)
class Soustraitants_link_documents(Base):	
	__tablename__ = 'soustraitants_link_documents',	
	id = 					Column(Integer, primary_key=True, nullable=False),
	sousTraitantId = 		Column(Integer, nullable=False),
	documentId = 			Column(Integer, nullable=False), schema=None)
class Soustraitants_link_mails(Base):	
	__tablename__ = 'soustraitants_link_mails',	
	soustraitants_id = 		Column(Integer, ForeignKey('soustraitants.id'), primary_key=True, nullable=False),
	mails_id = 				Column(Integer, ForeignKey('mails.id'), primary_key=True, nullable=False),
	sentDate = 				Column(String, ), schema=None)
class Soustraitants_link_specialites(Base):	
	__tablename__ = 'soustraitants_link_specialites',	
	soustraitants_id = 		Column(Integer, ForeignKey('soustraitants.id'), primary_key=True, nullable=False),
	specialites_id = 		Column(Integer, ForeignKey('specialites.id'), primary_key=True, nullable=False), schema=None)
class Soustraitants_notes(Base):	
	__tablename__ = 'soustraitants_notes',	
	id = 					Column(Integer, primary_key=True, nullable=False),
	sousTraitantId = 		Column(Integer, nullable=False),
	note = 					Column(String, nullable=False),
	employeId = 			Column(Integer, ), schema=None)
class Specialites(Base):	
	__tablename__ = 'specialites',	
	id = 					Column(Integer, primary_key=True, nullable=False),
	name = 					Column(String, nullable=False), schema=None)
