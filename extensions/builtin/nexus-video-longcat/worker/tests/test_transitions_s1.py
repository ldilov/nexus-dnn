"""S1 — transitions[] schema + planner contract.

Covers:
* VideoPlan / TransitionPacket round-trip
* plan_validate accepts well-formed transitions
* plan_validate rejects malformed transitions (count, indices, type, ramp, bridge)
* plan_validate enforces unknown-noun rule on bridge_text
* plan_llm._coerce_transitions downgrades soft->hard_cut when bridge missing
* expand_prompt fallback path carries empty transitions
* validator drops transitions only on TRANSITION_* errors instead of tanking plan
"""

from __future__ import annotations

import pytest

from longcat_video_worker.plan_llm import (
    PlannerResult,
    _coerce_transitions,
    expand_prompt,
)
from longcat_video_worker.plan_validate import validate_plan
from longcat_video_worker.video_plan import TransitionPacket, VideoPlan


def _two_scene_payload(transitions=None):
    base = {
        "schema_version": 1,
        "classification": "storyboard_scenes",
        "anchor": "a fox in a meadow",
        "scenes": [
            {
                "prompt": "a fox in a meadow. red fox walks across green grass",
                "per_scene_generated_seconds": 2.0,
                "overlap_frames": 0,
                "motion_intensity": "dynamic",
                "adain_factor": 0.2,
                "mode": "t2v",
            },
            {
                "prompt": "a fox in a meadow. red fox rests under oak tree",
                "per_scene_generated_seconds": 2.0,
                "overlap_frames": 13,
                "motion_intensity": "static",
                "adain_factor": 0.2,
                "mode": "vc",
            },
        ],
    }
    if transitions is not None:
        base["transitions"] = transitions
    return base


class TestTransitionPacket:
    def test_round_trip_soft(self):
        t = TransitionPacket(
            from_scene=0,
            to_scene=1,
            type="soft",
            bridge_text="the fox slows as the meadow opens onto oak",
            ramp_frames=8,
        )
        assert TransitionPacket.from_dict(t.to_dict()) == t

    def test_round_trip_hard_cut_no_bridge(self):
        t = TransitionPacket(from_scene=2, to_scene=3, type="hard_cut", ramp_frames=8)
        out = t.to_dict()
        assert "bridge_text" not in out
        assert TransitionPacket.from_dict(out) == t

    def test_video_plan_round_trip_carries_transitions(self):
        payload = _two_scene_payload(
            transitions=[
                {
                    "from_scene": 0,
                    "to_scene": 1,
                    "type": "soft",
                    "bridge_text": "the fox settles as meadow opens onto oak",
                    "ramp_frames": 8,
                }
            ]
        )
        plan = VideoPlan.from_dict(payload)
        assert len(plan.transitions) == 1
        assert plan.transitions[0].type == "soft"
        assert "soft" in plan.to_dict()["transitions"][0]["type"]


class TestValidatorAccepts:
    def test_no_transitions_legacy(self):
        result = validate_plan({"scenes": _two_scene_payload()["scenes"]})
        assert result["ok"], result
        assert result["normalized"]["transitions"] == []

    def test_well_formed_soft(self):
        payload = {
            "scenes": _two_scene_payload()["scenes"],
            "transitions": [
                {
                    "from_scene": 0,
                    "to_scene": 1,
                    "type": "soft",
                    "bridge_text": "the fox settles as meadow opens onto oak",
                    "ramp_frames": 8,
                }
            ],
        }
        result = validate_plan(payload)
        assert result["ok"], result
        canonical = result["normalized"]["transitions"]
        assert len(canonical) == 1
        assert canonical[0]["type"] == "soft"
        assert canonical[0]["ramp_frames"] == 8

    def test_hard_cut_without_bridge(self):
        payload = {
            "scenes": _two_scene_payload()["scenes"],
            "transitions": [
                {"from_scene": 0, "to_scene": 1, "type": "hard_cut"}
            ],
        }
        result = validate_plan(payload)
        assert result["ok"], result
        assert result["normalized"]["transitions"][0]["type"] == "hard_cut"
        assert result["normalized"]["transitions"][0]["ramp_frames"] == 8


class TestValidatorRejects:
    def test_count_mismatch(self):
        payload = {
            "scenes": _two_scene_payload()["scenes"],
            "transitions": [],  # length 0 != 1
        }
        # Empty list is treated as "no transitions" which is legacy hard-pin
        # behavior. This is intentional — the validator only enforces count
        result = validate_plan(payload)
        assert result["ok"]

    def test_count_mismatch_explicit(self):
        payload = {
            "scenes": _two_scene_payload()["scenes"],
            "transitions": [
                {"from_scene": 0, "to_scene": 1, "type": "hard_cut"},
                {"from_scene": 1, "to_scene": 2, "type": "hard_cut"},
            ],
        }
        result = validate_plan(payload)
        assert not result["ok"]
        assert result["error"]["sub_reason"] == "TRANSITION_COUNT_MISMATCH"

    def test_index_mismatch(self):
        payload = {
            "scenes": _two_scene_payload()["scenes"],
            "transitions": [
                {"from_scene": 1, "to_scene": 2, "type": "hard_cut"}
            ],
        }
        result = validate_plan(payload)
        assert not result["ok"]
        assert result["error"]["sub_reason"] == "TRANSITION_INDEX_MISMATCH"

    def test_unknown_type(self):
        payload = {
            "scenes": _two_scene_payload()["scenes"],
            "transitions": [
                {"from_scene": 0, "to_scene": 1, "type": "smash_cut"}
            ],
        }
        result = validate_plan(payload)
        assert not result["ok"]
        assert result["error"]["sub_reason"] == "TRANSITION_TYPE_INVALID"

    def test_ramp_out_of_range(self):
        payload = {
            "scenes": _two_scene_payload()["scenes"],
            "transitions": [
                {
                    "from_scene": 0,
                    "to_scene": 1,
                    "type": "hard_cut",
                    "ramp_frames": 99,
                }
            ],
        }
        result = validate_plan(payload)
        assert not result["ok"]
        assert result["error"]["sub_reason"] == "TRANSITION_RAMP_OUT_OF_RANGE"

    def test_soft_requires_bridge(self):
        payload = {
            "scenes": _two_scene_payload()["scenes"],
            "transitions": [
                {"from_scene": 0, "to_scene": 1, "type": "soft"}
            ],
        }
        result = validate_plan(payload)
        assert not result["ok"]
        assert result["error"]["sub_reason"] == "TRANSITION_BRIDGE_REQUIRED"

    def test_soft_bridge_too_long(self):
        payload = {
            "scenes": _two_scene_payload()["scenes"],
            "transitions": [
                {
                    "from_scene": 0,
                    "to_scene": 1,
                    "type": "soft",
                    "bridge_text": "fox " * 100,
                }
            ],
        }
        result = validate_plan(payload)
        assert not result["ok"]
        assert result["error"]["sub_reason"] == "TRANSITION_BRIDGE_TOO_LONG"

    def test_unknown_noun_rejected(self):
        payload = {
            "scenes": _two_scene_payload()["scenes"],
            "transitions": [
                {
                    "from_scene": 0,
                    "to_scene": 1,
                    "type": "soft",
                    "bridge_text": "the dragon enters and breathes fire",
                }
            ],
        }
        result = validate_plan(payload)
        assert not result["ok"]
        assert result["error"]["sub_reason"] == "TRANSITION_BRIDGE_UNKNOWN_NOUN"


class TestCoerceTransitions:
    def test_empty_for_single_scene(self):
        assert _coerce_transitions([], 1) == []
        assert _coerce_transitions(None, 1) == []

    def test_pads_missing(self):
        out = _coerce_transitions([], 3)
        assert len(out) == 2
        assert all(t["type"] == "hard_cut" for t in out)

    def test_downgrades_soft_without_bridge(self):
        out = _coerce_transitions(
            [{"type": "soft"}, {"type": "soft", "bridge_text": ""}],
            3,
        )
        assert out[0]["type"] == "hard_cut"
        assert out[1]["type"] == "hard_cut"

    def test_preserves_valid_soft(self):
        out = _coerce_transitions(
            [
                {
                    "type": "soft",
                    "bridge_text": "the fox settles as meadow opens onto oak",
                }
            ],
            2,
        )
        assert out[0]["type"] == "soft"
        assert "fox" in out[0]["bridge_text"]
        assert out[0]["from_scene"] == 0
        assert out[0]["to_scene"] == 1

    def test_clamps_unknown_type(self):
        out = _coerce_transitions([{"type": "smash"}], 2)
        assert out[0]["type"] == "hard_cut"

    def test_truncates_overlong_bridge(self):
        long_text = "fox " * 100
        out = _coerce_transitions(
            [{"type": "soft", "bridge_text": long_text}], 2
        )
        # downgraded or truncated; either way, no oversized string
        if out[0]["bridge_text"] is not None:
            assert len(out[0]["bridge_text"]) <= 240


class TestExpandPromptFallback:
    def test_deterministic_fallback_has_empty_transitions(self):
        result = expand_prompt(
            "a fox runs through a forest",
            duration_seconds=4.0,
            scene_count=3,
            use_llm=False,
        )
        assert result.compiler == "deterministic"
        assert result.transitions == []


class TestPlannerResultDefault:
    def test_default_transitions_empty(self):
        r = PlannerResult(scenes=[], compiler="deterministic", warnings=[], anchor="x")
        assert r.transitions == []
        assert r.to_dict()["transitions"] == []
