from __future__ import annotations

import math
import shutil
from pathlib import Path

import numpy as np
import pytest
import soundfile as sf

from emotion_tts_worker import audio_edit
from emotion_tts_worker.audio_edit.digest import compute_digest


SAMPLE_RATE = 44_100
DURATION_S = 1.0


def _has_ffmpeg() -> bool:
    return shutil.which("ffmpeg") is not None


requires_ffmpeg = pytest.mark.skipif(not _has_ffmpeg(), reason="ffmpeg not on PATH")


def _write_sine(path: Path, freq_hz: float, duration_s: float = DURATION_S) -> None:
    n = int(duration_s * SAMPLE_RATE)
    t = np.arange(n) / SAMPLE_RATE
    samples = (0.5 * np.sin(2 * math.pi * freq_hz * t)).astype(np.float32)
    sf.write(str(path), samples, SAMPLE_RATE, subtype="FLOAT")


def _rms_db(samples: np.ndarray) -> float:
    if samples.ndim > 1:
        samples = samples[:, 0]
    rms = float(np.sqrt(np.mean(samples.astype(np.float64) ** 2)))
    if rms <= 1e-12:
        return -200.0
    return 20.0 * math.log10(rms)


def test_eq3_zero_gain_is_passthrough(tmp_path: Path) -> None:
    source = tmp_path / "tone.wav"
    output = tmp_path / "out.wav"
    _write_sine(source, 440.0)
    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000EQ3PASSTHRU0000001",
                "mode": "eq3",
                "low_db": 0.0,
                "mid_db": 0.0,
                "high_db": 0.0,
            }
        ],
    }
    audio_edit.apply_chain(source, output, chain)
    src, _ = sf.read(str(source), dtype="float32", always_2d=False)
    out, _ = sf.read(str(output), dtype="float32", always_2d=False)
    assert out.shape == src.shape
    np.testing.assert_allclose(out, src, atol=1e-6)


@requires_ffmpeg
def test_eq3_low_db_minus_12_attenuates_low_band(tmp_path: Path) -> None:
    source = tmp_path / "tone.wav"
    output = tmp_path / "out.wav"
    _write_sine(source, 80.0)
    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000EQ3LOWATTEN0000001",
                "mode": "eq3",
                "low_db": -12.0,
                "mid_db": 0.0,
                "high_db": 0.0,
            }
        ],
    }
    audio_edit.apply_chain(source, output, chain)
    src, _ = sf.read(str(source), dtype="float32", always_2d=False)
    out, _ = sf.read(str(output), dtype="float32", always_2d=False)
    delta_db = _rms_db(out) - _rms_db(src)
    assert -14.0 <= delta_db <= -8.0, (
        f"expected ~-12 dB attenuation at 80 Hz, got {delta_db:+.2f} dB"
    )


@requires_ffmpeg
def test_eq3_high_db_minus_12_attenuates_high_band(tmp_path: Path) -> None:
    source = tmp_path / "tone.wav"
    output = tmp_path / "out.wav"
    _write_sine(source, 8000.0)
    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000EQ3HIGHATTEN000001",
                "mode": "eq3",
                "low_db": 0.0,
                "mid_db": 0.0,
                "high_db": -12.0,
            }
        ],
    }
    audio_edit.apply_chain(source, output, chain)
    src, _ = sf.read(str(source), dtype="float32", always_2d=False)
    out, _ = sf.read(str(output), dtype="float32", always_2d=False)
    delta_db = _rms_db(out) - _rms_db(src)
    assert -14.0 <= delta_db <= -8.0, (
        f"expected ~-12 dB attenuation at 8 kHz, got {delta_db:+.2f} dB"
    )


def test_eq3_validation_rejects_out_of_range(tmp_path: Path) -> None:
    source = tmp_path / "tone.wav"
    output = tmp_path / "out.wav"
    _write_sine(source, 440.0)
    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000EQ3BADRANGE0000001",
                "mode": "eq3",
                "low_db": -13.0,
                "mid_db": 0.0,
                "high_db": 0.0,
            }
        ],
    }
    with pytest.raises(ValueError, match="low_db"):
        audio_edit.apply_chain(source, output, chain)


def test_eq3_chain_digest_stable_under_repeated_serialization() -> None:
    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000EQ3DIGEST00000001",
                "mode": "eq3",
                "low_db": 3.5,
                "mid_db": -2.0,
                "high_db": 6.0,
            }
        ],
    }
    digest_a = compute_digest(chain)
    digest_b = compute_digest(chain)
    digest_c = compute_digest(
        {
            "ops": [
                {
                    "high_db": 6.0,
                    "low_db": 3.5,
                    "mid_db": -2.0,
                    "mode": "eq3",
                    "id": "01HX0000EQ3DIGEST00000001",
                }
            ],
            "version": 1,
        }
    )
    assert digest_a == digest_b == digest_c
    assert len(digest_a) == 64


@requires_ffmpeg
def test_eq3_combines_in_chain(tmp_path: Path) -> None:
    source = tmp_path / "tone.wav"
    output = tmp_path / "out.wav"
    _write_sine(source, 440.0, duration_s=2.0)
    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000EQ3CHAINTRIM00001",
                "mode": "trim",
                "start_ms": 100,
                "end_ms": 1500,
            },
            {
                "id": "01HX0000EQ3CHAINEQ000001",
                "mode": "eq3",
                "low_db": -6.0,
                "mid_db": 0.0,
                "high_db": 3.0,
            },
            {
                "id": "01HX0000EQ3CHAINFADE0001",
                "mode": "fade_out",
                "duration_ms": 200,
            },
        ],
    }
    audio_edit.apply_chain(source, output, chain)
    src, _ = sf.read(str(source), dtype="float32", always_2d=False)
    out, _ = sf.read(str(output), dtype="float32", always_2d=False)
    assert out.shape[0] < src.shape[0]
    tail = out[-int(0.05 * SAMPLE_RATE):]
    head = out[: int(0.05 * SAMPLE_RATE)]
    assert float(np.max(np.abs(tail))) < float(np.max(np.abs(head)))
