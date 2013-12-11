from flask import (Flask,
                   render_template,
                   url_for)
from Models import baseAlchemy
import json

app = Flask(__name__)


@app.route("/")
def index():
    return ""

@app.route("/api/model/<name>")
def getModel(name):
    data = json.dumps({"records":baseAlchemy.get(name)})
    return data 


if __name__ == "__main__":
    app.run()
    url_for('static', filename='app.html')

