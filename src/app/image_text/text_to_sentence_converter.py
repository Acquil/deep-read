
"""Extract images from video

Parameters
----------
text : str
    The string from which sentences are to be extracted
"""

import re
import nltk
nltk.download('punkt')

from nltk import sent_tokenize
from nltk.tokenize import word_tokenize

class Text_to_Sentence_Converter:

    def __init__(self, text):
        self.text = text

    def word_count(self, tokens):
        word_count = 0
        for token in tokens:
            if token.isalpha():
                word_count += 1
        return word_count
    
    #NLTk library extracts sentences from text, based on punctuations
    def extract_sentences_using_nltk(self):
        return sent_tokenize(self.text)

    #This function has been designed specifically to extract sentences from text generated using OCR for powerpoint slides
    def extract_sentences_powerpoint_text(self, nltk_extracted_sentences):
        sentences = []
        for sentence in nltk_extracted_sentences:
            lines = sentence.split("\n")
            is_new_sentence = True
            for line in lines:
                tokens = word_tokenize(line)
                if is_new_sentence:
                    if self.word_count(tokens) < 4: #This constraint is added to ignore headings in powerpoint slides
                        continue
                    else:
                        sentences.append(line)
                        is_new_sentence = False
                else:
                    if len(tokens)==0: #blank line
                        is_new_sentence = True
                    else:
                        if len(tokens[0]) == 1 and tokens[0] != "I": #Assumed to be a bulleted point
                            sentences.append(line)
                        else:
                            sentences[len(sentences)-1] += " " + line
        return sentences
    
    def remove_punctuations(self, sentences):
        for i in range(len(sentences)):
            sentences[i] = re.sub(r'[^\w\s]', '', sentences[i]) 
        
        return sentences

    def convert(self):
        nltk_extracted_sentences = self.extract_sentences_using_nltk()
        sentences = self.extract_sentences_powerpoint_text(nltk_extracted_sentences)
        return self.remove_punctuations(sentences)

        
