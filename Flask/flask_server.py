from flask import (Flask,
                   render_template,
                   url_for,
                   request)
from Models import baseAlchemy
import json

app = Flask(__name__)


@app.route("/")
def index():
    return ""

@app.route("/api/model/<name>", methods=['GET', 'POST'])
def getModel(name):
    if request.method == 'POST':
        recordCreated = baseAlchemy.create(name, json.loads(request.data ))
        return json.dumps({"records":[recordCreated]})
    data = json.dumps({"records":baseAlchemy.get(name,**request.args)})
    return data 

@app.route("/api/model/<name>/<id>", methods=['GET', 'PUT', 'DELETE'])
def getModelById(name, id):
    if request.method == 'PUT':
        baseAlchemy.update(name, id, json.loads(request.data ))
    
    data = json.dumps({"records":baseAlchemy.get_default(name,id=id)})
    return data


if __name__ == "__main__":
    app.run(debug=False)
    url_for('static', filename='app.html')

