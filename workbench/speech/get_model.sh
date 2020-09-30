#!/usr/bin/env bash

echo "Retrieving VOSK model"

echo "Generic"
# wget https://alphacephei.com/kaldi/models/vosk-model-en-us-aspire-0.2.zip
# unzip vosk-model-en-us-aspire-0.2.zip
# mv vosk-model-en-us-aspire-0.2 model
wget http://alphacephei.com/vosk/models/vosk-model-small-en-us-0.3.zip
unzip vosk-model-small-en-us-0.3.zip
mv vosk-model-small-en-us-0.3 model-generic

echo "Indian"
wget https://alphacephei.com/vosk/models/vosk-model-en-in-0.4.zip
unzip vosk-model-en-in-0.4.zip
mv vosk-model-en-in-0.4 model-indian
