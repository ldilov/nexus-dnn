"""Spec 051 D-C tests — render_report.json writer."""

from __future__ import annotations

import json
import os
import stat

import pytest

from longcat_video_worker.render_report import (
    RenderReport,
    RenderReportError,
    build_report,
    write_report,
    write_report_swallow,
)


def _ok_kwargs(**overrides):
    base = dict(
        run_id="1779800000000",
        status="ok",
        duration_seconds=12.345,
        num_frames=240,
        scenes_rendered=3,
        memory_stats={
            "peak_mb_this_segment": 9120,
            "num_alloc_retries": 0,
            "num_ooms": 0,
            "generation_count": 1,
            "rss_mb": 4200,
            "free_mb": 4096,  # MUST be scrubbed (Spec 051 A1 side-channel)
        },
        output_path="/tmp/longcat/1779800000000.mp4",
    )
    base.update(overrides)
    return base


def test_build_report_minimal_ok():
    r = build_report(**_ok_kwargs())
    assert isinstance(r, RenderReport)
    assert r.status == "ok"
    assert r.schema_version == 1
    assert r.scenes_rendered == 3
    assert r.duration_seconds == 12.345


def test_build_rejects_unsafe_run_id():
    for unsafe in ("../escape", "", "a/b", ".hidden", "/abs"):
        with pytest.raises(RenderReportError):
            build_report(**_ok_kwargs(run_id=unsafe))


def test_memory_scrub_drops_free_vram_keys():
    r = build_report(**_ok_kwargs())
    # peak_mb_this_segment kept, free_mb / free_vram_* dropped (security A1)
    assert "peak_mb_this_segment" in r.memory
    assert r.memory["peak_mb_this_segment"] == 9120
    assert "free_mb" not in r.memory
    assert "free_vram_mb" not in r.memory
    assert "total_vram_mb" not in r.memory


def test_write_creates_file_with_expected_shape(tmp_path):
    r = build_report(**_ok_kwargs())
    path = write_report(r, tmp_path)
    assert path.exists()
    assert path.name == "1779800000000.render_report.json"
    body = json.loads(path.read_text(encoding="utf-8"))
    assert body["schema_version"] == 1
    assert body["status"] == "ok"
    assert body["num_frames"] == 240
    assert "free_mb" not in body["memory"]
    assert "free_vram_mb" not in str(body)


def test_write_swallow_returns_path_on_success(tmp_path):
    path = write_report_swallow(output_dir=tmp_path, **_ok_kwargs())
    assert path is not None
    assert path.exists()


def test_write_swallow_returns_none_when_output_dir_missing():
    path = write_report_swallow(output_dir=None, **_ok_kwargs())
    assert path is None


def test_write_swallow_swallows_invalid_run_id(tmp_path):
    kwargs = _ok_kwargs(run_id="../traversal")
    path = write_report_swallow(output_dir=tmp_path, **kwargs)
    # MUST NOT raise; returns None on failure
    assert path is None


def test_write_swallow_swallows_banned_key(tmp_path, monkeypatch):
    # Inject a banned-key path: the build path keeps free_mb out, but
    # if a future regression slips one in via output_path the writer
    # must still reject loudly via _assert_no_banned_keys -> swallow.
    from longcat_video_worker import render_report as rr

    original = rr.build_report

    def _bad_build(**kwargs):
        report = original(**kwargs)
        return rr.RenderReport(
            schema_version=report.schema_version,
            run_id=report.run_id,
            status=report.status,
            duration_seconds=report.duration_seconds,
            num_frames=report.num_frames,
            scenes_rendered=report.scenes_rendered,
            scenes_failed=report.scenes_failed,
            warnings=report.warnings,
            output_path=report.output_path,
            error_phase=report.error_phase,
            error_message=report.error_message,
            memory={"free_vram_mb": 1234, **report.memory},  # poison
        )

    monkeypatch.setattr(rr, "build_report", _bad_build)
    path = write_report_swallow(output_dir=tmp_path, **_ok_kwargs())
    assert path is None
    assert not any(tmp_path.glob("*.render_report.json"))


def test_write_emits_atomic_no_tmp_leftover(tmp_path):
    r = build_report(**_ok_kwargs())
    write_report(r, tmp_path)
    assert list(tmp_path.glob("*.tmp")) == []


def test_error_report_round_trips(tmp_path):
    r = build_report(
        run_id="err-1779800001000",
        status="error",
        duration_seconds=0.42,
        num_frames=0,
        scenes_rendered=0,
        error_phase="generate",
        error_message="cuda OOM mid-step",
        memory_stats={"peak_mb_this_segment": 15800, "num_ooms": 1},
    )
    path = write_report(r, tmp_path)
    body = json.loads(path.read_text(encoding="utf-8"))
    assert body["status"] == "error"
    assert body["error_phase"] == "generate"
    assert body["error_message"] == "cuda OOM mid-step"
    assert body["memory"]["num_ooms"] == 1
    assert body["memory"]["peak_mb_this_segment"] == 15800


@pytest.mark.skipif(os.name == "nt", reason="POSIX file mode")
def test_posix_mode_0600(tmp_path):
    r = build_report(**_ok_kwargs())
    path = write_report(r, tmp_path)
    mode = stat.S_IMODE(path.stat().st_mode)
    assert mode == 0o600
