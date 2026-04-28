"""T020 — integrated loudness within ±0.5 LU of target after normalize op.

Generates two 5-second sine sources at low (~-30 LUFS) and high (~-6 LUFS)
levels; both must converge on the requested target (-16 LUFS) within ±0.5 LU
after a single ``normalize`` op runs through the audio_edit pipeline.
"""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
import pyloudnorm
import pytest
import soundfile as sf

from emotion_tts_worker import audio_edit


SAMPLE_RATE = 44_100
DURATION_S = 5.0
TARGET_LUFS = -16.0
LUFS_TOLERANCE = 0.5


def _generate_sine_at_amplitude(path: Path, amplitude: float) -> float:
    t = np.arange(int(DURATION_S * SAMPLE_RATE)) / SAMPLE_RATE
    samples = (amplitude * np.sin(2 * math.pi * 440.0 * t)).astype(np.float32)
    sf.write(str(path), samples, SAMPLE_RATE, subtype="FLOAT")
    meter = pyloudnorm.Meter(SAMPLE_RATE)
    return float(meter.integrated_loudness(samples))


@pytest.mark.parametrize(
    "amplitude_label,amplitude",
    [
        ("low", 0.02),
        ("high", 0.95),
    ],
)
def test_normalize_lands_within_half_lu_of_target(
    tmp_path: Path, amplitude_label: str, amplitude: float
) -> None:
    source_path = tmp_path / f"source_{amplitude_label}.wav"
    output_path = tmp_path / f"output_{amplitude_label}.wav"

    measured_source = _generate_sine_at_amplitude(source_path, amplitude)
    assert math.isfinite(measured_source), (
        f"synthetic source for {amplitude_label} produced non-finite LUFS"
    )

    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000000000000000000002",
                "mode": "normalize",
                "target_lufs": TARGET_LUFS,
            }
        ],
    }

    audio_edit.apply_chain(source_path, output_path, chain)

    samples, sr = sf.read(str(output_path), dtype="float32")
    if samples.ndim > 1:
        samples = samples[:, 0]

    meter = pyloudnorm.Meter(sr)
    measured_output = float(meter.integrated_loudness(samples))
    delta = abs(measured_output - TARGET_LUFS)
    assert delta < LUFS_TOLERANCE, (
        f"normalize miss for {amplitude_label}: source={measured_source:.2f} LUFS, "
        f"output={measured_output:.2f} LUFS, target={TARGET_LUFS}, "
        f"delta={delta:.3f} > {LUFS_TOLERANCE}"
    )
