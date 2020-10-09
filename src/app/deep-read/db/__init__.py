"""
Package for the db models.
"""

from os import path
import json

class DRVideo(object):
    """A transcript object for use in db/repository"""
    def __init__(
        self, key="", id="", transcript="", 
        duration=None, images=None, image_text=None, 
        summary="", mcqs=None,
        status="In Process"
        ):
        """Initializes the Transcript Collection"""
        self.key = key
        self.id = id
        self.transcript = transcript
        self.images = images
        self.duration = duration
        self.status = status
        self.image_text = image_text
        self.summary = summary
        self.mcqs = mcqs

    def to_dict(self):
        """
        Converts object to python dictionary
        """
        obj = {
            'id': self.id,
            'transcript': self.transcript,
            'images':self.images,
            'duration':self.duration,
            'image_text':self.image_text,
            'summary':self.summary,
            'mcqs': self.mcqs,
            'status': self.status
            
        }
        return obj


class DRVideoNotFound(Exception):
    """Exception raised when a DRVideo object couldn't be retrieved from
    the repository, usually because it does not exist"""
    pass
