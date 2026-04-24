"""Shared synthetic-audio factories for ref_audio tests (spec 034 T030-T034).

Real fixtures under ``tests/fixtures/audio/`` are documented in the README
there but may not be checked in. These helpers synthesise WAV clips on the
fly so the test suite stays hermetic — they are imported by the per-stage
test modules rather than registered as pytest fixtures so each test picks
the synthesis knobs it actually needs.
"""

from __future__ import annotations

import math
from pathlib import Path

import pytest

try:
    import numpy as np
    import soundfile as sf

    _AUDIO_STACK_AVAILABLE = True
    _AUDIO_STACK_REASON = ""
except ImportError as _err:
    np = None  # type: ignore[assignment]
    sf = None  # type: ignore[assignment]
    _AUDIO_STACK_AVAILABLE = False
    _AUDIO_STACK_REASON = f"numpy/soundfile unavailable: {_err}"


requires_audio_stack = pytest.mark.skipif(
    not _AUDIO_STACK_AVAILABLE,
    reason=f"audio stack not installed in this env ({_AUDIO_STACK_REASON})",
)


def write_sine_clip(
    path: Path,
    duration_s: float,
    *,
    sample_rate: int = 48_000,
    frequency: float = 220.0,
    amplitude: float = 0.25,
    channels: int = 1,
) -> Path:
    """Write a mono/stereo sine-wave WAV — stands in for 'clean speech'."""

    assert _AUDIO_STACK_AVAILABLE, "write_sine_clip requires numpy + soundfile"
    t = np.arange(int(duration_s * sample_rate)) / sample_rate
    mono = amplitude * np.sin(2 * math.pi * frequency * t).astype(np.float32)
    if channels == 2:
        data = np.stack([mono, mono], axis=1)
    else:
        data = mono
    path.parent.mkdir(parents=True, exist_ok=True)
    sf.write(str(path), data, sample_rate, subtype="PCM_16")
    return path


def write_silent_clip(path: Path, duration_s: float, *, sample_rate: int = 24_000) -> Path:
    """Write a pure-silence WAV — triggers the ``vad_empty`` failure mode."""

    assert _AUDIO_STACK_AVAILABLE
    samples = np.zeros(int(duration_s * sample_rate), dtype=np.float32)
    path.parent.mkdir(parents=True, exist_ok=True)
    sf.write(str(path), samples, sample_rate, subtype="PCM_16")
    return path


def write_noisy_speech(
    path: Path,
    duration_s: float,
    *,
    sample_rate: int = 48_000,
    speech_amplitude: float = 0.2,
    noise_amplitude: float = 0.02,
    seed: int = 0xEB0734,
) -> Path:
    """Sine + broadband noise — stands in for the 'noisy phone call' fixture."""

    assert _AUDIO_STACK_AVAILABLE
    rng = np.random.default_rng(seed)
    t = np.arange(int(duration_s * sample_rate)) / sample_rate
    tone = speech_amplitude * np.sin(2 * math.pi * 220.0 * t)
    noise = noise_amplitude * rng.standard_normal(len(t))
    data = (tone + noise).astype(np.float32)
    path.parent.mkdir(parents=True, exist_ok=True)
    sf.write(str(path), data, sample_rate, subtype="PCM_16")
    return path
