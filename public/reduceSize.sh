for i in *.mp3;do
  ffmpeg -i "$i" -b:a 64k "a_$i"
done
