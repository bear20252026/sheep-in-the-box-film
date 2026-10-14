// The whole feature as a moving storyboard: pencil boards, simple moves, timing, notes and dialogue.
import React from 'react';
import {AbsoluteFill, useCurrentFrame, useVideoConfig} from 'remotion';
import '@fontsource/lora/400.css';
import '@fontsource/lora/400-italic.css';
import {LIB, Background} from './lib.jsx';
import {SHOTS} from './shots.js';

const ease = (u) => 0.5 - 0.5 * Math.cos(Math.PI * Math.max(0, Math.min(1, u)));
const lerp = (a, b, u) => a + (b - a) * u;
const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, '0')}`;

function findShot(t) {
  let lo = 0, hi = SHOTS.length - 1;
  while (lo < hi) { const m = (lo + hi + 1) >> 1; if (SHOTS[m].start <= t) lo = m; else hi = m - 1; }
  return SHOTS[lo];
}

const Element = ({spec, u, t}) => {
  const [type, from, to = {}] = spec;
  const C = LIB[type];
  if (!C) return null;
  const v = {...from};
  for (const k of Object.keys(to)) if (typeof to[k] === 'number') v[k] = lerp(from[k] ?? (k === 'op' ? 1 : 0), to[k], ease(u));
  const {x = 960, y = 400, s = 1, r = 0, op = 1, flip, ...props} = v;
  return (
    <g transform={`translate(${x} ${y}) rotate(${r}) scale(${s * (flip ? -1 : 1)} ${s})`} opacity={op}>
      <C t={t} {...props} />
    </g>
  );
};

export const Animatic = () => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  const t = frame / fps;
  const shot = findShot(t);
  const local = t - shot.start, u = local / shot.dur;
  const c = shot.cam || {};
  const cs = lerp(c.s0 ?? 1, c.s1 ?? c.s0 ?? 1, ease(u)), cx = lerp(c.x0 ?? 0, c.x1 ?? c.x0 ?? 0, ease(u)), cy = lerp(c.y0 ?? 0, c.y1 ?? c.y0 ?? 0, ease(u));
  const line = shot.say.find(([a, b]) => local >= a && local <= b);
  const dark = ['night', 'space', 'king', 'lamp', 'dead'].includes(shot.bg);
  const boil = Math.floor(t * 6) % 5;
  return (
    <AbsoluteFill style={{background: '#000'}}>
      <svg viewBox="0 0 1920 804" width="1920" height="804">
        <defs>
          <filter id="pencil" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed={boil} result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="5" />
          </filter>
        </defs>
        <g filter="url(#pencil)">
          <Background kind={shot.bg} t={t} />
          <g transform={`translate(${960 + cx} ${402 + cy}) scale(${cs}) translate(-960 -402)`}>
            {shot.els.map((e, i) => <Element key={i} spec={e} u={u} t={t + i} />)}
          </g>
        </g>
      </svg>
      {/* board notes */}
      <div style={{position: 'absolute', left: 24, top: 18, font: '600 22px Lora, Georgia, serif', color: dark ? '#f0e8ff' : '#3a2a20', opacity: 0.85}}>
        SEQ {shot.seq} · {shot.seqTitle} · shot {shot.shot} &nbsp;&nbsp; {fmt(t)}
      </div>
      {shot.note ? <div style={{position: 'absolute', left: 24, right: 24, top: 52, font: 'italic 26px Lora, Georgia, serif', color: dark ? '#f8f0ff' : '#2a2018', opacity: 0.9, textShadow: dark ? '0 0 6px #000' : '0 0 6px #fff'}}>{shot.note}</div> : null}
      {line ? (
        <div style={{position: 'absolute', left: 0, right: 0, bottom: 30, textAlign: 'center'}}>
          <span style={{font: '600 26px Lora, Georgia, serif', color: '#ffd25e', textShadow: '0 0 8px #000', marginRight: 14}}>{line[2]}</span>
          <span style={{font: '38px Lora, Georgia, serif', color: '#fffaf0', textShadow: '0 0 8px #000, 0 0 18px #000'}}>{line[3]}</span>
        </div>
      ) : null}
    </AbsoluteFill>
  );
};
