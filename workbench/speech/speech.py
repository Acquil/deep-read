#!/usr/bin/env python
from vosk import Model, KaldiRecognizer, SetLogLevel
import sys
import os
import wave
import json
import subprocess

class Recognizer:
    '''
    Converts .wav audio files to text. 
    Uses vosk library internally.

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

        self._wf = wave.open(wav_audio)    
        
    
    def is_valid_audio(self):
        '''
        Checks if  wav_audio is valid
        '''
        if self._wf.getnchannels() != 1 or self._wf.getsampwidth() != 2 or self._wf.getcomptype() != "NONE":
            raise ValueError#, ("Audio file must be WAV format mono PCM")


    def transcribe(self, frames=None):
        '''
        Transcribes the text
        
        Args:
            frames      : Number of frames to read at a time.
        Returns:
            transcript  : Transcript of audio
        
        '''
        self.is_valid_audio()
        
        if frames is None:
            frames = self._wf.getnframes()
        
        rec = KaldiRecognizer(self.model, self._wf.getframerate())

        sample_rate = 16000
        process = subprocess.Popen(['ffmpeg', '-loglevel', 'quiet', '-i',
                            self.wav_audio,
                            '-ar', str(sample_rate) , '-ac', '1', '-f', 's16le', '-'],
                            stdout=subprocess.PIPE)
        
        while True:
            # data = self._wf.readframes(frames)
            data = process.stdout.read(4000)

            if len(data) == 0:
                break

            elif rec.AcceptWaveform(data):
                res = json.loads(rec.Result())
                for result in res['result']:
                    self.timestamped_text.append(result)
                        
                self.transcript += res['text'] + ". "
                
        res = json.loads(rec.FinalResult())

        if len(res['text'])>0:
            for result in res['result']:
                self.timestamped_text.append(result)     
            self.transcript += res['text'] + "."
    
        return self.transcript


    def get_timestamped_text(self):
        '''
        Returns:
            timestamped_text: list of words spoken along with corresponding timestamps and confidence

        '''
        return self.timestamped_text


# Main
if __name__ == "__main__":
    r = Recognizer(wav_audio="input.wav")
    r.transcribe()
    print(r.transcript)
