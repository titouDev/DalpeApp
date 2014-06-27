

import sqlalchemy
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
dbSqLite = 'sqlite:///dalpe_construction_v113.db'
engine = create_engine(dbSqLite, echo=False, case_sensitive=False)

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)

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


def get(modelName, **kwargs):
    with session_scope() as session:
        model = get_class(modelName)
        query = session.query(model)
        acceptedFilters = set(getColumns(model)) & kwargs.viewkeys()
        if acceptedFilters:
            query = query.filter_by(**dict((f, kwargs[f]) for f in acceptedFilters))
        records = query.all()
        return [r.toJson() for r in records]

def getColumns(model):
    return [c.name for c in model.__table__.columns]

def create(modelName, **kwargs):
    with session_scope() as session:
        record = createModel(session, modelName, **kwargs)
        session.commit()
        return record.toJson()

def update(modelName, **kwargs):
    with session_scope() as session:
        record = updateModel(session, modelName, **kwargs)
        session.commit()
        return record.toJson()

def createModel(session, modelName, **kwargs):
    model=get_class(modelName)
    return model().createRecord(session, **kwargs)

def updateModel(session, modelName, **kwargs):
    model = get_class(modelName)
    return model().updateRecord(session, **kwargs)

if __name__ == '__main__':
    with session_scope() as session:
        print createModel(session, 'sousTraitants', name="tutu", specialites=["Beton"], documents=["Pdf"]).toJson()
        session.commit()



