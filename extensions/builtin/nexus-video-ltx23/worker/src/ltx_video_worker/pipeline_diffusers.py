"""Real diffusers-based LTX-2.3 image-to-video pipeline.

Used for runtime profiles rtx40-fp8, rtx50-fp8, rtx50-nvfp4. Mirrors
the JSON-RPC contract of pipeline_fake.py so the Rust runner is profile-
agnostic.

Status: SHIPPED-UNVERIFIED (Rung 5).
  - The full segment loop, VRAM cleanup, and JSON-RPC notifications are
    implemented to spec.
  - End-to-end validation against real LTX-2.3 weights requires a 16 GB
    NVIDIA GPU and the P0-T001 verification spike. Until that lands,
    every code path here is best-effort against the diffusers API as
    documented at 2026-05-13. See specs/046-ltx23-video-generation/
    research.md for the dispositive open questions.
  - All torch / diffusers imports are LAZY so this module can be
    imported on a non-GPU host (e.g. CI) without dragging in 2 GB of
    CUDA wheels.

Profile → quant resolution:
  fake          → not handled here (pipeline_fake.py)
  rtx40-fp8     → FP8 e4m3 weights from Lightricks/LTX-2.3-fp8
  rtx50-fp8     → same FP8 weights, cu128, Blackwell SM_120 tensor cores
  rtx50-nvfp4   → NVFP4 weights from Lightricks/LTX-2.3-nvfp4, cu130

Model directory resolution order:
  1. NEXUS_VIDEO_LTX23_MODEL_DIR env var (set by Rust runner from the
     manifest's resolved model_artifact path once Rung 6 wires
     profile-specific model installs).
  2. <NEXUS_HOST_DATA_DIR>/models/Lightricks/LTX-2.3-<quant>/
  3. error: model_missing — UI shows "Download weights" CTA.
"""

from __future__ import annotations

import asyncio
import functools
import gc
import os
import time
import uuid
from pathlib import Path
from typing import Any, Callable

from . import __version__
from .ffmpeg_io import stitch_segments, trim_to_duration
from .io_safety import (
    ensure_dict,
    sanitize_run_id,
    sanitize_workdir,
    scrub_sensitive,
    truncate_for_log,
)
from .planning_validate import validate_plan
from .rpc import ErrorCodes, Methods, Notifications
from .vram import evict_models, memory_stats


_LAZY_TORCH: Any = None
_LAZY_PIPELINE_CLASS: Any = None


def _coerce_optional_float(value: Any) -> float | None:
    """Cast a payload field to float, or return None when missing/null.

    Mirrors `_or_default` for the optional hyperparameter case: the
    host emits explicit JSON null when the user left the field unset,
    and we want that to land as Python None (not a TypeError from
    `float(None)`) so the pipeline call helper can omit the kwarg.
    """
    if value is None:
        return None
    try:
        return float(value)
    except (TypeError, ValueError):
        return None


def _or_default(value: Any, default: Any) -> Any:
    """Return `default` when `value` is None OR missing.

    `dict.get(key, default)` returns the default ONLY when the key is
    absent. If the host serialised an unset Optional<T> as JSON `null`,
    `.get(key, default)` returns None — not the default — and subsequent
    `float(None)` / `int(None)` crashes the render. This helper makes
    both paths collapse to `default`.
    """
    return default if value is None else value


def _offload_mode_from_params(raw_params: dict[str, Any]) -> str:
    """Extract the resolved offload mode from a render-start payload.

    The host always resolves `OffloadMode::Auto` to a concrete string
    (`"none"`, `"model"`, `"sequential"`) before sending. We default
    to `"sequential"` only if the payload is missing the field
    entirely — a defensive fallback that matches the historical
    behaviour for any workflow that pre-dates this contract.
    """
    advanced = raw_params.get("advanced") if isinstance(raw_params, dict) else None
    if not isinstance(advanced, dict):
        return "sequential"
    mode = advanced.get("offload_mode")
    if not isinstance(mode, str) or not mode:
        return "sequential"
    return mode


# Minimum total VRAM for offload_mode="none". The NVFP4 transformer
# is ~11 GB; with VAE + text encoder + activations the resident
# footprint peaks around 13-14 GB. The floor is 15 GiB (≈16.1 GB
# decimal) — a genuine 16 GB-class card reports ~15.9 GiB total to
# `torch.cuda.mem_get_info()` (never a full 16 GiB; some is always
# reserved by the driver), so a 16-GiB floor would wrongly reject
# every 16 GB card by a ~80 MB margin. 15 GiB admits all 16 GB cards
# while still rejecting 12 GB cards (~11.2 GiB total).
_MIN_VRAM_BYTES_FOR_NONE = 15 * 1024**3


# Inclusive bounds for the operator VRAM ceiling, mirroring the Rust
# host's `schemas::{MIN,MAX}_GPU_VRAM_GIB`. Re-checked here as defence
# in depth: a payload that skipped host validation must not drive an
# absurd allocator fraction.
_MIN_GPU_VRAM_GIB = 4
_MAX_GPU_VRAM_GIB = 128


def _max_gpu_vram_gib_from_params(raw_params: dict[str, Any]) -> int | None:
    """Extract the operator's GPU VRAM ceiling (GiB), or None.

    The host serialises `AdvancedSettings.max_gpu_vram_gib` as a JSON
    number, or null when unset. Anything out of the shared bounds,
    non-integral, or boolean → None, meaning "no cap" (the pre-cap
    behaviour: let accelerate's heuristic place layers).
    """
    advanced = raw_params.get("advanced") if isinstance(raw_params, dict) else None
    if not isinstance(advanced, dict):
        return None
    raw = advanced.get("max_gpu_vram_gib")
    if isinstance(raw, bool) or not isinstance(raw, int):
        return None
    if not _MIN_GPU_VRAM_GIB <= raw <= _MAX_GPU_VRAM_GIB:
        return None
    return raw


def _apply_vram_budget(
    torch_mod: Any,
    offload_mode: str,
    max_gpu_vram_gib: int | None,
    logger: Any,
) -> float | None:
    """Hard-cap the CUDA caching allocator to the operator's budget.

    Returns the applied fraction in (0, 1), or None when no cap is
    applied.

    Under `model` / `sequential` offload accelerate's default
    placement heuristic over-allocates the transformer by a small
    margin on nvfp4, bleeding into Windows shared GPU memory and
    collapsing throughput. `set_per_process_memory_fraction` pins the
    allocator below the physical VRAM line so the process physically
    cannot spill — if the model genuinely will not fit the budget the
    load fails loudly with a CUDA OOM (the desired "fail, don't crawl"
    mode) instead of silently crawling on shared memory.

    No-op under `none` (the full-resident path owns its own 15 GiB
    floor check), when no budget is set, or when the budget meets or
    exceeds the card (nothing to clamp). Any torch error is swallowed
    — this is an optional optimisation, never load-fatal.
    """
    if max_gpu_vram_gib is None or offload_mode == "none":
        return None
    # Denominator MUST be physical VRAM (`total_memory` from
    # get_device_properties) because that is exactly what
    # `set_per_process_memory_fraction` divides by internally
    # (cudaGetDeviceProperties().totalGlobalMem). Using
    # `mem_get_info()`'s total instead is wrong on Windows WDDM, where
    # it returns the driver-committed budget (< physical), so the
    # resulting cap lands looser than the operator requested — the
    # exact precision the spill-prevention feature exists to provide.
    # Fall back to mem_get_info() only if device properties are
    # unavailable (still safe, just slightly loose on WDDM).
    try:
        total_bytes = int(torch_mod.cuda.get_device_properties(0).total_memory)
    except Exception:  # noqa: BLE001 — fall back, never fatal
        try:
            _free, total_bytes = torch_mod.cuda.mem_get_info()
        except Exception as exc:  # noqa: BLE001 — optional optimisation
            logger.info("diffusers.vram_budget.skipped", reason=str(exc))
            return None
    if total_bytes <= 0:
        return None
    budget_bytes = max_gpu_vram_gib * 1024**3
    fraction = budget_bytes / total_bytes
    if fraction >= 1.0:
        logger.info(
            "diffusers.vram_budget.noop",
            max_gpu_vram_gib=max_gpu_vram_gib,
            total_gib=round(total_bytes / 1024**3, 2),
        )
        return None
    try:
        torch_mod.cuda.set_per_process_memory_fraction(fraction, 0)
    except Exception as exc:  # noqa: BLE001 — optional optimisation, never fatal
        logger.info("diffusers.vram_budget.skipped", reason=str(exc))
        return None
    logger.info(
        "diffusers.vram_budget.applied",
        max_gpu_vram_gib=max_gpu_vram_gib,
        fraction=round(fraction, 4),
        total_gib=round(total_bytes / 1024**3, 2),
    )
    return fraction


# The placement the worker falls back to only when the host payload
# predates the component_placement contract entirely (older queued
# renders). Mirrors the historical sequential-offload default — every
# component CPU-resident, paged per forward call — so an old payload
# behaves exactly as it did before this feature.
_LEGACY_PLACEMENT: dict[str, str] = {
    "transformer": "cpu",
    "vae": "cpu",
    "text_encoder": "cpu",
}


def _component_placement_from_params(raw_params: dict[str, Any]) -> dict[str, str]:
    """Extract the host-resolved component placement triple.

    The host ALWAYS resolves Auto + per-profile defaults + operator
    overrides into a fully concrete triple before dispatch, so this is
    authoritative — there is no "preset vs override" branching on the
    worker. Returns the historical all-CPU placement only when the
    payload predates the contract (missing/malformed block), so a
    stale queued render still behaves as it did before this feature.
    """
    advanced = raw_params.get("advanced") if isinstance(raw_params, dict) else None
    if not isinstance(advanced, dict):
        return dict(_LEGACY_PLACEMENT)
    placement = advanced.get("component_placement")
    if not isinstance(placement, dict):
        return dict(_LEGACY_PLACEMENT)
    out: dict[str, str] = {}
    for key in ("transformer", "vae", "text_encoder"):
        value = placement.get(key)
        if value in ("cuda", "cpu"):
            out[key] = value
        else:
            # Any missing/garbage field → fall back wholesale rather
            # than ship a half-resolved triple to the placement logic.
            return dict(_LEGACY_PLACEMENT)
    return out


def _scheduler_from_params(raw_params: dict[str, Any]) -> str:
    advanced = raw_params.get("advanced") if isinstance(raw_params, dict) else None
    if not isinstance(advanced, dict):
        return "flow_match_euler"
    name = advanced.get("scheduler")
    if isinstance(name, str) and name:
        return name
    return "flow_match_euler"


def _quantization_from_params(raw_params: dict[str, Any]) -> str:
    """Extract the host-resolved quantisation mode.

    The host resolves the per-profile default (nvfp4 → nf4) before
    dispatch, so the worker just reads the concrete value. `none` is
    the safe fallback for any pre-contract / malformed payload — it
    keeps the raw bf16 weights, which is correct behaviour for the
    `fake`/CI profile and a loud-failure path for real profiles on a
    small card (rather than silently mis-quantising).
    """
    advanced = raw_params.get("advanced") if isinstance(raw_params, dict) else None
    if not isinstance(advanced, dict):
        return "none"
    name = advanced.get("quantization")
    if isinstance(name, str) and name in ("none", "nf4", "int8"):
        return name
    return "none"


def _build_pipeline_quant_config(quant: str, compute_dtype: Any) -> Any:
    """Build a diffusers `PipelineQuantizationConfig` for the two heavy
    components (transformer + text encoder), or return None for `none`.

    The shipped LTX-2.3 checkpoint is unquantized bf16 (~36 GB
    transformer + ~46 GB Gemma-3 encoder). bitsandbytes NF4/INT8
    applied at `from_pretrained` time shrinks that to ~22/42 GB so it
    fits system RAM and pages cleanly under sequential offload — the
    only configuration that runs on a 16 GB GPU without Windows
    shared-VRAM spill.

    Raises `_ModelLoadFailed` if bitsandbytes or the quant API is
    missing — surfacing "install bitsandbytes" beats silently loading
    83 GB and hanging.
    """
    if quant == "none":
        return None
    if quant not in ("nf4", "int8"):
        raise _ModelLoadFailed(
            f"unknown quantization: {quant!r}; expected "
            '"none", "nf4", or "int8"'
        )
    try:
        import bitsandbytes  # type: ignore  # noqa: F401
        from diffusers.quantizers import PipelineQuantizationConfig  # type: ignore
    except ImportError as ie:
        raise _ModelLoadFailed(
            f"quantization={quant!r} requires bitsandbytes + a diffusers "
            f"with PipelineQuantizationConfig in the worker venv: {ie}. "
            f"`uv pip install bitsandbytes` into the runtime .venv, or "
            f"set quantization='none' (needs an 80 GB+ card)."
        ) from ie

    if quant == "nf4":
        backend = "bitsandbytes_4bit"
        quant_kwargs = {
            "load_in_4bit": True,
            "bnb_4bit_quant_type": "nf4",
            "bnb_4bit_compute_dtype": compute_dtype,
        }
    else:  # int8
        backend = "bitsandbytes_8bit"
        quant_kwargs = {"load_in_8bit": True}

    # Quantise BOTH heavy components in the single from_pretrained
    # call. `text_encoder` is the Gemma-3 LLM (~46 GB bf16);
    # `transformer` is the LTX-2.3 DiT (~36 GB bf16).
    return PipelineQuantizationConfig(
        quant_backend=backend,
        quant_kwargs=quant_kwargs,
        components_to_quantize=["transformer", "text_encoder"],
    )


def _apply_scheduler_choice(pipe: Any, choice: str, logger: Any) -> None:
    """Swap `pipe.scheduler` to the operator-requested scheduler class.

    Only flow-matching schedulers are valid for LTX-2.3. The default
    (`flow_match_euler`) is already loaded by `from_pretrained`, so this
    is a no-op unless the operator picked `flow_match_heun`. Other
    diffusers schedulers (DDIM, DPM++, UniPC, ...) are not supported and
    intentionally not in the registry — they break on flow-matching
    velocity parameterisation.
    """
    if choice == "flow_match_euler":
        return  # already loaded
    if choice == "flow_match_heun":
        try:
            from diffusers import FlowMatchHeunDiscreteScheduler  # type: ignore
        except ImportError as ie:
            raise _ModelLoadFailed(
                f"FlowMatchHeunDiscreteScheduler not importable: {ie}. "
                f"Upgrade diffusers or use scheduler='flow_match_euler'."
            ) from ie
        pipe.scheduler = FlowMatchHeunDiscreteScheduler.from_config(
            pipe.scheduler.config
        )
        logger.info("diffusers.load_pipeline.scheduler", scheduler=choice)
        return
    raise _ModelLoadFailed(
        f"unknown scheduler: {choice!r}; expected "
        '"flow_match_euler" or "flow_match_heun"'
    )


def _place_components(
    pipe: Any,
    placement: dict[str, str],
    logger: Any,
    *,
    include_transformer: bool,
) -> None:
    """Move each named component onto its host-resolved device.

    `placement` is fully concrete — the host already collapsed Auto +
    per-profile defaults + operator overrides into `{"transformer":
    "cuda"|"cpu", "vae": ..., "text_encoder": ...}`. The transformer is
    only moved when `include_transformer` is True AND it wasn't already
    placed at GGUF-install time (the caller decides).
    """
    names: tuple[str, ...] = ()
    if include_transformer:
        names += ("transformer",)
    names += ("vae", "text_encoder", "text_encoder_2")
    moved: dict[str, str] = {}
    for name in names:
        key = "text_encoder" if name == "text_encoder_2" else name
        target = placement.get(key)
        if target is None:
            continue
        submod = getattr(pipe, name, None)
        if submod is None or not hasattr(submod, "to"):
            continue
        submod.to(target)
        moved[name] = target
    logger.info("diffusers.load_pipeline.placement", moved=moved)


def _place_pipeline(
    *,
    pipe: Any,
    offload_mode: str,
    placement: dict[str, str],
    torch_mod: Any,
    logger: Any,
    transformer_pre_placed: bool = False,
) -> Any:
    """Place the pipeline per the host-resolved component triple.

    The host always sends a concrete `placement` triple — there is no
    "preset vs override" branching on the worker any more; the triple is
    authoritative. `offload_mode` only decides whether the transformer
    is paged by a diffusers offload hook (`model` / `sequential`) or
    pinned by direct placement (`none`).

    `none`: no hooks. Every component is placed at `placement[name]`.
    The NVFP4-on-16GB shape (`transformer=cuda, vae=cuda,
    text_encoder=cpu`) keeps the ~11 GB T5 off the GPU so the ~11 GB
    transformer + activations actually fit — `pipe.to("cuda")` on the
    whole pipeline was the 2026-05-15 hang (T5 + transformer > 16 GB).

    `model` / `sequential`: install the offload hook (it owns the
    transformer's per-forward paging); still honour the vae +
    text_encoder placement from the triple.

    Raises `_ModelLoadFailed` on insufficient VRAM for a CUDA-resident
    config, a missing offload helper, or an unknown mode.

    `transformer_pre_placed`: True when the GGUF loader already
    installed the transformer onto its device; skip moving it again
    (GGUFParameter doesn't honour stock `.to()` anyway).
    """
    wants_cuda = "cuda" in placement.values()
    if offload_mode == "none":
        if wants_cuda:
            free_bytes, total_bytes = torch_mod.cuda.mem_get_info()
            if total_bytes < _MIN_VRAM_BYTES_FOR_NONE:
                raise _ModelLoadFailed(
                    f"offload_mode=\"none\" needs a 16 GB-class GPU "
                    f"(>= {_MIN_VRAM_BYTES_FOR_NONE / 1024**3:.0f} GiB "
                    f"total); this card reports "
                    f"{total_bytes / 1024**3:.1f} GiB. Downgrade to "
                    f"\"model\" or \"sequential\"."
                )
        _place_components(
            pipe,
            placement,
            logger,
            include_transformer=not transformer_pre_placed,
        )
        logger.info(
            "diffusers.load_pipeline.offload",
            mode="none",
            placement=placement,
            transformer_pre_placed=transformer_pre_placed,
        )
        return pipe
    if offload_mode == "model":
        if not hasattr(pipe, "enable_model_cpu_offload"):
            raise _ModelLoadFailed(
                "diffusers pipeline class lacks enable_model_cpu_offload; "
                "upgrade diffusers or pick a different offload_mode"
            )
        pipe.enable_model_cpu_offload()
    elif offload_mode == "sequential":
        if hasattr(pipe, "enable_sequential_cpu_offload"):
            pipe.enable_sequential_cpu_offload()
        elif hasattr(pipe, "enable_model_cpu_offload"):
            # Older diffusers releases without sequential offload —
            # accept the spill rather than crash.
            pipe.enable_model_cpu_offload()
    else:
        raise _ModelLoadFailed(
            f"unknown offload_mode: {offload_mode!r}; expected "
            "\"none\", \"model\", or \"sequential\""
        )
    # The offload hook OWNS every component's device placement: it
    # keeps stable weights on CPU and pages each submodule onto the
    # GPU only while active, bridging cross-device tensors itself.
    # Manually `.to()`-ing vae / text_encoder here would fight those
    # hooks and reintroduce the cross-device mismatch that the manual
    # split caused on 2026-05-15. So under model / sequential we do
    # NOT place anything by hand — the triple is informational only.
    logger.info(
        "diffusers.load_pipeline.offload", mode=offload_mode, placement=placement
    )
    return pipe


async def _emit_weights_resident(
    worker,
    run_id: str,
    pipe: Any,
    offload_mode: str,
    max_gpu_vram_gib: int | None = None,
) -> None:
    """Emit `runtime.weights_resident` once the pipeline has loaded.

    The payload reports where the transformer actually sits + how many
    bytes the CUDA allocator has reserved. The smoke gate uses this to
    prove `offload_mode == "none"` actually parked the weights on the
    GPU instead of leaving them under one of the offload hooks.
    """
    transformer_device = "unknown"
    memory_reserved_bytes = 0
    try:
        transformer = getattr(pipe, "transformer", None)
        if transformer is not None:
            params = transformer.parameters()
            first = next(iter(params), None)
            if first is not None:
                transformer_device = first.device.type
    except Exception:  # noqa: BLE001 — diagnostic notification, never fatal
        transformer_device = "error"
    torch = _LAZY_TORCH
    if torch is not None:
        try:
            memory_reserved_bytes = int(torch.cuda.memory_reserved())
        except Exception:  # noqa: BLE001 — diagnostic notification, never fatal
            memory_reserved_bytes = 0
    await worker.emit_notification(
        Notifications.WEIGHTS_RESIDENT,
        {
            "run_id": run_id,
            "offload_mode": offload_mode,
            "transformer_device": transformer_device,
            "memory_reserved_bytes": memory_reserved_bytes,
            "max_gpu_vram_gib": max_gpu_vram_gib,
        },
    )


class DiffusersRunState:
    def __init__(
        self,
        run_id: str,
        workdir: Path,
        plan: dict[str, Any],
        pipe: Any,
        device: str,
    ) -> None:
        self.run_id = run_id
        self.workdir = workdir
        self.plan = plan
        self.pipe = pipe
        self.device = device
        self.cancelled = False
        self.generation_count = 0
        # Rung 7L resume offset (Item C). Set from the
        # `resumed_from_segment` field on render.start when the host
        # re-issued the chain after a VRAM-supervisor breach. 0 (the
        # default) means "first attempt". The render loop emits
        # RESUME_ACKNOWLEDGED exactly once when this is non-zero so
        # operators can correlate the worker's segment numbering
        # against the host's restart counter.
        self.resumed_from_segment: int = 0
        # Strong reference to the background _load_then_render task.
        # CPython 3.11+ holds only WEAK references to asyncio tasks,
        # so a `asyncio.create_task(...)` without a strong reference
        # can be garbage-collected before the task ever runs —
        # producing the exact symptom we hit on 2026-05-15: worker
        # silent, no progress events, no error. Storing the Task on
        # the per-run state object keeps it alive for the lifetime
        # of the run (state[run_id] holds rs as long as the run is
        # tracked). Same pattern applied to `_load_then_retry_segment`.
        self.bg_task: Any = None


def register_diffusers_handlers(worker) -> None:
    """Register all JSON-RPC methods backed by the real LTX-2.3 pipeline."""

    state: dict[str, DiffusersRunState] = {}
    cached_pipe_ref: dict[str, Any] = {"pipe": None, "device": None}

    profile = os.environ.get("NEXUS_VIDEO_LTX23_RUNTIME", "rtx40-fp8")

    async def models_list(_params: Any) -> dict[str, Any]:
        model_dir = _resolve_model_dir(profile)
        return {
            "models": [
                {
                    "id": _expected_family_id(profile),
                    "available": model_dir is not None and model_dir.exists(),
                    "path": str(model_dir) if model_dir else None,
                    "profile": profile,
                }
            ]
        }

    async def plan_validate(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        return validate_plan(params.get("plan", params), profile=profile)

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
            fallback=Path.cwd() / "diffusers_workdir" / run_id,
        )
        workdir.mkdir(parents=True, exist_ok=True)

        # Pipeline load can take minutes on a cold cache (22B fp8 →
        # CPU-offload pinned memory) and must NOT block the JSON-RPC
        # reply — the host's send_rpc has a fixed timeout, and a
        # blocking load times out before the render even starts.
        # Reply immediately and run load+render in a background task.
        rs = DiffusersRunState(
            run_id=run_id, workdir=workdir, plan=plan, pipe=None, device=None
        )
        # Rung 7L: capture the host's resume offset onto the run
        # state. The render loop reads this once and emits the
        # ack notification before the first segment. Non-int /
        # negative values collapse to 0 so a malformed payload
        # silently behaves like a first attempt.
        raw_offset = params.get("resumed_from_segment", 0)
        try:
            rs.resumed_from_segment = max(0, int(raw_offset))
        except (TypeError, ValueError):
            rs.resumed_from_segment = 0
        state[run_id] = rs

        rs.bg_task = asyncio.create_task(
            _load_then_render(worker, rs, params, cached_pipe_ref, profile),
            name=f"ltx-render-{run_id}",
        )
        return {"run_id": run_id, "status": "started"}

    async def render_cancel(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        run_id = params.get("run_id") or params.get("request_id")
        rs = state.get(run_id) if run_id else None
        if rs is None:
            raise ValueError(f"unknown run: {run_id}")
        rs.cancelled = True
        return {"run_id": run_id, "cancel_requested": True}

    async def segment_retry(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        try:
            seg_index = int(params["segment_index"])
        except (KeyError, ValueError, TypeError) as e:
            raise ValueError("segment_index missing or non-integer") from e
        if seg_index < 0:
            raise ValueError(f"segment_index must be non-negative, got {seg_index}")

        run_id = sanitize_run_id(
            params.get("request_id") or params.get("run_id"),
            fallback=f"run_{uuid.uuid4().hex[:12]}",
        )
        plan = ensure_dict(
            params.get("video") or params.get("plan"), name="plan", default={}
        )
        workdir = sanitize_workdir(
            params.get("workdir"),
            fallback=Path.cwd() / "diffusers_workdir" / run_id,
        )
        workdir.mkdir(parents=True, exist_ok=True)

        rs = state.get(run_id)
        if rs is None:
            rs = DiffusersRunState(
                run_id=run_id, workdir=workdir, plan=plan, pipe=None, device=None
            )
            state[run_id] = rs
        else:
            rs.cancelled = False
            rs.plan = plan
            rs.workdir = workdir

        rs.bg_task = asyncio.create_task(
            _load_then_retry_segment(
                worker, rs, params, cached_pipe_ref, profile, seg_index
            ),
            name=f"ltx-retry-{run_id}-seg{seg_index}",
        )
        return {"run_id": run_id, "segment_index": seg_index, "status": "retrying"}

    worker.register(Methods.MODELS_LIST, models_list)
    worker.register(Methods.PLAN_VALIDATE, plan_validate)
    worker.register(Methods.RENDER_START, render_start)
    worker.register(Methods.RENDER_CANCEL, render_cancel)
    worker.register(Methods.SEGMENT_RETRY, segment_retry)


class _ModelMissing(Exception):
    pass


class _ModelLoadFailed(Exception):
    pass


def _resolve_model_dir(profile: str) -> Path | None:
    """Locate the on-disk model directory for this profile.

    Order:
      1. NEXUS_VIDEO_LTX23_MODEL_DIR (explicit override).
      2. <host_data_dir>/models/Lightricks/LTX-2.3-<quant>/.
    Returns the directory only if it actually exists on disk.
    """
    explicit = os.environ.get("NEXUS_VIDEO_LTX23_MODEL_DIR")
    if explicit:
        p = Path(explicit)
        return p if p.exists() else None

    host_data_dir = os.environ.get("NEXUS_HOST_DATA_DIR")
    if not host_data_dir:
        return None

    family = _expected_family_id(profile)
    if family is None:
        return None
    # repo_id is owner/name; the snapshot lands at <host_data_dir>/models/<owner>/<name>/
    parts = family.split("/")
    candidate = Path(host_data_dir).joinpath("models", *parts)
    return candidate if candidate.exists() else None


def _resolve_gguf_transformer_override(model_dir: Path) -> Path | None:
    """Resolve a GGUF transformer override for ``model_dir``.

    Resolution order:
      1. ``NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF`` env var — explicit
         absolute or model-relative path to a single ``.gguf`` file.
      2. A single ``*.gguf`` file sitting in ``model_dir`` alongside
         the diffusers tree (e.g. an operator drops the GGUF in there
         after running the standard ``from_pretrained`` install).

    Returns None when no override is configured. The standard
    safetensors pipeline path runs unchanged in that case.
    """
    explicit = os.environ.get("NEXUS_VIDEO_LTX23_TRANSFORMER_GGUF", "").strip()
    if explicit:
        p = Path(explicit)
        if not p.is_absolute():
            p = model_dir / explicit
        return p if p.is_file() else None

    from .gguf_loader import find_gguf_transformer

    return find_gguf_transformer(model_dir)


def _expected_family_id(profile: str) -> str | None:
    """Map profile → Hugging Face repo. Single source of truth for quant routing.

    Mirrors `installer.py::PROFILE_REPO`. All real-runtime profiles point
    at the community port `dg845/LTX-2.3-Distilled-Diffusers` — the only
    diffusers-format repo with the correct LTX-2.3 transformer config
    (9 conditioning channels). The official Lightricks single-file repos
    won't load via standard `from_pretrained`; see
    `specs/046-ltx23-video-generation/verification/p0-t001-results.md`.
    """
    if profile in ("rtx40-fp8", "rtx50-fp8", "rtx50-nvfp4"):
        return "dg845/LTX-2.3-Distilled-Diffusers"
    return None


def _ensure_pipeline_loaded(
    worker,
    profile: str,
    cache: dict[str, Any],
    offload_mode: str,
    *,
    scheduler_choice: str = "flow_match_euler",
    placement: dict[str, str] | None = None,
    quantization: str = "none",
    max_gpu_vram_gib: int | None = None,
) -> tuple[Any, str]:
    """Idempotent pipeline loader. Returns (pipe, device).

    First call boots torch + diffusers + the LTX pipeline + the model
    weights. Subsequent calls return the cached pipe.

    `offload_mode` selects whether the transformer is paged by a
    diffusers offload hook (`model` / `sequential`) or pinned by direct
    placement (`none`). `placement` is the host-resolved concrete
    component triple (`{"transformer","vae","text_encoder"}` each
    `"cuda"`/`"cpu"`) and is authoritative — the host already folded
    Auto + per-profile defaults + operator overrides into it. The
    worker never observes `"auto"`.
    """
    if placement is None:
        placement = dict(_LEGACY_PLACEMENT)
    if cache["pipe"] is not None:
        return cache["pipe"], cache["device"]

    model_dir = _resolve_model_dir(profile)
    if model_dir is None:
        raise _ModelMissing(
            f"LTX-2.3 weights for profile '{profile}' not found. Expected family "
            f"{_expected_family_id(profile)!r}. Run the per-profile model install "
            "in the recipe UI."
        )

    try:
        import torch  # type: ignore

        global _LAZY_TORCH
        _LAZY_TORCH = torch

        if not torch.cuda.is_available():
            raise _ModelLoadFailed(
                "CUDA-capable GPU not detected. Real LTX-2.3 profiles require an "
                "NVIDIA GPU; fake profile is available for CPU-only dev."
            )

        device = "cuda"
        dtype = _pick_dtype(profile, torch)

        # Pin the CUDA allocator below the operator's VRAM ceiling
        # BEFORE any weights are materialised, so the offload-hook
        # path cannot bleed the nvfp4 transformer into Windows shared
        # GPU memory. No-op under `none` / when no budget is set.
        _apply_vram_budget(torch, offload_mode, max_gpu_vram_gib, worker.logger)

        # Prefer the image-to-video class for scene chaining: scene N+1
        # is image-conditioned on scene N's last frame, which gives
        # visual continuity across long-video segment boundaries.
        # `LTX2ImageToVideoPipeline` shares the same sub-components as
        # the text-to-video `LTX2Pipeline`, so we can force-instantiate
        # it against the dg845 repo even though its `model_index.json`
        # nominally declares LTX2Pipeline (validated 2026-05-13 on the
        # RTX 5070 Ti — same weights load cleanly).
        # Fallback chain handles older diffusers releases.
        try:
            from diffusers import LTX2ImageToVideoPipeline as _PipeClass  # type: ignore
        except ImportError:
            try:
                from diffusers import LTX2Pipeline as _PipeClass  # type: ignore
            except ImportError:
                try:
                    from diffusers import LTXImageToVideoPipeline as _PipeClass  # type: ignore
                except ImportError as ie:
                    raise _ModelLoadFailed(
                        f"no LTX pipeline class importable from diffusers: {ie}. "
                        "Ensure the diffusers extras pin (git@adff1cae9...) is installed."
                    ) from ie

        global _LAZY_PIPELINE_CLASS
        _LAZY_PIPELINE_CLASS = _PipeClass

        worker.logger.info(
            "diffusers.load_pipeline",
            profile=profile,
            model_dir=str(model_dir),
            dtype=str(dtype),
            pipeline_class=_PipeClass.__name__,
        )
        load_start = time.perf_counter()
        # On-the-fly quantisation of the two heavy components
        # (transformer + Gemma-3 text encoder). The shipped checkpoint
        # is raw bf16 (~83 GB) — without this it cannot run on a 16 GB
        # card. nvfp4 resolves to nf4 on the host; the worker just
        # applies whatever concrete mode it was handed.
        quant_config = _build_pipeline_quant_config(quantization, dtype)
        from_pretrained_kwargs: dict[str, Any] = {
            "torch_dtype": dtype,
            "local_files_only": True,
        }
        if quant_config is not None:
            from_pretrained_kwargs["quantization_config"] = quant_config
            worker.logger.info(
                "diffusers.load_pipeline.quantization", quantization=quantization
            )
        pipe = _PipeClass.from_pretrained(
            str(model_dir),
            **from_pretrained_kwargs,
        )

        # GGUF-quantized transformers MUST be installed directly onto
        # their target device. Stock `pipe.to(...)` does not relocate
        # GGUFParameter instances after the fact (their move semantics
        # live in the quantizer, not nn.Module._apply). Under `none` the
        # transformer's resolved placement decides; under model /
        # sequential the offload hook pages from CPU so install on CPU.
        gguf_install_device = (
            placement.get("transformer", "cpu")
            if offload_mode == "none"
            else "cpu"
        )
        gguf_override = _resolve_gguf_transformer_override(model_dir)
        if gguf_override is not None:
            from . import gguf_loader

            worker.logger.info(
                "diffusers.load_pipeline.gguf_override",
                gguf_path=str(gguf_override),
                base_config_dir=str(model_dir),
                install_device=str(gguf_install_device),
            )
            gguf_transformer = gguf_loader.load_gguf_transformer(
                gguf_override,
                model_dir,
                compute_dtype=dtype,
                install_device=gguf_install_device,
            )
            pipe.transformer = gguf_transformer


        # The host-resolved triple is authoritative. `_place_pipeline`
        # decides hook-vs-direct per offload_mode but always honours
        # the triple — crucially keeping the ~11 GB T5 off the GPU for
        # nvfp4-on-16GB so the transformer + activations actually fit.
        # The 2026-05-15 hang was `pipe.to("cuda")` trying to make T5 +
        # transformer (~22 GB) co-resident on a 16 GB card.
        pipe = _place_pipeline(
            pipe=pipe,
            offload_mode=offload_mode,
            placement=placement,
            torch_mod=torch,
            logger=worker.logger,
            transformer_pre_placed=gguf_override is not None,
        )
        _apply_scheduler_choice(pipe, scheduler_choice, worker.logger)
        if hasattr(pipe.vae, "enable_tiling"):
            pipe.vae.enable_tiling()
        worker.logger.info(
            "diffusers.load_pipeline.ok",
            elapsed_s=round(time.perf_counter() - load_start, 2),
        )

        cache["pipe"] = pipe
        cache["device"] = device
        return pipe, device

    except _ModelMissing:
        raise
    except _ModelLoadFailed:
        raise
    except Exception as e:
        raise _ModelLoadFailed(f"pipeline load failed: {e}") from e


def _pick_dtype(profile: str, torch: Any) -> Any:
    """Select the torch dtype for the profile's quant scheme.

    NVFP4 + FP8 quant tensors live inside the safetensors files themselves;
    the pipeline_dtype is the activation dtype. Use bfloat16 across the board
    for activations — better numerical stability than fp16 for video work.
    """
    return getattr(torch, "bfloat16", torch.float16)


async def _load_then_render(
    worker,
    rs: DiffusersRunState,
    raw_params: dict[str, Any],
    cache: dict[str, Any],
    profile: str,
) -> None:
    """Pipeline load runs off the JSON-RPC reply path.

    The 22B fp8 pipeline takes 30s–several-minutes to materialise on
    cold cache (read safetensors, allocate GPU buffers, set up CPU
    offload hooks). Doing this inside `render_start` blocks the
    JSON-RPC handler past the host's send_rpc timeout. Run it here
    instead — render_start has already returned `status:started`.
    """
    offload_mode = _offload_mode_from_params(raw_params)
    await worker.emit_notification(
        Notifications.PROGRESS,
        {
            "run_id": rs.run_id,
            "phase": "loading_model",
            "profile": profile,
            "offload_mode": offload_mode,
        },
    )
    try:
        pipe, device = await asyncio.to_thread(
            functools.partial(
                _ensure_pipeline_loaded,
                worker,
                profile,
                cache,
                offload_mode,
                scheduler_choice=_scheduler_from_params(raw_params),
                placement=_component_placement_from_params(raw_params),
                quantization=_quantization_from_params(raw_params),
                max_gpu_vram_gib=_max_gpu_vram_gib_from_params(raw_params),
            )
        )
    except _ModelMissing as err:
        await _emit_error(
            worker, rs.run_id, ErrorCodes.MODEL_MISSING, str(err)
        )
        return
    except _ModelLoadFailed as err:
        await _emit_error(
            worker, rs.run_id, ErrorCodes.MODEL_LOAD_FAILED, str(err)
        )
        return
    except Exception as err:  # noqa: BLE001 — diffusers can throw anything
        await _emit_error(
            worker, rs.run_id, ErrorCodes.MODEL_LOAD_FAILED,
            f"unexpected pipeline load failure: {err.__class__.__name__}: {err}",
        )
        return

    rs.pipe = pipe
    rs.device = device

    await _emit_weights_resident(
        worker,
        rs.run_id,
        pipe,
        offload_mode,
        _max_gpu_vram_gib_from_params(raw_params),
    )
    await worker.emit_notification(
        Notifications.PROGRESS,
        {"run_id": rs.run_id, "phase": "rendering"},
    )
    # Surface any in-render exception as an ltx.video.error notification
    # so the host runner sees a terminal event instead of waiting for
    # RENDER_TIMEOUT (30 min) on a dead bg task. Without this catch,
    # uncaught exceptions in _render_loop became asyncio "task exception
    # was never retrieved" warnings on stderr — host log scrape only,
    # no host-side state change. 2026-05-15: triggered by the null-
    # guidance_scale TypeError; we want this safety net even after the
    # primary fix lands.
    try:
        await _render_loop(worker, rs, raw_params, cache, profile)
    except Exception as err:  # noqa: BLE001 — render code can throw anything
        await _emit_error(
            worker,
            rs.run_id,
            ErrorCodes.RENDER_FAILED,
            f"render task crashed: {err.__class__.__name__}: {err}",
        )


async def _load_then_retry_segment(
    worker,
    rs: DiffusersRunState,
    raw_params: dict[str, Any],
    cache: dict[str, Any],
    profile: str,
    seg_index: int,
) -> None:
    """Pipeline-load + single-segment retry runs off the JSON-RPC reply path.

    The retry RPC returns immediately so the caller isn't blocked while
    the pipeline reloads (which can happen if the worker was idle long
    enough for ``cache['pipe']`` to have been cleared by a prior DONE).
    """
    offload_mode = _offload_mode_from_params(raw_params)
    await worker.emit_notification(
        Notifications.PROGRESS,
        {
            "run_id": rs.run_id,
            "phase": "loading_model",
            "profile": profile,
            "retry": True,
            "segment_index": seg_index,
            "offload_mode": offload_mode,
        },
    )
    try:
        pipe, device = await asyncio.to_thread(
            functools.partial(
                _ensure_pipeline_loaded,
                worker,
                profile,
                cache,
                offload_mode,
                scheduler_choice=_scheduler_from_params(raw_params),
                placement=_component_placement_from_params(raw_params),
                quantization=_quantization_from_params(raw_params),
                max_gpu_vram_gib=_max_gpu_vram_gib_from_params(raw_params),
            )
        )
    except _ModelMissing as err:
        await _emit_error(worker, rs.run_id, ErrorCodes.MODEL_MISSING, str(err))
        return
    except _ModelLoadFailed as err:
        await _emit_error(worker, rs.run_id, ErrorCodes.MODEL_LOAD_FAILED, str(err))
        return
    except Exception as err:  # noqa: BLE001 — diffusers can throw anything
        await _emit_error(
            worker,
            rs.run_id,
            ErrorCodes.MODEL_LOAD_FAILED,
            f"unexpected pipeline load failure: {err.__class__.__name__}: {err}",
        )
        return

    rs.pipe = pipe
    rs.device = device
    await _emit_weights_resident(
        worker,
        rs.run_id,
        pipe,
        offload_mode,
        _max_gpu_vram_gib_from_params(raw_params),
    )
    await _retry_segment_loop(worker, rs, raw_params, seg_index)


async def _retry_segment_loop(
    worker,
    rs: DiffusersRunState,
    raw_params: dict[str, Any],
    seg_index: int,
) -> None:
    """Re-run a single segment using the loaded pipeline.

    Mirrors the per-segment slice of ``_render_loop``. Reads the prior
    segment's ``last_frame.png`` for image conditioning (or the run's
    initial input when ``seg_index == 0``); writes the new ``raw.mp4``
    + ``last_frame.png`` in the same workdir layout the full render
    would have used; emits SEGMENT_STARTED → SEGMENT_STEP → SEGMENT_COMPLETED
    + ARTIFACT_CREATED. Does NOT re-stitch / re-trim / emit DONE — the
    retry path is a partial recovery.
    """
    plan = rs.plan
    width = int(plan.get("width", 960))
    height = int(plan.get("height", 544))
    segments = plan.get("segments") or []
    if not segments:
        await _emit_error(
            worker,
            rs.run_id,
            ErrorCodes.PLAN_INVALID,
            "retry plan contains no segments",
        )
        return
    if seg_index >= len(segments):
        await _emit_error(
            worker,
            rs.run_id,
            ErrorCodes.PLAN_INVALID,
            f"segment_index {seg_index} out of range; plan has {len(segments)} segments",
        )
        return

    seg = segments[seg_index]
    seg_frame_count = int(seg.get("frame_count", 97))
    seg_seed = int(seg.get("seed", 0))

    # Same null-vs-missing guard as in _render_loop — see comment there.
    advanced = raw_params.get("advanced") or {}
    guidance_scale = float(_or_default(advanced.get("guidance_scale"), 4.0))
    num_inference_steps = int(_or_default(advanced.get("num_inference_steps"), 8))
    decode_timestep = _coerce_optional_float(advanced.get("decode_timestep"))
    image_cond_noise_scale = _coerce_optional_float(advanced.get("image_cond_noise_scale"))
    guidance_rescale = _coerce_optional_float(advanced.get("guidance_rescale"))

    prompt_obj = raw_params.get("prompt") or {}
    global_action = prompt_obj.get("action") or prompt_obj.get("prompt") or ""
    negative_prompt = prompt_obj.get("negative") or ""
    style_anchor = (prompt_obj.get("style") or "").strip()
    character_anchor = (prompt_obj.get("character") or "").strip()
    seg_action_prompt = (seg.get("action_prompt") or global_action).strip()
    effective_prompt = _compose_prompt(
        character=character_anchor,
        action=seg_action_prompt,
        style=style_anchor,
    )

    if seg_index == 0:
        input_image_block = raw_params.get("input_image") or {}
        input_image_path = (
            input_image_block.get("path") if isinstance(input_image_block, dict) else None
        )
        cond_image = _load_input_image(input_image_path, width, height)
    else:
        prev_last_frame = (
            rs.workdir / "segments" / f"{seg_index - 1:03d}" / "last_frame.png"
        )
        cond_image = (
            _load_input_image(str(prev_last_frame), width, height)
            if prev_last_frame.is_file()
            else None
        )

    if rs.cancelled:
        await _emit_error(
            worker,
            rs.run_id,
            ErrorCodes.RENDER_CANCELLED,
            "segment retry cancelled before start",
        )
        return

    segment_count = len(segments)
    await worker.emit_notification(
        Notifications.SEGMENT_STARTED,
        {
            "run_id": rs.run_id,
            "segment_index": seg_index,
            "segment_count": segment_count,
            "effective_prompt": effective_prompt,
            "retry": True,
        },
    )

    seg_dir = rs.workdir / "segments" / f"{seg_index:03d}"
    seg_dir.mkdir(parents=True, exist_ok=True)
    seg_path = seg_dir / "raw.mp4"
    last_frame_path = seg_dir / "last_frame.png"

    loop = asyncio.get_running_loop()

    def emit_step(step_idx: int) -> None:
        coro = worker.emit_notification(
            Notifications.SEGMENT_STEP,
            {
                "run_id": rs.run_id,
                "segment_index": seg_index,
                "segment_count": segment_count,
                "step": step_idx + 1,
                "total_steps": num_inference_steps,
                "retry": True,
            },
        )
        asyncio.run_coroutine_threadsafe(coro, loop)

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
                seg_frame_count,
                seg_seed,
                guidance_scale,
                num_inference_steps,
                emit_step,
                decode_timestep=decode_timestep,
                image_cond_noise_scale=image_cond_noise_scale,
                guidance_rescale=guidance_rescale,
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
    except Exception as e:  # noqa: BLE001 — diffusers can throw anything
        await _emit_error(worker, rs.run_id, ErrorCodes.RENDER_FAILED, str(e))
        return

    base_fps = int(plan.get("base_fps", 24))
    try:
        _write_frames_as_mp4(frames, seg_path, base_fps=base_fps)
        _save_last_frame(frames, last_frame_path)
    except OSError as e:
        await _emit_error(
            worker,
            rs.run_id,
            ErrorCodes.RENDER_FAILED,
            f"retry segment artifact write failed: {e}",
        )
        return

    await worker.emit_notification(
        Notifications.ARTIFACT_CREATED,
        {
            "run_id": rs.run_id,
            "segment_index": seg_index,
            "kind": "raw_video",
            "path": str(seg_path),
            "mime": "video/mp4",
            "retry": True,
        },
    )
    await worker.emit_notification(
        Notifications.ARTIFACT_CREATED,
        {
            "run_id": rs.run_id,
            "segment_index": seg_index,
            "kind": "last_frame",
            "path": str(last_frame_path),
            "mime": "image/png",
            "retry": True,
        },
    )

    rs.generation_count += 1
    stats = memory_stats(rs.generation_count)
    await worker.emit_notification(
        Notifications.MEMORY_STATS,
        {"run_id": rs.run_id, "segment_index": seg_index, **stats},
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

    del frames
    gc.collect()
    if _LAZY_TORCH is not None and _LAZY_TORCH.cuda.is_available():
        try:
            _LAZY_TORCH.cuda.empty_cache()
        except Exception:
            pass


async def _render_loop(
    worker,
    rs: DiffusersRunState,
    raw_params: dict[str, Any],
    cache: dict[str, Any],
    profile: str,
) -> None:
    """Walk segments. Emit JSON-RPC notifications matching pipeline_fake.

    Restart-on-threshold lives one layer up (Rust supervisor watches the
    memory_stats notifications and kills+respawns the worker if frag/OOM
    thresholds breach).
    """
    plan = rs.plan
    width = int(plan.get("width", 960))
    height = int(plan.get("height", 544))
    base_fps = int(plan.get("base_fps", 24))
    duration = float(
        plan.get("requested_duration_seconds", plan.get("duration_seconds", 10))
    )
    segments = plan.get("segments") or []

    # Hyperparameters — pulled from the top-level request_params (NOT the
    # `plan` dict, since these are user-facing knobs, not planner output).
    # Defaults match the LTX 2.3 distilled pipeline's recommended values
    # (guidance_scale 4.0, 8 inference steps for a distilled model).
    #
    # NOTE: the host's `build_render_params` emits these fields as JSON
    # `null` when the user leaves them unset. `dict.get(k, default)`
    # returns the default ONLY for missing keys — for `null` it returns
    # None. `float(None)` crashes the render. `_or_default` collapses
    # both paths to the default.
    advanced = raw_params.get("advanced") or {}
    guidance_scale = float(_or_default(advanced.get("guidance_scale"), 4.0))
    num_inference_steps = int(_or_default(advanced.get("num_inference_steps"), 8))
    decode_timestep = _coerce_optional_float(advanced.get("decode_timestep"))
    image_cond_noise_scale = _coerce_optional_float(advanced.get("image_cond_noise_scale"))
    guidance_rescale = _coerce_optional_float(advanced.get("guidance_rescale"))
    if not segments:
        await _emit_error(
            worker,
            rs.run_id,
            ErrorCodes.PLAN_INVALID,
            "render plan contains no segments",
        )
        return

    prompt_obj = raw_params.get("prompt") or {}
    global_action = prompt_obj.get("action") or prompt_obj.get("prompt") or ""
    negative_prompt = prompt_obj.get("negative") or ""
    style_anchor = (prompt_obj.get("style") or "").strip()
    character_anchor = (prompt_obj.get("character") or "").strip()

    input_image_path: str | None = None
    input_image_block = raw_params.get("input_image") or {}
    if isinstance(input_image_block, dict):
        input_image_path = input_image_block.get("path")

    initial_image = _load_input_image(input_image_path, width, height)
    last_frame_image = initial_image

    segment_paths: list[Path] = []
    segment_count = len(segments)

    # Item C: ack a Rung 7L resume before the first segment fires.
    # Operators reading worker logs see this notification once when
    # the host has re-issued render.start at a non-zero offset, and
    # use it to confirm that the worker's segment numbering aligns
    # with the host's restart_count.
    if rs.resumed_from_segment > 0:
        await worker.emit_notification(
            Notifications.RESUME_ACKNOWLEDGED,
            {
                "run_id": rs.run_id,
                "resumed_from_segment": rs.resumed_from_segment,
            },
        )

    for seg in segments:
        if rs.cancelled:
            await _emit_error(
                worker,
                rs.run_id,
                ErrorCodes.RENDER_CANCELLED,
                "render cancelled by user",
            )
            return

        seg_index = int(seg.get("index", 0))
        seg_frame_count = int(seg.get("frame_count", 97))
        seg_seed = int(seg.get("seed", 0))
        # Per-segment override from the planner's `scenes[]` zip; falls
        # back to the global action prompt when this segment isn't
        # claimed by any scene in the script.
        seg_action_prompt = (seg.get("action_prompt") or global_action).strip()
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

        # Heartbeat callback fires at the end of each diffusers
        # inference step. The pipe runs inside `asyncio.to_thread`, so
        # we capture the running loop here and schedule notifications
        # via `run_coroutine_threadsafe` from the worker thread.
        loop = asyncio.get_running_loop()

        def emit_step(step_idx: int) -> None:
            coro = worker.emit_notification(
                Notifications.SEGMENT_STEP,
                {
                    "run_id": rs.run_id,
                    "segment_index": seg_index,
                    "segment_count": segment_count,
                    "step": step_idx + 1,
                    "total_steps": num_inference_steps,
                },
            )
            asyncio.run_coroutine_threadsafe(coro, loop)

        try:
            frames = await asyncio.to_thread(
                functools.partial(
                    _generate_segment,
                    rs.pipe,
                    last_frame_image,
                    effective_prompt,
                    negative_prompt,
                    width,
                    height,
                    seg_frame_count,
                    seg_seed,
                    guidance_scale,
                    num_inference_steps,
                    emit_step,
                    decode_timestep=decode_timestep,
                    image_cond_noise_scale=image_cond_noise_scale,
                    guidance_rescale=guidance_rescale,
                )
            )
        except RuntimeError as e:
            # CUDA OOM / VRAM budget exceeded surfaces here.
            msg = str(e)
            code = (
                ErrorCodes.VRAM_BUDGET_EXCEEDED
                if "out of memory" in msg.lower()
                else ErrorCodes.RENDER_FAILED
            )
            await _emit_error(worker, rs.run_id, code, msg)
            return
        except Exception as e:
            await _emit_error(
                worker, rs.run_id, ErrorCodes.RENDER_FAILED, str(e)
            )
            return

        _write_frames_as_mp4(frames, seg_path, base_fps=base_fps)
        _save_last_frame(frames, last_frame_path)
        last_frame_image = _load_input_image(
            str(last_frame_path), width, height
        )
        segment_paths.append(seg_path)

        await worker.emit_notification(
            Notifications.ARTIFACT_CREATED,
            {
                "run_id": rs.run_id,
                "segment_index": seg_index,
                "kind": "raw_video",
                "path": str(seg_path),
                "mime": "video/mp4",
            },
        )
        await worker.emit_notification(
            Notifications.ARTIFACT_CREATED,
            {
                "run_id": rs.run_id,
                "segment_index": seg_index,
                "kind": "last_frame",
                "path": str(last_frame_path),
                "mime": "image/png",
            },
        )

        rs.generation_count += 1
        stats = memory_stats(rs.generation_count)
        await worker.emit_notification(
            Notifications.MEMORY_STATS,
            {"run_id": rs.run_id, "segment_index": seg_index, **stats},
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

        # Inter-segment cleanup: drop autograd graphs + intermediate tensors,
        # gc, empty_cache. Pipe + weights STAY in VRAM (supervisor decides
        # whether to restart based on memory_stats).
        del frames
        gc.collect()
        if _LAZY_TORCH is not None and _LAZY_TORCH.cuda.is_available():
            try:
                _LAZY_TORCH.cuda.empty_cache()
            except Exception:
                pass

    # Stitch + (optional RIFE 2×) + trim. RIFE doubles base_fps so the
    # output FPS matches plan.output_fps (typically 48). When RIFE is not
    # installed the worker falls back to base_fps output — duration is
    # still exact because trim_to_duration is the final step.
    final_dir = rs.workdir / "final"
    final_dir.mkdir(parents=True, exist_ok=True)
    stitched_path = final_dir / "stitched.mp4"
    interpolated_path = final_dir / "interpolated.mp4"
    final_path = final_dir / "final.mp4"
    stitch_segments(segment_paths, stitched_path)

    output_fps = int(plan.get("output_fps", base_fps))
    pre_trim = stitched_path
    if output_fps > base_fps and _try_interpolate_rife(
        stitched_path, interpolated_path, base_fps, output_fps
    ):
        pre_trim = interpolated_path
        await worker.emit_notification(
            Notifications.PROGRESS,
            {
                "run_id": rs.run_id,
                "overall_percent": 100,
                "message": f"RIFE interpolation: {base_fps} → {output_fps} fps",
            },
        )

    trim_to_duration(pre_trim, final_path, duration_s=duration)

    # AC13 — terminal eviction. Pipe + weights leave VRAM here. The Rust
    # supervisor releases the lease right after `done` arrives, which kills
    # the subprocess and frees the CUDA context too — belt + suspenders.
    cache["pipe"] = None
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
            "profile": profile,
        },
    )


def _compose_prompt(*, character: str, action: str, style: str) -> str:
    """Build the LTX-2.3 prompt string from the three anchors.

    Convention for video diffusion: subject first (anchors who/what is
    on screen so the model commits to that identity), action middle
    (what they do this scene), style last (how it looks). Empty parts
    drop silently — single global prompt still works.

    Threading the same character + style on every scene is the cheapest
    way to keep visual continuity across cuts; combined with image
    conditioning from the previous segment's last frame, it's the
    practical answer to "preserve characters and art style across the
    chain". The seed strategy (planner derives correlated per-scene
    seeds from a master seed) handles RNG-driven lighting continuity.
    """
    parts = [p.strip() for p in (character, action, style) if p and p.strip()]
    return ". ".join(parts)


def _generate_segment(
    pipe: Any,
    image: Any,
    prompt: str,
    negative_prompt: str,
    width: int,
    height: int,
    num_frames: int,
    seed: int,
    guidance_scale: float,
    num_inference_steps: int,
    step_heartbeat: Callable[[int], None] | None = None,
    *,
    decode_timestep: float | None = None,
    image_cond_noise_scale: float | None = None,
    guidance_rescale: float | None = None,
) -> Any:
    """Call into the LTX pipeline. Returns a list of PIL.Image frames.

    The pipeline class varies between releases — `LTX2ImageToVideoPipeline`
    is preferred (accepts `image=` for scene chaining), but we fall back
    to `LTX2Pipeline` (text-to-video) and `LTXI2VLongMultiPromptPipeline`
    (`cond_image=`) by probing the active class's signature. The text-only
    fallback silently drops the input image — fine for a fresh run with
    no seed image, but breaks the multi-segment chain.
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
        "generator": generator,
        "guidance_scale": guidance_scale,
        "num_inference_steps": num_inference_steps,
    }
    # Optional LTX-2.3-specific knobs. None signals "use pipeline
    # default" and gets stripped here so we never pass an explicit
    # None into the diffusers call (which would override the default
    # with null and trip TypeError downstream — same class of bug as
    # the 2026-05-15 guidance_scale=None incident).
    if decode_timestep is not None:
        call_kwargs["decode_timestep"] = decode_timestep
    if image_cond_noise_scale is not None:
        call_kwargs["image_cond_noise_scale"] = image_cond_noise_scale
    if guidance_rescale is not None:
        call_kwargs["guidance_rescale"] = guidance_rescale

    sig_params = inspect.signature(pipe.__call__).parameters
    if image is not None:
        if "image" in sig_params:
            call_kwargs["image"] = image
        elif "cond_image" in sig_params:
            call_kwargs["cond_image"] = image
        # else: text-to-video pipeline; silently drop the input image.

    # Per-inference-step heartbeat. diffusers calls
    # `callback_on_step_end(pipeline, step_index, timestep, callback_kwargs)`
    # at the end of each denoising step and expects the dict back. We
    # use this purely as a progress beacon — no kwargs are mutated.
    if step_heartbeat is not None and "callback_on_step_end" in sig_params:
        def _on_step_end(_pipe: Any, step_idx: int, _t: Any, cb_kwargs: dict[str, Any]) -> dict[str, Any]:
            try:
                step_heartbeat(step_idx)
            except Exception:  # noqa: BLE001 — heartbeats must NEVER abort a render
                pass
            return cb_kwargs

        call_kwargs["callback_on_step_end"] = _on_step_end

    # Drop kwargs the active pipeline doesn't accept (older / different
    # variants may not expose guidance_scale or num_inference_steps).
    call_kwargs = {k: v for k, v in call_kwargs.items() if k in sig_params}

    result = pipe(**call_kwargs)
    # diffusers returns a dataclass-ish object with `.frames`.
    frames = getattr(result, "frames", None)
    if frames is None and isinstance(result, dict):
        frames = result.get("frames")
    if frames is None:
        raise RuntimeError(
            "LTX pipeline returned no frames — unknown result shape"
        )
    # `frames` is a list of PIL images for single-batch.
    return frames[0] if isinstance(frames, list) and len(frames) == 1 else frames


def _load_input_image(path: str | None, width: int, height: int) -> Any:
    """Open the input image as PIL and resize to (width, height).

    None / missing path → a single solid grey image. The pipeline still
    image-conditions on whatever it gets; for the first segment of a
    no-input-image render this is benign.
    """
    try:
        from PIL import Image  # type: ignore
    except ImportError:
        return None

    if path and Path(path).exists():
        img = Image.open(path).convert("RGB")
    else:
        img = Image.new("RGB", (width, height), (32, 32, 32))
    if img.size != (width, height):
        img = img.resize((width, height), Image.LANCZOS)
    return img


def _write_frames_as_mp4(frames: Any, path: Path, base_fps: int) -> None:
    """Encode a list of PIL frames as H.264 MP4 via ffmpeg.

    Uses ffmpeg-python (already pinned in the worker's pyproject), driven
    through a temp PNG directory rather than piped raw RGB — survives the
    cross-platform pipe-buffer quirks that bite the streaming-stdin path on
    Windows.
    """
    import tempfile

    import ffmpeg  # type: ignore

    path.parent.mkdir(parents=True, exist_ok=True)
    with tempfile.TemporaryDirectory(prefix="ltx23-seg-") as tmp:
        tmp_dir = Path(tmp)
        for i, frame in enumerate(frames):
            frame.save(tmp_dir / f"frame_{i:05d}.png")
        (
            ffmpeg.input(
                str(tmp_dir / "frame_%05d.png"),
                framerate=base_fps,
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
    # Cap message length + scrub token-like substrings before
    # forwarding. Diffusers / HuggingFace exceptions can carry multi-MB
    # tensor dumps AND echo Authorization headers / HF_TOKEN values
    # that would otherwise hit the SSE broker + DB row verbatim.
    safe = truncate_for_log(scrub_sensitive(message))
    await worker.emit_notification(
        Notifications.ERROR,
        {"run_id": run_id, "code": code, "message": safe},
    )


# Strong references to fire-and-forget background tasks.
# CPython 3.11+ only holds WEAK references to tasks, so a task created
# without a strong reference can be GC'd before running. We add each
# spawned task to this set and remove it via a done-callback. Pattern
# straight from the Python 3.12 asyncio.create_task docstring.
_FIRE_AND_FORGET_TASKS: set[Any] = set()


def _spawn_fire_and_forget(coro: Any, *, name: str | None = None) -> None:
    task = asyncio.create_task(coro, name=name)
    _FIRE_AND_FORGET_TASKS.add(task)
    task.add_done_callback(_FIRE_AND_FORGET_TASKS.discard)


def _emit_terminal_error(
    worker, run_id: str, code: int, message: str
) -> dict[str, Any]:
    """Called from inside render_start when the pipeline can't even load.

    Emits an error notification (so the supervisor sees it) AND returns
    a started-but-doomed RPC response so the JSON-RPC layer doesn't hang.
    """
    _spawn_fire_and_forget(
        _emit_error(worker, run_id, code, message),
        name=f"ltx-emit-error-{run_id}",
    )
    return {"run_id": run_id, "status": "failed", "error": message}


def _try_interpolate_rife(
    src: Path, dst: Path, base_fps: int, target_fps: int
) -> bool:
    """Best-effort RIFE 2× interpolation. Returns True on success.

    Implementation is intentionally fallback-friendly:
      1. Try `rife-ncnn-vulkan-python` (Practical-RIFE wheel from
         `interpolation` optional extras) if installed. Pipes raw rgb24
         frames through ffmpeg → wheel → ffmpeg at target_fps.
      2. Fall back to ffmpeg's `minterpolate` motion-compensated filter
         which ships with ffmpeg ≥ 4 — way slower than RIFE but better
         than no interpolation when the optional extras aren't installed.
      3. Return False so caller uses the stitched file directly.
    """
    if _interpolate_via_rife(src, dst, base_fps, target_fps):
        return True
    return _interpolate_via_ffmpeg(src, dst, target_fps)


class _RifeUnavailable(Exception):
    """The rife wheel is missing, malformed, or rejected its constructor."""


def _interpolate_via_rife(
    src: Path, dst: Path, base_fps: int, target_fps: int
) -> bool:
    """RIFE 2× interpolation via the `rife-ncnn-vulkan-python` wheel.

    Practical-RIFE only doubles the frame rate, so a request for any
    other ratio falls through to `_interpolate_via_ffmpeg`. Any wheel-
    level failure (missing import, malformed processor, ffmpeg pipe
    error) also returns False so the caller's fallback chain runs.
    """
    if target_fps != base_fps * 2:
        # Practical-RIFE only interpolates a single midpoint frame per
        # pair (2× ratio). Anything else is the ffmpeg path's job.
        return False
    try:
        processor = _build_rife_processor()
    except _RifeUnavailable:
        return False
    try:
        return _run_rife_pipeline(src, dst, base_fps, target_fps, processor)
    except Exception:  # noqa: BLE001 — defensive; we never want RIFE failures to crash render
        return False


def _build_rife_processor() -> Any:
    """Locate + instantiate the rife processor across known wheel forks.

    Different `rife-ncnn-vulkan-python` releases expose the class as
    one of {``Rife``, ``RIFE``, ``RifeNCNNVulkan``}. The constructor
    likewise accepts either ``gpuid=0`` (kwarg), ``gpu_id=0``, or
    positional `0` depending on version. Probe in priority order;
    raise `_RifeUnavailable` if nothing works so the caller can fall
    through cleanly.
    """
    try:
        import rife_ncnn_vulkan_python as rife_mod  # type: ignore
    except ImportError as e:
        raise _RifeUnavailable("rife-ncnn-vulkan-python not installed") from e

    cls = None
    for name in ("Rife", "RIFE", "RifeNCNNVulkan"):
        cls = getattr(rife_mod, name, None)
        if cls is not None:
            break
    if cls is None:
        raise _RifeUnavailable(
            "no Rife class found in rife_ncnn_vulkan_python module surface"
        )

    last_err: Exception | None = None
    for ctor_kwargs in ({"gpuid": 0}, {"gpu_id": 0}, {}):
        try:
            return cls(**ctor_kwargs)
        except TypeError as e:
            last_err = e
            continue
        except Exception as e:  # noqa: BLE001 — wheel may raise anything
            last_err = e
            break
    raise _RifeUnavailable(
        f"rife constructor rejected every probed signature: {last_err}"
    )


def _invoke_rife(processor: Any, img0: Any, img1: Any) -> Any:
    """Probe for the right entry-point method on the rife processor."""
    for method_name in ("process", "interpolate", "__call__"):
        method = getattr(processor, method_name, None)
        if callable(method):
            return method(img0, img1)
    raise AttributeError(
        f"rife processor {type(processor).__name__} has no recognised entry point"
    )


def _run_rife_pipeline(
    src: Path,
    dst: Path,
    base_fps: int,
    target_fps: int,
    processor: Any,
) -> bool:
    """Decode → interpolate → encode pipeline backing `_interpolate_via_rife`.

    Frames flow as raw rgb24 through ffmpeg pipes — avoids on-disk
    intermediates for the 50–100 frame typical segment chains. PIL is
    used only as the rife wheel's expected interchange format.
    """
    import ffmpeg  # type: ignore
    from PIL import Image  # type: ignore
    import numpy as np  # type: ignore

    probe = ffmpeg.probe(str(src))
    video_stream = next(
        (s for s in probe.get("streams", []) if s.get("codec_type") == "video"),
        None,
    )
    if video_stream is None:
        return False
    width = int(video_stream["width"])
    height = int(video_stream["height"])

    decoded, _stderr = (
        ffmpeg.input(str(src))
        .output("pipe:", format="rawvideo", pix_fmt="rgb24")
        .run(capture_stdout=True, capture_stderr=True, quiet=True)
    )

    frame_bytes = width * height * 3
    if frame_bytes == 0 or len(decoded) % frame_bytes != 0:
        return False
    num_frames = len(decoded) // frame_bytes
    if num_frames < 2:
        return False

    raw = np.frombuffer(decoded, dtype=np.uint8).reshape(
        num_frames, height, width, 3
    )

    dst.parent.mkdir(parents=True, exist_ok=True)
    encoder = (
        ffmpeg.input(
            "pipe:",
            format="rawvideo",
            pix_fmt="rgb24",
            s=f"{width}x{height}",
            r=str(target_fps),
        )
        .output(
            str(dst),
            vcodec="libx264",
            pix_fmt="yuv420p",
            movflags="+faststart",
            loglevel="error",
        )
        .overwrite_output()
        .run_async(pipe_stdin=True)
    )

    try:
        for i in range(num_frames):
            cur_pil = Image.fromarray(raw[i])
            encoder.stdin.write(np.asarray(cur_pil, dtype=np.uint8).tobytes())
            if i + 1 < num_frames:
                nxt_pil = Image.fromarray(raw[i + 1])
                mid = _invoke_rife(processor, cur_pil, nxt_pil)
                mid_array = np.asarray(mid, dtype=np.uint8)
                if mid_array.shape != (height, width, 3):
                    return False
                encoder.stdin.write(mid_array.tobytes())
        encoder.stdin.close()
        encoder.wait()
    finally:
        if encoder.stdin and not encoder.stdin.closed:
            try:
                encoder.stdin.close()
            except OSError:
                pass

    return dst.is_file()


def _interpolate_via_ffmpeg(src: Path, dst: Path, target_fps: int) -> bool:
    """Run ffmpeg's minterpolate filter. Returns True on success.

    This is the safe fallback when no GPU-accelerated interpolator is
    available. It's CPU-bound and ~10-50× slower than RIFE but produces
    a valid output file.
    """
    try:
        import ffmpeg  # type: ignore

        dst.parent.mkdir(parents=True, exist_ok=True)
        (
            ffmpeg.input(str(src))
            .filter(
                "minterpolate",
                fps=str(target_fps),
                mi_mode="mci",
                mc_mode="aobmc",
                me_mode="bidir",
                vsbmc="1",
            )
            .output(
                str(dst),
                vcodec="libx264",
                pix_fmt="yuv420p",
                movflags="+faststart",
                loglevel="error",
            )
            .overwrite_output()
            .run()
        )
        return dst.is_file()
    except Exception:
        # Any ffmpeg failure → fall back to source file.
        return False
