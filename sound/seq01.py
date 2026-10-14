# SEQ 1 sound: night wind and insects, the plane's drone, the coughing engine and the dive,
# the crash, the pilot's small noises, a star's bell, the time-lapse swell, and the boy's music-box theme.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *
D = 240; M = Mix(D); t = np.arange(M.N) / SR

# bed: desert wind all through (softer at dawn), a few insects at night
w = wind(D, 360, lambda t: 0.45 + 0.25 * np.sin(2 * np.pi * 0.07 * t) - 0.2 * ss((t - 125) / 25))
M.add(np.stack([w, np.roll(w, 1500)], 1) * 0.12, 0)
M.add(crickets(110) * 0.012, 0, 1, 0.8); M.add(crickets(100, 3.3) * 0.009, 4, 1, 0.2)

# the theme heard first as a far-off music box under the stars
THEME = [('E5', 1), ('G5', 1), ('A5', 2), ('G5', 1), ('E5', 1), ('D5', 2), ('C5', 1), ('D5', 1), ('E5', 1), ('G5', 1), ('E5', 3), (None, 1)]
musicbox(M, THEME, 2.0, 0.5, 0.035, 0.6)
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['C3', 'G3', 'E4'], ['G3', 'B3', 'D4']], 0, 5, 0.03, M)

# 13–44 the plane: drone panning right->left, coughs, the dive whine
eng = engine(31, 88, 0, lambda t: 1 + 0.6 * ss((t - 18) / 12.5) - 0.25 * ss((t - 13) / 4) * (t < 18))
amp = ss(T(31) / 4) * (1 - 0.6 * ((T(31) > 13.2) & (T(31) < 13.6)))
M.add(eng * amp, 13, 0.55, 0.3)
for a in (26.2, 27.4, 28.3): M.add(boom(0.5) * 0.4, a, 0.35, 0.4); M.add(cough(0.3), a, 0.5, 0.4)
M.add(whoosh(12.6, True, 900), 31, 0.35, 0.55)
M.add(boom(3.0), 43.6, 1.2, 0.6); M.add(whoosh(2.5, False, 2400), 43.65, 0.5, 0.6)
for k in range(10): M.add(tap(2200 + k * 90, 0.05), 44.2 + k * 0.17, 0.05, 0.6)   # sand rattling down
M.add(clank(900, 1.2), 44.3, 0.15, 0.65)

# 47–92 the pilot
for a in (47.4, 48.6): M.add(thump(90, 0.2), a, 0.25, 0.6)
for k in range(8): M.add(tap(500, 0.07), 50.1 + k * 0.4, 0.08, 0.55)             # footsteps in sand
M.add(cough(0.4), 53.4, 0.6, 0.5); M.add(cough(0.3), 53.85, 0.4, 0.5)
for a in (58.45, 59.25, 59.85): M.add(clank(1700, 0.5), a, 0.12, 0.6)          # wrench
M.add(band(int(1.6 * SR), 350, 0.6) * np.sin(np.pi * T(1.6) / 1.6) ** 2, 60.8, 0.08, 0.5)   # the sigh
M.add(clank(420, 1.0), 74.15, 0.35, 0.6); M.add(thump(140, 0.2), 74.15, 0.4, 0.6)   # kick: BONG
for k in range(4): M.add(tap(400, 0.08), 74.62 + k * 0.5, 0.15, 0.5)            # hops
M.add(thump(80, 0.3), 79, 0.2, 0.5)                                              # sits down
M.add(band(int(0.5 * SR), 700, 0.5) * np.exp(-T(0.5) * 6), 80.3, 0.06, 0.45)     # canteen slosh
M.add(gulp(), 83.4, 0.25, 0.5)
M.add(tap(1400, 0.05), 85.2, 0.12, 0.45)                                         # cap screwed on
M.add(thump(70, 0.4), 95.6, 0.2, 0.5)                                            # lies back

# 110–116 a star winks — just for us
M.add(bell(hz('E6'), 4, 1), 113.2, 0.06, 0.75); M.add(bell(hz('B6'), 4, 1), 113.35, 0.04, 0.8)

# 122–152 the time-lapse: a slow swell, the theme warmer, then the first light
pad([['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4', 'E4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4', 'B4'], ['F3', 'A3', 'C4']], 121, 5, 0.06, M)
musicbox(M, THEME, 127, 0.62, 0.05, 0.4)
for k, n in enumerate(['C6', 'E6', 'G6', 'C7']): M.add(bell(hz(n), 4, 1), 147.5 + k * 0.4, 0.035, 0.7)

# 152–240 dawn: the voice, the boy, the conversation; the theme returns as he takes out the notebook
for k, n in enumerate(['G5', 'E5']): M.add(bell(hz(n), 3, 1), 156.6 + k * 0.5, 0.04, 0.3)
M.add(thump(110, 0.2), 166.0, 0.25, 0.5); M.add(whoosh(0.5, True, 1600), 165.6, 0.1, 0.5)   # jolts up
M.add(bell(hz('A5'), 3, 1), 166.7, 0.05, 0.3)
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['E3', 'G3', 'B3']], 170, 6, 0.035, M)
for a in (203.3, 204.1, 204.9, 205.6): M.add(tap(600, 0.07), a, 0.05, 0.35)    # the boy steps closer
pad([['C4', 'E4', 'G4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4']], 214, 6, 0.05, M)
musicbox(M, THEME, 218.5, 0.5, 0.06, 0.5)
M.add(band(int(0.5 * SR), 3000, 0.5) * np.exp(-T(0.5) * 8), 218.4, 0.05, 0.5)   # notebook out, pages
M.add(whoosh(4.2, True, 2000), 233, 0.15, 0.5)

M.write(sys.argv[1], 1.0, 2.5)
print('ok')
