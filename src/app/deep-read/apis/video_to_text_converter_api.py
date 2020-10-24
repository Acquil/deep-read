from flask_restx import Resource, Namespace
from core.video_to_text.video_to_text_converter import Video_to_Text_Converter
from core.image_uploader import *
import pymongo
import os
import json
import soundfile
import time
from threading import Thread
import threading

from db import DRVideoNotFound, DRVideo
from db.factory import create_repository
from settings import REPOSITORY_NAME, REPOSITORY_SETTINGS, TRANSCRIPTION_WORKERS

# DB
repository = create_repository(REPOSITORY_NAME, REPOSITORY_SETTINGS)
# Namespace
api = Namespace('VideotoTextConverter', description='Video to text conversion related operations')


# TODO Response Marshalling

@api.route('/post/<path:file>')
@api.param('file', 'File from which text is to be extracted')
class VideoToTextRequest(Resource):

    def post(self, file):
        id = file
        # check if file exists else
        file = f"core/temp/{file}.mp4"
        if not os.path.isfile(file):
            api.abort(404, "file does not exist", custom="file should be uploaded first")

        # TODO check if doc already exists
        output = {'image_text': '', 'status': 'In Process'}
        repository.update(dr_key=id, field='image_text', data=output)

        Thread(target=self.summarize_task, args=(file, id)).start()
        return {
            'id': id,
            'status': 'In Process'
        }

    # Thread to spawn more processes and extract text from video in background
    def summarize_task(self, file, id):
        # Extract Text from Video
        video_path = file  # f"core/temp/{file}.mp4"
        video_to_text_converter = Video_to_Text_Converter(video_path=video_path)
        video_text = video_to_text_converter.convert()
        print('Extracted Video Text')

        # upload images to azure blob storage
        image_paths = []
        for image in video_to_text_converter.slide_images:
            image_paths.append(os.path.join("core/temp/" + id, image))

        image_urls = upload_images(image_paths)

        repository.update(dr_key=id, field='images', data=image_urls)
        output = {'image_text': video_text, 'status': 'Success'}
        repository.update(dr_key=id, field='image_text', data=output)
        print('Uploaded Images to blob')



@api.route('/get/<file_id>')
@api.param('file_id', 'File ID')
class VideoToTextResponse(Resource):
    """
    Poll for summary
    """

    def get(self, file_id):
        data = repository.get_one(file_id)
        return ({
            "image_text": data.image_text['image_text'],
            "status": data.image_text['status']
        })


@api.errorhandler(DRVideoNotFound)
def video_no_found(error):
    """no such video exists"""
    return {'message': 'video does not exist'}, 404
