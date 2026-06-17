"""T034 — failure-mode tests for the preprocessing pipeline (spec 034 US1).

Three cases from the spec's Edge Cases section:

1. ``silent_3s.wav`` → VAD returns empty → ``PreprocessError(vad_empty)``.
2. ``crowd_10min.wav`` → truncation picks highest-activity window.
3. Denoise stage with missing ``rnnoise_wheels`` → stage status ``skipped``
   with a ``reason`` populated in the report (FR-202).
"""

from __future__ import annotations

import pytest

from emotion_tts_worker.ref_audio import SOFT_TARGET_SECONDS, preprocess
from emotion_tts_worker.ref_audio_report import PreprocessError, PreprocessingReport, Stage

from conftest_ref_audio import (
    requires_audio_stack,
    write_noisy_speech,
    write_silent_clip,
)


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
    reason="failure-mode tests need pyloudnorm + silero-vad + torch",
)


@requires_audio_stack
@requires_full_stack
def test_silent_clip_fails_with_vad_empty(tmp_path):
    source = write_silent_clip(tmp_path / "silent_3s.wav", duration_s=3.0)
    with pytest.raises(PreprocessError) as exc:
        preprocess(source, tmp_path / "out.wav")
    assert exc.value.stage == "vad_trim"
    assert exc.value.reason == "vad_empty"


@requires_audio_stack
@requires_full_stack
def test_long_clip_picks_highest_activity_window(tmp_path):
    source = write_noisy_speech(tmp_path / "long_60s.wav", duration_s=60.0)
    out = tmp_path / "out.wav"
    result = preprocess(source, out)

    truncate_stage = next(s for s in result.report.stages if s.stage == "truncate")
    assert truncate_stage.status == "ok"
    assert truncate_stage.extra["selection"] == "highest_activity_window"

    import soundfile as sf

    _, sr = sf.read(str(out))
    import soundfile as sf2

    waveform, _ = sf2.read(str(out))
    duration_s = len(waveform) / sr
    assert duration_s <= SOFT_TARGET_SECONDS + 0.01


def test_optional_stage_records_skipped_when_denoise_missing(monkeypatch, tmp_path):
    """FR-202: optional stages that can't run must report `skipped` + reason."""

    # Simulate "rnnoise_wheels not installed" by forcing an ImportError during
    # the stage call. We test the stage driver in isolation rather than running
    from emotion_tts_worker.ref_audio import _run_optional_stage, _DependencyMissing

    report = PreprocessingReport()

    def raises_dependency_missing():
        raise _DependencyMissing("rnnoise import failed: No module named 'rnnoise_wheels'")

    fallback_sentinel = object()
    result = _run_optional_stage(
        report,
        "denoise",
        raises_dependency_missing,
        fallback=fallback_sentinel,
    )
    assert result is fallback_sentinel
    assert len(report.stages) == 1
    recorded = report.stages[0]
    assert recorded.stage == "denoise"
    assert recorded.status == "skipped"
    assert "rnnoise" in (recorded.reason or "")
    # Report should have surfaced the skip as a warning.
    assert any("denoise" in w for w in report.warnings)


def test_preprocess_error_preserves_stage_and_reason():
    err = PreprocessError("vad_trim", "vad_empty")
    assert err.stage == "vad_trim"
    assert err.reason == "vad_empty"
    assert "vad_empty" in str(err)


def test_report_round_trips_through_json():
    """FR-203 back half: the Rust side stores the report verbatim, so JSON
    round-tripping must not lose stage extras or status."""

    original = PreprocessingReport(
        pipeline_version="1",
        stages=[
            Stage(stage="decode", status="ok", duration_ms=12, extra={"input_sample_rate": 48000}),
            Stage(stage="denoise", status="skipped", duration_ms=1, reason="rnnoise import failed"),
            Stage(stage="vad_trim", status="ok", duration_ms=40, extra={"engine": "silero_vad"}),
        ],
        succeeded=True,
        warnings=["denoise: rnnoise import failed"],
    )
    payload = original.to_json()
    revived = PreprocessingReport.from_json(payload)
    assert revived.pipeline_version == "1"
    assert revived.succeeded is True
    assert [s.stage for s in revived.stages] == ["decode", "denoise", "vad_trim"]
    assert revived.stages[0].extra == {"input_sample_rate": 48000}
    assert revived.stages[1].status == "skipped"
    assert revived.stages[1].reason == "rnnoise import failed"
    assert revived.stages[2].extra == {"engine": "silero_vad"}
    assert revived.warnings == ["denoise: rnnoise import failed"]
