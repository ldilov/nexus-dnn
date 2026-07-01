"""Operator input validation for faceavatar — torch-free.

Two operators, with per-op fail-fast validation:
  - generate_head: photo → identity head/bust GLB
  - graft_head:    base_mesh GLB + photo → identity-grafted head GLB

Both the fake and the real (gb10) backends validate through these same
functions so the fake E2E exercises the identical input contract. Validators
fail fast with the field name in the ValueError message. Params objects are
immutable-by-convention: callers read fields, never mutate the source dict.
"""
from __future__ import annotations

from typing import Any

# generate_head defaults / enums
VALID_EXPRESSION = ("neutral", "source")
DEFAULT_EXPRESSION = "neutral"
VALID_CROP = ("bust", "head")
DEFAULT_CROP = "bust"
DEFAULT_TEXTURE = True

# graft_head defaults / enums
VALID_SEAM = ("neck", "hairline")
DEFAULT_SEAM = "neck"
DEFAULT_KEEP_HAIR = True
VALID_ALIGN = ("landmark", "manual")
DEFAULT_ALIGN = "landmark"
DEFAULT_BLEND_RING = 0.25
DEFAULT_TEXTURE_BLEND = True

# shared
VALID_RESIDENCY = ("low_vram", "balanced")
DEFAULT_RESIDENCY = "balanced"
DEFAULT_ARC_ITERS = 2500  # Arc2Avatar per-image optimisation steps (latency knob)
MAX_ARC_ITERS = 5000


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


def _coerce_opt_int(value: Any, *, name: str, minimum: int = 1, maximum: int) -> int | None:
    """Optional int. None (unset) stays None; otherwise clamp into [minimum, maximum]."""
    if value is None:
        return None
    try:
        out = int(value)
    except (TypeError, ValueError):
        raise ValueError(f"{name} must be an integer")
    return max(minimum, min(maximum, out))


def _coerce_seed(value: Any) -> int | None:
    if value is None:
        return None
    try:
        return int(value)
    except (TypeError, ValueError):
        raise ValueError("seed must be an integer")


def _coerce_unit_float(value: Any, *, name: str, default: float) -> float:
    if value is None:
        return default
    try:
        out = float(value)
    except (TypeError, ValueError):
        raise ValueError(f"{name} must be a number")
    return max(0.0, min(1.0, out))


def _require_residency(params: dict[str, Any]) -> str:
    residency = params.get("residency", DEFAULT_RESIDENCY)
    if residency not in VALID_RESIDENCY:
        raise ValueError(f"residency must be one of {VALID_RESIDENCY}")
    return residency


class GenerateHeadParams:
    """Validated, defaulted view of generate_head inputs. Immutable-by-convention."""

    __slots__ = (
        "image_path",
        "output_path",
        "seed",
        "expression",
        "texture",
        "crop",
        "arc_iters",
        "residency",
    )

    def __init__(self, **kw: Any) -> None:
        for name in self.__slots__:
            setattr(self, name, kw[name])

    def as_dict(self) -> dict[str, Any]:
        return {name: getattr(self, name) for name in self.__slots__}


def validate_generate_head_params(params: dict[str, Any]) -> GenerateHeadParams:
    if not isinstance(params, dict):
        raise ValueError("params must be an object")

    image_path = _require_str(params, "image_path", "image", "ref_image_path")
    output_path = _require_str(params, "output_path")
    seed = _coerce_seed(params.get("seed"))

    expression = params.get("expression", DEFAULT_EXPRESSION)
    if expression not in VALID_EXPRESSION:
        raise ValueError(f"expression must be one of {VALID_EXPRESSION}")

    texture = bool(params.get("texture", DEFAULT_TEXTURE))

    crop = params.get("crop", DEFAULT_CROP)
    if crop not in VALID_CROP:
        raise ValueError(f"crop must be one of {VALID_CROP}")

    arc_iters = _coerce_opt_int(
        params.get("arc_iters"), name="arc_iters", minimum=1, maximum=MAX_ARC_ITERS
    )
    residency = _require_residency(params)

    return GenerateHeadParams(
        image_path=image_path,
        output_path=output_path,
        seed=seed,
        expression=expression,
        texture=texture,
        crop=crop,
        arc_iters=arc_iters,
        residency=residency,
    )


class GraftHeadParams:
    """Validated, defaulted view of graft_head inputs. Immutable-by-convention."""

    __slots__ = (
        "base_mesh_path",
        "image_path",
        "output_path",
        "seed",
        "seam",
        "keep_hair",
        "blend_ring",
        "align",
        "texture_blend",
        "arc_iters",
        "residency",
    )

    def __init__(self, **kw: Any) -> None:
        for name in self.__slots__:
            setattr(self, name, kw[name])

    def as_dict(self) -> dict[str, Any]:
        return {name: getattr(self, name) for name in self.__slots__}


def validate_graft_head_params(params: dict[str, Any]) -> GraftHeadParams:
    if not isinstance(params, dict):
        raise ValueError("params must be an object")

    base_mesh_path = _require_str(params, "base_mesh_path", "base_mesh", "mesh_path", "mesh")
    image_path = _require_str(params, "image_path", "image", "ref_image_path")
    output_path = _require_str(params, "output_path")
    seed = _coerce_seed(params.get("seed"))

    seam = params.get("seam", DEFAULT_SEAM)
    if seam not in VALID_SEAM:
        raise ValueError(f"seam must be one of {VALID_SEAM}")

    keep_hair = bool(params.get("keep_hair", DEFAULT_KEEP_HAIR))
    blend_ring = _coerce_unit_float(
        params.get("blend_ring"), name="blend_ring", default=DEFAULT_BLEND_RING
    )

    align = params.get("align", DEFAULT_ALIGN)
    if align not in VALID_ALIGN:
        raise ValueError(f"align must be one of {VALID_ALIGN}")

    texture_blend = bool(params.get("texture_blend", DEFAULT_TEXTURE_BLEND))
    arc_iters = _coerce_opt_int(
        params.get("arc_iters"), name="arc_iters", minimum=1, maximum=MAX_ARC_ITERS
    )
    residency = _require_residency(params)

    return GraftHeadParams(
        base_mesh_path=base_mesh_path,
        image_path=image_path,
        output_path=output_path,
        seed=seed,
        seam=seam,
        keep_hair=keep_hair,
        blend_ring=blend_ring,
        align=align,
        texture_blend=texture_blend,
        arc_iters=arc_iters,
        residency=residency,
    )
