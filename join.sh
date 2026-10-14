#!/bin/sh
# One film: scene 1 dissolves into scene 2 (2 s, bedtime in the box -> that night in the desert),
# scene 2 into scene 3 (3 s, the night sky -> morning on his star). Picture and sound cross together.
set -e
cd "$(dirname "$0")/render"
D1=$(ffprobe -v error -show_entries format=duration -of csv=p=0 Part1.mp4)
D2=$(ffprobe -v error -show_entries format=duration -of csv=p=0 Part2.mp4)
O1=$(python3 -c "print($D1-2)"); O2=$(python3 -c "print($D1+$D2-2-3)")
ffmpeg -v error -y -i Part1.mp4 -i Part2.mp4 -i Part3.mp4 -filter_complex \
 "[0:v][1:v]xfade=transition=fade:duration=2:offset=$O1[v12];[v12][2:v]xfade=transition=fade:duration=3:offset=$O2,format=yuv420p[v];\
  [0:a][1:a]acrossfade=d=2[a12];[a12][2:a]acrossfade=d=3[a]" \
 -map "[v]" -map "[a]" -c:v libx264 -crf 18 -preset slow -c:a aac -b:a 192k -movflags +faststart The_Sheep_in_the_Box.mp4
