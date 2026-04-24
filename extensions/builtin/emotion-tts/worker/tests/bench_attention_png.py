"""T053b — attention-map PNG latency benchmark (spec 034 SC-203).

Target: p95 render time <= 80 ms on a Ryzen-5800X-class reference host
on a typical 5-head × 80-text × 120-frame tensor. Gated behind the
``RUN_BENCH`` env var so slower CI hosts don't trip the assertion.
"""

from __future__ import annotations

import os
import statistics
import time

import pytest

from conftest_ref_audio import requires_audio_stack


RUN_BENCH = os.environ.get("RUN_BENCH") == "1"
P95_TARGET_MS = 80.0
N_SAMPLES = 100

bench_gate = pytest.mark.skipif(
    not RUN_BENCH,
    reason="bench gated behind RUN_BENCH=1 (see pyproject [tool.uv] extras)",
)


matplotlib_available = True
try:
    import matplotlib  # type: ignore[import-not-found]  # noqa: F401
except ImportError:
    matplotlib_available = False

requires_matplotlib = pytest.mark.skipif(
    not matplotlib_available,
    reason="matplotlib not installed",
)


@bench_gate
@requires_audio_stack
@requires_matplotlib
def test_png_p95_under_target(tmp_path):
    import numpy as np

    from emotion_tts_worker.observability.png import render_attention_map

    heads, text_len, audio_frames = 5, 80, 120
    rng = np.random.default_rng(0xEB0734)
    raw = rng.random((heads, text_len, audio_frames))
    attention = raw / raw.sum(axis=-1, keepdims=True)

    durations_ms: list[float] = []
    for idx in range(N_SAMPLES):
        out = tmp_path / f"sample_{idx:03d}.png"
        t0 = time.perf_counter()
        render_attention_map(attention, out)
        durations_ms.append((time.perf_counter() - t0) * 1000.0)

    p95 = statistics.quantiles(durations_ms, n=20)[-1]
    assert p95 <= P95_TARGET_MS, (
        f"p95 {p95:.1f} ms exceeds target {P95_TARGET_MS} ms "
        f"(median {statistics.median(durations_ms):.1f}, n={N_SAMPLES})"
    )
