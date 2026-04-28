"""Per-op transforms keyed off the EditOp ``mode`` discriminator.

Trim / mute / fade / normalize are pure numpy. Speed uses ffmpeg ``atempo``
(research.md R3 — pitch-preserving) via a tempfile round-trip. Each op
returns a fresh ndarray (immutability per coding-style.md).
"""

from __future__ import annotations

import math
import shutil
import subprocess
import tempfile
from pathlib import Path

import numpy as np
import pyloudnorm
import soundfile as sf


def ms_to_samples(ms: int, sr: int) -> int:
    return int(round(ms * sr / 1000.0))


def trim(samples: np.ndarray, sr: int, start_ms: int, end_ms: int) -> np.ndarray:
    start = ms_to_samples(start_ms, sr)
    end = ms_to_samples(end_ms, sr)
    end = min(end, samples.shape[0])
    start = min(start, end)
    return samples[start:end].copy()


def mute(samples: np.ndarray, sr: int, start_ms: int, end_ms: int) -> np.ndarray:
    out = samples.copy()
    start = ms_to_samples(start_ms, sr)
    end = min(ms_to_samples(end_ms, sr), out.shape[0])
    if end > start:
        out[start:end] = 0.0
    return out


def normalize(samples: np.ndarray, sr: int, target_lufs: float) -> tuple[np.ndarray, float]:
    """Apply a constant gain so the integrated loudness lands at ``target_lufs``.

    Returns the gain-adjusted samples plus the post-gain measured LUFS.
    Multichannel input is passed verbatim to ``pyloudnorm.Meter`` so ITU-R
    BS.1770 channel weighting applies; downmixing before measurement would
    skew the reading away from the standard.
    """

    meter = pyloudnorm.Meter(sr)
    current_lufs = float(meter.integrated_loudness(samples.astype(np.float64)))
    if not math.isfinite(current_lufs):
        return samples.copy(), current_lufs
    gain_db = target_lufs - current_lufs
    gain_linear = float(10.0 ** (gain_db / 20.0))
    out = (samples * gain_linear).astype(np.float32, copy=False)
    measured_after = float(meter.integrated_loudness(out.astype(np.float64)))
    return out, measured_after


def speed(samples: np.ndarray, sr: int, factor: float) -> np.ndarray:
    """Pitch-preserving time-stretch via ffmpeg ``atempo``."""

    if abs(factor - 1.0) < 1e-6:
        return samples.copy()
    if not shutil.which("ffmpeg"):
        raise RuntimeError("ffmpeg required for speed op but not on PATH")
    with tempfile.TemporaryDirectory(prefix="audio-edit-atempo-") as td:
        in_path = Path(td) / "in.wav"
        out_path = Path(td) / "out.wav"
        sf.write(str(in_path), samples, sr, subtype="FLOAT")
        cmd = [
            "ffmpeg",
            "-y",
            "-loglevel",
            "error",
            "-i",
            str(in_path),
            "-filter:a",
            f"atempo={factor}",
            "-c:a",
            "pcm_f32le",
            str(out_path),
        ]
        result = subprocess.run(cmd, capture_output=True)
        if result.returncode != 0:
            raise RuntimeError(
                f"ffmpeg atempo failed: {result.stderr.decode('utf-8', errors='replace')}"
            )
        new_samples, _ = sf.read(str(out_path), dtype="float32", always_2d=False)
    return new_samples.astype(np.float32, copy=False)


def fade_in(samples: np.ndarray, sr: int, duration_ms: int) -> np.ndarray:
    n = min(ms_to_samples(duration_ms, sr), samples.shape[0])
    if n <= 0:
        return samples.copy()
    out = samples.copy()
    ramp = np.linspace(0.0, 1.0, n, dtype=np.float32)
    if out.ndim == 1:
        out[:n] *= ramp
    else:
        out[:n] *= ramp[:, None]
    return out


def fade_out(samples: np.ndarray, sr: int, duration_ms: int) -> np.ndarray:
    n = min(ms_to_samples(duration_ms, sr), samples.shape[0])
    if n <= 0:
        return samples.copy()
    out = samples.copy()
    ramp = np.linspace(1.0, 0.0, n, dtype=np.float32)
    if out.ndim == 1:
        out[-n:] *= ramp
    else:
        out[-n:] *= ramp[:, None]
    return out
