#!/usr/bin/env python
from flask import Flask
from apis import api
# https://flask-restx.readthedocs.io/en/latest/quickstart.html

app = Flask(__name__)
api.init_app(app)

app.run(debug=True)
