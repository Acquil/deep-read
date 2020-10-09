"""
Repository of DR Videos that stores data in a MongoDB database.
"""

from bson.objectid import ObjectId, InvalidId
from pymongo import MongoClient

from . import DRVideo, DRVideoNotFound

def _dr_from_doc(doc):
    """Creates a DR object from the MongoDB DR document."""
    return DRVideo(str(doc['_id']), doc['id'], doc['transcript'], doc['duration'], doc['images'], doc['status'])

def _image_from_doc(doc):
    return None

class Repository(object):
    """MongoDB repository."""
    def __init__(self, settings):
        """Initializes the repository with the specified settings dict.
        Required settings are:
         - MONGODB_HOST
         - MONGODB_DATABASE
         - MONGODB_COLLECTION
        """
        self.name = 'MongoDB'
        self.host = settings['MONGODB_HOST']
        self.client = MongoClient(self.host)
        self.database = self.client[settings['MONGODB_DATABASE']]
        self.collection = self.database[settings['MONGODB_COLLECTION']]

    def get_all(self):
        """Returns all the polls from the repository."""
        docs = self.collection.find()
        objects = [_dr_from_doc(doc) for doc in docs]
        return objects

    def get_one(self, dr_key):
        """Returns a dr object from the repository."""
        try:
            doc = self.collection.find_one({"id": dr_key})
            if doc is None:
                raise DRVideoNotFound()

            dr = _dr_from_doc(doc)
            # dr.images = [_image_from_doc(slide_doc)
                            # for slide_doc in doc['images']]
            return dr
        except InvalidId:
            raise DRVideoNotFound()

    
    def get_transcript(self, dr_key):
        """Returns a dr object from the repository."""
        try:
            #//TODO change _id
            doc = self.collection.find_one({"id": dr_key})
            if doc is None:
                raise DRVideoNotFound()
            dr = _dr_from_doc(doc)
            return dr.transcript

        except InvalidId:
            raise DRVideoNotFound()


    def update(self, dr_key, field ,data=None):
        """Update data for the specified video."""
        try:
            self.collection.update(
                {
                    # "_id": ObjectId(dr_key),
                    "id": dr_key,
                },
                {
                    "$set": { str(field): data}
                }
            )
        except(InvalidId, ValueError):
            raise DRVideoNotFound()


    def upload_one(self, obj):
        """Adds a dr-video object to the repository."""
        try:
            doc = obj.to_dict()
            self.collection.insert(doc)
        except(KeyError):
            raise KeyError
