"""T084 — pitch preservation under speed change (FR-027 / SC-cents-5).

Generates a 5 s mono sine tone at 440 Hz (A4) at 22 050 Hz sample rate and
applies a single ``speed`` op at factors 0.75 and 1.25. The dominant FFT
peak in the output must remain within ±5 cents of 440 Hz.

The conversion from cents to a Hz tolerance: ``cents = 1200 · log2(f / f_ref)``
so a ±5 cent window is ``f_ref · (2^(±5/1200) − 1) ≈ f_ref · 0.002892``.

ffmpeg ``atempo`` is the canonical pitch-preserving time-stretch path
(research.md R3). librosa is NOT in the worker venv, so this test sticks
to numpy + scipy-style FFT. soundfile is already shipped via the worker
deps for the encode path.
"""

from __future__ import annotations

import math
import shutil
from pathlib import Path

import numpy as np
import pytest
import soundfile as sf

from emotion_tts_worker import audio_edit


SAMPLE_RATE = 22_050
TONE_FREQ_HZ = 440.0
TONE_DURATION_S = 5.0
CENTS_TOLERANCE = 5.0


def _has_ffmpeg() -> bool:
    return shutil.which("ffmpeg") is not None


requires_ffmpeg = pytest.mark.skipif(not _has_ffmpeg(), reason="ffmpeg not on PATH")


def _generate_sine_wav(path: Path) -> None:
    n = int(TONE_DURATION_S * SAMPLE_RATE)
    t = np.arange(n) / SAMPLE_RATE
    samples = (0.6 * np.sin(2 * math.pi * TONE_FREQ_HZ * t)).astype(np.float32)
    sf.write(str(path), samples, SAMPLE_RATE, subtype="FLOAT")


def _dominant_frequency(samples: np.ndarray, sr: int) -> float:
    if samples.ndim > 1:
        samples = samples[:, 0]
    centered = samples - float(np.mean(samples))
    window = np.hanning(centered.shape[0]).astype(np.float32)
    spectrum = np.fft.rfft(centered * window)
    magnitudes = np.abs(spectrum)
    if magnitudes.size < 4:
        return 0.0
    peak_bin = int(np.argmax(magnitudes[1:])) + 1
    if 0 < peak_bin < magnitudes.size - 1:
        alpha = magnitudes[peak_bin - 1]
        beta = magnitudes[peak_bin]
        gamma = magnitudes[peak_bin + 1]
        denom = alpha - 2.0 * beta + gamma
        offset = 0.5 * (alpha - gamma) / denom if denom != 0 else 0.0
        peak_bin_refined = peak_bin + float(offset)
    else:
        peak_bin_refined = float(peak_bin)
    freq_resolution = sr / centered.shape[0]
    return peak_bin_refined * freq_resolution


def _cents_offset(measured_hz: float, reference_hz: float) -> float:
    if measured_hz <= 0 or reference_hz <= 0:
        return float("inf")
    return 1200.0 * math.log2(measured_hz / reference_hz)


@requires_ffmpeg
@pytest.mark.parametrize("factor", [0.75, 1.25])
def test_speed_op_preserves_pitch_within_5_cents(tmp_path: Path, factor: float) -> None:
    source = tmp_path / "tone.wav"
    output = tmp_path / "out.wav"
    _generate_sine_wav(source)

    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000000000000000000007",
                "mode": "speed",
                "factor": factor,
            }
        ],
    }

    audio_edit.apply_chain(source, output, chain)

    samples, sr = sf.read(str(output), dtype="float32", always_2d=False)
    detected_hz = _dominant_frequency(samples, sr)
    cents = _cents_offset(detected_hz, TONE_FREQ_HZ)
    assert abs(cents) <= CENTS_TOLERANCE, (
        f"speed factor {factor} shifted pitch by {cents:+.2f} cents "
        f"(detected {detected_hz:.3f} Hz, expected {TONE_FREQ_HZ:.3f} Hz); "
        f"FR-027 budget is ±{CENTS_TOLERANCE:.1f} cents"
    )
