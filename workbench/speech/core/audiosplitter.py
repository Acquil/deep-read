#!/usr/bin/env python
from pydub import AudioSegment
from pydub.silence import split_on_silence
import math

class SplitWavAudio():
    def __init__(self, folder, filename):
        self.folder = folder
        self.filename = filename
        self.filepath = folder + '/' + filename
        
        self.audio = AudioSegment.from_wav(self.filepath)
    
    def get_duration(self):
        return self.audio.duration_seconds
    
    def single_split(self, from_min, to_min, split_filename):
        t1 = from_min * 60 * 1000
        t2 = to_min * 60 * 1000
        split_audio = self.audio[t1:t2]
        split_audio.export(self.folder + '/' + split_filename, format="wav")
        
    def multiple_split(self, min_per_split):
        total_mins = math.ceil(self.get_duration() / 60)
        number_splits = total_mins - min_per_split
        
        for i in range(0, total_mins, min_per_split):
            split_fn = str(i) + '_' + self.filename
            self.single_split(i, i+min_per_split, split_fn)
            print(str(i) + ' Done')
            if i == total_mins - min_per_split:
                print('All splitted successfully')
                number_splits = i
        
        return number_splits

    def split_silence(self, min_per_split):
        '''
        Splits audio without abruptly cutting words.

        Args:
            min_per_split : Number of minutes per split
        '''
        dBFS = self.audio.dBFS
        chunks = split_on_silence(
            self.audio, 
            min_silence_len = 500, # atleast 0.5 seconds
            silence_thresh = dBFS-16,
            keep_silence = 250 #optional
        )
        #setting minimum length of each chunk
        target_length = min_per_split * 60 * 1000 

        output_chunks = [chunks[0]]
        
        for chunk in chunks[1:]:
            if len(output_chunks[-1]) < target_length:
                # add to last segment if smaller than target length
                output_chunks[-1] += chunk
            else:
                # if the last output chunk is longer than the target length,
                # we can start a new one
                output_chunks.append(chunk)
                
        i=0
        for c in output_chunks:
            chunk_filename = str(i) + '_' + self.filename
            c.export(self.folder + '/' + chunk_filename, format="wav")
            i += 1

        print(f"Number of chunks = {len(output_chunks)}")
        print("Done")
        return len(output_chunks)
