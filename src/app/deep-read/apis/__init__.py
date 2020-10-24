from flask_restx import Api
from .gdrive_api import api as ns1
from .speech_api import api as ns2
from .video_to_text_converter_api import api as ns3
from .mcq_generator_api import api as ns4
from .summarizer_api import api as ns5
from .gallery_api import api as ns6
from .tester_api import api as ns7

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
api.add_namespace(ns6)
api.add_namespace(ns7)
