# SEQ 7b sound: grey hum, an adding machine and scribbling, a nibble, a STAMP, the drawer slam,
# muffled dark inside the drawer, three head-butts, the burst and fluttering papers, the theme as they leave.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *; from planet import *
D = 152; M = Mix(D)
space(M, D, 49, 0.04)
flight(M, 0, 9); flight(M, 136, 16)
M.add(thump(150, 0.2), 7.6, 0.14, 0.5)
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4']], 0, 4, 0.03, M)
def scribble(d):
    t = T(d); a = (0.5 + 0.5 * np.sin(2 * np.pi * 5 * t + 3 * np.sin(2 * np.pi * 0.9 * t))) ** 2
    return band(len(t), 3600, 0.4) * a * env(len(t), 0.05, 0.1)
def click(): t = T(0.05); return band(len(t), 2500, 0.5) * np.exp(-t * 120)
def ding(): return bell(hz('A6'), 0.6, 0.3)
# counting: clicks of the adding machine, scribbles, a ding at each total
for a, z in [(9.5, 22.5), (32.8, 38.6)]:
    tt = a; k = 0
    while tt < z:
        M.add(click(), tt, 0.06, 0.65); tt += 0.17 + 0.08 * ((k * 7) % 3); k += 1
        if k % 14 == 0: M.add(ding(), tt, 0.04, 0.65)
    M.add(scribble(z - a), a, 0.05, 0.6)
# a dry little clock-tick tune for the serious man
musicbox(M, [('E5', .5), ('E5', .5), ('C5', .5), ('E5', .5), ('G5', 1), ('G4', 1)] * 2, 24, 0.4, 0.025, 0.5)
pad([['D4', 'F4', 'A4'], ['C4', 'E4', 'G4'], ['A#3', 'D4', 'F4'], ['A3', 'C4', 'E4']], 26, 5, 0.025, M)
# nibble and stamp
for a in (51.4, 51.8, 52.2, 52.6, 53.0): M.add(band(int(0.08 * SR), 1600, 0.6) * np.exp(-T(0.08) * 40), a, 0.08, 0.55)
M.add(thump(110, 0.25), 60.1, 0.3, 0.55); M.add(clank(), 60.12, 0.05, 0.55)
M.add(whoosh(0.8), 61.0, 0.06, 0.45)
M.add(thump(90, 0.3), 65.1, 0.3, 0.6); M.add(clank(), 65.12, 0.08, 0.6)
pad([['D3', 'F3', 'A3'], ['C#3', 'E3', 'A3']], 66, 4, 0.03, M)
# inside the drawer: muffled hum and a heartbeat, then Horns' lazy theme
t = T(26); M.add(np.sin(2 * np.pi * 41 * t) * env(len(t), 1, 1) * 0.5, 74.6, 0.08, 0.5)
for k in range(6): M.add(thump(60, 0.2), 76 + k * 0.85, 0.09, 0.5)
musicbox(M, [('D5', 1), ('F5', .5), ('E5', .5), ('C5', 2)], 81.6, 0.5, 0.03, 0.6)
pad([['D3', 'F3', 'A3'], ['A#2', 'D3', 'F3'], ['C3', 'E3', 'G3']], 86, 3.4, 0.03, M)
for a, k in [(96.0, 0.5), (98.0, 0.75), (100.0, 1.0)]:
    M.add(thump(80, 0.4), a + 0.68, 0.25 * k + 0.1, 0.62); M.add(clank(), a + 0.7, 0.05 * k, 0.62)
# the burst: boom, papers flutter, the bright theme
M.add(boom(1.5), 100.85, 0.3, 0.55)
for i in range(40): M.add(band(int(0.25 * SR), 2600 + (i * 131) % 1500, 0.5) * env(int(0.25 * SR), 0.02, 0.15), 100.9 + i * 0.09 + (i % 3) * 0.03, 0.03, (i * 0.37) % 1)
fanfare(M, 101.2, [('C5', 1), ('E5', 1), ('G5', 1), ('C6', 3)], 0.16, 0.06)
pad([['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4']] * 2, 106, 4, 0.03, M)
musicbox(M, [('G5', .5), ('E5', .5), ('C5', 1)], 118.0, 0.4, 0.04, 0.5)
pad([['F3', 'A3', 'C4', 'E4'], ['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['G3', 'C4', 'D4'], ['C4', 'E4', 'G4']] * 2, 121, 3.4, 0.04, M)
musicbox(M, THEME, 133, 0.6, 0.045, 0.5)
for k, n in enumerate(['C6', 'E6', 'G6', 'A6']): M.add(bell(hz(n), 3, 0.5), 143 + k * 0.5, 0.03, 0.5)
M.write(sys.argv[1], 1.5, 3.5)
print('ok')
