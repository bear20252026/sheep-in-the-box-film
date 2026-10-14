// SEQ 2 — THREE WRONG SHEEP (3:25). Inside the pilot's notebook: he draws a sheep, it comes alive,
// the boy says no, and the eraser rubs it out — but erased drawings don't quite go away.
// Sniffle (too sick), Horns (a ram), Old Wool (too old). Then the pilot, fed up, glances at his engine…
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {cinemaCss, cinemaHtml, cinemaFrame} from './cinema.js';
import {Sheep} from './sheep.js';
import {decorate} from './ghosts.js';
import {Boy, Pilot, Plane, BOY_PIVOTS, PILOT_PIVOTS} from './characters.js';

export const DURATION = 205;

const SUBS = [
  [4.0, 7.0, 'A sheep. All right.', '一只羊。好吧。', 'say'],
  [25.0, 28.6, 'No. That one is already very sick.', '不要。这只已经病得很重了。', 'say'],
  [29.4, 33.2, 'Wait — it’s just allergies! *sniff*', '等等——我只是过敏！*吸鼻子*'],
  [44.6, 47.4, 'Fine. Another one.', '好吧。再画一只。', 'say'],
  [64.0, 67.0, 'HA! Behold!', '哈！看哪！'],
  [72.4, 77.6, 'That’s not a sheep. That’s a ram. It has horns.', '这不是绵羊。这是公羊。它有角。', 'say'],
  [79.6, 83.4, 'These are DECORATIVE!', '这是装饰用的！'],
  [97.4, 100.4, '*sigh* One more.', '*叹气* 再来一只。', 'say'],
  [119.6, 122.6, 'Mm. Is it lunch?', '嗯。是午饭时间吗？'],
  [127.6, 133.6, 'That one’s too old. I want a sheep that will live a long time.', '这只太老了。我想要一只能活很久很久的羊。', 'say'],
  [137.0, 139.4, 'Fair.', '也对。'],
  [152.6, 156.2, 'Rubbed out. By a CHILD.', '被擦掉了。被一个小孩。'],
  [157.0, 160.6, '*sniff* I liked being drawn.', '*吸鼻子* 我挺喜欢被画出来的。'],
  [161.4, 165.0, 'Mm. It was a nice minute.', '嗯。那是美好的一分钟。'],
  [174.0, 178.4, 'I have an engine to fix, you know.', '你知道吗，我还有个发动机要修。'],
  [181.4, 184.6, 'I know. Draw me a sheep.', '我知道。给我画一只羊。'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('');

export const css = `
#stage{position:relative;width:1920px;height:804px;overflow:hidden;background:#f3ead9}
#world{position:absolute;left:0;top:0;width:2400px;height:1005px;transform-origin:0 0;filter:contrast(1.05) saturate(1.06)}
.bg{position:absolute;left:0;top:0;width:2400px;height:1005px}
#svg{position:absolute;left:0;top:0;width:2400px;height:1005px;overflow:visible}
#desert{position:absolute;inset:0;opacity:0}
#dworld{position:absolute;left:0;top:0;width:2400px;height:1005px;transform-origin:0 0;filter:contrast(1.07) saturate(1.08)}
#dawn{position:absolute;left:0;top:0;width:2400px;height:1005px;background:linear-gradient(#9fb8e8 0%,#f6c4b0 38%,#ffdcae 58%,#f2c08a 100%);mix-blend-mode:soft-light;opacity:.95}
#dawn2{position:absolute;left:0;top:0;width:2400px;height:1005px;background:linear-gradient(rgba(255,214,170,.0) 0%,rgba(255,200,150,.35) 55%,rgba(255,228,180,.25) 100%);mix-blend-mode:screen}
#subs{position:absolute;left:0;right:0;bottom:30px;text-align:center;pointer-events:none}
#subs .en{font:italic 40px/1.25 Lora,Georgia,serif;color:#4a3224;text-shadow:0 0 6px rgba(255,250,240,.9),0 0 14px rgba(255,250,240,.7)}
#subs .en.say{font-style:normal}
#subs .zh{font:31px/1.5 "Noto Serif SC",serif;color:#4a3224;text-shadow:0 0 6px rgba(255,250,240,.9),0 0 14px rgba(255,250,240,.7)}
#subs.dark .en,#subs.dark .zh{color:#fffaf0;text-shadow:0 0 6px rgba(30,15,5,.85),0 0 18px rgba(30,15,5,.6)}
#fade{position:absolute;inset:0;background:#f6efe0}
${cinemaCss}
`;

const wcPaper = `<filter id="wc" x="-15%" y="-15%" width="130%" height="130%">
     <feTurbulence id="boil" type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="2" result="n"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" result="d"/>
     <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="g"/>
     <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.55  0 0 0 0 0.42  0 0 0 0 0.32  0 0 0 -0.7 0.42" result="gm"/>
     <feComposite in="gm" in2="d" operator="in" result="tex"/>
     <feMerge><feMergeNode in="d"/><feMergeNode in="tex"/></feMerge></filter>
    <filter id="ghostF" x="-20%" y="-20%" width="140%" height="140%">
     <feColorMatrix type="saturate" values="0.12" result="s"/>
     <feComponentTransfer in="s" result="a"><feFuncA type="linear" slope="0.6"/></feComponentTransfer>
     <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="5" result="n"/>
     <feDisplacementMap in="a" in2="n" scale="5"/></filter>`;
const wcD = (id, seed) => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%">
     <feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="${seed}" result="n"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" result="d"/>
     <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed + 5}" result="g"/>
     <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.35  0 0 0 -0.7 0.4" result="gm"/>
     <feComposite in="gm" in2="d" operator="in" result="tex"/>
     <feMerge><feMergeNode in="d"/><feMergeNode in="tex"/></feMerge></filter>`;

// where each sheep is drawn (centre of the page) and where its ghost goes to wait
const SPOT = { x: 1220, y: 880, s: 1.55 };
const HOME = { G1: { x: 380, y: 820, s: 0.95 }, G2: { x: 2080, y: 800, s: 1.0 }, G3: { x: 640, y: 960, s: 0.85 } };
const ORDER = [['G1', 'sniffle', 4.6, 14.2], ['G2', 'horns', 50.0, 60.4], ['G3', 'old', 103.6, 115.4]];   // id, kind, draw start, draw end

export const html = (IMG) => `
<div id="stage">
 <div id="world">
  <img class="bg" src="${IMG}paper.jpg">
  <svg id="svg" viewBox="0 0 2400 1005">
   <defs>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    ${wcPaper}
   </defs>
   ${ORDER.map(([id]) => `<g id="${id}Pos" transform="translate(${SPOT.x} ${SPOT.y}) scale(${SPOT.s})"><g id="${id}Ghost"><g id="${id}w" filter="url(#wc)"></g></g></g>`).join('')}
   <g id="crumbs"></g>
   <g id="handG" opacity="0"><g id="handMove"><g transform="scale(0.62)">
     <image href="${IMG}hand.png" width="970" height="735" x="-85" y="-659"/></g>
     <g id="eraser" opacity="0"><rect x="-26" y="-34" width="52" height="40" rx="8" fill="#f2a0a8" stroke="#6b4733" stroke-width="3"/></g></g></g>
  </svg>
 </div>
 <div id="desert">
  <div id="dworld">
   <img class="bg" src="${IMG}plate_desert.jpg" style="filter:brightness(1.25)">
   <div id="dawn"></div><div id="dawn2"></div>
   <svg viewBox="0 0 2400 1005" style="position:absolute;left:0;top:0;width:2400px;height:1005px;overflow:visible">
    <defs>${wcD('wcPlane', 3)}${wcD('wcPilot', 7)}${wcD('wcBoy', 11)}${Plane.defs('PL')}${Pilot.defs('PI')}${Boy.defs('BY')}</defs>
    <g transform="translate(1560 900) scale(1.25) rotate(12)"><g filter="url(#wcPlane)">${Plane.svg('PL')}</g></g>
    <g id="piPos" transform="translate(1100 1045) scale(0.72)"><g filter="url(#wcPilot)">${Pilot.svg('PI')}</g>
     <g id="notebook" transform="translate(-76 -190)"><rect x="-34" y="-46" width="68" height="88" fill="#f8f2e4" stroke="#4a3428" stroke-width="3"/></g></g>
    <g id="byPos" transform="translate(820 905) scale(0.62)"><g filter="url(#wcBoy)">${Boy.svg('BY')}</g></g>
   </svg>
  </div>
 </div>
 ${cinemaHtml}
 <div id="subs"><div class="en"></div><div class="zh"></div></div>
 <div id="fade"></div>
</div>`;

export function setup() {
  const $ = (s) => document.querySelector(s), $$ = (s) => Array.from(document.querySelectorAll(s));
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, parent, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
  for (const [id, kind] of ORDER) { $('#' + id + 'w').innerHTML = Sheep.svg(id); decorate(id, kind); }

  function subs(t) {
    const en = $('#subs .en'), zh = $('#subs .zh'); let on = null;
    for (const s of SUBS) if (t >= s[0] - 0.25 && t <= s[1] + 0.3) on = s;
    $('#subs').className = t > 168 && t < 190 ? 'dark' : '';
    if (!on) { en.textContent = ''; zh.textContent = ''; return; }
    const k = Math.min(1, (t - on[0] + 0.25) / 0.3, (on[1] + 0.3 - t) / 0.3);
    en.textContent = on[2]; zh.textContent = on[3]; en.className = 'en' + (on[4] ? ' say' : '');
    $('#subs').style.opacity = Math.max(0, k);
  }

  // ---------- pencil drawing: every .draw path of a sheep, body → legs → head ----------
  const grp = (p) => p.closest('[id$="-head"]') ? 3 : p.closest('[id$="-body"]') ? 1 : p.closest('[id$="-legsNear"]') || p.closest('[id$="-legsFar"]') ? 2 : 4;
  const draws = {};
  for (const [id] of ORDER) {
    const list = $$('#' + id + 'w .draw').filter((p) => !p.closest('.pencil') && !p.classList.contains('pencil')).sort((a, b) => grp(a) - grp(b)).map((p) => ({ p, len: p.getTotalLength() }));
    list.forEach((o) => { o.p.style.strokeDasharray = o.len + ' ' + (o.len + 10); o.p.style.strokeDashoffset = o.len; });
    draws[id] = { list, total: list.reduce((a, o) => a + o.len, 0) };
  }
  const toWorld = (pt) => { const r = pt.el.getCTM(); return { x: r.a * pt.x + r.c * pt.y + r.e, y: r.b * pt.x + r.d * pt.y + r.f }; };
  function drawTo(id, u) {
    const { list, total } = draws[id]; let acc = u * total, tip = null;
    for (const o of list) {
      const d = Math.max(0, Math.min(o.len, acc)); o.p.style.strokeDashoffset = o.len - d;
      if (acc > 0 && acc <= o.len) { tip = o.p.getPointAtLength(d); tip.el = o.p; }
      acc -= o.len;
    }
    if (!tip) { const o = list[list.length - 1]; tip = o.p.getPointAtLength(o.len); tip.el = o.p; }
    return toWorld(tip);
  }

  // ---------- eraser crumbs ----------
  const crumbs = [];
  for (let i = 0; i < 70; i++) crumbs.push({ c: mk('ellipse', $('#crumbs'), { fill: i % 2 ? '#e8a0a8' : '#d8c8b8', rx: 4 + (i % 3) * 2, ry: 2.5, opacity: 0 }), ph: i, vx: ((i * 37) % 21 - 10) * 18, vy: -40 - (i % 7) * 20 });

  // ---------- camera ----------
  const cam = { cx: 1220, cy: 560, s: 1.0 };
  function applyCam(w) {
    const hw = 960 / cam.s, hh = 402 / cam.s;
    const cx = Math.min(Math.max(cam.cx, hw), 2400 - hw), cy = Math.min(Math.max(cam.cy, hh), 1005 - hh);
    $('#world').style.transform = `translate(${(960 - cx * cam.s + w.wx).toFixed(2)}px, ${(402 - cy * cam.s + w.wy).toFixed(2)}px) scale(${cam.s})`;
  }
  const dcam = { cx: 1000, cy: 640, s: 1.3 };
  function applyDCam() {
    const hw = 960 / dcam.s, hh = 402 / dcam.s;
    const cx = Math.min(Math.max(dcam.cx, hw), 2400 - hw), cy = Math.min(Math.max(dcam.cy, hh), 1005 - hh);
    $('#dworld').style.transform = `translate(${960 - cx * dcam.s}px, ${402 - cy * dcam.s}px) scale(${dcam.s})`;
  }

  // ---------- timeline ----------
  const tl = gsap.timeline({ paused: true });
  const st = { shiver: 0, snort: 0, sleepy: 0 };
  const S = (id, part) => '#' + id + '-' + part;
  for (const [id] of ORDER) {
    tl.set(S(id, 'head'), { rotation: 0, svgOrigin: '-60 -190' }, 0).set(S(id, 'earN'), { rotation: 0, svgOrigin: '-10 -262' }, 0)
      .set(S(id, 'lidL'), { scaleY: 1, svgOrigin: '-126 -262' }, 0).set(S(id, 'lidR'), { scaleY: 1, svgOrigin: '-62 -260' }, 0)
      .set(`#${id}w .fill, #${id}w .acc .fill`, { opacity: 0 }, 0)
      .set([S(id, 'finishBack'), S(id, 'finishEar'), `#${id}-legHN .finish-leg`], { opacity: 0 }, 0)
      .set('#' + id + 'Pos', { opacity: 0 }, 0);
    tl.set(S(id, 'lids'), { opacity: 0 }, 0);
    ['legFF', 'legHF', 'legFN', 'legHN'].forEach((l, i) => tl.set(S(id, l), { rotation: 0, svgOrigin: [-58, 92, -18, 128][i] + ' -96' }, 0));
  }
  tl.set(['#BY-head', '#BY-armL', '#BY-armR'], { rotation: 0 }, 0);
  Object.entries(BOY_PIVOTS).forEach(([k, o]) => tl.set('#BY-' + k, { svgOrigin: o }, 0));
  Object.entries(PILOT_PIVOTS).forEach(([k, o]) => tl.set('#PI-' + k, { svgOrigin: o }, 0));
  tl.set(['#PI-legL', '#PI-legR'], { rotation: -80 }, 0).set('#PI-armL', { rotation: 30 }, 0);

  const alive = (id, at) => {   // colour washes in, eyes open
    tl.set('#' + id + 'Pos', { opacity: 1 }, 0.01);
    tl.to(`#${id}w .fill, #${id}w .acc .fill`, { opacity: 1, duration: 1.4, ease: 'sine.out', stagger: 0.01 }, at)
      .to([S(id, 'finishBack'), S(id, 'finishEar'), `#${id}-legHN .finish-leg`], { opacity: 1, duration: 1.2 }, at)
      .to(`#${id}w .blush`, { opacity: 0.45, duration: 1 }, at + 0.6);
    tl.set(S(id, 'lids'), { opacity: 1 }, at);
    tl.to([S(id, 'lidL'), S(id, 'lidR')], { scaleY: 0, duration: 0.25 }, at + 1.8);
  };
  const blink = (id, at) => tl.to([S(id, 'lidL'), S(id, 'lidR')], { scaleY: 1, duration: 0.07 }, at).to([S(id, 'lidL'), S(id, 'lidR')], { scaleY: 0, duration: 0.12 }, at + 0.12);
  const talk = (id, at, dur) => { for (let k = 0; k < dur / 0.22; k++) tl.set(S(id, 'mouth'), { attr: { d: k % 2 ? 'M-112 -200 Q-98 -188 -82 -200' : 'M-108 -202 Q-98 -180 -86 -202' } }, at + k * 0.22); tl.set(S(id, 'mouth'), { attr: { d: 'M-112 -200 Q-98 -188 -82 -200' } }, at + dur); };
  const erase = (id, at, dur = 6) => {   // the eraser scrubs; the drawing goes grey and faint — but stays
    tl.set('#eraser', { opacity: 1 }, at).set('#handG', { opacity: 1 }, at);
    tl.to('#' + id + 'Ghost', { opacity: 0.55, duration: dur, ease: 'sine.in' }, at + 0.4);
    tl.set('#' + id + 'w', { attr: { filter: 'url(#ghostF)' } }, at + dur * 0.55);
    tl.set('#handG', { opacity: 0 }, at + dur).set('#eraser', { opacity: 0 }, at + dur);
    eraseWins.push([at, at + dur, id]);
  };
  const toHome = (id, at, dur = 4) => {
    const h = HOME[id];
    tl.to('#' + id + 'Pos', { attr: { transform: `translate(${h.x} ${h.y}) scale(${h.s})` }, duration: dur, ease: 'sine.inOut' }, at);
  };
  const eraseWins = [];
  const drawWins = ORDER.map(([id, , a, b]) => [a, b, id]);

  tl.to('#fade', { opacity: 0, duration: 1.2, ease: 'sine.out' }, 0);
  tl.to(cam, { cx: 1220, cy: 600, s: 1.15, duration: 14, ease: 'sine.inOut' }, 0);

  // ===== 1 · SNIFFLE =====
  alive('G1', 14.2);
  blink('G1', 17); tl.to(st, { shiver: 1, duration: 1 }, 17.5);
  tl.to(S('G1', 'head'), { rotation: -14, duration: 0.25, ease: 'power2.in' }, 21.6).to(S('G1', 'head'), { rotation: 12, duration: 0.12, ease: 'power3.out' }, 22.0)   // AH… CHOO
    .to(S('G1', 'head'), { rotation: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' }, 22.2);
  tl.to('#G1Pos', { attr: { transform: `translate(${SPOT.x - 30} ${SPOT.y}) scale(${SPOT.s})` }, duration: 0.15 }, 22.0).to('#G1Pos', { attr: { transform: `translate(${SPOT.x} ${SPOT.y}) scale(${SPOT.s})` }, duration: 0.5 }, 22.2);
  tl.to(cam, { cx: 1150, cy: 560, s: 1.5, duration: 4, ease: 'sine.inOut' }, 22.5);
  tl.to(S('G1', 'earN'), { rotation: 18, duration: 0.6 }, 25.2);
  talk('G1', 29.4, 3.6); tl.to(S('G1', 'head'), { rotation: 8, duration: 0.4, yoyo: true, repeat: 3 }, 29.6);
  tl.to(cam, { cx: 1220, cy: 600, s: 1.15, duration: 2.5, ease: 'sine.inOut' }, 34);
  erase('G1', 35, 7);
  tl.to(S('G1', 'eyes'), { y: -10, duration: 0.3 }, 35.4);
  toHome('G1', 42.4, 4);

  // ===== 2 · HORNS =====
  tl.to(cam, { cx: 1260, cy: 600, s: 1.2, duration: 6, ease: 'sine.inOut' }, 48);
  alive('G2', 60.4);
  blink('G2', 62.6);
  tl.to(S('G2', 'head'), { rotation: 14, duration: 0.5, ease: 'back.out(2)' }, 63.4);   // chin up
  tl.to(st, { snort: 1, duration: 0.1 }, 63.4).to(st, { snort: 0, duration: 1.2 }, 63.6);
  [63.0, 63.5].forEach((a) => tl.to(S('G2', 'legFN'), { rotation: 22, duration: 0.15 }, a).to(S('G2', 'legFN'), { rotation: 0, duration: 0.15 }, a + 0.15));
  talk('G2', 64, 3);
  tl.to(cam, { cx: 1150, cy: 540, s: 1.55, duration: 3, ease: 'sine.inOut' }, 64);
  tl.to(S('G2', 'head'), { rotation: -6, duration: 0.6 }, 73.4).to(S('G2', 'eyes'), { x: 12, y: -8, duration: 0.3 }, 73.4);
  talk('G2', 79.6, 3.8); tl.to(S('G2', 'head'), { rotation: 18, duration: 0.3 }, 79.6).to(S('G2', 'head'), { rotation: 6, duration: 0.6 }, 82.4);
  tl.to(cam, { cx: 1220, cy: 600, s: 1.15, duration: 2.5, ease: 'sine.inOut' }, 84);
  erase('G2', 86, 7);
  tl.to(S('G2', 'eyes'), { x: 0, y: 6, duration: 0.3 }, 86.4);
  toHome('G2', 93.2, 4);

  // ===== 3 · OLD WOOL =====
  tl.to(cam, { cx: 1220, cy: 620, s: 1.2, duration: 6, ease: 'sine.inOut' }, 100);
  alive('G3', 115.4);
  tl.set([S('G3', 'lidL'), S('G3', 'lidR')], { scaleY: 0.55 }, 117.4);
  tl.to(S('G3', 'head'), { rotation: -8, duration: 2.5, ease: 'sine.inOut' }, 117);
  tl.to(S('G3', 'mouth'), { attr: { d: 'M-110 -204 Q-98 -170 -84 -204' }, duration: 0.8 }, 118.2).to(S('G3', 'mouth'), { attr: { d: 'M-112 -200 Q-98 -188 -82 -200' }, duration: 0.8 }, 119.2);   // a yawn
  talk('G3', 119.8, 2.6);
  tl.to(cam, { cx: 1150, cy: 560, s: 1.5, duration: 4, ease: 'sine.inOut' }, 119);
  tl.to([S('G3', 'lidL'), S('G3', 'lidR')], { scaleY: 0.8, duration: 1.4 }, 128).to([S('G3', 'lidL'), S('G3', 'lidR')], { scaleY: 0.5, duration: 0.4 }, 133.8);
  talk('G3', 137.0, 1.2); tl.to(S('G3', 'head'), { rotation: 12, duration: 0.8, yoyo: true, repeat: 1 }, 138.4);   // a polite bow
  tl.to(cam, { cx: 1220, cy: 600, s: 1.15, duration: 2.5, ease: 'sine.inOut' }, 139);
  erase('G3', 141, 6);
  toHome('G3', 147.4, 4);

  // ===== the three ghosts grumble together =====
  tl.to(cam, { cx: 1220, cy: 600, s: 1.0, duration: 4, ease: 'sine.inOut' }, 148);
  talk('G2', 152.6, 3.6); talk('G1', 157, 3.6); talk('G3', 161.4, 3.6);
  tl.to(S('G2', 'head'), { rotation: 16, duration: 0.6 }, 152.6).to(S('G2', 'head'), { rotation: 4, duration: 1 }, 156.4);
  tl.to(S('G1', 'head'), { rotation: -10, duration: 1 }, 157);
  tl.to(S('G3', 'eyes'), { x: 10, duration: 0.4 }, 161.4);

  // ===== the desert: the pilot looks at his broken engine; the boy just waits =====
  tl.to('#desert', { opacity: 1, duration: 0.8 }, 167.6);
  tl.to(dcam, { cx: 1300, cy: 700, s: 1.25, duration: 8, ease: 'sine.inOut' }, 168);
  tl.to('#PI-head', { rotation: 30, duration: 1.2, ease: 'sine.inOut' }, 170).to('#PI-head', { rotation: 0, duration: 1 }, 172.4);
  tl.to('#PI-body', { scaleY: 0.94, duration: 1 }, 172.4).to('#PI-body', { scaleY: 1, duration: 1.2 }, 173.4);
  for (let k = 0; k < 4.4 / 0.24; k++) tl.set('#PI-mouth', { attr: { d: k % 2 ? 'M-14 -364 Q0 -356 14 -364' : 'M-12 -366 Q0 -348 12 -366' } }, 174 + k * 0.24);
  tl.set('#PI-mouth', { attr: { d: 'M-14 -364 Q0 -360 14 -364' } }, 178.4);
  tl.to(dcam, { cx: 820, cy: 720, s: 1.8, duration: 3, ease: 'sine.inOut' }, 179);
  tl.to('#BY-head', { rotation: 8, duration: 0.8 }, 180.6);
  for (let k = 0; k < 3.2 / 0.24; k++) tl.set('#BY-mouth', { attr: { d: k % 2 ? 'M-8 -240 Q0 -232 8 -240' : 'M-7 -241 Q0 -228 7 -241' } }, 181.4 + k * 0.24);
  tl.set('#BY-mouth', { attr: { d: 'M-8 -240 Q0 -235 8 -240' } }, 184.6);
  tl.to(dcam, { cx: 1050, cy: 760, s: 1.6, duration: 3, ease: 'sine.inOut' }, 185.4);
  tl.to('#PI-armR', { rotation: 40, duration: 0.6 }, 186.6).to('#PI-armR', { rotation: 30, duration: 0.15, yoyo: true, repeat: 7 }, 187.2);   // scribbling — fast, cross
  tl.to(dcam, { cx: 1030, cy: 820, s: 3.2, duration: 2.4, ease: 'power2.in' }, 188.2);
  tl.to('#desert', { opacity: 0, duration: 0.5 }, 190.4);

  // ===== back on the page: the three ghosts watch him start — fast — on a fourth =====
  tl.to(cam, { cx: 1220, cy: 600, s: 1.05, duration: 6, ease: 'sine.inOut' }, 190.4);
  tl.to(S('G1', 'eyes'), { x: 14, y: 4, duration: 0.3 }, 192).to(S('G2', 'eyes'), { x: -14, y: 4, duration: 0.3 }, 192.3).to(S('G3', 'eyes'), { x: 12, y: -2, duration: 0.3 }, 192.6);
  tl.set('#handG', { opacity: 1 }, 194);
  tl.to('#fade', { opacity: 0.0, duration: 0.1 }, 200);

  // ---------- per-frame ----------
  function drive(t) {
    let tip = null, off = 1, wob = 0;
    for (const [a, b, id] of drawWins) {
      const u = Math.max(0, Math.min(1, (t - a) / (b - a)));
      const p = drawTo(id, u);
      if (t >= a - 1.6 && t <= b + 1.4) { tip = p; off = t < a ? (a - t) / 1.6 : t > b ? (t - b) / 1.4 : 0; wob = t > a && t < b ? Math.sin(t * 31) * 3 : 0; }
    }
    for (const [a, b, id] of eraseWins) if (t >= a && t <= b) {
      const m = $('#' + id + 'Pos').transform.baseVal.consolidate().matrix;
      const cx = m.e - 40 * m.a, cy = m.f - 220 * m.a;
      const k = (t - a) / (b - a);
      tip = { x: cx + Math.sin(t * 9) * 160 + Math.sin(t * 2.1) * 60, y: cy + Math.cos(t * 11) * 60 + (k - 0.5) * 120 }; off = 0; wob = 0;
    }
    if (t > 194 && t < 205) { tip = { x: 1420 + Math.sin(t * 14) * 30, y: 520 + Math.cos(t * 17) * 20 }; off = Math.max(0, 1 - (t - 194) / 1.2); }
    $('#handG').setAttribute('opacity', tip && off < 1 ? 1 : 0);
    if (tip) $('#handMove').setAttribute('transform', `translate(${(tip.x + off * 900 + wob).toFixed(1)} ${(tip.y + off * 500 + wob * 0.5).toFixed(1)})`);
    // eraser crumbs fall where it scrubs
    let ew = eraseWins.find(([a, b]) => t >= a && t <= b + 1.5);
    for (const c of crumbs) {
      if (!ew) { c.c.setAttribute('opacity', 0); continue; }
      const [a, b] = ew, life = 1.4, phase = ((t - a) * 1.3 + c.ph * 0.137) % life;
      const born = t - phase; if (born < a || born > b) { c.c.setAttribute('opacity', 0); continue; }
      const m = $('#' + ew[2] + 'Pos').transform.baseVal.consolidate().matrix;
      const x = m.e - 40 * m.a + Math.sin(born * 9) * 160 + c.vx * phase, y = m.f - 220 * m.a + Math.cos(born * 11) * 60 + c.vy * phase + 380 * phase * phase;
      c.c.setAttribute('cx', x.toFixed(1)); c.c.setAttribute('cy', y.toFixed(1)); c.c.setAttribute('opacity', (1 - phase / life).toFixed(2));
    }
    // idle life: breathing for all, a shiver for Sniffle, snort puffs for Horns, ghosts drift and bob
    ORDER.forEach(([id], i) => {
      const g = document.getElementById(id + '-bob');
      const ghostT = t - [42, 93, 147][i];
      const drift = ghostT > 4 ? Math.sin(t * 0.8 + i * 2) * 10 : 0;
      const sh = id === 'G1' ? st.shiver * Math.sin(t * 47) * 2.2 : 0;
      g.setAttribute('transform', `translate(${sh.toFixed(2)} ${(drift - 2 * Math.sin(t * 2.4 + i)).toFixed(2)})`);
    });
    Boy.scarf('BY', t, 0.9 + 0.3 * Math.sin(t * 0.7), -1);
    Pilot.scarf('PI', t, 0.4, -1);
    subs(t);
    applyCam(cinemaFrame(t, 0)); applyDCam();
  }
  return { render: (t) => { tl.seek(t); drive(t); } };
}
