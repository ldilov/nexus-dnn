"""GPU-free tests for the advanced-motion metric + gate.

These guard the metric LOGIC on synthetic frames so a motion-fidelity
regression is caught in CI without a render. The decisive case is the
frozen-span clip: it passes a mean-delta check but must FAIL on
``min_delta`` — exactly the gap the old first-vs-last metric had.
"""

from __future__ import annotations

import numpy as np
import pytest
from PIL import Image

from ltx_video_worker.motion import (
    assess_motion,
    consecutive_deltas,
    motion_metrics,
)


def _img(arr: np.ndarray) -> Image.Image:
    return Image.fromarray(arr.astype(np.uint8), mode="RGB")


def _moving(n: int = 24, size: int = 64) -> list[Image.Image]:
    base = np.tile(
        np.linspace(0, 255, size, dtype=np.float32), (size, 1)
    )
    out = []
    for i in range(n):
        shifted = np.roll(base, i * 4, axis=1)
        out.append(_img(np.stack([shifted] * 3, axis=-1)))
    return out


def _frozen(n: int = 24, size: int = 64) -> list[Image.Image]:
    arr = np.full((size, size, 3), 120, dtype=np.uint8)
    return [_img(arr.copy()) for _ in range(n)]


def test_moving_clip_passes() -> None:
    m = motion_metrics(_moving(), with_flow=False)
    assert m["mean_delta"] > 0.01
    assert m["min_delta"] > 0.0
    assert assess_motion(m)["verdict"] == "pass"


def test_frozen_clip_fails_static_and_frozen() -> None:
    m = motion_metrics(_frozen(), with_flow=False)
    assert m["mean_delta"] == pytest.approx(0.0, abs=1e-6)
    assert m["frozen_pairs"] == m["n_frames"] - 1
    v = assess_motion(m)
    assert v["verdict"] == "fail"
    assert any("static" in r or "frozen" in r for r in v["reasons"])


def test_frozen_span_in_otherwise_moving_clip_fails_on_min() -> None:
    # 18 moving frames + a 6-frame frozen tail: mean stays well above
    # the hard floor, but min_delta collapses → must FAIL. This is the
    frames = _moving(18) + _frozen(6)
    m = motion_metrics(frames, with_flow=False)
    assert m["mean_delta"] > 0.004  # would pass a mean-only gate
    assert m["min_delta"] < 0.0015
    assert assess_motion(m)["verdict"] == "fail"


def test_short_clip_is_empty_safe() -> None:
    assert consecutive_deltas([_img(np.zeros((8, 8, 3)))]).size == 0
    m = motion_metrics([_img(np.zeros((8, 8, 3)))], with_flow=False)
    assert m["n_frames"] == 1 and m["mean_delta"] == 0.0


def test_warn_band() -> None:
    # mean between the soft and hard floors, no frozen pair → warn.
    m = {"mean_delta": 0.006, "min_delta": 0.005}
    assert assess_motion(m)["verdict"] == "warn"


def test_flow_optional_contract() -> None:
    m = motion_metrics(_moving(8), with_flow=True)
    assert m["flow_mean"] is None or isinstance(m["flow_mean"], float)
