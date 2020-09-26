"""
	The function of the tool function: export PPT into pictures in batches

"""

import os
import win32com
import win32com.client


# Initialize PPT
def init_powerpoint():
    powerpoint = win32com.client.Dispatch('PowerPoint.Application')
    powerpoint.Visible = 1
    return powerpoint  


if __name__ == "__main__":
    powerpoint = init_powerpoint()
    powerpoint.Quit()
