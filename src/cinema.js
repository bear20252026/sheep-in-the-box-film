// The "cinema pass" every part shares: film grain, a gentle gate weave, vignette and grade,
// out-of-focus foreground bokeh, and a soft camera shake. All of it is a pure function of time,
// so any frame can be rendered on its own.

export const cinemaCss = `
#grain{position:absolute;left:0;top:0;width:1920px;height:804px;pointer-events:none;mix-blend-mode:overlay;opacity:.13}
#vig{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse 75% 70% at 50% 48%,rgba(0,0,0,0) 58%,rgba(20,10,4,.42) 100%)}
#bokeh{position:absolute;left:0;top:0;width:1920px;height:804px;pointer-events:none;overflow:visible}
`;

export const cinemaHtml = `
<svg id="bokeh" viewBox="0 0 1920 804"><defs><filter id="bokehBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="9"/></filter></defs><g id="bokehG" filter="url(#bokehBlur)"></g></svg>
<svg id="grain" viewBox="0 0 1920 804"><filter id="grainF" x="0" y="0" width="100%" height="100%">
 <feTurbulence id="grainT" type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="1" stitchTiles="stitch"/>
 <feColorMatrix type="saturate" values="0"/></filter><rect width="1920" height="804" filter="url(#grainF)"/></svg>
<div id="vig"></div>`;

// tiny deterministic hash noise
const hash = (n) => { const x = Math.sin(n * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
export const noise1 = (t) => { const i = Math.floor(t), f = t - i, u = f * f * (3 - 2 * f); return (hash(i) * (1 - u) + hash(i + 1) * u) * 2 - 1; };

export function makeBokeh(count, colors, seed = 3) {
  const g = document.getElementById('bokehG'); const out = [];
  for (let i = 0; i < count; i++) {
    const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    c.setAttribute('fill', colors[i % colors.length]); g.appendChild(c);
    out.push({ c, x: hash(seed + i) * 2400, y: 250 + hash(seed + i * 7) * 600, r: 14 + hash(seed + i * 3) * 30, ph: hash(i * 13) * 6.28, sp: 0.3 + hash(i * 5) });
  }
  return out;
}

// near-camera bokeh drifts with stronger parallax than the world; `amount` 0..1 fades it in/out
export function drawBokeh(list, t, cam, amount) {
  for (const b of list) {
    const x = ((b.x - cam.cx * 1.6 + t * 12 * b.sp) % 2400 + 2400) % 2400 - 240;
    const y = b.y + Math.sin(t * 0.4 * b.sp + b.ph) * 30 - (cam.cy - 600) * 0.6;
    b.c.setAttribute('cx', x.toFixed(1)); b.c.setAttribute('cy', y.toFixed(1)); b.c.setAttribute('r', (b.r * cam.s).toFixed(1));
    b.c.setAttribute('opacity', (amount * (0.25 + 0.2 * Math.sin(t * 0.9 * b.sp + b.ph))).toFixed(3));
  }
}

// call once per frame: grain re-seeds 24x a second, the whole frame weaves by a fraction of a pixel
export function cinemaFrame(t, shake = 0) {
  const f = Math.floor(t * 24);
  document.getElementById('grainT').setAttribute('seed', String((f % 97) + 1));
  const wx = (hash(f) - 0.5) * 0.9 + noise1(t * 9) * shake * 14, wy = (hash(f + 50) - 0.5) * 0.9 + noise1(t * 9 + 40) * shake * 10;
  return { wx, wy };
}
