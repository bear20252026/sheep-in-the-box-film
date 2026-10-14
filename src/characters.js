// The people of the feature, as SVG puppets in the film's watercolour-and-ink style.
// Every movable part is its own group with a known pivot, so GSAP can act them.
//   Boy.svg(P)    – the little prince: gold hair, green coat, gold scarf (scarf tails driven per frame)
//   Pilot.svg(P)  – the pilot: leather jacket, flying cap and goggles, white scarf
//   Plane.svg(P)  – his small silver monoplane, with a spinning propeller
// Units: feet at (0,0), the boy is ~300 tall, the pilot ~460.
const INK = '#4a3428';

export const BOY_PIVOTS = { head: '0 -232', armL: '-30 -196', armR: '30 -196', legL: '-16 -96', legR: '16 -96', body: '0 -100' };
export const Boy = {
  svg: (P) => `
<g id="${P}-root">
 <ellipse id="${P}-shadow" cx="0" cy="4" rx="70" ry="12" fill="#2a2030" opacity=".25"/>
 <g id="${P}-bob">
  <g id="${P}-legL"><path d="M-22 -100 L-24 -14 Q-26 0 -10 0 L-2 0 L-6 -100Z" fill="#3f6a3a" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
   <path d="M-30 -22 Q-34 2 -10 2 L4 2 Q6 -14 -6 -22Z" fill="#6b4a2e" stroke="${INK}" stroke-width="3.5"/></g>
  <g id="${P}-legR"><path d="M6 -100 L2 -14 Q2 0 18 0 L26 0 L24 -100Z" fill="#4a7a44" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
   <path d="M-2 -22 Q-6 2 18 2 L32 2 Q34 -14 22 -22Z" fill="#7a5634" stroke="${INK}" stroke-width="3.5"/></g>
  <g id="${P}-body">
   <path d="M-44 -96 Q-48 -150 -34 -200 Q0 -214 34 -200 Q48 -150 44 -96 Q0 -84 -44 -96Z" fill="url(#${P}-coatG)" stroke="${INK}" stroke-width="3.8" stroke-linejoin="round"/>
   <path d="M0 -204 L0 -96" stroke="#2f5a2c" stroke-width="3"/>
   <circle cx="8" cy="-170" r="3.5" fill="#f0c95a"/><circle cx="8" cy="-146" r="3.5" fill="#f0c95a"/><circle cx="8" cy="-122" r="3.5" fill="#f0c95a"/>
   <path d="M-44 -110 Q0 -100 44 -110" stroke="#f0c95a" stroke-width="5" fill="none"/>
  </g>
  <g id="${P}-armL"><path d="M-30 -196 Q-52 -160 -54 -120" stroke="#3f6a3a" stroke-width="22" stroke-linecap="round" fill="none"/>
   <path d="M-30 -196 Q-52 -160 -54 -120" stroke="${INK}" stroke-width="26" stroke-linecap="round" fill="none" opacity=".0"/>
   <circle cx="-54" cy="-112" r="11" fill="#f8d8bf" stroke="${INK}" stroke-width="3"/></g>
  <g id="${P}-armR"><path d="M30 -196 Q52 -160 54 -120" stroke="#4a7a44" stroke-width="22" stroke-linecap="round" fill="none"/>
   <circle cx="54" cy="-112" r="11" fill="#f8d8bf" stroke="${INK}" stroke-width="3"/></g>
  <!-- scarf: knot at the neck, two tails whose paths are written every frame -->
  <path id="${P}-scarfB" d="" fill="#e8a838" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path id="${P}-scarfA" d="" fill="#f2c24a" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>
  <path d="M-28 -206 Q0 -192 28 -206 Q30 -220 0 -222 Q-30 -220 -28 -206Z" fill="#f2c24a" stroke="${INK}" stroke-width="3.2"/>
  <g id="${P}-head">
   <ellipse cx="0" cy="-262" rx="44" ry="42" fill="url(#${P}-skinG)" stroke="${INK}" stroke-width="3.6"/>
   <ellipse cx="-22" cy="-250" rx="9" ry="6" fill="#f4a8a0" opacity=".55"/><ellipse cx="22" cy="-250" rx="9" ry="6" fill="#f4a8a0" opacity=".55"/>
   <g id="${P}-eyes"><ellipse cx="-15" cy="-264" rx="5" ry="6.5" fill="${INK}"/><ellipse cx="15" cy="-264" rx="5" ry="6.5" fill="${INK}"/>
    <circle cx="-13" cy="-266" r="1.8" fill="#fff"/><circle cx="17" cy="-266" r="1.8" fill="#fff"/></g>
   <g id="${P}-lids" opacity="1"><rect id="${P}-lidL" x="-22" y="-272" width="14" height="15" fill="url(#${P}-skinG)" opacity="0"/>
    <rect id="${P}-lidR" x="8" y="-272" width="14" height="15" fill="url(#${P}-skinG)" opacity="0"/></g>
   <path id="${P}-mouth" d="M-8 -240 Q0 -235 8 -240" fill="none" stroke="${INK}" stroke-width="3" stroke-linecap="round"/>
   <!-- golden hair: a crown of soft flames -->
   <path d="M-46 -268 Q-56 -300 -34 -312 Q-30 -334 -8 -326 Q4 -346 22 -328 Q44 -334 44 -310 Q60 -296 46 -268 Q36 -290 20 -292 Q8 -280 -6 -294 Q-22 -282 -32 -296 Q-40 -282 -46 -268Z" fill="url(#${P}-hairG)" stroke="${INK}" stroke-width="3.4" stroke-linejoin="round"/>
  </g>
 </g>
</g>`,
  defs: (P) => `
<linearGradient id="${P}-coatG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6fa862"/><stop offset=".7" stop-color="#4f8a48"/><stop offset="1" stop-color="#3c6e38"/></linearGradient>
<radialGradient id="${P}-skinG" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="#fff0e2"/><stop offset="1" stop-color="#f4cfb2"/></radialGradient>
<linearGradient id="${P}-hairG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset="1" stop-color="#e8b23a"/></linearGradient>`,
  // scarf tails blowing in the wind: `wind` 0..1.5, `dir` -1 (to the left) / 1
  scarf: (P, t, wind = 1, dir = -1) => {
    const tail = (len, ph, w) => {
      const pts = [];
      for (let i = 0; i <= 6; i++) {
        const u = i / 6, x = dir * u * len * (0.55 + 0.45 * wind), y = -210 + u * len * (0.55 - 0.4 * wind) + Math.sin(t * 7 * (0.4 + wind) + ph - u * 4) * 14 * u * (0.3 + wind);
        pts.push([x, y]);
      }
      const top = pts.map(([x, y], i) => `${x.toFixed(1)} ${(y - w * (1 - (i / 6) * 0.5)).toFixed(1)}`);
      const bot = pts.slice().reverse().map(([x, y], i) => `${x.toFixed(1)} ${(y + w * (0.5 + (i / 6) * 0.5)).toFixed(1)}`);
      return 'M' + top.join(' L') + ' L' + bot.join(' L') + 'Z';
    };
    document.getElementById(P + '-scarfA').setAttribute('d', tail(150, 0, 10));
    document.getElementById(P + '-scarfB').setAttribute('d', tail(120, 1.7, 8));
  },
};

export const PILOT_PIVOTS = { head: '0 -360', armL: '-50 -320', armR: '50 -320', legL: '-24 -150', legR: '24 -150', body: '0 -150' };
export const Pilot = {
  svg: (P) => `
<g id="${P}-root">
 <ellipse id="${P}-shadow" cx="0" cy="4" rx="100" ry="14" fill="#2a2030" opacity=".25"/>
 <g id="${P}-bob">
  <g id="${P}-legL"><path d="M-44 -150 L-40 -16 L-6 -16 L-4 -150Z" fill="#6b5a48" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
   <path d="M-48 -24 Q-52 4 -20 4 L6 4 Q10 -16 -8 -24Z" fill="#3a2a20" stroke="${INK}" stroke-width="4"/></g>
  <g id="${P}-legR"><path d="M4 -150 L6 -16 L40 -16 L44 -150Z" fill="#7a6854" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
   <path d="M0 -24 Q-4 4 28 4 L54 4 Q58 -16 40 -24Z" fill="#3a2a20" stroke="${INK}" stroke-width="4"/></g>
  <g id="${P}-body">
   <path d="M-64 -150 Q-72 -250 -56 -326 Q0 -346 56 -326 Q72 -250 64 -150 Q0 -136 -64 -150Z" fill="url(#${P}-jacketG)" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
   <path d="M0 -334 L0 -150" stroke="#5a3a24" stroke-width="3"/>
   <path d="M-56 -326 L-20 -290 L0 -334 L20 -290 L56 -326" fill="#c89a6a" stroke="${INK}" stroke-width="3.5" stroke-linejoin="round"/>
   <path d="M-64 -172 Q0 -160 64 -172" stroke="#5a3a24" stroke-width="6" fill="none"/>
  </g>
  <g id="${P}-armL"><path d="M-50 -320 Q-78 -260 -76 -196" stroke="#8a5a36" stroke-width="34" stroke-linecap="round" fill="none"/>
   <circle id="${P}-handL" cx="-76" cy="-184" r="16" fill="#f0c8a4" stroke="${INK}" stroke-width="3.5"/></g>
  <g id="${P}-armR"><path d="M50 -320 Q78 -260 76 -196" stroke="#9a6a42" stroke-width="34" stroke-linecap="round" fill="none"/>
   <circle id="${P}-handR" cx="76" cy="-184" r="16" fill="#f0c8a4" stroke="${INK}" stroke-width="3.5"/></g>
  <path d="M-40 -332 Q0 -312 40 -332 Q46 -350 0 -354 Q-46 -350 -40 -332Z" fill="#f4efe6" stroke="${INK}" stroke-width="3.5"/>
  <path id="${P}-scarf" d="" fill="#f4efe6" stroke="${INK}" stroke-width="3.2"/>
  <g id="${P}-head">
   <ellipse cx="0" cy="-398" rx="54" ry="58" fill="url(#${P}-skinG)" stroke="${INK}" stroke-width="4"/>
   <path d="M-40 -366 Q0 -350 40 -366" fill="none" stroke="#b08a70" stroke-width="2" opacity=".6"/>
   <g id="${P}-eyes"><ellipse cx="-19" cy="-398" rx="5.5" ry="7" fill="${INK}"/><ellipse cx="19" cy="-398" rx="5.5" ry="7" fill="${INK}"/>
    <path d="M-30 -414 Q-19 -420 -8 -414 M8 -414 Q19 -420 30 -414" stroke="${INK}" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>
   <g id="${P}-lids"><rect id="${P}-lidL" x="-27" y="-407" width="16" height="17" fill="url(#${P}-skinG)" opacity="0"/>
    <rect id="${P}-lidR" x="11" y="-407" width="16" height="17" fill="url(#${P}-skinG)" opacity="0"/></g>
   <path d="M-4 -392 Q2 -380 -4 -374" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/>
   <path id="${P}-mouth" d="M-14 -364 Q0 -360 14 -364" fill="none" stroke="${INK}" stroke-width="3.5" stroke-linecap="round"/>
   <!-- leather flying cap with ear flaps, goggles on the forehead -->
   <path d="M-56 -400 Q-60 -462 0 -464 Q60 -462 56 -400 Q50 -428 0 -432 Q-50 -428 -56 -400Z" fill="#7a4a2a" stroke="${INK}" stroke-width="4"/>
   <path d="M-56 -404 Q-66 -372 -50 -356 L-40 -392Z M56 -404 Q66 -372 50 -356 L40 -392Z" fill="#6a3e22" stroke="${INK}" stroke-width="3.5"/>
   <g id="${P}-goggles"><path d="M-50 -432 L50 -432" stroke="#5a4a3a" stroke-width="8"/>
    <circle cx="-20" cy="-434" r="16" fill="#9cc6dc" stroke="${INK}" stroke-width="4"/><circle cx="20" cy="-434" r="16" fill="#9cc6dc" stroke="${INK}" stroke-width="4"/>
    <circle cx="-25" cy="-439" r="4" fill="#fff" opacity=".8"/><circle cx="15" cy="-439" r="4" fill="#fff" opacity=".8"/></g>
  </g>
 </g>
</g>`,
  defs: (P) => `
<linearGradient id="${P}-jacketG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#b07a4c"/><stop offset=".7" stop-color="#8e5c36"/><stop offset="1" stop-color="#6e4428"/></linearGradient>
<radialGradient id="${P}-skinG" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="#fbe2cc"/><stop offset="1" stop-color="#e8bc98"/></radialGradient>`,
  scarf: (P, t, wind = 0.6, dir = -1) => {
    const pts = [];
    for (let i = 0; i <= 6; i++) { const u = i / 6; pts.push([dir * (20 + u * 120 * (0.5 + 0.5 * wind)), -334 + u * 120 * (0.7 - 0.5 * wind) + Math.sin(t * 6 + -u * 4) * 10 * u * (0.2 + wind)]); }
    const top = pts.map(([x, y], i) => `${x.toFixed(1)} ${(y - 10 * (1 - i / 12)).toFixed(1)}`);
    const bot = pts.slice().reverse().map(([x, y]) => `${x.toFixed(1)} ${(y + 8).toFixed(1)}`);
    document.getElementById(P + '-scarf').setAttribute('d', 'M' + top.join(' L') + ' L' + bot.join(' L') + 'Z');
  },
};

// Saint-Exupéry's kind of plane: a small silver monoplane, nose to the left. Propeller blur at (-262,-30).
export const Plane = {
  svg: (P) => `
<g id="${P}-root">
 <ellipse cx="20" cy="70" rx="300" ry="22" fill="#2a2030" opacity=".25" id="${P}-shadow"/>
 <g id="${P}-body">
  <path d="M-200 34 L-120 70 M-150 34 L-160 70" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>
  <circle cx="-120" cy="72" r="14" fill="#3a3030" stroke="${INK}" stroke-width="4"/><circle cx="-160" cy="72" r="14" fill="#3a3030" stroke="${INK}" stroke-width="4"/>
  <path d="M-250 -30 Q-250 -70 -180 -70 L180 -40 Q250 -40 280 -60 L300 -60 L290 0 Q200 20 120 24 L-180 40 Q-250 40 -250 -30Z" fill="url(#${P}-silverG)" stroke="${INK}" stroke-width="4.5" stroke-linejoin="round"/>
  <path d="M270 -60 L300 -140 L330 -140 L310 -48Z" fill="url(#${P}-silverG)" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M-110 -10 L120 -2 L150 30 L-140 40Z" fill="#b8c0c8" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>
  <path d="M-40 -66 Q-30 -100 20 -100 L40 -62Z" fill="#cfe6f2" stroke="${INK}" stroke-width="4" opacity=".9"/>
  <path d="M-180 -40 L160 -24" stroke="#c84a3a" stroke-width="8"/>
  <text x="40" y="-6" font-family="Lora, serif" font-size="28" fill="#3a3030">F-ANRY</text>
  <path d="M-250 -30 Q-266 -30 -266 -40 L-266 -20 Q-266 -30 -250 -30" fill="#8a8a8a" stroke="${INK}" stroke-width="4"/>
  <g id="${P}-prop" transform="translate(-268 -30)"><ellipse rx="10" ry="70" fill="#dcdcdc" opacity=".55" stroke="${INK}" stroke-width="2"/></g>
  <g id="${P}-smoke"></g>
 </g>
</g>`,
  defs: (P) => `<linearGradient id="${P}-silverG" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2f4f6"/><stop offset=".5" stop-color="#c8ced6"/><stop offset="1" stop-color="#9aa2ac"/></linearGradient>`,
};
