#!/usr/bin/env python
from vosk import Model, KaldiRecognizer, SetLogLevel
from audiosplitter import SplitWavAudio
from multiprocessing import Pool, Process
from shutil import copyfile, rmtree
import sys
import os
import wave
import json

class RecognizerSegment:
    '''
    Converts .wav audio files to text. Uses vosk library internally.
    Use Recognizer for larger audio files

    Args:
        wav_audio   : Path to mono PCM .wav audio
        model       : Path to unzipped vosk model
                      Compatible models from https://alphacephei.com/vosk/models
    '''

    def __init__(self, wav_audio, model="model"):
        
        self.model = Model(model)
        self.wav_audio = wav_audio
        
        self.transcript = ""
        self.timestamped_text = []
        
    
    def to_valid_audio(self):
        '''
        Converts to mono PCM .wav
        Audio file must be WAV format mono PCM for transcribing
        '''
        # ffmpeg PCM conversion
        self._output_wav = self.wav_audio.split(".")[0] + "_converted.wav"
        sample_rate = 16000
        
        os.system("ffmpeg -loglevel quiet -i {0} -acodec pcm_s16le -ac 1 -ar {1} {2}"\
            .format(self.wav_audio,\
                    sample_rate, \
                    self._output_wav))
        
        # open converted .wav
        self._wf = wave.open(self._output_wav, "rb")    
        

    def transcribe(self, frames=None):
        '''
        Transcribes the text
        
        Args:
            frames      : Number of frames to read at a time.
        Returns:
            transcript  : Transcript of audio
        
        '''
        self.to_valid_audio()
        
        if frames is None:
            frames = self._wf.getnframes()
        
        rec = KaldiRecognizer(self.model, self._wf.getframerate())

        # Transcribe frames
        self.transcript, self.timestamped_text = self.__transcribe_frames(self._wf, rec, frames)
        # Delete temp audio
        self._delete_temp_audio()
        
        # Return
        return self.transcript


    def __transcribe_frames(self, wf, rec, frames):
        '''
        Helper function that reads frames from .wav and transcribes it

        Args:
            rec (KaldiRecognizer)   : Vosk KaldiRecognizer object
            frames (int)            : Number of frames to read at a time
        
        Returns:
            transcript      
            timestamped_text
        '''
        timestamped_text = []
        transcript       = ""
        
        while True:
            data = wf.readframes(frames)

            if len(data) == 0:
                break

            elif rec.AcceptWaveform(data):
                res = json.loads(rec.Result())
                for result in res['result']:
                    timestamped_text.append(result)
                        
                transcript += res['text']
                
        res = json.loads(rec.FinalResult())

        if len(res['text'])>0:
            for result in res['result']:
                timestamped_text.append(result)     
            transcript += res['text']

        return transcript, timestamped_text


    def get_timestamped_text(self):
        '''
        Returns:
            timestamped_text: list of words spoken along with corresponding timestamps and confidence

        '''
        return self.timestamped_text

    
    def get_transcript(self):
        '''
        Returns:
            transcript: transcript of audio file
        '''
        return self.transcript

    def _delete_temp_audio(self):
        '''
        Deletes PCM .wav files that were created
        '''
        os.remove(self._output_wav)
    

class Recognizer:
    '''
    Converts .wav audio files to text. Uses RecognizerSegement & Vosk internally.
    Use RecognizerSegment for very small audio files (less than 1 min duration)

    Args:
        wav_audio    :
        model        :
        workers      :
        min_per_split:
    '''
    def __init__(self, wav_audio, model = "model" ,workers = 4, min_per_split = 1):
       
        # //TODO shold 'chunks' instead have a unique name
        self.__folder       = 'chunks'

        self.file           = wav_audio
        self.model          = model

        self.workers      = workers
        self.min_per_split  = min_per_split
        
        self.transcript = ""
        self.timestamped_text = []
    

    def __split(self, file, folder, min_per_split):
        '''
        Split audio into chunks. Uses audiosplitter.py
        '''
        os.mkdir(folder)
        copyfile(file, f"{folder}/{file}")

        split_wav = SplitWavAudio(folder, file)
        number_of_splits = split_wav.multiple_split(min_per_split)
        return number_of_splits

        
    def __get_segments(self, file, folder, number_of_splits):
        '''
        Get the filenames of segments
        '''
        files = []
        for i in range(number_of_splits):
            files.append(str(i)+ f" {folder}/" + str(i) + f"_{file}")
        return files


    def transcribe_chunks(self, files):
        '''
        Helper function to transcribe chunks of audio

        Returns:
            transcript
        '''
        uid, filename = files.split()
        r = RecognizerSegment(wav_audio = filename)
        r.transcribe()
        # //TODO timestamped_text
        return (uid + " : " + r.transcript)


    def transcribe(self):
        '''
        Transcribes the text
       
        Returns:
            transcript  : Transcript of audio
        '''
        # Split audio into chunks
        n_splits = self.__split(
            self.file,
            self.__folder,
            self.min_per_split
        )
        # Get files
        files = self.__get_segments(
            number_of_splits = n_splits,
            folder = self.__folder,
            file = self.file
        )
        # Map to worker pool
        p = Pool(self.workers) 
        texts = p.map(self.transcribe_chunks, files)   
        self.transcript = "\n".join(texts)
        
        # cleanup
        p.close()
        p.join()
        # remove chunks
        self._delete_temp_chunks()
        return self.transcript


    def _delete_temp_chunks(self):
        '''
        Deletes PCM .wav file chunks that were created
        '''
        rmtree(self.__folder)



# Main
if __name__ == "__main__":
    r = Recognizer(wav_audio = sys.argv[1], workers=8)
    r.transcribe()
    print(r.transcript)
