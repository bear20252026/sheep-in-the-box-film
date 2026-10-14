/* The sheep, built as an SVG puppet. Origin (0,0) = between the feet on the ground.
   Faces left in 3/4 view like the model sheet. Parts are separate groups so they can move:
   #P-walk > #P-bob > [legs, #P-body(breath), #P-head > ears, face, eyes, lids, mouth]
   Unfinished details (the film's rule): a gap in the back wool, the near hind leg only
   pencilled, the near ear tip left open. #P-finish holds the lines that complete them. */

  const INK = '#6b4733', WOOL = '#fdf3e2', WOOL2 = '#f1dcc0', FACE = '#f8d2b4', FACE2 = '#eeb593', EAR = '#f2ad8f', EAR2 = '#ec967c', HOOF = '#8a5a3e', PENCIL = '#9a8f88';

  // scalloped cloud outline around an ellipse
  function cloud(cx, cy, rx, ry, n, bump, a0 = 0, a1 = 360, jitter = 0.12, seed = 1) {
    let s = seed; const rnd = () => ((s = (s * 9301 + 49297) % 233280) / 233280 - 0.5);
    const pts = [];
    const full = a1 - a0 >= 360;
    const N = full ? n : n + 1;
    for (let i = 0; i < N; i++) {
      const a = ((a0 + ((a1 - a0) * i) / n) * Math.PI) / 180;
      const k = 1 + rnd() * jitter;
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]);
    }
    let d = `M${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
    const segs = full ? n : n;
    for (let i = 0; i < segs; i++) {
      const p = pts[i], q = pts[(i + 1) % pts.length];
      const ch = Math.hypot(q[0] - p[0], q[1] - p[1]);
      const r = (ch / 2) * bump;
      d += ` A${r.toFixed(1)} ${r.toFixed(1)} 0 0 1 ${q[0].toFixed(1)} ${q[1].toFixed(1)}`;
    }
    return full ? d + 'Z' : d;
  }

  function leg(id, x, top, len, opts = {}) {
    const w = 30, r = 13;
    const body = `M${x - w / 2} ${top} L${x - w / 2} ${top + len - r} Q${x - w / 2} ${top + len} ${x - w / 2 + r} ${top + len} L${x + w / 2 - r} ${top + len} Q${x + w / 2} ${top + len} ${x + w / 2} ${top + len - r} L${x + w / 2} ${top}`;
    const hoof = `M${x - w / 2 - 1} ${top + len - 22} L${x + w / 2 + 1} ${top + len - 22} L${x + w / 2 + 1} ${top + len - r} Q${x + w / 2 + 1} ${top + len + 1} ${x + w / 2 - r} ${top + len + 1} L${x - w / 2 + r} ${top + len + 1} Q${x - w / 2 - 1} ${top + len + 1} ${x - w / 2 - 1} ${top + len - r}Z`;
    if (opts.sketch) {
      return `<g id="${id}" class="leg">
        <path class="ink pencil draw" d="${body}" fill="none" stroke="${PENCIL}" stroke-width="3" stroke-dasharray="none"/>
        <path class="trace" d="${body}" fill="none" stroke="#ffd25e" stroke-width="7" stroke-linecap="round" opacity="0"/>
        <g class="finish-leg" opacity="0">
          <path d="${body}" fill="${opts.far ? FACE2 : FACE}" stroke="none"/>
          <path d="${hoof}" fill="${HOOF}"/>
          <path class="ink gold" d="${body}" fill="none" stroke="${INK}" stroke-width="4.5"/>
        </g></g>`;
    }
    return `<g id="${id}" class="leg">
      <path class="fill" d="${body}" fill="${opts.far ? FACE2 : FACE}"/>
      <path class="fill" d="${hoof}" fill="${HOOF}"/>
      <path class="ink draw" d="${body}" fill="none" stroke="${INK}" stroke-width="4.5"/>
      <path class="ink draw" d="M${x - w / 2} ${top + len - 22} L${x + w / 2} ${top + len - 22}" stroke="${INK}" stroke-width="3.5"/></g>`;
  }

  function sheep(P, o = {}) {
    const gapBody = 'url(#' + P + '-gapmask)';
    const bodyD = cloud(40, -178, 150, 104, 13, 1.25, 0, 360, 0.1, 3);
    const tuftD = cloud(-72, -292, 92, 50, 9, 1.3, 0, 360, 0.12, 7);
    const faceD = 'M-160 -250 C-162 -300 -112 -318 -78 -312 C-30 -306 -8 -272 -10 -238 C-12 -196 -52 -168 -96 -170 C-140 -172 -158 -208 -160 -250Z';
    const farEar = 'M-150 -268 C-196 -276 -228 -252 -226 -226 C-212 -214 -176 -222 -150 -238Z';
    const nearEarFull = 'M-14 -268 C6 -262 20 -226 20 -196 C20 -170 4 -160 -6 -170 C-20 -186 -26 -232 -14 -268Z';
    const nearEarOpen = 'M-14 -268 C6 -262 20 -226 20 -196 M-6 -170 C-20 -186 -26 -232 -14 -268'; // tip left open
    const gapEdge = cloud(40, -178, 150, 104, 13, 1.25, 0, 360, 0.1, 3); // same outline; masked to the gap
    return `
<g id="${P}" class="sheep">
 <defs>
  <radialGradient id="${P}-wool" cx="40%" cy="35%" r="75%"><stop offset="0" stop-color="#fffaf1"/><stop offset=".6" stop-color="${WOOL}"/><stop offset="1" stop-color="${WOOL2}"/></radialGradient>
  <radialGradient id="${P}-face" cx="45%" cy="40%" r="70%"><stop offset="0" stop-color="#fbe0c8"/><stop offset=".7" stop-color="${FACE}"/><stop offset="1" stop-color="${FACE2}"/></radialGradient>
  <linearGradient id="${P}-eartip" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${EAR}"/><stop offset=".55" stop-color="${EAR}"/><stop offset=".8" stop-color="${EAR}" stop-opacity="0"/></linearGradient>
  <mask id="${P}-gapmask" maskUnits="userSpaceOnUse" x="-400" y="-500" width="800" height="600">
    <rect x="-400" y="-500" width="800" height="600" fill="white"/>
    <ellipse id="${P}-gap" cx="112" cy="-262" rx="70" ry="52" fill="black"/>
  </mask>
  <mask id="${P}-rimBodyM" maskUnits="userSpaceOnUse" x="-400" y="-500" width="800" height="600">
    <path d="${bodyD}" fill="white"/><path d="${bodyD}" fill="black" transform="translate(-22 16)"/>
  </mask>
  <mask id="${P}-rimHeadM" maskUnits="userSpaceOnUse" x="-400" y="-500" width="800" height="600">
    <path d="${tuftD}" fill="white"/><path d="${tuftD}" fill="black" transform="translate(-16 14)"/>
  </mask>
  <mask id="${P}-gaponly" maskUnits="userSpaceOnUse" x="-400" y="-500" width="800" height="600">
    <ellipse cx="112" cy="-262" rx="74" ry="56" fill="white"/>
  </mask>
 </defs>
 <ellipse id="${P}-shadow" cx="20" cy="2" rx="150" ry="16" fill="#6b4220" opacity=".22" filter="url(#soft)"/>
 <g id="${P}-walk"><g id="${P}-bob">
  <g id="${P}-legsFar">${leg(P + '-legFF', -58, -100, 100, { far: true })}${leg(P + '-legHF', 92, -100, 100, { far: true })}</g>
  <g id="${P}-body">
   <path class="fill" d="${bodyD}" fill="url(#${P}-wool)" mask="${gapBody}"/>
   <clipPath id="${P}-bodyclip"><path d="${bodyD}"/></clipPath>
   <g clip-path="url(#${P}-bodyclip)" mask="${gapBody}" class="fill"><path d="${bodyD}" fill="none" stroke="#e2c49f" stroke-width="30" opacity=".55" filter="url(#soft)"/></g>
   <path class="ink draw" d="${bodyD}" fill="none" stroke="${INK}" stroke-width="5" mask="${gapBody}"/>
   <path class="ink pencil draw" d="${gapEdge}" fill="none" stroke="${PENCIL}" stroke-width="2.6" mask="url(#${P}-gaponly)"/>
   <path class="trace" d="${gapEdge}" fill="none" stroke="#ffd25e" stroke-width="8" stroke-linecap="round" mask="url(#${P}-gaponly)" opacity="0"/>
   <g id="${P}-finishBack" opacity="0">
     <path d="${bodyD}" fill="url(#${P}-wool)" mask="url(#${P}-gaponly)"/>
     <path class="gold" d="${bodyD}" fill="none" stroke="${INK}" stroke-width="5" mask="url(#${P}-gaponly)"/>
   </g>
   <g id="${P}-rimBody" class="rim" opacity="0" mask="${gapBody}"><path d="${bodyD}" fill="#fff0c4" mask="url(#${P}-rimBodyM)" filter="url(#soft)"/></g>
   <path class="ink draw" d="M-10 -120 q18 10 34 0 M60 -112 q18 12 36 -2" fill="none" stroke="${INK}" stroke-width="3" opacity=".45"/>
  </g>
  <g id="${P}-legsNear">${leg(P + '-legFN', -18, -96, 96)}${leg(P + '-legHN', 128, -96, 96, { sketch: true })}</g>
  <g id="${P}-head">
   <path class="fill" d="${farEar}" fill="${EAR2}"/>
   <path class="ink draw" d="${farEar}" fill="none" stroke="${INK}" stroke-width="4.5"/>
   <path class="fill" d="${faceD}" fill="url(#${P}-face)"/>
   <clipPath id="${P}-faceclip"><path d="${faceD}"/></clipPath>
   <g clip-path="url(#${P}-faceclip)" class="fill"><path d="${faceD}" fill="none" stroke="#e9a580" stroke-width="22" opacity=".45" filter="url(#soft)"/></g>
   <path class="ink draw" d="${faceD}" fill="none" stroke="${INK}" stroke-width="5"/>
   <path class="fill" d="${tuftD}" fill="url(#${P}-wool)"/>
   <clipPath id="${P}-tuftclip"><path d="${tuftD}"/></clipPath>
   <g clip-path="url(#${P}-tuftclip)" class="fill"><path d="${tuftD}" fill="none" stroke="#e2c49f" stroke-width="22" opacity=".5" filter="url(#soft)"/></g>
   <g id="${P}-rimHead" class="rim" opacity="0"><path d="${tuftD}" fill="#fff0c4" mask="url(#${P}-rimHeadM)" filter="url(#soft)"/></g>
   <path class="ink draw" d="${tuftD}" fill="none" stroke="${INK}" stroke-width="4.5"/>
   <ellipse class="fill blush" cx="-142" cy="-212" rx="18" ry="10" fill="#f39a8a" opacity=".45" filter="url(#soft)"/>
   <ellipse class="fill blush" cx="-46" cy="-206" rx="18" ry="10" fill="#f39a8a" opacity=".45" filter="url(#soft)"/>
   <g id="${P}-eyes">
    <g id="${P}-eyeL"><ellipse class="eye" cx="-126" cy="-242" rx="13" ry="17" fill="#3a271d"/><circle cx="-121" cy="-249" r="4.6" fill="#fff"/><circle cx="-130" cy="-236" r="2" fill="#fff" opacity=".7"/></g>
    <g id="${P}-eyeR"><ellipse class="eye" cx="-62" cy="-238" rx="15" ry="19" fill="#3a271d"/><circle cx="-56" cy="-246" r="5.2" fill="#fff"/><circle cx="-66" cy="-231" r="2.2" fill="#fff" opacity=".7"/></g>
   </g>
   <g id="${P}-lids">
    <ellipse id="${P}-lidL" cx="-126" cy="-242" rx="16" ry="20" fill="${FACE}"/>
    <ellipse id="${P}-lidR" cx="-62" cy="-238" rx="18" ry="22" fill="${FACE}"/>
   </g>
   <circle class="fill" cx="-100" cy="-214" r="3.2" fill="#5a3a2a"/><circle class="fill" cx="-86" cy="-213" r="3.2" fill="#5a3a2a"/>
   <path id="${P}-mouth" class="ink draw" d="M-112 -200 Q-98 -188 -82 -200" fill="none" stroke="${INK}" stroke-width="4"/>
   <g id="${P}-earN">
    <path class="fill" d="${nearEarFull}" fill="url(#${P}-eartip)"/>
    <path class="ink draw" d="${nearEarOpen}" fill="none" stroke="${INK}" stroke-width="4.5"/>
    <path class="ink pencil draw" d="M20 -196 C20 -170 4 -160 -6 -170" fill="none" stroke="${PENCIL}" stroke-width="2.4" stroke-dasharray="6 7"/>
    <path class="trace" d="M20 -196 C20 -170 4 -160 -6 -170" fill="none" stroke="#ffd25e" stroke-width="7" stroke-linecap="round" opacity="0"/>
    <g id="${P}-finishEar" opacity="0">
      <path d="${nearEarFull}" fill="${EAR}"/>
      <path class="gold" d="${nearEarFull}" fill="none" stroke="${INK}" stroke-width="4.5"/>
    </g>
   </g>
  </g>
 </g></g>
</g>`;
  }
export const Sheep = { svg: sheep, cloud };
