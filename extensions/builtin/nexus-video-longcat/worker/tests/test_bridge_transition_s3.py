"""S3 — bridge-text composition + soft-transition ICN bump.

Covers:
* _compose_bridged_prompt prepends bridge sentence, falls back when bridge
  is None/empty.
* _bump_icn_for_soft caps at the ICN ceiling.
* _resolve_transition returns correct entry per scene index, None for
  boundary 0 / out-of-range / absent transitions array.
* _parse_transition coerces canonical validator output, unknown type
  downgrades to hard_cut.
* _run_scene_loop applies bridged prompt + bumped ICN ONLY when
  transition.type == 'soft', preserves legacy path for hard_cut / no
  transition; verified via a fake generate_vc that records call kwargs.
"""

from __future__ import annotations

from typing import Any

import numpy as np
import pytest

from longcat_video_worker.pipeline_longcat import (
    LongCatRenderRequest,
    Scene,
    Transition,
    _bump_icn_for_soft,
    _compose_bridged_prompt,
    _ICN_CEILING,
    _parse_transition,
    _resolve_transition,
    _SOFT_TRANSITION_ICN_DELTA,
)


class TestComposeBridgedPrompt:
    def test_returns_scene_prompt_when_bridge_empty(self):
        assert _compose_bridged_prompt("a fox runs", None) == "a fox runs"
        assert _compose_bridged_prompt("a fox runs", "") == "a fox runs"
        assert _compose_bridged_prompt("a fox runs", "   ") == "a fox runs"

    def test_prepends_bridge_sentence(self):
        out = _compose_bridged_prompt(
            "red fox rests under oak",
            "the fox slows as meadow opens onto oak",
        )
        assert out == "the fox slows as meadow opens onto oak. red fox rests under oak"

    def test_strips_trailing_period_on_bridge(self):
        out = _compose_bridged_prompt(
            "red fox rests under oak",
            "the fox slows.",
        )
        assert out == "the fox slows. red fox rests under oak"

    def test_clamps_overlong_bridge(self):
        long_bridge = "x" * 400
        out = _compose_bridged_prompt("scene prompt", long_bridge)
        assert "scene prompt" in out
        # bridge portion is clamped to <= 280 chars
        bridge_portion = out.rsplit(". scene prompt", 1)[0]
        assert len(bridge_portion) <= 280


class TestBumpIcnForSoft:
    def test_adds_delta(self):
        assert _bump_icn_for_soft(0.15) == pytest.approx(0.15 + _SOFT_TRANSITION_ICN_DELTA)

    def test_caps_at_ceiling(self):
        assert _bump_icn_for_soft(0.30) == _ICN_CEILING
        assert _bump_icn_for_soft(0.50) == _ICN_CEILING

    def test_low_baseline_bumps_normally(self):
        out = _bump_icn_for_soft(0.05)
        assert out == pytest.approx(0.10)
        assert out <= _ICN_CEILING


class TestResolveTransition:
    def _ts(self):
        return [
            Transition(from_scene=0, to_scene=1, type="soft", bridge_text="bridge a"),
            Transition(from_scene=1, to_scene=2, type="hard_cut"),
        ]

    def test_none_for_scene_zero(self):
        assert _resolve_transition(self._ts(), 0) is None

    def test_none_when_absent(self):
        assert _resolve_transition(None, 1) is None
        assert _resolve_transition([], 1) is None

    def test_indexes_correctly(self):
        ts = self._ts()
        assert _resolve_transition(ts, 1) is ts[0]
        assert _resolve_transition(ts, 2) is ts[1]

    def test_out_of_range_returns_none(self):
        assert _resolve_transition(self._ts(), 5) is None


class TestParseTransition:
    def test_canonical_soft(self):
        t = _parse_transition(
            {
                "from_scene": 0,
                "to_scene": 1,
                "type": "soft",
                "bridge_text": "the fox slows",
                "ramp_frames": 8,
            }
        )
        assert t.type == "soft"
        assert t.bridge_text == "the fox slows"
        assert t.ramp_frames == 8
        assert t.from_scene == 0 and t.to_scene == 1

    def test_unknown_type_downgrades(self):
        t = _parse_transition({"from_scene": 0, "to_scene": 1, "type": "smash"})
        assert t.type == "hard_cut"

    def test_bridge_non_string_dropped(self):
        t = _parse_transition(
            {"from_scene": 0, "to_scene": 1, "type": "soft", "bridge_text": 42}
        )
        assert t.bridge_text is None

    def test_defaults(self):
        t = _parse_transition({"from_scene": 0, "to_scene": 1})
        assert t.type == "hard_cut"
        assert t.ramp_frames == 8
        assert t.bridge_text is None


class _FakePipeline:
    """Records every generate_vc call. Returns deterministic dummy frames."""

    def __init__(self, frame_shape=(20, 16, 16, 3)) -> None:
        self.calls: list[dict[str, Any]] = []
        self._frame_shape = frame_shape

    def _clear_cache(self) -> None:
        return None

    def generate_vc(self, **kwargs: Any) -> Any:
        self.calls.append({k: v for k, v in kwargs.items() if k != "video"})
        # Return one frame more than overlap so the loop accepts the clip
        n = kwargs["num_frames"]
        return np.full(
            (n, *self._frame_shape[1:]), 128, dtype=np.uint8
        )


class _FakeState:
    def __init__(self, pipeline: _FakePipeline) -> None:
        self.pipeline = pipeline
        # device only consulted for generator; we pass generator=None below.
        self.device = "cpu"
        self.compute_dtype = None
        # _set_distill_active short-circuits when lora_network is None.
        self.lora_network = None


def _make_request(transitions=None) -> LongCatRenderRequest:
    scenes = [
        Scene(prompt="scene one prompt", overlap_frames=5, duration_seconds=2.0),
        Scene(prompt="scene two prompt", overlap_frames=5, duration_seconds=2.0),
        Scene(prompt="scene three prompt", overlap_frames=5, duration_seconds=2.0),
    ]
    return LongCatRenderRequest(
        mode="t2v",
        prompt="scene one prompt",
        height=480,
        width=832,
        num_frames=20,
        num_inference_steps=4,
        guidance_scale=1.0,
        use_distill=True,
        seed=42,
        scenes=scenes,
        transitions=transitions,
        image_cond_noise_scale=0.15,
    )


def _run_loop(request, primary_frames=None):
    from longcat_video_worker import pipeline_longcat as plc

    fake_pipe = _FakePipeline()
    state = _FakeState(fake_pipe)
    if primary_frames is None:
        primary_frames = np.full((20, 16, 16, 3), 64, dtype=np.uint8)
    plc._run_scene_loop(
        primary_frames=primary_frames,
        request=request,
        state=state,
        generator=None,
        attn_kwargs={},
        host_data_dir=None,
        strict_scene_errors=True,
    )
    return fake_pipe.calls


class TestSceneLoopWiring:
    def test_no_transitions_preserves_legacy_path(self):
        calls = _run_loop(_make_request(transitions=None))
        assert len(calls) == 2
        # Each generate_vc must receive the unbridged scene prompt + default ICN.
        assert calls[0]["prompt"] == "scene two prompt"
        assert calls[1]["prompt"] == "scene three prompt"
        for c in calls:
            assert c["image_cond_noise_scale"] == pytest.approx(0.15)

    def test_hard_cut_transitions_preserve_legacy_path(self):
        ts = [
            Transition(from_scene=0, to_scene=1, type="hard_cut"),
            Transition(from_scene=1, to_scene=2, type="hard_cut"),
        ]
        calls = _run_loop(_make_request(transitions=ts))
        assert calls[0]["prompt"] == "scene two prompt"
        assert calls[1]["prompt"] == "scene three prompt"
        for c in calls:
            assert c["image_cond_noise_scale"] == pytest.approx(0.15)

    def test_soft_transition_bridges_prompt_and_bumps_icn(self):
        ts = [
            Transition(
                from_scene=0,
                to_scene=1,
                type="soft",
                bridge_text="the camera continues onto the next beat",
            ),
            Transition(from_scene=1, to_scene=2, type="hard_cut"),
        ]
        calls = _run_loop(_make_request(transitions=ts))
        # First boundary is soft: prompt includes bridge text + scene prompt.
        assert calls[0]["prompt"].startswith("the camera continues onto the next beat")
        assert "scene two prompt" in calls[0]["prompt"]
        assert calls[0]["image_cond_noise_scale"] == pytest.approx(
            0.15 + _SOFT_TRANSITION_ICN_DELTA
        )
        # Second boundary hard_cut: untouched.
        assert calls[1]["prompt"] == "scene three prompt"
        assert calls[1]["image_cond_noise_scale"] == pytest.approx(0.15)

    def test_soft_transition_with_empty_bridge_does_not_blow_up(self):
        # _coerce_transitions in plan_llm would downgrade this to hard_cut,
        # but if a caller hand-builds a soft transition with empty bridge,
        ts = [
            Transition(from_scene=0, to_scene=1, type="soft", bridge_text=""),
            Transition(from_scene=1, to_scene=2, type="hard_cut"),
        ]
        calls = _run_loop(_make_request(transitions=ts))
        assert calls[0]["prompt"] == "scene two prompt"
        # ICN is still bumped because type=='soft' regardless of bridge.
        assert calls[0]["image_cond_noise_scale"] == pytest.approx(
            0.15 + _SOFT_TRANSITION_ICN_DELTA
        )
