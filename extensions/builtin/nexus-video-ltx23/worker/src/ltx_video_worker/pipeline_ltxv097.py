"""Separate render pipeline for the LTX-Video 0.9.7 13B GGUF profile.

This is a DIFFERENT model line from the LTX-2.3-22B path in
``pipeline_diffusers.py``:

  - base_model ``Lightricks/LTX-Video`` (the original LTX-Video 0.9.x
    line), NOT LTX-2 / LTX-2.3
  - T5-XXL text encoder (NOT Gemma-3)
  - its own VAE (companion ``ltxv-13b-0.9.7-vae-BF16.safetensors``)
  - diffusers-native ``LTXConditionPipeline`` family + the documented
    upstream LTX-Video GGUF recipe
    (``LTXVideoTransformer3DModel.from_single_file(gguf,
    GGUFQuantizationConfig(...))``) — NOT the dg845 key-rename hack the
    LTX-2.3 GGUF needs.

Why it is its own module (not a branch inside the 85 KB
``pipeline_diffusers.py``): the user asked for a *separate* selectable
pipeline; keeping it isolated means it cannot destabilise the working
LTX-2.3 paths and the dispatch fork in ``__main__`` is a one-liner.

The Q4_K_M transformer (~8 GB) + companion VAE (~2.3 GB) fit a 16 GB
card RESIDENT — it never pages, so the ``GGUFParameter``-opaque-to-
offload-hooks wall that blocks the LTX-2.3 ``rtx50-gguf`` path does not
apply here. T5 is the only component that may need offload, handled by
``offload_mode='model'`` (the profile default).

GPU-UNVERIFIED: this follows the stable, documented diffusers
LTX-Video GGUF recipe + the exact RPC contract from
``pipeline_fake``/``pipeline_diffusers``, but the first real render on
a 16 GB card is the verification. Plan-time Guard 0d
(``[ltxv097_under_construction]``, gated on
``runtime_selection::ltxv097_proven()``) keeps the path rejected until
that first GPU run passes — flip the flag only then. The defensive
import/probe guards below turn an API/model-shape mismatch into an
actionable error notification instead of a deep stack trace.
"""

from __future__ import annotations

import asyncio
import functools
import gc
import os
import uuid
from pathlib import Path
from typing import Any, Callable

from .ffmpeg_io import stitch_segments, trim_to_duration
from .fps_interp import try_interpolate
from .io_safety import ensure_dict, sanitize_run_id, sanitize_workdir
from .planning_validate import validate_plan
from .rpc import ErrorCodes, Methods, Notifications
from .seam import apply_seam, seam_params
from .vram import evict_models, memory_stats

# Lazy torch handle, populated on first pipeline load (mirrors the
# pipeline_diffusers `_LAZY_TORCH` pattern; the heavy import is
# pre-warmed on the main thread in __main__).
_LAZY_TORCH: Any = None

# Default transformer quant from the wsbagnsv1 ladder. Q5_K_S
# (~8.5 GiB) is the conditioned-fit sweet spot, GPU-verified
# 2026-05-19: conditioned 2-scene peak 12.79 GiB on a 16 GB card, no
# shared-mem crawl, 5-bit K-quant fidelity above Q4_K_M. Q6_K (~10 GiB)
# was the prior default but the Q6 VRAM RCA (2026-05-18) proved its
# +2 GiB resident deficit makes EVERY conditioned/multi-scene render
# spill into Windows shared memory (~22-33 s/step crawl) — it is
# unconditioned-only on 16 GB. Q4_K_M remains the lighter fallback;
# the model dropdown makes this per-render selectable. Override with
# NEXUS_VIDEO_LTX23_LTXV097_GGUF (or the model_id param).
_DEFAULT_GGUF_BASENAME = "ltxv-13b-0.9.7-dev-Q5_K_S.gguf"
_GGUF_REPO = "wsbagnsv1/ltxv-13b-0.9.7-dev-GGUF"
# CORRECT diffusers base for the 13b-0.9.7-dev GGUF: the dedicated
# diffusers-format repo (model_index + transformer/config + the proper
# 0.9.7 `vae/` + T5 + tokenizer + scheduler). NOT the `Lightricks/
# LTX-Video` monorepo (mixes 0.9.0–0.9.8 / 2B / 13B configs — pairing
# the GGUF with its transformer/vae config produced pure-noise output,
# RCA 2026-05-18). The companion ComfyUI VAE blob is NOT used: this
# repo's `vae/` is the canonical diffusers 0.9.7 video VAE.
_BASE_REPO = "Lightricks/LTX-Video-0.9.7-dev"

# Official 0.9.7 spatial latent upscaler (two-pass 720p). The on-disk
# asset is a single safetensors (ComfyUI shape) under the LTX-Video
# repo dir, not a diffusers tree — resolution handles both + the HF id.
_UPSCALER_REPO = "Lightricks/ltxv-spatial-upscaler-0.9.7"
_UPSCALER_SINGLE_REL = (
    "models/Lightricks/LTX-Video/ltxv-spatial-upscaler-0.9.7.safetensors"
)

# Sampling baseline (the example workflow + diffusers LTXConditionPipeline
# defaults). Every value is overridable via the render request's
# `advanced` block — these are the defaults a stable render starts from.
_BASE_W, _BASE_H = 768, 512          # native 13b-0.9.7 gen resolution
_DEF_STEPS = 30
# guidance_scale: the motion experiment (2026-05-18) showed g=3.0
# (diffusers default) → near-static even with motion-rich prompts
# (motion 0.029); g=6.0 + explicit motion language → genuine coherent
# camera/scene motion (0.123) with NO quality loss (GGUF Q-quant has
# no fp8 e4m3 saturation, so >5.5 is safe here, unlike the fp8/nvfp4
# LTX-2.3 profiles). 6.0 is the established base-motion baseline.
# NOTE: LTX is heavily prompt-driven for motion — static scene
# descriptions still yield static video at any guidance; prompts must
# describe camera/subject motion explicitly.
_DEF_GUIDANCE = 6.0
_DEF_DECODE_TIMESTEP = 0.05
_DEF_DECODE_NOISE_SCALE = 0.025
# image_cond_noise_scale: noise mixed into the conditioning frame. The
# workflow's "Set VAE Decoder Noise [0.05, 0.025]" is decode_timestep
# + decode_noise_scale — NOT this. 0.025 over-anchors → near-static
# conditioned scene 2 (2026-05-18 visual RCA). diffusers' default 0.15
# lets the continuation actually move while staying on-identity.
_DEF_IMAGE_COND_NOISE_SCALE = 0.15
# LTXVideoCondition.strength: 1.0 = fully anchor scene 2 to the prev
# frame (over-preserved/static). < 1.0 lets it diverge & animate while
# inheriting identity/style. 0.7 is the motion-vs-continuity baseline.
_DEF_CONDITION_STRENGTH = 0.7
# How many trailing frames of the previous scene to feed as the
# continuation's VIDEO condition (vs a single still, which over-anchors
# → static). One LTX latent temporal unit = 8 frames, so a meaningful
# motion-bearing tail is a small multiple. 24 ≈ 1 s @ 24fps of motion
# context; tunable via advanced.condition_tail_frames.
_DEF_CONDITION_TAIL_FRAMES = 24
# guidance_rescale (Lin et al. 2023, "Common Diffusion Noise Schedules
# and Sample Steps are Flawed") rescales the predicted noise after CFG
# to restore variance lost at high guidance scales. At LTX cfg>=7 the
# guidance signal overshoots (variance collapse → trajectory
# overconfidence → camera-dolly bias). 0.0 = off (production default,
# unchanged behaviour). Operators tune via advanced.guidance_rescale;
# canonical safe ladder is 0.3 → 0.5 → 0.7 (synthesis 2026-05-20).
_DEF_GUIDANCE_RESCALE = 0.0

# LongMultiPrompt (Option D) temporal-window defaults. tile/overlap are
# in DECODED frames — diffusers scales them by the VAE temporal ratio
# internally. The window-fusion happens in LATENT space, so there is no
# per-scene VAE-decode handoff (the structural cause of the manual seam
# path's error propagation). overlap_cond 0.5 and adain 0.25 match the
# upstream ComfyUI-parity recipe.
# tile/overlap: diffusers' own defaults are 80/24, but a tile-80 window
# (10 latent frames) puts denoise activations + the GGUF transformer
# past a 16 GiB card. 48 = 6 latent frames, GPU-proven 12.04 GiB peak
# on the RTX 5070 Ti (smoke D1f 2026-05-20). Bigger cards just get more
# (smaller) windows — still correct.
_DEF_LONGMP_TILE = 48
_DEF_LONGMP_OVERLAP = 16
_DEF_LONGMP_OVERLAP_COND = 0.5
_DEF_LONGMP_ADAIN = 0.25
# AutoencoderKLLTXVideo temporal compression ratio — fixed by the model;
# used to replicate diffusers' window split before the pipeline call.
_LONGMP_VAE_TEMPORAL = 8


class Ltxv097RunState:
    def __init__(self, run_id: str, workdir: Path, plan: dict[str, Any]):
        self.run_id = run_id
        self.workdir = workdir
        self.plan = plan
        self.cancelled = False
        self.generation_count = 0
        self.resumed_from_segment: int = 0
        self.bg_task: Any = None
        self.pipe: Any = None


def register_ltxv097_handlers(worker) -> None:
    state: dict[str, Ltxv097RunState] = {}
    # One cached pipeline per warm worker (profile-pinned process).
    cache: dict[str, Any] = {"pipe": None}

    async def models_list(_params):
        return {
            "models": [
                {"id": "ltxv-13b-0.9.7-dev", "available": True, "size_mb": 8200},
            ]
        }

    async def plan_validate(params):
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        return validate_plan(
            params.get("plan", params), profile="rtx50-ltxv097-gguf"
        )

    async def render_start(params):
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
            fallback=Path.cwd() / "ltxv097_workdir" / run_id,
        )
        workdir.mkdir(parents=True, exist_ok=True)

        rs = Ltxv097RunState(run_id=run_id, workdir=workdir, plan=plan)
        try:
            rs.resumed_from_segment = max(
                0, int(params.get("resumed_from_segment", 0))
            )
        except (TypeError, ValueError):
            rs.resumed_from_segment = 0
        state[run_id] = rs

        rs.bg_task = asyncio.create_task(
            _render_loop(worker, rs, params, cache),
            name=f"ltxv097-render-{run_id}",
        )
        return {"run_id": run_id, "status": "started"}

    async def render_cancel(params):
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        run_id = params.get("run_id") or params.get("request_id")
        rs = state.get(run_id)
        if rs is None:
            raise ValueError(f"unknown run: {run_id}")
        rs.cancelled = True
        return {"run_id": run_id, "cancel_requested": True}

    async def segment_retry(params):
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        run_id = sanitize_run_id(
            params.get("request_id") or params.get("run_id"),
            fallback=f"run_{uuid.uuid4().hex[:12]}",
        )
        try:
            seg_index = int(params["segment_index"])
        except (KeyError, ValueError, TypeError) as e:
            raise ValueError("segment_index missing or non-integer") from e
        if seg_index < 0:
            raise ValueError(
                f"segment_index must be non-negative, got {seg_index}"
            )
        plan = ensure_dict(
            params.get("video") or params.get("plan"), name="plan", default={}
        )
        workdir = sanitize_workdir(
            params.get("workdir"),
            fallback=Path.cwd() / "ltxv097_workdir" / run_id,
        )
        workdir.mkdir(parents=True, exist_ok=True)
        rs = state.get(run_id)
        if rs is None:
            rs = Ltxv097RunState(run_id=run_id, workdir=workdir, plan=plan)
            state[run_id] = rs
        else:
            rs.cancelled = False
            rs.plan = plan
            rs.workdir = workdir
        rs.bg_task = asyncio.create_task(
            _retry_segment_loop(worker, rs, params, cache, seg_index),
            name=f"ltxv097-retry-{run_id}-seg{seg_index}",
        )
        return {
            "run_id": run_id,
            "segment_index": seg_index,
            "status": "retrying",
        }

    worker.register(Methods.MODELS_LIST, models_list)
    worker.register(Methods.PLAN_VALIDATE, plan_validate)
    worker.register(Methods.RENDER_START, render_start)
    worker.register(Methods.RENDER_CANCEL, render_cancel)
    worker.register(Methods.SEGMENT_RETRY, segment_retry)


# --------------------------------------------------------------------------
# Model resolution + pipeline construction (the only 0.9.7-specific code)
# --------------------------------------------------------------------------


def _safe_gguf_basename(model_id: str | None) -> str | None:
    if not model_id:
        return None
    name = model_id.strip()
    if (
        not name
        or len(name) > 128
        or not name.endswith(".gguf")
        or ".." in name
        or "/" in name
        or "\\" in name
        or not all(c.isalnum() or c in "._-" for c in name)
    ):
        return None
    return name


def _resolve_ltxv097_paths(model_id: str | None = None) -> tuple[Path, str]:
    """(transformer_gguf, base_repo_dir_or_id). Precedence:
    sanitized model_id (under the family dir) → env → default."""
    host_data = os.environ.get("NEXUS_HOST_DATA_DIR", "")

    def _models_dir(repo: str) -> Path:
        return Path(host_data).joinpath("models", *repo.split("/"))

    safe_id = _safe_gguf_basename(model_id)
    gguf_env = os.environ.get("NEXUS_VIDEO_LTX23_LTXV097_GGUF", "").strip()
    if safe_id:
        gguf = _models_dir(_GGUF_REPO) / safe_id
    elif gguf_env:
        gguf = Path(gguf_env)
    else:
        gguf = _models_dir(_GGUF_REPO) / _DEFAULT_GGUF_BASENAME

    base_env = os.environ.get("NEXUS_VIDEO_LTX23_MODEL_DIR", "").strip()
    if base_env:
        base = base_env
    else:
        base_dir = _models_dir(_BASE_REPO)
        base = str(base_dir) if base_dir.is_dir() else _BASE_REPO

    return gguf, base


def _import_ltx_pipeline_class() -> Any:
    """Probe the 0.9.x LTX pipeline class from the pinned diffusers.

    ``LTXConditionPipeline`` (0.9.5+, image/video conditioning) is
    preferred; falls back to the image-to-video / text-to-video
    classes. Raises a clear error naming the unmet expectation when
    none import — the first GPU run then gets an actionable message
    instead of an ImportError stack.
    """
    # `LTXConditionPipeline` is the PRIMARY: it is the only class that
    # exposes the LTX decode controls (`decode_timestep`,
    # `decode_noise_scale`) AND the scene-continuation API
    # (`conditions=[LTXVideoCondition(image, frame_index)]`) — both
    # mandatory for non-garbage 0.9.7 output (RCA 2026-05-18; the
    # bare-`image=` ImageToVideo path lacks the decode controls).
    last: Exception | None = None
    for name in (
        "LTXConditionPipeline",
        "LTXImageToVideoPipeline",
        "LTXPipeline",
    ):
        try:
            mod = __import__("diffusers", fromlist=[name])
            return getattr(mod, name)
        except (ImportError, AttributeError) as e:  # noqa: PERF203
            last = e
    raise RuntimeError(
        "no LTX-Video 0.9.x pipeline class importable from the pinned "
        f"diffusers (tried LTXConditionPipeline/LTXImageToVideoPipeline/"
        f"LTXPipeline): {last}. The 0.9.7 profile needs diffusers' native "
        "LTX-Video support."
    )


def _apply_offload_ltxv097(pipe: Any, offload_mode: str, logger: Any) -> None:
    # sequential crashes on GGUF (GGUFParameter meta-device) — degrade to model.
    if offload_mode == "none":
        pipe.to("cuda")
        return
    if offload_mode == "sequential":
        logger.info(
            "ltxv097.offload_mode_unsupported",
            requested="sequential",
            applied="model",
            reason="sequential cpu offload is GGUF-incompatible",
        )
    if hasattr(pipe, "enable_model_cpu_offload"):
        pipe.enable_model_cpu_offload()
    else:
        pipe.to("cuda")


def _build_ltxv097_pipeline(
    offload_mode: str,
    logger: Any,
    model_id: str | None = None,
    vae_tiling: tuple[str, dict[str, int]] | None = None,
    pipeline_cls: Any | None = None,
) -> Any:
    """Load the 0.9.7 pipeline: GGUF transformer + the 0.9.7-dev base
    (T5 + tokenizer + scheduler + canonical `vae/`).

    `pipeline_cls` overrides the pipeline class — when None the standard
    `LTXConditionPipeline` family is probed. The GGUF transformer +
    base-repo component assembly is class-agnostic, so the LongMultiPrompt
    long-video class (Option D) reuses this builder verbatim.

    Pairing the GGUF with the matching `Lightricks/LTX-Video-0.9.7-dev`
    diffusers config is mandatory: the monorepo's mixed config produced
    pure noise (RCA 2026-05-18). Every external-shape assumption is
    guarded so a mismatch surfaces as a RuntimeError naming the piece.
    """
    global _LAZY_TORCH
    import torch  # pre-warmed on main thread in __main__

    _LAZY_TORCH = torch

    try:
        from diffusers import (  # type: ignore
            GGUFQuantizationConfig,
            LTXVideoTransformer3DModel,
        )
    except ImportError as e:
        raise RuntimeError(
            "diffusers is missing GGUFQuantizationConfig / "
            f"LTXVideoTransformer3DModel ({e}); the pinned diffusers "
            "build does not expose the LTX-Video GGUF recipe."
        ) from e

    gguf_path, base_repo = _resolve_ltxv097_paths(model_id)
    if not gguf_path.is_file():
        raise RuntimeError(
            f"LTX-Video 0.9.7 GGUF transformer not found at {gguf_path}. "
            f"Install the '{_GGUF_REPO}' weights or set "
            "NEXUS_VIDEO_LTX23_LTXV097_GGUF."
        )

    logger.info(
        "ltxv097.load_pipeline",
        gguf=str(gguf_path),
        base=base_repo,
        offload_mode=offload_mode,
    )

    transformer = LTXVideoTransformer3DModel.from_single_file(
        str(gguf_path),
        quantization_config=GGUFQuantizationConfig(
            compute_dtype=torch.bfloat16
        ),
        torch_dtype=torch.bfloat16,
    )

    # VAE + T5 + scheduler come from the 0.9.7-dev base repo's own
    # canonical diffusers components (its `vae/` is the correct 0.9.7
    # video VAE — the ComfyUI companion blob is not used).
    pipe_cls = pipeline_cls or _import_ltx_pipeline_class()
    pipe = pipe_cls.from_pretrained(
        base_repo,
        transformer=transformer,
        torch_dtype=torch.bfloat16,
    )

    # VAE tiling + slicing — MANDATORY for 16 GB. The LTX video-VAE
    # encode/decode is a dominant transient peak: a fresh (no-cond)
    # scene fit at 11.7 GiB, but scene 2's `LTXVideoCondition`
    # cond-image VAE-ENCODE pushed peak past 16 GB → Windows
    # shared-mem crawl (~80 s/step vs 4 s/step), 2026-05-18. Tiling
    # processes the latent in spatial tiles so the VAE peak is bounded
    # regardless of resolution/conditioning; negligible quality cost.
    tiling_mode, tiling_kwargs = vae_tiling or ("default", {})
    vae = getattr(pipe, "vae", None)
    plan: list[tuple[Any, str, dict[str, int]]] = [
        (pipe, "enable_vae_slicing", {}),
        (vae, "enable_slicing", {}),
    ]
    if tiling_mode != "off":
        plan += [
            (pipe, "enable_vae_tiling", {}),
            (vae, "enable_tiling", tiling_kwargs),
        ]
    for obj, meth, kw in plan:
        fn = getattr(obj, meth, None) if obj is not None else None
        if callable(fn):
            try:
                fn(**kw)
                logger.info("ltxv097.vae_mem_opt", applied=meth, mode=tiling_mode)
            except Exception as e:  # noqa: BLE001 — best effort
                logger.info("ltxv097.vae_mem_opt_skip", meth=meth, err=str(e))
    if tiling_mode == "off":
        logger.info("ltxv097.vae_tiling_off")

    _apply_offload_ltxv097(pipe, offload_mode, logger)
    _maybe_override_scheduler_shift(pipe, logger)
    return pipe


def _maybe_override_scheduler_shift(pipe: Any, logger: Any) -> None:
    """Rebuild the LTX scheduler with a custom flow-matching shift when
    `NEXUS_VIDEO_LTX23_FLOW_SHIFT` is set. Default (env unset / 0 / 1.0)
    leaves the model-shipped scheduler untouched. Higher shift biases
    sigma distribution toward high-noise steps (more motion freedom in
    early denoising); synthesis 2026-05-20 ranks 3.0-4.0 as motion lever.
    """
    raw = os.environ.get("NEXUS_VIDEO_LTX23_FLOW_SHIFT", "").strip()
    if not raw:
        return
    try:
        shift = float(raw)
    except ValueError:
        return
    if shift <= 0.0 or abs(shift - 1.0) < 1e-6:
        return
    try:
        from diffusers import FlowMatchEulerDiscreteScheduler  # type: ignore

        cur = getattr(pipe, "scheduler", None)
        cfg = dict(getattr(cur, "config", {}) or {})
        cfg["shift"] = shift
        pipe.scheduler = FlowMatchEulerDiscreteScheduler.from_config(cfg)
        logger.info("ltxv097.scheduler_shift", shift=shift)
    except Exception as e:  # noqa: BLE001 — optional path, never fatal
        logger.info("ltxv097.scheduler_shift_skip", err=str(e))


def _import_ltx_longmp_pipeline_class() -> Any:
    """`LTXI2VLongMultiPromptPipeline` — the long-video class that fuses
    consecutive temporal windows in LATENT space (no per-scene VAE-decode
    handoff). It carries the same five-component contract as
    `LTXConditionPipeline` (scheduler/vae/text_encoder/tokenizer/
    transformer), so the GGUF transformer drops in unchanged. Raises a
    clear error if the pinned diffusers predates the class.
    """
    try:
        mod = __import__(
            "diffusers", fromlist=["LTXI2VLongMultiPromptPipeline"]
        )
        return getattr(mod, "LTXI2VLongMultiPromptPipeline")
    except (ImportError, AttributeError) as e:
        raise RuntimeError(
            "LTXI2VLongMultiPromptPipeline is not importable from the "
            f"pinned diffusers ({e}); the long-video multi-scene path "
            "needs a diffusers build that ships it."
        ) from e


def _install_longmp_encode_evict(pipe: Any, logger: Any) -> None:
    """Evict the GGUF transformer to CPU before every per-window T5
    prompt encode.

    `LTXI2VLongMultiPromptPipeline` encodes prompts interleaved with
    denoising (encode → denoise → encode → …). `enable_model_cpu_offload`
    offloads components along a fixed forward chain, so when execution
    loops back from the transformer to the text encoder the transformer
    is never offloaded — T5-XXL (~9 GiB) and the GGUF transformer
    (~8.3 GiB) end up co-resident and spill the 16 GiB card (smoke D1:
    19.55 GiB peak, invariant to tile / decode / resolution).

    Wrapping `encode_prompt` to drop the transformer first breaks the
    co-residency; the transformer's own offload hook reloads it to GPU
    for the next denoise step. `GGUFParameter` follows a plain `.to()`
    (probe 2026-05-20: `.to("cpu")` freed 8.29 GiB) — the GGUF/offload
    incompatibility is specific to accelerate's sequential mechanism.
    """
    torch = _LAZY_TORCH
    orig = getattr(pipe, "encode_prompt", None)
    if orig is None or torch is None:
        logger.info("ltxv097.longmp_encode_evict_skip")
        return

    def _encode_prompt_evicting(*args: Any, **kwargs: Any) -> Any:
        transformer = getattr(pipe, "transformer", None)
        if transformer is not None:
            transformer.to("cpu")
            torch.cuda.empty_cache()
        return orig(*args, **kwargs)

    pipe.encode_prompt = _encode_prompt_evicting
    logger.info("ltxv097.longmp_encode_evict_installed")


def _build_ltxv097_longmp_pipeline(
    offload_mode: str,
    logger: Any,
    model_id: str | None = None,
    vae_tiling: tuple[str, dict[str, int]] | None = None,
) -> Any:
    """Build the GGUF 0.9.7 stack wrapped in `LTXI2VLongMultiPromptPipeline`
    (Option D). Identical GGUF-transformer + base-repo assembly as
    `_build_ltxv097_pipeline`; only the pipeline class differs. The
    encode-evict wrapper breaks the T5 / transformer VRAM co-residency
    that LongMP's interleaved encode/denoise otherwise causes.
    """
    pipe = _build_ltxv097_pipeline(
        offload_mode,
        logger,
        model_id=model_id,
        vae_tiling=vae_tiling,
        pipeline_cls=_import_ltx_longmp_pipeline_class(),
    )
    _install_longmp_encode_evict(pipe, logger)
    return pipe


def _ensure_pipeline(
    rs: Ltxv097RunState,
    cache: dict[str, Any],
    logger: Any,
    model_id: str | None = None,
    vae_tiling: tuple[str, dict[str, int]] | None = None,
) -> Any:
    if cache.get("pipe") is not None:
        rs.pipe = cache["pipe"]
        return rs.pipe
    offload_mode = os.environ.get(
        "NEXUS_VIDEO_LTX23_OFFLOAD_MODE", "model"
    ).strip() or "model"
    pipe = _build_ltxv097_pipeline(offload_mode, logger, model_id, vae_tiling)
    cache["pipe"] = pipe
    rs.pipe = pipe
    return pipe


# --------------------------------------------------------------------------
# Render loop — mirrors pipeline_diffusers._render_loop's contract exactly
# --------------------------------------------------------------------------


async def _render_loop(
    worker, rs: Ltxv097RunState, raw_params: dict[str, Any], cache: dict[str, Any]
) -> None:
    plan = rs.plan
    width = int(plan.get("width", 768))
    height = int(plan.get("height", 512))
    base_fps = int(plan.get("base_fps", 24))
    duration = float(
        plan.get("requested_duration_seconds", plan.get("duration_seconds", 10))
    )
    segments = plan.get("segments") or []
    if not segments:
        await _emit_error(
            worker, rs.run_id, ErrorCodes.PLAN_INVALID,
            "render plan contains no segments",
        )
        return

    advanced = raw_params.get("advanced") or {}
    samp = _sampling_params(advanced)
    seam = seam_params(
        advanced,
        os.environ.get("NEXUS_VIDEO_LTX23_SEAM_METHOD", "").strip() or None,
    )
    upscale = _coerce_flag(advanced.get("upscale")) or _coerce_flag(
        os.environ.get("NEXUS_VIDEO_LTX23_UPSCALE")
    )
    upscale_mode = _resolve_upscale_mode(advanced)
    # The official 0.9.7 two-pass renders native then 2x-upsamples;
    # 720p is the proven target (render 768x512 → 1536x1024 → 1280x720).
    target_size = (1280, 720) if upscale else None

    # Log the FULLY-RESOLVED param set (defaults filled for unset
    # fields) so an operator can diff what ran against what was sent —
    # the safety control for the now-fully-exposed knob surface.
    try:
        worker.logger.info(
            "ltxv097.resolved_params",
            upscale=upscale,
            upscale_mode=upscale_mode,
            **samp,
            **seam,
        )
    except Exception:  # noqa: BLE001 — telemetry must never abort a render
        pass

    prompt_obj = raw_params.get("prompt") or {}
    global_action = prompt_obj.get("action") or prompt_obj.get("prompt") or ""
    negative_prompt = prompt_obj.get("negative") or ""
    style_anchor = (prompt_obj.get("style") or "").strip()
    character_anchor = (prompt_obj.get("character") or "").strip()

    input_image_block = raw_params.get("input_image") or {}
    input_image_path = (
        input_image_block.get("path")
        if isinstance(input_image_block, dict)
        else None
    )
    last_frame_image = _load_input_image(input_image_path, width, height)

    try:
        await asyncio.to_thread(
            _ensure_pipeline, rs, cache, worker.logger,
            advanced.get("model_id"), _resolve_vae_tiling(advanced),
        )
    except Exception as e:  # noqa: BLE001 — load failure → actionable error
        await _emit_error(
            worker, rs.run_id, ErrorCodes.RENDER_FAILED,
            f"ltxv097 pipeline load failed: {e}",
        )
        return

    segment_paths: list[Path] = []
    segment_count = len(segments)

    if rs.resumed_from_segment > 0:
        await worker.emit_notification(
            Notifications.RESUME_ACKNOWLEDGED,
            {"run_id": rs.run_id, "resumed_from_segment": rs.resumed_from_segment},
        )

    for seg in segments:
        if rs.cancelled:
            await _emit_error(
                worker, rs.run_id, ErrorCodes.RENDER_CANCELLED,
                "render cancelled by user",
            )
            return

        seg_index = int(seg.get("index", 0))
        seg_frame_count = int(seg.get("frame_count", 97))
        seg_seed = int(seg.get("seed", 0))
        seg_action_prompt = (
            seg.get("action_prompt") or global_action
        ).strip()
        effective_prompt = _compose_prompt(
            character=character_anchor,
            action=seg_action_prompt,
            style=style_anchor,
        )

        await worker.emit_notification(
            Notifications.SEGMENT_STARTED,
            {
                "run_id": rs.run_id,
                "segment_index": seg_index,
                "segment_count": segment_count,
                "effective_prompt": effective_prompt,
            },
        )

        seg_dir = rs.workdir / "segments" / f"{seg_index:03d}"
        seg_dir.mkdir(parents=True, exist_ok=True)
        seg_path = seg_dir / "raw.mp4"
        last_frame_path = seg_dir / "last_frame.png"

        loop = asyncio.get_running_loop()

        def emit_step(step_idx: int, _seg=seg_index) -> None:
            asyncio.run_coroutine_threadsafe(
                worker.emit_notification(
                    Notifications.SEGMENT_STEP,
                    {
                        "run_id": rs.run_id,
                        "segment_index": _seg,
                        "segment_count": segment_count,
                        "step": step_idx + 1,
                        "total_steps": samp["num_inference_steps"],
                    },
                ),
                loop,
            )

        try:
            frames = await asyncio.to_thread(
                functools.partial(
                    _generate_segment_dispatch,
                    rs.pipe,
                    cache,
                    upscale,
                    target_size,
                    last_frame_image,
                    effective_prompt,
                    negative_prompt,
                    width,
                    height,
                    seg_frame_count,
                    seg_seed,
                    samp,
                    emit_step,
                    worker.logger,
                    upscale_mode,
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
            await _emit_error(
                worker, rs.run_id, ErrorCodes.RENDER_FAILED, str(e)
            )
            return

        frames = list(frames)
        if (
            upscale
            and target_size is not None
            and frames
            and hasattr(frames[0], "size")
            and tuple(frames[0].size) != tuple(target_size)
        ):
            await worker.emit_notification(
                Notifications.UPSCALE_FALLBACK,
                {
                    "run_id": rs.run_id,
                    "segment_index": seg_index,
                    "segment_count": segment_count,
                    "requested": list(target_size),
                    "actual": list(frames[0].size),
                    "upscale_mode": upscale_mode,
                },
            )

        # `last_frame_image` here still holds the PREVIOUS segment's
        # tail (or the seg-0 still / None) — the only point both
        # boundary sides are in memory before `del frames`. apply_seam
        # is a no-op unless that is a non-empty frame list, so the
        # first conditioned segment passes through untouched.
        frames = apply_seam(
            last_frame_image, list(frames), seam, worker.logger
        )

        _write_frames_as_mp4(frames, seg_path, base_fps=base_fps)
        _save_last_frame(frames, last_frame_path)
        # Carry the previous scene's last-N frames (the motion-bearing
        # VIDEO TAIL) as the next scene's condition — a single still
        # over-anchors → static continuation (motion RCA 2026-05-18).
        _fl = list(frames)
        _tail_n = max(1, min(samp["condition_tail_frames"], len(_fl)))
        last_frame_image = _fl[-_tail_n:]
        if upscale:
            # Output is 720p but the next scene's stage-1 renders at
            # native res and VAE-encodes this tail as its condition —
            # keep the condition at the generation resolution.
            last_frame_image = _resize_frames(last_frame_image, width, height)
        segment_paths.append(seg_path)

        for kind, p, mime in (
            ("raw_video", seg_path, "video/mp4"),
            ("last_frame", last_frame_path, "image/png"),
        ):
            await worker.emit_notification(
                Notifications.ARTIFACT_CREATED,
                {
                    "run_id": rs.run_id,
                    "segment_index": seg_index,
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
                "segment_index": seg_index,
                **memory_stats(rs.generation_count),
            },
        )
        await worker.emit_notification(
            Notifications.SEGMENT_COMPLETED,
            {
                "run_id": rs.run_id,
                "segment_index": seg_index,
                "segment_count": segment_count,
            },
        )
        await worker.emit_notification(
            Notifications.PROGRESS,
            {
                "run_id": rs.run_id,
                "overall_percent": ((seg_index + 1) / segment_count) * 100,
                "current_segment_index": seg_index,
                "segment_count": segment_count,
                "message": f"Generated segment {seg_index + 1} of {segment_count}",
            },
        )

        del frames
        gc.collect()
        if _LAZY_TORCH is not None and _LAZY_TORCH.cuda.is_available():
            try:
                _LAZY_TORCH.cuda.empty_cache()
            except Exception:  # noqa: BLE001
                pass

    final_dir = rs.workdir / "final"
    final_dir.mkdir(parents=True, exist_ok=True)
    stitched_path = final_dir / "stitched.mp4"
    interpolated_path = final_dir / "interpolated.mp4"
    final_path = final_dir / "final.mp4"
    stitch_segments(segment_paths, stitched_path)

    output_fps = _resolve_output_fps(advanced, base_fps)
    pre_trim = stitched_path
    if output_fps > base_fps and try_interpolate(
        stitched_path, interpolated_path, base_fps, output_fps
    ):
        pre_trim = interpolated_path
        await worker.emit_notification(
            Notifications.PROGRESS,
            {
                "run_id": rs.run_id,
                "overall_percent": 100,
                "message": f"FPS interpolation: {base_fps} → {output_fps} fps",
            },
        )

    trim_to_duration(pre_trim, final_path, duration_s=duration)

    cache["pipe"] = None
    cache["upsampler"] = None
    evict_models(rs)

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
    await worker.emit_notification(
        Notifications.DONE,
        {
            "run_id": rs.run_id,
            "final_path": str(final_path),
            "duration_seconds": duration,
            "segment_count": segment_count,
            "profile": "rtx50-ltxv097-gguf",
        },
    )


async def _retry_segment_loop(
    worker,
    rs: Ltxv097RunState,
    raw_params: dict[str, Any],
    cache: dict[str, Any],
    seg_index: int,
) -> None:
    """Re-run a single segment. Mirrors pipeline_fake's retry contract:
    no re-stitch, no DONE — the Rust supervisor treats retry-completion
    distinctly from render-completion.
    """
    plan = rs.plan
    width = int(plan.get("width", 768))
    height = int(plan.get("height", 512))
    base_fps = int(plan.get("base_fps", 24))
    segments = plan.get("segments") or []
    segment_count = len(segments) or (seg_index + 1)
    seg = next(
        (s for s in segments if int(s.get("index", -1)) == seg_index),
        {"index": seg_index},
    )
    advanced = raw_params.get("advanced") or {}
    samp = _sampling_params(advanced)
    prompt_obj = raw_params.get("prompt") or {}
    effective_prompt = _compose_prompt(
        character=(prompt_obj.get("character") or "").strip(),
        action=(
            seg.get("action_prompt")
            or prompt_obj.get("action")
            or prompt_obj.get("prompt")
            or ""
        ).strip(),
        style=(prompt_obj.get("style") or "").strip(),
    )
    negative_prompt = prompt_obj.get("negative") or ""

    if rs.cancelled:
        await _emit_error(
            worker, rs.run_id, ErrorCodes.RENDER_CANCELLED,
            "segment retry cancelled before start",
        )
        return

    try:
        await asyncio.to_thread(
            _ensure_pipeline, rs, cache, worker.logger,
            advanced.get("model_id"), _resolve_vae_tiling(advanced),
        )
    except Exception as e:  # noqa: BLE001
        await _emit_error(
            worker, rs.run_id, ErrorCodes.RENDER_FAILED,
            f"ltxv097 pipeline load failed: {e}",
        )
        return

    await worker.emit_notification(
        Notifications.SEGMENT_STARTED,
        {
            "run_id": rs.run_id,
            "segment_index": seg_index,
            "segment_count": segment_count,
            "retry": True,
        },
    )

    seg_dir = rs.workdir / "segments" / f"{seg_index:03d}"
    seg_dir.mkdir(parents=True, exist_ok=True)
    seg_path = seg_dir / "raw.mp4"
    last_frame_path = seg_dir / "last_frame.png"
    prev_last = (
        rs.workdir / "segments" / f"{seg_index - 1:03d}" / "last_frame.png"
    )
    cond_image = _load_input_image(
        str(prev_last) if prev_last.is_file() else None, width, height
    )

    try:
        frames = await asyncio.to_thread(
            functools.partial(
                _generate_segment,
                rs.pipe,
                cond_image,
                effective_prompt,
                negative_prompt,
                width,
                height,
                int(seg.get("frame_count", 97)),
                int(seg.get("seed", 0)),
                samp,
                None,
            )
        )
    except Exception as e:  # noqa: BLE001
        await _emit_error(
            worker, rs.run_id, ErrorCodes.RENDER_FAILED, str(e)
        )
        return

    # No seam treatment on retry: recovery conditions on the prior
    # segment's single last_frame.png (not the in-memory motion tail
    # apply_seam needs), and the retry contract re-writes raw.mp4 in
    # place without re-stitching — the boundary is re-treated when a
    # full render re-runs the loop.
    _write_frames_as_mp4(frames, seg_path, base_fps=base_fps)
    _save_last_frame(frames, last_frame_path)

    for kind, p, mime in (
        ("raw_video", seg_path, "video/mp4"),
        ("last_frame", last_frame_path, "image/png"),
    ):
        await worker.emit_notification(
            Notifications.ARTIFACT_CREATED,
            {
                "run_id": rs.run_id,
                "segment_index": seg_index,
                "kind": kind,
                "path": str(p),
                "mime": mime,
                "retry": True,
            },
        )
    rs.generation_count += 1
    await worker.emit_notification(
        Notifications.MEMORY_STATS,
        {
            "run_id": rs.run_id,
            "segment_index": seg_index,
            **memory_stats(rs.generation_count),
        },
    )
    await worker.emit_notification(
        Notifications.SEGMENT_COMPLETED,
        {
            "run_id": rs.run_id,
            "segment_index": seg_index,
            "segment_count": segment_count,
            "retry": True,
        },
    )


# --------------------------------------------------------------------------
# Generation + IO helpers (self-contained — keeps this pipeline separate
# from the 85 KB LTX-2.3 module; logic mirrors its proven equivalents)
# --------------------------------------------------------------------------


def _resolve_upscale_mode(advanced: dict[str, Any]) -> str:
    mode = str(
        advanced.get("upscale_mode")
        or os.environ.get("NEXUS_VIDEO_LTX23_UPSCALE_MODE", "").strip()
        or "two_pass"
    ).strip().lower()
    return mode if mode in ("two_pass", "decoupled") else "two_pass"


_OUTPUT_FPS_MAX = 240


def _resolve_output_fps(advanced: dict[str, Any], base_fps: int) -> int:
    raw = advanced.get("output_fps")
    if raw is None:
        raw = os.environ.get("NEXUS_VIDEO_LTX23_OUTPUT_FPS", "").strip()
    try:
        fps = int(raw)
    except (TypeError, ValueError):
        return base_fps
    if fps <= base_fps:
        return base_fps
    return min(fps, _OUTPUT_FPS_MAX)


_VAE_TILING_AGGRESSIVE = {
    "tile_sample_min_height": 256,
    "tile_sample_min_width": 256,
    "tile_sample_stride_height": 192,
    "tile_sample_stride_width": 192,
}


def _resolve_vae_tiling(advanced: dict[str, Any]) -> tuple[str, dict[str, int]]:
    mode = str(
        advanced.get("vae_tiling")
        or os.environ.get("NEXUS_VIDEO_LTX23_VAE_TILING", "").strip()
        or "default"
    ).strip().lower()
    if mode == "aggressive":
        return "aggressive", dict(_VAE_TILING_AGGRESSIVE)
    if mode == "off":
        return "off", {}
    return "default", {}


def _sampling_params(advanced: dict[str, Any]) -> dict[str, Any]:
    """The tunable sampling baseline. Every key is overridable via the
    request's `advanced` block; absent/`null` → the documented default
    (example-workflow + diffusers `LTXConditionPipeline` values). This
    is the single source of truth for #4 "adjustable params".
    """
    g = advanced.get
    return {
        "num_inference_steps": int(
            _or_default(g("num_inference_steps"), _DEF_STEPS)
        ),
        "guidance_scale": float(
            _or_default(g("guidance_scale"), _DEF_GUIDANCE)
        ),
        "decode_timestep": float(
            _or_default(g("decode_timestep"), _DEF_DECODE_TIMESTEP)
        ),
        "decode_noise_scale": float(
            _or_default(g("decode_noise_scale"), _DEF_DECODE_NOISE_SCALE)
        ),
        "image_cond_noise_scale": float(
            _or_default(
                g("image_cond_noise_scale"), _DEF_IMAGE_COND_NOISE_SCALE
            )
        ),
        "condition_strength": float(
            _or_default(g("condition_strength"), _DEF_CONDITION_STRENGTH)
        ),
        "condition_tail_frames": int(
            _or_default(
                g("condition_tail_frames"), _DEF_CONDITION_TAIL_FRAMES
            )
        ),
        "guidance_rescale": float(
            _or_default(g("guidance_rescale"), _DEF_GUIDANCE_RESCALE)
        ),
    }


def _generate_segment(
    pipe: Any,
    image: Any,
    prompt: str,
    negative_prompt: str,
    width: int,
    height: int,
    num_frames: int,
    seed: int,
    samp: dict[str, Any],
    step_heartbeat: Callable[[int], None] | None = None,
) -> Any:
    """Call the LTX-Video 0.9.7 pipeline; return a list of PIL frames.

    Uses the correct `LTXConditionPipeline` contract: scene continuation
    via `conditions=[LTXVideoCondition(image, frame_index=0)]` (NOT bare
    `image=`, which the condition pipeline ignores), and the LTX decode
    controls (`decode_timestep`/`decode_noise_scale`) without which the
    VAE decode yields noise (RCA 2026-05-18). Still signature-filtered
    so the ImageToVideo/text-only fallback classes stay usable.
    """
    import inspect

    torch = _LAZY_TORCH
    generator = (
        torch.Generator(device="cuda").manual_seed(seed)
        if torch is not None
        else None
    )
    call_kwargs: dict[str, Any] = {
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "width": width,
        "height": height,
        "num_frames": num_frames,
        "frame_rate": 24,
        "generator": generator,
        "guidance_scale": samp["guidance_scale"],
        "guidance_rescale": samp["guidance_rescale"],
        "num_inference_steps": samp["num_inference_steps"],
        "decode_timestep": samp["decode_timestep"],
        "decode_noise_scale": samp["decode_noise_scale"],
        "image_cond_noise_scale": samp["image_cond_noise_scale"],
    }
    sig_params = inspect.signature(pipe.__call__).parameters

    # `image` is either a single PIL frame (image-to-video / first
    # conditioned scene) OR a list of PIL frames = the previous
    # scene's VIDEO TAIL. A single finished still at frame_index=0
    # over-anchors → static continuation (2026-05-18 motion RCA);
    # conditioning on the motion-bearing tail gives the model a
    # velocity to continue, which is how LTX video-continuation is
    # designed. `video=` wins when a tail is supplied.
    is_tail = isinstance(image, (list, tuple)) and len(image) > 0
    if image is not None:
        if "conditions" in sig_params:
            try:
                from diffusers.pipelines.ltx.pipeline_ltx_condition import (  # type: ignore
                    LTXVideoCondition,
                )

                cond_kw = (
                    {"video": list(image)}
                    if is_tail
                    else {"image": image}
                )
                call_kwargs["conditions"] = [
                    LTXVideoCondition(
                        frame_index=0,
                        strength=samp.get("condition_strength", 0.7),
                        **cond_kw,
                    )
                ]
            except Exception:  # noqa: BLE001 — fall back to image=
                single = image[-1] if is_tail else image
                if "image" in sig_params:
                    call_kwargs["image"] = single
        else:
            single = image[-1] if is_tail else image
            if "image" in sig_params:
                call_kwargs["image"] = single
            elif "cond_image" in sig_params:
                call_kwargs["cond_image"] = single

    if step_heartbeat is not None and "callback_on_step_end" in sig_params:
        def _on_step_end(
            _p: Any, step_idx: int, _t: Any, cb: dict[str, Any]
        ) -> dict[str, Any]:
            try:
                step_heartbeat(step_idx)
            except Exception:  # noqa: BLE001 — never abort a render
                pass
            return cb

        call_kwargs["callback_on_step_end"] = _on_step_end

    call_kwargs = {k: v for k, v in call_kwargs.items() if k in sig_params}
    result = pipe(**call_kwargs)
    frames = getattr(result, "frames", None)
    if frames is None and isinstance(result, dict):
        frames = result.get("frames")
    if frames is None:
        raise RuntimeError(
            "LTX-Video 0.9.7 pipeline returned no frames — unknown "
            "result shape"
        )
    return (
        frames[0]
        if isinstance(frames, list) and len(frames) == 1
        else frames
    )


def _coerce_flag(value: Any) -> bool:
    if value is None or isinstance(value, bool):
        return bool(value)
    return str(value).strip().lower() in ("1", "true", "yes", "on")


def _resize_frames(frames: Any, width: int, height: int) -> list[Any]:
    try:
        from PIL import Image  # type: ignore
    except ImportError:
        return list(frames)
    out: list[Any] = []
    for f in frames:
        out.append(
            f if f.size == (width, height)
            else f.resize((width, height), Image.LANCZOS)
        )
    return out


def _resolve_upscaler_ref() -> tuple[str, bool]:
    """(ref, is_single_file). env → on-disk single-file → diffusers
    tree → bare HF id (mirrors the proven smoke + the GGUF/base
    resolution convention)."""
    env = os.environ.get("NEXUS_VIDEO_LTX23_UPSCALER", "").strip()
    if env:
        return env, env.endswith(".safetensors")
    host = os.environ.get("NEXUS_HOST_DATA_DIR", "")
    single = Path(host).joinpath(*_UPSCALER_SINGLE_REL.split("/"))
    if single.is_file():
        return str(single), True
    tree = Path(host).joinpath("models", *_UPSCALER_REPO.split("/"))
    if tree.is_dir():
        return str(tree), False
    return _UPSCALER_REPO, False


_offload_defeat_filter_installed = False


def _silence_offload_defeat_warning() -> None:
    global _offload_defeat_filter_installed
    if _offload_defeat_filter_installed:
        return
    import logging

    fragment = "memory gains from offloading are likely to be lost"

    class _Drop(logging.Filter):
        def filter(self, record: logging.LogRecord) -> bool:
            return fragment not in record.getMessage()

    logging.getLogger("diffusers.pipelines.pipeline_utils").addFilter(
        _Drop()
    )
    _offload_defeat_filter_installed = True


def _build_upsampler(pipe: Any, logger: Any) -> Any:
    torch = _LAZY_TORCH
    try:
        from diffusers import LTXLatentUpsamplePipeline  # type: ignore
    except ImportError as e:
        raise RuntimeError(
            f"diffusers has no LTXLatentUpsamplePipeline ({e}); the "
            "pinned build cannot do the 0.9.7 two-pass upscale."
        ) from e
    ref, is_single = _resolve_upscaler_ref()
    errs: list[str] = []
    up = None
    if is_single and hasattr(LTXLatentUpsamplePipeline, "from_single_file"):
        try:
            up = LTXLatentUpsamplePipeline.from_single_file(
                ref, vae=pipe.vae, torch_dtype=torch.bfloat16
            )
        except Exception as e:  # noqa: BLE001
            errs.append(f"from_single_file({ref}): {e}")
    if up is None:
        pre = ref if not is_single else _UPSCALER_REPO
        try:
            up = LTXLatentUpsamplePipeline.from_pretrained(
                pre, vae=pipe.vae, torch_dtype=torch.bfloat16
            )
        except Exception as e:  # noqa: BLE001
            errs.append(f"from_pretrained({pre}): {e}")
    if up is None:
        raise RuntimeError(
            "spatial upscaler load failed (" + " | ".join(errs) + ")"
        )
    _silence_offload_defeat_warning()
    up.to("cuda")
    # Offload the upsampler's own network to CPU until first use. The
    # shared `vae` stays on cuda (the main pipe needs it resident). In
    # multi-scene two-pass, keeping latent_upsampler resident across
    # scenes pushed reserved VRAM past the 16 GB card's safe ceiling
    # (2026-05-20 G2). `_generate_segment_2pass` streams it GPU<->CPU
    # around the single upsample call.
    _lu = getattr(up, "latent_upsampler", None)
    if _lu is not None:
        _lu.to("cpu")
    logger.info("ltxv097.upsampler_loaded", ref=ref, single_file=is_single)
    return up


def _ensure_upsampler(pipe: Any, cache: dict[str, Any], logger: Any) -> Any:
    if cache.get("upsampler") is None:
        cache["upsampler"] = _build_upsampler(pipe, logger)
    return cache["upsampler"]


def _ltx_conditioning(image: Any, samp: dict[str, Any], sig_params: Any) -> dict[str, Any]:
    """Build the LTXVideoCondition kwargs (the RCA'd continuation
    contract). Duplicated from `_generate_segment` by deliberate
    isolation — the proven single-pass stays byte-identical; the
    two-pass owns its own copy so a future change to one cannot
    silently regress the other."""
    if image is None:
        return {}
    is_tail = isinstance(image, (list, tuple)) and len(image) > 0
    if "conditions" in sig_params:
        try:
            from diffusers.pipelines.ltx.pipeline_ltx_condition import (  # type: ignore
                LTXVideoCondition,
            )

            cond_kw = {"video": list(image)} if is_tail else {"image": image}
            return {
                "conditions": [
                    LTXVideoCondition(
                        frame_index=0,
                        strength=samp.get("condition_strength", 0.7),
                        **cond_kw,
                    )
                ]
            }
        except Exception:  # noqa: BLE001 — fall back to image=
            pass
    single = image[-1] if (isinstance(image, (list, tuple)) and image) else image
    if "image" in sig_params:
        return {"image": single}
    if "cond_image" in sig_params:
        return {"cond_image": single}
    return {}


def _generate_segment_2pass(
    pipe: Any,
    upsampler: Any,
    image: Any,
    prompt: str,
    negative_prompt: str,
    width: int,
    height: int,
    num_frames: int,
    seed: int,
    samp: dict[str, Any],
    step_heartbeat: Callable[[int], None] | None,
    target_size: tuple[int, int],
) -> Any:
    """Official 0.9.7 two-pass: conditioned latent render → spatial
    latent upsample → short refine + tiled decode → resize to target.
    Raises RuntimeError on an unsupported pinned-diffusers signature so
    the caller falls back to the proven single pass (GPU-verified
    recipe; peak 13.5 GiB on a 16 GB card)."""
    import inspect

    torch = _LAZY_TORCH
    sig = inspect.signature(pipe.__call__).parameters
    for need in ("output_type", "latents", "denoise_strength"):
        if need not in sig:
            raise RuntimeError(
                f"two-pass upscale needs '{need}' on the pinned "
                "LTXConditionPipeline (absent) — single-pass fallback"
            )
    gen = (
        torch.Generator(device="cuda").manual_seed(seed)
        if torch is not None
        else None
    )

    k1: dict[str, Any] = {
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "width": width,
        "height": height,
        "num_frames": num_frames,
        "frame_rate": 24,
        "generator": gen,
        "guidance_scale": samp["guidance_scale"],
        "num_inference_steps": samp["num_inference_steps"],
        "decode_timestep": samp["decode_timestep"],
        "decode_noise_scale": samp["decode_noise_scale"],
        "image_cond_noise_scale": samp["image_cond_noise_scale"],
        "output_type": "latent",
    }
    k1.update(_ltx_conditioning(image, samp, sig))
    if step_heartbeat is not None and "callback_on_step_end" in sig:
        def _hb(_p: Any, i: int, _t: Any, cb: dict[str, Any]) -> dict[str, Any]:
            try:
                step_heartbeat(i)
            except Exception:  # noqa: BLE001 — never abort a render
                pass
            return cb

        k1["callback_on_step_end"] = _hb
    k1 = {k: v for k, v in k1.items() if k in sig}
    r1 = pipe(**k1)
    latents = getattr(r1, "frames", None)
    if latents is None and isinstance(r1, dict):
        latents = r1.get("frames")
    if latents is None:
        raise RuntimeError("two-pass stage1 returned no latent")

    # Stream the upsampler network GPU<->CPU around its single call so
    # it does not hold VRAM during the stage-3 refine (multi-scene VRAM
    # ceiling fix, 2026-05-20). The shared vae is untouched.
    _lu = getattr(upsampler, "latent_upsampler", None)
    if _lu is not None:
        _lu.to("cuda")
    up_out = upsampler(latents=latents, output_type="latent")
    upscaled = getattr(up_out, "frames", up_out)
    if _lu is not None:
        _lu.to("cpu")
        if torch is not None:
            torch.cuda.empty_cache()

    k3 = {
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "width": width * 2,
        "height": height * 2,
        "num_frames": num_frames,
        "frame_rate": 24,
        "generator": (
            torch.Generator(device="cuda").manual_seed(seed)
            if torch is not None
            else None
        ),
        "guidance_scale": samp["guidance_scale"],
        "num_inference_steps": max(6, samp["num_inference_steps"] // 3),
        "denoise_strength": 0.4,
        "latents": upscaled,
        "decode_timestep": samp["decode_timestep"],
        "decode_noise_scale": samp["decode_noise_scale"],
        "output_type": "pil",
    }
    k3 = {k: v for k, v in k3.items() if k in sig}
    r3 = pipe(**k3)
    frames = getattr(r3, "frames", None)
    if frames is None and isinstance(r3, dict):
        frames = r3.get("frames")
    if frames is None:
        raise RuntimeError("two-pass stage3 returned no frames")
    fl = (
        frames[0]
        if isinstance(frames, list) and len(frames) == 1
        else frames
    )
    return _resize_frames(fl, target_size[0], target_size[1])


def _generate_segment_decoupled(
    pipe: Any,
    upsampler: Any,
    image: Any,
    prompt: str,
    negative_prompt: str,
    width: int,
    height: int,
    num_frames: int,
    seed: int,
    samp: dict[str, Any],
    step_heartbeat: Callable[[int], None] | None,
    target_size: tuple[int, int],
) -> Any:
    """Latent-domain 720p: conditioned native render → spatial latent
    upsample → VAE decode of the upsampled latents WITHOUT the 13B
    transformer refine. The transformer forward at 1536x1024 is the
    sole stage-3 driver that overshoots a 16 GB card (RCA 2026-05-19,
    resv 16.92 > 16 GiB); skipping it removes the spill. The denorm is
    NOT reimplemented — `upsampler(output_type="pil")` runs the pinned
    LTXLatentUpsamplePipeline's own decode branch, so the latent
    normalisation contract stays exactly diffusers'. Raises RuntimeError
    on an unsupported pinned signature so the caller falls back to the
    proven single pass. Softer than the refined two-pass by design."""
    import inspect

    torch = _LAZY_TORCH
    sig = inspect.signature(pipe.__call__).parameters
    if "output_type" not in sig:
        raise RuntimeError(
            "stage-1 pipe lacks 'output_type' — decoupled upscale "
            "unavailable; single-pass fallback"
        )
    gen = (
        torch.Generator(device="cuda").manual_seed(seed)
        if torch is not None
        else None
    )
    k1: dict[str, Any] = {
        "prompt": prompt,
        "negative_prompt": negative_prompt,
        "width": width,
        "height": height,
        "num_frames": num_frames,
        "frame_rate": 24,
        "generator": gen,
        "guidance_scale": samp["guidance_scale"],
        "num_inference_steps": samp["num_inference_steps"],
        "decode_timestep": samp["decode_timestep"],
        "decode_noise_scale": samp["decode_noise_scale"],
        "image_cond_noise_scale": samp["image_cond_noise_scale"],
        "output_type": "latent",
    }
    k1.update(_ltx_conditioning(image, samp, sig))
    if step_heartbeat is not None and "callback_on_step_end" in sig:
        def _hb(_p: Any, i: int, _t: Any, cb: dict[str, Any]) -> dict[str, Any]:
            try:
                step_heartbeat(i)
            except Exception:  # noqa: BLE001 — never abort a render
                pass
            return cb

        k1["callback_on_step_end"] = _hb
    k1 = {k: v for k, v in k1.items() if k in sig}
    r1 = pipe(**k1)
    latents = getattr(r1, "frames", None)
    if latents is None and isinstance(r1, dict):
        latents = r1.get("frames")
    if latents is None:
        raise RuntimeError("decoupled stage1 returned no latent")

    up_out = upsampler(
        latents=latents,
        decode_timestep=samp["decode_timestep"],
        decode_noise_scale=samp["decode_noise_scale"],
        generator=(
            torch.Generator(device="cuda").manual_seed(seed)
            if torch is not None
            else None
        ),
        output_type="pil",
    )
    frames = getattr(up_out, "frames", None)
    if frames is None:
        frames = up_out[0] if isinstance(up_out, tuple) else up_out
    fl = (
        frames[0]
        if isinstance(frames, list) and len(frames) == 1
        else frames
    )
    return _resize_frames(fl, target_size[0], target_size[1])


def _generate_segment_dispatch(
    pipe: Any,
    cache: dict[str, Any],
    upscale: bool,
    target_size: tuple[int, int] | None,
    image: Any,
    prompt: str,
    negative_prompt: str,
    width: int,
    height: int,
    num_frames: int,
    seed: int,
    samp: dict[str, Any],
    step_heartbeat: Callable[[int], None] | None,
    logger: Any,
    upscale_mode: str = "two_pass",
) -> Any:
    """Single-pass by default; on opt-in upscale either the refined
    two-pass (`two_pass`, the proven default) or the latent-domain
    decode (`decoupled`, no transformer refine — fits 16 GB at full
    frame count). Either upscale path falls through to the proven
    single pass if the upscaler/pinned API can't do it (the native
    render must never be blocked by an optional quality upgrade)."""
    # self-heal: a leaked use_tiling=False would blow stage-1's 16 GB budget.
    _vae = getattr(pipe, "vae", None)
    if _vae is not None and not getattr(_vae, "use_tiling", True):
        if hasattr(_vae, "enable_tiling"):
            _vae.enable_tiling()
        else:
            _vae.use_tiling = True
        logger.info("ltxv097.vae_tiling_reasserted")
    if upscale and target_size is not None:
        try:
            upsampler = _ensure_upsampler(pipe, cache, logger)
            if upscale_mode == "decoupled":
                return _generate_segment_decoupled(
                    pipe, upsampler, image, prompt, negative_prompt,
                    width, height, num_frames, seed, samp,
                    step_heartbeat, target_size,
                )
            return _generate_segment_2pass(
                pipe, upsampler, image, prompt, negative_prompt,
                width, height, num_frames, seed, samp,
                step_heartbeat, target_size,
            )
        except RuntimeError as e:
            logger.info("ltxv097.upscale_fallback", reason=str(e))
        except Exception as e:  # noqa: BLE001 — optional path never fatal
            logger.info("ltxv097.upscale_fallback", reason=str(e))
    return _generate_segment(
        pipe, image, prompt, negative_prompt, width, height,
        num_frames, seed, samp, step_heartbeat,
    )


def _longmp_window_count(
    num_frames: int, temporal_tile_size: int, temporal_overlap: int
) -> int:
    """Replicate diffusers' `split_into_temporal_windows` count so scene
    prompts can be mapped to temporal windows BEFORE the pipeline call.
    The split is fully deterministic from these three numbers.
    """
    latent_len = (max(1, num_frames) - 1) // _LONGMP_VAE_TEMPORAL + 1
    tile = max(1, temporal_tile_size // _LONGMP_VAE_TEMPORAL)
    overlap = max(0, temporal_overlap // _LONGMP_VAE_TEMPORAL)
    stride = max(tile - overlap, 1)
    count, start = 0, 0
    while start < latent_len:
        end = min(start + tile, latent_len)
        count += 1
        if end == latent_len:
            break
        start += stride
    return max(1, count)


def _longmp_prompt_segments(
    scenes: list[str], window_count: int
) -> list[dict[str, Any]]:
    """Map N scene prompts evenly across `window_count` temporal windows
    as diffusers `prompt_segments` (`{start_window, end_window, text}`).
    When there are fewer windows than scenes, the trailing scenes are
    dropped — one window cannot render two scenes.
    """
    n = len(scenes)
    if n == 0:
        return []
    if window_count <= n:
        return [
            {"start_window": i, "end_window": i, "text": scenes[i]}
            for i in range(max(1, window_count))
        ]
    per, rem = divmod(window_count, n)
    segments: list[dict[str, Any]] = []
    cursor = 0
    for i, text in enumerate(scenes):
        span = per + (1 if i < rem else 0)
        segments.append(
            {
                "start_window": cursor,
                "end_window": cursor + span - 1,
                "text": text,
            }
        )
        cursor += span
    return segments


def _encode_seed_guidance_latents(
    pipe: Any,
    cond_image: Any,
    width: int,
    height: int,
    f_lat: int,
    logger: Any,
) -> Any:
    """Encode the seed image to a normalized LTX latent replicated to
    `f_lat` frames — the `guidance_latents` argument for
    `LTXI2VLongMultiPromptPipeline` (Option D quality pass).

    Mirrors the pipeline's own `cond_image` encode path exactly
    (`video_processor.preprocess` -> `vae.encode` -> `latent_dist.mode()`
    -> `_normalize_latents` with the VAE's per-channel mean/std) so the
    guidance latent lives in the same normalized space the denoiser
    expects. `guidance_latents` must match the global latent frame count
    (`__call__` raises ValueError otherwise) — hence the replicate along
    the temporal axis.

    `vae.encode` is `@apply_forward_hook`-decorated: under
    `enable_model_cpu_offload` it moves the VAE on/off GPU itself. The
    encode is driven through that hook — manually `vae.to("cuda")` would
    desync accelerate's offload state. Only the input tensor is placed on
    the pipeline execution device. Result returns on CPU; the pipeline
    re-casts it to the execution device + float32 internally.
    """
    torch = _LAZY_TORCH
    vae = pipe.vae
    device = pipe._execution_device
    img = pipe.video_processor.preprocess(
        cond_image, height=height, width=width
    )
    img = img.to(device=device, dtype=vae.dtype)
    enc = vae.encode(img.unsqueeze(2))
    lat = (
        enc.latent_dist.mode()
        if hasattr(enc, "latent_dist")
        else enc.latents
    )
    lat = lat.to(torch.float32)
    lat = pipe._normalize_latents(
        lat,
        vae.latents_mean,
        vae.latents_std,
        vae.config.scaling_factor,
    )
    guidance = lat.repeat(1, 1, f_lat, 1, 1).contiguous()
    logger.info(
        "ltxv097.longmp_guidance_encoded",
        shape=tuple(guidance.shape),
    )
    if torch is not None:
        torch.cuda.empty_cache()
    return guidance.cpu()


def _generate_video_longmp(
    pipe: Any,
    cond_image: Any,
    scenes: list[str],
    negative_prompt: str,
    width: int,
    height: int,
    num_frames: int,
    seed: int,
    samp: dict[str, Any],
    advanced: dict[str, Any],
    logger: Any,
) -> Any:
    """Render a whole multi-scene video in ONE
    `LTXI2VLongMultiPromptPipeline` call (Option D).

    Scene N+1 conditions on scene N's tail LATENTS via native temporal-
    window fusion — there is no VAE-decode handoff between scenes, so the
    decode-degradation error-propagation loop of the manual seam path is
    structurally gone. Returns a flat list of PIL frames.

    `pipe.vae.use_framewise_decoding` is forced on before the call: the
    LTX VAE's `_decode` only takes the bounded `_temporal_tiled_decode`
    path when that flag is True, and `enable_tiling()` never sets it — so
    a whole-video decode otherwise runs every frame at once and spills
    the 16 GiB card (smoke D1: 20.21 GiB reserved at decode).

    `image_cond_noise_scale` and `condition_tail_frames` from `samp` do
    not exist on this pipeline (it uses a per-token cond mask instead) —
    the signature filter drops them, same as `_generate_segment`.
    """
    import inspect

    g = advanced.get
    tile = int(_or_default(g("temporal_tile_size"), _DEF_LONGMP_TILE))
    overlap = int(
        _or_default(g("temporal_overlap"), _DEF_LONGMP_OVERLAP)
    )
    window_count = _longmp_window_count(num_frames, tile, overlap)
    segments = _longmp_prompt_segments(scenes, window_count)
    logger.info(
        "ltxv097.longmp_windows",
        num_frames=num_frames,
        windows=window_count,
        scenes=len(scenes),
        tile=tile,
        overlap=overlap,
    )

    call_kwargs: dict[str, Any] = {
        "prompt": list(scenes),
        "prompt_segments": segments,
        "negative_prompt": negative_prompt,
        "width": width,
        "height": height,
        "num_frames": num_frames,
        "frame_rate": 24,
        "seed": seed,
        "guidance_scale": samp["guidance_scale"],
        "guidance_rescale": samp["guidance_rescale"],
        "num_inference_steps": samp["num_inference_steps"],
        "cond_image": cond_image,
        "cond_strength": samp.get(
            "condition_strength", _DEF_CONDITION_STRENGTH
        ),
        "temporal_tile_size": tile,
        "temporal_overlap": overlap,
        "temporal_overlap_cond_strength": float(
            _or_default(
                g("temporal_overlap_cond_strength"),
                _DEF_LONGMP_OVERLAP_COND,
            )
        ),
        "adain_factor": float(
            _or_default(g("adain_factor"), _DEF_LONGMP_ADAIN)
        ),
        "decode_timestep": samp["decode_timestep"],
        "decode_noise_scale": samp["decode_noise_scale"],
        "output_type": "pil",
    }
    # Opt-in guidance_latents identity re-injection (Option D quality
    # pass). Active only when `advanced.guiding_strength` is set — absent
    # leaves the working path untouched. The seed is encoded to a
    # normalized latent and passed as a soft per-window identity anchor
    # against last-window autoregressive drift. Debate gate 2026-05-20
    # (Codex + adversary): keep guiding_strength low (~0.2 — higher
    # suppresses motion since the static seed is appended as reference
    # context every window) and pair it with a SMALL temporal_tile —
    # guidance appends ~window-size reference tokens per window, so VRAM
    # grows; tile must drop, not rise.
    guiding_strength = g("guiding_strength")
    if guiding_strength is not None and cond_image is not None:
        vae_t = getattr(
            pipe, "vae_temporal_compression_ratio", _LONGMP_VAE_TEMPORAL
        )
        f_lat = (max(1, num_frames) - 1) // vae_t + 1
        call_kwargs["guidance_latents"] = _encode_seed_guidance_latents(
            pipe, cond_image, width, height, f_lat, logger
        )
        call_kwargs["guiding_strength"] = float(guiding_strength)
        logger.info(
            "ltxv097.longmp_guidance_on",
            guiding_strength=float(guiding_strength),
            f_lat=f_lat,
        )
    sig_params = inspect.signature(pipe.__call__).parameters
    call_kwargs = {
        k: v for k, v in call_kwargs.items() if k in sig_params
    }
    if guiding_strength is not None and "guidance_latents" not in call_kwargs:
        logger.error(
            "ltxv097.longmp_guidance_unsupported",
            reason="pipeline __call__ lacks guidance_latents — guidance "
            "requested but inactive",
        )
    # Force framewise (temporal-tiled) VAE decoding before the call. The
    # LTX VAE's `_decode` only routes to the bounded
    # `_temporal_tiled_decode` when `use_framewise_decoding` is True, and
    # `enable_tiling()` never sets it — without this a whole-video decode
    # runs every frame at once and spills the 16 GiB card.
    vae = getattr(pipe, "vae", None)
    if vae is not None:
        vae.use_framewise_decoding = True
    result = pipe(**call_kwargs)
    frames = getattr(result, "frames", None)
    if frames is None and isinstance(result, (list, tuple)) and result:
        frames = result[0]
    if frames is None:
        raise RuntimeError(
            "LTXI2VLongMultiPromptPipeline returned no frames — unknown "
            "result shape"
        )
    return (
        frames[0]
        if isinstance(frames, list) and len(frames) == 1
        else frames
    )


def _compose_prompt(*, character: str, action: str, style: str) -> str:
    parts = [p.strip() for p in (character, action, style) if p and p.strip()]
    return ". ".join(parts)


def _load_input_image(path: str | None, width: int, height: int) -> Any:
    try:
        from PIL import Image  # type: ignore
    except ImportError:
        return None
    if path and Path(path).exists():
        img = Image.open(path).convert("RGB")
    else:
        img = Image.new("RGB", (width, height), (32, 32, 32))
    if img.size != (width, height):
        img = _cover_crop(img, width, height)
    return img


def _cover_crop(img: Any, width: int, height: int) -> Any:
    """Aspect-preserving cover-fit: scale so the image fully covers the
    target box, then center-crop to exactly (width, height).

    A naive ``resize((w, h))`` stretches a mismatched-aspect source —
    fatal for i2v conditioning (a 3:2 portrait squashed into 16:9
    distorts the subject's face). Cover-crop keeps geometry intact and
    discards only the overflow on the longer axis.
    """
    from PIL import Image  # type: ignore

    src_w, src_h = img.size
    if src_w <= 0 or src_h <= 0:
        return img.resize((width, height), Image.LANCZOS)
    scale = max(width / src_w, height / src_h)
    new_w = max(width, round(src_w * scale))
    new_h = max(height, round(src_h * scale))
    scaled = img.resize((new_w, new_h), Image.LANCZOS)
    left = (new_w - width) // 2
    top = (new_h - height) // 2
    return scaled.crop((left, top, left + width, top + height))


def _write_frames_as_mp4(frames: Any, path: Path, base_fps: int) -> None:
    import tempfile

    import ffmpeg  # type: ignore

    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="ltxv097-seg-") as tmp:
        tmp_dir = Path(tmp)
        for i, frame in enumerate(frames):
            frame.save(tmp_dir / f"frame_{i:05d}.png")
        (
            ffmpeg.input(
                str(tmp_dir / "frame_%05d.png"), framerate=base_fps
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


def _or_default(value: Any, default: Any) -> Any:
    """Collapse both missing-key and explicit-JSON-null to the default
    (the host emits unset advanced knobs as ``null``)."""
    return default if value is None else value


async def _emit_error(worker, run_id: str, code: int, message: str) -> None:
    msg = message if len(message) <= 2000 else message[:2000] + "…"
    await worker.emit_notification(
        Notifications.ERROR,
        {"run_id": run_id, "code": code, "message": msg},
    )
