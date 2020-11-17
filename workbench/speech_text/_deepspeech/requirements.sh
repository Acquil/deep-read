#!/usr/bin/env bash

pip install -r requirements.txt
curl -LO https://github.com/mozilla/DeepSpeech/releases/download/v0.6.0/deepspeech-0.6.0-models.tar.gz
tar -xvzf deepspeech-0.6.0-models.tar.gz
