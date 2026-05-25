from __future__ import annotations

import os
import tempfile
from pathlib import Path

import pytest

from longcat_video_worker.plan_validate import (
    quantize_frames,
    validate_plan,
)


def _scene(prompt: str = "a cat", **kw) -> dict:
    base = {"prompt": prompt}
    base.update(kw)
    return base


def test_happy_path_single_scene() -> None:
    out = validate_plan({"scenes": [_scene(per_scene_generated_seconds=4.0)]})
    assert out["ok"] is True
    norm = out["normalized"]
    assert norm["fps"] == 24
    assert norm["scenes"][0]["mode"] == "t2v"
    assert norm["scenes"][0]["num_frames"] == 93
    assert norm["estimated_duration_seconds"] > 0
    assert out["warnings"] == []


def test_empty_scenes_list() -> None:
    out = validate_plan({"scenes": []})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "EMPTY_SCENES"


def test_scenes_missing_key() -> None:
    out = validate_plan({})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "EMPTY_SCENES"


def test_prompt_empty() -> None:
    out = validate_plan({"scenes": [{"prompt": ""}]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "PROMPT_EMPTY"
    assert out["error"]["scene_index"] == 0


def test_prompt_whitespace_only() -> None:
    out = validate_plan({"scenes": [{"prompt": "   "}]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "PROMPT_EMPTY"


def test_duration_below_range() -> None:
    out = validate_plan({"scenes": [_scene(per_scene_generated_seconds=0.1)]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "DURATION_OUT_OF_RANGE"


def test_duration_above_range() -> None:
    out = validate_plan({"scenes": [_scene(per_scene_generated_seconds=20.0)]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "DURATION_OUT_OF_RANGE"


def test_total_duration_exceeds_limit() -> None:
    out = validate_plan({"scenes": [
        _scene("a", per_scene_generated_seconds=10.0),
        _scene("b", per_scene_generated_seconds=12.0, overlap_frames=0),
    ]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "TOTAL_DURATION_EXCEEDS_LIMIT"


def test_overlap_exceeds_frames() -> None:
    out = validate_plan({"scenes": [
        _scene("a", per_scene_generated_seconds=1.0),
        _scene("b", per_scene_generated_seconds=1.0, overlap_frames=999),
    ]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "OVERLAP_EXCEEDS_FRAMES"


def test_overlap_not_4n_plus_1() -> None:
    out = validate_plan({"scenes": [
        _scene("a", per_scene_generated_seconds=2.0),
        _scene("b", per_scene_generated_seconds=2.0, overlap_frames=10),
    ]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "OVERLAP_NOT_4N_PLUS_1"


def test_scene_zero_overlap_forced_to_zero() -> None:
    out = validate_plan({"scenes": [_scene(overlap_frames=37, per_scene_generated_seconds=4.0)]})
    assert out["ok"] is True
    assert out["normalized"]["scenes"][0]["overlap_frames"] == 0


def test_i2v_image_missing() -> None:
    out = validate_plan({"scenes": [_scene(mode="i2v")]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "I2V_IMAGE_MISSING"


def test_i2v_not_scene_zero() -> None:
    out = validate_plan({"scenes": [
        _scene("a", per_scene_generated_seconds=2.0),
        _scene("b", mode="i2v", per_scene_generated_seconds=2.0),
    ]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "I2V_NOT_SCENE_ZERO"


def test_i2v_mode_conflict_t2v_with_image(tmp_path: Path) -> None:
    p = tmp_path / "img.png"
    p.write_bytes(b"x")
    out = validate_plan({"scenes": [_scene(mode="t2v", image_path=str(p))]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "I2V_MODE_CONFLICT"


def test_i2v_mode_conflict_auto_with_image_and_cond_video(tmp_path: Path) -> None:
    img = tmp_path / "i.png"
    img.write_bytes(b"x")
    out = validate_plan({
        "scenes": [_scene(image_path=str(img))],
        "conditioning_video_path": "/tmp/cv.mp4",
    })
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "I2V_MODE_CONFLICT"


def test_auto_resolves_to_i2v_with_image(tmp_path: Path) -> None:
    img = tmp_path / "i.png"
    img.write_bytes(b"x")
    out = validate_plan({"scenes": [_scene(image_path=str(img))]})
    assert out["ok"] is True
    assert out["normalized"]["scenes"][0]["mode"] == "i2v"


def test_auto_resolves_to_t2v_no_image() -> None:
    out = validate_plan({"scenes": [_scene()]})
    assert out["ok"] is True
    assert out["normalized"]["scenes"][0]["mode"] == "t2v"


def test_auto_scene_n_resolves_to_vc() -> None:
    out = validate_plan({"scenes": [
        _scene("a", per_scene_generated_seconds=2.0),
        _scene("b", per_scene_generated_seconds=2.0),
    ]})
    assert out["ok"] is True
    assert out["normalized"]["scenes"][1]["mode"] == "vc"


def test_mode_invalid() -> None:
    out = validate_plan({"scenes": [_scene(mode="xyz")]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "MODE_INVALID"


def test_motion_intensity_invalid() -> None:
    out = validate_plan({"scenes": [_scene(motion_intensity="frantic")]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "MODE_INVALID"


def test_adain_out_of_range() -> None:
    out = validate_plan({"scenes": [_scene(adain_factor=1.5)]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "CLAMP_RANGE_VIOLATION"


def test_guidance_out_of_range() -> None:
    out = validate_plan({"scenes": [_scene(guidance_scale=10.0)]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "CLAMP_RANGE_VIOLATION"


def test_refinement_guidance_too_low() -> None:
    out = validate_plan({"scenes": [_scene(refinement_guidance=1.0)]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "REFINEMENT_GUIDANCE_TOO_LOW"


def test_duration_alias_emits_warning() -> None:
    out = validate_plan({"scenes": [_scene(duration_seconds=3.0)]})
    assert out["ok"] is True
    codes = [w["code"] for w in out["warnings"]]
    assert "DEPRECATED_FIELD_ALIAS" in codes


def test_adain_cumulative_drift_warning() -> None:
    out = validate_plan({"scenes": [
        _scene("a", per_scene_generated_seconds=1.0, adain_factor=0.3),
        _scene("b", per_scene_generated_seconds=1.0, adain_factor=0.3),
        _scene("c", per_scene_generated_seconds=1.0, adain_factor=0.3),
        _scene("d", per_scene_generated_seconds=1.0, adain_factor=0.3),
    ]})
    assert out["ok"] is True
    codes = [w["code"] for w in out["warnings"]]
    assert "ADAIN_CUMULATIVE_DRIFT" in codes


def test_distill_mix_melt_risk_warning() -> None:
    out = validate_plan({"scenes": [
        _scene("a", per_scene_generated_seconds=2.0, use_distill=True),
        _scene("b", per_scene_generated_seconds=2.0, use_distill=False),
    ]})
    assert out["ok"] is True
    codes = [w["code"] for w in out["warnings"]]
    assert "DISTILL_MIX_MELT_RISK" in codes


def test_refine_plus_upscale_warning() -> None:
    out = validate_plan({
        "scenes": [_scene()],
        "apply_refinement": True,
        "upscale_mode": "decoupled",
    })
    assert out["ok"] is True
    codes = [w["code"] for w in out["warnings"]]
    assert "REFINE_PLUS_UPSCALE_DOUBLE_SHARPEN" in codes


def test_refine_plus_upscale_suppressed_by_force_flag() -> None:
    out = validate_plan({
        "scenes": [_scene()],
        "apply_refinement": True,
        "upscale_mode": "decoupled",
        "force_refine_with_upscale": True,
    })
    assert out["ok"] is True
    codes = [w["code"] for w in out["warnings"]]
    assert "REFINE_PLUS_UPSCALE_DOUBLE_SHARPEN" not in codes


def test_vae_tile_seam_warning() -> None:
    out = validate_plan({
        "scenes": [_scene()],
        "target_width": 1280,
        "target_height": 720,
    })
    assert out["ok"] is True
    codes = [w["code"] for w in out["warnings"]]
    assert "VAE_TILE_SEAM_RISK" in codes


def test_image_cond_noise_low_warning() -> None:
    out = validate_plan({
        "scenes": [_scene()],
        "image_cond_noise_scale": 0.01,
    })
    assert out["ok"] is True
    codes = [w["code"] for w in out["warnings"]]
    assert "IMAGE_COND_NOISE_LOW" in codes


def test_distill_static_risk_warning() -> None:
    out = validate_plan({"scenes": [
        _scene("same", per_scene_generated_seconds=2.0, use_distill=True, guidance_scale=1.0),
        _scene("same", per_scene_generated_seconds=2.0, use_distill=True, guidance_scale=1.0),
        _scene("same", per_scene_generated_seconds=2.0, use_distill=True, guidance_scale=1.0),
    ]})
    assert out["ok"] is True
    codes = [w["code"] for w in out["warnings"]]
    assert "DISTILL_STATIC_RISK" in codes


def test_mode_switch_channel_warning(tmp_path: Path) -> None:
    img = tmp_path / "i.png"
    img.write_bytes(b"x")
    out = validate_plan({"scenes": [
        _scene("a", per_scene_generated_seconds=2.0, image_path=str(img)),
        _scene("b", per_scene_generated_seconds=2.0),
    ]})
    assert out["ok"] is True
    codes = [w["code"] for w in out["warnings"]]
    assert "MODE_SWITCH_CHANNEL" in codes


def test_quantize_frames_minimum_floor() -> None:
    assert quantize_frames(0.0) == 5
    assert quantize_frames(0.1) == 5


def test_quantize_frames_4n_plus_1() -> None:
    for s in [0.5, 1.0, 2.0, 4.0, 5.5, 8.0, 10.0]:
        nf = quantize_frames(s)
        assert (nf - 1) % 4 == 0


def test_normalized_per_scene_payload() -> None:
    out = validate_plan({"scenes": [
        _scene("a", per_scene_generated_seconds=2.0),
        _scene("b", per_scene_generated_seconds=2.0, overlap_frames=13),
    ]})
    assert out["ok"] is True
    per = out["normalized"]["per_scene"]
    assert len(per) == 2
    assert per[0]["num_frames"] > 0 and per[0]["fresh_seconds"] > 0
