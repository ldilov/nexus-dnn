from __future__ import annotations

import logging
import os
from dataclasses import dataclass
from pathlib import Path
from typing import TYPE_CHECKING, Any, Iterable

import torch.nn as _nn

from .longcat_native_loader import (
    _meta_param_names,
    _rebind_preprocessor_modules,
    rename_comfy_keys,
)

if TYPE_CHECKING:
    import torch  # noqa: F401  — used in string annotations only


logger = logging.getLogger(__name__)


ALLOWED_OFFLOAD_MODES: tuple[str, ...] = (
    "none",
    "partial",
    "sequential",
    "group",
    "disk",
)

WEIGHT_SCALE_SUFFIXES: tuple[str, ...] = (
    ".scale_weight",
    ".weight_scale",
    ".scale",
    ".weight_scale_inv",
)

INPUT_SCALE_SUFFIXES: tuple[str, ...] = (".input_scale",)

SCALE_SUFFIXES: tuple[str, ...] = WEIGHT_SCALE_SUFFIXES + INPUT_SCALE_SUFFIXES

_FP8_DTYPES: frozenset[Any] = frozenset()


class SafetensorsSchemaMismatch(Exception):
    """Safetensors state-dict does not match the native LongCat DiT schema."""


@dataclass
class NativeLongCatSafetensorsBundle:
    transformer: Any
    config: dict[str, Any]
    install_device: Any
    offload_mode: str
    compute_dtype: Any


def _fp8_dtypes() -> frozenset[Any]:
    global _FP8_DTYPES
    if _FP8_DTYPES:
        return _FP8_DTYPES
    import torch

    candidates: list[Any] = []
    for name in ("float8_e4m3fn", "float8_e5m2", "float8_e4m3fnuz", "float8_e5m2fnuz"):
        dt = getattr(torch, name, None)
        if dt is not None:
            candidates.append(dt)
    _FP8_DTYPES = frozenset(candidates)
    return _FP8_DTYPES


def _is_fp8(dtype: Any) -> bool:
    return dtype in _fp8_dtypes()


def _has_scale_suffix(key: str) -> bool:
    return any(key.endswith(suf) for suf in SCALE_SUFFIXES)


def _strip_scale_suffix(key: str) -> str | None:
    for suf in SCALE_SUFFIXES:
        if key.endswith(suf):
            return key[: -len(suf)]
    return None


def _load_safetensors_state_dict(
    path: Path, target_dtype: Any, allow_lazy_fp8: bool
) -> dict[str, Any]:
    from safetensors.torch import load_file

    raw = load_file(str(path), device="cpu")
    if allow_lazy_fp8:
        return raw

    out: dict[str, Any] = {}
    for k, v in raw.items():
        if _is_fp8(v.dtype):
            out[k] = v.to(target_dtype)
        else:
            out[k] = v
    return out


def _audit_key_overlap(
    state_dict: dict[str, Any], model_keys: Iterable[str]
) -> None:
    src_keys = set(state_dict)
    tgt_keys = set(model_keys)
    overlap = len(src_keys & tgt_keys)
    logger.info(
        "longcat_safetensors_loader: key audit src=%d target=%d overlap=%d",
        len(src_keys),
        len(tgt_keys),
        overlap,
    )


def _validate_against_model(
    state_dict: dict[str, Any], model: Any, *, sample_limit: int = 16
) -> tuple[int, list[str], list[str], list[tuple[str, tuple[int, ...], tuple[int, ...]]]]:
    target = {
        k: tuple(int(d) for d in v.shape) for k, v in model.state_dict().items()
    }
    src = {k: tuple(int(d) for d in v.shape) for k, v in state_dict.items()}
    src_keys = set(src)
    tgt_keys = set(target)
    missing = sorted(tgt_keys - src_keys)
    extra = sorted(src_keys - tgt_keys)
    shape_mismatches = [
        (k, src[k], target[k])
        for k in sorted(src_keys & tgt_keys)
        if src[k] != target[k]
    ]
    matched = len(src_keys & tgt_keys) - len(shape_mismatches)
    return (
        matched,
        missing[:sample_limit],
        extra[:sample_limit],
        shape_mismatches[:sample_limit],
    )


def _partition_extras(extras: list[str]) -> tuple[list[str], list[str]]:
    scale_like: list[str] = []
    orphan: list[str] = []
    for k in extras:
        if _has_scale_suffix(k) or "scale" in k.rsplit(".", 1)[-1].lower():
            scale_like.append(k)
        else:
            orphan.append(k)
    return scale_like, orphan


class FP8Linear(_nn.Module):
    # Reported as "Linear" through the class-name attribute so upstream
    # `lora_utils.LoRANetwork` accepts FP8Linear as a LoRA-target module
    # (the upstream check whitelists "Linear" + "QuantizedLinear" only).
    __qualname__ = "FP8Linear"

    def __init__(
        self,
        in_features: int,
        out_features: int,
        bias: bool,
        compute_dtype: Any,
        device: Any,
    ) -> None:
        super().__init__()
        import torch

        self.in_features = int(in_features)
        self.out_features = int(out_features)
        self.compute_dtype = compute_dtype
        self._device = torch.device(device)

        weight_meta = torch.empty(
            (self.out_features, self.in_features),
            dtype=torch.float8_e4m3fn,
            device="meta",
        )
        self.register_parameter(
            "weight", _nn.Parameter(weight_meta, requires_grad=False)
        )
        if bias:
            bias_meta = torch.empty(
                (self.out_features,), dtype=compute_dtype, device="meta"
            )
            self.register_parameter(
                "bias", _nn.Parameter(bias_meta, requires_grad=False)
            )
        else:
            self.register_parameter("bias", None)

        self.register_buffer("weight_scale", None)
        self.register_buffer("input_scale", None)

    def attach_scale(self, scale: Any) -> None:
        if scale is None:
            self.weight_scale = None
            return
        if scale.ndim > 2:
            raise ValueError(
                f"FP8Linear.attach_scale: weight_scale must be scalar, 1D, or "
                f"2D — got shape {tuple(scale.shape)}"
            )
        if scale.numel() not in (1, self.out_features):
            raise ValueError(
                f"FP8Linear.attach_scale: weight_scale numel "
                f"{scale.numel()} does not match out_features="
                f"{self.out_features} (and is not a scalar)"
            )
        self.weight_scale = scale

    def attach_input_scale(self, scale: Any) -> None:
        if scale is None:
            self.input_scale = None
            return
        if scale.numel() != 1:
            raise ValueError(
                f"FP8Linear.attach_input_scale: input_scale must be a scalar "
                f"(per-tensor) — got shape {tuple(scale.shape)}, "
                f"numel={scale.numel()}"
            )
        self.input_scale = scale

    def _can_use_scaled_mm(self) -> bool:
        import torch

        if not hasattr(torch, "_scaled_mm"):
            return False
        if self.weight_scale is None or self.input_scale is None:
            return False
        if not _is_fp8(self.weight.dtype):
            return False
        if self.weight_scale.numel() != 1:
            return False
        if self.input_scale.numel() != 1:
            return False
        return True

    def _scaled_mm_forward(self, x: Any) -> Any:
        import torch

        orig_shape = tuple(x.shape)
        if orig_shape[-1] != self.in_features:
            raise RuntimeError(
                f"FP8Linear._scaled_mm_forward: input last-dim "
                f"{orig_shape[-1]} != in_features {self.in_features}"
            )

        input_scale_f32 = self.input_scale.to(torch.float32).reshape(())
        weight_scale_f32 = self.weight_scale.to(torch.float32).reshape(())

        x_2d = x.reshape(-1, self.in_features).contiguous()
        x_scaled = x_2d.to(torch.float32) / input_scale_f32
        x_fp8 = x_scaled.clamp(-448.0, 448.0).to(torch.float8_e4m3fn)

        bias_arg: Any
        if self.bias is None:
            bias_arg = None
        elif self.compute_dtype in (torch.bfloat16, torch.float16):
            bias_arg = self.bias.to(self.compute_dtype)
        else:
            bias_arg = self.bias.to(torch.bfloat16)

        out_dtype = (
            self.compute_dtype
            if self.compute_dtype in (torch.bfloat16, torch.float16)
            else torch.bfloat16
        )

        out_2d = torch._scaled_mm(
            x_fp8,
            self.weight.t(),
            scale_a=input_scale_f32,
            scale_b=weight_scale_f32,
            bias=bias_arg,
            out_dtype=out_dtype,
            use_fast_accum=False,
        )

        out_2d = out_2d.to(self.compute_dtype)
        return out_2d.reshape(*orig_shape[:-1], self.out_features)

    def _upcast_forward(self, x: Any) -> Any:
        import torch.nn.functional as F

        w = self.weight
        b = self.bias
        if _is_fp8(w.dtype):
            try:
                upcast = w.to(self.compute_dtype)
                if self.weight_scale is not None:
                    scale = self.weight_scale.to(self.compute_dtype)
                    if scale.ndim == 0 or scale.numel() == 1:
                        upcast = upcast * scale
                    else:
                        upcast = upcast * scale.view(self.out_features, 1)
                return F.linear(x.to(self.compute_dtype), upcast, b)
            except RuntimeError as e:
                msg = str(e).lower()
                if "float8" in msg or "fp8" in msg:
                    logger.warning(
                        "FP8Linear._upcast_forward: fp8-related RuntimeError, "
                        "retrying without scale: %s "
                        "(x.shape=%s weight.shape=%s weight.dtype=%s)",
                        e,
                        tuple(x.shape),
                        tuple(w.shape),
                        w.dtype,
                    )
                    return F.linear(
                        x.to(self.compute_dtype),
                        w.to(self.compute_dtype),
                        b,
                    )
                raise
        return F.linear(x.to(self.compute_dtype), w, b)

    def forward(self, x: Any) -> Any:
        if self._can_use_scaled_mm():
            try:
                return self._scaled_mm_forward(x)
            except RuntimeError as e:
                msg = str(e).lower()
                if (
                    "scaled_mm" in msg
                    or "float8" in msg
                    or "fp8" in msg
                    or "not supported" in msg
                    or "not implemented" in msg
                ):
                    logger.warning(
                        "FP8Linear.forward: torch._scaled_mm unsupported, "
                        "falling back to upcast: %s "
                        "(x.shape=%s weight.shape=%s weight.dtype=%s)",
                        e,
                        tuple(x.shape),
                        tuple(self.weight.shape),
                        self.weight.dtype,
                    )
                else:
                    raise
        return self._upcast_forward(x)


def _replace_linears_with_fp8(
    model: Any, state_dict: dict[str, Any], compute_dtype: Any, device: Any
) -> int:
    import torch

    swapped = 0
    for parent_name, parent in list(model.named_modules()):
        for child_name, child in list(parent.named_children()):
            if not isinstance(child, torch.nn.Linear):
                continue
            full = (
                f"{parent_name}.{child_name}" if parent_name else child_name
            )
            weight_key = f"{full}.weight"
            sd_w = state_dict.get(weight_key)
            if sd_w is None or not _is_fp8(sd_w.dtype):
                continue
            bias_present = (
                child.bias is not None
                or state_dict.get(f"{full}.bias") is not None
            )
            replacement = FP8Linear(
                in_features=child.in_features,
                out_features=child.out_features,
                bias=bias_present,
                compute_dtype=compute_dtype,
                device=device,
            )
            setattr(parent, child_name, replacement)
            swapped += 1
    return swapped


def _install_state_dict(
    model: Any,
    state_dict: dict[str, Any],
    *,
    install_device: Any,
    compute_dtype: Any,
) -> tuple[int, int, int, list[str], list[str]]:
    import torch
    from diffusers.utils import get_module_from_name

    consumed_scales: set[str] = set()
    installed = 0
    skipped = 0
    fp8_installed = 0
    unscaled_fp8_weights: list[str] = []

    for name, value in state_dict.items():
        if _has_scale_suffix(name):
            continue

        try:
            module, tensor_name = get_module_from_name(model, name)
        except (AttributeError, KeyError):
            skipped += 1
            continue

        is_fp8_value = _is_fp8(value.dtype)
        if is_fp8_value and isinstance(module, FP8Linear) and tensor_name == "weight":
            module.weight = torch.nn.Parameter(
                value.to(install_device), requires_grad=False
            )
            base = name[: -len(".weight")]
            weight_scale_attached = False
            for suffix in WEIGHT_SCALE_SUFFIXES:
                scale_key = f"{base}{suffix}"
                scale_tensor = state_dict.get(scale_key)
                if scale_tensor is not None:
                    module.attach_scale(scale_tensor.to(install_device))
                    consumed_scales.add(scale_key)
                    weight_scale_attached = True
                    break
            for suffix in INPUT_SCALE_SUFFIXES:
                input_scale_key = f"{base}{suffix}"
                input_scale_tensor = state_dict.get(input_scale_key)
                if input_scale_tensor is not None:
                    module.attach_input_scale(
                        input_scale_tensor.to(install_device)
                    )
                    consumed_scales.add(input_scale_key)
                    break
            if not weight_scale_attached:
                unscaled_fp8_weights.append(name)
            fp8_installed += 1
            installed += 1
            continue

        if is_fp8_value:
            casted = value.to(compute_dtype).to(install_device)
        elif value.is_floating_point() and value.dtype != compute_dtype:
            casted = value.to(compute_dtype).to(install_device)
        else:
            casted = value.to(install_device)

        if isinstance(module, FP8Linear):
            if tensor_name == "weight":
                module.weight = torch.nn.Parameter(casted, requires_grad=False)
                installed += 1
            elif tensor_name == "bias":
                module.bias = torch.nn.Parameter(casted, requires_grad=False)
                installed += 1
            else:
                skipped += 1
            continue

        if not isinstance(module, torch.nn.Module):
            skipped += 1
            continue

        if tensor_name in module._parameters:
            module._parameters[tensor_name] = torch.nn.Parameter(
                casted, requires_grad=False
            )
            installed += 1
        elif tensor_name in module._buffers:
            module._buffers[tensor_name] = casted
            installed += 1
        else:
            skipped += 1

    unconsumed_scales = sorted(
        k
        for k in state_dict
        if k not in consumed_scales
        and (_has_scale_suffix(k) or "scale" in k.rsplit(".", 1)[-1].lower())
    )
    return installed, skipped, fp8_installed, unscaled_fp8_weights, unconsumed_scales


def _no_meta_tensors_remaining(model: Any) -> list[str]:
    return _meta_param_names(model)


def _attach_sequential_offload(model: Any, execution_device: Any) -> None:
    blocks = _enumerate_offload_blocks(model)
    if not blocks:
        raise RuntimeError(
            "sequential offload: no transformer blocks discovered on the "
            "longcat DiT — the block-attribute heuristic must be re-probed."
        )
    _attach_block_offload_hooks(blocks, execution_device, swap_count=len(blocks))
    logger.info(
        "longcat_safetensors_loader: sequential offload attached to %d blocks "
        "(exec=%s, offload=cpu-pinned)",
        len(blocks),
        execution_device,
    )


def _move_non_block_params_to_device(model: Any, device: Any) -> None:
    # After installing to CPU + attaching block hooks, the non-transformer-block
    # params (patch_embed, time_embed, text_embed, final layer, top-level norms)
    # are still on CPU. Move them to GPU so they're resident during forward
    # without the per-step CPU↔GPU hop the block hooks would impose.
    import torch

    block_attr_names = ("transformer_blocks", "blocks", "layers")
    block_modules: set[int] = set()
    for attr in block_attr_names:
        sub = getattr(model, attr, None)
        if sub is None:
            continue
        for m in sub:
            block_modules.add(id(m))
    moved = 0
    for name, param in model.named_parameters(recurse=True):
        owner = model
        owner_id = id(owner)
        # walk to leaf module owner of this param
        parts = name.split(".")
        for part in parts[:-1]:
            owner = getattr(owner, part)
            owner_id = id(owner)
            if owner_id in block_modules:
                break
        if owner_id in block_modules:
            continue
        if param.device != torch.device(device):
            param.data = param.data.to(device)
            moved += 1
    for name, buf in model.named_buffers(recurse=True):
        owner = model
        owner_id = id(owner)
        parts = name.split(".")
        for part in parts[:-1]:
            owner = getattr(owner, part)
            owner_id = id(owner)
            if owner_id in block_modules:
                break
        if owner_id in block_modules:
            continue
        if buf.device != torch.device(device):
            owner_attr = parts[-1]
            setattr(owner, owner_attr, buf.to(device))
            moved += 1
    logger.info(
        "longcat_safetensors_loader: moved %d non-block params/buffers to %s",
        moved,
        device,
    )


def _attach_partial_offload(
    model: Any, execution_device: Any, swap_count: int
) -> None:
    if swap_count < 0:
        raise ValueError(
            f"partial offload: swap_count must be >= 0; got {swap_count}"
        )
    blocks = _enumerate_offload_blocks(model)
    if not blocks:
        raise RuntimeError(
            "partial offload: no transformer blocks discovered on the "
            "longcat DiT — the block-attribute heuristic must be re-probed."
        )
    if swap_count > len(blocks):
        raise ValueError(
            f"partial offload: swap_count={swap_count} exceeds block count "
            f"{len(blocks)}; clamp at caller or use offload_mode='sequential'."
        )
    if swap_count == 0:
        logger.info(
            "longcat_safetensors_loader: partial offload with swap_count=0 is "
            "a no-op; all %d blocks resident on %s",
            len(blocks),
            execution_device,
        )
        return
    tail = blocks[-swap_count:]
    _attach_block_offload_hooks(tail, execution_device, swap_count=swap_count)
    logger.info(
        "longcat_safetensors_loader: partial offload attached "
        "(resident=%d, swapped=%d, exec=%s)",
        len(blocks) - swap_count,
        swap_count,
        execution_device,
    )


def _attach_block_offload_hooks(
    blocks: list[Any], execution_device: Any, *, swap_count: int
) -> None:
    from accelerate.hooks import AlignDevicesHook, add_hook_to_module

    for block in blocks:
        hook = AlignDevicesHook(
            execution_device=execution_device,
            offload=True,
            io_same_device=True,
            offload_buffers=True,
            place_submodules=True,
        )
        add_hook_to_module(block, hook, append=True)


def _enumerate_offload_blocks(model: Any) -> list[Any]:
    import torch

    candidates: list[Any] = []
    for attr in ("transformer_blocks", "blocks", "layers"):
        sub = getattr(model, attr, None)
        if isinstance(sub, (list, tuple, torch.nn.ModuleList)):
            candidates.extend(list(sub))
    if candidates:
        return candidates

    for child in model.modules():
        if isinstance(child, torch.nn.ModuleList) and len(child) > 1:
            return list(child)
    return []


def _attach_group_offload(model: Any, execution_device: Any) -> None:
    from accelerate.hooks import AlignDevicesHook, add_hook_to_module

    hook = AlignDevicesHook(
        execution_device=execution_device,
        offload=True,
        io_same_device=True,
        offload_buffers=True,
        place_submodules=True,
    )
    add_hook_to_module(model, hook, append=True)
    logger.info(
        "longcat_safetensors_loader: group offload attached "
        "(exec=%s, offload=cpu-pinned)",
        execution_device,
    )


def _attach_disk_offload(
    model: Any, execution_device: Any, offload_folder: Path
) -> None:
    from accelerate import disk_offload

    offload_folder.mkdir(parents=True, exist_ok=True)
    disk_offload(
        model=model,
        offload_dir=str(offload_folder),
        execution_device=execution_device,
        offload_buffers=True,
    )
    logger.info(
        "longcat_safetensors_loader: disk offload attached (exec=%s, dir=%s)",
        execution_device,
        offload_folder,
    )


def _validate_offload_args(
    offload_mode: str,
    offload_folder: str | os.PathLike | None,
    block_swap_count: int = 0,
) -> None:
    if offload_mode not in ALLOWED_OFFLOAD_MODES:
        raise ValueError(
            f"offload_mode={offload_mode!r} is not one of "
            f"{ALLOWED_OFFLOAD_MODES}"
        )
    if offload_mode == "disk" and offload_folder is None:
        raise ValueError(
            "offload_mode='disk' requires offload_folder= to be supplied."
        )
    if offload_mode == "partial" and block_swap_count <= 0:
        raise ValueError(
            "offload_mode='partial' requires block_swap_count > 0; "
            "use 'none' to disable offload entirely."
        )
    if offload_mode != "partial" and block_swap_count > 0 and offload_mode != "sequential":
        # sequential implicitly swaps every block; other modes ignore the knob.
        logger.warning(
            "block_swap_count=%d ignored for offload_mode=%r (only 'partial' "
            "and 'sequential' consume this argument)",
            block_swap_count,
            offload_mode,
        )


def load_longcat_dit_from_safetensors(
    safetensors_path: "str | os.PathLike",
    *,
    vendor_dir: "Path | None" = None,
    config: "dict | None" = None,
    install_device: "torch.device | str | None" = None,
    compute_dtype: "torch.dtype | None" = None,
    strict_schema: bool = True,
    offload_mode: str = "none",
    offload_folder: "str | os.PathLike | None" = None,
    block_swap_count: int = 0,
    log: "logging.Logger | None" = None,
) -> NativeLongCatSafetensorsBundle:
    import torch

    _log = log or logger
    _validate_offload_args(offload_mode, offload_folder, block_swap_count)

    safetensors_path = Path(safetensors_path)
    if not safetensors_path.exists():
        raise FileNotFoundError(f"safetensors not found: {safetensors_path}")

    if install_device is None:
        install_device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    else:
        install_device = torch.device(install_device)

    if compute_dtype is None:
        compute_dtype = torch.bfloat16

    raw_sd = _load_safetensors_state_dict(safetensors_path, compute_dtype, allow_lazy_fp8=True)
    renamed_sd = rename_comfy_keys(raw_sd)

    from .longcat_native_loader import build_dit, read_embedded_config

    if config is None:
        if vendor_dir is None:
            raise ValueError(
                "load_longcat_dit_from_safetensors: supply either config= or vendor_dir= "
                "so the DiT architecture can be derived."
            )
        config = read_embedded_config(vendor_dir)

    if vendor_dir is None:
        raise ValueError(
            "load_longcat_dit_from_safetensors: vendor_dir= is required to import the DiT class."
        )

    model = build_dit(config, vendor_dir=vendor_dir, install_device="meta")

    # Load-order OOM fix (audit 2026-05-24): when an offload mode is
    # requested, install weights to CPU first so the accelerate hook can
    # snapshot from CPU memory directly instead of round-tripping every
    # block through GPU. Without this the install peak is ~28 GiB
    # (entire 15.5 GB FP8 + activations) before tail blocks are migrated.
    # head-resident blocks get moved to GPU explicitly after hook attach.
    needs_cpu_first_install = offload_mode in ("partial", "sequential", "group", "disk")
    install_target = torch.device("cpu") if needs_cpu_first_install else install_device
    if needs_cpu_first_install:
        _log.info(
            "longcat_safetensors_loader: offload_mode=%r → installing weights to "
            "CPU first to avoid load-time GPU spike; head blocks will be promoted "
            "after hook attach.",
            offload_mode,
        )

    swapped = _replace_linears_with_fp8(model, renamed_sd, compute_dtype, install_target)
    _log.info(
        "longcat_safetensors_loader: replaced %d Linear → FP8Linear", swapped
    )

    _audit_key_overlap(renamed_sd, [k for k, _ in model.named_parameters()] + [k for k, _ in model.named_buffers()])

    installed, skipped, fp8_installed, unscaled_fp8, unconsumed = _install_state_dict(
        model,
        renamed_sd,
        install_device=install_target,
        compute_dtype=compute_dtype,
    )
    _log.info(
        "longcat_safetensors_loader: installed=%d skipped=%d fp8=%d "
        "unscaled_fp8=%d unconsumed_scales=%d",
        installed,
        skipped,
        fp8_installed,
        len(unscaled_fp8),
        len(unconsumed),
    )
    if unscaled_fp8:
        _log.warning(
            "longcat_safetensors_loader: %d FP8 weights have no attached scale — "
            "will fall back to upcast forward: %s",
            len(unscaled_fp8),
            unscaled_fp8[:8],
        )

    remaining_meta = _no_meta_tensors_remaining(model)
    if remaining_meta and strict_schema:
        raise SafetensorsSchemaMismatch(
            f"load_longcat_dit_from_safetensors: {len(remaining_meta)} parameters "
            f"remain on meta device after install (strict_schema=True). "
            f"Sample: {remaining_meta[:8]}"
        )
    if remaining_meta:
        _log.warning(
            "longcat_safetensors_loader: %d parameters remain on meta device "
            "(strict_schema=False — proceeding): %s",
            len(remaining_meta),
            remaining_meta[:8],
        )

    _rebind_preprocessor_modules(model)

    if offload_mode == "sequential":
        _attach_sequential_offload(model, install_device)
    elif offload_mode == "partial":
        _attach_partial_offload(model, install_device, block_swap_count)
        # Promote the head-resident blocks (first N - swap_count) to GPU.
        # Tail blocks stay on CPU per the accelerate hook semantics.
        blocks = _enumerate_offload_blocks(model)
        resident = blocks[: max(0, len(blocks) - block_swap_count)]
        for block in resident:
            block.to(install_device)
        # Top-level non-block params (embedders, norms, final layer) — move
        # them to GPU too; they were installed to CPU and have no hook.
        _move_non_block_params_to_device(model, install_device)
    elif offload_mode == "group":
        _attach_group_offload(model, install_device)
    elif offload_mode == "disk":
        _attach_disk_offload(model, install_device, Path(offload_folder))

    return NativeLongCatSafetensorsBundle(
        transformer=model,
        config=config,
        install_device=install_device,
        offload_mode=offload_mode,
        compute_dtype=compute_dtype,
    )
