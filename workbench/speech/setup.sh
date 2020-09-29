#!/usr/bin/env bash

echo "Installing required packages..."

REQUIRED_PKG="ffmpeg"
PKG_OK=$(dpkg-query -W --showformat='${Status}\n' $REQUIRED_PKG|grep "install ok installed")
echo Checking for $REQUIRED_PKG: $PKG_OK
if [ "" = "$PKG_OK" ]; then
  echo "No $REQUIRED_PKG. Setting up $REQUIRED_PKG."
  sudo apt-get --yes install $REQUIRED_PKG 
fi

echo -e "\n---------------------------------------------------------------------\n"

echo "Checking for speech-venv"
DIRECTORY="../speech-venv"
if [ ! -d "$DIRECTORY" ]; then
  # Control will enter here if $DIRECTORY doesn't exist.
    echo "Setting up venv"
    python3 -m venv ../speech-venv
    source ../speech-venv/bin/activate
    pip install -r ../requirements.txt
fi

echo -e "\n---------------------------------------------------------------------\n"

echo "Checking for VOSK model"
DIRECTORY="model"
if [ ! -d "$DIRECTORY" ]; then
    chmod +x get_model.sh
    ./get_model.sh
fi

echo -e "\n---------------------------------------------------------------------\n"

echo "Checking for input.wav"
if [ ! -f input.wav ]; then
    echo "File not found! Downloading..."
    chmod +x sample_audio.sh
    ./sample_audio.sh
fi



echo "Run source ../speech-venv/bin/activate"
echo "and run ./speech.py [your_audio.wav]"