# SEQ 12 sound: desert night wind and crickets; the last hammer taps; the engine coughs and purrs; footsteps;
# a page turning; the stars laugh like little bells; one bright chime for the wink; a swell into gold light.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *; from planet import *
D = 63; M = Mix(D)
w = wind(D, 260); M.add(np.stack([w, np.roll(w, 1800)], 1) * env(len(w), 2, 3)[:, None] * 0.05, 0)
M.add(np.stack([crickets(56), np.roll(crickets(56), 900)], 1) * env(int(56 * SR), 2, 4)[:, None] * 0.04, 0)
for a in np.arange(0.4, 3.2, 0.7): M.add(clank(1500, 0.3), a, 0.05, 0.62)
M.add(cough(0.35), 3.9, 0.08, 0.65); M.add(cough(0.3), 4.4, 0.06, 0.65)
M.add(engine(6.2, 88) * env(int(6.2 * SR), 0.8, 1.8), 4.6, 0.09, 0.65)
for i, a in enumerate(np.arange(11.6, 16.4, 0.45)): M.add(step(), a, 0.04, 0.6 - 0.02 * i)
M.add(band(int(0.4 * SR), 3000, 0.6) * env(int(0.4 * SR), 0.05, 0.3), 17.4, 0.05, 0.4)   # notebook out
M.add(band(int(0.6 * SR), 2600, 0.6) * env(int(0.6 * SR), 0.1, 0.4), 19.2, 0.04, 0.5)    # page
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['C4', 'E4', 'G4'], ['G3', 'B3', 'D4']], 1, 4, 0.03, M)
musicbox(M, THEME, 19.6, 0.6, 0.03, 0.5)
M.add(bell(hz('E7'), 1.5, 0.3), 26.2, 0.02, 0.5)   # the eye in the box
# the laughing stars: many tiny bells, rising and falling like laughter
rs = np.random.RandomState(7)
for i in range(150):
    a = 31.0 + rs.rand() * 14.0; g = 0.006 + 0.012 * np.sin(np.pi * min(1, (a - 31) / 14))
    M.add(bell(hz(['C7', 'E7', 'G7', 'A7', 'D7', 'C8'][i % 6]), 1.2, 0.3), a, g, rs.rand())
for k in range(3):
    for j, n in enumerate(['G7', 'E7', 'C7', 'E7', 'G7']): M.add(bell(hz(n), 0.8, 0.3), 34.0 + k * 3.3 + j * 0.13, 0.012, 0.3 + 0.2 * k)
pad([['F3', 'A3', 'C4', 'E4'], ['C4', 'E4', 'G4', 'B4'], ['A3', 'C4', 'E4', 'G4'], ['G3', 'C4', 'D4', 'G4']], 30, 4, 0.04, M)
M.add(bell(hz('A6'), 4, 0.5), 44.95, 0.05, 0.6); M.add(bell(hz('E7'), 4, 0.5), 45.0, 0.03, 0.6)
pad([['F3', 'A3', 'C4'], ['C4', 'E4', 'G4']], 46, 3, 0.035, M)
# push in: a long rising shimmer into gold
t = T(10); f = 400 + 1600 * (t / 10) ** 2
M.add((np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 6, 0.5) * 0.4).astype(np.float32), 52.0, 0.03, 0.5)
pad([['C4', 'E4', 'G4', 'C5'], ['F3', 'A3', 'C4', 'F4'], ['C4', 'E4', 'G4', 'C5']], 52, 3.6, 0.05, M)
for k, n in enumerate(['C5', 'E5', 'G5', 'C6', 'E6']): M.add(bell(hz(n), 4, 0.5), 60.4 + k * 0.08, 0.03, 0.2 + k * 0.15)
M.write(sys.argv[1], 1.0, 1.0)
print('ok')
