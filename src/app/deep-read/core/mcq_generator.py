import nltk

nltk.download('stopwords')
import pke
import os
import uuid
import re
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
from gensim.models import KeyedVectors
import random

"""Generates MCQs from a given text

Parameters
----------
text : str
    The string content for which MCQs will be generated

"""


class McqGenerator(object):
    print("loading GloVe model(McqGenerator module)")
    word2vec_file = '../../../data/training/GloVe/word2vec-glove.6B.300d.txt'
    model = KeyedVectors.load_word2vec_format(word2vec_file)
    print("loaded GloVe model(McqGenerator module)")

    def __init__(self, text):
        self.text = text
        self.filename = os.path.join("core/temp/", str(uuid.uuid4()) + '.txt')
        self.sentences = self.text.split('.')
        self.options = None
        self.questions = None
        

    def remove_punctuations(self):
        return re.sub(r'[^\w\s]', '', self.text) 

    # Keyphrases are generated using text rank method
    def generate_keyphrases(self, n=30):                
        with open(self.filename, "w") as f:
            f.write(self.remove_punctuations())

        pos = {'NOUN', 'ADJ'}
        extractor = pke.unsupervised.TextRank()
        extractor.load_document(input=self.filename, language='en')
        extractor.candidate_weighting(window=2,
                                  pos=pos,
                                  top_percent=0.75)

        keyphrases_and_scores = extractor.get_n_best(n=n)
        self.keyphrases = [keyphrase_and_score[0] for keyphrase_and_score in keyphrases_and_scores]
        return self.keyphrases

    def filter_keyphrases(self): 
        #filter keyphrases belonging to more than one sentence(part of a keyphrase belongs to one sentence and another part belongs to another sentence)
        filtered_keyphrase_indices = []
        for sentence in self.sentences:
            for keyphrase_index in range(len(self.keyphrases)):
                if sentence.find(self.keyphrases[keyphrase_index]) != -1:
                    filtered_keyphrase_indices.append(keyphrase_index)

        self.keyphrases = [self.keyphrases[i] for i in filtered_keyphrase_indices]

        # filter keyphrases that has more than 2 words
        keyphrase_indices_to_be_removed = []
        for keyphrase_index in range(len(self.keyphrases)):
            if len(self.keyphrases[keyphrase_index].split(' ')) > 2:
                keyphrase_indices_to_be_removed.append(keyphrase_index)
        for i in reversed(keyphrase_indices_to_be_removed):
            del self.keyphrases[i]

        #filter similar key phrases
        keyphrase_indices_to_be_removed = []
        for keyphrase_index in range(len(self.keyphrases)-1):
            if not keyphrase_index in keyphrase_indices_to_be_removed:
                for keyphrase_index_2 in range(keyphrase_index+1, len(self.keyphrases)):
                    if fuzz.ratio(self.keyphrases[keyphrase_index],self.keyphrases[keyphrase_index_2]) > 80:
                        keyphrase_indices_to_be_removed.append(keyphrase_index_2)
        for i in reversed(keyphrase_indices_to_be_removed):
            try:
                del self.keyphrases[i]
            except:
                print(i, len(self.keyphrases))

    def generate_distractors(self, answer, count):  # distractors are incorrect options
        # Extracting closest words for the answer.
        try:
            closestWords = McqGenerator.model.most_similar(positive=answer, topn=count)  # [answer]
        except Exception as e:
            # In case the word is not in the vocabulary, or other problem not loading embeddings
            print(e)
            return []

        # Return count many distractors
        distractors = list(map(lambda x: x[0], closestWords))[0:count]

        return distractors

    def generate_options(self):
        self.options = []
        for keyphrase in self.keyphrases:
            keywords = keyphrase.split(' ')

            distractors = self.generate_distractors(keywords[0], 10)
            lemmatized_distractors = []  # distractors after re
            for distractor in distractors:
                if fuzz.partial_ratio(keywords[0].lower(), distractor.lower()) < 75:
                    if len(lemmatized_distractors) < 1 or \
                            process.extractOne(distractor.lower(), lemmatized_distractors)[1] < 75:
                        if len(keywords) > 1:
                            distractor += " " + " ".join(keywords[1:])
                        lemmatized_distractors.append(distractor)

            options_for_keyphrase = [keyphrase]
            options_for_keyphrase.extend(lemmatized_distractors[:3])
            self.options.append(options_for_keyphrase)

    def shuffle_options(self):
        for option in self.options:
            random.shuffle(option)

    def generate_questions(self):
        self.questions = [0] * len(self.options)
        for sentence in self.sentences:
            for i in range(len(self.keyphrases)):
                if self.questions[i] == 0 and self.keyphrases[i].lower() in sentence.lower():
                    self.questions[i] = sentence.lower().replace(self.keyphrases[i].lower(), "___________", 1)

    def filter_redundant_questions(self):
        question_indices_to_be_removed = []
        for question_index in range(1, len(self.questions)):
            if process.extractOne(self.questions[question_index], self.questions[:question_index])[1] > 90:
                question_indices_to_be_removed.append(question_index)
        for i in reversed(question_indices_to_be_removed):
            del self.keyphrases[i]
            del self.questions[i]
            del self.options[i]

    # count defines the number of MCQs to be generated, default value is 5
    def generate_mcqs(self, count=5):
        self.generate_keyphrases()
        self.filter_keyphrases()
        self.generate_options()
        self.shuffle_options()
        self.generate_questions()
        self.filter_redundant_questions()
        return self.questions[:count], self.options[:count], self.keyphrases[:count]

    def __del__(self):
        os.remove(self.filename)
