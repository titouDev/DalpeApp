import sqlalchemy
import sqlsoup


db = sqlsoup.SQLSoup('mysql://titoudev_simon:Ucantd0it@localhost/titoudev_dalpe?charset=utf8&use_unicode=0')

print db.soustraitants.all();

