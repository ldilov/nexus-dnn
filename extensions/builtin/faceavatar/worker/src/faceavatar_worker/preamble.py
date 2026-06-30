"""Arc2Avatar / GB10 runtime preamble — env setup + gated-model workarounds.

GPU-deferred: the real Arc2Avatar fit + FLAME rasterizer bring-up is a separate
GPU session (see spec §8). This module only owns torch-free env knobs so the
worker imports + health-probes cleanly on a torch-free box.

Knobs:
  - PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True (set in __main__ too)
  - ArcFace/insightface is a gated download → optional redirect to a non-gated
    mirror, opt-in via env (production with a granted token uses the official repo).
  - FACEAVATAR_TF32: TF32 matmul on Blackwell/sm_121 (default on).

Import-safe without torch: only os/env + optional filesystem edits.
"""
from __future__ import annotations

import os
from pathlib import Path

ARCFACE_OFFICIAL = "deepinsight/insightface"
ARCFACE_MIRROR = "public-data/insightface"


def apply_env() -> None:
    """Set the runtime env. Uses setdefault so an operator/host override wins."""
    os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")
    os.environ.setdefault("OPENCV_IO_ENABLE_OPENEXR", "1")


def use_arcface_mirror() -> bool:
    """The dev fallback (non-gated mirror) is opt-in via env so production with a
    granted token uses the official repo."""
    return os.environ.get("FACEAVATAR_ARCFACE_MIRROR", "") not in ("", "0", "false", "False")


def arcface_model_id() -> str:
    return ARCFACE_MIRROR if use_arcface_mirror() else ARCFACE_OFFICIAL


def tf32_enabled() -> bool:
    """TF32 matmul + cuDNN acceleration (Blackwell/sm_121). On by default.
    Set FACEAVATAR_TF32=0 (or false) to force strict fp32."""
    return os.environ.get("FACEAVATAR_TF32", "1") not in ("0", "false", "False")


def redirect_arcface_in_cache(hf_home: str | None = None) -> list[str]:
    """When the mirror is requested, rewrite cached config json files so the
    face-recognition model resolves to the non-gated mirror. Returns patched
    paths. No-op (returns []) when the mirror is not requested or HF_HOME unset."""
    if not use_arcface_mirror():
        return []
    root = hf_home or os.environ.get("HF_HOME")
    if not root:
        return []
    patched: list[str] = []
    for cfg in Path(root).rglob("config.json"):
        text = cfg.read_text(encoding="utf-8")
        if ARCFACE_OFFICIAL in text:
            cfg.write_text(text.replace(ARCFACE_OFFICIAL, ARCFACE_MIRROR), encoding="utf-8")
            patched.append(str(cfg))
    return patched
