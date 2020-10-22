from flask_restx import Resource, Namespace, fields  # https://flask-restx.readthedocs.io/en/latest/quickstart.html
from math import ceil

from db import DRVideoNotFound
from db.factory import create_repository
from settings import REPOSITORY_NAME, REPOSITORY_SETTINGS

# DB
repository = create_repository(REPOSITORY_NAME, REPOSITORY_SETTINGS)
# Namespace
api = Namespace('gallery', description='Gallery Image Generation related operations')


# TODO Response Marshalling


@api.route('/post/<path:file>')
@api.param('file', 'File ID')
class GalleryRequest(Resource):

    def post(self, file):
        id = file

        response = ""
        data = repository.get_one(id)
        if data.images is not None:
            response = data.images

        else:
            api.abort(404, 'Call this API after summary has been generated')
        return response


@api.route('/get/<file_id>')
@api.param('file_id', 'File ID')
class GalleryResponse(Resource):

    def get(self, file_id):
        id = file_id

        response = ""
        data = repository.get_one(id)
        if data.images is not None:
            response = data.images

        else:
            api.abort(404, 'Call this API after summary has been generated')
        return response


@api.errorhandler(DRVideoNotFound)
def video_no_found(error):
    """no such video exists"""
    return {'message': 'video does not exist'}, 404
