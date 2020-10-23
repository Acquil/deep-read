import json
import os
from math import ceil
from threading import Thread

import soundfile
from flask_restx import Resource, Namespace, fields  # https://flask-restx.readthedocs.io/en/latest/quickstart.html

from core import sentence_segmenter
from core.speech import Recognizer
from db import DRVideoNotFound, DRVideo
from db.factory import create_repository
from settings import REPOSITORY_NAME, REPOSITORY_SETTINGS, TRANSCRIPTION_WORKERS
from settings import USE_SENTENCE_SEGMENTER

# DB
repository = create_repository(REPOSITORY_NAME, REPOSITORY_SETTINGS)
# Namespace
api = Namespace('speech', description='Speech transcription related operations')

transcribe = api.model('Transcript', {
    'transcript': fields.String(required=True, description='Full Transcript'),
    'transcript_times': fields.String(required=True, description='Transcript with words and timestamps'),
})


@api.route('/post/<path:file>&<model>')
@api.param('model', 'Model to be used for speech')
@api.param('file', 'File to be transcribed')
class SpeechTranscript(Resource):

    def post(self, model, file):
        """
        Post request to transcribe video(file)
        """
        id = file
        # check if file exists else
        file = f"core/temp/{file}.wav"
        if not os.path.isfile(file):
            api.abort(404, "file does not exist", custom="file should be uploaded first")

        f = soundfile.SoundFile(file)
        duration = len(f) // f.samplerate
        # Determine minutes per split //TODO
        minutes_per_split = ceil(duration / (TRANSCRIPTION_WORKERS * 60))
        doc = DRVideo(id=id, transcript="", duration=duration, status='In Process')
        repository.upload_one(doc)

        Thread(target=self.transcribe_task, args=(file, minutes_per_split, model, id)).start()
        return {
            'id': id,
            'length': duration,
            'status': 'In Process'
        }

    # Thread to spawn more processes and transcribe in background
    def transcribe_task(self, file, minutes_per_split, model, id):
        # Transcribe
        r = Recognizer(
            wav_audio=file,
            workers=TRANSCRIPTION_WORKERS,
            min_per_split=int(minutes_per_split),
            model=model
        )
        r.transcribe()

        if USE_SENTENCE_SEGMENTER:
            r.transcript = sentence_segmenter.segment_text(r.transcript)
            # Flatten if API returns list
            if type(r.transcript) == list:
                # join list of sentences with periods
                r.transcript = '. '.join(r.transcript[0])

        # load again to prevent double-encoding
        output = {
            'transcript': r.transcript,
            'transcript_times': json.loads(r.timestamped_text)
        }

        # //TODO more efficient way?
        repository.update(dr_key=id, field='transcript', data=output)
        repository.update(dr_key=id, field='status', data="Success")
        print('Transcribed')


@api.route('/get/<file_id>')
@api.param('file_id', 'File ID')
class SpeechTranscriptResponse(Resource):
    """
    Get transcript
    """

    def get(self, file_id):
        data = repository.get_one(file_id)
        # if data.status == "In Process":
        return ({
            "transcript": data.transcript,
            "status": data.status
        })
        # return jsonify(data.transcript)


@api.errorhandler(DRVideoNotFound)
def video_no_found(error):
    """no such video exists"""
    return {'message': 'video does not exist'}, 404
