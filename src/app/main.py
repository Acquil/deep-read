from screen_classifier.screenclassifier import ScreenClassifier
from image_text.image_to_text_converter import Image_to_Text_Converter
from image_text.text_to_sentence_converter import Text_to_Sentence_Converter

classifier = ScreenClassifier()


def get_text(directory):
	filenames = classifier.predict(directory)

	data = list()
	for filename in filenames:
	  image_path = directory+filename
	  image_to_text_converter = Image_to_Text_Converter(image_path)
	  text = image_to_text_converter.convert()
	  text_to_sentence_converter = Text_to_Sentence_Converter(text)
	  sentences = text_to_sentence_converter.convert()
	  data.extend(sentences)

	return data

directory = ''
get_text(directory)
