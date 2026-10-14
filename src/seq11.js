// SEQ 11 — THE GOLDEN FLASH (2:00). Dawn on B612; the rose is safe. Gold runs along every line still unfinished —
// the rest of the back, the pencilled leg — a flash, and the sheep is whole. The ghosts fill in with colour too,
// smile, and fade like warm light ("Not bad, kid."). Then wings: the birds bring the boy home.
// "That is exactly the way I wanted it."
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {kitCss, kitHtml, kitSetup, INK, SMILE, BIG, OH, SAYD, SAD, FIRM, WORRY, TALK_B, REST_B, SMILE_B, BIG_B, SAD_B, OH_B} from './planetkit.js';
import {GIANT_SVG, GIANT_DEFS} from './seq10.js';

export const DURATION = 116;
const R = 40000, CX = 1200, CY = 880 + 40000;
const k = (y) => 0.6 * (y - 430) / 450;
const ROSE = { x: 1472, y: 548 }, DOME = { x0: 1338, x1: 1608, y0: 378, y1: 738 };
const SH = { x: 1780, y: 860 };

const SUBS = [
  [5.6, 8.0, 'Sheep? …Sheep?', '小羊？……小羊？'],
  [21.6, 24.0, 'I’m… all here.', '我……完整了。', 'say'],
  [25.0, 27.4, 'You look… finished.', '你看起来……画完了。'],
  [28.0, 30.4, 'Not finished. Whole.', '不是画完了。是完整了。', 'say'],
  [36.0, 38.0, 'Not bad, kid.', '干得不赖，小家伙。', 'say'],
  [39.0, 43.0, 'Maybe we were never unfinished. We just forgot.', '也许我们从来没有没画完。只是忘了。', 'say'],
  [44.0, 46.6, 'Mm. Keep watch, little one.', '嗯。好好守着，小家伙。', 'say'],
  [54.0, 56.0, 'They were your friends.', '他们是你的朋友。'],
  [56.6, 58.4, 'They still are.', '现在也是。', 'say'],
  [67.6, 68.8, 'Sheep!', '小羊！'],
  [69.4, 70.6, 'Boy!', '男孩！', 'say'],
  [77.6, 79.8, 'You kept her safe.', '你保护了她。'],
  [80.4, 82.4, 'I ate a forest.', '我吃掉了一片森林。', 'say'],
  [85.0, 88.6, 'That is exactly the way I wanted it.', '这正是我想要的样子。'],
  [92.0, 94.0, 'Welcome home.', '欢迎回家。'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('') + 'The End 完';

export const css = kitCss('#f6d9b8') + `
#stake{display:none}
#warmD{position:absolute;inset:0;pointer-events:none;background:#ffb24a;mix-blend-mode:soft-light;opacity:.25}
#flash{position:absolute;inset:0;pointer-events:none;opacity:0;mix-blend-mode:screen;background:radial-gradient(ellipse at 70% 75%,#fffdf0,#ffe9a8 40%,rgba(255,220,140,0) 80%)}
#subs .en,#subs .zh{text-shadow:0 0 4px rgba(40,20,10,.95),0 0 12px rgba(40,20,10,.85),0 0 28px rgba(40,20,10,.6)}
`;

export const html = (IMG) => kitHtml({
  IMG, noSky: 1, noTex: 1, R, CX, CY,
  planet: `<circle r="10" fill="none"/>`,
  defs: `<radialGradient id="roseFeather"><stop offset=".6" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
    <mask id="roseMask" maskUnits="userSpaceOnUse" x="1300" y="380" width="350" height="350"><circle cx="${ROSE.x}" cy="${ROSE.y}" r="110" fill="url(#roseFeather)"/></mask>
    <radialGradient id="roseGlowG"><stop offset="0" stop-color="#ffd0d8" stop-opacity=".9"/><stop offset="1" stop-color="#ff90a8" stop-opacity="0"/></radialGradient>
    <radialGradient id="auraG"><stop offset="0" stop-color="#fffbe8" stop-opacity="1"/><stop offset=".35" stop-color="#ffe08a" stop-opacity=".7"/><stop offset="1" stop-color="#ffc04a" stop-opacity="0"/></radialGradient>
    ${GIANT_DEFS}`,
  sky: `<image id="plate" href="${IMG}plate_b612.jpg" x="0" y="0" width="2400" height="1005" preserveAspectRatio="none"/>
    <circle id="roseGlow" cx="${ROSE.x}" cy="${ROSE.y}" r="150" fill="url(#roseGlowG)" opacity="0" style="mix-blend-mode:screen"/>
    <g id="roseHead" mask="url(#roseMask)"><image href="${IMG}plate_b612.jpg" x="0" y="0" width="2400" height="1005" preserveAspectRatio="none"/></g>`,
  back: GIANT_SVG + `<circle id="aura" r="320" fill="url(#auraG)" opacity="0" style="mix-blend-mode:screen"/>`,
  front: `<g id="sparks"></g>`,
  overlay: `<div id="warmD"></div><div id="flash"></div>`,
});

export function setup() {
  const K = kitSetup({ R, CX, CY, SUBS, halfBack: 1 });
  const { tl, cam, A, B, S, G, talkS, talkB, talkG, blinkS, blinkB, $, $$, mk } = K;
  const X = { rose: 0, glow: 0, gold: 0 };
  const at = (o, x, y, m = 1) => ({ x, up: 880 - y, s: k(y) * m });
  // colour copies of the ghosts (the sheep they were), to fade in over the grey ones
  [1, 2, 3].forEach((n) => { const u = mk('use', $('#gf' + n), { href: '#G' + n, id: 'gc' + n, opacity: 0 }); });
  tl.set('#giantGrow', { scaleY: 1, scaleX: 1, svgOrigin: '0 0' }, 0).set('#giantFall', { rotation: 86, svgOrigin: '0 0' }, 0).set(['#gRoot1', '#gRoot2'], { opacity: 0.9 }, 0);
  tl.set(A.sheep, { inBox: 0, ...at(A.sheep, SH.x, SH.y), flip: 0 }, 0).set(A.box, { on: 1, x: -400 }, 0).set(S('body'), { scaleY: 0.86 }, 0).set([S('lidL'), S('lidR')], { scaleY: 1 }, 0)
    .set('#S-walk', { rotation: 0, svgOrigin: '0 0' }, 0);
  [[SH.x + 150, SH.y - 30], [SH.x + 230, SH.y], [SH.x + 300, SH.y - 60]].forEach(([x, y], i) => tl.set(A.g[i], { ...at(A.g[i], x, y, 0.75), op: 0.35, flip: 0 }, 0));
  tl.set(A.st, { carry: 1, lift: 1400, liftX: 900, stakeX: 700, slack: 1 }, 0).set(A.boy, { x: 600, s: 0.95 }, 0).set(B('armR'), { rotation: -160 }, 0).set(B('armL'), { rotation: 20 }, 0);
  tl.set('#fade', { opacity: 1 }, 0).to('#fade', { opacity: 0, duration: 3 }, 0.3);
  tl.set(cam, { cx: 1640, cy: 640, s: 1.3 }, 0).to(cam, { cx: 1700, cy: 680, s: 1.6, duration: 8, ease: 'sine.inOut' }, 0.5);
  const roseTalk = (a, d, lean = 4) => { tl.to(X, { glow: 1, duration: 0.4 }, a).to(X, { glow: 0, duration: 0.8 }, a + d); tl.to(X, { rose: lean, duration: 0.6 }, a).to(X, { rose: 0, duration: 0.8 }, a + d); };
  // ---- 0–20 dawn; she calls; it wakes; the gold ----
  roseTalk(5.6, 2.4, -5);
  tl.to(S('lidL'), { scaleY: 0.3, duration: 0.4 }, 8.6).to(S('mouth'), { attr: { d: SMILE }, duration: 0.4 }, 9.0).to(S('lidR'), { scaleY: 0.4, duration: 0.4 }, 9.8);
  tl.to(S('body'), { scaleY: 1, duration: 0.8, ease: 'sine.inOut' }, 11.0).to('#S-walk', { rotation: 6, duration: 0.3, yoyo: true, repeat: 3 }, 11.2).to([S('lidL'), S('lidR')], { scaleY: 0, duration: 0.3 }, 12.2);
  tl.to(cam, { cx: SH.x - 30, cy: 720, s: 2.3, duration: 4, ease: 'sine.inOut' }, 12.6);
  tl.to(X, { gold: 1, duration: 3 }, 13.0);
  tl.to(S('body') + ' .trace', { opacity: 1, duration: 1.2 }, 14.0).to(S('legHN') + ' .trace', { opacity: 1, duration: 1.2 }, 15.6)
    .to(['#S-rimBody', '#S-rimHead'], { opacity: 1, duration: 2 }, 14.0).to('#aura', { opacity: 0.8, duration: 3 }, 15.0);
  tl.to('#flash', { opacity: 1, duration: 0.25 }, 18.8).to('#flash', { opacity: 0, duration: 2.2 }, 19.1);
  tl.set(S('legHN') + ' .pencil', { opacity: 0 }, 19.0).set(S('legHN') + ' .finish-leg', { opacity: 1 }, 19.0).set('#S-finishBack', { attr: { 'clip-path': '' } }, 19.0)
    .to([S('body') + ' .trace', S('legHN') + ' .trace'], { opacity: 0, duration: 3 }, 19.6).to('#aura', { opacity: 0.35, duration: 4 }, 20.0);
  tl.to(A.st, { shake: 0.25, duration: 0.05 }, 18.9).to(A.st, { shake: 0, duration: 0.8 }, 19.0);
  tl.to(S('head'), { rotation: -14, duration: 0.6 }, 20.4).set(A.sheep, { flip: 1 }, 20.8).to(S('eyes'), { x: 10, y: 8, duration: 0.3 }, 20.8).to(S('mouth'), { attr: { d: OH }, duration: 0.3 }, 20.8);
  talkS(21.6, 2.4, OH);
  tl.set(A.sheep, { flip: 0 }, 24.2).to(S('head'), { rotation: 0, duration: 0.5 }, 24.2).to(S('eyes'), { x: 0, y: 0, duration: 0.3 }, 24.2);
  tl.to(cam, { cx: 1620, cy: 650, s: 1.45, duration: 3, ease: 'sine.inOut' }, 24.0);
  roseTalk(25.0, 2.4, 6);
  talkS(28.0, 2.4, BIG);
  // ---- 30–52 the ghosts fill in and fade into light ----
  tl.to(cam, { cx: 1700, cy: 640, s: 1.5, duration: 3, ease: 'sine.inOut' }, 30.4);
  A.g.forEach((g, i) => tl.to(g, { op: 1, duration: 1.5 }, 31.0 + i * 0.4));
  [1, 2, 3].forEach((n, i) => tl.to('#gc' + n, { opacity: 1, duration: 2.5 }, 32.0 + i * 0.6));
  tl.to('#aura', { opacity: 0.6, duration: 2 }, 31.0);
  talkG(2, 36.0, 2.0, SMILE); tl.to(G(2, 'head'), { rotation: -10, duration: 0.5 }, 35.6).to(G(2, 'lids'), { attr: { opacity: 1 }, duration: 0.01 }, 38.2).to(G(2, 'lids'), { attr: { opacity: 0 }, duration: 0.01 }, 38.5);
  talkG(1, 39.0, 4.0, SMILE);
  talkG(3, 44.0, 2.6, SMILE);
  A.g.forEach((g, i) => tl.to(g, { up: 880 - [SH.y - 30, SH.y, SH.y - 60][i] + 260, op: 0, duration: 5, ease: 'sine.in' }, 47.0 + i * 0.5));
  [1, 2, 3].forEach((n) => tl.to('#gc' + n, { opacity: 0, duration: 4 }, 48.0));
  tl.to(cam, { cx: 1640, cy: 540, s: 1.3, duration: 5, ease: 'sine.inOut' }, 47.0);
  tl.to(S('head'), { rotation: 14, duration: 1 }, 47.4).to(S('eyes'), { x: -6, y: -10, duration: 0.5 }, 47.4);
  // ---- 52–60 alone with the rose ----
  tl.to(cam, { cx: 1620, cy: 640, s: 1.4, duration: 3, ease: 'sine.inOut' }, 52.0).to(S('head'), { rotation: 0, duration: 0.8 }, 52.4).to(S('eyes'), { x: 0, y: 0, duration: 0.4 }, 52.4);
  roseTalk(54.0, 2.0, 3); talkS(56.6, 1.8, SMILE);
  tl.to('#aura', { opacity: 0.2, duration: 6 }, 54.0);
  // ---- 60–90 wings: the boy comes home ----
  tl.to(cam, { cx: 1300, cy: 560, s: 1.0, duration: 4, ease: 'sine.inOut' }, 59.6);
  tl.to(A.st, { lift: 0, liftX: 0, duration: 7, ease: 'power2.out' }, 59.0).to(B('legL'), { rotation: 10, duration: 0.6, yoyo: true, repeat: 9, ease: 'sine.inOut' }, 59.0);
  tl.set(A.sheep, { flip: 0 }, 61.0).to(S('head'), { rotation: 12, duration: 0.6 }, 61.0).to(S('eyes'), { x: -10, y: -8, duration: 0.4 }, 61.0).to(S('mouth'), { attr: { d: OH }, duration: 0.3 }, 62.0);
  tl.to(A.st, { carry: 0, duration: 2.4, ease: 'sine.inOut' }, 66.0).to(B('armR'), { rotation: 0, duration: 0.8 }, 66.2).to(B('armL'), { rotation: 0, duration: 0.6 }, 66.0);
  talkB(67.6, 1.2, BIG_B);
  talkS(69.4, 1.2, BIG);
  tl.to(A.st, { boyWalk: 1, duration: 0.2 }, 68.4).to(A.boy, { x: 1330, duration: 3.2, ease: 'sine.inOut' }, 68.4).to(A.st, { boyWalk: 0, duration: 0.2 }, 71.4);
  tl.to(A.sheep, { walk: 1, duration: 0.2 }, 69.6).to(A.sheep, { x: 1470, duration: 2.0, ease: 'sine.inOut' }, 69.6).to(A.sheep, { walk: 0, duration: 0.2 }, 71.4);
  tl.to(cam, { cx: 1420, cy: 640, s: 1.5, duration: 3, ease: 'sine.inOut' }, 69.0);
  // the hug
  tl.to([B('legL'), B('legR')], { scaleY: 0.55, duration: 0.6 }, 71.8).to(A.boy, { up: -40, duration: 0.6 }, 71.8)
    .to(B('armL'), { rotation: -60, duration: 0.6 }, 72.0).to(B('armR'), { rotation: 60, duration: 0.6 }, 72.0).to(B('mouth'), { attr: { d: BIG_B }, duration: 0.3 }, 72.0);
  tl.to(S('head'), { rotation: -8, duration: 0.5 }, 72.2).to([S('lidL'), S('lidR')], { scaleY: 0.8, duration: 0.5 }, 72.4).to(S('mouth'), { attr: { d: BIG }, duration: 0.3 }, 72.4);
  tl.to(cam, { cx: 1420, cy: 700, s: 2.0, duration: 3, ease: 'sine.inOut' }, 72.0);
  // he looks: the rose safe, the fallen giant, the sheep — whole and shining
  tl.to(B('head'), { rotation: 12, duration: 0.6 }, 75.0).to(B('eyes'), { x: 8, y: -4, duration: 0.3 }, 75.0).to([S('lidL'), S('lidR')], { scaleY: 0, duration: 0.3 }, 75.0)
    .to(B('eyes'), { x: 10, y: 2, duration: 0.3 }, 76.2).to(B('head'), { rotation: 0, duration: 0.5 }, 77.0).to(B('eyes'), { x: 4, y: 4, duration: 0.3 }, 77.0);
  tl.to(cam, { cx: 1480, cy: 660, s: 1.6, duration: 3, ease: 'sine.inOut' }, 75.4);
  talkB(77.6, 2.2, SMILE_B);
  talkS(80.4, 2.0, BIG);
  tl.to(B('mouth'), { attr: { d: BIG_B }, duration: 0.2 }, 82.6).to(B('head'), { rotation: -6, duration: 0.2, yoyo: true, repeat: 5 }, 82.6);
  tl.to(cam, { cx: 1420, cy: 690, s: 1.85, duration: 3, ease: 'sine.inOut' }, 84.0);
  talkB(85.0, 3.6, SMILE_B);
  tl.to(B('armR'), { rotation: 30, duration: 0.6 }, 88.8).to(S('head'), { rotation: 12, duration: 0.6 }, 89.0).to([S('lidL'), S('lidR')], { scaleY: 0.9, duration: 0.6 }, 89.2);
  roseTalk(92.0, 2.0, 6);
  // ---- 94–116 home: the camera drifts back over the little planet ----
  tl.to(cam, { cx: 1300, cy: 560, s: 1.0, duration: 14, ease: 'sine.inOut' }, 94.0);
  tl.to('#fade', { opacity: 1, duration: 4 }, 111.5);

  const sparks = []; for (let i = 0; i < 24; i++) sparks.push(mk('path', $('#sparks'), { d: 'M0 -7 L1.6 -1.6 L7 0 L1.6 1.6 L0 7 L-1.6 1.6 L-7 0 L-1.6 -1.6Z', fill: '#fff4c8', opacity: 0 }));
  const H = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  return {
    render: (t) => {
      tl.seek(t); K.drive(t);
      $('#roseHead').setAttribute('transform', `rotate(${X.rose.toFixed(2)} ${ROSE.x} ${ROSE.y + 110})`);
      $('#roseGlow').setAttribute('opacity', (X.glow * 0.5).toFixed(2));
      const sx = A.sheep.x, sy = 880 - A.sheep.up;
      $('#aura').setAttribute('cx', sx.toFixed(1)); $('#aura').setAttribute('cy', (sy - 90).toFixed(1));
      // golden sparks around the sheep, then rising with the ghosts
      sparks.forEach((p, i) => {
        let u, x, y, o;
        if (i < 14) { u = ((t - 13) * 0.35 + H(i)) % 1; x = sx + (H(i + 3) - 0.5) * 260; y = sy - 40 - u * 220; o = t > 13 && t < 60 ? Math.sin(Math.PI * u) * X.gold : 0; }
        else { const g = A.g[i % 3]; u = ((t - 46) * 0.3 + H(i)) % 1; x = g.x + (H(i + 5) - 0.5) * 120; y = 880 - g.up - 60 - u * 160; o = t > 46 && t < 56 ? Math.sin(Math.PI * u) : 0; }
        p.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(0.6 + H(i + 9)).toFixed(2)})`); p.setAttribute('opacity', Math.max(0, o).toFixed(2));
      });
    },
  };
}
