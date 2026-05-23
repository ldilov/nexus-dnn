from __future__ import annotations

import json
import logging
import os
from dataclasses import dataclass
from pathlib import Path
from typing import TYPE_CHECKING, Any, Iterable

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

_FP8_DTYPES: frozenset[Any] = frozenset()  # populated lazily on first use


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


class FP8Linear:
    """nn.Linear replacement that stores fp8 weights and upcasts at forward.

    Wrapper rather than subclass because torch.nn.Linear's constructor
    allocates fresh fp32 storage we would have to discard. This class
    exposes the .weight / .bias / forward contract nn.Module consumers
    use, plus the ._parameters / ._buffers dict mounting the state-dict
    install loop walks.
    """

    def __init__(
        self,
        in_features: int,
        out_features: int,
        bias: bool,
        compute_dtype: Any,
        device: Any,
    ) -> None:
        import torch

        self.in_features = int(in_features)
        self.out_features = int(out_features)
        self.compute_dtype = compute_dtype
        self._device = torch.device(device)
        self._parameters: dict[str, Any] = {}
        self._buffers: dict[str, Any] = {}
        self._modules: dict[str, Any] = {}
        self._weight_scale: Any = None
        self.training = False
        weight_meta = torch.empty(
            (self.out_features, self.in_features),
            dtype=torch.float8_e4m3fn,
            device="meta",
        )
        self._parameters["weight"] = torch.nn.Parameter(
            weight_meta, requires_grad=False
        )
        if bias:
            bias_meta = torch.empty(
                (self.out_features,), dtype=compute_dtype, device="meta"
            )
            self._parameters["bias"] = torch.nn.Parameter(
                bias_meta, requires_grad=False
            )
        else:
            self._parameters["bias"] = None

    @property
    def weight(self) -> Any:
        return self._parameters["weight"]

    @property
    def bias(self) -> Any:
        return self._parameters["bias"]

    def attach_scale(self, scale: Any) -> None:
        self._weight_scale = scale

    def __call__(self, x: Any) -> Any:
        return self.forward(x)

    def forward(self, x: Any) -> Any:
        import torch.nn.functional as F

        w = self.weight
        b = self.bias
        if _is_fp8(w.dtype):
            try:
                upcast = w.to(self.compute_dtype)
                if self._weight_scale is not None:
                    upcast = upcast * self._weight_scale.to(self.compute_dtype)
                out = F.linear(x.to(self.compute_dtype), upcast, b)
            except RuntimeError:
                out = F.linear(
                    x.to(self.compute_dtype),
                    w.to(self.compute_dtype),
                    b,
                )
        else:
            out = F.linear(x.to(self.compute_dtype), w, b)
        return out


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
            parent._modules[child_name] = replacement
            swapped += 1
    return swapped


def _install_state_dict(
    model: Any,
    state_dict: dict[str, Any],
    *,
    install_device: Any,
    compute_dtype: Any,
) -> tuple[int, int, int]:
    import torch
    from diffusers.utils import get_module_from_name

    consumed_scales: set[str] = set()
    installed = 0
    skipped = 0
    fp8_installed = 0

    for name, value in state_dict.items():
        if name.endswith(".scale_weight") or name.endswith(".weight_scale"):
            continue

        try:
            module, tensor_name = get_module_from_name(model, name)
        except (AttributeError, KeyError):
            skipped += 1
            continue

        is_fp8_value = _is_fp8(value.dtype)
        if is_fp8_value and isinstance(module, FP8Linear) and tensor_name == "weight":
            module._parameters["weight"] = torch.nn.Parameter(
                value.to(install_device), requires_grad=False
            )
            base = name[: -len(".weight")]
            for suffix in (".scale_weight", ".weight_scale"):
                scale_key = f"{base}{suffix}"
                scale_tensor = state_dict.get(scale_key)
                if scale_tensor is not None:
                    module.attach_scale(scale_tensor.to(install_device))
                    consumed_scales.add(scale_key)
                    break
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
            if tensor_name in module._parameters:
                module._parameters[tensor_name] = torch.nn.Parameter(
                    casted, requires_grad=False
                )
                installed += 1
            else:
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

    return installed, skipped, fp8_installed


def _no_meta_tensors_remaining(model: Any) -> list[str]:
    return _meta_param_names(model)


def _attach_sequential_offload(
    model: Any, execution_device: Any, offload_device: Any
) -> None:
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
        "(exec=%s, off=%s)",
        len(blocks),
        execution_device,
        offload_device,
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


def _attach_group_offload(
    model: Any, execution_device: Any, offload_device: Any
) -> None:
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
        "ltx2_safetensors_loader: group offload attached (exec=%s, off=%s)",
        execution_device,
        offload_device,
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
    offload_device: "torch.device | str" = "cpu",
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
    if strict_schema and (missing or shape_mismatches):
        raise SafetensorsSchemaMismatch(
            f"safetensors state-dict at {path} does not match the native "
            f"LTXModel schema: matched={matched}, missing="
            f"{len(missing)}, extra={len(extra)}, "
            f"shape_mismatches={len(shape_mismatches)}. "
            f"Sample missing={missing[:5]}, extra={extra[:5]}, "
            f"shape_mismatch={shape_mismatches[:3]}. "
            "The comfy-key rename or the embedded config diverged from "
            "what this safetensors carries — re-probe before forcing a "
            "load with strict_schema=False."
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

    installed, skipped, fp8_installed = _install_state_dict(
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

    meta_left = _no_meta_tensors_remaining(model)
    if meta_left:
        raise SafetensorsSchemaMismatch(
            f"after fp8 safetensors install {len(meta_left)} LTXModel "
            f"params/buffers are still on meta — sample {meta_left[:6]}. "
            "The safetensors did not cover the full native schema; the "
            "embedded config and the comfy rename must be re-probed."
        )

    if offload_mode == "sequential":
        _attach_sequential_offload(
            model,
            execution_device=install_target,
            offload_device=torch.device(offload_device),
        )
    elif offload_mode == "group":
        _attach_group_offload(
            model,
            execution_device=install_target,
            offload_device=torch.device(offload_device),
        )
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
