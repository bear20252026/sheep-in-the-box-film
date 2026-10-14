// SEQ 12b — EPILOGUE, THE STAR (~0:46). Out of the gold light: night on B612. The boy sleeps sitting by the dome;
// the whole sheep keeps watch beside him and the rose. It hears the stars laughing, smiles, settles down close —
// eyes open. The camera drifts back over the little planet among the stars. THE END.
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {kitCss, kitHtml, kitSetup, SMILE, BIG, OH, SAYD} from './planetkit.js';

export const DURATION = 46;
const R = 40000, CX = 1200, CY = 880 + 40000;
const k = (y) => 0.6 * (y - 430) / 450;
const ROSE = { x: 1472, y: 548 };
const SH = { x: 1720, y: 870 };

const SUBS = [
  [11.6, 14.4, 'Do you hear that?', '你听见了吗？'],
  [15.4, 18.4, 'The stars are laughing.', '星星在笑。', 'say'],
  [19.6, 22.0, 'Somebody down there is happy.', '下面有个人很开心。', 'say'],
  [26.0, 28.4, 'Goodnight, sheep.', '晚安，小羊。'],
  [29.0, 31.6, 'I’ll keep watch.', '我会守着。', 'say'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('') + 'THE END 完';

export const css = kitCss('#1a2050') + `
#nightC{position:absolute;inset:0;pointer-events:none;background:#16205a;mix-blend-mode:multiply;opacity:.3}
#goldIn{position:absolute;inset:0;pointer-events:none;opacity:1;background:radial-gradient(circle at 50% 40%,#fffdf2 0%,#ffeec0 30%,#ffd98a 70%,#f6c070 100%)}
#goldIn img{position:absolute;inset:0;width:100%;height:100%;mix-blend-mode:multiply;opacity:.35}
#theEnd{position:absolute;left:0;right:0;top:300px;text-align:center;opacity:0;pointer-events:none}
#theEnd .a{font:italic 400 96px/1.1 Lora,Georgia,serif;color:#fff6e0;letter-spacing:6px;text-shadow:0 0 18px rgba(255,220,150,.7),0 0 40px rgba(20,20,60,.8)}
#theEnd .b{font:44px/1.6 "Noto Serif SC",serif;color:#fff0d0;text-shadow:0 0 14px rgba(20,20,60,.9)}
#subs .en,#subs .zh{text-shadow:0 0 4px rgba(10,10,40,.95),0 0 12px rgba(10,10,40,.85),0 0 28px rgba(10,10,40,.6)}
.zz{font:italic 600 30px Georgia,serif;fill:#f4ecd8}
`;

export const html = (IMG) => kitHtml({
  IMG, noSky: 1, noTex: 1, R, CX, CY,
  planet: `<circle r="10" fill="none"/>`,
  defs: `<radialGradient id="roseFeather"><stop offset=".6" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
    <mask id="roseMask" maskUnits="userSpaceOnUse" x="1300" y="380" width="350" height="350"><circle cx="${ROSE.x}" cy="${ROSE.y}" r="110" fill="url(#roseFeather)"/></mask>
    <radialGradient id="roseGlowG"><stop offset="0" stop-color="#ffd0d8" stop-opacity=".9"/><stop offset="1" stop-color="#ff90a8" stop-opacity="0"/></radialGradient>
    <linearGradient id="nightSkyG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1c2a78"/><stop offset=".6" stop-color="#4a4aa0"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
    <linearGradient id="skyFadeG" x1="0" y1="0" x2="0" y2="1"><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>
    <mask id="skyFade" maskUnits="userSpaceOnUse" x="-300" y="-200" width="3000" height="900"><rect x="-300" y="-200" width="3000" height="860" fill="url(#skyFadeG)"/></mask>
    <radialGradient id="auraG"><stop offset="0" stop-color="#fffbe8" stop-opacity="1"/><stop offset=".35" stop-color="#ffe08a" stop-opacity=".7"/><stop offset="1" stop-color="#ffc04a" stop-opacity="0"/></radialGradient>`,
  sky: `<image id="plate" class="pl2" href="${IMG}plate_b612.jpg" x="0" y="0" width="2400" height="1005" preserveAspectRatio="none"/>
    <rect x="0" y="0" width="2400" height="680" fill="url(#nightSkyG)" style="mix-blend-mode:multiply"/>
    <image href="${IMG}sky_space.jpg" x="-250" y="-120" width="2900" height="925" preserveAspectRatio="none" mask="url(#skyFade)" style="mix-blend-mode:screen" opacity=".85"/>
    <g id="nstars"></g>
    <circle id="roseGlow" cx="${ROSE.x}" cy="${ROSE.y}" r="150" fill="url(#roseGlowG)" opacity=".35" style="mix-blend-mode:screen"/>
    <g id="roseHead" mask="url(#roseMask)"><image class="pl2" href="${IMG}plate_b612.jpg" x="0" y="0" width="2400" height="1005" preserveAspectRatio="none"/></g>`,
  back: `<circle id="aura" r="260" fill="url(#auraG)" opacity=".25" style="mix-blend-mode:screen"/>`,
  front: `<g id="zzG"></g>`,
  overlay: `<div id="nightC"></div><div id="theEnd"><div class="a">The End</div><div class="b">完</div></div><div id="goldIn"><img src="${IMG}paper.jpg"></div>`,
});

export function setup() {
  const K = kitSetup({ R, CX, CY, SUBS, halfBack: 1 });
  const { tl, cam, A, B, S, talkS, talkB, $, $$, mk } = K;
  const X = { rose: 0, laugh: 0 };
  const at = (x, y, m = 1) => ({ x, up: 880 - y, s: k(y) * m });
  const H = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
  // night: the painted plate darkened, stars over it
  const filt = 'brightness(.58) saturate(.85) hue-rotate(12deg)';
  $$('.pl2').forEach((e) => { e.style.filter = filt; });
  const stars = []; for (let i = 0; i < 180; i++) stars.push(mk('circle', $('#nstars'), { cx: (H(i) * 2400).toFixed(0), cy: (H(i + 5) * 430).toFixed(0), r: (0.8 + H(i + 9) * 2.2).toFixed(1), fill: '#fff6e0', opacity: 0.5 }));
  const zz = []; for (let i = 0; i < 3; i++) { const e = mk('text', $('#zzG'), { class: 'zz', opacity: 0 }); e.textContent = i === 2 ? 'Z' : 'z'; zz.push(e); }

  // the sheep is whole now: no pencil, no clip, a soft gold rim
  tl.set(S('legHN') + ' .pencil', { opacity: 0 }, 0).set(S('legHN') + ' .finish-leg', { opacity: 1 }, 0).set('#S-finishBack', { attr: { 'clip-path': '' }, opacity: 1 }, 0)
    .set([S('body') + ' .trace', S('legHN') + ' .trace'], { opacity: 0 }, 0).set(['#S-rimBody', '#S-rimHead'], { opacity: 0.5 }, 0);
  tl.set(A.sheep, { inBox: 0, ...at(SH.x, SH.y), flip: 1 }, 0).set(A.box, { on: 1, x: -400 }, 0).set('#S-walk', { rotation: 0, svgOrigin: '0 0' }, 0);
  tl.set(A.st, { carry: 0, lift: 0, liftX: 0, stakeX: 640, slack: 1 }, 0);   // the birds rest by their stake
  // the boy, asleep sitting up by the dome
  tl.set(A.boy, { x: 1250, s: 0.95, up: -30 }, 0).set([B('lidL'), B('lidR')], { opacity: 1 }, 0)
    .to([B('legL'), B('legR')], { scaleY: 0.5, duration: 0.01 }, 0.01).to(B('armL'), { rotation: 12, duration: 0.01 }, 0.01).to(B('armR'), { rotation: -12, duration: 0.01 }, 0.01)
    .to(B('head'), { rotation: 24, duration: 0.01 }, 0.01);
  tl.set('#fade', { opacity: 0 }, 0).set('#theEnd', { opacity: 0 }, 0).set('#goldIn', { opacity: 1 }, 0).to('#goldIn', { opacity: 0, duration: 3.5, ease: 'sine.inOut' }, 0.3);
  // ---- 0–10 out of the gold: down from the stars to the little group ----
  tl.set(cam, { cx: 1500, cy: 260, s: 1.5 }, 0).to(cam, { cx: 1500, cy: 680, s: 1.45, duration: 9, ease: 'sine.inOut' }, 0.8);
  tl.to(S('head'), { rotation: 6, duration: 1 }, 6.0).to(S('eyes'), { x: -6, y: 2, duration: 0.4 }, 6.0);   // watching the boy
  // ---- 10–24 the stars laugh ----
  tl.to(X, { laugh: 1, duration: 3 }, 9.6).to(X, { laugh: 0.3, duration: 4 }, 20.0);
  tl.to(S('head'), { rotation: 18, duration: 1 }, 10.4).to(S('eyes'), { x: -4, y: -12, duration: 0.4 }, 10.4).to(S('mouth'), { attr: { d: OH }, duration: 0.3 }, 10.8);
  tl.to(X, { rose: -5, duration: 0.6 }, 11.4).to(X, { rose: 0, duration: 1 }, 14.4);
  tl.to(cam, { cx: 1560, cy: 600, s: 1.25, duration: 6, ease: 'sine.inOut' }, 11.0);
  talkS(15.4, 3.0, SMILE); talkS(19.6, 2.4, BIG);
  // ---- 22–32 it walks over and settles by the boy, eyes open ----
  tl.to(S('head'), { rotation: 0, duration: 0.6 }, 22.2).to(S('eyes'), { x: 0, y: 0, duration: 0.3 }, 22.2);
  tl.to(A.sheep, { walk: 1, duration: 0.2 }, 22.6).to(A.sheep, { x: 1395, duration: 3.0, ease: 'sine.inOut' }, 22.6).to(A.sheep, { walk: 0, duration: 0.2 }, 25.4);
  tl.to(cam, { cx: 1360, cy: 690, s: 1.7, duration: 4, ease: 'sine.inOut' }, 22.4);
  tl.to(S('body'), { scaleY: 0.86, duration: 1.0, ease: 'sine.inOut' }, 25.6).to(A.sheep, { up: 880 - SH.y - 10, duration: 1.0 }, 25.6);
  // the boy, half asleep, murmurs and leans on it
  tl.to(B('head'), { rotation: 30, duration: 1.2 }, 25.8).set([B('lidL'), B('lidR')], { opacity: 0 }, 26.0).set([B('lidL'), B('lidR')], { opacity: 1 }, 28.4);
  talkB(26.0, 2.4);
  tl.to(B('armR'), { rotation: -70, duration: 1.0 }, 28.0);
  talkS(29.0, 2.6, SMILE);
  tl.to(S('eyes'), { x: 4, y: -6, duration: 0.6 }, 32.0);
  // ---- 32–46 drift back: the little planet among the stars; THE END ----
  tl.to(cam, { cx: 1300, cy: 520, s: 0.8, duration: 12, ease: 'sine.inOut' }, 31.6);
  tl.to(X, { laugh: 0.7, duration: 4 }, 34.0);
  tl.to('#theEnd', { opacity: 1, duration: 3 }, 36.5);
  tl.to('#fade', { opacity: 1, duration: 3 }, 43.0);

  const SLEEP = () => [A.boy.x + 20, 680];
  return {
    render: (t) => {
      tl.seek(t); K.drive(t);
      $('#roseHead').setAttribute('transform', `rotate(${X.rose.toFixed(2)} ${ROSE.x} ${ROSE.y + 110})`);
      const sx = A.sheep.x, sy = 880 - A.sheep.up;
      $('#aura').setAttribute('cx', sx.toFixed(1)); $('#aura').setAttribute('cy', (sy - 80).toFixed(1));
      stars.forEach((c, i) => { const base = 0.35 + 0.25 * Math.sin(t * (0.8 + H(i + 3)) + i);
        const l = X.laugh * Math.max(0, Math.sin(t * (5 + 4 * H(i + 1)) + i * 1.7));
        c.setAttribute('opacity', Math.min(1, base + l * 0.8).toFixed(2)); c.setAttribute('r', ((0.8 + H(i + 9) * 2.2) * (1 + l * 0.8)).toFixed(2)); });
      const [x0, y0] = SLEEP();
      zz.forEach((e, j) => { const u = ((t / 2.4) + j / 3) % 1; const on = t > 2 && t < 25.6 || t > 28.6;
        e.setAttribute('opacity', on ? (Math.sin(Math.PI * u) * 0.8).toFixed(2) : 0);
        e.setAttribute('x', (x0 + u * 30 + j * 6).toFixed(1)); e.setAttribute('y', (y0 - u * 60).toFixed(1)); e.setAttribute('font-size', (18 + u * 14).toFixed(1)); });
    },
  };
}
