import sqlalchemy
import sqlsoup
import json
from sqlalchemy.orm import scoped_session as ScopedSession
import datetime
import logging

logging.basicConfig()
logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)


from elixir import *

engine = 'sqlite:///dalpe_construction.db'

"""
metadata.bind = 'sqlite:///dalpe_construction.db'
metadata.bind.echo = True

class Soustraitant(Entity):
    using_options(tablename='soustraitants')
    id = Field(Integer, primary_key=True)
    name = Field(Unicode(30))
    contactName = Field(Unicode(30))
    phone = Field(Unicode(30))
    cell = Field(Unicode(30))
    fax = Field(Unicode(30))
    adresse = Field(UnicodeText)
    codePostal = Field(Unicode(30))
    email = Field(Unicode(30))
    siteWeb = Field(Unicode(30))
    licenseRbq = Field(Unicode(30))
    tps = Field(Unicode(30))
    ville = Field(Unicode(30))
    province = Field(Unicode(30))
    actif = Field(Unicode(30))
    note = Field(Unicode(30))
    lastUpdate = Field(Unicode(30))
    specialites = ManyToMany('Specialite', tablename="soustraitants_link_specialites")
    mails = ManyToMany('Mail', tablename="soustraitants_link_mails")
    #description = Field(UnicodeText)

class Specialite(Entity):
    using_options(tablename='specialites')
    id = Field(Integer, primary_key=True)
    name = Field(Unicode(30))
    soustraitants = ManyToMany('Soustraitant', tablename="soustraitants_link_specialites")

class Chantier(Entity):
    using_options(tablename='chantiers')
    id = Field(Integer, primary_key=True)
    name = Field(Unicode(30))
    note = Field(UnicodeText)
    status = Field(Unicode(30))
    creationDate = Field(DateTime)
    startDate = Field(DateTime)
    endDate = Field(DateTime)
     
    client = ManyToOne('Client')

class Employe(Entity):
    using_options(tablename='employes')
    id = Field(Integer, primary_key=True)
    prenom = Field(Unicode(30))
    nom = Field(Unicode(30))
    email = Field(Unicode(30))
    password = Field(Unicode(30))
    phone = Field(Unicode(30))
    cell = Field(Unicode(30))
    adresse = Field(Unicode(30))
    codePostal = Field(Unicode(30))
    ville = Field(Unicode(30))
    province = Field(Unicode(30))
    admin = Field(Integer)
    login = Field(Unicode(30))
    actif = Field(Unicode(30))
    coutHoraire = Field(Unicode(30))
    lastUpdate = Field(Unicode(30))
    photo = Field(Binary, deferred=True)
    
    hours = OneToMany('Employe_Hour')
    mails = OneToMany('Mail')

class Employe_Hour(Entity):
    using_options(tablename='employes_hours')
    id = Field(Integer, primary_key=True)
    workDate = Field(DateTime)
    hours = Field(Unicode(10))
    checked = Field(Integer)
    coutHoraire = Field(Float)
    employe = ManyToOne('Employe')


class Client(Entity):
    using_options(tablename='clients')
    id = Field(Integer, primary_key=True)
    prenom = Field(Unicode(30))
    nom = Field(Unicode(30))
    phone = Field(Unicode(30))
    cell = Field(Unicode(30))
    fax = Field(Unicode(30))
    email = Field(Unicode(30))
    adresse = Field(Unicode(30))
    codePostal = Field(Unicode(30))
    ville = Field(Unicode(30))
    province = Field(Unicode(30))
    actif = Field(Unicode(30))
    lastUpdate = Field(Unicode(30))

class Mail(Entity):
    using_options(tablename='mails')
    id = Field(Integer, primary_key=True)
    message = Field(UnicodeText)
    subject = Field(Unicode(50))
    employe = ManyToOne('Employe')
    chantier = ManyToOne('Chantier')
    sent = Field(Integer)
    creationDate = Field(DateTime, default=datetime.datetime.now)
    soustraitants = ManyToMany('Soustraitant', tablename="soustraitants_link_mails")
    
setup_all()
create_all()
"""

db = sqlsoup.SQLSoup(engine)
db.chantiers.relate('client',db.clients)
join1 = db.join(db.chantiers,db.with_labels(db.clients) )

for i in join1.filter(db.clients.nom=="monsieur frefre").all():
    print 12, i




    

def get(modelName,**kwargs):
    filter = kwargs.get('filter')
    if modelName == "sousTraitants":
        specialiteId = kwargs.get('specialiteId')
        if specialiteId:
            sousTraitantIds = [link['sousTraitantId'] for link in get_default('soustraitants_link_specialites', **{'specialiteId':specialiteId[0]})]
            return get_default(modelName, **{'id':sousTraitantIds})
    if filter is not None:
        if modelName == "mails":
            joinTable = "soustraitants_link_mails"
            dictFilter = dict([('%s_%s' % (joinTable, i['property']), i['value']) for i in json.loads(filter[0])])
            return get_default(modelName,join=joinTable, **dictFilter)
        
    return get_default(modelName)

def get_default(modelName,join=False, **filters):
    db = sqlsoup.SQLSoup(engine)
    table = db.entity(modelName)
    tableFields = [i for i in table._sa_class_manager]
    if join:
        labeled_join = db.with_labels(db.entity(join))
        table = db.join(table, labeled_join)
    data = [] 
    for i in table.filter_by(**filters).all():
        dataObject = dict([(f, str(getattr(i, f))) for f in tableFields])
        data.append(dataObject) 
    return data