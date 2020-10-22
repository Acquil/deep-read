import os
from uuid import uuid4

import filetype
from flask_restx import Namespace, Resource, fields

# import gdown
from core.gdown import download

api = Namespace('files', description='Video/Audio file related operations')

file = api.model('File ID', {
    'id': fields.String(required=True, description='File Identifier'),
    'gid': fields.String(required=True, description='Google Drive file ID'),
    'filename': fields.String(required=True, description='Google Drive filename'),
    'size': fields.String(required=True, description='Size of file in MB')
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

        # modified gdown.download
        file = download(url, output, quiet=True, use_cookies=False)
        filename = file['filename']

        # check filetype
        kind = filetype.guess(output).mime
        
        if kind is not None and kind.split("/")[0] == 'video':
            # Rename
            video_output = f"{output}.{kind.split('/')[-1]}"
            audio_output = f"{output}.wav"

            os.rename(output, video_output)
            
            os.system(f"ffmpeg -loglevel quiet -i {video_output} -vn {audio_output}")
            size = os.stat(f"{video_output}").st_size/(1024*1024)
            
            return {
                'id'    :id, 
                'gid'   :gid,
                'filename': filename,
                'size'  : f"{str(size)[:5]} MB"
                }
        
        api.abort(404, 'No video found. Either the link does not exist or file is not a video.')
