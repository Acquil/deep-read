"""
Package for the db models.
"""

from os import path
import json

class DRVideo(object):
    """A transcript object for use in db/repository"""
    def __init__(self, key="", gid="", transcript="", duration=None, images=None, status="In Process"):
        """Initializes the Transcript Collection"""
        self.key = key
        self.gid = gid
        self.transcript = transcript
        self.images = images
        self.duration = duration
        self.status = status

    def to_dict(self):
        """
        Converts object to python dictionary
        """
        obj = {
            'gid': self.gid,
            'transcript': self.transcript,
            'images':self.images,
            'duration':self.duration,
            'status': self.status
        }
        return obj


class DRVideoNotFound(Exception):
    """Exception raised when a DRVideo object couldn't be retrieved from
    the repository, usually because it does not exist"""
    pass
