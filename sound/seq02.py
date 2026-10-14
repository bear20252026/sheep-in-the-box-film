# SEQ 2 sound: pencil on paper, the eraser's rub, three sheep coming alive (a sneeze, a snort, a yawn),
# a playful pizzicato-like music-box tune that sours each time the boy says no, and the desert wind insert.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *
D = 205; M = Mix(D)

def pencil(d):
    t = T(d); a = (0.5 + 0.5 * np.sin(2 * np.pi * 3.3 * t + 2 * np.sin(2 * np.pi * 0.6 * t))) ** 2 * (np.sin(2 * np.pi * 0.5 * t) > -0.7)
    return band(len(t), 3800, 0.4) * a * env(len(t), 0.1, 0.3)
def rub(d):
    t = T(d); a = (0.5 + 0.5 * np.sin(2 * np.pi * 4.5 * t)) ** 1.5
    return band(len(t), 1400, 0.7) * a * env(len(t), 0.2, 0.4)
def sneeze():
    t = T(0.9); ah = np.sin(2 * np.pi * (300 + 200 * t) * t) * ss(t / 0.5) * (t < 0.6) * 0.3
    choo = band(len(t), 2600, 0.8) * np.exp(-np.maximum(0, t - 0.62) * 14) * (t > 0.6)
    return (ah + choo).astype(np.float32)
def snort():
    t = T(0.5); return (band(len(t), 500, 0.9) * np.exp(-t * 7) * (1 + np.sin(2 * np.pi * 30 * t))).astype(np.float32)
def yawn():
    t = T(1.6); f = 220 - 80 * t / 1.6
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / 1.6) ** 2 * 0.4 + band(len(t), 600, 0.6) * 0.1 * np.sin(np.pi * t / 1.6)).astype(np.float32)
def sad(at):   # a little descending 'no' figure
    for k, n in enumerate(['E5', 'D#5', 'D5']): M.add(bell(hz(n), 2, 1), at + k * 0.3, 0.05, 0.5)

PLAY = [('C5', .5), ('E5', .5), ('G5', .5), ('E5', .5), ('F5', .5), ('A5', .5), ('G5', 1), ('E5', .5), ('C5', .5), ('D5', 1), (None, 1)]
for a, b in [(4.6, 14.2), (50.0, 60.4), (103.6, 115.4)]: M.add(pencil(b - a), a, 0.12, 0.6)
for at in (14.2, 60.4, 115.4): musicbox(M, PLAY, at, 0.32, 0.05, 0.5)
M.add(sneeze(), 21.3, 0.35, 0.45)
for k in range(5): M.add(sniff(), 30 + k * 0.7, 0.08, 0.45)
sad(25.0); sad(72.4); sad(127.6)
for a, d in [(35, 7), (86, 7), (141, 6)]: M.add(rub(d), a, 0.14, 0.5)
M.add(snort(), 63.4, 0.35, 0.55); M.add(thump(150, 0.15), 63.0, 0.2, 0.55); M.add(thump(150, 0.15), 63.5, 0.2, 0.55)
M.add(yawn(), 118.2, 0.3, 0.5)
# the ghosts grumbling: a low, slightly comic pad
pad([['D3', 'F3', 'A3'], ['C3', 'E3', 'G3'], ['B2', 'D3', 'F3'], ['C3', 'E3', 'G3']], 150, 4.5, 0.04, M)
# desert insert
w = wind(23, 360); M.add(np.stack([w, np.roll(w, 900)], 1) * 0.12, 167.6)
M.add(band(int(1.4 * SR), 350, 0.6) * np.sin(np.pi * T(1.4) / 1.4) ** 2, 172.4, 0.07, 0.5)
M.add(pencil(4), 186.6, 0.12, 0.5)
M.add(pencil(10), 194.5, 0.14, 0.6)
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4']], 192, 6, 0.04, M)
M.write(sys.argv[1], 0.5, 0.8)
print('ok')
