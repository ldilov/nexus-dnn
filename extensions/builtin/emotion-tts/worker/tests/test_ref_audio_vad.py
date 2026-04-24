"""T031 — VAD trim stage unit tests (spec 034 US1).

Silero + torch are heavy optional deps. When either is missing we skip
rather than fail, so CI on a bare Python env (no torch wheel) still
reports green for the pipeline design.
"""

from __future__ import annotations

import pytest

from emotion_tts_worker.ref_audio import _vad_trim, TARGET_SAMPLE_RATE
from emotion_tts_worker.ref_audio_report import PreprocessError

from conftest_ref_audio import requires_audio_stack


silero_available = True
try:
    import silero_vad  # type: ignore[import-not-found]  # noqa: F401
    import torch  # type: ignore[import-not-found]  # noqa: F401
except ImportError:
    silero_available = False

requires_silero = pytest.mark.skipif(
    not silero_available,
    reason="silero-vad and torch are not installed in this env",
)


@requires_audio_stack
@requires_silero
def test_vad_trim_returns_speech_region_from_mixed_clip():
    import numpy as np

    sr = TARGET_SAMPLE_RATE
    silence = np.zeros(sr, dtype=np.float32)
    speech = (0.3 * np.sin(2 * np.pi * 220 * np.arange(sr * 2) / sr)).astype(np.float32)
    mixed = np.concatenate([silence, speech, silence])

    trimmed, extra = _vad_trim(mixed, sr)
    assert trimmed.ndim == 1
    assert len(trimmed) < len(mixed), "VAD must reduce duration vs. silence-padded input"
    assert extra["engine"] == "silero_vad"
    assert extra["trimmed_ms_leading"] >= 0
    assert extra["trimmed_ms_trailing"] >= 0


@requires_audio_stack
@requires_silero
def test_vad_trim_raises_for_pure_silence():
    import numpy as np

    silent = np.zeros(TARGET_SAMPLE_RATE * 3, dtype=np.float32)
    with pytest.raises(PreprocessError) as exc:
        _vad_trim(silent, TARGET_SAMPLE_RATE)
    assert exc.value.stage == "vad_trim"
    assert exc.value.reason == "vad_empty"
