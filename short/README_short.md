# The Sheep in the Box: film project (Remotion + GSAP)

The whole film lives in one Remotion project. GSAP moves the puppets; Remotion puts the parts in order,
keeps the sound in sync and renders the video.

## Watch and scrub it in your browser

    npm install
    npm run studio

Pick `Part1`, `Part2` or `Film` (all parts joined) on the left.

## Render a video

    npm run render:part2      (or render:part1 / render:film)

## Files

- `src/index.jsx`: the compositions (Part1, Part2, Film). 24 fps, 1920×804.
- `src/Stage.jsx`: mounts a part's drawing once, then seeks its GSAP timeline to the current frame.
- `src/sheep.js`: the sheep puppet (SVG, with the unfinished back, ear tip and hind leg).
- `src/part1.js`: Part 1, the paper and the box (ported from `animation_source/film1.html`).
- `src/part2.js`: Part 2, the desert at night, the hunger and the flower with three petals.
- `public/img/`: background plates, paper, the hand. `public/audio/`: each part's sound.
- `audio2.py`: builds Part 2's sound (wind, hooves, tummy, bells, and "Our Corner" from 0:30).
  `python audio2.py <our-corner.mp3> public/audio/part2.wav`

## Notes

- Real GSAP is used now (the old `gsap-lite.js` stand-in is no longer needed).
  `gsap.defaults({ lazy: false })` is required, because every frame is a fresh seek.
- Don't put `transform="scale(1 0)"` on SVG parts that GSAP scales: GSAP reads that flat matrix and
  puts the origin in the wrong place (this is why the eyelids are plain ellipses in `sheep.js`).
- Remotion is free for individuals and companies of up to 3 people; bigger companies need a licence.
