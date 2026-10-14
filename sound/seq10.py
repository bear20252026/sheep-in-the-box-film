# SEQ 10 sound: a dawn meadow (soft wind, little bird chirps), the rose's tinkling theme (glass bells), a tummy rumble;
# evening crickets; at night cracks and pops, crunching, a rising rumble, the giant's groan, a crash; then dawn hush.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *; from planet import *
D = 230; M = Mix(D)
w = wind(D, 300); M.add(np.stack([w, np.roll(w, 1500)], 1) * env(len(w), 2, 3)[:, None] * 0.05, 0)
def chirp(f):
    t = T(0.12); fr = f * (1 + 0.5 * t / 0.12); return (np.sin(2 * np.pi * np.cumsum(fr) / SR) * env(len(t), 0.01, 0.06)).astype(np.float32)
tt = 1.0; k = 0
while tt < 92: M.add(chirp(2300 + (k * 377) % 1000), tt, 0.02, (k * 0.31) % 1); tt += 0.9 + (k * 0.61) % 1.7; k += 1
M.add(np.stack([crickets(140), np.roll(crickets(140), 900)], 1) * env(int(140 * SR), 6, 6)[:, None] * 0.05, 90)
pad([['C4', 'E4', 'G4', 'B4'], ['A3', 'C4', 'E4', 'G4'], ['F3', 'A3', 'C4', 'E4'], ['G3', 'B3', 'D4']], 0, 4, 0.04, M)
ROSE = [('E6', .5), ('G6', .5), ('A6', 1), ('G6', .5), ('E6', .5), ('D6', 1)]
for a in (18.0, 27.6, 44.0, 51.6, 78.0, 96.0, 207.0): musicbox(M, ROSE, a, 0.32, 0.025, 0.6)
def rumble(d=0.8): t = T(d); return (band(len(t), 90, 0.6) * (0.6 + 0.4 * np.sin(2 * np.pi * 9 * t)) * np.sin(np.pi * t / d)).astype(np.float32)
M.add(rumble(), 24.2, 0.12, 0.45); M.add(rumble(), 83.6, 0.1, 0.45)
pad([['C4', 'E4', 'G4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4']] * 3, 16, 3.6, 0.03, M)
musicbox(M, THEME, 32.4, 0.55, 0.035, 0.5)
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['C4', 'E4', 'G4'], ['G3', 'B3', 'D4']] * 3, 58, 3.4, 0.025, M)
musicbox(M, [('G5', .5), ('E5', .5), ('C5', 1)], 67.6, 0.4, 0.035, 0.5)
pad([['F3', 'A3', 'C4', 'E4'], ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['G3', 'C4', 'D4']] * 2, 72, 3.2, 0.03, M)
for a in np.arange(89.6, 92.6, 0.5): M.add(tap(1400, 0.05), a, 0.03, 0.4)
pad([['A3', 'C4', 'E4', 'G4'], ['F3', 'A3', 'C4', 'E4']], 92, 5, 0.03, M)
# night: cracks, pops, crunches
SP = [106.0, 117.6, 118.0, 118.4] + [125.6 + i * 0.4 for i in range(14)]
for i, a in enumerate(SP): M.add(clank(600 + (i * 97) % 400, 0.3), a, 0.04, (i * 0.37) % 1); M.add(thump(110, 0.15), a, 0.08, (i * 0.37) % 1)
EATS = [109.8, 120.6, 123.8, 127.2, 130.8, 134.2, 138.0, 141.6, 145.0, 148.6, 152.2, 155.8, 159.6, 163.4, 167.4, 171.4]
def crunch():
    t = T(0.12); return band(len(t), 2200, 0.5) * (np.random.RandomState(4).rand(len(t)) > 0.5) * np.exp(-t * 25)
for a in EATS:
    for j in range(3): M.add(crunch(), a - 0.9 + j * 0.3, 0.12, 0.5)
M.add(band(int(0.5 * SR), 2400, 0.4) * env(int(0.5 * SR), 0.01, 0.3), 137.2, 0.14, 0.7)   # sneeze
M.add(thump(120, 0.3), 140.2, 0.2, 0.35)
t = T(70); M.add(np.sin(2 * np.pi * 45 * t) * (0.5 + 0.5 * np.sin(2 * np.pi * 0.3 * t)) * env(len(t), 3, 10) * 0.4, 125, 0.06, 0.5)
for a in np.arange(126, 170, 0.37): M.add(tap(3000, 0.03), a, 0.008, 0.45 + 0.1 * np.sin(a))   # dome rattle
# a busy, brave little theme for the eating
pad([['D3', 'F3', 'A3'], ['C3', 'E3', 'G3'], ['A#2', 'D3', 'F3'], ['C3', 'E3', 'G3']] * 6, 118, 2.4, 0.04, M)
for a in (120, 134, 148, 162): musicbox(M, [('D5', .5), ('F5', .5), ('A5', .5), ('G5', .5), ('F5', .5), ('E5', .5), ('D5', 1)], a, 0.32, 0.035, 0.5)
# the giant
M.add(boom(4), 176.0, 0.35, 0.6)
t = T(4); M.add((band(len(t), 140, 0.6) * env(len(t), 0.3, 1.5)).astype(np.float32), 176.2, 0.25, 0.6)
pad([['D3', 'F3', 'A3'], ['C#3', 'E3', 'G3'], ['D3', 'F3', 'G#3'], ['A2', 'C#3', 'E3']] * 2, 176, 3, 0.05, M)
for k in range(14): M.add(thump(65, 0.2), 182 + k * 0.62, 0.1, 0.55)
def groan(d, f0):
    t = T(d); f = f0 * (1 + 0.2 * np.sin(2 * np.pi * 0.7 * t)); return (band(len(t), 200, 0.5) * 0.5 + np.sin(2 * np.pi * np.cumsum(f) / SR) * 0.5) * env(len(t), 0.2, 0.4)
M.add(groan(1.4, 80), 187.6, 0.12, 0.6); M.add(groan(1.4, 70), 189.6, 0.14, 0.6); M.add(groan(2.6, 60), 197.0, 0.18, 0.65)
M.add(boom(4), 199.8, 0.45, 0.65); M.add(thump(60, 0.6), 199.8, 0.4, 0.65)
# silence, then dawn
for k, n in enumerate(['C6', 'E6', 'G6']): M.add(bell(hz(n), 5, 0.5), 204 + k * 1.2, 0.03, 0.6)
pad([['C4', 'E4', 'G4', 'B4'], ['A3', 'C4', 'E4', 'G4'], ['F3', 'A3', 'C4', 'E4'], ['G3', 'C4', 'D4']] * 2, 205, 3.4, 0.04, M)
musicbox(M, THEME, 212, 0.6, 0.04, 0.5)
M.write(sys.argv[1], 1.0, 4.0)
print('ok')
