"""Unit tests for the spec-048 LTX-2 multi-scene helpers.

The GPU-bound orchestration (``run_multiscene``) is exercised by the
``smoke-ltxv2-multiscene`` GPU script — these tests cover the pure scene
specification, prompt composition, and conditioning-selection surface.
"""

from __future__ import annotations

import pytest

torch = pytest.importorskip("torch")

from ltx_video_worker import ltx2_multiscene as ms


def test_compose_scene_prompt_joins_parts_with_quality_suffix() -> None:
    prompt = ms._compose_scene_prompt(
        {"character": "a lone astronaut", "style": "noir"}, "walks forward"
    )
    assert prompt.startswith("a lone astronaut. walks forward. noir.")
    assert "stable motion, consistent lighting, sharp" in prompt


def test_compose_scene_prompt_falls_back_to_global_action() -> None:
    prompt = ms._compose_scene_prompt({"action": "global motion"}, "")
    assert "global motion" in prompt


def test_build_scene_specs_snaps_frame_counts_to_8n_plus_1() -> None:
    plan = {
        "segments": [
            {"index": 0, "frame_count": 105, "seed": 11, "action_prompt": "a"},
            {"index": 1, "frame_count": 100, "seed": 22, "action_prompt": "b"},
        ]
    }
    specs = ms._build_scene_specs(plan, {"num_frames": 105})
    assert len(specs) == 2
    for spec in specs:
        assert (spec["num_frames"] - 1) % 8 == 0
    assert specs[0]["seed"] == 11
    assert specs[1]["action_prompt"] == "b"


def test_build_scene_specs_empty_when_no_segments() -> None:
    assert ms._build_scene_specs({}, {"num_frames": 105}) == []


def test_scene_geometry_overrides_frame_count_only() -> None:
    base = {"width": 768, "height": 512, "num_frames": 105, "frame_rate": 16}
    scene = ms._scene_geometry(base, 57)
    assert scene["num_frames"] == 57
    assert scene["width"] == 768
    assert base["num_frames"] == 105


def test_scene_0_conditioning_uses_keyframe_per_stage() -> None:
    kf_stage1, kf_stage2 = object(), object()
    stage1, stage2 = ms._scene_conditioning(
        0, kf_stage1, kf_stage2, None, 0.5
    )
    assert stage1 == [kf_stage1]
    assert stage2 == [kf_stage2]


def test_scene_0_conditioning_empty_without_keyframe() -> None:
    stage1, stage2 = ms._scene_conditioning(0, None, None, None, 0.5)
    assert stage1 == []
    assert stage2 == []


def test_continuation_scene_carries_tail_only() -> None:
    from ltx_core.conditioning.types.latent_cond import VideoConditionByLatentIndex

    tail = torch.randn(1, 128, 2, 4, 6)
    stage1, stage2 = ms._scene_conditioning(1, None, None, tail, 0.5)
    # Continuation scene carries exactly one condition — the soft tail.
    assert len(stage1) == 1
    assert stage2 == []
    assert isinstance(stage1[0], VideoConditionByLatentIndex)
    assert stage1[0].latent_idx == 0
    assert stage1[0].latent is tail
    assert stage1[0].strength == 0.5


def test_default_continuation_strength_is_soft() -> None:
    # Guard against regressing to the hard near-clean pin.
    assert ms._DEF_CONTINUATION_STRENGTH == 0.5
    assert ms._DEF_CONTINUATION_STRENGTH < 0.9
