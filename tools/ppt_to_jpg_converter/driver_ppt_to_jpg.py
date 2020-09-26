from ppt_to_jpg_convertor import *

if __name__ == '__main__':
    base_path = 'C:\\open_source\\ppts\\'
    render_path = 'C:\\open_source\\images_rendered_from_powerpoint\\'
    ppt_to_jpg_converter = PPT_to_JPG_Convertor(base_path,render_path)
    ppt_to_jpg_converter.convert_ppt_to_jpg()