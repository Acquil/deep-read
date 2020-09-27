from convert_audio_text import convert
import segment_audio
import segment_text


file_name = '/content/Welcome.wav'
# create a folder to put chunks
folder_name = '/content/chunks/'

segment_audio.segment(file_name,folder_name)
text = convert(folder_name)
seg_text = segment_text.segment(text)
print(seg_text)
