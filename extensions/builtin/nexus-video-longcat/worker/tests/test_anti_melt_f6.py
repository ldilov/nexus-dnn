"""F6 — anti-melt fixes.

Covers:
* _bump_icn_for_soft scales delta down for intense motion.
* _augment_negative_prompt appends anti-melt tokens only on intense+distill.
* _augment_negative_prompt is idempotent (tokens already in operator's
  negative_prompt are not duplicated).
* _run_scene_loop refinement step cap (_INTENSE_REFINE_STEPS_CAP) triggers
  only when scene.motion_intensity == "intense" AND requested steps exceed cap.
* End-to-end: an intense+distill+soft scene gets the augmented negative
  prompt threaded into generate_vc kwargs.
"""

from __future__ import annotations

from typing import Any

import numpy as np
import pytest

from longcat_video_worker.pipeline_longcat import (
    LongCatRenderRequest,
    Scene,
    Transition,
    _ANTI_MELT_NEGATIVE_TOKENS,
    _augment_negative_prompt,
    _bump_icn_for_soft,
    _ICN_CEILING,
    _INTENSE_ICN_DELTA_SCALE,
    _INTENSE_REFINE_STEPS_CAP,
    _SOFT_TRANSITION_ICN_DELTA,
)


class TestBumpIcnMotionAware:
    def test_dynamic_default_unchanged(self):
        out = _bump_icn_for_soft(0.15, "dynamic")
        assert out == pytest.approx(0.15 + _SOFT_TRANSITION_ICN_DELTA)

    def test_static_treated_as_dynamic(self):
        # only intense triggers the scale-down; static gets the full bump
        out = _bump_icn_for_soft(0.15, "static")
        assert out == pytest.approx(0.15 + _SOFT_TRANSITION_ICN_DELTA)

    def test_intense_scales_delta_down(self):
        scaled = _SOFT_TRANSITION_ICN_DELTA * _INTENSE_ICN_DELTA_SCALE
        out = _bump_icn_for_soft(0.15, "intense")
        assert out == pytest.approx(0.15 + scaled)
        # the new value MUST be lower than the unscaled bump
        assert out < _bump_icn_for_soft(0.15, "dynamic")

    def test_intense_still_caps_at_ceiling(self):
        out = _bump_icn_for_soft(0.30, "intense")
        assert out == _ICN_CEILING

    def test_no_arg_defaults_to_dynamic(self):
        assert _bump_icn_for_soft(0.10) == _bump_icn_for_soft(0.10, "dynamic")


class TestAugmentNegativePrompt:
    """F7: always-inject. Motion+distill gates dropped; tokens are appended
    on every scene regardless of motion_intensity / use_distill."""

    def test_always_appends_regardless_of_motion(self):
        for motion in ("static", "dynamic", "intense"):
            out = _augment_negative_prompt("blurry", motion, True)
            for token in _ANTI_MELT_NEGATIVE_TOKENS:
                assert token in out, f"missing {token!r} on motion={motion}"

    def test_always_appends_regardless_of_distill(self):
        for distill in (True, False):
            out = _augment_negative_prompt("blurry", "intense", distill)
            for token in _ANTI_MELT_NEGATIVE_TOKENS:
                assert token in out, f"missing {token!r} on distill={distill}"

    def test_appends_anti_melt_tokens(self):
        out = _augment_negative_prompt("blurry, low quality", "intense", True)
        assert "blurry, low quality" in out
        for token in _ANTI_MELT_NEGATIVE_TOKENS:
            assert token in out

    def test_empty_base_negative_still_augments(self):
        out = _augment_negative_prompt(None)
        assert out is not None
        for token in _ANTI_MELT_NEGATIVE_TOKENS:
            assert token in out

    def test_idempotent_no_duplicate_tokens(self):
        seeded = ", ".join(_ANTI_MELT_NEGATIVE_TOKENS[:3])
        out = _augment_negative_prompt(seeded, "intense", True)
        for token in _ANTI_MELT_NEGATIVE_TOKENS[:3]:
            assert out.lower().count(token.lower()) == 1

    def test_default_args_work(self):
        # Callers can pass just the prompt; signature kwargs default safely
        out = _augment_negative_prompt("blurry")
        for token in _ANTI_MELT_NEGATIVE_TOKENS:
            assert token in out


class _FakePipe:
    def __init__(self) -> None:
        self.calls: list[dict[str, Any]] = []

    def _clear_cache(self) -> None:
        return None

    def generate_vc(self, **kw: Any) -> Any:
        self.calls.append({k: v for k, v in kw.items() if k != "video"})
        return np.full((kw["num_frames"], 16, 16, 3), 128, dtype=np.uint8)


class _FakeState:
    def __init__(self, pipe: Any) -> None:
        self.pipeline = pipe
        self.device = "cpu"
        self.compute_dtype = None
        self.lora_network = None


def _build(scenes, transitions, *, base_neg="blurry, low quality"):
    return LongCatRenderRequest(
        mode="t2v",
        prompt=scenes[0].prompt,
        negative_prompt=base_neg,
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
        adain_factor=0.0,
        apply_refinement=False,
    )


class TestSceneLoopIntegration:
    def test_intense_scene_receives_augmented_negative_prompt(self):
        from longcat_video_worker import pipeline_longcat as plc

        scenes = [
            Scene(prompt="scene one", overlap_frames=3, duration_seconds=1.5,
                  motion_intensity="dynamic"),
            Scene(prompt="scene two", overlap_frames=3, duration_seconds=1.5,
                  motion_intensity="intense"),
        ]
        ts = [Transition(from_scene=0, to_scene=1, type="soft",
                         bridge_text="continues onward")]
        pipe = _FakePipe()
        state = _FakeState(pipe)
        primary = np.full((20, 16, 16, 3), 64, dtype=np.uint8)
        plc._run_scene_loop(
            primary_frames=primary,
            request=_build(scenes, ts),
            state=state,
            generator=None,
            attn_kwargs={},
            host_data_dir=None,
            strict_scene_errors=True,
        )
        neg = pipe.calls[0]["negative_prompt"]
        assert "blurry" in neg  # operator's text preserved
        for token in _ANTI_MELT_NEGATIVE_TOKENS:
            assert token in neg

    def test_dynamic_scene_also_gets_augmented_negative_prompt(self):
        """F7: always-inject — dynamic scenes get the anti-melt tokens too."""
        from longcat_video_worker import pipeline_longcat as plc

        scenes = [
            Scene(prompt="scene one", overlap_frames=3, duration_seconds=1.5,
                  motion_intensity="dynamic"),
            Scene(prompt="scene two", overlap_frames=3, duration_seconds=1.5,
                  motion_intensity="dynamic"),
        ]
        ts = [Transition(from_scene=0, to_scene=1, type="soft",
                         bridge_text="continues onward")]
        pipe = _FakePipe()
        state = _FakeState(pipe)
        primary = np.full((20, 16, 16, 3), 64, dtype=np.uint8)
        plc._run_scene_loop(
            primary_frames=primary,
            request=_build(scenes, ts),
            state=state,
            generator=None,
            attn_kwargs={},
            host_data_dir=None,
            strict_scene_errors=True,
        )
        neg = pipe.calls[0]["negative_prompt"]
        assert "blurry" in neg
        for token in _ANTI_MELT_NEGATIVE_TOKENS:
            assert token in neg

    def test_intense_scene_icn_uses_scaled_delta(self):
        from longcat_video_worker import pipeline_longcat as plc

        scenes = [
            Scene(prompt="scene one", overlap_frames=3, duration_seconds=1.5,
                  motion_intensity="dynamic"),
            Scene(prompt="scene two", overlap_frames=3, duration_seconds=1.5,
                  motion_intensity="intense"),
        ]
        ts = [Transition(from_scene=0, to_scene=1, type="soft",
                         bridge_text="continues onward")]
        pipe = _FakePipe()
        state = _FakeState(pipe)
        primary = np.full((20, 16, 16, 3), 64, dtype=np.uint8)
        plc._run_scene_loop(
            primary_frames=primary,
            request=_build(scenes, ts),
            state=state,
            generator=None,
            attn_kwargs={},
            host_data_dir=None,
            strict_scene_errors=True,
        )
        # intense scene ICN = 0.15 + 0.05*0.4 = 0.17 (not the 0.20 dynamic gets)
        expected = 0.15 + _SOFT_TRANSITION_ICN_DELTA * _INTENSE_ICN_DELTA_SCALE
        assert pipe.calls[0]["image_cond_noise_scale"] == pytest.approx(expected)


class TestRefineCapConstant:
    def test_cap_value_is_sane(self):
        # Cap must be > 0 and well under the request default refinement_steps
        # (12 per LongCatRenderRequest default) to actually fire on the
        assert 0 < _INTENSE_REFINE_STEPS_CAP < 12
