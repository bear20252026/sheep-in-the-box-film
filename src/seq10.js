// SEQ 10 — THE ROSE AND THE NIGHT OF SPROUTS (3:50). B612 at dawn, on the short's own painted plate.
// The sheep meets the Rose ("Do sheep eat flowers?" "…Yes." "A good sheep keeps flowers safe."). They wait for the boy
// all day. At night the ground cracks: one sprout, three, dozens of baobabs. The sheep eats and eats; the ghosts join in.
// Before dawn one GIANT sprout erupts at the foot of the glass. Exhausted, the sheep bites, pulls — and it falls.
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {kitCss, kitHtml, kitSetup, INK, SMILE, BIG, OH, SAYD, SAD, FIRM, WORRY} from './planetkit.js';

export const DURATION = 230;
const R = 40000, CX = 1200, CY = 880 + 40000;   // flat ground along y = 880 (the plate's foreground grass)
const k = (y) => 0.6 * (y - 430) / 450;           // depth scale: y 880 → 0.6
const ROSE = { x: 1472, y: 548 }, DOME = { x0: 1338, x1: 1608, y0: 378, y1: 738 };
const REST = { x: 1250, y: 880 };

const SUBS = [
  [10.4, 12.2, 'Hello? Boy?', '有人吗？男孩？', 'say'],
  [18.0, 20.0, 'Oh! A sheep.', '哦！一只羊。'],
  [21.0, 23.4, 'Do sheep eat flowers?', '羊吃花吗？'],
  [25.0, 26.4, '…Yes.', '……吃。', 'say'],
  [27.6, 31.0, 'I have four thorns. I’m very dangerous.', '我有四根刺。我很危险的。'],
  [32.4, 36.4, 'Then you’re safe. A good sheep keeps flowers safe.', '那你就安全了。好羊会守护花。', 'say'],
  [37.6, 39.6, '…You’re a strange sheep.', '……你真是只奇怪的羊。'],
  [40.0, 43.2, 'I’m half a sheep. The rest is still coming.', '我只是半只羊。剩下的还在路上。', 'say'],
  [44.0, 48.4, 'I’m only one flower. But he says I’m unique in all the world.', '我只是一朵花。可他说，我是世界上独一无二的。'],
  [49.0, 51.0, 'He said that? About you?', '他这么说？说你？', 'say'],
  [51.6, 53.6, 'He talks about me a lot.', '他常常说起我。'],
  [54.2, 56.6, 'He talks about you ALL the time.', '他一直一直在说你。', 'say'],
  [59.0, 61.4, 'So this is the famous flower.', '原来这就是那朵出名的花。', 'say'],
  [62.0, 64.0, 'Are those… ghosts?', '那些是……鬼魂？'],
  [64.6, 67.0, 'Relax. We don’t eat flowers either.', '放心。我们也不吃花。', 'say'],
  [67.4, 69.6, 'Mm. We don’t eat anything.', '嗯。我们什么都不吃。', 'say'],
  [78.0, 80.0, 'Is he coming?', '他会来吗？'],
  [81.0, 82.6, 'He’ll come.', '他会来的。', 'say'],
  [86.0, 88.6, 'There’s grass, you know. Eat some.', '这里有草的。吃一点吧。'],
  [96.0, 98.4, 'Will you keep watch tonight?', '今晚你会守着吗？'],
  [99.0, 100.4, 'All night.', '守一整夜。', 'say'],
  [108.0, 109.6, 'A baobab!', '猴面包树！', 'say'],
  [111.6, 113.0, 'What was that?', '那是什么声音？'],
  [113.6, 115.4, 'Nothing. Go to sleep.', '没什么。睡吧。', 'say'],
  [128.0, 130.0, 'The ground is moving!', '地在动！'],
  [130.6, 132.4, 'Stay under your glass!', '待在你的玻璃罩里！', 'say'],
  [135.6, 137.0, 'Over there! A-CHOO!', '那边！阿——嚏！', 'say'],
  [141.0, 143.0, 'That one was in my way.', '那棵挡我的路了。', 'say'],
  [145.0, 147.6, 'Left. No — your other left.', '左边。不对——另一个左边。', 'say'],
  [180.0, 181.2, 'Sheep!', '小羊！'],
  [183.0, 185.0, 'Not… her.', '不许……碰她。', 'say'],
  [195.6, 196.8, 'PULL!', '拉！', 'say'],
  [207.0, 209.4, '…You kept me safe.', '……你保护了我。'],
  [210.4, 212.2, 'That’s my job.', '这是我的工作。', 'say'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('');

// sprouts: x, y, appears, ends, how ('eat' by the sheep, 'sneeze', 'ram')
const SP = [
  [880, 900, 106.0, 109.8, 'eat'],
  [700, 862, 117.6, 120.6, 'eat'], [1060, 932, 118.0, 123.8, 'eat'], [1900, 892, 118.4, 127.2, 'eat'],
  [560, 910, 125.6, 130.8, 'eat'], [2050, 848, 126.0, 137.4, 'sneeze'], [1180, 900, 126.4, 134.2, 'eat'],
  [760, 830, 126.8, 140.2, 'ram'], [1760, 930, 127.2, 138.0, 'eat'], [430, 860, 127.6, 141.6, 'eat'],
  [980, 850, 128.0, 145.0, 'eat'], [1990, 920, 128.4, 148.6, 'eat'], [620, 940, 128.8, 152.2, 'eat'],
  [1700, 860, 129.2, 155.8, 'eat'], [880, 925, 129.6, 159.6, 'eat'], [1240, 852, 130.0, 163.4, 'eat'],
  [520, 885, 130.4, 167.4, 'eat'], [2140, 900, 130.8, 171.4, 'eat'],
];
const GIANT = { x: 1650, y: 772 };

export const css = kitCss('#f6d9b8') + `
#byPos,#birds,#strings,#stake{display:none}
#nightC{position:absolute;inset:0;pointer-events:none;background:#16205a;mix-blend-mode:multiply;opacity:0}
#warmD{position:absolute;inset:0;pointer-events:none;background:#ffb24a;mix-blend-mode:soft-light;opacity:.2}
#whiteIn{position:absolute;inset:0;pointer-events:none;background:#fff1dc;opacity:1}
#subs .en,#subs .zh{text-shadow:0 0 4px rgba(40,20,10,.95),0 0 12px rgba(40,20,10,.85),0 0 28px rgba(40,20,10,.6)}
`;

const sprout = (i) => `<g id="sp${i}"><g filter="url(#wcPl)"><g class="grow">
  <path d="M-9 4 C-11 -30 -6 -62 -3 -84 L5 -84 C9 -60 12 -30 10 4Z" fill="#6f8f3c" stroke="#3f4f22" stroke-width="3.5"/>
  <path d="M-3 -70 C-30 -96 -62 -88 -70 -66 C-48 -54 -22 -56 -3 -70Z" fill="#7da447" stroke="#3f4f22" stroke-width="3.5"/>
  <path d="M3 -78 C26 -108 60 -104 70 -82 C46 -66 20 -66 3 -78Z" fill="#88b04f" stroke="#3f4f22" stroke-width="3.5"/>
  <path d="M1 -84 C-8 -110 2 -128 12 -134 C20 -114 14 -96 1 -84Z" fill="#94bb58" stroke="#3f4f22" stroke-width="3.2"/></g></g>
  <ellipse class="dirt" cx="0" cy="4" rx="30" ry="7" fill="#6d5236" opacity="0"/></g>`;

export const GIANT_SVG = `<g id="giant" transform="translate(1650 772)"><g id="giantFall"><g id="giantGrow">
      <g filter="url(#wcPl)">
      <path d="M-34 4 C-44 -50 -30 -110 -18 -150 C-14 -190 -16 -230 -8 -262 L10 -262 C16 -230 14 -190 20 -150 C34 -110 46 -50 36 4Z" fill="url(#gStemG)" stroke="#2e3a1a" stroke-width="5"/>
      <path d="M-20 -30 C-26 -70 -18 -110 -10 -140 M14 -40 C18 -80 14 -120 8 -150" fill="none" stroke="#3e4e24" stroke-width="3" opacity=".7"/>
      <path d="M-14 -150 C-70 -170 -130 -150 -170 -110 C-120 -96 -60 -110 -14 -150Z" fill="url(#gLeafG)" stroke="#2e3a1a" stroke-width="4"/>
      <path d="M-20 -150 C-70 -150 -110 -136 -150 -114" fill="none" stroke="#2e3a1a" stroke-width="2.5"/>
      <path d="M14 -190 C70 -230 140 -220 176 -180 C120 -160 60 -166 14 -190Z" fill="url(#gLeafG)" stroke="#2e3a1a" stroke-width="4"/>
      <path d="M20 -192 C70 -200 120 -196 160 -184" fill="none" stroke="#2e3a1a" stroke-width="2.5"/>
      <path d="M-8 -226 C-60 -270 -120 -270 -150 -240 C-100 -216 -50 -212 -8 -226Z" fill="url(#gLeafG)" stroke="#2e3a1a" stroke-width="4"/>
      <path d="M6 -258 C20 -310 60 -340 96 -336 C86 -296 50 -268 6 -258Z" fill="url(#gLeafG)" stroke="#2e3a1a" stroke-width="4"/>
      <path d="M-2 -262 C-24 -306 -16 -350 4 -366 C20 -334 18 -298 -2 -262Z" fill="url(#gLeafG)" stroke="#2e3a1a" stroke-width="4"/>
      <path d="M18 -120 C60 -130 96 -116 116 -92 C80 -84 46 -96 18 -120Z" fill="url(#gLeafG)" stroke="#2e3a1a" stroke-width="3.5"/>
      </g></g></g>
      <path id="gRoot1" d="M-20 6 C-80 10 -140 0 -210 -10" stroke="url(#rootG)" stroke-width="14" fill="none" stroke-linecap="round"/>
      <path id="gRoot2" d="M-10 10 C-60 30 -120 26 -170 20" stroke="url(#rootG)" stroke-width="9" fill="none" stroke-linecap="round"/></g>`;
export const GIANT_DEFS = `<linearGradient id="gStemG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7a8a48"/><stop offset=".5" stop-color="#5a6e34"/><stop offset="1" stop-color="#3a4a24"/></linearGradient>
    <linearGradient id="gLeafG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a9a48"/><stop offset="1" stop-color="#3e5a2a"/></linearGradient>
    <linearGradient id="rootG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#5a4030"/><stop offset="1" stop-color="#7a5a40"/></linearGradient>`;

export const html = (IMG) => kitHtml({
  IMG, noSky: 1, noTex: 1, R, CX, CY,
  planet: `<circle r="10" fill="none"/>`,
  defs: `<radialGradient id="roseFeather"><stop offset=".6" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient><mask id="roseMask" maskUnits="userSpaceOnUse" x="1300" y="380" width="350" height="350"><circle cx="${ROSE.x}" cy="${ROSE.y}" r="110" fill="url(#roseFeather)"/></mask>
    <clipPath id="domeClip"><path d="M${DOME.x0} ${DOME.y1} L${DOME.x0} 520 Q${DOME.x0} ${DOME.y0} ${(DOME.x0 + DOME.x1) / 2} ${DOME.y0} Q${DOME.x1} ${DOME.y0} ${DOME.x1} 520 L${DOME.x1} ${DOME.y1}Z"/></clipPath>
    <radialGradient id="roseGlowG"><stop offset="0" stop-color="#ffd0d8" stop-opacity=".9"/><stop offset="1" stop-color="#ff90a8" stop-opacity="0"/></radialGradient>
    ${GIANT_DEFS}`,
  sky: `<image id="plate" href="${IMG}plate_b612.jpg" x="0" y="0" width="2400" height="1005" preserveAspectRatio="none"/>
    <g id="nstars" opacity="0"></g>
    <g id="domeShake" clip-path="url(#domeClip)"><image class="pl2" href="${IMG}plate_b612.jpg" x="0" y="0" width="2400" height="1005" preserveAspectRatio="none"/></g>
    <circle id="roseGlow" cx="${ROSE.x}" cy="${ROSE.y}" r="150" fill="url(#roseGlowG)" opacity="0" style="mix-blend-mode:screen"/>
    <g id="roseHead" mask="url(#roseMask)"><image class="pl2" href="${IMG}plate_b612.jpg" x="0" y="0" width="2400" height="1005" preserveAspectRatio="none"/></g>`,
  back: `<g id="cracks" fill="none" stroke="#4d3a28" stroke-width="4" stroke-linecap="round"></g>
    ${GIANT_SVG}
    ${SP.map((_, i) => sprout(i)).join('')}`,
  front: `<g id="bits"></g>`,
  overlay: `<div id="warmD"></div><div id="nightC"></div><div id="whiteIn"></div>`,
});

export function setup() {
  const K = kitSetup({ R, CX, CY, SUBS, halfBack: 1 });
  const { tl, cam, A, S, G, talkS, talkG, blinkS, $, $$, mk } = K;
  const X = { night: 0, quake: 0, rose: 0, tremble: 0, glow: 0, bx: 1060, by: 905, br: -22, rootL: 0 };
  // sheep / ghosts at depth: a position on the plate (x, y) becomes kit x / up / scale
  const at = (o, x, y) => ({ x, up: 880 - y, s: k(y) * (o === A.sheep ? 1 : 0.75) });
  tl.set(A.sheep, { inBox: 1, up: 70, x: 1060, s: 0.6, flip: 0 }, 0).set(A.box, { on: 1 }, 0);
  A.g.forEach((g, i) => tl.set(g, { op: 0, flip: 0 }, 0));
  SP.forEach((_, i) => tl.set(`#sp${i} .grow`, { scaleY: 0, svgOrigin: '0 4' }, 0).set(`#sp${i}`, { opacity: 1 }, 0));
  tl.set('#giantGrow', { scaleY: 0, scaleX: 0.6, svgOrigin: '0 0' }, 0).set('#giantFall', { rotation: 0, svgOrigin: '0 0' }, 0).set(['#gRoot1', '#gRoot2'], { strokeDasharray: 240, strokeDashoffset: 240 }, 0);
  tl.set('#S-walk', { rotation: 0, svgOrigin: '0 0' }, 0);
  tl.set('#fade', { opacity: 0 }, 0).to('#whiteIn', { opacity: 0, duration: 4, ease: 'sine.out' }, 0);
  tl.set(cam, { cx: 1180, cy: 640, s: 1.05 }, 0).to(cam, { cx: 1120, cy: 700, s: 1.35, duration: 7, ease: 'sine.inOut' }, 1);
  const roseTalk = (a, d, lean = 4) => { tl.to(X, { glow: 1, duration: 0.4 }, a).to(X, { glow: 0, duration: 0.8 }, a + d); tl.to(X, { rose: lean, duration: 0.6, ease: 'sine.inOut' }, a).to(X, { rose: 0, duration: 0.8, ease: 'sine.inOut' }, a + d); };
  [6, 15, 24, 39.6, 53, 75, 90].forEach(blinkS);

  // ---- 0–16 the box in the grass; out crawls the sheep ----
  tl.to(A.sheep, { up: -10, duration: 0.6, ease: 'back.out(2)' }, 6.2).to(A.sheep, { up: 70, duration: 0.3 }, 7.2);
  tl.set(A.sheep, { inBox: 0, ...at(A.sheep, 1130, 905), flip: 1 }, 8.0).set(S('body'), { scaleY: 0.75 }, 8.0).to(S('body'), { scaleY: 1, duration: 1.2 }, 8.2)
    .to(X, { br: -8, duration: 0.6 }, 8.0);
  tl.to('#S-walk', { rotation: 8, duration: 0.3, yoyo: true, repeat: 3, ease: 'sine.inOut' }, 8.6);
  tl.to(S('eyes'), { x: 10, y: -6, duration: 0.4 }, 9.6).to(S('eyes'), { x: -10, y: -6, duration: 0.4 }, 11.0);
  talkS(10.4, 1.8, WORRY);
  // it sees the rose
  tl.to(cam, { cx: 1340, cy: 640, s: 1.2, duration: 3, ease: 'sine.inOut' }, 12.6);
  tl.to(S('eyes'), { x: 12, y: -8, duration: 0.3 }, 13.0).to(S('mouth'), { attr: { d: OH }, duration: 0.3 }, 13.0);
  tl.to(A.sheep, { walk: 0.8, duration: 0.2 }, 14.0).to(A.sheep, { x: REST.x, up: 0, s: k(REST.y), duration: 2.4, ease: 'sine.inOut' }, 14.0).to(A.sheep, { walk: 0, duration: 0.2 }, 16.2);
  tl.to(cam, { cx: 1380, cy: 620, s: 1.45, duration: 3, ease: 'sine.inOut' }, 16.0);
  // ---- 18–70 the Rose ----
  roseTalk(18.0, 2.0); roseTalk(21.0, 2.4, -3);
  tl.to(S('mouth'), { attr: { d: WORRY }, duration: 0.3 }, 23.6).to(S('head'), { rotation: -10, duration: 0.6 }, 23.6);
  tl.to(S('body'), { scaleY: 0.96, duration: 0.12, yoyo: true, repeat: 3 }, 24.2);   // tummy rumble
  talkS(25.0, 1.4, SAD);
  tl.to(X, { tremble: 1, duration: 0.3 }, 26.4).to(X, { tremble: 0, duration: 0.6 }, 31.2); roseTalk(27.6, 3.4, 6);
  tl.to(S('head'), { rotation: 6, duration: 0.6 }, 32.0).to(S('mouth'), { attr: { d: SMILE }, duration: 0.3 }, 32.0);
  talkS(32.4, 4.0, SMILE);
  tl.to(cam, { cx: 1400, cy: 640, s: 1.6, duration: 4, ease: 'sine.inOut' }, 34.0);
  roseTalk(37.6, 2.0, 2);
  tl.to(S('head'), { rotation: -4, duration: 0.6 }, 39.8);
  talkS(40.0, 3.2, SMILE);
  roseTalk(44.0, 4.4, 5);
  tl.to(S('eyes'), { x: 10, y: -10, duration: 0.3 }, 48.8).to(S('mouth'), { attr: { d: OH }, duration: 0.2 }, 48.8); talkS(49.0, 2.0, OH);
  roseTalk(51.6, 2.0, 7);
  talkS(54.2, 2.4, BIG);
  // the ghosts
  [[1060, 860], [990, 900], [1130, 830]].forEach(([x, y], i) => tl.set(A.g[i], { ...at(A.g[i], x, y), flip: 1 }, 0).to(A.g[i], { op: 0.6, duration: 1.6 }, 57.6 + i * 0.4));
  tl.to(cam, { cx: 1260, cy: 640, s: 1.3, duration: 3, ease: 'sine.inOut' }, 57.4);
  talkG(1, 59.0, 2.4, SMILE);
  tl.to(X, { tremble: 0.6, duration: 0.2 }, 61.8).to(X, { tremble: 0, duration: 0.4 }, 64.2); roseTalk(62.0, 2.0, -6);
  talkG(2, 64.6, 2.4, FIRM);
  talkG(3, 67.4, 2.2, SMILE);
  // ---- 70–100 waiting all day; evening ----
  tl.to(cam, { cx: 1300, cy: 560, s: 1.05, duration: 6, ease: 'sine.inOut' }, 70.0);
  tl.set(A.sheep, { flip: 1 }, 72.0).to(S('head'), { rotation: 18, duration: 1 }, 72.0).to(S('eyes'), { x: 6, y: -12, duration: 0.5 }, 72.0);
  A.g.forEach((g, i) => tl.to(g, { op: 0.3, duration: 3 }, 72 + i));
  roseTalk(78.0, 2.0, -2);
  tl.set(A.sheep, { flip: 0 }, 80.6); talkS(81.0, 1.6, FIRM);
  tl.to(S('body'), { scaleY: 0.96, duration: 0.12, yoyo: true, repeat: 3 }, 83.6);
  roseTalk(86.0, 2.6, 4);
  // it nibbles grass, happily
  tl.to(S('head'), { rotation: -26, duration: 0.5 }, 89.0);
  for (let a = 89.6; a < 92.6; a += 0.5) tl.set(S('mouth'), { attr: { d: BIG } }, a).set(S('mouth'), { attr: { d: SMILE } }, a + 0.25);
  tl.to(S('head'), { rotation: 0, duration: 0.6 }, 93.0).to([S('lidL'), S('lidR')], { scaleY: 0.5, duration: 0.5 }, 93.0);
  tl.to(X, { night: 1, duration: 10, ease: 'sine.inOut' }, 90.0);
  tl.to(cam, { cx: 1400, cy: 650, s: 1.5, duration: 4, ease: 'sine.inOut' }, 94.0);
  roseTalk(96.0, 2.4, 3);
  tl.to([S('lidL'), S('lidR')], { scaleY: 0, duration: 0.3 }, 98.6); talkS(99.0, 1.4, FIRM);
  tl.to(S('body'), { scaleY: 0.9, duration: 1 }, 101.0).to(A.sheep, { up: -6, duration: 1 }, 101.0);   // it sits, on watch
  tl.to(cam, { cx: 1200, cy: 640, s: 1.15, duration: 4, ease: 'sine.inOut' }, 101.0);

  // ---- 100–176 the night of sprouts ----
  const pos = { x: REST.x, y: REST.y };
  const runTo = (a, x, y, d) => { tl.set(A.sheep, { flip: x > pos.x ? 1 : 0 }, a).to(A.sheep, { walk: 1, duration: 0.15 }, a)
    .to(A.sheep, { x, up: 880 - y, s: k(y), duration: d, ease: 'sine.inOut' }, a).to(A.sheep, { walk: 0, duration: 0.15 }, a + d - 0.1); pos.x = x; pos.y = y; };
  const chomp = (a, n = 3) => { tl.to(S('head'), { rotation: -22, duration: 0.2 }, a); for (let j = 0; j < n; j++) tl.set(S('mouth'), { attr: { d: BIG } }, a + 0.2 + j * 0.3).set(S('mouth'), { attr: { d: SMILE } }, a + 0.35 + j * 0.3); tl.to(S('head'), { rotation: 0, duration: 0.25 }, a + 0.3 + n * 0.3); };
  tl.to(S('body'), { scaleY: 1, duration: 0.3 }, 105.6).to(A.sheep, { up: 0, duration: 0.3 }, 105.6).to(S('mouth'), { attr: { d: OH }, duration: 0.2 }, 106.0);
  tl.to(A.st, { shake: 0.2, duration: 0.05 }, 106.0).to(A.st, { shake: 0, duration: 0.5 }, 106.1);
  SP.forEach(([x, y, a0, end, how], i) => {
    tl.to(`#sp${i} .dirt`, { opacity: 0.8, duration: 0.2 }, a0).to(`#sp${i} .grow`, { scaleY: 1, duration: 1.4, ease: 'back.out(1.6)' }, a0);
    tl.set(`#sp${i}`, { attr: { transform: `translate(${x} ${y}) scale(${(k(y) / 0.6 * 0.8).toFixed(3)})` } }, 0);
    if (how === 'eat') {
      const sx = x + 97 * k(y) + 8, prev = pos;
      const d = Math.max(0.5, Math.min(1.3, Math.hypot(sx - prev.x, y - prev.y) / 700));
      if (i > 0) runTo(end - 1.4 - d, sx, y, d); else { runTo(end - 2.2, sx, y, 1.2); }
      tl.set(A.sheep, { flip: 0 }, end - 1.4); chomp(end - 1.3, 3);
      tl.to(`#sp${i} .grow`, { scaleY: 0.66, duration: 0.1 }, end - 0.9).to(`#sp${i} .grow`, { scaleY: 0.33, duration: 0.1 }, end - 0.6).to(`#sp${i} .grow`, { scaleY: 0, duration: 0.1 }, end - 0.3)
        .to(`#sp${i} .dirt`, { opacity: 0, duration: 1 }, end);
    } else if (how === 'sneeze') {
      tl.to(`#sp${i} .grow`, { rotation: 70, x: 120, y: -80, duration: 0.7, ease: 'power2.out' }, end).to(`#sp${i}`, { opacity: 0, duration: 0.6 }, end + 0.5);
    } else {
      tl.to(`#sp${i} .grow`, { rotation: -90, duration: 0.5, ease: 'power2.in' }, end).to(`#sp${i}`, { opacity: 0, duration: 0.8 }, end + 0.8);
    }
  });
  talkS(108.0, 1.6, OH);
  roseTalk(111.6, 1.4, -3); talkS(113.6, 1.8, FIRM);
  tl.to(cam, { cx: 1250, cy: 620, s: 1.0, duration: 3, ease: 'sine.inOut' }, 117.0);
  // the ground shakes, the dome rattles
  tl.to(X, { quake: 1, duration: 1 }, 126.0).to(X, { quake: 0.4, duration: 4 }, 134.0).to(X, { quake: 0.15, duration: 10 }, 150.0).to(X, { quake: 0, duration: 4 }, 166.0);
  tl.to(X, { tremble: 1, duration: 0.3 }, 127.6).to(X, { tremble: 0.3, duration: 2 }, 132.0); roseTalk(128.0, 2.0, -4);
  talkS(130.6, 1.8, WORRY);
  // the ghosts join in
  A.g.forEach((g, i) => tl.to(g, { op: 0.65, duration: 1 }, 132.8 + i * 0.3));
  tl.to(A.g[0], { ...at(A.g[0], 1860, 830), flip: 1, duration: 2.2, ease: 'sine.inOut' }, 133.0);
  talkG(1, 135.6, 1.4, OH); tl.to(G(1, 'head'), { rotation: 16, duration: 0.5, ease: 'power2.in' }, 136.4).to(G(1, 'head'), { rotation: -20, duration: 0.15 }, 137.2).to(G(1, 'head'), { rotation: 0, duration: 0.6 }, 137.8);
  tl.to(A.g[1], { ...at(A.g[1], 980, 820), flip: 0, duration: 2, ease: 'sine.inOut' }, 136.6).to(A.g[1], { x: 810, duration: 0.5, ease: 'power3.in' }, 139.7).to(A.g[1], { x: 900, duration: 1, ease: 'sine.out' }, 140.3);
  talkG(2, 141.0, 2.0, FIRM);
  tl.to(A.g[2], { ...at(A.g[2], 700, 790), duration: 3, ease: 'sine.inOut' }, 141.0); talkG(3, 145.0, 2.6, SMILE);
  tl.to(cam, { cx: 1220, cy: 620, s: 1.0, duration: 8, ease: 'sine.inOut' }, 140.0);
  // it slows down, full and tired
  tl.to([S('lidL'), S('lidR')], { scaleY: 0.35, duration: 4 }, 160.0).to(S('mouth'), { attr: { d: SAYD }, duration: 0.5 }, 172.0);
  tl.to(S('body'), { scaleY: 0.92, duration: 1.2 }, 173.0);
  // ---- 176–203 the giant ----
  tl.to(A.st, { shake: 0.8, duration: 0.1 }, 176.0).to(A.st, { shake: 0.3, duration: 3 }, 176.2).to(A.st, { shake: 0, duration: 2 }, 186.0);
  tl.to('#giantGrow', { scaleY: 1, scaleX: 1, duration: 3.2, ease: 'power2.out' }, 176.2).to(['#gRoot1', '#gRoot2'], { strokeDashoffset: 0, duration: 4, ease: 'sine.inOut' }, 177.0);
  tl.to(X, { quake: 1, duration: 0.4 }, 176.0).to(X, { quake: 0.5, duration: 6 }, 177.0).to(X, { quake: 0, duration: 1 }, 200.6);
  tl.to(cam, { cx: 1520, cy: 560, s: 1.25, duration: 2.5, ease: 'sine.inOut' }, 176.6);
  tl.to(X, { tremble: 1, duration: 0.2 }, 178.0).to(X, { tremble: 0, duration: 1 }, 201.0); roseTalk(180.0, 1.2, -8);
  tl.to(S('body'), { scaleY: 1, duration: 0.4 }, 182.0).to([S('lidL'), S('lidR')], { scaleY: 0, duration: 0.2 }, 182.4).to(S('mouth'), { attr: { d: FIRM }, duration: 0.2 }, 182.4);
  talkS(183.0, 2.0, FIRM);
  const gS = { x: GIANT.x + 97 * k(GIANT.y + 6) + 30, y: GIANT.y + 6 };
  runTo(185.2, gS.x, gS.y, 1.4); tl.set(A.sheep, { flip: 0 }, 186.6);
  tl.to(cam, { cx: 1620, cy: 640, s: 1.7, duration: 2, ease: 'sine.inOut' }, 185.4);
  // bite, pull (it pulls back), the ghosts push, bite again, PULL
  tl.to(S('head'), { rotation: -12, duration: 0.2 }, 187.0).set(S('mouth'), { attr: { d: BIG } }, 187.0).set(S('mouth'), { attr: { d: FIRM } }, 187.3);
  tl.to(A.sheep, { x: gS.x + 30, duration: 0.8, ease: 'sine.inOut' }, 187.6).to('#giantFall', { rotation: 6, duration: 0.8 }, 187.6)
    .to(A.sheep, { x: gS.x - 6, duration: 0.5, ease: 'power2.in' }, 188.6).to('#giantFall', { rotation: -2, duration: 0.5 }, 188.6);
  tl.to(A.sheep, { x: gS.x + 40, duration: 1.0, ease: 'sine.inOut' }, 189.6).to('#giantFall', { rotation: 9, duration: 1.0 }, 189.6)
    .to(A.sheep, { x: gS.x, duration: 0.4 }, 191.0).to('#giantFall', { rotation: 3, duration: 0.6 }, 191.0);
  [[gS.x + 130, gS.y - 10], [gS.x + 190, gS.y + 10], [gS.x + 240, gS.y - 40]].forEach(([x, y], i) => tl.to(A.g[i], { ...at(A.g[i], x, y), flip: 0, duration: 1.2, ease: 'sine.inOut' }, 190.0 + i * 0.3));
  tl.to(cam, { cx: 1720, cy: 640, s: 1.4, duration: 2, ease: 'sine.inOut' }, 191.0);
  talkG(2, 195.6, 1.2, FIRM);
  tl.to(S('head'), { rotation: -14, duration: 0.15 }, 196.4).set(S('mouth'), { attr: { d: BIG } }, 196.4).set(S('mouth'), { attr: { d: FIRM } }, 196.7);
  tl.to(A.sheep, { x: gS.x + 90, duration: 1.6, ease: 'power2.inOut' }, 197.0);
  A.g.forEach((g, i) => tl.to(g, { x: [gS.x + 220, gS.x + 280, gS.x + 330][i], duration: 1.6, ease: 'power2.inOut' }, 197.0));
  tl.to('#giantFall', { rotation: 18, duration: 1.6, ease: 'power2.inOut' }, 197.0).to('#giantFall', { rotation: 86, duration: 1.2, ease: 'power3.in' }, 198.6);
  tl.to(A.st, { shake: 1, duration: 0.05 }, 199.8).to(A.st, { shake: 0, duration: 1.6 }, 199.9);
  tl.to(A.sheep, { x: gS.x + 150, duration: 0.6, ease: 'power2.out' }, 198.6).to('#S-walk', { rotation: -30, duration: 0.4 }, 198.8).to(A.sheep, { up: 880 - gS.y - 10, duration: 0.6 }, 199.0);
  // ---- 200–230 silence; dawn; "You kept me safe." ----
  tl.to(X, { night: 0.55, duration: 14, ease: 'sine.inOut' }, 202.0).to(X, { night: 0.15, duration: 14, ease: 'sine.inOut' }, 216.0);
  tl.to('#S-walk', { rotation: 0, duration: 0.8 }, 202.0).to(S('body'), { scaleY: 0.86, duration: 1.2 }, 202.4).to([S('lidL'), S('lidR')], { scaleY: 0.6, duration: 1.2 }, 202.4)
    .to(S('mouth'), { attr: { d: SMILE }, duration: 0.6 }, 203.6);
  tl.to(cam, { cx: 1560, cy: 620, s: 1.5, duration: 5, ease: 'sine.inOut' }, 202.0);
  A.g.forEach((g, i) => tl.to(g, { op: 0.35, duration: 4 }, 203 + i * 0.4));
  roseTalk(207.0, 2.4, 6);
  tl.set(A.sheep, { flip: 0 }, 209.6); talkS(210.4, 1.8, SMILE);
  tl.to([S('lidL'), S('lidR')], { scaleY: 1, duration: 2 }, 213.0);
  tl.to(cam, { cx: 1460, cy: 600, s: 1.15, duration: 12, ease: 'sine.inOut' }, 214.0);
  tl.to('#fade', { opacity: 1, duration: 4 }, 225.5);

  // ---- per-frame ----
  const H = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  for (let i = 0; i < 160; i++) mk('circle', $('#nstars'), { cx: (H(i) * 2400).toFixed(0), cy: (H(i + 5) * 420).toFixed(0), r: (0.8 + H(i + 9) * 2.2).toFixed(1), fill: '#fff6e0', opacity: (0.4 + 0.6 * H(i + 2)).toFixed(2) });
  const bits = []; for (let i = 0; i < 12; i++) bits.push(mk('circle', $('#bits'), { r: 4, fill: '#7da447', opacity: 0 }));
  const EATS = SP.filter((s) => s[4] === 'eat');
  // cracks spreading over the night
  const crackPaths = []; for (let i = 0; i < 14; i++) { let x = 300 + H(i * 3) * 1800, y = 830 + H(i * 7) * 120, d = `M${x.toFixed(0)} ${y.toFixed(0)}`;
    for (let j = 0; j < 5; j++) { x += (H(i * 11 + j) - 0.5) * 120; y += (H(i * 13 + j) - 0.3) * 18; d += ` L${x.toFixed(0)} ${y.toFixed(0)}`; } crackPaths.push(mk('path', $('#cracks'), { d, opacity: 0 })); }
  return {
    render: (t) => {
      tl.seek(t); K.drive(t);
      const n = X.night;
      const filt = `brightness(${(1 - 0.62 * n).toFixed(3)}) saturate(${(1 - 0.35 * n).toFixed(3)}) hue-rotate(${(n * 18).toFixed(1)}deg)`;
      $$('#plate, .pl2').forEach((e) => { e.style.filter = filt; });
      $('#nightC').style.opacity = (n * 0.45).toFixed(3); $('#warmD').style.opacity = (0.2 * (1 - n)).toFixed(3);
      $('#nstars').setAttribute('opacity', Math.max(0, (n - 0.3) / 0.7).toFixed(2));
      // the rose: leans, trembles, glows when she talks; the dome rattles in the quake
      const tr = X.tremble * Math.sin(t * 38) * 2.2, q = X.quake;
      $('#roseHead').setAttribute('transform', `rotate(${(X.rose + tr).toFixed(2)} ${ROSE.x} ${ROSE.y + 110})`);
      $('#roseGlow').setAttribute('opacity', (X.glow * (0.5 + 0.3 * n)).toFixed(2));
      $('#domeShake').setAttribute('transform', `translate(${(q * Math.sin(t * 47) * 2.5).toFixed(2)} ${(q * Math.sin(t * 61) * 1.2).toFixed(2)})`);
      // the box lying in the grass (bigger: we're close to it)
      $('#boxPos').setAttribute('transform', `translate(${X.bx} ${X.by}) rotate(${X.br.toFixed(2)} 0 -30) scale(1.55)`);
      // cracks
      crackPaths.forEach((c, i) => c.setAttribute('opacity', t > 105 + i * 1.6 && t < 222 ? Math.min(0.7, (t - 105 - i * 1.6) / 1.5).toFixed(2) : 0));
      // green crumbs when it eats
      let e = null; for (const s of EATS) if (t > s[3] - 0.9 && t < s[3] + 0.6) e = s;
      bits.forEach((b, i) => { if (!e) { b.setAttribute('opacity', 0); return; } const u = t - (e[3] - 0.9) - (i % 4) * 0.08; if (u < 0) { b.setAttribute('opacity', 0); return; }
        const sc = k(e[1]) / 0.6; b.setAttribute('cx', (e[0] + (H(i) - 0.5) * 120 * sc * Math.min(1, u * 2)).toFixed(1)); b.setAttribute('cy', (e[1] - 60 * sc + u * u * 260).toFixed(1));
        b.setAttribute('opacity', Math.max(0, 1 - u / 1.2).toFixed(2)); b.setAttribute('r', (3 + 3 * sc).toFixed(1)); });
    },
  };
}
