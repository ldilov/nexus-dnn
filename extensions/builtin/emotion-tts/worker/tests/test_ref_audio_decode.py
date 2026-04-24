"""T030 — decode stage unit tests (spec 034 US1)."""

from __future__ import annotations

import pytest

from emotion_tts_worker.ref_audio import _decode, _mono
from emotion_tts_worker.ref_audio_report import PreprocessError

from conftest_ref_audio import requires_audio_stack, write_sine_clip


@requires_audio_stack
def test_decode_reads_stereo_clip_and_reports_sample_rate(tmp_path):
    clip = write_sine_clip(tmp_path / "clean_stereo.wav", 0.5, sample_rate=48_000, channels=2)
    waveform, sr = _decode(clip)
    assert sr == 48_000
    assert waveform.ndim == 2
    assert waveform.shape[1] == 2, "stereo clip must preserve two channels at decode"


@requires_audio_stack
def test_mono_downmixes_stereo(tmp_path):
    clip = write_sine_clip(tmp_path / "stereo.wav", 0.5, channels=2)
    waveform, _ = _decode(clip)
    mono = _mono(waveform)
    assert mono.ndim == 1, "mono output must be 1-D"
    assert len(mono) == waveform.shape[0]


@requires_audio_stack
def test_mono_passthrough_for_mono_input(tmp_path):
    clip = write_sine_clip(tmp_path / "mono.wav", 0.3, channels=1)
    waveform, _ = _decode(clip)
    mono = _mono(waveform)
    assert mono.ndim == 1


def test_decode_missing_file_raises_preprocess_error(tmp_path):
    missing = tmp_path / "does_not_exist.wav"
    with pytest.raises(PreprocessError) as exc:
        _decode(missing)
    assert exc.value.stage == "decode"
    assert "file not found" in exc.value.reason


@requires_audio_stack
def test_decode_empty_file_raises(tmp_path):
    """Zero-byte file must fail with a structured error, not a crash."""

    import soundfile as sf
    import numpy as np

    empty = tmp_path / "empty.wav"
    sf.write(str(empty), np.zeros(0, dtype=np.float32), 24_000)
    with pytest.raises(PreprocessError) as exc:
        _decode(empty)
    assert exc.value.stage == "decode"
