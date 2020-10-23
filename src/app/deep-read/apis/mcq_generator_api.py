from flask_restx import Resource, Namespace  # https://flask-restx.readthedocs.io/en/latest/quickstart.html
from core.mcq_generator import McqGenerator
import os

from db import DRVideoNotFound
from db.factory import create_repository
from settings import REPOSITORY_NAME, REPOSITORY_SETTINGS

# DB
repository = create_repository(REPOSITORY_NAME, REPOSITORY_SETTINGS)
# Namespace
api = Namespace('mcq_generator', description='MCQ GENERATION related operations')


# TODO Response Marshalling


@api.route('/post/<path:file>')
@api.param('file', 'File ID')
class MCQGeneratorRequest(Resource):

    def post(self, file):
        id = file

        response = ""
        data = repository.get_one(id)
        if data.status == "Success":
            response = self.get_response_string(id, data)
            repository.update(dr_key=id, field='mcqs', data=response['mcqs'])

        else:
            api.abort(404, 'Call this API after transcript has been generated')
        return response

    # Returns response dictionary for McqGenerator Post Request
    def get_response_string(self, id, data):
        # TODO - concatenate video text with audio text and then pass it to MCQ Generator
        mcq_generator = McqGenerator(text=data.transcript['transcript'])
        questions, options, correct_answers = mcq_generator.generate_mcqs(5)

        questions_dict = {str(k + 1): v for k, v in enumerate(questions)}
        options_dict = {}
        correct_answers_dict = {}
        for option_index in range(len(options)):
            options_dict[str(option_index + 1)] = {str(k + 1): v for k, v in enumerate(options[option_index])}
            correct_answers_dict[str(option_index + 1)] = str(
                options[option_index].index(correct_answers[option_index]) + 1)

        mcqs = {
            'questions': questions_dict,
            'options': options_dict,
            'answers': correct_answers_dict,
            'status': 'Success'
        }

        repository.update(dr_key=id, field='mcqs', data=mcqs)
        return {"mcqs": mcqs, "status": mcqs['status']}


@api.route('/get/<file_id>')
@api.param('file_id', 'File ID')
class MCQGeneratorResponse(Resource):
    """
    Poll for MCQ
    """

    def get(self, file_id):
        data = repository.get_one(file_id)
        status = data.mcqs['status']
        del data.mcqs['status']
        return ({
            "mcqs": data.mcqs,
            "status": status
        })


@api.errorhandler(DRVideoNotFound)
def video_no_found(error):
    """no such video exists"""
    return {'message': 'video does not exist'}, 404
