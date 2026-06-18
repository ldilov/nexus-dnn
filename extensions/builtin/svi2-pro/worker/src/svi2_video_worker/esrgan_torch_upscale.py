"""Torch/CUDA Real-ESRGAN super-resolution — the zero-dependency upscale path.

Fallback for `rtx_upscale.try_rtx_upscale` (NVIDIA Maxine VSR), which is
Windows/x86-only. This path is pure torch on the cu13 stack SVI2 already
loads (vendored RRDBNet, no extra dependency), so it runs on the aarch64
GB10 and anywhere CUDA is available.

The published `RealESRGAN_x4plus.pth` is fixed-4x: for factor 2/3 the
shared `run_frame_upscale` super-samples 4x then lanczos-downscales to
the exact target. Fail-soft — any failure returns False so the caller
keeps native resolution and a render never aborts on this optional stage.
"""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any, Callable, Optional

from .upscale_io import download, log, run_frame_upscale, stage_dir

_MODEL_SCALE = 4
_SUBDIR = "realesrgan"
_WEIGHTS_NAME = "RealESRGAN_x4plus.pth"
_WEIGHTS_URL = (
    "https://github.com/xinntao/Real-ESRGAN/releases/download/"
    "v0.1.0/RealESRGAN_x4plus.pth"
)

_WEIGHTS_ENV = "NEXUS_VIDEO_SVI2_ESRGAN_WEIGHTS"
_URL_ENV = "NEXUS_VIDEO_SVI2_ESRGAN_URL"
_AUTOSTAGE_ENV = "NEXUS_VIDEO_SVI2_ESRGAN_AUTOSTAGE"
_TILE_ENV = "NEXUS_VIDEO_SVI2_ESRGAN_TILE"


def _coerce_bool(raw: str | None, default: bool) -> bool:
    if raw is None or raw == "":
        return default
    return raw.strip().lower() in ("1", "true", "yes", "on")


def _resolve_weights(models_dir: str | Path | None, logger: Any = None) -> Optional[Path]:
    """Locate RealESRGAN_x4plus.pth: explicit env override, then a staged
    copy, then an autostage download. Returns None when unavailable."""
    explicit = os.environ.get(_WEIGHTS_ENV, "").strip()
    if explicit:
        p = Path(explicit)
        return p if p.is_file() else None

    dest = stage_dir(models_dir, _SUBDIR) / _WEIGHTS_NAME
    if dest.is_file():
        return dest
    if not _coerce_bool(os.environ.get(_AUTOSTAGE_ENV), True):
        return None
    url = os.environ.get(_URL_ENV, "").strip() or _WEIGHTS_URL
    if not download(url, dest):
        log(logger, "esrgan_upscale.weights_download_failed", url=url, dest=str(dest))
        return None
    log(logger, "esrgan_upscale.weights_ready", dest=str(dest))
    return dest


def _load_model(weights: Path, device: Any) -> Any:
    import torch

    from .realesrgan_arch import RRDBNet

    ckpt = torch.load(str(weights), map_location="cpu", weights_only=True)
    state = ckpt.get("params_ema", ckpt.get("params", ckpt)) if isinstance(ckpt, dict) else ckpt
    model = RRDBNet(
        num_in_ch=3, num_out_ch=3, scale=_MODEL_SCALE, num_feat=64, num_block=23, num_grow_ch=32
    )
    model.load_state_dict(state, strict=True)
    model.eval()
    for p in model.parameters():
        p.requires_grad_(False)
    return model.to(device)


def try_esrgan_upscale(
    src: Path,
    dst: Path,
    scale: int,
    fps: float = 16.0,
    logger: Any = None,
    on_frame: Optional[Callable[[int, int], None]] = None,
    models_dir: str | Path | None = None,
) -> bool:
    """Super-resolve `src` by `scale` into `dst` via Real-ESRGAN on CUDA.
    Returns False (caller keeps the original) when torch/CUDA is absent,
    weights cannot be staged, or any step fails."""
    if scale not in (2, 3, 4):
        return False
    try:
        import torch
    except Exception as exc:
        log(logger, "esrgan_upscale.unavailable", error=str(exc))
        return False
    if not torch.cuda.is_available():
        log(logger, "esrgan_upscale.unavailable", error="cuda not available")
        return False

    weights = _resolve_weights(models_dir, logger)
    if weights is None:
        log(logger, "esrgan_upscale.unavailable", error="weights unavailable")
        return False

    try:
        tile = int(os.environ.get(_TILE_ENV, "").strip() or 0)
    except ValueError:
        tile = 0

    try:
        model = _load_model(weights, torch.device("cuda"))
    except Exception as exc:
        log(logger, "esrgan_upscale.failed", error=str(exc))
        return False

    return run_frame_upscale(
        src=src,
        dst=dst,
        target_scale=scale,
        native_scale=_MODEL_SCALE,
        forward=lambda t: model(t),
        fps=fps,
        logger=logger,
        event="esrgan_upscale",
        on_frame=on_frame,
        tile=tile,
    )
