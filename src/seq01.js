// SEQ 1 — THE CRASH (4:00). Night over the Sahara: a small plane, an engine that coughs, a long fall.
// The pilot alone with eight days of water; a star that winks; a time-lapse to dawn; and a small voice:
// "If you please… draw me a sheep."
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {cinemaCss, cinemaHtml, cinemaFrame, makeBokeh, drawBokeh} from './cinema.js';
import {Boy, Pilot, Plane, BOY_PIVOTS, PILOT_PIVOTS} from './characters.js';

export const DURATION = 240;

const SUBS = [
  [61.0, 66.6, 'Eight days of water…', '八天的水……'],
  [67.4, 72.6, '…and a thousand miles of sand in every direction.', '……四面八方，一千英里的沙子。'],
  [86.6, 90.4, 'One sip. Just one.', '一口。就一口。'],
  [104.2, 108.4, 'Goodnight, stars.', '晚安，星星们。'],
  [157.0, 161.6, 'If you please… draw me a sheep.', '请你……给我画一只羊吧。', 'say'],
  [170.4, 172.8, 'A… what?', '一只……什么？'],
  [175.6, 178.8, 'A sheep. Please.', '一只羊。拜托了。'],
  [184.0, 190.4, 'Where did you come from? We’re a thousand miles from anywhere.', '你是从哪儿来的？这里离哪儿都有一千英里。'],
  [192.4, 196.4, 'Please. Draw me a sheep.', '拜托。给我画一只羊。'],
  [199.0, 203.0, 'I… don’t really draw. I fly planes.', '我……不太会画画。我是开飞机的。'],
  [205.4, 209.6, 'That doesn’t matter. Draw me a sheep.', '那没关系。给我画一只羊。'],
  [214.6, 217.6, '…All right. One sheep.', '……好吧。一只羊。'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('');

export const css = `
#stage{position:relative;width:1920px;height:804px;overflow:hidden;background:#141a3c}
#world{position:absolute;left:0;top:0;width:2400px;height:1005px;transform-origin:0 0;filter:contrast(1.07) saturate(1.08)}
.bg{position:absolute;left:0;top:0;width:2400px;height:1005px}
#svg,#skySvg{position:absolute;left:0;top:0;width:2400px;height:1005px;overflow:visible}
#dawn{position:absolute;left:0;top:0;width:2400px;height:1005px;background:linear-gradient(#9fb8e8 0%,#f6c4b0 38%,#ffdcae 58%,#f2c08a 100%);mix-blend-mode:soft-light;opacity:0}
#dawn2{position:absolute;left:0;top:0;width:2400px;height:1005px;background:linear-gradient(rgba(255,214,170,.0) 0%,rgba(255,200,150,.35) 55%,rgba(255,228,180,.25) 100%);mix-blend-mode:screen;opacity:0}
#subs{position:absolute;left:0;right:0;bottom:30px;text-align:center;pointer-events:none}
#subs .en{font:italic 40px/1.25 Lora,Georgia,serif;color:#fffaf0;text-shadow:0 0 6px rgba(10,12,40,.9),0 0 18px rgba(10,12,40,.7)}
#subs .en.say{font-style:normal}
#subs .zh{font:31px/1.5 "Noto Serif SC",serif;color:#fff3e0;text-shadow:0 0 6px rgba(10,12,40,.9),0 0 16px rgba(10,12,40,.7)}
#cool{position:absolute;inset:0;pointer-events:none;background:#3a4fb8;mix-blend-mode:soft-light;opacity:.32}
#flash{position:absolute;inset:0;background:#fff;opacity:0}
#paper{position:absolute;inset:0;background:#f6efe0;opacity:0}
#fade{position:absolute;inset:0;background:#000}
${cinemaCss}
`;

const boil = (id, seed) => `<feTurbulence id="${id}" type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="${seed}" result="n"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" result="d"/>`;
const wc = (id, seed) => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%">${boil(id + 'B', seed)}
     <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed + 5}" result="g"/>
     <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.35  0 0 0 -0.7 0.4" result="gm"/>
     <feComposite in="gm" in2="d" operator="in" result="tex"/>
     <feMerge><feMergeNode in="d"/><feMergeNode in="tex"/></feMerge></filter>`;

export const html = (IMG) => `
<div id="stage">
 <div id="world">
  <img class="bg" id="bgImg" src="${IMG}plate_desert.jpg">
  <svg id="skySvg" viewBox="0 0 2400 1005"><g id="wheel"></g>
   <defs><radialGradient id="starG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fffbe8"/><stop offset=".3" stop-color="#ffe9a8" stop-opacity=".7"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
   <radialGradient id="sunG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6d8"/><stop offset=".25" stop-color="#ffd890" stop-opacity=".8"/><stop offset="1" stop-color="#ffb070" stop-opacity="0"/></radialGradient></defs>
   <g id="star" transform="translate(1720 150)" opacity="0"><circle r="120" fill="url(#starG)"/><path d="M0 -40 L5 -5 L40 0 L5 5 L0 40 L-5 5 L-40 0 L-5 -5Z" fill="#fffbe8"/></g>
   <circle id="sun" cx="2050" cy="820" r="520" fill="url(#sunG)" opacity="0"/>
  </svg>
  <div id="dawn"></div><div id="dawn2"></div>
  <svg id="svg" viewBox="0 0 2400 1005">
   <defs>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="smokeBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter>
    ${wc('wcPlane', 3)}${wc('wcPilot', 7)}${wc('wcBoy', 11)}
    ${Plane.defs('PL')}${Pilot.defs('PI')}${Boy.defs('BY')}
    <radialGradient id="lampG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffe6a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffb850" stop-opacity="0"/></radialGradient>
   </defs>
   <g id="smoke" filter="url(#smokeBlur)"></g>
   <g id="plMove"><g id="plPos" transform="translate(1560 900) scale(1.25)"><g filter="url(#wcPlane)">${Plane.svg('PL')}</g>
    <circle id="navR" cx="-60" cy="-36" r="7" fill="#ff5050" opacity="0"/><circle id="navG" cx="240" cy="-44" r="7" fill="#60ff90" opacity="0"/></g></g>
   <g id="lampPos" transform="translate(1210 960)" opacity="0"><circle cy="-60" r="260" fill="url(#lampG)"/><rect x="-14" y="-40" width="28" height="40" rx="6" fill="#c08a40" stroke="#4a3428" stroke-width="3"/><circle cy="-48" r="8" fill="#fff0b0"/></g>
   <g id="burst"></g>
   <g id="piMove"><g id="piPos" transform="translate(1320 975) scale(0.72)"><g filter="url(#wcPilot)">${Pilot.svg('PI')}</g>
     <g id="canteen" opacity="0" transform="translate(-76 -184)"><rect x="-16" y="-30" width="32" height="44" rx="12" fill="#6a7a5a" stroke="#4a3428" stroke-width="3"/></g>
     <g id="notebook" opacity="0" transform="translate(-76 -190)"><rect x="-34" y="-46" width="68" height="88" fill="#f8f2e4" stroke="#4a3428" stroke-width="3"/><path d="M-24 -30 H24 M-24 -14 H24 M-24 2 H24" stroke="#c8baa0" stroke-width="2"/></g>
     <ellipse id="faceShadow" cx="-338" cy="-70" rx="110" ry="80" fill="#1a1428" opacity="0" filter="url(#soft)"/>
   </g></g>
   <g id="byMove"><g id="byPos" transform="translate(560 905) scale(0.62)"><g filter="url(#wcBoy)">${Boy.svg('BY')}</g></g></g>
   <g id="sand"></g>
  </svg>
 </div>
 <div id="cool"></div>
 ${cinemaHtml}
 <div id="flash"></div>
 <div id="paper"></div>
 <div id="subs"><div class="en"></div><div class="zh"></div></div>
 <div id="fade"></div>
</div>`;

export function setup() {
  const $ = (s) => document.querySelector(s);
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, parent, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
  const B = (p) => '#BY-' + p, PI = (p) => '#PI-' + p;

  function subs(t) {
    const en = $('#subs .en'), zh = $('#subs .zh'); let on = null;
    for (const s of SUBS) if (t >= s[0] - 0.25 && t <= s[1] + 0.3) on = s;
    if (!on) { en.textContent = ''; zh.textContent = ''; return; }
    const k = Math.min(1, (t - on[0] + 0.25) / 0.3, (on[1] + 0.3 - t) / 0.3);
    en.textContent = on[2]; zh.textContent = on[3]; en.className = 'en' + (on[4] ? ' say' : '');
    $('#subs').style.opacity = Math.max(0, k);
  }

  // ---------- the star wheel for the time-lapse (stars turn round a pole above the frame) ----------
  const wheel = $('#wheel');
  for (let i = 0; i < 260; i++) {
    const a = i * 2.39996, rr = 300 + ((i * 977) % 2200);
    mk('circle', wheel, { cx: (1200 + Math.cos(a) * rr).toFixed(1), cy: (-400 + Math.sin(a) * rr).toFixed(1), r: (0.8 + (i % 4) * 0.6).toFixed(1), fill: '#fff8e4', opacity: (0.35 + (i % 5) * 0.12).toFixed(2) });
  }
  wheel.setAttribute('opacity', 0);

  // ---------- smoke puffs and the impact burst ----------
  const puffs = [];
  for (let i = 0; i < 60; i++) puffs.push({ c: mk('circle', $('#smoke'), { fill: i % 2 ? '#8a8a96' : '#6a6a78', opacity: 0 }), t0: 27 + i * 0.28, ph: i });
  const grains = [];
  for (let i = 0; i < 90; i++) grains.push({ c: mk('circle', $('#burst'), { fill: i % 3 ? '#d8b088' : '#f0d0a0', opacity: 0 }), a: -Math.PI * (0.05 + 0.9 * ((i * 0.618) % 1)), v: 300 + (i % 9) * 90, r: 3 + (i % 5) * 2 });
  const bokeh = makeBokeh(10, ['#ffe6b8', '#d9dcff', '#ffd6a0'], 21);

  // ---------- camera ----------
  const cam = { cx: 1200, cy: 300, s: 1.0 };
  function applyCam(w) {
    const hw = 960 / cam.s, hh = 402 / cam.s;
    const cx = Math.min(Math.max(cam.cx, hw), 2400 - hw), cy = Math.min(Math.max(cam.cy, hh), 1005 - hh);
    $('#world').style.transform = `translate(${(960 - cx * cam.s + w.wx).toFixed(2)}px, ${(402 - cy * cam.s + w.wy).toFixed(2)}px) scale(${cam.s})`;
    $('#bgImg').style.filter = `blur(${Math.max(0, (cam.s - 1.3) * 2.6).toFixed(2)}px) brightness(${state.bright.toFixed(3)})`;
  }

  // ---------- timeline ----------
  const tl = gsap.timeline({ paused: true });
  const state = { prop: 1, nav: 1, shake: 0, wind: 0.5, bright: 1, boyWind: 1, burst: 0 };
  const pv = (id, map) => Object.entries(map).forEach(([part, o]) => tl.set(id + '-' + part, { rotation: 0, svgOrigin: o }, 0));
  pv('#BY', BOY_PIVOTS); pv('#PI', PILOT_PIVOTS);
  tl.set('#PI-root', { rotation: 0, svgOrigin: '0 0' }, 0).set('#BY-root', { rotation: 0, svgOrigin: '0 0' }, 0);
  tl.set('#fade', { opacity: 1 }, 0).set('#piMove', { y: 300, opacity: 0 }, 0).set('#byMove', { opacity: 0 }, 0);
  // the plane starts high, flying right to left across the night
  tl.set('#plPos', { attr: { transform: 'translate(2700 220) scale(0.55)' } }, 0);
  const blink = (who, at) => tl.set([who + '-lidL', who + '-lidR'], { opacity: 1 }, at).set([who + '-lidL', who + '-lidR'], { opacity: 0 }, at + 0.12);
  const say = (who, at, dur = 2) => {     // a simple talking mouth flap for spoken lines
    for (let k = 0; k < dur / 0.24; k++) tl.set(who + '-mouth', { attr: { d: k % 2 ? 'M-8 -240 Q0 -232 8 -240' : 'M-7 -241 Q0 -228 7 -241' } }, at + k * 0.24);
    tl.set(who + '-mouth', { attr: { d: 'M-8 -240 Q0 -235 8 -240' } }, at + dur);
  };
  const sayP = (at, dur = 2) => {
    for (let k = 0; k < dur / 0.24; k++) tl.set(PI('mouth'), { attr: { d: k % 2 ? 'M-14 -364 Q0 -356 14 -364' : 'M-12 -366 Q0 -348 12 -366' } }, at + k * 0.24);
    tl.set(PI('mouth'), { attr: { d: 'M-14 -364 Q0 -360 14 -364' } }, at + dur);
  };

  // 0–14 the night sky
  tl.to('#fade', { opacity: 0, duration: 4, ease: 'sine.inOut' }, 0);
  tl.to(cam, { cx: 1300, cy: 330, s: 1.08, duration: 14, ease: 'sine.inOut' }, 0);
  tl.to('#star', { opacity: 0.7, duration: 1.5 }, 6).to('#star', { opacity: 0.2, duration: 2 }, 9);

  // 13–26 the plane hums across the stars
  tl.to('#plPos', { attr: { transform: 'translate(900 260) scale(0.6)' }, duration: 13, ease: 'none' }, 13);
  tl.to(cam, { cx: 1100, cy: 330, duration: 13, ease: 'sine.inOut' }, 14);
  // 26–32 the engine coughs: three jolts, then smoke
  [26.2, 27.4, 28.3].forEach((a, i) => tl.to('#plMove', { y: -14, rotation: i % 2 ? 4 : -4, svgOrigin: '900 260', duration: 0.12 }, a).to('#plMove', { y: 0, rotation: 0, duration: 0.4, ease: 'sine.out' }, a + 0.12));
  tl.to(state, { prop: 0.25, duration: 4 }, 27);
  // 31–44 the long spiral down
  tl.to('#plPos', { attr: { transform: 'translate(1250 640) scale(0.95)' }, duration: 8, ease: 'sine.in' }, 31);
  tl.to('#plMove', { rotation: -14, svgOrigin: '1250 640', duration: 4, ease: 'sine.inOut' }, 31).to('#plMove', { rotation: 10, duration: 4, ease: 'sine.inOut' }, 35);
  tl.to(cam, { cx: 1250, cy: 560, s: 1.1, duration: 10, ease: 'sine.inOut' }, 31);
  tl.to('#plPos', { attr: { transform: 'translate(1560 900) scale(1.25)' }, duration: 4.6, ease: 'power2.in' }, 39);
  tl.to('#plMove', { rotation: 6, svgOrigin: '1560 900', duration: 4.6 }, 39);
  tl.to(cam, { cx: 1480, cy: 760, s: 1.2, duration: 4.4, ease: 'power1.in' }, 39.4);
  // 43.6 impact
  tl.set('#flash', { opacity: 0.35 }, 43.6).to('#flash', { opacity: 0, duration: 0.6 }, 43.62);
  tl.to(state, { shake: 1, duration: 0.05 }, 43.6).to(state, { shake: 0, duration: 1.8, ease: 'power2.out' }, 43.7);
  tl.to(state, { burst: 1, duration: 3.5, ease: 'none' }, 43.6);
  tl.set(state, { prop: 0, nav: 0 }, 43.6);
  tl.to('#plMove', { rotation: 12, svgOrigin: '1560 960', duration: 0.5, ease: 'back.out(3)' }, 43.6);

  // 47–58 silence; the pilot climbs out from behind the wreck
  tl.set('#piMove', { opacity: 1 }, 47).to('#piMove', { y: 0, duration: 1.8, ease: 'power2.out' }, 47.2);
  tl.to(PI('armR'), { rotation: -60, duration: 0.6 }, 47.2).to(PI('armR'), { rotation: 0, duration: 0.8 }, 48.6);
  tl.to('#piMove', { x: -160, duration: 3.2, ease: 'sine.inOut' }, 50);
  tl.to(cam, { cx: 1260, cy: 720, s: 1.35, duration: 6, ease: 'sine.inOut' }, 49);
  // a cough, and he waves the smoke away
  tl.to(PI('body'), { scaleY: 0.95, duration: 0.15 }, 53.4).to(PI('body'), { scaleY: 1, duration: 0.4 }, 53.6)
    .to(PI('armL'), { rotation: 50, duration: 0.25, yoyo: true, repeat: 3 }, 54.2);
  // 56–72 checks the engine with the lamp; the sigh
  tl.to('#lampPos', { opacity: 1, duration: 1.2 }, 56);
  tl.to(PI('armL'), { rotation: 70, duration: 0.6 }, 57).to(PI('armR'), { rotation: 40, duration: 0.6 }, 57.2);
  tl.to(PI('head'), { rotation: 10, duration: 0.6 }, 57);
  [58.4, 59.2, 59.8].forEach((a) => tl.to(PI('armR'), { rotation: 58, duration: 0.15 }, a).to(PI('armR'), { rotation: 40, duration: 0.2 }, a + 0.15));   // the wrench
  tl.to(PI('armL'), { rotation: 0, duration: 0.8 }, 60.6).to(PI('armR'), { rotation: 0, duration: 0.8 }, 60.6).to(PI('head'), { rotation: -4, duration: 0.6 }, 60.6);
  tl.to(PI('body'), { scaleY: 0.93, duration: 1.2, ease: 'sine.inOut' }, 60.8).to(PI('body'), { scaleY: 1, duration: 1.4, ease: 'sine.inOut' }, 62);   // the sigh
  sayP(61.2, 4.6); sayP(67.6, 4.6);
  tl.to(cam, { cx: 1160, cy: 700, s: 1.6, duration: 8, ease: 'sine.inOut' }, 60);
  // 74 kicks the wheel… and hops, holding his foot
  tl.to(PI('legR'), { rotation: -45, duration: 0.18, ease: 'power2.in' }, 74).to(PI('legR'), { rotation: 0, duration: 0.2 }, 74.2);
  tl.to(PI('eyes'), { scaleY: 0.2, svgOrigin: '0 -398', duration: 0.1 }, 74.3).to(PI('eyes'), { scaleY: 1, duration: 0.2 }, 76.4);
  [74.4, 74.9, 75.4, 75.9].forEach((a, i) => tl.to('#piMove', { y: -40, x: -160 - (i + 1) * 30, duration: 0.22, ease: 'power2.out' }, a).to('#piMove', { y: 0, duration: 0.24, ease: 'power2.in' }, a + 0.22));
  tl.to(PI('legR'), { rotation: 70, duration: 0.2 }, 74.4).to(PI('legR'), { rotation: 0, duration: 0.4 }, 76.4);
  tl.to(PI('armR'), { rotation: 50, duration: 0.2 }, 74.4).to(PI('armR'), { rotation: 0, duration: 0.4 }, 76.4);

  // 78–92 sits on the sand: the canteen, one sip
  tl.to('#piMove', { y: 70, duration: 0.8, ease: 'power2.inOut' }, 78.4);
  tl.to([PI('legL'), PI('legR')], { rotation: -80, duration: 0.8 }, 78.4);
  tl.to('#canteen', { opacity: 1, duration: 0.3 }, 80.2).to(PI('armL'), { rotation: 20, duration: 0.5 }, 80.2);
  tl.to(PI('armL'), { rotation: 140, duration: 0.8, ease: 'sine.inOut' }, 82.4).to(PI('head'), { rotation: -14, duration: 0.8 }, 82.4);
  tl.to('#canteen', { attr: { transform: 'translate(-34 -360) rotate(150)' }, duration: 0.8, ease: 'sine.inOut' }, 82.4);
  tl.to(PI('armL'), { rotation: 20, duration: 0.7 }, 84.4).to('#canteen', { attr: { transform: 'translate(-76 -184)' }, duration: 0.7 }, 84.4).to(PI('head'), { rotation: 0, duration: 0.7 }, 84.4);
  sayP(86.8, 3.2);
  tl.to('#canteen', { opacity: 0, duration: 0.4 }, 91).to(PI('armL'), { rotation: 0, duration: 0.6 }, 91);
  tl.to(cam, { cx: 1080, cy: 720, s: 1.7, duration: 6, ease: 'sine.inOut' }, 80);
  tl.to('#lampPos', { opacity: 0.4, duration: 3 }, 92);

  // 94–122 lies back on the sand and looks up. A star winks; he doesn't notice — we do.
  tl.to('#PI-root', { rotation: -88, svgOrigin: '0 -60', duration: 2.2, ease: 'sine.inOut' }, 94);
  tl.to('#piMove', { y: 40, duration: 2.2, ease: 'sine.inOut' }, 94);
  tl.to([PI('legL'), PI('legR')], { rotation: 0, duration: 2.0, ease: 'sine.inOut' }, 94);
  tl.to(cam, { cx: 1200, cy: 300, s: 1.1, duration: 7, ease: 'sine.inOut' }, 98);
  sayP(104.4, 3.8);
  tl.to('#star', { opacity: 1, duration: 1.2 }, 110).to('#star', { scale: 1.8, svgOrigin: '1720 150', duration: 0.35, ease: 'power2.out' }, 113.2)
    .to('#star', { scale: 0.9, duration: 0.9, ease: 'sine.inOut' }, 113.55).to('#star', { scale: 1, duration: 0.6 }, 114.5);
  tl.to(cam, { cx: 1500, cy: 260, s: 1.25, duration: 6, ease: 'sine.inOut' }, 108);
  tl.to('#lampPos', { opacity: 0, duration: 3 }, 116);

  // 122–152 time-lapse: the stars wheel away and dawn comes, pink and gold
  tl.to('#wheel', { opacity: 1, duration: 3 }, 122).to('#wheel', { rotation: 38, svgOrigin: '1200 -400', duration: 28, ease: 'sine.inOut' }, 122).to('#wheel', { opacity: 0, duration: 8 }, 142);
  tl.to('#star', { opacity: 0, duration: 10 }, 132);
  tl.to(cam, { cx: 1300, cy: 520, s: 1.0, duration: 28, ease: 'sine.inOut' }, 122);
  tl.to('#cool', { opacity: 0.05, duration: 22, ease: 'sine.inOut' }, 128);
  tl.to('#dawn', { opacity: 0.95, duration: 22, ease: 'sine.inOut' }, 128).to('#dawn2', { opacity: 1, duration: 18, ease: 'sine.inOut' }, 134);
  tl.to('#sun', { opacity: 1, duration: 16, ease: 'sine.inOut' }, 136);
  tl.to(state, { bright: 1.25, duration: 22, ease: 'sine.inOut' }, 128);

  // 152–166 close on the sleeping pilot; a small shadow falls across his face; the voice
  tl.set(cam, { cx: 830, cy: 900, s: 2.4 }, 152);
  tl.set([PI('lidL'), PI('lidR')], { opacity: 1 }, 120);
  tl.to('#faceShadow', { opacity: 0.4, x: 0, duration: 1.6, ease: 'sine.out' }, 154.6);
  tl.set('#faceShadow', { x: 120 }, 0);
  tl.to(cam, { s: 2.6, duration: 12, ease: 'sine.inOut' }, 152);

  // 166–178 he jolts up — and there is the boy on the dune
  tl.set([PI('lidL'), PI('lidR')], { opacity: 0 }, 165.6);
  tl.to('#faceShadow', { opacity: 0, duration: 0.3 }, 165.8);
  tl.to([PI('legL'), PI('legR')], { rotation: -80, duration: 0.45 }, 166);
  tl.to('#PI-root', { rotation: 0, duration: 0.45, ease: 'back.out(2)' }, 166).to('#piMove', { y: 70, duration: 0.45 }, 166);
  tl.set(PI('goggles'), { y: 0 }, 0);
  tl.set('#byMove', { opacity: 1 }, 165);
  tl.set(cam, { cx: 900, cy: 700, s: 1.3 }, 166.6);
  tl.to(cam, { cx: 820, cy: 720, s: 1.4, duration: 10, ease: 'sine.inOut' }, 167);
  blink('#BY', 168.2); blink('#PI', 169.4);
  sayP(170.4, 2.2);
  say('#BY', 175.6, 3); tl.to(B('head'), { rotation: -6, duration: 0.8 }, 175.6);

  // 180–196 he looks round the empty desert; the boy only asks again
  tl.to(PI('head'), { rotation: -14, duration: 0.8 }, 180.4).to(PI('head'), { rotation: 14, duration: 1.2 }, 181.6).to(PI('head'), { rotation: 0, duration: 0.8 }, 183.2);
  tl.to(cam, { cx: 900, cy: 640, s: 1.15, duration: 4, ease: 'sine.inOut' }, 180);
  sayP(184.2, 6); tl.to(PI('armL'), { rotation: 40, duration: 0.5 }, 185).to(PI('armL'), { rotation: 0, duration: 0.8 }, 189);
  blink('#BY', 191.2); say('#BY', 192.4, 3.6); tl.to(B('head'), { rotation: 6, duration: 0.8 }, 192.4);
  tl.to(cam, { cx: 640, cy: 760, s: 1.8, duration: 4, ease: 'sine.inOut' }, 191.6);

  // 197–214 "I don't really draw." — "That doesn't matter."
  tl.to(cam, { cx: 980, cy: 700, s: 1.45, duration: 3, ease: 'sine.inOut' }, 197.4);
  sayP(199.2, 3.6); tl.to(PI('armR'), { rotation: -30, duration: 0.6 }, 199.6).to(PI('armR'), { rotation: 0, duration: 0.8 }, 202.4);
  tl.to('#byMove', { x: 160, duration: 2.4, ease: 'sine.inOut' }, 203.2);
  say('#BY', 205.6, 3.8);
  tl.to(PI('body'), { scaleY: 0.95, duration: 1 }, 211).to(PI('body'), { scaleY: 1, duration: 1.2 }, 212);   // a sigh… and a small laugh
  tl.to(PI('mouth'), { attr: { d: 'M-16 -366 Q0 -352 16 -366' }, duration: 0.4 }, 213);
  sayP(214.8, 2.6);

  // 218–240 the notebook and pencil come out; the boy leans in; we push into the page
  tl.to(PI('armL'), { rotation: 30, duration: 0.6 }, 218).to('#notebook', { opacity: 1, duration: 0.3 }, 218.5);
  tl.to(PI('armR'), { rotation: 34, duration: 0.6 }, 219.6);
  tl.to('#byMove', { x: 260, duration: 2, ease: 'sine.inOut' }, 220);
  tl.to(B('head'), { rotation: 10, duration: 0.8 }, 221);
  tl.to(cam, { cx: 1030, cy: 760, s: 1.6, duration: 6, ease: 'sine.inOut' }, 218);
  tl.to(cam, { cx: 1080, cy: 830, s: 6, duration: 4.5, ease: 'power3.in' }, 232.8);
  tl.to('#paper', { opacity: 1, duration: 1.4, ease: 'sine.in' }, 236.4);

  // ---------- per-frame drive ----------
  function drive(t) {
    // propeller blur and nav lights
    const pr = $('#PL-prop');
    pr.setAttribute('transform', `translate(-268 -30) scale(1 ${(state.prop > 0.01 ? 0.15 + 0.85 * Math.abs(Math.sin(t * 40 * state.prop)) : 1).toFixed(3)})`);
    $('#navR').setAttribute('opacity', state.nav * (Math.floor(t * 1.2) % 2 ? 1 : 0.15));
    $('#navG').setAttribute('opacity', state.nav * (Math.floor(t * 1.2 + 0.5) % 2 ? 1 : 0.15));
    // smoke from the coughing engine, trailing behind the falling plane
    const m = $('#plPos').transform.baseVal.consolidate().matrix;
    for (const p of puffs) {
      const u = t - p.t0;
      if (u < 0 || u > 5 || p.t0 > 46) { p.c.setAttribute('opacity', 0); continue; }
      const nx = m.e + m.a * -250, ny = m.f + m.d * -40;           // trail streams back from the nose
      p.x = nx + u * 150 * m.a; p.y = ny - u * 70 * m.a + Math.sin(p.ph) * 12;
      p.c.setAttribute('cx', (p.x + u * 40).toFixed(1)); p.c.setAttribute('cy', (p.y - u * 30).toFixed(1));
      p.c.setAttribute('r', (14 + u * 26).toFixed(1)); p.c.setAttribute('opacity', (0.55 * (1 - u / 5)).toFixed(3));
    }
    // after the crash, a thin smoke column from the engine
    if (t > 44) for (let i = 0; i < 6; i++) {
      const p = puffs[i], u = ((t - 44) * 0.4 + i / 6) % 1;
      p.c.setAttribute('cx', (1250 + Math.sin(t * 0.7 + i) * 20 + u * 60).toFixed(1)); p.c.setAttribute('cy', (860 - u * 380).toFixed(1));
      p.c.setAttribute('r', (16 + u * 40).toFixed(1)); p.c.setAttribute('opacity', (0.32 * Math.sin(Math.PI * u) * Math.max(0, 1 - (t - 120) / 30)).toFixed(3));
    }
    // sand burst at impact
    for (const g of grains) {
      const u = state.burst * 3.5;
      if (state.burst <= 0 || state.burst >= 1) { g.c.setAttribute('opacity', 0); continue; }
      const x = 1400 + Math.cos(g.a) * g.v * u, y = 960 + Math.sin(g.a) * g.v * u + 260 * u * u;
      g.c.setAttribute('cx', x.toFixed(1)); g.c.setAttribute('cy', Math.min(y, 990).toFixed(1)); g.c.setAttribute('r', g.r);
      g.c.setAttribute('opacity', (0.9 * (1 - state.burst)).toFixed(3));
    }
    Boy.scarf('BY', t, 0.9 + 0.3 * Math.sin(t * 0.7), -1);
    Pilot.scarf('PI', t, 0.4, -1);
    // breathing
    if (t < 94 || t > 166) $('#PI-bob').setAttribute('transform', `translate(0 ${(Math.sin(t * 1.6) * 2).toFixed(2)})`);
    $('#BY-bob').setAttribute('transform', `translate(0 ${(Math.sin(t * 1.9) * 2).toFixed(2)})`);
    subs(t);
    const w = cinemaFrame(t, state.shake * 1.6);
    applyCam(w);
    drawBokeh(bokeh, t, cam, Math.max(0, Math.min(1, (cam.s - 1.3) / 0.4)) * 0.6);
  }

  return { render: (t) => { tl.seek(t); drive(t); } };
}
