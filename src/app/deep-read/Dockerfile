# FROM nvidia/cuda:10.2-base #32 bit? mamy pip packages fail to install
# CMD nvidia-smi
FROM python:3.8.6


#set up environment
RUN apt-get update && apt-get -y install apt-utils\
    && apt-get install --no-install-recommends --no-install-suggests -y curl \
    && apt-get -y install wget \
    && apt-get install unzip \
    && apt-get -y install git \
    # && apt-get -y install python3 \
    # && apt-get -y install python3-pip \
    && apt-get -y install ffmpeg \
    && apt-get -y install tesseract-ocr


WORKDIR usr/src/app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
# Copy all files to container
COPY . .

# Vosk models - replace from https://alphacephei.com/vosk/models
RUN wget -q https://alphacephei.com/vosk/models/vosk-model-en-us-daanzu-20200905.zip \
    && unzip vosk-model-en-us-daanzu-20200905.zip \
    && mv vosk-model-en-us-daanzu-20200905 model-generic \
    && rm vosk-model-en-us-daanzu-20200905.zip 

RUN wget -q https://alphacephei.com/vosk/models/vosk-model-en-in-0.4.zip \
    && unzip vosk-model-en-in-0.4.zip \
    && mv vosk-model-en-in-0.4 model-indian \
    && rm vosk-model-en-in-0.4.zip 

WORKDIR usr/src/app/data/training
# pip3 otherwise
RUN pip install gdown \
    && mkdir -p GloVe \
    && gdown "https://drive.google.com/uc?id=1ht_zpKv8uXM6LZhUuEpim3cLppLj9GWX" -O GloVe/word2vec-glove.6B.300d.txt \
    && echo "GloVe model downloaded"

RUN mkdir -p model_v3_xception/assets \
    && mkdir -p model_v3_xception/variables \
    && gdown "https://drive.google.com/uc?id=1--ZA0bBYvh507b4LKgAvY29HAb0LWzCp" -O model_v3_xception/saved_model.pb \
    && gdown "https://drive.google.com/uc?id=1-0w_iOTI8r5zoILvBqnRVnwDMdBCJWeu" -O model_v3_xception/variables/variables.data-00000-of-00001 \
    && gdown "https://drive.google.com/uc?id=1-BWqWDb1sWUyyHKPM7Vrv6rwDNRbnta1" -O model_v3_xception/variables/variables.index \
    && echo "Xception model downloaded"


WORKDIR usr/src/app

RUN python3 -m spacy download en

# $ cat env.list
# # This is a comment
# VAR1=value1
# VAR2=value2
# USER

# $ docker run --env-file env.list ubuntu env | grep VAR
# VAR1=value1
# VAR2=value2
# USER=denis

# CMD ["python3", "train_and_eval.py"]
