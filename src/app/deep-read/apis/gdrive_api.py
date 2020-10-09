from flask_restx import Namespace, Resource, fields
from uuid import uuid4
import gdown
import filetype
import os

api = Namespace('files', description='Video/Audio file related operations')

file = api.model('File ID', {
    'id': fields.String(required=True, description='File Identifier'),
    'gid': fields.String(required=True, description='Google Drive file ID'),
})


@api.route('/g-drive/<path:link>')
@api.param('link', 'Google drive link')
class Url(Resource):
    @api.marshal_with(file)
    def post(self, link):
        # Get id of file
        gid = link.split("/")[-2]
        url = 'https://drive.google.com/uc?id={}'.format(gid)
        id = f"{gid}_{str(uuid4())}"
        output = f"core/temp/{id}"

        md5 = 'fa837a88f0c40c513d975104edf3da17'
        # gdown.download(url, output, quiet=True)
        gdown.cached_download(url, output, md5=md5, postprocess=gdown.extractall, quiet=True)

        # check filetype
        kind = filetype.guess(output).mime
        
        if kind is not None and kind.split("/")[0] == 'video':
            # Rename
            video_output = f"{output}.{kind.split('/')[-1]}"
            audio_output = f"{output}.wav"

            os.rename(output, video_output)
            os.system(f"ffmpeg -loglevel quiet -i {video_output} -vn {audio_output}")
            # Return same id of file in google drive //TODO change to something more secure
            return {'id':id, 'gid':gid}
        
        api.abort(404, 'No video found. Either the link does not exist or file is not a video')
        