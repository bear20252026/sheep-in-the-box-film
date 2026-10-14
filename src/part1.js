import gsap from 'gsap';
// Every frame is a fresh seek, so tweens must render their values immediately (no lazy first render).
gsap.defaults({ lazy: false });
import {cinemaCss, cinemaHtml, cinemaFrame} from './cinema.js';
import {Sheep} from './sheep.js';
export const css = `
#stage{position:relative;width:1920px;height:804px;overflow:hidden;background:#f3ead9}
#world{position:absolute;left:0;top:0;width:2400px;height:1005px;transform-origin:0 0;filter:contrast(1.05) saturate(1.06)}
.bg{position:absolute;left:0;top:0;width:2400px;height:1005px}
#svg{position:absolute;left:0;top:0;width:2400px;height:1005px;overflow:visible}
#subs{position:absolute;left:0;right:0;bottom:30px;text-align:center;pointer-events:none}
#subs .en{font:italic 40px/1.25 Lora,Georgia,serif;color:#fffaf0;text-shadow:0 0 6px rgba(30,15,5,.85),0 0 18px rgba(30,15,5,.6)}
#subs .en.say{font-style:normal;font-family:Lora,Georgia,serif}
#subs .zh{font:31px/1.5 "Noto Serif SC",serif;color:#fff3e0;text-shadow:0 0 6px rgba(30,15,5,.85),0 0 16px rgba(30,15,5,.6)}
#subs.dark .en,#subs.dark .zh{color:#4a3224;text-shadow:0 0 6px rgba(255,250,240,.9),0 0 14px rgba(255,250,240,.7)}
#title{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:70px;box-sizing:border-box;opacity:0;color:#fff6e4;text-shadow:0 0 20px rgba(60,30,0,.6)}
#title .t1{font:92px Lora,Georgia,serif;letter-spacing:1px}
#title .t2{font:46px "Noto Serif SC",serif;margin-top:8px}
#fade{position:absolute;inset:0;background:#000}
#grade{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 55%,rgba(40,20,5,.18) 100%)}
#warm{position:absolute;inset:0;pointer-events:none;background:#ffb24a;mix-blend-mode:soft-light;opacity:0}
${cinemaCss}
`;
export const html = (IMG) => `
<div id="stage">
 <div id="world">
  <img class="bg" id="bgPaper" src="${IMG}paper.jpg">
  <img class="bg" id="bgBox" src="${IMG}plate_box.jpg" style="opacity:0">
  <svg id="svg" viewBox="0 0 2400 1005">
   <defs>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="wc" x="-15%" y="-15%" width="130%" height="130%">
     <feTurbulence id="boil" type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="2" result="n"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" result="d"/>
     <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="g"/>
     <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.32  0 0 0 -0.7 0.42" result="gm"/>
     <feComposite in="gm" in2="d" operator="in" result="tex"/>
     <feMerge><feMergeNode in="d"/><feMergeNode in="tex"/></feMerge>
    </filter>
 <filter id="wcWarm" x="-15%" y="-15%" width="130%" height="130%">
     <feTurbulence id="boil3" type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="2" result="n"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" result="d"/>
     <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="g"/>
     <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.32  0 0 0 -0.7 0.42" result="gm"/>
     <feComposite in="gm" in2="d" operator="in" result="tex"/>
     <feMerge result="m"><feMergeNode in="d"/><feMergeNode in="tex"/></feMerge>
     <feColorMatrix in="m" type="matrix" values="1.02 0 0 0 0.02  0 0.93 0 0 0.01  0 0 0.78 0 0  0 0 0 1 0"/>
    </filter>
    <filter id="wc2" x="-15%" y="-15%" width="130%" height="130%">
     <feTurbulence id="boil2" type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4" result="n"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G"/>
    </filter>
    <radialGradient id="holeLight" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#f4fbff"/><stop offset=".55" stop-color="#e9f2f4"/><stop offset=".85" stop-color="#ffeccc"/><stop offset="1" stop-color="#ffd9a0" stop-opacity="0"/></radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff2c8" stop-opacity=".9"/><stop offset="1" stop-color="#ffcc66" stop-opacity="0"/></radialGradient>
   </defs>

   <!-- ===== scene 1-2 : on the paper ===== -->
   <g id="paperScene">
    <g transform="translate(1210 900) scale(1.75)"><g id="ps" filter="url(#wc)"></g></g>
    <g id="boxDraw" filter="url(#wc2)" fill="none" stroke="#6b4733" stroke-width="6" stroke-linecap="round" stroke-linejoin="round">
     <path id="boxFill" d="M780 330 L1640 330 L1640 940 L780 940Z" fill="#f6ecdc" stroke="none" opacity="0"/>
     <path id="boxTopFill" d="M780 330 L900 230 L1760 230 L1640 330Z" fill="#efe0c8" stroke="none" opacity="0"/>
     <path id="boxSideFill" d="M1640 330 L1760 230 L1760 830 L1640 940Z" fill="#e8d6ba" stroke="none" opacity="0"/>
     <path class="bx" d="M780 330 L1640 330 L1640 940 L780 940Z"/>
     <path class="bx" d="M780 330 L900 230 L1760 230 L1640 330"/>
     <path class="bx" d="M1760 230 L1760 830 L1640 940"/>
     <circle class="bx hole" cx="960" cy="470" r="34"/>
     <circle class="bx hole" cx="1130" cy="430" r="34"/>
     <circle class="bx hole" cx="1300" cy="470" r="34"/>
    </g>
    <g id="handG" opacity="0"><g id="handMove"><g transform="scale(0.62)"><image href="${IMG}hand.png" width="970" height="735" x="-85" y="-659"/></g></g></g>
   </g>

   <!-- ===== scene 3 : inside the box ===== -->
   <g id="boxScene" opacity="0">
    <g id="dust"></g>
    <ellipse id="eyeLid" cx="520" cy="150" rx="50" ry="27" fill="#f0bf9a"/>
    <g id="eyeCover"><circle cx="518" cy="134" r="78" fill="url(#holeLight)"/></g>
    <ellipse id="sheepGlow" cx="1740" cy="740" rx="380" ry="300" fill="url(#glow)" opacity="0"/>
    <g id="bsPos" transform="translate(1760 930) scale(1.7)"><g id="bsWalk"><g id="bs" filter="url(#wcWarm)"></g></g></g>
   </g>
  </svg>
 </div>
 <div id="warm"></div>
 <div id="grade"></div>
 <div id="title"><div class="t1">The Sheep in the Box</div><div class="t2">盒子里的羊</div></div>
 ${cinemaHtml}
 <div id="subs"><div class="en"></div><div class="zh"></div></div>
 <div id="fade"></div>
</div>
`;
export const DURATION = 52;
export const SUB_TEXT = '请你给我画一只羊吧哦我有小蹄子你好呀好黑不是暖的这里家吗这正是我想要的他样子我会很努力变成盒里，。！——……？等还没画完呢那做一只很好的羊也许有天就整了晚安带你回星明们陪着又上朵保护完';
export function setup() {

const $ = (s) => document.querySelector(s), $$ = (s) => Array.from(document.querySelectorAll(s));
$('#ps').innerHTML = Sheep.svg('A');
$('#bs').innerHTML = Sheep.svg('B');

// ---------- subtitles ----------
const SUBS = [
  [1.0, 4.2, 'If you please — draw me a sheep!', '请你……给我画一只羊吧！', 'say'],
  [13.4, 16.6, 'Oh. I have hooves. Hello, hooves.', '哦。我有小蹄子。你好呀，小蹄子。'],
  [17.3, 19.6, "Wait… I'm not finished yet!", '等等……我还没画完呢！'],
  [25.0, 29.0, "It's dark. No — it's warm. Is this… home?", '好黑。不——是暖的。这里……是家吗？'],
  [31.2, 34.4, 'That is exactly the way I wanted it!', '这正是我想要的！', 'say'],
  [35.2, 41.2, "Exactly the way he wanted? Then I'll be a very good sheep… and maybe one day, I'll be whole.", '正是他想要的？那我要做一只很好很好的羊……也许有一天，我就完整了。'],
];
function subs(t) {
  const en = $('#subs .en'), zh = $('#subs .zh'); let on = null;
  for (const s of SUBS) if (t >= s[0] - 0.25 && t <= s[1] + 0.3) on = s;
  if (!on) { en.textContent = ''; zh.textContent = ''; return; }
  const k = Math.min(1, (t - on[0] + 0.25) / 0.3, (on[1] + 0.3 - t) / 0.3);
  en.textContent = on[2]; zh.textContent = on[3]; en.className = 'en' + (on[4] ? ' say' : '');
  $('#subs').style.opacity = Math.max(0, k);
  $('#subs').className = t < 20.5 ? 'dark' : '';
}

// ---------- the pencil drawing: every .draw stroke of sheep A, one after another ----------
const grp = (p) => p.closest('[id$="-head"]') ? 3 : p.closest('[id$="-body"]') ? 1 : p.closest('[id$="-legsNear"]') ? 2 : 0;
const drawPaths = $$('#ps .draw').sort((a, b) => grp(a) - grp(b));
const order = drawPaths.map((p, i) => ({ p, len: p.getTotalLength(), i }));
const drawTotal = order.reduce((a, o) => a + o.len, 0);
order.forEach((o) => { o.p.style.strokeDasharray = o.len + ' ' + (o.len + 10); o.p.style.strokeDashoffset = o.len; });
const boxPaths = $$('#boxDraw .bx').map((p) => ({ p, len: p.getTotalLength() }));
const boxTotal = boxPaths.reduce((a, o) => a + o.len, 0);
boxPaths.forEach((o) => { o.p.style.strokeDasharray = o.len + ' ' + (o.len + 10); o.p.style.strokeDashoffset = o.len; });
function strokeProgress(list, total, u, toWorld) {
  let acc = u * total, tip = null;
  for (const o of list) {
    const d = Math.max(0, Math.min(o.len, acc));
    o.p.style.strokeDashoffset = o.len - d;
    if (acc > 0 && acc <= o.len) tip = o.p.getPointAtLength(d), tip.el = o.p;
    acc -= o.len;
  }
  if (!tip) { const o = list[list.length - 1]; tip = o.p.getPointAtLength(o.len); tip.el = o.p; }
  return toWorld(tip);
}
const toWorldA = (pt) => { const r = pt.el.getCTM(); return { x: r.a * pt.x + r.c * pt.y + r.e, y: r.b * pt.x + r.d * pt.y + r.f }; };

// ---------- camera ----------
const cam = { cx: 1200, cy: 502, s: 0.8 };
function applyCam(t) {
  if (t >= 22.3) { const hw = 960 / cam.s, hh = 402 / cam.s; cam.cx = Math.min(Math.max(cam.cx, hw), 2400 - hw); cam.cy = Math.min(Math.max(cam.cy, hh), 1005 - hh); } const w = cinemaFrame(t, 0); $('#world').style.transform = `translate(${(960 - cam.cx * cam.s + w.wx).toFixed(2)}px, ${(402 - cam.cy * cam.s + w.wy).toFixed(2)}px) scale(${cam.s})`; }

// ---------- dust motes in the box beams ----------
const HOLES = [[305, 95], [518, 134], [730, 196]], DIR = [0.55, 0.835];
const motes = []; let seed = 11; const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
for (let i = 0; i < 160; i++) {
  const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  c.setAttribute('fill', '#fff1c4'); $('#dust').appendChild(c);
  motes.push({ c, h: Math.floor(rnd() * 3), s: rnd(), w: rnd() * 2 - 1, ph: rnd() * 6.28, sp: 0.5 + rnd(), r: 1.5 + rnd() * 3 });
}
function dust(t) {
  for (const m of motes) {
    const L = 1100 * ((m.s + t * 0.01 * m.sp) % 1), wid = 30 + L * 0.25, [hx, hy] = HOLES[m.h];
    const x = hx + DIR[0] * L - DIR[1] * m.w * wid + Math.sin(t * 0.7 * m.sp + m.ph) * 10;
    const y = hy + DIR[1] * L + DIR[0] * m.w * wid + Math.cos(t * 0.5 * m.sp + m.ph) * 8;
    m.c.setAttribute('cx', x.toFixed(1)); m.c.setAttribute('cy', y.toFixed(1)); m.c.setAttribute('r', m.r);
    m.c.setAttribute('opacity', ((0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 2.2 * m.sp + m.ph))) * Math.min(1, L / 120) * (1 - L / 1150)).toFixed(3));
  }
}

// ---------- puppet helpers (tweens) ----------
const P = (id, part) => '#' + id + '-' + part;
function rig(tl, id) {
  tl.set(P(id, 'lidL'), { scaleY: 0, svgOrigin: '-126 -262' }, 0);
  tl.set(P(id, 'lidR'), { scaleY: 0, svgOrigin: '-62 -260' }, 0);
  tl.set(P(id, 'head'), { rotation: 0, svgOrigin: '-60 -190' }, 0);
  tl.set(P(id, 'earN'), { rotation: 0, svgOrigin: '-10 -262' }, 0);
  ['legFF', 'legHF', 'legFN', 'legHN'].forEach((l, i) => tl.set(P(id, l), { rotation: 0, svgOrigin: [-58, 92, -18, 128][i] + ' -96' }, 0));
  tl.set(P(id, 'body'), { scaleY: 1, svgOrigin: '40 -80' }, 0);
}
function blink(tl, id, at, hold = 0.06) {
  tl.to([P(id, 'lidL'), P(id, 'lidR')], { scaleY: 1, duration: 0.07, ease: 'power2.in' }, at)
    .to([P(id, 'lidL'), P(id, 'lidR')], { scaleY: 0, duration: 0.11, ease: 'power2.out' }, at + 0.07 + hold);
}
const SMILE = 'M-112 -200 Q-98 -188 -82 -200', BIG = 'M-116 -203 Q-98 -180 -78 -203', OH = 'M-103 -199 Q-97 -186 -90 -199';

// ---------- the timeline ----------
const tl = gsap.timeline({ paused: true });
rig(tl, 'A'); rig(tl, 'B');
tl.set('#ps .fill, #ps .blush, #A-shadow', { opacity: 0 }, 0).to('#A-shadow', { opacity: 0.22, duration: 1.5 }, 11.0).set('#A-eyes, #A-lids', { opacity: 0 }, 0)
  .set('#bs .fill, #bs .blush', { opacity: 0 }, 0).set('#B-eyes', { opacity: 0 }, 0);
tl.set(cam, { cx: 1200, cy: 600, s: 0.86 }, 0);
// 0–1.5 fade in
tl.to('#fade', { opacity: 0, duration: 1.6, ease: 'sine.inOut' }, 0);
tl.to(cam, { cy: 580, s: 0.92, duration: 12, ease: 'sine.inOut' }, 0);
// hand arrives
tl.fromTo('#handG', { opacity: 0 }, { opacity: 1, duration: 0.4 }, 2.6);
// (hand position and the line drawing are driven from the drawing clock below)
// washes of colour bloom after the lines (11 -> 12.6)
tl.to('#ps .fill', { opacity: 1, duration: 1.4, ease: 'sine.out', stagger: 0.02 }, 11.0)
  .to('#ps .blush', { opacity: 0.45, duration: 1.2 }, 11.6)
  .to('#A-eyes', { opacity: 1, duration: 0.25 }, 11.4)
  .to('#A-lids', { opacity: 1, duration: 0.01 }, 11.4);
tl.to('#handG', { opacity: 0, duration: 0.6 }, 12.6);
// comes alive
blink(tl, 'A', 12.4); blink(tl, 'A', 12.9, 0.04);
tl.to('#A-head', { rotation: -9, duration: 0.6, ease: 'power2.inOut' }, 13.2)           // looks down at its hooves
  .to('#A-eyes', { y: 7, x: 4, duration: 0.4 }, 13.2)
  .to('#A-legFN', { rotation: 24, duration: 0.35, ease: 'power2.out' }, 13.9)            // lifts a hoof
  .to('#A-legFN', { rotation: 0, duration: 0.25, ease: 'power2.in' }, 14.3)
  .to('#A-legFN', { rotation: 20, duration: 0.25, ease: 'power2.out' }, 14.6)
  .to('#A-legFN', { rotation: 0, duration: 0.22, ease: 'power2.in' }, 14.85)
  .to('#A-mouth', { attr: { d: BIG }, duration: 0.4 }, 15.0)
  .to('#A-head', { rotation: 4, duration: 0.5, ease: 'back.out(2)' }, 15.2)
  .to('#A-eyes', { y: -2, x: -2, duration: 0.3 }, 15.2)
  .to('#A-earN', { rotation: -14, duration: 0.25, ease: 'power2.out' }, 15.2).to('#A-earN', { rotation: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' }, 15.45)
  .to('#A-walk', { y: -46, duration: 0.28, ease: 'power2.out' }, 15.9)                  // a happy hop
  .to('#A-walk', { y: 0, duration: 0.26, ease: 'power2.in' }, 16.18)
  .to('#A-body', { scaleY: 0.92, duration: 0.08 }, 16.44).to('#A-body', { scaleY: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' }, 16.52);
blink(tl, 'A', 17.0);
// it glances back at the unfinished patch on its back as the pencil starts on the box
tl.to('#A-eyes', { x: 11, y: 3, duration: 0.3 }, 17.3).to('#A-head', { rotation: 10, duration: 0.5, ease: 'power2.out' }, 17.3)
  .to('#A-mouth', { attr: { d: OH }, duration: 0.2 }, 17.4)
  .to('#A-earN', { rotation: -18, duration: 0.2 }, 17.5).to('#A-earN', { rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.35)' }, 17.7)
  .to('#A-walk', { y: -22, duration: 0.18, ease: 'power2.out' }, 18.2).to('#A-walk', { y: 0, duration: 0.2, ease: 'power2.in' }, 18.38)
  .to('#A-eyes', { x: -6, y: -6, duration: 0.3 }, 18.7).to('#A-head', { rotation: -4, duration: 0.5 }, 18.7);
// the pencil comes back and draws a box over the sheep (17.4 -> 20.2)
tl.fromTo('#handG', { opacity: 0 }, { opacity: 1, duration: 0.3 }, 17.2);
tl.to('#boxFill', { opacity: 1, duration: 0.9, ease: 'sine.inOut' }, 19.3)
  .to('#boxTopFill', { opacity: 1, duration: 0.9 }, 19.3).to('#boxSideFill', { opacity: 1, duration: 0.9 }, 19.3)
  .to('#handG', { opacity: 0, duration: 0.4 }, 20.3);
// into the middle hole
tl.to(cam, { cx: 1130, cy: 430, s: 7.5, duration: 1.9, ease: 'power3.in' }, 20.4);
tl.to('#fade', { opacity: 1, duration: 0.35, ease: 'power1.in' }, 22.0);
tl.set('#bgPaper', { opacity: 0 }, 22.35).set('#paperScene', { opacity: 0 }, 22.35)
  .set('#bgBox', { opacity: 1 }, 22.35).set('#boxScene', { opacity: 1 }, 22.35)
  .set(cam, { cx: 1200, cy: 520, s: 0.82 }, 22.35);
tl.to('#fade', { opacity: 0, duration: 1.6, ease: 'sine.out' }, 22.4);
tl.to('#warm', { opacity: 0.35, duration: 2 }, 22.4);
tl.to(cam, { cx: 1500, cy: 560, s: 0.98, duration: 6.5, ease: 'sine.inOut' }, 22.4);
// inside the box the lines find each other (B is drawn by the light: 23 -> 25)
tl.to('#bs .fill', { opacity: 1, duration: 1.2, stagger: 0.015 }, 24.6).to('#bs .blush', { opacity: 0.45, duration: 1 }, 25.2)
  .to('#B-eyes', { opacity: 1, duration: 0.2 }, 25.0)
  .to('#sheepGlow', { opacity: 0.8, duration: 1.4 }, 23.4).to('#sheepGlow', { opacity: 0.35, duration: 3 }, 25.2);
blink(tl, 'B', 25.6);
tl.to('#B-head', { rotation: 7, duration: 0.8, ease: 'sine.inOut' }, 26.0).to('#B-eyes', { x: 6, duration: 0.6 }, 26.0)   // looks around
  .to('#B-head', { rotation: -8, duration: 1.0, ease: 'sine.inOut' }, 27.0).to('#B-eyes', { x: -7, y: -3, duration: 0.7 }, 27.0)
  .to('#B-mouth', { attr: { d: OH }, duration: 0.3 }, 27.4).to('#B-mouth', { attr: { d: SMILE }, duration: 0.4 }, 28.4)
  .to('#B-head', { rotation: 0, duration: 0.8, ease: 'sine.inOut' }, 28.3).to('#B-eyes', { x: 0, y: 0, duration: 0.5 }, 28.3);
// the eye
tl.to(cam, { cx: 700, cy: 330, s: 1.55, duration: 2.0, ease: 'power2.inOut' }, 29.0);
tl.to('#eyeCover', { opacity: 0, duration: 0.9, ease: 'sine.inOut' }, 29.6);
tl.set('#eyeLid', { scaleY: 1, svgOrigin: '520 123' }, 0).to('#eyeLid', { scaleY: 0, duration: 0.35, ease: 'power2.out' }, 30.1)
  .to('#eyeLid', { scaleY: 1, duration: 0.08 }, 32.2).to('#eyeLid', { scaleY: 0, duration: 0.14 }, 32.32);
// startled jump, then turns to the eye
tl.to('#B-walk', { y: -70, duration: 0.25, ease: 'power3.out' }, 31.3).to('#B-walk', { y: 0, duration: 0.3, ease: 'power2.in' }, 31.55)
  .to('#B-earN', { rotation: -24, duration: 0.2 }, 31.3).to('#B-earN', { rotation: 0, duration: 1.0, ease: 'elastic.out(1, 0.3)' }, 31.5)
  .to('#B-body', { scaleY: 0.9, duration: 0.07 }, 31.85).to('#B-body', { scaleY: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' }, 31.92)
  .to('#B-eyes', { x: -10, y: -9, duration: 0.25 }, 31.3)
  .to('#B-mouth', { attr: { d: OH }, duration: 0.15 }, 31.3)
  .to('#B-head', { rotation: 12, duration: 0.6, ease: 'back.out(2)' }, 32.0);
tl.set(cam, { cx: 1500, cy: 600, s: 1.05 }, 31.25).to(cam, { cx: 1450, cy: 580, s: 1.0, duration: 3, ease: 'sine.inOut' }, 31.3);
// proud: tries to be exactly what he wanted
tl.to('#B-mouth', { attr: { d: BIG }, duration: 0.3 }, 34.6)
  .to('#B-body', { scaleY: 1.06, duration: 0.5, ease: 'back.out(2)' }, 35.0)
  .to('#B-head', { rotation: 16, duration: 0.5, ease: 'back.out(2)' }, 35.0)
  .to('#B-walk', { y: -14, duration: 0.5, ease: 'back.out(2)' }, 35.0);
blink(tl, 'B', 36.6);
// trots into the light (37.6 -> 41.6): position + leg cycle (legs driven below)
tl.to('#B-walk', { y: 0, duration: 0.3 }, 37.4).to('#B-body', { scaleY: 1, duration: 0.3 }, 37.4).to('#B-head', { rotation: 2, duration: 0.5 }, 37.4)
  .to('#B-walk', { x: -520, duration: 4.0, ease: 'sine.inOut' }, 37.6)
  .to('#sheepGlow', { x: -520, opacity: 0.6, duration: 4.0, ease: 'sine.inOut' }, 37.6);
tl.to(cam, { cx: 1150, cy: 560, s: 0.95, duration: 4.5, ease: 'sine.inOut' }, 37.4);
// stands in the beam, eyes close happily, glow
tl.to([P('B', 'lidL'), P('B', 'lidR')], { scaleY: 0.7, duration: 0.6, ease: 'sine.inOut' }, 42.4)
  .to('#B-head', { rotation: 10, duration: 1.2, ease: 'sine.inOut' }, 42.4)
  .to('#sheepGlow', { opacity: 1, scale: 1.2, duration: 3, svgOrigin: '1740 740' }, 42.0);
tl.to(cam, { cx: 1200, cy: 500, s: 0.84, duration: 6, ease: 'sine.inOut' }, 43.0);
tl.to('#title', { opacity: 1, duration: 2.0, ease: 'sine.inOut' }, 45.0).to('#title', { opacity: 0, duration: 1.4 }, 49.6);
const DURATION = 52.0;

// ---------- continuous / driven motion ----------
function lerp(a, b, u) { return a + (b - a) * u; }
function clamp(u) { return Math.max(0, Math.min(1, u)); }
function ss(u) { u = clamp(u); return u * u * (3 - 2 * u); }
function drive(t) {
  // line boil: hand-drawn lines re-drawn 12 times a second
  const b = Math.floor(t * 12) % 4;
  $('#boil').setAttribute('seed', 2 + b); $('#boil2').setAttribute('seed', 4 + b); $('#boil3').setAttribute('seed', 2 + b);
  // pencil drawing of the sheep, 4.4 -> 11.0
  const uA = ss((t - 4.4) / 6.6) * 0.5 + clamp((t - 4.4) / 6.6) * 0.5;
  const tipA = strokeProgress(order, drawTotal, uA, toWorldA);
  const uB = clamp((t - 17.5) / 2.6);
  const tipB = strokeProgress(boxPaths, boxTotal, uB, toWorldA);
  let tip = t < 17.2 ? tipA : tipB;
  let off = 0;
  if (t < 4.4) off = (1 - ss((t - 2.6) / 1.8)) * 900;
  else if (t > 11.3 && t < 17.2) off = ss((t - 11.3) / 1.4) * 1100;
  else if (t >= 17.2 && t < 17.5) off = (1 - ss((t - 17.2) / 0.3)) * 500;
  else if (t > 20.1) off = ss((t - 20.1) / 0.8) * 1100;
  const wob = (t > 4.4 && t < 11) || (t > 17.5 && t < 20.1) ? Math.sin(t * 31) * 3 : 0;
  $('#handMove').setAttribute('transform', `translate(${(tip.x + off * 0.8 + wob).toFixed(1)} ${(tip.y + off * 0.6 + wob * 0.5).toFixed(1)})`);
  // sheep B drawn by golden light inside the box 23.0 -> 25.0
  bDraw(clamp((t - 23.0) / 2.0));
  // breathing
  const br = 1 + 0.012 * Math.sin(t * 2.4);
  for (const id of ['A', 'B']) { const g = document.getElementById(id + '-bob'); g.setAttribute('transform', `translate(0 ${(-2 * Math.sin(t * 2.4)).toFixed(2)}) scale(1 ${br.toFixed(4)})`); }
  // trot: legs swing while B walks (37.6 -> 41.6)
  const w = clamp((t - 37.6) / 0.3) * (1 - clamp((t - 41.3) / 0.3));
  {
    const ph = (t - 37.6) * 2 * Math.PI * 2.4, a = 22 * w;
    const L = { FF: Math.sin(ph) * a, HN: Math.sin(ph) * a, FN: -Math.sin(ph) * a, HF: -Math.sin(ph) * a };
    for (const k in L) { const el = document.getElementById('B-leg' + k); const piv = { FF: -58, HF: 92, FN: -18, HN: 128 }[k]; el.setAttribute('transform', `rotate(${L[k].toFixed(2)} ${piv} -96)`); }
  }
  if (w > 0) {
    const ph = (t - 37.6) * 2 * Math.PI * 2.4;
    document.getElementById('B-bob').setAttribute('transform', `translate(0 ${(-Math.abs(Math.sin(ph)) * 12 * w).toFixed(2)}) scale(1 ${br.toFixed(4)})`);
  }
  dust(t);
  subs(t);
  applyCam(t);
}
const bPaths = $$('#bs .draw').map((p) => ({ p, len: p.getTotalLength() }));
const bTotal = bPaths.reduce((a, o) => a + o.len, 0);
bPaths.forEach((o) => { o.p.style.strokeDasharray = o.len + ' ' + (o.len + 10); });
function bDraw(u) { let acc = u * bTotal; for (const o of bPaths) { const d = Math.max(0, Math.min(o.len, acc)); o.p.style.strokeDashoffset = o.len - d; acc -= o.len; } }

return { render: (t) => { tl.seek(t); drive(t); } };

}
