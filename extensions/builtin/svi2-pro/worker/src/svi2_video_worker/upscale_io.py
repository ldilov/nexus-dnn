"""Shared frame-by-frame upscale plumbing for the torch upscalers.

`run_frame_upscale` is the common body behind both the vendored RRDBNet
path (`esrgan_torch_upscale`) and the spandrel transformer path
(`spandrel_upscale`): ffmpeg-extract frames → run a per-frame `forward`
on CUDA (optionally tiled) → re-encode, lanczos-downscaling when the
model's native scale overshoots the requested factor. All heavy imports
(torch/numpy/ffmpeg/PIL) are deferred into the functions so this module
imports cleanly in a torch-less environment.
"""

from __future__ import annotations

import math
import os
import tempfile
import urllib.request
from pathlib import Path
from typing import Any, Callable, Optional

_TILE_PAD = 16


def log(logger: Any, event: str, **fields: object) -> None:
    if logger is None:
        return
    try:
        logger.info(event, **fields)
    except Exception:
        pass


def coerce_bool(raw: str | None, default: bool) -> bool:
    if raw is None or raw == "":
        return default
    return raw.strip().lower() in ("1", "true", "yes", "on")


def stage_dir(models_dir: str | Path | None, subdir: str) -> Path:
    """Where to cache downloaded weights: under the model store when known,
    else NEXUS_HOST_DATA_DIR, else the system temp dir."""
    if models_dir:
        return Path(models_dir) / subdir
    host = os.environ.get("NEXUS_HOST_DATA_DIR", "").strip()
    base = Path(host) if host else Path(tempfile.gettempdir())
    return base / "models" / subdir


def download(url: str, dest: Path) -> bool:
    """Atomically fetch `url` to `dest` (via a .part temp). Returns success."""
    tmp = dest.parent / (dest.name + ".part")
    try:
        dest.parent.mkdir(parents=True, exist_ok=True)
        with urllib.request.urlopen(url, timeout=300) as resp:  # noqa: S310
            tmp.write_bytes(resp.read())
        tmp.replace(dest)
        return True
    except Exception:
        try:
            tmp.unlink()
        except OSError:
            pass
        return False


def tiled_forward(forward: Callable[[Any], Any], img: Any, native_scale: int, tile: int) -> Any:
    """Run `forward` tile-by-tile with `_TILE_PAD` overlap, cropping the padded
    border from each output tile. img is (1, C, H, W); output is (1, C, H*s, W*s)."""
    s = native_scale
    _, c, h, w = img.shape
    out = img.new_zeros((1, c, h * s, w * s))
    for ty in range(math.ceil(h / tile)):
        for tx in range(math.ceil(w / tile)):
            y0, x0 = ty * tile, tx * tile
            y1, x1 = min(y0 + tile, h), min(x0 + tile, w)
            iy0, ix0 = max(y0 - _TILE_PAD, 0), max(x0 - _TILE_PAD, 0)
            iy1, ix1 = min(y1 + _TILE_PAD, h), min(x1 + _TILE_PAD, w)
            out_tile = forward(img[:, :, iy0:iy1, ix0:ix1])
            oy0, ox0 = (y0 - iy0) * s, (x0 - ix0) * s
            out[:, :, y0 * s : y1 * s, x0 * s : x1 * s] = out_tile[
                :, :, oy0 : oy0 + (y1 - y0) * s, ox0 : ox0 + (x1 - x0) * s
            ]
    return out


def run_frame_upscale(
    *,
    src: Path,
    dst: Path,
    target_scale: int,
    native_scale: int,
    forward: Callable[[Any], Any],
    fps: float,
    logger: Any = None,
    event: str = "upscale",
    on_frame: Optional[Callable[[int, int], None]] = None,
    tile: int = 0,
) -> bool:
    """Extract `src` to frames, run `forward` per frame (model-native scale),
    then encode to `dst` — lanczos-downscaling to the exact `target_scale`
    when the model overshoots. Fail-soft: returns False on any error."""
    try:
        import ffmpeg
        import numpy as np
        import torch
        from PIL import Image

        device = torch.device("cuda")
        with tempfile.TemporaryDirectory() as td:
            indir = Path(td) / "in"
            outdir = Path(td) / "out"
            indir.mkdir()
            outdir.mkdir()
            (
                ffmpeg.input(str(src))
                .output(str(indir / "%08d.png"), loglevel="error")
                .overwrite_output()
                .run()
            )
            frames = sorted(indir.glob("*.png"))
            if not frames:
                return False

            total = len(frames)
            src_w, src_h = Image.open(frames[0]).size
            with torch.no_grad():
                for idx, frame_path in enumerate(frames):
                    arr = np.asarray(Image.open(frame_path).convert("RGB"), dtype=np.float32)
                    arr /= 255.0
                    tensor = (
                        torch.from_numpy(arr).permute(2, 0, 1).unsqueeze(0).contiguous().to(device)
                    )
                    up = (
                        tiled_forward(forward, tensor, native_scale, tile)
                        if tile > 0
                        else forward(tensor)
                    )
                    out_np = (
                        up.clamp(0, 1).squeeze(0).mul(255).round().byte().permute(1, 2, 0).cpu().numpy()
                    )
                    Image.fromarray(out_np).save(outdir / frame_path.name)
                    if on_frame is not None:
                        on_frame(idx + 1, total)

            stream = ffmpeg.input(str(outdir / "%08d.png"), framerate=fps)
            if target_scale != native_scale:
                stream = stream.filter("scale", src_w * target_scale, src_h * target_scale, flags="lanczos")
            dst.parent.mkdir(parents=True, exist_ok=True)
            (
                stream.output(
                    str(dst),
                    vcodec="libx264",
                    pix_fmt="yuv420p",
                    movflags="+faststart",
                    loglevel="error",
                )
                .overwrite_output()
                .run()
            )
        ok = dst.is_file()
        log(logger, f"{event}.done", ok=ok, target_scale=target_scale, frames=total)
        return ok
    except Exception as exc:
        log(logger, f"{event}.failed", error=str(exc))
        return False
