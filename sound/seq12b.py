# SEQ 12b sound: out of the gold shimmer into a soft night on B612; crickets; the stars laugh in little bells;
# a few soft steps; the sheep settles; the theme on the music box, and a last warm chord for THE END.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *; from planet import *
D = 46; M = Mix(D)
for k, n in enumerate(['C6', 'E6', 'G6']): M.add(bell(hz(n), 4, 0.4), 0.2 + k * 0.1, 0.025, 0.3 + k * 0.2)
M.add(np.stack([crickets(44), np.roll(crickets(44), 900)], 1) * env(int(44 * SR), 4, 4)[:, None] * 0.035, 1.5)
w = wind(D, 300); M.add(np.stack([w, np.roll(w, 1500)], 1) * env(len(w), 3, 4)[:, None] * 0.03, 0)
pad([['C4', 'E4', 'G4', 'B4'], ['A3', 'C4', 'E4', 'G4'], ['F3', 'A3', 'C4', 'E4']], 0.5, 4, 0.03, M)
rs = np.random.RandomState(11)
for i in range(110):
    a = 9.6 + rs.rand() * 14.0; g = 0.006 + 0.01 * np.sin(np.pi * min(1, (a - 9.6) / 14))
    M.add(bell(hz(['C7', 'E7', 'G7', 'A7', 'D7', 'C8'][i % 6]), 1.2, 0.3), a, g, rs.rand())
for i, a in enumerate(np.arange(22.7, 25.4, 0.32)): M.add(step(), a, 0.025, 0.55 - 0.02 * i)
M.add(thump(120, 0.2), 25.8, 0.05, 0.5)
pad([['F3', 'A3', 'C4', 'E4'], ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4', 'G4'], ['G3', 'C4', 'D4', 'G4']], 13, 4, 0.03, M)
pad([['F3', 'A3', 'C4', 'E4'], ['C4', 'E4', 'G4', 'B4'], ['F3', 'A3', 'C4'], ['G3', 'C4', 'D4'], ['C4', 'E4', 'G4', 'C5']], 29, 3.4, 0.045, M)
musicbox(M, THEME, 31.0, 0.6, 0.04, 0.5)
for k, n in enumerate(['C5', 'G5', 'C6', 'E6']): M.add(bell(hz(n), 6, 0.5), 38.0 + k * 0.4, 0.03, 0.3 + k * 0.15)
M.write(sys.argv[1], 1.0, 3.0)
print('ok')
