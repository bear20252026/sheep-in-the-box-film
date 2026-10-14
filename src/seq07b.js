// SEQ 7b — THE BUSINESSMAN (~2:30). A grey planet, a desk, mountains of paper. A man who owns the stars
// because he counts them. He stamps the sheep "property" and shoves it, box and all, into a drawer.
// In the dark, Horns — who never helps anybody — head-butts the drawer open. He did NOT help.
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {kitCss, kitHtml, kitSetup, INK, SMILE, BIG, OH, SAYD, SAD, FIRM, WORRY, TALK_B, REST_B, SMILE_B, BIG_B, SAD_B, OH_B} from './planetkit.js';

export const DURATION = 152;
const R = 700, CX = 1200, CY = 1600;

const SUBS = [
  [10.4, 14.0, 'Three and two make five. Five and seven, twelve…', '三加二等于五。五加七，十二……'],
  [14.8, 16.2, 'Good morning.', '早上好。'],
  [16.8, 22.4, 'Don’t interrupt. Five hundred and one million, six hundred and twenty-two thousand…', '别打岔。五亿零一百六十二万二千……'],
  [23.0, 25.0, 'Five hundred million what?', '五亿个什么？'],
  [25.6, 28.4, 'Stars. I own them.', '星星。它们归我所有。'],
  [30.0, 32.4, 'What do you do with them?', '你拿它们做什么？'],
  [33.0, 38.4, 'I count them. I count them again. Then I lock the number in a drawer.', '我数它们。再数一遍。然后把数字锁进抽屉。'],
  [39.4, 42.6, 'But what good does that do the stars?', '可那对星星有什么好处呢？'],
  [44.6, 47.4, '…I am a serious man.', '……我是个正经人。'],
  [56.4, 59.2, 'One sheep. Unregistered!', '一只羊。没登记！'],
  [60.6, 62.8, 'There. Now it’s mine.', '好了。现在它是我的了。'],
  [66.4, 68.6, 'Hey! Give him back!', '喂！把它还给我！'],
  [69.2, 72.4, 'Property is property. Next!', '财产就是财产。下一个！'],
  [77.0, 80.4, 'Hello? It’s dark. It’s very… dark.', '有人吗？好黑。好……黑。', 'say'],
  [82.0, 84.4, 'Huh. A drawer. Classic.', '哈。抽屉。老一套了。', 'say'],
  [85.4, 87.0, 'Help me?', '帮帮我？', 'say'],
  [87.8, 91.0, 'Me? I’m a ghost. Ghosts don’t help.', '我？我是鬼魂。鬼魂不帮忙。', 'say'],
  [93.6, 95.4, '…Ugh. Fine.', '……唉。好吧。', 'say'],
  [104.6, 106.4, 'My numbers!', '我的数字！'],
  [111.0, 113.4, 'Did you just… help?', '你刚才……帮忙了？'],
  [114.0, 117.6, 'I did NOT. The drawer was in my way.', '我才没有。是抽屉挡了我的路。'],
  [118.2, 119.6, 'Mm-hm.', '嗯哼。'],
  [122.0, 128.4, 'I have a flower. I water her every day. I’m useful to her.', '我有一朵花。我每天给她浇水。我对她是有用的。'],
  [129.0, 132.4, 'But you’re not useful to your stars.', '可你对你的星星没有用。'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('') + 'STAMPED 已登记';

export const css = kitCss('radial-gradient(ellipse at 50% 40%, #232a36 0%, #0e1118 60%, #05060a 100%)') + `
#drawer{position:absolute;inset:0;background:#0b0806;opacity:0}
#drawer svg{position:absolute;left:0;top:0;width:1920px;height:804px}
`;

const BM = `
<g id="bmPos" transform="translate(1390 900) scale(0.82)"><g filter="url(#wcBoy)">
 <g id="BM-body"><path d="M-62 -40 L-56 -190 Q0 -220 56 -190 L62 -40Z" fill="#6a707a" stroke="${INK}" stroke-width="4"/>
  <path d="M-12 -196 L0 -150 L12 -196" fill="#f4f2ee" stroke="${INK}" stroke-width="3"/><path d="M-4 -184 L0 -120 L4 -184Z" fill="#7a2a2a"/></g>
 <g id="BM-head"><ellipse cx="0" cy="-246" rx="40" ry="46" fill="#f0d0b4" stroke="${INK}" stroke-width="4"/>
  <path d="M-40 -246 C-44 -270 -36 -282 -30 -280 M40 -246 C44 -270 36 -282 30 -280" fill="none" stroke="#9a9a9a" stroke-width="7" stroke-linecap="round"/>
  <circle cx="-15" cy="-254" r="11" fill="#eef4f8" fill-opacity=".5" stroke="${INK}" stroke-width="3"/><circle cx="15" cy="-254" r="11" fill="#eef4f8" fill-opacity=".5" stroke="${INK}" stroke-width="3"/><path d="M-4 -254 h8" stroke="${INK}" stroke-width="3"/>
  <g id="BM-eyes"><circle cx="-15" cy="-254" r="3.4" fill="${INK}"/><circle cx="15" cy="-254" r="3.4" fill="${INK}"/></g>
  <rect id="BM-lidL" x="-24" y="-262" width="18" height="15" fill="#f0d0b4" opacity="0"/><rect id="BM-lidR" x="6" y="-262" width="18" height="15" fill="#f0d0b4" opacity="0"/>
  <path d="M-4 -246 Q2 -228 -6 -226" fill="none" stroke="${INK}" stroke-width="3"/>
  <path id="BM-mouth" d="M-12 -214 L12 -214" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
  <path d="M34 -262 L58 -300" stroke="#e2b04a" stroke-width="6" stroke-linecap="round"/></g>
 <g id="BM-armR"><path d="M50 -180 Q70 -130 40 -96" stroke="#6a707a" stroke-width="24" stroke-linecap="round" fill="none"/><circle cx="36" cy="-92" r="11" fill="#f0d0b4" stroke="${INK}" stroke-width="3"/>
  <g id="stamp" opacity="0" transform="translate(36 -92)"><rect x="-10" y="-30" width="20" height="24" rx="4" fill="#7a4a2a" stroke="${INK}" stroke-width="2.5"/><rect x="-16" y="-8" width="32" height="10" fill="#3a3a3a"/></g></g>
 <g id="BM-armL"><path d="M-50 -180 Q-70 -130 -40 -96" stroke="#6a707a" stroke-width="24" stroke-linecap="round" fill="none"/><circle cx="-36" cy="-92" r="11" fill="#f0d0b4" stroke="${INK}" stroke-width="3"/></g>
</g></g>`;
const DESK = `<g filter="url(#wcPl)">
 <path d="M1240 840 L1550 840 L1550 925 L1240 925Z" fill="#7a5638" stroke="${INK}" stroke-width="5"/>
 <path d="M1230 826 L1560 826 L1560 842 L1230 842Z" fill="#8e6848" stroke="${INK}" stroke-width="4"/>
 <path d="M1250 925 L1250 945 M1540 925 L1540 945" stroke="${INK}" stroke-width="8"/>
 <g id="paper1"><path d="M1260 826 l60 0 l0 -40 l-60 0Z M1262 786 l56 0 l0 -10 l-56 0Z" fill="#f2eee4" stroke="${INK}" stroke-width="2.5"/></g>
 <rect x="1470" y="800" width="60" height="26" rx="4" fill="#4a4a50" stroke="${INK}" stroke-width="3"/><path d="M1478 808 h44 M1478 816 h44" stroke="#bdbdbd" stroke-width="3"/>
</g>
<g id="drawerFront" filter="url(#wcPl)"><path d="M1300 855 L1440 855 L1440 905 L1300 905Z" fill="#8a6444" stroke="${INK}" stroke-width="4"/><circle cx="1370" cy="880" r="6" fill="#e2b04a" stroke="${INK}" stroke-width="2"/></g>`;
const PILES = `<g filter="url(#wcPl)" fill="#ece8de" stroke="${INK}" stroke-width="3">
 <path d="M880 930 l70 0 l0 -60 l-70 0Z M890 870 l60 -6 l0 -30 l-60 6Z"/><path d="M1600 900 l90 6 l0 -90 l-90 -6Z M1610 810 l70 0 l0 -40 l-70 0Z M1620 770 l60 4 l0 -30 l-60 -4Z"/>
 <path d="M1720 950 l60 10 l0 -50 l-60 -10Z"/></g>`;

export const html = (IMG) => kitHtml({
  IMG, skyFilter: 'saturate(.5) brightness(.8)', light: '#e8eef8',
  R, CX, CY,
  defs: `<radialGradient id="plG" cx="40%" cy="30%" r="70%"><stop offset="0" stop-color="#9aa2ae"/><stop offset="1" stop-color="#3e4450"/></radialGradient>`,
  planet: `<circle r="${R}" fill="url(#plG)" stroke="#262a32" stroke-width="6"/>
    <ellipse cx="-260" cy="-560" rx="60" ry="16" fill="#6e7480"/><ellipse cx="300" cy="-600" rx="40" ry="10" fill="#6e7480"/><ellipse cx="-80" cy="-660" rx="26" ry="7" fill="#6e7480"/>`,
  back: PILES,
  mid: BM + DESK + `<g id="flyPapers"></g>`,
  overlay: `<div id="drawer"><svg viewBox="0 0 1920 804">
    <path d="M0 0 H1920 V804 H0Z" fill="#120d0a"/>
    <path id="slit" d="M0 70 H1920 V84 H0Z" fill="#f4e2b8" opacity=".5"/>
    <path d="M200 680 l300 -20 l40 60 l-320 30Z M1300 700 l280 10 l-10 50 l-290 -20Z" fill="#3a3228"/>
    <g transform="translate(760 720) scale(1.25)"><use href="#shFlip"/></g>
    <g id="dHorns" opacity="0" transform="translate(1320 700) scale(1.1)"><g transform="scale(-1 1)"><use href="#gf2"/></g></g>
    <rect id="dFlash" x="0" y="0" width="1920" height="804" fill="#fff8e0" opacity="0"/>
  </svg></div>`,
});

export function setup() {
  const K = kitSetup({ R, CX, CY, SUBS });
  const { tl, cam, A, B, S, G, talk, talkS, talkB, talkG, blinkB, blinkS, $, mk } = K;
  const BMp = (p) => '#BM-' + p;
  tl.set(BMp('armR'), { rotation: 0, svgOrigin: '50 -180' }, 0).set(BMp('armL'), { rotation: 0, svgOrigin: '-50 -180' }, 0).set(BMp('head'), { rotation: 0, svgOrigin: '0 -200' }, 0);
  tl.set('#drawerFront', { y: 0 }, 0).set(G(2, 'head'), { rotation: 0, svgOrigin: '-60 -190' }, 0);
  const TALK_M = 'M-12 -216 Q0 -204 12 -216', REST_M = 'M-12 -214 L12 -214', OH_M = 'M-6 -216 Q0 -206 6 -216';
  const talkM = (at, dur, rest = REST_M) => talk(BMp('mouth'), at, dur, TALK_M, rest);
  const blinkM = (at) => tl.set([BMp('lidL'), BMp('lidR')], { opacity: 1 }, at).set([BMp('lidL'), BMp('lidR')], { opacity: 0 }, at + 0.14);
  [3, 15.4, 29.4, 43, 53, 65.6, 108, 121].forEach(blinkB); [14.4, 28.8, 48.0, 55.0, 107.0, 133.6].forEach(blinkM); [21, 50, 79.2, 86.0, 98.0, 110.0].forEach(blinkS);
  // counting: the right hand scribbles; the left taps the adding machine
  const scrib = (a, z) => tl.to(BMp('armR'), { rotation: -12, duration: 0.16, yoyo: true, repeat: Math.floor((z - a) / 0.16) - 1 }, a);
  scrib(1, 14.4); scrib(17, 22.4); scrib(47.6, 55.0); scrib(72.4, 74.6);

  tl.set('#fade', { opacity: 1 }, 0).to('#fade', { opacity: 0, duration: 2 }, 0);
  // 0–10 arrival
  tl.set(A.st, { carry: 1, lift: 520, liftX: -280 }, 0).set(A.box, { on: 0 }, 0).set(A.boy, { x: 1020 }, 0).set(B('armR'), { rotation: -160 }, 0).set(B('armL'), { rotation: 20 }, 0).set(A.st, { stakeX: 760 }, 0);
  tl.set(cam, { cx: 1100, cy: 420, s: 0.72 }, 0).to(cam, { cx: 1200, cy: 760, s: 1.2, duration: 9, ease: 'sine.inOut' }, 0.5);
  tl.to(A.st, { lift: 0, liftX: 0, duration: 7.5, ease: 'power2.out' }, 0);
  tl.to(B('legL'), { rotation: 10, duration: 0.6, yoyo: true, repeat: 11, ease: 'sine.inOut' }, 0).to(B('legR'), { rotation: -8, duration: 0.7, yoyo: true, repeat: 9, ease: 'sine.inOut' }, 0);
  tl.set(A.box, { on: 1, x: 1085, up: 0 }, 7.6).to(B('armL'), { rotation: 0, duration: 0.5 }, 7.6);
  tl.to(A.st, { carry: 0, duration: 2.4, ease: 'sine.inOut' }, 8.0).to(B('armR'), { rotation: 0, duration: 0.8 }, 8.2);
  tl.to(A.sheep, { up: -18, duration: 0.5, ease: 'back.out(2)' }, 9.2);
  // 10–48 the stars are his
  talkM(10.4, 3.6);
  tl.to(B('eyes'), { x: 8, y: 0, duration: 0.3 }, 13.6);
  talkB(14.8, 1.4);
  tl.to(cam, { cx: 1310, cy: 760, s: 1.5, duration: 3, ease: 'sine.inOut' }, 15.6);
  talkM(16.8, 5.6);
  tl.set(A.sheep, { inBox: 0, x: 1100, up: 50 }, 18.4).to(A.sheep, { x: 1150, duration: 0.5, ease: 'none' }, 18.4).to(A.sheep, { up: 0, duration: 0.5, ease: 'bounce.out' }, 18.4).set(A.sheep, { flip: 1 }, 18.4);
  tl.to(A.st, { boyWalk: 1, duration: 0.2 }, 19.0).to(A.boy, { x: 1160, duration: 2.2, ease: 'sine.inOut' }, 19.0).to(A.st, { boyWalk: 0, duration: 0.2 }, 21.0);
  tl.to(A.sheep, { walk: 1, duration: 0.2 }, 19.4).to(A.sheep, { x: 1205, duration: 1.4, ease: 'sine.inOut' }, 19.4).to(A.sheep, { walk: 0, duration: 0.2 }, 20.6);
  talkB(23.0, 2.0, OH_B);
  tl.to(BMp('head'), { rotation: 10, duration: 0.5 }, 25.2).to(BMp('eyes'), { x: -6, y: 0, duration: 0.3 }, 25.2);
  talkM(25.6, 2.8);
  tl.to(BMp('armL'), { rotation: 140, duration: 0.5 }, 26.0).to(BMp('armL'), { rotation: 0, duration: 0.6 }, 28.4);
  talkB(30.0, 2.4, REST_B);
  talkM(33.0, 5.4);
  tl.to(BMp('head'), { rotation: 0, duration: 0.5 }, 38.6).to(BMp('eyes'), { x: 0, duration: 0.3 }, 38.6);
  tl.to(cam, { cx: 1260, cy: 770, s: 1.75, duration: 4, ease: 'sine.inOut' }, 38.4);
  talkB(39.4, 3.2, REST_B);
  tl.to(BMp('eyes'), { x: -6, y: 0, duration: 0.2 }, 43.0).to(BMp('mouth'), { attr: { d: OH_M }, duration: 0.2 }, 43.0);
  talkM(44.6, 2.8);
  tl.to(BMp('head'), { rotation: -6, duration: 0.6 }, 47.2).to(BMp('eyes'), { x: 0, y: 4, duration: 0.3 }, 47.2);
  // 48–75 the sheep nibbles a paper; stamped; into the drawer
  tl.to(A.sheep, { walk: 1, duration: 0.2 }, 49.0).set(A.sheep, { flip: 1 }, 49.0).to(A.sheep, { x: 1258, duration: 1.6, ease: 'sine.inOut' }, 49.0).to(A.sheep, { walk: 0, duration: 0.2 }, 50.4);
  tl.to(cam, { cx: 1300, cy: 800, s: 2.0, duration: 3, ease: 'sine.inOut' }, 49.0);
  tl.to(S('head'), { rotation: -14, duration: 0.5 }, 51.0).to(S('mouth'), { attr: { d: BIG }, duration: 0.2 }, 51.4).to(S('mouth'), { attr: { d: SMILE }, duration: 0.2 }, 51.8)
    .to(S('mouth'), { attr: { d: BIG }, duration: 0.2 }, 52.2).to(S('mouth'), { attr: { d: SMILE }, duration: 0.2 }, 52.6).to('#paper1', { rotation: -8, duration: 0.2, yoyo: true, repeat: 3, svgOrigin: '1260 826' }, 51.4);
  tl.to(BMp('head'), { rotation: 14, duration: 0.3 }, 55.6).to(BMp('eyes'), { x: -8, y: 6, duration: 0.2 }, 55.6).to(S('head'), { rotation: 0, duration: 0.3 }, 55.8).to(S('eyes'), { x: 10, y: -10, duration: 0.2 }, 55.8);
  talkM(56.4, 2.8, OH_M);
  tl.set('#stamp', { opacity: 1 }, 59.4).to(BMp('armR'), { rotation: -90, duration: 0.4 }, 59.4).to(BMp('armR'), { rotation: -20, duration: 0.12, ease: 'power3.in' }, 60.0);
  tl.to(A.st, { shake: 0.4, duration: 0.05 }, 60.1).to(A.st, { shake: 0, duration: 0.4 }, 60.2);
  talkM(60.6, 2.2);
  // the sheep dives into its box; the businessman takes the box and drawers it
  tl.to(A.sheep, { walk: 1, duration: 0.1 }, 61.0).set(A.sheep, { flip: 0 }, 61.0).to(A.sheep, { x: 1100, duration: 0.8, ease: 'power2.in' }, 61.0)
    .to(A.sheep, { up: 50, duration: 0.2 }, 61.8).set(A.sheep, { inBox: 1, up: 70, walk: 0 }, 62.0).set(A.box, { x: 1085 }, 62.0);
  tl.to(cam, { cx: 1260, cy: 780, s: 1.45, duration: 1.5, ease: 'sine.inOut' }, 62.0);
  tl.to(BMp('armL'), { rotation: 70, duration: 0.5 }, 63.0).to(A.box, { x: 1300, up: 60, duration: 1.0, ease: 'power2.inOut' }, 63.4)
    .to('#drawerFront', { y: 24, duration: 0.3 }, 63.0).to(A.box, { up: 20, duration: 0.4, ease: 'power2.in' }, 64.4).to('#boxPos', { opacity: 0, duration: 0.2 }, 64.7)
    .to('#drawerFront', { y: 0, duration: 0.12, ease: 'power3.in' }, 65.0).to(BMp('armL'), { rotation: 0, duration: 0.5 }, 65.0);
  tl.to(A.st, { shake: 0.3, duration: 0.05 }, 65.1).to(A.st, { shake: 0, duration: 0.3 }, 65.2);
  tl.to(B('mouth'), { attr: { d: OH_B }, duration: 0.2 }, 65.2).to(B('armR'), { rotation: -120, duration: 0.4 }, 66.2);
  talkB(66.4, 2.2, SAD_B);
  tl.to(B('armR'), { rotation: 0, duration: 0.5 }, 68.8);
  talkM(69.2, 3.2);
  tl.set('#stamp', { opacity: 0 }, 70.0);
  // 75–100 inside the drawer
  tl.to('#drawer', { opacity: 1, duration: 0.8 }, 74.4);
  tl.set(A.sheep, { inBox: 0 }, 75.0).set(S('eyes'), { x: 0, y: 0 }, 75.0).set(S('mouth'), { attr: { d: WORRY } }, 75.0);
  tl.to(S('eyes'), { x: -10, y: -4, duration: 0.3 }, 76.0).to(S('eyes'), { x: 10, y: -4, duration: 0.3 }, 76.8).to(S('eyes'), { x: 0, y: 0, duration: 0.3 }, 77.8);
  talkS(77.0, 3.4, WORRY);
  tl.to(S('body'), { scaleY: 0.94, duration: 0.3, yoyo: true, repeat: 5 }, 78.0);
  tl.to('#dHorns', { opacity: 0.85, duration: 1.4 }, 80.4);
  talkG(2, 82.0, 2.4, SMILE);
  tl.to(S('eyes'), { x: 12, y: -2, duration: 0.3 }, 82.2);
  talkS(85.4, 1.6, WORRY);
  talkG(2, 87.8, 3.2, SMILE);
  tl.to(G(2, 'head'), { rotation: 10, duration: 0.6 }, 88.0);
  tl.to(S('mouth'), { attr: { d: SAD }, duration: 0.3 }, 91.2).to(S('head'), { rotation: -8, duration: 0.8 }, 91.2);
  tl.to(G(2, 'eyes'), { y: -14, duration: 0.4 }, 92.6).to(G(2, 'eyes'), { y: 0, duration: 0.4 }, 93.2);
  talkG(2, 93.6, 1.8, FIRM);
  // the head-butts
  for (const [a, k] of [[96.0, 0.25], [98.0, 0.5], [100.0, 1]]) {
    tl.to('#dHorns', { x: 60, duration: 0.3, ease: 'power2.in' }, a).to('#dHorns', { x: -120, duration: 0.18, ease: 'power3.in' }, a + 0.5)
      .to('#dFlash', { opacity: 0.25 * k, duration: 0.05 }, a + 0.68).to('#dFlash', { opacity: 0, duration: 0.3 }, a + 0.75).to('#dHorns', { x: 0, duration: 0.6 }, a + 0.8);
    tl.to(A.st, { shake: 0.5 * k, duration: 0.05 }, a + 0.68).to(A.st, { shake: 0, duration: 0.4 }, a + 0.75);
  }
  tl.to('#dFlash', { opacity: 1, duration: 0.15 }, 100.7).set('#drawer', { opacity: 0 }, 100.85).to('#dFlash', { opacity: 0, duration: 0.01 }, 100.86);
  // 100–120 the drawer bursts; papers everywhere
  tl.set(cam, { cx: 1300, cy: 760, s: 1.5 }, 100.85).to(cam, { cx: 1260, cy: 770, s: 1.3, duration: 3, ease: 'sine.inOut' }, 101.0);
  tl.set('#drawerFront', { y: 70, rotation: 14, svgOrigin: '1370 880' }, 100.85);
  tl.set('#boxPos', { opacity: 1 }, 100.85).set(A.box, { x: 1330, up: 0 }, 100.85).to(A.box, { x: 1140, duration: 0.8, ease: 'power2.out' }, 100.9);
  tl.set(A.sheep, { inBox: 0, x: 1360, up: 60, flip: 0 }, 100.85).to(A.sheep, { x: 1215, duration: 0.8, ease: 'power2.out' }, 100.9).to(A.sheep, { up: 0, duration: 0.8, ease: 'bounce.out' }, 100.9);
  tl.set(A.g[1], { x: 1420, up: 30, s: 0.3, flip: 0, op: 0.85 }, 100.85);
  tl.set(S('mouth'), { attr: { d: OH } }, 100.85).to(S('mouth'), { attr: { d: SMILE }, duration: 0.3 }, 103.0);
  tl.to(BMp('armL'), { rotation: 150, duration: 0.3 }, 101.4).to(BMp('armR'), { rotation: -150, duration: 0.3 }, 101.4).to(BMp('eyes'), { y: -6, duration: 0.2 }, 101.4);
  talkM(104.6, 1.8, OH_M);
  tl.to([BMp('armL'), BMp('armR')], { rotation: 0, duration: 0.6 }, 106.8);
  tl.to(A.sheep, { walk: 1, duration: 0.2 }, 104.0).to(A.sheep, { x: 1185, duration: 0.8 }, 104.0).to(A.sheep, { walk: 0, duration: 0.2 }, 104.8);
  tl.to(B('armL'), { rotation: -40, duration: 0.4 }, 104.6).to(B('mouth'), { attr: { d: BIG_B }, duration: 0.3 }, 104.6).to(B('armL'), { rotation: 0, duration: 0.5 }, 107.0);
  A.g.forEach((g, i) => { if (i !== 1) tl.set(g, { x: [1520, 0, 1580][i], up: [80, 0, 30][i], s: 0.26, flip: 0 }, 108.0).to(g, { op: 0.8, duration: 1.0 }, 108.2 + i * 0.2); });
  tl.to(cam, { cx: 1420, cy: 780, s: 1.8, duration: 2.5, ease: 'sine.inOut' }, 109.0);
  talkG(1, 111.0, 2.4, OH);
  tl.to(G(2, 'head'), { rotation: -10, duration: 0.4 }, 113.6).set(A.g[1], { flip: 1 }, 113.6);
  talkG(2, 114.0, 3.6, FIRM);
  talkG(3, 118.2, 1.4, SMILE); tl.to(G(3, 'head'), { rotation: 8, duration: 0.6 }, 118.2);
  A.g.forEach((g, i) => tl.to(g, { op: 0, duration: 1.4 }, 120.0 + i * 0.2));
  // 121–152 "You're not useful to your stars." and away
  tl.to(cam, { cx: 1290, cy: 770, s: 1.55, duration: 2.5, ease: 'sine.inOut' }, 120.6);
  talkB(122.0, 6.4, SMILE_B); talkB(129.0, 3.4, REST_B);
  tl.to(BMp('mouth'), { attr: { d: OH_M }, duration: 0.3 }, 132.8).to(BMp('head'), { rotation: -6, duration: 1 }, 133.0);
  tl.to(A.sheep, { walk: 1, duration: 0.2 }, 134.0).to(A.sheep, { x: 1100, duration: 1.0 }, 134.0).to(A.sheep, { up: 50, duration: 0.2 }, 135.0).set(A.sheep, { inBox: 1, up: -18, walk: 0 }, 135.2);
  tl.set(A.box, { x: 1100 }, 134.0).to(A.st, { boyWalk: 1, duration: 0.2 }, 134.2).to(A.boy, { x: 1050, duration: 1.4 }, 134.2).to(A.st, { boyWalk: 0, duration: 0.2 }, 135.4);
  tl.to(B('armL'), { rotation: 20, duration: 0.5 }, 135.6).set(A.box, { on: 0 }, 136.0).to(A.st, { carry: 1, duration: 2.0 }, 136.0).to(B('armR'), { rotation: -160, duration: 0.8 }, 136.0);
  tl.to(A.st, { lift: 650, liftX: 220, duration: 14, ease: 'power1.in' }, 138.0);
  tl.to(B('legL'), { rotation: 10, duration: 0.6, yoyo: true, repeat: 22, ease: 'sine.inOut' }, 138.4);
  // he looks up — at the stars themselves — for the first time
  tl.to(BMp('head'), { rotation: 0, duration: 1.2 }, 140.0).to(BMp('eyes'), { y: -8, duration: 1.0 }, 141.0).to(BMp('mouth'), { attr: { d: 'M-12 -216 Q0 -208 12 -216' }, duration: 1.2 }, 143.0);
  tl.to(cam, { cx: 1300, cy: 560, s: 0.85, duration: 12, ease: 'sine.inOut' }, 139.0);
  tl.to('#fade', { opacity: 1, duration: 3.5 }, 148.5);

  // flying papers when the drawer bursts
  const papers = [];
  for (let i = 0; i < 26; i++) papers.push(mk('rect', $('#flyPapers'), { width: 22, height: 28, fill: '#f2eee4', stroke: INK, 'stroke-width': 2, opacity: 0 }));
  const hsh = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  return {
    render: (t) => {
      tl.seek(t); K.drive(t);
      const u = t - 100.85;
      papers.forEach((p, i) => {
        if (u < 0 || u > 9) { p.setAttribute('opacity', 0); return; }
        const a = -Math.PI * (0.15 + 0.7 * hsh(i)), v = 300 + hsh(i + 3) * 500;
        const x = 1370 + Math.cos(a) * v * Math.min(u, 1.2) + Math.sin(u * 2 + i) * 30 * u, y = 880 + Math.sin(a) * v * Math.min(u, 1.2) + 40 * u * u * 0.5 + Math.max(0, u - 1.2) * 20;
        p.setAttribute('transform', `translate(${x.toFixed(1)} ${Math.min(y, 940).toFixed(1)}) rotate(${(u * 200 * (hsh(i + 5) - 0.5)).toFixed(1)})`);
        p.setAttribute('opacity', Math.max(0, Math.min(1, 9 - u)).toFixed(2));
      });
    },
  };
}
