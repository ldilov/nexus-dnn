"""Operator input validation for trellis2.generate.start — torch-free.

The frozen operator (`trellis2.generate_3d@1.0.0`) inputs:
  image (path/ref, required) · seed (int) · sparse_steps (default 12) ·
  shape_steps · simplify_target (default 1_000_000) · texture (bool, default
  false for MVP-0) · residency (low_vram|balanced).

Both the fake and the real (gb10-flash) backends validate through this same
function so the fake E2E exercises the identical input contract.
"""
from __future__ import annotations

from typing import Any

DEFAULT_SPARSE_STEPS = 12
DEFAULT_SHAPE_STEPS = 12
DEFAULT_SIMPLIFY_TARGET = 1_000_000
NVDIFFRAST_FACE_LIMIT = 16_777_216
DEFAULT_TEXTURE_SIZE = 2048
VALID_RESIDENCY = ("low_vram", "balanced")


class GenerateParams:
    """Validated, defaulted view of the operator inputs. Immutable-by-convention:
    callers read fields, never mutate the source params dict."""

    __slots__ = (
        "image_path",
        "output_path",
        "seed",
        "sparse_steps",
        "shape_steps",
        "simplify_target",
        "texture",
        "residency",
        "texture_size",
    )

    def __init__(self, **kw: Any) -> None:
        for name in self.__slots__:
            setattr(self, name, kw[name])

    def as_dict(self) -> dict[str, Any]:
        return {name: getattr(self, name) for name in self.__slots__}


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

    residency = params.get("residency", "balanced")
    if residency not in VALID_RESIDENCY:
        raise ValueError(f"residency must be one of {VALID_RESIDENCY}")

    texture_size = _coerce_int(
        params.get("texture_size"), name="texture_size", default=DEFAULT_TEXTURE_SIZE
    )

    return GenerateParams(
        image_path=image_path,
        output_path=output_path,
        seed=seed,
        sparse_steps=sparse_steps,
        shape_steps=shape_steps,
        simplify_target=simplify_target,
        texture=texture,
        residency=residency,
        texture_size=texture_size,
    )
