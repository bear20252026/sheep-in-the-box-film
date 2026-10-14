# shared sounds for the little planets
import numpy as np
from sfx import *
def space(M, D, base=55, gain=0.05):
    t = T(D); s = (np.sin(2 * np.pi * base * t) + 0.5 * np.sin(2 * np.pi * base * 1.5 * t + 0.4 * np.sin(2 * np.pi * 0.1 * t))) * 0.4 + band(len(t), 300, 0.6) * 0.15
    M.add(np.stack([s, np.roll(s, 2000)], 1) * env(len(t), 2, 3)[:, None] * gain, 0)
    for i in range(int(D / 3)): M.add(bell(hz(['C7', 'E7', 'G7', 'B6', 'D7'][i % 5]), 2.5, 0.3), 1 + i * 3 + (i * 0.37) % 1.2, 0.008, (i * 0.31) % 1)
def wings(d, rate=3.0):
    t = T(d); return band(len(t), 500, 0.9) * (0.5 + 0.5 * np.sin(2 * np.pi * rate * t)) ** 3 * env(len(t), 0.3, 0.6)
def flight(M, a, d):
    for i in range(5): M.add(wings(d, 2.6 + i * 0.2), a + i * 0.1, 0.05, 0.2 + i * 0.15)
def brass(note, d, amp=0.3):
    t = T(d); f = hz(note); ph = 2 * np.pi * f * t
    s = sum(np.sin(ph * k) * (0.9 ** k) for k in range(1, 10)) * (1 + 0.04 * np.sin(2 * np.pi * 5.5 * t))
    return (s * env(len(t), 0.04, 0.15) * amp * 0.25).astype(np.float32)
def fanfare(M, at, notes, beat=0.18, gain=0.08):
    tt = at
    for n, b in notes:
        if n: M.add(brass(n, b * beat * 1.1), tt, gain, 0.5)
        tt += b * beat
def step(): t = T(0.16); return band(len(t), 1100, 0.8) * np.exp(-t * 25)
def hop(): t = T(0.4); f = 300 + 500 * t; return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 8)).astype(np.float32)
THEME = [('E5', 1), ('G5', 1), ('A5', 1), ('G5', 1), ('E5', 1), ('D5', 1), ('C5', 2), ('D5', 1), ('E5', 1), ('G5', 1), ('E5', 2)]
