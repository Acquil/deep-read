from os import environ
CONNECT_STR = environ.get('BLOB_CONNECTION_STR')
CONTAINER_NAME ='images' 
URI_PREFIX = 'https://deepread.blob.core.windows.net/images/'