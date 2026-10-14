// Part 2 — the desert at night. The sheep climbs out of the box, finds out what hunger is,
// meets a small flower with three petals, and chooses to keep it company instead of eating it.
import gsap from 'gsap';
// Every frame is a fresh seek, so tweens must render their values immediately (no lazy first render).
gsap.defaults({ lazy: false });
import {cinemaCss, cinemaHtml, cinemaFrame, makeBokeh, drawBokeh} from './cinema.js';
import {Sheep} from './sheep.js';

export const DURATION = 56;

const SUBS = [
  [0.8, 4.6, "Goodnight, little sheep. Tomorrow, I'll take you home — to my star.", '晚安，小羊。明天，我带你回家——回我的星星。', 'say'],
  [7.0, 10.0, "So this is outside. It's so big… and so blue.", '原来这就是外面。好大……好蓝。'],
  [17.0, 20.6, 'Grrr… what was that? Oh. I think I’m hungry.', '咕噜……那是什么声音？哦。我想，我饿了。'],
  [21.2, 24.2, 'But there’s only sand here. Sand, sand, and more sand.', '可是这里只有沙子。沙子，沙子，还是沙子。'],
  [29.6, 32.2, 'Food! A flower is food… isn’t it?', '吃的！花就是吃的……对吧？'],
  [33.4, 37.4, 'It’s shaking. So small, and all alone… like me.', '它在发抖。那么小，孤零零的……就像我。'],
  [38.0, 41.6, 'He wanted a good sheep. A good sheep wouldn’t eat a lonely flower.', '他想要一只好羊。好羊不会吃掉一朵孤单的花。'],
  [45.2, 49.4, 'I’m still hungry. But I’d rather keep you company.', '我还是饿。可是，我更想陪着你。'],
  [50.8, 54.0, 'His star… Tomorrow, we go home.', '他的星星……明天，我们就回家。'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('') + '盒子里的羊第二部分沙漠里的花·';

export const css = `
#stage{position:relative;width:1920px;height:804px;overflow:hidden;background:#1b2350}
#world{position:absolute;left:0;top:0;width:2400px;height:1005px;transform-origin:0 0;filter:contrast(1.07) saturate(1.08)}
.bg{position:absolute;left:0;top:0;width:2400px;height:1005px}
#svg{position:absolute;left:0;top:0;width:2400px;height:1005px;overflow:visible}
#subs{position:absolute;left:0;right:0;bottom:30px;text-align:center;pointer-events:none}
#subs .en{font:italic 40px/1.25 Lora,Georgia,serif;color:#fffaf0;text-shadow:0 0 6px rgba(10,12,40,.9),0 0 18px rgba(10,12,40,.7)}
#subs .en.say{font-style:normal}
#subs .zh{font:31px/1.5 "Noto Serif SC",serif;color:#fff3e0;text-shadow:0 0 6px rgba(10,12,40,.9),0 0 16px rgba(10,12,40,.7)}
#title{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;opacity:0;color:#fff6e4;text-shadow:0 0 20px rgba(20,20,80,.8)}
#title .t0{font:italic 44px Lora,Georgia,serif;opacity:.85}
#title .t1{font:78px Lora,Georgia,serif;margin-top:10px}
#title .t2{font:42px "Noto Serif SC",serif;margin-top:8px}
#fade{position:absolute;inset:0;background:#000}
#cool{position:absolute;inset:0;pointer-events:none;background:#3a4fb8;mix-blend-mode:soft-light;opacity:.32}
#grade{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at center,rgba(0,0,0,0) 55%,rgba(5,8,30,.35) 100%)}
${cinemaCss}
`;

const boil = (id, seed) => `<feTurbulence id="${id}" type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="${seed}" result="n"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" result="d"/>`;

// the flower, drawn around its root at (0,0); stem up to the head at (0,-112)
const PET = 'M0 0 C-17 -10 -18 -38 0 -50 C18 -38 17 -10 0 0Z';
const FLOWER = `
 <g id="fl">
  <ellipse id="flGlow" cx="0" cy="-80" rx="230" ry="190" fill="url(#flGlowG)" opacity="0"/>
  <ellipse id="flShadow" cx="6" cy="2" rx="46" ry="7" fill="#2a2450" opacity="0" filter="url(#soft)"/>
  <g id="flSway">
   <path class="fdraw" d="M0 0 C-6 -40 8 -72 0 -112" fill="none" stroke="#5b4a3a" stroke-width="4.5" stroke-linecap="round"/>
   <g id="flLeaf"><path class="ffill" d="M1 -44 C22 -58 40 -52 46 -36 C28 -28 12 -32 1 -44Z" fill="#8fbf86" opacity="0"/>
   <path class="fdraw" d="M1 -44 C22 -58 40 -52 46 -36 C28 -28 12 -32 1 -44Z" fill="none" stroke="#5b4a3a" stroke-width="3.5"/></g>
   <g transform="translate(0 -112)"><g id="flHead">
    <g id="pL" transform="rotate(-48)"><g class="pet"><path class="ffill" d="${PET}" fill="url(#petG)" opacity="0"/><path class="fdraw" d="${PET}" fill="none" stroke="#6b4733" stroke-width="3.6"/></g></g>
    <g id="pR" transform="rotate(48)"><g class="pet"><path class="ffill" d="${PET}" fill="url(#petG)" opacity="0"/><path class="fdraw" d="${PET}" fill="none" stroke="#6b4733" stroke-width="3.6"/></g></g>
    <g id="pM"><g class="pet"><path class="ffill" d="${PET}" fill="url(#petG)" opacity="0"/><path class="fdraw" d="${PET}" fill="none" stroke="#6b4733" stroke-width="3.6"/></g></g>
    <circle class="ffill" cx="0" cy="-2" r="8" fill="#f6c95a" opacity="0"/>
   </g></g>
  </g>
 </g>`;

export const html = (IMG) => `
<div id="stage">
 <div id="world">
  <img class="bg" id="bgImg" src="${IMG}plate_desert.jpg">
  <svg id="svg" viewBox="0 0 2400 1005">
   <defs>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="blur3" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
    <filter id="wcNight" x="-15%" y="-15%" width="130%" height="130%">
     ${boil('boilN', 2)}
     <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="9" result="g"/>
     <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.40  0 0 0 0 0.45  0 0 0 -0.7 0.42" result="gm"/>
     <feComposite in="gm" in2="d" operator="in" result="tex"/>
     <feMerge result="m"><feMergeNode in="d"/><feMergeNode in="tex"/></feMerge>
     <feColorMatrix in="m" type="matrix" values="0.84 0 0 0 0.01  0 0.86 0 0 0.02  0 0 0.98 0 0.07  0 0 0 1 0"/>
    </filter>
    <filter id="wcBox" x="-15%" y="-15%" width="130%" height="130%">
     ${boil('boilB', 4)}
     <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="2" seed="3" result="g"/>
     <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.35  0 0 0 0 0.24  0 0 0 0 0.18  0 0 0 -0.7 0.38" result="gm"/>
     <feComposite in="gm" in2="d" operator="in" result="tex"/>
     <feMerge><feMergeNode in="d"/><feMergeNode in="tex"/></feMerge>
    </filter>
    <linearGradient id="boxFrontG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e2b98c"/><stop offset=".6" stop-color="#cf9f73"/><stop offset="1" stop-color="#b8875f"/></linearGradient>
    <linearGradient id="boxSideG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b98a62"/><stop offset="1" stop-color="#9c714f"/></linearGradient>
    <linearGradient id="boxFlapG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e8c79f"/><stop offset="1" stop-color="#d1a67c"/></linearGradient>
    <filter id="wcFl" x="-40%" y="-40%" width="180%" height="180%">${boil('boilF', 6)}</filter>
    <radialGradient id="flGlowG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff0b8" stop-opacity="1"/><stop offset=".45" stop-color="#ffc45e" stop-opacity=".5"/><stop offset="1" stop-color="#ffb24a" stop-opacity="0"/></radialGradient>
    <radialGradient id="petG" cx="50%" cy="80%" r="80%"><stop offset="0" stop-color="#fff4ec"/><stop offset=".7" stop-color="#f7cfd6"/><stop offset="1" stop-color="#ee9fb0"/></radialGradient>
    <radialGradient id="starG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fffbe8"/><stop offset=".3" stop-color="#ffe9a8" stop-opacity=".7"/><stop offset="1" stop-color="#ffd27a" stop-opacity="0"/></radialGradient>
   </defs>

   <g id="star" transform="translate(1614 74)" opacity="0">
    <circle r="130" fill="url(#starG)"/>
    <path d="M0 -46 L6 -6 L46 0 L6 6 L0 46 L-6 6 L-46 0 L-6 -6Z" fill="#fffbe8"/>
   </g>

   <!-- the box, opened, sitting on the sand -->
   <g id="boxBack" filter="url(#wcBox)" stroke="#5a3d2b" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <path d="M1545 675 L1600 625 L1990 625 L1935 675Z" fill="#3a2a22"/>
    <path d="M1600 625 L1640 535 L2020 535 L1990 625Z" fill="url(#boxFlapG)"/>
   </g>
   <ellipse id="boxShadow" cx="1760" cy="982" rx="260" ry="22" fill="#2a2450" opacity=".35" filter="url(#soft)"/>

   <clipPath id="groundClip"><rect x="0" y="-200" width="2400" height="1180"/></clipPath>
   <g clip-path="url(#groundClip)"><g id="cMove"><g transform="translate(1760 962) scale(0.85)"><g id="cs" filter="url(#wcNight)"></g></g></g></g>

   <g id="boxFront" filter="url(#wcBox)" stroke="#5a3d2b" stroke-width="5" stroke-linejoin="round" stroke-linecap="round">
    <path d="M1545 675 L1935 675 L1935 975 L1545 975Z" fill="url(#boxFrontG)"/>
    <path d="M1935 675 L1990 625 L1990 925 L1935 975Z" fill="url(#boxSideG)"/>
    <path d="M1545 675 L1600 625 L1530 565 L1470 612Z" fill="url(#boxFlapG)"/>
    <path d="M1935 675 L1990 625 L2060 600 L2010 652Z" fill="url(#boxFlapG)"/>
    <circle cx="1650" cy="790" r="22" fill="#3a2a22"/><circle cx="1740" cy="770" r="22" fill="#3a2a22"/><circle cx="1830" cy="790" r="22" fill="#3a2a22"/>
   </g>

   <g id="flPos" transform="translate(720 964) scale(1.25)"><g filter="url(#wcFl)">${FLOWER}</g></g>
   <g id="wind"></g>
  </svg>
 </div>
 <div id="cool"></div>
 <div id="grade"></div>
 <div id="title"><div class="t0">The Sheep in the Box</div><div class="t1">Part Two · The Flower in the Desert</div><div class="t2">第二部分 · 沙漠里的花</div></div>
 ${cinemaHtml}
 <div id="subs"><div class="en"></div><div class="zh"></div></div>
 <div id="fade"></div>
</div>`;

export function setup() {
  const $ = (s) => document.querySelector(s), $$ = (s) => Array.from(document.querySelectorAll(s));
  $('#cs').innerHTML = Sheep.svg('C');

  // ---------- subtitles ----------
  function subs(t) {
    const en = $('#subs .en'), zh = $('#subs .zh'); let on = null;
    for (const s of SUBS) if (t >= s[0] - 0.25 && t <= s[1] + 0.3) on = s;
    if (!on) { en.textContent = ''; zh.textContent = ''; return; }
    const k = Math.min(1, (t - on[0] + 0.25) / 0.3, (on[1] + 0.3 - t) / 0.3);
    en.textContent = on[2]; zh.textContent = on[3]; en.className = 'en' + (on[4] ? ' say' : '');
    $('#subs').style.opacity = Math.max(0, k);
  }

  // ---------- the flower draws itself in pencil ----------
  const fPaths = $$('#fl .fdraw').map((p) => ({ p, len: p.getTotalLength() }));
  const fTotal = fPaths.reduce((a, o) => a + o.len, 0);
  fPaths.forEach((o) => { o.p.style.strokeDasharray = o.len + ' ' + (o.len + 10); o.p.style.strokeDashoffset = o.len; });
  function fDraw(u) { let acc = u * fTotal; for (const o of fPaths) { const d = Math.max(0, Math.min(o.len, acc)); o.p.style.strokeDashoffset = o.len - d; acc -= o.len; } }

  // ---------- camera ----------
  const cam = { cx: 1300, cy: 402, s: 1.0 };
  const bokeh = makeBokeh(12, ['#ffe6b8', '#d9dcff', '#ffd6a0'], 11);
  function applyCam(t) {
    const w = cinemaFrame(t, 0);
    const hw = 960 / cam.s, hh = 402 / cam.s;
    const cx = Math.min(Math.max(cam.cx, hw), 2400 - hw), cy = Math.min(Math.max(cam.cy, hh), 1005 - hh);
    $('#world').style.transform = `translate(${(960 - cx * cam.s + w.wx).toFixed(2)}px, ${(402 - cy * cam.s + w.wy).toFixed(2)}px) scale(${cam.s})`;
    // shallow depth of field on the painted desert as the camera pushes in
    $('#bgImg').style.filter = `blur(${Math.max(0, (cam.s - 1.2) * 3.0).toFixed(2)}px)`;
    drawBokeh(bokeh, t, cam, Math.max(0, Math.min(1, (cam.s - 1.15) / 0.3)) * 0.7);
  }

  // ---------- blowing sand ----------
  const grains = []; let seed = 5; const rnd = () => ((seed = (seed * 9301 + 49297) % 233280) / 233280);
  for (let i = 0; i < 220; i++) {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
    c.setAttribute('fill', '#f7dcc0'); $('#wind').appendChild(c);
    grains.push({ c, x0: rnd() * 2600, y: 830 + rnd() * 170, sp: 0.6 + rnd() * 0.8, ph: rnd() * 6.28, r: 1.2 + rnd() * 2.2 });
  }
  const gust = (t) => 0.18 * ss((t - 19.6) / 1.2) * (1 - ss((t - 23.8) / 1.5)) + ss((t - 41.2) / 1.0) * (1 - ss((t - 45.6) / 2.0));
  function wind(t) {
    // distance blown = integral of a steady breeze plus the gusts, so grains never jump backwards
    const g = gust(t);
    const dist = t * 40 + 900 * (ss((t - 19.6) / 4.4) * 0.25 + ss((t - 41.2) / 5) * 1.0);
    const shelterX = 720 + 180; // behind the sheep, once it lies down
    const shelter = ss((t - 43.2) / 1.2);
    for (const m of grains) {
      let x = 2500 - ((m.x0 + dist * m.sp) % 2700);
      const y = m.y + Math.sin(t * 3 * m.sp + m.ph) * 6 - (1 - (m.y - 830) / 170) * 4;
      let a = (0.12 + 0.75 * g) * (0.6 + 0.4 * Math.sin(t * 5 * m.sp + m.ph));
      if (x < shelterX + 120 && x > 560 && m.y > 880) a *= 1 - 0.85 * shelter;
      const stretch = 1 + 5 * g;
      m.c.setAttribute('cx', x.toFixed(1)); m.c.setAttribute('cy', y.toFixed(1));
      m.c.setAttribute('rx', (m.r * stretch).toFixed(2)); m.c.setAttribute('ry', m.r.toFixed(2));
      m.c.setAttribute('opacity', Math.max(0, a).toFixed(3));
    }
    return g;
  }

  // ---------- puppet helpers ----------
  const P = (part) => '#C-' + part;
  const SMILE = 'M-112 -200 Q-98 -188 -82 -200', BIG = 'M-116 -203 Q-98 -180 -78 -203', OH = 'M-103 -199 Q-97 -186 -90 -199',
    WORRY = 'M-110 -195 Q-98 -203 -84 -195', EAT = 'M-114 -204 Q-98 -170 -80 -204';
  function blink(tl, at, hold = 0.06) {
    tl.to([P('lidL'), P('lidR')], { scaleY: 1, duration: 0.07, ease: 'power2.in' }, at)
      .to([P('lidL'), P('lidR')], { scaleY: 0, duration: 0.11, ease: 'power2.out' }, at + 0.07 + hold);
  }

  // ---------- the timeline ----------
  const tl = gsap.timeline({ paused: true });
  tl.set(P('lidL'), { scaleY: 0, svgOrigin: '-126 -262' }, 0)
    .set(P('lidR'), { scaleY: 0, svgOrigin: '-62 -260' }, 0)
    .set(P('head'), { rotation: 0, svgOrigin: '-60 -190' }, 0)
    .set(P('earN'), { rotation: 0, svgOrigin: '-10 -262' }, 0)
    .set(P('body'), { scaleY: 1, svgOrigin: '40 -80' }, 0)
    .set([P('legsFar'), P('legsNear')], { scaleY: 1, svgOrigin: '0 -100' }, 0)
    .set(P('walk'), { y: 100 }, 0)
    .set(P('shadow'), { opacity: 0 }, 0)
    .set('#flGlow', { scale: 1, svgOrigin: '0 -80' }, 0)
    .set(cam, { cx: 1300, cy: 402, s: 1.0 }, 0);

  // 0–6.5 from the stars down to the sand and the box
  tl.set('#fade', { opacity: 0 }, 0);
  tl.to(cam, { cx: 1600, cy: 700, s: 1.22, duration: 6.5, ease: 'sine.inOut' }, 0);

  // 5.6 a head peeks over the rim of the box
  tl.to(P('walk'), { y: -125, duration: 0.9, ease: 'power2.out' }, 5.6)
    .to(P('eyes'), { x: -6, duration: 0.4 }, 6.6);
  blink(tl, 6.9);
  tl.to(P('head'), { rotation: 8, duration: 0.9, ease: 'sine.inOut' }, 7.3).to(P('eyes'), { x: 6, y: -6, duration: 0.6 }, 7.3)   // looks up at the sky
    .to(P('mouth'), { attr: { d: OH }, duration: 0.3 }, 7.6)
    .to(P('head'), { rotation: -4, duration: 0.9, ease: 'sine.inOut' }, 8.6).to(P('eyes'), { x: -8, y: 0, duration: 0.6 }, 8.6)
    .to(P('mouth'), { attr: { d: BIG }, duration: 0.3 }, 9.4)
    .to(P('head'), { rotation: 0, duration: 0.5 }, 9.8).to(P('eyes'), { x: 0, duration: 0.4 }, 9.8);

  // 10.4 hops out over the front of the box
  tl.to(P('walk'), { y: -160, duration: 0.25, ease: 'power2.in' }, 10.2)                     // crouch… spring
    .to(P('body'), { scaleY: 0.9, duration: 0.15 }, 10.2).to(P('body'), { scaleY: 1.05, duration: 0.15 }, 10.45)
    .to('#cMove', { x: -360, duration: 0.85, ease: 'sine.inOut' }, 10.45)
    .to(P('walk'), { y: -330, duration: 0.42, ease: 'power2.out' }, 10.45)
    .to(P('walk'), { y: 0, duration: 0.43, ease: 'power2.in' }, 10.87)
    .to(P('earN'), { rotation: -22, duration: 0.3 }, 10.45).to(P('earN'), { rotation: 0, duration: 1.0, ease: 'elastic.out(1, 0.3)' }, 11.3)
    .to(P('shadow'), { opacity: 0.3, duration: 0.4 }, 10.95)
    .to(P('body'), { scaleY: 0.88, duration: 0.08 }, 11.3).to(P('body'), { scaleY: 1, duration: 0.45, ease: 'elastic.out(1, 0.4)' }, 11.38);
  tl.to(cam, { cx: 1380, cy: 720, s: 1.25, duration: 4.5, ease: 'sine.inOut' }, 10.6);

  // 12.0–15.5 trots off into the desert (legs driven below)
  tl.to('#cMove', { x: -580, duration: 3.5, ease: 'sine.inOut' }, 12.0);
  tl.to(P('head'), { rotation: 4, duration: 0.4 }, 12.0).to(P('head'), { rotation: 0, duration: 0.4 }, 15.2);

  // 16.2 the tummy rumbles
  tl.to(P('body'), { scaleY: 0.95, duration: 0.07 }, 16.2).to(P('body'), { scaleY: 1.03, duration: 0.07 }, 16.27)
    .to(P('body'), { scaleY: 0.96, duration: 0.07 }, 16.34).to(P('body'), { scaleY: 1.02, duration: 0.07 }, 16.41)
    .to(P('body'), { scaleY: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' }, 16.48)
    .to(P('eyes'), { y: 8, x: 8, duration: 0.3 }, 16.4).to(P('head'), { rotation: -10, duration: 0.5, ease: 'power2.inOut' }, 16.4)   // looks at its own tummy
    .to(P('mouth'), { attr: { d: OH }, duration: 0.2 }, 16.3)
    .to(P('mouth'), { attr: { d: WORRY }, duration: 0.4 }, 18.6)
    .to(P('earN'), { rotation: 18, duration: 0.6, ease: 'sine.inOut' }, 18.6);                // ears droop
  blink(tl, 17.6);
  tl.to(cam, { cx: 1200, cy: 740, s: 1.42, duration: 3.5, ease: 'sine.inOut' }, 15.6);

  // 20.6–24 sniffs around: nothing but sand
  tl.to(P('head'), { rotation: 6, duration: 0.6, ease: 'sine.inOut' }, 20.6).to(P('eyes'), { x: 8, y: 0, duration: 0.4 }, 20.6)
    .to(P('head'), { rotation: 3, duration: 0.12 }, 21.3).to(P('head'), { rotation: 6, duration: 0.12 }, 21.42)
    .to(P('head'), { rotation: -6, duration: 0.8, ease: 'sine.inOut' }, 21.9).to(P('eyes'), { x: -8, duration: 0.5 }, 21.9)
    .to(P('head'), { rotation: -9, duration: 0.12 }, 22.8).to(P('head'), { rotation: -6, duration: 0.12 }, 22.92)
    .to(P('head'), { rotation: -12, duration: 0.6, ease: 'sine.inOut' }, 23.3);
  blink(tl, 23.5);

  // 24.4 a flower draws itself out of the sand (lines driven below, colour blooms after)
  tl.to('#flGlow', { opacity: 0.8, duration: 1.2 }, 24.3)
    .to('#fl .ffill', { opacity: 1, duration: 1.0, stagger: 0.08, ease: 'sine.out' }, 26.2)
    .to('#flShadow', { opacity: 0.35, duration: 0.8 }, 26.2)
    .to('#flGlow', { opacity: 0.5, duration: 1.5 }, 26.8);
  tl.to(P('earN'), { rotation: -18, duration: 0.25, ease: 'power2.out' }, 25.2).to(P('earN'), { rotation: 0, duration: 0.9, ease: 'elastic.out(1, 0.35)' }, 25.45)
    .to(P('head'), { rotation: 2, duration: 0.4, ease: 'back.out(2)' }, 25.2).to(P('eyes'), { x: -10, y: 2, duration: 0.25 }, 25.2)
    .to(P('mouth'), { attr: { d: BIG }, duration: 0.3 }, 25.6);
  tl.to(cam, { cx: 980, cy: 740, s: 1.3, duration: 2.4, ease: 'sine.inOut' }, 24.2);

  // 26.6–30.2 trots over to it
  tl.to('#cMove', { x: -815, duration: 3.6, ease: 'sine.inOut' }, 26.6);
  tl.to(cam, { cx: 860, cy: 780, s: 1.62, duration: 4.2, ease: 'sine.inOut' }, 26.8);

  // 30.4 leans in to eat
  tl.to(P('head'), { rotation: -16, duration: 0.7, ease: 'power2.inOut' }, 30.4).to(P('eyes'), { x: -6, y: 8, duration: 0.4 }, 30.4)
    .to(P('mouth'), { attr: { d: EAT }, duration: 0.35 }, 30.9)
    .to('#cMove', { x: -838, duration: 0.7, ease: 'power2.inOut' }, 30.4);
  // 32.3 the flower trembles (shiver driven below); the sheep freezes
  tl.to(P('mouth'), { attr: { d: OH }, duration: 0.15 }, 32.4)
    .to(P('eyes'), { x: -10, y: 0, duration: 0.15 }, 32.4)
    .to(P('head'), { rotation: -4, duration: 0.6, ease: 'power2.out' }, 32.5)
    .to('#cMove', { x: -812, duration: 0.6, ease: 'power2.out' }, 32.5)
    .to(P('earN'), { rotation: -14, duration: 0.2 }, 32.4).to(P('earN'), { rotation: 0, duration: 0.8, ease: 'elastic.out(1, 0.35)' }, 32.6);
  blink(tl, 33.6, 0.1);
  tl.to(P('mouth'), { attr: { d: WORRY }, duration: 0.4 }, 34.6)
    .to(P('head'), { rotation: -9, duration: 1.2, ease: 'sine.inOut' }, 35.0).to(P('eyes'), { y: 6, duration: 0.8 }, 35.0);
  // 37.6 remembers the boy: looks back towards the box, then home to the flower
  tl.to(P('head'), { rotation: 10, duration: 1.0, ease: 'sine.inOut' }, 37.6).to(P('eyes'), { x: 8, y: -6, duration: 0.7 }, 37.6)
    .to(P('mouth'), { attr: { d: SMILE }, duration: 0.5 }, 39.2)
    .to(P('head'), { rotation: -6, duration: 1.0, ease: 'sine.inOut' }, 40.2).to(P('eyes'), { x: -8, y: 4, duration: 0.7 }, 40.2);
  blink(tl, 39.0);
  tl.to(cam, { cx: 900, cy: 760, s: 1.5, duration: 6, ease: 'sine.inOut' }, 31.0);

  // 41.2 a gust of wind: the sheep lies down beside the flower, between it and the wind
  tl.to(P('earN'), { rotation: 22, duration: 0.5 }, 41.4)
    .to(P('eyes'), { x: 6, duration: 0.3 }, 41.4)
    .to('#cMove', { x: -830, duration: 0.8, ease: 'sine.inOut' }, 42.4)
    .to(P('walk'), { y: 62, duration: 0.9, ease: 'power2.inOut' }, 42.6)
    .to([P('legsFar'), P('legsNear')], { scaleY: 0.38, duration: 0.9, ease: 'power2.inOut' }, 42.6)
    .to(P('head'), { rotation: -10, duration: 0.9, ease: 'sine.inOut' }, 42.6).to(P('eyes'), { x: -8, y: 6, duration: 0.6 }, 42.8)
    .to(P('shadow'), { scaleX: 1.15, opacity: 0.4, duration: 0.8, svgOrigin: '20 2' }, 42.6);
  tl.to(cam, { cx: 900, cy: 780, s: 1.34, duration: 3.5, ease: 'sine.inOut' }, 40.8);
  // 44.2 the flower settles, opens and leans towards the sheep; another quiet rumble, a smile anyway
  tl.to('#flGlow', { opacity: 1, scale: 1.35, duration: 2.4, ease: 'sine.out' }, 44.4)
    .to('#flHead', { rotation: 14, duration: 1.6, ease: 'sine.inOut', svgOrigin: '0 0' }, 44.6)
    .to(P('body'), { scaleY: 0.97, duration: 0.08 }, 45.0).to(P('body'), { scaleY: 1, duration: 0.4, ease: 'elastic.out(1, 0.4)' }, 45.08)
    .to(P('mouth'), { attr: { d: BIG }, duration: 0.5 }, 46.2)
    .to(P('earN'), { rotation: 6, duration: 0.8 }, 45.6)
    .to([P('lidL'), P('lidR')], { scaleY: 0.65, duration: 0.8, ease: 'sine.inOut' }, 47.2);
  // 45.9 the kindness finishes its ear: a gold line traces the open tip, then the tip is whole
  tl.to(P('earN') + ' .trace', { opacity: 1, duration: 0.35, ease: 'sine.in' }, 45.9)
    .set(P('earN') + ' .pencil', { opacity: 0 }, 46.4).set(P('finishEar'), { opacity: 1 }, 46.4)
    .to(P('earN') + ' .trace', { opacity: 0, duration: 1.6, ease: 'sine.inOut' }, 46.5);
  // 49.2 up to the stars; one of them winks
  tl.to(cam, { cx: 1400, cy: 402, s: 1.0, duration: 4.4, ease: 'sine.inOut' }, 49.2);
  tl.to('#star', { opacity: 1, duration: 0.6 }, 51.4).to('#star', { scale: 1.4, duration: 0.5, ease: 'sine.out', svgOrigin: '0 0' }, 51.4)
    .to('#star', { scale: 0.8, opacity: 0.6, duration: 1.0, ease: 'sine.inOut' }, 51.9);


  // ---------- continuous / driven motion ----------
  const TROTS = [[12.0, 15.5], [26.6, 30.2]];
  const legPiv = { FF: -58, HF: 92, FN: -18, HN: 128 };
  function drive(t) {
    const b = Math.floor(t * 12) % 4;   // line boil, 12 times a second
    $('#boilN').setAttribute('seed', 2 + b); $('#boilB').setAttribute('seed', 4 + b); $('#boilF').setAttribute('seed', 6 + b);
    fDraw(ss((t - 24.4) / 2.0));
    // trot
    let w = 0, ph = 0;
    for (const [a, z] of TROTS) {
      const k = clamp((t - a) / 0.3) * (1 - clamp((t - z + 0.3) / 0.3));
      if (k > w) { w = k; ph = (t - a) * 2 * Math.PI * 2.4; }
    }
    const amp = 22 * w;
    const L = { FF: Math.sin(ph) * amp, HN: Math.sin(ph) * amp, FN: -Math.sin(ph) * amp, HF: -Math.sin(ph) * amp };
    for (const k in L) document.getElementById('C-leg' + k).setAttribute('transform', `rotate(${L[k].toFixed(2)} ${legPiv[k]} -96)`);
    const br = 1 + 0.012 * Math.sin(t * 2.4);
    const bob = -2 * Math.sin(t * 2.4) - Math.abs(Math.sin(ph)) * 12 * w;
    document.getElementById('C-bob').setAttribute('transform', `translate(0 ${bob.toFixed(2)}) scale(1 ${br.toFixed(4)})`);
    // the flower: a little sway always, a shiver when frightened and in the wind, calm once sheltered
    const g = wind(t);
    const fear = ss((t - 32.3) / 0.2) * (1 - ss((t - 35.5) / 2.5)) * 0.8;
    const blown = g * (1 - ss((t - 43.2) / 1.2));
    const shiver = (fear + blown * 1.6) * Math.sin(t * 38) * 4 + blown * -10;
    const sway = Math.sin(t * 1.3) * 2 + shiver;
    $('#flSway').setAttribute('transform', `rotate(${sway.toFixed(2)} 0 0)`);
    ['pL', 'pM', 'pR'].forEach((id, i) => {
      const base = [-48, 0, 48][i], close = (fear + blown) * [16, 0, -16][i];      // petals fold in when afraid
      const open = ss((t - 44.4) / 1.6) * [-8, 0, 8][i];
      $('#' + id).setAttribute('transform', `rotate(${(base + close + open + Math.sin(t * 41 + i) * (fear + blown) * 3).toFixed(2)})`);
    });
    subs(t);
    applyCam(t);
  }

  return { render: (t) => { tl.seek(t); drive(t); } };
}

function clamp(u) { return Math.max(0, Math.min(1, u)); }
function ss(u) { u = clamp(u); return u * u * (3 - 2 * u); }
