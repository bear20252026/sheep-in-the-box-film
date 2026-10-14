# SEQ 8b sound: a falling whistle and the crash; a hollow, empty wind; the sheep's call echoing; a low sad cello-ish
# pad; long near-silence; then a single high bell as the gold star appears, warming into hope and a rising line.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *; from planet import *
D = 140; M = Mix(D)
w = wind(D, 220); M.add(np.stack([w, np.roll(w, 2100)], 1) * env(len(w), 3, 4)[:, None] * 0.09, 0)
t = T(3); f = 1400 - 900 * t / 3; M.add((np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.3, 0.1) * 0.25).astype(np.float32), 1.3, 0.05, 0.6)
M.add(boom(3), 4.2, 0.4, 0.45); M.add(thump(90, 0.4), 4.2, 0.35, 0.45); M.add(thump(120, 0.2), 4.5, 0.15, 0.45); M.add(thump(140, 0.15), 4.98, 0.08, 0.45)
t = T(3); M.add(band(len(t), 600, 0.6) * env(len(t), 0.05, 2.5), 4.25, 0.12, 0.45)
for k in range(4): M.add(tap(400, 0.08), 11.6 + k * 0.15, 0.05, 0.4)
t = T(1.6); M.add(band(len(t), 900, 0.6) * (0.5 + 0.5 * np.sin(2 * np.pi * 3 * t)) * env(len(t), 0.1, 0.4), 13.6, 0.05, 0.45)
# echo of the call
for k, g in enumerate([1, 0.5, 0.25, 0.12]): M.add(band(int(0.5 * SR), 500, 0.5) * env(int(0.5 * SR), 0.05, 0.3), 19.6 + k * 0.6, 0.0, 0.5)
pad([['A2', 'E3', 'A3'], ['F2', 'C3', 'F3'], ['D3', 'F3', 'A3'], ['E2', 'B2', 'E3']], 14, 5, 0.035, M)
musicbox(M, [('E5', 1), ('D5', 1), ('C5', 1), ('A4', 3)], 24, 0.6, 0.025, 0.5)
pad([['A2', 'C3', 'E3'], ['F2', 'A2', 'C3'], ['G2', 'B2', 'D3'], ['E2', 'G#2', 'B2']], 36, 5, 0.04, M)
musicbox(M, [('A4', 1), ('C5', 1), ('B4', 1), ('G#4', 2), ('A4', 3)], 48.4, 0.7, 0.025, 0.5)
# the long silence: just wind and one low note
t = T(22); M.add(np.sin(2 * np.pi * 55 * t) * env(len(t), 4, 6) * 0.4, 56, 0.05, 0.5)
# the gold star
for k, n in enumerate(['E6', 'B6', 'E7']): M.add(bell(hz(n), 5, 0.4), 79.5 + k * 2.2, 0.04, 0.7)
pad([['C4', 'E4', 'G4', 'B4'], ['A3', 'C4', 'E4', 'G4'], ['F3', 'A3', 'C4', 'E4'], ['G3', 'B3', 'D4', 'G4']], 86, 4.5, 0.035, M)
musicbox(M, THEME, 92, 0.6, 0.04, 0.5)
pad([['C4', 'E4', 'G4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4']], 104, 3, 0.03, M)
musicbox(M, [('G4', 1), ('C5', 1), ('E5', 1), ('G5', 1), ('C6', 3)], 112.8, 0.45, 0.04, 0.5)
t = T(1.2); M.add(band(len(t), 700, 0.6) * env(len(t), 0.1, 0.4), 116.0, 0.06, 0.4)
for a in np.arange(117.8, 124, 0.9): M.add(band(int(0.5 * SR), 800, 0.6) * env(int(0.5 * SR), 0.1, 0.3), a, 0.04, 0.5)
pad([['C4', 'E4', 'G4', 'C5'], ['A3', 'C4', 'E4', 'A4'], ['F3', 'A3', 'C4', 'F4'], ['G3', 'B3', 'D4', 'G4']] * 2, 117, 2.8, 0.05, M)
musicbox(M, THEME, 124, 0.62, 0.05, 0.5)
for k, n in enumerate(['C6', 'E6', 'G6', 'C7']): M.add(bell(hz(n), 4, 0.5), 130 + k * 0.5, 0.04, 0.6)
M.write(sys.argv[1], 1.0, 4.0)
print('ok')
