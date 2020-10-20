from azure.storage.blob import BlockBlobService
import uuid

CONNECT_STR = environ.get('BLOB_CONNECTION_STR')
CONTAINER_NAME ='images' 
URI_PREFIX = 'https://deepread.blob.core.windows.net/images/'

def upload_images(filepaths):
  """
    filepaths : list of image file paths
    returns list of URIs
  """
  block_blob_service = BlockBlobService(connection_string=CONNECT_STR)
  URI = []
  for filepath in filepaths:
    filename = str(uuid.uuid1())+'.jpg'
    block_blob_service.create_blob_from_path(CONTAINER_NAME, filename, filepath,content_settings=ContentSettings(content_type='image/jpeg'))
    URI.append(URI_PREFIX+filename)
  return URI
