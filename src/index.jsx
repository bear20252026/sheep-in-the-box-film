import React from 'react';
import {registerRoot, Composition, Series, Audio, staticFile, AbsoluteFill, useCurrentFrame, interpolate} from 'remotion';
import {Stage} from './Stage.jsx';
import * as part1 from './part1.js';
import * as part2 from './part2.js';
import * as part3 from './part3.js';
import * as seq01 from './seq01.js';
import * as seq02 from './seq02.js';
import * as seq03 from './seq03.js';
import * as seq04a from './seq04a.js';
import * as seq04b from './seq04b.js';
import * as seq05 from './seq05.js';
import * as seq06 from './seq06.js';
import * as seq07a from './seq07a.js';
import * as seq07b from './seq07b.js';
import * as seq07c from './seq07c.js';
import * as seq08a from './seq08a.js';
import * as seq08b from './seq08b.js';
import * as seq09 from './seq09.js';
import * as seq10 from './seq10.js';
import * as seq11 from './seq11.js';
import * as seq12 from './seq12.js';
import * as seq12b from './seq12b.js';
import * as credits from './credits.js';
import {Animatic} from './animatic/Animatic.jsx';
import {TOTAL as ANIM_TOTAL} from './animatic/shots.js';

const FPS = 24;
const P1 = Math.round(part1.DURATION * FPS);
const P2 = Math.round(part2.DURATION * FPS);
const P3 = Math.round(part3.DURATION * FPS);

// one scene; `xf` frames of dissolve in from the scene before (picture and sound)
const Part = ({part, audio, xf = 0}) => {
  const f = useCurrentFrame();
  const k = xf ? interpolate(f, [0, xf], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1;
  return (
    <AbsoluteFill style={{opacity: k}}>
      <Stage part={part} />
      <Audio src={staticFile(audio)} volume={(fr) => (xf ? interpolate(fr, [0, xf], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}) : 1)} />
    </AbsoluteFill>
  );
};

// Film is a plain preview of the three scenes back to back. The finished film is joined with
// ffmpeg dissolves (join.sh), because two Stages can't share one page during an overlap (same element ids).

const Film = () => (
  <Series>
    <Series.Sequence durationInFrames={P1}><Part part={part1} audio="audio/part1.wav" /></Series.Sequence>
    <Series.Sequence durationInFrames={P2}><Part part={part2} audio="audio/part2.wav" /></Series.Sequence>
    <Series.Sequence durationInFrames={P3}><Part part={part3} audio="audio/part3.wav" /></Series.Sequence>
  </Series>
);

const Root = () => (
  <>
    <Composition id="Part1" component={() => <Part part={part1} audio="audio/part1.wav" />} durationInFrames={P1} fps={FPS} width={1920} height={804} />
    <Composition id="Part2" component={() => <Part part={part2} audio="audio/part2.wav" />} durationInFrames={P2} fps={FPS} width={1920} height={804} />
    <Composition id="Part3" component={() => <Part part={part3} audio="audio/part3.wav" />} durationInFrames={P3} fps={FPS} width={1920} height={804} />
    <Composition id="Seq01" component={() => <Part part={seq01} audio="audio/seq01.wav" />} durationInFrames={Math.round(seq01.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq02" component={() => <Part part={seq02} audio="audio/seq02.wav" />} durationInFrames={Math.round(seq02.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq03" component={() => <Part part={seq03} audio="audio/seq03.wav" />} durationInFrames={Math.round(seq03.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq04a" component={() => <Part part={seq04a} audio="audio/seq04a.wav" />} durationInFrames={Math.round(seq04a.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq04b" component={() => <Part part={seq04b} audio="audio/seq04b.wav" />} durationInFrames={Math.round(seq04b.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq05" component={() => <Part part={seq05} audio="audio/seq05.wav" />} durationInFrames={Math.round(seq05.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq06" component={() => <Part part={seq06} audio="audio/seq06.wav" />} durationInFrames={Math.round(seq06.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq07a" component={() => <Part part={seq07a} audio="audio/seq07a.wav" />} durationInFrames={Math.round(seq07a.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq07b" component={() => <Part part={seq07b} audio="audio/seq07b.wav" />} durationInFrames={Math.round(seq07b.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq07c" component={() => <Part part={seq07c} audio="audio/seq07c.wav" />} durationInFrames={Math.round(seq07c.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq08a" component={() => <Part part={seq08a} audio="audio/seq08a.wav" />} durationInFrames={Math.round(seq08a.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq08b" component={() => <Part part={seq08b} audio="audio/seq08b.wav" />} durationInFrames={Math.round(seq08b.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq09" component={() => <Part part={seq09} audio="audio/seq09.wav" />} durationInFrames={Math.round(seq09.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq10" component={() => <Part part={seq10} audio="audio/seq10.wav" />} durationInFrames={Math.round(seq10.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq11" component={() => <Part part={seq11} audio="audio/seq11.wav" />} durationInFrames={Math.round(seq11.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq12" component={() => <Part part={seq12} audio="audio/seq12.wav" />} durationInFrames={Math.round(seq12.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Seq12b" component={() => <Part part={seq12b} audio="audio/seq12b.wav" />} durationInFrames={Math.round(seq12b.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Credits" component={() => <Part part={credits} audio="audio/credits.wav" />} durationInFrames={Math.round(credits.DURATION * FPS)} fps={FPS} width={1920} height={804} />
    <Composition id="Animatic" component={Animatic} durationInFrames={Math.ceil(ANIM_TOTAL * 12)} fps={12} width={1920} height={804} />
    <Composition id="Film" component={Film} durationInFrames={P1 + P2 + P3} fps={FPS} width={1920} height={804} />
  </>
);
registerRoot(Root);
