// SEQ 3 — OUR SHEEP, AND INSIDE THE BOX (~2:40).
// Built on the short's Part 1 (the hurried drawing, "Wait — I'm not finished!", the box, the warm
// inside, the eye, the vow, the title), with a new scene cut into it: after "Is this… home?" the three
// erased sheep drift in through the cardboard wall and tell the new one how things go for drawings.
// Part 1 runs on its own timeline; during the insert it is held still and a twin puppet (H) acts
// in place of its sheep, so neither timeline fights the other.
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import * as part1 from './part1.js';
import {Sheep} from './sheep.js';
import {decorate} from './ghosts.js';

const P1_START = 4.0;            // Part 1 time where this sequence picks up (the hand is already drawing)
const HOLD = 29.0;               // Part 1 time held during the insert
const INS_AT = HOLD - P1_START;  // sequence time the insert begins
const INS = 112;                 // insert length
export const DURATION = (52 - P1_START) + INS;

const SUBS = [
  [INS_AT + 9.0, INS_AT + 12.4, 'Well, well. A NEW one.', '哟，哟。来了个新的。'],
  [INS_AT + 19.6, INS_AT + 24.6, 'Look at its back. There’s a hole! *cough* Is it contagious?', '看它的背。有个洞！*咳* 会传染吗？'],
  [INS_AT + 25.6, INS_AT + 29.6, 'Mm. Half a sheep. Seen it before.', '嗯。半只羊。见过。'],
  [INS_AT + 30.8, INS_AT + 34.4, 'I’m not half! I’m… mostly!', '我才不是半只！我是……大半只！'],
  [INS_AT + 40.0, INS_AT + 43.6, 'Let me tell you how it goes, kid.', '小家伙，让我告诉你会怎么样。'],
  [INS_AT + 46.0, INS_AT + 50.6, 'One day you’re a sheep…', '今天你还是一只羊……'],
  [INS_AT + 51.0, INS_AT + 54.4, '…rub, rub…', '……擦，擦……'],
  [INS_AT + 55.0, INS_AT + 58.6, '…and the next day, you’re us.', '……明天，你就成了我们。'],
  [INS_AT + 66.0, INS_AT + 70.0, 'But… he wanted me. Didn’t he?', '可是……他想要我的。不是吗？'],
  [INS_AT + 73.0, INS_AT + 77.8, 'Mm. He wanted us too. For a minute.', '嗯。他也想要过我们。想要了一分钟。'],
  [INS_AT + 82.6, INS_AT + 86.2, 'And I’m not even finished…', '而且我还没画完……'],
  [INS_AT + 89.6, INS_AT + 94.6, '*sniff* Hey. At least you got a box. We never got a box.', '*吸鼻子* 嘿。至少你有个盒子。我们从来没有盒子。'],
  [INS_AT + 95.2, INS_AT + 98.4, '…A box is something.', '……盒子，可不是小事。'],
  [INS_AT + 102.0, INS_AT + 105.0, 'Uh-oh. Someone’s coming!', '糟了。有人来了！'],
];
export const SUB_TEXT = part1.SUB_TEXT + SUBS.map((s) => s[3]).join('');
export const css = part1.css + `
#subs.dark .en,#subs.dark .zh{color:#4a3224}
`;
const GHOST_F = `<filter id="ghostF" x="-20%" y="-20%" width="140%" height="140%">
     <feColorMatrix type="saturate" values="0.12" result="s"/><feComponentTransfer in="s" result="a"><feFuncA type="linear" slope="0.6"/></feComponentTransfer>
     <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="2" seed="5" result="n"/><feDisplacementMap in="a" in2="n" scale="5"/></filter>`;
export const html = (IMG) => part1.html(IMG).replace('</defs>', GHOST_F + '</defs>');

export function setup() {
  const $ = (s) => document.querySelector(s);
  const NS = 'http://www.w3.org/2000/svg';
  const mk = (tag, parent, attrs, before) => { const e = document.createElementNS(NS, tag); for (const k in attrs) e.setAttribute(k, attrs[k]); before ? parent.insertBefore(e, before) : parent.appendChild(e); return e; };

  // ---- extra layers: the ghost filter, ghosts on the page, ghosts in the box, the twin sheep ----

  const paperG = mk('g', $('#paperScene'), { id: 'ghostsPaper' }, $('#paperScene').firstChild);
  const boxG = mk('g', $('#boxScene'), { id: 'ghostsBox' }, $('#bsPos'));
  const KINDS = [['1', 'sniffle'], ['2', 'horns'], ['3', 'old']];
  const PAPER_HOME = { 1: [380, 820, 0.95, 1], 2: [2080, 800, 1.0, 1], 3: [640, 960, 0.85, 1] };
  for (const [n, kind] of KINDS) {
    const [x, y, s] = PAPER_HOME[n];
    const gp = mk('g', paperG, { id: 'GPpos' + n, transform: `translate(${x} ${y}) scale(${s})`, filter: 'url(#ghostF)', opacity: 0.85 });
    gp.innerHTML = `<g id="GPb${n}">${Sheep.svg('GP' + n)}</g>`; decorate('GP' + n, kind);
    const gb = mk('g', boxG, { id: 'GBpos' + n, transform: 'translate(-400 900) scale(1.3)', filter: 'url(#ghostF)', opacity: 0 });
    gb.innerHTML = `<g id="GBf${n}"><g id="GBb${n}">${Sheep.svg('GB' + n)}</g></g>`; decorate('GB' + n, kind);
  }
  document.querySelectorAll('#ghostsPaper [id$="-lids"], #ghostsBox [id$="-lids"]').forEach((e) => e.setAttribute('opacity', 0));
  const hWrap = mk('g', $('#bsPos'), { id: 'hsWrap', opacity: 0 });
  hWrap.innerHTML = `<g id="hs" filter="url(#wcWarm)">${Sheep.svg('H')}</g>`;
  $('#H-lids').setAttribute('opacity', 0);

  $('#boxScene').insertAdjacentHTML('beforeend', '<rect id="hFlick" x="0" y="0" width="2400" height="1005" fill="#2a1a10" opacity="0"/>');
  const api = part1.setup();

  // ---- the insert timeline (sequence time) ----
  const tl = gsap.timeline({ paused: true });
  const I = (s) => INS_AT + s;
  const H = (p) => '#H-' + p, GB = (n, p) => '#GB' + n + '-' + p;
  tl.set(H('head'), { rotation: 0, svgOrigin: '-60 -190' }, 0).set(H('earN'), { rotation: 0, svgOrigin: '-10 -262' }, 0)
    .set(H('body'), { scaleY: 1, scaleX: 1, svgOrigin: '40 -80' }, 0).set(H('walk'), { x: 0, y: 0 }, 0).set(H('eyes'), { x: 0, y: 0 }, 0);
  for (const [n] of KINDS) tl.set(GB(n, 'head'), { rotation: 0, svgOrigin: '-60 -190' }, 0).set(GB(n, 'eyes'), { x: 0, y: 0 }, 0);
  const SMILE = 'M-112 -200 Q-98 -188 -82 -200', BIG = 'M-116 -203 Q-98 -180 -78 -203', OH = 'M-103 -199 Q-97 -186 -90 -199', SAD = 'M-110 -194 Q-98 -202 -84 -194';
  tl.set(H('mouth'), { attr: { d: SMILE } }, 0);
  const talk = (sel, at, dur) => { for (let k = 0; k < dur / 0.22; k++) tl.set(sel, { attr: { d: k % 2 ? SMILE : 'M-108 -202 Q-98 -180 -86 -202' } }, at + k * 0.22); tl.set(sel, { attr: { d: SMILE } }, at + dur); };
  const place = (n, x, y, s, flip, at, dur, ease = 'sine.inOut') => {
    tl.to('#GBpos' + n, { attr: { transform: `translate(${x} ${y}) scale(${s})` }, duration: dur, ease }, at);
    tl.set('#GBf' + n, { attr: { transform: flip ? 'scale(-1 1)' : 'scale(1 1)' } }, at);
  };
  const cam = { cx: 1500, cy: 580, s: 0.98 };

  // 0–9 a cold draft: three faint shapes drift in through the cardboard
  tl.set(cam, { cx: 1500, cy: 580, s: 0.98 }, I(0));
  tl.set(['#GBpos1', '#GBpos2', '#GBpos3'], { opacity: 0 }, 0).set(['#GBpos1', '#GBpos2', '#GBpos3'], { opacity: 1 }, I(2.5));
  tl.set('#GBpos2', { attr: { transform: 'translate(-300 880) scale(1.3)' } }, I(2.5)).set('#GBpos3', { attr: { transform: 'translate(-500 960) scale(1.15)' } }, I(2.5)).set('#GBpos1', { attr: { transform: 'translate(-420 760) scale(1.2)' } }, I(2.5));
  place(2, 980, 900, 1.3, true, I(3), 5); place(3, 640, 960, 1.15, true, I(4.2), 6); place(1, 1300, 700, 1.15, true, I(3.6), 5);
  tl.to(H('earN'), { rotation: -16, duration: 0.25 }, I(3.4)).to(H('earN'), { rotation: 0, duration: 0.8, ease: 'elastic.out(1,0.35)' }, I(3.7));
  tl.to(H('eyes'), { x: -10, y: 0, duration: 0.3 }, I(4.4));
  tl.to(cam, { cx: 1300, cy: 620, s: 0.95, duration: 6, ease: 'sine.inOut' }, I(3));
  talk(GB(2, 'mouth'), I(9.0), 3.4); tl.to(GB(2, 'head'), { rotation: 10, duration: 0.4 }, I(9));
  tl.to(H('mouth'), { attr: { d: OH }, duration: 0.2 }, I(9.6));

  // 13–35 they circle; Sniffle floats round to peer at the gap; "mostly!"
  place(1, 2140, 760, 1.15, false, I(13), 6);
  tl.to(H('eyes'), { x: 10, y: -6, duration: 0.4 }, I(15)).to(H('head'), { rotation: 8, duration: 0.6 }, I(15));
  tl.to(cam, { cx: 1700, cy: 600, s: 1.05, duration: 5, ease: 'sine.inOut' }, I(14));
  talk(GB(1, 'mouth'), I(19.6), 5); tl.to(GB(1, 'head'), { rotation: -12, duration: 0.25, yoyo: true, repeat: 1 }, I(22.4));   // *cough*
  tl.to(cam, { cx: 1100, cy: 640, s: 1.1, duration: 3, ease: 'sine.inOut' }, I(25));
  talk(GB(3, 'mouth'), I(25.6), 4);
  tl.to(cam, { cx: 1600, cy: 620, s: 1.25, duration: 2, ease: 'sine.inOut' }, I(30));
  tl.to(H('head'), { rotation: 14, duration: 0.4, ease: 'back.out(2)' }, I(30.8)).to(H('body'), { scaleY: 1.07, duration: 0.4, ease: 'back.out(2)' }, I(30.8))
    .to(H('eyes'), { x: -6, y: -6, duration: 0.3 }, I(30.8));
  talk(H('mouth'), I(30.8), 3.6);
  tl.to(H('body'), { scaleY: 1, duration: 0.5 }, I(34.6)).to(H('head'), { rotation: 4, duration: 0.6 }, I(34.6));
  // Horns laughs
  tl.to(GB(2, 'head'), { rotation: 14, duration: 0.18, yoyo: true, repeat: 7 }, I(35.2));
  tl.to(GB(2, 'mouth'), { attr: { d: BIG }, duration: 0.2 }, I(35.2)).to(GB(2, 'mouth'), { attr: { d: SMILE }, duration: 0.3 }, I(38.6));

  // 40–59 Horns tells how it goes; Sniffle mimes the eraser; Horns flickers out and back
  tl.to(cam, { cx: 1250, cy: 620, s: 1.15, duration: 3, ease: 'sine.inOut' }, I(39.6));
  place(2, 1180, 900, 1.3, true, I(40), 2);
  talk(GB(2, 'mouth'), I(40), 3.6); talk(GB(2, 'mouth'), I(46), 4.6);
  tl.to(GB(2, 'head'), { rotation: 18, duration: 0.6, ease: 'back.out(2)' }, I(46.2));
  place(1, 1260, 760, 1.1, true, I(48), 2.2);
  tl.to('#GBpos1', { x: 30, duration: 0.18, yoyo: true, repeat: 15 }, I(51));    // rub, rub
  tl.to('#GBpos2', { opacity: 0.2, duration: 0.25, yoyo: true, repeat: 7 }, I(51)).to('#GBpos2', { opacity: 1, duration: 0.3 }, I(55));
  talk(GB(1, 'mouth'), I(51), 3.4); talk(GB(1, 'mouth'), I(55), 3.6);
  tl.to(cam, { cx: 1400, cy: 620, s: 1.0, duration: 3, ease: 'sine.inOut' }, I(55));

  // 59–72 the new sheep is scared: backs into the corner; "he wanted me… didn't he?"
  tl.to(H('walk'), { x: 90, duration: 2.2, ease: 'sine.inOut' }, I(59)).to(H('earN'), { rotation: 26, duration: 0.8 }, I(59.4))
    .to(H('mouth'), { attr: { d: OH }, duration: 0.3 }, I(59.2)).to(H('eyes'), { x: -10, y: 4, duration: 0.4 }, I(59.2))
    .to(H('body'), { scaleY: 0.94, scaleX: 1.03, duration: 1 }, I(60));
  tl.to(cam, { cx: 1820, cy: 640, s: 1.45, duration: 5, ease: 'sine.inOut' }, I(60));
  tl.set(H('mouth'), { attr: { d: SAD } }, I(65));
  talk(H('mouth'), I(66), 4); tl.set(H('mouth'), { attr: { d: SAD } }, I(70.1));
  tl.to(H('head'), { rotation: -8, duration: 1.4 }, I(66.6));

  // 72–100 the ghosts look at each other; it looks back at its own unfinished back; a small kindness
  tl.to(cam, { cx: 1100, cy: 640, s: 1.05, duration: 3, ease: 'sine.inOut' }, I(71));
  tl.to(GB(2, 'eyes'), { x: 10, duration: 0.3 }, I(71.6)).to(GB(3, 'eyes'), { x: 12, duration: 0.3 }, I(72)).to(GB(1, 'eyes'), { x: -12, duration: 0.3 }, I(72));
  talk(GB(3, 'mouth'), I(73), 4.8);
  tl.to(cam, { cx: 1880, cy: 600, s: 1.6, duration: 4, ease: 'sine.inOut' }, I(78));
  tl.to(H('head'), { rotation: 22, duration: 1.4, ease: 'sine.inOut' }, I(79)).to(H('eyes'), { x: 14, y: -10, duration: 0.6 }, I(79.4));   // looks back at the gap
  talk(H('mouth'), I(82.6), 3.6); tl.set(H('mouth'), { attr: { d: SAD } }, I(86.3));
  tl.to(H('head'), { rotation: -4, duration: 1.2 }, I(87));
  tl.to(cam, { cx: 1500, cy: 620, s: 1.1, duration: 3, ease: 'sine.inOut' }, I(88.4));
  place(1, 1980, 760, 1.15, false, I(88), 2);
  talk(GB(1, 'mouth'), I(89.6), 5); talk(GB(2, 'mouth'), I(95.2), 3.2);
  tl.to(GB(2, 'head'), { rotation: -6, duration: 0.6 }, I(95));
  tl.to(H('eyes'), { x: 6, y: -4, duration: 0.4 }, I(90)).set(H('mouth'), { attr: { d: SMILE } }, I(96.6)).to(H('earN'), { rotation: 0, duration: 1.2, ease: 'elastic.out(1,0.4)' }, I(96.6));

  // 100–110 the light at the holes flickers: someone's coming — the ghosts scatter through the wall
  tl.to('#hFlick', { opacity: 0.5, duration: 0.3, yoyo: true, repeat: 3 }, I(100));
  talk(GB(3, 'mouth'), I(102), 3);
  place(1, -500, 700, 1.1, true, I(104.4), 1.4, 'power2.in'); place(2, -400, 880, 1.3, true, I(104.2), 1.4, 'power2.in'); place(3, -600, 980, 1.15, true, I(104.6), 1.6, 'power2.in');
  tl.set(['#GBpos1', '#GBpos2', '#GBpos3'], { opacity: 0 }, I(106.4));
  // the twin returns exactly to Part 1's pose at the hold, then hands back
  tl.to(H('walk'), { x: 0, duration: 1.4, ease: 'sine.inOut' }, I(105)).to(H('body'), { scaleY: 1, scaleX: 1, duration: 0.8 }, I(105))
    .to(H('head'), { rotation: 0, duration: 0.8 }, I(106)).to(H('eyes'), { x: 0, y: 0, duration: 0.4 }, I(106)).set(H('mouth'), { attr: { d: SMILE } }, I(106.5));
  tl.to(cam, { cx: 1500, cy: 580, s: 0.98, duration: 3, ease: 'sine.inOut' }, I(106));

  // after: during the vow the three peek back in from the left wall, faint; Horns rolls his eyes
  const POST = INS_AT + INS;     // Part 1 time = HOLD at this moment
  const at1 = (p1) => POST + (p1 - HOLD);
  tl.set(['#GBpos1', '#GBpos2', '#GBpos3'], { attr: { transform: 'translate(-300 900) scale(1.2)' } }, at1(34.5));
  place(2, 260, 880, 1.2, true, at1(35), 2.4); place(1, 160, 720, 1.05, true, at1(35.3), 2.4); place(3, 120, 980, 1.05, true, at1(35.6), 2.4);
  tl.to(['#GBpos1', '#GBpos2', '#GBpos3'], { opacity: 0.85, duration: 1.2 }, at1(35));
  tl.to(GB(2, 'eyes'), { y: -14, duration: 0.4 }, at1(39.5)).to(GB(2, 'eyes'), { y: 0, duration: 0.5 }, at1(40.5));
  tl.to(GB(3, 'head'), { rotation: 8, duration: 1 }, at1(39));
  tl.to(['#GBpos1', '#GBpos2', '#GBpos3'], { opacity: 0, duration: 2 }, at1(43));


  function subs(t) {
    const en = $('#subs .en'), zh = $('#subs .zh'); let on = null;
    for (const s of SUBS) if (t >= s[0] - 0.25 && t <= s[1] + 0.3) on = s;
    if (!on) { en.textContent = ''; zh.textContent = ''; return; }
    const k = Math.min(1, (t - on[0] + 0.25) / 0.3, (on[1] + 0.3 - t) / 0.3);
    en.textContent = on[2]; zh.textContent = on[3]; en.className = 'en';
    $('#subs').style.opacity = Math.max(0, k); $('#subs').className = '';
  }

  return {
    render: (t) => {
      const inIns = t >= INS_AT && t < INS_AT + INS;
      const p1 = t < INS_AT ? t + P1_START : inIns ? HOLD : t + P1_START - INS;
      api.render(p1);
      tl.seek(t);
      $('#bs').style.opacity = inIns ? 0 : 1;
      $('#hsWrap').setAttribute('opacity', inIns ? 1 : 0);
      if (p1 < 4.6) { $('#subs .en').textContent = ''; $('#subs .zh').textContent = ''; }
      if (inIns) {
        subs(t);
        const hw = 960 / cam.s, hh = 402 / cam.s;
        const cx = Math.min(Math.max(cam.cx, hw), 2400 - hw), cy = Math.min(Math.max(cam.cy, hh), 1005 - hh);
        $('#world').style.transform = `translate(${960 - cx * cam.s}px, ${402 - cy * cam.s}px) scale(${cam.s})`;
        // the twin breathes like B; ghosts bob
        $('#H-bob').setAttribute('transform', `translate(0 ${(-2 * Math.sin(t * 2.4)).toFixed(2)}) scale(1 ${(1 + 0.012 * Math.sin(t * 2.4)).toFixed(4)})`);
      }
      for (const [n] of KINDS) {
        const b = Math.sin(t * 0.9 + +n * 2) * 10, sh = n === '1' ? Math.sin(t * 47) * 1.6 : 0;
        $('#GBb' + n).setAttribute('transform', `translate(${sh.toFixed(2)} ${b.toFixed(2)})`);
        $('#GPb' + n).setAttribute('transform', `translate(${sh.toFixed(2)} ${b.toFixed(2)})`);
      }
    },
  };
}
