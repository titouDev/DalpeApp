import sys
import os
sys.path.append("/Users/titou/Documents/GIT/DalpeApp/settings")
sys.path.append("/Users/titou/Documents/GIT/DalpeApp/Flask/Models")
import time
import classSqlAlchemy
from contextlib import contextmanager
from sqlalchemy.orm import sessionmaker

get_class = lambda x: getattr(classSqlAlchemy, x)

from sqlalchemy import create_engine

import unittest
import uuid
from example_data import sousTraitantsListe

class allTests(unittest.TestCase):
    uniqueId = uuid.uuid1()
    databaseName = "dalpeDB_" + str(uniqueId)
    dbSqLite = 'sqlite:///%s.db' % databaseName
    Session = None

    @classmethod
    def setUpClass(cls):
        #on veut creer la database
        print "creating database"
        cls.engine = create_engine(cls.dbSqLite, echo=False, case_sensitive=False)
        classSqlAlchemy.Base.metadata.create_all(cls.engine)
        cls.Session = sessionmaker(bind=cls.engine)

    @classmethod
    def tearDownClass(cls):
        print "dropping database"
        classSqlAlchemy.Base.metadata.drop_all(cls.engine)
        print "removing sqlite file"
        os.remove("%s.db" % cls.databaseName)

    def setUp(self):
        pass

    def tearDown(self):
        pass

    @contextmanager
    def session_scope(self):
        """Provide a transactional scope around a series of operations."""
        session = self.Session()
        try:
            yield session
            session.commit()
        except:
            session.rollback()
            raise
        finally:
            session.close()

    def test_create_sousTraitants(self):
        with self.session_scope() as session:
            for s in sousTraitantsListe:
                sousTraitant = classSqlAlchemy.Soustraitant().create_record(session, **s).to_dict()
                for k, v in s.items():
                    if k != "specialites":
                        self.assertEqual(sousTraitant[k], v)
    def test_get_sousTraitants(self):
        with self.session_scope() as session:
            result = classSqlAlchemy.Soustraitant().get_records(session)
            [r.to_dict() for r in result]

    def test_get_sousTraitants_with_filter(self):
        with self.session_scope() as session:
            result = classSqlAlchemy.Soustraitant().get_records(session, id=4)
            self.assertEqual(result[0].id, 4)

if __name__ == '__main__':
    unittest.main()
