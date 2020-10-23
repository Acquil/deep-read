from uuid import uuid4

from azure.storage.blob import BlockBlobService
from azure.storage.blob import ContentSettings

from settings import AZURE_CONNECT_STR, AZURE_CONTAINER_NAME, AZURE_URI_PREFIX


def upload_images(filepaths):
    """
    filepaths : list of image file paths
    returns list of URIs
  """
    block_blob_service = BlockBlobService(connection_string=AZURE_CONNECT_STR)
    URI = []
    for filepath in filepaths:
        filename = str(uuid4()) + '.jpg'
        block_blob_service.create_blob_from_path(AZURE_CONTAINER_NAME, filename, filepath,
                                                 content_settings=ContentSettings(content_type='image/jpeg'))
        URI.append(AZURE_URI_PREFIX + filename)
    return URI
