

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
dbSqLite = 'sqlite:///dalpe_construction_v23.db'
engine = create_engine(dbSqLite, echo=False, case_sensitive=False)

Base.metadata.create_all(engine)

db = sqlsoup.SQLSoup(engine)
Session = sessionmaker(bind=engine)
#session = Session()

from contextlib import contextmanager

@contextmanager
def session_scope():
    """Provide a transactional scope around a series of operations."""
    session = Session()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()


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


def create(modelName, **kwargs):
    with session_scope() as session:
        if modelName == 'sousTraitants':
            record = createSoustraitant(session, **kwargs)
        else:
            record = createModel(session, modelName, **kwargs)
        session.commit()
        return record.toJson()

def createSoustraitant(session, **kwargs):
    specialites = kwargs.pop('specialites', False)
    st = createModel(session, 'sousTraitants', uniqueKey='name', **kwargs)

    if specialites:
        appendSpecialitesToSoustraitants(session, st, specialites)
    return st

def updateSoustraitant(session, **kwargs):
    specialites = kwargs.pop('specialites', False)
    st = updateModel(session, 'sousTraitants', **kwargs)
    if specialites:
        appendSpecialitesToSoustraitants(session, st, specialites)
    return st

def appendSpecialitesToSoustraitants(session, st, specialites):
    st.specialites = [createSpecialite(session, name=s) for s in specialites]

def createSpecialite(session, **kwargs):
    return createModel(session, 'specialites', uniqueKey='name',returnExisting=True, **kwargs)

def update(modelName, **kwargs):
    with session_scope() as session:
        if modelName == 'sousTraitants':
            record = updateSoustraitant(session, **kwargs)
        else:
            record = updateModel(session, modelName, **kwargs)
        session.commit()
        return record.toJson()

def createModel(session, modelName, uniqueKey=None,returnExisting=False, onDuplicateUpdate=False, **kwargs):
    model=get_class(modelName)
    if uniqueKey is not None:
        query = session.query(model).filter(getattr(model, uniqueKey)== kwargs[uniqueKey])
        record = query.first()
        if not record:
            record = model(**kwargs)
            session.add(record)
        elif returnExisting:
            pass
        elif onDuplicateUpdate:
            query.update(kwargs)
        else:
            raise ValueError('%s with %s %s already exist' % (modelName, uniqueKey, kwargs[uniqueKey]))
        return record
    else:
        record = model(**kwargs)
        session.add(record)
        return record


def updateModel(session, modelName, **kwargs):
    model = get_class(modelName)
    query = session.query(model).filter(model.id==kwargs["id"])
    query.update(kwargs)
    return query.first()



if __name__ == '__main__':
    print create('sousTraitants', name='Bonjousr', specialites=['Boudadsfsdadlanger', 'Patissasasdddier'])

