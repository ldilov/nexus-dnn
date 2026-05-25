from __future__ import annotations

import dataclasses

from longcat_video_worker.pipeline_longcat import LongCatRenderRequest, Scene


def test_scene_defaults_per_locked_design() -> None:
    s = Scene(prompt="a")
    assert s.duration_seconds == 4.0
    assert s.per_scene_generated_seconds == 4.0
    assert s.overlap_frames == 13
    assert s.adain_factor is None
    assert s.mode == "auto"
    assert s.motion_intensity == "dynamic"
    assert s.image_path is None
    assert s.seed_offset is None


def test_scene_duration_alias_populates_per_scene_generated_seconds() -> None:
    s = Scene(prompt="a", duration_seconds=3.5)
    assert s.duration_seconds == 3.5
    assert s.per_scene_generated_seconds == 3.5


def test_scene_per_scene_generated_seconds_overrides_alias() -> None:
    s = Scene(prompt="a", per_scene_generated_seconds=2.0)
    assert s.per_scene_generated_seconds == 2.0
    assert s.duration_seconds == 2.0


def test_scene_all_optional_knobs_settable() -> None:
    s = Scene(
        prompt="a",
        negative_prompt="bad",
        mode="t2v",
        image_path=None,
        per_scene_generated_seconds=2.0,
        overlap_frames=13,
        enhance_hf=False,
        adain_factor=0.2,
        use_distill=True,
        guidance_scale=3.5,
        num_inference_steps=30,
        image_cond_noise_scale=0.15,
        motion_intensity="intense",
        seed_offset=42,
        apply_refinement=True,
        refinement_steps=3,
        refinement_guidance=3.5,
        refinement_spatial_only=True,
    )
    assert s.negative_prompt == "bad"
    assert s.use_distill is True
    assert s.motion_intensity == "intense"
    assert s.seed_offset == 42


def test_scene_frozen() -> None:
    s = Scene(prompt="a")
    try:
        s.prompt = "b"
    except dataclasses.FrozenInstanceError:
        return
    assert False, "Scene must remain frozen=True"


def test_scene_no_clamp_in_dataclass() -> None:
    s = Scene(prompt="a", adain_factor=99.0, guidance_scale=99.0, num_inference_steps=9999)
    assert s.adain_factor == 99.0
    assert s.guidance_scale == 99.0
    assert s.num_inference_steps == 9999


def test_request_has_image_cond_noise_scale_default() -> None:
    r = LongCatRenderRequest(mode="t2v", prompt="a")
    assert r.image_cond_noise_scale == 0.15


def test_request_has_force_refine_with_upscale_default() -> None:
    r = LongCatRenderRequest(mode="t2v", prompt="a")
    assert r.force_refine_with_upscale is False


def test_request_image_cond_noise_scale_override() -> None:
    r = LongCatRenderRequest(mode="t2v", prompt="a", image_cond_noise_scale=0.25)
    assert r.image_cond_noise_scale == 0.25
