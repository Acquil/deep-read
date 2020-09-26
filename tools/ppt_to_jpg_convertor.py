"""
	The function of the tool function: export PPT into pictures in batches
"""



class PPT_to_JPG_Convertor:

    def __init__(self,base_path,render_path):
        self.base_path = base_path
        self.render_path = render_path

if __name__ == "__main__":
    base_path = 'A:\\sem_9\\open_source\\ppts\\'
    render_path = 'A:\\sem_9\\open_source\\images_rendered_from_powerpoint\\'
    ppt_to_jpg = PPT_to_JPG_Convertor(base_path,render_path)