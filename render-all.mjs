// Renders every scene of the feature film, then joins them into one film with 1-second dissolves.
// Usage:  node render-all.mjs          (renders what is missing, then joins)
//         node render-all.mjs Seq05    (renders just one scene)
// Finished scenes are kept in out/, so you can stop at any time and run it again to carry on.
import {spawnSync} from 'child_process';
import fs from 'fs';

const SCENES = ['Seq01', 'Seq02', 'Seq03', 'Seq04a', 'Seq04b', 'Seq05', 'Seq06', 'Seq07a', 'Seq07b', 'Seq07c',
  'Seq08a', 'Seq08b', 'Seq09', 'Seq10', 'Seq11', 'Seq12', 'Seq12b', 'Credits'];
const XF = 1.0;
const run = (cmd) => { console.log('\n> ' + cmd); const r = spawnSync(cmd, {shell: true, stdio: 'inherit'}); if (r.status !== 0) throw new Error('failed: ' + cmd); };
const probe = (f) => parseFloat(spawnSync(`npx remotion ffprobe -v error -show_entries format=duration -of csv=p=0 "${f}"`, {shell: true}).stdout.toString());

fs.mkdirSync('out', {recursive: true});
const only = process.argv[2];
for (const s of only ? [only] : SCENES) {
  const out = `out/${s}.mp4`;
  if (fs.existsSync(out)) { console.log(`${s}: already rendered`); continue; }
  const t0 = Date.now();
  run(`npx remotion render src/index.jsx ${s} out/${s}.part.mp4 --crf=18`);
  fs.renameSync(`out/${s}.part.mp4`, out);
  console.log(`${s}: done in ${((Date.now() - t0) / 60000).toFixed(1)} min`);
}
if (only) process.exit(0);

const files = SCENES.map((s) => `out/${s}.mp4`), D = files.map(probe);
let fc = [], v = '[0:v]', a = '[0:a]', off = 0;
for (let i = 1; i < files.length; i++) {
  off += D[i - 1] - XF;
  fc.push(`${v}[${i}:v]xfade=transition=fade:duration=${XF}:offset=${off.toFixed(3)}[v${i}]`); v = `[v${i}]`;
  fc.push(`${a}[${i}:a]acrossfade=d=${XF}[a${i}]`); a = `[a${i}]`;
}
fs.writeFileSync('out/join.txt', fc.join(';\n'));
run(`npx remotion ffmpeg -y ${files.map((f) => `-i "${f}"`).join(' ')} -filter_complex_script out/join.txt -map "${v}" -map "${a}" ` +
  `-c:v libx264 -preset medium -crf 19 -pix_fmt yuv420p -c:a aac -b:a 192k -movflags +faststart "out/The_Sheep_in_the_Box_Feature.mp4"`);
console.log('\nFinished: out/The_Sheep_in_the_Box_Feature.mp4');
