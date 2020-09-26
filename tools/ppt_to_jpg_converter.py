"""
	The function of the tool function: export PPT into pictures in batches

"""

import os
import win32com
import win32com.client


# base path - Powerpoint files in this path will be converted to jpg
base_path = 'A:\\sem_9\\open_source\\ppts\\'

# render path - Rendered Images of powerpoint files will be saved in this path
render_path = 'A:\\sem_9\\open_source\\images_rendered_from_powerpoint\\'

image_start_index = 0



# Initialize PPT
def init_powerpoint():
    powerpoint = win32com.client.Dispatch('PowerPoint.Application')
    powerpoint.Visible = 1
    return powerpoint

# PPT to JPG converter
def ppt_to_jpg(powerpoint, inputFileName, formatType = 32):
    global image_start_index
    deck = powerpoint.Presentations.Open(inputFileName)
    deck.SaveAs(render_path + "temp\\" + '.jpg', 17)
    deck.Close()
    move_images_to_main_folder()
    print("Converted "+ str(image_start_index) + " images")

def move_images_to_main_folder():
    global image_start_index
    files = os.listdir(render_path + "temp\\")
    jpgfiles = [f for f in files if f.endswith(".JPG")]
    for jpgfile in jpgfiles:
        os.rename(render_path + "temp\\" + jpgfile, render_path + str(image_start_index) + '.jpg')
        image_start_index += 1

# Scan for PPT files in the folder
def convert_files_in_folder(powerpoint, folder):
    files = os.listdir(folder)
    pptfiles = [f for f in files if f.endswith((".ppt", ".pptx"))]
    print("Powerpoint files Scanned", pptfiles)
    for pptfile in pptfiles:
        fullpath = os.path.join(base_path, pptfile)
        ppt_to_jpg(powerpoint, fullpath)
        




if __name__ == "__main__":
    powerpoint = init_powerpoint()
    convert_files_in_folder(powerpoint, base_path)
    powerpoint.Quit()
