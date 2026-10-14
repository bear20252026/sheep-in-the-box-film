// The whole feature as a shot list. Each sequence has a target length (from the script);
// shot lengths inside it are weights, scaled so the sequence hits its target exactly.
// Shot: { w, bg, note, els: [[Type, from, to?]], say: [[t0, t1, who, text]] (seconds before scaling), cam }

const S = (w, bg, note, els = [], say = [], cam = null) => ({ w, bg, note, els, say, cam });
const sheep = (x, y, s = 1, p = {}) => ['Sheep', { x, y, s, ...p }];
const G = (kind, x, y, s = 0.8, p = {}) => ['Sheep', { x, y, s, ghost: kind, ...p }];

function seq(id, title, target, shots) {
  const total = shots.reduce((a, s) => a + s.w, 0), k = target / total;
  return shots.map((s, i) => ({ ...s, dur: s.w * k, seq: id, seqTitle: title, shot: i + 1, say: s.say.map(([a, b, w, t]) => [a * k, b * k, w, t]) }));
}

export const SEQS = [
  seq(1, 'The Crash', 240, [
    S(14, 'night', 'Night sky over the Sahara. Stars. Music, quiet.', [['Star', { x: 1500, y: 160, s: 1 }]], [], { s0: 1, s1: 1.1 }),
    S(10, 'night', 'A small plane hums across the stars.', [['Plane', { x: -200, y: 260, s: 0.6 }, { x: 1300, y: 300 }]]),
    S(6, 'night', 'The engine coughs. Smoke.', [['Plane', { x: 900, y: 300, s: 0.9, broken: 1 }, { x: 1100, y: 340 }]]),
    S(12, 'night', 'It spirals down, long and graceful…', [['Plane', { x: 700, y: 120, s: 0.7, r: 30, broken: 1 }, { x: 1100, y: 560, r: 400 }]]),
    S(6, 'night', 'Hard landing on a dune. Sand hisses. Silence.', [['Plane', { x: 960, y: 560, s: 1, r: 12, broken: 1 }]], [], { s0: 1.2, s1: 1 }),
    S(14, 'night', 'The pilot crawls out, checks the engine, sighs.', [['Plane', { x: 1200, y: 560, s: 1, r: 12, broken: 1 }], ['Pilot', { x: 600, y: 680, s: 1 }, { x: 760 }]],
      [[3, 12, 'PILOT', 'Eight days of water. And a thousand miles of sand.']]),
    S(14, 'night', 'He lies on the sand and looks up. One star WINKS. He doesn\'t notice.', [['Star', { x: 1300, y: 200, s: 1.5, wink: 1 }], ['Pilot', { x: 700, y: 760, s: 0.8, r: -80 }]], [], { s0: 1, s1: 1.15 }),
    S(14, 'dawn', 'Time-lapse: stars wheel away, dawn comes pink and gold.', [['Glow', { x: 960, y: 700, s: 1, r: 300, o: 0.4 }]]),
    S(8, 'desert', 'A small shadow falls across his face.', [['Pilot', { x: 960, y: 900, s: 1.6, r: -80 }]], [[2, 8, 'BOY', 'If you please… draw me a sheep.']]),
    S(10, 'desert', 'The pilot jolts up. The BOY stands on the dune, scarf blowing, perfectly calm.', [['Boy', { x: 1300, y: 600, s: 1.2 }], ['Pilot', { x: 500, y: 760, s: 1 }]],
      [[2, 5, 'PILOT', 'A… what?'], [6, 9, 'BOY', 'A sheep. Please.']]),
    S(10, 'desert', 'He looks at the endless desert… shrugs… pulls out his notebook and pencil.', [['Pilot', { x: 700, y: 760, s: 1 }], ['Boy', { x: 1300, y: 640, s: 1 }], ['Notebook', { x: 960, y: 420, s: 0.2, op: 0 }, { s: 0.5, op: 1 }]]),
  ]),

  seq(2, 'Three Wrong Sheep', 300, [
    S(8, 'paper', 'INTO THE NOTEBOOK. Paper fills the screen. The pencil is a giant.', [['Hand', { x: 1500, y: 300, s: 1.4 }, { x: 1100, y: 420 }]]),
    S(12, 'paper', 'Sheep #1 is drawn… comes alive… sneezes, shivers, pulls a pencil scarf round its neck: SNIFFLE.', [G('sniffle', 900, 480, 1.2, { op: 1 }), ['Hand', { x: 1200, y: 340, s: 1 }, { x: 1500, y: 200 }]]),
    S(10, 'paper', '', [G('sniffle', 900, 480, 1.2)], [[1, 5, 'BOY', 'No. That one is already very sick.'], [5.5, 9, 'SNIFFLE', 'Wait — it\'s just allergies!']]),
    S(8, 'paper', 'The eraser. Rub, rub. Sniffle fades to a faint grey ghost… still sniffling.', [G('sniffle', 900, 480, 1.2, { op: 1 }, ), ['Hand', { x: 1000, y: 380, s: 1, pencil: 0 }]]),
    S(12, 'paper', 'Sheep #2: big curled horns, snorts: HORNS.', [G('horns', 960, 480, 1.3)], [[2, 5, 'HORNS', 'HA! Behold!'], [6, 11, 'BOY', 'That\'s not a sheep. That\'s a ram. It has horns.']]),
    S(8, 'paper', 'Rub, rub. A ghost — offended.', [G('horns', 960, 480, 1.3)], [[1, 6, 'HORNS', 'These are DECORATIVE!']]),
    S(12, 'paper', 'Sheep #3, very slowly, yawning: OLD WOOL.', [G('old', 960, 480, 1.3)], [[1, 4, 'OLD WOOL', 'Mm. Is it lunch?'], [5, 11, 'BOY', 'Too old. I want a sheep that will live a long time.']]),
    S(6, 'paper', 'Old Wool lets itself be erased, politely.', [G('old', 960, 480, 1.3)], [[1, 4, 'OLD WOOL', 'Fair.']]),
    S(8, 'desert', 'The pilot glances at his broken engine… fed up.', [['Plane', { x: 1300, y: 600, s: 0.9, r: 12, broken: 1 }], ['Pilot', { x: 600, y: 760, s: 1 }]]),
    S(10, 'paper', 'He scribbles FAST: body, head, legs — OUR SHEEP. The pencil stops halfway.', [sheep(960, 470, 1.4), ['Hand', { x: 1300, y: 300, s: 1.2 }, { x: 1600, y: 160 }]]),
    S(10, 'paper', 'It blinks. Looks at its hooves.', [sheep(960, 470, 1.4)], [[2, 6, 'SHEEP', 'Oh! Hello, hooves.']], { s0: 1, s1: 1.3 }),
    S(8, 'paper', 'It looks back at its unfinished side.', [sheep(960, 470, 1.6)], [[1, 6, 'SHEEP', 'Wait… I\'m not finished yet!']], { s0: 1.3, s1: 1.5 }),
    S(10, 'paper', 'Too late — the pencil draws a BOX around it. Three air holes.', [['Box', { x: 960, y: 640, s: 2.2, open: 0 }], ['Hand', { x: 1300, y: 300, s: 1 }, { x: 900, y: 200 }]], [[5, 10, 'PILOT', 'That\'s the box. The sheep you want is inside.']]),
    S(10, 'desert', 'A pause. Then the boy\'s face lights up.', [['Boy', { x: 960, y: 700, s: 1.8 }]], [[3, 9, 'BOY', 'That is EXACTLY the way I wanted it!']], { s0: 1, s1: 1.2 }),
  ]),

  seq(3, 'Inside the Box', 360, [
    S(10, 'box', 'Push in through the middle air hole… a warm cardboard world. Three beams of sun, dust dancing.', [['Glow', { x: 600, y: 300, s: 1, r: 160, c: '#fff4c8', o: 0.5 }]], [], { s0: 2, s1: 1 }),
    S(12, 'box', 'The sheep\'s lines are re-drawn by the light. It looks around.', [sheep(960, 520, 1.2)], [[3, 10, 'SHEEP', 'It\'s dark. No… it\'s warm.']]),
    S(12, 'box', 'The three ghosts DRIFT THROUGH THE WALL.', [sheep(700, 520, 1), G('horns', 1500, 440, 0.9, {}), G('sniffle', 1700, 480, 0.8), G('old', 1300, 500, 0.8)].map((e, i) => i ? [e[0], e[1], { x: e[1].x - 200 }] : e),
      [[5, 10, 'HORNS', 'Well, well. A NEW one.']]),
    S(14, 'box', 'They circle it.', [sheep(900, 520, 1), G('sniffle', 1200, 480, 0.8), G('old', 600, 500, 0.8), G('horns', 1300, 420, 0.9)],
      [[1, 6, 'SNIFFLE', 'Look at its back. There\'s a hole! Is it contagious?'], [7, 11, 'OLD WOOL', 'Mm. Half a sheep. Seen it before.'], [11.5, 14, 'SHEEP', 'I\'m not half! I\'m… mostly!']]),
    S(16, 'box', 'Comedy beat: the ghosts act out being drawn… and RUBBED OUT.', [G('horns', 800, 460, 1), G('sniffle', 1150, 480, 0.9), sheep(1500, 520, 0.9)],
      [[2, 9, 'HORNS', 'One day you\'re a sheep… rub, rub…'], [9.5, 15, 'SNIFFLE', '…the next day you\'re us.']]),
    S(10, 'box', 'The sheep backs into a corner, scared.', [sheep(1500, 560, 0.9, {}), G('horns', 900, 460, 1), G('sniffle', 700, 480, 0.8)], [], { s0: 1, s1: 1.2 }),
    S(12, 'box', 'A GIANT EYE appears at the air hole. The ghosts scatter. The eye is kind. It blinks slowly.', [['Glow', { x: 960, y: 200, s: 1, r: 120, c: '#fff', o: 0.6 }], sheep(960, 560, 1)]),
    S(12, 'box', '', [sheep(960, 540, 1.2)], [[2, 10, 'BOY', '(outside, soft) You\'re perfect. Good night, little sheep.']], { s0: 1, s1: 1.2 }),
    S(16, 'box', 'The sheep stands tall in the light.', [['Glow', { x: 960, y: 450, s: 1, r: 260, c: '#ffe6a0', o: 0.4 }], sheep(960, 540, 1.3)],
      [[2, 7, 'SHEEP', 'He wanted ME.'], [7.5, 15, 'SHEEP', 'Then I\'ll be a very good sheep. And one day… I\'ll be whole.']]),
    S(8, 'box', 'The ghosts look at each other. Horns rolls his eyes — but he\'s a little moved.', [G('horns', 800, 460, 1), G('sniffle', 1100, 480, 0.8), G('old', 1350, 500, 0.8)]),
    S(10, 'night', 'Pull back: out of the box, out of the notebook, up to the sky.', [['Box', { x: 960, y: 620, s: 1.4 }, { s: 0.3, y: 640 }]]),
    S(12, 'night', 'MAIN TITLE', [['Text', { x: 960, y: 380, s: 1, text: 'The Sheep in the Box', size: 96 }]]),
  ]),

  seq(4, 'Night in the Desert', 360, [
    S(10, 'night', 'The boy sleeps against the plane. The box beside him.', [['Plane', { x: 1300, y: 580, s: 0.9, r: 12, broken: 1 }], ['Boy', { x: 900, y: 680, s: 0.9, r: -70 }], ['Box', { x: 600, y: 700, s: 0.5 }]]),
    S(12, 'night', 'The sheep peeks out… climbs out. The desert is huge and blue.', [['Box', { x: 760, y: 700, s: 0.9 }], sheep(760, 560, 0.7, {}), ['Star', { x: 1500, y: 150 }]], [[6, 11, 'SHEEP', 'So this is outside…']]),
    S(10, 'night', 'Its tummy GROWLS. First hunger. Confused.', [sheep(960, 560, 1.1)], [[2, 9, 'SHEEP', 'Grrr? …Oh. That\'s me.']], { s0: 1, s1: 1.25 }),
    S(14, 'night', 'Sand. Only sand. It trots, sniffs, trots.', [sheep(300, 600, 0.8, { walk: 1 }), ], [], { x0: 0, x1: 300 }),
    S(10, 'night', 'Then — a tiny three-petal flower, alone, glowing faintly.', [['Flower', { x: 1100, y: 640, s: 1.3, glow: 0.5 }], sheep(600, 600, 0.8)], [[5, 10, 'SHEEP', 'Food! A flower is food… isn\'t it?']]),
    S(10, 'night', 'It leans in. The flower TREMBLES.', [['Flower', { x: 1060, y: 640, s: 1.5, shake: 1 }], sheep(820, 600, 1)], [], { s0: 1.2, s1: 1.4 }),
    S(10, 'night', 'The ghosts appear.', [G('horns', 600, 420, 0.8), G('sniffle', 1300, 420, 0.7), sheep(960, 600, 1)], [[1, 7, 'HORNS', 'Go on. Sheep eat flowers. That\'s what sheep DO.']]),
    S(12, 'night', 'The sheep stops.', [['Flower', { x: 1160, y: 640, s: 1.4, shake: 0.5 }], sheep(860, 600, 1.1)], [[2, 10, 'SHEEP', 'It\'s shaking. It\'s small… and alone. Like me.']], { s0: 1.3, s1: 1.4 }),
    S(10, 'night', 'A SANDSTORM rolls in like a wall.', [['Storm', { x: 960, y: 400 }], ['Flower', { x: 1160, y: 640, s: 1 }], sheep(860, 600, 0.9)]),
    S(18, 'night', 'The sheep lies down between the storm and the flower. Holds on all night. Sand ROARS past.', [['Storm', { x: 960, y: 400 }], ['Flower', { x: 1060, y: 650, s: 1 }], sheep(860, 640, 1, { sleep: 1 })], [], { s0: 1.2, s1: 1.3 }),
    S(10, 'dawn', 'Dawn. The storm is gone. The flower is safe… and opening.', [['Flower', { x: 1060, y: 650, s: 1.2, glow: 1 }], sheep(860, 640, 1, { sleep: 1 })]),
    S(14, 'dawn', 'A GOLDEN LINE traces the sheep\'s open ear… and closes it. THE EAR IS WHOLE.', [['Glow', { x: 760, y: 560, s: 1, r: 80, o: 0.7 }], sheep(860, 640, 1.4, { sleep: 1, gold: 1 })], [], { s0: 1.5, s1: 1.8, x0: -200, x1: -250 }),
    S(8, 'dawn', 'The sheep doesn\'t notice. The ghosts do.', [G('old', 700, 420, 0.8), G('horns', 1200, 420, 0.8)], [[1, 6, 'OLD WOOL', 'Mm. Well, look at that.']]),
  ]),

  seq(5, 'The Boy\'s Stories', 300, [
    S(10, 'desert', 'Day. The pilot is under the engine — hands, tools, sighs. The boy sits with the box on his lap.', [['Plane', { x: 1300, y: 560, s: 1, r: 12, broken: 1 }], ['Boy', { x: 600, y: 680, s: 1 }], ['Box', { x: 640, y: 700, s: 0.4 }]]),
    S(16, 'desert', 'His stories appear as PENCIL DRAWINGS IN THE AIR: his tiny planet, three volcanoes.', [['Boy', { x: 400, y: 700, s: 0.9 }], ['Volcano', { x: 1100, y: 360, s: 1 }], ['Volcano', { x: 1300, y: 340, s: 0.8 }]],
      [[2, 14, 'BOY', 'My planet is so small, I move my chair and watch forty-four sunsets in one day.']]),
    S(16, 'desert', 'His ROSE — proud and lovely.', [['Boy', { x: 400, y: 700, s: 0.9 }], ['Rose', { x: 1200, y: 480, s: 1.2 }]], [[2, 14, 'BOY', 'She has four thorns. She says they\'re for fighting tigers.']]),
    S(16, 'desert', 'The BAOBABS — sprouts that grow into giants and crack the planet.', [['Boy', { x: 400, y: 700, s: 0.9 }], ['Baobab', { x: 1200, y: 560, size: 0.3 }, { size: 1.1 }]], [[2, 14, 'BOY', 'You must pull them up every morning while they\'re small. Or their roots will break everything.']]),
    S(12, 'desert', '', [['Boy', { x: 900, y: 700, s: 1.3 }]], [[1, 11, 'BOY', 'Sheep eat little bushes, don\'t they? Then your sheep can eat my baobabs!']]),
    S(10, 'box', 'Inside the box: the sheep sits up proudly.', [sheep(960, 540, 1.2, { gold: 1 })], [[2, 8, 'SHEEP', 'So that\'s my job.']]),
    S(10, 'desert', '', [['Plane', { x: 1200, y: 560, s: 1, r: 12, broken: 1 }]], [[1, 9, 'PILOT', '(under the plane) And what if the sheep eats your rose?']]),
    S(12, 'desert', 'The boy goes quiet. Worried.', [['Boy', { x: 960, y: 760, s: 2 }]], [], { s0: 1, s1: 1.15 }),
    S(12, 'box', 'The sheep sees his face through the hole.', [sheep(960, 540, 1.3, { gold: 1 })], [[3, 11, 'SHEEP', 'I would never. Never ever.']], { s0: 1.2, s1: 1.4 }),
  ]),

  seq(6, 'The Birds', 300, [
    S(14, 'sky', 'Evening. A great flock of WILD BIRDS migrating overhead.', [['Birds', { x: 400, y: 200, s: 1.2 }, { x: 1500 }], ['Birds', { x: 0, y: 330, s: 0.8 }, { x: 1300 }]]),
    S(16, 'desert', 'The boy whistles. Ties long strings to the birds — carefully, gently. The pilot watches, amazed.', [['Boy', { x: 900, y: 680, s: 1 }], ['Birds', { x: 900, y: 260, s: 1 }], ['Pilot', { x: 400, y: 760, s: 1 }]]),
    S(12, 'desert', '', [['Pilot', { x: 600, y: 760, s: 1.1 }], ['Boy', { x: 1300, y: 680, s: 1.1 }]], [[1, 4, 'PILOT', 'You\'re leaving?'], [5, 11, 'BOY', 'My rose needs me. And she needs a sheep.']]),
    S(14, 'paper', 'The pilot hesitates… smiles… draws a little MUZZLE for the sheep. "Just in case." The boy tucks the page into the box.', [['Hand', { x: 1100, y: 400, s: 1.2 }, { x: 900, y: 440 }]], [[6, 12, 'PILOT', 'Just in case.']]),
    S(16, 'desert', 'LIFT-OFF. The birds rise. The boy holds the strings, the box on his arm.', [['Birds', { x: 960, y: 300, s: 1 }, { y: 120 }], ['Strings', { x: 960, y: 560, s: 1 }, { y: 380 }], ['Boy', { x: 960, y: 700, s: 1 }, { y: 520 }]]),
    S(12, 'sky', 'The sheep peeks out as the desert falls away.', [['Box', { x: 960, y: 560, s: 1.2 }], sheep(960, 420, 0.5, { gold: 1 })]),
    S(10, 'desert', 'The pilot\'s hands wave from far below — smaller, smaller.', [['Pilot', { x: 960, y: 760, s: 1 }, { s: 0.3, y: 720 }]]),
    S(26, 'sky', 'BIG MUSIC: soaring over clouds… to the edge of the sky… stars.', [['Birds', { x: 900, y: 260, s: 1 }], ['Strings', { x: 900, y: 520, s: 1 }], ['Boy', { x: 900, y: 660, s: 1 }]], [], { s0: 1, s1: 0.8 }),
  ]),

  seq(7, 'The Little Planets', 540, [
    S(10, 'king', '7a · THE KING. A purple planet, entirely covered by one robe.', [['King', { x: 960, y: 620, s: 1 }]]),
    S(12, 'king', '', [['King', { x: 700, y: 640, s: 1 }], sheep(1400, 620, 0.8, { gold: 1 })], [[1, 10, 'KING', 'A SUBJECT! I order you to… EAT that flower!']]),
    S(10, 'king', 'A little weed-flower. The sheep is torn. The ghosts whisper.', [['Flower', { x: 1200, y: 640, s: 1 }], sheep(1450, 620, 0.8, { gold: 1 }), G('sniffle', 900, 400, 0.6)], [[2, 8, 'GHOSTS', 'Obey… obey…']]),
    S(8, 'king', '', [sheep(960, 600, 1.3, { gold: 1 })], [[2, 6, 'SHEEP', 'No.']], { s0: 1.2, s1: 1.3 }),
    S(14, 'king', 'Silence. The King blinks. Then, quickly—', [['King', { x: 960, y: 640, s: 1.2 }]], [[4, 13, 'KING', '…I ORDER you to say no! Excellent obedience!']]),
    S(14, 'biz', '7b · THE BUSINESSMAN. A grey planet. A desk. Endless numbers.', [['Businessman', { x: 960, y: 640, s: 1.2 }]], [[4, 12, 'BUSINESSMAN', '…five hundred and one million, six hundred twenty-two thousand…']]),
    S(12, 'biz', '', [['Businessman', { x: 700, y: 640, s: 1 }], sheep(1350, 620, 0.8, { gold: 1 })], [[1, 10, 'BUSINESSMAN', 'One sheep. I own it. Into the drawer!']]),
    S(10, 'biz', 'STAMP. Shoved into a drawer. Slam.', [['Drawer', { x: 960, y: 600, s: 1.4, open: 1 }, { open: 0 }]]),
    S(12, 'space', 'In the dark drawer: the sheep panics.', [sheep(960, 520, 1, { gold: 1 })], [[3, 9, 'SHEEP', 'Help! It\'s dark! It\'s a drawer!']]),
    S(12, 'biz', 'HORNS rams the drawer open!', [G('horns', 960, 500, 1.2)], [[2, 9, 'HORNS', 'Nobody puts a sheep in a drawer!']]),
    S(12, 'biz', 'They escape together. Horns is embarrassed to be caught being kind.', [sheep(500, 620, 0.8, { walk: 1, gold: 1 }), G('horns', 300, 600, 0.8, { walk: 1 })].map((e) => [e[0], e[1], { x: e[1].x + 1100 }]), [[6, 11, 'HORNS', 'Don\'t make it weird.']]),
    S(12, 'lamp', '7c · THE LAMPLIGHTER. A tiny planet spinning so fast, a day lasts one minute.', [['Lamp', { x: 1100, y: 620, s: 1 }], ['Lamplighter', { x: 860, y: 640, s: 1 }]]),
    S(14, 'lamp', 'Light. Out. Light. Out. He hasn\'t slept in years.', [['Lamp', { x: 1100, y: 620, s: 1 }], ['Lamplighter', { x: 860, y: 640, s: 1 }]], [[3, 12, 'LAMPLIGHTER', 'Orders are orders. Good morning. Good evening. Good morning…']]),
    S(14, 'lamp', '', [sheep(1300, 620, 0.8, { gold: 1 }), ['Lamplighter', { x: 760, y: 640, s: 1 }]], [[1, 12, 'SHEEP', 'You sleep. I\'ll keep watch. Just for one night.']]),
    S(30, 'lamp', 'The sheep runs back and forth all night — lighting, blowing out, lighting. Comic, exhausting, sweet.', [['Lamp', { x: 960, y: 620, s: 1 }], sheep(600, 620, 0.7, { walk: 1, gold: 1 }), ['Lamplighter', { x: 1500, y: 680, s: 0.9, r: -80 }]].map((e) => e[0] === 'Sheep' ? [e[0], e[1], { x: 1300 }] : e)),
    S(12, 'lamp', 'Dawn. The Lamplighter wakes, rested — and weeps with joy.', [['Lamplighter', { x: 960, y: 660, s: 1.3 }]], [[3, 11, 'LAMPLIGHTER', 'I slept! I SLEPT!']]),
    S(16, 'lamp', 'A GOLDEN LINE fills HALF the gap in the sheep\'s back. This time it notices.', [['Glow', { x: 960, y: 460, s: 1, r: 200, o: 0.4 }], sheep(960, 600, 1.4, { gold: 2 })], [[8, 15, 'SHEEP', 'Is that… me?']], { s0: 1.3, s1: 1.6 }),
  ]),

  seq(8, 'Lost', 300, [
    S(12, 'space', 'A STORM OF STARS. Comets. Wind. Lightning.', [['Storm', { x: 960, y: 400 }], ['Birds', { x: 900, y: 260, s: 1 }], ['Boy', { x: 900, y: 620, s: 0.8 }]]),
    S(10, 'space', 'The strings snap — one, two, three.', [['Strings', { x: 960, y: 560, s: 1.4 }], ['Storm', { x: 960, y: 400 }]]),
    S(10, 'space', 'The boy reaches for the box — fingers touch — it slips.', [['Boy', { x: 800, y: 500, s: 1.2 }], ['Box', { x: 1100, y: 600, s: 0.6 }, { x: 1300, y: 900, r: 200 }]], [[5, 9, 'BOY', 'SHEEP!']]),
    S(12, 'space', 'The box tumbles away into the dark. The boy is pulled on by the birds, calling.', [['Box', { x: 960, y: 300, s: 0.6 }, { y: 800, r: 720, s: 0.2 }]]),
    S(12, 'dead', 'It crashes onto a DEAD PLANET: grey rock, cracks, huge old baobab roots. A planet nobody weeded.', [['Baobab', { x: 600, y: 560, size: 1.3 }], ['Baobab', { x: 1400, y: 580, size: 1.1 }], ['Box', { x: 1000, y: 620, s: 0.6, r: 20 }]]),
    S(14, 'dead', 'The sheep crawls out. Alone. Small.', [sheep(960, 600, 0.6, { gold: 2 })], [], { s0: 1, s1: 0.85 }),
    S(16, 'dead', 'The ghosts appear — quieter now.', [sheep(960, 600, 0.8, { gold: 2 }), G('sniffle', 600, 520, 0.7), G('horns', 1350, 500, 0.7)],
      [[2, 8, 'SNIFFLE', 'Maybe this is where unfinished things end up.'], [9, 14, 'HORNS', 'Like us.']]),
    S(20, 'dead', 'The sheep sits in the dark, head down. The lowest point. Long silence.', [sheep(960, 620, 1, { gold: 2, sleep: 1 })], [], { s0: 1, s1: 1.2 }),
    S(14, 'dead', 'Then — far away, faint — one star glows GOLD. Old Wool squints at it.', [['Star', { x: 1500, y: 160, s: 1.2 }], ['Glow', { x: 1500, y: 160, s: 1, r: 60, o: 0.6 }], G('old', 700, 520, 0.8)], [[6, 13, 'OLD WOOL', 'Mm. That one\'s looking at you.']]),
    S(14, 'dead', 'The sheep stands up.', [sheep(960, 600, 1.2, { gold: 2 })], [[4, 12, 'SHEEP', 'That\'s his star. I\'m going.']], { s0: 1.2, s1: 1.1 }),
  ]),

  seq(9, 'The Long Way Home', 240, [
    S(16, 'dead', 'It climbs the tallest dead baobab. Long, hard. Horns shoves. Sniffle cheers between coughs. Old Wool naps on a branch.', [['Baobab', { x: 960, y: 800, size: 2 }], sheep(960, 760, 0.5, { gold: 2 }, ), G('horns', 1050, 780, 0.4)].map((e) => e[0] === 'Sheep' && !e[1].ghost ? [e[0], e[1], { y: 300 }] : e)),
    S(12, 'dead', 'At the very top. The box flaps become WINGS.', [['Box', { x: 960, y: 500, s: 0.8 }], sheep(960, 360, 0.6, { gold: 2 })]),
    S(10, 'dead', 'The ghosts blow with all their might.', [G('horns', 700, 400, 0.7), G('sniffle', 1200, 420, 0.6), G('old', 950, 560, 0.6)], [[2, 7, 'HORNS', 'Ready? ONE… TWO…']]),
    S(14, 'space', 'It JUMPS. Drifts. Glides across the dark toward the gold star.', [['Box', { x: 300, y: 600, s: 0.6 }, { x: 1500, y: 300 }], ['Star', { x: 1700, y: 180, s: 1.4 }]]),
    S(10, 'dawn', 'Rolling, bumping landing on B612 at dawn. The box lands beside it.', [['Box', { x: 1200, y: 620, s: 0.6, r: 10 }], sheep(900, 620, 0.8, { gold: 2 })]),
  ]),

  seq(10, 'The Rose and the Night of Sprouts', 420, [
    S(10, 'b612', 'B612. Tiny. Three little volcanoes. A ROSE under a glass dome.', [['Volcano', { x: 500, y: 560, s: 1 }], ['Volcano', { x: 1500, y: 570, s: 0.8 }], ['Rose', { x: 960, y: 560, s: 1.2 }]]),
    S(16, 'b612', '', [['Rose', { x: 700, y: 600, s: 1.3 }], sheep(1250, 600, 0.9, { gold: 2 })],
      [[1, 5, 'ROSE', 'Oh! A sheep. Do sheep eat flowers?'], [6, 9, 'SHEEP', '(starving, honest) …Yes.'], [10, 15, 'ROSE', 'I have four thorns. I\'m very dangerous.']]),
    S(12, 'b612', '', [sheep(960, 600, 1.2, { gold: 2 })], [[1, 10, 'SHEEP', 'Then you\'re safe. Because a good sheep keeps flowers safe.']]),
    S(12, 'b612', 'The Rose is amazed. They become friends, waiting for the boy… who doesn\'t come.', [['Rose', { x: 800, y: 600, s: 1.1 }], sheep(1150, 610, 0.8, { gold: 2, sleep: 1 })]),
    S(12, 'night', 'NIGHT. The ground cracks. One sprout. Three. DOZENS.', [['Baobab', { x: 500, y: 640, size: 0.2 }], ['Baobab', { x: 900, y: 650, size: 0.25 }], ['Baobab', { x: 1400, y: 640, size: 0.2 }], ['Rose', { x: 1150, y: 640, s: 0.8 }]]),
    S(10, 'night', 'The planet shakes. The rose\'s dome rattles.', [['Rose', { x: 960, y: 640, s: 1.4 }]], [[4, 9, 'ROSE', 'Sheep…?']]),
    S(30, 'night', 'CLIMAX. The sheep runs sprout to sprout — eating, chewing, CRUNCH. Its tummy finally full of the right food.', [['Baobab', { x: 700, y: 640, size: 0.3 }], ['Baobab', { x: 1300, y: 640, size: 0.3 }], sheep(400, 620, 0.8, { walk: 1, gold: 2 })].map((e) => e[0] === 'Sheep' ? [e[0], e[1], { x: 1500 }] : e), [[18, 24, 'SHEEP', 'Crunch! Hm… not bad!']]),
    S(24, 'night', 'The ghosts JOIN IN: Sniffle sneezes a sprout loose, Horns rams one over, Old Wool points.', [G('sniffle', 500, 600, 0.7), G('horns', 1000, 600, 0.8), G('old', 1450, 600, 0.7), ['Baobab', { x: 1200, y: 640, size: 0.3 }]], [[4, 12, 'HORNS', 'Left! LEFT!'], [14, 20, 'SNIFFLE', 'Ah… ah… CHOO!']]),
    S(12, 'night', 'Before dawn: ONE GIANT SPROUT, taller than the sheep, roots splitting the ground under the rose.', [['Baobab', { x: 960, y: 660, size: 0.4 }, { size: 0.9 }], ['Rose', { x: 1400, y: 660, s: 0.8 }], sheep(500, 640, 0.8, { gold: 2 })]),
    S(20, 'night', 'Exhausted. Bite. Pull. Bite again—', [['Baobab', { x: 1000, y: 660, size: 0.9, wiggle: 2 }], sheep(700, 640, 1, { gold: 2 })], [], { s0: 1, s1: 1.3 }),
    S(10, 'dawn', '—the giant falls.', [['Baobab', { x: 1000, y: 660, size: 0.9, r: 0 }, { r: 80, op: 0 }], sheep(700, 640, 1, { gold: 2 })]),
  ]),

  seq(11, 'The Golden Flash', 150, [
    S(10, 'dawn', 'Silence. Dawn. The rose is safe.', [['Rose', { x: 1150, y: 620, s: 1.1 }], sheep(760, 620, 1, { gold: 2 })]),
    S(12, 'dawn', 'GOLD runs along every unfinished line: the back, the pencil leg. FLASH.', [['Glow', { x: 960, y: 500, s: 1, r: 100, o: 0.8 }, { r: 1400, o: 0.95 }], sheep(960, 600, 1.4, { gold: 2 })], [], { s0: 1.3, s1: 1.6 }),
    S(10, 'dawn', 'The sheep is WHOLE.', [['Ring', { x: 960, y: 520, r: 300 }], sheep(960, 600, 1.4, { gold: 3 })]),
    S(14, 'dawn', 'The ghosts glow too. Their lines fill in. They smile, and fade like warm light.', [G('horns', 700, 560, 0.9), G('sniffle', 1000, 580, 0.8), G('old', 1300, 580, 0.8)].map((e) => [e[0], e[1], { op: 0 }]), [[2, 8, 'HORNS', '(almost crying) Not bad, kid.']]),
    S(12, 'dawn', 'A sound of wings — the birds land. The boy jumps off, runs to the rose.', [['Birds', { x: 960, y: 200, s: 1 }, { y: 360 }], ['Boy', { x: 300, y: 660, s: 1, walk: 1 }, { x: 800 }], ['Rose', { x: 1100, y: 640, s: 1 }]]),
    S(12, 'dawn', 'He sees her safe. And the sheep beside her, glowing.', [['Boy', { x: 700, y: 660, s: 1.1 }], ['Rose', { x: 1000, y: 640, s: 1 }], sheep(1350, 630, 1, { gold: 3 })], [[4, 11, 'BOY', 'That is exactly the way I wanted it.']]),
    S(10, 'dawn', 'The sheep, whole, presses its head into his hand.', [['Boy', { x: 900, y: 680, s: 1.4 }], sheep(1150, 660, 1.2, { gold: 3 })], [], { s0: 1.1, s1: 1.25 }),
  ]),

  seq(12, 'Epilogue', 90, [
    S(12, 'night', 'The Sahara. Night. The plane is fixed. The PILOT — his face, smiling — looks up.', [['Plane', { x: 1300, y: 580, s: 0.9 }], ['Pilot', { x: 700, y: 740, s: 1.1, face: 1 }]]),
    S(10, 'night', 'He takes out the drawing of the box. Listens. Laughter like bells.', [['Pilot', { x: 960, y: 800, s: 1.5, face: 1 }], ['Box', { x: 1200, y: 520, s: 0.4, open: 0 }]], [[5, 9, 'BOY', '(far away) Ha ha ha…']]),
    S(8, 'night', 'One star winks.', [['Star', { x: 960, y: 300, s: 2, wink: 1 }]]),
    S(12, 'b612', 'Push in: the boy sleeps; a whole sheep keeps watch beside a rose.', [['Boy', { x: 600, y: 660, s: 0.9, r: -70 }], ['Rose', { x: 1000, y: 620, s: 1 }], sheep(1300, 620, 0.9, { gold: 3 })], [], { s0: 0.8, s1: 1.1 }),
    S(10, 'night', 'THE END', [['Text', { x: 960, y: 400, s: 1, text: 'The End', size: 110 }]]),
  ]),
];

export const SHOTS = SEQS.flat();
let acc = 0;
for (const s of SHOTS) { s.start = acc; acc += s.dur; }
export const TOTAL = acc;
