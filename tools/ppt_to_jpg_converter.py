"""
	The function of the tool function: export PPT into pictures in batches

"""

import os
import win32com
import win32com.client


# base path - Powerpoint files in this path will be converted to jpg
base_path = 'A:\\sem_9\\open_source\\ppts\\'



# Initialize PPT
def init_powerpoint():
    powerpoint = win32com.client.Dispatch('PowerPoint.Application')
    powerpoint.Visible = 1
    return powerpoint


# Scan for PPT files in the folder
def convert_files_in_folder(powerpoint, folder):
    files = os.listdir(folder)
    pptfiles = [f for f in files if f.endswith((".ppt", ".pptx"))]
    print("Powerpoint files Scanned", pptfiles)
  

if __name__ == "__main__":
    powerpoint = init_powerpoint()
    convert_files_in_folder(powerpoint, base_path)
    powerpoint.Quit()
