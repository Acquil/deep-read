import nltk
from gensim.summarization import summarize

nltk.download('stopwords')

from fuzzywuzzy.process import dedupe
from textblob import Word
import uuid
import os


class Summarizer:

    def __init__(self, text):
        self.text = text
        paragraph = ''
        for sentence in self.text:
            paragraph += sentence + '. '
        self.paragraph = paragraph
        self.filename = str(uuid.uuid4()) + '.txt'
        f = open(self.filename, "w")
        f.write(self.paragraph)
        f.close()

    def get_summary(self):
        num_of_words = len(self.paragraph.split())

        if num_of_words >= 5000:
            summary = summarize(self.paragraph, 0.05)
        elif num_of_words >= 3000:  # and num_of_words < 5000
            summary = summarize(self.paragraph, 0.1)
        elif num_of_words >= 1000:  # and num_of_words < 3000
            summary = summarize(self.paragraph, 0.2)
        else:
            summary = summarize(self.paragraph, 0.3)

        summary = summary.replace("\n", " ")
        return summary

    def __del__(self):
        os.remove(self.filename)


def filter_text(text):
    filtered_text = dict()
    for sentence in text:
        if len(sentence) > 40:
            filtered_text[sentence] = None
    filtered_text = list(filtered_text.keys())
    deduped_text = list(dedupe(filtered_text))
    return deduped_text


def spell_checker(deduped_text, final_text):
    temp = list()
    for text in deduped_text:
        zen = text.split(' ')
        num_words = len(zen)
        crt_words = 0
        empty_words = 0

        for word in zen:
            if word == '':
                empty_words += 1
            else:
                w = Word(word)
                if w.spellcheck()[0][1] > 0.9:
                    crt_words += 1

        num_words -= empty_words
        if crt_words / num_words >= 0.6:
            temp.append(text)

    if len(temp) > 0:
        final_text.extend(temp)


def get_chunks(lst, n):
    """Yield successive n-sized chunks from lst."""
    for i in range(0, len(lst), n):
        yield lst[i:i + n]
