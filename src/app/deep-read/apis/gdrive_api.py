from flask_restx import Namespace, Resource, fields
import gdown
import filetype
import os

api = Namespace('files', description='Video/Audio file related operations')

file = api.model('File ID', {
    'id': fields.String(required=True, description='File identifier'),
    'filename': fields.String(required=True, description='File name'),
})


@api.route('/g-drive/<path:link>')
@api.param('link', 'Google drive link')
class Url(Resource):
    @api.marshal_with(file)
    def post(self, link):
        # Get id of file
        id = link.split("/")[-2]
        url = 'https://drive.google.com/uc?id={}'.format(id)
        output = f"core/temp/{id}"
        gdown.download(url, output, quiet=True)
        # check filetype
        kind = filetype.guess(output).mime
        
        if kind is not None and kind.split("/")[0] == 'video':
            # Rename
            video_output = f"{output}.{kind.split('/')[-1]}"
            audio_output = f"{output}.wav"

            os.rename(output, video_output)
            os.system(f"ffmpeg -loglevel quiet -i {video_output} -vn {audio_output}")
            # Return same id of file in google drive //TODO change to something more secure
            return {'id':id, 'filename':video_output}
        
        api.abort(404, 'No video found. Either the link does not exist or file is not a video')
        