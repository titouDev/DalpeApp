from flask import (Flask,
                   url_for,
                   request)

from Models import baseAlchemy

import json

app = Flask(__name__)


@app.route("/")
def index():
    return ""


@app.route("/api/model/<name>", methods=['GET', 'POST'])
def get_model(name):
    if request.method == 'POST':
        kwargs = dict((str(k), v) for k, v in json.loads(request.data).items())
        record = [baseAlchemy.create(name, **kwargs)]
    elif request.method == 'GET':
        record = baseAlchemy.get(name, **request.args)
    return json.dumps({"records": record})


@app.route("/api/model/<name>/<id>", methods=['GET', 'PUT', 'DELETE'])
def get_put_delete_model_by_id(name, id):
    if request.method == 'PUT':
        kwargs = json.loads(request.data)
        kwargs.pop('id', False)
        record = baseAlchemy.update(name, id=id, **kwargs)
    elif request.method == 'GET':
        record = baseAlchemy.get(name, id=id)
    elif request.method == 'DELETE':
        record = baseAlchemy.delete(name, id)
    data = json.dumps({"records": record})
    return data


@app.route("/api/login", methods=['POST'])
def login():
    password = request.form['passWord']
    userName = request.form['userName']

    record = baseAlchemy.get('Employe', login=userName, password=password)
    if len(record):
        return json.dumps({"user": record[0], "success": True})
    else:
        return json.dumps({"success": False})

if __name__ == "__main__":
    app.run(debug=True)
    url_for('static', filename='app.html')
