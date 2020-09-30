
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
# from google.colab.patches import cv2_imshow

class Image_to_Text_Converter:

    def __init__(self, image_path):
        self.image_path = image_path
    
    def convert(self):
        image = cv2.imread(self.image_path)
        gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
        # check to see if we should apply thresholding to preprocess the image

        gray = cv2.threshold(gray, 0, 255,cv2.THRESH_BINARY | cv2.THRESH_OTSU)[1]
        gray = cv2.medianBlur(gray, 3)

        filename = "{}.png".format(os.getpid())
        cv2.imwrite(filename, gray)
        
        text = pytesseract.image_to_string(Image.open(filename))
        os.remove(filename)

        # cv2_imshow(gray)
        return text