// SEQ 7c — THE LAMPLIGHTER (~3:30). A tiny planet that turns once a minute: evening, morning, evening, morning.
// Its lamplighter hasn't slept in years. The sheep offers to keep watch for one night, and runs itself ragged
// lighting and snuffing the lamp while everyone sleeps. At dawn he wakes, rested, and weeps for joy —
// and a golden line fills HALF of the gap in the sheep's back. "Is that… me?"
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {kitCss, kitHtml, kitSetup, INK, SMILE, BIG, OH, SAYD, SAD, FIRM, WORRY, TALK_B, REST_B, SMILE_B, BIG_B, SAD_B, OH_B} from './planetkit.js';

export const DURATION = 210;
const R = 520, CX = 1200, CY = 1440;
const LAMP_X = 1228, LAMP_Y = 746;   // lamp head centre (world)

const SUBS = [
  [10.4, 12.0, 'Good evening.', '晚上好。'],
  [15.2, 16.6, 'Good morning.', '早上好。'],
  [17.4, 20.0, 'Why did you just put out your lamp?', '你为什么把灯熄了？'],
  [20.6, 22.6, 'Orders. Good evening.', '这是命令。晚上好。'],
  [24.0, 26.6, 'And why did you light it again?', '那你为什么又把它点亮了？'],
  [27.0, 29.0, 'Orders. Good morning.', '这是命令。早上好。'],
  [30.4, 36.0, 'My planet turns once a minute now. I haven’t slept in years.', '我的星球现在一分钟转一圈。我已经好多年没睡觉了。'],
  [36.8, 38.2, 'That’s terrible.', '那太糟糕了。'],
  [39.0, 41.4, 'Orders are orders. Good eve…', '命令就是命令。晚上……'],
  [46.4, 48.0, 'Good— MORNING!', '早——上好！'],
  [50.0, 52.0, '…I could do it.', '……我可以帮你。', 'say'],
  [52.6, 53.8, 'You?', '你？'],
  [54.4, 58.6, 'Light it when it’s dark. Blow it out when it’s light. I can count to two.', '天黑了就点灯，天亮了就熄灯。我会数到二。', 'say'],
  [59.6, 62.0, 'Ghosts don’t do chores.', '鬼魂不干家务。', 'say'],
  [62.4, 64.4, 'I’ll… supervise.', '我来……监督。', 'say'],
  [65.0, 67.6, 'Just… one night?', '就……一晚？'],
  [68.2, 69.8, 'Thank you. Oh — it’s evening!', '谢谢你。哎呀——天黑了！'],
  [72.6, 74.0, 'Good evening!', '晚上好！', 'say'],
  [75.0, 77.6, 'I’ll keep watch with you.', '我陪你一起守夜。'],
  [81.2, 82.6, 'Good morning!', '早上好！', 'say'],
  [90.0, 92.4, 'Go, sheep, go! (cough)', '加油，小羊，加油！（咳咳）', 'say'],
  [104.6, 106.2, 'I slipped.', '我只是滑了一下。', 'say'],
  [110.4, 112.6, 'Zzz… still supervising…', '呼……还在监督……', 'say'],
  [121.8, 123.6, 'Good… morning…', '早……上……好……', 'say'],
  [133.8, 135.0, 'Psst! Sheep! Morning!', '嘘！小羊！天亮了！', 'say'],
  [137.0, 138.6, 'I slipped. Again.', '我又滑了一下。', 'say'],
  [143.0, 144.6, 'I slept.', '我睡着了。'],
  [145.4, 147.6, 'I SLEPT! A whole night!', '我睡着了！整整一夜！'],
  [149.0, 153.6, 'Nobody has ever kept watch for me before.', '从来没有人替我守过夜。'],
  [159.0, 161.0, 'Is that… me?', '那是……我吗？', 'say'],
  [162.0, 164.6, 'Mm. Half of you is finished.', '嗯。你已经完成一半了。', 'say'],
  [165.4, 167.0, 'Don’t get sappy.', '别肉麻了。', 'say'],
  [167.6, 170.0, 'I’m not crying. It’s space dust.', '我没哭。是太空灰尘。', 'say'],
  [171.0, 173.0, 'Did I miss anything?', '我错过什么了吗？'],
  [173.6, 175.2, 'No. Nothing.', '没有。什么都没有。', 'say'],
  [177.6, 181.6, 'Good evening! I mean… goodbye! Thank you!', '晚上好！我是说……再见！谢谢你们！'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('') + 'zZ';

// day (0) / night (1) switches, and when the lamp goes on (1) / off (0)
const SW = [[9.6, 1], [14.4, 0], [20.2, 1], [27.4, 0], [38.4, 1], [46.2, 0], [70.0, 1], [80.0, 0], [88.0, 1], [95.4, 0], [102.4, 1], [108.6, 0], [114.6, 1], [120.4, 0], [126.4, 1], [133.4, 0], [182.0, 1]];
const LAMP = [[10.6, 1], [15.0, 0], [21.0, 1], [28.0, 0], [39.2, 1], [47.4, 0], [71.6, 1], [80.8, 0], [89.0, 1], [96.2, 0], [104.2, 1], [109.4, 0], [115.6, 1], [121.2, 0], [127.4, 1], [135.8, 0], [183.6, 1]];
const TALLY = [80.8, 96.2, 109.4, 121.2, 135.8];

export const css = kitCss('radial-gradient(ellipse at 50% 40%, #1f2748 0%, #0d1126 60%, #05060e 100%)') + `
#warm{position:absolute;inset:0;pointer-events:none;mix-blend-mode:soft-light;background:radial-gradient(ellipse 70% 80% at 30% 70%,rgba(255,180,90,.9),rgba(255,140,80,.2) 80%);opacity:0}
#lampGlow{mix-blend-mode:screen}
.zz{font:italic 600 30px Georgia,serif;fill:#f4ecd8}
`;

const LL = `
<g id="llPos"><g filter="url(#wcBoy)"><g id="LL-root">
 <ellipse cx="0" cy="3" rx="60" ry="10" fill="#202040" opacity=".25"/>
 <g id="LL-legs"><path d="M-16 -112 L-18 -6 L-2 -6 L-2 -112Z M4 -112 L6 -6 L20 -6 L18 -112Z" fill="#2c3550" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M-22 -8 Q-24 2 -8 2 L2 2 L0 -8Z M2 -8 Q2 2 16 2 L30 2 Q30 -8 18 -8Z" fill="#3a2a22" stroke="${INK}" stroke-width="3"/></g>
 <g id="LL-legsSit" opacity="0"><path d="M-14 -26 L84 -22 L86 -4 L-14 -4Z" fill="#2c3550" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
  <path d="M80 -26 Q98 -26 98 -2 L82 -2Z" fill="#3a2a22" stroke="${INK}" stroke-width="3"/></g>
 <g id="LL-upper">
  <g id="LL-armL"><path d="M-24 -222 Q-40 -180 -32 -136" fill="none" stroke="#33507e" stroke-width="17" stroke-linecap="round"/><circle cx="-31" cy="-132" r="8.5" fill="#f0d0b4" stroke="${INK}" stroke-width="3"/></g>
  <g id="LL-body"><path d="M-30 -232 Q-38 -160 -36 -104 L36 -104 Q38 -160 30 -232 Q0 -246 -30 -232Z" fill="#3d5a8a" stroke="${INK}" stroke-width="4"/>
   <path d="M-35 -132 L35 -132" stroke="#2a2a30" stroke-width="7"/><rect x="-6" y="-137" width="12" height="10" fill="#e2b04a" stroke="${INK}" stroke-width="2"/>
   <circle cx="0" cy="-200" r="3.5" fill="#e2b04a"/><circle cx="0" cy="-176" r="3.5" fill="#e2b04a"/><circle cx="0" cy="-152" r="3.5" fill="#e2b04a"/></g>
  <g id="LL-head">
   <path d="M-8 -236 L-8 -246 L8 -246 L8 -236Z" fill="#e8c4a6"/>
   <ellipse cx="2" cy="-270" rx="26" ry="30" fill="#f0d0b4" stroke="${INK}" stroke-width="4"/>
   <path d="M24 -276 q16 8 2 16" fill="#f0c8a8" stroke="${INK}" stroke-width="3"/>
   <g id="LL-eyes"><circle cx="2" cy="-276" r="3.4" fill="${INK}"/><circle cx="17" cy="-276" r="3.4" fill="${INK}"/></g>
   <g id="LL-lids"><rect x="-6" y="-284" width="16" height="13" fill="#f0d0b4"/><rect x="9" y="-284" width="16" height="13" fill="#f0d0b4"/></g>
   <path d="M-6 -284 h16 M9 -284 h16" stroke="${INK}" stroke-width="2.5"/>
   <path d="M-3 -268 q5 4 10 0 M12 -268 q5 4 10 0" fill="none" stroke="#a87a6a" stroke-width="2"/>
   <path d="M6 -256 q8 -6 20 0" fill="none" stroke="#7a6a60" stroke-width="5" stroke-linecap="round"/>
   <path id="LL-mouth" d="M8 -248 L20 -248" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
   <g id="LL-tears" opacity="0"><path d="M-2 -268 q-3 8 0 10 q3 -2 0 -10Z M24 -268 q-3 8 0 10 q3 -2 0 -10Z" fill="#9fd4f4"/></g>
   <path d="M-27 -284 Q0 -318 28 -290 L30 -282 L-28 -282Z" fill="#2a3f6a" stroke="${INK}" stroke-width="3.5"/>
   <path d="M22 -284 L46 -280 L24 -277Z" fill="#1e2c4c" stroke="${INK}" stroke-width="2.5"/><circle cx="4" cy="-296" r="5" fill="#e2b04a" stroke="${INK}" stroke-width="2"/></g>
  <g id="LL-armR"><path d="M22 -222 Q36 -186 40 -150" fill="none" stroke="#3d5a8a" stroke-width="17" stroke-linecap="round"/>
   <g id="llPole"><path d="M30 -110 L72 -340" stroke="#6a4a2a" stroke-width="6" stroke-linecap="round"/><path d="M68 -336 l10 -16 l6 4 Z" fill="#e2b04a" stroke="${INK}" stroke-width="2"/></g>
   <circle cx="40" cy="-148" r="9" fill="#f0d0b4" stroke="${INK}" stroke-width="3"/></g>
 </g>
</g></g></g>`;

const LAMPPOST = `<g filter="url(#wcPl)">
 <path d="M${LAMP_X - 18} 924 L${LAMP_X + 18} 924 L${LAMP_X + 10} 912 L${LAMP_X - 10} 912Z" fill="#3a3a44" stroke="${INK}" stroke-width="3"/>
 <path d="M${LAMP_X - 4} 914 L${LAMP_X - 4} 766 L${LAMP_X + 4} 766 L${LAMP_X + 4} 914Z" fill="#4a4a56" stroke="${INK}" stroke-width="3"/>
 <path d="M${LAMP_X - 20} 772 L${LAMP_X + 20} 772 L${LAMP_X + 14} 764 L${LAMP_X - 14} 764Z" fill="#3a3a44" stroke="${INK}" stroke-width="3"/>
 <rect id="glass" x="${LAMP_X - 13}" y="732" width="26" height="32" fill="#5a5a66" stroke="${INK}" stroke-width="3"/>
 <path id="flame" d="M${LAMP_X} 740 q-7 10 0 18 q7 -8 0 -18Z" fill="#ffb84a" opacity="0"/>
 <path d="M${LAMP_X - 18} 732 L${LAMP_X} 718 L${LAMP_X + 18} 732Z" fill="#3a3a44" stroke="${INK}" stroke-width="3"/>
 <g transform="translate(${LAMP_X - 44} 830)"><rect x="0" y="0" width="34" height="40" fill="#cdb48a" stroke="${INK}" stroke-width="2.5"/><path d="M34 6 L40 6" stroke="${INK}" stroke-width="3"/>
  <g id="tally" stroke="#4a3428" stroke-width="2.4" stroke-linecap="round">${[0, 1, 2, 3].map((i) => `<path id="tl${i}" d="M${7 + i * 6} 8 L${7 + i * 6} 32" opacity="0"/>`).join('')}<path id="tl4" d="M3 26 L30 12" opacity="0"/></g></g>
</g>`;

export const html = (IMG) => kitHtml({
  IMG, light: '#ffe0b0',
  R, CX, CY,
  defs: `<radialGradient id="plG" cx="40%" cy="30%" r="70%"><stop offset="0" stop-color="#d8b48a"/><stop offset="1" stop-color="#7a5a4a"/></radialGradient>
    <linearGradient id="daySky" gradientUnits="userSpaceOnUse" x1="0" y1="-200" x2="0" y2="1100"><stop offset="0" stop-color="#6aa0d0"/><stop offset=".6" stop-color="#b8d6e8"/><stop offset="1" stop-color="#f4dcc0"/></linearGradient>
    <radialGradient id="glowG"><stop offset="0" stop-color="#ffd890" stop-opacity=".95"/><stop offset=".35" stop-color="#ffb860" stop-opacity=".45"/><stop offset="1" stop-color="#ff9a40" stop-opacity="0"/></radialGradient>
    <radialGradient id="sunG"><stop offset="0" stop-color="#fff6d8"/><stop offset=".5" stop-color="#ffe2a0"/><stop offset="1" stop-color="#ffd080" stop-opacity="0"/></radialGradient>`,
  sky: `<rect id="day" x="-3000" y="-3000" width="8400" height="7000" fill="url(#daySky)"/><circle id="sun" r="120" fill="url(#sunG)"/>`,
  planet: `<circle r="${R}" fill="url(#plG)" stroke="#4a3428" stroke-width="6"/>
    <ellipse cx="-200" cy="-470" rx="50" ry="12" fill="#a8845e"/><ellipse cx="240" cy="-450" rx="36" ry="9" fill="#a8845e"/><ellipse cx="40" cy="-505" rx="22" ry="6" fill="#a8845e"/>`,
  back: LAMPPOST,
  mid: LL,
  front: `<g id="shPole"><path id="shPoleL" stroke="#6a4a2a" stroke-width="5" stroke-linecap="round"/><circle id="shPoleT" r="5" fill="#e2b04a" stroke="${INK}" stroke-width="2"/></g>
    <g id="sparks"></g><g id="zzG"></g>
    <rect id="night" x="-3000" y="-3000" width="8400" height="7000" fill="#0a1030" opacity="0"/>
    <circle id="lampGlow" cx="${LAMP_X}" cy="${LAMP_Y}" r="260" fill="url(#glowG)" opacity="0"/>`,
  overlay: `<div id="warm"></div>`,
});

export function setup() {
  const K = kitSetup({ R, CX, CY, SUBS });
  { const st = document.querySelector('#stake'), w = document.createElementNS('http://www.w3.org/2000/svg', 'g'); w.id = 'stakeHide'; st.parentNode.insertBefore(w, st); w.appendChild(st); }
  const { tl, cam, A, B, S, G, talk, talkS, talkB, talkG, blinkB, blinkS, $, $$, mk, surf, place } = K;
  const L = (p) => '#LL-' + p;
  { const im = document.createElement('img'); im.id = 'dayImg'; im.src = document.querySelector('#psky img').src.replace('sky_space', 'sky_day');
    im.style.cssText = 'position:absolute;inset:0;width:100%;height:100%'; $('#psky').appendChild(im); }
  $('#day').setAttribute('fill', 'none');
  const X = { ll: { x: 1150, flip: 0, up: 0, walk: 0 }, pole: { phi: 30, on: 0 }, warm: 0 };
  // the back: a gold line traces the LEFT half of the gap, and that half fills
  $('#S-finishBack').setAttribute('clip-path', 'url(#halfBack)');
  $('#S-body .trace').setAttribute('clip-path', 'url(#halfBack)');
  $('#S-body').appendChild($('#S-body .trace')); $('#S-body .trace').setAttribute('stroke-width', 16);   // draw the gold line above the new wool

  tl.set(L('armR'), { rotation: 0, svgOrigin: '22 -222' }, 0).set(L('armL'), { rotation: 0, svgOrigin: '-24 -222' }, 0)
    .set(L('head'), { rotation: 0, svgOrigin: '4 -240' }, 0).set(L('lids'), { scaleY: 0.45, svgOrigin: '0 -284' }, 0)
    .set(L('upper'), { y: 0, rotation: 0, svgOrigin: '0 -20' }, 0).set(L('tears'), { y: 0 }, 0);
  tl.set('#S-walk', { rotation: 0, svgOrigin: '0 0' }, 0);
  const TALK_L = 'M8 -250 Q14 -240 20 -250', REST_L = 'M8 -248 L20 -248', SMILE_L = 'M6 -250 Q14 -242 22 -250', OH_L = 'M10 -250 Q14 -240 18 -250';
  const talkL = (at, dur, rest = REST_L) => talk(L('mouth'), at, dur, TALK_L, rest);
  const blinkL = (at, base = 0.45) => tl.to(L('lids'), { scaleY: 1, duration: 0.07 }, at).to(L('lids'), { scaleY: base, duration: 0.12 }, at + 0.14);
  // the lamplighter lights / snuffs: the pole swings to the lamp and back
  const llLight = (t) => tl.to(L('armR'), { rotation: 72, duration: 0.6, ease: 'sine.inOut' }, t - 0.7).to(L('armR'), { rotation: 0, duration: 0.6, ease: 'sine.inOut' }, t + 0.35);
  // the sheep runs from its post to the lamp, lifts the pole, runs back
  const SX = 1262, REST = 1336;
  const run = (from, to, at, dur) => tl.set(A.sheep, { flip: to > from ? 1 : 0 }, at).to(A.sheep, { walk: 1, duration: 0.12 }, at)
    .to(A.sheep, { x: to, duration: dur, ease: 'sine.inOut' }, at).to(A.sheep, { walk: 0, duration: 0.15 }, at + dur - 0.1);
  const reach = (t, slow = 1) => tl.to(X.pole, { phi: 86, duration: 0.45 * slow, ease: 'power2.out' }, t - 0.45 * slow).to(S('head'), { rotation: 16, duration: 0.45 * slow }, t - 0.45 * slow)
    .to(X.pole, { phi: 30, duration: 0.4 * slow, ease: 'sine.inOut' }, t + 0.3).to(S('head'), { rotation: 0, duration: 0.4 * slow }, t + 0.3);
  const sheepTrip = (t, k, back = true) => {   // k: how tired (1 fresh … 2 worn out)
    run(REST, SX, t - 0.6 - 0.8 * k, 0.8 * k); tl.set(A.sheep, { flip: 0 }, t - 0.6); reach(t, k);
    if (back) { run(SX, REST, t + 0.9, 0.9 * k); tl.set(A.sheep, { flip: 0 }, t + 1.0 + 0.9 * k); }
  };

  [3, 18.0, 24.4, 33.2, 62].forEach(blinkB); [22.0, 31.0, 36.0].forEach((a) => blinkL(a)); [21, 34, 49, 56, 66, 73].forEach(blinkS);
  tl.set('#fade', { opacity: 1 }, 0).to('#fade', { opacity: 0, duration: 2 }, 0);

  // ---------- 0–10 arrival on a tiny planet, in the middle of its "afternoon" ----------
  tl.set(A.st, { carry: 1, lift: 520, liftX: -280, stakeX: 960 }, 0).set(A.box, { on: 0 }, 0).set(A.boy, { x: 1010 }, 0).set(B('armR'), { rotation: -160 }, 0).set(B('armL'), { rotation: 20 }, 0);
  tl.set(cam, { cx: 1100, cy: 420, s: 0.72 }, 0).to(cam, { cx: 1180, cy: 760, s: 1.25, duration: 9, ease: 'sine.inOut' }, 0.5);
  tl.to(A.st, { lift: 0, liftX: 0, duration: 7.5, ease: 'power2.out' }, 0);
  tl.to(B('legL'), { rotation: 10, duration: 0.6, yoyo: true, repeat: 11, ease: 'sine.inOut' }, 0).to(B('legR'), { rotation: -8, duration: 0.7, yoyo: true, repeat: 9, ease: 'sine.inOut' }, 0);
  tl.set(A.box, { on: 1, x: 1062, up: 0 }, 7.6).to(B('armL'), { rotation: 0, duration: 0.5 }, 7.6);
  tl.to(A.st, { carry: 0, duration: 2.4, ease: 'sine.inOut' }, 8.0).to(B('armR'), { rotation: 0, duration: 0.8 }, 8.2);
  tl.set(A.sheep, { x: 1062 }, 0).to(A.sheep, { up: -18, duration: 0.5, ease: 'back.out(2)' }, 8.8);

  // the birds go off to roost while we're here, and come back for the lift-off
  tl.to(['#birds', '#strings', '#stakeHide'], { opacity: 0, duration: 2.0 }, 11.0).to(['#birds', '#strings', '#stakeHide'], { opacity: 1, duration: 2.0 }, 177.0);
  // ---------- 10–48 evening, morning, evening, morning ----------
  talkL(10.4, 1.6); llLight(10.6);
  tl.to(A.sheep, { up: 70, duration: 0.3 }, 11.0).to(A.sheep, { up: -18, duration: 0.4, ease: 'back.out(2)' }, 13.6);   // ducks at the dark, peeks again
  talkL(15.2, 1.4); llLight(15.0);
  tl.to(B('eyes'), { x: 8, y: 0, duration: 0.3 }, 15.4);
  talkB(17.4, 2.6, OH_B);
  talkL(20.6, 2.0); llLight(21.0);
  tl.set(A.sheep, { inBox: 0, x: 1062, up: 50 }, 22.6).to(A.sheep, { x: 1110, duration: 0.5, ease: 'none' }, 22.6).to(A.sheep, { up: 0, duration: 0.5, ease: 'bounce.out' }, 22.6).set(A.sheep, { flip: 1 }, 22.6);
  tl.to(cam, { cx: 1190, cy: 770, s: 1.45, duration: 3, ease: 'sine.inOut' }, 23.0);
  talkB(24.0, 2.6, REST_B);
  talkL(27.0, 2.0); llLight(28.0);
  run(1110, REST, 29.0, 2.2); tl.set(A.sheep, { flip: 0 }, 31.4);
  tl.to(L('head'), { rotation: 8, duration: 0.8 }, 30.0);
  talkL(30.4, 5.6, REST_L);
  tl.to(L('lids'), { scaleY: 0.7, duration: 0.6 }, 34.0).to(L('lids'), { scaleY: 0.45, duration: 0.3 }, 36.2);
  tl.to(S('mouth'), { attr: { d: SAD }, duration: 0.3 }, 35.0);
  talkB(36.8, 1.4, SAD_B);
  tl.to(L('head'), { rotation: 0, duration: 0.5 }, 38.6);
  talkL(39.0, 2.4); llLight(39.2);
  // he nods off standing up: head drops, pole sags… dawn jolts him awake
  tl.to(L('lids'), { scaleY: 1, duration: 0.8 }, 41.4).to(L('head'), { rotation: 22, duration: 1.4, ease: 'sine.in' }, 41.6).to(L('armR'), { rotation: 30, duration: 1.6, ease: 'sine.in' }, 41.8)
    .to(L('upper'), { rotation: 6, duration: 2, ease: 'sine.inOut' }, 42.0);
  tl.to(S('eyes'), { x: -10, y: -4, duration: 0.3 }, 43.0).to(S('mouth'), { attr: { d: OH }, duration: 0.3 }, 43.0);
  tl.to(L('lids'), { scaleY: 0.2, duration: 0.1 }, 46.2).to(L('head'), { rotation: -6, duration: 0.15 }, 46.2).to(L('upper'), { rotation: 0, duration: 0.2 }, 46.2)
    .to(L('armR'), { rotation: 0, duration: 0.2 }, 46.2).to(L('lids'), { scaleY: 0.45, duration: 0.4 }, 47.6).to(L('head'), { rotation: 0, duration: 0.4 }, 47.6);
  tl.to(A.st, { shake: 0.15, duration: 0.05 }, 46.2).to(A.st, { shake: 0, duration: 0.3 }, 46.3);
  talkL(46.4, 1.6, OH_L); llLight(47.4);

  // ---------- 48–72 the offer ----------
  tl.to(cam, { cx: 1250, cy: 790, s: 1.6, duration: 2.5, ease: 'sine.inOut' }, 48.4);
  tl.to(S('eyes'), { x: 0, y: 0, duration: 0.3 }, 48.6).to(S('mouth'), { attr: { d: SMILE }, duration: 0.3 }, 49.6);
  talkS(50.0, 2.0);
  tl.to(L('head'), { rotation: 10, duration: 0.5 }, 52.2).to(L('eyes'), { x: 3, y: 3, duration: 0.3 }, 52.2).to(L('lids'), { scaleY: 0.15, duration: 0.3 }, 52.4);
  talkL(52.6, 1.2, OH_L);
  talkS(54.4, 4.2, BIG);
  tl.to(S('head'), { rotation: 6, duration: 0.3, yoyo: true, repeat: 3 }, 55.0);
  // the ghosts drift in
  [[1418, 60, 0.26], [1386, 18, 0.27], [1478, 96, 0.25]].forEach(([x, up, s], i) => tl.set(A.g[i], { x, up, s, flip: 0 }, 0).to(A.g[i], { op: 0.8, duration: 1.4 }, 58.0 + i * 0.3));
  tl.to(cam, { cx: 1300, cy: 780, s: 1.3, duration: 2.5, ease: 'sine.inOut' }, 58.4);
  talkG(1, 59.6, 2.4, SMILE);
  talkG(3, 62.4, 2.0, SMILE);
  tl.set('#G3-lids', { attr: { opacity: 1 } }, 64.8);   // the supervisor is asleep already
  tl.to(L('lids'), { scaleY: 0.3, duration: 0.3 }, 64.6).to(L('mouth'), { attr: { d: OH_L }, duration: 0.2 }, 64.8);
  talkL(65.0, 2.6, SMILE_L);
  tl.to(S('head'), { rotation: 8, duration: 0.25, yoyo: true, repeat: 1 }, 67.8);
  talkL(68.2, 1.6, OH_L);
  // the pole is handed over; the sheep's first, clumsy lighting
  tl.to(L('armR'), { rotation: 40, duration: 0.6 }, 68.6).set('#llPole', { opacity: 0 }, 69.4).set(X.pole, { on: 1, phi: 10 }, 69.4).to(L('armR'), { rotation: 0, duration: 0.5 }, 69.5);
  tl.to(cam, { cx: 1230, cy: 790, s: 1.55, duration: 2, ease: 'sine.inOut' }, 69.4);
  run(REST, SX, 69.8, 0.9); tl.set(A.sheep, { flip: 0 }, 70.75);
  tl.to(X.pole, { phi: 70, duration: 0.3 }, 70.7).to(X.pole, { phi: 40, duration: 0.25 }, 71.0)   // miss
    .to(X.pole, { phi: 86, duration: 0.3, ease: 'power2.out' }, 71.3).to(S('head'), { rotation: 16, duration: 0.3 }, 71.3)
    .to(X.pole, { phi: 30, duration: 0.4 }, 72.0).to(S('head'), { rotation: 0, duration: 0.4 }, 72.0);
  tl.to(S('mouth'), { attr: { d: BIG }, duration: 0.2 }, 72.4);
  talkS(72.6, 1.4, BIG);

  // ---------- 72–140 the long night of short nights ----------
  // the lamplighter sits against the post and is asleep at once
  tl.set(X.ll, { flip: 1 }, 72.0).to(X.ll, { x: 1188, duration: 0.6 }, 72.0)
    .set(L('legs'), { opacity: 0 }, 72.7).set(L('legsSit'), { opacity: 1 }, 72.7).to(L('upper'), { y: 88, rotation: -8, duration: 0.5, ease: 'power2.in' }, 72.5)
    .to(L('lids'), { scaleY: 1, duration: 0.6 }, 73.2).to(L('head'), { rotation: 16, duration: 1.2 }, 73.4).to(L('armR'), { rotation: 30, duration: 1 }, 73.2).to(L('armL'), { rotation: -20, duration: 1 }, 73.2);
  // the boy sits down to keep watch too…
  tl.to(cam, { cx: 1170, cy: 800, s: 1.35, duration: 2.5, ease: 'sine.inOut' }, 74.2);
  tl.to([B('legL'), B('legR')], { scaleY: 0.5, duration: 0.8, ease: 'sine.inOut' }, 74.4).to(A.boy, { up: -30, duration: 0.8, ease: 'sine.inOut' }, 74.4)
    .to(B('armL'), { rotation: 30, duration: 0.8 }, 74.4).to(B('armR'), { rotation: -30, duration: 0.8 }, 74.4);
  talkB(75.0, 2.6, SMILE_B);
  run(SX, REST, 75.4, 1.0); tl.set(A.sheep, { flip: 0 }, 76.5);
  // …and is asleep in five seconds
  tl.set([B('lidL'), B('lidR')], { opacity: 1 }, 79.0).to(B('head'), { rotation: 14, duration: 1.4 }, 79.0);
  // round 1 (fresh)
  sheepTrip(80.8, 1.0); talkS(81.2, 1.4, BIG);
  tl.to(cam, { cx: 1280, cy: 790, s: 1.5, duration: 3, ease: 'sine.inOut' }, 82.6);
  sheepTrip(89.0, 1.0);
  talkG(1, 90.0, 2.4, BIG); tl.to(G(1, 'head'), { rotation: 10, duration: 0.3, yoyo: true, repeat: 5 }, 90.0);
  sheepTrip(96.2, 1.15);
  tl.to(S('mouth'), { attr: { d: SAYD }, duration: 0.3 }, 98.0).to([S('lidL'), S('lidR')], { scaleY: 0.35, duration: 0.6 }, 98.0);
  // round 4: it stumbles on the way; Horns shoves it back up
  run(REST, 1296, 102.0, 0.8);
  tl.to('#S-walk', { rotation: -24, duration: 0.25, ease: 'power2.in' }, 102.8).to(S('mouth'), { attr: { d: OH }, duration: 0.2 }, 102.8);
  tl.to(A.g[1], { x: 1346, duration: 0.35, ease: 'power2.in' }, 103.2).to('#S-walk', { rotation: 0, duration: 0.3, ease: 'back.out(2)' }, 103.55)
    .to(A.sheep, { x: SX, duration: 0.35, ease: 'power2.out' }, 103.55).to(A.g[1], { x: 1386, duration: 1.2, ease: 'sine.inOut' }, 104.0);
  tl.to(A.st, { shake: 0.12, duration: 0.05 }, 103.5).to(A.st, { shake: 0, duration: 0.3 }, 103.6);
  reach(104.2, 1.2);
  talkG(2, 104.6, 1.6, FIRM); tl.to(G(2, 'head'), { rotation: -10, duration: 0.5 }, 104.6).to(G(2, 'head'), { rotation: 0, duration: 0.6 }, 106.4);
  tl.to(S('eyes'), { x: 12, y: -2, duration: 0.3 }, 104.8).to(S('eyes'), { x: 0, y: 0, duration: 0.3 }, 106.8);
  run(SX, REST, 105.2, 1.3); tl.set(A.sheep, { flip: 0 }, 106.6);
  // round 5: too tired to walk back
  run(REST, SX, 107.2, 1.6); tl.set(A.sheep, { flip: 0 }, 108.8); reach(109.4, 1.4);
  talkG(3, 110.4, 2.2, SMILE);
  tl.to(cam, { cx: 1250, cy: 800, s: 1.7, duration: 4, ease: 'sine.inOut' }, 110.0);
  reach(115.6, 1.6);
  tl.to(S('body'), { scaleY: 0.93, duration: 0.6, yoyo: true, repeat: 3 }, 117.0);
  reach(121.2, 1.8); talkS(121.8, 1.8, SAYD);
  tl.to([S('lidL'), S('lidR')], { scaleY: 0.6, duration: 1 }, 122.0);
  reach(127.4, 1.8);
  // it sits by the post and falls asleep… with the lamp still lit
  tl.to(S('body'), { scaleY: 0.9, duration: 1.0 }, 128.6).to(A.sheep, { up: -6, duration: 1.0 }, 128.6)
    .to([S('lidL'), S('lidR')], { scaleY: 1, duration: 1.4 }, 129.0).to(S('head'), { rotation: -12, duration: 1.4 }, 129.2).to(X.pole, { phi: 4, duration: 1.4 }, 129.2);
  tl.to(cam, { cx: 1290, cy: 790, s: 1.45, duration: 3, ease: 'sine.inOut' }, 130.0);
  // dawn comes — the lamp is still burning
  tl.set('#G3-lids', { attr: { opacity: 0 } }, 133.2);
  talkG(1, 133.8, 1.2, OH); tl.to(A.g[0], { up: 30, x: 1380, duration: 0.6 }, 133.6);
  tl.to(A.g[1], { x: 1440, duration: 0.4, ease: 'sine.out' }, 134.0).to(A.g[1], { x: 1342, duration: 0.3, ease: 'power3.in' }, 134.45)
    .to(A.g[1], { x: 1390, duration: 0.8, ease: 'sine.out' }, 134.8);
  tl.to(A.st, { shake: 0.2, duration: 0.05 }, 134.75).to(A.st, { shake: 0, duration: 0.3 }, 134.85);
  tl.to('#S-walk', { rotation: -10, duration: 0.1 }, 134.75).to('#S-walk', { rotation: 0, duration: 0.4, ease: 'back.out(3)' }, 134.85);
  tl.to([S('lidL'), S('lidR')], { scaleY: 0, duration: 0.1 }, 134.8).to(S('body'), { scaleY: 1, duration: 0.2 }, 134.8).to(A.sheep, { up: 0, duration: 0.2 }, 134.8)
    .to(S('head'), { rotation: 0, duration: 0.2 }, 134.8).to(S('mouth'), { attr: { d: OH }, duration: 0.1 }, 134.8);
  reach(135.8, 0.8);
  talkG(2, 137.0, 1.6, FIRM);
  tl.to(S('mouth'), { attr: { d: SMILE }, duration: 0.3 }, 137.4).to([S('lidL'), S('lidR')], { scaleY: 0.4, duration: 0.5 }, 137.4);

  // ---------- 136–176 a long golden morning ----------
  tl.to(X, { warm: 1, duration: 6, ease: 'sine.inOut' }, 136.0).to(X, { warm: 0.35, duration: 8 }, 176.0);
  tl.to(cam, { cx: 1210, cy: 790, s: 1.55, duration: 3, ease: 'sine.inOut' }, 139.0);
  tl.to(L('lids'), { scaleY: 0.3, duration: 0.6 }, 140.0).to(L('head'), { rotation: 0, duration: 1 }, 140.0);
  tl.to(L('armR'), { rotation: -150, duration: 0.9, ease: 'sine.inOut' }, 140.8).to(L('armL'), { rotation: 150, duration: 0.9, ease: 'sine.inOut' }, 140.8)
    .to(L('armR'), { rotation: 0, duration: 0.7 }, 142.0).to(L('armL'), { rotation: 0, duration: 0.7 }, 142.0);
  tl.to(L('mouth'), { attr: { d: OH_L }, duration: 0.3 }, 140.8);
  talkL(143.0, 1.6, OH_L);
  tl.to(L('lids'), { scaleY: 0, duration: 0.3 }, 144.6);
  // he jumps up
  tl.to(L('upper'), { y: 0, rotation: 0, duration: 0.35, ease: 'power2.out' }, 145.2).set(L('legsSit'), { opacity: 0 }, 145.3).set(L('legs'), { opacity: 1 }, 145.3);
  talkL(145.4, 2.2, SMILE_L);
  tl.to(X.ll, { up: 40, duration: 0.25, ease: 'power2.out', yoyo: true, repeat: 3 }, 146.0).to(L('armR'), { rotation: -140, duration: 0.3 }, 146.0).to(L('armL'), { rotation: 140, duration: 0.3 }, 146.0)
    .to(L('armR'), { rotation: 0, duration: 0.5 }, 147.4).to(L('armL'), { rotation: 0, duration: 0.5 }, 147.4);
  tl.set(X.ll, { flip: 0 }, 148.2).to(X.ll, { x: 1150, duration: 0.6 }, 148.2);
  tl.to(L('tears'), { opacity: 1, duration: 0.4 }, 148.8).to(L('tears'), { y: 12, duration: 3 }, 149.0).to(L('lids'), { scaleY: 0.35, duration: 0.3 }, 148.8);
  talkL(149.0, 4.6, SMILE_L);
  tl.to(cam, { cx: 1220, cy: 790, s: 1.5, duration: 3, ease: 'sine.inOut' }, 149.0);
  tl.to(S('mouth'), { attr: { d: BIG }, duration: 0.4 }, 152.0).to(S('head'), { rotation: 6, duration: 0.6 }, 152.0);
  // the gold line
  tl.to(cam, { cx: 1250, cy: 830, s: 2.6, duration: 2.6, ease: 'sine.inOut' }, 153.4);
  tl.set(X.pole, { on: 0 }, 153.4).set('#llPole', { opacity: 1 }, 153.4);
  tl.to('#S-body .trace', { opacity: 1, duration: 0.8, ease: 'sine.in' }, 155.6).set('#S-body .pencil', { opacity: 0 }, 156.6)
    .to('#S-finishBack', { opacity: 1, duration: 0.6 }, 156.4).to('#S-body .trace', { opacity: 0, duration: 2.4, ease: 'sine.inOut' }, 156.8);
  tl.to('#S-rimBody', { opacity: 0.9, duration: 1 }, 156.0).to('#S-rimBody', { opacity: 0, duration: 3 }, 158.0);
  // keep the unfinished half's pencil edge: show a fresh pencil copy clipped to the right half
  tl.to(S('head'), { rotation: 0, duration: 0.5 }, 157.6).set(A.sheep, { flip: 1 }, 158.2).to(S('eyes'), { x: 10, y: 6, duration: 0.3 }, 158.4).to(S('mouth'), { attr: { d: OH }, duration: 0.3 }, 158.4);
  talkS(159.0, 2.0, OH);
  tl.to(cam, { cx: 1320, cy: 800, s: 1.55, duration: 2.5, ease: 'sine.inOut' }, 161.0);
  tl.set(A.sheep, { flip: 0 }, 161.6).to(S('eyes'), { x: 0, y: 0, duration: 0.3 }, 161.6);
  talkG(3, 162.0, 2.6, SMILE);
  talkG(2, 165.4, 1.6, FIRM); tl.to(G(2, 'head'), { rotation: -12, duration: 0.5 }, 165.2);
  talkG(1, 167.6, 2.4, SAD); tl.to(G(1, 'head'), { rotation: -8, duration: 0.3, yoyo: true, repeat: 3 }, 167.6);
  tl.to(S('mouth'), { attr: { d: BIG }, duration: 0.3 }, 170.0);
  // the boy wakes up having missed everything
  tl.to(cam, { cx: 1170, cy: 800, s: 1.4, duration: 2, ease: 'sine.inOut' }, 169.8);
  tl.set([B('lidL'), B('lidR')], { opacity: 0 }, 170.4).to(B('head'), { rotation: 0, duration: 0.6 }, 170.4);
  talkB(171.0, 2.0, OH_B);
  talkS(173.6, 1.6, SMILE);
  tl.to(S('head'), { rotation: 8, duration: 0.4 }, 175.0);
  A.g.forEach((g, i) => tl.to(g, { op: 0, duration: 1.4 }, 175.4 + i * 0.2));
  tl.to(G(2, 'head'), { rotation: 0, duration: 0.5 }, 175.4);

  // ---------- 176–210 goodbye; evening again; the lamp is lit with a smile ----------
  tl.to([B('legL'), B('legR')], { scaleY: 1, duration: 0.6 }, 176.0).to(A.boy, { up: 0, duration: 0.6 }, 176.0).to([B('armL'), B('armR')], { rotation: 0, duration: 0.6 }, 176.0);
  talkL(177.6, 4.0, SMILE_L); tl.to(L('armL'), { rotation: 140, duration: 0.4 }, 178.0).to(L('armL'), { rotation: 110, duration: 0.4, yoyo: true, repeat: 7 }, 178.4);
  run(SX, 1062, 177.4, 1.6); tl.to(A.sheep, { up: 50, duration: 0.2 }, 179.0).set(A.sheep, { inBox: 1, up: -18, walk: 0 }, 179.2);
  tl.to(A.st, { boyWalk: 1, duration: 0.2 }, 178.2).to(A.boy, { x: 1030, duration: 0.8 }, 178.2).to(A.st, { boyWalk: 0, duration: 0.2 }, 178.8);
  tl.to(B('armL'), { rotation: 20, duration: 0.5 }, 179.6).set(A.box, { on: 0 }, 180.0).to(A.st, { carry: 1, duration: 2.0 }, 180.0).to(B('armR'), { rotation: -160, duration: 0.8 }, 180.0);
  tl.to(A.st, { lift: 650, liftX: 220, duration: 16, ease: 'power1.in' }, 182.0);
  tl.to(B('legL'), { rotation: 10, duration: 0.6, yoyo: true, repeat: 24, ease: 'sine.inOut' }, 182.4);
  tl.to(L('armL'), { rotation: 0, duration: 0.5 }, 181.8); llLight(183.6);
  tl.to(L('head'), { rotation: -10, duration: 1.2 }, 185.0).to(L('mouth'), { attr: { d: SMILE_L }, duration: 0.5 }, 185.0);
  tl.to(L('armL'), { rotation: 150, duration: 0.6 }, 186.0).to(L('armL'), { rotation: 120, duration: 0.5, yoyo: true, repeat: 9 }, 186.6);
  tl.to(cam, { cx: 1230, cy: 620, s: 0.9, duration: 12, ease: 'sine.inOut' }, 183.0).to(cam, { cx: 1220, cy: 760, s: 0.5, duration: 12, ease: 'sine.inOut' }, 195.0);
  tl.to('#fade', { opacity: 1, duration: 4 }, 205.5);

  // ---------- per-frame: day and night, the lamp, the pole in the sheep's mouth, sparks, smoke, zZ ----------
  const nightAt = (t) => { let v = 0, last = -99; for (const [a, n] of SW) { if (t < a) break; last = a; v = n; }
    const prev = SW.findIndex((s) => s[0] === last); const from = prev > 0 ? SW[prev - 1][1] : 0; const u = Math.min(1, (t - last) / 1.6);
    return last < 0 ? 0 : from + (v - from) * u * u * (3 - 2 * u); };
  const lampAt = (t) => { let v = 0, last = -99; for (const [a, n] of LAMP) { if (t < a) break; last = a; v = n; } const u = Math.min(1, (t - last) / 0.25); return v ? u : 1 - u; };
  const sunAt = (t) => { // fraction through the current day, or -1 at night
    let d = 0; for (const [a, n] of SW) { if (a > t) { if (n === 1) return Math.min(1, (t - d) / (a - d)); return -1; } if (n === 0) d = a; }
    return Math.min(1, (t - d) / 40); };
  const sparks = []; for (let i = 0; i < 10; i++) sparks.push(mk('path', $('#sparks'), { d: 'M0 -6 L0 6 M-6 0 L6 0', stroke: '#ffe6a0', 'stroke-width': 2.5, 'stroke-linecap': 'round', opacity: 0 }));
  const smoke = []; for (let i = 0; i < 5; i++) smoke.push(mk('circle', $('#sparks'), { r: 8, fill: '#d8d4cc', opacity: 0 }));
  const zz = []; for (let i = 0; i < 9; i++) { const e = mk('text', $('#zzG'), { class: 'zz', opacity: 0 }); e.textContent = i % 3 === 2 ? 'Z' : 'z'; zz.push(e); }
  const SLEEP = [[[73.6, 140.0], () => [X.ll.x - 40, 800]], [[80.0, 170.2], () => [A.boy.x + 10, 770]], [[129.6, 134.6], () => [A.sheep.x - 50, 850]], [[64.8, 133.2], () => [1460, 760]]];
  const hsh = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const llLegs = { a: 0 };

  return {
    render: (t) => {
      tl.seek(t); K.drive(t);
      const n = nightAt(t), lamp = lampAt(t);
      $('#dayImg').style.opacity = (1 - n).toFixed(3);
      $('#night').setAttribute('opacity', (n * 0.58).toFixed(3));
      $('#lampGlow').setAttribute('opacity', (lamp * (0.3 + 0.7 * n)).toFixed(3));
      $('#flame').setAttribute('opacity', lamp.toFixed(3));
      $('#glass').setAttribute('fill', lamp > 0.5 ? '#ffe9b0' : '#5a5a66');
      $('#lampGlow').setAttribute('r', (250 + Math.sin(t * 9) * 6).toFixed(1));
      const su = sunAt(t);
      if (su < 0) $('#sun').setAttribute('opacity', 0);
      else { $('#sun').setAttribute('opacity', (1 - n).toFixed(3)); $('#sun').setAttribute('cx', (200 + 2000 * su).toFixed(1)); $('#sun').setAttribute('cy', (560 - 420 * Math.sin(Math.PI * su)).toFixed(1)); }
      $('#warm').style.opacity = X.warm.toFixed(3);
      // the lamplighter
      place('#llPos', X.ll.x, X.ll.up, 0.8, X.ll.flip);
      // tally marks of the nights kept
      TALLY.forEach((a, i) => $('#tl' + i).setAttribute('opacity', t >= a + 0.4 ? 1 : 0));
      // the pole in the sheep's mouth
      const sh = A.sheep;
      if (X.pole.on && !sh.inBox) {
        const s = sh.s, f = sh.flip ? -1 : 1, p = surf(sh.x), a = p.a * Math.PI / 180;
        const hr = gsap.getProperty('#S-head', 'rotation') * Math.PI / 180, wr = gsap.getProperty('#S-walk', 'rotation') * Math.PI / 180;
        let mx = -97 - (-60), my = -204 - (-190); [mx, my] = [mx * Math.cos(hr) - my * Math.sin(hr) - 60, mx * Math.sin(hr) + my * Math.cos(hr) - 190];
        [mx, my] = [mx * Math.cos(wr) - my * Math.sin(wr), mx * Math.sin(wr) + my * Math.cos(wr)];
        const lx = mx * s * f, ly = my * s - sh.up;
        const X0 = sh.x + lx * Math.cos(a) - ly * Math.sin(a), Y0 = p.y + lx * Math.sin(a) + ly * Math.cos(a);
        const ph = X.pole.phi * Math.PI / 180, len = 104;
        const X1 = X0 - f * Math.cos(ph) * len * 0.35, Y1 = Y0 + Math.sin(ph) * len * 0.12;   // the stick's tail behind the mouth
        const X2 = X0 - f * Math.cos(ph) * len, Y2 = Y0 - Math.sin(ph) * len;
        $('#shPoleL').setAttribute('d', `M${(2 * X0 - X1).toFixed(1)} ${(2 * Y0 - Y1).toFixed(1)} L${X2.toFixed(1)} ${Y2.toFixed(1)}`);
        $('#shPoleT').setAttribute('cx', X2.toFixed(1)); $('#shPoleT').setAttribute('cy', Y2.toFixed(1));
        $('#shPole').setAttribute('opacity', 1);
      } else $('#shPole').setAttribute('opacity', 0);
      // sparks when lit, a curl of smoke when snuffed
      let lastOn = -99, lastOff = -99; for (const [a, v] of LAMP) { if (a > t) break; if (v) lastOn = a; else lastOff = a; }
      const uo = t - lastOn;
      sparks.forEach((e, i) => { if (uo < 0 || uo > 0.8) { e.setAttribute('opacity', 0); return; } const ang = i / 10 * Math.PI * 2, r = 14 + uo * 90;
        e.setAttribute('transform', `translate(${(LAMP_X + Math.cos(ang) * r).toFixed(1)} ${(LAMP_Y + Math.sin(ang) * r).toFixed(1)}) scale(${(1 - uo).toFixed(2)})`); e.setAttribute('opacity', (1 - uo / 0.8).toFixed(2)); });
      const uf = t - lastOff;
      smoke.forEach((e, i) => { const u = uf - i * 0.15; if (u < 0 || u > 2) { e.setAttribute('opacity', 0); return; }
        e.setAttribute('cx', (LAMP_X + Math.sin(u * 3 + i) * 8 * u).toFixed(1)); e.setAttribute('cy', (LAMP_Y - 20 - u * 50).toFixed(1));
        e.setAttribute('r', (5 + u * 8).toFixed(1)); e.setAttribute('opacity', (0.6 * (1 - u / 2)).toFixed(2)); });
      // zZ above the sleepers
      let k = 0;
      for (const [[a, z], pos] of SLEEP) {
        const [x0, y0] = pos();
        for (let j = 0; j < 2 && k < zz.length; j++, k++) {
          const u = ((t - a) / 2.4 + j * 0.5) % 1, on = t > a + 0.8 && t < z;
          zz[k].setAttribute('opacity', on ? (Math.sin(Math.PI * u) * 0.85).toFixed(2) : 0);
          zz[k].setAttribute('x', (x0 + u * 30 + j * 6).toFixed(1)); zz[k].setAttribute('y', (y0 - u * 60).toFixed(1));
          zz[k].setAttribute('font-size', (18 + u * 14).toFixed(1));
        }
      }
    },
  };
}
