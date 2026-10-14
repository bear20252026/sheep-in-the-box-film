# END CREDITS sound: a gentle waltz of the theme on music box and soft pads; a pencil scratch as each sketch
# appears and a soft brush as the colour washes in; a last warm chord.
import sys, numpy as np
sys.path.insert(0, 'sound'); from sfx import *; from planet import *
CARD = 5.2; N = 12; D = N * CARD + 3.6; M = Mix(D)
CH = [['C4', 'E4', 'G4'], ['A3', 'C4', 'E4'], ['F3', 'A3', 'C4'], ['G3', 'B3', 'D4']]
pad(CH * 4, 0, 3.9, 0.04, M)
for k in range(4): musicbox(M, THEME, 0.6 + k * 15.6, 0.62, 0.035, 0.35 + 0.1 * k)
for i in range(N):
    a = i * CARD
    t = T(0.9); M.add((band(len(t), 3500, 0.7) * (0.6 + 0.4 * np.sin(2 * np.pi * 23 * t)) * env(len(t), 0.1, 0.4)).astype(np.float32), a + 0.2, 0.012, 0.3 + 0.04 * i)
    t = T(2.4); M.add((band(len(t), 900, 0.5) * env(len(t), 0.8, 1.0)).astype(np.float32), a + 1.2, 0.015, 0.7)
for k, n in enumerate(['C5', 'E5', 'G5', 'C6']): M.add(bell(hz(n), 5, 0.5), N * CARD - 4.0 + k * 0.4, 0.03, 0.3 + k * 0.15)
M.write(sys.argv[1], 1.0, 3.0)
print('ok')
