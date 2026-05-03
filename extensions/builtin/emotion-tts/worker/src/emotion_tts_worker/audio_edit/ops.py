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
    if end <= start:
        return out
    if out.ndim == 1:
        out[start:end] = 0.0
    else:
        out[start:end, :] = 0.0
    return out


def normalize(samples: np.ndarray, sr: int, target_lufs: float) -> tuple[np.ndarray, float | None]:
    """Apply gain so integrated loudness lands at ``target_lufs``; returns (samples, measured_after)."""

    meter = pyloudnorm.Meter(sr)
    current_lufs = float(meter.integrated_loudness(samples.astype(np.float64)))
    if not math.isfinite(current_lufs):
        return samples.copy(), None
    gain_db = target_lufs - current_lufs
    gain_linear = float(10.0 ** (gain_db / 20.0))
    out = (samples * gain_linear).astype(np.float32, copy=False)
    measured_after = float(meter.integrated_loudness(out.astype(np.float64)))
    if not math.isfinite(measured_after):
        return out, None
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


def gain(samples: np.ndarray, sr: int, gain_db: float) -> np.ndarray:
    if abs(gain_db) < 1e-9:
        return samples.copy()
    factor = float(10.0 ** (gain_db / 20.0))
    return (samples * factor).astype(np.float32, copy=False)


def eq3(
    samples: np.ndarray,
    sr: int,
    low_db: float,
    mid_db: float,
    high_db: float,
) -> np.ndarray:
    bands: list[str] = []
    if abs(low_db) >= 1e-9:
        bands.append(f"equalizer=f=80:t=o:w=2:g={low_db}")
    if abs(mid_db) >= 1e-9:
        bands.append(f"equalizer=f=1000:t=o:w=2:g={mid_db}")
    if abs(high_db) >= 1e-9:
        bands.append(f"equalizer=f=8000:t=o:w=2:g={high_db}")
    if not bands:
        return samples.copy()
    return _run_ffmpeg_filter(samples, sr, ",".join(bands), prefix="audio-edit-eq3-")


def pitch_shift(samples: np.ndarray, sr: int, semitones: float) -> np.ndarray:
    if abs(semitones) < 1e-9:
        return samples.copy()
    factor = float(2.0 ** (semitones / 12.0))
    filter_graph = f"asetrate={sr}*{factor},aresample={sr},atempo=1/{factor}"
    return _run_ffmpeg_filter(samples, sr, filter_graph, prefix="audio-edit-pitch-")


def silence_strip(samples: np.ndarray, sr: int, threshold_db: float) -> np.ndarray:
    filter_graph = (
        f"silenceremove=start_periods=1:start_threshold={threshold_db}dB:start_silence=0.05"
        f":stop_periods=1:stop_threshold={threshold_db}dB:stop_silence=0.05"
    )
    return _run_ffmpeg_filter(samples, sr, filter_graph, prefix="audio-edit-silence-")


def _run_ffmpeg_filter(
    samples: np.ndarray,
    sr: int,
    filter_graph: str,
    prefix: str,
) -> np.ndarray:
    if not shutil.which("ffmpeg"):
        raise RuntimeError(f"ffmpeg required for filter '{filter_graph}' but not on PATH")
    with tempfile.TemporaryDirectory(prefix=prefix) as td:
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
            filter_graph,
            "-c:a",
            "pcm_f32le",
            str(out_path),
        ]
        result = subprocess.run(cmd, capture_output=True)
        if result.returncode != 0:
            raise RuntimeError(
                f"ffmpeg filter failed ({filter_graph}): "
                f"{result.stderr.decode('utf-8', errors='replace')}"
            )
        new_samples, _ = sf.read(str(out_path), dtype="float32", always_2d=False)
    return new_samples.astype(np.float32, copy=False)
