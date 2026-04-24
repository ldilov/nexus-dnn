"""T052 — per-deployment OAS threshold unit tests (spec 034 R-34-03)."""

from __future__ import annotations

import pytest

from emotion_tts_worker.observability.threshold import (
    COLD_CUTOFF,
    HOT_CUTOFF,
    HOT_WINDOW,
    WARM_WINDOW,
    next_threshold,
)


def test_cold_start_uses_literature_default_regardless_of_history():
    decision = next_threshold(samples_seen=0, history=[])
    assert decision.source == "literature_default"
    assert decision.threshold == 0.45
    assert decision.sample_window == 0


def test_cold_when_just_below_cutoff_still_uses_literature():
    decision = next_threshold(samples_seen=COLD_CUTOFF - 1, history=[0.5] * 50)
    assert decision.source == "literature_default"


def test_warm_uses_rolling_mad_over_warm_window():
    history = [0.6] * (WARM_WINDOW + 5)
    decision = next_threshold(samples_seen=COLD_CUTOFF + 5, history=history)
    assert decision.source == "rolling_mad"
    # MAD on a constant series is 0 -> threshold = median = 0.6.
    assert abs(decision.threshold - 0.6) < 1e-9
    assert decision.sample_window == WARM_WINDOW


def test_warm_pulls_threshold_down_for_noisy_history():
    # Median ≈ 0.6; MAD ≈ 0.1; threshold = 0.6 - 1.5 * 0.1 = 0.45.
    history = [0.5, 0.7] * (WARM_WINDOW // 2)
    decision = next_threshold(samples_seen=COLD_CUTOFF + 1, history=history)
    assert decision.source == "rolling_mad"
    assert 0.43 <= decision.threshold <= 0.47


def test_hot_uses_500_sample_window():
    history = [0.5] * (HOT_WINDOW + 100)
    decision = next_threshold(samples_seen=HOT_CUTOFF + 50, history=history)
    assert decision.source == "rolling_mad"
    assert decision.sample_window == HOT_WINDOW


def test_hot_same_source_tag_as_warm():
    # The UI shouldn't flicker when deployment crosses 1000 segments —
    # source tag is unchanged.
    warm = next_threshold(samples_seen=500, history=[0.5] * WARM_WINDOW)
    hot = next_threshold(samples_seen=HOT_CUTOFF + 1, history=[0.5] * HOT_WINDOW)
    assert warm.source == hot.source == "rolling_mad"


def test_threshold_clamped_to_unit_interval():
    # A pathological history that would drive threshold below 0.
    history = [0.1] * (WARM_WINDOW + 5)
    decision = next_threshold(samples_seen=COLD_CUTOFF + 5, history=history)
    assert 0.0 <= decision.threshold <= 1.0


def test_history_shorter_than_window_falls_back_to_literature():
    # If history is degenerate (1 sample) the caller shouldn't get garbage.
    decision = next_threshold(samples_seen=COLD_CUTOFF + 5, history=[0.7])
    assert decision.source == "literature_default"


@pytest.mark.parametrize("default", [0.40, 0.45, 0.55])
def test_literature_default_is_configurable(default: float):
    decision = next_threshold(samples_seen=0, history=[], literature_default=default)
    assert decision.threshold == default
