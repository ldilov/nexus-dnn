"""Custom GGUF transformer loader for LTX2VideoTransformer3DModel.

Bypasses the diffusers 0.39.0.dev0 ``from_single_file`` utf-8 sniff
regression (see specs/046-ltx23-video-generation/verification/
p0-t001-results.md, Path 2). The buggy probe at
``diffusers/models/model_loading_utils.py::196`` text-reads any
checkpoint that fails ``torch.load`` — which a binary GGUF always
does — and rethrows ``UnicodeDecodeError`` before
``quantization_config=GGUFQuantizationConfig(...)`` is consulted.

Bypass:
  1. Read GGUF tensors via ``diffusers.models.model_loading_utils
     .load_gguf_checkpoint``. That helper is already in the diffusers
     codebase and exposes ``GGUFParameter | torch.Tensor`` entries.
  2. Build ``LTX2VideoTransformer3DModel`` on the meta device using a
     base diffusers config (e.g. ``dg845/LTX-2.3-Distilled-Diffusers``).
  3. Replace ``nn.Linear`` with ``GGUFLinear`` via
     ``_replace_with_gguf_linear`` so runtime matmuls dequant per call.
  4. Install each state-dict entry onto the meta model using
     ``GGUFQuantizer.create_quantized_param`` for quantized tensors and
     plain assignment for F32/F16 tensors.

Boundary: this module is extension-local (worker/src/ltx_video_worker/),
not a host import. It depends on diffusers internals which is fine —
that's the whole purpose of the bypass.

Schema-divergence note:
  The Abiray ``LTX-2.3-22B-DISTILLED-1.1-GGUF`` family (32k+ HF
  downloads as of 2026-05-13) was quantized from a more recent
  Lightricks dev checkpoint than the dg845 community port targets.
  4444 vs 4186 state-dict keys, ``scale_shift_table`` ``[4096, 9]``
  vs ``[2, 4096]``, plus extra ``prompt_*`` / ``av_ca_*`` adaln
  modules. Loading Abiray weights end-to-end requires a future
  diffusers commit that matches the Lightricks dev schema. This
  loader does NOT remap keys — it validates that the GGUF state-dict
  matches the target model's expected key set + shapes, and raises
  ``GGUFSchemaMismatch`` cleanly when they diverge so the caller can
  pick a matching base config.
"""

from __future__ import annotations

import logging
import os
from dataclasses import dataclass, field
from pathlib import Path
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    import torch


logger = logging.getLogger(__name__)


class GGUFSchemaMismatch(RuntimeError):
    """GGUF state-dict does not match the target model's expected schema.

    Attributes mirror what an operator needs to debug the gap:
    extra/missing key counts, sample mismatches, and shape conflicts.
    """


@dataclass(frozen=True)
class SchemaCheckReport:
    """Result of validating a GGUF state-dict against a target model."""

    matched: int
    missing_in_gguf: tuple[str, ...]
    extra_in_gguf: tuple[str, ...]
    shape_mismatches: tuple[tuple[str, tuple[int, ...], tuple[int, ...]], ...]
    quant_unsupported: tuple[tuple[str, str], ...] = field(default_factory=tuple)

    @property
    def is_clean(self) -> bool:
        return (
            not self.missing_in_gguf
            and not self.extra_in_gguf
            and not self.shape_mismatches
            and not self.quant_unsupported
        )

    def summary(self) -> str:
        bits = [f"matched={self.matched}"]
        if self.missing_in_gguf:
            bits.append(f"missing_in_gguf={len(self.missing_in_gguf)}")
        if self.extra_in_gguf:
            bits.append(f"extra_in_gguf={len(self.extra_in_gguf)}")
        if self.shape_mismatches:
            bits.append(f"shape_mismatches={len(self.shape_mismatches)}")
        if self.quant_unsupported:
            bits.append(f"quant_unsupported={len(self.quant_unsupported)}")
        return ", ".join(bits)


def load_gguf_state_dict(gguf_path: str | Path) -> dict[str, Any]:
    """Read a GGUF checkpoint into a flat ``dict[name, GGUFParameter | Tensor]``.

    Thin wrapper around ``diffusers.models.model_loading_utils
    .load_gguf_checkpoint`` to keep the import boundary in one place
    and surface a single, well-named entry point from this module.
    """
    from diffusers.models.model_loading_utils import load_gguf_checkpoint

    path = str(gguf_path)
    if not os.path.isfile(path):
        raise FileNotFoundError(f"GGUF file not found: {path}")

    return load_gguf_checkpoint(path)


def apply_ltx2_diffusers_rename(state_dict: dict[str, Any]) -> dict[str, Any]:
    """Rename original-LTX-2.3 keys to diffusers `LTX2VideoTransformer3DModel`
    names, reusing diffusers' authoritative converter.

    The Abiray GGUF carries original key names (`adaln_single.*`,
    `patchify_proj`, `q_norm`/`k_norm`, …); the diffusers model expects
    the renamed forms (`time_embed.*`, `proj_in`, `norm_q`/`norm_k`).
    `diffusers...convert_ltx2_transformer_to_diffusers` is the single
    source of truth for that map (it also strips a
    `model.diffusion_model.` prefix — a no-op for the Abiray GGUF which
    has none). We feed it a shallow copy so the caller's dict is
    untouched; GGUFParameter values are moved by reference (only keys
    are rewritten — never the tensor objects).

    NOTE on key counts: the official Abiray checkpoint has 4444 keys;
    `convert_ltx2_transformer_to_diffusers` intentionally normalises it
    to the 4186-key diffusers `LTX2VideoTransformer3DModel` layout —
    it *removes* non-transformer keys by design (e.g.
    `*_embeddings_connector` via `remove_keys_inplace`). That count
    drop is EXPECTED, not a collision. The real "no silent weight
    drop" guarantee is `validate_state_dict_against_model` +
    `strict_schema` downstream: a genuinely lost weight surfaces as a
    `missing_in_gguf` key vs the target (G-A2 proved missing=0). The
    only collision we must self-guard is OUR supplemental substring
    rule below (we own it; it must be strictly 1:1) — done explicitly.
    """
    from diffusers.loaders.single_file_utils import (
        convert_ltx2_transformer_to_diffusers,
    )

    renamed = convert_ltx2_transformer_to_diffusers(dict(state_dict))

    # Supplemental: the diffusers converter's `adaln_single` special
    # handler only rewrites keys starting exactly `adaln_single.` /
    out: dict[str, Any] = {}
    for k, v in renamed.items():
        nk = k.replace("prompt_adaln_single.", "prompt_adaln.")
        if nk in out and nk != k:
            # Two distinct converter-output keys collapsed onto one by
            # OUR supplemental rule → a genuine silent weight drop.
            raise GGUFSchemaMismatch(
                f"supplemental LTX2 rename collision: {k!r} and an "
                f"earlier key both map to {nk!r}; refusing a silent "
                "weight drop. [R-GA-2]"
            )
        out[nk] = v
    return out


def zero_fill_meta_params(
    model: Any,
    *,
    device: "torch.device",
    dtype: "torch.dtype",
) -> int:
    """Materialise every still-on-`meta` param/buffer to zeros on `device`.

    After a partial GGUF install (``strict_schema=False``) the model's
    unmatched parameters — for the Abiray video-only GGUF these are the
    ``audio_*`` branch ``LTX2VideoTransformer3DModel`` always builds —
    remain meta tensors. Leaving any meta tensor crashes the first
    forward. Zeros are inert *iff* the video-only forward never consumes
    those modules (audio conditioning is None) — that assumption is
    validated only by a coherent real render (G2 / risk R-GA-1).
    Returns the count materialised (0 when the model is fully real).
    """
    import torch

    filled = 0
    for mod in model.modules():
        for name, p in list(mod._parameters.items()):
            if p is not None and p.is_meta:
                mod._parameters[name] = torch.nn.Parameter(
                    torch.zeros(p.shape, dtype=dtype, device=device),
                    requires_grad=False,
                )
                filled += 1
        for name, b in list(mod._buffers.items()):
            if b is not None and b.is_meta:
                mod._buffers[name] = torch.zeros(
                    b.shape, dtype=b.dtype, device=device
                )
                filled += 1
    return filled


def _byte_shape_to_unquantized_shape(
    byte_shape: tuple[int, ...],
    quant_type: Any,
) -> tuple[int, ...]:
    """Given a packed GGUF byte shape + quant type, return the logical (unquantized) shape.

    Mirrors diffusers' ``_quant_shape_from_byte_shape`` but accepts plain
    tuples so it can run without instantiating a tensor.
    """
    import gguf

    if quant_type in (
        gguf.GGMLQuantizationType.F32,
        gguf.GGMLQuantizationType.F16,
        gguf.GGMLQuantizationType.BF16,
    ):
        return tuple(int(d) for d in byte_shape)

    from diffusers.quantizers.gguf.utils import GGML_QUANT_SIZES

    block_size, type_size = GGML_QUANT_SIZES[quant_type]
    if not byte_shape:
        return ()
    last = int(byte_shape[-1])
    if last % type_size != 0:
        return tuple(int(d) for d in byte_shape)
    logical_last = last // type_size * block_size
    return tuple(int(d) for d in byte_shape[:-1]) + (logical_last,)


def _normalize_state_dict_shapes(
    state_dict: dict[str, Any],
) -> dict[str, tuple[int, ...]]:
    """Return ``{name: logical_shape}`` for each entry in the GGUF state-dict.

    Quantized GGUFParameter entries report their packed byte shape; we
    map those back to the logical (dequantized) shape so schema
    validation can compare apples to apples against the target model's
    ``state_dict()`` shapes.
    """
    from diffusers.quantizers.gguf.utils import GGUFParameter

    out: dict[str, tuple[int, ...]] = {}
    for name, value in state_dict.items():
        if isinstance(value, GGUFParameter):
            byte_shape = tuple(int(d) for d in value.shape)
            out[name] = _byte_shape_to_unquantized_shape(byte_shape, value.quant_type)
        else:
            out[name] = tuple(int(d) for d in value.shape)
    return out


def validate_state_dict_against_model(
    state_dict: dict[str, Any],
    target_model: Any,
    *,
    sample_limit: int = 16,
) -> SchemaCheckReport:
    """Compare a GGUF state-dict against the target model's expected state-dict.

    Returns a ``SchemaCheckReport`` with matched/missing/extra/shape-mismatch
    counts. Sample lists are bounded by ``sample_limit`` so error messages
    stay readable.
    """
    from diffusers.quantizers.gguf.utils import SUPPORTED_GGUF_QUANT_TYPES, GGUFParameter

    target_sd = {k: tuple(int(d) for d in v.shape) for k, v in target_model.state_dict().items()}
    gguf_shapes = _normalize_state_dict_shapes(state_dict)

    gguf_keys = set(gguf_shapes)
    target_keys = set(target_sd)

    missing = sorted(target_keys - gguf_keys)
    extra = sorted(gguf_keys - target_keys)
    shape_mismatches: list[tuple[str, tuple[int, ...], tuple[int, ...]]] = []
    for k in sorted(gguf_keys & target_keys):
        if gguf_shapes[k] != target_sd[k]:
            shape_mismatches.append((k, gguf_shapes[k], target_sd[k]))

    quant_unsupported: list[tuple[str, str]] = []
    for name, value in state_dict.items():
        if not isinstance(value, GGUFParameter):
            continue
        if value.quant_type not in SUPPORTED_GGUF_QUANT_TYPES:
            quant_unsupported.append((name, str(value.quant_type)))

    matched = len(gguf_keys & target_keys) - len(shape_mismatches)
    return SchemaCheckReport(
        matched=matched,
        missing_in_gguf=tuple(missing[:sample_limit]),
        extra_in_gguf=tuple(extra[:sample_limit]),
        shape_mismatches=tuple(shape_mismatches[:sample_limit]),
        quant_unsupported=tuple(quant_unsupported[:sample_limit]),
    )


def load_gguf_transformer(
    gguf_path: str | Path,
    base_config_dir: str | Path,
    *,
    compute_dtype: "torch.dtype | None" = None,
    strict_schema: bool = True,
    install_device: "torch.device | str | None" = None,
    rename_keys: bool = False,
) -> Any:
    """Build an ``LTX2VideoTransformer3DModel`` from a GGUF file.

    Args:
        gguf_path: Path to the GGUF checkpoint (transformer-only).
        base_config_dir: Directory containing ``transformer/config.json``
            of a diffusers-format LTX-2.3 model (e.g.
            ``dg845/LTX-2.3-Distilled-Diffusers``). Only the config is
            read; the safetensors shards next to it are ignored.
        compute_dtype: Per-matmul dequant target. Defaults to bfloat16.
        strict_schema: When True (default), raises ``GGUFSchemaMismatch``
            if the GGUF state-dict diverges from the target model. When
            False, the unmatched target params/buffers (e.g. the
            ``audio_*`` branch for a video-only GGUF) are zero-filled
            after install so the model is fully materialised — see
            ``zero_fill_meta_params`` + risk R-GA-1.
        rename_keys: When True, apply the diffusers LTX2 key rename
            (``apply_ltx2_diffusers_rename``) to the GGUF state-dict
            before schema validation + install. Required for the Abiray
            GGUF (original `adaln_single.*` names → `time_embed.*`).
        install_device: Where every GGUF-quantized parameter and every
            plain parameter / buffer lands during install. Defaults to
            ``cpu`` to preserve historical behaviour, which is what the
            offload-hook paths (``model``/``sequential``) expect. Callers
            running with ``offload_mode="none"`` MUST pass ``cuda`` here
            — diffusers' stock ``ModelMixin.to(cuda)`` does not relocate
            ``GGUFParameter`` instances after install, so leaving them
            on CPU is the difference between "weights are GPU-resident"
            and "inference silently runs on CPU".

    Returns:
        ``LTX2VideoTransformer3DModel`` with the GGUF state-dict
        installed at ``install_device`` and ``hf_quantizer`` attached.
        Caller does NOT need to call ``.to(device)`` afterwards — the
        install pass placed everything on ``install_device`` directly.
    """
    import torch
    from accelerate import init_empty_weights
    from diffusers import LTX2VideoTransformer3DModel
    from diffusers.quantizers.gguf.gguf_quantizer import GGUFQuantizer
    from diffusers.quantizers.gguf.utils import GGUFParameter, _replace_with_gguf_linear
    from diffusers.quantizers.quantization_config import GGUFQuantizationConfig
    from diffusers.utils import get_module_from_name

    if compute_dtype is None:
        compute_dtype = torch.bfloat16

    config_dir = Path(base_config_dir)
    transformer_subdir = config_dir / "transformer"
    if transformer_subdir.is_dir():
        config_dir = transformer_subdir

    cfg_dict, _unused = LTX2VideoTransformer3DModel.load_config(
        str(config_dir), return_unused_kwargs=True
    )

    with init_empty_weights():
        model = LTX2VideoTransformer3DModel.from_config(cfg_dict)

    state_dict = load_gguf_state_dict(gguf_path)
    if rename_keys:
        # `convert_ltx2_transformer_to_diffusers` intentionally
        # normalises the 4444-key official checkpoint to the 4186-key
        state_dict = apply_ltx2_diffusers_rename(state_dict)
    report = validate_state_dict_against_model(state_dict, model)

    if strict_schema and not report.is_clean:
        raise GGUFSchemaMismatch(
            f"GGUF state-dict at {gguf_path} does not match the target "
            f"model config at {config_dir}: {report.summary()}. "
            f"Sample missing={list(report.missing_in_gguf[:5])}, "
            f"extra={list(report.extra_in_gguf[:5])}, "
            f"shape_mismatch={list(report.shape_mismatches[:3])}, "
            f"unsupported_quant={list(report.quant_unsupported[:3])}. "
            "This usually means the GGUF was produced from a different "
            "Lightricks LTX-2.3 checkpoint than the base config targets. "
            "Pin a matching diffusers commit + base config, or set "
            "strict_schema=False to attempt a partial load."
        )

    quant_config = GGUFQuantizationConfig(compute_dtype=compute_dtype)
    quant_config.modules_to_not_convert = []
    quantizer = GGUFQuantizer(quant_config)

    _replace_with_gguf_linear(
        model,
        compute_dtype,
        state_dict,
        modules_to_not_convert=[],
    )

    if install_device is None:
        install_target_device = torch.device("cpu")
    else:
        install_target_device = torch.device(install_device)
    installed_quantized = 0
    installed_plain = 0
    skipped = 0

    for name, value in state_dict.items():
        try:
            module, tensor_name = get_module_from_name(model, name)
        except (AttributeError, KeyError):
            skipped += 1
            continue

        if isinstance(value, GGUFParameter):
            quantizer.create_quantized_param(
                model,
                value,
                name,
                target_device=install_target_device,
                state_dict=state_dict,
            )
            installed_quantized += 1
        else:
            casted = value.to(compute_dtype) if value.is_floating_point() and value.dtype != compute_dtype else value
            if tensor_name in module._parameters:
                module._parameters[tensor_name] = torch.nn.Parameter(
                    casted.to(install_target_device),
                    requires_grad=False,
                )
                installed_plain += 1
            elif tensor_name in module._buffers:
                module._buffers[tensor_name] = casted.to(install_target_device)
                installed_plain += 1
            else:
                skipped += 1

    model.hf_quantizer = quantizer

    # Partial-load completion: any target param/buffer the GGUF did not
    # cover (the unconditional `audio_*` branch for a video-only GGUF)
    zero_filled = zero_fill_meta_params(
        model, device=install_target_device, dtype=compute_dtype
    )

    logger.info(
        "ltx_video_worker.gguf_loader: installed quantized=%d plain=%d skipped=%d zero_filled=%d install_device=%s schema_clean=%s",
        installed_quantized,
        installed_plain,
        skipped,
        zero_filled,
        install_target_device,
        report.is_clean,
    )

    return model


def find_gguf_transformer(model_dir: str | Path) -> Path | None:
    """Return the path of the single ``.gguf`` file in ``model_dir`` if present.

    Used by the pipeline loader to decide whether to take the GGUF
    transformer override path. Returns None when zero or multiple
    ``.gguf`` files are present (ambiguous — caller falls back to the
    standard safetensors path).
    """
    p = Path(model_dir)
    if not p.is_dir():
        return None
    matches = sorted(p.glob("*.gguf"))
    if len(matches) == 1:
        return matches[0]
    return None
