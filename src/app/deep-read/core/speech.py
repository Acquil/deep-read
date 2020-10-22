#!/usr/bin/env python
from vosk import Model, KaldiRecognizer, SetLogLevel
from core.audiosplitter import SplitWavAudio
from multiprocessing import Pool, Process
from shutil import copyfile, rmtree
import sys
import os
import wave
import json
import uuid
import pandas as pd

class RecognizerSegment:
    """
    Converts .wav audio files to text. Uses vosk library internally.
    Use Recognizer for larger audio files

    Args:
        wav_audio   : Path to mono PCM .wav audio
        model       : Path to unzipped vosk model
                      Compatible models from https://alphacephei.com/vosk/models
    """

    def __init__(self, wav_audio, model="model-indian"):
        
        self.model = Model(model)
        self.wav_audio = wav_audio
        
        self.transcript = ""
        self.timestamped_text = []
        self._wf = None
        self._output_wav = None
        # Remove logging
        SetLogLevel(-1)
    
    def to_valid_audio(self):
        """
        Converts to mono PCM .wav
        Audio file must be WAV format mono PCM for transcribing
        """
        # ffmpeg PCM conversion
        self._output_wav = self.wav_audio.split(".")[0] + "_converted.wav"
        sample_rate = 16000
        
        os.system("ffmpeg  -loglevel quiet -i {0} -acodec pcm_s16le -ac 1 -ar {1} {2}"\
            .format(self.wav_audio,
                    sample_rate,
                    self._output_wav))
        
        # open converted .wav
        self._wf = wave.open(self._output_wav, "rb")    
        

    def transcribe(self, frames=None):
        """
        Transcribes the text

        Args:
            frames      : Number of frames to read at a time.
        Returns:
            transcript  : Transcript of audio

        """
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
        """
        Helper function that reads frames from .wav and transcribes it

        Args:
            rec (KaldiRecognizer)   : Vosk KaldiRecognizer object
            frames (int)            : Number of frames to read at a time

        Returns:
            transcript
            timestamped_text
        """
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
        """
        Returns:
            timestamped_text: list of words spoken along with corresponding timestamps and confidence

        """
        return self.timestamped_text

    
    def get_transcript(self):
        """
        Returns:
            transcript: transcript of audio file
        """
        return self.transcript

    def _delete_temp_audio(self):
        """
        Deletes PCM .wav files that were created
        """
        os.remove(self._output_wav)
    

class Recognizer:
    """
    Converts .wav audio files to text. Uses RecognizerSegement & Vosk internally.
    Use RecognizerSegment for very small audio files (less than 1 min duration)

    Args:
        wav_audio       : Audio file to be transcribed
        model           : Model to be used.
                          Available models=[model-indian, model-generic]
        workers         : Number of subprocesses to spawn
        min_per_split   : Number of minutes to split the audio by.
    """
    def __init__(self, wav_audio, model = "model-indian" ,workers = 4, min_per_split = 3):
       
        self.__folder       = 'core/chunks_' + str(uuid.uuid4())

        self.file           = wav_audio
        self.model          = model

        self.workers        = workers
        self.min_per_split  = min_per_split
        
        self.transcript = ""
        self.timestamped_text = []
    

    def __split(self, file, folder, min_per_split):
        """
        Split audio into chunks. Uses audiosplitter.py
        """
        os.mkdir(folder)
        # copy file to directory but without folder prefixes
        copyfile(file, f"{folder}/{file.split('/')[-1]}")
        file = file.split('/')[-1]
        split_wav = SplitWavAudio(folder, file)
        # //TODO audio files should not be split in the middle of a word. See split_silence(min_per_split)
        number_of_splits = split_wav.multiple_split(min_per_split)
        return number_of_splits

        
    def __get_segments(self, file, folder, number_of_splits):
        '''
        Get the filenames of segments
        '''
        files = []
        files = sorted(os.listdir(folder))
        files.remove(file)
        # files = list(map(lambda x: folder+"/"+x, files))
        temp = []
        for i in range(len(files)):
            temp.append(str(i)+ " "+ folder+"/"+files[i])
        return temp


    def transcribe_chunks(self, files):
        """
        Helper function to transcribe chunks of audio

        Returns:
            transcript
        """
        uid, filename = files.split()
        r = RecognizerSegment(wav_audio = filename, model=self.model)
        r.transcribe()
        return uid, r.transcript, r.get_timestamped_text()


    def transcribe(self):
        """
        Transcribes the text

        Returns:
            transcript  : Transcript of audio
        """
        try:
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
                file = self.file.split("/")[-1]
            )
            # Map to worker pool
            p = Pool(self.workers) 
            result = p.map(self.transcribe_chunks, files)   
            
            df = pd.DataFrame(result)
            
            def add_time(i,ld):
                for d in ld:
                    d['start'] = d['start']+60*int(i)
                    d['end'] = d['end']+60*int(i)

                return ld

            df[2] = df.apply(lambda x: add_time(x[0],x[2]), axis=1)
            df = df.set_index(0)
            df = df.sort_index()
            # Finish sorting

            # Flatten list of lists to single list
            # for item in df[1].tolist():
                # self.transcript += item
            # Flatten list of list of dicts to list of dicts
            self.timestamped_text = [item for sublist in df[2].tolist() for item in sublist]

            # //TODO adding punctuations
            df = pd.DataFrame(self.timestamped_text)
            df['next_start'] = df['start'].shift(-1)
            df['interval'] = df.apply(lambda row: float(row['next_start']) - float(row['end']), axis=1)
            # //TODO change interval
            df.loc[df['interval'] > 0.5, 'word'] = df['word'].apply(lambda x: x + ".")
            self.transcript = ' '.join(df['word'].to_list()) + "."

            self.timestamped_text = json.dumps(self.timestamped_text)
            # cleanup
            p.close()
            p.join()
    
            return self.transcript

        finally:
            # remove chunks
            self._delete_temp_chunks()
    


    def _delete_temp_chunks(self):
        """
        Deletes PCM .wav file chunks that were created
        """
        rmtree(self.__folder)
