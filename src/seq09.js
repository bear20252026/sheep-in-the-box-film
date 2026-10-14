// SEQ 9 — THE LONG WAY HOME (2:30). The sheep climbs the tallest dead baobab, ledge by ledge, dragging its box by the
// strap. The ghosts help (Horns shoves, Sniffle sneezes, Old Wool naps on a branch). At the top: the box flaps become
// wings, the ghosts blow with all their might — one, two, THREE — and it glides across the dark toward the gold star,
// past the King's planet and the Lamplighter's lamp, down onto B612 at dawn.
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {kitCss, kitHtml, kitSetup, INK, SMILE, BIG, OH, SAYD, SAD, FIRM, WORRY} from './planetkit.js';
import {trunk, ROOTS} from './seq08b.js';

export const DURATION = 150;
const R = 700, CX = 1200, CY = 1620;
const BASE = { x: 1413, y: 964 }, U = { x: 0.309, y: -0.951 }, N = { x: 0.951, y: 0.309 };
const halfW = (d) => { const P = [[0, 80], [190, 112], [418, 90], [608, 44], [760, 16], [800, 10]]; for (let i = 1; i < P.length; i++) if (d <= P[i][0]) { const [a, wa] = P[i - 1], [b, wb] = P[i]; return wa + (wb - wa) * (d - a) / (b - a); } return 10; };
const edge = (d, s) => ({ x: BASE.x + s * halfW(d) * N.x + d * U.x, y: BASE.y + s * halfW(d) * N.y + d * U.y });
const LEDGES = [[110, -1], [215, 1], [325, -1], [430, 1], [530, -1], [620, 1], [700, -1]];
const STAND = LEDGES.map(([d, s]) => { const e = edge(d, s); return { x: e.x + s * 58, y: e.y - 8, s }; });
const TOP = { x: BASE.x + 768 * U.x, y: BASE.y + 768 * U.y - 4 };
const P0 = { x: 1300, y: 927 };
const NAP = (() => { const e = edge(470, 1); return { x: e.x + 120, y: e.y - 8 }; })();

const SUBS = [
  [10.4, 12.4, 'You’re really doing this.', '你还真要这么干。', 'say'],
  [13.0, 16.4, 'He would come for me. So I’m going to him.', '他会来找我的。所以我要去找他。', 'say'],
  [18.4, 20.4, 'Go, sheep, go! (cough)', '加油，小羊，加油！（咳咳）', 'say'],
  [36.4, 38.8, 'Up you go. Don’t make it weird.', '上去吧。别搞得那么肉麻。', 'say'],
  [41.4, 43.2, 'Mm. Nice view.', '嗯。风景不错。', 'say'],
  [43.8, 45.6, 'How did you get up here?', '你是怎么上来的？', 'say'],
  [46.0, 47.0, 'Ghost.', '鬼魂。', 'say'],
  [53.0, 54.0, 'A-CHOO!', '阿——嚏！', 'say'],
  [54.4, 55.8, 'Bless me.', '保佑我。', 'say'],
  [64.4, 66.4, 'It’s a long way down.', '下面好远啊。', 'say'],
  [67.0, 70.0, 'Then don’t look down. Look at the star.', '那就别往下看。看着那颗星星。', 'say'],
  [76.0, 76.9, 'One…', '一……', 'say'],
  [77.2, 78.1, 'Two…', '二……', 'say'],
  [78.4, 79.4, 'THREE!', '三！', 'say'],
  [86.0, 88.0, 'I’m flying!', '我在飞！', 'say'],
  [88.6, 90.6, 'Gliding. Technically.', '严格来说，是在滑翔。', 'say'],
  [96.0, 97.6, 'Hello, King!', '你好，国王！', 'say'],
  [104.0, 105.8, 'Good evening! Good morning!', '晚上好！早上好！', 'say'],
  [113.0, 116.2, 'Almost there. Keep your eyes on it.', '快到了。眼睛盯着它。', 'say'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('');

export const css = kitCss('radial-gradient(ellipse at 60% 20%, #1c1e2c 0%, #0b0c14 60%, #030306 100%)') + `
#byPos,#birds,#strings,#stake{display:none}
#dawn{position:absolute;inset:0;pointer-events:none;mix-blend-mode:soft-light;background:radial-gradient(ellipse 80% 90% at 75% 40%,rgba(255,190,110,.95),rgba(255,150,120,.3) 80%);opacity:0}
#whiteout{position:absolute;inset:0;pointer-events:none;background:#fff1dc;opacity:0}
`;

const LEDGE_SVG = LEDGES.map(([d, s]) => { const e = edge(d, s), t = { x: e.x + s * 100, y: e.y - 6 };
  return `<path d="M${(e.x - s * 14).toFixed(0)} ${(e.y + 10).toFixed(0)} Q${((e.x + t.x) / 2).toFixed(0)} ${(e.y + 4).toFixed(0)} ${t.x.toFixed(0)} ${t.y.toFixed(0)}" stroke="#3a2e28" stroke-width="20" stroke-linecap="round" fill="none"/>
   <path d="M${(e.x - s * 10).toFixed(0)} ${(e.y + 4).toFixed(0)} Q${((e.x + t.x) / 2).toFixed(0)} ${(e.y - 2).toFixed(0)} ${(t.x - s * 6).toFixed(0)} ${(t.y - 4).toFixed(0)}" stroke="#6a5648" stroke-width="5" stroke-linecap="round" fill="none"/>`; }).join('')
  + (() => { const e = edge(470, 1); return `<path d="M${e.x - 10} ${e.y + 12} Q${e.x + 90} ${e.y + 4} ${e.x + 190} ${e.y - 14}" stroke="#3a2e28" stroke-width="22" stroke-linecap="round" fill="none"/>`; })();

// far planets passed on the glide (drawn in the sky, far away)
const VOLC = (a, h, w) => `<g transform="rotate(${a}) translate(0 -226)"><path d="M${-w} 4 Q${-w * 0.5} ${-h * 0.4} ${-w * 0.28} ${-h} L${w * 0.28} ${-h} Q${w * 0.5} ${-h * 0.4} ${w} 4Z" fill="url(#volG)" stroke="#3a2a20" stroke-width="4"/><ellipse cy="${-h}" rx="${w * 0.3}" ry="${w * 0.1}" fill="#3a2420"/></g>`;
const planetBall = (r, fill, extra = '') => `<g filter="url(#wcPl)"><circle r="${r}" fill="${fill}" stroke="#2a2030" stroke-width="4"/>${extra}</g><circle r="${r}" fill="url(#gTex)" style="mix-blend-mode:multiply" opacity=".8"/><circle r="${r}" fill="url(#rimL)" style="mix-blend-mode:screen"/><circle r="${r}" fill="url(#shadeL)" style="mix-blend-mode:multiply"/>`;
// far planets passed on the glide (drawn in the sky, far away)
const FAR = `
 <g id="kingP" transform="translate(3200 290) scale(.75)" opacity=".85">${planetBall(70, 'url(#kingG)', '<path d="M-70 -4 Q-62 -58 0 -70 Q62 -58 70 -4 Q34 -26 0 -28 Q-34 -26 -70 -4Z" fill="#b8323a"/><path d="M-6 -70 l3 -12 l3 7 l3 -7 l3 12Z" fill="#e8c040"/>')}</g>
 <g id="lampP" transform="translate(3560 300) scale(.9)">${planetBall(46, '#b89070')}<path d="M0 -46 L0 -80" stroke="#3a3a44" stroke-width="4"/><circle id="lampBG" cy="-84" r="44" fill="url(#gsG)"/><circle id="lampB" cy="-84" r="6" fill="#ffe0a0"/></g>`;
const DEST = `<g id="dest" transform="translate(2300 90)">
  <g id="b612" opacity="0">${planetBall(230, 'url(#b612G)', '')}
   ${VOLC(-50, 30, 30)}${VOLC(34, 24, 22)}${VOLC(47, 32, 28)}
   <g transform="translate(62 -222)"><path d="M-30 4 q0 -64 30 -64 q30 0 30 64Z" fill="#e8f4ff" fill-opacity=".3" stroke="#d8eef8" stroke-width="3"/><path d="M-22 -40 q4 -8 10 -6" stroke="#fff" stroke-width="3" fill="none" opacity=".8"/>
    <path d="M0 2 L0 -26" stroke="#3a7a3a" stroke-width="3"/><path d="M0 -14 q-10 -2 -12 6 q8 2 12 -6Z" fill="#4a8a3a"/><circle cy="-32" r="9" fill="#e04a5a" stroke="#8a2030" stroke-width="2"/></g></g>
  <g id="gold"><circle id="gsHalo" r="140" fill="url(#gsG)"/><path d="M0 -26 L6 -6 L26 0 L6 6 L0 26 L-6 6 L-26 0 L-6 -6Z" fill="#fff4c8"/></g></g>`;

export const html = (IMG) => kitHtml({
  IMG, skyFilter: 'saturate(.55) brightness(.7)', light: '#c8d0e0',
  R, CX, CY,
  defs: `<linearGradient id="barkG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6a5648"/><stop offset=".45" stop-color="#4e4038"/><stop offset="1" stop-color="#2e2620"/></linearGradient>
    <radialGradient id="plG" cx="40%" cy="25%" r="75%"><stop offset="0" stop-color="#7a7a80"/><stop offset="1" stop-color="#2a2a30"/></radialGradient>
    <radialGradient id="b612G" cx="40%" cy="25%" r="75%"><stop offset="0" stop-color="#a8c878"/><stop offset=".6" stop-color="#6a9a4a"/><stop offset="1" stop-color="#3a5a32"/></radialGradient>
    <radialGradient id="kingG" cx="40%" cy="25%" r="75%"><stop offset="0" stop-color="#a088c8"/><stop offset="1" stop-color="#4a3470"/></radialGradient>
    <linearGradient id="volG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a88466"/><stop offset="1" stop-color="#6a4a36"/></linearGradient>
    <radialGradient id="gsG"><stop offset="0" stop-color="#fff6d0"/><stop offset=".25" stop-color="#ffd870" stop-opacity=".8"/><stop offset="1" stop-color="#ffb840" stop-opacity="0"/></radialGradient>`,
  sky: FAR + DEST,
  planet: `<circle r="${R}" fill="url(#plG)" stroke="#16161a" stroke-width="6"/>
    <path d="M-300 -620 l40 60 l-30 50 l50 70 M120 -690 l-20 70 l40 40 M420 -550 l-60 50 l20 60 M-560 -380 l60 30 l10 70" fill="none" stroke="#1e1e24" stroke-width="5"/>
    ${trunk(-34, 300, 52)}${ROOTS}${trunk(18, 760, 80, 'bigTrunk')}${trunk(-58, 200, 40)}`,
  back: `<g filter="url(#wcPl)">${LEDGE_SVG}</g>`,
  front: `<path id="strap" fill="none" stroke="#7a5a3a" stroke-width="3.5" stroke-linecap="round"/><g id="windG" stroke="#e8e4ff" stroke-linecap="round" fill="none"></g>`,
  overlay: `<div id="dawn"></div><div id="whiteout"></div>`,
});

export function setup() {
  const K = kitSetup({ R, CX, CY, SUBS, halfBack: 1 });
  const { tl, cam, A, S, G, talkS, talkG, blinkS, $, mk } = K;
  // the box's flaps become wings
  const wings = mk('g', $('#boxIn'), { id: 'wings', opacity: 0 });
  const wl = mk('g', wings, {}), wr = mk('g', wings, {});
  mk('path', wl, { d: 'M-40 -50 L-128 -96 L-120 -64 L-40 -38Z', fill: '#e6c49c', stroke: INK, 'stroke-width': 3 });
  mk('path', wr, { d: 'M52 -60 L140 -104 L134 -72 L52 -46Z', fill: '#e6c49c', stroke: INK, 'stroke-width': 3 });

  const X = { swing: 0, sx: P0.x, sy: P0.y, flip: 1, boxMode: 0, bx: P0.x - 90, by: P0.y + 4, br: 0, bs: 0.62, flap: 0, wingOp: 0, prog: 0, blow: 0,
    g: [{ x: 1180, y: 860, f: 1 }, { x: 1240, y: 880, f: 1 }, { x: 1120, y: 820, f: 1 }] };
  const C = { cx: 1400, cy: 780, s: 1.1, follow: 0, fx: 0, fy: -40, fs: 1.3 };
  tl.set(A.sheep, { inBox: 0, up: 0, s: 0.36 }, 0).set(A.box, { on: 1 }, 0).set('#S-walk', { rotation: 0, svgOrigin: '0 0' }, 0)
    .set(wl, { rotation: 0, svgOrigin: '-40 -50' }, 0).set(wr, { rotation: 0, svgOrigin: '52 -60' }, 0);
  A.g.forEach((g, i) => tl.set(g, { op: 0.6, s: 0.26 }, 0));
  tl.set('#fade', { opacity: 1 }, 0).to('#fade', { opacity: 0, duration: 2.5 }, 0.3);
  [5, 12, 17.5, 33, 45, 62, 72].forEach(blinkS);
  // ---- at the foot of the tree ----
  tl.to(C, { cx: 1560, cy: 380, s: 0.72, duration: 4, ease: 'sine.inOut' }, 2.4).to(S('head'), { rotation: 22, duration: 1.2 }, 2.6).to(S('eyes'), { x: 6, y: -12, duration: 0.5 }, 2.8);
  tl.to(C, { cx: 1340, cy: 830, s: 1.4, duration: 3, ease: 'sine.inOut' }, 7.0).to(S('head'), { rotation: 0, duration: 0.8 }, 7.4).to(S('eyes'), { x: 0, y: 0, duration: 0.4 }, 7.4);
  talkG(2, 10.4, 2.0, FIRM);
  tl.to(S('mouth'), { attr: { d: FIRM }, duration: 0.3 }, 12.6);
  talkS(13.0, 3.4, FIRM);
  // it takes the strap in its teeth
  tl.set(X, { flip: 0 }, 16.6).to(S('head'), { rotation: -18, duration: 0.4 }, 16.8).set(X, { boxMode: 1 }, 17.3).to(S('head'), { rotation: 0, duration: 0.5 }, 17.4);
  talkG(1, 18.4, 2.0, BIG); tl.to(G(1, 'head'), { rotation: 10, duration: 0.3, yoyo: true, repeat: 3 }, 18.4);
  tl.set(X, { flip: 1 }, 20.4);
  tl.set(C, { follow: 1, fx: 0, fy: -60, fs: 1.25 }, 20.6);
  // ---- the climb ----
  const hop = (at, from, to, dur = 0.8, peak = 60) => {
    tl.set(X, { flip: to.x > from.x ? 1 : 0 }, at - 0.3).to(S('body'), { scaleY: 0.9, duration: 0.2 }, at - 0.25).to(S('body'), { scaleY: 1.05, duration: 0.15 }, at)
      .to(X, { sx: to.x, duration: dur, ease: 'none' }, at).to(X, { sy: Math.min(from.y, to.y) - peak, duration: dur * 0.5, ease: 'power2.out' }, at)
      .to(X, { sy: to.y, duration: dur * 0.5, ease: 'power2.in' }, at + dur * 0.5).to(S('body'), { scaleY: 1, duration: 0.3, ease: 'back.out(3)' }, at + dur);
  };
  // the ghosts climb alongside (floating), keeping near
  const gTo = (at, i, x, y, f = 1, dur = 1.6) => tl.to(X.g[i], { x, y, duration: dur, ease: 'sine.inOut' }, at).set(X.g[i], { f }, at);
  hop(21.0, P0, STAND[0]); gTo(21.4, 0, STAND[0].x - 120, STAND[0].y + 30); gTo(21.6, 1, STAND[0].x - 60, STAND[0].y + 140);
  hop(25.0, STAND[0], STAND[1]); gTo(25.4, 0, STAND[1].x - 300, STAND[1].y + 20);
  hop(29.0, STAND[1], STAND[2]); gTo(29.4, 1, STAND[2].x + 40, STAND[2].y + 170);
  // the miss: hooves on the edge, scrabbling; Horns shoves from below
  const hang = { x: STAND[3].x - 40, y: STAND[3].y + 62 };
  hop(34.0, STAND[2], hang, 0.7, 40);
  tl.to('#S-walk', { rotation: 30, duration: 0.2 }, 34.6).to(S('mouth'), { attr: { d: WORRY }, duration: 0.2 }, 34.6).to([S('lidL'), S('lidR')], { scaleY: 0, duration: 0.1 }, 34.6);
  tl.to(A.sheep, { walk: 1.4, duration: 0.2 }, 34.7).to(A.sheep, { walk: 0, duration: 0.2 }, 36.0);
  gTo(34.4, 1, hang.x - 10, hang.y + 130, 1, 1.0);
  tl.to(X.g[1], { y: hang.y + 60, duration: 0.3, ease: 'power2.in' }, 35.6).to(X, { sx: STAND[3].x, sy: STAND[3].y, duration: 0.4, ease: 'back.out(1.6)' }, 35.85)
    .to('#S-walk', { rotation: 0, duration: 0.4 }, 35.85).to(X.g[1], { y: hang.y + 140, duration: 1.2 }, 36.2);
  talkG(2, 36.4, 2.4, FIRM); tl.to(G(2, 'head'), { rotation: -12, duration: 0.5 }, 36.4).to(G(2, 'head'), { rotation: 0, duration: 0.6 }, 39.4);
  tl.to(S('mouth'), { attr: { d: SMILE }, duration: 0.3 }, 37.0);
  // Old Wool, napping on a branch
  tl.set(X.g[2], { x: NAP.x, y: NAP.y + 2, f: 0 }, 0).set('#G3-lids', { attr: { opacity: 1 } }, 0);
  hop(40.0, STAND[3], STAND[4]);
  tl.set(X, { flip: 1 }, 40.9);
  tl.to(C, { fx: 120, fs: 1.35, duration: 1.5 }, 40.4);
  talkG(3, 41.4, 1.8, SMILE);
  tl.to(S('eyes'), { x: 12, y: 0, duration: 0.3 }, 41.6);
  talkS(43.8, 1.8, OH);
  talkG(3, 46.0, 1.0, SMILE);
  tl.to(C, { fx: 0, fs: 1.25, duration: 1.5 }, 47.0);
  hop(48.0, STAND[4], STAND[5]); gTo(47.6, 0, STAND[5].x - 180, STAND[5].y + 60);
  // a gust: the box swings out, the sheep teeters; Sniffle sneezes it back
  tl.to(X, { swing: 1, duration: 1.2, ease: 'sine.out' }, 51.0).to('#S-walk', { rotation: -14, duration: 0.6, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 51.0)
    .to(S('mouth'), { attr: { d: WORRY }, duration: 0.2 }, 51.0);
  tl.to(G(1, 'head'), { rotation: 16, duration: 0.6, ease: 'power2.in' }, 52.4).to(G(1, 'head'), { rotation: -20, duration: 0.15 }, 53.0);
  talkG(1, 53.0, 1.0, OH);
  tl.to(X, { swing: -0.4, duration: 0.4, ease: 'power2.out' }, 53.1).to(X, { swing: 0, duration: 1.2, ease: 'elastic.out(1, 0.4)' }, 53.5).to('#S-walk', { rotation: 0, duration: 0.4 }, 53.6);
  talkG(1, 54.4, 1.4, SMILE); tl.to(G(1, 'head'), { rotation: 0, duration: 0.5 }, 54.4);
  tl.to(S('mouth'), { attr: { d: SMILE }, duration: 0.3 }, 55.0);
  hop(57.0, STAND[5], STAND[6]); gTo(57.2, 0, STAND[6].x - 160, STAND[6].y + 40); gTo(57.6, 1, STAND[6].x + 120, STAND[6].y + 90, 0);
  hop(61.0, STAND[6], TOP, 0.9, 70); gTo(61.4, 0, TOP.x - 170, TOP.y + 20); gTo(61.6, 1, TOP.x + 160, TOP.y + 60, 0);
  // ---- the top ----
  tl.to(C, { fx: 260, fy: 40, fs: 0.85, duration: 3, ease: 'sine.inOut' }, 62.0);
  tl.set('#G3-lids', { attr: { opacity: 0 } }, 63.0);
  tl.to(S('head'), { rotation: -26, duration: 0.6 }, 63.6).to(S('eyes'), { x: 0, y: 10, duration: 0.4 }, 63.6).to(S('mouth'), { attr: { d: WORRY }, duration: 0.3 }, 63.8);
  tl.to(C, { fy: 160, fs: 1.1, duration: 1.4, ease: 'sine.inOut' }, 63.8);
  talkS(64.4, 2.0, WORRY);
  gTo(64.6, 2, TOP.x - 90, TOP.y - 60, 1, 2.2);
  talkG(3, 67.0, 3.0, SMILE);
  tl.to(S('head'), { rotation: 16, duration: 1.0 }, 69.4).to(S('eyes'), { x: 10, y: -10, duration: 0.5 }, 69.4).to(S('mouth'), { attr: { d: FIRM }, duration: 0.4 }, 70.0)
    .to(C, { fx: 220, fy: -40, fs: 1.0, duration: 2, ease: 'sine.inOut' }, 69.4);
  // into the box; flaps out like wings
  tl.set(X, { boxMode: 2, bx: TOP.x + 20, by: TOP.y + 2, br: 0 }, 71.4).set(A.sheep, { inBox: 1, up: -40 }, 71.4).to(S('head'), { rotation: 8, duration: 0.3 }, 71.4)
    .to(X, { wingOp: 1, duration: 0.3 }, 72.0).to(X, { flap: 1, duration: 0.6, ease: 'back.out(2)' }, 72.0);
  tl.set(C, { follow: 2 }, 71.4);
  tl.to(X, { flap: 0.6, duration: 0.25, yoyo: true, repeat: 5 }, 73.0);
  gTo(73.0, 0, TOP.x - 130, TOP.y + 10, 1, 1.2); gTo(73.2, 1, TOP.x - 80, TOP.y + 70, 1, 1.2); gTo(73.4, 2, TOP.x - 170, TOP.y - 50, 1, 1.2);
  [1, 2, 3].forEach((n) => tl.to(G(n, 'mouth'), { attr: { d: OH }, duration: 0.3 }, 75.0).to(G(n, 'body'), { scaleY: 1.12, scaleX: 1.08, duration: 2.6, svgOrigin: '40 -80' }, 75.0));
  talkG(1, 76.0, 0.9, OH); talkG(2, 77.2, 0.9, OH);
  talkS(78.4, 1.0, BIG);
  // jump! the ghosts blow
  tl.to(X, { blow: 1, duration: 0.3 }, 79.0).to(X, { blow: 0.6, duration: 8 }, 80.0).to(X, { blow: 0.3, duration: 20 }, 90.0).to(X, { blow: 0, duration: 10 }, 125.0);
  [1, 2, 3].forEach((n) => tl.to(G(n, 'body'), { scaleY: 1, scaleX: 1, duration: 1.2 }, 79.0));
  // ---- the glide (bx/by are the box's path; prog brings the gold star closer) ----
  tl.to(X, { bx: TOP.x + 260, duration: 1.2, ease: 'power1.out' }, 79.0).to(X, { by: TOP.y - 120, duration: 0.6, ease: 'power2.out' }, 79.0)
    .to(X, { by: TOP.y + 220, duration: 2.8, ease: 'power2.in' }, 79.6).to(X, { br: 28, duration: 1.6 }, 79.6);   // a scary drop
  tl.to(X, { bx: TOP.x + 1100, duration: 8, ease: 'sine.inOut' }, 80.2).to(X, { by: TOP.y - 60, duration: 4, ease: 'sine.inOut' }, 82.4).to(X, { br: -8, duration: 2 }, 82.4);
  tl.to(X, { flap: 1, duration: 0.3, yoyo: true, repeat: 40, ease: 'sine.inOut' }, 82.4);
  tl.to(C, { fs: 1.5, fx: 60, fy: -20, duration: 3, ease: 'sine.inOut' }, 83.0).to(C, { fs: 1.0, fx: 200, fy: 0, duration: 4, ease: 'sine.inOut' }, 91.0);
  talkS(86.0, 2.0, BIG);
  talkG(2, 88.6, 2.0, FIRM);
  tl.to(X, { bx: 4300, duration: 40, ease: 'none' }, 88.2).to(X, { by: TOP.y - 140, duration: 10, ease: 'sine.inOut', yoyo: true, repeat: 3 }, 88.4);
  tl.to(X, { br: 4, duration: 3, yoyo: true, repeat: 11, ease: 'sine.inOut' }, 88.4);
  tl.to(X, { prog: 1, duration: 50, ease: 'power1.in' }, 80.0);
  A.g.forEach((g, i) => tl.to(g, { op: 0.45, duration: 4 }, 82 + i));
  tl.to(S('eyes'), { x: 0, y: 0, duration: 0.4 }, 92.0);
  tl.to(S('head'), { rotation: -6, duration: 0.6 }, 95.6); talkS(96.0, 1.6, BIG);
  tl.to(S('head'), { rotation: 0, duration: 0.6 }, 98.0);
  talkS(104.0, 1.8, BIG);
  talkG(3, 113.0, 3.2, SMILE);
  tl.to(C, { fs: 0.75, fx: 260, fy: 20, duration: 10, ease: 'sine.inOut' }, 112.0);
  // ---- dawn on B612: down, bump, roll ----
  tl.to('#dawn', { opacity: 1, duration: 10 }, 120.0);
  tl.to(X, { bx: 4450, duration: 8, ease: 'sine.out' }, 128.2).to(X, { by: 170, duration: 6, ease: 'power1.in' }, 128.0).to(X, { br: 30, duration: 6 }, 128.0);
  tl.to(X, { flap: 0.2, duration: 2 }, 132.0);
  tl.to(C, { fs: 1.0, fx: 60, fy: -80, duration: 6, ease: 'sine.inOut' }, 128.0);
  tl.to(A.g, { op: 0, duration: 3 }, 128.0);
  tl.to('#whiteout', { opacity: 1, duration: 4, ease: 'sine.in' }, 144.0);

  // ---- per-frame: camera, sheep on the tree, the box, ghosts, the star coming closer, wind ----
  const winds = []; for (let i = 0; i < 26; i++) winds.push(mk('path', $('#windG'), { 'stroke-width': 3, opacity: 0 }));
  const H = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const mouthOf = (x, y, f, s) => {
    const hr = gsap.getProperty('#S-head', 'rotation') * Math.PI / 180, wr = gsap.getProperty('#S-walk', 'rotation') * Math.PI / 180;
    let mx = -97 + 60, my = -204 + 190; [mx, my] = [mx * Math.cos(hr) - my * Math.sin(hr) - 60, mx * Math.sin(hr) + my * Math.cos(hr) - 190];
    [mx, my] = [mx * Math.cos(wr) - my * Math.sin(wr), mx * Math.sin(wr) + my * Math.cos(wr)];
    return { x: x + mx * s * f, y: y + my * s };
  };
  return {
    render: (t) => {
      tl.seek(t);
      // camera: its own tweened state, or following the sheep (1) / the box (2)
      const tx = C.follow === 2 ? X.bx : X.sx, ty = C.follow === 2 ? X.by - 40 : X.sy;
      if (C.follow) { cam.cx = tx + C.fx; cam.cy = ty + C.fy; cam.s = C.fs; } else { cam.cx = C.cx; cam.cy = C.cy; cam.s = C.s; }
      K.drive(t);
      const s = 0.36, f = X.flip ? -1 : 1;
      $('#shPos').setAttribute('transform', `translate(${X.sx.toFixed(1)} ${X.sy.toFixed(1)}) scale(${(f * s).toFixed(3)} ${s})`);
      // the box: on the ground / hanging from the strap / flying with the sheep in it
      let bx = X.bx, by = X.by, br = X.br;
      $('#strap').setAttribute('d', '');
      if (X.boxMode === 1) {
        const m = mouthOf(X.sx, X.sy, f, s), sw = (X.swing || 0) * 70 + Math.sin(t * 2.2) * 6;
        bx = m.x + sw; by = m.y + 30 + X.bs * 60; br = sw * 0.4;
        $('#strap').setAttribute('d', `M${m.x.toFixed(1)} ${m.y.toFixed(1)} L${(bx - 4).toFixed(1)} ${(by - X.bs * 62).toFixed(1)} M${m.x.toFixed(1)} ${m.y.toFixed(1)} L${(bx + 14).toFixed(1)} ${(by - X.bs * 64).toFixed(1)}`);
      }
      $('#boxPos').setAttribute('transform', `translate(${bx.toFixed(1)} ${by.toFixed(1)}) rotate(${br.toFixed(2)} 0 -30) scale(${X.bs})`);
      $('#wings').setAttribute('opacity', X.wingOp);
      gsap.set('#wings > g:first-child', { rotation: -X.flap * 40 }); gsap.set('#wings > g:last-child', { rotation: X.flap * 40 });
      // the ghosts
      X.g.forEach((g, i) => { let gx = g.x, gy = g.y;
        if (C.follow === 2) { gx = X.bx - 150 - i * 70 + Math.sin(t * 0.9 + i) * 20; gy = X.by + 30 - i * 40 + (i === 1 ? 70 : 0); }
        $('#gp' + (i + 1)).setAttribute('transform', `translate(${gx.toFixed(1)} ${(gy + Math.sin(t * 1.1 + i * 2) * 6).toFixed(1)}) scale(${g.f ? -0.26 : 0.26} 0.26)`); });
      // wind from the ghosts' breath
      winds.forEach((w, i) => { if (X.blow < 0.02) { w.setAttribute('opacity', 0); return; }
        const u = (t * (1.4 + H(i)) + H(i + 3)) % 1, x0 = X.bx - 240 + u * 260, y0 = X.by - 60 + (H(i + 7) - 0.5) * 150;
        w.setAttribute('d', `M${x0.toFixed(0)} ${y0.toFixed(0)} q40 ${(-8 + 16 * H(i)).toFixed(0)} 90 0`);
        w.setAttribute('opacity', (X.blow * 0.6 * Math.sin(Math.PI * u)).toFixed(2)); });
      // the gold star draws nearer and becomes B612
      const p = X.prog, dx = (C.follow === 2 ? X.bx : 1900) + 140 + 900 * (1 - p), dy = 150 + (520 - 150) * p * p, sc = 0.5 + 1.1 * p * p;
      $('#dest').setAttribute('transform', `translate(${dx.toFixed(1)} ${dy.toFixed(1)}) scale(${sc.toFixed(3)})`);
      $('#b612').setAttribute('opacity', Math.max(0, Math.min(1, (p - 0.55) / 0.3)).toFixed(2));
      $('#gold').setAttribute('opacity', (1 - Math.max(0, Math.min(1, (p - 0.75) / 0.2)) * 0.8).toFixed(2));
      $('#gsHalo').setAttribute('r', (130 + Math.sin(t * 1.7) * 18).toFixed(1));
      // the lamplighter's lamp blinks on its little planet
      const on = Math.floor(t / 1.5) % 2; $('#lampB').setAttribute('opacity', on); $('#lampBG').setAttribute('opacity', on * 0.8);
    },
  };
}
