"""
Settings for the application.

You can set values of REPOSITORY_NAME and REPOSITORY_SETTINGS in
environment variables, or set the default values in code here.
"""

from os import environ

# default storage
REPOSITORY_NAME = environ.get('REPOSITORY_NAME', 'memory')
USE_SENTENCE_SEGMENTER = True
SEGMENTER_KEY = environ.get('DEEPSEGMENT_API_KEY', 'aLeOUEFcETcmxOykNhhuRBFbUHPCeABvGolJEdyl')

if REPOSITORY_NAME == 'mongodb':
    REPOSITORY_SETTINGS = {
        'MONGODB_HOST': environ.get('MONGODB_HOST', None),
        'MONGODB_DATABASE': environ.get('MONGODB_DATABASE', 'test'),
        'MONGODB_COLLECTION': environ.get('MONGODB_COLLECTION', 'videos')
    }
elif REPOSITORY_NAME == 'memory':
    REPOSITORY_SETTINGS = {}
else:
    raise ValueError('Unknown repository.')

# Number of processes to spawn for transcription
TRANSCRIPTION_WORKERS = 4

# Azure-blob storage settings
AZURE_CONNECT_STR = environ.get('BLOB_CONNECTION_STR')
AZURE_CONTAINER_NAME = 'images'
AZURE_URI_PREFIX = 'https://deepread.blob.core.windows.net/images/'
