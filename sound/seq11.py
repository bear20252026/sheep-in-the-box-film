# SEQ 11 sound: dawn hush, a shimmering rise to the golden flash, a warm chord; the ghost sheep speak over soft bells
# and rise away; wings bring the boy home; running steps; the reunion theme swells; fade.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *; from planet import *
D = 116; M = Mix(D)
w = wind(D, 300); M.add(np.stack([w, np.roll(w, 1500)], 1) * env(len(w), 2, 4)[:, None] * 0.04, 0)
def chirp(f):
    t = T(0.12); fr = f * (1 + 0.5 * t / 0.12); return (np.sin(2 * np.pi * np.cumsum(fr) / SR) * env(len(t), 0.01, 0.06)).astype(np.float32)
tt = 2.0; k = 0
while tt < 112:
    if not (13 < tt < 24): M.add(chirp(2300 + (k * 377) % 1000), tt, 0.015, (k * 0.31) % 1)
    tt += 1.1 + (k * 0.61) % 1.9; k += 1
pad([['C4', 'E4', 'G4', 'B4'], ['A3', 'C4', 'E4', 'G4']], 0, 5, 0.03, M)
# shimmer rising into the flash
t = T(7); f = 600 + 1800 * (t / 7) ** 2
M.add((np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 4, 0.3) * 0.5).astype(np.float32), 12.0, 0.03, 0.5)
for i, a in enumerate(np.arange(12.4, 18.8, 0.32)): M.add(tap(2600 + (i * 211) % 1400, 0.05), a, 0.012 + 0.002 * i, (i * 0.37) % 1)
M.add(whoosh(1.2, True, 900), 17.8, 0.05, 0.5)
for k, n in enumerate(['C5', 'E5', 'G5', 'C6', 'E6']): M.add(bell(hz(n), 6, 0.5), 18.9 + k * 0.03, 0.035, 0.2 + k * 0.15)
pad([['C4', 'E4', 'G4', 'C5'], ['F3', 'A3', 'C4', 'F4'], ['G3', 'C4', 'D4', 'G4'], ['C4', 'E4', 'G4', 'B4']], 19.0, 4, 0.05, M)
# ghosts: gentle bells, then rising away
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['C4', 'E4', 'G4'], ['G3', 'B3', 'D4']] * 2, 35, 3, 0.03, M)
for a in (36.0, 41.0): musicbox(M, [('E6', .5), ('G6', .5), ('A6', 1), ('G6', 1)], a, 0.4, 0.02, 0.7)
t = T(5); f = 500 + 900 * t / 5; M.add((np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 1, 2) * 0.3).astype(np.float32), 47.0, 0.03, 0.7)
for k, n in enumerate(['G5', 'C6', 'E6']): M.add(bell(hz(n), 4, 0.4), 48.0 + k * 1.3, 0.025, 0.7)
# the boy arrives on the birds
M.add(wings(8, 3.0) * env(int(8 * SR), 1.5, 2), 58.5, 0.06, 0.25)
M.add(whoosh(1.5, False, 700), 65.0, 0.05, 0.3)
M.add(thump(140, 0.2), 66.0, 0.1, 0.3)
for i, a in enumerate(np.arange(68.0, 71.6, 0.28)): M.add(step(), a, 0.05, 0.3 + 0.03 * i)
M.add(thump(110, 0.25), 71.8, 0.12, 0.45)
# reunion
pad([['C4', 'E4', 'G4'], ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4']] * 3, 60, 3.6, 0.04, M)
musicbox(M, THEME, 72.6, 0.55, 0.04, 0.5)
pad([['F3', 'A3', 'C4', 'E4'], ['C4', 'E4', 'G4', 'B4'], ['F3', 'A3', 'C4'], ['G3', 'C4', 'D4'], ['C4', 'E4', 'G4', 'C5']], 94, 4, 0.045, M)
musicbox(M, THEME, 96.0, 0.6, 0.035, 0.5)
for k, n in enumerate(['C6', 'E6', 'G6', 'C7']): M.add(bell(hz(n), 5, 0.4), 108 + k * 0.9, 0.025, 0.3 + k * 0.15)
M.write(sys.argv[1], 1.0, 4.0)
print('ok')
