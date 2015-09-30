import classSqlAlchemy
from sqlalchemy.orm import sessionmaker

get_class = lambda x: getattr(classSqlAlchemy, x)

from sqlalchemy import create_engine
import time
dbSqLite = 'sqlite:///dalpe_construction_v115.db'
engine = create_engine(dbSqLite, echo=True, case_sensitive=False)

#classSqlAlchemy.Base.metadata.drop_all(engine)

classSqlAlchemy.Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
import datetime
import json
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


def get(model_name, **kwargs):
    with session_scope() as session:
        model = get_class(model_name)
        records = [r.to_dict() for r in  model().get_records(session, **kwargs)]
        return records

def delete(model_name, id):
    with session_scope() as session:
        model = get_class(model_name)
        query = session.query(model).filter(id == id)
        record = query.first()
        logCreateOrDeleteOperation(session, record, 'delete')
        query.delete()
        session.commit()

def create(model_name, **kwargs):
    with session_scope() as session:
        record = create_model(session, model_name, **kwargs)
        if record.id:
            previous_record = get(model_name, **kwargs)
            if previous_record:
                logUpdateOperation(session, record, previous_record[0])
            session.commit()
        else:
            session.commit()
            logCreateOrDeleteOperation(session, record, 'create')
        return record.to_dict()


def update(model_name, **kwargs):
    with session_scope() as session:
        record = update_model(session, model_name, **kwargs)
        logUpdateOperation(session, record, get(model_name, id=kwargs["id"])[0])
        session.commit()
        return record.to_dict()


def create_model(session, model_name, **kwargs):
    model = get_class(model_name)
    return model().create_record(session, **kwargs)


def update_model(session, model_name, **kwargs):
    model = get_class(model_name)
    return model().update_record(session, **kwargs)


def logCreateOrDeleteOperation(session, record, operation):
    value = json.dumps(record.to_dict())
    session.add(classSqlAlchemy.logs(
        record.__tablename__,
        record.id,
        value,
        operation,
        datetime.datetime.now()
    )
    )


def logUpdateOperation(session, record, previous_record):
    for k, v in record.to_dict().items():
        if str(v) != str(previous_record[k]):
            session.add(classSqlAlchemy.logs(
                record.__tablename__,
                record.id,
                str(v),
                'update',
                datetime.datetime.now(),
                previous_value=str(previous_record[k]),
                field=k
                )
            )
