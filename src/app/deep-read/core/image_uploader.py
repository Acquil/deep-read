from azure.storage.blob import BlockBlobService
from azure.storage.blob import ContentSettings
from azure_blob_settings import *
import uuid

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