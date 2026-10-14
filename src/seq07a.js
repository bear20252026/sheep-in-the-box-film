// SEQ 7a — THE KING (~2:30). A purple planet entirely covered by one enormous red robe. The King has
// no subjects, so the boy will do. He only gives orders that would happen anyway — until he orders
// the sheep to eat a flower, and the sheep, for the first time, says no.
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {kitCss, kitHtml, kitSetup, INK, SMILE, BIG, OH, SAYD, SAD, FIRM, WORRY, TALK_B, REST_B, SMILE_B, BIG_B, SAD_B, OH_B, YAWN_B} from './planetkit.js';

export const DURATION = 150;
const R = 700, CX = 1200, CY = 1600;

const SUBS = [
  [12.5, 15.0, 'Ah! A SUBJECT!', '啊！一个臣民！'],
  [16.0, 17.6, 'Good morning.', '早上好。'],
  [18.2, 21.6, 'Approach, so that I may see you better.', '走近些，让朕好好看看你。'],
  [25.4, 27.6, 'It is rude to yawn before a king.', '在国王面前打哈欠可不礼貌。'],
  [28.0, 31.0, 'I can’t help it. I flew all night…', '我忍不住嘛。我飞了一整夜……'],
  [32.6, 36.2, 'Then I ORDER you to yawn! Excellent obedience!', '那朕命令你打哈欠！服从得很好！'],
  [37.0, 40.4, 'You only order what would happen anyway.', '你只命令那些本来就会发生的事。'],
  [41.0, 44.4, 'That is the secret of a reasonable king.', '这就是一位明智国王的秘诀。'],
  [46.0, 48.0, 'And what is THAT?', '那是什么东西？'],
  [48.6, 49.8, 'My sheep.', '我的羊。'],
  [50.6, 53.6, 'A sheep! Sheep EAT, do they not?', '一只羊！羊是要吃东西的，对吧？'],
  [54.4, 58.0, 'I order you… to eat that flower!', '朕命令你……吃掉那朵花！'],
  [59.0, 61.6, 'Obey… obey…', '服从……服从……'],
  [62.0, 63.6, 'He’s a KING.', '他可是国王。'],
  [71.0, 72.2, 'No.', '不。'],
  [74.5, 79.5, '…I ORDER you to say no! Excellent obedience!', '……朕命令你说不！服从得很好！'],
  [80.0, 81.6, 'Did he just—', '他刚才是不是——'],
  [82.0, 84.6, 'It said no. To a KING.', '它说了不。对一个国王。'],
  [85.0, 86.2, 'Hm.', '嗯。'],
  [92.6, 96.4, 'Stay! I shall make you… Minister of Justice!', '留下来！朕封你做……司法大臣！'],
  [97.0, 100.6, 'But who would I judge? There’s nobody here.', '可是我审判谁呢？这里一个人也没有。'],
  [101.4, 106.0, 'Then judge yourself. That is much harder than judging others.', '那就审判你自己。这比审判别人难多了。'],
  [107.0, 110.0, 'I have to go. My rose is waiting.', '我得走了。我的玫瑰在等我。'],
  [113.4, 115.6, 'Then I order you to go!', '那朕命令你走！'],
  [116.4, 119.4, 'Go on. Before I change my mind.', '去吧。趁朕还没改主意。'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('');

export const css = kitCss('radial-gradient(ellipse at 50% 40%, #2a1d4a 0%, #120b26 60%, #07040f 100%)');

const KING = `
<g id="king" transform="translate(1345 914) scale(0.86)">
 <g filter="url(#wcBoy)">
  <path d="M-70 0 L-70 -170 Q0 -210 70 -170 L70 0Z" fill="#e2b04a" stroke="${INK}" stroke-width="4"/>
  <path d="M-46 0 L-50 -140 Q0 -170 50 -140 L46 0Z" fill="#c8323a" stroke="${INK}" stroke-width="4"/>
  <path d="M-52 -150 Q0 -120 52 -150" fill="none" stroke="#fff8ee" stroke-width="14"/>
  <g id="KG-armL"><path d="M-40 -150 Q-70 -110 -66 -70" stroke="#c8323a" stroke-width="26" stroke-linecap="round" fill="none"/><circle cx="-66" cy="-62" r="11" fill="#f4d4b8" stroke="${INK}" stroke-width="3"/></g>
  <g id="KG-armR"><path d="M40 -150 Q70 -110 66 -70" stroke="#c8323a" stroke-width="26" stroke-linecap="round" fill="none"/><path d="M52 -84 L80 -84" stroke="#fff8ee" stroke-width="10"/><circle cx="66" cy="-62" r="11" fill="#f4d4b8" stroke="${INK}" stroke-width="3"/></g>
  <g id="KG-head">
   <circle cx="0" cy="-200" r="38" fill="#f4d4b8" stroke="${INK}" stroke-width="4"/>
   <path d="M-34 -192 C-36 -150 -14 -128 0 -124 C14 -128 36 -150 34 -192 C20 -176 -20 -176 -34 -192Z" fill="#fbf8f2" stroke="${INK}" stroke-width="3"/>
   <path d="M-20 -194 Q-10 -186 0 -192 Q10 -186 20 -194" fill="#fbf8f2" stroke="${INK}" stroke-width="2.6"/>
   <g id="KG-eyes"><ellipse cx="-13" cy="-208" rx="4" ry="5" fill="${INK}"/><ellipse cx="13" cy="-208" rx="4" ry="5" fill="${INK}"/></g>
   <path d="M-22 -220 Q-13 -226 -5 -220 M5 -220 Q13 -226 22 -220" fill="none" stroke="#fbf8f2" stroke-width="5" stroke-linecap="round"/>
   <rect id="KG-lidL" x="-19" y="-215" width="12" height="13" fill="#f4d4b8" opacity="0"/><rect id="KG-lidR" x="7" y="-215" width="12" height="13" fill="#f4d4b8" opacity="0"/>
   <path id="KG-mouth" d="M-8 -180 Q0 -176 8 -180" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
   <path d="M-30 -232 L-30 -260 L-16 -244 L0 -268 L16 -244 L30 -260 L30 -232Z" fill="#f2c24a" stroke="#8a6020" stroke-width="3" stroke-linejoin="round"/>
   <circle cx="0" cy="-246" r="4" fill="#c8323a"/>
  </g>
 </g></g>`;
const ROBE = `<g filter="url(#wcPl)" transform="translate(45 0)">
 <path d="M1270 790 C1150 830 950 900 640 1200 L1960 1200 C1650 900 1450 830 1330 790Z" fill="#b82a34" stroke="#5a1a20" stroke-width="5"/>
 <path d="M1270 790 C1150 830 950 900 640 1200 M1330 790 C1450 830 1650 900 1960 1200" fill="none" stroke="#fff8ee" stroke-width="26"/>
 <g fill="#2a2030">${Array.from({ length: 16 }, (_, i) => { const u = i / 15, x1 = 1270 - u * 630, y1 = 790 + u * 410, x2 = 1330 + u * 630; return `<circle cx="${(x1 + 6).toFixed(0)}" cy="${y1.toFixed(0)}" r="4"/><circle cx="${(x2 - 6).toFixed(0)}" cy="${y1.toFixed(0)}" r="4"/>`; }).join('')}</g>
 <path d="M980 960 Q1100 930 1200 950 M1400 950 Q1500 935 1620 965" fill="none" stroke="#8a1c26" stroke-width="5" opacity=".6"/></g>`;
const WEED = `<g id="weed" transform="translate(1500 940)"><path d="M0 0 C-2 -16 3 -28 0 -42" stroke="#5a8a4a" stroke-width="4" fill="none"/>
 <g id="weedHead" transform="translate(0 -44)">${[0, 72, 144, 216, 288].map((a) => `<ellipse cx="0" cy="-9" rx="5" ry="9" fill="#b48ae0" stroke="${INK}" stroke-width="2" transform="rotate(${a})"/>`).join('')}<circle r="4.5" fill="#f2c24a"/></g>
 <ellipse cx="0" cy="2" rx="14" ry="4" fill="#3a1018"/></g>`;

export const html = (IMG) => kitHtml({
  IMG, skyFilter: 'hue-rotate(28deg) saturate(1.05) brightness(.95)', light: '#ffd8f0',
  R, CX, CY,
  defs: `<radialGradient id="plG" cx="40%" cy="30%" r="70%"><stop offset="0" stop-color="#b08ae0"/><stop offset="1" stop-color="#4a2c78"/></radialGradient>`,
  planet: `<circle r="${R}" fill="url(#plG)" stroke="#2a1848" stroke-width="6"/>`,
  back: ROBE,
  mid: KING + WEED,
});

export function setup() {
  const K = kitSetup({ R, CX, CY, SUBS });
  const { tl, cam, A, B, S, G, talk, talkS, talkB, talkG, blinkB, blinkS, $ } = K;
  const KG = (p) => '#KG-' + p;
  tl.set(KG('armR'), { rotation: 0, svgOrigin: '40 -150' }, 0).set(KG('armL'), { rotation: 0, svgOrigin: '-40 -150' }, 0).set(KG('head'), { rotation: 0, svgOrigin: '0 -170' }, 0);
  const TALK_K = 'M-9 -182 Q0 -170 9 -182', REST_K = 'M-8 -180 Q0 -176 8 -180', BIG_K = 'M-11 -183 Q0 -166 11 -183', OH_K = 'M-5 -181 Q0 -172 5 -181';
  const talkK = (at, dur, rest = REST_K) => talk(KG('mouth'), at, dur, TALK_K, rest);
  const blinkK = (at) => tl.set([KG('lidL'), KG('lidR')], { opacity: 1 }, at).set([KG('lidL'), KG('lidR')], { opacity: 0 }, at + 0.14);
  [3, 17, 33.5, 45, 66, 88, 108, 121, 134].forEach(blinkB); [9, 24, 40, 52, 76.6, 99, 112].forEach(blinkK); [20, 47, 68, 90, 104].forEach(blinkS);

  tl.set('#fade', { opacity: 1 }, 0).to('#fade', { opacity: 0, duration: 2 }, 0);
  // 0–12 arrival
  tl.set(A.st, { carry: 1, lift: 560, liftX: 320 }, 0).set(A.box, { on: 0 }, 0).set(A.boy, { x: 1000 }, 0).set(B('armR'), { rotation: -160 }, 0).set(B('armL'), { rotation: 20 }, 0);
  tl.set(cam, { cx: 1300, cy: 420, s: 0.72 }, 0).to(cam, { cx: 1150, cy: 760, s: 1.15, duration: 10, ease: 'sine.inOut' }, 0.5);
  tl.to(A.st, { lift: 0, liftX: 0, duration: 8, ease: 'power2.out' }, 0);
  tl.to(B('legL'), { rotation: 10, duration: 0.6, yoyo: true, repeat: 11, ease: 'sine.inOut' }, 0).to(B('legR'), { rotation: -8, duration: 0.7, yoyo: true, repeat: 9, ease: 'sine.inOut' }, 0);
  tl.set(A.box, { on: 1, x: 1062, up: 0 }, 8.0).to(B('armL'), { rotation: 0, duration: 0.5 }, 8.0);
  tl.to(A.st, { carry: 0, duration: 2.4, ease: 'sine.inOut' }, 8.4).to(B('armR'), { rotation: 0, duration: 0.8 }, 8.6);
  tl.to(A.sheep, { up: -18, duration: 0.5, ease: 'back.out(2)' }, 9.6).to(S('eyes'), { x: 6, y: -6, duration: 0.3 }, 9.8);
  tl.set(A.sheep, { inBox: 0, x: 1080, up: 60 }, 11.2).to(A.sheep, { x: 1130, duration: 0.6, ease: 'none' }, 11.2).to(A.sheep, { up: 0, duration: 0.6, ease: 'bounce.out' }, 11.2);
  // 12–45 the King
  tl.to(KG('armR'), { rotation: -100, duration: 0.4, ease: 'back.out(2)' }, 12.4).to(KG('mouth'), { attr: { d: BIG_K }, duration: 0.2 }, 12.4);
  talkK(12.5, 2.5, BIG_K);
  tl.to(A.boy, { up: 22, duration: 0.18, yoyo: true, repeat: 1, ease: 'power2.out' }, 12.7).to(A.sheep, { up: 30, duration: 0.18, yoyo: true, repeat: 1 }, 12.8).to(S('earN'), { rotation: -26, duration: 0.15, yoyo: true, repeat: 1 }, 12.8);
  tl.to(B('eyes'), { x: 8, y: -2, duration: 0.3 }, 13.0).to(S('eyes'), { x: -10, y: -6, duration: 0.3 }, 13.0).set(A.sheep, { flip: 1 }, 13.0);
  tl.to(cam, { cx: 1200, cy: 760, s: 1.3, duration: 3, ease: 'sine.inOut' }, 13.2);
  talkB(16.0, 1.6);
  tl.to(KG('armR'), { rotation: -60, duration: 0.5 }, 18.0).to(KG('armR'), { rotation: -80, duration: 0.3, yoyo: true, repeat: 3 }, 18.6).to(KG('armR'), { rotation: 0, duration: 0.6 }, 21.8);
  talkK(18.2, 3.4);
  tl.to(A.st, { boyWalk: 1, duration: 0.3 }, 22.0).to(A.boy, { x: 1120, duration: 2.4, ease: 'sine.inOut' }, 22.0).to(A.st, { boyWalk: 0, duration: 0.3 }, 24.2);
  tl.to(A.sheep, { walk: 1, duration: 0.2 }, 22.4).to(A.sheep, { x: 1185, duration: 1.8, ease: 'sine.inOut' }, 22.4).to(A.sheep, { walk: 0, duration: 0.2 }, 24.0);
  tl.to(B('mouth'), { attr: { d: YAWN_B }, duration: 0.3 }, 24.6).set([B('lidL'), B('lidR')], { opacity: 1 }, 24.7).set([B('lidL'), B('lidR')], { opacity: 0 }, 25.4).to(B('mouth'), { attr: { d: REST_B }, duration: 0.3 }, 25.3);
  tl.to(KG('head'), { rotation: -8, duration: 0.4 }, 25.2);
  talkK(25.4, 2.2);
  talkB(28.0, 3.0, REST_B);
  tl.to(B('mouth'), { attr: { d: YAWN_B }, duration: 0.3 }, 31.0).to([B('armL')], { rotation: 150, duration: 0.6 }, 31.0).to([B('armR')], { rotation: -150, duration: 0.6 }, 31.0)
    .set([B('lidL'), B('lidR')], { opacity: 1 }, 31.2).set([B('lidL'), B('lidR')], { opacity: 0 }, 32.2).to([B('armL'), B('armR')], { rotation: 0, duration: 0.6 }, 32.2).to(B('mouth'), { attr: { d: REST_B }, duration: 0.3 }, 32.2);
  tl.to(KG('armR'), { rotation: -120, duration: 0.3, ease: 'back.out(3)' }, 32.6).to(KG('head'), { rotation: 6, duration: 0.3 }, 32.6);
  talkK(32.6, 3.6, BIG_K);
  tl.to(KG('armR'), { rotation: 0, duration: 0.6 }, 36.4).to(KG('head'), { rotation: 0, duration: 0.6 }, 36.4);
  tl.to(B('head'), { rotation: 8, duration: 0.6 }, 36.8);
  talkB(37.0, 3.4, SMILE_B);
  tl.to(cam, { cx: 1260, cy: 740, s: 1.6, duration: 3, ease: 'sine.inOut' }, 40.4);
  talkK(41.0, 3.4, BIG_K);
  tl.to(KG('head'), { rotation: -10, duration: 0.6, ease: 'sine.inOut' }, 41.4).to(KG('head'), { rotation: 0, duration: 0.6 }, 44.4);
  // 45–70 the order
  tl.to(KG('eyes'), { x: 6, y: 6, duration: 0.3 }, 45.4).to(KG('head'), { rotation: 12, duration: 0.5 }, 45.6);
  tl.to(cam, { cx: 1230, cy: 760, s: 1.25, duration: 2.5, ease: 'sine.inOut' }, 45.4);
  talkK(46.0, 2.0, OH_K);
  talkB(48.6, 1.2);
  talkK(50.6, 3.0, BIG_K);
  tl.to(KG('armR'), { rotation: -70, duration: 0.6, ease: 'back.out(2)' }, 54.4).to(KG('eyes'), { x: 10, y: 8, duration: 0.3 }, 54.4);
  talkK(54.4, 3.6, BIG_K);
  tl.to(cam, { cx: 1440, cy: 860, s: 2.4, duration: 2.0, ease: 'sine.inOut' }, 56.0);   // on the flower
  tl.to('#weedHead', { rotation: -12, duration: 0.12, yoyo: true, repeat: 9, svgOrigin: '0 0' }, 57.2);
  tl.to(cam, { cx: 1260, cy: 800, s: 1.7, duration: 2.0, ease: 'sine.inOut' }, 58.6);
  A.g.forEach((g, i) => tl.set(g, { x: [1050, 1380, 1120][i], up: [90, 110, 40][i], s: 0.26, flip: i === 1 ? 0 : 1 }, 58.0).to(g, { op: 0.85, duration: 1.2 }, 58.2 + i * 0.3));
  talkG(2, 59.0, 2.6, SMILE); talkG(1, 62.0, 1.6, OH);
  tl.to(S('eyes'), { x: -12, y: 4, duration: 0.3 }, 60.0).set(A.sheep, { flip: 0 }, 60.0);                // the flower
  tl.to(S('eyes'), { x: -12, y: -10, duration: 0.3 }, 62.8).set(A.sheep, { flip: 1 }, 62.8);              // the King
  tl.to(S('eyes'), { x: 10, y: -8, duration: 0.3 }, 64.8).set(A.sheep, { flip: 0 }, 64.8);               // the boy
  tl.to(B('mouth'), { attr: { d: SAD_B }, duration: 0.3 }, 64.6).to(B('eyes'), { x: 6, y: 6, duration: 0.3 }, 64.6);
  tl.to(cam, { cx: 1210, cy: 820, s: 2.2, duration: 5, ease: 'sine.inOut' }, 64.0);
  tl.to(S('mouth'), { attr: { d: WORRY }, duration: 0.3 }, 66.0).to(S('head'), { rotation: -6, duration: 1.2, ease: 'sine.inOut' }, 66.4)
    .to(S('eyes'), { x: -2, y: 6, duration: 0.6 }, 67.0).to(S('earN'), { rotation: 18, duration: 1 }, 67.0);
  // 70–92 "No."
  tl.to(S('head'), { rotation: 4, duration: 0.5 }, 70.4).to(S('eyes'), { x: -10, y: -8, duration: 0.3 }, 70.4).set(A.sheep, { flip: 1 }, 70.4).to(S('earN'), { rotation: 0, duration: 0.6, ease: 'elastic.out(1,0.4)' }, 70.6);
  talkS(71.0, 1.2, FIRM);
  tl.to(cam, { cx: 1250, cy: 780, s: 1.5, duration: 1.2, ease: 'power2.out' }, 72.6);
  tl.to(KG('eyes'), { scale: 1.6, duration: 0.2, svgOrigin: '0 -208' }, 72.4).to(KG('armR'), { rotation: 0, duration: 0.6 }, 72.6);
  blinkK(73.6); blinkK(74.0);
  tl.to(KG('eyes'), { scale: 1, duration: 0.3, svgOrigin: '0 -208' }, 74.3).to(KG('armR'), { rotation: -120, duration: 0.3, ease: 'back.out(3)' }, 74.6);
  talkK(74.5, 5.0, BIG_K);
  tl.to(KG('armR'), { rotation: 0, duration: 0.6 }, 79.8);
  talkG(2, 80.0, 1.6, OH); talkG(1, 82.0, 2.6, OH); talkG(3, 85.0, 1.2, SMILE);
  tl.to(G(2, 'eyes'), { x: 10, duration: 0.3 }, 80).to(G(3, 'head'), { rotation: 8, duration: 0.8 }, 85);
  A.g.forEach((g, i) => tl.to(g, { op: 0, duration: 1.6 }, 87.0 + i * 0.3));
  tl.to(B('mouth'), { attr: { d: BIG_B }, duration: 0.3 }, 87.6).to(A.st, { boyWalk: 1, duration: 0.2 }, 88.0).to(A.boy, { x: 1150, duration: 0.6 }, 88.0).to(A.st, { boyWalk: 0, duration: 0.2 }, 88.5)
    .to([B('armL')], { rotation: -40, duration: 0.4 }, 88.6).to([B('armR')], { rotation: 40, duration: 0.4 }, 88.6).to(A.boy, { up: 10, duration: 0.2, yoyo: true, repeat: 3 }, 88.8)
    .to(S('mouth'), { attr: { d: BIG }, duration: 0.3 }, 88.8).to([B('armL'), B('armR')], { rotation: 0, duration: 0.5 }, 90.8);
  tl.to(cam, { cx: 1250, cy: 760, s: 1.35, duration: 3, ease: 'sine.inOut' }, 90.6);
  // 92–125 Minister of Justice
  tl.to(KG('armR'), { rotation: -110, duration: 0.4, ease: 'back.out(2)' }, 92.6);
  talkK(92.6, 3.8, BIG_K);
  tl.to(KG('armR'), { rotation: 0, duration: 0.5 }, 96.4);
  talkB(97.0, 3.6, REST_B);
  tl.to(B('armL'), { rotation: 60, duration: 0.5 }, 97.4).to(B('armL'), { rotation: 0, duration: 0.5 }, 100.4);
  tl.to(KG('head'), { rotation: -6, duration: 1.0 }, 101.0).to(KG('eyes'), { x: -4, y: 4, duration: 0.4 }, 101.0);
  talkK(101.4, 4.6, REST_K);
  tl.to(cam, { cx: 1250, cy: 780, s: 1.8, duration: 4, ease: 'sine.inOut' }, 104.0);
  tl.to(B('head'), { rotation: -6, duration: 0.6 }, 106.6);
  talkB(107.0, 3.0, SAD_B);
  tl.to(KG('mouth'), { attr: { d: 'M-8 -177 Q0 -182 8 -177' }, duration: 0.4 }, 110.4).to(KG('head'), { rotation: -12, duration: 1.2 }, 110.4);
  tl.to(KG('head'), { rotation: 4, duration: 0.4 }, 113.2).to(KG('armR'), { rotation: -120, duration: 0.3, ease: 'back.out(3)' }, 113.4);
  talkK(113.4, 2.2, BIG_K);
  tl.to(KG('armR'), { rotation: -40, duration: 0.6 }, 115.8).to(KG('head'), { rotation: -4, duration: 0.6 }, 116.0);
  talkK(116.4, 3.0, 'M-9 -181 Q0 -174 9 -181');
  tl.to(B('mouth'), { attr: { d: SMILE_B }, duration: 0.3 }, 119.6).to(B('armR'), { rotation: -150, duration: 0.4, yoyo: true, repeat: 3 }, 119.8);
  // 121–150 lift-off
  tl.to(cam, { cx: 1150, cy: 700, s: 1.1, duration: 4, ease: 'sine.inOut' }, 121.0);
  tl.to(A.sheep, { walk: 1, duration: 0.2 }, 121.4).set(A.sheep, { flip: 0 }, 121.4).to(A.sheep, { x: 1080, duration: 1.2, ease: 'sine.inOut' }, 121.4).to(A.sheep, { walk: 0, duration: 0.2 }, 122.4)
    .to(A.sheep, { up: 50, duration: 0.25, ease: 'power2.out' }, 122.6).set(A.sheep, { inBox: 1, up: -18 }, 122.9);
  tl.to(A.st, { boyWalk: 1, duration: 0.2 }, 122.4).to(A.boy, { x: 1030, duration: 1.4, ease: 'sine.inOut' }, 122.4).to(A.st, { boyWalk: 0, duration: 0.2 }, 123.6);
  tl.to(B('armL'), { rotation: 20, duration: 0.5 }, 124.0).set(A.box, { on: 0 }, 124.4).to(A.st, { carry: 1, duration: 2.4, ease: 'sine.inOut' }, 124.6).to(B('armR'), { rotation: -160, duration: 0.8 }, 124.6);
  tl.to(A.st, { lift: 700, liftX: -200, duration: 18, ease: 'power1.in' }, 127.0);
  tl.to(B('legL'), { rotation: 10, duration: 0.6, yoyo: true, repeat: 30, ease: 'sine.inOut' }, 127.4).to(B('legR'), { rotation: -8, duration: 0.7, yoyo: true, repeat: 26, ease: 'sine.inOut' }, 127.4);
  tl.to(KG('armR'), { rotation: -150, duration: 0.5, yoyo: true, repeat: 15, ease: 'sine.inOut' }, 128.0);
  tl.to(cam, { cx: 1150, cy: 420, s: 0.6, duration: 18, ease: 'sine.inOut' }, 128.0);
  tl.to('#fade', { opacity: 1, duration: 3.5 }, 146.5);

  return { render: (t) => { tl.seek(t); K.drive(t); } };
}
