// Pencil storyboard library for the feature animatic: every character and prop as a simple
// hand-drawn SVG, so the whole hour can be timed and read before final animation.
import React from 'react';

export const INK = '#4a4038';
const W = { stroke: INK, strokeWidth: 3, strokeLinecap: 'round', strokeLinejoin: 'round' };
const wob = (t, k = 1, sp = 1) => Math.sin(t * 2.3 * sp + k) * 1;

// ---------- backgrounds (pencil + a light wash so each world has its own colour) ----------
const BG = {
  paper: ['#f6f0e4', '#efe6d4'], desert: ['#f8e3c0', '#e9c58f'], night: ['#28305e', '#5a4a7a'],
  box: ['#e8b778', '#c98d4d'], space: ['#141a3a', '#2a2050'], b612: ['#fbe3c4', '#cfe3a8'],
  king: ['#3a2a5e', '#7a4a8a'], biz: ['#5d6470', '#8a8f98'], lamp: ['#2c3460', '#f0b860'],
  dead: ['#3a3a40', '#5a5650'], sky: ['#ffd9b0', '#b8d4f0'], dawn: ['#f8c8a0', '#fde8c0'],
};
export const Background = ({kind, t}) => {
  const [a, b] = BG[kind] || BG.paper;
  const dark = ['night', 'space', 'king', 'lamp', 'dead'].includes(kind);
  const line = dark ? '#d8d0ff' : INK;
  const stars = [];
  if (['night', 'space', 'lamp', 'dead', 'king'].includes(kind)) for (let i = 0; i < 70; i++) {
    const x = (i * 263) % 1920, y = (i * 137) % 520, r = 1.5 + (i % 3);
    stars.push(<circle key={i} cx={x} cy={y} r={r * (0.7 + 0.3 * Math.sin(t * 2 + i))} fill="#fff8dc" opacity={0.8} />);
  }
  return (
    <g>
      <defs><linearGradient id={'bg-' + kind} x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={a} /><stop offset="1" stopColor={b} /></linearGradient></defs>
      <rect width="1920" height="804" fill={'url(#bg-' + kind + ')'} />
      {stars}
      {kind === 'desert' || kind === 'night' ? <path d="M0 600 Q300 520 640 590 T1280 570 T1920 600 L1920 804 L0 804Z" fill={dark ? '#6a5a8a' : '#f0d09a'} {...W} stroke={line} opacity="0.9" /> : null}
      {kind === 'box' ? <g stroke={line} strokeWidth="3" fill="none" opacity=".7"><path d="M200 80 L1720 80 L1600 640 L320 640Z" /><path d="M200 80 L320 640 M1720 80 L1600 640" /></g> : null}
      {kind === 'paper' ? <g stroke="#cbbfa8" strokeWidth="1.5">{[...Array(14)].map((_, i) => <line key={i} x1="0" x2="1920" y1={70 + i * 52} y2={70 + i * 52} />)}</g> : null}
      {kind === 'b612' || kind === 'king' || kind === 'biz' || kind === 'lamp' || kind === 'dead' ?
        <circle cx="960" cy="1500" r="1000" fill={{ b612: '#bcd98c', king: '#8a5aa0', biz: '#9aa0a8', lamp: '#c0a070', dead: '#6a6660' }[kind]} {...W} stroke={line} /> : null}
      {kind === 'sky' || kind === 'dawn' ? <g fill="#fff" opacity=".7" stroke={INK} strokeWidth="2">
        <path d={`M${200 + t * 40} 220 q40 -50 90 -10 q50 -30 80 20 q40 10 0 40 h-170 q-40 -20 0 -50z`} />
        <path d={`M${1300 - t * 30} 300 q40 -50 90 -10 q50 -30 80 20 q40 10 0 40 h-170 q-40 -20 0 -50z`} /></g> : null}
    </g>
  );
};

// ---------- the hero and the erased sheep ----------
// gold: 0 unfinished … 1 ear done … 2 half back … 3 whole
export const Sheep = ({t = 0, gold = 0, ghost, walk = 0, sleep = 0, color = true}) => {
  const bob = walk ? Math.abs(Math.sin(t * 9)) * -10 : Math.sin(t * 2) * 2;
  const leg = walk ? Math.sin(t * 9) * 16 : 0;
  const op = ghost ? 0.45 : 1, fill = ghost ? 'none' : color ? '#fffaf0' : 'none';
  const st = ghost ? { ...W, strokeDasharray: '7 6', stroke: '#6a6070' } : W;
  const goldOn = (k) => gold >= k;
  return (
    <g opacity={op} transform={`translate(0 ${bob})`}>
      {/* legs */}
      {[[-55, 1], [-20, -1], [35, 1], [70, -1]].map(([lx, d], i) => (
        <g key={i} transform={`rotate(${leg * d} ${lx} 40)`}>
          <path d={`M${lx} 40 L${lx} 110`} {...st} strokeWidth={i === 3 && !goldOn(3) && !ghost ? 2 : 9} stroke={i === 3 && !goldOn(3) && !ghost ? '#9a9088' : st.stroke} strokeDasharray={i === 3 && !goldOn(3) && !ghost ? '5 5' : st.strokeDasharray} />
        </g>))}
      {/* body: a cloud, with a gap on the back until gold 3 */}
      <path d="M-90 30 q-30 -40 10 -70 q10 -50 60 -40 q30 -40 80 -10 q50 -10 60 40 q40 30 0 70 q-10 30 -50 20 q-40 25 -80 0 q-50 15 -80 -10z" fill={fill} {...st} />
      {!ghost && !goldOn(3) ? <path d="M20 -78 q30 -14 50 0" stroke="#fffaf0" strokeWidth="14" fill="none" opacity={goldOn(2) ? 0 : 1} /> : null}
      {!ghost && goldOn(2) && !goldOn(3) ? <path d="M20 -78 q15 -10 28 -6" stroke="#e8b830" strokeWidth="5" fill="none" /> : null}
      {/* head */}
      <g transform={`rotate(${Math.sin(t * 1.3) * 3} -90 -30)`}>
        <ellipse cx="-110" cy="-30" rx="46" ry="40" fill={ghost ? 'none' : '#f8d8c8'} {...st} />
        <path d="M-150 -40 q-40 -6 -36 20 q14 6 34 -6" fill={ghost ? 'none' : '#f0b8a0'} {...st} />
        <path d="M-72 -46 q30 0 32 30 q-18 6 -30 -10" fill={ghost ? 'none' : '#f0b8a0'} {...st} strokeDasharray={!ghost && !goldOn(1) ? '4 5' : st.strokeDasharray} />
        {sleep ? <><path d="M-130 -36 q8 6 16 0" {...st} fill="none" /><path d="M-100 -36 q8 6 16 0" {...st} fill="none" /></>
          : <><circle cx="-122" cy="-36" r="6" fill={INK} /><circle cx="-92" cy="-36" r="6" fill={INK} /></>}
        <path d="M-118 -14 q10 8 20 0" {...st} fill="none" />
      </g>
      {ghost === 'sniffle' ? <path d="M-150 0 q50 30 100 0 l10 40" stroke="#8a7aa8" strokeWidth="6" fill="none" strokeDasharray="10 5" /> : null}
      {ghost === 'horns' ? <><path d="M-140 -60 q-30 -40 10 -50 q30 10 10 40" {...st} fill="none" strokeWidth="6" /><path d="M-80 -60 q30 -40 -10 -50" {...st} fill="none" strokeWidth="6" /></> : null}
      {ghost === 'old' ? <path d="M-150 -6 q-6 40 20 50 M-80 -6 q6 30 -14 40" {...st} fill="none" /> : null}
      {gold > 0 && !ghost ? <circle cx="0" cy="-10" r="150" fill="#ffd25e" opacity={0.08 * gold} /> : null}
    </g>
  );
};

export const Boy = ({t = 0, walk = 0, scarf = 1}) => {
  const bob = walk ? Math.abs(Math.sin(t * 8)) * -8 : 0;
  return (
    <g transform={`translate(0 ${bob})`}>
      <path d="M-30 0 L-20 -140 L20 -140 L30 0Z" fill="#7ab060" {...W} />
      <path d={`M-20 -140 q-60 ${10 + Math.sin(t * 4) * 12 * scarf} -120 ${-10 + Math.sin(t * 5) * 14 * scarf}`} stroke="#e8b830" strokeWidth="14" fill="none" strokeLinecap="round" />
      <circle cx="0" cy="-180" r="42" fill="#f8dcc4" {...W} />
      <path d="M-42 -196 q20 -50 84 -10 q-10 -40 -40 -40 q-30 0 -44 50z" fill="#f0c040" {...W} />
      <circle cx="-14" cy="-180" r="4" fill={INK} /><circle cx="14" cy="-180" r="4" fill={INK} />
      <path d="M-30 0 L-30 50 M30 0 L30 50" {...W} strokeWidth="8" />
    </g>
  );
};

export const Pilot = ({t = 0, face = 0}) => (
  <g>
    <path d="M-60 0 L-50 -170 L50 -170 L60 0Z" fill="#a08060" {...W} />
    <circle cx="0" cy="-215" r="48" fill="#f0d0b0" {...W} />
    <path d="M-48 -230 q48 -50 96 0" fill="#6a4a30" {...W} />
    <rect x="-40" y="-236" width="80" height="22" rx="10" fill="#8ab0c8" {...W} opacity={face ? 0 : 1} />
    {face ? <path d="M-16 -200 q16 12 32 0" {...W} fill="none" /> : null}
  </g>
);
export const Hand = ({t = 0, pencil = 1}) => (
  <g transform={`rotate(${Math.sin(t * 14) * 4})`}>
    <path d="M0 0 q40 -20 120 10 q30 30 -10 50 q-60 20 -110 -10z" fill="#f4d0b0" {...W} />
    {pencil ? <path d="M0 0 L-70 -110" stroke="#e8b830" strokeWidth="16" strokeLinecap="round" /> : null}
  </g>
);

// ---------- props ----------
export const Plane = ({t = 0, broken = 0}) => (
  <g transform={`rotate(${broken ? 12 : Math.sin(t * 2) * 3})`}>
    <path d="M-200 0 q100 -40 360 -10 q40 10 0 30 q-200 20 -360 -20z" fill="#c8ccd4" {...W} />
    <path d="M-40 -14 L-100 -100 L0 -100 L40 -10Z M-40 14 L-80 80 L10 80 L30 14Z" fill="#b0b6c0" {...W} />
    <path d="M160 -10 l40 -60 M160 10 l40 60" {...W} strokeWidth={broken ? 3 : 6} />
    {broken ? <path d="M180 -30 q20 -40 0 -80 q30 -20 10 -60" stroke="#888" strokeWidth="10" fill="none" opacity=".5" /> : null}
  </g>
);
export const Box = ({open = 1}) => (
  <g>
    <path d="M-120 0 L120 0 L120 -170 L-120 -170Z" fill="#dcae7e" {...W} />
    <path d="M120 0 L160 -30 L160 -200 L120 -170Z" fill="#b98a5e" {...W} />
    <path d="M-120 -170 L-80 -200 L160 -200 L120 -170Z" fill={open ? '#3a2a22' : '#e8c79f'} {...W} />
    {open ? <><path d="M-120 -170 L-170 -230 L-130 -250 L-80 -200Z" fill="#e8c79f" {...W} /><path d="M120 -170 L190 -210 L200 -240 L160 -200Z" fill="#e8c79f" {...W} /></> : null}
    {[-60, 0, 60].map((x, i) => <circle key={i} cx={x} cy={-90 + (i === 1 ? -10 : 0)} r="14" fill="#3a2a22" />)}
  </g>
);
export const Flower = ({t = 0, glow = 0, shake = 0}) => (
  <g transform={`rotate(${Math.sin(t * 30) * 5 * shake})`}>
    {glow ? <circle cy="-110" r="70" fill="#ffe8a0" opacity={0.5 * glow} /> : null}
    <path d="M0 0 L0 -100" {...W} stroke="#5a7a40" />
    {[-40, 0, 40].map((a, i) => <ellipse key={i} cx="0" cy="-122" rx="12" ry="26" fill="#f8c8d8" {...W} transform={`rotate(${a} 0 -100)`} />)}
  </g>
);
export const Rose = ({t = 0, dome = 1}) => (
  <g>
    <path d="M0 0 L0 -110" {...W} stroke="#4a7a30" strokeWidth="5" />
    <path d="M0 -60 q30 -20 40 0 q-20 10 -40 0z M0 -40 q-30 -20 -40 0 q20 10 40 0z" fill="#7ab060" {...W} />
    <path d="M-28 -130 q0 -40 28 -40 q28 0 28 40 q-6 24 -28 24 q-22 0 -28 -24z" fill="#f07890" {...W} />
    <path d="M-12 -140 q12 -14 24 0" {...W} fill="none" />
    {dome ? <path d="M-80 10 L-80 -150 q0 -80 80 -80 q80 0 80 80 L80 10" fill="#e8f4ff" fillOpacity=".25" {...W} strokeWidth="2" /> : null}
  </g>
);
export const Baobab = ({t = 0, size = 0.3, wiggle = 1}) => (
  <g transform={`scale(${size}) rotate(${Math.sin(t * 6) * 6 * wiggle})`}>
    <path d="M-40 0 q-20 -200 -10 -300 L10 -300 q20 100 30 300z" fill="#9a7a50" {...W} strokeWidth={3 / size} />
    <path d="M-50 -300 q-80 -60 -20 -110 q40 -50 80 -20 q60 -40 90 20 q50 40 0 100z" fill="#7aa050" {...W} strokeWidth={3 / size} />
    <path d="M-40 0 q-60 30 -120 20 M30 0 q60 30 130 10" {...W} strokeWidth={4 / size} fill="none" />
  </g>
);
export const Birds = ({t = 0, n = 9}) => (
  <g>{[...Array(n)].map((_, i) => {
    const x = (i % 3) * 90 - 90 + Math.sin(t + i) * 10, y = Math.floor(i / 3) * 60 - 60 + Math.cos(t * 1.3 + i) * 8, f = Math.sin(t * 10 + i) * 18;
    return <path key={i} d={`M${x - 30} ${y + f} q15 -10 30 0 q15 -10 30 0`} {...W} fill="none" />;
  })}</g>
);
export const Strings = () => <path d="M0 0 L-90 -260 M0 0 L0 -230 M0 0 L90 -260" stroke={INK} strokeWidth="1.5" />;
export const Volcano = () => <path d="M-60 0 L-20 -60 L20 -60 L60 0Z" fill="#a08070" {...W} />;
export const King = ({t = 0}) => (
  <g>
    <path d="M-500 0 q500 -260 1000 0z" fill="#b03050" {...W} />
    <circle cx="0" cy="-230" r="44" fill="#f0d0b0" {...W} />
    <path d="M-34 -268 l10 -40 l24 26 l24 -26 l10 40z" fill="#f0c040" {...W} />
    <path d="M-20 -200 q20 40 40 0" fill="#fff" {...W} />
    <path d={`M40 -160 L${120 + Math.sin(t * 3) * 20} -230`} {...W} strokeWidth="6" />
  </g>
);
export const Businessman = ({t = 0}) => (
  <g>
    <rect x="-160" y="-90" width="320" height="90" fill="#7a6a5a" {...W} />
    <circle cx="0" cy="-150" r="44" fill="#f0d0b0" {...W} />
    <rect x="-30" y="-134" width="60" height="10" fill={INK} />
    {[...Array(6)].map((_, i) => <text key={i} x={-140 + i * 50} y={-180 - ((t * 60 + i * 30) % 120)} fontSize="26" fill={INK} opacity=".6">{(i * 7919 + Math.floor(t * 3)) % 1000}</text>)}
    <rect x="60" y="-70" width="90" height="40" fill="#5a4a3a" {...W} />
  </g>
);
export const Lamp = ({t = 0, on = 1}) => (
  <g>
    <path d="M0 0 L0 -240" {...W} strokeWidth="8" />
    <path d="M-26 -240 L26 -240 L18 -290 L-18 -290Z" fill={on ? '#ffe080' : '#887'} {...W} />
    {on ? <circle cy="-265" r="80" fill="#ffe080" opacity=".35" /> : null}
  </g>
);
export const Lamplighter = ({t = 0}) => (
  <g>
    <path d="M-30 0 L-24 -130 L24 -130 L30 0Z" fill="#4a5a8a" {...W} />
    <circle cx="0" cy="-165" r="36" fill="#f0d0b0" {...W} />
    <path d="M-38 -180 L38 -180 L28 -214 L-28 -214Z" fill="#3a3a5a" {...W} />
    <path d="M24 -110 L90 -200" {...W} strokeWidth="5" />
  </g>
);
export const Storm = ({t = 0}) => (
  <g opacity=".8">{[...Array(8)].map((_, i) => (
    <path key={i} d={`M${-900 + ((t * 600 + i * 260) % 1900)} ${-300 + i * 80} q120 -40 240 0`} stroke="#e8d0a0" strokeWidth="6" fill="none" opacity=".7" />))}
  </g>
);
export const Ring = ({t = 0, r = 200}) => <circle r={r} fill="none" stroke="#ffd25e" strokeWidth="10" opacity=".8" />;
export const Glow = ({r = 200, c = '#ffd25e', o = 0.5}) => <circle r={r} fill={c} opacity={o} />;
export const Star = ({t = 0, wink = 0}) => (
  <path d="M0 -30 L8 -8 L30 0 L8 8 L0 30 L-8 8 L-30 0 L-8 -8Z" fill="#fff4b0" transform={`scale(${1 + wink * Math.max(0, Math.sin(t * 3)) * 0.8})`} />
);
export const Notebook = () => <rect x="-400" y="-260" width="800" height="520" fill="#fbf6ea" {...W} />;
export const Drawer = ({open = 0}) => <g><rect x="-180" y="-120" width="360" height="120" fill="#6a5a4a" {...W} /><rect x={-150} y={-100 + open * 0} width="300" height="80" fill="#8a7a6a" {...W} transform={`translate(0 ${open * 60})`} /></g>;
export const Text = ({text, size = 60}) => <text textAnchor="middle" fontFamily="Lora, Georgia, serif" fontSize={size} fill="#fff8ea" stroke="#3a2a20" strokeWidth="1">{text}</text>;

export const LIB = { Sheep, Boy, Pilot, Hand, Plane, Box, Flower, Rose, Baobab, Birds, Strings, Volcano, King, Businessman, Lamp, Lamplighter, Storm, Ring, Glow, Star, Notebook, Drawer, Text };
