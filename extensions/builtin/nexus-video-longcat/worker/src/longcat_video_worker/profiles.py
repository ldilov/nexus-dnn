"""LongCat render profile registry.

Mirrors `ltx_video_worker.generation_profiles` but scoped to the
LongCat backend runtimes declared in `manifest.yaml`. Two profiles
land in the scaffold:

  - rtx50-fp8: Kijai FP8 e4m3fn scaled (`LongCat_TI2V_comfy_fp8_*_KJ.safetensors`),
    targeted at 12-16 GB Blackwell. Distill LoRA optional (12 steps,
    CFG=1). 480x832 default; 720p via refinement LoRA pass.
  - fake:      no-GPU profile for CI handshake + protocol tests.

The DiT config baseline comes directly from
`meituan-longcat/LongCat-Video/dit/config.json` (validated
2026-05-23 probe):

    depth=48, hidden=4096, heads=32, ffn=16384,
    in_channels=out_channels=16, patch=[1,2,2],
    AdaLN_embed=512, dense (NOT MoE), 13.6B params.

VAE = AutoencoderKLWan (Wan 2.1, z_dim=16, 4x16x16 compression).
Text encoder = google/umt5-xxl (UMT5EncoderModel, d_model=4096,
24 layers). Scheduler = FlowMatchEulerDiscreteScheduler; distill
mode = CFG 1.0, shift 12, 12 steps.
"""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import Literal


Architecture = Literal["longcat-13b"]
Quantization = Literal["fp8_e4m3fn_scaled", "bf16", "fake"]


OffloadMode = Literal["none", "partial", "sequential", "group", "disk"]


@dataclass(frozen=True)
class LongCatProfile:
    profile_id: str
    runtime_id: str
    architecture: Architecture
    quantization: Quantization
    # Default render shape (HxW). LongCat trains at 480x832; 720p is
    # produced by the `generate_refine` pass on top of a 480p draft.
    height: int = 480
    width: int = 832
    num_frames: int = 93
    num_inference_steps: int = 50
    guidance_scale: float = 4.0
    use_distill: bool = False
    max_sequence_length: int = 512
    # CPU-offload strategy. See longcat_safetensors_loader._attach_*_offload.
    # - none:       weights resident on GPU
    # - partial:    tail blocks offloaded, head blocks resident
    #               (uses block_swap_count below); Kijai-style block-swap
    # - sequential: every block offloaded (per-block AlignDevicesHook)
    # - group:      whole-model hook (single sync per forward)
    # - disk:       weights paged from offload_folder via accelerate.disk_offload
    offload_mode: OffloadMode = "none"
    # Number of trailing DiT blocks to offload when offload_mode='partial'.
    # 0 means no swap; 48 means full sequential (equivalent to 'sequential').
    # Kijai workflow recommends 40 for 12 GB cards.
    block_swap_count: int = 0
    # Move per-block (k_cache, v_cache) tensors to CPU between blocks during
    # forward_with_kv_cache (multi-stage continuation rendering). Stacks
    # orthogonally with offload_mode — targets activation VRAM, not weight VRAM.
    offload_kv_cache: bool = False
    attention_mode: Literal["sdpa", "flash-attn-2", "block-sparse"] = "sdpa"
    notes: tuple[str, ...] = field(default_factory=tuple)


PROFILES: tuple[LongCatProfile, ...] = (
    LongCatProfile(
        profile_id="rtx50-fp8",
        runtime_id="nexus.video.longcat.rtx50-fp8",
        architecture="longcat-13b",
        quantization="fp8_e4m3fn_scaled",
        num_inference_steps=50,
        guidance_scale=4.0,
        use_distill=False,
        block_swap_count=0,
        attention_mode="sdpa",
        notes=(
            "Kijai LongCat_TI2V_comfy_fp8_e4m3fn_scaled_KJ.safetensors (15.5 GB).",
            "Per-tensor *.scale_weight; torch._scaled_mm(scale_a=1, scale_b=scale_weight).",
            "Distill LoRA recommended for 12-step path (set use_distill=True, CFG=1.0, shift=12).",
        ),
    ),
    LongCatProfile(
        profile_id="rtx50-fp8-distill",
        runtime_id="nexus.video.longcat.rtx50-fp8",
        architecture="longcat-13b",
        quantization="fp8_e4m3fn_scaled",
        num_inference_steps=12,
        guidance_scale=1.0,
        use_distill=True,
        block_swap_count=0,
        attention_mode="sdpa",
        notes=(
            "Distill LoRA path (LongCat_distill_lora_alpha64_bf16.safetensors).",
            "Applied on-the-fly: LoRAs MUST NOT be merged into FP8 weights.",
        ),
    ),
    LongCatProfile(
        profile_id="rtx50-fp8-12gb",
        runtime_id="nexus.video.longcat.rtx50-fp8",
        architecture="longcat-13b",
        quantization="fp8_e4m3fn_scaled",
        num_inference_steps=50,
        guidance_scale=4.0,
        use_distill=False,
        offload_mode="partial",
        block_swap_count=40,
        offload_kv_cache=True,
        attention_mode="sdpa",
        notes=(
            "12 GB VRAM target. 8 head blocks resident, 40 tail blocks "
            "offloaded via accelerate AlignDevicesHook. KV-cache offload "
            "enabled for continuation rendering. Mirrors Kijai WanVideoBlockSwap=40.",
        ),
    ),
    LongCatProfile(
        profile_id="rtx50-fp8-8gb",
        runtime_id="nexus.video.longcat.rtx50-fp8",
        architecture="longcat-13b",
        quantization="fp8_e4m3fn_scaled",
        num_inference_steps=50,
        guidance_scale=4.0,
        use_distill=False,
        offload_mode="sequential",
        block_swap_count=48,
        offload_kv_cache=True,
        attention_mode="sdpa",
        notes=(
            "8 GB VRAM target. Full per-block sequential offload (all 48 blocks). "
            "Slow but fits on 8 GB cards. KV-cache offload mandatory at this tier.",
        ),
    ),
    LongCatProfile(
        profile_id="fake",
        runtime_id="nexus.video.longcat.fake",
        architecture="longcat-13b",
        quantization="fake",
        num_inference_steps=1,
        notes=("No-GPU profile for CI handshake + protocol tests.",),
    ),
)


def get_profile(profile_id: str) -> LongCatProfile:
    for p in PROFILES:
        if p.profile_id == profile_id:
            return p
    known = ", ".join(p.profile_id for p in PROFILES)
    raise KeyError(f"unknown LongCat profile {profile_id!r}; known: {known}")
