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
echo "Checking for VOSK models"
echo -e "---------------------------------------------------------------------"


if [ ! -d "$DIRECTORY_GENERIC" ]; then
    echo "Retrieving Generic Lightweight Model"
    wget http://alphacephei.com/vosk/models/vosk-model-small-en-us-0.3.zip
    unzip vosk-model-small-en-us-0.3.zip
    mv vosk-model-small-en-us-0.3 model-generic
    rm vosk-model-small-en-us-0.3.zip
fi
if [ ! -d "$DIRECTORY_INDIAN" ]; then
    echo "Retrieving Indian Lightweight Model"
    wget https://alphacephei.com/vosk/models/vosk-model-small-en-in-0.4.zip
    unzip vosk-model-small-en-in-0.4.zip
    mv vosk-model-small-en-in-0.4 model-indian
    rm vosk-model-small-en-in-0.4.zip
fi


echo -e "\n---------------------------------------------------------------------"
echo "Checking for venv"
echo -e "---------------------------------------------------------------------"

DIRECTORY="venv-01"
if [ ! -d "$DIRECTORY" ]; then
# Control will enter here if $DIRECTORY doesn't exist.
    echo "Setting up venv"
    python3 -m venv ./venv
    source ./venv/bin/activate
    pip install -r ./requirements.txt
fi


# echo -e "\n---------------------------------------------------------------------\n"
# Other dependencies go here
# echo -e "\n---------------------------------------------------------------------\n"


echo -e "\n---------------------------------------------------------------------"
echo "Done"
echo -e "---------------------------------------------------------------------"

chmod +x app.py
read -p "Run flask application? (Y/N)" yn
case $yn in
        [Yy]* ) ./app.py; break;;
        [Nn]* ) exit;;
        * ) echo "Assuming that's a no...exiting";;
esac
