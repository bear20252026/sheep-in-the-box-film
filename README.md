# The Sheep in the Box — animated film made in code

A one-hour animated feature (45 min cut), plus the original short, both built with **Remotion + GSAP**.
Each scene is a React/JS file. GSAP moves everything on a timeline, and Remotion renders it frame by frame in headless Chrome.
Subtitles are in English and 中文. There are no voices: the sound is music and effects synthesized in Python.

## Layout
| Path | What it is |
|---|---|
| `src/seq01.js` … `src/seq12b.js`, `src/credits.js` | one file per scene of the feature |
| `src/part1.js` … `src/part3.js` | the original short film |
| `src/characters.js`, `src/sheep.js`, `src/planetkit.js`, `src/cinema.js` | shared characters, planet sets and camera/grade helpers |
| `src/animatic/` | the 60-minute storyboard animatic |
| `public/img/` | painted plates, paper texture and credit images |
| `sound/seqNN.py` | makes each scene's sound track |
| `render-all.mjs`, `render/runq3.sh`, `join.sh` | render scripts (PC and Linux) |
| `short/` | audio scripts and notes from the short film |
| `docs/` | story plan and full script |

## Render
Requires Node.js 18+, Python 3 with numpy/scipy, and ffmpeg.

```bash
npm install
# make the sound files first (they are too big to keep in git)
for f in sound/seq*.py; do n=$(basename $f .py); python3 $f public/audio/$n.wav; done
node render-all.mjs            # renders every scene into out/, then joins the film
node render-all.mjs Seq05      # one scene only
npm run studio                 # watch it live in the browser
```
See `HOW-TO-RENDER.txt` for the step-by-step version.
