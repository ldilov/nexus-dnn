from __future__ import annotations

from typing import Any

from longcat_video_worker.plan_validate import validate_plan
from longcat_video_worker.scene_failure import (
    SCENE_DECODE_FAILED,
    classify_scene_exception,
)


def _scene(prompt: str, **kw: Any) -> dict[str, Any]:
    base = {"prompt": prompt, "per_scene_generated_seconds": 4.0}
    base.update(kw)
    return base


def test_value_error_decode_classified_as_decode_failed() -> None:
    exc = ValueError("vae.decode shape mismatch on tensor")
    assert classify_scene_exception(exc) == SCENE_DECODE_FAILED


def test_validator_rejects_overlap_zero_for_non_zero_scene() -> None:
    out = validate_plan({"scenes": [
        _scene("a"),
        _scene("b", overlap_frames=0),
    ]})
    assert out["ok"] is False
    assert out["error"]["sub_reason"] == "OVERLAP_EXCEEDS_FRAMES"


def test_adain_drift_warning_ignores_scene_zero() -> None:
    out = validate_plan({"scenes": [
        _scene("a", adain_factor=0.30),
        _scene("b", adain_factor=0.10),
        _scene("c", adain_factor=0.10),
        _scene("d", adain_factor=0.10),
    ]})
    assert out["ok"] is True
    codes = [w["code"] for w in out["warnings"]]
    assert "ADAIN_CUMULATIVE_DRIFT" not in codes


def test_adain_drift_warning_fires_when_later_scenes_breach() -> None:
    out = validate_plan({"scenes": [
        _scene("a", adain_factor=0.10),
        _scene("b", adain_factor=0.30),
        _scene("c", adain_factor=0.30),
        _scene("d", adain_factor=0.30),
    ]})
    assert out["ok"] is True
    codes = [w["code"] for w in out["warnings"]]
    assert "ADAIN_CUMULATIVE_DRIFT" in codes


def test_force_refinement_with_upscale_long_name_suppresses_warning() -> None:
    out = validate_plan({
        "scenes": [_scene("a"), _scene("b")],
        "apply_refinement": True,
        "upscale_mode": "rtx",
        "force_refinement_with_upscale": True,
    })
    assert out["ok"] is True
    codes = [w["code"] for w in out["warnings"]]
    assert "REFINE_PLUS_UPSCALE_DOUBLE_SHARPEN" not in codes


def test_force_refinement_with_upscale_short_alias_also_suppresses() -> None:
    out = validate_plan({
        "scenes": [_scene("a"), _scene("b")],
        "apply_refinement": True,
        "upscale_mode": "rtx",
        "force_refine_with_upscale": True,
    })
    codes = [w["code"] for w in out["warnings"]]
    assert "REFINE_PLUS_UPSCALE_DOUBLE_SHARPEN" not in codes


def test_force_refinement_with_upscale_absent_emits_warning() -> None:
    out = validate_plan({
        "scenes": [_scene("a"), _scene("b")],
        "apply_refinement": True,
        "upscale_mode": "rtx",
    })
    codes = [w["code"] for w in out["warnings"]]
    assert "REFINE_PLUS_UPSCALE_DOUBLE_SHARPEN" in codes
