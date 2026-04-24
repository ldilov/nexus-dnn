"""Audio-decode probe for voice-asset validation (FR-073).

Returns duration + sample-rate without decoding the full waveform. Uses
``torchaudio.info`` when available; falls back to ``soundfile`` metadata.
Kept minimal on purpose — heavy post-processing lives in the Rust operator.
"""

from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path


@dataclass(frozen=True)
class AudioMeta:
    path: str
    duration_ms: int
    sample_rate: int
    channels: int


def probe(path: str) -> AudioMeta:
    p = Path(path)
    if not p.exists():
        raise FileNotFoundError(f"audio file not found: {path}")

    try:
        import torchaudio

        info = torchaudio.info(path)
        duration_ms = int(round(info.num_frames * 1000 / info.sample_rate)) if info.sample_rate else 0
        return AudioMeta(
            path=str(p),
            duration_ms=duration_ms,
            sample_rate=info.sample_rate,
            channels=info.num_channels,
        )
    except Exception:
        pass

    import soundfile as sf

    with sf.SoundFile(path) as f:
        duration_ms = int(round(len(f) * 1000 / f.samplerate)) if f.samplerate else 0
        return AudioMeta(
            path=str(p),
            duration_ms=duration_ms,
            sample_rate=f.samplerate,
            channels=f.channels,
        )


def can_decode(path: str) -> bool:
    try:
        probe(path)
        return True
    except Exception:
        return False
