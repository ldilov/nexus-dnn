from __future__ import annotations

from pathlib import Path
from typing import Optional

import torch
import torch.nn as nn

WEIGHT_SCALE_SUFFIXES: tuple[str, ...] = (
    ".scale_weight",
    ".weight_scale",
    ".scale",
    ".weight_scale_inv",
)

_FP8_DTYPES: tuple[torch.dtype, ...] = tuple(
    filter(
        None,
        [
            getattr(torch, "float8_e4m3fn", None),
            getattr(torch, "float8_e5m2", None),
            getattr(torch, "float8_e4m3fnuz", None),
            getattr(torch, "float8_e5m2fnuz", None),
        ],
    )
)


def is_fp8_dtype(dtype: torch.dtype) -> bool:
    return dtype in _FP8_DTYPES


class ScaledFP8Linear(nn.Module):
    weight_fp8: torch.Tensor
    scale_weight: torch.Tensor

    def __init__(
        self,
        in_features: int,
        out_features: int,
        *,
        weight_fp8: torch.Tensor,
        scale_weight: torch.Tensor,
        bias: Optional[torch.Tensor] = None,
    ) -> None:
        super().__init__()
        self.in_features = in_features
        self.out_features = out_features
        self.register_buffer("weight_fp8", weight_fp8)
        scale_w = scale_weight if isinstance(scale_weight, torch.Tensor) else torch.tensor(scale_weight)
        self.register_buffer("scale_weight", scale_w.to(torch.float32))
        if bias is not None:
            self.register_parameter("bias", nn.Parameter(bias))
        else:
            self.bias: Optional[nn.Parameter] = None

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        if x.device.type == "cuda" and hasattr(torch, "_scaled_mm"):
            return self._cuda_forward(x)
        return self._fallback_forward(x)

    def _cuda_forward(self, x: torch.Tensor) -> torch.Tensor:
        try:
            x_fp32 = x.float()
            amax_x = x_fp32.abs().max().clamp(min=1e-12)
            scale_a = (amax_x / 448.0).to(torch.float32)
            x_fp8 = (x_fp32 / scale_a).clamp(-448.0, 448.0).to(torch.float8_e4m3fn)
            w_t = self.weight_fp8.t().contiguous()
            out = torch._scaled_mm(
                x_fp8,
                w_t,
                scale_a=scale_a,
                scale_b=self.scale_weight,
                out_dtype=torch.bfloat16,
            )
            if self.bias is not None:
                out = out + self.bias
            return out
        except (RuntimeError, AssertionError) as exc:
            if "out of memory" in str(exc).lower():
                raise
            return self._fallback_forward(x)

    def _fallback_forward(self, x: torch.Tensor) -> torch.Tensor:
        w = self.weight_fp8.float() * self.scale_weight
        out = (x.float() @ w.t()).to(x.dtype)
        if self.bias is not None:
            out = out + self.bias.to(out.dtype)
        return out


def load_fp8_state_dict(path: str | Path) -> dict[str, torch.Tensor]:
    from safetensors.torch import load_file

    return load_file(str(path), device="cpu")


def build_fp8_linears(state_dict: dict[str, torch.Tensor]) -> dict[str, ScaledFP8Linear]:
    weight_keys = {
        k[: -len(".weight")]
        for k in state_dict
        if k.endswith(".weight") and is_fp8_dtype(state_dict[k].dtype)
    }

    result: dict[str, ScaledFP8Linear] = {}
    for name in weight_keys:
        w_fp8 = state_dict[f"{name}.weight"]
        scale: Optional[torch.Tensor] = None
        for suffix in WEIGHT_SCALE_SUFFIXES:
            candidate = f"{name}{suffix}"
            if candidate in state_dict:
                scale = state_dict[candidate]
                break
        if scale is None:
            continue
        in_f = w_fp8.shape[1]
        out_f = w_fp8.shape[0]
        bias_key = f"{name}.bias"
        bias = state_dict.get(bias_key)
        result[name] = ScaledFP8Linear(
            in_f,
            out_f,
            weight_fp8=w_fp8,
            scale_weight=scale,
            bias=bias,
        )

    return result
