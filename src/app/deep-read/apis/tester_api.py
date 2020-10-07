from flask_restx import Namespace, Resource, fields
from flask import Response
import time
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

        
    def put(self,id):
        def generate():
            print('request started')
            api.logger.info('request started')
            for i in range(5):
                time.sleep(1)
                yield str(i)
            print('request finished')
            api.logger.info('request finished')
            yield ''
        return Response(generate(), mimetype='text/plain')
