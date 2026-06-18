"""NVIDIA Maxine RTX Video Super Resolution post-pass.

Upscales the stitched render via the `nvidia-vfx` wheel (`nvvfx.VideoSuperRes`,
Tensor-Core path — far faster and lighter on VRAM than ESRGAN-class models).
Windows + RTX + driver 560+ only; on any failure the caller keeps the
original video so a render never aborts on this optional stage.
"""

from __future__ import annotations

import tempfile
from pathlib import Path
from typing import Any, Callable, Optional

UPSCALE_FACTORS = (0, 2, 3, 4)
UPSCALE_QUALITIES = (
    "LOW",
    "MEDIUM",
    "HIGH",
    "ULTRA",
    "HIGHBITRATE_LOW",
    "HIGHBITRATE_MEDIUM",
    "HIGHBITRATE_HIGH",
    "HIGHBITRATE_ULTRA",
)
DEFAULT_QUALITY = "HIGH"


def _log(logger: Any, event: str, **fields: object) -> None:
    if logger is None:
        return
    try:
        logger.info(event, **fields)
    except Exception:
        pass


def try_rtx_upscale(
    src: Path,
    dst: Path,
    scale: int,
    quality: str = DEFAULT_QUALITY,
    fps: float = 16.0,
    logger: Any = None,
    on_frame: Optional[Callable[[int, int], None]] = None,
) -> bool:
    """Upscale `src` video by `scale` into `dst`. Returns False (caller keeps
    the original) when nvvfx is unavailable or any step fails."""
    if scale not in (2, 3, 4):
        return False
    try:
        import ffmpeg
        import numpy as np
        import torch
        from nvvfx import VideoSuperRes
        from PIL import Image
    except Exception as exc:
        _log(logger, "rtx_upscale.unavailable", error=str(exc))
        return False
    if not torch.cuda.is_available():
        _log(logger, "rtx_upscale.unavailable", error="cuda not available")
        return False

    # `QualityLevel` is attached to the class by nvvfx's effects/__init__;
    # guard the lookup so a future API shift degrades to a logged skip
    # rather than aborting the render (this stage is always optional).
    quality_enum = getattr(VideoSuperRes, "QualityLevel", None)
    q = getattr(quality_enum, quality.upper(), None) if quality_enum is not None else None
    if q is None:
        _log(logger, "rtx_upscale.bad_quality", quality=quality)
        return False

    try:
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
            sr = VideoSuperRes()
            loaded_res: tuple[int, int] | None = None
            try:
                for idx, frame_path in enumerate(frames):
                    img = np.asarray(Image.open(frame_path).convert("RGB"), dtype=np.float32)
                    img /= 255.0
                    h, w = img.shape[:2]
                    if loaded_res != (w, h):
                        if loaded_res is not None:
                            sr.close()
                            sr = VideoSuperRes()
                        sr.output_width = w * scale
                        sr.output_height = h * scale
                        sr.quality = q
                        sr.load()
                        loaded_res = (w, h)
                    tensor = (
                        torch.from_numpy(img).permute(2, 0, 1).contiguous().clamp(0, 1).cuda()
                    )
                    result = torch.from_dlpack(sr.run(tensor).image).clone()
                    out = (
                        result.clamp(0, 1).mul(255).byte().cpu().numpy().transpose(1, 2, 0)
                    )
                    Image.fromarray(out).save(outdir / frame_path.name)
                    if on_frame is not None:
                        on_frame(idx + 1, total)
            finally:
                try:
                    sr.close()
                except Exception:
                    pass

            dst.parent.mkdir(parents=True, exist_ok=True)
            (
                ffmpeg.input(str(outdir / "%08d.png"), framerate=fps)
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
        ok = dst.is_file()
        _log(logger, "rtx_upscale.done", ok=ok, scale=scale, quality=quality, frames=total)
        return ok
    except Exception as exc:
        _log(logger, "rtx_upscale.failed", error=str(exc))
        return False
