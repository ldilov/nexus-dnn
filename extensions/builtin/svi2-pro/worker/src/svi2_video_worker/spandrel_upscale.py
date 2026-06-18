"""Transformer super-resolution via spandrel — the highest-quality tier.

spandrel loads a checkpoint and auto-detects the architecture (DRCT, HAT,
SwinIR, …) and scale, so a single code path covers the whole family. Pure
torch → runs on the aarch64 GB10 where Maxine VSR has no build. DRCT-L is
the current PSNR leader (CVPR/NTIRE 2024); the default is a DRCT-L tuned
for clean, non-degraded input (SVI diffusion output), with a real-world
degradation DRCT-L registered for compressed sources. DRCT/HAT/SwinIR all
live in the permissive core `spandrel` package.

Fail-soft like the other upscale paths: any failure returns False and the
caller keeps native resolution.
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any, Callable, Optional

from .upscale_io import download, log, run_frame_upscale, stage_dir

_SUBDIR = "spandrel"
_WEIGHTS_ENV = "NEXUS_VIDEO_SVI2_SPANDREL_WEIGHTS"
_MODEL_ENV = "NEXUS_VIDEO_SVI2_SPANDREL_MODEL"
_AUTOSTAGE_ENV = "NEXUS_VIDEO_SVI2_SPANDREL_AUTOSTAGE"
_TILE_ENV = "NEXUS_VIDEO_SVI2_SPANDREL_TILE"

DEFAULT_MODEL = "drct-l-hq"

# Transformer-SR weights, downloaded at render time (never redistributed by
# us). spandrel reads the architecture and scale from the checkpoint, so only
# the URL is pinned. DRCT-L leads on quality; HAT-L / SwinIR-L are alternates.
# Model-weight licenses: DRCT-L/HAT-L community models are CC BY 4.0
# (attribution), SwinIR-L is Apache-2.0 — all permissive for this use.
MODELS: dict[str, dict[str, str]] = {
    "drct-l-hq": {
        "filename": "4xNomos2_hq_drct-l.safetensors",
        "url": "https://github.com/Phhofm/models/releases/download/"
        "4xNomos2_hq_drct-l/4xNomos2_hq_drct-l.safetensors",
    },
    "drct-l-real": {
        "filename": "4xRealWebPhoto_v4_drct-l.pth",
        "url": "https://github.com/Phhofm/models/releases/download/"
        "4xRealWebPhoto_v4_drct-l/4xRealWebPhoto_v4_drct-l.pth",
    },
    "hat-l": {
        "filename": "4xNomos8kSCHAT-L.safetensors",
        "url": "https://huggingface.co/Phips/4xNomos8kSCHAT-L/resolve/main/"
        "4xNomos8kSCHAT-L.safetensors",
    },
    "swinir-l": {
        "filename": "003_realSR_BSRGAN_DFOWMFC_s64w8_SwinIR-L_x4_GAN.pth",
        "url": "https://github.com/JingyunLiang/SwinIR/releases/download/v0.0/"
        "003_realSR_BSRGAN_DFOWMFC_s64w8_SwinIR-L_x4_GAN.pth",
    },
}


def available_models() -> list[str]:
    return list(MODELS)


def _coerce_bool(raw: str | None, default: bool) -> bool:
    if raw is None or raw == "":
        return default
    return raw.strip().lower() in ("1", "true", "yes", "on")


def _resolve_weights(
    model_name: str, models_dir: str | Path | None, logger: Any = None
) -> Optional[Path]:
    """Stage the checkpoint for `model_name`: explicit env override, then a
    cached copy, then an autostage download. None when unavailable."""
    spec = MODELS.get(model_name)
    if spec is None:
        log(logger, "spandrel_upscale.unknown_model", model=model_name)
        return None

    explicit = os.environ.get(_WEIGHTS_ENV, "").strip()
    if explicit:
        p = Path(explicit)
        return p if p.is_file() else None

    dest = stage_dir(models_dir, _SUBDIR) / spec["filename"]
    if dest.is_file():
        return dest
    if not _coerce_bool(os.environ.get(_AUTOSTAGE_ENV), True):
        return None
    if not download(spec["url"], dest):
        log(logger, "spandrel_upscale.weights_download_failed", url=spec["url"], dest=str(dest))
        return None
    log(logger, "spandrel_upscale.weights_ready", model=model_name, dest=str(dest))
    return dest


def _load_descriptor(weights: Path, device: Any) -> Any:
    from spandrel import ImageModelDescriptor, ModelLoader

    descriptor = ModelLoader().load_from_file(str(weights))
    if not isinstance(descriptor, ImageModelDescriptor):
        raise TypeError(f"not an image-to-image model: {type(descriptor).__name__}")
    descriptor.eval().to(device)
    return descriptor


def try_spandrel_upscale(
    src: Path,
    dst: Path,
    scale: int,
    model_name: str | None = None,
    fps: float = 16.0,
    logger: Any = None,
    on_frame: Optional[Callable[[int, int], None]] = None,
    models_dir: str | Path | None = None,
) -> bool:
    """Super-resolve `src` by `scale` into `dst` via a spandrel transformer
    model. Returns False when spandrel/torch/CUDA is absent, the model or its
    weights are unavailable, or any step fails — caller keeps native res."""
    if scale not in (2, 3, 4):
        return False
    name = model_name or os.environ.get(_MODEL_ENV, "").strip() or DEFAULT_MODEL
    try:
        import torch
    except Exception as exc:
        log(logger, "spandrel_upscale.unavailable", error=str(exc))
        return False
    if not torch.cuda.is_available():
        log(logger, "spandrel_upscale.unavailable", error="cuda not available")
        return False

    weights = _resolve_weights(name, models_dir, logger)
    if weights is None:
        log(logger, "spandrel_upscale.unavailable", error="weights unavailable", model=name)
        return False

    try:
        tile = int(os.environ.get(_TILE_ENV, "").strip() or 0)
    except ValueError:
        tile = 0

    try:
        descriptor = _load_descriptor(weights, torch.device("cuda"))
        native = int(descriptor.scale)
    except Exception as exc:
        log(logger, "spandrel_upscale.failed", error=str(exc), model=name)
        return False

    return run_frame_upscale(
        src=src,
        dst=dst,
        target_scale=scale,
        native_scale=native,
        forward=lambda t: descriptor(t),
        fps=fps,
        logger=logger,
        event="spandrel_upscale",
        on_frame=on_frame,
        tile=tile,
    )
