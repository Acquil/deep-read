"""Export slides of powerpoints into images in batches

Parameters
----------
base_path : str
    Powerpoint files in this path will be converted to jpg
render_path : str
    Rendered Images of powerpoint files will be saved in this path
image_start_index : int, optional
    Images will be named, starting from this index value incrementally. Default value is 0.
    This parameter is very useful while appending images to training data. 

"""

import os
import win32com
import win32com.client


class PPT_to_JPG_Convertor:


    powerpoint = None

    def __init__(self,base_path, render_path, image_start_index = 0):
        self.base_path = base_path
        self.render_path = render_path
        self.image_start_index = 0

    # Initialize PPT    
    def init_powerpoint(self):
        self.powerpoint = win32com.client.Dispatch('PowerPoint.Application')
        self.powerpoint.Visible = 1
        

    # PPT to JPG converter
    def ppt_to_jpg(self, inputFileName, formatType = 32):
        deck = self.powerpoint.Presentations.Open(inputFileName)
        deck.SaveAs(self.render_path + "temp\\" + '.jpg', 17)
        deck.Close()
        self.move_images_to_main_folder()
        print("Converted "+ str(self.image_start_index) + " images")

    def move_images_to_main_folder(self):
        files = os.listdir(self.render_path + "temp\\")
        jpgfiles = [f for f in files if f.endswith(".JPG")]
        for jpgfile in jpgfiles:
            try:
                os.rename(self.render_path + "temp\\" + jpgfile, self.render_path + str(self.image_start_index) + '.jpg')
            except WindowsError:
                os.remove(self.render_path + str(self.image_start_index) + '.jpg')
                os.rename(self.render_path + "temp\\" + jpgfile, self.render_path + str(self.image_start_index) + '.jpg')
            self.image_start_index += 1


    # Scan for PPT files in the folder
    def convert_files_in_folder(self):
        files = os.listdir(self.base_path)
        pptfiles = [f for f in files if f.endswith((".ppt", ".pptx"))]
        for pptfile in pptfiles:
            fullpath = os.path.join(self.base_path, pptfile)
            print("Converting Powerpoint file: ",fullpath)
            self.ppt_to_jpg(fullpath)
            

    def close_powerpoint(self):
        os.rmdir(self.render_path + "temp\\")
        self.powerpoint.Quit()


    def convert_ppt_to_jpg(self):
        self.init_powerpoint()
        self.convert_files_in_folder()
        self.close_powerpoint()
    