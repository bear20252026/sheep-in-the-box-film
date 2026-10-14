# SEQ 5 sound: a warm desert day, the wrench on the engine, pencil scratching as the stories draw
# themselves, a whirling forty-four sunsets, the rose blooming, a comic tiger, a glass globe,
# a creaking baobab and a cracking planet, chomps, and a music that stops dead at the twist.
import sys, math, numpy as np
sys.path.insert(0, 'sound'); from sfx import *
D = 228; M = Mix(D)
w = wind(D, 340); M.add(np.stack([w, np.roll(w, 1300)], 1) * 0.06, 0)
def pencil(d):
    t = T(d); a = (0.5 + 0.5 * np.sin(2 * np.pi * 3.3 * t + 2 * np.sin(2 * np.pi * 0.6 * t))) ** 2
    return band(len(t), 3800, 0.4) * a * env(len(t), 0.1, 0.3)
def rub(d):
    t = T(d); a = (0.5 + 0.5 * np.sin(2 * np.pi * 4.5 * t)) ** 1.5
    return band(len(t), 1400, 0.7) * a * env(len(t), 0.2, 0.4)
for a, d in [(19.5, 4), (24.0, 1.5), (29.4, 1.8), (63.4, 1.0), (65.0, 2.2), (67.0, 1.2), (68.6, 5.4), (75.0, 0.8), (87.4, 2.0), (124.5, 1.5), (131.5, 2.2), (134.6, 1.6), (161.2, 0.6)]:
    M.add(pencil(d), a, 0.10, 0.45)
for a, z in [(0, 3.4), (9.6, 10.6)]:
    k = math.ceil(a * 9 / (2 * math.pi) - 0.25)
    while True:
        tt = (2 * math.pi * (k + 0.25)) / 9
        if tt >= z: break
        if tt >= a: M.add(clank(1500 + (k % 3) * 220, 0.5), tt, 0.06, 0.8)
        k += 1
M.add(np.stack([band(int(1.0 * SR), 900, 0.6)] * 2, 1) * env(int(1.0 * SR), 0.05, 0.4)[:, None] * 0.15, 7.0)   # wrench sliding on sand
M.add(clank(2100, 0.4), 8.0, 0.06, 0.8)
# story music: the theme on the music box, light pads
THEME = [('E5', 1), ('G5', 1), ('A5', 1), ('G5', 1), ('E5', 1), ('D5', 1), ('C5', 2), ('D5', 1), ('E5', 1), ('G5', 1), ('E5', 2)]
pad([['C4', 'E4', 'G4'], ['F3', 'A3', 'C4'], ['A3', 'C4', 'E4'], ['G3', 'B3', 'D4']] * 2, 19, 4.5, 0.03, M)
musicbox(M, THEME, 20, 0.5, 0.04, 0.5)
for k, n in enumerate(['G5', 'E5', 'C5', 'G4']): M.add(bell(hz(n), 2.5, 0.7), 36.2 + k * 0.5, 0.035, 0.6)   # a sunset
t = T(9); whirl = band(len(t), 600, 0.8) * (0.5 + 0.5 * np.sin(2 * np.pi * (1 + 5 * t / 9) * t)) * env(len(t), 1, 2)
M.add(whirl, 39, 0.08, 0.5)
for i in range(44):
    tt = 39.4 + 8.4 * (i / 44) ** 0.5
    M.add(bell(hz(['C6', 'E6', 'G6', 'A6'][i % 4]), 0.6, 0.4), tt, 0.018, 0.3 + 0.4 * (i % 2))
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['D3', 'F3', 'A3']], 50, 4, 0.04, M)
# the rose
pad([['F3', 'A3', 'C4', 'E4'], ['C4', 'E4', 'G4'], ['D4', 'F4', 'A4'], ['G3', 'B3', 'D4']], 63, 5, 0.035, M)
musicbox(M, [('C5', .5), ('E5', .5), ('G5', .5), ('C6', 1.5), ('B5', .5), ('A5', .5), ('G5', 2)], 68.6, 0.6, 0.04, 0.5)
for k, n in enumerate(['C6', 'E6', 'G6', 'C7', 'E7']): M.add(bell(hz(n), 2.5, 0.5), 74.4 + k * 0.12, 0.03, 0.4)
def growl():
    t = T(0.9); return (band(len(t), 140, 0.6) * (1 + np.sin(2 * np.pi * 28 * t)) * env(len(t), 0.1, 0.4)).astype(np.float32)
M.add(growl(), 89.6, 0.25, 0.7)
for k, n in enumerate(['A4', 'C5', 'A4', 'C5']): M.add(bell(hz(n), 0.4, 0.6), 89.4 + k * 0.6, 0.03, 0.7)
M.add(rub(2.0), 93.0, 0.12, 0.6)
M.add(clank(3200, 1.4), 101.6, 0.06, 0.5)   # glass globe
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['D3', 'F3', 'A3'], ['E3', 'G#3', 'B3']], 106, 4, 0.045, M)
# the baobabs
musicbox(M, [('A4', .5), ('A4', .5), ('C5', .5), ('E5', .5), ('D5', 1), ('C5', .5), ('B4', .5), ('A4', 1)], 121.6, 0.3, 0.04, 0.5)
def creak(d):
    t = T(d); f = 90 + 60 * t / d
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * (0.5 + 0.5 * np.sign(np.sin(2 * np.pi * 18 * t))) * env(len(t), 0.2, 0.3) * 0.5).astype(np.float32)
M.add(creak(5.0), 131.6, 0.2, 0.55)
M.add(boom(2.5), 138.4, 0.35, 0.5); M.add(clank(900, 0.8), 138.4, 0.1, 0.5)
M.add(whoosh(0.8, False, 900), 139.8, 0.1, 0.8)
M.add(thump(140, 0.2), 147.6, 0.2, 0.5); M.add(whoosh(0.9, True, 500), 147.6, 0.08, 0.5)
pad([['C4', 'E4', 'G4'], ['G3', 'B3', 'D4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4']], 149, 4, 0.035, M)
for k in range(6): M.add(thump(220, 0.12), 158.0 + k * 0.36, 0.12, 0.5)   # hops
musicbox(M, [('C5', .5), ('E5', .5), ('G5', .5), ('C6', .5), ('G5', .5), ('C6', 1.5)], 156.8, 0.3, 0.05, 0.5)
for tt in (162.8, 164.0, 165.2):
    M.add(band(int(0.15 * SR), 1600, 0.6) * np.exp(-T(0.15) * 20), tt, 0.25, 0.4)   # chomp
def boing():
    t = T(0.5); f = 300 + 400 * np.exp(-t * 6) * np.cos(2 * np.pi * 7 * t)
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5)).astype(np.float32)
M.add(boing(), 165.6, 0.12, 0.5)
musicbox(M, [('G5', .5), ('A5', .5), ('B5', .5), ('C6', 1.5)], 166.2, 0.35, 0.04, 0.5)
# the twist: music stops dead; a cold low tone
t = T(14); M.add(np.sin(2 * np.pi * 55 * t) * env(len(t), 2, 4) * 0.5, 178.2, 0.12, 0.5)
pad([['D3', 'F3', 'A3'], ['D3', 'F3', 'G#3'], ['C3', 'E3', 'A3'], ['B2', 'D3', 'F3', 'A3']], 180, 4, 0.04, M)
# "I would never." the theme, slow and certain
pad([['F3', 'A3', 'C4'], ['G3', 'B3', 'D4'], ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4', 'E4'], ['C4', 'E4', 'G4']], 197, 5, 0.045, M)
musicbox(M, THEME, 202.4, 0.75, 0.045, 0.5)
M.write(sys.argv[1], 1.5, 3.5)
print('ok')
