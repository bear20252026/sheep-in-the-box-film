# SEQ 7c sound: a tiny planet's day/night: birdsong-ish chirps by day, crickets by night; the lamp's whoosh on and
# hiss off; a little clockwork waltz that speeds up as the sheep runs; snores; the gold chime; a warm goodbye.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *; from planet import *
D = 210; M = Mix(D)
space(M, D, 52, 0.03)
flight(M, 0, 10); flight(M, 177, 30)
M.add(thump(150, 0.2), 7.6, 0.14, 0.5)
SW = [[9.6, 1], [14.4, 0], [20.2, 1], [27.4, 0], [38.4, 1], [46.2, 0], [70.0, 1], [80.0, 0], [88.0, 1], [95.4, 0], [102.4, 1], [108.6, 0], [114.6, 1], [120.4, 0], [126.4, 1], [133.4, 0], [182.0, 1]]
LAMP = [[10.6, 1], [15.0, 0], [21.0, 1], [28.0, 0], [39.2, 1], [47.4, 0], [71.6, 1], [80.8, 0], [89.0, 1], [96.2, 0], [104.2, 1], [109.4, 0], [115.6, 1], [121.2, 0], [127.4, 1], [135.8, 0], [183.6, 1]]
def chirp(f):
    t = T(0.12); fr = f * (1 + 0.5 * t / 0.12); return (np.sin(2 * np.pi * np.cumsum(fr) / SR) * env(len(t), 0.01, 0.06)).astype(np.float32)
edges = [0] + [a for a, _ in SW] + [D]
for i in range(len(edges) - 1):
    a, z = edges[i], edges[i + 1]; night = (i % 2 == 1)
    if night: M.add(np.stack([crickets(z - a), np.roll(crickets(z - a), 700)], 1) * env(int((z - a) * SR), 0.8, 0.8)[:, None] * 0.05, a)
    else:
        tt = a + 0.4; k = 0
        while tt < z - 0.3: M.add(chirp(2400 + (k * 371) % 900), tt, 0.025, (k * 0.29) % 1); tt += 0.7 + (k * 0.53) % 1.3; k += 1
    # a soft swell at each dusk / dawn
    M.add(whoosh(1.6, up=night), a, 0.03, 0.5)
for a, on in LAMP:
    if on: M.add(whoosh(0.5, True, 1200), a - 0.1, 0.06, 0.55); M.add(bell(hz('E6'), 1.2, 0.3), a, 0.02, 0.55)
    else: t = T(0.7); M.add(band(len(t), 3000, 0.5) * env(len(t), 0.02, 0.5), a, 0.05, 0.55)
# the waltz (clockwork), first slow, then faster with each night, a little drunk with tiredness at the end
W = [('C5', 1), ('E5', .5), ('G5', .5), ('E5', 1), ('D5', 1), ('F5', .5), ('A5', .5), ('F5', 1), ('B4', 1), ('D5', .5), ('G5', .5), ('F5', 1), ('E5', 1), ('G5', .5), ('C6', .5), ('G5', 1)]
musicbox(M, W, 10.5, 0.36, 0.03, 0.5); musicbox(M, W, 20.8, 0.36, 0.03, 0.5)
pad([['C4', 'E4', 'G4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4']], 30, 2.2, 0.025, M)
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['D3', 'F3', 'A3'], ['E3', 'G#3', 'B3']], 40.4, 1.4, 0.03, M)
M.add(thump(90, 0.2), 46.2, 0.1, 0.4)
pad([['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4']] * 2, 48, 3, 0.03, M)
musicbox(M, [('G5', .5), ('E5', .5), ('C6', 1)], 72.4, 0.3, 0.04, 0.5)
for k, (a, b) in enumerate([(78, 0.33), (86, 0.3), (93.5, 0.27), (100.5, 0.25), (112, 0.3), (118, 0.36), (124, 0.42)]):
    musicbox(M, W, a, b, 0.028, 0.5)
pad([['C4', 'E4', 'G4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4']] * 6, 78, 2.4, 0.02, M)
def step(): t = T(0.12); return band(len(t), 1100, 0.8) * np.exp(-t * 30)
for a in [80.0, 88.2, 95.4, 102.0, 105.2, 107.2]:
    for k in range(5): M.add(step(), a + k * 0.18, 0.05, 0.6)
M.add(thump(140, 0.2), 102.9, 0.12, 0.6); M.add(thump(110, 0.25), 103.5, 0.15, 0.6)
# snores
def snore(d=1.4, f=70):
    t = T(d); return (band(len(t), 200, 0.7) * (0.6 + 0.4 * np.sin(2 * np.pi * f * t)) * np.sin(np.pi * t / d) ** 2).astype(np.float32)
for i, a in enumerate(np.arange(74.5, 139.5, 3.2)): M.add(snore(1.4, 60), a, 0.05, 0.42)
for a in np.arange(81, 170, 4.1): M.add(snore(1.0, 90), a, 0.025, 0.3)
for a in np.arange(130.0, 134.4, 2.0): M.add(snore(0.8, 110), a, 0.03, 0.6)
M.add(thump(80, 0.3), 134.75, 0.22, 0.6)
# the long golden morning
pad([['F3', 'A3', 'C4', 'E4'], ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['G3', 'C4', 'D4'], ['A#3', 'D4', 'F4'], ['C4', 'E4', 'G4']] * 2, 136, 3.4, 0.04, M)
musicbox(M, THEME, 140, 0.5, 0.035, 0.5)
for k in range(4): M.add(hop(), 146.0 + k * 0.5, 0.05, 0.4)
for k, n in enumerate(['C6', 'E6', 'G6', 'B6', 'C7', 'E7']): M.add(bell(hz(n), 3.5, 0.5), 155.6 + k * 0.18, 0.05, 0.55)
M.add(np.stack([band(int(4 * SR), 5000, 0.3)] * 2, 1) * env(int(4 * SR), 0.4, 3)[:, None] * 0.03, 155.6)
pad([['C4', 'E4', 'G4', 'B4'], ['A3', 'C4', 'E4', 'G4'], ['F3', 'A3', 'C4', 'E4'], ['G3', 'B3', 'D4', 'F4']] * 2, 158, 3, 0.035, M)
musicbox(M, THEME, 180, 0.62, 0.045, 0.5)
pad([['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4']] * 2, 182, 2.8, 0.04, M)
musicbox(M, W, 194, 0.42, 0.03, 0.5)
M.write(sys.argv[1], 1.5, 4.0)
print('ok')
