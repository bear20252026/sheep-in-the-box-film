// SEQ 12 — EPILOGUE, THE DESERT (~1:03). The last night in the Sahara. The plane is fixed; the engine purrs.
// The pilot takes out his notebook: the box, and the strap he never drew. He looks up, and the stars laugh
// like five hundred million little bells. One star winks. We push in on it — into gold light (Seq 12b).
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {cinemaCss, cinemaHtml, cinemaFrame, makeBokeh, drawBokeh} from './cinema.js';
import {Pilot, Plane, PILOT_PIVOTS} from './characters.js';

export const DURATION = 63;
const STAR = { x: 1300, y: 170 };

const SUBS = [
  [5.0, 7.6, 'Listen to that.', '听听这声音。', 'say'],
  [8.4, 11.0, 'She’ll fly at dawn.', '天一亮，它就能飞了。', 'say'],
  [20.6, 23.6, 'A box. And the sheep is inside.', '一个箱子。小羊就在里面。', 'say'],
  [24.6, 28.0, 'I never did draw the strap.', '我始终没有画上那根带子。', 'say'],
  [33.0, 35.6, 'Do you hear that?', '你听见了吗？', 'say'],
  [37.0, 41.0, 'Five hundred million little bells.', '五亿个小铃铛。', 'say'],
  [46.4, 49.0, 'Goodnight, little prince.', '晚安，小王子。', 'say'],
  [49.6, 51.6, 'Goodnight, sheep.', '晚安，小羊。', 'say'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('') + 'the sheep is inside';

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
#nb{position:absolute;inset:0;opacity:0;transform-origin:50% 50%;filter:sepia(.35) brightness(.86) saturate(1.2)}
#nb img{position:absolute;left:-240px;top:-100px;width:2400px;height:1005px}
#nb svg{position:absolute;left:0;top:0;width:1920px;height:804px;overflow:visible}
#nbShade{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,rgba(255,200,120,0) 40%,rgba(40,30,60,.55) 100%);mix-blend-mode:multiply}
.pn{fill:none;stroke:#4a3a30;stroke-width:4;stroke-linecap:round;stroke-linejoin:round}
#flash img{position:absolute;inset:0;width:100%;height:100%;mix-blend-mode:multiply;opacity:.35}
#flash{position:absolute;inset:0;pointer-events:none;opacity:0;background:radial-gradient(circle at var(--fx) var(--fy),#fffdf2 0%,#ffeec0 30%,#ffd98a 70%,#f6c070 100%)}
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
// the notebook page: the box with three holes, drawn in pencil, and a note underneath
const PAGE = [
  'M-170 -90 L150 -90 L150 110 L-170 110 Z', 'M150 -90 L205 -135 L205 65 L150 110', 'M-170 -90 L-115 -135 L205 -135',
  'M-90 10 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0', 'M-10 -4 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0', 'M70 10 m-14 0 a14 14 0 1 0 28 0 a14 14 0 1 0 -28 0',
];

export const html = (IMG) => `
<div id="stage">
 <div id="world">
  <img class="bg" id="bgImg" src="${IMG}plate_desert.jpg">
  <svg id="svg" viewBox="0 0 2400 1005">
   <defs>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    ${wc('wcPlane', 3)}${wc('wcPilot', 7)}
    ${Plane.defs('PL')}${Pilot.defs('PI')}
    <radialGradient id="lampG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffe6a8" stop-opacity=".9"/><stop offset="1" stop-color="#ffb850" stop-opacity="0"/></radialGradient>
    <radialGradient id="starG"><stop offset="0" stop-color="#fffef4" stop-opacity="1"/><stop offset=".25" stop-color="#fff1c0" stop-opacity=".8"/><stop offset="1" stop-color="#ffd890" stop-opacity="0"/></radialGradient>
   </defs>
   <g id="twinkles"></g>
   <g id="wstar" transform="translate(${STAR.x} ${STAR.y})"><circle id="wGlow" r="60" fill="url(#starG)" style="mix-blend-mode:screen"/>
    <g id="wRay"><path d="M0 -34 L4 -4 L34 0 L4 4 L0 34 L-4 4 L-34 0 L-4 -4Z" fill="#fffbe6"/><path d="M0 -14 L2 -2 L14 0 L2 2 L0 14 L-2 2 L-14 0 L-2 -2Z" fill="#fff" transform="rotate(45)"/></g></g>
   <g id="plPos" transform="translate(1680 905) scale(1.25)"><g filter="url(#wcPlane)">${Plane.svg('PL')}</g></g>
   <g id="crate" filter="url(#wcPilot)"><path d="M640 975 L760 975 L760 905 L640 905Z" fill="#a8784e" stroke="${INK}" stroke-width="4"/><path d="M640 930 H760 M640 952 H760" stroke="${INK}" stroke-width="2.5" opacity=".6"/></g>
   <g id="lampPos" transform="translate(960 970)"><circle id="lampGlow" cy="-50" r="300" fill="url(#lampG)"/><rect x="-14" y="-40" width="28" height="40" rx="6" fill="#c08a40" stroke="${INK}" stroke-width="3"/>
    <circle id="lampFlame" cy="-22" r="9" fill="#fff2c0"/><path d="M-10 -40 Q0 -58 10 -40" fill="none" stroke="${INK}" stroke-width="3"/></g>
   <g id="piMove"><g id="piPos" transform="translate(1260 975) scale(0.72)"><g filter="url(#wcPilot)">${Pilot.svg('PI')}</g>
     <g id="notebook" opacity="0"><rect x="-150" y="-300" width="50" height="64" rx="4" fill="#e8dcc0" stroke="${INK}" stroke-width="3"/><path d="M-125 -300 V-236" stroke="${INK}" stroke-width="2"/></g></g></g>
  </svg>
 </div>
 <div id="cool"></div>
 <div id="lampLight"></div>
 <div id="nb"><img src="${IMG}paper.jpg"><svg viewBox="0 0 1920 804">
  <defs><filter id="sk"><feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="5"/></filter></defs>
  <g transform="translate(940 340) scale(1.5) rotate(-3)" filter="url(#sk)">${PAGE.map((d) => `<path class="pn" d="${d}"/>`).join('')}
   <g id="nbEye" opacity="0"><circle cx="-10" cy="-4" r="7" fill="#3a2a22"/><circle cx="-8" cy="-6" r="2.4" fill="#fff"/></g>
   <text x="-150" y="175" font-family="Lora,Georgia,serif" font-style="italic" font-size="34" fill="#4a3a30">the sheep is inside</text>
   <path class="pn" d="M-150 190 L170 186" stroke-width="2" opacity=".5"/></g></svg><div id="nbShade"></div></div>
 ${cinemaHtml}
 <div id="flash"><img src="${IMG}paper.jpg"></div>
 <div id="subs"><div class="en"></div><div class="zh"></div></div>
 <div id="fade"></div>
</div>`;

export function setup() {
  const $ = (s) => document.querySelector(s);
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, parent, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
  const PI = (p) => '#PI-' + p;
  function subs(t) {
    const en = $('#subs .en'), zh = $('#subs .zh'); let on = null;
    for (const s of SUBS) if (t >= s[0] - 0.25 && t <= s[1] + 0.3) on = s;
    if (!on) { en.textContent = ''; zh.textContent = ''; return; }
    const k = Math.min(1, (t - on[0] + 0.25) / 0.3, (on[1] + 0.3 - t) / 0.3);
    en.textContent = on[2]; zh.textContent = on[3]; en.className = 'en' + (on[4] ? ' say' : '');
    $('#subs').style.opacity = Math.max(0, k);
  }
  const H = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  // the laughing stars: small sparkles scattered over the painted sky
  const tw = []; for (let i = 0; i < 70; i++) tw.push(mk('path', $('#twinkles'), { d: 'M0 -6 L1.3 -1.3 L6 0 L1.3 1.3 L0 6 L-1.3 1.3 L-6 0 L-1.3 -1.3Z', fill: '#fff8e0', opacity: 0,
    transform: `translate(${(80 + H(i) * 2240).toFixed(0)} ${(30 + H(i + 7) * 520).toFixed(0)})` }));
  const bokeh = makeBokeh(10, ['#ffe6b8', '#d9dcff', '#ffd6a0'], 31);
  const cam = { cx: 1500, cy: 640, s: 1.15 };
  const st = { lamp: 1, hammer: 1, prop: 0, laugh: 0, wink: 1, flare: 0, flash: 0 };
  function applyCam(t) {
    const w = cinemaFrame(t, 0);
    const hw = 960 / cam.s, hh = 402 / cam.s;
    const cx = Math.min(Math.max(cam.cx, hw), 2400 - hw), cy = Math.min(Math.max(cam.cy, hh), 1005 - hh);
    $('#world').style.transform = `translate(${(960 - cx * cam.s + w.wx).toFixed(2)}px, ${(402 - cy * cam.s + w.wy).toFixed(2)}px) scale(${cam.s})`;
    $('#bgImg').style.filter = `blur(${Math.max(0, (cam.s - 1.6) * 1.6).toFixed(2)}px)`;
    const lx = 960 + (960 - cx) * cam.s, ly = 402 + (920 - cy) * cam.s;
    $('#lampLight').style.setProperty('--lx', lx.toFixed(0) + 'px'); $('#lampLight').style.setProperty('--ly', ly.toFixed(0) + 'px');
    $('#lampLight').style.opacity = st.lamp;
    const fx = 960 + (STAR.x - cx) * cam.s, fy = 402 + (STAR.y - cy) * cam.s;
    $('#flash').style.setProperty('--fx', fx.toFixed(0) + 'px'); $('#flash').style.setProperty('--fy', fy.toFixed(0) + 'px');
    drawBokeh(bokeh, t, cam, Math.max(0, Math.min(1, (cam.s - 1.3) / 0.4)) * 0.5 * (t < 50 ? 1 : 0));
  }

  const tl = gsap.timeline({ paused: true });
  Object.entries(PILOT_PIVOTS).forEach(([part, o]) => tl.set('#PI-' + part, { rotation: 0, svgOrigin: o }, 0));
  tl.set('#PI-root', { rotation: 0, svgOrigin: '0 0' }, 0).set('#PL-smoke', { opacity: 0 }, 0);
  tl.set('#nb', { opacity: 0, rotation: 0, scale: 1, x: 0, y: 0 }, 0).set('#flash', { opacity: 0 }, 0);
  tl.set('#fade', { opacity: 1 }, 0).to('#fade', { opacity: 0, duration: 2.5 }, 0);
  const TALK_P = 'M-14 -366 Q0 -352 14 -366', REST_P = 'M-14 -364 Q0 -360 14 -364', SMILE_P = 'M-15 -366 Q0 -355 15 -366';
  const talk = (sel, at, dur, a, rest) => { for (let k = 0; k < dur / 0.2; k++) tl.set(sel, { attr: { d: k % 2 ? rest : a } }, at + k * 0.2); tl.set(sel, { attr: { d: rest } }, at + dur); };
  const blinkP = (at) => tl.set([PI('lidL'), PI('lidR')], { opacity: 1 }, at).set([PI('lidL'), PI('lidR')], { opacity: 0 }, at + 0.14);
  tl.set(PI('mouth'), { attr: { d: REST_P } }, 0);

  // 0–11 one last tap of the hammer; the engine turns over, and purrs
  tl.to(cam, { cx: 1440, cy: 660, s: 1.3, duration: 10, ease: 'sine.inOut' }, 0.5);
  tl.to(st, { hammer: 0, duration: 0.3 }, 3.2).to(PI('armR'), { rotation: 0, duration: 0.6 }, 3.3);
  tl.to(st, { prop: 1, duration: 1.5, ease: 'power2.in' }, 3.8).to(st, { prop: 0, duration: 2.0, ease: 'power2.out' }, 9.6);
  tl.to(PI('head'), { rotation: 8, duration: 0.6 }, 4.0).to(PI('eyes'), { x: 8, y: 0, duration: 0.4 }, 4.0).to(PI('mouth'), { attr: { d: SMILE_P }, duration: 0.4 }, 4.4);
  talk(PI('mouth'), 5.0, 2.6, TALK_P, SMILE_P); blinkP(7.9);
  tl.to(PI('armL'), { rotation: 130, duration: 0.5 }, 8.2).to(PI('armL'), { rotation: 0, duration: 0.6 }, 10.6);  // a pat on the plane
  talk(PI('mouth'), 8.4, 2.6, TALK_P, SMILE_P);
  // 11–19 he walks over to the crate and the lamp, takes out the notebook
  tl.to(PI('head'), { rotation: -4, duration: 0.6 }, 11.0).to(PI('eyes'), { x: -8, y: 2, duration: 0.4 }, 11.0);
  tl.to('#piMove', { x: -440, duration: 5, ease: 'sine.inOut' }, 11.4);
  tl.to(cam, { cx: 980, cy: 690, s: 1.45, duration: 6, ease: 'sine.inOut' }, 11.4);
  tl.to(PI('armL'), { rotation: 40, duration: 0.6 }, 17.0).set('#notebook', { opacity: 1 }, 17.3).to(PI('head'), { rotation: -12, duration: 0.6 }, 17.2).to(PI('eyes'), { x: -8, y: 10, duration: 0.4 }, 17.2);
  tl.to(cam, { cx: 880, cy: 720, s: 1.9, duration: 2.5, ease: 'sine.inOut' }, 17.0);
  // 19–29 the page: the box, "the sheep is inside"
  tl.to('#nb', { opacity: 1, duration: 0.8 }, 19.2).fromTo('#nb', { scale: 1.06 }, { scale: 1.0, duration: 10, ease: 'none' }, 19.2);
  tl.to('#nb', { opacity: 0, duration: 1.2 }, 28.6);
  tl.set('#nbEye', { opacity: 1 }, 26.2).set('#nbEye', { opacity: 0 }, 27.0).set('#nbEye', { opacity: 1 }, 27.15);   // something inside blinks back
  talk(PI('mouth'), 20.6, 3.0, TALK_P, SMILE_P); talk(PI('mouth'), 24.6, 3.4, TALK_P, SMILE_P);
  tl.set('#notebook', { opacity: 0 }, 29.8).to(PI('armL'), { rotation: 0, duration: 0.6 }, 29.8);
  // 30–44 he looks up; the stars laugh
  tl.to(PI('head'), { rotation: 10, duration: 1.2, ease: 'sine.inOut' }, 30.0).to(PI('eyes'), { x: 6, y: -12, duration: 0.6 }, 30.2);
  tl.to(cam, { cx: 1120, cy: 520, s: 1.02, duration: 7, ease: 'sine.inOut' }, 29.6);
  tl.to(st, { laugh: 1, duration: 4 }, 31.0).to(st, { laugh: 0.35, duration: 4 }, 42.0);
  talk(PI('mouth'), 33.0, 2.6, TALK_P, SMILE_P); blinkP(36.2);
  talk(PI('mouth'), 37.0, 4.0, TALK_P, SMILE_P); blinkP(42.0);
  // 44–52 the star winks
  tl.to(cam, { cx: 1180, cy: 500, s: 1.06, duration: 6, ease: 'sine.inOut' }, 41.4);
  tl.to(st, { wink: 0.08, duration: 0.25, ease: 'power2.in' }, 44.6).to(st, { wink: 1, duration: 0.35, ease: 'back.out(3)' }, 44.95).to(st, { flare: 1, duration: 0.3 }, 44.95).to(st, { flare: 0.3, duration: 1.6 }, 45.3);
  tl.to(PI('mouth'), { attr: { d: SMILE_P }, duration: 0.3 }, 45.4);
  talk(PI('mouth'), 46.4, 2.6, TALK_P, SMILE_P); talk(PI('mouth'), 49.6, 2.0, TALK_P, SMILE_P);
  tl.to(PI('armL'), { rotation: 150, duration: 0.6 }, 49.4).to(PI('armL'), { rotation: 135, duration: 0.3, yoyo: true, repeat: 3 }, 50.0).to(PI('armL'), { rotation: 0, duration: 0.8 }, 51.4);
  // 52–63 we push in on the star, into gold light
  tl.to(cam, { cx: STAR.x, cy: STAR.y, s: 4.2, duration: 9, ease: 'power2.in' }, 52.0);
  tl.to(st, { flare: 1, duration: 6, ease: 'power1.in' }, 54.0);
  tl.to('#flash', { opacity: 1, duration: 2.2, ease: 'power1.in' }, 59.4);

  const WALKS = [[11.4, 16.4]];
  function drive(t) {
    const b = Math.floor(t * 12) % 4;
    ['wcPlaneB', 'wcPilotB'].forEach((id, i) => $('#' + id).setAttribute('seed', 3 + i * 4 + b));
    if (st.hammer > 0) gsap.set(PI('armR'), { rotation: -120 + Math.sin(t * 9) * 16 * st.hammer });
    // propeller: a blur that spins faster with st.prop
    const pr = $('#PL-prop ellipse');
    if (pr) { const sp = st.prop; pr.setAttribute('ry', (70 * (sp > 0.05 ? Math.abs(Math.cos(t * 40 * sp)) * (1 - sp) + sp : 1)).toFixed(1)); pr.setAttribute('opacity', (0.55 - 0.25 * sp).toFixed(2)); }
    const vib = st.prop * Math.sin(t * 70) * 1.2;
    $('#plPos').setAttribute('transform', `translate(1680 ${(905 + vib).toFixed(2)}) scale(1.25)`);
    let w = 0, ph = 0;
    for (const [a, z] of WALKS) { const k = Math.min(1, Math.max(0, (t - a) / 0.3)) * (1 - Math.min(1, Math.max(0, (t - z + 0.3) / 0.3))); if (k > w) { w = k; ph = (t - a) * Math.PI * 2 * 1.1; } }
    gsap.set(PI('legL'), { rotation: Math.sin(ph) * 18 * w }); gsap.set(PI('legR'), { rotation: -Math.sin(ph) * 18 * w });
    $('#PI-bob').setAttribute('transform', `translate(0 ${(Math.sin(t * 1.6) * 2 - Math.abs(Math.sin(ph)) * 8 * w).toFixed(2)})`);
    Pilot.scarf('PI', t, 0.25 + 0.4 * st.prop, -1);
    $('#lampFlame').setAttribute('opacity', (0.85 + 0.15 * Math.sin(t * 13) * Math.sin(t * 7.3)).toFixed(3));
    // laughing stars
    tw.forEach((p, i) => { const base = 0.25 + 0.2 * Math.sin(t * (1 + H(i + 3)) + i);
      const laugh = st.laugh * Math.max(0, Math.sin(t * (5 + 4 * H(i + 1)) + i * 1.7));
      p.setAttribute('opacity', Math.min(1, base * 0.6 + laugh).toFixed(2)); p.style.transformBox = 'fill-box'; p.style.transformOrigin = 'center';
      p.style.transform = `scale(${(0.6 + laugh * 0.9).toFixed(2)})`; });
    // the winking star
    const glint = 1 + 0.06 * Math.sin(t * 3.1);
    $('#wRay').setAttribute('transform', `scale(${(st.wink * glint * (1 + st.flare * 0.8)).toFixed(3)} ${(st.wink * glint * (1 + st.flare * 0.8)).toFixed(3)}) rotate(${(t * 2).toFixed(1)})`);
    $('#wGlow').setAttribute('r', (60 + 110 * st.flare).toFixed(1)); $('#wGlow').setAttribute('opacity', (0.7 + 0.3 * st.flare).toFixed(2));
    subs(t);
    applyCam(t);
  }
  return { render: (t) => { tl.seek(t); drive(t); } };
}
