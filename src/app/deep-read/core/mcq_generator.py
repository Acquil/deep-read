import nltk
nltk.download('stopwords')
import pke
import string
import os
import uuid
import re
from nltk.corpus import stopwords
from fuzzywuzzy import fuzz
from fuzzywuzzy import process
import gensim
from gensim.test.utils import datapath, get_tmpfile
from gensim.models import KeyedVectors
import random


"""Generates MCQs from a given text

Parameters
----------
text : str
    The string content for which MCQs will be generated

"""
class MCQ_Generator():

    word2vec_file = '/content/drive/My Drive/Open Source/Incorrect_Options_Suggester/glove.6B/word2vec-glove.6B.300d.txt'
    model = KeyedVectors.load_word2vec_format(word2vec_file)

    def __init__(self, text):
        self.text = text
        self.filename = str(uuid.uuid1())+'.txt'
        f = open(self.filename, "w")
        f.write(self.text)
        f.close()
    
    # Keyphrases are generated using single rank method
    def generate_keyphrases(self,n=30): 
        pos = {'NOUN'}
        extractor = pke.unsupervised.SingleRank()
        extractor.load_document(input=self.filename, language='en')
        extractor.candidate_selection(pos=pos)
        extractor.candidate_weighting(window=2,pos=pos)
        
        keyphrases_and_scores = extractor.get_n_best(n=n)
        self.keyphrases = [keyphrase_and_score[0] for keyphrase_and_score in keyphrases_and_scores]
        return self.keyphrases
    

    # filter keyphrases that has more than 2 words
    def filter_keyphrases(self,n=15): 
        keyphrase_indices_to_be_removed = []
        for keyphrase_index in range(len(self.keyphrases)):
          if len(self.keyphrases[keyphrase_index].split(' ')) > 2:
            keyphrase_indices_to_be_removed.append(keyphrase_index)
        for i in reversed(keyphrase_indices_to_be_removed):
          del self.keyphrases[i]

    def generate_distractors(self, answer, count): #distractors are incorrect options     
        ##Extracting closest words for the answer. 
        try:
            closestWords = MCQ_Generator.model.most_similar(positive=answer, topn=count) #[answer]
        except:
            #In case the word is not in the vocabulary, or other problem not loading embeddings
            return []

        #Return count many distractors
        distractors = list(map(lambda x: x[0], closestWords))[0:count]
        
        return distractors

    def generate_options(self, count=4):   
        self.options = [] 
        for keyphrase in self.keyphrases:
            keywords = keyphrase.split(' ')

            distractors =  self.generate_distractors(keywords[0], 10)
            lemmatized_distractors = [] #distractors after re
            for distractor in distractors:
                if fuzz.partial_ratio(keywords[0].lower(), distractor.lower()) < 75:
                    if len(lemmatized_distractors)<1 or process.extractOne(distractor.lower(), lemmatized_distractors)[1] < 75:
                      if len(keywords) > 1:
                        distractor += " " + " ".join(keywords[1:])
                      lemmatized_distractors.append(distractor)

            options_for_keyphrase = []
            options_for_keyphrase.append(keyphrase)
            options_for_keyphrase.extend(lemmatized_distractors[:3])
            self.options.append(options_for_keyphrase)

    def shuffle_options(self):
      for option in self.options:
        random.shuffle(option)
    
    def generate_questions(self):
      self.questions = [0]*len(self.options)
      sentences = self.text.split('.')
      for sentence in sentences:
        for i in range(len(self.keyphrases)):
          if self.questions[i] == 0 and self.keyphrases[i].lower() in sentence.lower():
            self.questions[i] = sentence.lower().replace(self.keyphrases[i].lower(),"___________",1)
    
    def filter_redundant_questions(self):
      question_indices_to_be_removed = []
      for question_index in range(1,len(self.questions)):
          if process.extractOne(self.questions[question_index], self.questions[:question_index])[1] > 90:
            question_indices_to_be_removed.append(question_index)
      for i in reversed(question_indices_to_be_removed):
        del self.keyphrases[i]
        del self.questions[i]
        del self.options[i]
          
    #count defines the number of MCQs to be generated, default value is 5
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