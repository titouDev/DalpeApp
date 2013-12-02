import sqlalchemy
import sqlsoup

engine = 'sqlite:///dalpe_construction.db'

def get(modelName):
    db = sqlsoup.SQLSoup(engine)
    table = db.entity(modelName)
    tableFields = [i for i in table._sa_class_manager]
    data = [] 
    for i in table.all():
        dataObject = dict([(f, str(getattr(i, f))) for f in tableFields])
        data.append(dataObject) 
    return data

