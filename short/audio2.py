# Sound for Part 2: night wind, the hop, trotting hooves, a rumbling tummy, the flower's pencil lines and bells,
# and "Our Corner" coming in softly once the sheep chooses to stay with the flower.
import numpy as np, subprocess, wave, sys
SR = 48000; DUR = 56.0; N = int(SR * DUR)
rng = np.random.default_rng(7)
mix = np.zeros((N, 2), np.float32)
def add(sig, at, gain=1.0, pan=0.5):
    if sig.ndim == 1: sig = np.stack([sig * (1.2 - pan), sig * (0.2 + pan)], 1)
    i = int(at * SR); j = min(N, i + len(sig))
    if j > i: mix[i:j] += sig[:j - i] * gain
def env(n, fin, fout):
    e = np.ones(n, np.float32); a = int(fin * SR); b = int(fout * SR)
    if a: e[:a] = np.linspace(0, 1, a)
    if b: e[-b:] *= np.linspace(1, 0, b)
    return e
def band(n, f0, q=0.5):
    x = rng.normal(0, 1, n).astype(np.float32); sp = np.fft.rfft(x); fr = np.fft.rfftfreq(n, 1 / SR)
    sp *= np.exp(-((np.log(fr + 1) - np.log(f0)) ** 2) / q); y = np.fft.irfft(sp, n).astype(np.float32)
    return y / (np.abs(y).max() + 1e-9)
def pencil(dur):
    n = int(dur * SR); t = np.arange(n) / SR
    a = (0.5 + 0.5 * np.sin(2 * np.pi * 3.3 * t + 2 * np.sin(2 * np.pi * 0.6 * t))) ** 2 * (np.sin(2 * np.pi * 0.5 * t) > -0.7)
    return band(n, 3800, 0.4) * a * env(n, 0.1, 0.3)
def tap(f=900, d=0.09):
    n = int(d * SR); t = np.arange(n) / SR
    return (band(n, f, 0.3) * np.exp(-t * 60) + np.sin(2 * np.pi * f * 0.35 * t) * np.exp(-t * 40) * 0.6).astype(np.float32)
def thump():
    n = int(0.25 * SR); t = np.arange(n) / SR
    return (np.sin(2 * np.pi * (120 - 60 * t) * t) * np.exp(-t * 18) + band(n, 400, 0.4) * np.exp(-t * 30) * 0.3).astype(np.float32)
def bell(freq, dur=3.0, amp=0.3):
    t = np.arange(int(dur * SR)) / SR
    s = sum(a * np.sin(2 * np.pi * freq * r * t) * np.exp(-t * d) for r, a, d in [(1, 1, 1.3), (2.76, 0.45, 2.6), (5.4, 0.25, 4), (8.9, 0.1, 6)])
    return (s * amp * np.minimum(1, t * 400)).astype(np.float32)
def whoosh(dur, up=True):
    n = int(dur * SR); t = np.arange(n) / SR; x = band(n, 700, 1.2)
    e = (t / dur) ** 2 if up else (1 - t / dur) ** 2
    return x * e
def growl(dur):
    # a little cartoon tummy rumble: wobbling low tone with a gurgle on top
    n = int(dur * SR); t = np.arange(n) / SR
    f = 75 + 25 * np.sin(2 * np.pi * 3.1 * t) + 10 * np.sin(2 * np.pi * 11 * t)
    ph = 2 * np.pi * np.cumsum(f) / SR
    tone = sum(np.sin(ph * k) / k for k in range(1, 6))
    trem = 0.6 + 0.4 * np.sin(2 * np.pi * 17 * t)
    gurgle = band(n, 260, 0.5) * (0.5 + 0.5 * np.sin(2 * np.pi * 7 * t)) * 0.4
    e = np.sin(np.pi * np.minimum(1, t / dur)) ** 0.7
    return ((tone * 0.5 * trem + gurgle) * e).astype(np.float32)
def sniff():
    n = int(0.16 * SR); t = np.arange(n) / SR
    return band(n, 2500, 0.6) * np.sin(np.pi * t / 0.16) ** 2

# night wind: a steady breath of air plus two gusts (same shape as the blowing sand)
def ss(u): u = np.clip(u, 0, 1); return u * u * (3 - 2 * u)
t = np.arange(N) / SR
g = 0.18 * ss((t - 19.6) / 1.2) * (1 - ss((t - 23.8) / 1.5)) + ss((t - 41.2) / 1.0) * (1 - ss((t - 45.6) / 2.0))
air = band(N, 380, 1.4) * 0.6 + band(N, 1400, 0.8) * 0.25 * g
w = air * (0.10 + 0.35 * g) * (1 + 0.25 * np.sin(2 * np.pi * 0.13 * t))
add(np.stack([w * 0.9, np.roll(w, 900) * 0.9], 1), 0, 1.0)

add(bell(1568, 2.5, 0.04), 1.2, 1, 0.7); add(bell(2093, 2.5, 0.03), 2.6, 1, 0.3)   # stars
add(tap(700, 0.12), 5.7, 0.10, 0.75); add(tap(650, 0.12), 6.1, 0.08, 0.75)           # scrabbling up inside the box
for k, f in enumerate([1318.5, 1568]): add(bell(f, 2, 0.04), 7.4 + k * 0.5, 1, 0.6)
add(whoosh(0.6), 10.25, 0.15, 0.65); add(thump(), 11.3, 0.25, 0.6)
for a, z in [(12.1, 15.3), (26.7, 30.0)]:
    x = a
    while x < z: add(tap(1300, 0.06), x, 0.07, 0.5); x += 0.21
add(growl(1.1), 16.2, 0.32, 0.5)
for at in (21.25, 21.45, 22.85, 23.0): add(sniff(), at, 0.05, 0.4)
add(pencil(2.0), 24.4, 0.10, 0.35)
for k, f in enumerate([1046.5, 1318.5, 1568, 2093]): add(bell(f, 3, 0.05), 26.2 + k * 0.22, 1, 0.3)
add(thump(), 32.35, 0.08, 0.35)                                                      # the sheep freezes
for k, f in enumerate([783.99, 1046.5]): add(bell(f, 3, 0.035), 39.2 + k * 0.35, 1, 0.5)
add(growl(0.8), 44.9, 0.16, 0.5)

for k, f in enumerate([1568, 2093, 2637]): add(bell(f, 3, 0.05), 45.95 + k * 0.15, 1, 0.45)   # the ear is finished in gold
oc = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', sys.argv[1], '-ss', '30', '-t', '13', '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True).stdout, np.float32).reshape(-1, 2)
add(oc * env(len(oc), 3.0, 2.5)[:, None], 43.0, 0.5)
for k, f in enumerate([1046.5, 1318.5, 1568, 2093]): add(bell(f, 4, 0.05), 51.4 + k * 0.25, 1, 0.6)

mix *= env(N, 0.0, 1.6)[:, None]
mix = np.tanh(mix * 1.1) * 0.95
with wave.open(sys.argv[2], 'wb') as wv:
    wv.setnchannels(2); wv.setsampwidth(2); wv.setframerate(SR); wv.writeframes((mix * 32767).astype(np.int16).tobytes())
print('ok', float(np.abs(mix).max()))
