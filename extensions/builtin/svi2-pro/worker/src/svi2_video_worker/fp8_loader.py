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


_COMFY_PREFIXES: tuple[str, ...] = ("diffusion_model.", "model.diffusion_model.", "model.")


def _strip_comfy_prefix(key: str) -> str:
    for prefix in _COMFY_PREFIXES:
        if key.startswith(prefix):
            return key[len(prefix) :]
    return key


def bridge_kj_keys(state_dict: dict[str, torch.Tensor]) -> dict[str, torch.Tensor]:
    bridged: dict[str, torch.Tensor] = {}
    for key, value in state_dict.items():
        bridged[_strip_comfy_prefix(key)] = value
    return bridged


def audit_key_overlap(
    state_dict: dict[str, torch.Tensor], module: nn.Module
) -> dict[str, object]:
    bridged = bridge_kj_keys(state_dict)
    target_names = set(dict(module.named_parameters()).keys()) | set(
        dict(module.named_buffers()).keys()
    )
    src_param_names = {k for k in bridged if not _is_scale_key(k)}
    matched = sorted(src_param_names & target_names)
    unmatched_src = sorted(src_param_names - target_names)
    unmatched_target = sorted(target_names - src_param_names)
    overlap_pct = (100.0 * len(matched) / len(target_names)) if target_names else 0.0
    return {
        "src_count": len(src_param_names),
        "target_count": len(target_names),
        "matched_count": len(matched),
        "overlap_pct": overlap_pct,
        "unmatched_src": unmatched_src,
        "unmatched_target": unmatched_target,
    }


def _is_scale_key(key: str) -> bool:
    return any(key.endswith(suffix) for suffix in WEIGHT_SCALE_SUFFIXES)


def apply_fp8_linears_to_module(
    module: nn.Module, fp8_linears: dict[str, ScaledFP8Linear]
) -> dict[str, object]:
    installed: list[str] = []
    missing: list[str] = []
    for linear_path, fp8_linear in fp8_linears.items():
        parent, _, child = linear_path.rpartition(".")
        try:
            parent_module = module.get_submodule(parent) if parent else module
        except AttributeError:
            missing.append(linear_path)
            continue
        if not hasattr(parent_module, child):
            missing.append(linear_path)
            continue
        setattr(parent_module, child, fp8_linear)
        installed.append(linear_path)
    return {"installed_count": len(installed), "missing_count": len(missing), "missing": missing}


def build_fp8_linears(state_dict: dict[str, torch.Tensor]) -> dict[str, ScaledFP8Linear]:
    state_dict = bridge_kj_keys(state_dict)
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
