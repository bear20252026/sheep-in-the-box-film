// SEQ 8b — LOST (2:20). The box crashes on a dead grey planet strangled by old baobab roots: a planet nobody weeded.
// The sheep crawls out alone. The ghosts come, quieter now. "Maybe this is where unfinished things end up." "Like us."
// The lowest point, a long silence… then one far star glows gold. "That one's looking at you." — "That's his star. I'm going."
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {kitCss, kitHtml, kitSetup, INK, SMILE, BIG, OH, SAYD, SAD, FIRM, WORRY} from './planetkit.js';

export const DURATION = 140;
const R = 700, CX = 1200, CY = 1620;
const BOX_X = 1080, TRUNK_X = 1410;

const SUBS = [
  [16.0, 17.6, '…Boy?', '……男孩？', 'say'],
  [19.0, 21.4, 'BOY?  (boy… boy… boy…)', '男孩？（男孩……男孩……男孩……）', 'say'],
  [28.0, 30.6, 'Somebody forgot to weed.', '有人忘了拔草。', 'say'],
  [40.4, 44.6, 'Maybe this is where unfinished things end up.', '也许，没完成的东西最后都会来到这里。', 'say'],
  [45.6, 47.0, 'Like us.', '就像我们。', 'say'],
  [48.4, 52.6, 'He’s gone. And I’m only half a sheep.', '他走了。而我只是半只羊。', 'say'],
  [88.6, 91.6, 'Mm. That one’s looking at you.', '嗯。那一颗在看着你呢。', 'say'],
  [96.4, 98.4, 'That’s his star.', '那是他的星星。', 'say'],
  [100.0, 101.6, 'I’m going.', '我要去。', 'say'],
  [103.0, 105.4, 'How? Sheep don’t fly.', '怎么去？羊又不会飞。', 'say'],
  [106.0, 108.4, 'And it’s very far. (sniff)', '而且好远好远。（吸鼻子）', 'say'],
  [112.6, 114.0, '…Not yet.', '……现在还不会。', 'say'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('');

export const css = kitCss('radial-gradient(ellipse at 60% 20%, #1c1e2c 0%, #0b0c14 60%, #030306 100%)') + `
#byPos,#birds,#strings,#stake{display:none}
#cold{position:absolute;inset:0;pointer-events:none;background:#2a3a6a;mix-blend-mode:soft-light;opacity:.5}
#goldGlow{position:absolute;inset:0;pointer-events:none;mix-blend-mode:soft-light;background:radial-gradient(ellipse 60% 70% at 70% 15%,rgba(255,200,90,.9),rgba(255,200,90,0) 70%);opacity:0}
`;

// in planet-local coords: a trunk standing out of the surface at angle a (degrees), height h
export const trunk = (a, h, w, id = '') => `<g ${id ? `id="${id}"` : ''} transform="rotate(${a}) translate(0 ${-R + 10})">
  <path d="M${-w} 0 C${-w * 1.5} ${-h * 0.25} ${-w * 1.3} ${-h * 0.55} ${-w * 0.55} ${-h * 0.8} C${-w * 0.4} ${-h * 0.9} ${-w * 0.35} ${-h} ${-w * 0.2} ${-h}
    L${w * 0.2} ${-h} C${w * 0.35} ${-h} ${w * 0.4} ${-h * 0.9} ${w * 0.55} ${-h * 0.8} C${w * 1.3} ${-h * 0.55} ${w * 1.5} ${-h * 0.25} ${w} 0Z" fill="url(#barkG)" stroke="#1e1612" stroke-width="6"/>
  <path d="M${-w * 0.9} ${-h * 0.05} C${-w * 1.1} ${-h * 0.3} ${-w * 0.8} ${-h * 0.6} ${-w * 0.3} ${-h * 0.85} M${w * 0.2} ${-h * 0.05} C${w * 0.5} ${-h * 0.3} ${w * 0.6} ${-h * 0.55} ${w * 0.3} ${-h * 0.85}" fill="none" stroke="#2a201a" stroke-width="3" opacity=".7"/>
  <path d="M${-w * 0.6} ${-h * 0.2} q${w * 0.3} ${-h * 0.1} 0 ${-h * 0.3} M${w * 0.5} ${-h * 0.35} q${-w * 0.3} ${-h * 0.12} 0 ${-h * 0.28} M${-w * 0.1} ${-h * 0.5} l${w * 0.08} ${-h * 0.15}" fill="none" stroke="#2a201a" stroke-width="4"/>
  <path d="M${-w * 0.2} ${-h} l${-w * 0.9} ${-h * 0.12} M${-w * 0.05} ${-h} l${-w * 0.2} ${-h * 0.2} M${w * 0.1} ${-h} l${w * 0.7} ${-h * 0.16} M${w * 0.2} ${-h * 0.98} l${w * 1.1} ${-h * 0.02}" stroke="#4a3c34" stroke-width="${Math.max(6, w * 0.12)}" stroke-linecap="round"/>
</g>`;
export const ROOTS = `<g fill="none" stroke="#3a2e28" stroke-linecap="round">
  <path d="M-700 -60 C-560 -420 -260 -760 140 -690 C360 -650 520 -560 640 -330" stroke-width="44"/>
  <path d="M-700 -60 C-560 -420 -260 -760 140 -690 C360 -650 520 -560 640 -330" stroke="#5a4a40" stroke-width="20" transform="translate(4 -8)"/>
  <path d="M260 -650 C120 -720 -40 -720 -200 -680 C-320 -640 -420 -560 -520 -470" stroke-width="30"/>
  <path d="M-420 -560 C-380 -640 -300 -700 -200 -716" stroke-width="22"/>
  <path d="M300 -640 C380 -700 470 -640 560 -520" stroke-width="26"/>
</g>`;

export const html = (IMG) => kitHtml({
  IMG, skyFilter: 'saturate(.35) brightness(.55)', light: '#c8d0e0',
  R, CX, CY,
  defs: `<linearGradient id="barkG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a5648"/><stop offset=".45" stop-color="#4e4038"/><stop offset="1" stop-color="#2e2620"/></linearGradient>
    <radialGradient id="plG" cx="40%" cy="25%" r="75%"><stop offset="0" stop-color="#7a7a80"/><stop offset="1" stop-color="#2a2a30"/></radialGradient>
    <radialGradient id="gsG"><stop offset="0" stop-color="#fff6d0"/><stop offset=".25" stop-color="#ffd870" stop-opacity=".8"/><stop offset="1" stop-color="#ffb840" stop-opacity="0"/></radialGradient>`,
  sky: `<g id="gstar" transform="translate(1830 110)" opacity="0"><circle id="gsHalo" r="140" fill="url(#gsG)"/><path d="M0 -26 L6 -6 L26 0 L6 6 L0 26 L-6 6 L-26 0 L-6 -6Z" fill="#fff4c8"/></g>
    <circle id="fall" r="5" fill="#ffe6c0" opacity="0"/>`,
  planet: `<circle r="${R}" fill="url(#plG)" stroke="#16161a" stroke-width="6"/>
    <path d="M-300 -620 l40 60 l-30 50 l50 70 M120 -690 l-20 70 l40 40 M420 -550 l-60 50 l20 60 M-560 -380 l60 30 l10 70" fill="none" stroke="#1e1e24" stroke-width="5"/>
    ${trunk(-34, 300, 52)}${ROOTS}${trunk(18, 760, 80, 'bigTrunk')}${trunk(-58, 200, 40)}`,
  front: `<g id="dust"></g>`,
  overlay: `<div id="cold"></div><div id="goldGlow"></div>`,
});

export function setup() {
  const K = kitSetup({ R, CX, CY, SUBS, halfBack: 1 });
  const { tl, cam, A, S, G, talkS, talkG, blinkS, $, mk } = K;
  tl.set(A.st, { carry: 0, lift: 0 }, 0).set(A.box, { on: 1, x: BOX_X, up: 1400 }, 0).set(A.sheep, { inBox: 1, up: 70, x: BOX_X, s: 0.36 }, 0);
  tl.set('#boxIn', { rotation: 0, svgOrigin: '0 0' }, 0).set('#S-walk', { rotation: 0, svgOrigin: '0 0' }, 0);
  tl.set('#fade', { opacity: 1 }, 0).to('#fade', { opacity: 0, duration: 2.5 }, 0.5);
  tl.set(cam, { cx: 1150, cy: 610, s: 0.9 }, 0).to(cam, { cx: 1110, cy: 850, s: 1.2, duration: 5, ease: 'sine.inOut' }, 1.0);
  // ---- the crash ----
  tl.to(A.box, { up: 0, duration: 1.3, ease: 'power2.in' }, 2.9).to('#boxIn', { rotation: 540, duration: 1.3, ease: 'none' }, 2.9);
  tl.to(A.st, { shake: 1, duration: 0.05 }, 4.2).to(A.st, { shake: 0, duration: 1.2 }, 4.3);
  tl.to(A.box, { up: 60, x: BOX_X - 10, duration: 0.3, ease: 'power2.out' }, 4.2).to(A.box, { up: 0, duration: 0.3, ease: 'power2.in' }, 4.5)
    .to(A.box, { up: 18, duration: 0.18, ease: 'power2.out' }, 4.8).to(A.box, { up: 0, duration: 0.18, ease: 'power2.in' }, 4.98)
    .to('#boxIn', { rotation: 630, duration: 0.9, ease: 'power2.out' }, 4.2);
  // ---- silence; a wobble; it crawls out ----
  tl.to(cam, { cx: 1120, cy: 910, s: 1.7, duration: 8, ease: 'sine.inOut' }, 6.0);
  tl.to('#boxIn', { rotation: 624, duration: 0.15, yoyo: true, repeat: 3 }, 11.6);
  tl.set(A.sheep, { inBox: 0, x: BOX_X + 10, up: 0, flip: 1, walk: 0 }, 13.6).set(S('body'), { scaleY: 0.7 }, 13.6).set([S('lidL'), S('lidR')], { scaleY: 0.5 }, 13.6)
    .to(A.sheep, { x: BOX_X + 70, duration: 1.6, ease: 'sine.out' }, 13.6).to(S('body'), { scaleY: 1, duration: 1.4 }, 14.0).to(A.sheep, { walk: 0.4, duration: 0.2 }, 13.6).to(A.sheep, { walk: 0, duration: 0.3 }, 15.0)
    .to([S('lidL'), S('lidR')], { scaleY: 0, duration: 0.4 }, 15.2).set(S('mouth'), { attr: { d: WORRY } }, 13.6);
  tl.to(S('eyes'), { x: -8, y: -6, duration: 0.4 }, 15.4).to(S('eyes'), { x: 10, y: -6, duration: 0.4 }, 16.6);
  talkS(16.0, 1.6, WORRY);
  tl.to(S('head'), { rotation: 18, duration: 0.6 }, 18.6).to(S('eyes'), { x: 0, y: -12, duration: 0.4 }, 18.6);
  talkS(19.0, 2.4, OH);
  tl.to(cam, { cx: 1150, cy: 790, s: 1.2, duration: 3, ease: 'sine.inOut' }, 19.4);
  tl.to(S('head'), { rotation: 0, duration: 0.8 }, 22.0).to(S('eyes'), { x: 0, y: 0, duration: 0.4 }, 22.0);
  [10, 24, 34, 57, 70, 79].forEach(blinkS);
  // it wanders to the roots
  tl.to(A.sheep, { walk: 0.6, duration: 0.3 }, 23.0).to(A.sheep, { x: 1260, duration: 4.0, ease: 'sine.inOut' }, 23.0).to(A.sheep, { walk: 0, duration: 0.3 }, 26.7);
  tl.to(cam, { cx: 1260, cy: 810, s: 1.45, duration: 4, ease: 'sine.inOut' }, 23.4);
  tl.to(S('head'), { rotation: 14, duration: 0.8 }, 26.6).to(S('eyes'), { x: 6, y: -8, duration: 0.4 }, 26.6);
  talkS(28.0, 2.6, SAD);
  tl.to(S('head'), { rotation: 0, duration: 1 }, 31.0);
  // it sits down, head low
  tl.to(S('body'), { scaleY: 0.9, duration: 1.2 }, 33.0).to(A.sheep, { up: -6, duration: 1.2 }, 33.0).to(S('head'), { rotation: -14, duration: 1.6 }, 33.2)
    .to([S('lidL'), S('lidR')], { scaleY: 0.45, duration: 1 }, 33.4).to(S('mouth'), { attr: { d: SAD }, duration: 0.6 }, 33.4);
  // the ghosts, quieter now
  [[1360, 40, 0.27, 0], [1160, 20, 0.28, 1], [1440, 110, 0.25, 0]].forEach(([x, up, s, flip], i) => tl.set(A.g[i], { x, up, s, flip }, 0).to(A.g[i], { op: 0.55, duration: 2.0 }, 36.0 + i * 0.6));
  tl.to(cam, { cx: 1280, cy: 830, s: 1.3, duration: 4, ease: 'sine.inOut' }, 36.0);
  talkG(1, 40.4, 4.2, SAD);
  talkG(2, 45.6, 1.4, FIRM); tl.to(G(2, 'head'), { rotation: -10, duration: 0.6 }, 45.4);
  tl.to(S('head'), { rotation: -6, duration: 0.6 }, 48.0).to([S('lidL'), S('lidR')], { scaleY: 0.2, duration: 0.4 }, 48.0);
  talkS(48.4, 4.2, SAD);
  tl.to(S('head'), { rotation: -18, duration: 1.6 }, 52.8).to([S('lidL'), S('lidR')], { scaleY: 0.6, duration: 1 }, 53.0);
  // the long silence; they come close; the camera pulls back and back
  tl.to(A.g[0], { x: 1306, up: 6, duration: 5, ease: 'sine.inOut' }, 56.0).to(G(1, 'head'), { rotation: -14, duration: 3 }, 59.0);
  tl.to(A.g[1], { x: 1214, up: 4, duration: 5, ease: 'sine.inOut' }, 60.0).to(G(2, 'head'), { rotation: 6, duration: 2 }, 62.0);
  tl.set('#G3-lids', { attr: { opacity: 1 } }, 58.0);
  tl.to(cam, { cx: 1250, cy: 690, s: 0.75, duration: 22, ease: 'sine.inOut' }, 56.0);
  // a star, far away, turns gold
  tl.to('#gstar', { opacity: 0.35, duration: 4 }, 79.0).to('#gstar', { opacity: 1, duration: 3 }, 84.0);
  tl.set('#G3-lids', { attr: { opacity: 0 } }, 85.6).to(G(3, 'eyes'), { x: 8, y: -10, duration: 0.6 }, 86.0).to(G(3, 'head'), { rotation: 10, duration: 1 }, 86.0);
  tl.to(cam, { cx: 1360, cy: 710, s: 1.05, duration: 5, ease: 'sine.inOut' }, 84.0);
  talkG(3, 88.6, 3.0, SMILE);
  tl.to('#goldGlow', { opacity: 0.7, duration: 3 }, 90.0);
  tl.to(S('head'), { rotation: 10, duration: 1.6, ease: 'sine.inOut' }, 91.8).to([S('lidL'), S('lidR')], { scaleY: 0, duration: 0.6 }, 92.4)
    .to(S('eyes'), { x: 10, y: -12, duration: 0.6 }, 92.4).to(S('mouth'), { attr: { d: OH }, duration: 0.4 }, 92.6);
  tl.to(['#S-rimBody', '#S-rimHead'], { opacity: 0.9, duration: 2 }, 92.0);
  tl.to(cam, { cx: 1290, cy: 850, s: 1.6, duration: 3, ease: 'sine.inOut' }, 93.0);
  tl.to(S('body'), { scaleY: 1, duration: 0.6, ease: 'back.out(2)' }, 95.0).to(A.sheep, { up: 0, duration: 0.6 }, 95.0).to(S('mouth'), { attr: { d: FIRM }, duration: 0.3 }, 95.4);
  tl.to([A.g[0], A.g[1]], { up: 30, duration: 0.6 }, 95.2);
  talkS(96.4, 2.0, FIRM);
  talkS(100.0, 1.6, FIRM);
  tl.to(cam, { cx: 1290, cy: 830, s: 1.3, duration: 2.5, ease: 'sine.inOut' }, 101.8);
  talkG(2, 103.0, 2.4, WORRY);
  talkG(1, 106.0, 2.4, SAD); tl.to(G(1, 'head'), { rotation: -6, duration: 0.2, yoyo: true, repeat: 3 }, 108.0);
  // it looks up the huge dead trunk, then at its box
  tl.to(cam, { cx: 1560, cy: 520, s: 0.9, duration: 3, ease: 'sine.inOut' }, 108.6);
  tl.to(S('head'), { rotation: 24, duration: 1.2 }, 108.6);
  tl.to(cam, { cx: 1180, cy: 890, s: 1.5, duration: 2.4, ease: 'sine.inOut' }, 111.2);
  tl.to(S('head'), { rotation: 0, duration: 0.8 }, 111.0).set(A.sheep, { flip: 0 }, 111.4).to(S('eyes'), { x: -10, y: 4, duration: 0.4 }, 111.6);
  talkS(112.6, 1.4, SMILE);
  // it nudges the box upright and pushes it to the foot of the trunk
  tl.to(A.sheep, { walk: 0.8, duration: 0.2 }, 114.4).to(A.sheep, { x: BOX_X + 62, duration: 1.4, ease: 'sine.inOut' }, 114.4).to(A.sheep, { walk: 0, duration: 0.2 }, 115.6);
  tl.to('#boxIn', { rotation: 720, duration: 0.6, ease: 'back.out(1.6)' }, 116.0).to(S('head'), { rotation: -16, duration: 0.3, yoyo: true, repeat: 1 }, 115.8);
  tl.to(A.sheep, { walk: 0.8, duration: 0.2 }, 116.6).to(A.sheep, { x: BOX_X - 62, duration: 1.1, ease: 'sine.inOut' }, 116.6).set(A.sheep, { flip: 1 }, 117.7);
  tl.to(A.sheep, { x: TRUNK_X - 120, duration: 6.4, ease: 'sine.inOut' }, 117.8).to(A.box, { x: TRUNK_X - 60, duration: 6.4, ease: 'sine.inOut' }, 117.8)
    .to(A.sheep, { walk: 0, duration: 0.3 }, 123.4);
  A.g.forEach((g, i) => tl.to(g, { x: TRUNK_X - 220 - i * 70, up: 60 + i * 30, duration: 6, ease: 'sine.inOut' }, 117.8 + i * 0.3));
  tl.to(cam, { cx: 1340, cy: 870, s: 1.2, duration: 6, ease: 'sine.inOut' }, 117.0);
  // and up the trunk to the gold star
  tl.to(cam, { cx: 1700, cy: 300, s: 0.95, duration: 10, ease: 'sine.inOut' }, 124.0);
  tl.to('#gstar', { scale: 1.3, duration: 1.5, ease: 'sine.inOut', yoyo: true, repeat: 5, svgOrigin: '0 0' }, 124.0);
  tl.to('#fade', { opacity: 1, duration: 4 }, 135.6);

  const dust = []; for (let i = 0; i < 14; i++) dust.push(mk('circle', $('#dust'), { fill: '#8a8a90', opacity: 0 }));
  const H = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  return {
    render: (t) => {
      tl.seek(t); K.drive(t);
      // the falling streak before the crash
      const u = (t - 1.4) / 2.8;
      if (u > 0 && u < 1) { $('#fall').setAttribute('opacity', (0.9 * Math.sin(Math.PI * Math.min(1, u * 1.3))).toFixed(2)); $('#fall').setAttribute('cx', (1500 - 420 * u).toFixed(0)); $('#fall').setAttribute('cy', (-200 + 600 * u).toFixed(0)); }
      else $('#fall').setAttribute('opacity', 0);
      // dust from the crash
      const p = K.surf(BOX_X);
      dust.forEach((d, i) => { const v = t - 4.2 - (i % 3) * 0.05; if (v < 0 || v > 5) { d.setAttribute('opacity', 0); return; }
        const dir = (H(i) - 0.5) * 2, x = BOX_X + dir * (60 + 220 * (1 - Math.exp(-v * 1.5))), y = p.y - 10 - 50 * H(i + 3) * (1 - Math.exp(-v * 2)) - v * 6;
        d.setAttribute('cx', x.toFixed(1)); d.setAttribute('cy', y.toFixed(1)); d.setAttribute('r', (16 + 40 * H(i + 7) * Math.min(1, v)).toFixed(1));
        d.setAttribute('opacity', (0.5 * Math.max(0, 1 - v / 5)).toFixed(2)); });
      // the gold star breathes
      $('#gsHalo').setAttribute('r', (130 + Math.sin(t * 1.7) * 18).toFixed(1));
    },
  };
}
