"""NVFP4 (NVIDIA 4-bit float) weight loading for the Wan2.2 DiT — the second
load path alongside the canonical fp8/bf16 path in ``fp8_loader``.

Targets the ComfyUI ``_comfy`` NVFP4 convention (the ``*_comfy.safetensors``
variants of lightx2v/Wan2.2-NVFP4-Sparse, as repacked by Kijai). A linear's
weight is stored as ``uint8`` packing two E2M1 nibbles per byte (element 0 in
the upper nibble, per ComfyUI ``comfy/float.py``), with a two-level scale:
``weight_scale`` (FP8 E4M3, one per 16-element block along the in-features /
reduction axis) and ``weight_scale_2`` (FP32 per-tensor global scale). Dequant
is ``unpack(qweight) * weight_scale * weight_scale_2``.

This module only handles checkpoints that ARE NVFP4 — detection keys on the
``weight_scale_2`` discriminator (a second FP32 scale that fp8 and MXFP4
checkpoints never carry), so the canonical path is byte-identical for every
non-NVFP4 checkpoint.
"""

from __future__ import annotations

import os
import sys
from typing import Optional

import torch
import torch.nn as nn

from .fp8_loader import bridge_kj_keys

F4_E2M1_MAX = 6.0
F8_E4M3_MAX = 448.0
NVFP4_BLOCK_SIZE = 16

# E2M1 nibble -> float value, indexed by (sign << 3) | (exp << 1) | mantissa,
# matching ComfyUI comfy/float.py packing. Magnitudes are the E2M1 grid.
_E2M1_VALUES: tuple[float, ...] = (
    0.0, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 6.0,
    -0.0, -0.5, -1.0, -1.5, -2.0, -3.0, -4.0, -6.0,
)

_WEIGHT_SUFFIX = ".weight"
_WEIGHT_SCALE_SUFFIX = ".weight_scale"
_GLOBAL_SCALE_SUFFIX = ".weight_scale_2"
_INPUT_SCALE_SUFFIX = ".input_scale"
_COMFY_QUANT_SUFFIX = ".comfy_quant"
_BIAS_SUFFIX = ".bias"

_NVFP4_MEMBER_SUFFIXES: tuple[str, ...] = (
    _WEIGHT_SUFFIX,
    _WEIGHT_SCALE_SUFFIX,
    _GLOBAL_SCALE_SUFFIX,
    _INPUT_SCALE_SUFFIX,
    _COMFY_QUANT_SUFFIX,
    _BIAS_SUFFIX,
)

_nvfp4_path_logged = False


def _nvfp4_compute_mode() -> str:
    return os.environ.get("SVI2_NVFP4_COMPUTE", "bf16").strip().lower()


def _log_nvfp4_path_once(path: str) -> None:
    global _nvfp4_path_logged
    if _nvfp4_path_logged:
        return
    _nvfp4_path_logged = True
    print(f"[nvfp4] linear compute path = {path}", file=sys.stderr, flush=True)


def is_nvfp4_state_dict(state_dict: dict[str, torch.Tensor]) -> bool:
    """True when any tensor carries the ``.weight_scale_2`` second scale — the
    NVFP4 discriminator. fp8-scaled and MXFP4 checkpoints never have it."""
    return any(key.endswith(_GLOBAL_SCALE_SUFFIX) for key in state_dict)


def _e2m1_lut(device: torch.device) -> torch.Tensor:
    return torch.tensor(_E2M1_VALUES, device=device, dtype=torch.float32)


def unpack_nvfp4_weight(qweight: torch.Tensor) -> torch.Tensor:
    """Unpack ``uint8 [out, in/2]`` (element 0 = upper nibble) into int64 E2M1
    codes ``[out, in]`` in the original column order."""
    packed = qweight if qweight.dtype == torch.uint8 else qweight.view(torch.uint8)
    hi = (packed >> 4) & 0x0F
    lo = packed & 0x0F
    codes = torch.stack((hi, lo), dim=-1).reshape(packed.shape[0], packed.shape[1] * 2)
    return codes.long()


def dequantize_nvfp4(
    qweight: torch.Tensor,
    weight_scale: torch.Tensor,
    weight_scale_2: torch.Tensor,
    *,
    out_dtype: torch.dtype = torch.bfloat16,
) -> torch.Tensor:
    """Reconstruct a dense weight ``[out, in]`` from the NVFP4 triplet.

    ``weight_scale`` is the FP8 E4M3 per-block (size 16) scale shaped
    ``[out, in/16]``; ``weight_scale_2`` is the FP32 per-tensor scalar. Both
    multiply on dequant. Block scales broadcast over the in-features axis.
    """
    out_features = qweight.shape[0]
    in_features = qweight.shape[1] * 2
    block_scale = weight_scale.to(torch.float32)
    num_blocks = block_scale.shape[-1]
    if in_features % num_blocks != 0:
        raise ValueError(
            f"NVFP4 in_features={in_features} not divisible by num_blocks="
            f"{num_blocks}; padded checkpoints are not supported"
        )
    block = in_features // num_blocks
    values = _e2m1_lut(qweight.device)[unpack_nvfp4_weight(qweight)]
    values = values.reshape(out_features, num_blocks, block) * block_scale.unsqueeze(-1)
    values = values.reshape(out_features, in_features)
    global_scale = weight_scale_2.to(torch.float32).reshape(-1)[0]
    return (values * global_scale).to(out_dtype)


def _native_fp4_available() -> bool:
    return (
        _nvfp4_compute_mode() == "scaled_mm"
        and hasattr(torch, "_scaled_mm")
        and hasattr(torch, "float4_e2m1fn_x2")
    )


class NVFP4Linear(nn.Module):
    """A linear whose weight is NVFP4-quantized. Default forward dequantizes to
    bf16 and runs a normal matmul (portable: works on Windows + GB10, ~3.5x
    smaller resident weight than bf16). When ``SVI2_NVFP4_COMPUTE=scaled_mm``
    and the runtime exposes the FP4 path, it attempts a native ``_scaled_mm``
    GEMM, falling back to dequant on any failure or non-finite output.

    The native path is gated off by default and pending real-Blackwell
    validation (consumer sm_120/sm_121 FP4 GEMM is fragile as of 2026); the
    dequant path is the tested, supported one.
    """

    qweight: torch.Tensor
    weight_scale: torch.Tensor
    weight_scale_2: torch.Tensor

    def __init__(
        self,
        in_features: int,
        out_features: int,
        *,
        qweight: torch.Tensor,
        weight_scale: torch.Tensor,
        weight_scale_2: torch.Tensor,
        input_scale: Optional[torch.Tensor] = None,
        bias: Optional[torch.Tensor] = None,
    ) -> None:
        super().__init__()
        self.in_features = in_features
        self.out_features = out_features
        self.register_buffer("qweight", qweight)
        self.register_buffer("weight_scale", weight_scale)
        self.register_buffer("weight_scale_2", weight_scale_2.to(torch.float32).reshape(-1)[:1])
        if input_scale is not None:
            self.register_buffer("input_scale", input_scale.to(torch.float32).reshape(-1)[:1])
        else:
            self.input_scale: Optional[torch.Tensor] = None
        if bias is not None:
            self.register_parameter("bias", nn.Parameter(bias))
        else:
            self.bias: Optional[nn.Parameter] = None

    def dequantized_weight(self, out_dtype: torch.dtype = torch.bfloat16) -> torch.Tensor:
        return dequantize_nvfp4(
            self.qweight, self.weight_scale, self.weight_scale_2, out_dtype=out_dtype
        )

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        use_native = _native_fp4_available() and x.device.type == "cuda"
        _log_nvfp4_path_once("scaled_mm" if use_native else "bf16_dequant")
        if use_native:
            try:
                return self._native_forward(x)
            except (RuntimeError, AssertionError, NotImplementedError) as exc:
                if "out of memory" in str(exc).lower():
                    raise
        return self._dequant_forward(x)

    def _dequant_forward(self, x: torch.Tensor) -> torch.Tensor:
        weight = self.dequantized_weight()
        out = (x.to(torch.bfloat16) @ weight.t()).to(x.dtype)
        if self.bias is not None:
            out = out + self.bias.to(out.dtype)
        return out

    def _native_forward(self, x: torch.Tensor) -> torch.Tensor:
        """Best-effort native NVFP4 GEMM via ``torch._scaled_mm``. Wired but
        UNVALIDATED on consumer Blackwell — raises to trigger the dequant
        fallback unless a finite result is produced. Real swizzled-scale +
        activation-quant integration is deferred to GPU validation."""
        raise NotImplementedError("native NVFP4 _scaled_mm path pending GPU validation")


def build_nvfp4_linears(state_dict: dict[str, torch.Tensor]) -> dict[str, NVFP4Linear]:
    """Build an ``NVFP4Linear`` for every weight that has a paired
    ``.weight_scale_2``. Keys are bridged (``diffusion_model.`` etc. stripped).
    Weights without the second scale are left for the canonical path."""
    bridged = bridge_kj_keys(state_dict)
    bases = {
        key[: -len(_GLOBAL_SCALE_SUFFIX)]
        for key in bridged
        if key.endswith(_GLOBAL_SCALE_SUFFIX)
    }
    result: dict[str, NVFP4Linear] = {}
    for base in bases:
        qweight = bridged.get(f"{base}{_WEIGHT_SUFFIX}")
        weight_scale = bridged.get(f"{base}{_WEIGHT_SCALE_SUFFIX}")
        weight_scale_2 = bridged.get(f"{base}{_GLOBAL_SCALE_SUFFIX}")
        if qweight is None or weight_scale is None or weight_scale_2 is None:
            continue
        out_features = qweight.shape[0]
        in_features = qweight.shape[1] * 2
        result[base] = NVFP4Linear(
            in_features,
            out_features,
            qweight=qweight,
            weight_scale=weight_scale,
            weight_scale_2=weight_scale_2,
            input_scale=bridged.get(f"{base}{_INPUT_SCALE_SUFFIX}"),
            bias=bridged.get(f"{base}{_BIAS_SUFFIX}"),
        )
    return result


def nvfp4_member_keys(state_dict: dict[str, torch.Tensor]) -> set[str]:
    """Bridged keys belonging to NVFP4 linears (weight, both scales, input
    scale, comfy_quant, bias) — excluded from the bf16 remainder so a packed
    uint8 weight is never blindly cast to bf16."""
    bridged = bridge_kj_keys(state_dict)
    bases = {
        key[: -len(_GLOBAL_SCALE_SUFFIX)]
        for key in bridged
        if key.endswith(_GLOBAL_SCALE_SUFFIX)
    }
    members: set[str] = set()
    for base in bases:
        for suffix in _NVFP4_MEMBER_SUFFIXES:
            members.add(f"{base}{suffix}")
    return members
