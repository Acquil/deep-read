import deepspeech
import wave
from os import listdir 
import numpy as np

model_file_path = 'deepspeech-0.6.0-models/output_graph.pbmm'
lm_file_path = 'deepspeech-0.6.0-models/lm.binary'
trie_file_path = 'deepspeech-0.6.0-models/trie'
beam_width = 500
model = deepspeech.Model(model_file_path, beam_width)
lm_alpha = 0.75
lm_beta = 1.85
model.enableDecoderWithLM(lm_file_path, trie_file_path, lm_alpha, lm_beta)

def convert(dir):
	"""
		dir: str directory of audio file chunks 
		returns: list of str
	"""
	data = []
	for file in listdir(dir):
	  w = wave.open(dir+file, 'r')
	  rate = w.getframerate()
	  frames = w.getnframes()
	  buffer = w.readframes(frames)
	  data16 = np.frombuffer(buffer, dtype=np.int16)
	  text = model.stt(data16)
	  if text not in data:
	    data.append(text)
	return data