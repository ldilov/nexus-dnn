from __future__ import annotations

import json
import logging
import os
from dataclasses import dataclass
from pathlib import Path
from typing import TYPE_CHECKING, Any, Iterable

import torch.nn as _nn

from .gguf_loader import GGUFSchemaMismatch
from .ltx2_native_loader import (
    _meta_param_names,
    _rebind_preprocessor_modules,
    read_embedded_config,
    rename_comfy_keys,
)

if TYPE_CHECKING:
    import torch  # noqa: F401  — used in string annotations only


logger = logging.getLogger(__name__)


ALLOWED_OFFLOAD_MODES: tuple[str, ...] = ("none", "sequential", "group", "disk")

WEIGHT_SCALE_SUFFIXES: tuple[str, ...] = (
    ".scale_weight",
    ".weight_scale",
    ".scale",
    ".weight_scale_inv",
)

INPUT_SCALE_SUFFIXES: tuple[str, ...] = (".input_scale",)

SCALE_SUFFIXES: tuple[str, ...] = WEIGHT_SCALE_SUFFIXES + INPUT_SCALE_SUFFIXES

_FP8_DTYPES: frozenset[Any] = frozenset()


class SafetensorsSchemaMismatch(GGUFSchemaMismatch):
    """Safetensors state-dict does not match the native LTXModel schema."""


@dataclass
class NativeLtx2SafetensorsBundle:
    transformer: Any
    config: dict[str, Any]
    install_device: Any
    audio_enabled: bool
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


def _read_safetensors_config(path: Path) -> dict[str, Any] | None:
    from safetensors import safe_open

    with safe_open(str(path), framework="pt", device="cpu") as f:
        meta = f.metadata() or {}
    raw = meta.get("config") or meta.get("ltx_config")
    if not raw:
        return None
    try:
        cfg = json.loads(raw)
    except json.JSONDecodeError as e:
        raise SafetensorsSchemaMismatch(
            f"safetensors {path} '__metadata__.config' is not valid JSON: {e}."
        ) from e
    if not isinstance(cfg, dict) or "transformer" not in cfg:
        raise SafetensorsSchemaMismatch(
            f"safetensors {path} '__metadata__.config' parsed to "
            f"{type(cfg).__name__} without a 'transformer' section."
        )
    return cfg


def _resolve_config(safetensors_path: Path) -> dict[str, Any]:
    embedded = _read_safetensors_config(safetensors_path)
    if embedded is not None:
        return embedded

    sidecar_gguf_env = os.environ.get("NEXUS_VIDEO_LTX23_LTX2_GGUF", "").strip()
    candidates: list[Path] = []
    if sidecar_gguf_env:
        candidates.append(Path(sidecar_gguf_env))
    parent = safetensors_path.parent
    for sibling in sorted(parent.glob("*.gguf")):
        candidates.append(sibling)

    for cand in candidates:
        if cand.is_file():
            try:
                return read_embedded_config(cand)
            except GGUFSchemaMismatch:
                continue

    raise SafetensorsSchemaMismatch(
        f"cannot resolve embedded LTX-2 config for {safetensors_path}: "
        "no 'config' key in safetensors __metadata__ and no sibling/env "
        "GGUF supplied one. Set NEXUS_VIDEO_LTX23_LTX2_GGUF to a "
        "compatible Kijai GGUF, or re-export the safetensors with a "
        "'config' metadata field."
    )


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
        "ltx2_safetensors_loader: key audit src=%d target=%d overlap=%d",
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
            param_obj = module._parameters.get(tensor_name)
            if param_obj is None and not value.is_floating_point():
                module._parameters[tensor_name] = torch.nn.Parameter(
                    casted, requires_grad=False
                )
            else:
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
    from accelerate.hooks import AlignDevicesHook, add_hook_to_module

    blocks = _enumerate_offload_blocks(model)
    if not blocks:
        raise RuntimeError(
            "sequential offload: no transformer blocks discovered on the "
            "LTXModel — the block-attribute heuristic must be re-probed."
        )
    for block in blocks:
        hook = AlignDevicesHook(
            execution_device=execution_device,
            offload=True,
            io_same_device=True,
            offload_buffers=True,
            place_submodules=True,
        )
        add_hook_to_module(block, hook, append=True)
    logger.info(
        "ltx2_safetensors_loader: sequential offload attached to %d blocks "
        "(exec=%s, offload=cpu-pinned)",
        len(blocks),
        execution_device,
    )


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
        "ltx2_safetensors_loader: group offload attached "
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
        "ltx2_safetensors_loader: disk offload attached (exec=%s, dir=%s)",
        execution_device,
        offload_folder,
    )


def _validate_offload_args(
    offload_mode: str, offload_folder: str | os.PathLike | None
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


def load_native_stack_from_safetensors(
    safetensors_path: str | os.PathLike,
    *,
    audio: bool = False,
    install_device: "torch.device | str | None" = None,
    compute_dtype: "torch.dtype | None" = None,
    strict_schema: bool = True,
    offload_mode: str = "none",
    offload_folder: "str | os.PathLike | None" = None,
    logger: "logging.Logger | None" = None,
) -> NativeLtx2SafetensorsBundle:
    import torch
    from ltx_core.loader.helpers import create_meta_model
    from ltx_core.model.transformer.model_configurator import (
        LTXModelConfigurator,
        LTXVideoOnlyModelConfigurator,
    )

    log = logger if logger is not None else globals()["logger"]

    _validate_offload_args(offload_mode, offload_folder)

    path = Path(safetensors_path)
    if not path.is_file():
        raise FileNotFoundError(
            f"LTX-2 fp8 safetensors not found: {path}. Set "
            "NEXUS_VIDEO_LTX23_LTX2_SAFETENSORS to a valid path."
        )

    if compute_dtype is None:
        compute_dtype = torch.bfloat16

    if install_device is None:
        install_target = torch.device(
            "cuda" if torch.cuda.is_available() else "cpu"
        )
    else:
        install_target = torch.device(install_device)

    config = _resolve_config(path)

    configurator = (
        LTXModelConfigurator if audio else LTXVideoOnlyModelConfigurator
    )
    model = create_meta_model(configurator, config)

    raw_state_dict = _load_safetensors_state_dict(
        path, target_dtype=compute_dtype, allow_lazy_fp8=True
    )
    state_dict = rename_comfy_keys(raw_state_dict)

    _audit_key_overlap(state_dict, model.state_dict().keys())

    matched, missing, extra, shape_mismatches = _validate_against_model(
        state_dict, model
    )
    scale_like_extras, orphan_extras = _partition_extras(extra)

    if strict_schema and (missing or shape_mismatches or orphan_extras):
        raise SafetensorsSchemaMismatch(
            f"safetensors state-dict at {path} does not match the native "
            f"LTXModel schema: matched={matched}, missing="
            f"{len(missing)}, extra={len(extra)} "
            f"(scale-like={len(scale_like_extras)}, "
            f"orphan={len(orphan_extras)}), "
            f"shape_mismatches={len(shape_mismatches)}. "
            f"Sample missing={missing[:5]}, orphan_extra={orphan_extras[:5]}, "
            f"shape_mismatch={shape_mismatches[:3]}. "
            "The comfy-key rename or the embedded config diverged from "
            "what this safetensors carries — re-probe before forcing a "
            "load with strict_schema=False."
        )
    if scale_like_extras:
        log.warning(
            "ltx2_safetensors_loader: %d scale-like extra keys present "
            "(will be consumed if a matching fp8 weight installs): %s",
            len(scale_like_extras),
            scale_like_extras[:5],
        )
    if not strict_schema and orphan_extras:
        log.warning(
            "ltx2_safetensors_loader: strict_schema=False — %d orphan extra "
            "keys ignored: %s",
            len(orphan_extras),
            orphan_extras[:5],
        )
    log.info(
        "ltx2_safetensors_loader: schema matched=%d missing=%d extra=%d "
        "shape_mismatches=%d",
        matched,
        len(missing),
        len(extra),
        len(shape_mismatches),
    )

    fp8_swapped = _replace_linears_with_fp8(
        model, state_dict, compute_dtype, install_target
    )
    log.info(
        "ltx2_safetensors_loader: replaced %d nn.Linear with FP8Linear",
        fp8_swapped,
    )

    _rebind_preprocessor_modules(model)

    (
        installed,
        skipped,
        fp8_installed,
        unscaled_fp8_weights,
        unconsumed_scales,
    ) = _install_state_dict(
        model,
        state_dict,
        install_device=install_target,
        compute_dtype=compute_dtype,
    )
    log.info(
        "ltx2_safetensors_loader: installed=%d skipped=%d fp8=%d",
        installed,
        skipped,
        fp8_installed,
    )

    if fp8_installed > 0 and unconsumed_scales:
        raise SafetensorsSchemaMismatch(
            f"safetensors at {path} carries {len(unconsumed_scales)} "
            f"unconsumed scale keys after fp8 install — unrecognised "
            f"suffix. Sample unconsumed_scales={unconsumed_scales[:6]}, "
            f"unscaled_fp8_weights={unscaled_fp8_weights[:6]}. "
            "Extend SCALE_SUFFIXES or re-export the checkpoint with a "
            "recognised scale-key naming convention; otherwise the fp8 "
            "weights will silently render garbage."
        )

    meta_left = _no_meta_tensors_remaining(model)
    if meta_left:
        raise SafetensorsSchemaMismatch(
            f"after fp8 safetensors install {len(meta_left)} LTXModel "
            f"params/buffers are still on meta — sample {meta_left[:6]}. "
            "The safetensors did not cover the full native schema; the "
            "embedded config and the comfy rename must be re-probed."
        )

    if offload_mode == "sequential":
        _attach_sequential_offload(model, execution_device=install_target)
    elif offload_mode == "group":
        _attach_group_offload(model, execution_device=install_target)
    elif offload_mode == "disk":
        assert offload_folder is not None
        _attach_disk_offload(
            model,
            execution_device=install_target,
            offload_folder=Path(offload_folder),
        )

    return NativeLtx2SafetensorsBundle(
        transformer=model,
        config=config,
        install_device=install_target,
        audio_enabled=audio,
        offload_mode=offload_mode,
        compute_dtype=compute_dtype,
    )
