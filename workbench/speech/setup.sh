#!/usr/bin/env bash

REQUIRED_PKG="ffmpeg python3-venv"
DIRECTORY_GENERIC="model-generic"
DIRECTORY_INDIAN="model-indian"

echo "Installing required packages..."

PKG_OK=$(dpkg-query -W --showformat='${Status}\n' $REQUIRED_PKG|grep "install ok installed")
echo Checking for $REQUIRED_PKG: $PKG_OK
if [ "" = "$PKG_OK" ]; then
  echo "No $REQUIRED_PKG. Setting up $REQUIRED_PKG."
  sudo apt-get --yes install $REQUIRED_PKG 
fi

echo -e "\n---------------------------------------------------------------------"
echo "Checking for speech-venv"
echo -e "---------------------------------------------------------------------"

DIRECTORY="../speech-venv"
if [ ! -d "$DIRECTORY" ]; then
# Control will enter here if $DIRECTORY doesn't exist.
    echo "Setting up venv"
    python3 -m venv ../speech-venv
    source ../speech-venv/bin/activate
    pip install -r ../requirements.txt
fi

echo -e "\n---------------------------------------------------------------------"
echo "Checking for VOSK models"
echo -e "---------------------------------------------------------------------"


if [ ! -d "$DIRECTORY_GENERIC" ]; then
    echo "Retrieving Generic Lightweight Model"
    wget http://alphacephei.com/vosk/models/vosk-model-small-en-us-0.3.zip
    unzip vosk-model-small-en-us-0.3.zip
    mv vosk-model-small-en-us-0.3 model-generic
fi
if [ ! -d "$DIRECTORY_INDIAN" ]; then
    echo "Retrieving Indian Lightweight Model"
    wget https://alphacephei.com/vosk/models/vosk-model-small-en-in-0.4.zip
    unzip vosk-model-small-en-in-0.4.zip
    mv vosk-model-small-en-in-0.4 model-indian
fi

echo -e "\n---------------------------------------------------------------------\n"

echo "Checking for sample test audio: input.wav"
if [ ! -f input.wav ]; then
    echo "File not found! Downloading..."
    chmod +x sample_audio.sh
    ./sample_audio.sh
fi



echo -e "\n---------------------------------------------------------------------"
echo "Done"
echo -e "---------------------------------------------------------------------"

echo "Run source ../speech-venv/bin/activate"
echo "and run ./speech.py [your_audio.wav]"
echo "Audio file must be in '/speech' directory"
