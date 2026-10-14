# SEQ 4a sound: the first night by the plane — crickets, a hissing lamp, the pilot's wrench on the engine,
# water sloshing in a canteen, a big yawn, footsteps in sand, a blanket, a lullaby on the music box.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *
D = 66; M = Mix(D)
w = wind(D, 300); M.add(np.stack([w, np.roll(w, 900)], 1) * 0.05, 0)
M.add(crickets(D, 3.2), 0, 0.022, 0.3); M.add(crickets(D, 4.1), 0.4, 0.016, 0.8)
M.add(band(D * SR, 3000, 0.3) * 0.5, 0, 0.012, 0.55)    # lamp hiss
import math
for a, z in [(0, 12.4), (30.2, 39.4)]:
    k = math.ceil(a * 9 / (2 * math.pi) - 0.25)
    while True:
        tt = (2 * math.pi * (k + 0.25)) / 9
        if tt >= z: break
        if tt >= a: M.add(clank(1500 + (k % 3) * 220, 0.5), tt, 0.07, 0.75)
        k += 1
def slosh(d):
    t = T(d); return band(len(t), 500, 0.9) * (0.5 + 0.5 * np.sin(2 * np.pi * 4.2 * t)) ** 2 * env(len(t), 0.05, 0.2)
M.add(slosh(1.0), 15.2, 0.25, 0.65)
def step():
    t = T(0.18); return band(len(t), 900, 0.8) * np.exp(-t * 25)
for a, z in [(40.2, 45.0), (53.8, 55.6)]:
    tt = a
    while tt < z: M.add(step(), tt, 0.12, 0.55); tt += 0.455
yawn = lambda: (np.sin(2 * np.pi * np.cumsum(330 - 120 * T(1.4) / 1.4) / SR) * np.sin(np.pi * T(1.4) / 1.4) ** 2 * 0.4).astype(np.float32)
M.add(yawn(), 32.4, 0.12, 0.35)
M.add(np.stack([band(int(1.0 * SR), 700, 0.7)] * 2, 1) * env(int(1.0 * SR), 0.2, 0.5)[:, None] * 0.1, 47.2)   # blanket
M.add(tap(1300, 0.06), 56.2, 0.12, 0.5)
# music: the theme, slow, a lullaby
pad([['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4']], 2, 5, 0.03, M)
THEME = [('E5', 1), ('G5', 1), ('A5', 1), ('G5', 1), ('E5', 1), ('D5', 1), ('C5', 2), ('D5', 1), ('E5', 1), ('G5', 1), ('E5', 2)]
musicbox(M, THEME, 3.0, 0.55, 0.04, 0.45)
pad([['F3', 'A3', 'C4'], ['C3', 'E3', 'G3'], ['D3', 'F3', 'A3'], ['G3', 'B3', 'D4']], 21, 4.5, 0.03, M)
pad([['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4', 'E4'], ['G3', 'C4', 'D4'], ['C4', 'E4', 'G4']], 38, 5.5, 0.04, M)
musicbox(M, THEME, 44.0, 0.7, 0.045, 0.5)
for k, n in enumerate(['G5', 'C6', 'E6', 'G6']): M.add(bell(hz(n), 3, 0.5), 60 + k * 0.5, 0.03, 0.6)
M.write(sys.argv[1], 2.0, 3.0)
print('ok')
