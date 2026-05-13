"""planning_validate unit tests."""

from __future__ import annotations

from ltx_video_worker.planning_validate import validate_plan


def test_external_segments_with_valid_dims_passes():
    plan = {
        "mode": "external_segments",
        "width": 960,
        "height": 544,
        "segments": [
            {"index": 0, "frame_count": 97},
            {"index": 1, "frame_count": 97},
        ],
    }
    res = validate_plan(plan, profile="fake")
    assert res["ok"] is True


def test_native_looping_sampler_rejected_in_v1():
    plan = {"mode": "native_looping_sampler", "width": 960, "height": 544, "segments": []}
    res = validate_plan(plan, profile="rtx40-fp8")
    assert res["ok"] is False
    assert any("external_segments" in e for e in res["errors"])


def test_non_divisible_dims_rejected():
    plan = {"mode": "external_segments", "width": 1000, "height": 544, "segments": []}
    res = validate_plan(plan, profile="rtx40-fp8")
    assert res["ok"] is False


def test_non_8n1_frame_count_rejected():
    plan = {
        "mode": "external_segments", "width": 960, "height": 544,
        "segments": [{"index": 0, "frame_count": 100}],
    }
    res = validate_plan(plan, profile="rtx40-fp8")
    assert res["ok"] is False
    assert any("8n+1" in e for e in res["errors"])
