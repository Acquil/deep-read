#!/usr/bin/env python
from flask import Flask
from flask_cors import CORS
from apis import api
# https://flask-restx.readthedocs.io/en/latest/quickstart.html

app = Flask(__name__)
# CORS
cors = CORS(app, resources={r"/*": {"origins": "*"}})

api.init_app(app)

app.run(debug=True)
