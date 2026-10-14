# SEQ 6 sound: a sunset wind, far honking geese, a whistle, wings landing, a HONK, pencil on a notebook,
# a page torn out, wingbeats and a rising wind as they lift off, and the big soaring theme into the night.
import sys, math, numpy as np
sys.path.insert(0, 'sound'); from sfx import *
D = 240; M = Mix(D)
w = wind(D, 330); M.add(np.stack([w, np.roll(w, 1300)], 1) * np.clip(1 - np.arange(int(D * SR)) / SR / 400, 0.3, 1)[:, None] * 0.07, 0)
def honk(f=420, d=0.32):
    t = T(d); ph = 2 * np.pi * np.cumsum(f * (1 + 0.15 * np.sin(2 * np.pi * 3 * t))) / SR
    s = sum(np.sin(ph * k) / k for k in range(1, 7)) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 30 * t)))
    return (s * env(len(t), 0.02, 0.1) * 0.3).astype(np.float32)
for i in range(18): M.add(honk(380 + (i * 37) % 120), 3 + i * 0.6 + (i % 3) * 0.17, 0.03, 0.2 + (i % 5) * 0.15)
for i in range(10): M.add(honk(400 + (i * 53) % 100), 14 + i * 1.1, 0.025, 0.3 + (i % 4) * 0.12)
for i in range(8): M.add(honk(360 + (i * 41) % 140), 41 + i * 2.7, 0.02, 0.4)
for i in range(12): M.add(honk(420 + (i * 29) % 90), 112 + i * 0.5, 0.03, 0.2 + (i % 5) * 0.15)
for k in range(3): M.add(tap(900, 0.07), 1.0 + k * 0.7, 0.05, 0.8)
t = T(2.0); f = 1500 + 900 * np.sin(np.pi * t / 2) ** 2 + 300 * (t > 1.2) * np.sin(2 * np.pi * 5 * t)
M.add((np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.05, 0.3) * 0.5).astype(np.float32), 14.5, 0.12, 0.4)
def wings(d, rate=3.5):
    t = T(d); return band(len(t), 500, 0.9) * (0.5 + 0.5 * np.sin(2 * np.pi * rate * t)) ** 3 * env(len(t), 0.2, 0.4)
for i in range(5): M.add(wings(4.2), 16.8 + i * 1.3, 0.12, 0.2 + i * 0.15)
M.add(honk(330, 0.5), 45.6, 0.2, 0.55)
def rustle(d): t = T(d); return band(len(t), 1800, 0.6) * (0.5 + 0.5 * np.sin(2 * np.pi * 6 * t)) ** 2 * env(len(t), 0.1, 0.2)
for a in (28, 34, 40, 47, 52): M.add(rustle(2.0), a + 0.4, 0.06, 0.5)
def step(): t = T(0.18); return band(len(t), 900, 0.8) * np.exp(-t * 25)
for a, z in [(56.2, 61.2)]:
    tt = a
    while tt < z: M.add(step(), tt, 0.08, 0.6); tt += 0.45
def pencil(d):
    t = T(d); a = (0.5 + 0.5 * np.sin(2 * np.pi * 3.3 * t + 2 * np.sin(2 * np.pi * 0.6 * t))) ** 2
    return band(len(t), 3800, 0.4) * a * env(len(t), 0.1, 0.3)
M.add(pencil(8.6), 86.6, 0.16, 0.5); M.add(pencil(1.6), 95.4, 0.14, 0.5)
t = T(0.9); M.add(band(len(t), 2600, 0.5) * (np.random.RandomState(3).rand(len(t)) > 0.6) * env(len(t), 0.02, 0.2), 99.2, 0.2, 0.5)   # tear
# music
THEME = [('E5', 1), ('G5', 1), ('A5', 1), ('G5', 1), ('E5', 1), ('D5', 1), ('C5', 2), ('D5', 1), ('E5', 1), ('G5', 1), ('E5', 2)]
pad([['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4']], 1, 5, 0.03, M)
musicbox(M, [('G5', .5), ('E5', .5), ('C6', 1), ('B5', .5), ('G5', .5), ('A5', 2)], 17, 0.45, 0.04, 0.5)
pad([['F3', 'A3', 'C4'], ['C4', 'E4', 'G4'], ['D4', 'F4', 'A4'], ['G3', 'B3', 'D4']] * 2, 26, 4, 0.03, M)
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['C4', 'E4', 'G4'], ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4']], 62, 5, 0.04, M)
musicbox(M, THEME, 86.6, 0.5, 0.035, 0.5)
# lift-off: wings and a rising wind, then the big theme
for i in range(5): M.add(wings(124, 2.6 + i * 0.2), 111.6 + i * 0.15, 0.07, 0.2 + i * 0.15)
w2 = wind(110, 420); M.add(np.stack([w2, np.roll(w2, 900)], 1) * np.linspace(0, 0.14, len(w2))[:, None] * env(len(w2), 1, 20)[:, None], 117)
CH = [['C4', 'E4', 'G4', 'C5'], ['A3', 'C4', 'E4', 'A4'], ['F3', 'A3', 'C4', 'F4'], ['G3', 'B3', 'D4', 'G4']]
pad(CH * 6, 117, 4, 0.06, M)
musicbox(M, THEME, 119, 0.7, 0.06, 0.45); musicbox(M, THEME, 133, 0.7, 0.06, 0.55)
for k, (n, b) in enumerate([('C5', 2), ('E5', 2), ('G5', 2), ('C6', 4), ('B5', 2), ('A5', 2), ('G5', 4)]):
    st_ = 150 + sum(bb for _, bb in [('C5', 2), ('E5', 2), ('G5', 2), ('C6', 4), ('B5', 2), ('A5', 2), ('G5', 4)][:k]) * 0.9
    M.add(bell(hz(n), b * 1.4, 0.6), st_, 0.06, 0.5)
musicbox(M, THEME, 166, 0.8, 0.05, 0.5)
pad([['D3', 'F3', 'A3'], ['C3', 'E3', 'G3']], 183, 5, 0.03, M)
pad([['F3', 'A3', 'C4', 'E4'], ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['G3', 'C4', 'D4'], ['A#3', 'D4', 'F4'], ['C4', 'E4', 'G4']] * 2, 196, 3.6, 0.045, M)
musicbox(M, THEME, 203, 0.6, 0.04, 0.5)
for k, n in enumerate(['C6', 'D6', 'E6', 'G6', 'A6']): M.add(bell(hz(n), 3, 0.5), 216 + k * 0.4, 0.035, 0.5)
M.write(sys.argv[1], 2.0, 4.0)
print('ok')
