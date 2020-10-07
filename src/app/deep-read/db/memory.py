"""
Repository of polls that uses in-memory objects, no serialization.
Used for testing only.
"""

from . import DRVideo, DRVideoNotFound


class Repository(object):
    """In-Memory repository."""
    def __init__(self, settings):
        """Initializes the repository. Note that settings are not used."""
        self.name = 'In-Memory'
        self.index = {}

    def get_all(self):
        """Returns all the dr objects from the repository."""
        return self.index.values()

    def get_one(self, dr_key):
        """Returns a dr object from the repository."""
        dr_object = self.index.get(dr_key)
        if dr_object is None:
            raise DRVideoNotFound()
        return dr_object

    def get_transcript(self, dr_key):
        """Returns a transcript from the repository."""
        dr_object = self.index.get(dr_key)
        if dr_object is None:
            raise DRVideoNotFound()
        return dr_object.transcript

    def update(self, dr_key, field, data=None):
        """Update data for the specified video."""
        dr_object = self.get_one(dr_key)
        # Set field attribute to data arg
        setattr(dr_object, field, data)

    def upload_one(self, obj):
        """Adds a dr-video object to the repository."""
        try:
            self.index[str(obj.gid)] = obj
        except:
            raise DRVideoNotFound()