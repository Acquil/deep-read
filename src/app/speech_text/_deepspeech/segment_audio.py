from pydub import AudioSegment
from pydub.silence import split_on_silence

def segment(filename,foldername):
	"""
		filename : str 
		foldername: str folder to put all the chunks
	"""
	sound_file = AudioSegment.from_file(filename)
	sound_file = sound_file.set_channels(1)
	sound_file = sound_file.set_frame_rate(16000)
	audio_chunks = split_on_silence(sound_file,min_silence_len=1000,silence_thresh=-60)

	for i, chunk in enumerate(audio_chunks):
	    out_file =  foldername+"/chunk{0}.wav".format(i)
	    print("exporting", out_file)
	    chunk.export(out_file, format="wav", bitrate="128")