// SEQ 6 — THE BIRDS (~4:00). Evening. A flock of wild birds; the boy whistles them down and ties
// strings to them, gently, one by one. "You're leaving?" — "My rose needs me. And she needs a sheep."
// The pilot draws a muzzle for the sheep (and forgets the strap). Lift-off: up through the sunset
// clouds into the night, the box swinging from the boy's arm — and three ghosts hanging on below it.
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {cinemaCss, cinemaHtml, cinemaFrame, makeBokeh, drawBokeh} from './cinema.js';
import {Boy, Pilot, Plane, BOY_PIVOTS, PILOT_PIVOTS} from './characters.js';
import {Sheep} from './sheep.js';
import {decorate} from './ghosts.js';

export const DURATION = 240;

const SUBS = [
  [6.0, 9.0, 'There they are.', '它们来了。'],
  [14.5, 16.5, '♪ Fweeee-eet! ♪', '♪ 嘘——咿！♪'],
  [23.0, 25.6, '…What on earth?', '……这是怎么回事？'],
  [30.0, 33.6, 'Gently. There. Does that hurt?', '轻一点。好了。疼不疼？'],
  [36.0, 39.0, 'Thank you for taking me.', '谢谢你们带我走。'],
  [44.0, 45.4, '…Hello?', '……你好？'],
  [45.6, 46.6, 'HONK!', '嘎！'],
  [62.6, 64.6, 'You’re leaving?', '你要走了？'],
  [66.0, 68.6, 'My rose needs me.', '我的玫瑰需要我。'],
  [70.0, 73.0, 'And she needs a sheep.', '她也需要一只羊。'],
  [75.0, 79.0, 'But what if… the sheep and the rose…', '可是万一……那只羊和那朵玫瑰……'],
  [82.0, 84.6, 'Hang on. Give me a minute.', '等等。给我一分钟。'],
  [89.0, 93.0, 'A muzzle. For your sheep.', '一个嘴套。给你的羊。', 'say'],
  [94.0, 97.0, 'So it can’t eat your rose. Just in case.', '这样它就吃不了你的玫瑰了。以防万一。', 'say'],
  [101.4, 104.2, 'Thank you!', '谢谢你！'],
  [107.0, 109.6, '…Is this a hat?', '……这是顶帽子吗？', 'say'],
  [111.0, 113.6, 'Time to go!', '该出发啦！'],
  [115.0, 118.6, 'Wait — the strap! I forgot to draw the strap!', '等等——带子！我忘了画带子！'],
  [121.0, 124.6, 'It’s all right! I trust him!', '没关系！我相信它！'],
  [127.0, 130.0, 'Goodbye, little prince…', '再见了，小王子……', 'say'],
  [131.0, 134.0, 'Fix your plane! And drink your water!', '把飞机修好！记得喝水！'],
  [150.0, 152.0, 'Whoa…', '哇……'],
  [184.0, 187.6, 'Nobody said anything about FLYING!', '没人说过还要飞啊！'],
  [188.4, 190.8, 'I think I’m going to be sick.', '我觉得我要吐了。'],
  [191.4, 194.0, 'We’re ghosts. Hold on anyway.', '我们是鬼魂。照样抓紧。'],
  [204.0, 207.6, 'Hold on, sheep. The stars are closer than they look.', '抓紧了，小羊。星星比看起来要近。'],
  [210.0, 213.0, 'Which one is home?', '哪一颗是家？'],
  [214.0, 217.6, 'First, a few stops on the way.', '先得在路上停几站。'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('') + 'for your sheep';

export const css = `
#stage{position:relative;width:1920px;height:804px;overflow:hidden;background:#070a22}
#world{position:absolute;left:0;top:0;width:2400px;height:1005px;transform-origin:0 0;filter:contrast(1.06) saturate(1.08)}
.bg{position:absolute;left:0;top:0;width:2400px;height:1005px}
#svg{position:absolute;left:0;top:0;width:2400px;height:1005px;overflow:visible}
#warm{position:absolute;inset:0;pointer-events:none;mix-blend-mode:soft-light;background:linear-gradient(#ff9a6a 0%,#ffb070 50%,#ff8a50 100%)}
#glow{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;background:linear-gradient(rgba(255,150,120,0) 30%,rgba(255,170,110,.35) 75%,rgba(255,200,140,.25) 100%)}
#subs{position:absolute;left:0;right:0;bottom:30px;text-align:center;pointer-events:none}
#subs .en{font:italic 40px/1.25 Lora,Georgia,serif;color:#fffaf0;text-shadow:0 0 6px rgba(20,10,30,.9),0 0 18px rgba(20,10,30,.7)}
#subs .en.say{font-style:normal}
#subs .zh{font:31px/1.5 "Noto Serif SC",serif;color:#fff3e0;text-shadow:0 0 6px rgba(20,10,30,.9),0 0 16px rgba(20,10,30,.7)}
#nb{position:absolute;inset:0;opacity:0;transform-origin:30% 20%}
#nb img{position:absolute;left:-240px;top:-100px;width:2400px;height:1005px}
#nb svg{position:absolute;left:0;top:0;width:1920px;height:804px;overflow:visible}
.mz{fill:none;stroke:#4a3a30;stroke-width:5;stroke-linecap:round;stroke-linejoin:round}
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
const GHOST_F = `<filter id="ghostF" x="-20%" y="-20%" width="140%" height="140%">
     <feColorMatrix type="saturate" values="0.12" result="s"/><feComponentTransfer in="s" result="a"><feFuncA type="linear" slope="0.6"/></feComponentTransfer>
     <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="a" in2="n" scale="5"/></filter>`;
const INK = '#4a3428';

// a big white wild bird, facing left, standing on (0,0)
const BIRD = (P) => `<g id="${P}">
 <g id="${P}-legs"><path d="M-2 4 L-4 30 M10 4 L12 30" stroke="#e0902e" stroke-width="4" stroke-linecap="round"/><path d="M-10 30 h10 M6 30 h10" stroke="#e0902e" stroke-width="4" stroke-linecap="round"/></g>
 <g id="${P}-body" transform="translate(0 -20)">
  <g id="${P}-wF"><path d="M4 -10 C-6 -52 34 -84 66 -72 C44 -52 34 -30 22 -6Z" fill="#dcd8d0" stroke="${INK}" stroke-width="3"/></g>
  <path d="M48 -6 L68 -14 L62 0Z" fill="#cfcac0" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M-30 0 C-30 -22 30 -26 52 -8 C42 8 0 16 -30 0Z" fill="#f6f3ec" stroke="${INK}" stroke-width="3.2"/>
  <g id="${P}-neck"><path d="M-26 -2 C-42 -14 -44 -36 -52 -48 L-42 -56 C-34 -40 -30 -22 -14 -10Z" fill="#f6f3ec" stroke="${INK}" stroke-width="3"/>
   <circle cx="-50" cy="-56" r="10" fill="#f6f3ec" stroke="${INK}" stroke-width="3"/>
   <path id="${P}-beakT" d="M-58 -59 L-78 -55 L-58 -52Z" fill="#eaa040" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
   <path id="${P}-beakB" d="M-58 -53 L-74 -52 L-58 -49Z" fill="#d88a30" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>
   <circle cx="-53" cy="-58" r="2.2" fill="${INK}"/></g>
  <g id="${P}-wN"><path d="M6 -8 C-2 -48 40 -78 72 -64 C50 -46 38 -26 26 -4Z" fill="#fbf9f4" stroke="${INK}" stroke-width="3"/></g>
 </g></g>`;
const NB = 5;
const SPOTS = [[700, 965, 1], [1130, 955, -1], [850, 990, 1], [600, 945, 1], [1240, 945, -1]];   // landing spots; 1 = faces right
const TIE_AT = [28, 34, 40, 47, 52], TIE_X = [775, 1060, 790, 670, 1165];
const OFF = [[-170, -250], [-40, -320], [100, -300], [215, -235], [-280, -170]];   // places in the air above the boy

const MUZZLE = ['M-110 -40 C-110 -110 110 -110 110 -40 C110 30 70 80 0 84 C-70 80 -110 30 -110 -40Z', 'M-110 -40 C-60 -10 60 -10 110 -40',
  'M-80 -60 L-40 70 M-30 -76 L-10 82', 'M30 -76 L10 82 M80 -60 L40 70', 'M-118 -46 h16 v14 h-16Z M102 -46 h16 v14 h-16Z', 'M-20 20 a5 5 0 1 0 0.1 0 M20 20 a5 5 0 1 0 0.1 0'];

export const html = (IMG) => `
<div id="stage">
 <div id="world">
  <img class="bg" id="bgImg" src="${IMG}plate_desert.jpg">
  <svg id="svg" viewBox="0 0 2400 1005">
   <defs>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="cloudF" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>
    ${wc('wcPlane', 3)}${wc('wcPilot', 7)}${wc('wcBoy', 11)}${GHOST_F}
    ${Plane.defs('PL')}${Pilot.defs('PI')}${Boy.defs('BY')}
    <linearGradient id="skyG" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#152b6b"/><stop offset=".35" stop-color="#121f55"/><stop offset="1" stop-color="#05071a"/></linearGradient>
    <linearGradient id="seamG" gradientUnits="userSpaceOnUse" x1="0" y1="-10" x2="0" y2="560"><stop offset="0" stop-color="#152b6b"/><stop offset=".3" stop-color="#152b6b" stop-opacity=".85"/><stop offset="1" stop-color="#152b6b" stop-opacity="0"/></linearGradient>
    <radialGradient id="kingG" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#b08ae0"/><stop offset="1" stop-color="#5a3a8a"/></radialGradient>
    <clipPath id="boxClip"><rect x="-80" y="-200" width="200" height="200"/></clipPath>
   </defs>
   <rect x="-3000" y="-4200" width="8400" height="4260" fill="url(#skyG)"/>
   <rect x="-3000" y="-10" width="8400" height="570" fill="url(#seamG)"/>
   <g id="stars"></g>
   <g id="clouds" filter="url(#cloudF)"></g>
   <g id="kingP" opacity="0"><circle r="170" fill="url(#kingG)" stroke="#3a2458" stroke-width="5"/>
    <path d="M-150 -60 C-120 -150 120 -150 150 -60 C170 40 120 140 0 168 C-120 140 -170 40 -150 -60Z" fill="#c8323a" opacity=".9"/>
    <path d="M-150 -60 C-100 -20 100 -20 150 -60" fill="none" stroke="#fff8ee" stroke-width="16"/>
    <g fill="#2a2030"><circle cx="-90" cy="-40" r="4"/><circle cx="-30" cy="-30" r="4"/><circle cx="30" cy="-30" r="4"/><circle cx="90" cy="-40" r="4"/></g>
    <g transform="translate(0 -170)"><path d="M-22 0 C-22 -30 22 -30 22 0Z" fill="#c8323a"/><circle cy="-38" r="12" fill="#f4d4b8"/><path d="M-12 -50 L-12 -62 L-6 -54 L0 -64 L6 -54 L12 -62 L12 -50Z" fill="#f2c24a" stroke="#8a6020" stroke-width="2"/></g></g>
   <g id="flock"></g>
   <g id="plPos" transform="translate(1900 905) scale(1.25)"><g filter="url(#wcPlane)">${Plane.svg('PL')}</g></g>
   <g id="piMove"><g id="piPos" transform="translate(1700 975) scale(0.72)"><g filter="url(#wcPilot)">${Pilot.svg('PI')}</g>
     <g id="notebook" opacity="0" transform="translate(-76 -190)"><rect x="-34" y="-46" width="68" height="88" fill="#f8f2e4" stroke="${INK}" stroke-width="3"/><path d="M-24 -30 H24 M-24 -14 H24 M-24 2 H24" stroke="#b8a890" stroke-width="2"/></g></g></g>
   <g id="strings" fill="none" stroke="#f4ecd8" stroke-width="2" opacity=".9"></g>
   <g id="birds">${Array.from({ length: NB }, (_, i) => `<g id="bp${i}"><g filter="url(#wcBoy)">${BIRD('b' + i)}</g></g>`).join('')}</g>
   <g id="boxPos" transform="translate(930 968)"><g id="boxSwing">
     <path id="boxString" d="M0 -60 L0 -60" stroke="#f4ecd8" stroke-width="2"/>
     <path d="M-40 -50 L-28 -60 L52 -60 L40 -50Z" fill="#5a3f2e" stroke="${INK}" stroke-width="3"/>
     <g clip-path="url(#boxClip)"><g id="sUp"><g transform="translate(14 8) scale(0.2)">${Sheep.svg('S')}</g></g></g>
     <path d="M-40 -50 L40 -50 L40 0 L-40 0Z" fill="#d8ac80" stroke="${INK}" stroke-width="3"/>
     <path d="M40 -50 L52 -60 L52 -10 L40 0Z" fill="#b48a62" stroke="${INK}" stroke-width="3"/>
     <path d="M-40 -50 L-54 -66 L-30 -70 L-28 -60Z M52 -60 L66 -72 L62 -50 L52 -46Z" fill="#e6c49c" stroke="${INK}" stroke-width="3"/>
     <circle cx="-20" cy="-26" r="5" fill="#3a2a22"/><circle cx="0" cy="-30" r="5" fill="#3a2a22"/><circle cx="20" cy="-26" r="5" fill="#3a2a22"/>
     <g id="gh" opacity="0">${[3, 1, 2].map((n, i) => `<g transform="translate(${-6 + i * 4} ${18 + i * 52}) scale(0.22)"><g id="ghs${n}"><g filter="url(#ghostF)">${Sheep.svg('G' + n)}</g></g></g>`).join('')}</g>
   </g></g>
   <g id="page" opacity="0"><rect x="-14" y="-18" width="28" height="36" fill="#f8f2e4" stroke="${INK}" stroke-width="2.4"/><path d="M-8 -8 h16 M-8 0 h16 M-8 8 h10" stroke="#9a8a70" stroke-width="1.6"/></g>
   <g id="byMove"><g id="byPos" transform="translate(900 950) scale(0.62)"><g filter="url(#wcBoy)">${Boy.svg('BY')}</g>
     <circle id="ball" cx="54" cy="-120" r="9" fill="#f4ecd8" stroke="${INK}" stroke-width="2.4" opacity="0"/></g></g>
  </svg>
 </div>
 <div id="warm"></div>
 <div id="glow"></div>
 <div id="nb"><img src="${IMG}paper.jpg"><svg viewBox="0 0 1920 804">
  <g transform="translate(960 360) scale(1.7)">${MUZZLE.map((d) => `<path class="mz" d="${d}"/>`).join('')}
   <clipPath id="wClip"><rect id="wRect" x="-160" y="110" width="0" height="70"/></clipPath>
   <text x="-140" y="160" clip-path="url(#wClip)" font-family="Lora,Georgia,serif" font-style="italic" font-size="38" fill="#4a3a30">for your sheep</text></g>
  <g id="handG" opacity="0"><g id="handMove"><g transform="scale(0.62)"><image href="${IMG}hand.png" width="970" height="735" x="-85" y="-659"/></g></g></g>
 </svg></div>
 ${cinemaHtml}
 <div id="subs"><div class="en"></div><div class="zh"></div></div>
 <div id="fade"></div>
</div>`;

export function setup() {
  const $ = (s) => document.querySelector(s), $$ = (s) => Array.from(document.querySelectorAll(s));
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, parent, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
  const B = (p) => '#BY-' + p, PI = (p) => '#PI-' + p, S = (p) => '#S-' + p;
  function subs(t) {
    const en = $('#subs .en'), zh = $('#subs .zh'); let on = null;
    for (const s of SUBS) if (t >= s[0] - 0.25 && t <= s[1] + 0.3) on = s;
    if (!on) { en.textContent = ''; zh.textContent = ''; return; }
    const k = Math.min(1, (t - on[0] + 0.25) / 0.3, (on[1] + 0.3 - t) / 0.3);
    en.textContent = on[2]; zh.textContent = on[3]; en.className = 'en' + (on[4] ? ' say' : '');
    $('#subs').style.opacity = Math.max(0, k);
  }
  const hsh = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const ss = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
  // the sheep (its ear finished), and three ghosts
  $(S('lids')).setAttribute('opacity', 1);
  $$(S('earN') + ' .pencil').forEach((e) => e.setAttribute('opacity', 0)); $(S('finishEar')).setAttribute('opacity', 1);
  [['1', 'sniffle'], ['2', 'horns'], ['3', 'old']].forEach(([n, k]) => { decorate('G' + n, k); $('#G' + n + '-lids').setAttribute('opacity', 0); });
  // stars and clouds up above the painted sky
  for (let i = 0; i < 420; i++) mk('circle', $('#stars'), { cx: (-1500 + hsh(i) * 5400).toFixed(0), cy: (-200 - hsh(i + 7) * 4000).toFixed(0), r: (1 + hsh(i + 3) * 2.4).toFixed(1), fill: '#fff8e4', opacity: (0.3 + hsh(i + 5) * 0.7).toFixed(2), class: 'st' });
  for (let i = 0; i < 46; i++) {
    const x = -800 + hsh(i + 40) * 4200, y = -450 - hsh(i + 41) * 1500, rx = 160 + hsh(i + 42) * 260, ry = 40 + hsh(i + 43) * 50;
    mk('ellipse', $('#clouds'), { cx: x.toFixed(0), cy: (y + 22).toFixed(0), rx: rx.toFixed(0), ry: (ry * 0.7).toFixed(0), fill: '#5a4a7a', opacity: 0.45 });
    for (let j = 0; j < 5; j++) mk('circle', $('#clouds'), { cx: (x - rx * 0.7 + j * rx * 0.35).toFixed(0), cy: (y - Math.sin(j / 4 * Math.PI) * ry * 0.9).toFixed(0), r: (ry * (0.8 + Math.sin(j / 4 * Math.PI) * 0.7)).toFixed(0), fill: y > -1100 ? '#ffc8a8' : '#d8b8d8', opacity: 0.55 });
  }
  // the far flock: little 'v' birds in a vee
  const flock = [];
  for (let i = 0; i < 21; i++) flock.push(mk('path', $('#flock'), { fill: 'none', stroke: '#2a2030', 'stroke-width': 3, 'stroke-linecap': 'round' }));

  // ---------- state ----------
  const bird = SPOTS.map(([x, y, f], i) => ({ x: 2700 + i * 120, y: -300 - i * 60, f: -1, fly: 1, head: 0, beak: 0, tied: 0, s: 0.9 }));
  const st = { hammer: 1, lift: 0, follow: 0, night: 0, swing: 0, gh: 0, king: 0, flockOn: 1, walk: 0, slack: 1 };
  const cam = { cx: 1300, cy: 640, s: 1.05 };
  const bokeh = makeBokeh(10, ['#ffd8b8', '#ffe6c8', '#fff0e0'], 61);

  const tl = gsap.timeline({ paused: true });
  const pv = (id, map) => Object.entries(map).forEach(([part, o]) => tl.set(id + '-' + part, { rotation: 0, svgOrigin: o }, 0));
  pv('#BY', BOY_PIVOTS); pv('#PI', PILOT_PIVOTS);
  tl.set('#PI-root', { rotation: 0, svgOrigin: '0 0' }, 0).set('#BY-root', { rotation: 0, svgOrigin: '0 0' }, 0);
  tl.set([B('legL'), B('legR')], { scaleY: 0.5 }, 0).set('#byMove', { x: 0, y: 30 }, 0);
  tl.set(S('lidL'), { scaleY: 0, svgOrigin: '-126 -262' }, 0).set(S('lidR'), { scaleY: 0, svgOrigin: '-62 -260' }, 0)
    .set(S('head'), { rotation: 0, svgOrigin: '-60 -190' }, 0).set(S('earN'), { rotation: 0, svgOrigin: '-10 -262' }, 0).set('#sUp', { y: 70 }, 0);
  for (let i = 0; i < NB; i++) tl.set('#b' + i + '-neck', { rotation: 0, svgOrigin: '-26 -2' }, 0).set('#b' + i + '-beakB', { rotation: 0, svgOrigin: '-58 -51' }, 0);
  tl.set('#fade', { opacity: 1 }, 0).to('#fade', { opacity: 0, duration: 2.2 }, 0);
  tl.set('#nb', { opacity: 0, rotation: 0, x: 0, y: 0 }, 0);

  const TALK_B = 'M-8 -241 Q0 -230 8 -241', REST_B = 'M-8 -240 Q0 -235 8 -240', SMILE_B = 'M-9 -241 Q0 -232 9 -241', BIG_B = 'M-10 -242 Q0 -226 10 -242', SAD_B = 'M-8 -236 Q0 -241 8 -236', OH_B = 'M-4 -240 Q0 -232 4 -240', WHISTLE_B = 'M-3 -238 a3 3 0 1 0 0.1 0';
  const TALK_P = 'M-14 -366 Q0 -352 14 -366', REST_P = 'M-14 -364 Q0 -360 14 -364', SMILE_P = 'M-15 -366 Q0 -355 15 -366', OH_P = 'M-6 -364 Q0 -352 6 -364';
  const SMILE = 'M-112 -200 Q-98 -188 -82 -200', OH = 'M-103 -199 Q-97 -186 -90 -199', SAYD = 'M-108 -202 Q-98 -180 -86 -202';
  const talk = (sel, at, dur, a, rest) => { for (let k = 0; k < dur / 0.2; k++) tl.set(sel, { attr: { d: k % 2 ? rest : a } }, at + k * 0.2); tl.set(sel, { attr: { d: rest } }, at + dur); };
  const blinkB = (at) => tl.set([B('lidL'), B('lidR')], { opacity: 1 }, at).set([B('lidL'), B('lidR')], { opacity: 0 }, at + 0.14);
  const blinkP = (at) => tl.set([PI('lidL'), PI('lidR')], { opacity: 1 }, at).set([PI('lidL'), PI('lidR')], { opacity: 0 }, at + 0.14);
  [3.4, 12.2, 27.0, 49.6, 69.0, 80.6, 110.0, 140.0, 160.0, 199.0, 219.0].forEach(blinkB); [10.0, 30.0, 66.0, 79.6, 113.0].forEach(blinkP);

  // 0–14 sunset; the flock goes over; the boy gets up
  tl.to(cam, { cx: 1100, cy: 560, s: 1.0, duration: 12, ease: 'sine.inOut' }, 0.5);
  const fl = { x: 2600, y: 120, s: 0.7 };
  tl.to(fl, { x: -300, y: 260, s: 1.2, duration: 11, ease: 'none' }, 2.5).set(fl, { x: 2700, y: 100, s: 0.9 }, 13.6).to(fl, { x: -400, y: 190, duration: 26, ease: 'none' }, 13.6)
    .set(fl, { x: 2700, y: 80, s: 0.8 }, 40).to(fl, { x: -400, y: 160, duration: 30, ease: 'none' }, 40);
  tl.to(B('eyes'), { x: 6, y: -6, duration: 0.6 }, 3.0).to(B('head'), { rotation: 8, duration: 1.2, ease: 'sine.inOut' }, 3.0);
  tl.to([B('legL'), B('legR')], { scaleY: 1, duration: 0.8, ease: 'back.out(1.6)' }, 5.0).to('#byMove', { y: 0, duration: 0.8, ease: 'back.out(1.6)' }, 5.0);
  talk(B('mouth'), 6.0, 3.0, TALK_B, SMILE_B);
  tl.to(B('head'), { rotation: -6, duration: 2, ease: 'sine.inOut' }, 8.6).to(B('eyes'), { x: -6, y: -6, duration: 1 }, 8.6);
  // 14–26 the whistle; five birds come down around him
  tl.to(cam, { cx: 950, cy: 640, s: 1.3, duration: 3, ease: 'sine.inOut' }, 13.0);
  tl.to(B('armR'), { rotation: -150, duration: 0.5 }, 14.0).set(B('mouth'), { attr: { d: WHISTLE_B } }, 14.4).set(B('mouth'), { attr: { d: SMILE_B } }, 16.6).to(B('armR'), { rotation: 0, duration: 0.6 }, 16.8);
  bird.forEach((b, i) => {
    const [x, y, f] = SPOTS[i], at = 16.8 + i * 1.3;
    tl.set(b, { x: x + 900 + i * 140, y: y - 700 - i * 40, f: -1, fly: 1 }, 0)
      .to(b, { x: x + 40 * -f, y: y - 40, duration: 3.6, ease: 'power2.out' }, at)
      .to(b, { x, y, duration: 0.6, ease: 'power1.in' }, at + 3.6).set(b, { f }, at + 3.6).to(b, { fly: 0, duration: 0.5 }, at + 3.7);
  });
  tl.to(st, { hammer: 0, duration: 0.2 }, 15.0);
  tl.to(PI('head'), { rotation: -10, duration: 0.8 }, 15.4).to(PI('eyes'), { x: -10, y: -4, duration: 0.5 }, 15.4).to(PI('mouth'), { attr: { d: OH_P }, duration: 0.3 }, 18.0);
  tl.to(cam, { cx: 1250, cy: 650, s: 1.05, duration: 4, ease: 'sine.inOut' }, 17.4);
  talk(PI('mouth'), 23.0, 2.6, TALK_P, OH_P);
  tl.to(B('eyes'), { x: 0, y: 2, duration: 0.5 }, 22.0).to(B('mouth'), { attr: { d: BIG_B }, duration: 0.3 }, 22.0).to(B('head'), { rotation: 0, duration: 1 }, 22.0);
  // 26–58 the strings, one bird at a time
  tl.to(cam, { cx: 920, cy: 760, s: 1.6, duration: 3, ease: 'sine.inOut' }, 26.0);
  tl.set('#ball', { opacity: 1 }, 27.2);
  let prev = 900;
  TIE_AT.forEach((at, i) => {
    tl.to('#byMove', { x: TIE_X[i] - 900, duration: 1.4, ease: 'sine.inOut' }, at - 1.6);
    tl.to('#byMove', { y: 14, duration: 0.4 }, at).to([B('legL'), B('legR')], { scaleY: 0.8, duration: 0.4 }, at)
      .to(B('armR'), { rotation: -35, duration: 0.25, yoyo: true, repeat: 5 }, at + 0.4).to(B('armL'), { rotation: 25, duration: 0.3, yoyo: true, repeat: 3 }, at + 0.5)
      .to(B('head'), { rotation: SPOTS[i][0] > TIE_X[i] ? 8 : -8, duration: 0.4 }, at);
    tl.to(bird[i], { head: 1, duration: 0.5, yoyo: true, repeat: 1 }, at + 2.0);   // a nuzzle
    tl.set(bird[i], { tied: 1 }, at + 1.8);
    tl.to('#byMove', { y: 0, duration: 0.4 }, at + 3.0).to([B('legL'), B('legR')], { scaleY: 1, duration: 0.4 }, at + 3.0).to(B('head'), { rotation: 0, duration: 0.4 }, at + 3.0);
    prev = TIE_X[i];
  });
  talk(B('mouth'), 30.0, 3.6, TALK_B, SMILE_B); talk(B('mouth'), 36.0, 3.0, TALK_B, SMILE_B);
  tl.to(cam, { cx: 960, cy: 780, s: 1.9, duration: 3, ease: 'sine.inOut' }, 40.4);
  // bird three pecks at the box; the sheep peeks out; HONK
  tl.to(bird[2], { head: -1, duration: 0.25, yoyo: true, repeat: 3 }, 41.6);
  tl.to('#sUp', { y: -18, duration: 0.5, ease: 'back.out(2)' }, 42.8).to(S('eyes'), { x: 10, y: 0, duration: 0.3 }, 43.2);
  talk(S('mouth'), 44.0, 1.4, SAYD, OH);
  tl.to(bird[2], { beak: 1, duration: 0.1 }, 45.6).to(bird[2], { beak: 0, duration: 0.2 }, 46.6).to(bird[2], { head: 0.6, duration: 0.2, yoyo: true, repeat: 1 }, 45.6);
  tl.to(S('earN'), { rotation: -30, duration: 0.15 }, 45.7).to('#sUp', { y: 70, duration: 0.3, ease: 'power3.in' }, 45.8).set(S('earN'), { rotation: 0 }, 46.3);
  tl.to(cam, { cx: 920, cy: 740, s: 1.4, duration: 3, ease: 'sine.inOut' }, 47.0);
  tl.to(cam, { cx: 1080, cy: 700, s: 1.25, duration: 4, ease: 'sine.inOut' }, 55.0);
  tl.to('#byMove', { x: 960 - 900, duration: 1.2, ease: 'sine.inOut' }, 56.2);
  // the pilot comes over
  tl.to('#piMove', { x: -470, duration: 5.6, ease: 'sine.inOut' }, 55.6);
  tl.to(PI('head'), { rotation: 0, duration: 0.6 }, 55.6).to(PI('eyes'), { x: -6, y: 2, duration: 0.4 }, 61.4).set(PI('mouth'), { attr: { d: REST_P } }, 55.6);
  // 62–86 "You're leaving?"
  tl.to(cam, { cx: 1080, cy: 720, s: 1.55, duration: 4, ease: 'sine.inOut' }, 61.6);
  talk(PI('mouth'), 62.6, 2.0, TALK_P, REST_P);
  tl.to(B('head'), { rotation: 6, duration: 0.25, yoyo: true, repeat: 1 }, 64.8).to(B('eyes'), { x: 8, y: -4, duration: 0.4 }, 64.6);
  talk(B('mouth'), 66.0, 2.6, TALK_B, SMILE_B);
  tl.to('#boxPos', { attr: { transform: 'translate(985 902)' }, duration: 1.0, ease: 'power2.inOut' }, 68.8).to(B('armL'), { rotation: -30, duration: 1.0 }, 68.8).to(B('armR'), { rotation: 30, duration: 1.0 }, 68.8);
  talk(B('mouth'), 70.0, 3.0, TALK_B, SMILE_B);
  tl.to(PI('head'), { rotation: -6, duration: 0.8 }, 74.6);
  talk(PI('mouth'), 75.0, 4.0, TALK_P, REST_P);
  tl.to(B('head'), { rotation: -10, duration: 1.0 }, 77.0).to(B('eyes'), { x: 0, y: 6, duration: 0.6 }, 77.0).to(B('mouth'), { attr: { d: SAD_B }, duration: 0.4 }, 77.4);
  tl.to(PI('armR'), { rotation: -150, duration: 0.6 }, 79.6).to(PI('armR'), { rotation: -140, duration: 0.3, yoyo: true, repeat: 3 }, 80.2).to(PI('armR'), { rotation: 0, duration: 0.6 }, 81.6);
  tl.to(PI('mouth'), { attr: { d: SMILE_P }, duration: 0.4 }, 81.4).to(PI('eyes'), { x: -4, y: -4, duration: 0.3 }, 81.4);
  talk(PI('mouth'), 82.0, 2.6, TALK_P, SMILE_P);
  tl.set('#notebook', { opacity: 1 }, 84.2).to(PI('armL'), { rotation: 40, duration: 0.5 }, 84.2);
  // 86–100 the notebook: a muzzle
  tl.to('#nb', { opacity: 1, duration: 0.6 }, 85.8);
  tl.to('#handG', { opacity: 1, duration: 0.4 }, 86.2).to('#handG', { opacity: 0, duration: 0.6 }, 97.4);
  tl.to('#wRect', { attr: { width: 330 }, duration: 1.6, ease: 'none' }, 95.4);
  tl.to('#nb', { rotation: -5, x: -260, y: -140, opacity: 0, duration: 1.2, ease: 'power2.in' }, 99.2);
  // 100–110 the page goes into the box
  tl.to(cam, { cx: 1000, cy: 800, s: 2.0, duration: 0.01 }, 100.0).to(cam, { cx: 1000, cy: 790, s: 1.8, duration: 6, ease: 'sine.inOut' }, 100.2);
  tl.set('#notebook', { opacity: 0 }, 100).set(PI('armL'), { rotation: 0 }, 100).set('#page', { opacity: 1, x: 1040, y: 840, rotation: 0 }, 100).set(B('armR'), { rotation: -30 }, 100);
  tl.to(B('mouth'), { attr: { d: BIG_B }, duration: 0.3 }, 100.6).to(B('head'), { rotation: 6, duration: 0.6 }, 100.6).to(B('eyes'), { x: 4, y: -2, duration: 0.3 }, 100.6);
  talk(B('mouth'), 101.4, 2.8, TALK_B, BIG_B);
  tl.to('#page', { scale: 0.4, x: 985, y: 872, rotation: 90, duration: 1.2, ease: 'power2.inOut' }, 104.4).set('#page', { opacity: 0 }, 105.7).set(B('armR'), { rotation: 30 }, 105.7);
  tl.to('#sUp', { y: -18, duration: 0.5, ease: 'back.out(2)' }, 106.4).to(S('eyes'), { x: -6, y: -8, duration: 0.3 }, 106.6);
  talk(S('mouth'), 107.0, 2.6, SAYD, SMILE);
  tl.to('#sUp', { y: 70, duration: 0.4, ease: 'power2.in' }, 110.2);
  // 110–135 lift-off
  tl.to(cam, { cx: 1040, cy: 700, s: 1.25, duration: 2, ease: 'sine.inOut' }, 109.6);
  talk(B('mouth'), 111.0, 2.6, TALK_B, BIG_B);
  bird.forEach((b, i) => tl.to(b, { fly: 1, duration: 0.5 }, 111.6 + i * 0.15).to(b, { x: 960 + OFF[i][0], y: 950 + OFF[i][1], f: -1, duration: 4.2, ease: 'sine.inOut' }, 112.2 + i * 0.1));
  tl.to(st, { slack: 0, duration: 4 }, 112.4);
  tl.to(B('armR'), { rotation: -160, duration: 1.0 }, 112.6).to(B('armL'), { rotation: 20, duration: 1 }, 112.6)
    .to('#boxPos', { attr: { transform: 'translate(905 1040)' }, duration: 1.0 }, 112.6).to(st, { swing: 1, duration: 1 }, 113.0);
  tl.to(PI('head'), { rotation: 8, duration: 0.3 }, 114.6).to(PI('armR'), { rotation: -150, duration: 0.4 }, 114.8);
  talk(PI('mouth'), 115.0, 3.6, TALK_P, OH_P);
  tl.to(st, { lift: 3400, duration: 100, ease: 'power1.in' }, 117.0);
  tl.to(st, { follow: 1, duration: 4, ease: 'sine.inOut' }, 118.0);
  tl.to(B('legL'), { rotation: 12, duration: 0.6, yoyo: true, repeat: 199, ease: 'sine.inOut' }, 117.6).to(B('legR'), { rotation: -10, duration: 0.7, yoyo: true, repeat: 171, ease: 'sine.inOut' }, 117.6);
  tl.to('#piMove', { x: -380, duration: 3.6, ease: 'sine.out' }, 118.6);
  tl.to(B('head'), { rotation: 14, duration: 0.6 }, 120.4).to(B('eyes'), { x: 6, y: 10, duration: 0.4 }, 120.4);
  talk(B('mouth'), 121.0, 3.6, TALK_B, BIG_B);
  tl.to('#sUp', { y: -18, duration: 0.5, ease: 'back.out(2)' }, 122.4).to(S('eyes'), { x: -8, y: -10, duration: 0.3 }, 122.6).to('#sUp', { y: 70, duration: 0.5 }, 126.2);
  tl.to(PI('armR'), { rotation: -170, duration: 0.4, yoyo: true, repeat: 15, ease: 'sine.inOut' }, 123.0);   // waving
  talk(PI('mouth'), 127.0, 3.0, TALK_P, SMILE_P);
  tl.to(B('armL'), { rotation: 150, duration: 0.4, yoyo: true, repeat: 7, ease: 'sine.inOut' }, 130.4).set(B('armL'), { rotation: 20 }, 133.8);
  talk(B('mouth'), 131.0, 3.0, TALK_B, BIG_B);
  tl.to(cam, { s: 0.9, duration: 30, ease: 'sine.inOut' }, 124.0);
  tl.to(st, { flockOn: 0, duration: 4 }, 118.0);
  // 135–200 the clouds, the night; the ghosts hanging on
  tl.to('#sUp', { y: -18, duration: 0.6, ease: 'back.out(2)' }, 148.4).to(S('eyes'), { x: 4, y: 12, duration: 0.4 }, 148.8).to(S('mouth'), { attr: { d: OH }, duration: 0.3 }, 149.6);
  talk(S('mouth'), 150.0, 2.0, SAYD, OH);
  tl.to(cam, { s: 1.6, duration: 6, ease: 'sine.inOut' }, 154.0).to(cam, { s: 1.0, duration: 8, ease: 'sine.inOut' }, 160.0);
  tl.to(st, { night: 1, duration: 30, ease: 'sine.inOut' }, 150.0);
  tl.to('#warm', { opacity: 0.12, duration: 30 }, 150.0).to('#glow', { opacity: 0, duration: 20 }, 140.0);
  tl.to(st, { gh: 1, duration: 1.2 }, 181.6).to(cam, { s: 1.5, duration: 3, ease: 'sine.inOut' }, 181.0);
  tl.to('#gh', { opacity: 0.9, duration: 1.0 }, 181.6);
  talk('#G2-mouth', 184.0, 3.6, SAYD, OH); talk('#G1-mouth', 188.4, 2.4, SAYD, OH); talk('#G3-mouth', 191.4, 2.6, SAYD, SMILE);
  tl.to(S('eyes'), { x: 0, y: 14, duration: 0.4 }, 184.6);   // the sheep looks down at them
  tl.to('#gh', { opacity: 0, duration: 2.0 }, 197.0).to(cam, { s: 1.1, duration: 4, ease: 'sine.inOut' }, 196.0);
  // 200–240 into the stars; a little purple planet ahead
  talk(B('mouth'), 204.0, 3.6, TALK_B, SMILE_B);
  tl.to(B('head'), { rotation: 10, duration: 0.6 }, 203.6).to(B('eyes'), { x: 4, y: 10, duration: 0.4 }, 203.6);
  tl.to(S('eyes'), { x: -6, y: -12, duration: 0.5 }, 208.6);
  talk(S('mouth'), 210.0, 3.0, SAYD, SMILE);
  tl.to(B('eyes'), { x: 8, y: -6, duration: 0.4 }, 213.6).to(B('head'), { rotation: -4, duration: 0.6 }, 213.6);
  talk(B('mouth'), 214.0, 3.6, TALK_B, SMILE_B);
  tl.to(st, { king: 1, duration: 4, ease: 'sine.inOut' }, 216.0).to(cam, { s: 0.8, duration: 10, ease: 'sine.inOut' }, 217.0);
  tl.to('#fade', { opacity: 1, duration: 4 }, 236.0);

  // ---------- the pen on the notebook page ----------
  const mz = $$('#nb .mz').map((p) => ({ p, len: p.getTotalLength() + 1 }));
  const mzTotal = mz.reduce((a, o) => a + o.len, 0);
  mz.forEach((o) => { o.p.style.strokeDasharray = o.len + ' ' + (o.len + 10); });
  function pen(t) {
    const u = ss((t - 86.6) / 8.6);
    let acc = u * mzTotal, tip = null;
    for (const o of mz) { const d = Math.max(0, Math.min(o.len, acc)); o.p.style.strokeDashoffset = o.len - d; if (acc > 0 && acc <= o.len) tip = o.p.getPointAtLength(d); acc -= o.len; }
    if (!tip) tip = mz[mz.length - 1].p.getPointAtLength(mz[mz.length - 1].len - 1);
    if (t > 95.4) { const k = ss((t - 95.4) / 1.6); tip = { x: -140 + 330 * k, y: 150 + Math.sin(t * 30) * 6 }; }
    const off = Math.sin(t * 7) * 3;
    $('#handMove').setAttribute('transform', `translate(${(960 + tip.x * 1.7 + off).toFixed(1)} ${(360 + tip.y * 1.7 + off * 0.6).toFixed(1)})`);
  }

  // ---------- per frame ----------
  const WALKS = TIE_AT.map((a) => [a - 1.6, a - 0.2]).concat([[56.2, 57.4]]);
  const PWALKS = [[55.6, 61.2], [118.6, 122.2]];
  const groundX = 960, groundY = 950;
  function drive(t) {
    const b4 = Math.floor(t * 12) % 4;
    ['wcPlaneB', 'wcPilotB', 'wcBoyB'].forEach((id, i) => $('#' + id).setAttribute('seed', 3 + i * 4 + b4));
    if (st.hammer > 0) gsap.set(PI('armR'), { rotation: -120 + Math.sin(t * 9) * 16 * st.hammer });
    // walking legs
    const walkLegs = (wins, sel, amp, rate) => {
      let w = 0, ph = 0;
      for (const [a, z] of wins) { const k = ss((t - a) / 0.25) * (1 - ss((t - z + 0.25) / 0.25)); if (k > w) { w = k; ph = (t - a) * Math.PI * 2 * rate; } }
      if (w > 0.001) { gsap.set(sel + '-legL', { rotation: Math.sin(ph) * amp * w }); gsap.set(sel + '-legR', { rotation: -Math.sin(ph) * amp * w }); }
      return Math.abs(Math.sin(ph)) * w;
    };
    const wb = t < 117 ? walkLegs(WALKS, '#BY', 22, 1.4) : 0;
    const wp = walkLegs(PWALKS, '#PI', 18, 1.1);
    $('#BY-bob').setAttribute('transform', `translate(0 ${(Math.sin(t * 1.9) * 2 - wb * 8).toFixed(2)})`);
    $('#PI-bob').setAttribute('transform', `translate(0 ${(Math.sin(t * 1.6) * 2 - wp * 8).toFixed(2)})`);
    $('#S-bob').setAttribute('transform', `translate(0 ${(-2 * Math.sin(t * 2.4)).toFixed(2)})`);
    // flight: the boy is carried up; the birds above him, the box below
    const L = st.lift, by = groundY - L + Math.sin(t * 1.3) * 10 * Math.min(1, L / 100), bx = groundX + L * 0.18 + Math.sin(t * 0.7) * 14 * Math.min(1, L / 100);
    if (L > 0) $('#byMove').setAttribute('transform', `translate(${(bx - 900).toFixed(1)} ${(by - 950).toFixed(1)})`);
    Boy.scarf('BY', t, 0.6 + Math.min(1, L / 400) * 0.8, -1);
    Pilot.scarf('PI', t, 0.4, -1);
    // the boy's hands (for strings and the box)
    const R = gsap.getProperty(B('armR'), 'rotation') * Math.PI / 180, Lr = gsap.getProperty(B('armL'), 'rotation') * Math.PI / 180;
    const m = $('#byMove').transform.baseVal.consolidate(), mx = m ? m.matrix.e : 0, my = m ? m.matrix.f : 0;
    const handAt = (px, py, hx, hy, r) => { const vx = hx - px, vy = hy - py; return [900 + mx + 0.62 * (px + vx * Math.cos(r) - vy * Math.sin(r)), 950 + my + 0.62 * (py + vx * Math.sin(r) + vy * Math.cos(r))]; };
    const hR = handAt(30, -196, 54, -120, R), hL = handAt(-30, -196, -54, -120, Lr);
    // birds
    const strs = [];
    bird.forEach((b, i) => {
      let x = b.x, y = b.y;
      if (L > 0) { x = bx + OFF[i][0] + Math.sin(t * 1.1 + i) * 16; y = by + OFF[i][1] + Math.sin(t * 1.7 + i * 2) * 12; }
      const flap = b.fly * Math.sin(t * (7 + i * 0.6) + i * 1.3);
      $('#bp' + i).setAttribute('transform', `translate(${x.toFixed(1)} ${(y - b.fly * 6 * Math.sin(t * 7 + i)).toFixed(1)}) scale(${(b.s * -b.f).toFixed(3)} ${b.s})`);
      $('#b' + i + '-wN').setAttribute('transform', `rotate(${(-48 * flap - 4).toFixed(1)} 8 -8)`);
      $('#b' + i + '-wF').setAttribute('transform', `rotate(${(-44 * b.fly * Math.sin(t * (7 + i * 0.6) + i * 1.3 - 0.4) - 2).toFixed(1)} 6 -10)`);
      $('#b' + i + '-legs').setAttribute('opacity', (1 - b.fly).toFixed(2));
      gsap.set('#b' + i + '-neck', { rotation: b.head * 24 + Math.sin(t * 1.2 + i) * 3 * (1 - b.fly) });
      gsap.set('#b' + i + '-beakB', { rotation: -b.beak * 26 });
      if (b.tied) {
        const lx = x + (L > 0 ? 0 : 4 * -b.f), ly = y + (L > 0 ? 6 : 14);
        const sag = 60 * st.slack, mxs = (lx + hR[0]) / 2, mys = (ly + hR[1]) / 2 + sag;
        strs.push(`M${hR[0].toFixed(1)} ${hR[1].toFixed(1)} Q${mxs.toFixed(1)} ${mys.toFixed(1)} ${lx.toFixed(1)} ${ly.toFixed(1)}`);
      }
    });
    let sp = $('#strings').firstChild; if (!sp) sp = mk('path', $('#strings'), {});
    sp.setAttribute('d', strs.join(' '));
    $('#ball').setAttribute('opacity', t > 27.2 && t < 112.6 ? 1 : 0);
    // the box: on the ground, in his arms, then swinging from his left hand on a string
    if (st.swing > 0) {
      const sw = Math.sin(t * 1.6) * 8 + Math.sin(t * 0.7) * 4, bxp = hL[0] + 5, byp = hL[1] + 74;
      const k = st.swing;
      const X = 905 + (bxp - 905) * k, Y = 1040 + (byp - 1040) * k;
      $('#boxPos').setAttribute('transform', `translate(${X.toFixed(1)} ${Y.toFixed(1)})`);
      $('#boxSwing').setAttribute('transform', `rotate(${sw.toFixed(2)} 0 -74)`);
      $('#boxString').setAttribute('d', `M6 -60 L-5 -74`);
    }
    // ghosts hanging on, swinging
    if (st.gh > 0) [1, 2, 3].forEach((n, i) => $('#ghs' + n).setAttribute('transform', `rotate(${(Math.sin(t * 2.2 + i) * 10).toFixed(2)} 0 -300)`));
    // the far flock
    flock.forEach((p, i) => {
      const side = i % 2 ? 1 : -1, row = Math.ceil(i / 2), x = fl.x + row * 34 * fl.s, y = fl.y + side * row * 18 * fl.s, k = (5 + Math.sin(t * 8 + i)) * fl.s;
      p.setAttribute('d', `M${(x - 10 * fl.s).toFixed(1)} ${y.toFixed(1)} Q${(x - 5 * fl.s).toFixed(1)} ${(y - k).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)} Q${(x + 5 * fl.s).toFixed(1)} ${(y - k).toFixed(1)} ${(x + 10 * fl.s).toFixed(1)} ${y.toFixed(1)}`);
      p.setAttribute('opacity', st.flockOn);
    });
    // the night, stars, and the King's planet coming into view
    $('#stars').setAttribute('opacity', (0.15 + 0.85 * st.night).toFixed(3));
    $('#kingP').setAttribute('opacity', st.king.toFixed(3));
    $('#kingP').setAttribute('transform', `translate(${(bx + 760).toFixed(0)} ${(by - 520 + (1 - st.king) * 200).toFixed(0)})`);
    pen(t);
    subs(t);
    // camera: free, or following the boy up into the sky
    const f = st.follow;
    const ccx = cam.cx + ((bx + 40 + st.king * 300) - cam.cx) * f, ccy = cam.cy + ((by - 120 - st.king * 160) - cam.cy) * f;
    const w = cinemaFrame(t, 0);
    const hw = 960 / cam.s, hh = 402 / cam.s;
    const cx = Math.min(Math.max(ccx, hw), 2400 - hw), cy = f > 0 ? Math.min(ccy, 1005 - hh) : Math.min(Math.max(ccy, hh), 1005 - hh);
    $('#world').style.transform = `translate(${(960 - cx * cam.s + w.wx).toFixed(2)}px, ${(402 - cy * cam.s + w.wy).toFixed(2)}px) scale(${cam.s})`;
    $('#bgImg').style.filter = `blur(${Math.max(0, (cam.s - 1.3) * 2.6).toFixed(2)}px)`;
    drawBokeh(bokeh, t, cam, Math.max(0, Math.min(1, (cam.s - 1.4) / 0.4)) * 0.5 * (1 - st.night));
  }
  return { render: (t) => { tl.seek(t); drive(t); } };
}
