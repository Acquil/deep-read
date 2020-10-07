from flask_restx import Namespace, Resource, fields
import gdown
import filetype
import os

api = Namespace('test', description='API integration testing')


@api.route('/<id>')
@api.param('id', 'Some id')
class Url(Resource):
    def post(self, id):
        # Post id of file
        return {
            'msg': 'Hello',
            'type': 'POST'
        }
    
    def get(self, id):
        # Get id of file
        return {
            'msg': 'Hello',
            'type': 'GET'
        }