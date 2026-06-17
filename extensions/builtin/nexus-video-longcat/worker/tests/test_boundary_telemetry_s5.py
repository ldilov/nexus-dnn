"""S5 — boundary telemetry + render_report transitions/boundary_scores.

Covers:
* boundary_frame_indices computes correct concat positions for an
  N-scene plan with per-scene overlaps.
* compute_boundary_break_scores returns one entry per in-range boundary,
  empty when the input is too short, raises on bad shape.
* The metric is correctly sensitive: a synthetic frame stack with a
  byte-frozen seam produces a LARGER break_score than a stack with
  uniform per-frame variation at the same boundary index.
* merge_scores_into_report is idempotent + atomic + safe on missing files.
* RenderReport.to_dict round-trips the new fields and omits them when empty.
* summarize_scores aggregates correctly and tolerates an empty list.
"""

from __future__ import annotations

import json
from pathlib import Path

import numpy as np
import pytest

from longcat_video_worker.boundary_telemetry import (
    boundary_frame_indices,
    compute_boundary_break_scores,
    merge_scores_into_report,
    summarize_scores,
)
from longcat_video_worker.render_report import (
    REPORT_SCHEMA_VERSION,
    build_report,
    write_report,
)


class TestBoundaryFrameIndices:
    def test_empty_for_single_scene(self):
        assert boundary_frame_indices([49], [0]) == []

    def test_two_scene_layout(self):
        # Scene 0: 49 frames (0..48). Scene 1: 49 frames, overlap 13 -> drops first
        # 13, contributes 36 fresh starting at index 49.
        assert boundary_frame_indices([49, 49], [0, 13]) == [49]

    def test_three_scene_layout(self):
        # b0 = 49, b1 = 49 + (49-13) = 85
        assert boundary_frame_indices([49, 49, 49], [0, 13, 13]) == [49, 85]

    def test_mismatched_lengths_raise(self):
        with pytest.raises(ValueError):
            boundary_frame_indices([49, 49], [0])


def _make_uniform_stack(t: int = 30, h: int = 16, w: int = 16) -> np.ndarray:
    """Per-frame mean drifts linearly so adjacent diffs are roughly constant."""
    arr = np.zeros((t, h, w, 3), dtype=np.uint8)
    for i in range(t):
        arr[i] = np.uint8((20 + i * 3) % 256)
    return arr


class TestComputeBoundaryBreakScores:
    def test_empty_when_too_short(self):
        frames = np.zeros((1, 8, 8, 3), dtype=np.uint8)
        assert compute_boundary_break_scores(frames, [0]) == []

    def test_empty_when_no_in_range_boundary(self):
        frames = _make_uniform_stack()
        assert compute_boundary_break_scores(frames, [0]) == []
        assert compute_boundary_break_scores(frames, [999]) == []

    def test_bad_shape_raises(self):
        bad = np.zeros((5, 8, 8), dtype=np.uint8)
        with pytest.raises(ValueError, match="T, H, W, 3"):
            compute_boundary_break_scores(bad, [2])

    def test_returns_one_entry_per_in_range_boundary(self):
        frames = _make_uniform_stack(t=30)
        out = compute_boundary_break_scores(frames, [10, 20])
        assert len(out) == 2
        for entry in out:
            assert set(entry.keys()) == {
                "boundary_frame_idx",
                "pin_diff",
                "neighborhood_median_diff",
                "break_score",
            }

    def test_metric_is_sensitive_to_frozen_seam(self):
        # Build a uniform-derivative stack, then surgically set frame[B]
        # equal to frame[B-1] so the diff at the seam is 0 — i.e. a hard
        baseline = _make_uniform_stack(t=30)
        seam_idx = 15
        frozen = baseline.copy()
        frozen[seam_idx] = frozen[seam_idx - 1]
        base_score = compute_boundary_break_scores(baseline, [seam_idx])
        froz_score = compute_boundary_break_scores(frozen, [seam_idx])
        assert froz_score[0]["break_score"] > base_score[0]["break_score"]
        # The frozen seam pin_diff should be effectively zero.
        assert froz_score[0]["pin_diff"] < 1.0


class TestMergeScoresIntoReport:
    def test_merge_adds_fields(self, tmp_path: Path):
        report_path = tmp_path / "run.render_report.json"
        report_path.write_text(json.dumps({"run_id": "abc", "status": "ok"}))
        ok = merge_scores_into_report(
            report_path,
            boundary_scores=[{"boundary_frame_idx": 49, "break_score": 0.12}],
            transitions=[{"from_scene": 0, "to_scene": 1, "type": "soft"}],
        )
        assert ok is True
        data = json.loads(report_path.read_text())
        assert data["boundary_scores"][0]["break_score"] == 0.12
        assert data["transitions"][0]["type"] == "soft"
        assert data["status"] == "ok"  # original fields preserved

    def test_idempotent(self, tmp_path: Path):
        report_path = tmp_path / "run.render_report.json"
        report_path.write_text(json.dumps({"run_id": "abc"}))
        scores = [{"boundary_frame_idx": 49, "break_score": 0.1}]
        merge_scores_into_report(report_path, boundary_scores=scores)
        merge_scores_into_report(report_path, boundary_scores=scores)
        data = json.loads(report_path.read_text())
        assert data["boundary_scores"] == scores

    def test_missing_file_returns_false(self, tmp_path: Path):
        assert merge_scores_into_report(tmp_path / "nope.json", []) is False

    def test_non_object_returns_false(self, tmp_path: Path):
        report_path = tmp_path / "weird.json"
        report_path.write_text("[1, 2, 3]")
        assert merge_scores_into_report(report_path, []) is False


class TestRenderReportFields:
    def test_to_dict_omits_empty_transitions_and_scores(self, tmp_path: Path):
        report = build_report(
            run_id="abc",
            status="ok",
            duration_seconds=1.0,
            num_frames=49,
            scenes_rendered=1,
        )
        d = report.to_dict()
        assert "transitions" not in d
        assert "boundary_scores" not in d

    def test_to_dict_emits_when_present(self, tmp_path: Path):
        report = build_report(
            run_id="abc",
            status="ok",
            duration_seconds=1.0,
            num_frames=49,
            scenes_rendered=1,
            transitions=[{"from_scene": 0, "to_scene": 1, "type": "soft"}],
            boundary_scores=[{"boundary_frame_idx": 49, "break_score": 0.1}],
        )
        d = report.to_dict()
        assert d["transitions"][0]["type"] == "soft"
        assert d["boundary_scores"][0]["break_score"] == 0.1
        assert d["schema_version"] == REPORT_SCHEMA_VERSION

    def test_write_report_round_trip(self, tmp_path: Path):
        report = build_report(
            run_id="abc",
            status="ok",
            duration_seconds=1.0,
            num_frames=49,
            scenes_rendered=1,
            transitions=[{"from_scene": 0, "to_scene": 1, "type": "soft"}],
            boundary_scores=[{"boundary_frame_idx": 49, "break_score": 0.1}],
        )
        path = write_report(report, tmp_path)
        round_tripped = json.loads(path.read_text())
        assert round_tripped["transitions"][0]["from_scene"] == 0
        assert round_tripped["boundary_scores"][0]["boundary_frame_idx"] == 49


class TestSummarizeScores:
    def test_empty(self):
        s = summarize_scores([])
        assert s == {"count": 0, "min": None, "max": None, "mean": None}

    def test_aggregates(self):
        scores = [
            {"break_score": 0.2},
            {"break_score": 0.5},
            {"break_score": 1.1},
        ]
        s = summarize_scores(scores)
        assert s["count"] == 3
        assert s["min"] == 0.2
        assert s["max"] == 1.1
        assert s["mean"] == pytest.approx(0.6)
