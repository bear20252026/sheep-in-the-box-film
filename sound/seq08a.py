# SEQ 8a sound: a calm flight theme, then a rising wind, comets hissing past, thunder, strings snapping (a twang),
# the box slipping, the boy's call swallowed by the wind, then a long falling silence.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *; from planet import *
D = 90; M = Mix(D)
space(M, D, 55, 0.035)
flight(M, 0, 62)
pad([['C4', 'E4', 'G4', 'B4'], ['A3', 'C4', 'E4', 'G4'], ['F3', 'A3', 'C4', 'E4'], ['G3', 'B3', 'D4']] * 2, 0, 3.2, 0.04, M)
musicbox(M, THEME, 2.5, 0.55, 0.04, 0.5)
musicbox(M, [('G5', 1), ('E5', .5), ('D5', .5), ('C5', 2)], 17.6, 0.5, 0.035, 0.5)
# wind builds
w = wind(70, 300); ramp = np.clip((np.arange(len(w)) / SR - 0) / 14, 0, 1) * np.clip((64 - np.arange(len(w)) / SR) / 6 + 0.25, 0.25, 1)
M.add(np.stack([w, np.roll(w, 1700)], 1) * ramp[:, None] * 0.22, 22)
for a in [25.6, 29.8, 33.6, 37.0, 42.4, 48.6, 54.0]: M.add(whoosh(1.8, False, 1600), a, 0.08, 0.7)
# tension pad
pad([['D3', 'F3', 'A3'], ['C#3', 'E3', 'G3'], ['D3', 'F3', 'G#3'], ['A2', 'C#3', 'E3']] * 2, 30, 3.6, 0.04, M)
for a in [40.5, 43.6, 45.9, 50.0, 52.1, 55.4, 58.6]: M.add(boom(2.5), a + 0.05, 0.22, 0.4 + (a % 3) * 0.1); M.add(clank(3000, 0.3), a, 0.04, 0.5)
def twang():
    t = T(0.9); f = 520 * (1 - 0.3 * t); return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 5)).astype(np.float32)
for a in [40.8, 46.2, 52.4]: M.add(twang(), a, 0.12, 0.5)
for k in range(40): M.add(thump(70, 0.2), 36 + k * 0.6, 0.06, 0.5)
# the slip: a scrape, a gasp of silence, a falling tone
t = T(0.6); M.add(band(len(t), 1400, 0.6) * env(len(t), 0.05, 0.3), 59.8, 0.08, 0.5)
t = T(9); f = 660 * np.exp(-t / 5); M.add((np.sin(2 * np.pi * np.cumsum(f) / SR) * env(len(t), 0.2, 3) * 0.3).astype(np.float32), 61.0, 0.05, 0.5)
pad([['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['D3', 'F3', 'A3'], ['E3', 'G#3', 'B3']], 62, 4, 0.04, M)
pad([['A2', 'E3', 'A3'], ['F2', 'C3', 'F3']], 78, 5, 0.04, M)
musicbox(M, [('E5', 1), ('C5', 1), ('A4', 2)], 74, 0.8, 0.025, 0.5)
M.write(sys.argv[1], 2.0, 4.0)
print('ok')
