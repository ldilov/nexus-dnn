"""S2 — PinSchedule dataclass + decay curves.

Pure-Python; no torch, no numpy. Validates the schedule generator's
invariants and curve shapes.
"""

from __future__ import annotations

import pytest

from longcat_video_worker.pin_schedule import (
    BRIDGE_HEAD,
    DEFAULT_RAMP_FRAMES,
    MAX_RAMP_FRAMES,
    MIN_RAMP_FRAMES,
    NEXT_HEAD,
    PinCurve,
    PinSchedule,
    X0_HEAD,
    build_schedule,
    legacy_hard_pin_schedule,
)


class TestBuildSchedule:
    def test_default_length(self):
        s = build_schedule()
        assert s.ramp_frames == DEFAULT_RAMP_FRAMES
        assert s.curve is PinCurve.EXP
        assert len(s.x0_weights) == DEFAULT_RAMP_FRAMES

    @pytest.mark.parametrize("curve", list(PinCurve))
    def test_invariants_hold_for_all_curves(self, curve):
        s = build_schedule(ramp_frames=12, curve=curve)
        # head matches constants
        assert s.x0_weights[0] == pytest.approx(X0_HEAD)
        assert s.prompt_bridge[0] == pytest.approx(BRIDGE_HEAD)
        assert s.prompt_next[0] == pytest.approx(NEXT_HEAD)
        # tail: pin released, prompt_next == 1.0
        assert s.x0_weights[-1] == pytest.approx(0.0, abs=0.05)
        assert s.prompt_bridge[-1] == pytest.approx(0.0, abs=0.05)
        assert s.prompt_next[-1] == pytest.approx(1.0, abs=0.05)

    @pytest.mark.parametrize("curve", list(PinCurve))
    def test_text_conditioning_sums_to_one(self, curve):
        s = build_schedule(ramp_frames=10, curve=curve)
        for b, n in zip(s.prompt_bridge, s.prompt_next):
            assert b + n == pytest.approx(1.0, abs=1e-3)

    @pytest.mark.parametrize("curve", list(PinCurve))
    def test_monotonic(self, curve):
        s = build_schedule(ramp_frames=16, curve=curve)
        for i in range(1, s.ramp_frames):
            assert s.x0_weights[i] <= s.x0_weights[i - 1] + 1e-9
            assert s.prompt_next[i] >= s.prompt_next[i - 1] - 1e-9
            assert s.prompt_bridge[i] <= s.prompt_bridge[i - 1] + 1e-9

    def test_ramp_too_small(self):
        with pytest.raises(ValueError):
            build_schedule(ramp_frames=MIN_RAMP_FRAMES - 1)

    def test_ramp_too_large(self):
        with pytest.raises(ValueError):
            build_schedule(ramp_frames=MAX_RAMP_FRAMES + 1)

    def test_single_frame_ramp_is_valid(self):
        s = build_schedule(ramp_frames=1, curve=PinCurve.LINEAR)
        assert s.ramp_frames == 1
        # single-frame: t=0 only, so curve is at head
        assert s.x0_weights[0] == pytest.approx(X0_HEAD)


class TestCurveShapes:
    def test_exp_drops_faster_than_linear_at_midpoint(self):
        exp = build_schedule(ramp_frames=16, curve=PinCurve.EXP)
        lin = build_schedule(ramp_frames=16, curve=PinCurve.LINEAR)
        mid = 16 // 2
        # exp decay is steeper early, so x0 at midpoint should be LOWER than linear
        assert exp.x0_weights[mid] < lin.x0_weights[mid]

    def test_cosine_softer_than_linear_at_quarter(self):
        cos = build_schedule(ramp_frames=16, curve=PinCurve.COSINE)
        lin = build_schedule(ramp_frames=16, curve=PinCurve.LINEAR)
        # cosine is slow at start, so x0 at 1/4 should be HIGHER than linear
        q = 16 // 4
        assert cos.x0_weights[q] > lin.x0_weights[q]


class TestInvariantsEnforced:
    def test_reject_non_monotonic_x0(self):
        with pytest.raises(ValueError, match="x0_weights"):
            PinSchedule(
                ramp_frames=3,
                curve=PinCurve.LINEAR,
                x0_weights=(0.5, 0.7, 0.3),  # not monotonic
                prompt_bridge=(0.5, 0.4, 0.3),
                prompt_next=(0.5, 0.6, 0.7),
            )

    def test_reject_text_not_sum_to_one(self):
        with pytest.raises(ValueError, match="prompt_bridge"):
            PinSchedule(
                ramp_frames=2,
                curve=PinCurve.LINEAR,
                x0_weights=(0.9, 0.5),
                prompt_bridge=(0.3, 0.2),
                prompt_next=(0.5, 0.7),  # 0.3+0.5=0.8, not 1.0
            )

    def test_reject_weight_out_of_range(self):
        with pytest.raises(ValueError, match="not in"):
            PinSchedule(
                ramp_frames=2,
                curve=PinCurve.LINEAR,
                x0_weights=(1.2, 0.5),  # >1.0
                prompt_bridge=(0.3, 0.2),
                prompt_next=(0.7, 0.8),
            )

    def test_reject_length_mismatch(self):
        with pytest.raises(ValueError, match="ramp_frames length"):
            PinSchedule(
                ramp_frames=3,
                curve=PinCurve.LINEAR,
                x0_weights=(0.9, 0.5),  # wrong length
                prompt_bridge=(0.3, 0.2, 0.1),
                prompt_next=(0.7, 0.8, 0.9),
            )


class TestLegacyHardPin:
    def test_hard_pin_frame_zero_only(self):
        s = legacy_hard_pin_schedule(ramp_frames=5)
        assert s.x0_weights[0] == 1.0
        assert all(w == 0.0 for w in s.x0_weights[1:])
        assert all(b == 0.0 for b in s.prompt_bridge)
        assert all(n == 1.0 for n in s.prompt_next)
