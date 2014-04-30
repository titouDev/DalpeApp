

import sqlalchemy
import sqlsoup
import json
import datetime
import logging

from classSqlAlchemy import *

from sqlalchemy.orm import (sessionmaker,
                            class_mapper,
                            lazyload,
                            joinedload,
                            subqueryload)

get_class = lambda x: globals()[x]


#logging.basicConfig()
#logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

from sqlalchemy import (create_engine,
                        MetaData,
                        Table)
dbSqLite = 'sqlite:///dalpe_construction_v22.db'
engine = create_engine(dbSqLite, echo=True)

Base.metadata.create_all(engine)

db = sqlsoup.SQLSoup(engine)
Session = sessionmaker(bind=engine)
session = Session()


def get(modelName, id=False, **kwargs):
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
        
    return get_default(modelName, id=id)

def get_default(modelName,id=False, join=False, **filters):
    if id:
        filters["id"]=id
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

def serialize(model):
    """Transforms a model into a dictionary which can be dumped to JSON."""
    # first we get the names of all the columns on your model
    columns = [c.key for c in class_mapper(model.__class__).columns]
    # then we return their values in a dict
    return dict((c, getattr(model, c)) for c in columns)

def getModelFields(model):
    fields = [c.key for c in class_mapper(model.__class__).columns]
    return fields

def update(modelName, id, jsonData):
    db = sqlsoup.SQLSoup(engine)
    table = db.entity(modelName)
    model = table.filter_by(id=id).update(jsonData)
    db.commit()

def create_sqlSoup(modelName, jsonData):
    db = sqlsoup.SQLSoup(engine)
    table = db.entity(modelName)
    tableFields = [i for i in table._sa_class_manager]
    newRecord = table.insert(**jsonData)
    db.commit()
    dataObject = dict([(f, str(getattr(newRecord, f))) for f in tableFields])
    return dataObject

def create(modelName, **kwargs):
    model = get_class(modelName)
    newRecord = model(**kwargs)
    session.add(newRecord)
    return newRecord
    
def createSpecialite(**kwargs):
    specialite = create('Specialites', **kwargs)
    try:
        session.commit()
    except:
        #on assume que c'est un duplicate
        session.rollback()
        specialite = session.query(Specialites).filter_by(name=kwargs['name']).first()
    return specialite

def createSousTraitant(**kwargs):
    specialites = kwargs.get('specialites', [])
    specRecords = [createSpecialite(name=s) for s in specialites]
    kwargs["specialites"] = specRecords
    sousTraitant = create('Soustraitants', **kwargs)
    try:
        session.commit()
    except:
        session.rollback()
        sousTraitant = session.query(Soustraitants).filter_by(name=kwargs['name']).first()
    return sousTraitant

def updateSousTraitant():
    pass
        
if __name__ == '__main__':
    print createSousTraitant(**{"name":"Codercre", "specialites":["beton","aluminium"]}).id
    

    # sp = Specialites(name='Beton')
    # session.add(sp)
    # sp = Specialites(name='Beton')
    # session.add(sp)
    # st = Soustraitants(name='Rona', specialites=[sp])
    # session.add(st)
    # stq = session.query(Specialites).all()
    # print stq
