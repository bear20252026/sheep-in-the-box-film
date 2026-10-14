# Sound for Part 3: morning on B612, the sprout, three crunchy bites, the golden flash, and "Our Corner" to close.
import numpy as np, subprocess, wave, sys
SR = 48000; DUR = 68.0; N = int(SR * DUR)
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


def ss(u): u = np.clip(u, 0, 1); return u * u * (3 - 2 * u)
def crunch():
    n = int(0.22 * SR); t = np.arange(n) / SR
    x = band(n, 2200, 0.9) * (rng.random(n) < 0.35) * np.exp(-t * 14)
    return (x + band(n, 500, 0.5) * np.exp(-t * 25) * 0.5).astype(np.float32)
def birds(at, k=3):
    for i in range(k):
        n = int(0.09 * SR); tt = np.arange(n) / SR
        f = 3200 + 900 * np.sin(np.pi * tt / 0.09)
        add((np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * tt / 0.09) ** 2).astype(np.float32), at + i * 0.13, 0.03, 0.8)
def swell(dur):
    # a rising shimmer of detuned high partials for the gold
    n = int(dur * SR); t = np.arange(n) / SR
    s = sum(np.sin(2 * np.pi * f * t + np.sin(2 * np.pi * 5 * t) * 0.3) for f in (523.25, 659.25, 783.99, 1046.5, 1568))
    return (s / 5 * (t / dur) ** 2.2).astype(np.float32)

t = np.arange(N) / SR
# morning air: soft wind and a warm low pad
air = band(N, 500, 1.4) * 0.6
w = air * 0.07 * (1 + 0.3 * np.sin(2 * np.pi * 0.11 * t))
add(np.stack([w, np.roll(w, 1200)], 1), 0, 1.0)
pad = sum(np.sin(2 * np.pi * f * t) for f in (130.81, 196.0, 261.63)) / 3 * 0.05 * ss(t / 6) * (1 - ss((t - 42) / 2))
add(np.stack([pad, pad], 1), 0, 1.0)
for at in (3.0, 9.5, 24.0, 55.8): birds(at, 3)
add(bell(1568, 3, 0.04), 2.2, 1, 0.8); add(bell(2093, 3, 0.03), 4.0, 1, 0.75)        # sunrise
for k, f in enumerate([1318.5, 1046.5]): add(bell(f, 2, 0.03), 7.0 + k * 0.4, 1, 0.6)   # wakes
add(whoosh(0.5), 10.0, 0.08, 0.6); add(thump(), 10.9, 0.18, 0.6)                    # gets up
add(growl(1.0), 13.0, 0.3, 0.6)
add(tap(2600, 0.2), 14.35, 0.05, 0.4)                                                # glint on the glass
x = 17.7
while x < 21.0: add(tap(1300, 0.06), x, 0.07, 0.5); x += 0.21                        # trot
add(tap(3000, 0.15), 21.4, 0.06, 0.35)                                               # nose to glass
for k, f in enumerate([783.99, 1046.5, 1318.5]): add(bell(f, 3, 0.035), 26.2 + k * 0.3, 1, 0.4)
add(thump(), 30.2, 0.5, 0.5); add(band(int(0.6 * SR), 250, 0.6) * np.exp(-np.arange(int(0.6 * SR)) / SR * 6), 30.2, 0.25, 0.5)
add(whoosh(0.35), 30.55, 0.2, 0.5); add(tap(500, 0.15), 30.9, 0.2, 0.5)               # sprout bursts
add(thump(), 31.35, 0.15, 0.55)
add(growl(0.6), 35.0, 0.18, 0.55)                                                    # sets its jaw
for at in (37.75, 38.55, 39.35): add(crunch(), at, 0.45, 0.5)
add(sniff(), 41.3, 0.06, 0.5)
add(swell(2.6), 43.4, 0.5, 0.5)
add(whoosh(2.5), 43.5, 0.25, 0.5)
fl = band(int(2.5 * SR), 3000, 1.5) * np.exp(-np.arange(int(2.5 * SR)) / SR * 2)
add(fl, 46.0, 0.25, 0.5); add(thump(), 46.0, 0.6, 0.5)
for k, f in enumerate([1046.5, 1318.5, 1568, 2093, 2637]): add(bell(f, 5, 0.06), 46.0 + k * 0.12, 1, 0.3 + 0.1 * k)
add(tap(1100, 0.08), 48.2, 0.08, 0.5); add(tap(1100, 0.08), 48.65, 0.08, 0.5)
add(thump(), 51.05, 0.15, 0.5)

oc = np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', sys.argv[1], '-ss', '20', '-t', '20', '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True).stdout, np.float32).reshape(-1, 2)
add(oc * env(len(oc), 2.5, 4.0)[:, None], 47.5, 0.5)

mix *= env(N, 0.0, 1.8)[:, None]
mix = np.tanh(mix * 1.1) * 0.95
with wave.open(sys.argv[2], 'wb') as wv:
    wv.setnchannels(2); wv.setsampwidth(2); wv.setframerate(SR); wv.writeframes((mix * 32767).astype(np.int16).tobytes())
print('ok', float(np.abs(mix).max()))
