from text_to_sentence_converter import Text_to_Sentence_Converter

text = """ Read()

* The syntax of the read system call is

* number=read(fd, buffer}
* fds the file descriptor returned by open

* buffer is the address of a data structure in the user process that will contain
the read data on successful completion of the call

* count is the number of bytes the user wants to read
* number is the number of bytes actually read"""

text_to_sentence_converter = Text_to_Sentence_Converter(text)
sentences = text_to_sentence_converter.convert()

for i in range(0,len(sentences)):
    print("Sentence",i)
    print("    ",sentences[i])