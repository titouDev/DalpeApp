from flask import Flask

import django
print(django.get_version())

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

#if __name__ == "__main__":
#    app.run()

