// Part 3 — B612 at dawn. The sheep wakes beside the rose under its glass, is hungry, and could eat it,
// but chooses not to. A baobab sprout breaks the ground; the sheep eats that instead, protecting the
// planet and the rose. Because it chose to care, a golden light runs along its unfinished lines and
// completes them.
import gsap from 'gsap';
import {Sheep} from './sheep.js';
import {cinemaCss, cinemaHtml, cinemaFrame, makeBokeh, drawBokeh, noise1} from './cinema.js';

// Every frame is a fresh seek, so tweens must render their values immediately (no lazy first render).
gsap.defaults({ lazy: false });

export const DURATION = 68;

const SUBS = [
  [7.6, 10.6, 'His star… We’re home. It smells like morning.', '他的星星……我们到家了。闻起来像早晨。'],
  [14.6, 17.6, 'Still hungry… Oh! A flower. A beautiful one.', '还是好饿……哦！一朵花。好美的花。'],
  [22.0, 25.6, 'Another flower… I didn’t eat the last one either.', '又一朵花……上一朵，我也没有吃。'],
  [26.6, 29.6, 'A good sheep keeps flowers safe.', '好羊会守护花。'],
  [32.4, 36.2, 'You’re a baobab! You’d break this little planet apart.', '你是猴面包树！你会把这颗小星球撑碎的。'],
  [40.0, 42.4, 'Crunch. Hm! Not bad at all.', '嘎吱。嗯！味道还不错。'],
  [48.4, 52.4, 'My lines… they’re finished. I feel… whole.', '我的线条……画完了。我觉得……完整了。'],
  [53.4, 56.4, 'That is exactly the way I wanted it.', '这正是我想要的样子。', 'say'],
  [58.0, 61.4, 'Then I’ll stay right here, and keep watch.', '那我就留在这里，好好守着。'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('') + '盒子里的羊完';

export const css = `
#stage{position:relative;width:1920px;height:804px;overflow:hidden;background:#f6d9b8}
#world{position:absolute;left:0;top:0;width:2400px;height:1005px;transform-origin:0 0;filter:contrast(1.08) saturate(1.1)}
.bg{position:absolute;left:0;top:0;width:2400px;height:1005px}
#svg{position:absolute;left:0;top:0;width:2400px;height:1005px;overflow:visible}
#rays,#sunGlow,#flareG{mix-blend-mode:screen}
#subs{position:absolute;left:0;right:0;bottom:30px;text-align:center;pointer-events:none}
#subs .en{font:italic 40px/1.25 Lora,Georgia,serif;color:#fffaf0;text-shadow:0 0 6px rgba(40,20,10,.85),0 0 18px rgba(40,20,10,.6)}
#subs .en.say{font-style:normal}
#subs .zh{font:31px/1.5 "Noto Serif SC",serif;color:#fff3e0;text-shadow:0 0 6px rgba(40,20,10,.85),0 0 16px rgba(40,20,10,.6)}
#title{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:90px;box-sizing:border-box;opacity:0;color:#fff8ea;text-shadow:0 0 24px rgba(120,60,10,.55)}
#title .t1{font:92px Lora,Georgia,serif;letter-spacing:1px}
#title .t2{font:46px "Noto Serif SC",serif;margin-top:8px}
#flash{position:absolute;inset:0;pointer-events:none;opacity:0;mix-blend-mode:screen;background:radial-gradient(ellipse at 50% 55%,#fffdf2 0%,#ffe9a6 35%,rgba(255,200,90,.6) 70%,rgba(255,180,60,0) 100%)}
#warm{position:absolute;inset:0;pointer-events:none;background:#ffb24a;mix-blend-mode:soft-light;opacity:.18}
#fade{position:absolute;inset:0;background:#000}
${cinemaCss}
`;

const boil = (id, seed) => `<feTurbulence id="${id}" type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="${seed}" result="n"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" result="d"/>`;

// a baobab sprout: thick stubborn stem and fat leaves, root at (0,0)
const SPROUT = `
 <g id="bbCrack" fill="none" stroke="#4d3a28" stroke-width="3.5" stroke-linecap="round" opacity="0">
  <path id="ck1" d="M0 4 L-26 10 L-44 6 L-70 14"/><path id="ck2" d="M2 6 L22 16 L48 12 L66 20"/><path id="ck3" d="M-4 8 L-10 22 L-24 30"/>
 </g>
 <ellipse id="bbDirt" cx="0" cy="4" rx="34" ry="8" fill="#6d5236" opacity="0"/>
 <g clip-path="url(#bbClip)"><g id="bbGrow">
  <path d="M-9 4 C-11 -30 -6 -62 -3 -84 L5 -84 C9 -60 12 -30 10 4Z" fill="#6f8f3c" stroke="#3f4f22" stroke-width="3.5"/>
  <g id="bbLeafL"><path d="M-3 -70 C-30 -96 -62 -88 -70 -66 C-48 -54 -22 -56 -3 -70Z" fill="#7da447" stroke="#3f4f22" stroke-width="3.5"/>
   <path d="M-8 -70 C-30 -76 -46 -72 -60 -66" fill="none" stroke="#3f4f22" stroke-width="2"/></g>
  <g id="bbLeafR"><path d="M3 -78 C26 -108 60 -104 70 -82 C46 -66 20 -66 3 -78Z" fill="#88b04f" stroke="#3f4f22" stroke-width="3.5"/>
   <path d="M8 -78 C28 -84 46 -84 60 -80" fill="none" stroke="#3f4f22" stroke-width="2"/></g>
  <g id="bbLeafT"><path d="M1 -84 C-8 -110 2 -128 12 -134 C20 -114 14 -96 1 -84Z" fill="#94bb58" stroke="#3f4f22" stroke-width="3.2"/></g>
 </g></g>`;

export const html = (IMG) => `
<div id="stage">
 <div id="world">
  <img class="bg" id="bgImg" src="${IMG}plate_b612.jpg">
  <svg id="svg" viewBox="0 0 2400 1005">
   <defs>
    <linearGradient id="hbFrontG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f0cd9c"/><stop offset=".6" stop-color="#dcae7e"/><stop offset="1" stop-color="#c49366"/></linearGradient>
    <linearGradient id="hbSideG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8bb84"/><stop offset="1" stop-color="#b98a5e"/></linearGradient>
    <linearGradient id="hbFlapG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6dcb2"/><stop offset="1" stop-color="#ddb488"/></linearGradient>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="blur14" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
    <filter id="wcDawn" x="-15%" y="-15%" width="130%" height="130%">
     ${boil('boilD', 2)}
     <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="g"/>
     <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.32  0 0 0 -0.7 0.42" result="gm"/>
     <feComposite in="gm" in2="d" operator="in" result="tex"/>
     <feMerge result="m"><feMergeNode in="d"/><feMergeNode in="tex"/></feMerge>
     <feColorMatrix in="m" type="matrix" values="1.03 0 0 0 0.02  0 0.97 0 0 0.01  0 0 0.88 0 0  0 0 0 1 0"/>
    </filter>
    <filter id="wcBB" x="-40%" y="-40%" width="180%" height="180%">${boil('boilB', 5)}</filter>
    <radialGradient id="sunG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fffbe6" stop-opacity="1"/><stop offset=".25" stop-color="#fff0b8" stop-opacity=".75"/><stop offset=".6" stop-color="#ffd27e" stop-opacity=".25"/><stop offset="1" stop-color="#ffb24a" stop-opacity="0"/></radialGradient>
    <linearGradient id="rayG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff6d8" stop-opacity=".55"/><stop offset="1" stop-color="#fff6d8" stop-opacity="0"/></linearGradient>
    <radialGradient id="auraG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fffbe8" stop-opacity="1"/><stop offset=".35" stop-color="#ffe08a" stop-opacity=".7"/><stop offset="1" stop-color="#ffc04a" stop-opacity="0"/></radialGradient>
    <radialGradient id="castG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#3d4a1c" stop-opacity=".55"/><stop offset="1" stop-color="#3d4a1c" stop-opacity="0"/></radialGradient>
    <clipPath id="bbClip"><rect id="bbClipR" x="-90" y="-150" width="180" height="160"/></clipPath>
   </defs>

   <g id="sunGlow"><circle cx="1860" cy="590" r="420" fill="url(#sunG)"/></g>
   <g id="rays" transform="translate(1860 590)"></g>
   <g id="motes"></g>

   <!-- the glass dome glints -->
   <g id="glints" fill="#ffffff">
    <path id="gl1" transform="translate(1352 520)" d="M0 -26 L4 -4 L26 0 L4 4 L0 26 L-4 4 L-26 0 L-4 -4Z" opacity="0"/>
    <path id="gl2" transform="translate(1588 560)" d="M0 -22 L3 -3 L22 0 L3 3 L0 22 L-3 3 L-22 0 L-3 -3Z" opacity="0"/>
    <path id="gl3" transform="translate(1470 410)" d="M0 -20 L3 -3 L20 0 L3 3 L0 20 L-3 3 L-20 0 L-3 -3Z" opacity="0"/>
   </g>

   <g id="bbPos" transform="translate(1676 878) scale(1.05)"><g filter="url(#wcBB)">${SPROUT}</g></g>
   <g id="bits"></g>

   <!-- the box he carried it home in, sitting open on the grass -->
   <g id="homeBox" transform="translate(1511 492) scale(0.42)" stroke="#5a3d2b" stroke-width="7" stroke-linejoin="round" stroke-linecap="round">
    <ellipse cx="1760" cy="982" rx="300" ry="26" fill="#4d5a20" opacity=".35" stroke="none" filter="url(#soft)"/>
    <path d="M1545 675 L1600 625 L1990 625 L1935 675Z" fill="#3a2a22"/>
    <path d="M1600 625 L1640 535 L2020 535 L1990 625Z" fill="url(#hbFlapG)"/>
    <path d="M1545 675 L1935 675 L1935 975 L1545 975Z" fill="url(#hbFrontG)"/>
    <path d="M1935 675 L1990 625 L1990 925 L1935 975Z" fill="url(#hbSideG)"/>
    <path d="M1545 675 L1600 625 L1530 565 L1470 612Z" fill="url(#hbFlapG)"/>
    <path d="M1935 675 L1990 625 L2060 600 L2010 652Z" fill="url(#hbFlapG)"/>
    <circle cx="1650" cy="790" r="22" fill="#3a2a22"/><circle cx="1740" cy="770" r="22" fill="#3a2a22"/><circle cx="1830" cy="790" r="22" fill="#3a2a22"/>
    <path d="M1990 625 L1990 925" stroke="#fff0c4" stroke-width="10" opacity=".55"/>
   </g>
   <g id="dMove"><g id="dPos" transform="translate(2010 880) scale(0.8)">
    <ellipse id="dCast" cx="-160" cy="6" rx="250" ry="24" fill="url(#castG)" filter="url(#blur3)"/>
    <circle id="dAura" cx="20" cy="-180" r="300" fill="url(#auraG)" opacity="0"/>
    <g id="ds" filter="url(#wcDawn)"></g>
    <g id="dSparks"></g>
   </g></g>

   <circle id="ring" cx="1798" cy="716" r="20" fill="none" stroke="#fff4c8" stroke-width="18" opacity="0" filter="url(#blur3)"/>
   <circle id="ring2" cx="1798" cy="716" r="20" fill="none" stroke="#ffd98a" stroke-width="6" opacity="0"/>
   <g id="gold"></g>
  </svg>
 </div>
 <div id="warm"></div>
 <div id="flash"></div>
 ${cinemaHtml}
 <div id="title"><div class="t1">The End</div><div class="t2">完</div></div>
 <div id="subs"><div class="en"></div><div class="zh"></div></div>
 <div id="fade"></div>
</div>`;

export function setup() {
  const $ = (s) => document.querySelector(s);
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, parent, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
  $('#ds').innerHTML = Sheep.svg('D');
  const P = (part) => '#D-' + part;

  // ---------- subtitles ----------
  function subs(t) {
    const en = $('#subs .en'), zh = $('#subs .zh'); let on = null;
    for (const s of SUBS) if (t >= s[0] - 0.25 && t <= s[1] + 0.3) on = s;
    if (!on) { en.textContent = ''; zh.textContent = ''; return; }
    const k = Math.min(1, (t - on[0] + 0.25) / 0.3, (on[1] + 0.3 - t) / 0.3);
    en.textContent = on[2]; zh.textContent = on[3]; en.className = 'en' + (on[4] ? ' say' : '');
    $('#subs').style.opacity = Math.max(0, k);
  }

  // ---------- sun rays, morning motes, bokeh, sparks, gold dust ----------
  const rays = [];
  for (let i = 0; i < 9; i++) {
    const a = 150 + i * 9.5, len = 1500 + (i % 3) * 300, w = 40 + (i % 4) * 26;
    rays.push({ el: mk('polygon', $('#rays'), { points: `0,0 ${len},${-w} ${len},${w}`, fill: 'url(#rayG)' }), a, ph: i * 1.7 });
  }
  const motes = [];
  for (let i = 0; i < 80; i++) motes.push({ c: mk('circle', $('#motes'), { fill: '#fff4cf' }), x: Math.random() * 0 + ((i * 337) % 2400), y: 200 + ((i * 211) % 760), r: 1.5 + (i % 5) * 0.8, ph: i * 0.77, sp: 0.4 + (i % 7) / 7 });
  const bokeh = makeBokeh(14, ['#fff1c8', '#ffd9a0', '#ffe8c0']);
  const sparks = [];
  for (let i = 0; i < 46; i++) sparks.push({ c: mk('circle', $('#dSparks'), { fill: i % 3 ? '#fff3c0' : '#ffd25e', opacity: 0 }), a: i * 2.39996, rad: 260 + (i % 9) * 34, r: 3 + (i % 4) * 1.6, d: (i % 11) * 0.05 });
  const dust = [];
  for (let i = 0; i < 70; i++) dust.push({ c: mk('circle', $('#gold'), { fill: i % 2 ? '#ffe9a0' : '#fff8dc', opacity: 0 }), x: 1798 + Math.cos(i * 2.4) * (40 + (i % 13) * 22), vx: Math.cos(i * 2.4) * (60 + (i % 7) * 30), vy: -120 - (i % 9) * 30, r: 2 + (i % 4), ph: i });
  const bitsList = [];
  for (let b = 0; b < 3; b++) for (let i = 0; i < 7; i++) bitsList.push({ c: mk('ellipse', $('#bits'), { fill: i % 2 ? '#7da447' : '#94bb58', opacity: 0, rx: 6, ry: 3.5 }), t0: [37.75, 38.55, 39.35][b], vx: (i - 3) * 55 + 20, vy: -180 - (i % 3) * 70, spin: (i - 3) * 260 });

  // ---------- camera ----------
  const cam = { cx: 1300, cy: 402, s: 1.0 };
  function applyCam(w) {
    const hw = 960 / cam.s, hh = 402 / cam.s;
    const cx = Math.min(Math.max(cam.cx, hw), 2400 - hw), cy = Math.min(Math.max(cam.cy, hh), 1005 - hh);
    $('#world').style.transform = `translate(${(960 - cx * cam.s + w.wx).toFixed(2)}px, ${(402 - cy * cam.s + w.wy).toFixed(2)}px) scale(${cam.s})`;
    // shallow depth of field: the painted background softens as the camera pushes in
    $('#bgImg').style.filter = `blur(${Math.max(0, (cam.s - 1.2) * 3.2).toFixed(2)}px)`;
    return { cx, cy };
  }

  // ---------- acting helpers ----------
  const tl = gsap.timeline({ paused: true });
  const act = { tap: 0, breath: 1, shake: 0, cast: 1 };
  let headRot = 0, earBase = 0;
  const head = (at, rot, dur = 0.6, ease = 'sine.inOut') => {
    const d = rot - headRot; headRot = rot;
    tl.to(P('head'), { rotation: rot, duration: dur, ease }, at);
    if (Math.abs(d) > 2) tl.to(P('earN'), { rotation: earBase - d * 0.9, duration: dur * 0.6, ease: 'sine.out' }, at)   // the ear drags behind…
      .to(P('earN'), { rotation: earBase, duration: 1.1, ease: 'elastic.out(1, 0.32)' }, at + dur * 0.6);           // …and settles
  };
  const ear = (at, rot, dur = 0.5) => { earBase = rot; tl.to(P('earN'), { rotation: rot, duration: dur, ease: 'sine.inOut' }, at); };
  const eyes = (at, x, y, dur = 0.22) => tl.to(P('eyes'), { x, y, duration: dur, ease: 'power2.out' }, at);
  const mouth = (at, d, dur = 0.25) => tl.to(P('mouth'), { attr: { d }, duration: dur }, at);
  const lids = (at, v, dur = 0.3) => tl.to([P('lidL'), P('lidR')], { scaleY: v, duration: dur, ease: 'sine.inOut' }, at);
  const blink = (at, open = 0, hold = 0.05) => tl.to([P('lidL'), P('lidR')], { scaleY: 1, duration: 0.07, ease: 'power2.in' }, at)
    .to([P('lidL'), P('lidR')], { scaleY: open, duration: 0.12, ease: 'power2.out' }, at + 0.07 + hold);
  const squash = (at, sy, sx = 1 + (1 - sy) * 0.6, back = 0.45) => tl.to(P('body'), { scaleY: sy, scaleX: sx, duration: 0.08 }, at)
    .to(P('body'), { scaleY: 1, scaleX: 1, duration: back, ease: 'elastic.out(1, 0.4)' }, at + 0.08);
  const SMILE = 'M-112 -200 Q-98 -188 -82 -200', BIG = 'M-116 -203 Q-98 -180 -78 -203', OH = 'M-103 -199 Q-97 -186 -90 -199',
    WORRY = 'M-110 -195 Q-98 -203 -84 -195', EAT = 'M-114 -204 Q-98 -170 -80 -204', FLAT = 'M-110 -198 Q-98 -196 -84 -198',
    CHEW = 'M-110 -200 Q-98 -192 -84 -200', SOFT = 'M-108 -200 Q-98 -194 -86 -200';

  // ---------- the timeline ----------
  tl.set(P('lidL'), { scaleY: 0.8, svgOrigin: '-126 -262' }, 0).set(P('lidR'), { scaleY: 0.8, svgOrigin: '-62 -260' }, 0)
    .set(P('head'), { rotation: 0, svgOrigin: '-60 -190' }, 0).set(P('earN'), { rotation: 0, svgOrigin: '-10 -262' }, 0)
    .set(P('body'), { scaleY: 1, scaleX: 1, svgOrigin: '40 -80' }, 0)
    .set([P('legsFar'), P('legsNear')], { scaleY: 0.38, svgOrigin: '0 -100' }, 0)
    .set(P('walk'), { y: 62 }, 0).set(P('shadow'), { opacity: 0.32, scaleX: 1.15, svgOrigin: '20 2' }, 0)
    .set([P('rimBody'), P('rimHead')], { opacity: 0.9 }, 0)
    .set(P('mouth'), { attr: { d: SOFT } }, 0)
    .set('#bbGrow', { scale: 0, svgOrigin: '0 4' }, 0).set('#dAura', { scale: 0.4, svgOrigin: '20 -180' }, 0)
    .set(['#ring', '#ring2'], { attr: { r: 20 } }, 0)
    .set(cam, { cx: 1500, cy: 402, s: 1.0 }, 0)
    .set(act, { breath: 2.2 }, 0);
  head(0, -6, 0.01);

  // 0–7 from the morning sky down to the planet; the sun swells
  tl.set('#fade', { opacity: 0 }, 0);
  // the ear was finished last night in the desert
  tl.set(P('earN') + ' .pencil', { opacity: 0 }, 0).set(P('finishEar'), { opacity: 1 }, 0);
  tl.to(cam, { cx: 1880, cy: 690, s: 1.3, duration: 7.2, ease: 'sine.inOut' }, 0);
  tl.fromTo('#sunGlow', { opacity: 0.35 }, { opacity: 0.78, duration: 8, ease: 'sine.inOut' }, 0);
  tl.fromTo('#rays', { opacity: 0 }, { opacity: 0.8, duration: 6, ease: 'sine.inOut' }, 2.0);

  // 6.0 the sheep stirs and wakes
  tl.to(act, { breath: 1, duration: 2.0 }, 5.6);
  lids(6.2, 0.5, 0.5); lids(6.8, 0.8, 0.3); lids(7.3, 0.15, 0.4);
  head(7.0, 6, 0.9); eyes(7.4, 6, -6, 0.5);
  blink(8.3);
  head(8.6, -4, 0.8); eyes(8.8, -8, 0, 0.4);
  mouth(8.0, OH, 0.4);
  // 10.4 gets up (anticipation squash, then the legs unfold)
  squash(10.3, 0.94);
  tl.to(P('walk'), { y: 0, duration: 0.7, ease: 'back.out(1.6)' }, 10.45)
    .to([P('legsFar'), P('legsNear')], { scaleY: 1, duration: 0.7, ease: 'back.out(1.6)' }, 10.45)
    .to(P('shadow'), { scaleX: 1, duration: 0.6 }, 10.45);
  // a big morning stretch and yawn
  head(11.3, 14, 0.7, 'power2.out'); mouth(11.4, EAT, 0.35); lids(11.4, 0.85, 0.3);
  tl.to(P('body'), { scaleX: 1.06, scaleY: 0.97, duration: 0.7, ease: 'sine.inOut' }, 11.3).to(P('body'), { scaleX: 1, scaleY: 1, duration: 0.6, ease: 'sine.inOut' }, 12.1);
  head(12.2, 0, 0.6); mouth(12.3, SOFT, 0.3); lids(12.3, 0, 0.25);
  // 13.0 the tummy again
  squash(13.0, 0.95, 1.03, 0.3); squash(13.2, 0.96, 1.02, 0.4);
  head(13.0, -10, 0.45); eyes(13.0, 8, 8); mouth(13.0, OH, 0.2); ear(13.2, 14, 0.5);
  // 14.0 sees the rose
  head(14.2, 2, 0.35, 'back.out(2)'); eyes(14.2, -12, -2, 0.18); ear(14.3, -6, 0.25); mouth(14.4, BIG, 0.3);
  blink(15.2);
  tl.to(cam, { cx: 1700, cy: 680, s: 1.18, duration: 3.2, ease: 'sine.inOut' }, 14.0);
  tl.to('#gl3', { opacity: 1, duration: 0.25 }, 14.3).to('#gl3', { opacity: 0, duration: 0.6 }, 14.6);
  // 17.6–21 trots to the glass
  tl.to('#dMove', { x: -250, y: -20, duration: 3.4, ease: 'sine.inOut' }, 17.6);
  tl.to(cam, { cx: 1660, cy: 700, s: 1.45, duration: 4.2, ease: 'sine.inOut' }, 17.4);
  // 21.2 nose to the glass
  head(21.0, -8, 0.6); eyes(21.0, -10, 4); mouth(21.2, OH, 0.3);
  tl.to('#gl1', { opacity: 1, duration: 0.2 }, 21.4).to('#gl1', { opacity: 0, duration: 0.7 }, 21.6);
  tl.to('#dMove', { x: -262, duration: 0.5, ease: 'sine.inOut' }, 21.2);
  mouth(22.6, EAT, 0.4);                                  // tempted…
  squash(23.4, 0.96, 1.02, 0.4);
  lids(24.4, 0.35, 0.6);
  mouth(25.0, WORRY, 0.5);
  // 25.8 steps back; softens; chooses
  tl.to('#dMove', { x: -245, duration: 0.8, ease: 'sine.inOut' }, 25.8);
  head(25.8, 4, 0.9); eyes(26.0, -6, -2, 0.4); lids(26.2, 0.25, 0.4); mouth(26.6, SMILE, 0.5);
  tl.to(cam, { cx: 1690, cy: 690, s: 1.6, duration: 5, ease: 'sine.inOut' }, 25.0);

  // 30.2 the ground cracks; 30.8 a baobab sprout bursts up
  tl.to('#bbCrack', { opacity: 1, duration: 0.15 }, 30.2).to(act, { shake: 0.35, duration: 0.15 }, 30.2).to(act, { shake: 0, duration: 1.4 }, 30.5)
    .to('#bbDirt', { opacity: 0.9, duration: 0.2 }, 30.7)
    .to('#bbGrow', { scale: 1, duration: 0.55, ease: 'back.out(2.2)' }, 30.8);
  lids(30.2, 0, 0.1); eyes(30.3, -10, 6, 0.12); ear(30.3, -22, 0.15); mouth(30.3, OH, 0.12);
  tl.to(P('walk'), { y: -60, duration: 0.2, ease: 'power2.out' }, 30.9).to(P('walk'), { y: 0, duration: 0.25, ease: 'power2.in' }, 31.1)
    .to('#dMove', { x: -180, duration: 0.45, ease: 'power2.out' }, 30.9);
  squash(31.35, 0.88);
  head(31.2, -6, 0.4);
  ear(32.0, 0, 0.6);
  tl.to(cam, { cx: 1640, cy: 720, s: 1.5, duration: 1.2, ease: 'power2.out' }, 30.4);
  // 34.6 the sprout swells; the sheep glances at the rose, then sets its jaw
  tl.to('#bbGrow', { scale: 1.45, duration: 1.6, ease: 'power1.inOut' }, 34.4).to('#bbLeafT', { rotation: 18, duration: 1.6, svgOrigin: '1 -84' }, 34.4);
  eyes(35.4, -14, -6, 0.3); head(35.4, 8, 0.6);         // looks at the rose…
  eyes(36.3, -8, 6, 0.25); head(36.3, -10, 0.5);        // …and back at the sprout
  lids(36.4, 0.38, 0.3); mouth(36.4, FLAT, 0.3); ear(36.4, -8, 0.4);
  // 37.0–40 eats it, three bites
  tl.to('#dMove', { x: -228, duration: 0.6, ease: 'power2.inOut' }, 37.0);
  [37.6, 38.4, 39.2].forEach((b, i) => {
    head(b, -18, 0.15, 'power2.in'); mouth(b, EAT, 0.08); mouth(b + 0.15, CHEW, 0.1); head(b + 0.18, -9, 0.4, 'power2.out');
    tl.to('#bbClipR', { attr: { y: [-150 + 85, -150 + 135, 5][i] }, duration: 0.05 }, b + 0.15)
      .to('#bbClipR', { attr: { y: [-150 + 85, -150 + 135, 5][i] }, duration: 0.01 }, b + 0.2);
    squash(b + 0.15, 0.97, 1.02, 0.3);
  });
  tl.set('#bbClipR', { attr: { y: -150 } }, 0);
  [39.8, 40.1, 40.4, 40.7].forEach((c, i) => mouth(c, i % 2 ? SMILE : CHEW, 0.12));   // chewing
  tl.to(['#bbDirt', '#bbCrack'], { opacity: 0.35, duration: 1.2 }, 40.2);
  head(41.0, 6, 0.6); lids(41.2, 0.7, 0.5); mouth(41.2, BIG, 0.4);
  tl.to(P('body'), { scaleY: 1.04, duration: 0.6, ease: 'sine.out' }, 41.4).to(P('body'), { scaleY: 1, duration: 0.8 }, 42.2);
  tl.to(cam, { cx: 1730, cy: 700, s: 1.38, duration: 4, ease: 'sine.inOut' }, 39.6);

  // 43.5–51 THE GOLDEN FLASH
  tl.to('#dAura', { opacity: 0.55, scale: 0.8, duration: 2.2, ease: 'sine.in' }, 43.4);
  tl.to(P('body') + ' .trace, ' + P('legHN') + ' .trace', { opacity: 1, duration: 0.2 }, 44.5);
  lids(44.0, 0.85, 0.6); head(44.0, 10, 1.4); mouth(44.2, SMILE, 0.4);
  tl.to(cam, { cx: 1790, cy: 690, s: 1.62, duration: 2.2, ease: 'power2.in' }, 43.8);
  tl.to(act, { shake: 0.25, duration: 0.6 }, 45.4).to(act, { shake: 0, duration: 1.6 }, 46.1);
  tl.to('#flash', { opacity: 0.95, duration: 0.14, ease: 'power2.in' }, 46.0).to('#flash', { opacity: 0, duration: 1.6, ease: 'sine.out' }, 46.14);
  tl.to(['#ring', '#ring2'], { opacity: 0.95, duration: 0.05 }, 46.0)
    .to('#ring', { attr: { r: 1500, 'stroke-width': 2 }, opacity: 0, duration: 1.8, ease: 'expo.out' }, 46.05)
    .to('#ring2', { attr: { r: 900 }, opacity: 0, duration: 1.4, ease: 'expo.out' }, 46.1);
  tl.set(P('body') + ' .pencil, ' + P('legHN') + ' .pencil', { opacity: 0 }, 46.05)
    .set([P('finishBack'), P('finishEar'), P('legHN') + ' .finish-leg'], { opacity: 1 }, 46.05)
    .to('#dAura', { opacity: 1, scale: 1.2, duration: 0.2 }, 46.0).to('#dAura', { opacity: 0.35, scale: 1, duration: 3 }, 46.3)
    .to(P('body') + ' .trace, ' + P('legHN') + ' .trace', { opacity: 0, duration: 2.4, ease: 'sine.inOut' }, 46.6);
  tl.to(cam, { cx: 1740, cy: 690, s: 1.35, duration: 3.5, ease: 'sine.out' }, 46.0);
  tl.to('#warm', { opacity: 0.32, duration: 1 }, 46.0).to('#warm', { opacity: 0.2, duration: 4 }, 47.5);
  // the sheep discovers itself
  lids(47.0, 0, 0.25); eyes(47.1, 12, 2, 0.3); head(47.2, 16, 0.7); mouth(47.2, OH, 0.25);
  tl.to(act, { tap: 1, duration: 0.2 }, 48.2).to(act, { tap: 0, duration: 0.2 }, 48.4).to(act, { tap: 1, duration: 0.2 }, 48.65).to(act, { tap: 0, duration: 0.25 }, 48.85);
  ear(49.2, -16, 0.25); ear(49.6, 0, 0.9);
  head(49.6, 0, 0.8); eyes(49.6, -4, 0, 0.4); mouth(50.0, BIG, 0.4);
  tl.to(P('walk'), { y: -40, duration: 0.25, ease: 'power2.out' }, 50.8).to(P('walk'), { y: 0, duration: 0.25, ease: 'power2.in' }, 51.05);
  squash(51.3, 0.9);
  blink(52.0);
  // 53.2 the boy's voice; it looks up to the sky
  head(53.2, 14, 1.0); eyes(53.3, 4, -10, 0.6); mouth(54.0, SMILE, 0.4);
  tl.to(cam, { cx: 1700, cy: 640, s: 1.22, duration: 4.5, ease: 'sine.inOut' }, 52.6);
  tl.to('#gl2', { opacity: 1, duration: 0.3 }, 55.0).to('#gl2', { opacity: 0, duration: 0.8 }, 55.3);
  // 56.6 settles beside the rose to keep watch
  head(56.6, -4, 0.8); eyes(56.6, -10, 2, 0.4);
  tl.to('#dMove', { x: -238, duration: 0.6, ease: 'sine.inOut' }, 56.8)
    .to(P('walk'), { y: 62, duration: 1.0, ease: 'power2.inOut' }, 57.2)
    .to([P('legsFar'), P('legsNear')], { scaleY: 0.38, duration: 1.0, ease: 'power2.inOut' }, 57.2)
    .to(P('shadow'), { scaleX: 1.15, duration: 0.8 }, 57.2);
  lids(59.0, 0.55, 0.8); mouth(59.0, SMILE, 0.5);
  // 61 the camera rises away; title
  tl.to(cam, { cx: 1500, cy: 420, s: 1.0, duration: 6.5, ease: 'sine.inOut' }, 60.8);
  tl.to('#title', { opacity: 1, duration: 2.0, ease: 'sine.inOut' }, 62.2).to('#title', { opacity: 0, duration: 1.4 }, 65.6);
  tl.to('#fade', { opacity: 1, duration: 1.6, ease: 'sine.in' }, 66.4);

  // ---------- continuous / driven motion ----------
  const TROTS = [[17.6, 21.0]];
  const legPiv = { FF: -58, HF: 92, FN: -18, HN: 128 };
  const legEls = {}; for (const k in legPiv) legEls[k] = document.getElementById('D-leg' + k);
  const bob = document.getElementById('D-bob');
  function drive(t) {
    const b = Math.floor(t * 12) % 4;
    $('#boilD').setAttribute('seed', 2 + b); $('#boilB').setAttribute('seed', 5 + b);
    // trot
    let w = 0, ph = 0;
    for (const [a, z] of TROTS) { const k = clamp((t - a) / 0.3) * (1 - clamp((t - z + 0.3) / 0.3)); if (k > w) { w = k; ph = (t - a) * 2 * Math.PI * 2.4; } }
    const amp = 22 * w;
    const L = { FF: Math.sin(ph) * amp, HN: Math.sin(ph) * amp + act.tap * -28, FN: -Math.sin(ph) * amp, HF: -Math.sin(ph) * amp };
    for (const k in L) legEls[k].setAttribute('transform', `rotate(${L[k].toFixed(2)} ${legPiv[k]} -96)`);
    const br = 1 + 0.012 * act.breath * Math.sin(t * 2.4 / act.breath);
    const by = -2 * act.breath * Math.sin(t * 2.4 / act.breath) - Math.abs(Math.sin(ph)) * 12 * w;
    bob.setAttribute('transform', `translate(0 ${by.toFixed(2)}) scale(1 ${br.toFixed(4)})`);
    // cast shadow shrinks when the sheep leaves the ground
    const lift = Math.max(0, -gsap.getProperty(P('walk'), 'y'));
    $('#dCast').setAttribute('opacity', (1 - Math.min(1, lift / 120) * 0.7).toFixed(3));
    // sun rays breathe and turn slowly
    for (const r of rays) r.el.setAttribute('transform', `rotate(${(r.a + Math.sin(t * 0.15 + r.ph) * 2).toFixed(2)})`), r.el.setAttribute('opacity', (0.55 + 0.45 * Math.sin(t * 0.5 + r.ph)).toFixed(3));
    // morning motes
    for (const m of motes) {
      const x = ((m.x + t * 14 * m.sp + Math.sin(t * 0.6 + m.ph) * 20) % 2400 + 2400) % 2400, y = m.y + Math.sin(t * 0.5 * m.sp + m.ph) * 26 - t * 3 * m.sp;
      m.c.setAttribute('cx', x.toFixed(1)); m.c.setAttribute('cy', y.toFixed(1)); m.c.setAttribute('r', m.r);
      m.c.setAttribute('opacity', (0.25 + 0.45 * (0.5 + 0.5 * Math.sin(t * 1.7 * m.sp + m.ph))).toFixed(3));
    }
    // sprout sways like it means it
    $('#bbGrow').style.transformOrigin = '';
    $('#bbLeafL').setAttribute('transform', `rotate(${(Math.sin(t * 2.1) * 4).toFixed(2)} -3 -70)`);
    $('#bbLeafR').setAttribute('transform', `rotate(${(Math.sin(t * 1.8 + 1) * 4).toFixed(2)} 3 -78)`);
    // leaf bits from each bite
    for (const p of bitsList) {
      const u = t - p.t0;
      if (u < 0 || u > 1.1) { p.c.setAttribute('opacity', 0); continue; }
      const x = 1680 + p.vx * u, y = 740 + p.vy * u + 520 * u * u;
      p.c.setAttribute('cx', x.toFixed(1)); p.c.setAttribute('cy', Math.min(y, 880).toFixed(1));
      p.c.setAttribute('transform', `rotate(${(p.spin * u).toFixed(1)} ${x.toFixed(1)} ${Math.min(y, 880).toFixed(1)})`);
      p.c.setAttribute('opacity', (1 - clamp((u - 0.7) / 0.4)).toFixed(3));
    }
    // sparks spiral in towards the heart (43.6 → 46), then burst out (46 → 48)
    for (const s of sparks) {
      const uIn = clamp((t - 43.6 - s.d) / 2.4), uOut = clamp((t - 46.0) / 1.6);
      let rad, a, o;
      if (t < 46.0) { rad = s.rad * (1 - ss(uIn)); a = s.a + uIn * 4; o = uIn > 0 && uIn < 1 ? 0.95 * Math.min(1, uIn * 5) : 0; }
      else { rad = s.rad * 1.4 * ss(uOut); a = s.a + 4; o = (1 - uOut) * 0.95; }
      s.c.setAttribute('cx', (20 + Math.cos(a) * rad).toFixed(1)); s.c.setAttribute('cy', (-180 + Math.sin(a) * rad * 0.8).toFixed(1));
      s.c.setAttribute('r', s.r); s.c.setAttribute('opacity', o.toFixed(3));
    }
    // gold dust drifting down after the flash
    for (const d of dust) {
      const u = t - 46.05;
      if (u < 0 || u > 7) { d.c.setAttribute('opacity', 0); continue; }
      const drag = 1 - Math.exp(-u * 1.6);
      const x = d.x + d.vx * drag / 1.6 * 1.6 + Math.sin(u * 1.3 + d.ph) * 14, y = 716 + d.vy * drag / 1.6 + u * 26;
      d.c.setAttribute('cx', x.toFixed(1)); d.c.setAttribute('cy', y.toFixed(1)); d.c.setAttribute('r', d.r);
      d.c.setAttribute('opacity', ((1 - u / 7) * (0.5 + 0.5 * Math.sin(u * 6 + d.ph))).toFixed(3));
    }
    subs(t);
    const wv = cinemaFrame(t, act.shake);
    applyCam(wv);
    drawBokeh(bokeh, t, cam, clamp((cam.s - 1.1) / 0.3));
  }

  return { render: (t) => { tl.seek(t); drive(t); } };
}

function clamp(u) { return Math.max(0, Math.min(1, u)); }
function ss(u) { u = clamp(u); return u * u * (3 - 2 * u); }
