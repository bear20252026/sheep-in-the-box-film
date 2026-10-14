# SEQ 4b sound: Part 2's track split at three gaps; in them, the ghosts' cold whispers, the sandstorm
# (a far rumble, the roar, gusts, the hum the sheep keeps up through it), and a dawn that opens warm.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *
GAPS = [(32.0, 24), (43.5, 92), (49.1, 12)]
def W(u): return u + sum(l for a, l in GAPS if a < u)
D = W(56); M = Mix(D)
p2 = track('public/audio/part2.wav', 0, 56.1)
cuts = [0.0] + [a for a, l in GAPS] + [56.0]
for i in range(len(cuts) - 1):
    a, b = cuts[i], cuts[i + 1]
    s = p2[int(max(0, a - 0.5) * SR):int(min(56, b + 0.5) * SR)].copy()
    s *= env(len(s), 0.5 if i else 0, 0.8)[:, None]
    M.add(s, W(a) - (0.5 if i else 0))
S1, S2, S3 = W(31.999), W(43.499), W(49.099)
# G1: the ghosts — a cold draft, a sly low figure, crickets keep going
w = wind(24, 300); M.add(np.stack([w, np.roll(w, 900)], 1) * 0.06, S1)
M.add(crickets(24), S1, 0.03, 0.5)
M.add(whoosh(1.6, True, 600), S1 + 0.2, 0.08, 0.7)
pad([['D3', 'F3', 'A3'], ['C#3', 'E3', 'G3'], ['D3', 'F3', 'A#3'], ['C#3', 'E3', 'A3'], ['D3', 'F3', 'A3'], ['E3', 'G3', 'A#3']], S1 + 1, 4, 0.04, M)
for k, n in enumerate(['A3', 'C4', 'E4', 'C4', 'A3']): M.add(bell(hz(n), 0.6, 0.6), S1 + 16 + k * 0.4, 0.04, 0.3)   # chomp! figure
for k in range(3): M.add(sniff(), S1 + 7.4 + k * 0.5, 0.06, 0.8)
# G2: the storm
def rumble(d, f=45):
    t = T(d); return (np.sin(2 * np.pi * f * t + 3 * np.sin(2 * np.pi * 0.3 * t)) * 0.5 + band(len(t), 80, 0.8)).astype(np.float32)
x = lambda r: S2 + r
M.add(rumble(22) * env(int(22 * SR), 14, 2), x(3), 0.18, 0.7)   # far away, growing
w = wind(20, 260); M.add(np.stack([w, np.roll(w, 700)], 1) * np.linspace(0, 0.18, len(w))[:, None], x(3))
pad([['A2', 'E3', 'A3'], ['A#2', 'F3', 'A#3'], ['C3', 'G3', 'C4'], ['D3', 'A3', 'D4']], x(4), 4.5, 0.045, M)
M.add(whoosh(2.2, True, 500), x(22.2), 0.25, 0.5)
roar_len = 52
w1 = wind(roar_len, 420); w2 = wind(roar_len, 250)
roar = np.stack([w1 + 0.6 * w2, np.roll(w1, 1100) + 0.6 * np.roll(w2, 700)], 1) * env(roar_len * SR, 1.2, 8)[:, None]
M.add(roar * 0.42, x(23))
M.add(band(roar_len * SR, 1800, 0.4) * env(roar_len * SR, 1, 8) * (0.6 + 0.4 * np.sin(2 * np.pi * 0.23 * T(roar_len))), x(23), 0.08, 0.5)   # hiss of sand
M.add(rumble(roar_len, 38) * env(roar_len * SR, 2, 8), x(23), 0.2, 0.5)
for g in (34.0, 44.3, 52.0, 61.0): M.add(whoosh(1.8, True, 650), x(g), 0.2, 0.3)
# brave little theme inside the storm, and the hum
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['C3', 'E3', 'G3'], ['G3', 'B3', 'D4']], x(28), 6, 0.035, M)
pad([['F3', 'A3', 'C4'], ['C3', 'E3', 'G3'], ['A3', 'C4', 'E4'], ['G3', 'B3', 'D4']], x(46), 6, 0.04, M)
def hum(note, d):
    t = T(d); f = hz(note) / 2
    return (np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t)) * env(len(t), 0.08, 0.15) * 0.4
for k, (n, b) in enumerate([('E5', .5), ('G5', .5), ('A5', .5), ('G5', .5), ('E5', 1), ('D5', .5), ('E5', 1)]):
    M.add(hum(n, b * 0.55 + 0.1), x(66.2) + sum(bb for _, bb in [('E5', .5), ('G5', .5), ('A5', .5), ('G5', .5), ('E5', 1), ('D5', .5), ('E5', 1)][:k]) * 0.55, 0.18, 0.5)
# silence, then dawn
M.add(crickets(6, 2.5), x(78), 0.02, 0.5)
pad([['C4', 'E4', 'G4'], ['F3', 'A3', 'C4', 'E4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4', 'B4']], x(78), 4, 0.05, M)
musicbox(M, [('E5', .5), ('G5', .5), ('A5', 1), ('G5', .5), ('E5', .5), ('D5', 1), ('C5', 1)], x(80), 0.42, 0.05, 0.5)
M.add(np.stack([band(int(2.2 * SR), 2600, 0.6)] * 2, 1) * env(int(2.2 * SR), 0.05, 1.2)[:, None] * 0.2, x(83))   # sand shaken off
M.add(thump(160, 0.15), x(83.1), 0.15, 0.5)
# G3: the ghosts are back; a wondering little figure at the ear
M.add(whoosh(1.4, False, 700), S3 + 0.2, 0.06, 0.8)
for k, n in enumerate(['C6', 'E6', 'G6', 'C7']): M.add(bell(hz(n), 2.5, 0.5), S3 + 5.0 + k * 0.18, 0.035, 0.4)
pad([['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4']], S3 + 0.5, 4, 0.04, M)
M.write(sys.argv[1], 0.3, 2.0)
print('ok', D)
