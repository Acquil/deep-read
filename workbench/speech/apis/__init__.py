from flask_restx import Api
from .gdrive_api import api as ns1
from .speech_api import api as ns2

api = Api(
    version="0.1.1",
    title="G-Drive and Transcription APIs",
    description="For uploading files and text transcription."
)

api.add_namespace(ns1)
api.add_namespace(ns2)
