from flask_restx import Api
from .gdrive_api import api as ns1
from .speech_api import api as ns2
from .mcq_generator_api import api as ns3
from .tester_api import api as ns4
from .summarizer_api import api as ns5

api = Api(
    version="0.1",
    title="Deep Read APIs",
    description="APIs For uploading files, text transcription, summarization and MCQ generation."
)

api.add_namespace(ns1)
api.add_namespace(ns2)
api.add_namespace(ns3)
api.add_namespace(ns4)
api.add_namespace(ns5)

