"""T032 — loudness + peak-limit stage unit tests (spec 034 US1).

Validates that a quiet clip gets normalised to TARGET_LUFS ± tolerance and
that the peak limiter clamps to PEAK_LIMIT_DBFS.
"""

from __future__ import annotations

import pytest

from emotion_tts_worker.ref_audio import (
    _loudness,
    _peak_limit,
    LUFS_TOLERANCE,
    PEAK_LIMIT_DBFS,
    TARGET_LUFS,
    TARGET_SAMPLE_RATE,
)

from conftest_ref_audio import requires_audio_stack


pyloudnorm_available = True
try:
    import pyloudnorm  # type: ignore[import-not-found]  # noqa: F401
except ImportError:
    pyloudnorm_available = False

requires_pyloudnorm = pytest.mark.skipif(
    not pyloudnorm_available,
    reason="pyloudnorm is not installed in this env",
)


@requires_audio_stack
@requires_pyloudnorm
def test_loudness_normalises_quiet_clip_to_target_lufs():
    import numpy as np

    sr = TARGET_SAMPLE_RATE
    duration_s = 5.0
    quiet = (0.02 * np.sin(2 * np.pi * 220 * np.arange(int(sr * duration_s)) / sr)).astype(np.float32)

    normalised, extra = _loudness(quiet, sr)
    assert abs(extra["lufs_after"] - TARGET_LUFS) <= LUFS_TOLERANCE + 0.5, (
        f"loudness {extra['lufs_after']} not within tolerance of {TARGET_LUFS}"
    )
    assert extra["lufs_before"] < extra["lufs_after"], "quiet clip must be boosted"
    assert normalised.dtype == np.float32


@requires_audio_stack
def test_peak_limit_clamps_above_target():
    import math
    import numpy as np

    sr = TARGET_SAMPLE_RATE
    # Intentionally hot signal near 0 dBFS (peak ≈ 0.95).
    hot = (0.95 * np.sin(2 * np.pi * 220 * np.arange(sr) / sr)).astype(np.float32)
    limited, extra = _peak_limit(hot)
    # After clamp the absolute peak must be within the target in linear terms.
    peak_linear = float(np.max(np.abs(limited))) or 1e-9
    peak_dbfs = 20.0 * math.log10(peak_linear)
    assert peak_dbfs <= PEAK_LIMIT_DBFS + 0.05, f"peak {peak_dbfs} exceeds {PEAK_LIMIT_DBFS}"
    assert extra["peak_before_dbfs"] > PEAK_LIMIT_DBFS, "fixture must exceed the limit before clamping"


@requires_audio_stack
def test_peak_limit_leaves_quiet_clip_unchanged():
    import math
    import numpy as np

    sr = TARGET_SAMPLE_RATE
    quiet = (0.1 * np.sin(2 * np.pi * 220 * np.arange(sr) / sr)).astype(np.float32)
    limited, extra = _peak_limit(quiet)
    # Quiet clips should pass through without gain change.
    peak_linear = float(np.max(np.abs(limited))) or 1e-9
    peak_dbfs = 20.0 * math.log10(peak_linear)
    assert peak_dbfs < PEAK_LIMIT_DBFS, "quiet clip should stay below the peak limit"
    assert extra["peak_before_dbfs"] == extra["peak_after_dbfs"], "no gain change for quiet input"
