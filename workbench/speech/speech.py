from vosk import Model, KaldiRecognizer, SetLogLevel
import sys
import os
import wave

class Recognizer:
    '''
    Converts .wav audio files to text. 
    Uses vosk library internally.

    Attributes:
        model       : Compatible models from https://alphacephei.com/vosk/models
        wav_audio   : Mono PCM .wav audio
        transcript  : 
        timestamped_text:
    '''

    def __init__(self, model, wav_audio):
        self.model = model
        self.wav_audio = wav_audio
        
        self.transcript = ""
        self.timestamped_text = []
