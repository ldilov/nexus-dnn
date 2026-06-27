"""Operator input validation for trellis2.generate.start — torch-free.

The frozen operator (`trellis2.generate_3d@1.0.0`) inputs:
  image (path/ref, required) · seed (int) · sparse_steps (default 12) ·
  shape_steps · simplify_target (default 1_000_000) · texture (bool, default
  false for MVP-0) · residency (low_vram|balanced).

Guidance levers (per-stage CFG controls — sparse / shape / texture):
  *_guidance_strength · *_guidance_rescale · *_rescale_t ·
  *_guidance_interval_start / *_guidance_interval_end. Each maps 1:1 to the
  `FlowEulerGuidanceIntervalSampler.sample()` kwargs that every stage's sampler
  accepts (see reconviagen_pipeline.json: all three samplers are
  FlowEulerGuidanceIntervalSampler). Unset (None) = inherit the model's baked
  pipeline.json default, so the current render is byte-preserved unless the
  operator opts in.

Both the fake and the real (gb10-flash) backends validate through this same
function so the fake E2E exercises the identical input contract.
"""
from __future__ import annotations

from typing import Any

DEFAULT_SPARSE_STEPS = 12
DEFAULT_SHAPE_STEPS = 12
DEFAULT_TEXTURE_STEPS = 12
DEFAULT_SIMPLIFY_TARGET = 1_000_000
NVDIFFRAST_FACE_LIMIT = 16_777_216
DEFAULT_TEXTURE_SIZE = 2048
MAX_TEXTURE_SIZE = 8192
DEFAULT_MAX_NUM_TOKENS = 49152
DEFAULT_PIPELINE_TYPE = "1024_cascade"
DEFAULT_REMOVE_BACKGROUND = True
VALID_PIPELINE_TYPES = ("512", "1024", "1024_cascade", "1536_cascade")
VALID_RESIDENCY = ("low_vram", "balanced")

MAX_GUIDANCE_STRENGTH = 100.0
MAX_RESCALE_T = 10.0
GUIDANCE_STAGES = ("sparse", "shape", "texture")

# Refine must default at least as strong as a good generate, else re-sampling the
# whole shape downgrades the mesh and the face looks worse (heavier but correct).
DEFAULT_REFINE_RESOLUTION = 1536
DEFAULT_REFINE_MAX_VIEWS = 4
DEFAULT_REFINE_MAX_NUM_TOKENS = 98304
DEFAULT_REFINE_SHAPE_STEPS = 25
DEFAULT_REFINE_TEXTURE_STEPS = 25
VALID_REFINE_RESOLUTIONS = (512, 1024, 1536)
REFINE_GUIDANCE_STAGES = ("shape", "texture")


class GenerateParams:
    """Validated, defaulted view of the operator inputs. Immutable-by-convention:
    callers read fields, never mutate the source params dict."""

    _STAGE_GUIDANCE_SLOTS = tuple(
        f"{stage}_{field}"
        for stage in GUIDANCE_STAGES
        for field in (
            "guidance_strength",
            "guidance_rescale",
            "rescale_t",
            "guidance_interval_start",
            "guidance_interval_end",
        )
    )

    __slots__ = (
        "image_path",
        "output_path",
        "seed",
        "sparse_steps",
        "shape_steps",
        "simplify_target",
        "texture",
        "remove_background",
        "residency",
        "texture_size",
        "metallic",
        "pipeline_type",
        "texture_steps",
        "max_num_tokens",
        *_STAGE_GUIDANCE_SLOTS,
    )

    def __init__(self, **kw: Any) -> None:
        for name in self.__slots__:
            setattr(self, name, kw[name])

    def as_dict(self) -> dict[str, Any]:
        return {name: getattr(self, name) for name in self.__slots__}

    def stage_sampler_params(self, stage: str) -> dict[str, Any]:
        """Build the sampler_params dict for one stage (sparse|shape|texture).

        Always carries `steps`. Each guidance lever is included ONLY when the
        operator set it (non-None), so unset levers inherit the model's baked
        pipeline defaults instead of overriding them. The interval is emitted as
        [start, end] only when BOTH endpoints are provided.
        """
        steps = {
            "sparse": self.sparse_steps,
            "shape": self.shape_steps,
            "texture": self.texture_steps,
        }[stage]
        out: dict[str, Any] = {"steps": steps}
        strength = getattr(self, f"{stage}_guidance_strength")
        if strength is not None:
            out["guidance_strength"] = strength
        rescale = getattr(self, f"{stage}_guidance_rescale")
        if rescale is not None:
            out["guidance_rescale"] = rescale
        rescale_t = getattr(self, f"{stage}_rescale_t")
        if rescale_t is not None:
            out["rescale_t"] = rescale_t
        lo = getattr(self, f"{stage}_guidance_interval_start")
        hi = getattr(self, f"{stage}_guidance_interval_end")
        if lo is not None and hi is not None:
            out["guidance_interval"] = [lo, hi]
        return out


def _require_str(params: dict[str, Any], *keys: str) -> str:
    for key in keys:
        val = params.get(key)
        if isinstance(val, str) and val.strip():
            return val
    raise ValueError(f"one of {keys} is required and must be a non-empty string")


def _coerce_int(value: Any, *, name: str, default: int, minimum: int = 1) -> int:
    if value is None:
        return default
    try:
        out = int(value)
    except (TypeError, ValueError):
        raise ValueError(f"{name} must be an integer")
    if out < minimum:
        raise ValueError(f"{name} must be >= {minimum}")
    return out


def _coerce_opt_float(
    value: Any, *, name: str, minimum: float, maximum: float
) -> float | None:
    """Coerce an optional float lever. None (unset) stays None so the stage
    inherits the model's baked default; otherwise clamp into [minimum, maximum]."""
    if value is None:
        return None
    try:
        out = float(value)
    except (TypeError, ValueError):
        raise ValueError(f"{name} must be a number")
    return max(minimum, min(maximum, out))


def validate_generate_params(params: dict[str, Any]) -> GenerateParams:
    if not isinstance(params, dict):
        raise ValueError("params must be an object")

    image_path = _require_str(params, "image_path", "image", "ref_image_path")
    output_path = _require_str(params, "output_path")

    seed = params.get("seed")
    if seed is not None:
        try:
            seed = int(seed)
        except (TypeError, ValueError):
            raise ValueError("seed must be an integer")

    sparse_steps = _coerce_int(
        params.get("sparse_steps"), name="sparse_steps", default=DEFAULT_SPARSE_STEPS
    )
    shape_steps = _coerce_int(
        params.get("shape_steps"), name="shape_steps", default=DEFAULT_SHAPE_STEPS
    )
    simplify_target = _coerce_int(
        params.get("simplify_target"),
        name="simplify_target",
        default=DEFAULT_SIMPLIFY_TARGET,
    )
    simplify_target = min(simplify_target, NVDIFFRAST_FACE_LIMIT)

    texture = bool(params.get("texture", False))
    remove_background = bool(
        params.get("remove_background", DEFAULT_REMOVE_BACKGROUND)
    )

    residency = params.get("residency", "balanced")
    if residency not in VALID_RESIDENCY:
        raise ValueError(f"residency must be one of {VALID_RESIDENCY}")

    texture_steps = _coerce_int(
        params.get("texture_steps"), name="texture_steps", default=DEFAULT_TEXTURE_STEPS
    )
    texture_size = _coerce_int(
        params.get("texture_size"), name="texture_size", default=DEFAULT_TEXTURE_SIZE
    )
    texture_size = min(texture_size, MAX_TEXTURE_SIZE)
    max_num_tokens = _coerce_int(
        params.get("max_num_tokens"),
        name="max_num_tokens",
        default=DEFAULT_MAX_NUM_TOKENS,
        minimum=0,
    )

    pipeline_type = params.get("pipeline_type") or DEFAULT_PIPELINE_TYPE
    if pipeline_type not in VALID_PIPELINE_TYPES:
        raise ValueError(f"pipeline_type must be one of {VALID_PIPELINE_TYPES}")

    metallic_raw = params.get("metallic", 0.0)
    try:
        metallic = max(0.0, min(1.0, float(metallic_raw)))
    except (TypeError, ValueError):
        raise ValueError("metallic must be a number in [0, 1]")

    guidance = _validate_guidance(params)

    return GenerateParams(
        image_path=image_path,
        output_path=output_path,
        seed=seed,
        sparse_steps=sparse_steps,
        shape_steps=shape_steps,
        simplify_target=simplify_target,
        texture=texture,
        remove_background=remove_background,
        residency=residency,
        texture_size=texture_size,
        metallic=metallic,
        pipeline_type=pipeline_type,
        texture_steps=texture_steps,
        max_num_tokens=max_num_tokens,
        **guidance,
    )


def _validate_guidance(params: dict[str, Any]) -> dict[str, float | None]:
    """Validate the optional per-stage guidance levers. Returns a dict keyed by
    the GenerateParams guidance slots — values are None when unset (inherit the
    model's baked pipeline default) or clamped floats when provided."""
    return _validate_guidance_for_stages(params, GUIDANCE_STAGES)


def _validate_guidance_for_stages(
    params: dict[str, Any], stages: tuple[str, ...]
) -> dict[str, float | None]:
    out: dict[str, float | None] = {}
    for stage in stages:
        out[f"{stage}_guidance_strength"] = _coerce_opt_float(
            params.get(f"{stage}_guidance_strength"),
            name=f"{stage}_guidance_strength",
            minimum=0.0,
            maximum=MAX_GUIDANCE_STRENGTH,
        )
        out[f"{stage}_guidance_rescale"] = _coerce_opt_float(
            params.get(f"{stage}_guidance_rescale"),
            name=f"{stage}_guidance_rescale",
            minimum=0.0,
            maximum=1.0,
        )
        out[f"{stage}_rescale_t"] = _coerce_opt_float(
            params.get(f"{stage}_rescale_t"),
            name=f"{stage}_rescale_t",
            minimum=0.0,
            maximum=MAX_RESCALE_T,
        )
        out[f"{stage}_guidance_interval_start"] = _coerce_opt_float(
            params.get(f"{stage}_guidance_interval_start"),
            name=f"{stage}_guidance_interval_start",
            minimum=0.0,
            maximum=1.0,
        )
        out[f"{stage}_guidance_interval_end"] = _coerce_opt_float(
            params.get(f"{stage}_guidance_interval_end"),
            name=f"{stage}_guidance_interval_end",
            minimum=0.0,
            maximum=1.0,
        )
    return out


class RefineParams:
    """Validated, defaulted view of the refine operator inputs. Mirrors
    GenerateParams but for the geometry-refine pass: a finished mesh + source
    image (plus an optional second conditioning view) are re-sampled at high
    resolution. Immutable-by-convention: callers read fields, never mutate."""

    _STAGE_GUIDANCE_SLOTS = tuple(
        f"{stage}_{field}"
        for stage in REFINE_GUIDANCE_STAGES
        for field in (
            "guidance_strength",
            "guidance_rescale",
            "rescale_t",
            "guidance_interval_start",
            "guidance_interval_end",
        )
    )

    __slots__ = (
        "mesh_path",
        "image_path",
        "face_image_path",
        "output_path",
        "seed",
        "shape_steps",
        "texture_steps",
        "resolution",
        "max_views",
        "max_num_tokens",
        "remove_background",
        "residency",
        "simplify_target",
        "texture_size",
        "metallic",
        *_STAGE_GUIDANCE_SLOTS,
    )

    def __init__(self, **kw: Any) -> None:
        for name in self.__slots__:
            setattr(self, name, kw[name])

    def as_dict(self) -> dict[str, Any]:
        return {name: getattr(self, name) for name in self.__slots__}

    def stage_sampler_params(self, stage: str) -> dict[str, Any]:
        """Build the sampler_params dict for one refine stage (shape|texture).

        Always carries `steps`. Each guidance lever is included ONLY when the
        operator set it (non-None), so unset levers inherit the model's baked
        pipeline defaults. The interval is emitted as [start, end] only when
        BOTH endpoints are provided.
        """
        if stage not in REFINE_GUIDANCE_STAGES:
            raise ValueError(f"refine stage must be one of {REFINE_GUIDANCE_STAGES}")
        steps = {"shape": self.shape_steps, "texture": self.texture_steps}[stage]
        out: dict[str, Any] = {"steps": steps}
        strength = getattr(self, f"{stage}_guidance_strength")
        if strength is not None:
            out["guidance_strength"] = strength
        rescale = getattr(self, f"{stage}_guidance_rescale")
        if rescale is not None:
            out["guidance_rescale"] = rescale
        rescale_t = getattr(self, f"{stage}_rescale_t")
        if rescale_t is not None:
            out["rescale_t"] = rescale_t
        lo = getattr(self, f"{stage}_guidance_interval_start")
        hi = getattr(self, f"{stage}_guidance_interval_end")
        if lo is not None and hi is not None:
            out["guidance_interval"] = [lo, hi]
        return out


def validate_refine_params(params: dict[str, Any]) -> RefineParams:
    if not isinstance(params, dict):
        raise ValueError("params must be an object")

    mesh_path = _require_str(params, "mesh_path", "mesh")
    image_path = _require_str(params, "image_path", "image", "ref_image_path")
    output_path = _require_str(params, "output_path")

    face_image_raw = params.get("face_image_path") or params.get("face_image")
    if face_image_raw is not None and not (
        isinstance(face_image_raw, str) and face_image_raw.strip()
    ):
        raise ValueError("face_image_path must be a non-empty string when provided")
    face_image_path = face_image_raw if face_image_raw else None

    seed = params.get("seed")
    if seed is not None:
        try:
            seed = int(seed)
        except (TypeError, ValueError):
            raise ValueError("seed must be an integer")

    shape_steps = _coerce_int(
        params.get("shape_steps"), name="shape_steps", default=DEFAULT_REFINE_SHAPE_STEPS
    )
    texture_steps = _coerce_int(
        params.get("texture_steps"), name="texture_steps", default=DEFAULT_REFINE_TEXTURE_STEPS
    )

    resolution_raw = params.get("resolution")
    resolution = (
        DEFAULT_REFINE_RESOLUTION
        if resolution_raw is None
        else _coerce_int(resolution_raw, name="resolution", default=DEFAULT_REFINE_RESOLUTION)
    )
    if resolution not in VALID_REFINE_RESOLUTIONS:
        raise ValueError(f"resolution must be one of {VALID_REFINE_RESOLUTIONS}")

    max_views = _coerce_int(
        params.get("max_views"), name="max_views", default=DEFAULT_REFINE_MAX_VIEWS
    )
    max_num_tokens = _coerce_int(
        params.get("max_num_tokens"),
        name="max_num_tokens",
        default=DEFAULT_REFINE_MAX_NUM_TOKENS,
        minimum=0,
    )

    remove_background = bool(
        params.get("remove_background", DEFAULT_REMOVE_BACKGROUND)
    )

    residency = params.get("residency", "balanced")
    if residency not in VALID_RESIDENCY:
        raise ValueError(f"residency must be one of {VALID_RESIDENCY}")

    simplify_target = _coerce_int(
        params.get("simplify_target"),
        name="simplify_target",
        default=DEFAULT_SIMPLIFY_TARGET,
    )
    simplify_target = min(simplify_target, NVDIFFRAST_FACE_LIMIT)

    texture_size = _coerce_int(
        params.get("texture_size"), name="texture_size", default=DEFAULT_TEXTURE_SIZE
    )
    texture_size = min(texture_size, MAX_TEXTURE_SIZE)

    metallic_raw = params.get("metallic", 0.0)
    try:
        metallic = max(0.0, min(1.0, float(metallic_raw)))
    except (TypeError, ValueError):
        raise ValueError("metallic must be a number in [0, 1]")

    guidance = _validate_guidance_for_stages(params, REFINE_GUIDANCE_STAGES)

    return RefineParams(
        mesh_path=mesh_path,
        image_path=image_path,
        face_image_path=face_image_path,
        output_path=output_path,
        seed=seed,
        shape_steps=shape_steps,
        texture_steps=texture_steps,
        resolution=resolution,
        max_views=max_views,
        max_num_tokens=max_num_tokens,
        remove_background=remove_background,
        residency=residency,
        simplify_target=simplify_target,
        texture_size=texture_size,
        metallic=metallic,
        **guidance,
    )
