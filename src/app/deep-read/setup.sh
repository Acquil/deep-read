#!/usr/bin/env bash

REQUIRED_PKG="ffmpeg python3-venv tesseract-ocr"
DIRECTORY_GENERIC="model-generic"
DIRECTORY_INDIAN="model-indian"
VENV_DIRECTORY=".venv"
GloVe_MODEL_DIRECTORY="../../../data/training/GloVe"
GloVe_MODEL_FILE="../../../data/training/GloVe/word2vec-glove.6B.300d.txt"

echo "Installing required packages..."

# Find our package manager
# Debian
if VERB="$( command -v apt-get )" 2> /dev/null; then
  
  PKG_OK=$(dpkg-query -W --showformat='${Status}\n' "$REQUIRED_PKG"|grep "install ok installed")
  echo Checking for "$REQUIRED_PKG": "$PKG_OK"
  if [ "" = "$PKG_OK" ]; then
    echo "No $REQUIRED_PKG. Setting up $REQUIRED_PKG."
    sudo apt-get --yes install "$REQUIRED_PKG"
  fi
  
# Arch based
elif VERB="$( command -v pacman )" 2> /dev/null; then
   echo "Arch-based"
   if pacman -Qs "$REQUIRED_PKG" > /dev/null ; then
      echo "$REQUIRED_PKG already installed"
   else
      sudo pacman -S "$REQUIRED_PKG"
   fi
   
else
   echo "Not Supported!" >&2
   exit 1

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

if [ ! -d "$VENV_DIRECTORY" ]; then
# Control will enter here if $DIRECTORY doesn't exist.
    echo "Setting up venv"
    python3 -m venv ./venv
    source ./venv/bin/activate
    pip install -r ./requirements.txt
fi



#Download CUDA
echo -e "\n---------------------------------------------------------------------\n"
CUDADirectory=/usr/local/cuda/
if [ ! -d "$CUDADirectory" ]; then   
    echo "Installing CUDA..."
    sh cuda_installation_script.sh
    echo "Installed CUDA"
fi
echo -e "\n---------------------------------------------------------------------\n"


#Download GloVe model
echo -e "\n---------------------------------------------------------------------\n"
echo "Checking GloVe model"
if [ ! -f "$GloVe_MODEL_FILE" ]; then
    # create directory(if non-existent)
    mkdir -p $GloVe_MODEL_DIRECTORY
    echo "GloVe Model not found"
    timeout 30s gdown "https://drive.google.com/uc?id=1ht_zpKv8uXM6LZhUuEpim3cLppLj9GWX" -O $GloVe_MODEL_FILE && echo "GloVe downloaded"
fi
echo -e "\n---------------------------------------------------------------------\n"


# Download Xception Model
echo -e "\n---------------------------------------------------------------------\n"
XceptionModel=../../../data/training/model_v3_xception
if [ ! -d "$XceptionModel" ]; then
   
    echo "Installing Xception Model..."
    mkdir -p ../../../data/training/model_v3_xception/assets
    mkdir -p ../../../data/training/model_v3_xception/variables

    SavedModel=../../../data/training/model_v3_xception/saved_model.pb
    gdown "https://drive.google.com/uc?id=1--ZA0bBYvh507b4LKgAvY29HAb0LWzCp" -O $SavedModel

    VariablesData=../../../data/training/model_v3_xception/variables/variables.data-00000-of-00001
    gdown "https://drive.google.com/uc?id=1-0w_iOTI8r5zoILvBqnRVnwDMdBCJWeu" -O $VariablesData

    VariablesIndex=../../../data/training/model_v3_xception/variables/variables.index
    gdown "https://drive.google.com/uc?id=1-BWqWDb1sWUyyHKPM7Vrv6rwDNRbnta1" -O $VariablesIndex

    echo "Installed Xception Model"
fi
echo -e "\n---------------------------------------------------------------------\n"


# spacy
echo -e "\n---------------------------------------------------------------------\n"
  echo "Downloading spacy"
  python -m spacy download en #This language pack is required for extracting keywords in MCQs
echo -e "\n---------------------------------------------------------------------\n"


echo -e "\n---------------------------------------------------------------------"
echo "Done"
echo -e "---------------------------------------------------------------------"

chmod +x app.py
read -rp "Run flask application? (Y/N)" yn
case $yn in
        [Yy]* ) ./app.py;;
        [Nn]* ) exit;;
        * ) echo "Assuming that's a no...exiting";;
esac
