"""Native LTX-2 19B GGUF loader — drives Lightricks' own ``ltx-core``.

The Kijai ``ltx-2-19b-distilled_Q4_K_M.gguf`` is an ``AVTransformer3DModel``
NATIVE checkpoint. HuggingFace ``diffusers`` cannot load it — 26 weight
tensors are 2x the width its ``LTX2VideoTransformer3DModel`` config
expects (the diffusers port targets a different Lightricks dev commit).
The official native model class — ``ltx_core.model.transformer.LTXModel``
— DOES match it. This module builds that model from the GGUF.

ComfyUI/Kijai GGUF loader replicated here:
  - lazy per-op dequant: the diffusers ``GGUFParameter`` tensor subclass
    keeps the *packed* Q4 blocks resident (~12.65 GiB → fits 16 GiB);
    every ``nn.Linear`` is swapped for ``GGUFLinear`` which dequantizes
    its weight per matmul. This is exactly the city96/ComfyUI mechanism.
  - the connector safetensors is merged as an ``extra_state_dict`` into
    ltx-core's ``EmbeddingsProcessor`` (video/audio connectors + the
    feature-extractor aggregate-embed).

Two GGUF dequant code paths are deliberately reused verbatim from the
sibling ``gguf_loader`` module: ``load_gguf_state_dict`` and the
``GGUFParameter`` / ``GGUFLinear`` / ``GGUFQuantizer`` machinery. We do
NOT touch ``gguf_loader`` itself — the LTX-2.3 diffusers path still
depends on it unchanged.

Boundary: extension-local (worker/src/ltx_video_worker/). Importing both
``ltx_core`` internals and ``diffusers`` quantizer internals is
intentional and correct here — that is the whole point of a native
GGUF loader.
"""

from __future__ import annotations

import json
import logging
from dataclasses import dataclass, field
from pathlib import Path
from typing import TYPE_CHECKING, Any

from .gguf_loader import GGUFSchemaMismatch, load_gguf_state_dict

if TYPE_CHECKING:
    import torch
    from ltx_core.model.transformer.model import LTXModel
    from ltx_core.text_encoders.gemma.embeddings_processor import EmbeddingsProcessor


logger = logging.getLogger(__name__)


# --------------------------------------------------------------------------
# Embedded config KV


def read_embedded_config(gguf_path: str | Path) -> dict[str, Any]:
    """Decode the JSON ``config`` metadata KV embedded in the Kijai GGUF.

    The Kijai 19B GGUF carries the full LTX-2 config as a single string
    KV named ``config`` — the ``{"transformer": {...}, "scheduler":
    {...}}`` dict ``LTXModelConfigurator`` + ``LTX2Scheduler`` consume.
    ``gguf.GGUFReader`` exposes it as a ``ReaderField``; the value is a
    UTF-8 byte array we decode then ``json.loads``.

    Raises ``GGUFSchemaMismatch`` when the KV is absent or unparseable —
    without it the model cannot be configured, so failing loud here is
    the only honest option.
    """
    import gguf

    reader = gguf.GGUFReader(str(gguf_path))
    field = reader.fields.get("config")
    if field is None:
        available = sorted(reader.fields)[:24]
        raise GGUFSchemaMismatch(
            f"GGUF at {gguf_path} has no 'config' metadata KV — cannot "
            f"configure the native LTXModel. Present KVs (first 24): "
            f"{available}. This GGUF is not the Kijai LTX-2 19B layout."
        )

    # A GGUF string KV is stored as one data part of uint8 bytes. Across
    # `gguf` package versions the part is either a numpy array or raw
    try:
        raw = field.parts[field.data[0]]
        text = bytes(memoryview(raw)).decode("utf-8")
    except (IndexError, ValueError, UnicodeDecodeError, TypeError) as e:
        raise GGUFSchemaMismatch(
            f"GGUF 'config' KV at {gguf_path} could not be decoded as a "
            f"UTF-8 string: {e}. The KV layout diverged from the Kijai "
            "LTX-2 19B GGUF this loader targets."
        ) from e

    try:
        cfg = json.loads(text)
    except json.JSONDecodeError as e:
        raise GGUFSchemaMismatch(
            f"GGUF 'config' KV at {gguf_path} is not valid JSON: {e}."
        ) from e

    if not isinstance(cfg, dict) or "transformer" not in cfg:
        raise GGUFSchemaMismatch(
            f"GGUF 'config' KV at {gguf_path} parsed to "
            f"{type(cfg).__name__} without a 'transformer' section — "
            "expected the LTX-2 model config dict."
        )
    return cfg


# --------------------------------------------------------------------------
# Comfy-key rename


# The ComfyUI checkpoint prefix some LTX-2 GGUF exports carry. ltx-core's
# `LTXV_MODEL_COMFY_RENAMING_MAP` SDOps strips exactly this, but its
_COMFY_TRANSFORMER_PREFIX = "model.diffusion_model."


def rename_comfy_keys(state_dict: dict[str, Any]) -> dict[str, Any]:
    """Normalise GGUF transformer keys to ltx-core's ``LTXModel`` layout.

    LTX-2 GGUF exports come in two key flavours: ComfyUI-prefixed
    (``model.diffusion_model.adaln_single.*``) and already-bare
    (``adaln_single.*``). ltx-core's ``LTXModel`` expects the bare form.
    This strips the ComfyUI prefix when present and passes bare keys
    through unchanged — so both flavours load. Tensor objects are moved
    by reference; only key strings are rewritten.
    """
    out: dict[str, Any] = {}
    renamed = 0
    for key, value in state_dict.items():
        mapped = (
            key[len(_COMFY_TRANSFORMER_PREFIX) :]
            if key.startswith(_COMFY_TRANSFORMER_PREFIX)
            else key
        )
        if mapped != key:
            renamed += 1
        if mapped in out:
            raise GGUFSchemaMismatch(
                f"comfy-key rename collision: {key!r} maps to {mapped!r} "
                "which is already present — refusing a silent weight drop."
            )
        out[mapped] = value
    if renamed:
        logger.info(
            "ltx2_native_loader: stripped comfy prefix from %d/%d keys",
            renamed,
            len(out),
        )
    return out


# --------------------------------------------------------------------------
# Schema validation


@dataclass(frozen=True)
class NativeSchemaReport:
    """Result of validating a renamed GGUF state-dict against an LTXModel."""

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


def _logical_shapes(state_dict: dict[str, Any]) -> dict[str, tuple[int, ...]]:
    """Map every GGUF entry to its logical (dequantized) shape.

    Quantized ``GGUFParameter`` entries report a packed byte ``.shape``;
    the diffusers GGUF reader stores the true dequantized shape on the
    ``.quant_shape`` attribute (it is computed from the original GGUF
    tensor dims, not back-derived from byte counts — which a generic
    block-size heuristic gets wrong for K-quants whose packed row length
    is not divisible by the type size). ``quant_shape`` is therefore the
    authoritative logical shape for schema comparison.
    """
    from diffusers.quantizers.gguf.utils import GGUFParameter

    out: dict[str, tuple[int, ...]] = {}
    for name, value in state_dict.items():
        if isinstance(value, GGUFParameter) and getattr(value, "quant_shape", None) is not None:
            out[name] = tuple(int(d) for d in value.quant_shape)
        else:
            out[name] = tuple(int(d) for d in value.shape)
    return out


def validate_against_model(
    state_dict: dict[str, Any],
    model: Any,
    *,
    sample_limit: int = 16,
) -> NativeSchemaReport:
    """Compare a renamed GGUF state-dict against ``LTXModel.state_dict()``.

    Surfaces missing/extra/shape-mismatch lists so a genuine schema
    divergence becomes an actionable ``GGUFSchemaMismatch`` instead of a
    raw ``KeyError`` deep inside the install loop.
    """
    from diffusers.quantizers.gguf.utils import (
        SUPPORTED_GGUF_QUANT_TYPES,
        GGUFParameter,
    )

    target = {k: tuple(int(d) for d in v.shape) for k, v in model.state_dict().items()}
    gguf_shapes = _logical_shapes(state_dict)

    gguf_keys = set(gguf_shapes)
    target_keys = set(target)

    missing = sorted(target_keys - gguf_keys)
    extra = sorted(gguf_keys - target_keys)
    shape_mismatches = [
        (k, gguf_shapes[k], target[k])
        for k in sorted(gguf_keys & target_keys)
        if gguf_shapes[k] != target[k]
    ]
    quant_unsupported = [
        (name, str(value.quant_type))
        for name, value in state_dict.items()
        if isinstance(value, GGUFParameter)
        and value.quant_type not in SUPPORTED_GGUF_QUANT_TYPES
    ]

    return NativeSchemaReport(
        matched=len(gguf_keys & target_keys) - len(shape_mismatches),
        missing_in_gguf=tuple(missing[:sample_limit]),
        extra_in_gguf=tuple(extra[:sample_limit]),
        shape_mismatches=tuple(shape_mismatches[:sample_limit]),
        quant_unsupported=tuple(quant_unsupported[:sample_limit]),
    )


# --------------------------------------------------------------------------
# Transformer build


@dataclass
class NativeLtx2Bundle:
    """The native LTX-2 stack assembled from the Kijai GGUF + connector."""

    transformer: Any  # ltx_core LTXModel with GGUF weights installed
    config: dict[str, Any]  # the embedded GGUF config dict
    install_device: Any  # torch.device the weights live on
    audio_enabled: bool


def load_native_ltx2_transformer(
    gguf_path: str | Path,
    *,
    compute_dtype: "torch.dtype | None" = None,
    install_device: "torch.device | str | None" = None,
    audio: bool = True,
    strict_schema: bool = True,
) -> NativeLtx2Bundle:
    """Build an ``ltx_core`` ``LTXModel`` from the Kijai LTX-2 19B GGUF.

    Steps (the ComfyUI GGUF loader, retargeted to ltx-core):
      1. read the GGUF tensors (``load_gguf_checkpoint`` — ``GGUFParameter``
         packed-block entries for quantized weights, plain tensors for F32/F16);
      2. read the embedded ``config`` KV;
      3. build ``LTXModel`` on the meta device via ``LTXModelConfigurator``
         (audio-video) or ``LTXVideoOnlyModelConfigurator`` (video-only);
      4. strip the ComfyUI ``model.diffusion_model.`` key prefix;
      5. validate the renamed state-dict against the meta model's schema;
      6. swap every ``nn.Linear`` for ``GGUFLinear`` (lazy per-matmul
         dequant) via ``_replace_with_gguf_linear``;
      7. install each entry — ``GGUFQuantizer.create_quantized_param`` for
         packed tensors (weights stay packed + resident), plain assign
         for F32/F16 — onto ``install_device``.

    Args:
        gguf_path: the Kijai ``ltx-2-19b-distilled_Q4_K_M.gguf``.
        compute_dtype: per-matmul dequant target dtype. Defaults bfloat16.
        install_device: where packed + plain weights land. Defaults cuda
            when available, else cpu. ``GGUFParameter`` instances are NOT
            relocated by ``.to(device)`` after install — so installing
            straight onto cuda is the only way to get GPU-resident weights.
        audio: build the audio-video model (True) or video-only (False).
        strict_schema: raise ``GGUFSchemaMismatch`` on any divergence.

    Returns:
        ``NativeLtx2Bundle`` — the loaded transformer + the config dict.
    """
    import torch
    from diffusers.quantizers.gguf.gguf_quantizer import GGUFQuantizer
    from diffusers.quantizers.gguf.utils import (
        GGUFParameter,
        _replace_with_gguf_linear,
    )
    from diffusers.quantizers.quantization_config import GGUFQuantizationConfig
    from diffusers.utils import get_module_from_name
    from ltx_core.loader.helpers import create_meta_model
    from ltx_core.model.transformer.model_configurator import (
        LTXModelConfigurator,
        LTXVideoOnlyModelConfigurator,
    )

    if compute_dtype is None:
        compute_dtype = torch.bfloat16

    if install_device is None:
        install_target = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    else:
        install_target = torch.device(install_device)

    path = Path(gguf_path)
    if not path.is_file():
        raise FileNotFoundError(f"LTX-2 19B GGUF not found: {path}")

    config = read_embedded_config(path)

    # The native model is built on the meta device — no parameter memory
    # is allocated until the GGUF install pass below populates it.
    configurator = (
        LTXModelConfigurator if audio else LTXVideoOnlyModelConfigurator
    )
    model = create_meta_model(configurator, config)

    raw_state_dict = load_gguf_state_dict(path)
    state_dict = rename_comfy_keys(raw_state_dict)

    report = validate_against_model(state_dict, model)
    if strict_schema and not report.is_clean:
        raise GGUFSchemaMismatch(
            f"GGUF state-dict at {path} does not match the native "
            f"ltx-core LTXModel schema: {report.summary()}. "
            f"Sample missing={list(report.missing_in_gguf[:5])}, "
            f"extra={list(report.extra_in_gguf[:5])}, "
            f"shape_mismatch={list(report.shape_mismatches[:3])}, "
            f"unsupported_quant={list(report.quant_unsupported[:3])}. "
            "The comfy-key rename or the embedded config diverged from "
            "what this GGUF carries — re-probe the GGUF before forcing a "
            "load with strict_schema=False."
        )
    logger.info(
        "ltx2_native_loader: schema check %s (clean=%s)",
        report.summary(),
        report.is_clean,
    )

    quant_config = GGUFQuantizationConfig(compute_dtype=compute_dtype)
    quant_config.modules_to_not_convert = []
    quantizer = GGUFQuantizer(quant_config)

    # Swap nn.Linear -> GGUFLinear. GGUFLinear holds the packed weight as
    # a GGUFParameter and dequantizes it inside `forward` per matmul —
    _replace_with_gguf_linear(
        model,
        compute_dtype,
        state_dict,
        modules_to_not_convert=[],
    )

    # `_replace_with_gguf_linear` rebinds the model tree's `_modules` entry
    # but NOT plain-object references captured elsewhere. `LTXModel`'s
    _rebind_preprocessor_modules(model)

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
            # `create_quantized_param` installs the packed GGUFParameter
            # in place — no dequant happens here, the blocks stay packed.
            quantizer.create_quantized_param(
                model,
                value,
                name,
                target_device=install_target,
                state_dict=state_dict,
            )
            installed_quantized += 1
            continue

        casted = (
            value.to(compute_dtype)
            if value.is_floating_point() and value.dtype != compute_dtype
            else value
        )
        if tensor_name in module._parameters:
            module._parameters[tensor_name] = torch.nn.Parameter(
                casted.to(install_target), requires_grad=False
            )
            installed_plain += 1
        elif tensor_name in module._buffers:
            module._buffers[tensor_name] = casted.to(install_target)
            installed_plain += 1
        else:
            skipped += 1

    model.hf_quantizer = quantizer

    meta_left = _meta_param_names(model)
    if meta_left:
        raise GGUFSchemaMismatch(
            f"after GGUF install {len(meta_left)} LTXModel params/buffers "
            f"are still on the meta device — sample {meta_left[:6]}. The "
            "GGUF did not cover the full native schema; the embedded "
            "config and the comfy rename must be re-probed."
        )

    logger.info(
        "ltx2_native_loader: installed quantized=%d plain=%d skipped=%d device=%s",
        installed_quantized,
        installed_plain,
        skipped,
        install_target,
    )

    return NativeLtx2Bundle(
        transformer=model,
        config=config,
        install_device=install_target,
        audio_enabled=audio,
    )


def _meta_param_names(model: Any) -> list[str]:
    """Return names of params/buffers still on the meta device."""
    names: list[str] = []
    for name, p in model.named_parameters():
        if str(p.device) == "meta":
            names.append(name)
    for name, b in model.named_buffers():
        if str(b.device) == "meta":
            names.append(name)
    return names


# The bare-Linear attributes that `LTXModel` stores BOTH as a tree
# submodule and as a captured plain-object reference inside a
_PATCHIFY_PROJ_ATTRS = ("patchify_proj", "audio_patchify_proj")


def _rebind_preprocessor_modules(model: Any) -> None:
    """Re-point ``TransformerArgsPreprocessor`` Linear refs to the live tree.

    After ``_replace_with_gguf_linear`` swaps the model's ``patchify_proj``
    / ``audio_patchify_proj`` for ``GGUFLinear`` instances, the
    ``video_args_preprocessor`` / ``audio_args_preprocessor`` (and the
    ``simple_preprocessor`` a ``MultiModalTransformerArgsPreprocessor``
    nests) still hold the original ``nn.Linear``. This rebinds those
    captured ``patchify_proj`` attributes to the modules now in the tree so
    the denoise forward runs the GGUF-quantized Linear, not a meta one.

    Idempotent: a preprocessor already pointing at the live module is left
    untouched. A no-op when the model has no such preprocessor (e.g. a
    future configurator change).
    """
    for tree_attr in _PATCHIFY_PROJ_ATTRS:
        live = getattr(model, tree_attr, None)
        if live is None:
            continue
        for prep_attr in ("video_args_preprocessor", "audio_args_preprocessor"):
            prep = getattr(model, prep_attr, None)
            if prep is None:
                continue
            _rebind_one(prep, "patchify_proj", live)
            simple = getattr(prep, "simple_preprocessor", None)
            if simple is not None:
                _rebind_one(simple, "patchify_proj", live)


def _rebind_one(holder: Any, attr: str, live: Any) -> None:
    """Re-point ``holder.attr`` to ``live`` only if it is a stale alias.

    The stale reference and the live module share the same weight SHAPE
    (the GGUF swap preserves in/out features), so a shape match plus an
    identity mismatch is the precise stale-alias signal.
    """
    current = getattr(holder, attr, None)
    if current is None or current is live:
        return
    cur_w = getattr(current, "weight", None)
    live_w = getattr(live, "weight", None)
    if (
        cur_w is not None
        and live_w is not None
        and tuple(cur_w.shape) == tuple(live_w.shape)
    ):
        setattr(holder, attr, live)


# --------------------------------------------------------------------------
# Embeddings connector merge


def build_embeddings_processor(
    connector_path: str | Path,
    config: dict[str, Any],
    *,
    device: "torch.device | str",
    dtype: "torch.dtype | None" = None,
    audio: bool = True,
) -> "EmbeddingsProcessor":
    """Build ltx-core's ``EmbeddingsProcessor`` + merge the Kijai connector.

    The Kijai ``ltx-2-19b-embeddings_connector_distill_bf16.safetensors``
    carries 59 tensors prefixed
    ``model.diffusion_model.{video,audio}_embeddings_connector.*`` plus
    ``text_embedding_projection.aggregate_embed.*``. ltx-core ships the
    authoritative key map for exactly this layout —
    ``EMBEDDINGS_PROCESSOR_KEY_OPS`` — which rewrites those prefixes to
    the ``EmbeddingsProcessor`` submodule names
    (``video_connector.*`` / ``audio_connector.*`` /
    ``feature_extractor.aggregate_embed.*``).

    The connector safetensors is the ``extra_state_dict`` merged into the
    processor: the processor module is built bf16-empty from ``config``,
    then ``load_state_dict`` installs the renamed connector weights.

    Args:
        connector_path: the Kijai connector safetensors.
        config: the embedded GGUF config dict (carries the ``transformer``
            section the connector dimensions are derived from).
        device: where the processor is placed.
        dtype: processor dtype. Defaults bfloat16.
        audio: build with the audio connector (True) or video-only (False).

    Returns:
        a populated ``EmbeddingsProcessor``.
    """
    import torch
    from ltx_core.loader.sft_loader import SafetensorsStateDictLoader
    from ltx_core.text_encoders.gemma import (
        EMBEDDINGS_PROCESSOR_KEY_OPS,
        EmbeddingsProcessorConfigurator,
    )

    if dtype is None:
        dtype = torch.bfloat16

    path = Path(connector_path)
    if not path.is_file():
        raise FileNotFoundError(f"LTX-2 embeddings connector not found: {path}")

    processor = EmbeddingsProcessorConfigurator.from_config(config)

    # `EMBEDDINGS_PROCESSOR_KEY_OPS` is the ltx-core SDOps that maps the
    # Kijai connector key layout onto the EmbeddingsProcessor submodule
    loader = SafetensorsStateDictLoader()
    loaded = loader.load(str(path), sd_ops=EMBEDDINGS_PROCESSOR_KEY_OPS, device="cpu")
    remapped = {k: v.to(dtype) for k, v in loaded.sd.items()}

    missing, unexpected = processor.load_state_dict(remapped, strict=False)
    # The processor always builds an audio connector; a video-only render
    # never consumes it, so audio-connector keys missing from a
    video_missing = [
        k for k in missing if not (audio is False and "audio_connector" in k)
    ]
    if video_missing or unexpected:
        raise GGUFSchemaMismatch(
            f"EmbeddingsProcessor weight load mismatch — missing="
            f"{video_missing[:6]}, unexpected={list(unexpected)[:6]}. "
            "The Kijai connector key remap diverged from ltx-core's "
            "EMBEDDINGS_PROCESSOR_KEY_OPS layout."
        )

    meta_after = [
        n for n, p in processor.named_parameters() if str(p.device) == "meta"
    ]
    if audio:
        meta_after = [n for n in meta_after if "audio_connector" not in n]
    if meta_after:
        raise GGUFSchemaMismatch(
            f"EmbeddingsProcessor has {len(meta_after)} params still on "
            f"meta after the connector merge — sample {meta_after[:6]}. "
            "The connector safetensors does not cover the processor "
            "schema; the key remap must be re-probed."
        )

    processor = processor.to(device=torch.device(device), dtype=dtype)
    processor.eval()
    logger.info(
        "ltx2_native_loader: embeddings processor merged keys=%d device=%s",
        len(remapped),
        device,
    )
    return processor
