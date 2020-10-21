from flask import Flask, jsonify, Response
from flask_restx import Resource, Namespace, fields #https://flask-restx.readthedocs.io/en/latest/quickstart.html
from core.image_uploader import *
from math import ceil
import pymongo
import os
import json
import soundfile

from threading import Thread

from db import DRVideoNotFound, DRVideo
from db.factory import create_repository
from settings import REPOSITORY_NAME, REPOSITORY_SETTINGS, TRANSCRIPTION_WORKERS

# DB
repository = create_repository(REPOSITORY_NAME, REPOSITORY_SETTINGS)
# Namespace
api = Namespace('gallery', description='Gallery Image Generation related operations')

# TODO Response Marshalling


@api.route('/post/<path:file>')
@api.param('file','File ID')
class GalleryRequest(Resource):
    

    def post(self, file):        
        id = file

        response = ""
        data = repository.get_one(id)
        if data.images != None:
            response = data.images

        else:
            api.abort(404, 'Call this API after summary has been generated')
        return response


@api.route('/get/<file_id>')
@api.param('file_id','File ID')
class GalleryResponse(Resource):
    
    def get(self, file_id):
        id = file_id

        response = ""
        data = repository.get_one(id)
        if data.images != None:
            response = data.images

        else:
            api.abort(404, 'Call this API after summary has been generated')
        return response


@api.errorhandler(DRVideoNotFound)
def video_no_found(error):
    '''no such video exists'''
    return {'message': 'video does not exist'}, 404
