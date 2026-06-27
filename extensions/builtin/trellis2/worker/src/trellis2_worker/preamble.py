"""Blackwell/GB10 runtime preamble — env setup + gated-model workarounds.

Ports the P0-COMPLETE spike's runtime fixes (see
docs/research/comfyui-trellis2/2026-06-24-trellis2-P0-COMPLETE.md):
  - ATTN_BACKEND=flash_attn (sparse-attn config rejects sdpa)
  - PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True + OpenEXR + CUDA paths
  - dinov3 gated → optional redirect to the non-gated kiennt120 mirror by
    rewriting the cached pipeline.json's image_cond_model.args.model_name
  - gated RMBG-2.0 avoided; background removal uses the non-gated BiRefNet when
    the operator's remove_background toggle is on (else rembg_model=None and the
    operator pre-cleans the input as an RGBA cutout)

Import-safe without torch: only os/env + optional filesystem edits.
"""
from __future__ import annotations

import os
from pathlib import Path

DINOV3_OFFICIAL = "facebook/dinov3-vitl16-pretrain-lvd1689m"
DINOV3_MIRROR = "kiennt120/dinov3-vitl16-pretrain-lvd1689m"


def apply_env() -> None:
    """Set the runtime env exactly as the P0-COMPLETE spike did. Uses setdefault
    so an operator/host override (e.g. a different ATTN_BACKEND) wins."""
    os.environ.setdefault("ATTN_BACKEND", "flash_attn")
    os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")
    os.environ.setdefault("OPENCV_IO_ENABLE_OPENEXR", "1")


def attention_backend() -> str:
    return os.environ.get("ATTN_BACKEND", "flash_attn")


def use_dinov3_mirror() -> bool:
    """The dev fallback (non-gated mirror) is opt-in via env so production with a
    granted HF token uses the official Meta repo."""
    return os.environ.get("TRELLIS2_DINOV3_MIRROR", "") not in ("", "0", "false", "False")


def dinov3_model_id() -> str:
    return DINOV3_MIRROR if use_dinov3_mirror() else DINOV3_OFFICIAL


def tf32_enabled() -> bool:
    """TF32 matmul + cuDNN acceleration (Blackwell/sm_121). On by default — the
    fp32 matmul speedup is large and the quality impact on this generative 3D
    pipeline is negligible. Set TRELLIS2_TF32=0 (or false) to force strict fp32."""
    return os.environ.get("TRELLIS2_TF32", "1") not in ("0", "false", "False")


def redirect_dinov3_in_cache(hf_home: str | None = None) -> list[str]:
    """When the mirror is requested, rewrite cached pipeline.json files so the
    image_cond_model resolves to the non-gated mirror. Returns patched paths.
    No-op (returns []) when the mirror is not requested or HF_HOME is unset."""
    if not use_dinov3_mirror():
        return []
    root = hf_home or os.environ.get("HF_HOME")
    if not root:
        return []
    patched: list[str] = []
    for pj in Path(root).rglob("pipeline.json"):
        text = pj.read_text(encoding="utf-8")
        if DINOV3_OFFICIAL in text:
            pj.write_text(text.replace(DINOV3_OFFICIAL, DINOV3_MIRROR), encoding="utf-8")
            patched.append(str(pj))
    return patched
