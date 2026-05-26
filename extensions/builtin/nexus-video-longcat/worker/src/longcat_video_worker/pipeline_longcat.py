"""LongCat-Video pipeline adapter.

Wraps the upstream four-method API (generate_t2v, generate_i2v, generate_vc,
generate_refine) behind a uniform render(request) call. One _PipelineState per
worker process is lazily constructed on the first render and re-used for all
subsequent calls; the state is module-level to survive across async handler
invocations.

Component loading order on first render:
  1. _load_text_encoder  → tokenizer + UMT5EncoderModel
  2. _load_vae           → AutoencoderKLWan
  3. _load_scheduler     → FlowMatchEulerDiscreteScheduler
  4. _load_dit           → FP8-loaded LongCatVideoTransformer3DModel
  5. _build_pipeline     → LongCatVideoPipeline

Distill LoRA is applied additively at first render when use_distill=True and
the LoRA safetensors file is discoverable under the Kijai model dir. It is
NEVER merged into the FP8 weights.
"""

from __future__ import annotations

import logging
import os
import sys
import tempfile
import time
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Literal, Optional

logger = logging.getLogger(__name__)


RenderMode = Literal["t2v", "i2v", "vc", "refine"]


@dataclass(frozen=True)
class Scene:
    prompt: str
    duration_seconds: float = 4.0
    overlap_frames: int = 13
    enhance_hf: Optional[bool] = None
    adain_factor: Optional[float] = None
    use_distill: Optional[bool] = None
    guidance_scale: Optional[float] = None
    num_inference_steps: Optional[int] = None
    negative_prompt: Optional[str] = None
    mode: str = "auto"
    image_path: Optional[str] = None
    per_scene_generated_seconds: Optional[float] = None
    image_cond_noise_scale: Optional[float] = None
    motion_intensity: str = "dynamic"
    seed_offset: Optional[int] = None
    apply_refinement: Optional[bool] = None
    refinement_steps: Optional[int] = None
    refinement_guidance: Optional[float] = None
    refinement_spatial_only: Optional[bool] = None

    def __post_init__(self) -> None:
        if self.per_scene_generated_seconds is None:
            object.__setattr__(self, "per_scene_generated_seconds", self.duration_seconds)
        else:
            object.__setattr__(self, "duration_seconds", self.per_scene_generated_seconds)

_DISTILL_LORA_FILENAME = "LongCat_distill_lora_alpha64_bf16.safetensors"
_REFINEMENT_LORA_FILENAME = "LongCat_refinement_lora_rank128_bf16.safetensors"
_KJ_FP8_FILENAME = "LongCat_TI2V_comfy_fp8_e4m3fn_scaled_KJ.safetensors"
_KIJAI_REPO_SUBDIR = "Kijai/LongCat-Video_comfy"
_MEITUAN_REPO_SUBDIR = "meituan-longcat/LongCat-Video"


@dataclass
class LongCatRenderRequest:
    mode: RenderMode
    prompt: str
    negative_prompt: Optional[str] = None
    image_path: Optional[str] = None
    conditioning_video_path: Optional[str] = None
    low_res_video_path: Optional[str] = None
    height: int = 480
    width: int = 832
    num_frames: int = 93
    num_inference_steps: int = 50
    guidance_scale: float = 4.0
    use_distill: bool = False
    seed: Optional[int] = None
    max_sequence_length: int = 512
    offload_kv_cache: bool = False
    # Apply LongCat_refinement_lora_rank128_bf16 + run generate_refine on the
    # draft after the primary render. Quality pass for distill-mode smudge
    # and 720p upscale (refinement LoRA was trained for both).
    apply_refinement: bool = False
    refinement_steps: int = 12
    refinement_guidance: float = 1.0
    # Default True: keep draft frame count, only spatial upscale. Doubling
    # frame count via temporal interp roughly doubles DiT latent VRAM and
    # spills past 16 GiB on RTX 5070 Ti at 480p draft → 720p refine even
    # with block-swap=46. Flip False only when card has slack OR draft
    # was rendered at a much smaller spatial resolution.
    refinement_spatial_only: bool = True

    # Native long-video via upstream generate_vc(use_kv_cache=True).
    # When target_frames > num_frames, the primary t2v/i2v render is
    # extended by chained generate_vc calls. Each call adds
    # `num_frames - continuation_overlap_frames` fresh frames. Stops once
    # accumulated frame count >= target_frames (last clip may overshoot
    # slightly; output is trimmed to exactly target_frames).
    #
    # Constraints upstream enforces:
    #   * (num_frames - 1) % vae_scale_factor_temporal == 0
    #   * continuation_overlap_frames must follow the same modulo
    #   * use_distill and enhance_hf are MUTUALLY EXCLUSIVE — when
    #     use_distill=True the loop forces enhance_hf=False
    target_frames: Optional[int] = None
    continuation_overlap_frames: int = 13
    continuation_enhance_hf: Optional[bool] = None  # None = auto (= not use_distill)

    # Multi-scene composition. When set, the initial clip is rendered with
    # scenes[0].prompt (uses request.image_path for i2v / no image for t2v),
    # then each subsequent scene is rendered via generate_vc with
    # use_kv_cache=False (KV cache cleared per scene to prevent prompt-token
    # bleed). Mutually exclusive with target_frames — set one or the other.
    scenes: Optional[list[Scene]] = None

    # NVIDIA Maxine VFX SDK upscale post-process. None or 1 → skipped.
    # Scale in (2, 3, 4) runs VideoSuperRes on the assembled frame stack
    # AFTER all generation + continuation + scene work completes.
    # Requires the [rtx] extra (nvvfx) + an RTX-class GPU; failure of the
    # gate is logged and the un-upscaled frames are written instead.
    rtx_upscale_scale: Optional[int] = None
    rtx_upscale_quality: str = "HIGH"
    # Opt-in: keep model-based refinement pass even when RTX upscale is
    # set. Default False because dual-LoRA refinement at 720p spills past
    # 16 GiB on Blackwell (see embrace cycle 2026-05-24). Enable only
    # when running smaller drafts (e.g. 384p) where the refinement
    # latent footprint fits OR on cards with >=24 GiB headroom.
    force_refinement_with_upscale: bool = False

    # Per-render offload + cache overrides. When None, the values fall
    # back to NEXUS_VIDEO_LONGCAT_OFFLOAD_MODE / NEXUS_VIDEO_LONGCAT_BLOCK_SWAP
    # env vars (operator-level defaults). Explicit request values always
    # win. Useful when one recipe wants aggressive offload (e.g. 720p
    # refinement) and another wants tight residency (low-res draft +
    # RTX upscale where VRAM headroom is the priority).
    offload_mode: Optional[str] = None  # "none" | "partial" | "sequential"
    block_swap_count: Optional[int] = None

    # Multiscene chaining — AdaIN colour-match factor applied to each
    # scene-N>1 tail BEFORE it is fed into generate_vc as conditioning.
    # 0.0 disables (= prior hard-pin behaviour). 0.1-0.3 is the usable
    # band — higher flattens intended lighting changes. Anchor is captured
    # from scene-1's refined tail; subsequent scenes pull their tail
    # toward it. See chaining.adain_color_match for the math.
    adain_factor: float = 0.0

    image_cond_noise_scale: float = 0.15


@dataclass
class _PipelineState:
    pipeline: Any
    device: Any
    compute_dtype: Any
    vendor_dir: Path
    model_dir: Path
    tokenizer: Any
    text_encoder: Any
    vae: Any
    scheduler: Any
    dit: Any
    lora_network: Any = field(default=None)


_STATE: Optional[_PipelineState] = None


def _resolve_paths(host_data_dir: Optional[str] = None) -> tuple[Path, Path]:
    root_str = host_data_dir or os.environ.get("NEXUS_HOST_DATA_DIR")
    if not root_str:
        raise RuntimeError(
            "Cannot resolve model/vendor paths: NEXUS_HOST_DATA_DIR is unset "
            "and host_data_dir was not supplied."
        )
    root = Path(root_str)
    model_dir = root / "models" / _MEITUAN_REPO_SUBDIR
    vendor_dir = root / "extensions" / "nexus.video.longcat" / "vendor" / "longcat"
    return model_dir, vendor_dir


def _load_text_encoder(
    model_dir: Path, compute_dtype: Any, device: Any
) -> tuple[Any, Any]:
    from transformers import AutoTokenizer, UMT5EncoderModel

    tokenizer = AutoTokenizer.from_pretrained(str(model_dir / "tokenizer"))
    # UMT5-XXL is ~10 GiB in bf16. Load to CPU; accelerate.cpu_offload below
    # moves it to GPU only during encode_prompt forward. Saves ~9 GiB VRAM
    # during the entire denoise loop.
    text_encoder = UMT5EncoderModel.from_pretrained(
        str(model_dir / "text_encoder"),
        torch_dtype=compute_dtype,
    )
    _attach_cpu_offload(text_encoder, execution_device=device, label="text_encoder")
    return tokenizer, text_encoder


def _load_vae(model_dir: Path, compute_dtype: Any, device: Any) -> Any:
    from longcat_video.modules.autoencoder_kl_wan import AutoencoderKLWan

    # AutoencoderKLWan is ~500 MiB — small enough to stay resident, but the
    # decode forward allocates per-frame activations that can spike. Keep
    # the weights GPU-resident; the VideoProcessor handles tiling for memory
    # control. If 8GB cards complain, add _attach_cpu_offload here too.
    vae = AutoencoderKLWan.from_pretrained(
        str(model_dir / "vae"), torch_dtype=compute_dtype
    )
    vae = vae.to(device)
    return vae


def _attach_cpu_offload(
    model: Any, *, execution_device: Any, label: str
) -> None:
    try:
        from accelerate.hooks import AlignDevicesHook, add_hook_to_module
    except ImportError:
        logger.warning(
            "_attach_cpu_offload(%s): accelerate not importable; "
            "model stays on its current device.",
            label,
        )
        return

    hook = AlignDevicesHook(
        execution_device=execution_device,
        offload=True,
        io_same_device=True,
        offload_buffers=True,
        place_submodules=True,
    )
    add_hook_to_module(model, hook, append=True)
    logger.info(
        "_attach_cpu_offload(%s): hook attached (exec=%s, weights→cpu)",
        label,
        execution_device,
    )


def _load_scheduler(model_dir: Path, use_distill: bool) -> Any:
    from longcat_video.modules.scheduling_flow_match_euler_discrete import (
        FlowMatchEulerDiscreteScheduler,
    )

    scheduler = FlowMatchEulerDiscreteScheduler.from_pretrained(
        str(model_dir / "scheduler")
    )
    if use_distill:
        scheduler.config.shift = 12.0
        # `shift` is a read-only @property backed by `_shift`; write to the
        # underlying attribute directly.
        if hasattr(scheduler, "_shift"):
            scheduler._shift = 12.0
    return scheduler


def _load_dit(
    model_dir: Path,
    vendor_dir: Path,
    compute_dtype: Any,
    device: Any,
    host_data_dir: Optional[str],
    offload_mode: str = "none",
    block_swap_count: int = 0,
) -> Any:
    import json

    from .longcat_safetensors_loader import load_longcat_dit_from_safetensors

    root_str = host_data_dir or os.environ.get("NEXUS_HOST_DATA_DIR")
    if not root_str:
        raise RuntimeError(
            "_load_dit: NEXUS_HOST_DATA_DIR is unset; cannot locate KJ safetensors."
        )
    root = Path(root_str)
    kj_path = root / "models" / _KIJAI_REPO_SUBDIR / _KJ_FP8_FILENAME

    dit_config_path = model_dir / "dit" / "config.json"
    if not dit_config_path.is_file():
        raise FileNotFoundError(
            f"dit/config.json not found at {dit_config_path}. "
            "Re-run the installer (PROFILE_REPO allow_patterns now includes "
            "'dit/config.json')."
        )
    config = json.loads(dit_config_path.read_text(encoding="utf-8"))
    # Single-GPU mode: upstream DiT forward subscripts cp_split_hw
    # unconditionally (longcat_video_dit.py:329); None is a multi-GPU
    # placeholder. Force [1,1] so the no-op branch still passes shape check.
    if config.get("cp_split_hw") is None:
        config["cp_split_hw"] = [1, 1]
    # Attention backend selection. NEXUS_VIDEO_LONGCAT_ATTN env-var picks
    # the upstream kernel. 'auto' DOES NOT enable xformers here — even
    # when xformers imports successfully, the C++/CUDA kernels are
    # rejected on Blackwell (sm_120) and fa3/fa2/cutlass paths all
    # return "no operator found". Leaving all upstream flags False
    # delegates to longcat_native_loader._patch_attention_to_use_sdpa
    # whose own 'auto' picker tries sage → flashattn2 → sdpa with a real
    # importability + capability check.
    config["enable_flashattn2"] = False
    config["enable_flashattn3"] = False
    config["enable_bsa"] = False
    config["enable_xformers"] = False
    attn_backend = os.environ.get("NEXUS_VIDEO_LONGCAT_ATTN", "auto").lower()
    if attn_backend == "xformers":
        try:
            import xformers  # noqa: F401
            config["enable_xformers"] = True
            logger.info(
                "_load_dit: enable_xformers=True (xformers %s detected) — "
                "explicit env override; may fail on Blackwell sm_120",
                xformers.__version__,
            )
        except ImportError:
            logger.warning(
                "_load_dit: NEXUS_VIDEO_LONGCAT_ATTN=xformers but xformers "
                "not importable; falling back to monkey-patch dispatch"
            )
    elif attn_backend == "flashattn2":
        config["enable_flashattn2"] = True
    elif attn_backend == "flashattn3":
        config["enable_flashattn3"] = True
    else:
        # 'auto', 'sdpa', 'sage' all leave upstream flags False; the
        # native_loader patch picks the actual kernel.
        logger.info(
            "_load_dit: deferring attention dispatch to native_loader "
            "(NEXUS_VIDEO_LONGCAT_ATTN=%s)", attn_backend
        )

    bundle = load_longcat_dit_from_safetensors(
        kj_path,
        vendor_dir=vendor_dir,
        config=config,
        install_device=device,
        compute_dtype=compute_dtype,
        strict_schema=False,
        offload_mode=offload_mode,
        block_swap_count=block_swap_count,
    )
    return bundle.transformer


def _build_pipeline(
    tokenizer: Any,
    text_encoder: Any,
    vae: Any,
    scheduler: Any,
    dit: Any,
    vendor_dir: Path,
) -> Any:
    vstr = str(vendor_dir)
    if vstr not in sys.path:
        sys.path.insert(0, vstr)

    from longcat_video.pipeline_longcat_video import LongCatVideoPipeline

    return LongCatVideoPipeline(
        tokenizer=tokenizer,
        text_encoder=text_encoder,
        vae=vae,
        scheduler=scheduler,
        dit=dit,
    )


def _maybe_load_distill_lora(
    dit: Any, host_data_dir: Optional[str], vendor_dir: Path
) -> Any:
    root_str = host_data_dir or os.environ.get("NEXUS_HOST_DATA_DIR")
    if not root_str:
        logger.warning(
            "_maybe_load_distill_lora: NEXUS_HOST_DATA_DIR unset; skipping LoRA."
        )
        return None

    lora_path = Path(root_str) / "models" / _KIJAI_REPO_SUBDIR / _DISTILL_LORA_FILENAME
    if not lora_path.exists():
        logger.warning(
            "_maybe_load_distill_lora: distill LoRA not found at %s — proceeding "
            "without it (distill timestep schedule still active via use_distill=True).",
            lora_path,
        )
        return None

    vstr = str(vendor_dir)
    if vstr not in sys.path:
        sys.path.insert(0, vstr)

    try:
        from safetensors.torch import load_file
        from longcat_video.modules.lora_utils import create_lora_network

        _patch_lora_utils_for_fp8()
        lora_sd = load_file(str(lora_path), device="cpu")
        lora_sd = _strip_diffusion_model_prefix(lora_sd)
        network = create_lora_network(
            transformer=dit,
            lora_network_state_dict_loaded=lora_sd,
            multiplier=1.0,
            network_dim=128,
            network_alpha=64.0,
        )
        import torch
        network = network.to(dtype=torch.bfloat16, device=next(dit.parameters()).device)
        logger.info(
            "_maybe_load_distill_lora: loaded LoRA from %s (%d modules)",
            lora_path,
            len(network.loras),
        )
        return network
    except Exception as exc:
        logger.warning(
            "_maybe_load_distill_lora: failed to load distill LoRA (%s); "
            "proceeding without it.",
            exc,
        )
        return None


def _patch_lora_utils_for_fp8() -> None:
    # Upstream `lora_utils.LoRANetwork.__init__` and `LoRAModule.__init__`
    # only whitelist `"Linear"` and `"QuantizedLinear"` as LoRA-target
    # class names — FP8Linear is silently skipped, yielding 0 modules.
    # Rebuild the relevant chunks of those methods at import time to add
    # "FP8Linear" to the whitelist.
    import longcat_video.modules.lora_utils as _lu

    if getattr(_lu, "_NEXUS_FP8_PATCHED", False):
        return

    _orig_lora_module_init = _lu.LoRAModule.__init__
    _orig_network_init = _lu.LoRANetwork.__init__
    _whitelist = ("Linear", "QuantizedLinear", "FP8Linear")

    def _patched_lora_module_init(self, lora_name, org_module, *args, **kwargs):
        # Mirror upstream assert but include FP8Linear.
        cls = org_module.__class__.__name__
        assert cls in _whitelist, (
            f"LoRA target must be in {_whitelist}, got {cls}"
        )
        # Temporarily relax the upstream assertion by routing through the
        # original init with a fake-named wrapper. Simpler: replicate the
        # init body inline. But to avoid re-implementing every line we
        # cheat: alias the class name on this instance so the upstream
        # assert sees "Linear".
        original_class = org_module.__class__
        try:
            if cls == "FP8Linear":
                # Just rename the class in-place; restore after init.
                org_module.__class__ = type(
                    "Linear", (original_class,), {}
                )
            _orig_lora_module_init(self, lora_name, org_module, *args, **kwargs)
        finally:
            if cls == "FP8Linear":
                org_module.__class__ = original_class

    def _patched_network_init(self, model, lora_network_state_dict_loaded,
                              multiplier=1.0, lora_dim=128, alpha=64):
        # Patch the class-name check in the upstream init by temporarily
        # renaming every FP8Linear submodule before delegating.
        renamed: list[tuple[Any, type]] = []
        for module in model.modules():
            if module.__class__.__name__ == "FP8Linear":
                renamed.append((module, module.__class__))
                module.__class__ = type("Linear", (module.__class__,), {})
        try:
            _orig_network_init(
                self, model, lora_network_state_dict_loaded,
                multiplier=multiplier, lora_dim=lora_dim, alpha=alpha,
            )
        finally:
            for module, original_class in renamed:
                module.__class__ = original_class

    _lu.LoRAModule.__init__ = _patched_lora_module_init
    _lu.LoRANetwork.__init__ = _patched_network_init
    _lu._NEXUS_FP8_PATCHED = True
    logger.info(
        "_patch_lora_utils_for_fp8: extended LoRA target whitelist to %r",
        _whitelist,
    )


def _encode_lora_module_path(key: str) -> str:
    # Upstream LoRANetwork stores LoRAModule instances via `add_module(name)`
    # which forbids '.' in `name`. Upstream therefore encodes module paths
    # with `___lorahyphen___` separators (decoded back to '.' on lookup).
    # Kijai LoRA files ship with plain dot-separated paths — encode them
    # before handing to upstream.
    candidates: list[int] = []
    if ".lora_" in key:
        candidates.append(key.find(".lora_"))
    if key.endswith(".alpha"):
        candidates.append(len(key) - len(".alpha"))
    if not candidates:
        return key
    idx = min(candidates)
    prefix = key[:idx]
    suffix = key[idx:]
    return prefix.replace(".", "___lorahyphen___") + suffix


def _strip_diffusion_model_prefix(lora_sd: dict) -> dict:
    # Kijai LoRA files prefix every module path with `diffusion_model.`
    # (ComfyUI convention) AND use the Kijai block-attribute names
    # (`self_attn`, `modulation`, `norm3`, `self_attn.o`, etc.) instead of
    # the upstream LongCatVideoTransformer3DModel attribute names
    # (`attn`, `adaLN_modulation`, `pre_crs_attn_norm`, `attn.proj`, ...).
    #
    # Three transforms applied per key:
    #   1. Strip `diffusion_model.` ComfyUI prefix.
    #   2. Apply `longcat_native_loader.KJ_BLOCK_INTERNAL_RENAMES` so the
    #      module path lands on the upstream DiT's attribute names.
    #   3. Encode the module path with `___lorahyphen___` separators
    #      because upstream LoRANetwork uses `nn.Module.add_module()`
    #      which rejects '.' in submodule names.
    from .longcat_native_loader import (
        KJ_BLOCK_INTERNAL_RENAMES,
        KJ_TOP_LEVEL_PREFIX_RENAMES,
    )

    prefix = "diffusion_model."
    rewritten: dict = {}
    for k, v in lora_sd.items():
        key = k[len(prefix):] if k.startswith(prefix) else k
        # Top-level prefix rename (head→final_layer, patch_embedding→
        # x_embedder.proj, time_embedding→t_embedder.mlp, text_embedding→
        # y_embedder.y_proj).
        for kj_pref, up_pref in KJ_TOP_LEVEL_PREFIX_RENAMES.items():
            if key.startswith(kj_pref + ".") or key == kj_pref:
                key = up_pref + key[len(kj_pref):]
                break
        # Block-internal substring renames (self_attn→attn, etc.).
        for old, new in KJ_BLOCK_INTERNAL_RENAMES:
            if old in key:
                key = key.replace(old, new)
                break
        key = _encode_lora_module_path(key)
        rewritten[key] = v
    return rewritten


def _state_config_key(
    *, use_distill: bool, offload_mode: str, block_swap_count: int
) -> tuple:
    # Cache key for _STATE. Any field that materially changes how the
    # pipeline is constructed must be in here, otherwise a second
    # render() call w/ different knobs silently reuses the first config.
    attn = os.environ.get("NEXUS_VIDEO_LONGCAT_ATTN", "auto").lower()
    return (bool(use_distill), str(offload_mode), int(block_swap_count), attn)


def _ensure_state(
    host_data_dir: Optional[str] = None,
    use_distill: bool = False,
    offload_mode: str = "none",
    block_swap_count: int = 0,
) -> _PipelineState:
    global _STATE
    requested_key = _state_config_key(
        use_distill=use_distill,
        offload_mode=offload_mode,
        block_swap_count=block_swap_count,
    )
    if _STATE is not None:
        cached_key = getattr(_STATE, "config_key", None)
        # Reuse on match. Treat a missing config_key (legacy / test-injected
        # state) as compatible to avoid breaking callers that hand-build the
        # singleton.
        if cached_key is None or cached_key == requested_key:
            return _STATE
        logger.warning(
            "_ensure_state: config changed since last build "
            "(cached=%r, requested=%r). Rebuilding pipeline state.",
            cached_key,
            requested_key,
        )
        _STATE = None
        try:
            import torch as _t
            _t.cuda.empty_cache()
        except ImportError:
            pass

    import torch

    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    compute_dtype = torch.bfloat16

    model_dir, vendor_dir = _resolve_paths(host_data_dir)

    vstr = str(vendor_dir)
    if vstr not in sys.path:
        sys.path.insert(0, vstr)

    try:
        tokenizer, text_encoder = _load_text_encoder(model_dir, compute_dtype, device)
    except Exception as exc:
        raise RuntimeError(f"load_text_encoder failed: {exc}") from exc

    try:
        vae = _load_vae(model_dir, compute_dtype, device)
    except Exception as exc:
        raise RuntimeError(f"load_vae failed: {exc}") from exc

    try:
        scheduler = _load_scheduler(model_dir, use_distill=use_distill)
    except Exception as exc:
        raise RuntimeError(f"load_scheduler failed: {exc}") from exc

    try:
        dit = _load_dit(
            model_dir,
            vendor_dir,
            compute_dtype,
            device,
            host_data_dir,
            offload_mode=offload_mode,
            block_swap_count=block_swap_count,
        )
    except Exception as exc:
        raise RuntimeError(f"load_dit failed: {exc}") from exc

    try:
        pipeline = _build_pipeline(tokenizer, text_encoder, vae, scheduler, dit, vendor_dir)
    except Exception as exc:
        raise RuntimeError(f"build_pipeline failed: {exc}") from exc

    lora_network: Any = None
    if use_distill:
        lora_network = _maybe_load_distill_lora(dit, host_data_dir, vendor_dir)

    _STATE = _PipelineState(
        pipeline=pipeline,
        device=device,
        compute_dtype=compute_dtype,
        vendor_dir=vendor_dir,
        model_dir=model_dir,
        tokenizer=tokenizer,
        text_encoder=text_encoder,
        vae=vae,
        scheduler=scheduler,
        dit=dit,
        lora_network=lora_network,
    )
    _STATE.config_key = requested_key
    return _STATE


def _load_video_frames(video_path: str) -> Any:
    import numpy as np

    try:
        import cv2

        cap = cv2.VideoCapture(video_path)
        frames = []
        while True:
            ret, frame = cap.read()
            if not ret:
                break
            frames.append(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))
        cap.release()
        return np.array(frames, dtype=np.float32) / 255.0
    except Exception:
        pass

    try:
        from PIL import Image
        import imageio

        reader = imageio.get_reader(video_path)
        frames = [np.array(f, dtype=np.float32) / 255.0 for f in reader]
        reader.close()
        return np.array(frames)
    except Exception as exc:
        raise RuntimeError(
            f"_load_video_frames: cannot decode video {video_path!r}. "
            f"Install opencv-python or imageio. Original error: {exc}"
        ) from exc


def render(
    request: LongCatRenderRequest,
    *,
    output_dir: Optional[str] = None,
    host_data_dir: Optional[str] = None,
    offload_mode: Optional[str] = None,
    block_swap_count: Optional[int] = None,
    strict_scene_errors: bool = False,
    failures_out: Optional[list[dict[str, Any]]] = None,
) -> Path:
    import torch

    # Per-render override > kwarg > env-var > default. Request fields are
    # the highest-precedence source so a recipe can pin a tight residency
    # config (low-res draft + RTX upscale) without touching env or
    # editing the call site.
    if request.offload_mode is not None:
        offload_mode = request.offload_mode
    if offload_mode is None:
        offload_mode = os.environ.get("NEXUS_VIDEO_LONGCAT_OFFLOAD_MODE", "none")

    if request.block_swap_count is not None:
        block_swap_count = request.block_swap_count
    if block_swap_count is None:
        env_swap = os.environ.get("NEXUS_VIDEO_LONGCAT_BLOCK_SWAP")
        try:
            block_swap_count = int(env_swap) if env_swap is not None else 0
        except ValueError:
            logger.warning(
                "NEXUS_VIDEO_LONGCAT_BLOCK_SWAP=%r is not an integer; "
                "falling back to block_swap_count=0",
                env_swap,
            )
            block_swap_count = 0

    phase = "build_pipeline"
    try:
        state = _ensure_state(
            host_data_dir=host_data_dir,
            use_distill=request.use_distill,
            offload_mode=offload_mode,
            block_swap_count=block_swap_count,
        )
    except RuntimeError as exc:
        msg = str(exc)
        for candidate in ("load_dit", "load_vae", "load_text_encoder", "load_scheduler"):
            if candidate in msg:
                phase = candidate
                break
        raise _PipelineError(phase, str(exc)) from exc

    generator: Optional[torch.Generator] = None
    if request.seed is not None:
        generator = torch.Generator(device=str(state.device))
        generator.manual_seed(request.seed)

    attn_kwargs: dict[str, Any] = {}
    if request.offload_kv_cache:
        attn_kwargs["offload_kv_cache"] = True

    if request.scenes is not None and request.target_frames is not None:
        raise ValueError(
            "scenes and target_frames are mutually exclusive — set one"
        )

    phase = "generate"
    try:
        if request.scenes is not None and len(request.scenes) > 0:
            # First scene drives the initial t2v / i2v render using the
            # scene's own prompt + duration, then _run_scene_loop chains
            # the remaining scenes via generate_vc.
            primary_request = _request_with_scene_overrides(request, request.scenes[0])
            frames = _dispatch_generate(
                primary_request, state, generator, attn_kwargs
            )
        else:
            frames = _dispatch_generate(request, state, generator, attn_kwargs)
    except Exception as exc:
        raise _PipelineError("generate", str(exc)) from exc

    scenes_path_refined = False
    if request.scenes is not None and len(request.scenes) > 1:
        phase = "scenes"
        scene_failures: list[dict[str, Any]] = []
        try:
            frames = _run_scene_loop(
                primary_frames=frames,
                request=request,
                state=state,
                generator=generator,
                attn_kwargs=attn_kwargs,
                host_data_dir=host_data_dir,
                strict_scene_errors=strict_scene_errors,
                failures_sink=scene_failures,
            )
            scenes_path_refined = bool(request.apply_refinement)
        except Exception as exc:
            if strict_scene_errors:
                raise _PipelineError("scenes", str(exc)) from exc
            logger.warning(
                "scene loop failed (%s); returning first-scene clip only", exc
            )
        if failures_out is not None and scene_failures:
            failures_out.extend(scene_failures)

    if request.target_frames is not None and request.mode in ("t2v", "i2v", "vc"):
        import numpy as np

        arr = np.asarray(frames)
        if arr.ndim == 5:
            arr = arr[0]
        if arr.shape[0] < request.target_frames:
            phase = "continuation"
            try:
                frames = _run_continuation_loop(
                    primary_frames=arr,
                    request=request,
                    state=state,
                    generator=generator,
                    attn_kwargs=attn_kwargs,
                )
            except Exception as exc:
                logger.warning(
                    "continuation loop failed (%s); returning primary clip only",
                    exc,
                )
                frames = arr

    # When RTX upscale is enabled, skip the model-based refinement pass.
    # Rationale: refinement was a workaround for distill smudge at 720p,
    # which doubled the DiT latent count and spilled past 16 GiB even
    # with spatial_only + block-swap=46. RTX VideoSuperRes handles
    # spatial polish + denoise without touching the DiT, so the two
    # post-processes are redundant + the refinement is the one that
    # spills VRAM.
    skip_refine_for_rtx = (
        request.apply_refinement
        and request.rtx_upscale_scale is not None
        and request.rtx_upscale_scale > 1
        and not request.force_refinement_with_upscale
    )
    if skip_refine_for_rtx:
        logger.info(
            "skipping refinement pass: rtx_upscale_scale=%d is the spatial "
            "polish stage (refinement would double DiT latents + spill VRAM); "
            "set force_refinement_with_upscale=True to keep both passes",
            request.rtx_upscale_scale,
        )
    elif (
        request.apply_refinement
        and request.rtx_upscale_scale is not None
        and request.rtx_upscale_scale > 1
        and request.force_refinement_with_upscale
    ):
        logger.info(
            "force_refinement_with_upscale=True: running refinement pass "
            "BEFORE rtx upscale (model polish at draft res, then RTX scale)",
        )

    if (
        request.apply_refinement
        and request.mode in ("t2v", "i2v")
        and not skip_refine_for_rtx
        and not scenes_path_refined
    ):
        # Two-stage quality pass: write draft to a temp MP4 + run
        # generate_refine on it. Refinement LoRA + low-CFG few-step
        # second pass cleans up distill smudge + 720p artifacts.
        #
        # Skipped when scenes mode already refined each clip in-flight
        # (refining the joined output would over-process the boundaries
        # AND spill VRAM at >49 frame counts).
        phase = "refinement"
        try:
            frames = _run_refinement_pass(
                draft_frames=frames,
                request=request,
                state=state,
                host_data_dir=host_data_dir,
                generator=generator,
                attn_kwargs=attn_kwargs,
            )
        except Exception as exc:
            logger.warning(
                "refinement pass failed (%s); falling back to draft frames",
                exc,
            )
    elif scenes_path_refined:
        logger.info(
            "skipping global refinement: scenes mode already refined "
            "each clip in-flight",
        )

    if (
        request.rtx_upscale_scale is not None
        and request.rtx_upscale_scale > 1
    ):
        phase = "rtx_upscale"
        try:
            from . import upscale_rtx

            available, reason = upscale_rtx.is_rtx_vfx_available()
            if not available:
                logger.warning(
                    "rtx upscale requested but unavailable (%s); writing "
                    "un-upscaled frames", reason,
                )
            else:
                frames = upscale_rtx.upscale_frames(
                    frames,
                    scale=request.rtx_upscale_scale,
                    quality=request.rtx_upscale_quality,
                )
        except Exception as exc:
            logger.warning(
                "rtx upscale failed (%s); writing un-upscaled frames", exc,
            )

    if output_dir:
        out_dir = Path(output_dir)
    else:
        out_dir = Path(tempfile.mkdtemp(prefix="nexus_longcat_"))

    out_dir.mkdir(parents=True, exist_ok=True)
    run_id = f"{int(time.time() * 1000)}"
    output_path = out_dir / f"{run_id}.mp4"

    import numpy as np

    arr = np.asarray(frames)
    if arr.ndim == 5:
        arr = arr[0]

    from .ffmpeg_io import write_video_frames

    write_video_frames(arr, fps=24, path=output_path)
    return output_path


def _run_refinement_pass(
    *,
    draft_frames: Any,
    request: LongCatRenderRequest,
    state: _PipelineState,
    host_data_dir: Optional[str],
    generator: Any,
    attn_kwargs: dict[str, Any],
) -> Any:
    # Stage 2: refinement LoRA + low-CFG few-step generate_refine on the
    # draft frames. Refinement LoRA is purpose-built for this pass and
    # must NOT be merged into FP8 weights (Kijai rule). Apply additively
    # before generate_refine and remove after.
    #
    # Upstream `generate_refine(stage1_video=...)` type hint says `Optional[str]`
    # but the body calls `.height`/`.width` on `stage1_video[0]` and runs
    # `np.array(stage1_video)` on the iterable — i.e. it expects a list
    # of PIL Images, not a file path. Type hint is wrong upstream.
    import numpy as np
    from PIL import Image

    # FU-LORA-DETACH (2026-05-24): the distill LoRA loaded earlier sits on
    # GPU consuming ~5 GiB of bf16 rank-128 LoRA tensors. Refinement
    # loads a SECOND rank-128 LoRA on top, stacking dual-LoRA to ~10 GiB
    # of pure LoRA tensors + 720p activations + DiT residency → spills
    # past 16 GiB on Blackwell.
    #
    # Move distill LoRA params to CPU before loading refinement; restore
    # in the finally block so subsequent renders in the same _PipelineState
    # retain it. set_use_lora(False) + .to('cpu') is safe even if the
    # LoRA is wired into DiT forward (use_lora gate skips the hook
    # before any device-mismatched op runs).
    import torch as _torch

    distill_was_resident = False
    distill_was_active = False
    if state.lora_network is not None:
        try:
            distill_was_active = bool(getattr(state.lora_network, "use_lora", True))
            if hasattr(state.lora_network, "set_use_lora"):
                state.lora_network.set_use_lora(False)
            state.lora_network.to("cpu")
            distill_was_resident = True
            _torch.cuda.empty_cache()
            logger.info(
                "_run_refinement_pass: distill LoRA detached to CPU (use_lora=%s -> False) "
                "before loading refinement LoRA",
                distill_was_active,
            )
        except Exception as exc:
            logger.warning(
                "distill LoRA detach failed (%s); proceeding anyway", exc
            )

    refinement_net = _maybe_load_refinement_lora(state.dit, host_data_dir, state.vendor_dir)
    if refinement_net is None:
        logger.warning(
            "_run_refinement_pass: refinement LoRA not loaded; skipping pass."
        )
        # Re-attach distill before bailing out so the next render is not
        # left with the LoRA stranded on CPU.
        if distill_was_resident and state.lora_network is not None:
            try:
                state.lora_network.to(state.device)
                if hasattr(state.lora_network, "set_use_lora"):
                    state.lora_network.set_use_lora(distill_was_active)
            except Exception as exc:
                logger.warning("distill LoRA re-attach failed (%s)", exc)
        return draft_frames

    arr = np.asarray(draft_frames)
    if arr.ndim == 5:
        arr = arr[0]
    if arr.dtype != np.uint8:
        arr = np.clip(arr, 0.0, 1.0) if arr.dtype.kind == "f" and arr.max() <= 1.0 else arr
        if arr.dtype.kind == "f":
            arr = (arr * 255.0).round().clip(0, 255).astype(np.uint8)
        else:
            arr = arr.astype(np.uint8)

    pil_frames = [Image.fromarray(frame, mode="RGB") for frame in arr]

    logger.info(
        "_run_refinement_pass: running generate_refine (%d frames, %dx%d, %d-step)",
        len(pil_frames),
        arr.shape[2],
        arr.shape[1],
        request.refinement_steps,
    )

    try:
        # generate_refine accepts: image, video, prompt, stage1_video,
        # num_cond_frames, num_inference_steps, num_videos_per_prompt,
        # generator, latents, output_type, return_dict, attention_kwargs,
        # max_sequence_length, t_thresh, spatial_refine_only.
        # NOT accepted: negative_prompt, num_frames, use_distill, guidance_scale.
        refined = state.pipeline.generate_refine(
            stage1_video=pil_frames,
            prompt=request.prompt,
            num_inference_steps=request.refinement_steps,
            generator=generator,
            max_sequence_length=request.max_sequence_length,
            attention_kwargs=attn_kwargs if attn_kwargs else None,
            spatial_refine_only=request.refinement_spatial_only,
        )
    finally:
        # Best-effort refinement-LoRA detach so subsequent renders don't
        # carry it. Move refinement tensors off GPU regardless of how
        # the pass exited (success, OOM, or any other exception).
        try:
            refinement_net.to("cpu")
        except Exception as exc:
            logger.warning("refinement LoRA -> cpu failed: %s", exc)
        try:
            if hasattr(refinement_net, "unapply"):
                refinement_net.unapply()
            elif hasattr(refinement_net, "detach"):
                refinement_net.detach()
        except Exception as exc:
            logger.warning("refinement LoRA unapply failed: %s", exc)
        del refinement_net
        _torch.cuda.empty_cache()

        # Re-attach distill LoRA to GPU for the next render. Skipped on
        # the bail-out path above; only fires when refinement actually ran.
        if distill_was_resident and state.lora_network is not None:
            try:
                state.lora_network.to(state.device)
                if hasattr(state.lora_network, "set_use_lora"):
                    state.lora_network.set_use_lora(distill_was_active)
                logger.info(
                    "_run_refinement_pass: distill LoRA re-attached to %s "
                    "(use_lora=%s)",
                    state.device, distill_was_active,
                )
            except Exception as exc:
                logger.warning("distill LoRA re-attach failed (%s)", exc)

    return refined


def _maybe_load_refinement_lora(
    dit: Any, host_data_dir: Optional[str], vendor_dir: Path
) -> Any:
    root_str = host_data_dir or os.environ.get("NEXUS_HOST_DATA_DIR")
    if not root_str:
        return None

    lora_path = Path(root_str) / "models" / _KIJAI_REPO_SUBDIR / _REFINEMENT_LORA_FILENAME
    if not lora_path.exists():
        logger.warning(
            "_maybe_load_refinement_lora: not found at %s — refinement pass skipped",
            lora_path,
        )
        return None

    vstr = str(vendor_dir)
    if vstr not in sys.path:
        sys.path.insert(0, vstr)

    try:
        from safetensors.torch import load_file
        from longcat_video.modules.lora_utils import create_lora_network

        _patch_lora_utils_for_fp8()
        lora_sd = load_file(str(lora_path), device="cpu")
        lora_sd = _strip_diffusion_model_prefix(lora_sd)
        network = create_lora_network(
            transformer=dit,
            lora_network_state_dict_loaded=lora_sd,
            multiplier=1.0,
            network_dim=128,
            network_alpha=128.0,
        )
        import torch
        network = network.to(dtype=torch.bfloat16, device=next(dit.parameters()).device)
        logger.info(
            "_maybe_load_refinement_lora: loaded from %s (%d modules)",
            lora_path,
            len(network.loras),
        )
        return network
    except Exception as exc:
        logger.warning("_maybe_load_refinement_lora: failed (%s)", exc)
        return None


def _run_continuation_loop(
    *,
    primary_frames: Any,
    request: LongCatRenderRequest,
    state: _PipelineState,
    generator: Any,
    attn_kwargs: dict[str, Any],
) -> Any:
    # Native long-video orchestration: chain generate_vc(use_kv_cache=True)
    # calls until total frame count reaches request.target_frames.
    #
    # Each iteration:
    #   1. Take last `overlap` frames of accumulated output as cond video
    #      (list of PIL Images — upstream signature).
    #   2. Call generate_vc with num_cond_frames=overlap, num_frames=req.num_frames.
    #   3. Drop the first `overlap` frames of the returned clip (= the
    #      conditioning frames upstream regenerates verbatim).
    #   4. Concat fresh frames to accumulator.
    #
    # Clears KV-cache on entry only; subsequent calls reuse cache across
    # the chain for temporal coherence. Final accumulator trimmed to
    # exactly target_frames.
    import numpy as np
    from PIL import Image

    pipeline = state.pipeline
    overlap = request.continuation_overlap_frames
    target = request.target_frames
    assert target is not None, "_run_continuation_loop called without target_frames"

    if overlap <= 0:
        raise ValueError(
            f"continuation_overlap_frames must be > 0, got {overlap}"
        )

    enhance_hf = (
        request.continuation_enhance_hf
        if request.continuation_enhance_hf is not None
        else (not request.use_distill)
    )
    if request.use_distill and enhance_hf:
        raise ValueError(
            "use_distill=True is incompatible with continuation_enhance_hf=True "
            "(upstream asserts mutual exclusion). Set continuation_enhance_hf=False."
        )

    resolution = "720p" if request.height >= 720 else "480p"

    if hasattr(pipeline, "_clear_cache"):
        try:
            pipeline._clear_cache()
        except Exception as exc:
            logger.warning("_clear_cache failed (%s); proceeding anyway", exc)

    acc = np.asarray(primary_frames)
    if acc.ndim == 5:
        acc = acc[0]

    iteration = 0
    while acc.shape[0] < target:
        iteration += 1
        tail = acc[-overlap:]
        if tail.dtype.kind == "f":
            tail_u8 = (np.clip(tail, 0.0, 1.0) * 255.0).round().astype(np.uint8)
        else:
            tail_u8 = tail.astype(np.uint8) if tail.dtype != np.uint8 else tail
        tail_pil = [Image.fromarray(f, mode="RGB") for f in tail_u8]

        logger.info(
            "_run_continuation_loop iter=%d: acc=%d target=%d overlap=%d "
            "calling generate_vc(num_frames=%d enhance_hf=%s use_distill=%s)",
            iteration,
            acc.shape[0],
            target,
            overlap,
            request.num_frames,
            enhance_hf,
            request.use_distill,
        )

        new_clip = pipeline.generate_vc(
            video=tail_pil,
            prompt=request.prompt,
            negative_prompt=request.negative_prompt,
            resolution=resolution,
            num_frames=request.num_frames,
            num_cond_frames=overlap,
            num_inference_steps=request.num_inference_steps,
            use_distill=request.use_distill,
            guidance_scale=request.guidance_scale,
            generator=generator,
            max_sequence_length=request.max_sequence_length,
            attention_kwargs=attn_kwargs if attn_kwargs else None,
            use_kv_cache=True,
            offload_kv_cache=request.offload_kv_cache,
            enhance_hf=enhance_hf,
        )

        new_arr = np.asarray(new_clip)
        if new_arr.ndim == 5:
            new_arr = new_arr[0]
        if new_arr.shape[0] <= overlap:
            logger.warning(
                "_run_continuation_loop iter=%d: generate_vc returned %d frames "
                "(<= overlap %d); breaking to avoid infinite loop",
                iteration,
                new_arr.shape[0],
                overlap,
            )
            break
        fresh = new_arr[overlap:]
        acc = np.concatenate([acc, fresh], axis=0)
        logger.info(
            "_run_continuation_loop iter=%d done: added %d fresh frames "
            "(total=%d)",
            iteration,
            fresh.shape[0],
            acc.shape[0],
        )

    if acc.shape[0] > target:
        acc = acc[:target]
    logger.info(
        "_run_continuation_loop complete: iterations=%d total_frames=%d",
        iteration,
        acc.shape[0],
    )
    return acc


def _request_with_scene_overrides(
    base: LongCatRenderRequest, scene: Scene
) -> LongCatRenderRequest:
    # Build a per-scene request: override prompt + num_frames from the
    # scene spec while keeping everything else (resolution, distill,
    # guidance, seed) inherited from the base request. num_frames is
    # quantised to the (n - 1) % 4 == 0 constraint upstream enforces
    # (vae_scale_factor_temporal = 4 for LongCat).
    from dataclasses import replace

    raw_frames = max(1, int(round(scene.duration_seconds * 24)))
    quantised = ((raw_frames - 1) // 4) * 4 + 1
    if quantised < 5:
        quantised = 5
    adain = base.adain_factor if scene.adain_factor is None else scene.adain_factor
    use_distill = base.use_distill if scene.use_distill is None else scene.use_distill
    guidance = (
        base.guidance_scale if scene.guidance_scale is None else scene.guidance_scale
    )
    steps = (
        base.num_inference_steps
        if scene.num_inference_steps is None
        else scene.num_inference_steps
    )
    return replace(
        base,
        prompt=scene.prompt,
        num_frames=quantised,
        adain_factor=adain,
        use_distill=use_distill,
        guidance_scale=guidance,
        num_inference_steps=steps,
        # Disable nested orchestration when this request is used for a
        # single scene's primary or continuation render.
        scenes=None,
        target_frames=None,
    )


def _set_distill_active(state: _PipelineState, target_active: bool) -> Optional[bool]:
    # Toggle distill LoRA between GPU-active and CPU-detached.
    #
    # When scene N flips use_distill from prior pipeline state, the distill
    # LoRA must be physically moved off GPU (set_use_lora False + .to('cpu'))
    # before running generate_vc — otherwise the LoRA hook still injects
    # rank-128 deltas into every Linear forward and contaminates dev-model
    # output. Mirrors the FU-LORA-DETACH pattern from _run_refinement_pass
    # (2026-05-24) but for per-scene model swaps inside the scene loop.
    #
    # Returns the previous `use_lora` flag so the caller can restore the
    # state at the next iteration or in a finally block. Returns None if
    # state.lora_network is missing (no distill ever loaded — base request
    # was already use_distill=False; nothing to toggle).
    if state.lora_network is None:
        return None
    import torch as _torch

    try:
        previous_active = bool(getattr(state.lora_network, "use_lora", True))
        if previous_active == target_active:
            return previous_active
        if hasattr(state.lora_network, "set_use_lora"):
            state.lora_network.set_use_lora(target_active)
        if target_active:
            state.lora_network.to(state.device)
        else:
            state.lora_network.to("cpu")
            _torch.cuda.empty_cache()
        logger.info(
            "_set_distill_active: distill LoRA use_lora=%s -> %s",
            previous_active, target_active,
        )
        return previous_active
    except Exception as exc:
        logger.warning(
            "_set_distill_active(%s) failed (%s); LoRA state may be stale",
            target_active, exc,
        )
        return None


def _build_scene_generator(
    base_seed: Optional[int], scene_idx: int, seed_offset: Optional[int], device: Any
) -> Any:
    import torch as _torch

    try:
        _torch.cuda.synchronize()
    except (AssertionError, RuntimeError):
        pass
    seed_root = int(base_seed) if base_seed is not None else 0
    derived = (seed_root + scene_idx * 1_000_003 + int(seed_offset or 0)) & 0x7FFFFFFF
    return _torch.Generator(device).manual_seed(derived)


def _run_scene_loop(
    *,
    primary_frames: Any,
    request: LongCatRenderRequest,
    state: _PipelineState,
    generator: Any,
    attn_kwargs: dict[str, Any],
    host_data_dir: Optional[str] = None,
    strict_scene_errors: bool = False,
    failures_sink: Optional[list] = None,
) -> Any:
    # Multi-scene chained render. Each scene after the first calls
    # generate_vc with use_kv_cache=False — the KV cache is cleared
    # explicitly between scenes so the prior scene's text-token cache
    # cannot bleed into the new scene's denoise.
    #
    # Accumulator semantics: scene N contributes `quantised_frames - overlap`
    # fresh frames (the leading `overlap` frames upstream regenerates
    # verbatim and are dropped from the output).
    #
    # Per-scene refinement (2026-05-24): when request.apply_refinement is
    # True, refinement is applied to EACH rendered clip in-flight, BEFORE
    # the overlap-drop concat. Refining a 49-57 frame clip at 720p fits
    # in 16 GiB after distill-detach; refining the JOINED 97-frame output
    # spilled past the budget. The refined tail also becomes a
    # higher-quality cond input for the next scene's generate_vc.
    # render() skips its global refinement call when scenes refinement
    # has already run.
    import numpy as np
    from PIL import Image

    pipeline = state.pipeline
    scenes = request.scenes or []
    if len(scenes) < 2:
        return primary_frames

    resolution = "720p" if request.height >= 720 else "480p"

    do_refine = bool(request.apply_refinement)

    base_seed = request.seed

    def _maybe_refine(clip_frames: Any, scene_idx: int, scene_obj: Any) -> Any:
        if not do_refine:
            return clip_frames
        scene_request = _request_with_scene_overrides(request, scene_obj)
        logger.info(
            "_run_scene_loop scene=%d: per-scene refinement pass "
            "(%d frames, %d step)",
            scene_idx,
            np.asarray(clip_frames).shape[0],
            request.refinement_steps,
        )
        try:
            return _run_refinement_pass(
                draft_frames=clip_frames,
                request=scene_request,
                state=state,
                host_data_dir=host_data_dir,
                generator=generator,
                attn_kwargs=attn_kwargs,
            )
        except Exception as exc:
            logger.warning(
                "_run_scene_loop scene=%d: per-scene refinement failed "
                "(%s); using draft clip",
                scene_idx, exc,
            )
            return clip_frames

    acc = np.asarray(primary_frames)
    if acc.ndim == 5:
        acc = acc[0]

    # Refine scene 1 (the initial t2v/i2v primary) before scene 2 reads
    # its tail. The first scene gets the same per-clip refinement
    # treatment as the rest so the entire output is consistent quality.
    acc = _maybe_refine(acc, 1, scenes[0])
    acc = np.asarray(acc)
    if acc.ndim == 5:
        acc = acc[0]

    # Capture the colour anchor from the refined scene-1 output. Used by
    # scene-N>1 AdaIN to cap per-channel drift across the chain. Computed
    # on uint8 RGB so it matches the units we pass into generate_vc.
    color_anchor = None
    if any(
        (s.adain_factor if s.adain_factor is not None else request.adain_factor) > 0
        for s in scenes[1:]
    ):
        from .chaining import compute_color_anchor

        anchor_src = acc
        if anchor_src.dtype.kind == "f":
            anchor_u8 = (np.clip(anchor_src, 0.0, 1.0) * 255.0).round().astype(np.uint8)
        else:
            anchor_u8 = (
                anchor_src.astype(np.uint8)
                if anchor_src.dtype != np.uint8
                else anchor_src
            )
        color_anchor = compute_color_anchor(anchor_u8)
        logger.info(
            "_run_scene_loop: captured color anchor mean=%s std=%s",
            np.round(color_anchor[0], 2).tolist(),
            np.round(color_anchor[1], 2).tolist(),
        )

    from .scene_failure import build_failure_record

    for idx, scene in enumerate(scenes[1:], start=2):
        scene_req = _request_with_scene_overrides(request, scene)
        overlap = int(scene.overlap_frames)
        if overlap < 1 or overlap >= scene_req.num_frames:
            raise ValueError(
                f"scene {idx} overlap_frames={overlap} must be in "
                f"[1, {scene_req.num_frames - 1}]"
            )

        enhance_hf = (
            scene.enhance_hf
            if scene.enhance_hf is not None
            else (not scene_req.use_distill)
        )
        if scene_req.use_distill and enhance_hf:
            raise ValueError(
                f"scene {idx}: use_distill=True is mutually exclusive with "
                "enhance_hf=True (upstream asserts). Set scene.enhance_hf=False."
            )

        try:
            scene_generator = _build_scene_generator(
                base_seed, idx - 1, scene.seed_offset, state.device
            )
        except Exception:
            scene_generator = generator

        if hasattr(pipeline, "_clear_cache"):
            try:
                pipeline._clear_cache()
            except Exception as exc:
                logger.warning(
                    "scene %d: _clear_cache failed (%s); proceeding anyway",
                    idx, exc,
                )

        tail = acc[-overlap:]
        if tail.dtype.kind == "f":
            tail_u8 = (np.clip(tail, 0.0, 1.0) * 255.0).round().astype(np.uint8)
        else:
            tail_u8 = tail.astype(np.uint8) if tail.dtype != np.uint8 else tail

        if color_anchor is not None and scene_req.adain_factor > 0:
            from .chaining import adain_color_match

            pre_mean = tail_u8.astype(np.float32).mean(axis=(0, 1, 2))
            tail_u8 = adain_color_match(
                tail_u8, color_anchor, factor=scene_req.adain_factor
            )
            post_mean = tail_u8.astype(np.float32).mean(axis=(0, 1, 2))
            logger.info(
                "_run_scene_loop scene=%d: AdaIN factor=%.2f anchor_mean=%s "
                "pre_mean=%s post_mean=%s",
                idx, scene_req.adain_factor,
                np.round(color_anchor[0], 1).tolist(),
                np.round(pre_mean, 1).tolist(),
                np.round(post_mean, 1).tolist(),
            )

        tail_pil = [Image.fromarray(f, mode="RGB") for f in tail_u8]

        logger.info(
            "_run_scene_loop scene=%d acc=%d overlap=%d num_frames=%d "
            "use_distill=%s guidance=%.2f steps=%d prompt=%r enhance_hf=%s",
            idx, acc.shape[0], overlap, scene_req.num_frames,
            scene_req.use_distill, scene_req.guidance_scale,
            scene_req.num_inference_steps,
            scene.prompt[:80], enhance_hf,
        )

        # Plan B (2026-05-25): toggle distill LoRA to match scene's
        # use_distill before generate_vc. Detaches the rank-128 LoRA off
        # GPU when a scene wants dev-model output (more prompt influence
        # for big prompt-deltas), re-attaches when next scene wants
        # distill. No-op when state matches or no LoRA was loaded.
        _set_distill_active(state, scene_req.use_distill)

        scene_icn = (
            scene.image_cond_noise_scale
            if scene.image_cond_noise_scale is not None
            else request.image_cond_noise_scale
        )

        vc_kwargs: dict[str, Any] = dict(
            video=tail_pil,
            prompt=scene.prompt,
            negative_prompt=request.negative_prompt,
            resolution=resolution,
            num_frames=scene_req.num_frames,
            num_cond_frames=overlap,
            num_inference_steps=scene_req.num_inference_steps,
            use_distill=scene_req.use_distill,
            guidance_scale=scene_req.guidance_scale,
            generator=scene_generator,
            max_sequence_length=request.max_sequence_length,
            attention_kwargs=attn_kwargs if attn_kwargs else None,
            use_kv_cache=False,
            offload_kv_cache=request.offload_kv_cache,
            enhance_hf=enhance_hf,
            image_cond_noise_scale=scene_icn,
        )
        try:
            try:
                new_clip = pipeline.generate_vc(**vc_kwargs)
            except TypeError:
                vc_kwargs.pop("image_cond_noise_scale", None)
                new_clip = pipeline.generate_vc(**vc_kwargs)
        except Exception as exc:
            if strict_scene_errors:
                raise
            record = build_failure_record(exc, idx - 1)
            if failures_sink is not None:
                failures_sink.append(record)
            logger.warning(
                "_run_scene_loop scene=%d failed (%s); stopping after %d frames",
                idx, record["code"], acc.shape[0],
            )
            break

        new_arr = np.asarray(new_clip)
        if new_arr.ndim == 5:
            new_arr = new_arr[0]
        if new_arr.shape[0] <= overlap:
            logger.warning(
                "_run_scene_loop scene=%d: generate_vc returned %d frames "
                "(<= overlap %d); skipping rest",
                idx, new_arr.shape[0], overlap,
            )
            break

        new_arr = _maybe_refine(new_arr, idx, scene)
        new_arr = np.asarray(new_arr)
        if new_arr.ndim == 5:
            new_arr = new_arr[0]

        fresh = new_arr[overlap:]
        acc = np.concatenate([acc, fresh], axis=0)
        logger.info(
            "_run_scene_loop scene=%d done: added %d fresh frames (total=%d)",
            idx, fresh.shape[0], acc.shape[0],
        )

    logger.info(
        "_run_scene_loop complete: scenes=%d total_frames=%d",
        len(scenes), acc.shape[0],
    )
    return acc


def _dispatch_generate(
    request: LongCatRenderRequest,
    state: _PipelineState,
    generator: Any,
    attn_kwargs: dict[str, Any],
) -> Any:
    pipeline = state.pipeline

    common = dict(
        prompt=request.prompt,
        negative_prompt=request.negative_prompt,
        num_frames=request.num_frames,
        num_inference_steps=request.num_inference_steps,
        use_distill=request.use_distill,
        guidance_scale=request.guidance_scale,
        generator=generator,
        max_sequence_length=request.max_sequence_length,
        attention_kwargs=attn_kwargs if attn_kwargs else None,
    )

    if request.mode == "t2v":
        return pipeline.generate_t2v(
            height=request.height,
            width=request.width,
            **common,
        )

    if request.mode == "i2v":
        if not request.image_path:
            raise ValueError("i2v mode requires image_path")
        from PIL import Image

        pil_image = Image.open(request.image_path).convert("RGB")
        resolution = "720p" if request.height >= 720 else "480p"
        common_no_hw = {k: v for k, v in common.items()}
        return pipeline.generate_i2v(
            image=pil_image,
            resolution=resolution,
            **common_no_hw,
        )

    if request.mode == "vc":
        if not request.conditioning_video_path:
            raise ValueError("vc mode requires conditioning_video_path")
        import numpy as np
        from PIL import Image

        raw = _load_video_frames(request.conditioning_video_path)
        frames_pil = [Image.fromarray((f * 255).clip(0, 255).astype("uint8")) for f in raw]
        resolution = "720p" if request.height >= 720 else "480p"
        # `offload_kv_cache` is already routed through attention_kwargs via
        # `common` (see attn_kwargs build above). Passing it again as a bare
        # kwarg here would either shadow the attention_kwargs entry or
        # raise TypeError on generate_vc(...) signatures that don't accept
        # it as a top-level arg. Audit 2026-05-24 caught this.
        return pipeline.generate_vc(
            video=frames_pil,
            resolution=resolution,
            **common,
        )

    if request.mode == "refine":
        if not request.low_res_video_path:
            raise ValueError("refine mode requires low_res_video_path")
        return pipeline.generate_refine(
            stage1_video=request.low_res_video_path,
            **{k: v for k, v in common.items() if k not in ("guidance_scale", "use_distill")},
        )

    raise ValueError(f"Unknown render mode: {request.mode!r}")


class _PipelineError(RuntimeError):
    def __init__(self, phase: str, message: str) -> None:
        super().__init__(message)
        self.phase = phase


def _parse_scene(raw: dict[str, Any]) -> Scene:
    duration = raw.get("per_scene_generated_seconds")
    if duration is None:
        duration = raw.get("duration_seconds", 4.0)
    return Scene(
        prompt=raw["prompt"],
        duration_seconds=float(duration),
        overlap_frames=int(raw.get("overlap_frames", 13)),
        enhance_hf=raw.get("enhance_hf"),
        adain_factor=raw.get("adain_factor"),
        use_distill=raw.get("use_distill"),
        guidance_scale=raw.get("guidance_scale"),
        num_inference_steps=raw.get("num_inference_steps"),
        negative_prompt=raw.get("negative_prompt"),
        mode=raw.get("mode", "auto"),
        image_path=raw.get("image_path"),
        per_scene_generated_seconds=float(duration),
        image_cond_noise_scale=raw.get("image_cond_noise_scale"),
        motion_intensity=raw.get("motion_intensity", "dynamic"),
        seed_offset=raw.get("seed_offset"),
        apply_refinement=raw.get("apply_refinement"),
        refinement_steps=raw.get("refinement_steps"),
        refinement_guidance=raw.get("refinement_guidance"),
        refinement_spatial_only=raw.get("refinement_spatial_only"),
    )


def register_longcat_handlers(worker: Any, *, use_distill: bool = False) -> None:
    async def _plan_validate(params: dict[str, Any]) -> dict[str, Any]:
        from .plan_validate import validate_plan
        return validate_plan(params or {})

    async def _plan_expand(params: dict[str, Any]) -> dict[str, Any]:
        import asyncio
        from .plan_llm import default_lease_client, expand_prompt
        from .compile_storyboard import StoryboardCompileError
        use_llm = bool(params.get("use_llm", False))
        lease_client = default_lease_client() if use_llm else None
        try:
            result = await asyncio.to_thread(
                expand_prompt,
                prompt=str(params.get("prompt", "")),
                duration_seconds=float(params.get("duration_seconds", 0.0)),
                scene_count=int(params.get("scene_count", 1)),
                style_hint=params.get("style_hint"),
                seed=int(params.get("seed", 42)),
                use_llm=use_llm,
                lease_client=lease_client,
            )
            return result.to_dict()
        except StoryboardCompileError as exc:
            return {"status": "error", "code": -32108, **exc.to_error_payload()}

    async def _render_start(params: dict[str, Any]) -> dict[str, Any]:
        if use_distill:
            params.setdefault("use_distill", True)
            params.setdefault("guidance_scale", 1.0)
            # 16 = distill LoRA training step count (LongCat paper Sec. 4.2).
            # Running below this with distill produces bursty motion pacing
            # because FlowMatchEuler timestep allocation is compressed past
            # the LoRA's training distribution.
            params.setdefault("num_inference_steps", 16)

        scenes_raw = params.get("scenes")
        scenes_parsed: Optional[list[Scene]] = None
        plan_warnings: list[dict[str, Any]] = []
        if isinstance(scenes_raw, list) and len(scenes_raw) > 0:
            from .plan_validate import validate_plan
            validation = validate_plan(params)
            if not validation.get("ok"):
                err = validation["error"]
                return {
                    "status": "error",
                    "code": -32108,
                    "message": err.get("detail", "PLAN_INVALID"),
                    "phase": "plan_validate",
                    "data": err,
                }
            plan_warnings = validation.get("warnings", [])
            scenes_parsed = [_parse_scene(s) for s in scenes_raw]
            normalized_scenes = validation["normalized"]["scenes"]
            if scenes_parsed and normalized_scenes:
                params.setdefault("mode", normalized_scenes[0]["mode"])
                params.setdefault("prompt", normalized_scenes[0]["prompt"])

        if "prompt" not in params or not params["prompt"]:
            return {
                "status": "error",
                "code": -32602,
                "message": "prompt is required when scenes[] is not provided",
                "phase": "params",
            }

        strict_scene_errors = bool(params.get("strict_scene_errors", False))

        request = LongCatRenderRequest(
            mode=params.get("mode", "t2v"),
            prompt=params["prompt"],
            negative_prompt=params.get("negative_prompt"),
            image_path=params.get("image_path"),
            conditioning_video_path=params.get("conditioning_video_path"),
            low_res_video_path=params.get("low_res_video_path"),
            height=int(params.get("height", 480)),
            width=int(params.get("width", 832)),
            num_frames=int(params.get("num_frames", 93)),
            num_inference_steps=int(params.get("num_inference_steps", 50)),
            guidance_scale=float(params.get("guidance_scale", 4.0)),
            use_distill=bool(params.get("use_distill", use_distill)),
            seed=params.get("seed"),
            max_sequence_length=int(params.get("max_sequence_length", 512)),
            offload_kv_cache=bool(params.get("offload_kv_cache", False)),
            apply_refinement=bool(params.get("apply_refinement", False)),
            refinement_steps=int(params.get("refinement_steps", 12)),
            refinement_guidance=float(params.get("refinement_guidance", 1.0)),
            refinement_spatial_only=bool(params.get("refinement_spatial_only", True)),
            target_frames=params.get("target_frames"),
            continuation_overlap_frames=int(params.get("continuation_overlap_frames", 13)),
            continuation_enhance_hf=params.get("continuation_enhance_hf"),
            scenes=scenes_parsed,
            rtx_upscale_scale=params.get("rtx_upscale_scale"),
            rtx_upscale_quality=params.get("rtx_upscale_quality", "HIGH"),
            force_refinement_with_upscale=bool(
                params.get("force_refinement_with_upscale")
                or params.get("force_refine_with_upscale", False)
            ),
            offload_mode=params.get("offload_mode"),
            block_swap_count=params.get("block_swap_count"),
            adain_factor=float(params.get("adain_factor", 0.0)),
            image_cond_noise_scale=float(params.get("image_cond_noise_scale", 0.15)),
        )

        host_data_dir = params.get("host_data_dir") or os.environ.get("NEXUS_HOST_DATA_DIR")
        output_dir = params.get("output_dir")
        offload_mode = params.get("offload_mode", "none")
        block_swap_count = int(params.get("block_swap_count", 0))
        scene_failures: list[dict[str, Any]] = []

        t0 = time.monotonic()
        from .render_report import write_report_swallow
        from .vram import memory_stats as _vram_memory_stats

        try:
            output_path = await __import__("asyncio").to_thread(
                render,
                request,
                output_dir=output_dir,
                host_data_dir=host_data_dir,
                offload_mode=offload_mode,
                block_swap_count=block_swap_count,
                strict_scene_errors=strict_scene_errors,
                failures_out=scene_failures,
            )
            duration = time.monotonic() - t0
            requested_scene_count = len(scenes_parsed) if scenes_parsed else 1
            scenes_rendered = requested_scene_count - len(scene_failures)
            status = "partial" if scene_failures else "ok"
            result: dict[str, Any] = {
                "status": "ok",
                "output_path": str(output_path),
                "duration_seconds": round(duration, 2),
                "num_frames": request.num_frames,
            }
            if plan_warnings:
                result["warnings"] = plan_warnings
            if scene_failures:
                result["partial"] = True
                result["scenes_rendered"] = max(0, scenes_rendered)
                result["scenes_failed"] = scene_failures
            # Spec 051 D-C: write render_report.json alongside the .mp4.
            # Best-effort; never fails the render.
            report_path = write_report_swallow(
                output_dir=Path(output_path).parent if output_path else None,
                run_id=Path(output_path).stem,
                status=status,
                duration_seconds=duration,
                num_frames=request.num_frames,
                scenes_rendered=max(0, scenes_rendered),
                scenes_failed=scene_failures,
                warnings=plan_warnings or None,
                output_path=str(output_path),
                memory_stats=_vram_memory_stats(),
            )
            if report_path is not None:
                result["render_report_path"] = str(report_path)
            return result
        except _PipelineError as exc:
            duration = time.monotonic() - t0
            if output_dir:
                write_report_swallow(
                    output_dir=Path(output_dir),
                    run_id=f"err-{int(time.time() * 1000)}",
                    status="error",
                    duration_seconds=duration,
                    num_frames=request.num_frames,
                    scenes_rendered=0,
                    scenes_failed=scene_failures or None,
                    warnings=plan_warnings or None,
                    error_phase=exc.phase,
                    error_message=str(exc),
                    memory_stats=_vram_memory_stats(),
                )
            return {
                "status": "error",
                "code": -32603,
                "message": str(exc),
                "phase": exc.phase,
            }
        except Exception as exc:
            duration = time.monotonic() - t0
            if output_dir:
                write_report_swallow(
                    output_dir=Path(output_dir),
                    run_id=f"err-{int(time.time() * 1000)}",
                    status="error",
                    duration_seconds=duration,
                    num_frames=request.num_frames,
                    scenes_rendered=0,
                    scenes_failed=scene_failures or None,
                    warnings=plan_warnings or None,
                    error_phase="generate",
                    error_message=str(exc),
                    memory_stats=_vram_memory_stats(),
                )
            return {
                "status": "error",
                "code": -32603,
                "message": str(exc),
                "phase": "generate",
            }

    worker.register("longcat.video.render.start", _render_start)
    worker.register("longcat.video.plan.validate", _plan_validate)
    worker.register("longcat.video.plan.expand", _plan_expand)
