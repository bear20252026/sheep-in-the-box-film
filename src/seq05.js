// SEQ 5 — THE BOY'S STORIES (~3:48). Day by the plane. The pilot works under the engine; the boy, with the
// box on his lap, tells him about home, and his stories draw themselves in pencil across the sky:
// the tiny planet and its forty-four sunsets, the proud rose and her four thorns, the baobabs.
// "Then your sheep can eat my baobabs!" — "And what if the sheep eats your rose?" — "I would never."
import gsap from 'gsap';
gsap.defaults({ lazy: false });
import {cinemaCss, cinemaHtml, cinemaFrame, makeBokeh, drawBokeh} from './cinema.js';
import {Boy, Pilot, Plane, BOY_PIVOTS, PILOT_PIVOTS} from './characters.js';
import {Sheep} from './sheep.js';

export const DURATION = 228;

const SUBS = [
  [3.6, 6.4, 'Hand me that wrench, would you?', '把那个扳手递给我，好吗？', 'say'],
  [8.4, 9.4, 'Thanks.', '谢了。', 'say'],
  [11.0, 14.0, 'Do you want to hear about my planet?', '你想听听我的星球吗？'],
  [14.6, 16.6, 'Do I have a choice?', '我有得选吗？', 'say'],
  [17.2, 18.2, 'No.', '没有。'],
  [20.0, 23.6, 'My planet is very small. Barely bigger than a house.', '我的星球很小很小。差不多只有一座房子那么大。'],
  [24.6, 29.0, 'Two volcanoes to warm my breakfast, and one that’s asleep.', '两座火山用来热早饭，还有一座在睡觉。'],
  [31.0, 35.4, 'It’s so small that when I’m sad, I just move my chair a few steps…', '它小到我难过的时候，只要把椅子挪几步……'],
  [35.8, 38.6, '…and watch the sunset again.', '……就能再看一次日落。'],
  [45.0, 48.6, 'One day, I saw it forty-four times.', '有一天，我看了四十四次。'],
  [50.2, 54.4, '…You must have been very sad that day.', '……那天你一定很难过吧。', 'say'],
  [63.0, 66.0, 'But then, one day… a flower came.', '可是后来，有一天……来了一朵花。'],
  [67.6, 72.2, 'She took ages getting ready. She wanted to be perfect.', '她打扮了好久好久。她想要完美无缺。'],
  [76.6, 79.4, 'She was so beautiful.', '她真美。'],
  [80.0, 83.0, 'And a little bit proud.', '也有一点点骄傲。'],
  [83.6, 88.4, 'She told me she had four thorns, to fight off tigers.', '她跟我说，她有四根刺，可以打跑老虎。'],
  [92.4, 95.8, 'There are no tigers on my planet.', '我的星球上根本没有老虎。'],
  [96.4, 100.0, 'But she was afraid of the wind at night.', '可是她怕夜里的风。'],
  [101.0, 104.6, 'So every night, I put a glass globe over her.', '所以每天晚上，我都给她罩上一个玻璃罩。'],
  [107.6, 111.4, 'Then we had a fight. And I left.', '后来我们吵了一架。我就走了。'],
  [112.4, 116.8, 'I was too young to know how to love her.', '那时我太小了，不懂得怎么爱她。'],
  [121.5, 124.5, 'Oh! And the baobabs!', '哦！还有猴面包树！'],
  [125.4, 129.0, 'They start out tiny, like little bushes.', '它们一开始很小，就像小灌木。'],
  [129.6, 133.6, 'But if you forget to pull them out, just once…', '可是只要你忘了拔一次……'],
  [134.2, 139.2, '…their roots crack the whole planet to pieces!', '……它们的根就会把整个星球撑裂！'],
  [143.0, 146.0, 'That’s a… very big tree.', '那可真是……一棵大树。'],
  [149.4, 153.4, 'Wait. Sheep eat little bushes, don’t they?', '等等。羊吃小灌木，对不对？'],
  [154.0, 156.0, 'I suppose they do.', '应该是吧。'],
  [156.6, 160.6, 'Then your sheep can eat my baobabs!', '那你的羊就可以吃掉我的猴面包树啦！'],
  [166.0, 169.0, 'So that’s my job.', '原来这就是我的工作。'],
  [169.6, 172.6, 'Official baobab eater.', '正式的猴面包树吃货。'],
  [174.2, 178.0, 'And what if the sheep eats your rose?', '那要是羊把你的玫瑰吃了呢？'],
  [180.6, 183.4, '…Sheep eat flowers?', '……羊会吃花？'],
  [184.2, 187.6, 'Sheep eat everything they find.', '羊碰到什么吃什么。'],
  [188.2, 191.2, 'Even flowers with thorns.', '有刺的花也吃。'],
  [198.4, 201.4, 'I would never.', '我绝对不会。'],
  [202.4, 205.6, 'Never ever.', '永远永远不会。'],
  [208.6, 212.6, 'Hey. I’ll think of something.', '嘿。我会想办法的。'],
];
export const SUB_TEXT = SUBS.map((s) => s[3]).join('') + '0123456789';

export const css = `
#stage{position:relative;width:1920px;height:804px;overflow:hidden;background:#8fb0e0}
#world{position:absolute;left:0;top:0;width:2400px;height:1005px;transform-origin:0 0;filter:contrast(1.05) saturate(1.05)}
.bg{position:absolute;left:0;top:0;width:2400px;height:1005px}
#svg{position:absolute;left:0;top:0;width:2400px;height:1005px;overflow:visible}
#day{position:absolute;left:0;top:0;width:2400px;height:1005px;background:linear-gradient(#9fc2ee 0%,#cfe0f4 40%,#ffe2b8 62%,#f2c08a 100%);mix-blend-mode:soft-light;opacity:1}
#day2{position:absolute;left:0;top:0;width:2400px;height:1005px;background:linear-gradient(rgba(190,215,250,.55) 0%,rgba(230,236,245,.35) 45%,rgba(255,228,180,.25) 100%);mix-blend-mode:screen}
#subs{position:absolute;left:0;right:0;bottom:30px;text-align:center;pointer-events:none}
#subs .en{font:italic 40px/1.25 Lora,Georgia,serif;color:#fffaf0;text-shadow:0 0 6px rgba(30,20,10,.9),0 0 18px rgba(30,20,10,.6)}
#subs .en.say{font-style:normal}
#subs .zh{font:31px/1.5 "Noto Serif SC",serif;color:#fff3e0;text-shadow:0 0 6px rgba(30,20,10,.9),0 0 16px rgba(30,20,10,.6)}
#fade{position:absolute;inset:0;background:#000}
.pd{fill:none;stroke:#3e342c;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round}
.pdr{fill:none;stroke:#b8323a;stroke-width:3.2;stroke-linecap:round;stroke-linejoin:round}
${cinemaCss}
`;

const boil = (id, seed) => `<feTurbulence id="${id}" type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="${seed}" result="n"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="4" xChannelSelector="R" yChannelSelector="G" result="d"/>`;
const wc = (id, seed) => `<filter id="${id}" x="-20%" y="-20%" width="140%" height="140%">${boil(id + 'B', seed)}
     <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="${seed + 5}" result="g"/>
     <feColorMatrix in="g" type="matrix" values="0 0 0 0 0.45  0 0 0 0 0.38  0 0 0 0 0.35  0 0 0 -0.7 0.4" result="gm"/>
     <feComposite in="gm" in2="d" operator="in" result="tex"/>
     <feMerge><feMergeNode in="d"/><feMergeNode in="tex"/></feMerge></filter>`;
const INK = '#4a3428';

// ---------- the pencil drawings in the sky ----------
const onPlanet = (deg, inner, extra = '') => { const a = deg * Math.PI / 180; return `<g ${extra} transform="translate(${(120 * Math.cos(a)).toFixed(1)} ${(40 + 120 * Math.sin(a)).toFixed(1)}) rotate(${deg + 90})">${inner}</g>`; };
const VOLC = '<path class="pd" d="M-16 2 L-7 -18 L7 -18 L16 2"/>';
const SPROUT = '<path class="pd" d="M0 0 C-1 -6 1 -10 0 -14 M0 -10 C-4 -14 -8 -12 -9 -9 M0 -12 C4 -16 8 -14 9 -11"/>';
const PSHEEP = `<path class="pd" d="M-14 -6 C-20 -6 -22 -16 -14 -18 C-14 -26 -2 -26 0 -20 C4 -26 16 -24 14 -16 C22 -14 20 -6 14 -6 Z M-8 -6 l0 7 M8 -6 l0 7 M-16 -16 C-28 -18 -30 -6 -20 -6"/>
  <circle cx="-22" cy="-12" r="1.4" fill="#3e342c"/>`;
const MINIROSE = `<path class="pd" d="M0 0 C-1 -8 1 -14 0 -20"/><path id="mrFill" d="M0 -20 C-8 -20 -10 -30 -4 -34 C0 -30 0 -30 4 -34 C10 -30 8 -20 0 -20Z" fill="#e05a5a" opacity="0"/>
  <path class="pd" d="M0 -20 C-8 -20 -10 -30 -4 -34 C0 -30 0 -30 4 -34 C10 -30 8 -20 0 -20Z"/>`;
const D1 = `
<g id="d1" transform="translate(1150 400)" opacity="0">
 <circle id="sunGlow" cx="0" cy="40" r="320" fill="url(#sunsetG)" opacity="0"/>
 <circle cx="0" cy="40" r="150" fill="url(#paperG)"/>
 <g id="halfL"><path class="pd p1" d="M0 -80 A120 120 0 0 0 0 160"/><path class="pd p1" d="M-60 120 Q-90 90 -96 50 M-40 140 Q-70 120 -84 90" opacity=".5"/>
   ${onPlanet(-125, VOLC)}${onPlanet(-105, VOLC)}
   <g id="miniRose" opacity="0">${onPlanet(-112, MINIROSE)}</g>
   <g id="sp1">${onPlanet(-95, SPROUT)}</g><g id="sp3">${onPlanet(-145, SPROUT)}</g></g>
 <g id="halfR"><path class="pd p1" d="M0 -80 A120 120 0 0 1 0 160"/><path class="pd p1" d="M60 120 Q90 90 96 50" opacity=".5"/>
   ${onPlanet(-55, VOLC + '<path class="pd" d="M-3 -24 l6 0 l-6 6 l6 0" opacity=".7"/>')}
   <g id="sp2">${onPlanet(-40, SPROUT)}</g>
   <g transform="translate(41 -72.8) rotate(20)"><g id="tree" opacity="0">
     <path class="pd tr" d="M-14 0 C-18 -40 -20 -80 -30 -120 M14 0 C18 -40 20 -80 30 -120"/>
     <path class="pd tr" d="M-30 -120 C-80 -130 -90 -170 -40 -170 C-30 -200 30 -200 40 -170 C90 -170 80 -130 30 -120"/>
     <path class="pd tr" d="M-6 -60 C-30 -90 -50 -110 -60 -150 M6 -70 C30 -100 40 -120 56 -150"/>
     <path class="pd rt" d="M-10 0 C-30 30 -40 60 -70 90 M0 0 C0 40 10 80 0 130 M10 0 C30 30 50 50 80 70"/></g></g></g>
 <path id="crack" class="pd" d="M0 -80 L6 -40 L-6 0 L8 40 L-4 80 L4 120 L0 160 M6 -40 L24 -30 M-6 0 L-26 8 M8 40 L28 46"/>
 <g id="chairRot"><g id="chairFlip">
   <path class="pd p2" d="M-12 -80 L-12 -104 M-12 -92 L4 -92 L4 -80"/>
   <path class="pd p2" d="M-2 -100 a6 6 0 1 0 0.1 0 M-4 -94 L-4 -86 L6 -86 L6 -80 M-4 -90 L4 -94 M-6 -92 L-16 -88"/></g></g>
 <g id="sunRot"><path class="pd p2" d="M0 -208 a18 18 0 1 0 0.1 0 M0 -238 l0 -10 M28 -218 l8 -6 M-28 -218 l-8 -6 M30 -190 l10 0 M-30 -190 l-10 0"/></g>
 <g id="pSheepRot" opacity="0"><g transform="translate(0 -80)"><g id="pSheepFlip">${PSHEEP}</g></g></g>
 <g id="smoke"></g>
 <text id="count" x="190" y="-140" font-family="Lora,Georgia,serif" font-style="italic" font-size="54" fill="#3e342c" opacity="0">1</text>
</g>`;
const PETALS = 'M0 -18 C-34 -20 -44 -60 -18 -78 C-10 -60 -4 -40 0 -18Z M0 -18 C34 -20 44 -60 18 -78 C10 -60 4 -40 0 -18Z M-18 -78 C-14 -96 14 -96 18 -78 C8 -84 -8 -84 -18 -78Z';
const D2 = `
<g id="d2" transform="translate(1150 420) scale(1.35)" opacity="0">
 <ellipse cx="0" cy="20" rx="230" ry="190" fill="url(#paperG)"/>
 <path class="pd r0" d="M-170 120 Q0 108 170 120"/>
 <circle id="seed" cx="0" cy="-200" r="4" fill="#3e342c" opacity="0"/>
 <path class="pd r1" d="M0 118 C-6 70 8 30 0 -20"/>
 <path class="pd r1" d="M2 70 C20 56 40 60 46 74 C28 80 14 78 2 70Z M-1 40 C-20 28 -38 32 -44 46 C-26 52 -12 50 -1 40Z"/>
 <g id="thorns"><path class="pd r1" d="M-3 100 l-9 -3 l8 -5 M3 84 l9 -3 l-8 -5 M-2 56 l-9 -3 l8 -5 M2 20 l9 -3 l-8 -5"/></g>
 <g id="roseHead">
  <path id="bud" class="pd r2" d="M0 -20 C-14 -30 -12 -56 0 -66 C12 -56 14 -30 0 -20Z"/>
  <path id="roseFill" d="${PETALS}" fill="#e05a5a" opacity="0"/>
  <path class="pdr r3" d="${PETALS} M-8 -60 C-10 -72 8 -76 10 -64 C10 -56 -2 -54 -2 -62"/>
  <path class="pd r4" d="M-11 -44 q4 3 8 0 M3 -44 q4 3 8 0"/>
 </g>
 <g id="tigerPos"><g id="tiger">
  <path class="pd tg" d="M60 60 C70 30 150 28 170 50 C180 70 160 90 130 90 L80 90 C66 88 56 76 60 60Z"/>
  <path class="pd tg" d="M28 50 a24 24 0 1 0 48 0 a24 24 0 1 0 -48 0 M36 30 l4 -12 l8 8 M60 28 l6 -10 l6 12"/>
  <path class="pd tg" d="M100 34 l-6 20 M120 32 l-4 22 M140 36 l-2 20 M80 90 l-2 26 M100 90 l0 26 M140 90 l2 26 M160 84 l4 30 M172 54 C200 40 206 70 190 76 M40 58 q6 6 12 0 M42 44 l0 2 M58 44 l0 2"/>
 </g></g>
 <g id="globe" opacity="0"><path class="pd" d="M-60 118 L-60 -60 C-60 -140 60 -140 60 -60 L60 118" stroke-width="2.6"/><path d="M-44 -70 C-44 -100 -30 -116 -12 -120" fill="none" stroke="#fff" stroke-width="5" opacity=".7"/></g>
</g>`;

const BOX = (P) => `
 <path d="M-40 -50 L-28 -60 L52 -60 L40 -50Z" fill="#5a3f2e" stroke="${INK}" stroke-width="3"/>
 <g clip-path="url(#boxClip)"><g id="sUp"><g transform="translate(14 8) scale(0.2)"><g id="sFlip">${Sheep.svg(P)}</g></g></g></g>
 <path d="M-40 -50 L40 -50 L40 0 L-40 0Z" fill="#d8ac80" stroke="${INK}" stroke-width="3"/>
 <path d="M40 -50 L52 -60 L52 -10 L40 0Z" fill="#b48a62" stroke="${INK}" stroke-width="3"/>
 <path d="M-40 -50 L-54 -66 L-30 -70 L-28 -60Z M52 -60 L66 -72 L62 -50 L52 -46Z" fill="#e6c49c" stroke="${INK}" stroke-width="3"/>
 <circle cx="-20" cy="-26" r="5" fill="#3a2a22"/><circle cx="0" cy="-30" r="5" fill="#3a2a22"/><circle cx="20" cy="-26" r="5" fill="#3a2a22"/>
 <g id="peek" opacity="0"><circle cx="-2" cy="-30" r="2.2" fill="#fff"/><circle cx="2.4" cy="-30.6" r="1.6" fill="#fff"/></g>`;

export const html = (IMG) => `
<div id="stage">
 <div id="world">
  <img class="bg" id="bgImg" src="${IMG}plate_desert.jpg">
  <div id="day"></div><div id="day2"></div>
  <svg id="svg" viewBox="0 0 2400 1005">
   <defs>
    <filter id="soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
    <filter id="pencilF" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="1" seed="4" result="n"/>
     <feDisplacementMap in="SourceGraphic" in2="n" scale="2.2"/></filter>
    ${wc('wcPlane', 3)}${wc('wcPilot', 7)}${wc('wcBoy', 11)}
    ${Plane.defs('PL')}${Pilot.defs('PI')}${Boy.defs('BY')}
    <radialGradient id="paperG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fffaf0" stop-opacity=".55"/><stop offset=".7" stop-color="#fffaf0" stop-opacity=".3"/><stop offset="1" stop-color="#fffaf0" stop-opacity="0"/></radialGradient>
    <radialGradient id="sunsetG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffb070" stop-opacity=".8"/><stop offset="1" stop-color="#ff8a5a" stop-opacity="0"/></radialGradient>
    <radialGradient id="roseGlowG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffe7a0" stop-opacity=".9"/><stop offset="1" stop-color="#ffd070" stop-opacity="0"/></radialGradient>
    <clipPath id="boxClip"><rect x="-80" y="-200" width="200" height="200"/></clipPath>
   </defs>
   <g filter="url(#pencilF)">${D1}${D2}</g>
   <g id="piMove"><g id="piPos" transform="translate(1440 975) scale(0.72)"><g filter="url(#wcPilot)">${Pilot.svg('PI')}</g>
     <ellipse id="smudge" cx="14" cy="-382" rx="9" ry="5" fill="#3a3028" opacity="0"/>
     <g id="rag" opacity="0" transform="translate(-76 -184)"><path d="M-14 -10 L14 -14 L12 16 L-12 12Z" fill="#d8d0c0" stroke="${INK}" stroke-width="3"/></g></g></g>
   <g id="plPos" transform="translate(1780 905) scale(1.25)"><g filter="url(#wcPlane)">${Plane.svg('PL')}</g></g>
   <g id="wrench" transform="translate(1000 968)"><path d="M-22 0 L18 0 M18 0 l8 -6 M18 0 l8 6" stroke="#8a8f96" stroke-width="7" stroke-linecap="round" fill="none"/></g>
   <g id="crate" filter="url(#wcBoy)"><path d="M840 975 L960 975 L960 905 L840 905Z" fill="#a8784e" stroke="${INK}" stroke-width="4"/><path d="M840 930 H960 M840 952 H960" stroke="${INK}" stroke-width="2.5" opacity=".6"/></g>
   <g id="byMove"><g id="byPos" transform="translate(900 935) scale(0.62)"><g filter="url(#wcBoy)">${Boy.svg('BY')}</g>
     <circle id="tear" cx="12" cy="-256" r="3" fill="#cfe8ff" opacity="0"/></g></g>
   <g id="boxMove"><g id="boxPos" transform="translate(900 900) scale(0.95)">${BOX('S')}</g></g>
  </svg>
 </div>
 ${cinemaHtml}
 <div id="subs"><div class="en"></div><div class="zh"></div></div>
 <div id="fade"></div>
</div>`;

export function setup() {
  const $ = (s) => document.querySelector(s), $$ = (s) => Array.from(document.querySelectorAll(s));
  const NS = 'http://www.w3.org/2000/svg';
  const B = (p) => '#BY-' + p, PI = (p) => '#PI-' + p, S = (p) => '#S-' + p;
  function subs(t) {
    const en = $('#subs .en'), zh = $('#subs .zh'); let on = null;
    for (const s of SUBS) if (t >= s[0] - 0.25 && t <= s[1] + 0.3) on = s;
    if (!on) { en.textContent = ''; zh.textContent = ''; return; }
    const k = Math.min(1, (t - on[0] + 0.25) / 0.3, (on[1] + 0.3 - t) / 0.3);
    en.textContent = on[2]; zh.textContent = on[3]; en.className = 'en' + (on[4] ? ' say' : '');
    $('#subs').style.opacity = Math.max(0, k);
  }
  // the sheep in the box: its ear was finished in the storm
  $(S('lids')).setAttribute('opacity', 1);
  $$(S('earN') + ' .pencil').forEach((e) => e.setAttribute('opacity', 0)); $(S('finishEar')).setAttribute('opacity', 1);

  // ---------- pencil strokes: each set draws in order over its window, and may be erased ----------
  const SETS = {
    planet: { sel: '#d1 .p1, #halfL > g:not(#miniRose):not(#sp1):not(#sp3) .pd, #halfR > g:first-of-type .pd', a: 19.5, d: 4 },
    chair: { sel: '#d1 .p2', a: 29.4, d: 1.8 },
    sprouts: { sel: '#sp1 .pd, #sp2 .pd, #sp3 .pd', a: 124.5, d: 1.5 },
    tree: { sel: '#tree .tr', a: 131.5, d: 2.2 },
    roots: { sel: '#tree .rt', a: 134.6, d: 1.6 },
    crack: { sel: '#crack', a: 137.2, d: 0.8, ea: 147.0, ed: 1.0 },
    rose0: { sel: '#d2 .r0', a: 63.4, d: 1.0 },
    rose1: { sel: '#d2 .r1', a: 65.0, d: 2.2 },
    bud: { sel: '#d2 .r2', a: 67.0, d: 1.2 },
    petals: { sel: '#d2 .r3', a: 68.6, d: 5.4 },
    face: { sel: '#d2 .r4', a: 75.0, d: 0.8 },
    tiger: { sel: '#tiger .tg', a: 87.4, d: 2.0, ea: 93.0, ed: 2.0 },
    sp1: { sel: '#sp1 .pd', a: 0, d: 0.01, ea: 164.0, ed: 0.3, skip: true },
    sp2: { sel: '#sp2 .pd', a: 0, d: 0.01, ea: 162.8, ed: 0.3, skip: true },
    sp3: { sel: '#sp3 .pd', a: 0, d: 0.01, ea: 165.2, ed: 0.3, skip: true },
  };
  const strokes = {};
  for (const k in SETS) {
    const ps = $$(SETS[k].sel).map((p) => ({ p, len: p.getTotalLength() + 1 }));
    strokes[k] = { ps, total: ps.reduce((a, o) => a + o.len, 0) };
    if (!SETS[k].skip) ps.forEach((o) => { o.p.style.strokeDasharray = o.len + ' ' + (o.len + 10); });
  }
  const ssf = (u) => { u = Math.max(0, Math.min(1, u)); return u * u * (3 - 2 * u); };
  function pencil(t) {
    for (const k in SETS) {
      const s = SETS[k]; if (s.skip) continue;
      let u = ssf((t - s.a) / s.d);
      if (s.ea) u = Math.min(u, 1 - ssf((t - s.ea) / s.ed));
      let acc = u * strokes[k].total;
      for (const o of strokes[k].ps) { const d = Math.max(0, Math.min(o.len, acc)); o.p.style.strokeDashoffset = o.len - d; acc -= o.len; }
    }
    // eaten sprouts: they shrink away
    for (const k of ['sp1', 'sp2', 'sp3']) { const s = SETS[k]; const u = 1 - ssf((t - s.ea) / s.ed); $('#' + k).setAttribute('opacity', u.toFixed(3)); }
  }

  // ---------- camera ----------
  const bokeh = makeBokeh(10, ['#fff3d8', '#ffe6c0', '#fff8ea'], 51);
  const cam = { cx: 1250, cy: 680, s: 1.25 };
  const st = { shake: 0, sa: -60, ca: 0, count: 0, glow: 0, smoke: 0, hammer: 1 };
  function applyCam(t) {
    const w = cinemaFrame(t, st.shake);
    const hw = 960 / cam.s, hh = 402 / cam.s;
    const cx = Math.min(Math.max(cam.cx, hw), 2400 - hw), cy = Math.min(Math.max(cam.cy, hh), 1005 - hh);
    $('#world').style.transform = `translate(${(960 - cx * cam.s + w.wx).toFixed(2)}px, ${(402 - cy * cam.s + w.wy).toFixed(2)}px) scale(${cam.s})`;
    $('#bgImg').style.filter = `blur(${Math.max(0, (cam.s - 1.3) * 2.6).toFixed(2)}px) brightness(1.22) saturate(.9)`;
    drawBokeh(bokeh, t, cam, Math.max(0, Math.min(1, (cam.s - 1.4) / 0.4)) * 0.5);
  }

  const tl = gsap.timeline({ paused: true });
  const pv = (id, map) => Object.entries(map).forEach(([part, o]) => tl.set(id + '-' + part, { rotation: 0, svgOrigin: o }, 0));
  pv('#BY', BOY_PIVOTS); pv('#PI', PILOT_PIVOTS);
  tl.set('#PI-root', { rotation: 88, svgOrigin: '0 -60' }, 0).set('#BY-root', { rotation: 0, svgOrigin: '0 0' }, 0);
  tl.set([B('legL'), B('legR')], { scaleY: 0.5 }, 0).set('#byMove', { y: 28 }, 0);
  tl.set(B('armL'), { rotation: -32 }, 0).set(B('armR'), { rotation: 32 }, 0);
  tl.set(S('lidL'), { scaleY: 0, svgOrigin: '-126 -262' }, 0).set(S('lidR'), { scaleY: 0, svgOrigin: '-62 -260' }, 0)
    .set(S('head'), { rotation: 0, svgOrigin: '-60 -190' }, 0).set(S('earN'), { rotation: 0, svgOrigin: '-10 -262' }, 0)
    .set(S('body'), { scaleY: 1, svgOrigin: '40 -80' }, 0).set(S('legFN'), { rotation: 0, svgOrigin: '-18 -96' }, 0);
  tl.set('#sUp', { y: 70 }, 0).set('#tree', { scale: 0.08, svgOrigin: '0 0' }, 0).set('#crack', { opacity: 1 }, 0)
    .set('#halfL', { x: 0, rotation: 0, svgOrigin: '0 40' }, 0).set('#halfR', { x: 0, rotation: 0, svgOrigin: '0 40' }, 0)
    .set('#roseHead', { rotation: 0, svgOrigin: '0 -20' }, 0).set('#tigerPos', { x: 40 }, 0).set('#globe', { y: -260 }, 0)
    .set('#pSheepRot', { rotation: 30, svgOrigin: '0 40' }, 0);
  tl.set('#fade', { opacity: 1 }, 0).to('#fade', { opacity: 0, duration: 2 }, 0);

  const TALK_B = 'M-8 -241 Q0 -230 8 -241', REST_B = 'M-8 -240 Q0 -235 8 -240', SMILE_B = 'M-9 -241 Q0 -232 9 -241', BIG_B = 'M-10 -242 Q0 -226 10 -242', SAD_B = 'M-8 -236 Q0 -241 8 -236', OH_B = 'M-4 -240 Q0 -232 4 -240';
  const TALK_P = 'M-14 -366 Q0 -352 14 -366', REST_P = 'M-14 -364 Q0 -360 14 -364', SMILE_P = 'M-15 -366 Q0 -355 15 -366';
  const SMILE = 'M-112 -200 Q-98 -188 -82 -200', BIG = 'M-116 -203 Q-98 -180 -78 -203', OH = 'M-103 -199 Q-97 -186 -90 -199', SAYD = 'M-108 -202 Q-98 -180 -86 -202', FIRM = 'M-110 -197 Q-97 -199 -84 -197';
  const talk = (sel, at, dur, a, rest) => { for (let k = 0; k < dur / 0.2; k++) tl.set(sel, { attr: { d: k % 2 ? rest : a } }, at + k * 0.2); tl.set(sel, { attr: { d: rest } }, at + dur); };
  const blinkB = (at) => tl.set([B('lidL'), B('lidR')], { opacity: 1 }, at).set([B('lidL'), B('lidR')], { opacity: 0 }, at + 0.14);
  const blinkP = (at) => tl.set([PI('lidL'), PI('lidR')], { opacity: 1 }, at).set([PI('lidL'), PI('lidR')], { opacity: 0 }, at + 0.14);
  const blinkS = (at) => tl.to([S('lidL'), S('lidR')], { scaleY: 1, duration: 0.07 }, at).to([S('lidL'), S('lidR')], { scaleY: 0, duration: 0.1 }, at + 0.13);
  [2.5, 9.9, 26.3, 41.2, 61.0, 78.0, 90.5, 118.0, 140.2, 152.0, 163.0, 179.0].forEach(blinkB);

  // 0–18 the wrench, and "Do you want to hear about my planet?"
  tl.to(PI('legL'), { rotation: -14, duration: 0.3, yoyo: true, repeat: 3 }, 1.2);
  tl.to(st, { hammer: 0, duration: 0.2 }, 3.4);
  tl.to(B('head'), { rotation: 6, duration: 0.5 }, 4.0).to(B('eyes'), { x: 5, y: 3, duration: 0.4 }, 4.0);
  tl.to(B('armR'), { rotation: -20, duration: 0.5 }, 6.4).to('#BY-root', { rotation: 8, duration: 0.5, svgOrigin: '0 -60' }, 6.4)
    .to('#wrench', { x: 380, duration: 1.0, ease: 'power2.out' }, 7.0).to('#wrench', { rotation: 720, duration: 1.0, ease: 'power2.out', svgOrigin: '0 0' }, 7.0)
    .to(B('armR'), { rotation: 32, duration: 0.5 }, 7.4).to('#BY-root', { rotation: 0, duration: 0.5 }, 7.4).set('#wrench', { opacity: 0 }, 8.1);
  tl.to(st, { hammer: 1, duration: 0.2 }, 9.6).to(st, { hammer: 0, duration: 0.2 }, 10.6);
  tl.to(B('eyes'), { x: 8, y: 0, duration: 0.4 }, 10.6);
  talk(B('mouth'), 11.0, 3.0, TALK_B, SMILE_B);
  tl.to(PI('legR'), { rotation: -10, duration: 0.4, yoyo: true, repeat: 1 }, 15.0);
  talk(B('mouth'), 17.2, 1.0, TALK_B, BIG_B);
  tl.to(B('head'), { rotation: -6, duration: 0.4, yoyo: true, repeat: 1 }, 17.4);

  // 18–62 STORY 1: the tiny planet, and forty-four sunsets
  tl.to(cam, { cx: 1150, cy: 470, s: 1.0, duration: 3.5, ease: 'sine.inOut' }, 18.6);
  tl.to(B('head'), { rotation: 0, duration: 0.6 }, 18.6).to(B('eyes'), { x: 4, y: -6, duration: 0.5 }, 18.8);
  tl.to('#d1', { opacity: 1, duration: 0.5 }, 19.3);
  talk(B('mouth'), 20.0, 3.6, TALK_B, SMILE_B); talk(B('mouth'), 24.6, 4.4, TALK_B, SMILE_B);
  tl.to(st, { smoke: 1, duration: 1 }, 25.5);
  tl.set(['#chairRot', '#sunRot'], { opacity: 1 }, 0).set('#chairRot', { rotation: 0, svgOrigin: '0 40' }, 0).set('#sunRot', { rotation: -60, svgOrigin: '0 40' }, 0);
  talk(B('mouth'), 31.0, 4.4, TALK_B, REST_B);
  tl.to(st, { ca: -40, duration: 1.6, ease: 'sine.inOut' }, 33.2);
  tl.to(st, { sa: -95, duration: 2.6, ease: 'sine.in' }, 30.4);     // the first sunset, just before the chair moves
  tl.to(st, { sa: -132, duration: 2.8, ease: 'sine.inOut' }, 35.8);
  talk(B('mouth'), 35.8, 2.8, TALK_B, SMILE_B);
  tl.to(cam, { cx: 1150, cy: 430, s: 1.25, duration: 8, ease: 'sine.inOut' }, 38.6);
  tl.to(st, { sa: -132 - 360 * 6, ca: -40 - 360 * 6, duration: 9, ease: 'power2.inOut' }, 39.0);   // the montage: round and round
  tl.to('#count', { opacity: 1, duration: 0.3 }, 39.4).to(st, { count: 44, duration: 8.4, ease: 'power2.in' }, 39.4).to('#count', { opacity: 0, duration: 1.2 }, 51.5);
  talk(B('mouth'), 45.0, 3.6, TALK_B, REST_B);
  tl.to(B('eyes'), { x: 8, y: 2, duration: 0.5 }, 50.0);
  tl.to(cam, { cx: 920, cy: 800, s: 2.0, duration: 4, ease: 'sine.inOut' }, 52.8);
  tl.to(B('head'), { rotation: -10, duration: 1.2, ease: 'sine.inOut' }, 54.6).to(B('eyes'), { x: -2, y: 7, duration: 0.8 }, 54.6).to(B('mouth'), { attr: { d: SAD_B }, duration: 0.5 }, 54.8);
  tl.to('#peek', { opacity: 1, duration: 0.3 }, 55.6).set('#peek', { opacity: 0 }, 56.6).set('#peek', { opacity: 1 }, 56.75).to('#peek', { opacity: 0, duration: 0.5 }, 59.0);
  tl.to([B('armL')], { rotation: -44, duration: 0.8 }, 57.5).to([B('armR')], { rotation: 44, duration: 0.8 }, 57.5);
  tl.to('#d1', { opacity: 0, duration: 3 }, 58.0).to(st, { smoke: 0, duration: 2 }, 58.0);

  // 62–121 STORY 2: the rose
  tl.to(cam, { cx: 1150, cy: 450, s: 1.0, duration: 3.5, ease: 'sine.inOut' }, 61.6);
  tl.to(B('head'), { rotation: 0, duration: 0.8 }, 62.4).to(B('eyes'), { x: 4, y: -6, duration: 0.5 }, 62.6).to(B('mouth'), { attr: { d: SMILE_B }, duration: 0.4 }, 62.6)
    .to([B('armL')], { rotation: -32, duration: 0.8 }, 62.4).to([B('armR')], { rotation: 32, duration: 0.8 }, 62.4);
  tl.to('#d2', { opacity: 1, duration: 0.6 }, 63.0);
  talk(B('mouth'), 63.0, 3.0, TALK_B, SMILE_B);
  tl.to('#seed', { opacity: 1, duration: 0.2 }, 63.8).to('#seed', { attr: { cy: 116 }, duration: 1.2, ease: 'power2.in' }, 63.8).to('#seed', { opacity: 0, duration: 0.4 }, 65.0);
  talk(B('mouth'), 67.6, 4.6, TALK_B, SMILE_B);
  tl.to('#roseHead', { rotation: 6, duration: 0.25, yoyo: true, repeat: 9, ease: 'sine.inOut' }, 69.0);  // fussing and fixing her petals
  tl.to('#bud', { opacity: 0, duration: 1.4 }, 72.4);
  tl.to('#roseFill', { opacity: 0.75, duration: 1.6, ease: 'sine.inOut' }, 74.2);
  talk(B('mouth'), 76.6, 2.8, TALK_B, SMILE_B);
  tl.to(cam, { cx: 1150, cy: 420, s: 1.2, duration: 5, ease: 'sine.inOut' }, 75.0);
  tl.to('#roseHead', { rotation: -14, duration: 0.8, ease: 'back.out(2)' }, 80.2);
  talk(B('mouth'), 80.0, 3.0, TALK_B, BIG_B);
  talk(B('mouth'), 83.6, 4.8, TALK_B, SMILE_B);
  tl.to('#thorns', { scale: 1.25, duration: 0.25, yoyo: true, repeat: 7, svgOrigin: '0 60' }, 85.0);
  tl.to('#tigerPos', { x: -20, duration: 2.6, ease: 'sine.inOut' }, 89.4);
  tl.to('#roseHead', { rotation: 10, duration: 0.4, ease: 'back.out(3)' }, 90.0).to('#thorns', { scale: 1.35, duration: 0.2, svgOrigin: '0 60' }, 90.0);
  talk(B('mouth'), 92.4, 3.4, TALK_B, BIG_B);
  tl.to('#roseHead', { rotation: -14, duration: 0.8 }, 95.0).to('#thorns', { scale: 1, duration: 0.6, svgOrigin: '0 60' }, 95.0);
  talk(B('mouth'), 96.4, 3.6, TALK_B, REST_B);
  tl.to('#roseHead', { rotation: 4, duration: 0.15, yoyo: true, repeat: 9 }, 97.5);   // shivers
  tl.to('#globe', { opacity: 1, duration: 0.3 }, 100.0).to('#globe', { y: 0, duration: 1.6, ease: 'power2.out' }, 100.0);
  talk(B('mouth'), 101.0, 3.6, TALK_B, SMILE_B);
  tl.to(cam, { cx: 960, cy: 720, s: 1.55, duration: 3, ease: 'sine.inOut' }, 104.8);
  tl.to('#sUp', { y: -18, duration: 0.6, ease: 'back.out(2)' }, 105.8).to(S('eyes'), { x: 8, y: -10, duration: 0.4 }, 106.2);   // the sheep peeps out at the rose
  tl.to(S('earN'), { rotation: -18, duration: 0.25 }, 106.2).to(S('earN'), { rotation: 0, duration: 0.8, ease: 'elastic.out(1,0.4)' }, 106.5);
  tl.to(B('head'), { rotation: -8, duration: 1 }, 107.2).to(B('eyes'), { y: 4, duration: 0.6 }, 107.2);
  talk(B('mouth'), 107.6, 3.8, TALK_B, SAD_B);
  tl.to('#d2', { opacity: 0.55, duration: 2 }, 108.0).to('#roseHead', { rotation: 20, duration: 2.4, ease: 'sine.inOut' }, 108.4);
  talk(B('mouth'), 112.4, 4.4, TALK_B, SAD_B);
  tl.to(S('eyes'), { x: 10, y: 4, duration: 0.5 }, 112.6).to(S('mouth'), { attr: { d: OH }, duration: 0.3 }, 113.0);
  blinkS(110.0); blinkS(115.0);
  tl.to('#d2', { opacity: 0, duration: 3 }, 117.0).to('#sUp', { y: 70, duration: 0.5, ease: 'power2.in' }, 119.0).set(S('mouth'), { attr: { d: SMILE } }, 119.6).set(S('eyes'), { x: 0, y: 0 }, 119.6);

  // 121–175 STORY 3: the baobabs
  tl.to(cam, { cx: 1150, cy: 450, s: 1.0, duration: 2.4, ease: 'power2.inOut' }, 121.2);
  tl.to(B('head'), { rotation: 6, duration: 0.25, ease: 'back.out(3)' }, 121.4).to(B('eyes'), { x: 4, y: -6, duration: 0.2 }, 121.4).to(B('mouth'), { attr: { d: BIG_B }, duration: 0.2 }, 121.4)
    .to(B('armR'), { rotation: -100, duration: 0.4, ease: 'back.out(2)' }, 121.5).to(B('armR'), { rotation: 32, duration: 0.6 }, 124.0);
  talk(B('mouth'), 121.5, 3.0, TALK_B, BIG_B);
  tl.set(['#chairRot', '#sunRot', '#count'], { opacity: 0 }, 121.0).set('#sunGlow', { opacity: 0 }, 121.0).to('#d1', { opacity: 1, duration: 1.0 }, 123.0).to('#miniRose', { opacity: 1, duration: 0.6 }, 123.4).to('#mrFill', { opacity: 0.75, duration: 0.6 }, 123.4);
  talk(B('mouth'), 125.4, 3.6, TALK_B, SMILE_B); talk(B('mouth'), 129.6, 4.0, TALK_B, REST_B);
  tl.to('#tree', { opacity: 1, duration: 0.2 }, 131.4).to('#tree', { scale: 1, duration: 5.2, ease: 'power2.in' }, 131.5);
  talk(B('mouth'), 134.2, 5.0, TALK_B, BIG_B);
  tl.to(cam, { cx: 1150, cy: 400, s: 1.2, duration: 5, ease: 'power2.in' }, 133.0);
  tl.to(st, { shake: 0.5, duration: 0.3 }, 138.4).to(st, { shake: 0, duration: 1.2 }, 139.0);
  tl.to('#halfL', { x: -40, rotation: -14, duration: 0.6, ease: 'power3.out' }, 138.4).to('#halfR', { x: 40, rotation: 14, duration: 0.6, ease: 'power3.out' }, 138.4);
  tl.to(B('eyes'), { x: 10, y: -2, duration: 0.3 }, 139.6);
  // the pilot slides out from under the engine to look, and gets up
  tl.to(st, { hammer: 0, duration: 0.1 }, 139.4);
  tl.to('#piMove', { x: -150, duration: 1.0, ease: 'power2.out' }, 139.8).to('#PI-root', { rotation: 0, duration: 1.0, ease: 'power2.inOut' }, 140.9).set('#smudge', { opacity: 0.8 }, 0);
  tl.to(cam, { cx: 1150, cy: 520, s: 1.0, duration: 2, ease: 'sine.inOut' }, 140.6);
  tl.to(PI('head'), { rotation: -10, duration: 0.8 }, 142.2).to(PI('eyes'), { x: -4, y: -8, duration: 0.5 }, 142.2);
  talk(PI('mouth'), 143.0, 3.0, TALK_P, REST_P);
  tl.to('#halfL', { x: 0, rotation: 0, duration: 0.8, ease: 'back.out(1.6)' }, 147.0).to('#halfR', { x: 0, rotation: 0, duration: 0.8, ease: 'back.out(1.6)' }, 147.0)
    .to('#tree', { scale: 0.08, duration: 1.0, ease: 'power2.inOut' }, 147.6).to('#tree', { opacity: 0, duration: 0.4 }, 148.4);
  tl.to(B('head'), { rotation: -8, duration: 0.6 }, 149.2).to(B('eyes'), { x: -4, y: 6, duration: 0.4 }, 149.2);
  talk(B('mouth'), 149.4, 4.0, TALK_B, OH_B);
  tl.to(PI('head'), { rotation: 0, duration: 0.6 }, 153.6).to(PI('eyes'), { x: -8, y: 0, duration: 0.4 }, 153.6);
  talk(PI('mouth'), 154.0, 2.0, TALK_P, SMILE_P);
  // "Then your sheep can eat my baobabs!" — he jumps up with the box held high
  tl.to([B('legL'), B('legR')], { scaleY: 1, duration: 0.4, ease: 'back.out(2)' }, 156.4).to('#byMove', { y: 0, x: 60, duration: 0.4, ease: 'back.out(2)' }, 156.4)
    .to('#boxMove', { x: 60, y: -40, duration: 0.4, ease: 'back.out(2)' }, 156.4).to([B('armL')], { rotation: 150, duration: 0.4 }, 156.4).to([B('armR')], { rotation: -150, duration: 0.4 }, 156.4)
    .to('#boxMove', { y: -205, duration: 0.4, ease: 'back.out(2)' }, 156.5);
  talk(B('mouth'), 156.6, 4.0, TALK_B, BIG_B);
  tl.to('#byMove', { y: -24, duration: 0.18, yoyo: true, repeat: 5, ease: 'sine.out' }, 158.0).to('#boxMove', { y: -229, duration: 0.18, yoyo: true, repeat: 5, ease: 'sine.out' }, 158.0);
  tl.to(cam, { cx: 1100, cy: 470, s: 1.0, duration: 2, ease: 'sine.inOut' }, 159.0);
  // the pencil sheep eats the sprouts
  tl.to('#pSheepRot', { opacity: 1, duration: 0.4 }, 161.2);
  tl.to('#pSheepRot', { rotation: 50, duration: 0.5, ease: 'power2.inOut' }, 162.2).to('#pSheepRot', { rotation: -5, duration: 0.6, ease: 'power2.inOut' }, 163.3).to('#pSheepRot', { rotation: -55, duration: 0.6, ease: 'power2.inOut' }, 164.5);
  tl.to([B('armL'), B('armR')], { rotation: 0, duration: 0.5 }, 161.2).to([B('armL')], { rotation: -32, duration: 0.5 }, 161.8).to([B('armR')], { rotation: 32, duration: 0.5 }, 161.8)
    .to('#boxMove', { x: 60, y: -40, duration: 0.5 }, 161.2);
  // the real sheep pops up out of the box, proud
  tl.to(cam, { cx: 965, cy: 800, s: 3.3, duration: 1.6, ease: 'sine.inOut' }, 165.0);
  tl.to('#sUp', { y: -45, duration: 0.5, ease: 'back.out(2.4)' }, 165.6).to(S('body'), { scaleY: 1.08, duration: 0.4, ease: 'back.out(2)' }, 165.8)
    .to(S('head'), { rotation: 10, duration: 0.4 }, 165.8).to(S('eyes'), { x: -4, y: -6, duration: 0.3 }, 165.8);
  talk(S('mouth'), 166.0, 3.0, SAYD, SMILE);
  tl.to(S('earN'), { rotation: -20, duration: 0.18, yoyo: true, repeat: 3 }, 169.4);
  talk(S('mouth'), 169.6, 3.0, SAYD, BIG);
  blinkS(168.6);
  // the twist
  tl.to(cam, { cx: 1100, cy: 560, s: 1.05, duration: 2.4, ease: 'sine.inOut' }, 173.2);
  tl.set('#rag', { opacity: 1 }, 172.0).to(PI('armL'), { rotation: 60, duration: 0.3, yoyo: true, repeat: 5 }, 172.4);
  tl.to('#piMove', { x: -300, duration: 2, ease: 'sine.inOut' }, 172.6);
  talk(PI('mouth'), 174.2, 3.8, TALK_P, REST_P);
  tl.to('#pSheepRot', { rotation: -24, duration: 2.2, ease: 'sine.inOut' }, 175.4).set('#pSheepFlip', { attr: { transform: 'scale(-1 1)' } }, 175.4);
  tl.to('#mrFill', { attr: { fill: '#9a9a9a' }, duration: 1.4 }, 178.2);
  tl.to(B('mouth'), { attr: { d: OH_B }, duration: 0.2 }, 178.2).to(B('eyes'), { x: 0, y: 0, duration: 0.2 }, 178.2);
  tl.to('#sUp', { y: -18, duration: 0.6 }, 178.6).to(S('body'), { scaleY: 1, duration: 0.5 }, 178.6).to(S('head'), { rotation: 0, duration: 0.5 }, 178.6);
  talk(B('mouth'), 180.6, 2.8, TALK_B, SAD_B);
  tl.to(PI('head'), { rotation: -6, duration: 0.6 }, 183.8).to(PI('eyes'), { x: -8, y: 4, duration: 0.4 }, 183.8);
  talk(PI('mouth'), 184.2, 3.4, TALK_P, REST_P); talk(PI('mouth'), 188.2, 3.0, TALK_P, REST_P);
  tl.to([B('legL'), B('legR')], { scaleY: 0.5, duration: 1.4, ease: 'sine.inOut' }, 189.0).to('#byMove', { y: 28, x: 0, duration: 1.4, ease: 'sine.inOut' }, 189.0)
    .to('#boxMove', { x: 0, y: 0, duration: 1.4, ease: 'sine.inOut' }, 189.0)
    .to([B('armL')], { rotation: -44, duration: 1.2 }, 189.2).to([B('armR')], { rotation: 44, duration: 1.2 }, 189.2)
    .to(B('head'), { rotation: -12, duration: 1.4 }, 189.6).to(B('eyes'), { x: -2, y: 8, duration: 1 }, 189.6).to(B('mouth'), { attr: { d: SAD_B }, duration: 0.6 }, 189.6);
  tl.to(cam, { cx: 920, cy: 830, s: 2.7, duration: 6, ease: 'sine.inOut' }, 191.0);
  tl.to('#tear', { opacity: 0.9, duration: 0.6 }, 194.6).to('#tear', { attr: { cy: -236 }, duration: 2.4, ease: 'sine.in' }, 195.4).to('#tear', { opacity: 0, duration: 0.5 }, 197.4);
  tl.to(S('eyes'), { x: 12, y: -12, duration: 0.6 }, 195.6).to(S('head'), { rotation: 8, duration: 0.8 }, 195.6).to(S('mouth'), { attr: { d: OH }, duration: 0.3 }, 196.0);
  blinkS(197.4);
  tl.to(S('mouth'), { attr: { d: FIRM }, duration: 0.3 }, 198.0);
  talk(S('mouth'), 198.4, 3.0, SAYD, FIRM);
  tl.to(S('legFN'), { rotation: 70, duration: 0.6, ease: 'back.out(2)' }, 201.6);    // a hoof to its heart
  talk(S('mouth'), 202.4, 3.2, SAYD, SMILE);
  tl.to('#d1', { opacity: 0.25, duration: 3 }, 203.0).to('#mrFill', { attr: { fill: '#e05a5a' }, duration: 2 }, 204.0);
  tl.to(S('legFN'), { rotation: 0, duration: 0.6 }, 206.0).to('#sUp', { y: 70, duration: 0.6, ease: 'power2.in' }, 206.4);
  // "Hey. I'll think of something."
  tl.to(cam, { cx: 1000, cy: 700, s: 1.45, duration: 3, ease: 'sine.inOut' }, 206.6);
  tl.set('#rag', { opacity: 0 }, 206.0).to('#piMove', { x: -420, duration: 1.6, ease: 'sine.inOut' }, 206.2).to(PI('armL'), { rotation: 80, duration: 1.0, ease: 'sine.inOut' }, 207.8).to(PI('head'), { rotation: -12, duration: 0.8 }, 207.8);
  talk(PI('mouth'), 208.6, 4.0, TALK_P, SMILE_P);
  tl.to(B('head'), { rotation: 6, duration: 1.2 }, 210.4).to(B('eyes'), { x: 6, y: -4, duration: 0.6 }, 210.4).to(B('mouth'), { attr: { d: SMILE_B }, duration: 0.6 }, 211.6);
  tl.to(cam, { cx: 1150, cy: 402, s: 1.0, duration: 10, ease: 'sine.inOut' }, 213.0);
  tl.to('#d1', { opacity: 0, duration: 4 }, 214.0);
  tl.to('#fade', { opacity: 1, duration: 3.5 }, 224.5);

  // ---------- volcano smoke ----------
  const puffs = [];
  for (let i = 0; i < 8; i++) puffs.push(Object.assign(document.createElementNS(NS, 'circle'), {}));
  puffs.forEach((c) => { c.setAttribute('class', 'pd'); c.setAttribute('stroke-width', '2.2'); $('#smoke').appendChild(c); });
  const V = [[-125, 0], [-105, 0.5]];

  function drive(t) {
    const b = Math.floor(t * 12) % 4;
    ['wcPlaneB', 'wcPilotB', 'wcBoyB'].forEach((id, i) => $('#' + id).setAttribute('seed', 3 + i * 4 + b));
    pencil(t);
    // sun and chair round the little planet; the sky in the drawing turns orange at sunset
    $('#sunRot').setAttribute('transform', `rotate(${st.sa.toFixed(2)} 0 40)`);
    $('#chairRot').setAttribute('transform', `rotate(${st.ca.toFixed(2)} 0 40)`);
    const rel = ((st.sa - st.ca + 90) % 360 + 540) % 360 - 180;   // 0 = the sun on his horizon
    if (t < 121) $('#sunGlow').setAttribute('opacity', (0.9 * Math.exp(-rel * rel / 300)).toFixed(3));
    $('#count').textContent = String(Math.max(1, Math.round(st.count)));
    for (let i = 0; i < puffs.length; i++) {
      const [deg, ph] = V[i % 2], a = deg * Math.PI / 180, u = ((t * 0.35 + i / puffs.length + ph) % 1);
      const x = 138 * Math.cos(a) + Math.cos(a) * u * 60, y = 40 + 138 * Math.sin(a) + Math.sin(a) * u * 60 - u * 20;
      puffs[i].setAttribute('cx', x.toFixed(1)); puffs[i].setAttribute('cy', y.toFixed(1)); puffs[i].setAttribute('r', (3 + u * 8).toFixed(1));
      puffs[i].setAttribute('opacity', (st.smoke * Math.sin(Math.PI * u) * 0.8).toFixed(3));
    }
    // the pilot under the engine: his legs, and tapping at the engine with the wrench
    if (st.hammer > 0) gsap.set(PI('armR'), { rotation: -120 + Math.sin(t * 9) * 16 * st.hammer });
    $('#PI-bob').setAttribute('transform', `translate(0 ${(Math.sin(t * 1.6) * 2).toFixed(2)})`);
    $('#BY-bob').setAttribute('transform', `translate(0 ${(Math.sin(t * 1.9) * 2).toFixed(2)})`);
    $('#S-bob').setAttribute('transform', `translate(0 ${(-2 * Math.sin(t * 2.4)).toFixed(2)})`);
    Boy.scarf('BY', t, 0.7 + 0.2 * Math.sin(t * 0.6), -1);
    Pilot.scarf('PI', t, 0.3, -1);
    subs(t);
    applyCam(t);
  }
  return { render: (t) => { tl.seek(t); drive(t); } };
}
