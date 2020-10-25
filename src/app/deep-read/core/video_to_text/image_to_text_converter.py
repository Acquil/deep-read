
"""Converts image  to text using Optical Character Recognition

Parameters
----------
image_path : str
    Location of Image file
"""
from PIL import Image
import pytesseract
import cv2
import os
import uuid
# from google.colab.patches import cv2_imshow

class Image_to_Text_Converter:

    def __init__(self, image_path):
        self.image_path = image_path
    
    def convert(self):
        image = cv2.imread(self.image_path)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        _,thresh = cv2.threshold(gray,240,255,cv2.THRESH_BINARY)

        filename = os.path.join("core/temp/", str(uuid.uuid4()) + '.png')
        cv2.imwrite(filename, thresh)
        text = pytesseract.image_to_string(Image.open(filename))
        os.remove(filename)
        
        #cv2_imshow(thresh)
        return text
