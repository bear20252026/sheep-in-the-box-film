# SEQ 9 sound: a determined little climbing theme (plucks that rise with each ledge), hops, scrabbling, a gust and
# a sneeze, a hush at the top, the count, a whoosh, then the big soaring theme across space into dawn.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *; from planet import *
D = 150; M = Mix(D)
w = wind(D, 240); M.add(np.stack([w, np.roll(w, 1900)], 1) * env(len(w), 2, 3)[:, None] * 0.06, 0)
pad([['A2', 'E3', 'A3'], ['F2', 'C3', 'F3'], ['C3', 'G3', 'C4'], ['G2', 'D3', 'G3']], 0, 4, 0.03, M)
musicbox(M, [('A4', 1), ('C5', 1), ('E5', 2), ('D5', 1), ('C5', 1), ('D5', 2)], 13.0, 0.45, 0.03, 0.5)
def hopS(): t = T(0.35); f = 380 + 600 * t; return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 9)).astype(np.float32)
def land(): t = T(0.15); return band(len(t), 700, 0.7) * np.exp(-t * 30)
hops = [21.0, 25.0, 29.0, 34.0, 40.0, 48.0, 57.0, 61.0]
for k, a in enumerate(hops):
    M.add(hopS(), a, 0.08, 0.5); M.add(land(), a + 0.8, 0.12, 0.5)
    for j, n in enumerate(['C', 'E', 'G']): M.add(bell(hz(n + ('4' if k < 4 else '5')), 1.2, 0.4), a + 0.8 + j * 0.12, 0.025, 0.5)
pad([['C3', 'G3', 'C4', 'E4'], ['A2', 'E3', 'A3', 'C4'], ['F2', 'C3', 'F3', 'A3'], ['G2', 'D3', 'G3', 'B3']] * 3, 20, 3.4, 0.035, M)
for k in range(10): M.add(tap(1200, 0.05), 34.7 + k * 0.12, 0.04, 0.5)   # scrabbling hooves
M.add(thump(120, 0.25), 35.85, 0.15, 0.5)
w2 = wind(3, 600); M.add(np.stack([w2, w2], 1) * env(len(w2), 0.4, 1.4)[:, None] * 0.25, 50.8)
t = T(0.5); M.add(band(len(t), 2400, 0.4) * env(len(t), 0.01, 0.3), 53.0, 0.18, 0.45)   # sneeze
M.add(whoosh(1.0), 53.1, 0.1, 0.5)
# the top: a hush, a heartbeat
t = T(10); M.add(np.sin(2 * np.pi * 55 * t) * env(len(t), 1, 2) * 0.4, 62.5, 0.05, 0.5)
for k in range(6): M.add(thump(65, 0.2), 64 + k * 0.85, 0.08, 0.5)
pad([['C4', 'E4', 'G4'], ['F3', 'A3', 'C4']], 67, 4, 0.03, M)
t = T(0.8); M.add(band(len(t), 900, 0.6) * env(len(t), 0.1, 0.3), 72.0, 0.06, 0.5)   # flaps
for a in (75.0, 76.0, 77.2): M.add(band(int(0.9 * SR), 400, 0.6) * env(int(0.9 * SR), 0.3, 0.3), a, 0.05, 0.4)   # deep breaths
M.add(whoosh(2.5, True, 500), 79.0, 0.25, 0.55); M.add(boom(1.5), 79.0, 0.05, 0.5)
t = T(3); f = 900 * np.exp(-t / 2); M.add((np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.05, 1) * 0.2).astype(np.float32), 79.6, 0.04, 0.5)
w3 = wind(70, 450); M.add(np.stack([w3, np.roll(w3, 1200)], 1) * env(len(w3), 3, 10)[:, None] * 0.12, 80)
def flapS(d):
    t = T(d); return band(len(t), 600, 0.8) * (0.5 + 0.5 * np.sin(2 * np.pi * 1.7 * t)) ** 3 * env(len(t), 0.5, 1)
M.add(flapS(40), 82.4, 0.08, 0.5)
# the soaring theme
CH = [['C4', 'E4', 'G4', 'C5'], ['A3', 'C4', 'E4', 'A4'], ['F3', 'A3', 'C4', 'F4'], ['G3', 'B3', 'D4', 'G4']]
pad(CH * 7, 82.4, 4, 0.06, M)
musicbox(M, THEME, 84, 0.7, 0.06, 0.45); musicbox(M, THEME, 98, 0.7, 0.06, 0.55)
for k, n in enumerate(['C5', 'E5', 'G5', 'C6', 'B5', 'A5', 'G5']): M.add(bell(hz(n), 3, 0.6), 112 + k * 1.3, 0.05, 0.5)
musicbox(M, THEME, 122, 0.8, 0.06, 0.5)
pad([['F3', 'A3', 'C4', 'E4'], ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['G3', 'C4', 'D4'], ['C4', 'E4', 'G4', 'C5']], 128, 4, 0.06, M)
M.add(thump(140, 0.2), 134.0, 0.12, 0.5); M.add(thump(160, 0.15), 134.7, 0.08, 0.5)
for k, n in enumerate(['C6', 'E6', 'G6', 'C7']): M.add(bell(hz(n), 5, 0.5), 140 + k * 0.6, 0.04, 0.5)
M.write(sys.argv[1], 1.5, 4.0)
print('ok')
