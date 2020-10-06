from flask import Flask, jsonify
from flask_restx import Resource, Namespace, fields #https://flask-restx.readthedocs.io/en/latest/quickstart.html
from core.speech import Recognizer
import os
import json

api = Namespace('speech', description='Speech transcription related operations')

transcribe = api.model('Transcript', {
    'transcript': fields.String(required=True, description='Full Transcript'),
    'transcript_times': fields.String(required=True, description= 'Transcript with words and timestamps'),
})

@api.route('/post/<path:file>&<model>&<int:minutes_per_split>')
@api.param('model','Model to be used for speech')
@api.param('minutes_per_split','Number of minutes per split')
@api.param('file','File to be transcribed')
class SpeechTranscript(Resource):
    
    # @api.marshal_with(transcribe, envelope = 'resource')
    def post(self, minutes_per_split, model, file):
        # check if file exists else
        file = f"core/temp/{file}.wav"
        if not os.path.isfile(file):
            api.abort(404)
        
        
        # return {'transcript_id':'1', 'file_id':'12'}
        # Transcribe
        r = Recognizer(
            wav_audio = file, 
            workers=4, 
            min_per_split= int(minutes_per_split),
            model = model
        )
        r.transcribe()
        # load again to prevent double-encoding
        return {
            'transcript': r.transcript,
            'transcript_times': json.loads(r.timestamped_text)
            }


@api.route('/get/<file_id>')
@api.param('file_id','File ID')
class SpeechTranscriptResponse(Resource):

    @api.marshal_with(transcribe, envelope='resource')
    def get(self, file_id):
        return {'transcript_id':'1', 'file_id':'12'}
