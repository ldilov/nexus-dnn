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


def test_scene_0_conditioning_uses_keyframe_only() -> None:
    sentinel = object()
    items = ms._scene_conditioning(0, sentinel, None, None, 0.5, True)
    assert items == [sentinel]


def test_scene_0_conditioning_empty_without_keyframe() -> None:
    assert ms._scene_conditioning(0, None, None, None, 0.5, True) == []


def test_continuation_scene_carries_tail_and_global_anchor() -> None:
    tail = torch.randn(1, 128, 3, 4, 6)
    anchor = torch.randn(1, 128, 1, 4, 6)
    with_anchor = ms._scene_conditioning(1, None, tail, anchor, 0.5, True)
    assert len(with_anchor) == 2
    no_anchor = ms._scene_conditioning(1, None, tail, anchor, 0.5, False)
    assert len(no_anchor) == 1
