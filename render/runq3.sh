#!/bin/bash
# Chunked render queue (survives container restarts): each sequence is rendered in 30 s video-only chunks,
# then joined and muxed with its wav into render/SEQ.mp4. Re-running skips finished chunks.
cd "$(dirname "$0")/.."
mkdir -p render/chunks
BR=/opt/pw-browsers/chromium_headless_shell-1194/chrome-linux/headless_shell
CH=720
while read -r s; do
  [ -z "$s" ] && continue; [ -f render/$s.mp4 ] && continue
  low=$(echo $s | sed 's/^Seq/seq/')
  N=$(node --no-warnings --input-type=module -e "const m=await import('./src/$low.js');console.log(Math.round(m.DURATION*24))")
  [ -z "$N" ] && { echo "$(date +%T) no duration for $s" >> render/queue.log; continue; }
  for ((a=0; a<N; a+=CH)); do
    b=$((a+CH-1)); [ $b -ge $N ] && b=$((N-1))
    out=render/chunks/${s}_$(printf %05d $a).mp4
    [ -f $out ] && continue
    echo "$(date +%T) $s frames $a-$b of $N" >> render/queue.log
    if npx remotion render src/index.jsx $s render/chunks/part.mp4 --frames=$a-$b --muted --browser-executable=$BR --concurrency=4 --crf=18 --log=error > render/$s.log 2>&1; then
      mv render/chunks/part.mp4 $out
    else echo "$(date +%T) FAILED $s $a" >> render/queue.log; continue 2; fi
  done
  ls render/chunks/${s}_*.mp4 | sort | sed "s#^render/chunks/#file '#; s#\$#'#" > render/chunks/$s.txt
  ffmpeg -loglevel error -y -f concat -safe 0 -i render/chunks/$s.txt -i public/audio/$low.wav -map 0:v -map 1:a -c:v copy -c:a aac -b:a 192k -shortest render/$s.tmp.mp4 && mv render/$s.tmp.mp4 render/$s.mp4 && echo "$(date +%T) done $s" >> render/queue.log
done < render/queue.txt
echo "$(date +%T) queue pass finished" >> render/queue.log
