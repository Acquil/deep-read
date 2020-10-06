from flask_restx import Api
from .speech_api import api as ns1
from .gdrive_api import api as ns2

api = Api(
    version="0.1",
    title="Transcription APIs",
    description="Transcribes audios and videos"
)

api.add_namespace(ns1)
api.add_namespace(ns2)
