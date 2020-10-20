import os
from video_to_image_converter import Video_to_JPG_Converter
from image_to_text_converter import Image_to_Text_Converter
from text_to_sentence_converter import Text_to_Sentence_Converter

class Video_to_Text_Converter:

    def __init__(self, video_path, offset_duration_seconds = 10):
        self.video_path = video_path
        self.render_path = os.path.splitext(self.video_path)[0] #rendered
        self.offset_duration_seconds = offset_duration_seconds
    
    def extract_images_from_video(self):
        video_to_jpg_converter = Video_to_JPG_Converter(self.video_path, self.render_path, self.offset_duration_seconds)
        video_to_jpg_converter.convert()
    
    def get_extracted_image_paths(self):
        image_paths = [f for f in os.listdir(self.render_path) if os.path.isfile(os.path.join(self.render_path, f))]
        return image_paths

    def extract_text_from_image(self, image_path):
        image_to_text_converter = Image_to_Text_Converter(image_path)
        image_text = image_to_text_converter.convert()
        return image_text
    
    def extract_sentences_from_text(self, image_text):
        text_to_sentence_converter = Text_to_Sentence_Converter(image_text)
        sentences = text_to_sentence_converter.convert()
        return sentences
    
    def append_sentences_to_video_text(self, sentences):
        self.video_text += ". ".join(sentences)

    def convert(self):
        self.video_text = ""
        self.extract_images_from_video()
        image_paths = self.get_extracted_image_paths()
        for image_path in image_paths:
            image_text = self.extract_text_from_image(os.path.join(self.render_path, image_path))
            sentences = self.extract_sentences_from_text(image_text)
            self.append_sentences_to_video_text(sentences)
        return self.video_text