// SEQ 4a — NIGHT CAMP (~1:06). The first night by the broken plane. The boy shows the box his star;
// the pilot counts his water; the boy falls asleep mid-sentence; the pilot covers him and dims the lamp.
// Ends looking up at the stars, where Seq 4b begins.
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {cinemaCss, cinemaHtml, cinemaFrame, makeBokeh, drawBokeh} from './cinema.js';
import {Boy, Pilot, Plane, BOY_PIVOTS, PILOT_PIVOTS} from './characters.js';

export const DURATION = 66;

const SUBS = [
  [3.5, 7.0, 'That one’s mine. The little one, right there.', '那颗是我的。那颗小小的，就在那儿。'],
  [8.6, 11.4, 'Tomorrow, you’ll see it up close.', '明天，你就能近距离看到它了。'],
  [14.6, 19.6, 'Seven days of water. And a boy who lives on a star.', '还剩七天的水。还有一个住在星星上的男孩。'],
  [20.4, 23.6, 'Get some sleep, kid. It’s late.', '睡吧，孩子。很晚了。'],
  [24.2, 27.4, 'Will the plane be fixed tomorrow?', '飞机明天能修好吗？'],
  [28.0, 29.6, '…Maybe.', '……也许吧。'],
  [33.5, 37.4, '*yawn* I’m not sleepy… not… sleepy…', '*打哈欠* 我不困……一点……都不困……'],
  [51.0, 53.0, 'Goodnight, sheep.', '晚安，小羊。'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('');

export const css = `
#stage{position:relative;width:1920px;height:804px;overflow:hidden;background:#141a3c}
#world{position:absolute;left:0;top:0;width:2400px;height:1005px;transform-origin:0 0;filter:contrast(1.07) saturate(1.08)}
.bg{position:absolute;left:0;top:0;width:2400px;height:1005px}
#svg{position:absolute;left:0;top:0;width:2400px;height:1005px;overflow:visible}
#subs{position:absolute;left:0;right:0;bottom:30px;text-align:center;pointer-events:none}
#subs .en{font:italic 40px/1.25 Lora,Georgia,serif;color:#fffaf0;text-shadow:0 0 6px rgba(10,12,40,.9),0 0 18px rgba(10,12,40,.7)}
#subs .en.say{font-style:normal}
#subs .zh{font:31px/1.5 "Noto Serif SC",serif;color:#fff3e0;text-shadow:0 0 6px rgba(10,12,40,.9),0 0 16px rgba(10,12,40,.7)}
#cool{position:absolute;inset:0;pointer-events:none;background:#3a4fb8;mix-blend-mode:soft-light;opacity:.32}
#lampLight{position:absolute;inset:0;pointer-events:none;mix-blend-mode:soft-light;background:radial-gradient(ellipse 45% 55% at var(--lx) var(--ly),rgba(255,190,110,.75),rgba(255,190,110,0) 70%)}
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
const INK = '#4a3428';
// the sheep's box, small, with a wink of an eye in the middle hole
const BOX = `<g filter="url(#wcBoy)">
  <path d="M-40 -50 L40 -50 L40 0 L-40 0Z" fill="#d8ac80" stroke="${INK}" stroke-width="3"/>
  <path d="M40 -50 L52 -60 L52 -10 L40 0Z" fill="#b48a62" stroke="${INK}" stroke-width="3"/>
  <path d="M-40 -50 L-28 -60 L52 -60 L40 -50Z" fill="#e6c49c" stroke="${INK}" stroke-width="3"/>
  <circle cx="-20" cy="-26" r="5" fill="#3a2a22"/><circle cx="0" cy="-30" r="5" fill="#3a2a22"/><circle cx="20" cy="-26" r="5" fill="#3a2a22"/></g>
  <g id="peek" opacity="0"><circle cx="-2" cy="-30" r="2.2" fill="#fff"/><circle cx="2.4" cy="-30.6" r="1.6" fill="#fff"/></g>`;

export const html = (IMG) => `
<div id="stage">
 <div id="world">
  <img class="bg" id="bgImg" src="${IMG}plate_desert.jpg">
  <svg id="svg" viewBox="0 0 2400 1005">
   <defs>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    ${wc('wcPlane', 3)}${wc('wcPilot', 7)}${wc('wcBoy', 11)}
    ${Plane.defs('PL')}${Pilot.defs('PI')}${Boy.defs('BY')}
    <radialGradient id="lampG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffe6a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffb850" stop-opacity="0"/></radialGradient>
   </defs>
   <g id="plPos" transform="translate(1680 905) scale(1.25)"><g filter="url(#wcPlane)">${Plane.svg('PL')}</g></g>
   <g id="crate" filter="url(#wcBoy)"><path d="M640 975 L760 975 L760 905 L640 905Z" fill="#a8784e" stroke="${INK}" stroke-width="4"/><path d="M640 930 H760 M640 952 H760" stroke="${INK}" stroke-width="2.5" opacity=".6"/></g>
   <g id="lampPos" transform="translate(960 970)"><circle id="lampGlow" cy="-50" r="300" fill="url(#lampG)"/><rect x="-14" y="-40" width="28" height="40" rx="6" fill="#c08a40" stroke="${INK}" stroke-width="3"/>
    <circle id="lampFlame" cy="-22" r="9" fill="#fff2c0"/><path d="M-10 -40 Q0 -58 10 -40" fill="none" stroke="${INK}" stroke-width="3"/></g>
   <g id="byMove"><g id="byPos" transform="translate(700 935) scale(0.62)"><g filter="url(#wcBoy)">${Boy.svg('BY')}</g>
     <g id="blanket" opacity="0"><path d="M-190 -84 Q-120 -128 -20 -110 Q60 -98 84 -50 L76 -22 L-200 -22Z" fill="#8e5c36" stroke="${INK}" stroke-width="4" filter="url(#wcPilot)"/></g></g></g>
   <g id="boxPos" transform="translate(700 902) scale(0.9)"><g id="boxIn">${BOX}</g></g>
   <g id="piMove"><g id="piPos" transform="translate(1260 975) scale(0.72)"><g filter="url(#wcPilot)">${Pilot.svg('PI')}</g>
     <g id="canteen" opacity="0"><rect x="-16" y="-30" width="32" height="44" rx="12" fill="#6a7a5a" stroke="${INK}" stroke-width="3"/></g></g></g>
  </svg>
 </div>
 <div id="cool"></div>
 <div id="lampLight"></div>
 ${cinemaHtml}
 <div id="subs"><div class="en"></div><div class="zh"></div></div>
 <div id="fade"></div>
</div>`;

export function setup() {
  const $ = (s) => document.querySelector(s);
  const B = (p) => '#BY-' + p, PI = (p) => '#PI-' + p;
  function subs(t) {
    const en = $('#subs .en'), zh = $('#subs .zh'); let on = null;
    for (const s of SUBS) if (t >= s[0] - 0.25 && t <= s[1] + 0.3) on = s;
    if (!on) { en.textContent = ''; zh.textContent = ''; return; }
    const k = Math.min(1, (t - on[0] + 0.25) / 0.3, (on[1] + 0.3 - t) / 0.3);
    en.textContent = on[2]; zh.textContent = on[3]; en.className = 'en' + (on[4] ? ' say' : '');
    $('#subs').style.opacity = Math.max(0, k);
  }
  const bokeh = makeBokeh(10, ['#ffe6b8', '#d9dcff', '#ffd6a0'], 31);
  const cam = { cx: 1150, cy: 640, s: 1.15 };
  const st = { lamp: 1, hammer: 1, shake: 0 };
  function applyCam(t) {
    const w = cinemaFrame(t, st.shake);
    const hw = 960 / cam.s, hh = 402 / cam.s;
    const cx = Math.min(Math.max(cam.cx, hw), 2400 - hw), cy = Math.min(Math.max(cam.cy, hh), 1005 - hh);
    $('#world').style.transform = `translate(${(960 - cx * cam.s + w.wx).toFixed(2)}px, ${(402 - cy * cam.s + w.wy).toFixed(2)}px) scale(${cam.s})`;
    $('#bgImg').style.filter = `blur(${Math.max(0, (cam.s - 1.3) * 2.6).toFixed(2)}px)`;
    // the lamp's warm pool, in screen space
    const lx = 960 + (960 - cx) * cam.s, ly = 402 + (920 - cy) * cam.s;
    $('#lampLight').style.setProperty('--lx', lx.toFixed(0) + 'px'); $('#lampLight').style.setProperty('--ly', ly.toFixed(0) + 'px');
    $('#lampLight').style.opacity = st.lamp;
    drawBokeh(bokeh, t, cam, Math.max(0, Math.min(1, (cam.s - 1.3) / 0.4)) * 0.6);
  }

  const tl = gsap.timeline({ paused: true });
  const pv = (id, map) => Object.entries(map).forEach(([part, o]) => tl.set(id + '-' + part, { rotation: 0, svgOrigin: o }, 0));
  pv('#BY', BOY_PIVOTS); pv('#PI', PILOT_PIVOTS);
  tl.set('#PI-root', { rotation: 0, svgOrigin: '0 0' }, 0).set('#BY-root', { rotation: 0, svgOrigin: '0 -60' }, 0);
  tl.set([B('legL'), B('legR')], { scaleY: 0.5 }, 0).set('#byMove', { y: 28 }, 0);
  tl.set(B('armL'), { rotation: -32 }, 0).set(B('armR'), { rotation: 32 }, 0);
  tl.set('#fade', { opacity: 1 }, 0).to('#fade', { opacity: 0, duration: 2 }, 0);
  const TALK_B = 'M-8 -241 Q0 -230 8 -241', REST_B = 'M-8 -240 Q0 -235 8 -240', SMILE_B = 'M-9 -241 Q0 -232 9 -241', YAWN_B = 'M-7 -244 Q0 -222 7 -244';
  const TALK_P = 'M-14 -366 Q0 -352 14 -366', REST_P = 'M-14 -364 Q0 -360 14 -364', SMILE_P = 'M-15 -366 Q0 -355 15 -366', FLAT_P = 'M-14 -362 L14 -362';
  const talk = (sel, at, dur, a, rest) => { for (let k = 0; k < dur / 0.2; k++) tl.set(sel, { attr: { d: k % 2 ? rest : a } }, at + k * 0.2); tl.set(sel, { attr: { d: rest } }, at + dur); };
  const blinkB = (at) => tl.set([B('lidL'), B('lidR')], { opacity: 1 }, at).set([B('lidL'), B('lidR')], { opacity: 0 }, at + 0.14);
  const blinkP = (at) => tl.set([PI('lidL'), PI('lidR')], { opacity: 1 }, at).set([PI('lidL'), PI('lidR')], { opacity: 0 }, at + 0.14);

  // 0–12 the boy on his crate, the box on his lap, showing it the sky; the pilot hammers at the engine
  tl.to(cam, { cx: 820, cy: 700, s: 1.5, duration: 9, ease: 'sine.inOut' }, 1);
  tl.to(B('head'), { rotation: -6, duration: 1 }, 1).to(B('eyes'), { y: -5, x: 3, duration: 0.6 }, 2.8);
  tl.to(B('armR'), { rotation: -150, duration: 0.7, ease: 'back.out(1.6)' }, 3.2).to(B('armR'), { rotation: -140, duration: 0.3, yoyo: true, repeat: 3 }, 4.0)
    .to(B('armR'), { rotation: 32, duration: 0.8, ease: 'sine.inOut' }, 7.4);
  talk(B('mouth'), 3.5, 3.4, TALK_B, SMILE_B);
  tl.to(B('head'), { rotation: 8, duration: 0.9 }, 7.6).to(B('eyes'), { y: 4, x: 2, duration: 0.5 }, 7.6);
  tl.to('#peek', { opacity: 1, duration: 0.3 }, 8.0).set('#peek', { opacity: 0 }, 9.2).set('#peek', { opacity: 1 }, 9.35).to('#peek', { opacity: 0, duration: 0.4 }, 11.4);
  talk(B('mouth'), 8.6, 2.8, TALK_B, SMILE_B); blinkB(2.2); blinkB(7.9);
  // 12–20 the pilot: stops, wipes his brow, shakes the canteen
  tl.to(cam, { cx: 1240, cy: 640, s: 1.55, duration: 2.8, ease: 'sine.inOut' }, 11.6);
  tl.to(st, { hammer: 0, duration: 0.3 }, 12.4);
  tl.to(PI('armR'), { rotation: 0, duration: 0.8, ease: 'sine.inOut' }, 12.6);
  tl.to(PI('armL'), { rotation: 150, duration: 0.7, ease: 'sine.inOut' }, 13.0).to(PI('armL'), { rotation: 140, duration: 0.25, yoyo: true, repeat: 1 }, 13.7)
    .to(PI('armL'), { rotation: 20, duration: 0.6 }, 14.3);
  tl.set('#canteen', { opacity: 1, x: -76, y: -184 }, 14.3);
  tl.to(PI('armL'), { rotation: 70, duration: 0.6 }, 14.5).to('#canteen', { x: -150, y: -260, duration: 0.6 }, 14.5)
    .to('#canteen', { rotation: 18, duration: 0.12, yoyo: true, repeat: 7, svgOrigin: '0 -8' }, 15.2);
  tl.to(PI('head'), { rotation: -6, duration: 0.6 }, 14.6).to(PI('eyes'), { x: -6, y: 4, duration: 0.4 }, 14.6);
  talk(PI('mouth'), 14.6, 5, TALK_P, FLAT_P); blinkP(16.8);
  tl.to(PI('head'), { rotation: 6, duration: 0.9, ease: 'sine.inOut' }, 18.0).to(PI('eyes'), { x: -10, y: 0, duration: 0.4 }, 18.0);
  tl.to(PI('armL'), { rotation: 0, duration: 0.7 }, 19.4).set('#canteen', { opacity: 0 }, 20.0);
  // 20–30 "Get some sleep, kid."
  tl.to(cam, { cx: 1000, cy: 660, s: 1.25, duration: 3.5, ease: 'sine.inOut' }, 20.0);
  talk(PI('mouth'), 20.4, 3.2, TALK_P, SMILE_P);
  tl.to(B('head'), { rotation: 4, duration: 0.6 }, 23.8).to(B('eyes'), { x: 6, y: 0, duration: 0.4 }, 23.8);
  talk(B('mouth'), 24.2, 3.2, TALK_B, REST_B);
  tl.to(PI('head'), { rotation: -4, duration: 1.2 }, 27.6).to(PI('eyes'), { x: 0, y: 6, duration: 0.6 }, 27.6);
  talk(PI('mouth'), 28.0, 1.4, TALK_P, FLAT_P);
  tl.to(st, { hammer: 1, duration: 0.2 }, 30.2).to(PI('eyes'), { x: 6, y: -2, duration: 0.4 }, 30.2);
  // 30–40 the boy sets the box down, yawns, lies down beside it, and is asleep mid-sentence
  tl.to(cam, { cx: 720, cy: 720, s: 1.6, duration: 4, ease: 'sine.inOut' }, 30.6);
  tl.to('#boxPos', { attr: { transform: 'translate(560 975) scale(1.0)' }, duration: 1.0, ease: 'power2.inOut' }, 31.0)
    .to([B('armL'), B('armR')], { rotation: 0, duration: 1.0 }, 31.0);
  tl.to([B('armL')], { rotation: 160, duration: 0.8, ease: 'sine.out' }, 32.4).to([B('armR')], { rotation: -160, duration: 0.8, ease: 'sine.out' }, 32.4)
    .to(B('mouth'), { attr: { d: YAWN_B }, duration: 0.4 }, 32.4).set([B('lidL'), B('lidR')], { opacity: 1 }, 32.6)
    .to(B('mouth'), { attr: { d: REST_B }, duration: 0.4 }, 33.4).set([B('lidL'), B('lidR')], { opacity: 0 }, 33.4)
    .to([B('armL'), B('armR')], { rotation: 0, duration: 0.8 }, 33.4);
  talk(B('mouth'), 33.8, 3.4, TALK_B, REST_B);
  tl.to(B('head'), { rotation: 10, duration: 0.5, yoyo: true, repeat: 1 }, 35.4);       // nodding off
  tl.to([B('legL'), B('legR')], { scaleY: 1, duration: 1.2, ease: 'sine.inOut' }, 36.4).to('#byMove', { y: 40, x: -30, duration: 1.4, ease: 'sine.inOut' }, 36.4)
    .to('#BY-root', { rotation: -86, duration: 1.4, ease: 'sine.inOut' }, 36.4).to(B('head'), { rotation: -14, duration: 1.4 }, 36.4)
    .to(B('armL'), { rotation: -50, duration: 1.2 }, 36.6);
  tl.set([B('lidL'), B('lidR')], { opacity: 1 }, 37.6).set(B('mouth'), { attr: { d: SMILE_B } }, 38.0);
  // 40–53 the pilot comes over, covers him with his jacket, says goodnight to the box
  tl.to(st, { hammer: 0, duration: 0.2 }, 39.4);
  tl.to(PI('armR'), { rotation: 0, duration: 0.6 }, 39.4);
  tl.to(cam, { cx: 820, cy: 690, s: 1.35, duration: 5, ease: 'sine.inOut' }, 39.6);
  tl.to('#piMove', { x: -360, duration: 5, ease: 'sine.inOut' }, 40.0);
  tl.to(PI('head'), { rotation: -8, duration: 1 }, 45.2).to(PI('eyes'), { x: -8, y: 8, duration: 0.5 }, 45.2);
  tl.to('#PI-root', { rotation: -14, duration: 0.8, ease: 'sine.inOut' }, 46.4).to(PI('armL'), { rotation: 40, duration: 0.8 }, 46.4).to(PI('armR'), { rotation: 30, duration: 0.8 }, 46.4);
  tl.to('#blanket', { opacity: 1, duration: 0.5 }, 47.2).from('#blanket', { y: -60, duration: 0.8, ease: 'power2.out' }, 47.2);
  tl.to('#PI-root', { rotation: 0, duration: 0.9, ease: 'sine.inOut' }, 48.4).to([PI('armL'), PI('armR')], { rotation: 0, duration: 0.8 }, 48.4);
  tl.to(cam, { cx: 700, cy: 760, s: 1.75, duration: 3, ease: 'sine.inOut' }, 48.6);
  tl.to(PI('head'), { rotation: -12, duration: 0.6 }, 49.6).to(PI('eyes'), { x: -10, y: 10, duration: 0.4 }, 49.6);
  tl.to('#peek', { opacity: 1, duration: 0.3 }, 50.2).set('#peek', { opacity: 0 }, 50.9).set('#peek', { opacity: 1 }, 51.05).to('#peek', { opacity: 0, duration: 0.6 }, 53.4);
  talk(PI('mouth'), 51.0, 2.0, TALK_P, SMILE_P);
  // 53–58 back to the lamp, which he turns down
  tl.to(PI('head'), { rotation: 0, duration: 0.6 }, 53.4).to(PI('eyes'), { x: 4, y: 0, duration: 0.4 }, 53.4);
  tl.to('#piMove', { x: -260, duration: 2.0, ease: 'sine.inOut' }, 53.6);
  tl.to(cam, { cx: 980, cy: 640, s: 1.2, duration: 4, ease: 'sine.inOut' }, 53.4);
  tl.to(PI('armL'), { rotation: 30, duration: 0.6 }, 55.8).to(st, { lamp: 0.35, duration: 1.4 }, 56.2).to('#lampGlow', { opacity: 0.35, duration: 1.4 }, 56.2)
    .to('#lampFlame', { attr: { r: 5 }, duration: 1.4 }, 56.2).to(PI('armL'), { rotation: 0, duration: 0.6 }, 57.4);
  // 57–66 up to the stars
  tl.to(cam, { cx: 1300, cy: 402, s: 1.0, duration: 8, ease: 'sine.inOut' }, 57.6);

  const WALKS = [[40.0, 45.0], [53.6, 55.6]];
  function drive(t) {
    const b = Math.floor(t * 12) % 4;
    ['wcPlaneB', 'wcPilotB', 'wcBoyB'].forEach((id, i) => $('#' + id).setAttribute('seed', 3 + i * 4 + b));
    // hammering at the engine
    if (st.hammer > 0) gsap.set(PI('armR'), { rotation: -120 + Math.sin(t * 9) * 16 * st.hammer });
    // walking: legs swing, body bobs
    let w = 0, ph = 0;
    for (const [a, z] of WALKS) { const k = Math.min(1, Math.max(0, (t - a) / 0.3)) * (1 - Math.min(1, Math.max(0, (t - z + 0.3) / 0.3))); if (k > w) { w = k; ph = (t - a) * Math.PI * 2 * 1.1; } }
    if (w > 0) { gsap.set(PI('legL'), { rotation: Math.sin(ph) * 18 * w }); gsap.set(PI('legR'), { rotation: -Math.sin(ph) * 18 * w }); }
    $('#PI-bob').setAttribute('transform', `translate(0 ${(Math.sin(t * 1.6) * 2 - Math.abs(Math.sin(ph)) * 8 * w).toFixed(2)})`);
    $('#BY-bob').setAttribute('transform', `translate(0 ${(Math.sin(t * (t > 38 ? 1.1 : 1.9)) * 2).toFixed(2)})`);
    Boy.scarf('BY', t, t > 37 ? 0.1 : 0.4, -1);
    Pilot.scarf('PI', t, 0.25, -1);
    $('#lampFlame').setAttribute('opacity', (0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 7.3)).toFixed(3));
    subs(t);
    applyCam(t);
  }
  return { render: (t) => { tl.seek(t); drive(t); } };
}
