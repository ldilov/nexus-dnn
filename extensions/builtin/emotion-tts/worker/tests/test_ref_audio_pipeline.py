"""T033 — end-to-end pipeline test (spec 034 US1).

Runs the full ``preprocess()`` chain against a synthetic 40-second noisy clip
and asserts every stage reports ``ok``, duration is capped, and per-stage
timings are populated.
"""

from __future__ import annotations

import pytest

from emotion_tts_worker.ref_audio import (
    HARD_CAP_SECONDS,
    SOFT_TARGET_SECONDS,
    TARGET_SAMPLE_RATE,
    preprocess,
)

from conftest_ref_audio import requires_audio_stack, write_noisy_speech


pyloudnorm_available = True
silero_available = True
try:
    import pyloudnorm  # type: ignore[import-not-found]  # noqa: F401
except ImportError:
    pyloudnorm_available = False
try:
    import silero_vad  # type: ignore[import-not-found]  # noqa: F401
    import torch  # type: ignore[import-not-found]  # noqa: F401
except ImportError:
    silero_available = False

requires_full_stack = pytest.mark.skipif(
    not (pyloudnorm_available and silero_available),
    reason="pipeline test needs pyloudnorm + silero-vad + torch",
)


@requires_audio_stack
@requires_full_stack
def test_full_pipeline_on_40s_noisy_clip_produces_capped_output(tmp_path):
    source = write_noisy_speech(tmp_path / "noisy_40s.wav", duration_s=40.0)
    out = tmp_path / "pre.wav"

    result = preprocess(source, out)

    report = result.report
    stage_names = [s.stage for s in report.stages]
    expected_order = [
        "decode",
        "mono",
        "denoise",
        "vad_trim",
        "loudness",
        "peak_limit",
        "truncate",
    ]
    # denoise may be 'skipped' or 'ok'; the order must match.
    assert stage_names == expected_order, f"unexpected stage order: {stage_names}"

    # Every stage populated a duration_ms.
    for stage in report.stages:
        assert stage.duration_ms is not None, f"{stage.stage} missing duration_ms"
        assert stage.duration_ms >= 0

    # The mandatory stages must have status=ok; denoise is allowed to skip.
    required_ok = {"decode", "mono", "vad_trim", "loudness", "peak_limit", "truncate"}
    for stage in report.stages:
        if stage.stage in required_ok:
            assert stage.status == "ok", f"{stage.stage} failed: {stage.reason}"

    assert out.exists()

    import soundfile as sf

    waveform, sr = sf.read(str(out))
    assert sr == TARGET_SAMPLE_RATE
    duration_s = len(waveform) / sr
    assert duration_s <= HARD_CAP_SECONDS + 0.01
    # For a 40 s source the truncate stage should pick the soft-target window.
    assert duration_s <= SOFT_TARGET_SECONDS + 0.01

    # truncate stage should report the selection
    truncate_stage = next(s for s in report.stages if s.stage == "truncate")
    assert truncate_stage.extra.get("selection") == "highest_activity_window"
    assert truncate_stage.extra.get("duration_before_ms", 0) >= 39_000
