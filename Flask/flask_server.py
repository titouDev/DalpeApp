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

@app.route("/api/model/<name>")
def getModel(name, ):
    data = json.dumps({"records":baseAlchemy.get(name,**request.args)})
    return data 


if __name__ == "__main__":
    app.run(debug=True)
    url_for('static', filename='app.html')

