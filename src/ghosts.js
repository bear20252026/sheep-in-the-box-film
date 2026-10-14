// The three erased sheep: complete drawings (just not what the boy wanted), each with its own
// accessory drawn as pencil lines so the hand can draw it in with the rest.
//   sniffle – sickly: scarf, red nose, droopy   horns – a ram: big curled horns   old – old wool: brows, beard, cane
const INK = '#6b4733';
const ACC = {
  sniffle: {
    head: `<ellipse class="fill" cx="-93" cy="-214" rx="9" ry="7" fill="#e86a5a"/>
      <path class="ink draw" d="M-150 -276 Q-138 -284 -122 -278 M-74 -274 Q-62 -282 -46 -276" fill="none" stroke="${INK}" stroke-width="3"/>`,
    body: `<path class="fill" d="M-120 -176 Q-60 -150 0 -178 L4 -150 Q-60 -122 -122 -150Z" fill="#b8a6d8"/>
      <path class="fill" d="M-40 -160 L-30 -86 L-6 -90 L-18 -158Z" fill="#a894cc"/>
      <path class="ink draw" d="M-120 -176 Q-60 -150 0 -178 L4 -150 Q-60 -122 -122 -150Z M-40 -160 L-30 -86 L-6 -90 L-18 -158" fill="none" stroke="${INK}" stroke-width="3.6"/>
      <path class="ink draw" d="M-110 -166 L-104 -146 M-90 -160 L-84 -140 M-70 -158 L-64 -138" stroke="#8a78b0" stroke-width="3"/>`,
  },
  horns: {
    head: `<path class="fill" d="M-120 -300 C-170 -320 -200 -270 -176 -236 C-160 -214 -132 -226 -140 -250 C-146 -266 -164 -262 -160 -248 L-150 -276 Z" fill="#e6d2ae"/>
      <path class="ink draw" d="M-120 -300 C-170 -320 -200 -270 -176 -236 C-160 -214 -132 -226 -140 -250 C-146 -266 -164 -262 -160 -248" fill="none" stroke="${INK}" stroke-width="5"/>
      <path class="fill" d="M-30 -306 C20 -330 54 -282 30 -246 C14 -224 -14 -236 -6 -260 C0 -276 18 -272 14 -258 L-12 -284Z" fill="#dcc6a0"/>
      <path class="ink draw" d="M-30 -306 C20 -330 54 -282 30 -246 C14 -224 -14 -236 -6 -260 C0 -276 18 -272 14 -258" fill="none" stroke="${INK}" stroke-width="5"/>
      <path class="ink draw" d="M-150 -258 q-6 -10 2 -16 M10 -268 q8 -8 2 -16" fill="none" stroke="${INK}" stroke-width="2.6"/>
      <path class="ink draw" d="M-140 -268 Q-126 -280 -110 -272 M-76 -268 Q-60 -280 -44 -270" fill="none" stroke="${INK}" stroke-width="4.5"/>`,
    body: ``,
  },
  old: {
    head: `<path class="fill" d="M-140 -186 Q-120 -150 -96 -140 Q-74 -150 -60 -184 Q-96 -172 -140 -186Z" fill="#fbf7ee"/>
      <path class="ink draw" d="M-140 -186 Q-120 -150 -96 -140 Q-74 -150 -60 -184" fill="none" stroke="${INK}" stroke-width="3.6"/>
      <path class="fill" d="M-150 -266 Q-126 -282 -104 -264 Q-126 -270 -150 -260Z M-84 -262 Q-62 -280 -38 -262 Q-62 -268 -84 -256Z" fill="#fbf7ee"/>
      <path class="ink draw" d="M-150 -266 Q-126 -282 -104 -264 M-84 -262 Q-62 -280 -38 -262" fill="none" stroke="${INK}" stroke-width="3.6"/>`,
    body: `<path class="ink draw" d="M-210 4 L-196 -150 Q-194 -186 -164 -184 Q-140 -180 -146 -160" fill="none" stroke="#7a5236" stroke-width="9" stroke-linecap="round"/>`,
  },
};

// call after Sheep.svg(P) is in the DOM
export function decorate(P, kind) {
  const NS = 'http://www.w3.org/2000/svg';
  const add = (parentId, markup) => {
    if (!markup) return;
    const g = document.createElementNS(NS, 'g'); g.setAttribute('class', 'acc'); g.innerHTML = markup;
    document.getElementById(parentId).appendChild(g);
  };
  add(P + '-head', ACC[kind].head);
  add(P + '-bob', ACC[kind].body);
  // these drawings are complete: no gap, no pencil leg, no open ear
  const fin = [P + '-finishBack', P + '-finishEar'];
  fin.forEach((id) => document.getElementById(id).setAttribute('opacity', 1));
  document.querySelectorAll(`#${P} .pencil`).forEach((e) => e.setAttribute('opacity', 0));
  document.querySelectorAll(`#${P}-legHN .finish-leg`).forEach((e) => e.setAttribute('opacity', 1));
  if (kind === 'sniffle') {   // a little greenish and thin
    document.getElementById(P + '-body').setAttribute('transform', 'translate(40 -80) scale(0.92 0.88) translate(-40 80)');
  }
}
