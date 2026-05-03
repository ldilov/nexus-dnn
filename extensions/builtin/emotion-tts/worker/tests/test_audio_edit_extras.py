from __future__ import annotations

import math
import shutil
from pathlib import Path

import numpy as np
import pytest
import soundfile as sf

from emotion_tts_worker import audio_edit

SAMPLE_RATE = 44_100


def _has_ffmpeg() -> bool:
    return shutil.which("ffmpeg") is not None


requires_ffmpeg = pytest.mark.skipif(not _has_ffmpeg(), reason="ffmpeg not on PATH")


def _write_sine(path: Path, freq_hz: float, duration_s: float) -> None:
    n = int(duration_s * SAMPLE_RATE)
    t = np.arange(n) / SAMPLE_RATE
    samples = (0.5 * np.sin(2 * math.pi * freq_hz * t)).astype(np.float32)
    sf.write(str(path), samples, SAMPLE_RATE, subtype="FLOAT")


def _peak(samples: np.ndarray) -> float:
    if samples.ndim > 1:
        samples = samples[:, 0]
    return float(np.max(np.abs(samples)))


def _duration_s(samples: np.ndarray, sr: int) -> float:
    return samples.shape[0] / float(sr)


def test_gain_zero_db_passthrough(tmp_path: Path) -> None:
    source = tmp_path / "in.wav"
    output = tmp_path / "out.wav"
    _write_sine(source, 440.0, 1.0)
    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000GAIN000ZERO000001",
                "mode": "gain",
                "gain_db": 0.0,
            }
        ],
    }
    audio_edit.apply_chain(source, output, chain)
    src, _ = sf.read(str(source), dtype="float32", always_2d=False)
    out, _ = sf.read(str(output), dtype="float32", always_2d=False)
    np.testing.assert_allclose(out, src, atol=1e-6)


def test_gain_plus_6_db_doubles_amplitude(tmp_path: Path) -> None:
    source = tmp_path / "in.wav"
    output = tmp_path / "out.wav"
    _write_sine(source, 440.0, 1.0)
    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000GAIN0006DB0000001",
                "mode": "gain",
                "gain_db": 6.0,
            }
        ],
    }
    audio_edit.apply_chain(source, output, chain)
    src, _ = sf.read(str(source), dtype="float32", always_2d=False)
    out, _ = sf.read(str(output), dtype="float32", always_2d=False)
    expected_factor = 10.0 ** (6.0 / 20.0)
    ratio = _peak(out) / _peak(src)
    assert abs(ratio - expected_factor) / expected_factor < 0.05, (
        f"gain +6 dB should produce ~{expected_factor:.3f}x amplitude, got {ratio:.3f}x"
    )


def test_gain_validation_rejects_out_of_range(tmp_path: Path) -> None:
    source = tmp_path / "in.wav"
    output = tmp_path / "out.wav"
    _write_sine(source, 440.0, 0.5)
    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000GAIN00BADRNG00001",
                "mode": "gain",
                "gain_db": 30.0,
            }
        ],
    }
    with pytest.raises(ValueError, match="gain_db"):
        audio_edit.apply_chain(source, output, chain)


def test_pitch_shift_zero_passthrough(tmp_path: Path) -> None:
    source = tmp_path / "in.wav"
    output = tmp_path / "out.wav"
    _write_sine(source, 440.0, 1.0)
    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000PITCH00ZERO000001",
                "mode": "pitch_shift",
                "semitones": 0.0,
            }
        ],
    }
    audio_edit.apply_chain(source, output, chain)
    src, _ = sf.read(str(source), dtype="float32", always_2d=False)
    out, _ = sf.read(str(output), dtype="float32", always_2d=False)
    np.testing.assert_allclose(out, src, atol=1e-6)


@requires_ffmpeg
def test_pitch_shift_preserves_duration(tmp_path: Path) -> None:
    source = tmp_path / "in.wav"
    output = tmp_path / "out.wav"
    _write_sine(source, 440.0, 2.0)
    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000PITCH00UP12000001",
                "mode": "pitch_shift",
                "semitones": 12.0,
            }
        ],
    }
    audio_edit.apply_chain(source, output, chain)
    src, sr_src = sf.read(str(source), dtype="float32", always_2d=False)
    out, sr_out = sf.read(str(output), dtype="float32", always_2d=False)
    src_duration = _duration_s(src, sr_src)
    out_duration = _duration_s(out, sr_out)
    drift = abs(out_duration - src_duration) / src_duration
    assert drift < 0.02, (
        f"pitch_shift should preserve duration within 2%, got "
        f"src={src_duration:.4f}s out={out_duration:.4f}s drift={drift * 100:.2f}%"
    )


@requires_ffmpeg
def test_silence_strip_removes_leading_silence(tmp_path: Path) -> None:
    source = tmp_path / "in.wav"
    output = tmp_path / "out.wav"
    silent = np.zeros(int(0.5 * SAMPLE_RATE), dtype=np.float32)
    n_tone = int(1.0 * SAMPLE_RATE)
    t = np.arange(n_tone) / SAMPLE_RATE
    tone = (0.5 * np.sin(2 * math.pi * 440.0 * t)).astype(np.float32)
    samples = np.concatenate([silent, tone]).astype(np.float32)
    sf.write(str(source), samples, SAMPLE_RATE, subtype="FLOAT")
    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000SILENCE0STRIP0001",
                "mode": "silence_strip",
                "threshold_db": -40.0,
            }
        ],
    }
    audio_edit.apply_chain(source, output, chain)
    src, sr_src = sf.read(str(source), dtype="float32", always_2d=False)
    out, sr_out = sf.read(str(output), dtype="float32", always_2d=False)
    src_duration = _duration_s(src, sr_src)
    out_duration = _duration_s(out, sr_out)
    assert out_duration < src_duration - 0.3, (
        f"silence_strip should drop ~0.5s of leading silence; "
        f"src={src_duration:.3f}s out={out_duration:.3f}s"
    )
    assert out_duration > 0.5, (
        f"silence_strip must preserve the tone segment (positive control); "
        f"out={out_duration:.3f}s < 0.5s suggests the whole file was dropped"
    )
    out_rms = float(np.sqrt(np.mean(out * out)))
    assert out_rms > 0.05, f"output RMS={out_rms:.4f} too low; tone content was lost"


def test_gain_clips_to_full_scale(tmp_path: Path) -> None:
    source = tmp_path / "in.wav"
    output = tmp_path / "out.wav"
    _write_sine(source, 440.0, 0.5)
    chain = {
        "version": 1,
        "ops": [
            {
                "id": "01HX0000GAIN0CLIPPING0001",
                "mode": "gain",
                "gain_db": 24.0,
            }
        ],
    }
    audio_edit.apply_chain(source, output, chain)
    out, _ = sf.read(str(output), dtype="float32", always_2d=False)
    peak = float(np.max(np.abs(out)))
    assert peak <= 1.0 + 1e-6, (
        f"gain at +24 dB on a 0.5-amplitude sine must clip to [-1, 1]; "
        f"peak={peak:.4f}"
    )
