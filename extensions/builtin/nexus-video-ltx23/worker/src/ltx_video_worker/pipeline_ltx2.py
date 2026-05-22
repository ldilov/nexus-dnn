"""Render pipeline for the LTX-2 19B distilled Kijai Q4 GGUF stack.

A FOURTH model line, isolated like ``pipeline_ltxv097`` so it cannot
destabilise the LTX-2.3 (``pipeline_diffusers``) or LTX-Video 0.9.7
(``pipeline_ltxv097``) paths.

NATIVE path — this drives Lightricks' own ``ltx-core`` package, NOT
HuggingFace ``diffusers``. The Kijai ``ltx-2-19b-distilled_Q4_K_M.gguf``
is an ``AVTransformer3DModel`` native checkpoint that diffusers' own
``LTX2Pipeline`` cannot load (26 weight tensors are 2x the width its
config expects). ``ltx_core.model.transformer.LTXModel`` is the model
class that matches it.

Stack (probed against ``ltx-core`` 1.1.3 + diffusers 0.39.0.dev0 +
transformers 4.57.6 on 2026-05-21, GPU-verified loads on RTX 5070 Ti):

  - transformer: the Kijai GGUF via ``ltx2_native_loader
    .load_native_ltx2_transformer`` — lazy per-op GGUF dequant
    (``GGUFLinear`` + packed ``GGUFParameter``, ~11.9 GiB resident on
    the 16 GiB card). Schema-validated 3510/3510, missing=0 extra=0.
  - text conditioning: Gemma-3-12B (GGUF) hidden states →
    ``ltx_core`` ``EmbeddingsProcessor`` (the Kijai connector
    safetensors merged via ``EMBEDDINGS_PROCESSOR_KEY_OPS``, 59/59).
  - denoise: ``ltx_core`` native loop — ``VideoLatentTools`` builds the
    patchified latent state, ``LinearQuadraticScheduler`` (the embedded
    ``config.scheduler.sampler == "LinearQuadratic"``) produces sigmas,
    ``LTXModel.forward`` yields velocity, ``EulerDiffusionStep`` advances.
    Distilled recipe: 8 steps, guidance ~1.0, 768x512, 121 frames,
    24 fps. Guidance >1 runs a cond/uncond ``CFGGuider`` pair.
  - decode: ``ltx_core`` native ``VideoDecoder`` (the Kijai
    ``LTX2_video_vae_bf16`` safetensors).

VRAM staging (user-mandated): encode prompt with Gemma → unload Gemma +
``empty_cache`` → load the GGUF transformer (~14.6 GiB resident) →
denoise → load the VAE decoder → decode. The transformer is evicted
before the VAE decode so the decoder transient never collides with the
19B resident set.

16 GiB fit: the dominant VRAM spike of the whole render is the
Gemma-3-12B prompt encode — a fixed 1024-token padded forward over a
12B model peaked ~23 GiB and only completed via shared-memory spill.
``_encode_prompt_with_gemma`` now pads dynamically to the connector's
learnable-register count (typically 128) instead of 1024, and stacks
the 49 hidden states to CPU layer-by-layer; whole-render peak drops to
~5.4 GiB. The VAE decode additionally runs ltx-core's memory-efficient
+ temporally-tiled decode (see ``_decode_video_latent``) so the
decoder stage stays lean independent of clip length.

GPU-UNVERIFIED: the loader + connector + VAE-decoder *loads* are
GPU-proven, but the first full denoise→decode render is the end-to-end
verification. Defensive guards turn an API/shape mismatch into an
actionable ``ltx.video.error`` notification rather than a raw stack.

Boundary: extension-local (worker/src/ltx_video_worker/). Importing
``ltx_core`` + ``diffusers`` quantizer internals is intentional here.
"""

from __future__ import annotations

import asyncio
import functools
import gc
import json
import os
import uuid
from pathlib import Path
from typing import Any, Callable

from .esrgan_upscale import try_upscale
from .ffmpeg_io import stitch_segments, trim_to_duration
from .fps_interp import try_interpolate
from .generation_profiles import get_profile, profile_sampling
from .io_safety import ensure_dict, sanitize_run_id, sanitize_workdir
from .ltx2_native_loader import (
    build_embeddings_processor,
    load_native_ltx2_transformer,
)
from .planning_validate import validate_plan
from .rpc import ErrorCodes, Methods, Notifications
from .vram import evict_models, memory_stats

_LAZY_TORCH: Any = None

# Kijai stack on-disk layout, relative to <NEXUS_HOST_DATA_DIR>/models/.
_TRANSFORMER_GGUF_REL = (
    "Kijai/LTXV2_comfy/diffusion_models/ltx-2-19b-distilled_Q4_K_M.gguf"
)
_CONNECTOR_REL = (
    "Kijai/LTXV2_comfy/text_encoders/"
    "ltx-2-19b-embeddings_connector_distill_bf16.safetensors"
)
_VIDEO_VAE_REL = "Kijai/LTXV2_comfy/VAE/LTX2_video_vae_bf16.safetensors"
_AUDIO_VAE_REL = "Kijai/LTXV2_comfy/VAE/LTX2_audio_vae_bf16.safetensors"
_LATENT_UPSAMPLER_REL = (
    "Lightricks/LTX-2/ltx-2-spatial-upscaler-x2-1.0.safetensors"
)
_GEMMA_GGUF_DIR_REL = "unsloth/gemma-3-12b-it-GGUF"
_GEMMA_GGUF_FILE = "gemma-3-12b-it-Q4_K_S.gguf"
# Weight-stripped diffusers config tree (tokenizer + scheduler configs).
# Only the Gemma tokenizer is read from here in the native path.
_BASE_DIR_REL = "rootonchair/LTX-2-19b-distilled"

# Sampling defaults for the distilled checkpoint (the ltxv2-distilled-q4
# generation profile). 8 steps + guidance 1.0 is the documented
# distilled operating point — guidance 1.0 skips the uncond branch.
_DEF_STEPS = 8
_DEF_GUIDANCE = 1.0
_DEF_WIDTH = 768
_DEF_HEIGHT = 512
# Spec 048: 105 = 8*13+1 (8n+1 conforming, ~6.56 s at 16 fps). The clip
# renders at 16 fps base and is RIFE-interpolated to 32 fps output.
_DEF_FRAMES = 49
_DEF_BASE_FPS = 16
_DEF_OUTPUT_FPS = 32
_DEF_KEYFRAME_STRENGTH = 1.0
# i2v keyframe-latent noise — 0.0 keeps a clean keyframe (the validated
# default; a per-step re-noise sweep found it inert for motion). An
# optional configurable knob, off by default.
_DEF_IMAGE_COND_NOISE_SCALE = 0.0
# Two-stage distilled pipeline (default ON). The distilled 19B is trained
# to generate stage 1 at HALF the target resolution, then a LatentUpsampler
# doubles the latent and a short STAGE_2 refine restores detail. Running
# stage 1 at full res starves the 8-step model of the token budget it
# needs to coordinate motion — motion is suppressed / back-loaded. The
# operator can force the legacy single-stage path with two_stage=false.
_DEF_TWO_STAGE = True
# Soft-pin decoupling. The x0-pin blend pulls a conditioned token toward its
# clean target by a pin fraction. For a hard pin (denoise_mask 0 — i2v keyframe)
# that fraction must be 1.0; for pure noise (mask 1) it is 0.0. For a SOFT
# overlap token (0 < mask < 1) the welded default would pin it by (1 - mask),
# coupling the pin to the sigma mask — so a soft token noised enough to move is
# also dragged that hard back to stale prior-scene content. _DEF_SOFT_PIN_SCALE
# scales the soft pin fraction DOWN independently of the sigma mask: 1.0 = the
# legacy welded behaviour, 0.5 = soft tokens noised at the mask but pinned half
# as hard. Tunable via advanced.soft_pin_scale.
_DEF_SOFT_PIN_SCALE = 0.5
_STAGE2_DISTILLED_SIGMAS = (0.909375, 0.725, 0.421875, 0.0)
# Motion-intensity prompt nudge. A head-to-head proved an abstract
# adjective tag ("energetic motion") does NOT animate the model — motion
# comes from action VERBS describing what the subject does. Each level
# appends a verb-driven action clause. Two levels: "dynamic" (default —
# the energetic-but-coherent operating point) and "intense" (maximum
# motion, costs some fast-frame softness). An unknown value falls back to
# the default. The operator's own action verbs in the prompt body remain
# the strongest motion lever.
_DEF_MOTION_INTENSITY = "dynamic"
_MOTION_INTENSITY_SUFFIX = {
    "dynamic": (
        "the subject moves through the scene with energy, rising, "
        "turning and gesturing in sharp directed motion"
    ),
    "intense": (
        "the subject moves rapidly and forcefully, lunging, twisting "
        "and whipping in fast intense motion"
    ),
}
# VAE latent geometry. The LTX-2 video VAE downscales 8x temporally and
# 32x spatially with 128 latent channels — the SpatioTemporalScaleFactors
# default. A pixel frame count of 8n+1 maps to a clean latent frame
# count; non-conforming counts are snapped at geometry resolution.
_LATENT_CHANNELS = 128
_VAE_TIME_SCALE = 8
_VAE_SPATIAL_SCALE = 32
# Width/height snap. 64 (not the VAE's 32) so the two-stage half-res
# stage-1 geometry is itself an exact 32-multiple — half of a 64-snapped
# dimension divides cleanly by the VAE spatial scale.
_DIM_SNAP = 64

# VAE-decode tiling defaults (16 GiB-fit). A one-shot decode of the full
# 121-frame latent peaks ~23 GiB; temporal tiling decodes the clip in
# overlapping pixel-frame windows and trapezoidally blends the overlap,
# keeping peak well under the RTX 5070 Ti's 16 GiB. ltx-core's
# TemporalTilingConfig requires the frame counts to be >= 16 and divisible
# by 8. 48-frame tiles with a 16-frame overlap chunk a 121-frame clip into
# ~3 windows; the overlap respects the causal VAE (split_temporal_causal
# shifts each tile back by 1 + widens its left ramp for causal continuity).
# 0 disables a tiling axis. Both knobs are overridable via the request's
# `advanced` block.
_DEF_VAE_TEMPORAL_TILE_FRAMES = 48
_DEF_VAE_TEMPORAL_TILE_OVERLAP = 16
# Spatial tiling stays off by default — at 768x512 the temporal tiling
# alone fits 16 GiB, and a spatial split costs blend seams for no VRAM
# need here. It is exposed as a lever for larger frames.
_DEF_VAE_SPATIAL_TILE_PIXELS = 0
_DEF_VAE_SPATIAL_TILE_OVERLAP = 64
_DEF_NEGATIVE_PROMPT = (
    "shaky, glitchy, low quality, worst quality, deformed, distorted, "
    "disfigured, motion smear, motion artifacts, fused fingers, bad "
    "anatomy, weird hand, ugly, transition, static, strobing, flickering."
)
# Anti-artifact terms folded into the positive prompt. At guidance 1.0
# the uncond branch is skipped, so `_DEF_NEGATIVE_PROMPT` is inert —
# these positive cues are the only quality lever on the default profile.
# 16 fps base + RIFE doubling is prone to temporal aliasing; "stable
# motion" and "consistent lighting" steer away from the flicker RIFE
# would otherwise amplify.
_POSITIVE_QUALITY_SUFFIX = "stable motion, consistent lighting, sharp"
# Gemma packs chat-style prompts; the connector's FeatureExtractorV1 was
# trained against `caption_channels=3840` * 49 hidden states. The
# connector is sequence-length agnostic in CONTENT — its binary
# attention mask carries token validity — but its
# `_replace_padded_with_learnable_registers` step asserts the sequence
# length is an exact multiple of `connector_num_learnable_registers`.
# So the padded length is snapped UP to that register count rather than
# left at the fixed 1024 the old code used. `_GEMMA_MAX_SEQUENCE_LENGTH`
# is the hard cap (matches the diffusers `_get_gemma_prompt_embeds`
# ceiling). A typical render prompt is ~30-60 tokens, so for the usual
# 128-register checkpoint the encoder forward runs over 128 tokens
# instead of 1024 — an ~8x cut in the encoder's activation footprint
# (the dominant VRAM spike of the whole render), with no change to the
# connector output for the real tokens.
_GEMMA_MAX_SEQUENCE_LENGTH = 1024
# Fallback register count when the embedded config does not carry
# `transformer.connector_num_learnable_registers`.
_GEMMA_DEFAULT_REGISTER_COUNT = 128


class Ltx2RunState:
    def __init__(self, run_id: str, workdir: Path, plan: dict[str, Any]):
        self.run_id = run_id
        self.workdir = workdir
        self.plan = plan
        self.cancelled = False
        self.generation_count = 0
        self.resumed_from_segment: int = 0
        self.bg_task: Any = None
        self.pipe: Any = None


def register_ltx2_handlers(worker) -> None:
    state: dict[str, Ltx2RunState] = {}
    # One cached native bundle per warm worker (the worker process is
    # profile-pinned, so the cache is single-entry).
    cache: dict[str, Any] = {"bundle": None}

    async def models_list(_params: Any) -> dict[str, Any]:
        gguf = _resolve_paths().transformer_gguf
        return {
            "models": [
                {
                    "id": "ltx-2-19b-distilled-q4",
                    "available": gguf.is_file(),
                    "size_mb": 11000,
                }
            ]
        }

    async def plan_validate(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        return validate_plan(
            params.get("plan", params), profile="rtx50-ltx2-gguf"
        )

    async def render_start(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        run_id = sanitize_run_id(
            params.get("request_id"),
            fallback=f"run_{uuid.uuid4().hex[:12]}",
        )
        plan = ensure_dict(
            params.get("video") or params.get("plan"), name="plan", default={}
        )
        workdir = sanitize_workdir(
            params.get("workdir"),
            fallback=Path.cwd() / "ltx2_workdir" / run_id,
        )
        workdir.mkdir(parents=True, exist_ok=True)

        rs = Ltx2RunState(run_id=run_id, workdir=workdir, plan=plan)
        try:
            rs.resumed_from_segment = max(
                0, int(params.get("resumed_from_segment", 0))
            )
        except (TypeError, ValueError):
            rs.resumed_from_segment = 0
        state[run_id] = rs

        rs.bg_task = asyncio.create_task(
            _render_loop(worker, rs, params, cache),
            name=f"ltx2-render-{run_id}",
        )
        return {"run_id": run_id, "status": "started"}

    async def render_cancel(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        run_id = params.get("run_id") or params.get("request_id")
        rs = state.get(run_id)
        if rs is None:
            raise ValueError(f"unknown run: {run_id}")
        rs.cancelled = True
        return {"run_id": run_id, "cancel_requested": True}

    async def segment_retry(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        raise ValueError(
            "granular segment retry is not implemented for the ltxv2 "
            "(LTX-2 19B) pipeline — a failed 'single' or 'manual_stitch' "
            "render must be restarted as a whole"
        )

    worker.register(Methods.MODELS_LIST, models_list)
    worker.register(Methods.PLAN_VALIDATE, plan_validate)
    worker.register(Methods.RENDER_START, render_start)
    worker.register(Methods.RENDER_CANCEL, render_cancel)
    worker.register(Methods.SEGMENT_RETRY, segment_retry)


# --------------------------------------------------------------------------
# Path resolution
# --------------------------------------------------------------------------


class _ResolvedPaths:
    def __init__(
        self,
        transformer_gguf: Path,
        base_dir: Path,
        connector: Path,
        video_vae: Path,
        audio_vae: Path,
        gemma_dir: Path,
        latent_upsampler: Path,
    ) -> None:
        self.transformer_gguf = transformer_gguf
        self.base_dir = base_dir
        self.connector = connector
        self.video_vae = video_vae
        self.audio_vae = audio_vae
        self.gemma_dir = gemma_dir
        self.latent_upsampler = latent_upsampler


def _resolve_paths() -> _ResolvedPaths:
    """Resolve every Kijai-stack asset under <NEXUS_HOST_DATA_DIR>/models/.

    Env overrides mirror the ``pipeline_ltxv097`` pattern:
    ``NEXUS_VIDEO_LTX23_LTX2_GGUF`` pins the transformer GGUF;
    ``NEXUS_VIDEO_LTX23_LTX2_BASE_DIR`` pins the tokenizer config tree.
    """
    host_data_raw = os.environ.get("NEXUS_HOST_DATA_DIR", "").strip()
    if not host_data_raw:
        raise RuntimeError(
            "NEXUS_HOST_DATA_DIR is unset — cannot resolve the LTX-2 Kijai "
            "asset paths (transformer GGUF, connector, VAEs, Gemma encoder). "
            "The host runner must inject it; set it explicitly for a "
            "standalone smoke run."
        )
    host_data = Path(host_data_raw)
    models = host_data / "models"

    gguf_env = os.environ.get("NEXUS_VIDEO_LTX23_LTX2_GGUF", "").strip()
    transformer_gguf = (
        Path(gguf_env) if gguf_env else models / _TRANSFORMER_GGUF_REL
    )

    base_env = os.environ.get("NEXUS_VIDEO_LTX23_LTX2_BASE_DIR", "").strip()
    base_dir = Path(base_env) if base_env else models / _BASE_DIR_REL

    upsampler_env = os.environ.get(
        "NEXUS_VIDEO_LTX23_LTX2_UPSAMPLER", ""
    ).strip()
    latent_upsampler = (
        Path(upsampler_env)
        if upsampler_env
        else models / _LATENT_UPSAMPLER_REL
    )

    return _ResolvedPaths(
        transformer_gguf=transformer_gguf,
        base_dir=base_dir,
        connector=models / _CONNECTOR_REL,
        video_vae=models / _VIDEO_VAE_REL,
        audio_vae=models / _AUDIO_VAE_REL,
        gemma_dir=models / _GEMMA_GGUF_DIR_REL,
        latent_upsampler=latent_upsampler,
    )


# --------------------------------------------------------------------------
# Prompt embedding — stage 1 (Gemma encode, then unload)
# --------------------------------------------------------------------------


def _gemma_register_count(paths: _ResolvedPaths, logger: Any) -> int:
    """The connector's learnable-register count — the Gemma pad granule.

    Read from the embedded GGUF config
    (``transformer.connector_num_learnable_registers``) so a future
    checkpoint that changes it stays correct. Falls back to
    ``_GEMMA_DEFAULT_REGISTER_COUNT`` when the key is absent or the
    config cannot be read — a wrong granule only costs a few extra
    padded tokens, never a render failure (the connector still asserts
    the real constraint downstream).
    """
    try:
        from .ltx2_native_loader import read_embedded_config

        cfg = read_embedded_config(paths.transformer_gguf)
        raw = (cfg.get("transformer") or {}).get(
            "connector_num_learnable_registers"
        )
        count = int(raw) if raw is not None else _GEMMA_DEFAULT_REGISTER_COUNT
        if count < 1:
            count = _GEMMA_DEFAULT_REGISTER_COUNT
        return count
    except Exception as e:  # noqa: BLE001 — fall back, never abort
        logger.info(
            "ltx2.gemma_register_count.fallback",
            reason=str(e),
            count=_GEMMA_DEFAULT_REGISTER_COUNT,
        )
        return _GEMMA_DEFAULT_REGISTER_COUNT


def encode_prompts_with_gemma(
    paths: _ResolvedPaths,
    prompts: list[str],
    negative_prompt: str,
    guidance: float,
    logger: Any,
) -> list[dict[str, Any]]:
    """Load Gemma-3-12B once, encode every prompt (+ a shared negative
    when guided), unload Gemma.

    Returns one embed dict per prompt — ``{pos_hidden, pos_mask,
    neg_hidden, neg_mask}`` — carrying the raw per-layer hidden-state
    stacks the ``EmbeddingsProcessor`` consumes. The negative encode is
    shared across every returned dict (the uncond branch is prompt-
    independent). The heavy encoder is dropped before the 19B
    transformer loads — encoding all prompts in one Gemma load is the
    multi-scene VRAM-staging contract (spec 048: batch the Gemma encode,
    unload once).

    ``Gemma3TextModel`` (NOT ``Gemma3ForConditionalGeneration``) loads
    the unsloth ``gemma3_text`` GGUF cleanly. ``output_hidden_states``
    yields all 49 hidden states the ``FeatureExtractorV1`` was trained
    against.
    """
    import torch
    from transformers import Gemma3TextModel, GemmaTokenizerFast

    if not (paths.gemma_dir / _GEMMA_GGUF_FILE).is_file():
        raise RuntimeError(
            f"Gemma-3-12B GGUF not found at "
            f"{paths.gemma_dir / _GEMMA_GGUF_FILE}. Install the "
            f"'{_GEMMA_GGUF_DIR_REL}' weights."
        )
    clean_prompts = [p.strip() for p in prompts]
    if not clean_prompts:
        raise ValueError("encode_prompts_with_gemma: no prompts supplied")

    device = "cuda" if torch.cuda.is_available() else "cpu"
    logger.info(
        "ltx2.gemma_encode.load",
        gemma_dir=str(paths.gemma_dir),
        prompt_count=len(clean_prompts),
    )

    text_encoder = Gemma3TextModel.from_pretrained(
        str(paths.gemma_dir),
        gguf_file=_GEMMA_GGUF_FILE,
        dtype=torch.bfloat16,
    )
    tokenizer = GemmaTokenizerFast.from_pretrained(
        str(paths.base_dir / "tokenizer")
    )
    # The EmbeddingsProcessor's right-pad reorder expects left-padded
    # Gemma input — mirror the diffusers default.
    tokenizer.padding_side = "left"
    if tokenizer.pad_token is None:
        tokenizer.pad_token = tokenizer.eos_token

    text_encoder = text_encoder.to(device)
    text_encoder.eval()

    guided = guidance > 1.0 + 1e-6
    register_count = _gemma_register_count(paths, logger)
    encode_texts = list(clean_prompts)
    if guided:
        encode_texts.append(negative_prompt.strip())
    raw_lengths = [
        len(
            tokenizer(
                t, truncation=True, max_length=_GEMMA_MAX_SEQUENCE_LENGTH
            ).input_ids
        )
        for t in encode_texts
    ]
    longest = max(raw_lengths) if raw_lengths else register_count
    granules = (longest + register_count - 1) // register_count
    pad_length = min(
        _GEMMA_MAX_SEQUENCE_LENGTH, max(1, granules) * register_count
    )

    def _embed(text: str) -> tuple[Any, Any]:
        inputs = tokenizer(
            [text.strip()],
            padding="max_length",
            max_length=pad_length,
            truncation=True,
            add_special_tokens=True,
            return_tensors="pt",
        )
        input_ids = inputs.input_ids.to(device)
        attention_mask = inputs.attention_mask.to(device)
        with torch.no_grad():
            out = text_encoder(
                input_ids=input_ids,
                attention_mask=attention_mask,
                output_hidden_states=True,
            )
        stacked = torch.stack(
            [h.to(torch.bfloat16).cpu() for h in out.hidden_states], dim=-1
        )
        return stacked, attention_mask.cpu()

    logger.info("ltx2.gemma_encode.pad_length", pad_length=pad_length)
    neg_hidden = neg_mask = None
    if guided:
        neg_hidden, neg_mask = _embed(negative_prompt)

    results: list[dict[str, Any]] = []
    for prompt in clean_prompts:
        pos_hidden, pos_mask = _embed(prompt)
        results.append(
            {
                "pos_hidden": pos_hidden,
                "pos_mask": pos_mask,
                "neg_hidden": neg_hidden,
                "neg_mask": neg_mask,
            }
        )

    logger.info(
        "ltx2.gemma_encode.done",
        encoded=len(results),
        guided=guided,
    )

    # Unload Gemma — drop every strong reference then collapse the CUDA
    # allocator cache so the encoder footprint is reclaimed before the
    # 19B transformer loads.
    del text_encoder
    del tokenizer
    gc.collect()
    if torch.cuda.is_available():
        torch.cuda.empty_cache()

    return results


def _encode_prompt_with_gemma(
    paths: _ResolvedPaths,
    prompt: str,
    negative_prompt: str,
    guidance: float,
    logger: Any,
) -> dict[str, Any]:
    """Single-prompt Gemma encode — the single-clip render path."""
    return encode_prompts_with_gemma(
        paths, [prompt], negative_prompt, guidance, logger
    )[0]


# --------------------------------------------------------------------------
# Native stack assembly — stage 2 (transformer + connector)
# --------------------------------------------------------------------------


class _NativeStack:
    """The loaded native LTX-2 stack for one warm worker."""

    def __init__(
        self,
        transformer: Any,
        embeddings_processor: Any,
        config: dict[str, Any],
        device: Any,
    ) -> None:
        self.transformer = transformer
        self.embeddings_processor = embeddings_processor
        self.config = config
        self.device = device


def _build_native_stack(logger: Any) -> _NativeStack:
    """Load the GGUF transformer + the embeddings connector.

    The video VAE is loaded later, lazily, AFTER the transformer is
    evicted — so the 19B resident set and the VAE decoder transient
    never collide on the 16 GiB card.
    """
    global _LAZY_TORCH
    import torch  # pre-warmed on the main thread in __main__

    _LAZY_TORCH = torch

    paths = _resolve_paths()
    if not paths.transformer_gguf.is_file():
        raise RuntimeError(
            f"LTX-2 19B transformer GGUF not found at "
            f"{paths.transformer_gguf}. Install the Kijai LTXV2_comfy "
            "weights or set NEXUS_VIDEO_LTX23_LTX2_GGUF."
        )
    if not paths.connector.is_file():
        raise RuntimeError(
            f"LTX-2 embeddings connector not found at {paths.connector}."
        )

    install_device = "cuda" if torch.cuda.is_available() else "cpu"
    logger.info(
        "ltx2.load_transformer",
        gguf=str(paths.transformer_gguf),
        install_device=install_device,
    )

    # Audio-video model: the Kijai 19B GGUF carries the full audio
    # branch. We build the AV model so the schema is a clean 1:1 match,
    # but only the video branch is consumed in `_generate_single`.
    bundle = load_native_ltx2_transformer(
        paths.transformer_gguf,
        compute_dtype=torch.bfloat16,
        install_device=install_device,
        audio=True,
        strict_schema=True,
    )
    bundle.transformer.eval()

    embeddings_processor = build_embeddings_processor(
        paths.connector,
        bundle.config,
        device=install_device,
        dtype=torch.bfloat16,
        audio=True,
    )

    logger.info("ltx2.native_stack_assembled")
    return _NativeStack(
        transformer=bundle.transformer,
        embeddings_processor=embeddings_processor,
        config=bundle.config,
        device=torch.device(install_device),
    )


def _ensure_stack(
    rs: Ltx2RunState, cache: dict[str, Any], logger: Any
) -> _NativeStack:
    if cache.get("bundle") is not None:
        rs.pipe = cache["bundle"]
        return rs.pipe
    stack = _build_native_stack(logger)
    cache["bundle"] = stack
    rs.pipe = stack
    return stack


# --------------------------------------------------------------------------
# Sampling resolution
# --------------------------------------------------------------------------


def _coerce_int(value: Any, default: int) -> int:
    try:
        return int(value)
    except (TypeError, ValueError):
        return default


def _coerce_float(value: Any, default: float) -> float:
    try:
        return float(value)
    except (TypeError, ValueError):
        return default


def _coerce_bool(value: Any, default: bool) -> bool:
    if value is None:
        return default
    if isinstance(value, bool):
        return value
    return str(value).strip().lower() in ("1", "true", "yes", "on")


def _resolve_sampling(advanced: dict[str, Any]) -> dict[str, Any]:
    """The tunable sampling baseline. Every key is overridable via the
    request's ``advanced`` block; absent / null collapses to the
    ``ltxv2-distilled-q4`` profile default.
    """
    preset = profile_sampling(
        advanced.get("profile") or advanced.get("preset") or "ltxv2-distilled-q4"
    )

    def _pick(key: str, fallback: Any) -> Any:
        raw = advanced.get(key)
        if raw is None:
            return preset.get(key, fallback)
        return raw

    steps = _coerce_int(_pick("num_inference_steps", _DEF_STEPS), _DEF_STEPS)
    guidance = _coerce_float(
        _pick("guidance_scale", _DEF_GUIDANCE), _DEF_GUIDANCE
    )
    cond_noise = _coerce_float(
        _pick("image_cond_noise_scale", _DEF_IMAGE_COND_NOISE_SCALE),
        _DEF_IMAGE_COND_NOISE_SCALE,
    )
    two_stage = _coerce_bool(_pick("two_stage", _DEF_TWO_STAGE), _DEF_TWO_STAGE)
    soft_pin = _coerce_float(
        _pick("soft_pin_scale", _DEF_SOFT_PIN_SCALE), _DEF_SOFT_PIN_SCALE
    )
    intensity = str(
        _pick("motion_intensity", _DEF_MOTION_INTENSITY)
        or _DEF_MOTION_INTENSITY
    ).strip().lower()
    if intensity not in _MOTION_INTENSITY_SUFFIX:
        intensity = _DEF_MOTION_INTENSITY
    return {
        "num_inference_steps": max(1, steps),
        "guidance_scale": max(1.0, guidance),
        "image_cond_noise_scale": max(0.0, cond_noise),
        "two_stage": two_stage,
        "soft_pin_scale": min(1.0, max(0.0, soft_pin)),
        "motion_intensity": intensity,
    }


def _snap_to_multiple(value: int, multiple: int, minimum: int) -> int:
    """Round ``value`` to the nearest ``multiple``, never below ``minimum``."""
    snapped = max(minimum, round(value / multiple) * multiple)
    return snapped


def _resolve_vae_tiling(advanced: dict[str, Any]) -> dict[str, int]:
    """The VAE-decode tiling knobs. Every key is overridable via the
    request's ``advanced`` block; absent / null collapses to the
    16 GiB-fit default.

    ``vae_temporal_tile_frames`` / ``vae_temporal_tile_overlap`` size the
    overlapping pixel-frame windows the native ``VideoDecoder`` decodes
    one at a time. ``vae_spatial_tile_pixels`` /
    ``vae_spatial_tile_overlap`` are the spatial equivalent (off by
    default). A frame/overlap of ``0`` disables that tiling axis.
    """

    def _pick(key: str, fallback: int) -> int:
        raw = advanced.get(key)
        if raw is None:
            return fallback
        return _coerce_int(raw, fallback)

    return {
        "temporal_tile_frames": max(
            0, _pick("vae_temporal_tile_frames", _DEF_VAE_TEMPORAL_TILE_FRAMES)
        ),
        "temporal_tile_overlap": max(
            0, _pick("vae_temporal_tile_overlap", _DEF_VAE_TEMPORAL_TILE_OVERLAP)
        ),
        "spatial_tile_pixels": max(
            0, _pick("vae_spatial_tile_pixels", _DEF_VAE_SPATIAL_TILE_PIXELS)
        ),
        "spatial_tile_overlap": max(
            0, _pick("vae_spatial_tile_overlap", _DEF_VAE_SPATIAL_TILE_OVERLAP)
        ),
    }


def _build_tiling_config(tiling: dict[str, int], num_frames: int, logger: Any) -> Any:
    """Translate the resolved tiling knobs into an ltx-core ``TilingConfig``.

    Returns ``None`` when no axis is tiled (decoder falls back to a
    one-shot decode). ltx-core's ``TemporalTilingConfig`` /
    ``SpatialTilingConfig`` enforce the >=16 frames / >=64 px + divisible
    constraints; values are snapped to satisfy them rather than raising.
    A temporal tile that already covers the whole clip is dropped so the
    decoder does not pay tiling overhead for a single window.

    ``tiling`` may be an empty / partial dict (e.g. a direct
    ``_decode_video_latent`` smoke call that did not run
    ``_resolve_vae_tiling``); absent keys collapse to the 16 GiB-fit
    default so the decode still tiles.
    """
    from ltx_core.model.video_vae import (
        SpatialTilingConfig,
        TemporalTilingConfig,
        TilingConfig,
    )

    temporal_cfg = None
    tf = max(
        0, tiling.get("temporal_tile_frames", _DEF_VAE_TEMPORAL_TILE_FRAMES)
    )
    if tf > 0 and num_frames > tf:
        tile_frames = max(16, _snap_to_multiple(tf, 8, 16))
        overlap = _snap_to_multiple(
            max(0, tiling.get("temporal_tile_overlap", _DEF_VAE_TEMPORAL_TILE_OVERLAP)),
            8,
            0,
        )
        overlap = min(overlap, tile_frames - 8)
        if num_frames > tile_frames:
            temporal_cfg = TemporalTilingConfig(
                tile_size_in_frames=tile_frames,
                tile_overlap_in_frames=overlap,
            )

    spatial_cfg = None
    sp = max(0, tiling.get("spatial_tile_pixels", _DEF_VAE_SPATIAL_TILE_PIXELS))
    if sp >= 64:
        tile_px = max(64, _snap_to_multiple(sp, 32, 64))
        overlap = _snap_to_multiple(
            max(0, tiling.get("spatial_tile_overlap", _DEF_VAE_SPATIAL_TILE_OVERLAP)),
            32,
            0,
        )
        overlap = min(overlap, tile_px - 32)
        spatial_cfg = SpatialTilingConfig(
            tile_size_in_pixels=tile_px,
            tile_overlap_in_pixels=overlap,
        )

    if temporal_cfg is None and spatial_cfg is None:
        return None

    cfg = TilingConfig(spatial_config=spatial_cfg, temporal_config=temporal_cfg)
    try:
        logger.info(
            "ltx2.vae_tiling",
            temporal_frames=getattr(temporal_cfg, "tile_size_in_frames", None),
            temporal_overlap=getattr(temporal_cfg, "tile_overlap_in_frames", None),
            spatial_pixels=getattr(spatial_cfg, "tile_size_in_pixels", None),
            spatial_overlap=getattr(spatial_cfg, "tile_overlap_in_pixels", None),
        )
    except Exception:  # noqa: BLE001 — telemetry must never abort a render
        pass
    return cfg


def _resolve_geometry(plan: dict[str, Any]) -> dict[str, int]:
    """Render geometry from the profile ``render`` dict + plan overrides.

    Width/height are snapped to the VAE's 32x spatial scale and frame
    count to ``8n+1`` so the latent grid is integral — a non-conforming
    request would otherwise crash the patchifier deep in the loop.
    """
    profile = get_profile("ltxv2-distilled-q4")
    render = dict(profile.render) if profile else {}

    width = _coerce_int(plan.get("width", render.get("width")), _DEF_WIDTH)
    height = _coerce_int(plan.get("height", render.get("height")), _DEF_HEIGHT)
    frames = _coerce_int(
        plan.get("frame_count")
        or plan.get("num_frames")
        or render.get("frames"),
        _DEF_FRAMES,
    )
    base_fps = _coerce_int(
        plan.get("base_fps") or render.get("base_fps") or render.get("fps"),
        _DEF_BASE_FPS,
    )
    output_fps = _coerce_int(
        plan.get("output_fps") or render.get("output_fps"),
        max(_DEF_OUTPUT_FPS, 2 * base_fps),
    )

    width = _snap_to_multiple(width, _DIM_SNAP, _DIM_SNAP)
    height = _snap_to_multiple(height, _DIM_SNAP, _DIM_SNAP)
    # 8n+1 frame count: round (frames - 1) to a multiple of 8 then +1.
    frames = _snap_to_multiple(frames - 1, _VAE_TIME_SCALE, 0) + 1

    base_fps = max(1, base_fps)
    return {
        "width": width,
        "height": height,
        "num_frames": frames,
        "frame_rate": base_fps,
        "output_fps": max(base_fps, output_fps),
    }


def post_render_tail(
    stitched_path: Path,
    out_dir: Path,
    advanced: dict[str, Any],
    geometry: dict[str, int],
    logger: Any,
) -> Path:
    """Apply the esrgan upscale + RIFE interpolation post-render tail.

    Order (spec 048): esrgan 720p upscale when ``advanced.upscale_mode``
    is ``"esrgan"``, then RIFE ``base_fps``→``output_fps`` interpolation
    — upscale first so RIFE interpolates the hi-res frames. Both steps
    are fail-soft: a failed step leaves the prior file in place and the
    render continues. Returns the path of the most-processed file.
    """
    result = stitched_path
    upscale_mode = str(advanced.get("upscale_mode") or "").strip().lower()
    if upscale_mode == "esrgan":
        upscaled = out_dir / "upscaled.mp4"
        if try_upscale(result, upscaled, 1280, 720, logger):
            result = upscaled
            logger.info("ltx2.esrgan_upscale.applied", path=str(upscaled))
        else:
            logger.info("ltx2.esrgan_upscale.skipped")

    base_fps = int(geometry.get("frame_rate", _DEF_BASE_FPS))
    output_fps = int(geometry.get("output_fps", _DEF_OUTPUT_FPS))
    if output_fps > base_fps:
        interpolated = out_dir / "interpolated.mp4"
        if try_interpolate(result, interpolated, base_fps, output_fps, logger):
            result = interpolated
            logger.info(
                "ltx2.rife_interpolate.applied",
                base_fps=base_fps,
                output_fps=output_fps,
            )
        else:
            logger.info("ltx2.rife_interpolate.skipped")
    return result


def _write_render_sidecar(
    json_path: Path,
    *,
    advanced: dict[str, Any],
    paths: _ResolvedPaths,
    geometry: dict[str, int],
    samp: dict[str, Any],
    seed: int,
    conditioning: dict[str, Any],
    scene_count: int,
    duration: float,
    logger: Any,
) -> None:
    """Write the per-render metadata sidecar JSON. Advisory — fail-soft."""
    try:
        from . import ltx2_metadata

        vram_peak = None
        if _LAZY_TORCH is not None and _LAZY_TORCH.cuda.is_available():
            vram_peak = round(
                _LAZY_TORCH.cuda.max_memory_allocated() / 1024**3, 2
            )
        ltx2_metadata.write_render_metadata(
            json_path,
            ltx2_metadata.build_render_metadata(
                profile=str(
                    advanced.get("profile")
                    or advanced.get("preset")
                    or "ltxv2-distilled-q4"
                ),
                model_file=paths.transformer_gguf.name,
                geometry=geometry,
                sampling=samp,
                seed=seed,
                conditioning=conditioning,
                scene_count=scene_count,
                duration_seconds=duration,
                vram_peak_gib=vram_peak,
            ),
        )
        logger.info("ltx2.render_sidecar.written", path=str(json_path))
    except Exception as e:  # noqa: BLE001 — sidecar is advisory, never abort
        try:
            logger.info("ltx2.render_sidecar.skipped", reason=str(e))
        except Exception:  # noqa: BLE001
            pass


# --------------------------------------------------------------------------
# Render loop — mirrors the pipeline_ltxv097 / pipeline_fake contract
# --------------------------------------------------------------------------


async def _render_loop(
    worker,
    rs: Ltx2RunState,
    raw_params: dict[str, Any],
    cache: dict[str, Any],
) -> None:
    plan = rs.plan
    advanced = raw_params.get("advanced") or {}
    render_block = plan.get("render") if isinstance(plan.get("render"), dict) else {}
    render_path = str(
        (render_block or {}).get("path")
        or plan.get("render_path")
        or "single"
    ).strip().lower()

    if render_path == "manual_stitch":
        from . import ltx2_multiscene

        await ltx2_multiscene.run_multiscene(worker, rs, raw_params, cache)
        return

    if render_path != "single":
        await _emit_error(
            worker,
            rs.run_id,
            ErrorCodes.PLAN_INVALID,
            f"render.path '{render_path}' is not supported for the ltxv2 "
            "(LTX-2 19B) pipeline — only 'single' and 'manual_stitch' "
            "are implemented",
        )
        return

    geometry = _resolve_geometry(plan)
    samp = _resolve_sampling(advanced)
    vae_tiling = _resolve_vae_tiling(advanced)
    duration = float(
        plan.get("requested_duration_seconds")
        or plan.get("duration_seconds")
        or (geometry["num_frames"] / max(1, geometry["frame_rate"]))
    )

    prompt_obj = raw_params.get("prompt") or {}
    prompt = (
        prompt_obj.get("action")
        or prompt_obj.get("prompt")
        or prompt_obj.get("text")
        or ""
    ).strip()
    negative_prompt = (
        prompt_obj.get("negative") or _DEF_NEGATIVE_PROMPT
    ).strip()
    style = (prompt_obj.get("style") or "").strip()
    character = (prompt_obj.get("character") or "").strip()
    effective_prompt = ". ".join(
        p for p in (
            character,
            prompt,
            style,
            _MOTION_INTENSITY_SUFFIX[samp["motion_intensity"]],
            _POSITIVE_QUALITY_SUFFIX,
        ) if p
    )
    if not effective_prompt:
        await _emit_error(
            worker,
            rs.run_id,
            ErrorCodes.PLAN_INVALID,
            "render plan has no prompt text",
        )
        return

    try:
        worker.logger.info(
            "ltx2.resolved_params",
            **geometry,
            num_inference_steps=samp["num_inference_steps"],
            guidance_scale=samp["guidance_scale"],
        )
    except Exception:  # noqa: BLE001 — telemetry must never abort a render
        pass

    seed = _coerce_int(
        advanced.get("seed") or plan.get("seed") or (plan.get("segments") or [{}])[0].get("seed"),
        0,
    )

    if rs.resumed_from_segment > 0:
        await worker.emit_notification(
            Notifications.RESUME_ACKNOWLEDGED,
            {
                "run_id": rs.run_id,
                "resumed_from_segment": rs.resumed_from_segment,
            },
        )

    if rs.cancelled:
        await _emit_error(
            worker, rs.run_id, ErrorCodes.RENDER_CANCELLED,
            "render cancelled by user",
        )
        return

    await worker.emit_notification(
        Notifications.SEGMENT_STARTED,
        {
            "run_id": rs.run_id,
            "segment_index": 0,
            "segment_count": 1,
            "effective_prompt": effective_prompt,
        },
    )

    # Stage 1 — encode prompts with Gemma, then unload it.
    paths = _resolve_paths()
    try:
        embeds = await asyncio.to_thread(
            _encode_prompt_with_gemma,
            paths,
            effective_prompt,
            negative_prompt,
            samp["guidance_scale"],
            worker.logger,
        )
    except Exception as e:  # noqa: BLE001 — actionable error, not a stack
        await _emit_error(
            worker, rs.run_id, ErrorCodes.MODEL_LOAD_FAILED,
            f"ltxv2 Gemma prompt encode failed: {e}",
        )
        return

    await worker.emit_notification(
        Notifications.PROGRESS,
        {
            "run_id": rs.run_id,
            "overall_percent": 15.0,
            "current_segment_index": 0,
            "segment_count": 1,
            "message": "Prompt encoded; loading transformer",
        },
    )

    # Stage 1b — i2v keyframe source. The keyframe is VAE-encoded inside
    # `_generate_single`, per stage (half + full res for the two-stage
    # pipeline); the handler only resolves the request fields here.
    input_image_block = raw_params.get("input_image") or {}
    input_image_path = (
        input_image_block.get("path")
        if isinstance(input_image_block, dict)
        else None
    )
    keyframe_strength = _coerce_float(
        advanced.get("keyframe_strength"), _DEF_KEYFRAME_STRENGTH
    )

    # Stage 2 — load the GGUF transformer + embeddings connector.
    try:
        await asyncio.to_thread(_ensure_stack, rs, cache, worker.logger)
    except Exception as e:  # noqa: BLE001
        await _emit_error(
            worker, rs.run_id, ErrorCodes.MODEL_LOAD_FAILED,
            f"ltxv2 native stack load failed: {e}",
        )
        return

    seg_dir = rs.workdir / "segments" / "000"
    seg_dir.mkdir(parents=True, exist_ok=True)
    seg_path = seg_dir / "raw.mp4"
    last_frame_path = seg_dir / "last_frame.png"

    loop = asyncio.get_running_loop()

    def emit_step(step_idx: int) -> None:
        asyncio.run_coroutine_threadsafe(
            worker.emit_notification(
                Notifications.SEGMENT_STEP,
                {
                    "run_id": rs.run_id,
                    "segment_index": 0,
                    "segment_count": 1,
                    "step": step_idx + 1,
                    "total_steps": samp["num_inference_steps"],
                },
            ),
            loop,
        )

    # Stage 3 — native denoise + VAE-decode.
    # `_generate_single` evicts the 19B transformer from the cached
    # `_NativeStack` mid-render (VRAM staging), so the stack is
    # single-use — the `finally` drops the cache ref on EVERY exit
    # (success or failure) so a later render rebuilds cleanly rather
    # than reusing a transformer-less stack.
    try:
        frames = await asyncio.to_thread(
            functools.partial(
                _generate_single,
                rs.pipe,
                embeds,
                geometry,
                samp,
                seed,
                paths,
                emit_step,
                worker.logger,
                vae_tiling,
                input_image_path,
                keyframe_strength,
            )
        )
    except RuntimeError as e:
        msg = str(e)
        code = (
            ErrorCodes.VRAM_BUDGET_EXCEEDED
            if "out of memory" in msg.lower()
            else ErrorCodes.RENDER_FAILED
        )
        await _emit_error(worker, rs.run_id, code, msg)
        return
    except Exception as e:  # noqa: BLE001
        await _emit_error(worker, rs.run_id, ErrorCodes.RENDER_FAILED, str(e))
        return
    finally:
        cache["bundle"] = None
        rs.pipe = None
        evict_models(rs)
        gc.collect()
        if _LAZY_TORCH is not None and _LAZY_TORCH.cuda.is_available():
            try:
                _LAZY_TORCH.cuda.empty_cache()
            except Exception:  # noqa: BLE001
                pass

    if not frames:
        await _emit_error(
            worker, rs.run_id, ErrorCodes.RENDER_FAILED,
            "ltxv2 pipeline returned no video frames",
        )
        return

    try:
        _write_frames_as_mp4(frames, seg_path, geometry["frame_rate"])
        _save_last_frame(frames, last_frame_path)
    except Exception as e:  # noqa: BLE001
        await _emit_error(
            worker, rs.run_id, ErrorCodes.RENDER_FAILED,
            f"ltxv2 frame encode failed: {e}",
        )
        return

    for kind, p, mime in (
        ("raw_video", seg_path, "video/mp4"),
        ("last_frame", last_frame_path, "image/png"),
    ):
        await worker.emit_notification(
            Notifications.ARTIFACT_CREATED,
            {
                "run_id": rs.run_id,
                "segment_index": 0,
                "kind": kind,
                "path": str(p),
                "mime": mime,
            },
        )

    rs.generation_count += 1
    await worker.emit_notification(
        Notifications.MEMORY_STATS,
        {
            "run_id": rs.run_id,
            "segment_index": 0,
            **memory_stats(rs.generation_count),
        },
    )
    await worker.emit_notification(
        Notifications.SEGMENT_COMPLETED,
        {"run_id": rs.run_id, "segment_index": 0, "segment_count": 1},
    )

    final_dir = rs.workdir / "final"
    final_dir.mkdir(parents=True, exist_ok=True)
    stitched_path = final_dir / "stitched.mp4"
    final_path = final_dir / "final.mp4"
    stitch_segments([seg_path], stitched_path)
    pre_trim = await asyncio.to_thread(
        post_render_tail,
        stitched_path,
        final_dir,
        advanced,
        geometry,
        worker.logger,
    )
    trim_to_duration(pre_trim, final_path, duration_s=duration)

    await worker.emit_notification(
        Notifications.ARTIFACT_CREATED,
        {
            "run_id": rs.run_id,
            "kind": "final_video",
            "path": str(final_path),
            "mime": "video/mp4",
            "duration_seconds": duration,
        },
    )
    _write_render_sidecar(
        final_dir / "render.json",
        advanced=advanced,
        paths=paths,
        geometry=geometry,
        samp=samp,
        seed=seed,
        conditioning={
            "mode": "i2v" if input_image_path else "t2v",
            "keyframe_strength": keyframe_strength,
            "image_cond_noise_scale": samp["image_cond_noise_scale"],
            "two_stage": samp["two_stage"],
            "motion_intensity": samp["motion_intensity"],
        },
        scene_count=1,
        duration=duration,
        logger=worker.logger,
    )

    await worker.emit_notification(
        Notifications.DONE,
        {
            "run_id": rs.run_id,
            "final_path": str(final_path),
            "duration_seconds": duration,
            "segment_count": 1,
            "profile": "rtx50-ltx2-gguf",
        },
    )


# --------------------------------------------------------------------------
# Native generation
# --------------------------------------------------------------------------


def _build_video_context(
    stack: _NativeStack,
    hidden: Any,
    mask: Any,
    torch_mod: Any,
) -> tuple[Any, Any]:
    """Run the embeddings connector — Gemma hidden states → video context.

    ``EmbeddingsProcessor.process_hidden_states`` runs the feature
    extractor + the video/audio connectors and returns the per-modality
    encodings + a binary mask. We take the video branch only.
    """
    with torch_mod.no_grad():
        out = stack.embeddings_processor.process_hidden_states(
            hidden_states=hidden.to(stack.device),
            attention_mask=mask.to(stack.device),
            padding_side="left",
        )
    # `video_encoding` is the connector output the transformer's caption
    # projection consumes; `attention_mask` is the binary connector mask.
    return out.video_encoding, out.attention_mask


_DISTILLED_SIGMAS_8STEP = (
    1.0, 0.99375, 0.9875, 0.98125, 0.975, 0.909375, 0.725, 0.421875, 0.0,
)


def _resolve_sigmas(target_shape: Any, steps: int, torch_mod: Any) -> Any:
    """Build the sigma schedule for the LTX-2 19B distilled checkpoint.

    The distilled model is trained to sample on a FIXED 8-step sigma list
    (``DISTILLED_SIGMAS`` in the official ``ltx-pipelines`` package), NOT a
    scheduler descent — ``DistilledPipeline`` uses
    ``torch.tensor(DISTILLED_SIGMAS)`` and never calls ``LTX2Scheduler``.
    Its first four steps barely move (all >= 0.975); the denoising happens
    across the final four (0.975 -> 0.909 -> 0.725 -> 0.422 -> 0.0).
    Feeding ``LTX2Scheduler``'s smooth descent — which also stretches its
    terminal to 0.1, never the trained 0.422 — hands the model velocity
    targets at sigmas it never trained on, and every denoised token melts
    while the keyframe-pinned frame 0 (schedule-independent) survives.

    For the canonical 8-step distilled render the fixed list is returned
    verbatim. A non-8-step override falls back to ``LTX2Scheduler`` with a
    token-count-matched resolution shift — it reads
    ``math.prod(latent.shape[2:])`` and a bare call assumes a 4096-token
    default, so a meta latent (zero memory) of the real ``target_shape``
    is passed.
    """
    if steps == 8:
        return torch_mod.tensor(
            _DISTILLED_SIGMAS_8STEP, dtype=torch_mod.float32
        )

    from ltx_core.components.schedulers import LTX2Scheduler

    grid = torch_mod.empty(target_shape.to_torch_shape(), device="meta")
    sigmas = LTX2Scheduler().execute(steps=steps, latent=grid)
    return sigmas.to(torch_mod.float32)


def _renoise_soft_conditioned_tokens(
    latent: Any,
    clean_latent: Any,
    denoise_mask: Any,
    noise: Any,
    sigma0: float,
) -> Any:
    """Re-noise softly-conditioned tokens to their declared noise level.

    A conditioning item writes its clean latent into ``latent`` and
    ``clean_latent`` and sets ``denoise_mask = 1 - strength``. The loop
    steps every token at ``sigma * denoise_mask``. A hard pin (mask 0)
    and a pure-noise token (mask 1) are already seed-consistent; a SOFT
    token (0 < mask < 1) is seeded clean but declared noised at
    ``sigma0 * mask`` — a mismatch that melts the overlap. This re-noises
    only the soft tokens to the rectified-flow seed
    ``(1 - sigma0*mask)*clean + sigma0*mask*noise``.
    """
    import torch

    mask = denoise_mask[..., 0]
    soft = (mask > 0.0) & (mask < 1.0)
    if not bool(soft.any()):
        return latent
    sigma_eff = (sigma0 * mask).unsqueeze(-1)
    reseeded = (
        (1.0 - sigma_eff) * clean_latent.to(torch.float32)
        + sigma_eff * noise.to(torch.float32)
    ).to(latent.dtype)
    return torch.where(soft.unsqueeze(-1), reseeded, latent)


def _soft_pin_mask(denoise_mask: Any, soft_pin_scale: float) -> Any:
    """Per-token x0-pin fraction, decoupled from the sigma mask.

    The x0-pin blend pulls a conditioned token toward its clean target.
    A hard pin (``denoise_mask`` 0 — i2v keyframe) must stay fully pinned
    (fraction 1.0); a pure-noise token (mask 1) is never pinned (0.0). A
    SOFT overlap token (0 < mask < 1) would, under the welded default, be
    pinned by ``1 - mask`` — the same scalar that sets its noise level —
    so a token noised enough to move is also dragged that hard toward
    stale prior-scene content. ``soft_pin_scale`` scales ONLY the soft
    tokens' pin fraction: 1.0 reproduces the welded behaviour, lower
    values pin soft tokens looser while leaving their sigma mask intact.
    """
    import torch

    base = 1.0 - denoise_mask
    soft = (denoise_mask > 0.0) & (denoise_mask < 1.0)
    return torch.where(soft, base * float(soft_pin_scale), base)


def run_native_denoise(
    stack: _NativeStack,
    embeds: dict[str, Any],
    geometry: dict[str, int],
    samp: dict[str, Any],
    seed: int,
    step_heartbeat: Callable[[int], None] | None,
    logger: Any,
    conditioning_items: list[Any] | None = None,
    initial_latent: Any | None = None,
    sigmas_override: list[float] | None = None,
) -> Any:
    """Run the native LTX-2 denoise loop once; return the (B,C,F,H,W) grid latent.

    With no conditioning items this is the pure-t2v path: the latent is
    all noise, ``denoise_mask`` is all-ones, every token is stepped. A
    conditioning item marks clean tokens (``denoise_mask`` < 1): the
    keyframe condition replaces frame-0 tokens in place, the reference
    condition appends them. Those tokens carry a near-zero per-token
    timestep (``sigma * mask``) and their x0 prediction is pinned to
    ``clean_latent`` before each Euler step. With an all-ones mask the
    masked timestep and the x0 pin reduce exactly to the unconditioned
    arithmetic, so it is one loop for both paths.

    ``initial_latent`` + ``sigmas_override`` drive the distilled stage-2
    refine: a full-res ``(B,C,F,H,W)`` latent (the 2x-upsampled stage-1
    output) is renoised to ``sigmas_override[0]`` and denoised over the
    short ``STAGE_2_DISTILLED_SIGMAS`` schedule. Absent both, this is the
    stage-1 / single-stage path — pure noise, the full distilled schedule.

    The transformer is NOT evicted here — the caller owns VRAM staging:
    the single-clip path evicts before the VAE decode; the multi-scene
    path keeps the transformer warm across every scene.
    """
    import torch
    from ltx_core.components.diffusion_steps import EulerDiffusionStep
    from ltx_core.components.patchifiers import VideoLatentPatchifier
    from ltx_core.guidance.perturbations import BatchedPerturbationConfig
    from ltx_core.model.transformer.modality import Modality
    from ltx_core.tools import VideoLatentTools
    from ltx_core.types import LatentState, VideoLatentShape
    from ltx_core.utils import to_denoised

    device = stack.device
    dtype = torch.bfloat16
    transformer = stack.transformer

    width = geometry["width"]
    height = geometry["height"]
    num_frames = geometry["num_frames"]
    fps = float(geometry["frame_rate"])
    guidance = samp["guidance_scale"]
    if sigmas_override is not None:
        steps = len(sigmas_override) - 1
    else:
        steps = samp["num_inference_steps"]
    do_cfg = guidance > 1.0 + 1e-6 and embeds["neg_hidden"] is not None

    pos_context, pos_context_mask = _build_video_context(
        stack, embeds["pos_hidden"], embeds["pos_mask"], torch
    )
    neg_context = neg_context_mask = None
    if do_cfg:
        neg_context, neg_context_mask = _build_video_context(
            stack, embeds["neg_hidden"], embeds["neg_mask"], torch
        )

    latent_frames = (num_frames - 1) // _VAE_TIME_SCALE + 1
    latent_h = height // _VAE_SPATIAL_SCALE
    latent_w = width // _VAE_SPATIAL_SCALE
    target_shape = VideoLatentShape(
        batch=1,
        channels=_LATENT_CHANNELS,
        frames=latent_frames,
        height=latent_h,
        width=latent_w,
    )
    tools = VideoLatentTools(
        patchifier=VideoLatentPatchifier(patch_size=1),
        target_shape=target_shape,
        fps=fps,
    )

    if sigmas_override is not None:
        sigmas = torch.tensor(
            list(sigmas_override), dtype=torch.float32, device=device
        )
    else:
        sigmas = _resolve_sigmas(target_shape, steps, torch).to(device)
    sigma0 = float(sigmas[0])

    generator = torch.Generator(device="cpu").manual_seed(seed)
    init_state = tools.create_initial_state(
        device=device, dtype=dtype, initial_latent=initial_latent
    )
    token_count = init_state.latent.shape[1]
    noise = torch.randn(
        1, token_count, _LATENT_CHANNELS,
        generator=generator, dtype=torch.float32,
    ).to(device=device, dtype=dtype)
    # Rectified-flow seed: x_sigma0 = (1 - sigma0)*x0 + sigma0*noise.
    # Stage 1 / single-stage has no initial latent (x0 = zeros) and
    # sigma0 = 1.0, so the seed is pure noise — bit-identical to the prior
    # start. The stage-2 refine passes the 2x-upsampled stage-1 latent as
    # x0 and renoises at sigma0 = STAGE_2_DISTILLED_SIGMAS[0] (0.909375).
    latent_seed = (
        (1.0 - sigma0) * init_state.latent.to(torch.float32)
        + sigma0 * noise.to(torch.float32)
    ).to(dtype)

    items = list(conditioning_items or [])
    has_cond = bool(items)
    state = LatentState(
        latent=latent_seed,
        denoise_mask=torch.ones(
            1, token_count, 1, device=device, dtype=torch.float32
        ),
        positions=init_state.positions.to(device),
        clean_latent=latent_seed,
        attention_mask=None,
    )
    for item in items:
        state = item.apply_to(state, tools)
    if items and state.clean_latent.shape != state.latent.shape:
        raise RuntimeError(
            f"ltx-core conditioning left clean_latent "
            f"{tuple(state.clean_latent.shape)} != latent "
            f"{tuple(state.latent.shape)} — the per-step re-pin would corrupt"
        )

    latent = state.latent
    positions = state.positions
    denoise_mask = state.denoise_mask.to(torch.float32)
    clean_latent = state.clean_latent
    attention_mask = state.attention_mask
    if has_cond:
        latent = _renoise_soft_conditioned_tokens(
            latent, clean_latent, denoise_mask, noise, sigma0
        )
    mask_flat = denoise_mask[..., 0]
    pin_mask = _soft_pin_mask(
        denoise_mask, samp.get("soft_pin_scale", _DEF_SOFT_PIN_SCALE)
    )

    diffusion_step = EulerDiffusionStep()
    perturbations = BatchedPerturbationConfig.empty(batch_size=1)

    # i2v motion headroom: a keyframe pinned to a fixed clean target on
    # every step reads to the model as a finished frame 0 from step 1, so
    # the safest temporally-coherent continuation is to copy it — motion
    # is suppressed or back-loaded. Re-noising the conditioned-token pin
    # target, decaying linearly from full at step 0 to zero on the last
    # step, keeps frame 0 a loose target while early steps decide motion,
    # then locks it to the exact keyframe. ``cond_noise`` is a fixed
    # seeded tensor so the decay is deterministic.
    image_cond_noise_scale = float(samp.get("image_cond_noise_scale", 0.0))
    cond_noise = None
    if has_cond and image_cond_noise_scale > 0.0:
        cond_gen = torch.Generator(device="cpu").manual_seed(seed + 1)
        cond_noise = torch.randn(
            tuple(clean_latent.shape),
            generator=cond_gen,
            dtype=torch.float32,
        ).to(device)

    logger.info(
        "ltx2.native_denoise.start",
        steps=steps,
        guidance=guidance,
        cfg=do_cfg,
        token_count=int(latent.shape[1]),
        conditioned=has_cond,
        image_cond_noise=image_cond_noise_scale,
        sigmas=[round(float(s), 4) for s in sigmas.tolist()],
    )

    def _run_transformer(lat: Any, sigma_val: Any, ctx: Any, ctx_mask: Any) -> Any:
        """One LTXModel velocity forward for the video branch.

        ``timesteps`` is per-token ``sigma * denoise_mask`` — clean
        conditioning tokens land at ~0, the noisy tokens at the loop
        sigma. With an all-ones mask this is the uniform-sigma forward
        of the prior t2v path.
        """
        timesteps = (float(sigma_val) * mask_flat).to(device=device, dtype=dtype)
        modality = Modality(
            latent=lat,
            sigma=torch.tensor([float(sigma_val)], device=device, dtype=dtype),
            timesteps=timesteps,
            positions=positions,
            context=ctx.to(dtype),
            enabled=True,
            context_mask=ctx_mask,
            attention_mask=attention_mask,
        )
        video_out, _audio_out = transformer(
            video=modality, audio=None, perturbations=perturbations
        )
        return video_out

    with torch.no_grad():
        for step_idx in range(steps):
            sigma = sigmas[step_idx]
            sigma_f = float(sigma)
            # Per-token sigma — ltx-core's X0Model contract: a token's
            # velocity->x0 conversion uses timesteps = sigma * denoise_mask.
            # Clean conditioning tokens (denoise_mask < 1) convert at ~0.
            token_sigma = sigma * denoise_mask

            velocity = _run_transformer(
                latent, sigma_f, pos_context, pos_context_mask
            )
            denoised = to_denoised(latent, velocity, token_sigma)

            if do_cfg:
                neg_velocity = _run_transformer(
                    latent, sigma_f, neg_context, neg_context_mask
                )
                neg_denoised = to_denoised(latent, neg_velocity, token_sigma)
                denoised = neg_denoised + guidance * (denoised - neg_denoised)

            # x0-space conditioning: blend conditioned tokens toward the
            # keyframe pin target in the denoised (x0) prediction BEFORE
            # the Euler step, then advance every token together. Blending
            # the *stepped* latent (next sigma) with a raw sigma-0 clean
            # latent — the prior approach — mixed noise levels and melted
            # keyframe-anchored subjects. The pin target carries
            # step-decaying noise (loose early, exact keyframe on the last
            # step) for i2v motion headroom. ``pin_mask`` is the pin
            # fraction decoupled from the sigma mask — a hard pin stays
            # fully pinned, a soft overlap token is pinned looser than its
            # sigma mask implies (see _soft_pin_mask).
            if has_cond:
                pin = clean_latent.to(torch.float32)
                if cond_noise is not None:
                    decay = 1.0 - step_idx / max(1, steps - 1)
                    pin = pin + (image_cond_noise_scale * decay) * cond_noise
                denoised = (
                    (1.0 - pin_mask) * denoised.to(torch.float32)
                    + pin_mask * pin
                ).to(dtype)

            latent = diffusion_step.step(
                sample=latent,
                denoised_sample=denoised,
                sigmas=sigmas,
                step_index=step_idx,
            )

            if step_heartbeat is not None:
                try:
                    step_heartbeat(step_idx)
                except Exception:  # noqa: BLE001 — never abort a render
                    pass

    final_state = LatentState(
        latent=latent,
        denoise_mask=denoise_mask,
        positions=positions,
        clean_latent=clean_latent,
        attention_mask=attention_mask,
    )
    if has_cond:
        final_state = tools.clear_conditioning(final_state)
    grid_latent = tools.unpatchify(final_state).latent
    logger.info(
        "ltx2.native_denoise.done", latent_shape=list(grid_latent.shape)
    )
    return grid_latent


def run_two_stage_denoise(
    stack: _NativeStack,
    embeds: dict[str, Any],
    geometry: dict[str, int],
    samp: dict[str, Any],
    seed: int,
    step_heartbeat: Callable[[int], None] | None,
    logger: Any,
    upsampler: Any,
    vae_encoder: Any,
    conditioning_stage1: list[Any] | None = None,
    conditioning_stage2: list[Any] | None = None,
) -> tuple[Any, Any]:
    """Distilled two-stage render: half-res stage 1 -> 2x upsample -> refine.

    The distilled 19B coordinates motion in its trained regime — stage 1
    at half the target resolution. ``LatentUpsampler`` then doubles the
    grid latent spatially and a short ``STAGE_2`` refine restores detail
    at full resolution. ``conditioning_stage1`` conditions the half-res
    pass (keyframe at half res, or a scene-continuation tail);
    ``conditioning_stage2`` conditions the refine (keyframe at full res,
    or empty — a continuation scene's continuity is already carried in
    the upsampled latent).

    Geometry width/height are 64-snapped at resolution time so the half
    grid is an exact integer half. Returns ``(refined_full_grid,
    stage1_half_grid)`` — the caller decodes the full grid and may slice
    the half grid for scene continuation.
    """
    import torch

    from . import ltx2_upsampler as ups

    geo_half = {
        **geometry,
        "width": geometry["width"] // 2,
        "height": geometry["height"] // 2,
    }
    logger.info(
        "ltx2.two_stage.start",
        half=[geo_half["width"], geo_half["height"]],
        full=[geometry["width"], geometry["height"]],
        num_frames=geometry["num_frames"],
    )

    grid_half = run_native_denoise(
        stack, embeds, geo_half, samp, seed, step_heartbeat, logger,
        conditioning_stage1,
    )
    grid_up = ups.upsample_grid_latent(
        grid_half.to("cpu"), vae_encoder, upsampler
    )
    grid_refined = run_native_denoise(
        stack, embeds, geometry, samp, seed, step_heartbeat, logger,
        conditioning_stage2,
        initial_latent=grid_up.to(device=stack.device, dtype=torch.bfloat16),
        sigmas_override=list(_STAGE2_DISTILLED_SIGMAS),
    )
    logger.info(
        "ltx2.two_stage.done", latent_shape=list(grid_refined.shape)
    )
    return grid_refined, grid_half


def evict_transformer(stack: _NativeStack) -> None:
    """Drop the 19B transformer and collapse the CUDA allocator cache.

    The peak counter is reset so a subsequent VAE-decode peak readout
    isolates the decoder footprint from the (now-evicted) denoise peak —
    the two never coexist on the 16 GiB card.
    """
    import torch

    if stack.transformer is None:
        return
    stack.transformer = None
    gc.collect()
    if torch.cuda.is_available():
        torch.cuda.empty_cache()
        torch.cuda.reset_peak_memory_stats()


def decode_grid_to_frames(
    grid_latent: Any,
    paths: _ResolvedPaths,
    device: Any,
    logger: Any,
    num_frames: int,
    vae_tiling: dict[str, int] | None = None,
) -> list[Any]:
    """Decode a (B,C,F,H,W) grid latent to PIL frames via the native VAE."""
    import numpy as np
    import torch
    from PIL import Image

    rgb = _decode_video_latent(
        grid_latent, paths, device, logger, num_frames, vae_tiling or {}
    )
    if torch.cuda.is_available():
        try:
            logger.info(
                "ltx2.vae_decode.peak_gib",
                peak=round(torch.cuda.max_memory_allocated() / 1024**3, 2),
            )
        except Exception:  # noqa: BLE001 — telemetry must never abort a render
            pass

    arr = (rgb.clamp(0.0, 1.0).float().cpu().numpy() * 255.0).astype(np.uint8)
    frames = [Image.fromarray(arr[i]) for i in range(arr.shape[0])]
    logger.info("ltx2.frames_ready", count=len(frames))
    return frames


def _generate_single(
    stack: _NativeStack,
    embeds: dict[str, Any],
    geometry: dict[str, int],
    samp: dict[str, Any],
    seed: int,
    paths: _ResolvedPaths,
    step_heartbeat: Callable[[int], None] | None,
    logger: Any,
    vae_tiling: dict[str, int] | None = None,
    input_image_path: str | None = None,
    keyframe_strength: float = _DEF_KEYFRAME_STRENGTH,
) -> list[Any]:
    """Single-clip render: denoise → evict transformer → VAE decode.

    With ``samp['two_stage']`` (the default) this runs the distilled
    two-stage pipeline — half-res stage 1, 2x latent upsample, full-res
    refine — encoding the i2v keyframe at both resolutions. With
    ``two_stage`` off it is the legacy single-stage full-res denoise.
    The transformer is evicted before the VAE decode so the decoder
    transient never collides with the 19B resident set.
    """
    import torch

    from . import ltx2_conditioning as cond
    from . import ltx2_upsampler as ups

    two_stage = bool(samp.get("two_stage", _DEF_TWO_STAGE))

    if two_stage:
        geo_half = {
            **geometry,
            "width": geometry["width"] // 2,
            "height": geometry["height"] // 2,
        }
        kf_half = encode_keyframe(
            paths, input_image_path, geo_half, keyframe_strength, logger
        )
        kf_full = encode_keyframe(
            paths, input_image_path, geometry, keyframe_strength, logger
        )
        upsampler = ups.load_latent_upsampler(
            paths.latent_upsampler, "cpu", logger
        )
        vae_encoder = cond.load_video_encoder(
            paths.video_vae, torch.device("cpu"), logger
        )
        grid_latent, _grid_half = run_two_stage_denoise(
            stack, embeds, geometry, samp, seed, step_heartbeat, logger,
            upsampler, vae_encoder,
            conditioning_stage1=[kf_half] if kf_half is not None else [],
            conditioning_stage2=[kf_full] if kf_full is not None else [],
        )
        del upsampler, vae_encoder
    else:
        kf = encode_keyframe(
            paths, input_image_path, geometry, keyframe_strength, logger
        )
        grid_latent = run_native_denoise(
            stack, embeds, geometry, samp, seed, step_heartbeat, logger,
            [kf] if kf is not None else [],
        )

    evict_transformer(stack)
    return decode_grid_to_frames(
        grid_latent, paths, stack.device, logger,
        geometry["num_frames"], vae_tiling,
    )


def encode_keyframe(
    paths: _ResolvedPaths,
    image_path: str | None,
    geometry: dict[str, int],
    strength: float,
    logger: Any,
) -> Any | None:
    """Encode an input image into an i2v keyframe conditioning item.

    Loads the native VAE encoder, encodes the cover-cropped input image
    to a one-frame latent, frees the encoder, and returns the keyframe
    condition. Returns ``None`` when no input image is supplied — the
    caller then renders pure-noise t2v.

    Motion headroom is NOT injected here: a once-upfront noise on the
    keyframe latent froze nothing and just softened frame 0. The denoise
    loop instead re-noises the conditioned-frame pin target per step
    (``samp['image_cond_noise_scale']``) — loose early, tight late — so
    the keyframe stays a clean target while early steps keep motion
    freedom.
    """
    import torch

    from . import ltx2_conditioning as cond

    image = cond.load_input_image(
        image_path, geometry["width"], geometry["height"]
    )
    if image is None:
        return None
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    encoder = cond.load_video_encoder(paths.video_vae, device, logger)
    try:
        keyframe_latent = cond.encode_image_to_latent(
            image, encoder, device, logger
        )
    finally:
        del encoder
        gc.collect()
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
    return cond.build_keyframe_condition(keyframe_latent, strength)


def _decode_video_latent(
    grid_latent: Any,
    paths: _ResolvedPaths,
    device: Any,
    logger: Any,
    num_frames: int,
    tiling: dict[str, int],
) -> Any:
    """Decode a (B, 128, F, H, W) latent with the native ``VideoDecoder``.

    The Kijai ``LTX2_video_vae_bf16.safetensors`` carries the full VAE
    config in its safetensors metadata. ltx-core's
    ``VideoDecoderConfigurator`` builds the matching ``VideoDecoder``;
    the ``decoder.*`` + ``per_channel_statistics.*`` keys load directly
    (non-strict — the file carries a few extra per-channel-stats buffers
    the module does not register).

    VRAM: a one-shot decode of the full 121-frame latent peaks ~23 GiB —
    over the 16 GiB card. Two ltx-core levers bring it down, both
    enabled here:
      1. ``enable_memory_efficient_decode`` swaps the decoder forward for
         a workspace-reuse / in-place-op path (identical output, lower
         transient footprint).
      2. ``decode_video(latent, tiling_config=...)`` decodes the clip in
         overlapping pixel-frame windows (``tiled_decode``) and
         trapezoidally blends the overlap. ltx-core's
         ``split_temporal_causal`` shifts each tile back by 1 and widens
         its left ramp so the causal VAE's temporal context is respected
         across the seam — no hand-rolled chunk loop needed.
    """
    import torch
    from safetensors import safe_open
    from safetensors.torch import load_file
    from ltx_core.loader.helpers import create_meta_model
    from ltx_core.model.video_vae import VideoDecoderConfigurator
    from ltx_core.model.video_vae.memory_efficient_decode import (
        enable_memory_efficient_decode,
    )

    if not paths.video_vae.is_file():
        raise RuntimeError(
            f"LTX-2 video VAE not found at {paths.video_vae}"
        )

    with safe_open(str(paths.video_vae), framework="pt") as f:
        meta = f.metadata() or {}
    if "config" not in meta:
        raise RuntimeError(
            f"LTX-2 video VAE at {paths.video_vae} has no 'config' "
            "metadata — cannot configure the native VideoDecoder."
        )
    vae_config = json.loads(meta["config"])

    decoder = create_meta_model(VideoDecoderConfigurator, vae_config)

    raw = load_file(str(paths.video_vae))
    # The decoder + per-channel-statistics keys; the encoder half of the
    # file is dropped (decode-only path).
    decoder_sd = {
        k[len("decoder.") :]: v
        for k, v in raw.items()
        if k.startswith("decoder.")
    }
    decoder_sd.update(
        {k: v for k, v in raw.items() if k.startswith("per_channel_statistics.")}
    )
    # `assign=True` is mandatory here: the decoder was built on the meta
    # device by `create_meta_model`, and the default copy-in-place load is
    # a silent no-op for meta params (torch warns "copying to a meta
    # parameter ... is a no-op"). `assign` swaps the meta placeholders for
    # the real CPU tensors, which the `.to(device)` below then moves.
    missing, _unexpected = decoder.load_state_dict(
        decoder_sd, strict=False, assign=True
    )
    real_missing = [
        m for m in missing if not m.startswith("per_channel_statistics.")
    ]
    if real_missing:
        raise RuntimeError(
            f"native VideoDecoder weight load mismatch — missing="
            f"{real_missing[:6]}. The Kijai video-VAE key layout "
            "diverged from ltx-core's VideoDecoder."
        )

    meta_left = [n for n, p in decoder.named_parameters() if str(p.device) == "meta"]
    if meta_left:
        raise RuntimeError(
            f"native VideoDecoder has {len(meta_left)} params still on "
            f"meta after load — sample {meta_left[:5]}."
        )

    decoder = decoder.to(device=device, dtype=torch.bfloat16)
    decoder.eval()
    # Workspace-reuse / in-place decode forward — a pure VRAM win with
    # bit-identical output. Applied before any decode call.
    enable_memory_efficient_decode(decoder)
    logger.info("ltx2.video_decoder_loaded", keys=len(decoder_sd))

    tiling_config = _build_tiling_config(tiling, num_frames, logger)

    chunks: list[Any] = []
    with torch.no_grad():
        # `decode_video` yields RGB chunks shaped [f, h, w, c] in [0, 1].
        # A `tiling_config` decodes in causal overlapping windows; `None`
        # falls back to the one-shot decode. Each yielded chunk is moved
        # to CPU before the next window decodes so the GPU only ever holds
        # one window's worth of pixel-space output.
        for chunk in decoder.decode_video(
            grid_latent.to(torch.bfloat16), tiling_config=tiling_config
        ):
            chunks.append(chunk.float().cpu())

    if not chunks:
        raise RuntimeError("native VideoDecoder yielded no frames")

    video = torch.cat(chunks, dim=0)

    del decoder
    gc.collect()
    if torch.cuda.is_available():
        torch.cuda.empty_cache()

    logger.info("ltx2.video_decoded", frame_count=int(video.shape[0]))
    return video


# --------------------------------------------------------------------------
# IO helpers
# --------------------------------------------------------------------------


def _write_frames_as_mp4(frames: Any, path: Path, frame_rate: int) -> None:
    import tempfile

    import ffmpeg  # type: ignore

    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="ltx2-seg-") as tmp:
        tmp_dir = Path(tmp)
        for i, frame in enumerate(frames):
            frame.save(tmp_dir / f"frame_{i:05d}.png")
        (
            ffmpeg.input(
                str(tmp_dir / "frame_%05d.png"), framerate=frame_rate
            )
            .output(
                str(path),
                vcodec="libx264",
                pix_fmt="yuv420p",
                movflags="+faststart",
                loglevel="error",
            )
            .overwrite_output()
            .run()
        )


def _save_last_frame(frames: Any, path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    last = frames[-1] if hasattr(frames, "__len__") else frames
    last.save(path)


async def _emit_error(worker, run_id: str, code: int, message: str) -> None:
    msg = message if len(message) <= 2000 else message[:2000] + "…"
    await worker.emit_notification(
        Notifications.ERROR,
        {"run_id": run_id, "code": code, "message": msg},
    )
