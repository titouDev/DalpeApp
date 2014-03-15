

import sqlalchemy
import sqlsoup
import json
import datetime
import logging

from classSqlAlchemy import *

from sqlalchemy.orm import sessionmaker
get_class = lambda x: globals()[x]


logging.basicConfig()
#logging.getLogger('sqlalchemy.engine').setLevel(logging.INFO)

from sqlalchemy import (create_engine,
                        MetaData,
                        Table)
dbSqLite = 'sqlite:///dalpe_construction_v1.db'
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

def update(modelName, id, jsonData):
    db = sqlsoup.SQLSoup(engine)
    table = db.entity(modelName)
    model = table.filter_by(id=id).update(jsonData)
    db.commit()

def create(modelName, jsonData):
    db = sqlsoup.SQLSoup(engine)
    table = db.entity(modelName)
    tableFields = [i for i in table._sa_class_manager]
    newRecord = table.insert(**jsonData)
    db.commit()
    dataObject = dict([(f, str(getattr(newRecord, f))) for f in tableFields])
    print dataObject
    return dataObject

if __name__ == '__main__':
    sp = Specialites(name='Beton')
    session.add(sp)
    st = Soustraitants(name='Rona', specialites=[sp])
    session.add(st)
    print session.query(Soustraitants).all()[0].specialites[0].name
    print session.query(Specialites).all()[0].Soustraitants[0].name