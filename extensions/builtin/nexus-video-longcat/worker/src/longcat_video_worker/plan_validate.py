from __future__ import annotations

import os
from dataclasses import dataclass, field
from typing import Any, Optional

FPS = 24
DURATION_MIN = 0.5
DURATION_MAX = 15.0
TOTAL_DURATION_LIMIT = 20.0
ADAIN_MIN = 0.0
ADAIN_MAX = 1.0
GUIDANCE_MIN = 1.0
GUIDANCE_MAX = 7.0
STEPS_MIN = 1
STEPS_MAX = 50
ICN_MIN = 0.0
ICN_MAX = 0.5
REFINE_GUIDANCE_MIN = 2.0
REFINE_GUIDANCE_MAX = 7.0
REFINE_STEPS_MIN = 1
REFINE_STEPS_MAX = 10
MOTION_VALUES = {"static", "dynamic", "intense"}
MODE_VALUES_SCENE_ZERO = {"auto", "t2v", "i2v"}
MODE_VALUES_LATER = {"auto", "vc", "t2v"}
ALL_MODES = {"auto", "t2v", "i2v", "vc"}
ADAIN_DRIFT_FACTOR_THRESHOLD = 0.15
ADAIN_DRIFT_SCENE_THRESHOLD = 4
DISTILL_STATIC_PROMPT_THRESHOLD = 3
VAE_TILE_PIXEL_THRESHOLD = 768 * 448
ICN_LOW_THRESHOLD = 0.05


class PlanValidationError(Exception):
    def __init__(self, sub_reason: str, detail: str, scene_index: Optional[int] = None) -> None:
        super().__init__(detail)
        self.sub_reason = sub_reason
        self.detail = detail
        self.scene_index = scene_index

    def to_error_payload(self) -> dict[str, Any]:
        return {
            "code": "PLAN_INVALID",
            "sub_reason": self.sub_reason,
            "scene_index": self.scene_index,
            "detail": self.detail,
        }


@dataclass
class _Warning:
    code: str
    scene_index: Optional[int]
    detail: str

    def to_dict(self) -> dict[str, Any]:
        return {"code": self.code, "scene_index": self.scene_index, "detail": self.detail}


def quantize_frames(seconds: float) -> int:
    raw = round(seconds * FPS)
    return max(5, ((raw - 1) // 4) * 4 + 1)


def _is_4n_plus_1(value: int) -> bool:
    return value >= 1 and (value - 1) % 4 == 0


def _clamp(value: float, lo: float, hi: float) -> float:
    return max(lo, min(hi, value))


def _read_scene_duration(raw: dict[str, Any], warnings: list[_Warning], scene_index: int) -> float:
    if "per_scene_generated_seconds" in raw and raw["per_scene_generated_seconds"] is not None:
        return float(raw["per_scene_generated_seconds"])
    if "duration_seconds" in raw and raw["duration_seconds"] is not None:
        warnings.append(
            _Warning(
                "DEPRECATED_FIELD_ALIAS",
                scene_index,
                "scene.duration_seconds is deprecated; use per_scene_generated_seconds",
            )
        )
        return float(raw["duration_seconds"])
    return 4.0


def validate_scene_zero_image_resolution(
    payload: dict[str, Any], scene_zero: dict[str, Any]
) -> tuple[bool, bool, bool]:
    has_scene_image = bool(scene_zero.get("image_path"))
    has_request_image = bool(payload.get("image_path"))
    has_image = has_scene_image or has_request_image
    has_cond_video = bool(payload.get("conditioning_video_path")) or bool(
        payload.get("low_res_video_path")
    )
    return has_scene_image, has_request_image, has_cond_video


def resolve_scene_zero_mode(
    declared: str, has_image: bool, has_cond_video: bool
) -> str:
    if declared not in MODE_VALUES_SCENE_ZERO:
        raise PlanValidationError(
            "MODE_INVALID",
            f"scene[0].mode must be one of {sorted(MODE_VALUES_SCENE_ZERO)}, got '{declared}'",
            scene_index=0,
        )
    if declared == "auto":
        if has_image:
            if has_cond_video:
                raise PlanValidationError(
                    "I2V_MODE_CONFLICT",
                    "scene[0] has image_path and a conditioning/low-res video path is set; cannot resolve to i2v",
                    scene_index=0,
                )
            return "i2v"
        return "t2v"
    if declared == "t2v" and has_image:
        raise PlanValidationError(
            "I2V_MODE_CONFLICT",
            "scene[0].mode='t2v' but an image_path is supplied",
            scene_index=0,
        )
    if declared == "i2v" and not has_image:
        raise PlanValidationError(
            "I2V_IMAGE_MISSING",
            "scene[0].mode='i2v' requires image_path on the scene or top-level request",
            scene_index=0,
        )
    return declared


def resolve_scene_n_mode(declared: str, scene_index: int) -> str:
    if declared not in ALL_MODES:
        raise PlanValidationError(
            "MODE_INVALID",
            f"scene[{scene_index}].mode must be one of {sorted(ALL_MODES)}, got '{declared}'",
            scene_index=scene_index,
        )
    if declared == "i2v":
        raise PlanValidationError(
            "I2V_NOT_SCENE_ZERO",
            f"scene[{scene_index}].mode='i2v' is only valid for scene_0",
            scene_index=scene_index,
        )
    if declared == "auto":
        return "vc"
    if declared not in MODE_VALUES_LATER:
        raise PlanValidationError(
            "MODE_INVALID",
            f"scene[{scene_index}].mode='{declared}' not allowed for non-zero scenes",
            scene_index=scene_index,
        )
    return declared


def _validate_scene_dict(
    raw: dict[str, Any],
    scene_index: int,
    payload: dict[str, Any],
    warnings: list[_Warning],
) -> dict[str, Any]:
    prompt = raw.get("prompt")
    if not isinstance(prompt, str) or not prompt.strip():
        raise PlanValidationError(
            "PROMPT_EMPTY", f"scene[{scene_index}].prompt is empty", scene_index=scene_index
        )

    duration = _read_scene_duration(raw, warnings, scene_index)
    if duration < DURATION_MIN or duration > DURATION_MAX:
        raise PlanValidationError(
            "DURATION_OUT_OF_RANGE",
            f"scene[{scene_index}] duration {duration} not in [{DURATION_MIN}, {DURATION_MAX}]",
            scene_index=scene_index,
        )

    num_frames = quantize_frames(duration)
    if not _is_4n_plus_1(num_frames):
        raise PlanValidationError(
            "FRAME_QUANT_VIOLATION",
            f"scene[{scene_index}] num_frames={num_frames} is not 4n+1",
            scene_index=scene_index,
        )

    overlap_raw = raw.get("overlap_frames", 13)
    if scene_index == 0:
        overlap = 0
    else:
        overlap = int(overlap_raw)
        if overlap < 1 or overlap >= num_frames:
            raise PlanValidationError(
                "OVERLAP_EXCEEDS_FRAMES",
                f"scene[{scene_index}] overlap_frames={overlap} not in [1, {num_frames - 1}]",
                scene_index=scene_index,
            )
        if not _is_4n_plus_1(overlap):
            raise PlanValidationError(
                "OVERLAP_NOT_4N_PLUS_1",
                f"scene[{scene_index}] overlap_frames={overlap} must be 4n+1",
                scene_index=scene_index,
            )

    motion = raw.get("motion_intensity", "dynamic")
    if motion not in MOTION_VALUES:
        raise PlanValidationError(
            "MODE_INVALID",
            f"scene[{scene_index}].motion_intensity must be one of {sorted(MOTION_VALUES)}, got '{motion}'",
            scene_index=scene_index,
        )

    adain = float(raw.get("adain_factor", 0.2))
    if adain < ADAIN_MIN or adain > ADAIN_MAX:
        raise PlanValidationError(
            "CLAMP_RANGE_VIOLATION",
            f"scene[{scene_index}].adain_factor={adain} not in [{ADAIN_MIN}, {ADAIN_MAX}]",
            scene_index=scene_index,
        )

    guidance = raw.get("guidance_scale")
    if guidance is not None:
        guidance = float(guidance)
        if guidance < GUIDANCE_MIN or guidance > GUIDANCE_MAX:
            raise PlanValidationError(
                "CLAMP_RANGE_VIOLATION",
                f"scene[{scene_index}].guidance_scale={guidance} not in [{GUIDANCE_MIN}, {GUIDANCE_MAX}]",
                scene_index=scene_index,
            )

    steps = raw.get("num_inference_steps")
    if steps is not None:
        steps = int(steps)
        if steps < STEPS_MIN or steps > STEPS_MAX:
            raise PlanValidationError(
                "CLAMP_RANGE_VIOLATION",
                f"scene[{scene_index}].num_inference_steps={steps} not in [{STEPS_MIN}, {STEPS_MAX}]",
                scene_index=scene_index,
            )

    icn = raw.get("image_cond_noise_scale")
    if icn is not None:
        icn = float(icn)
        if icn < ICN_MIN or icn > ICN_MAX:
            raise PlanValidationError(
                "CLAMP_RANGE_VIOLATION",
                f"scene[{scene_index}].image_cond_noise_scale={icn} not in [{ICN_MIN}, {ICN_MAX}]",
                scene_index=scene_index,
            )

    ref_steps = raw.get("refinement_steps")
    if ref_steps is not None:
        ref_steps = int(ref_steps)
        if ref_steps < REFINE_STEPS_MIN or ref_steps > REFINE_STEPS_MAX:
            raise PlanValidationError(
                "CLAMP_RANGE_VIOLATION",
                f"scene[{scene_index}].refinement_steps={ref_steps} not in [{REFINE_STEPS_MIN}, {REFINE_STEPS_MAX}]",
                scene_index=scene_index,
            )

    ref_guidance = raw.get("refinement_guidance")
    if ref_guidance is not None:
        ref_guidance = float(ref_guidance)
        if ref_guidance < REFINE_GUIDANCE_MIN or ref_guidance > REFINE_GUIDANCE_MAX:
            raise PlanValidationError(
                "REFINEMENT_GUIDANCE_TOO_LOW",
                f"scene[{scene_index}].refinement_guidance={ref_guidance} not in [{REFINE_GUIDANCE_MIN}, {REFINE_GUIDANCE_MAX}]",
                scene_index=scene_index,
            )

    image_path = raw.get("image_path")
    if image_path is not None and not isinstance(image_path, str):
        raise PlanValidationError(
            "I2V_IMAGE_MISSING",
            f"scene[{scene_index}].image_path must be a string path or None",
            scene_index=scene_index,
        )
    if image_path and not os.path.exists(image_path):
        raise PlanValidationError(
            "I2V_IMAGE_MISSING",
            f"scene[{scene_index}].image_path does not exist: {image_path}",
            scene_index=scene_index,
        )

    declared_mode = raw.get("mode", "auto")
    if scene_index == 0:
        has_scene_image, has_request_image, has_cond_video = validate_scene_zero_image_resolution(
            payload, raw
        )
        resolved_mode = resolve_scene_zero_mode(
            declared_mode, has_scene_image or has_request_image, has_cond_video
        )
    else:
        resolved_mode = resolve_scene_n_mode(declared_mode, scene_index)

    fresh_frames = num_frames - overlap if scene_index > 0 else num_frames
    fresh_seconds = fresh_frames / FPS

    return {
        "prompt": prompt.strip(),
        "negative_prompt": raw.get("negative_prompt"),
        "mode": resolved_mode,
        "image_path": image_path,
        "per_scene_generated_seconds": duration,
        "overlap_frames": overlap,
        "enhance_hf": raw.get("enhance_hf"),
        "adain_factor": adain,
        "use_distill": raw.get("use_distill"),
        "guidance_scale": guidance,
        "num_inference_steps": steps,
        "image_cond_noise_scale": icn,
        "motion_intensity": motion,
        "seed_offset": raw.get("seed_offset"),
        "apply_refinement": raw.get("apply_refinement"),
        "refinement_steps": ref_steps,
        "refinement_guidance": ref_guidance,
        "refinement_spatial_only": raw.get("refinement_spatial_only"),
        "num_frames": num_frames,
        "fresh_seconds": fresh_seconds,
    }


def _emit_global_warnings(
    payload: dict[str, Any],
    normalized_scenes: list[dict[str, Any]],
    warnings: list[_Warning],
) -> None:
    factor_threshold_breach = [
        i
        for i, s in enumerate(normalized_scenes)
        if i > 0 and s["adain_factor"] > ADAIN_DRIFT_FACTOR_THRESHOLD
    ]
    if len(normalized_scenes) >= ADAIN_DRIFT_SCENE_THRESHOLD and factor_threshold_breach:
        warnings.append(
            _Warning(
                "ADAIN_CUMULATIVE_DRIFT",
                None,
                f"adain_factor>{ADAIN_DRIFT_FACTOR_THRESHOLD} across >={ADAIN_DRIFT_SCENE_THRESHOLD} scenes risks cumulative colour drift",
            )
        )

    for i in range(1, len(normalized_scenes)):
        prev = normalized_scenes[i - 1].get("use_distill")
        cur = normalized_scenes[i].get("use_distill")
        if prev != cur and (prev is not None or cur is not None):
            warnings.append(
                _Warning(
                    "DISTILL_MIX_MELT_RISK",
                    i,
                    "consecutive scenes differ on use_distill; mixing distilled and base may cause melt",
                )
            )
            break

    apply_refinement = bool(payload.get("apply_refinement", False))
    upscale_mode = payload.get("upscale_mode")
    if apply_refinement and upscale_mode and upscale_mode != "off":
        force_flag = bool(
            payload.get("force_refinement_with_upscale")
            or payload.get("force_refine_with_upscale", False)
        )
        if not force_flag:
            warnings.append(
                _Warning(
                    "REFINE_PLUS_UPSCALE_DOUBLE_SHARPEN",
                    None,
                    "apply_refinement + upscale_mode active without force_refine_with_upscale; risks double-sharpen",
                )
            )

    target_res_w = payload.get("target_width")
    target_res_h = payload.get("target_height")
    if target_res_w and target_res_h:
        if int(target_res_w) * int(target_res_h) > VAE_TILE_PIXEL_THRESHOLD:
            warnings.append(
                _Warning(
                    "VAE_TILE_SEAM_RISK",
                    None,
                    f"target resolution {target_res_w}x{target_res_h} exceeds 768x448; VAE tiling may introduce seams",
                )
            )

    icn_global = payload.get("image_cond_noise_scale", 0.15)
    if icn_global is not None and float(icn_global) < ICN_LOW_THRESHOLD:
        warnings.append(
            _Warning(
                "IMAGE_COND_NOISE_LOW",
                None,
                f"image_cond_noise_scale={icn_global} < {ICN_LOW_THRESHOLD}; risks burned-in conditioning",
            )
        )

    distilled_run = 0
    for i, s in enumerate(normalized_scenes):
        prompt = s["prompt"]
        if (
            s.get("use_distill") is True
            and (s.get("guidance_scale") in (None, 1.0))
            and i > 0
            and normalized_scenes[i - 1]["prompt"] == prompt
        ):
            distilled_run += 1
            if distilled_run + 1 >= DISTILL_STATIC_PROMPT_THRESHOLD:
                warnings.append(
                    _Warning(
                        "DISTILL_STATIC_RISK",
                        i,
                        "use_distill + guidance=1.0 + identical prompts across >=3 scenes risks frozen output",
                    )
                )
                break
        else:
            distilled_run = 0

    for i in range(1, len(normalized_scenes)):
        prev_mode = normalized_scenes[i - 1]["mode"]
        cur_mode = normalized_scenes[i]["mode"]
        if prev_mode == "i2v" and cur_mode == "vc":
            warnings.append(
                _Warning(
                    "MODE_SWITCH_CHANNEL",
                    i,
                    "i2v->vc transition; conditioning channel layout will be promoted via pin_last_frame_for_vc",
                )
            )


def validate_plan(payload: dict[str, Any]) -> dict[str, Any]:
    if not isinstance(payload, dict):
        return {
            "ok": False,
            "error": {
                "code": "PLAN_INVALID",
                "sub_reason": "EMPTY_SCENES",
                "scene_index": None,
                "detail": "payload must be an object",
            },
        }

    scenes = payload.get("scenes")
    if not isinstance(scenes, list) or len(scenes) == 0:
        return {
            "ok": False,
            "error": {
                "code": "PLAN_INVALID",
                "sub_reason": "EMPTY_SCENES",
                "scene_index": None,
                "detail": "scenes[] must be a non-empty list",
            },
        }

    warnings: list[_Warning] = []
    normalized: list[dict[str, Any]] = []

    try:
        for idx, raw in enumerate(scenes):
            if not isinstance(raw, dict):
                raise PlanValidationError(
                    "PROMPT_EMPTY",
                    f"scene[{idx}] must be an object",
                    scene_index=idx,
                )
            normalized.append(_validate_scene_dict(raw, idx, payload, warnings))
    except PlanValidationError as exc:
        return {"ok": False, "error": exc.to_error_payload()}

    total_fresh_seconds = sum(s["fresh_seconds"] for s in normalized)
    if total_fresh_seconds > TOTAL_DURATION_LIMIT:
        return {
            "ok": False,
            "error": {
                "code": "PLAN_INVALID",
                "sub_reason": "TOTAL_DURATION_EXCEEDS_LIMIT",
                "scene_index": None,
                "detail": f"total fresh duration {total_fresh_seconds:.3f}s exceeds {TOTAL_DURATION_LIMIT}s",
            },
        }

    _emit_global_warnings(payload, normalized, warnings)

    total_frames_raw = sum(s["num_frames"] for s in normalized)
    total_frames_after_overlap = sum(
        s["num_frames"] - (s["overlap_frames"] if i > 0 else 0)
        for i, s in enumerate(normalized)
    )
    estimated_duration_seconds = total_frames_after_overlap / FPS

    return {
        "ok": True,
        "normalized": {
            "scenes": normalized,
            "total_frames_raw": total_frames_raw,
            "total_frames_after_overlap": total_frames_after_overlap,
            "estimated_duration_seconds": estimated_duration_seconds,
            "fps": FPS,
            "per_scene": [
                {"num_frames": s["num_frames"], "fresh_seconds": s["fresh_seconds"]}
                for s in normalized
            ],
        },
        "warnings": [w.to_dict() for w in warnings],
    }
