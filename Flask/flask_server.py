from flask import (Flask,
                   jsonify,
                   url_for,
                   request,
                   redirect)

from Models import baseAlchemy
from flask.views import MethodView
import json

from flask_swagger import swagger

app = Flask(__name__)


@app.route("/api")
def index():
    return redirect('static/swagger-ui-master/dist/index.html')

@app.route("/DalpeApp")
def dalpeApp():
    return redirect('static/index.html')

class UserAPI(MethodView):

    def get(self, team_id):
        """
        Get a list of users
        First line is the summary
        All following lines until the hyphens is added to description
        ---
        tags:
          - users
        parameters:
            - name: latitude
              in: query
              description: Latitude component of location.
              required: true
              type: number
              format: double
        responses:
          200:
            description: Returns a list of users
        """
        return []

    def post(self, team_id):
        """
        Create a new user
        ---
        tags:
          - users
        parameters:
          - in: body
            name: body
            schema:
              id: User
              required:
                - email
                - name
              properties:
                email:
                  type: string
                  description: email for user
                name:
                  type: string
                  description: name for user
        responses:
          201:
            description: User created
        """
        return {}


@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin','*')
    response.headers.add('Access-Control-Allow-Headers', "Authorization, Content-Type")
    response.headers.add('Access-Control-Expose-Headers', "Authorization")
    response.headers.add('Access-Control-Allow-Methods', "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.add('Access-Control-Allow-Credentials', "true")
    response.headers.add('Access-Control-Max-Age', 60 * 60 * 24 * 20)
    return response

view = UserAPI.as_view('users')
app.add_url_rule('/users/<int:team_id>', view_func=view, methods=["GET"])
app.add_url_rule('/testing/<int:team_id>', view_func=view)


@app.route("/spec")
def spec():
    swag = swagger(app)
    swag['info']['version'] = "1.0"
    swag['info']['title'] = "Dalpe Api"
    return jsonify(swag)

@app.route("/api/model/<name>", methods=['GET', 'POST'])
def get_model(name):
    """
    An endpoint that isn't using method view
    ---
    tags:
    - hacks
    responses:
      200:
        description: Hacked some hacks
        schema:
          id: Hack
          properties:
            hack:
              type: string
              description: it's a hack
            subitems:
              type: array
              items:
                schema:
                  id: SubItem
                  properties:
                    bla:
                      type: string
                      description: Bla
                    blu:
                      type: integer
                      description: Blu
    """
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
    username = request.form['userName']

    record = baseAlchemy.get('Employe', login=username, password=password)
    if len(record):
        return json.dumps({"user": record[0], "success": True})
    elif not baseAlchemy.get('Employe'):
        # Il n'existe aucun user
        message = """
            Bravo, vous etes le premier utilisateur,
            allez dans l'onglet Employes pour creer votre fiche et celle de vos employes.
        """
        return json.dumps({
            "success": True,
            "message": message
        })
    else:
        return json.dumps({
            "success": False
        })

if __name__ == "__main__":
    app.run(debug=True)
