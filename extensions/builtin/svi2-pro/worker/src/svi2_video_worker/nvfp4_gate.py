"""Load-time numeric gate for the NVFP4 decode path.

This is the *online* half of the NVFP4 correctness story. Its offline sibling,
``scripts/nvfp4_numeric_gate.py``, needs the FP8 oracle file and ranks every
decode convention by relative-L2; this module needs no oracle and runs at load.

What it can prove without an oracle
-----------------------------------
The ComfyUI NVFP4 convention sets the per-tensor second scale to
``weight_scale_2 = amax / (E2M1_MAX * FP8_E4M3_MAX) = amax / 2688``. So the
amax of a *correctly* dequantized tensor must land near ``weight_scale_2 * 2688``.
Two whole bug classes violate this by orders of magnitude and are caught here:
  * ``weight_scale_2`` applied as a reciprocal -> amax off by ~1/ws2^2 (~1e7x).
  * ``weight_scale`` already absolute but ws2 multiplied again -> amax ~ws2 (tiny).
Plus finiteness, collapse-to-zero, and the [out, in/16] vs [out, in/2] shape
contract between the block scale and the packed weight.

What it CANNOT prove
--------------------
Block-scale transpose / swizzle and nibble-order bugs preserve amax (they only
scramble positions), so they pass this gate. Use the offline oracle script for
those. This gate is the cheap tripwire for the scale-magnitude class.
"""

from __future__ import annotations

import math
import os
import sys
from dataclasses import dataclass
from typing import Callable, Optional

import torch

# E2M1 max finite (6.0) * FP8 E4M3 max (448.0); the ComfyUI per-tensor scale is
# amax / this, so corrected-dequant amax ~= weight_scale_2 * AMAX_FACTOR.
AMAX_FACTOR: float = 6.0 * 448.0

# Generous band — real amax is below the theoretical max, but a reciprocal or
# double-applied ws2 misses by ~1e6x, so this still trips loudly.
_AMAX_LOW: float = 0.02
_AMAX_HIGH: float = 8.0

WEIGHT_SUFFIX = ".weight"
BLOCK_SCALE_SUFFIXES: tuple[str, ...] = (".weight_scale", ".scale_weight", ".weight_scale_inv")
SCALE2_SUFFIXES: tuple[str, ...] = (".weight_scale_2", ".weight_scale_2_inv", ".scale_2")


class NVFP4GateError(RuntimeError):
    """Raised when an NVFP4 layer fails a load-time decode invariant in strict mode."""


@dataclass(frozen=True)
class LayerVerdict:
    """One layer's gate result."""

    name: str
    ok: bool
    reason: str
    amax: float
    amax_ratio: float


def _first(state_dict: dict, base: str, suffixes: tuple[str, ...]) -> Optional[torch.Tensor]:
    for suffix in suffixes:
        if f"{base}{suffix}" in state_dict:
            return state_dict[f"{base}{suffix}"]
    return None


def find_nvfp4_bases(state_dict: dict) -> list[str]:
    """Return layer base names that carry a packed weight + block scale + ws2."""
    bases: list[str] = []
    for key, value in state_dict.items():
        if not key.endswith(WEIGHT_SUFFIX) or value.dtype != torch.uint8:
            continue
        base = key[: -len(WEIGHT_SUFFIX)]
        if _first(state_dict, base, SCALE2_SUFFIXES) is None:
            continue
        if _first(state_dict, base, BLOCK_SCALE_SUFFIXES) is None:
            continue
        bases.append(base)
    return sorted(bases)


def _check_shapes(packed: torch.Tensor, block_scale: torch.Tensor) -> Optional[str]:
    if packed.dim() != 2 or block_scale.dim() != 2:
        return f"expected 2D packed+scale, got {packed.dim()}D / {block_scale.dim()}D"
    if block_scale.shape[0] != packed.shape[0]:
        return f"scale rows {block_scale.shape[0]} != weight rows {packed.shape[0]}"
    in_features = packed.shape[1] * 2
    if block_scale.shape[1] * 16 != in_features:
        return f"scale blocks {block_scale.shape[1]}*16 != in_features {in_features}"
    return None


def check_layer(
    name: str,
    packed: torch.Tensor,
    block_scale: torch.Tensor,
    scale2: torch.Tensor,
    dequantize_fn: Callable[..., torch.Tensor],
) -> LayerVerdict:
    """Dequantize one layer via the real loader and test oracle-free invariants."""
    shape_reason = _check_shapes(packed, block_scale)
    if shape_reason is not None:
        return LayerVerdict(name, False, shape_reason, float("nan"), float("nan"))

    try:
        w = dequantize_fn(packed, block_scale, scale2).to(torch.float32)
    except Exception as exc:  # noqa: BLE001
        return LayerVerdict(name, False, f"dequant raised {type(exc).__name__}: {exc}", float("nan"), float("nan"))

    if not torch.isfinite(w).all():
        return LayerVerdict(name, False, "dequant has NaN/Inf", float("nan"), float("nan"))

    amax = float(w.abs().max())
    if amax == 0.0:
        return LayerVerdict(name, False, "dequant collapsed to all-zero", 0.0, 0.0)

    expected = float(scale2.detach().abs().max()) * AMAX_FACTOR
    ratio = amax / expected if expected > 0 else float("inf")
    if not (_AMAX_LOW <= ratio <= _AMAX_HIGH):
        return LayerVerdict(
            name,
            False,
            f"amax/{{ws2*{AMAX_FACTOR:.0f}}} ratio {ratio:.3g} outside [{_AMAX_LOW},{_AMAX_HIGH}] "
            f"-> likely weight_scale_2 reciprocal/double-apply",
            amax,
            ratio,
        )
    return LayerVerdict(name, True, "ok", amax, ratio)


def _mode() -> str:
    return os.environ.get("SVI2_NVFP4_GATE", "warn").strip().lower()


def assert_nvfp4_state_dict_sane(
    state_dict: dict,
    dequantize_fn: Callable[..., torch.Tensor],
    *,
    sample: Optional[int] = 8,
    mode: Optional[str] = None,
) -> list[LayerVerdict]:
    """Gate the NVFP4 decode at load.

    ``mode`` (or env ``SVI2_NVFP4_GATE``): ``off`` skips, ``warn`` logs failures,
    ``strict`` raises :class:`NVFP4GateError` on the first failing layer. ``sample``
    bounds how many layers are checked (evenly spaced) to keep load fast; ``None``
    checks every NVFP4 layer.
    """
    effective = (mode or _mode()).strip().lower()
    if effective == "off":
        return []

    bases = find_nvfp4_bases(state_dict)
    if not bases:
        return []

    if sample is not None and sample < len(bases):
        step = max(1, len(bases) // sample)
        bases = bases[::step][:sample]

    verdicts: list[LayerVerdict] = []
    failures: list[LayerVerdict] = []
    for base in bases:
        packed = state_dict[f"{base}{WEIGHT_SUFFIX}"]
        block_scale = _first(state_dict, base, BLOCK_SCALE_SUFFIXES)
        scale2 = _first(state_dict, base, SCALE2_SUFFIXES)
        verdict = check_layer(base, packed, block_scale, scale2, dequantize_fn)
        verdicts.append(verdict)
        if not verdict.ok:
            failures.append(verdict)

    if failures:
        head = failures[0]
        msg = (
            f"[nvfp4-gate] {len(failures)}/{len(verdicts)} sampled layers FAILED decode invariants. "
            f"First: '{head.name}' -> {head.reason} (amax={head.amax:.4g}, ratio={head.amax_ratio:.3g}). "
            f"This is a DECODE bug, not a sigma-schedule bug. "
            f"Run scripts/nvfp4_numeric_gate.py --inhouse to pin the convention."
        )
        if effective == "strict":
            raise NVFP4GateError(msg)
        print(msg, file=sys.stderr, flush=True)
    else:
        print(f"[nvfp4-gate] ok: {len(verdicts)} sampled layers passed amax/finite/shape invariants",
              file=sys.stderr, flush=True)
    return verdicts
