from flask import Flask
#import sqlite3
#conn = sqlite3.connect('dalpe_construction.db')
from Models import baseAlchemy
import json

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

@app.route("/api/sousTraitant")
def getSousTraitants():
    data = json.dumps({"records":baseAlchemy.get('soustraitants')})
    return data 


if __name__ == "__main__":
    app.run()

