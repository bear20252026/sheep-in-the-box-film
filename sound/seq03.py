# SEQ 3 sound: Part 1's own track, split at the held moment ("Is this... home?"), with the ghost
# scene cut in: the warm box hum, a cold draft as the ghosts drift through the wall, a comic
# pizzicato for Horns, the 'rub, rub', a sad pad for the scared sheep, the flicker and the scatter.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *
P1S, HOLD, INS = 4.0, 29.0, 112.0
AT = HOLD - P1S; D = (52 - P1S) + INS; M = Mix(D)
I = lambda x: AT + x
p1 = track('public/audio/part1.wav', 0, 52.1)
def seg(a, b, fi, fo):
    s = p1[int(a * SR):int(b * SR)].copy(); n = len(s)
    s *= env(n, fi, fo)[:, None]; return s
M.add(seg(P1S, HOLD + 0.6, 0.0, 0.6), 0)
M.add(seg(HOLD - 0.6, 52.0, 0.8, 1.5), I(INS) - 0.6)
# warm box hum under the whole insert
t = T(INS); hum = (np.sin(2*np.pi*110*t) + 0.5*np.sin(2*np.pi*165*t)) * 0.5 + band(len(t), 220, 0.5) * 0.4
hum *= env(len(t), 2, 3)
M.add(np.stack([hum, np.roll(hum, 600)], 1) * 0.05, I(0))
# the cold draft as the ghosts drift in, and as they scatter
w = wind(5, 520); M.add(np.stack([w, np.roll(w, 700)], 1) * 0.10, I(1.8))
M.add(whoosh(1.4, True, 900), I(2.6), 0.10, 0.2); M.add(whoosh(1.2, True, 700), I(3.6), 0.08, 0.8)
pad([['D3', 'F3', 'A3'], ['C#3', 'E3', 'G3']], I(3), 4, 0.035, M)
# Horns: a comic, bouncy figure
HORNS = [('A4', .5), ('C5', .5), ('E5', .5), ('C5', .5), ('A4', 1)]
musicbox(M, HORNS, I(8.6), 0.26, 0.045, 0.3)
for k in range(7): M.add(bell(hz('E4' if k % 2 else 'A4'), 0.4, 0.5), I(35.2) + k * 0.36, 0.04, 0.3)   # Horns laughs
M.add(cough(), I(22.4), 0.25, 0.7)
M.add(thump(140, 0.2), I(30.8), 0.15, 0.6)   # 'I'm not half!' little stamp
# rub, rub
def rub(d):
    t = T(d); a = (0.5 + 0.5 * np.sin(2 * np.pi * 2.8 * t)) ** 1.5
    return band(len(t), 1400, 0.7) * a * env(len(t), 0.2, 0.4)
M.add(rub(3.4), I(51), 0.12, 0.5)
# the sad turn: the sheep is scared
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['D3', 'F3', 'A3'], ['E3', 'G#3', 'B3']], I(59), 5, 0.045, M)
for k, n in enumerate(['E5', 'D5', 'C5', 'B4']): M.add(bell(hz(n), 2.5, 1), I(66) + k * 0.6, 0.035, 0.6)
for k in range(3): M.add(sniff(), I(89.4) + k * 0.6, 0.07, 0.25)
# the turn to warmth: "a box is something"
pad([['F3', 'A3', 'C4'], ['C3', 'E3', 'G3'], ['G3', 'B3', 'D4']], I(90), 4, 0.04, M)
musicbox(M, [('E5', .5), ('G5', .5), ('A5', 1), ('G5', 1)], I(96.6), 0.4, 0.04, 0.5)
# the flicker: a light thrumming outside, then the scatter
t = T(5); fl = band(len(t), 300, 0.6) * (0.5 + 0.5 * np.sign(np.sin(2*np.pi*1.6*t))) * env(len(t), 0.3, 0.6)
M.add(fl, I(100), 0.10, 0.5)
M.add(whoosh(1.8, False, 900), I(104.2), 0.14, 0.15)
w = wind(3, 600); M.add(np.stack([w, np.roll(w, 400)], 1) * 0.08, I(104))
M.write(sys.argv[1], 0.3, 1.5)
print('ok', D)
