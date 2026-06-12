from __future__ import annotations

import os
from pathlib import Path
from typing import Callable, Optional

import torch
import torch.nn as nn


def _fp8_compute_mode() -> str:
    return os.environ.get("SVI2_FP8_COMPUTE", "bf16").strip().lower()


_fp8_path_logged = False


def _log_fp8_path_once(path: str) -> None:
    global _fp8_path_logged
    if _fp8_path_logged:
        return
    _fp8_path_logged = True
    import sys

    print(f"[fp8] linear compute path = {path}", file=sys.stderr, flush=True)

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
        use_scaled_mm = (
            _fp8_compute_mode() == "scaled_mm"
            and x.device.type == "cuda"
            and hasattr(torch, "_scaled_mm")
        )
        _log_fp8_path_once("scaled_mm" if use_scaled_mm else "bf16_dequant")
        if use_scaled_mm:
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
        # Dequant weight (scale applied in fp32 for accuracy) then bf16 matmul —
        # full-precision activations, no fp8 activation quant. Clean on Blackwell.
        w = (self.weight_fp8.float() * self.scale_weight).to(torch.bfloat16)
        out = (x.to(torch.bfloat16) @ w.t()).to(x.dtype)
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


def _is_fp8_linear_weight_key(key: str, state_dict: dict[str, torch.Tensor]) -> bool:
    return key.endswith(".weight") and is_fp8_dtype(state_dict[key].dtype)


def _fp8_linear_member_keys(state_dict: dict[str, torch.Tensor]) -> set[str]:
    fp8_weight_bases = {
        key[: -len(".weight")]
        for key in state_dict
        if _is_fp8_linear_weight_key(key, state_dict)
    }
    members: set[str] = set()
    for base in fp8_weight_bases:
        members.add(f"{base}.weight")
        members.add(f"{base}.bias")
        for suffix in WEIGHT_SCALE_SUFFIXES:
            members.add(f"{base}{suffix}")
    return members


def build_remainder_bf16(state_dict: dict[str, torch.Tensor]) -> dict[str, torch.Tensor]:
    bridged = bridge_kj_keys(state_dict)
    fp8_members = _fp8_linear_member_keys(bridged)
    remainder: dict[str, torch.Tensor] = {}
    for key, value in bridged.items():
        if key in fp8_members:
            continue
        if _is_scale_key(key):
            continue
        if is_fp8_dtype(value.dtype):
            continue
        remainder[key] = value.to(torch.bfloat16)
    return remainder


def _assert_no_meta(module: nn.Module) -> None:
    leftover: list[str] = []
    for name, param in module.named_parameters():
        if param.is_meta:
            leftover.append(f"param:{name}")
    for name, buf in module.named_buffers():
        if buf.is_meta:
            leftover.append(f"buffer:{name}")
    if leftover:
        raise RuntimeError(
            "meta load incomplete — tensors still on meta device: " + ", ".join(sorted(leftover))
        )


def _materialize_freqs(dit: nn.Module) -> None:
    from .wan22.dit import precompute_freqs_cis_3d

    freqs = getattr(dit, "freqs", None)
    if freqs is None:
        return
    needs_rebuild = any(
        isinstance(f, torch.Tensor) and f.is_meta for f in freqs
    )
    if not needs_rebuild:
        dit.freqs = tuple(f.to("cpu") for f in freqs)
        return
    dit.freqs = precompute_freqs_cis_3d(_freqs_head_dim(dit))


def _freqs_head_dim(dit: nn.Module) -> int:
    return dit.blocks[0].self_attn.head_dim


def load_expert_meta(
    config: dict,
    dit_path: str | Path,
    build_model: Callable[[dict], nn.Module],
) -> tuple[nn.Module, dict[str, object]]:
    with torch.device("meta"):
        dit = build_model(config)

    state = load_fp8_state_dict(dit_path)
    audit = audit_key_overlap(state, dit)

    linears = build_fp8_linears(state)
    apply_fp8_linears_to_module(dit, linears)

    remainder = build_remainder_bf16(state)
    dit.load_state_dict(remainder, strict=False, assign=True)

    _materialize_freqs(dit)
    _assert_no_meta(dit)

    return dit, audit
