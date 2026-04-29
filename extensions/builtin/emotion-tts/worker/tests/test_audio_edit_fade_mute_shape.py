"""T091 — fade and mute op shape verification (FR-004 fade_in/fade_out/mute).

Closes the worker-test gap flagged by /speckit-analyze (U1): trim/normalize/
speed had dedicated coverage; fade and mute did not. These ops are pure
numpy and do not require ffmpeg, so the tests run anywhere pytest does.

Asserts:
* ``fade_in`` produces a strictly non-decreasing gain envelope on a constant
  carrier and reaches the source amplitude at the end of the ramp.
* ``fade_out`` produces a strictly non-increasing envelope and reaches zero
  at the tail.
* ``mute`` zeros every sample inside ``[start_ms, end_ms]`` within ±1 ms and
  leaves samples outside that window byte-for-byte unchanged.
"""

from __future__ import annotations

import math
from pathlib import Path

import numpy as np
import pytest
import soundfile as sf

from emotion_tts_worker import audio_edit
from emotion_tts_worker.audio_edit import ops


SAMPLE_RATE = 44_100
DURATION_S = 2.0
TONE_FREQ_HZ = 440.0
TOLERANCE_SAMPLES = 44


def _constant_carrier(amplitude: float = 0.5) -> np.ndarray:
    n = int(DURATION_S * SAMPLE_RATE)
    return np.full(n, amplitude, dtype=np.float32)


def _tone_carrier(amplitude: float = 0.5) -> np.ndarray:
    n = int(DURATION_S * SAMPLE_RATE)
    t = np.arange(n) / SAMPLE_RATE
    return (amplitude * np.sin(2 * math.pi * TONE_FREQ_HZ * t)).astype(np.float32)


def test_fade_in_envelope_is_monotonically_non_decreasing() -> None:
    duration_ms = 250
    carrier_amplitude = 0.5
    carrier = _constant_carrier(carrier_amplitude)

    out = ops.fade_in(carrier, SAMPLE_RATE, duration_ms)

    ramp_len = int(round(duration_ms * SAMPLE_RATE / 1000.0))
    deltas = np.diff(out[:ramp_len])
    assert np.all(deltas >= -1e-6), "fade_in envelope must not decrease across the ramp"
    assert out[0] == pytest.approx(0.0, abs=1e-6), "fade_in must start at 0"
    assert out[ramp_len - 1] == pytest.approx(carrier_amplitude, abs=5e-3), (
        "fade_in must reach source amplitude at the end of the ramp"
    )
    assert np.all(out[ramp_len:] == carrier[ramp_len:]), (
        "fade_in must leave samples beyond the ramp untouched"
    )


def test_fade_out_envelope_is_monotonically_non_increasing() -> None:
    duration_ms = 250
    carrier_amplitude = 0.5
    carrier = _constant_carrier(carrier_amplitude)

    out = ops.fade_out(carrier, SAMPLE_RATE, duration_ms)

    ramp_len = int(round(duration_ms * SAMPLE_RATE / 1000.0))
    tail = out[-ramp_len:]
    deltas = np.diff(tail)
    assert np.all(deltas <= 1e-6), "fade_out envelope must not increase across the tail ramp"
    assert tail[-1] == pytest.approx(0.0, abs=1e-6), "fade_out must end at 0"
    assert tail[0] == pytest.approx(carrier_amplitude, abs=5e-3), (
        "fade_out must begin the ramp at source amplitude"
    )
    head = out[:-ramp_len]
    assert np.all(head == carrier[:-ramp_len]), (
        "fade_out must leave samples before the ramp untouched"
    )


def test_mute_zeros_region_within_one_millisecond_and_preserves_outside() -> None:
    start_ms, end_ms = 500, 1_500
    carrier = _tone_carrier()

    out = ops.mute(carrier, SAMPLE_RATE, start_ms, end_ms)

    expected_start = int(round(start_ms * SAMPLE_RATE / 1000.0))
    expected_end = int(round(end_ms * SAMPLE_RATE / 1000.0))
    muted = out[expected_start:expected_end]
    assert np.all(np.abs(muted) < 1e-6), "mute region must be silenced"

    head = out[: max(0, expected_start - TOLERANCE_SAMPLES)]
    tail = out[expected_end + TOLERANCE_SAMPLES :]
    np.testing.assert_array_equal(head, carrier[: head.shape[0]])
    np.testing.assert_array_equal(tail, carrier[expected_end + TOLERANCE_SAMPLES :])


def test_apply_chain_combines_fade_in_and_mute_through_pipeline(tmp_path: Path) -> None:
    source_path = tmp_path / "source.wav"
    output_path = tmp_path / "output.wav"
    sf.write(str(source_path), _tone_carrier(), SAMPLE_RATE, subtype="FLOAT")

    chain = {
        "version": 1,
        "ops": [
            {"id": "01HX0000000000000000000010", "mode": "fade_in", "duration_ms": 100},
            {
                "id": "01HX0000000000000000000011",
                "mode": "mute",
                "start_ms": 800,
                "end_ms": 1_200,
            },
        ],
    }
    report = audio_edit.apply_chain(source_path, output_path, chain)

    samples, sr = sf.read(str(output_path), dtype="float32")
    assert sr == SAMPLE_RATE
    assert samples[0] == pytest.approx(0.0, abs=1e-6)
    mute_start = int(round(800 * SAMPLE_RATE / 1000.0))
    mute_end = int(round(1_200 * SAMPLE_RATE / 1000.0))
    assert np.all(np.abs(samples[mute_start:mute_end]) < 1e-6)
    assert report.derived_duration_ms == pytest.approx(int(DURATION_S * 1000), abs=2)
