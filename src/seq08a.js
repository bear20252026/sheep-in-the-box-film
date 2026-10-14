// SEQ 8a — THE STORM OF STARS (1:30). Flying home, nearly there: "Three more stars." Then comets, wind and lightning.
// The strings snap one by one. The box slips from the boy's arm — fingers touch it — and it falls away into the dark.
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {kitCss, kitHtml, kitSetup, INK, SMILE, BIG, OH, SAYD, SAD, FIRM, WORRY, TALK_B, REST_B, SMILE_B, BIG_B, SAD_B, OH_B} from './planetkit.js';

export const DURATION = 90;
const R = 2000, CX = 1200, CY = 5000;     // no ground here: the "planet" is far below, out of sight
const GROUND = CY - R;                     // 3000; the boy flies at lift ≈ 2400

const SUBS = [
  [4.0, 7.6, 'Three more stars, and we’re home.', '再飞过三颗星星，我们就到家了。'],
  [8.4, 10.4, 'What is home like?', '家是什么样的？', 'say'],
  [11.2, 17.0, 'Small. Three volcanoes. And a flower who is a little bit proud.', '很小。三座火山。还有一朵有点骄傲的花。'],
  [17.8, 20.4, 'I’ll be very nice to her.', '我会对她很好的。', 'say'],
  [21.2, 23.0, 'I know you will.', '我知道你会的。'],
  [27.0, 28.6, 'What’s that?', '那是什么？', 'say'],
  [31.4, 33.0, 'Hold on tight!', '抓紧了！'],
  [47.6, 49.4, 'Hold on, sheep!', '抓住，小羊！'],
  [60.0, 61.0, 'Boy!', '男孩！', 'say'],
  [61.4, 62.8, 'SHEEP!', '小羊！'],
  [66.0, 68.0, 'SHEEEEP!', '小——羊——！'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('');

const SNAP = [40.8, 46.2, 52.4];          // birds 0, 4, 1 lose their strings
const SNAP_BIRD = [0, 4, 1];
const BOLTS = [40.5, 43.6, 45.9, 50.0, 52.1, 55.4, 58.6];
const COMETS = [[25.6, 0], [29.8, 1], [33.6, 2], [37.0, 3], [42.4, 4], [48.6, 5], [54.0, 6]];
const T0 = 60.8;                          // the box slips

export const css = kitCss('radial-gradient(ellipse at 50% 40%, #1a1d3a 0%, #0b0c1c 60%, #04040a 100%)') + `
#stars{display:none}
#stormTint{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 40%,rgba(90,40,140,.25),rgba(20,10,40,.85));opacity:0}
#flash{position:absolute;inset:0;pointer-events:none;background:#e8e4ff;opacity:0;mix-blend-mode:screen}
`;

export const html = (IMG) => kitHtml({
  IMG, noTex: 1, skyFilter: 'hue-rotate(18deg) brightness(.9)',
  R, CX, CY,
  planet: `<circle r="${R}" fill="#000" opacity="0"/>`,
  defs: `<radialGradient id="farG" cx="40%" cy="30%" r="70%"><stop offset="0" stop-color="#8a8a8e"/><stop offset="1" stop-color="#2a2a30"/></radialGradient>
    <linearGradient id="tailG" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff4d0" stop-opacity=".9"/><stop offset="1" stop-color="#9ab8ff" stop-opacity="0"/></linearGradient>`,
  sky: `<g id="sf"></g><g id="far" opacity="0"><circle cx="1320" cy="1250" r="260" fill="url(#farG)" stroke="#1a1a20" stroke-width="5"/>
    <path d="M1150 1110 q60 30 40 90 M1380 1030 q-20 60 30 100 M1240 1020 l30 50 l-20 40" fill="none" stroke="#1a1a20" stroke-width="5"/></g>
    <g id="comets"></g>`,
  front: `<g id="windG" stroke="#d8d0ff" stroke-linecap="round"></g><g id="bolt" fill="none" stroke="#f4f0ff" stroke-width="6" stroke-linejoin="round" opacity="0"><path id="boltP"/></g>`,
  overlay: `<div id="stormTint"></div><div id="flash"></div>`,
});

export function setup() {
  const K = kitSetup({ R, CX, CY, SUBS, halfBack: 1 });
  const { tl, cam, A, B, S, G, talkS, talkB, blinkB, $, mk } = K;
  const st = { storm: 0, wind: 0 };
  const LIFT = 2400;
  tl.set(A.st, { carry: 1, lift: LIFT, liftX: 0, stakeX: 1200 }, 0).set(A.box, { on: 0 }, 0).set(A.boy, { x: 1200 }, 0)
    .set(B('armR'), { rotation: -160 }, 0).set(B('armL'), { rotation: 20 }, 0).set(A.sheep, { inBox: 1, up: -18, x: 1200 }, 0);
  tl.set('#fade', { opacity: 1 }, 0).to('#fade', { opacity: 0, duration: 2.5 }, 0);
  tl.set(cam, { cx: 1180, cy: 420, s: 1.15 }, 0).to(cam, { cx: 1160, cy: 440, s: 1.5, duration: 8, ease: 'sine.inOut' }, 1);
  tl.to(B('legL'), { rotation: 10, duration: 0.8, yoyo: true, repeat: 29, ease: 'sine.inOut' }, 0).to(B('legR'), { rotation: -8, duration: 0.9, yoyo: true, repeat: 25, ease: 'sine.inOut' }, 0);
  [3.2, 10.8, 18.6, 25.0].forEach(blinkB);
  // the calm: almost home
  talkB(4.0, 3.6, SMILE_B);
  tl.to(B('head'), { rotation: 12, duration: 0.6 }, 7.8);
  talkS(8.4, 2.0, SMILE);
  talkB(11.2, 5.8, SMILE_B);
  talkS(17.8, 2.6, BIG);
  tl.to(B('head'), { rotation: 0, duration: 0.6 }, 21.0);
  talkB(21.2, 1.8, SMILE_B);
  // something on the horizon
  tl.to(st, { wind: 0.35, duration: 6 }, 23.0).to(cam, { cx: 1260, cy: 420, s: 1.25, duration: 4, ease: 'sine.inOut' }, 24.0);
  tl.to(S('eyes'), { x: 12, y: -6, duration: 0.3 }, 26.4).to(S('mouth'), { attr: { d: OH }, duration: 0.2 }, 26.6);
  talkS(27.0, 1.6, OH);
  tl.to(B('mouth'), { attr: { d: OH_B }, duration: 0.2 }, 29.6).to(B('eyes'), { x: 8, y: -4, duration: 0.3 }, 29.6);
  tl.to(st, { storm: 1, wind: 1, duration: 8, ease: 'sine.in' }, 30.0);
  talkB(31.4, 1.6, BIG_B);
  tl.to(A.sheep, { up: 70, duration: 0.4 }, 33.2);
  tl.to(cam, { cx: 1180, cy: 440, s: 1.45, duration: 4, ease: 'sine.inOut' }, 34.0);
  // the storm: shaking, legs kicking, strings snapping
  for (let a = 36; a < 60; a += 0.9) tl.to(A.st, { shake: 0.25 + 0.15 * Math.sin(a), duration: 0.3 }, a).to(A.st, { shake: 0.1, duration: 0.5 }, a + 0.35);
  tl.to(B('legR'), { rotation: 18, duration: 0.25, yoyo: true, repeat: 60, ease: 'sine.inOut' }, 36.0);
  SNAP.forEach((a, k) => tl.to(A.st, { lift: LIFT - 60 * (k + 1), duration: 0.25, ease: 'power2.in' }, a).to(A.st, { shake: 0.9, duration: 0.05 }, a).to(A.st, { shake: 0.2, duration: 0.6 }, a + 0.1)
    .to(B('mouth'), { attr: { d: BIG_B }, duration: 0.1 }, a).to(B('mouth'), { attr: { d: OH_B }, duration: 0.3 }, a + 0.8));
  talkB(47.6, 1.8, BIG_B);
  tl.to(A.sheep, { up: -10, duration: 0.3 }, 48.0).to(A.sheep, { up: 70, duration: 0.3 }, 50.0);
  // the strap slides down his arm…
  tl.to(cam, { cx: 1170, cy: 590, s: 1.7, duration: 2.5, ease: 'sine.inOut' }, 57.0);
  tl.to(B('armL'), { rotation: -10, duration: 0.4, ease: 'power2.in' }, 58.6).to(B('armL'), { rotation: 8, duration: 0.3 }, 59.0)
    .to(B('armL'), { rotation: -25, duration: 0.3, ease: 'power2.in' }, 59.8);
  tl.to(A.sheep, { up: -30, duration: 0.3, ease: 'back.out(2)' }, 59.6).to(S('mouth'), { attr: { d: WORRY }, duration: 0.2 }, 59.6).to(S('eyes'), { x: 8, y: -10, duration: 0.2 }, 59.6);
  talkS(60.0, 1.0, OH);
  // …gone. He reaches; fingers touch; it falls away.
  tl.to(B('armL'), { rotation: 18, duration: 0.25, ease: 'power2.out' }, T0).to(B('armL'), { rotation: 8, duration: 1.2, ease: 'sine.inOut' }, T0 + 0.3);
  talkB(61.4, 1.4, BIG_B);
  tl.to(cam, { cx: 1220, cy: 620, s: 1.3, duration: 3, ease: 'sine.inOut' }, 61.6);
  // the storm drags him on and up; the box gets smaller and smaller below
  tl.to(A.st, { lift: LIFT - 180 + 520, liftX: 380, duration: 9, ease: 'power2.in' }, 62.6);
  talkB(66.0, 2.0, BIG_B);
  tl.to(st, { storm: 0.3, wind: 0.25, duration: 8, ease: 'sine.inOut' }, 64.0);
  tl.to(cam, { cx: 1300, cy: 900, s: 0.9, duration: 14, ease: 'sine.inOut' }, 66.0);
  tl.to('#far', { opacity: 1, duration: 6 }, 70.0);
  tl.to('#fade', { opacity: 1, duration: 3.5 }, 86.0);

  // ---- per-frame pieces ----
  const H = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  const stars = []; for (let i = 0; i < 260; i++) stars.push({ e: mk('line', $('#sf'), { stroke: '#fff6e0', 'stroke-linecap': 'round' }), x: H(i) * 4000, y: -600 + H(i + 9) * 2600, z: 0.2 + H(i + 3) * 0.8 });
  const speed = (t) => 50 + 420 * Math.max(0, Math.min(1, (t - 24) / 12)) - 400 * Math.max(0, Math.min(1, (t - 62) / 12));
  const dist = (t) => { let d = 0; for (let u = 0; u < t; u += 0.05) d += speed(u) * 0.05; return d; };
  const comets = COMETS.map(([a], i) => { const g = mk('g', $('#comets'), { opacity: 0 });
    mk('path', g, { d: 'M0 0 L320 -10 L320 10Z', fill: 'url(#tailG)' }); mk('circle', g, { r: 9, fill: '#fffbe8' }); return g; });
  const winds = []; for (let i = 0; i < 40; i++) winds.push(mk('line', $('#windG'), { 'stroke-width': 1.5 + H(i + 40) * 2.5, opacity: 0 }));
  const bolt = (i) => { let x = 700 + H(i * 7) * 1000, y = -300, d = `M${x} ${y}`; for (let k = 0; k < 9; k++) { x += (H(i * 13 + k) - 0.5) * 140; y += 90 + H(i * 5 + k) * 50; d += ` L${x.toFixed(0)} ${y.toFixed(0)}`; } return d; };
  let boxFrom = null;

  return {
    render: (t) => {
      // where the box was when it slipped
      if (t >= T0 && !boxFrom) { tl.seek(T0); const p = K.drive(T0); boxFrom = { x: p.hx + 4, y: p.hy + 72 }; }
      tl.seek(t); const P = K.drive(t);
      // stars streaming past
      const d = dist(t), v = speed(t);
      stars.forEach((s, i) => {
        const x = ((s.x - d * s.z) % 4000 + 4000) % 4000 - 600, len = 1 + v * s.z * 0.12;
        s.e.setAttribute('x1', x.toFixed(1)); s.e.setAttribute('x2', (x + len).toFixed(1)); s.e.setAttribute('y1', s.y.toFixed(1)); s.e.setAttribute('y2', (s.y + len * 0.08).toFixed(1));
        s.e.setAttribute('stroke-width', (1 + s.z * 2.4).toFixed(2)); s.e.setAttribute('opacity', (0.3 + 0.7 * s.z * (0.6 + 0.4 * Math.sin(t * 2 + i))).toFixed(2));
      });
      // comets
      COMETS.forEach(([a], i) => { const u = (t - a) / 1.8, g = comets[i];
        if (u < 0 || u > 1) { g.setAttribute('opacity', 0); return; }
        const x0 = 2400 + H(i) * 400, y0 = -100 + H(i + 2) * 500, x = x0 - u * 2600, y = y0 + u * 700;
        g.setAttribute('transform', `translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(-15) scale(${(0.8 + H(i + 4)).toFixed(2)})`); g.setAttribute('opacity', Math.sin(Math.PI * u).toFixed(2)); });
      // wind streaks in front
      winds.forEach((w, i) => { const sp = 1400 + H(i) * 1400, y = 100 + H(i + 5) * 900, x = 2600 - ((t * sp + H(i + 8) * 3000) % 3600);
        w.setAttribute('x1', x.toFixed(0)); w.setAttribute('x2', (x + 120 + H(i + 1) * 200).toFixed(0)); w.setAttribute('y1', y.toFixed(0)); w.setAttribute('y2', (y + 30).toFixed(0));
        w.setAttribute('opacity', (st.wind * 0.45).toFixed(2)); });
      $('#stormTint').style.opacity = st.storm.toFixed(3);
      // lightning
      let fl = 0; $('#bolt').setAttribute('opacity', 0);
      BOLTS.forEach((a, i) => { const u = t - a; if (u >= 0 && u < 0.5) { fl = Math.max(fl, (1 - u / 0.5) * (u < 0.08 ? 0.9 : 0.5));
        if (u < 0.3) { $('#boltP').setAttribute('d', bolt(i)); $('#bolt').setAttribute('opacity', (1 - u / 0.3).toFixed(2)); } } });
      $('#flash').style.opacity = fl.toFixed(3);
      // snapped birds tumble away; the string whips
      const strs = [];
      for (let i = 0; i < 5; i++) {
        const k = SNAP_BIRD.indexOf(i), sn = k >= 0 ? t - SNAP[k] : -1, bp = $('#bp' + i);
        const m = /translate\(([-\d.]+) ([-\d.]+)\)/.exec(bp.getAttribute('transform')); let x = +m[1], y = +m[2];
        if (sn >= 0) {
          x += sn * (300 + 200 * H(i)) * (i === 1 ? 1 : -1) + Math.sin(sn * 5) * 20; y += -sn * 160 + sn * sn * 30;
          bp.setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(sn * 140 * (i % 2 ? 1 : -1)).toFixed(1)}) scale(0.9 0.9)`);
          bp.setAttribute('opacity', Math.max(0, 1 - sn / 3).toFixed(2));
          if (sn < 1.6) { const w = Math.sin(sn * 14) * 30 * (1 - sn / 1.6); strs.push(`M${P.rx.toFixed(1)} ${P.ry.toFixed(1)} q${(w).toFixed(1)} -40 ${(w * 1.6).toFixed(1)} ${(-70 * (1 - sn / 2)).toFixed(1)}`); }
        } else { bp.setAttribute('opacity', 1); strs.push(`M${P.rx.toFixed(1)} ${P.ry.toFixed(1)} Q${((P.rx + x) / 2).toFixed(1)} ${((P.ry + y) / 2 + 10).toFixed(1)} ${x.toFixed(1)} ${(y - 14).toFixed(1)}`); }
      }
      $('#strings').firstChild.setAttribute('d', strs.join(' '));
      // the box: hanging from his arm, then falling away, tumbling, smaller and smaller
      if (boxFrom && t >= T0) {
        const u = Math.min(1, (t - T0) / (86 - T0)), e = 1 - Math.pow(1 - u, 1.6);
        const x = boxFrom.x + (1330 - boxFrom.x) * e + Math.sin(u * 9) * 40 * (1 - u), y = boxFrom.y + (990 - boxFrom.y) * Math.pow(u, 0.75);
        const sc = Math.max(0.06, 1 - 0.94 * Math.pow(u, 0.8));
        $('#boxPos').setAttribute('transform', `translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(Math.sin((t - T0) * 1.3) * 40 + (t - T0) * 50).toFixed(1)} 0 -30) scale(${sc.toFixed(3)})`);
      }
    },
  };
}
