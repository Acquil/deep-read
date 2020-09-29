#!/usr/bin/env bash

wget https://webgate.ec.europa.eu/sr-files/vod/9d64e8c6bacfd2a98415686a6af75cfd/node/sr-speech_29159_482.mp4
mv sr-speech_29159_482.mp4 input.mp4
ffmpeg -i input.mp4 -vn input.wav
ffmpeg -i input.wav -acodec pcm_s16le -ac 1 -ar 16000 output.wav