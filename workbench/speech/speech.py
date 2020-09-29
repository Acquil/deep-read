#!/usr/bin/env python
from vosk import Model, KaldiRecognizer, SetLogLevel
from multiprocessing import Pool
import sys
import os
import wave
import json

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
        
    
    def to_valid_audio(self):
        '''
        Converts to mono PCM .wav
        '''
        # Audio file must be WAV format mono PCM
        # ffmpeg PCM conversion
        self._output_wav = "output.wav"
        sample_rate = 16000
        os.system("ffmpeg -loglevel quiet -i {0} -acodec pcm_s16le -ac 1 -ar {1} {2}"\
            .format(self.wav_audio, sample_rate, self._output_wav))
        
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

        while True:
            data = self._wf.readframes(frames)

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
    
        # Delete temp audio
        os.remove(self._output_wav)
        # Return
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
