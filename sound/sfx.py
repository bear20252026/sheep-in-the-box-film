# Shared sound kit for the feature: a stereo mix bus, foley made from shaped noise, bells,
# a soft pad, a music-box melody player and a WAV writer. Everything is synthesized here.
import numpy as np, subprocess, wave
SR = 48000
rng = np.random.default_rng(7)

class Mix:
    def __init__(self, dur): self.N = int(dur * SR); self.buf = np.zeros((self.N, 2), np.float32)
    def add(self, sig, at, gain=1.0, pan=0.5):
        if sig.ndim == 1: sig = np.stack([sig * np.cos(pan * np.pi / 2) * 1.4, sig * np.sin(pan * np.pi / 2) * 1.4], 1)
        i = int(at * SR); j = min(self.N, i + len(sig))
        if j > i and i >= 0: self.buf[i:j] += sig[:j - i] * gain
    def write(self, path, fade_in=0.0, fade_out=1.5, peak=0.9):
        m = self.buf * env(self.N, fade_in, fade_out)[:, None]
        m = np.tanh(m * 1.2); m *= peak / (np.abs(m).max() + 1e-9)
        with wave.open(path, 'wb') as w:
            w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes((m * 32767).astype(np.int16).tobytes())

def env(n, fin, fout):
    e = np.ones(n, np.float32); a = int(fin * SR); b = int(fout * SR)
    if a: e[:a] = np.linspace(0, 1, a)
    if b: e[-b:] *= np.linspace(1, 0, b)
    return e
def T(d): return np.arange(int(d * SR)) / SR
def band(n, f0, q=0.5):
    x = rng.normal(0, 1, n).astype(np.float32); sp = np.fft.rfft(x); fr = np.fft.rfftfreq(n, 1 / SR)
    sp *= np.exp(-((np.log(fr + 1) - np.log(f0)) ** 2) / q); y = np.fft.irfft(sp, n).astype(np.float32)
    return y / (np.abs(y).max() + 1e-9)
def ss(u): u = np.clip(u, 0, 1); return u * u * (3 - 2 * u)

# ---------- foley ----------
def wind(d, base=380, gust=None):
    n = int(d * SR); t = np.arange(n) / SR; g = gust(t) if gust else 0.5 + 0.3 * np.sin(2 * np.pi * 0.09 * t)
    return band(n, base, 1.4) * 0.6 * g + band(n, base * 3.5, 0.8) * 0.2 * g ** 2
def tap(f=900, d=0.09):
    t = T(d); return (band(len(t), f, 0.3) * np.exp(-t * 60) + np.sin(2 * np.pi * f * 0.35 * t) * np.exp(-t * 40) * 0.6).astype(np.float32)
def thump(f=120, d=0.25):
    t = T(d); return (np.sin(2 * np.pi * (f - f / 2 * t) * t) * np.exp(-t * 18) + band(len(t), 400, 0.4) * np.exp(-t * 30) * 0.3).astype(np.float32)
def boom(d=2.5):
    t = T(d); low = np.sin(2 * np.pi * (55 - 25 * t / d) * t) * np.exp(-t * 2.2)
    return (low + band(len(t), 300, 1.2) * np.exp(-t * 3.5) * 0.9 + band(len(t), 2500, 1) * np.exp(-t * 9) * 0.4).astype(np.float32)
def clank(f=1800, d=0.6):
    t = T(d); return sum(a * np.sin(2 * np.pi * f * r * t) * np.exp(-t * k) for r, a, k in [(1, 1, 9), (2.41, .6, 12), (3.9, .4, 16), (5.7, .25, 22)]).astype(np.float32) * 0.5 + band(len(t), f, 0.4) * np.exp(-t * 50) * 0.5
def whoosh(d, up=True, f=700):
    t = T(d); e = (t / d) ** 2 if up else (1 - t / d) ** 2
    return band(len(t), f, 1.2) * e
def sniff():
    t = T(0.16); return band(len(t), 2500, 0.6) * np.sin(np.pi * t / 0.16) ** 2
def gulp():
    t = T(0.22); f = 300 + 500 * t / 0.22
    return (np.sin(2 * np.pi * np.cumsum(f) / SR) * np.sin(np.pi * t / 0.22) ** 2).astype(np.float32)
def cough(d=0.35):
    t = T(d); return band(len(t), 900, 0.8) * np.exp(-t * 12) * (1 + np.sin(2 * np.pi * 25 * t))
def engine(d, f=88, rough=0.0, pitch=None):
    t = T(d); ff = f * (pitch(t) if pitch else 1)
    ph = 2 * np.pi * np.cumsum(ff) / SR
    s = sum(np.sin(ph * k) / k ** 1.1 for k in range(1, 9))
    s = s * (1 + 0.25 * np.sin(ph * 0.5))
    if rough: s *= (1 - rough * (band(len(t), 6, 0.6) > 0.5))
    return (s * 0.25 + band(len(t), 1200, 0.8) * 0.06).astype(np.float32)
def crickets(d, rate=4.0):
    t = T(d); chirp = (np.sin(2 * np.pi * rate * t) > 0.6) * np.sin(2 * np.pi * 4300 * t) * (0.5 + 0.5 * np.sin(2 * np.pi * 37 * t))
    return chirp.astype(np.float32)

# ---------- music ----------
NOTE = {n: i for i, n in enumerate(['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'])}
def hz(name):            # 'E5' -> Hz
    o = int(name[-1]); n = NOTE[name[:-1]]; return 440 * 2 ** ((n + 12 * (o + 1) - 69) / 12)
def bell(freq, dur=3.0, amp=0.3):
    t = T(dur); s = sum(a * np.sin(2 * np.pi * freq * r * t) * np.exp(-t * d) for r, a, d in [(1, 1, 1.3), (2.76, .45, 2.6), (5.4, .25, 4), (8.9, .1, 6)])
    return (s * amp * np.minimum(1, t * 400)).astype(np.float32)
def musicbox(mix, notes, at, beat=0.42, gain=0.06, pan=0.5):
    """notes: list of (name or None, beats)"""
    x = at
    for n, b in notes:
        if n: mix.add(bell(hz(n), 2.6, 1.0), x, gain, pan)
        x += b * beat
    return x
def pad(chords, at, each=4.0, gain=0.05, mix=None):
    """soft string pad: chords = [['C4','E4','G4'], ...]"""
    for i, ch in enumerate(chords):
        t = T(each + 1.5); e = ss(t / 1.2) * (1 - ss((t - each) / 1.5))
        s = sum(np.sin(2 * np.pi * hz(n) * t + 0.3 * np.sin(2 * np.pi * 5 * t)) + 0.3 * np.sin(2 * np.pi * hz(n) * 2.003 * t) for n in ch) / len(ch)
        mix.add((s * e).astype(np.float32), at + i * each, gain, 0.5)
def track(path, start, dur):
    return np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', path, '-ss', str(start), '-t', str(dur), '-f', 'f32le', '-ac', '2', '-ar', str(SR), '-'], capture_output=True).stdout, np.float32).reshape(-1, 2)
OUR_CORNER = '/mnt/user-data/uploads/2026-08-29-08-24-29/dream-gallery/public/music/story/our-corner.mp3'
