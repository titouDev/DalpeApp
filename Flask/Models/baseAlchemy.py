import classSqlAlchemy
from sqlalchemy.orm import sessionmaker

get_class = lambda x: getattr(classSqlAlchemy, x)

from sqlalchemy import create_engine
dbSqLite = 'sqlite:///dalpe_construction_v115.db'
engine = create_engine(dbSqLite, echo=True, case_sensitive=False)

#classSqlAlchemy.Base.metadata.drop_all(engine)

classSqlAlchemy.Base.metadata.create_all(engine)

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


def get(model_name, **kwargs):
    with session_scope() as session:
        model = get_class(model_name)
        query = session.query(model)
        accepted_filters = set(get_column_names(model)) & kwargs.viewkeys()
        if accepted_filters:
            for f in accepted_filters:
                if type(kwargs[f]) is list:
                    query = query.filter(getattr(model, f).in_(kwargs[f]))
                else:
                    query = query.filter(getattr(model, f) == kwargs[f])

        records = query.all()
        return [r.to_dict() for r in records]


def get_column_names(model):
    return [c.name for c in model.__table__.columns]


def create(model_name, **kwargs):
    with session_scope() as session:
        record = create_model(session, model_name, **kwargs)
        session.commit()
        return record.to_dict()


def update(model_name, **kwargs):
    with session_scope() as session:
        record = update_model(session, model_name, **kwargs)
        session.commit()
        return record.to_dict()


def create_model(session, model_name, **kwargs):
    model = get_class(model_name)
    return model().create_record(session, **kwargs)


def update_model(session, model_name, **kwargs):
    model = get_class(model_name)
    return model().update_record(session, **kwargs)
