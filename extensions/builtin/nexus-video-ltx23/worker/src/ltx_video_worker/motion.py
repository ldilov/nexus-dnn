"""Advanced-motion quality metrics + gate.

The previous motion check was first-vs-last grayscale mean-abs only:
it is blind to *what happens between* — a clip that drifts then
returns, or freezes for a span, or jump-cuts once, can score the same
as smooth continuous motion. This module measures motion THROUGHOUT a
scene with pure-numpy per-consecutive-frame statistics and an optional
Farneback dense-optical-flow magnitude.

Key metric: the consecutive-frame delta SEQUENCE → ``mean_delta``
(overall liveliness) AND ``min_delta`` (the quietest adjacent pair).
The minimum is the part first-vs-last and mean-delta both hide: a clip
with 47 moving frames and 2 frozen ones passes a mean check but the
min collapses — that is the frozen-span detector.

``flow_mean`` (Farneback, cv2 optional) is a supporting signal: it
captures directional motion magnitude. It is motion-source-blind
(camera pan over a frozen subject scores high) so it SUPPORTS, never
replaces, the delta metrics — `assess_motion` gates on the deltas.

All functions are pure (PIL/ndarray in, dict out) — `assess_motion`
and the delta metrics are GPU-free and unit-tested on synthetic
frames; the GPU smoke only produces frames + logs the values so a
threshold drift (seeded-but-driver-variant diffusion) stays visible
rather than silently stale. Thresholds are starting points calibrated
against a verified-good render, not magic constants — the smoke
prints the actual values for recalibration.
"""

from __future__ import annotations

from typing import Any

# Defaults are on the [0,1]-normalised consecutive-frame grayscale
# delta scale (adjacent frames differ far less than first-vs-last, so
# these are intentionally smaller than the old 0.02/0.05 endpoint
# numbers). Recalibrate from the motion-gate smoke's logged values on
# a verified-good render; do not treat as immutable.
_DEF_MEAN_FAIL = 0.004
_DEF_MEAN_WARN = 0.008
_DEF_MIN_FAIL = 0.0015
_FROZEN_EPS = 0.0010


def _gray_stack(frames: Any) -> Any:
    import numpy as np

    return np.stack(
        [
            np.asarray(f.convert("L"), dtype=np.float32) / 255.0
            for f in frames
        ]
    )


def consecutive_deltas(frames: Any) -> Any:
    """Per-adjacent-pair mean absolute grayscale delta, in [0,1].

    Length ``len(frames) - 1``; empty for < 2 frames.
    """
    import numpy as np

    fl = list(frames)
    if len(fl) < 2:
        return np.zeros(0, dtype=np.float32)
    g = _gray_stack(fl)
    return np.abs(g[1:] - g[:-1]).reshape(len(fl) - 1, -1).mean(axis=1)


def flow_magnitude(frames: Any, max_dim: int = 256) -> float | None:
    """Mean Farneback dense-flow magnitude over adjacent pairs, or
    ``None`` if OpenCV is unavailable. Frames are downscaled to
    ``max_dim`` first — flow is O(pixels) and this is a gate, not a
    render-quality pass."""
    try:
        import cv2  # type: ignore
        import numpy as np
    except ImportError:
        return None

    fl = list(frames)
    if len(fl) < 2:
        return None
    mags: list[float] = []
    prev = None
    for f in fl:
        w, h = f.size
        scale = max_dim / float(max(w, h))
        if scale < 1.0:
            f = f.resize((max(1, int(w * scale)), max(1, int(h * scale))))
        cur = np.asarray(f.convert("L"), dtype=np.uint8)
        if prev is not None:
            flow = cv2.calcOpticalFlowFarneback(
                prev, cur, None, 0.5, 3, 15, 3, 5, 1.2, 0
            )
            mags.append(
                float(np.mean(np.sqrt(flow[..., 0] ** 2 + flow[..., 1] ** 2)))
            )
        prev = cur
    if not mags:
        return None
    return float(sum(mags) / len(mags))


def motion_metrics(frames: Any, *, with_flow: bool = True) -> dict[str, Any]:
    """All motion stats for one scene's frame list."""
    import numpy as np

    # Materialise once: a generator would be exhausted by the first
    # pass, silently zeroing n_frames/frozen_pairs on a non-empty clip.
    fl = list(frames)
    d = consecutive_deltas(fl)
    n = len(fl)
    if d.size == 0:
        return {
            "n_frames": n,
            "mean_delta": 0.0,
            "min_delta": 0.0,
            "max_delta": 0.0,
            "std_delta": 0.0,
            "frozen_pairs": max(0, n - 1),
            "flow_mean": None,
        }
    return {
        "n_frames": n,
        "mean_delta": float(d.mean()),
        "min_delta": float(d.min()),
        "max_delta": float(d.max()),
        "std_delta": float(d.std()),
        "frozen_pairs": int(np.count_nonzero(d < _FROZEN_EPS)),
        "flow_mean": flow_magnitude(fl) if with_flow else None,
    }


def assess_motion(
    metrics: dict[str, Any],
    *,
    mean_fail: float = _DEF_MEAN_FAIL,
    mean_warn: float = _DEF_MEAN_WARN,
    min_fail: float = _DEF_MIN_FAIL,
) -> dict[str, Any]:
    """Gate verdict: ``pass`` | ``warn`` | ``fail`` + reasons.

    fail = overall static (mean below hard floor) OR a frozen span
    (the quietest adjacent pair below the floor). warn = live but
    below the soft floor. Thresholds are arguments so the smoke can
    sweep/recalibrate without code edits.
    """
    mean_d = metrics.get("mean_delta", 0.0)
    min_d = metrics.get("min_delta", 0.0)
    reasons: list[str] = []
    verdict = "pass"
    if mean_d < mean_fail:
        verdict = "fail"
        reasons.append(
            f"mean_delta {mean_d:.5f} < hard floor {mean_fail} (static)"
        )
    if min_d < min_fail:
        verdict = "fail"
        reasons.append(
            f"min_delta {min_d:.5f} < hard floor {min_fail} (frozen span)"
        )
    if verdict != "fail" and mean_d < mean_warn:
        verdict = "warn"
        reasons.append(
            f"mean_delta {mean_d:.5f} < soft floor {mean_warn}"
        )
    if not reasons:
        reasons.append("motion within expected range")
    return {"verdict": verdict, "reasons": reasons, **metrics}
