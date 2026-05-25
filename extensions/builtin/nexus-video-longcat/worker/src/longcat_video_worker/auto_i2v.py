from __future__ import annotations

from typing import Any

from .plan_validate import (
    MODE_VALUES_SCENE_ZERO,
    ALL_MODES,
    PlanValidationError,
    _resolve_scene_n_mode,
    _resolve_scene_zero_mode,
    _validate_scene_zero_image_resolution,
)


def infer_mode(payload: dict[str, Any]) -> tuple[str, list[dict[str, Any]]]:
    scenes = payload.get("scenes")
    if not isinstance(scenes, list) or len(scenes) == 0:
        raise PlanValidationError("EMPTY_SCENES", "scenes[] must be non-empty")

    warnings: list[dict[str, Any]] = []
    resolved_modes: list[str] = []

    scene_zero = scenes[0] if isinstance(scenes[0], dict) else {}
    declared_zero = scene_zero.get("mode", "auto")
    has_scene_image, has_request_image, has_cond_video = _validate_scene_zero_image_resolution(
        payload, scene_zero
    )
    mode_zero = _resolve_scene_zero_mode(
        declared_zero, has_scene_image or has_request_image, has_cond_video
    )
    resolved_modes.append(mode_zero)

    for idx in range(1, len(scenes)):
        raw = scenes[idx] if isinstance(scenes[idx], dict) else {}
        declared = raw.get("mode", "auto")
        resolved_modes.append(_resolve_scene_n_mode(declared, idx))

    for idx in range(1, len(resolved_modes)):
        if resolved_modes[idx - 1] == "i2v" and resolved_modes[idx] == "vc":
            warnings.append(
                {
                    "code": "MODE_SWITCH_CHANNEL",
                    "scene_index": idx,
                    "detail": "i2v->vc transition; conditioning channel layout will be promoted",
                }
            )

    return resolved_modes[0], warnings


def infer_modes_all(payload: dict[str, Any]) -> tuple[list[str], list[dict[str, Any]]]:
    scenes = payload.get("scenes")
    if not isinstance(scenes, list) or len(scenes) == 0:
        raise PlanValidationError("EMPTY_SCENES", "scenes[] must be non-empty")
    warnings: list[dict[str, Any]] = []
    out: list[str] = []
    scene_zero = scenes[0] if isinstance(scenes[0], dict) else {}
    declared_zero = scene_zero.get("mode", "auto")
    has_scene_image, has_request_image, has_cond_video = _validate_scene_zero_image_resolution(
        payload, scene_zero
    )
    out.append(
        _resolve_scene_zero_mode(
            declared_zero, has_scene_image or has_request_image, has_cond_video
        )
    )
    for idx in range(1, len(scenes)):
        raw = scenes[idx] if isinstance(scenes[idx], dict) else {}
        declared = raw.get("mode", "auto")
        out.append(_resolve_scene_n_mode(declared, idx))
    for idx in range(1, len(out)):
        if out[idx - 1] == "i2v" and out[idx] == "vc":
            warnings.append(
                {
                    "code": "MODE_SWITCH_CHANNEL",
                    "scene_index": idx,
                    "detail": "i2v->vc transition",
                }
            )
    return out, warnings
