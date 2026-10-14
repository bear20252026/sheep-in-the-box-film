// Shared stage for the little planets (Seq 7–9): a star field, one small round planet, and the
// travellers — the boy, the sheep (out of its box now, a full actor), the box, the three ghosts,
// and the five birds, parked on their strings or carrying the boy. Each sequence adds its own
// planet dweller and timeline. Actors live in plain state objects that the timeline tweens;
// `drive` places them on the curved ground every frame.
import gsap from 'gsap';
import {cinemaCss, cinemaHtml, cinemaFrame, makeBokeh, drawBokeh} from './cinema.js';
import {Boy, BOY_PIVOTS} from './characters.js';
import {Sheep} from './sheep.js';
import {decorate} from './ghosts.js';

export const INK = '#4a3428';
const boil = (id, seed) => `<feTurbulence id="${id}" type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="${seed}" result="n"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" result="d"/>`;
export const wc = (id, seed) => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%">${boil(id + 'B', seed)}
     <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed + 5}" result="g"/>
     <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.35  0 0 0 -0.7 0.4" result="gm"/>
     <feComposite in="gm" in2="d" operator="in" result="tex"/>
     <feMerge><feMergeNode in="d"/><feMergeNode in="tex"/></feMerge></filter>`;
const GHOST_F = `<filter id="ghostF" x="-20%" y="-20%" width="140%" height="140%">
     <feColorMatrix type="saturate" values="0.12" result="s"/><feComponentTransfer in="s" result="a"><feFuncA type="linear" slope="0.6"/></feComponentTransfer>
     <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="a" in2="n" scale="5"/></filter>`;

export const BIRD = (P) => `<g id="${P}">
 <g id="${P}-body" transform="translate(0 -20)">
  <g id="${P}-wF"><path d="M4 -10 C-6 -52 34 -84 66 -72 C44 -52 34 -30 22 -6Z" fill="#dcd8d0" stroke="${INK}" stroke-width="3"/></g>
  <path d="M48 -6 L68 -14 L62 0Z" fill="#cfcac0" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M-30 0 C-30 -22 30 -26 52 -8 C42 8 0 16 -30 0Z" fill="#f6f3ec" stroke="${INK}" stroke-width="3.2"/>
  <path d="M-26 -2 C-42 -14 -44 -36 -52 -48 L-42 -56 C-34 -40 -30 -22 -14 -10Z" fill="#f6f3ec" stroke="${INK}" stroke-width="3"/>
  <circle cx="-50" cy="-56" r="10" fill="#f6f3ec" stroke="${INK}" stroke-width="3"/>
  <path d="M-58 -59 L-78 -55 L-58 -52Z" fill="#eaa040" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/>
  <circle cx="-53" cy="-58" r="2.2" fill="${INK}"/>
  <g id="${P}-wN"><path d="M6 -8 C-2 -48 40 -78 72 -64 C50 -46 38 -26 26 -4Z" fill="#fbf9f4" stroke="${INK}" stroke-width="3"/></g>
 </g></g>`;
const OFF = [[-170, -250], [-40, -320], [100, -300], [215, -235], [-280, -170]];

export const SMILE = 'M-112 -200 Q-98 -188 -82 -200', BIG = 'M-116 -203 Q-98 -180 -78 -203', OH = 'M-103 -199 Q-97 -186 -90 -199',
  SAYD = 'M-108 -202 Q-98 -180 -86 -202', SAD = 'M-110 -194 Q-98 -202 -84 -194', FIRM = 'M-110 -197 Q-97 -199 -84 -197', WORRY = 'M-110 -195 Q-98 -203 -84 -195';
export const TALK_B = 'M-8 -241 Q0 -230 8 -241', REST_B = 'M-8 -240 Q0 -235 8 -240', SMILE_B = 'M-9 -241 Q0 -232 9 -241', BIG_B = 'M-10 -242 Q0 -226 10 -242',
  SAD_B = 'M-8 -236 Q0 -241 8 -236', OH_B = 'M-4 -240 Q0 -232 4 -240', YAWN_B = 'M-7 -244 Q0 -222 7 -244';

export const kitCss = (bg) => `
#stage{position:relative;width:1920px;height:804px;overflow:hidden;background:${bg}}
#world{position:absolute;left:0;top:0;width:2400px;height:1005px;transform-origin:0 0}
#svg{position:absolute;left:0;top:0;width:2400px;height:1005px;overflow:visible}
#subs{position:absolute;left:0;right:0;bottom:30px;text-align:center;pointer-events:none}
#subs .en{font:italic 40px/1.25 Lora,Georgia,serif;color:#fffaf0;text-shadow:0 0 6px rgba(10,8,30,.9),0 0 18px rgba(10,8,30,.7)}
#subs .en.say{font-style:normal}
#subs .zh{font:31px/1.5 "Noto Serif SC",serif;color:#fff3e0;text-shadow:0 0 6px rgba(10,8,30,.9),0 0 16px rgba(10,8,30,.7)}
#tint{position:absolute;inset:0;pointer-events:none;mix-blend-mode:soft-light;opacity:0}
#psky{position:absolute;left:-490px;top:-60px;width:2900px;height:925px;transform-origin:50% 50%}
#psky img{width:100%;height:100%;display:block}
#stars{opacity:.45}
#grain{position:absolute;inset:0;pointer-events:none;background-size:cover;mix-blend-mode:multiply;opacity:.22}
#fade{position:absolute;inset:0;background:#000}
${cinemaCss}`;

// o: { R, CX, CY (planet), planet (svg drawn around 0,0 for the planet body), defs, back, mid, front, overlay }
export const kitHtml = (o) => `
<div id="stage">
 ${o.noSky ? '' : `<div id="psky"><img src="${o.IMG}sky_space.jpg" style="filter:${o.skyFilter || 'none'}"></div>`}
 <div id="world">
  <svg id="svg" viewBox="0 0 2400 1005">
   <defs>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="glowF" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
    ${wc('wcBoy', 11)}${wc('wcPl', 15)}${GHOST_F}${Boy.defs('BY')}
    <clipPath id="halfBack" clipPathUnits="userSpaceOnUse"><rect x="-400" y="-500" width="512" height="600"/></clipPath>
    <clipPath id="boxClip"><rect x="-80" y="-200" width="200" height="200"/></clipPath>
    <pattern id="gTex" patternUnits="userSpaceOnUse" width="2800" height="213"><image href="${o.IMG}tex_ground.jpg" width="2800" height="213" preserveAspectRatio="none"/></pattern>
    <radialGradient id="rimL" cx="30%" cy="8%" r="60%"><stop offset="0" stop-color="${o.light || '#ffe6c0'}" stop-opacity=".5"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
    <radialGradient id="shadeL" cx="50%" cy="0%" r="100%"><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#3a3050"/></radialGradient>
    ${o.defs || ''}
   </defs>
   <g id="stars"></g>
   ${o.sky || ''}
   <g id="planetG" transform="translate(${o.CX} ${o.CY})"><g filter="url(#wcPl)">${o.planet}</g>${o.noTex ? '' : `<circle r="${o.R}" fill="url(#gTex)" style="mix-blend-mode:multiply" opacity="${o.texOp || 0.85}"/><circle r="${o.R}" fill="url(#rimL)" style="mix-blend-mode:screen"/><circle r="${o.R}" fill="url(#shadeL)" style="mix-blend-mode:multiply"/>`}</g>
   ${o.back || ''}
   <g id="strings" fill="none" stroke="#f4ecd8" stroke-width="2" opacity=".9"></g>
   <g id="stake" opacity="0"><path d="M0 0 L0 -40" stroke="#7a5a3a" stroke-width="7" stroke-linecap="round"/></g>
   <g id="birds">${Array.from({ length: 5 }, (_, i) => `<g id="bp${i}"><g filter="url(#wcBoy)">${BIRD('b' + i)}</g></g>`).join('')}</g>
   <g id="ghosts">${[1, 2, 3].map((n) => `<g id="gp${n}" opacity="0"><g id="gf${n}"><g id="gb${n}" filter="url(#ghostF)">${Sheep.svg('G' + n)}</g></g></g>`).join('')}</g>
   ${o.mid || ''}
   <g id="boxPos"><g id="boxIn">
     <path d="M-40 -50 L-28 -60 L52 -60 L40 -50Z" fill="#5a3f2e" stroke="${INK}" stroke-width="3"/>
     <g clip-path="url(#boxClip)"><g id="sUp"><g transform="translate(14 8) scale(0.2)"><use href="#shFlip"/></g></g></g>
     <path d="M-40 -50 L40 -50 L40 0 L-40 0Z" fill="#d8ac80" stroke="${INK}" stroke-width="3"/>
     <path d="M40 -50 L52 -60 L52 -10 L40 0Z" fill="#b48a62" stroke="${INK}" stroke-width="3"/>
     <path d="M-40 -50 L-54 -66 L-30 -70 L-28 -60Z M52 -60 L66 -72 L62 -50 L52 -46Z" fill="#e6c49c" stroke="${INK}" stroke-width="3"/>
     <circle cx="-20" cy="-26" r="5" fill="#3a2a22"/><circle cx="0" cy="-30" r="5" fill="#3a2a22"/><circle cx="20" cy="-26" r="5" fill="#3a2a22"/></g></g>
   <g id="shPos"><g id="shFlip"><g filter="url(#wcBoy)">${Sheep.svg('S')}</g></g></g>
   <g id="byPos"><g filter="url(#wcBoy)">${Boy.svg('BY')}</g></g>
   ${o.front || ''}
  </svg>
 </div>
 <div id="tint"></div>
 ${o.overlay || ''}
 <div id="grain" style="background-image:url(${o.IMG}paper.jpg)"></div>
 ${cinemaHtml}
 <div id="subs"><div class="en"></div><div class="zh"></div></div>
 <div id="fade"></div>
</div>`;

const ss = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
const hsh = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };

// o: { R, CX, CY, SUBS, gold: {ear, back} }
export function kitSetup(o) {
  const $ = (s) => document.querySelector(s), $$ = (s) => Array.from(document.querySelectorAll(s));
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, parent, attrs) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); parent.appendChild(e); return e; };
  for (let i = 0; i < 380; i++) mk('circle', $('#stars'), { cx: (-1200 + hsh(i) * 4800).toFixed(0), cy: (-1500 + hsh(i + 7) * 3000).toFixed(0), r: (0.8 + hsh(i + 3) * 2.2).toFixed(1), fill: '#fff8e4', opacity: (0.25 + hsh(i + 5) * 0.75).toFixed(2) });
  // the sheep: ear finished; back half-finished later in 7c
  $$('#S-earN .pencil').forEach((e) => e.setAttribute('opacity', 0)); $('#S-finishEar').setAttribute('opacity', 1);
  // after the Lamplighter (7c) half of the back gap is finished in gold
  if (o.halfBack) { $('#S-finishBack').setAttribute('clip-path', 'url(#halfBack)'); $('#S-finishBack').setAttribute('opacity', 1); $$('#S-body .pencil').forEach((e) => e.setAttribute('opacity', 0)); }
  [['1', 'sniffle'], ['2', 'horns'], ['3', 'old']].forEach(([n, k]) => { decorate('G' + n, k); $('#G' + n + '-lids').setAttribute('opacity', 0); });

  const surf = (x) => { const d = Math.max(-o.R + 1, Math.min(o.R - 1, x - o.CX)); return { y: o.CY - Math.sqrt(o.R * o.R - d * d), a: Math.asin(d / o.R) * 180 / Math.PI }; };
  // actor state
  const A = {
    boy: { x: 1000, up: 0, s: 0.62 }, sheep: { x: 1120, up: 70, s: 0.36, flip: 0, walk: 0, inBox: 1 }, box: { x: 1120, up: 0, on: 1 },
    g: [1, 2, 3].map((n, i) => ({ x: 800 + i * 120, up: 60, s: 0.3, flip: 0, op: 0 })),
    st: { carry: 1, lift: 0, liftX: 0, stakeX: 760, slack: 1, boyWalk: 0, shake: 0 },
  };
  const cam = { cx: 1200, cy: 600, s: 1.0 };
  const tl = gsap.timeline({ paused: true });
  const B = (p) => '#BY-' + p, S = (p) => '#S-' + p, G = (n, p) => '#G' + n + '-' + p;
  Object.entries(BOY_PIVOTS).forEach(([part, v]) => tl.set(B(part), { rotation: 0, svgOrigin: v }, 0));
  tl.set(S('lidL'), { scaleY: 0, svgOrigin: '-126 -262' }, 0).set(S('lidR'), { scaleY: 0, svgOrigin: '-62 -260' }, 0)
    .set(S('head'), { rotation: 0, svgOrigin: '-60 -190' }, 0).set(S('earN'), { rotation: 0, svgOrigin: '-10 -262' }, 0)
    .set(S('body'), { scaleY: 1, scaleX: 1, svgOrigin: '40 -80' }, 0).set(S('eyes'), { x: 0, y: 0 }, 0);
  [1, 2, 3].forEach((n) => tl.set(G(n, 'head'), { rotation: 0, svgOrigin: '-60 -190' }, 0).set(G(n, 'eyes'), { x: 0, y: 0 }, 0));
  const talk = (sel, at, dur, a, rest) => { for (let k = 0; k < dur / 0.2; k++) tl.set(sel, { attr: { d: k % 2 ? rest : a } }, at + k * 0.2); tl.set(sel, { attr: { d: rest } }, at + dur); };
  const talkS = (at, dur, rest = SMILE) => talk(S('mouth'), at, dur, SAYD, rest);
  const talkB = (at, dur, rest = SMILE_B) => talk(B('mouth'), at, dur, TALK_B, rest);
  const talkG = (n, at, dur, rest = SMILE) => talk(G(n, 'mouth'), at, dur, SAYD, rest);
  const blinkB = (at) => tl.set([B('lidL'), B('lidR')], { opacity: 1 }, at).set([B('lidL'), B('lidR')], { opacity: 0 }, at + 0.14);
  const blinkS = (at) => tl.to([S('lidL'), S('lidR')], { scaleY: 1, duration: 0.07 }, at).to([S('lidL'), S('lidR')], { scaleY: 0, duration: 0.1 }, at + 0.13);
  const bokeh = makeBokeh(8, ['#ffe6c8', '#e8e0ff', '#fff0e0'], 71);

  function subs(t) {
    const en = $('#subs .en'), zh = $('#subs .zh'); let on = null;
    for (const s of o.SUBS) if (t >= s[0] - 0.25 && t <= s[1] + 0.3) on = s;
    if (!on) { en.textContent = ''; zh.textContent = ''; return; }
    const k = Math.min(1, (t - on[0] + 0.25) / 0.3, (on[1] + 0.3 - t) / 0.3);
    en.textContent = on[2]; zh.textContent = on[3]; en.className = 'en' + (on[4] ? ' say' : '');
    $('#subs').style.opacity = Math.max(0, k);
  }
  const place = (id, x, up, s, flip = 0, extraRot = 0) => {
    const p = surf(x);
    $(id).setAttribute('transform', `translate(${x.toFixed(1)} ${p.y.toFixed(1)}) rotate(${(p.a + extraRot).toFixed(2)}) translate(0 ${(-up).toFixed(1)}) scale(${(flip ? -s : s).toFixed(3)} ${s.toFixed(3)})`);
    return p;
  };
  const legPiv = { FF: -58, HF: 92, FN: -18, HN: 128 };
  function drive(t) {
    const b4 = Math.floor(t * 12) % 4;
    $('#wcBoyB').setAttribute('seed', 11 + b4); $('#wcPlB').setAttribute('seed', 15 + b4);
    const st = A.st;
    // the boy: on the ground, or carried up on the strings
    let bx = A.boy.x, bup = A.boy.up;
    if (st.lift > 0) { bx += st.liftX; bup += st.lift + Math.sin(t * 1.3) * 8; }
    const pb = place('#byPos', bx, bup, A.boy.s);
    // boy walking legs
    if (st.boyWalk > 0.001) { const ph = t * Math.PI * 2 * 1.4; gsap.set(B('legL'), { rotation: Math.sin(ph) * 22 * st.boyWalk }); gsap.set(B('legR'), { rotation: -Math.sin(ph) * 22 * st.boyWalk }); }
    $('#BY-bob').setAttribute('transform', `translate(0 ${(Math.sin(t * 1.9) * 2 - Math.abs(Math.sin(t * Math.PI * 1.4)) * 8 * st.boyWalk).toFixed(2)})`);
    Boy.scarf('BY', t, 0.5 + 0.2 * Math.sin(t * 0.6) + Math.min(1, st.lift / 200) * 0.6, -1);
    // the sheep: trotting on its own, or riding in the box
    const sh = A.sheep;
    let sx = sh.x, sup = sh.up;
    const w = sh.walk, ph = t * 2 * Math.PI * 2.4, amp = 22 * w;
    const L = { FF: Math.sin(ph) * amp, HN: Math.sin(ph) * amp, FN: -Math.sin(ph) * amp, HF: -Math.sin(ph) * amp };
    for (const k in L) $('#S-leg' + k).setAttribute('transform', `rotate(${L[k].toFixed(2)} ${legPiv[k]} -96)`);
    $('#S-bob').setAttribute('transform', `translate(0 ${(-2 * Math.sin(t * 2.4) - Math.abs(Math.sin(ph)) * 12 * w).toFixed(2)}) scale(1 ${(1 + 0.012 * Math.sin(t * 2.4)).toFixed(4)})`);
    // the box: on the ground, or hanging from the boy's left hand when flying
    let hx = 0, hy = 0;
    {
      const r = gsap.getProperty(B('armL'), 'rotation') * Math.PI / 180, vx = -24, vy = 76;
      const lx = -30 + vx * Math.cos(r) - vy * Math.sin(r), ly = -196 + vx * Math.sin(r) + vy * Math.cos(r);
      const a = pb.a * Math.PI / 180, s = A.boy.s;
      const px = bx, py = surf(bx).y;
      const ux = lx * s, uy = ly * s - bup;
      hx = px + ux * Math.cos(a) - uy * Math.sin(a); hy = py + ux * Math.sin(a) + uy * Math.cos(a);
    }
    if (A.box.on) place('#boxPos', A.box.x, A.box.up, 0.95);
    else $('#boxPos').setAttribute('transform', `translate(${(hx + 4).toFixed(1)} ${(hy + 72).toFixed(1)}) rotate(${(Math.sin(t * 1.6) * 8).toFixed(2)} 0 -72)`);
    // in the box, a live copy of the sheep peeks out (sheep.up: 70 hidden, -18 peeking, -45 out)
    $('#sUp').setAttribute('transform', `translate(0 ${sh.up.toFixed(1)})`);
    $('#sUp').setAttribute('opacity', sh.inBox ? 1 : 0);
    $('#shPos').setAttribute('opacity', sh.inBox ? 0 : 1);
    place('#shPos', sx, sh.inBox ? 0 : sup, sh.s, sh.flip);
    // the birds: carrying the boy, or parked above their stake
    const strs = [], R = gsap.getProperty(B('armR'), 'rotation') * Math.PI / 180;
    let rx, ry;
    {
      const vx = 24, vy = 76, lx = 30 + vx * Math.cos(R) - vy * Math.sin(R), ly = -196 + vx * Math.sin(R) + vy * Math.cos(R);
      const a = pb.a * Math.PI / 180, s = A.boy.s, py = surf(bx).y, ux = lx * s, uy = ly * s - bup;
      rx = bx + ux * Math.cos(a) - uy * Math.sin(a); ry = py + ux * Math.sin(a) + uy * Math.cos(a);
    }
    const sk = surf(st.stakeX);
    place('#stake', st.stakeX, 0, 1);
    $('#stake').setAttribute('opacity', st.carry < 1 ? 1 : 0);
    for (let i = 0; i < 5; i++) {
      const c = st.carry;
      const ax = rx + OFF[i][0] * 0.9, ay = ry + OFF[i][1] * 0.8 - 40;
      const px = st.stakeX + OFF[i][0] * 0.7 + Math.sin(t * 0.8 + i) * 20, py = sk.y - 220 + OFF[i][1] * 0.5 + Math.sin(t * 1.1 + i * 2) * 14;
      const x = px + (ax - px) * c, y = py + (ay - py) * c;
      const fly = 0.5 + 0.5 * c, flap = fly * Math.sin(t * (6 + i * 0.6) + i * 1.3);
      $('#bp' + i).setAttribute('transform', `translate(${x.toFixed(1)} ${(y + Math.sin(t * 7 + i) * 4).toFixed(1)}) scale(0.9 0.9)`);
      $('#b' + i + '-wN').setAttribute('transform', `rotate(${(-48 * flap - 4).toFixed(1)} 8 -8)`);
      $('#b' + i + '-wF').setAttribute('transform', `rotate(${(-44 * fly * Math.sin(t * (6 + i * 0.6) + i * 1.3 - 0.4) - 2).toFixed(1)} 6 -10)`);
      const ex = c * rx + (1 - c) * st.stakeX, ey = c * ry + (1 - c) * (sk.y - 36);
      const mx = (x + ex) / 2, my = (y + ey) / 2 + 40 * st.slack * (1 - c);
      strs.push(`M${ex.toFixed(1)} ${ey.toFixed(1)} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x.toFixed(1)} ${(y - 14).toFixed(1)}`);
    }
    let sp = $('#strings').firstChild; if (!sp) sp = mk('path', $('#strings'), {});
    sp.setAttribute('d', strs.join(' '));
    // ghosts drift and bob
    A.g.forEach((g, i) => {
      place('#gp' + (i + 1), g.x, g.up + Math.sin(t * 0.9 + i * 2) * 10, g.s, g.flip);
      $('#gp' + (i + 1)).setAttribute('opacity', g.op.toFixed(3));
      if (i === 0) $('#gb1').setAttribute('transform', `translate(${(Math.sin(t * 47) * 1.6).toFixed(2)} 0)`);
    });
    subs(t);
    // camera
    const wv = cinemaFrame(t, st.shake);
    { const ps = $('#psky'); if (ps) { const px = Math.max(-470, Math.min(470, -(cam.cx - 1250) * 0.16)), py = Math.max(-55, Math.min(55, -(cam.cy - 600) * 0.07)); ps.style.transform = `translate(${px.toFixed(1)}px, ${py.toFixed(1)}px) scale(${(1 + (cam.s - 1) * 0.06).toFixed(4)})`; } }
    $('#world').style.transform = `translate(${(960 - cam.cx * cam.s + wv.wx).toFixed(2)}px, ${(402 - cam.cy * cam.s + wv.wy).toFixed(2)}px) scale(${cam.s})`;
    drawBokeh(bokeh, t, cam, Math.max(0, Math.min(1, (cam.s - 1.4) / 0.4)) * 0.4);
    return { bx, bup, hx, hy, rx, ry };
  }
  return { $, $$, mk, tl, cam, A, B, S, G, surf, place, talk, talkS, talkB, talkG, blinkB, blinkS, subs, drive };
}
