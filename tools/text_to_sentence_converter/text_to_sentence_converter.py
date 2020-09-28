
"""Extract images from video

Parameters
----------
text : str
    The string from which sentences are to be extracted
"""
import nltk
nltk.download('punkt')

from nltk import sent_tokenize
from nltk.tokenize import word_tokenize

class Text_to_Sentence_Converter:

    def __init__(self, text):
        self.text = text

    def convert(self):
        nltk_extracted_sentences = sent_tokenize(self.text)

        sentences = []
        for sentence in nltk_extracted_sentences:
            lines = sentence.split("\n")
            is_new_sentence = True
            for line in lines:
                tokens = word_tokenize(line)
                if is_new_sentence:
                    if len(tokens) <= 3:
                        continue
                    else:
                        sentences.append(line)
                        is_new_sentence = False
                else:
                    if len(tokens)==0:
                        is_new_sentence = True
                    else:
                        if tokens[0] == '*':
                            sentences.append(line)
                        else:
                            sentences[len(sentences)-1] += " " + line
        return sentences
