from image_to_text_converter import Image_to_Text_Converter

image_path = "/media/ashwin/Current/sem_9/open_source/deep-read/data/training/CNN/slides/images_rendered_from_powerpoint/387.jpg"
image_to_text_converter = Image_to_Text_Converter(image_path)
text = image_to_text_converter.convert()
print(text)