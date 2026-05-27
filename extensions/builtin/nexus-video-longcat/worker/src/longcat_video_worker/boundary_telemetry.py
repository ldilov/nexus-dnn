"""Per-boundary `transition_break_score` telemetry.

The seam between two chained scenes is perceptible when the temporal
derivative at the boundary differs sharply from the temporal derivative
of neighbouring frames. A hard pin makes the model's first-output frame
sit very close to the pin (small step), then the model jumps thereafter
— a non-uniform step that the eye reads as a cut. A soft transition
spreads the change across the ramp window so the derivative at the
boundary is continuous with its neighbours.

``compute_boundary_break_scores`` distils that into a single number per
boundary. Cheap (one numpy pass over the rendered frames). Used by the
S5 smoke to assert that a soft-transition render produces a LOWER break
score than the matching hard-pin render at the same boundary.

Pure numpy. No torch. No ffmpeg. The caller provides the frame stack
already decoded.
"""

from __future__ import annotations

import json
import logging
import math
import os
from pathlib import Path
from typing import Any, Optional, Sequence

import numpy as np

_BREAK_SCORE_EPS = 1.0
_DEFAULT_NEIGHBORHOOD = 3

_log = logging.getLogger("longcat.boundary_telemetry")


def boundary_frame_indices(
    per_scene_num_frames: Sequence[int],
    per_scene_overlap: Sequence[int],
) -> list[int]:
    """Return the frame-index of each scene boundary in the final concat.

    The final concat for an S-scene render is
    ``scene[0]`` (all frames) ++ for each j>=1 ``scene[j][overlap_j:]``.
    The boundary between scene[j-1] and scene[j] sits at the index of
    the FIRST fresh frame of scene[j] in the concatenated array.

    Returns ``len(scenes) - 1`` indices.
    """
    if len(per_scene_num_frames) != len(per_scene_overlap):
        raise ValueError("per_scene_num_frames and per_scene_overlap must align")
    if len(per_scene_num_frames) < 2:
        return []
    indices: list[int] = []
    running = int(per_scene_num_frames[0])
    indices.append(running)
    for j in range(1, len(per_scene_num_frames) - 1):
        running += int(per_scene_num_frames[j]) - int(per_scene_overlap[j])
        indices.append(running)
    return indices


def compute_boundary_break_scores(
    frames: np.ndarray,
    boundary_indices: Sequence[int],
    neighborhood: int = _DEFAULT_NEIGHBORHOOD,
) -> list[dict[str, Any]]:
    """Per-boundary seam-derivative score.

    For each boundary at frame index ``B``:

    * ``pin_diff``                = mean |frames[B] - frames[B-1]|
    * ``neighborhood_median_diff`` = median of the same per-frame diff
      over a window of width ``neighborhood`` to each side of B,
      excluding the boundary itself
    * ``break_score``             = |pin_diff - median| / max(median, eps)

    A high score indicates a seam that stands out from its neighbours
    (either a freeze tell or a sudden jump); a low score indicates a
    smooth transition. The metric is scale-invariant because the
    median acts as the local denominator.

    Returns an empty list when fewer than two frames are supplied or no
    boundary index falls in [1, T-1].
    """
    if frames.ndim != 4 or frames.shape[-1] != 3:
        raise ValueError(
            f"compute_boundary_break_scores expects shape (T, H, W, 3); got {frames.shape}"
        )
    T = int(frames.shape[0])
    if T < 2 or not boundary_indices:
        return []

    work = frames.astype(np.int32)
    diffs = np.abs(work[1:] - work[:-1]).mean(axis=(1, 2, 3)).astype(np.float64)

    out: list[dict[str, Any]] = []
    for raw_b in boundary_indices:
        B = int(raw_b)
        if B < 1 or B >= T:
            continue
        diff_idx = B - 1
        pin_diff = float(diffs[diff_idx])
        lo = max(0, diff_idx - neighborhood)
        hi = min(len(diffs), diff_idx + neighborhood + 1)
        window = np.concatenate(
            (diffs[lo:diff_idx], diffs[diff_idx + 1 : hi])
        )
        if window.size == 0:
            continue
        med = float(np.median(window))
        score = abs(pin_diff - med) / max(med, _BREAK_SCORE_EPS)
        out.append(
            {
                "boundary_frame_idx": B,
                "pin_diff": round(pin_diff, 4),
                "neighborhood_median_diff": round(med, 4),
                "break_score": round(float(score), 4),
            }
        )
    return out


def merge_scores_into_report(
    report_path: Path,
    boundary_scores: list[dict[str, Any]],
    transitions: Optional[list[dict[str, Any]]] = None,
) -> bool:
    """Idempotent merge of boundary scores into an existing render_report.json.

    Returns True on success, False when the file is missing / unreadable /
    not a dict. Never raises — failures are logged. The merge re-writes
    the file atomically (tmp + rename) so a partial write cannot corrupt
    the report.
    """
    report_path = Path(report_path)
    if not report_path.exists():
        _log.warning("merge_scores: report not found at %s", report_path)
        return False
    try:
        with report_path.open(encoding="utf-8") as fh:
            data = json.load(fh)
    except (OSError, json.JSONDecodeError) as exc:
        _log.warning("merge_scores: failed to read %s: %s", report_path, exc)
        return False
    if not isinstance(data, dict):
        _log.warning("merge_scores: %s is not a JSON object", report_path)
        return False
    data["boundary_scores"] = list(boundary_scores)
    if transitions is not None:
        data["transitions"] = list(transitions)
    tmp = report_path.with_suffix(report_path.suffix + ".tmp")
    body = json.dumps(data, indent=2, ensure_ascii=False, sort_keys=False)
    try:
        with tmp.open("wb") as fh:
            fh.write(body.encode("utf-8") + b"\n")
            fh.flush()
            os.fsync(fh.fileno())
        os.replace(tmp, report_path)
    except OSError as exc:
        _log.warning("merge_scores: write failed for %s: %s", report_path, exc)
        if tmp.exists():
            try:
                tmp.unlink()
            except OSError:
                pass
        return False
    return True


def summarize_scores(scores: list[dict[str, Any]]) -> dict[str, Any]:
    """Aggregate summary for log lines: count, min/max/mean break score."""
    if not scores:
        return {"count": 0, "min": None, "max": None, "mean": None}
    values = [float(s["break_score"]) for s in scores]
    return {
        "count": len(values),
        "min": round(min(values), 4),
        "max": round(max(values), 4),
        "mean": round(sum(values) / len(values), 4),
    }
