"""NVIDIA Maxine VFX SDK RTX upscale post-process.

Optional dep: `nvidia-vfx==0.1.0.1` (importable as `nvvfx`). Requires the
NVIDIA Maxine VFX SDK installed on the system (Windows: NGC installer;
Linux: pre-built libs) plus a Turing-class or newer NVIDIA GPU with
Tensor Cores. The driver baseline is 570.65+ on Windows.

Public surface:
    is_rtx_vfx_available()  -> tuple[bool, str]
    upscale_frames(frames, scale, quality="HIGH") -> np.ndarray

`upscale_frames` is a no-op identity when scale is 1 unless quality is
also set to a denoise/deblur level (delegated to the SDK). Scale 2/3/4
materialises a new array of shape (N, H*scale, W*scale, 3) uint8.

The post-process is gated at the pipeline call site by
`LongCatRenderRequest.rtx_upscale_scale`. When the gate returns False
the pipeline writes the un-upscaled draft instead — failure of this
optional stage never blocks a render.
"""

from __future__ import annotations

import logging
from typing import Any, Literal

logger = logging.getLogger(__name__)


UpscaleScale = Literal[1, 2, 3, 4]
UpscaleQuality = Literal["LOW", "MEDIUM", "HIGH", "HIGHEST"]


def is_rtx_vfx_available() -> tuple[bool, str]:
    """Return (available, reason). Cheap probe; safe to call repeatedly.

    Failure reasons are surfaced verbatim so operators can diagnose
    install issues without grep-ing logs.
    """
    try:
        import torch
    except ImportError as exc:
        return False, f"torch not importable: {exc}"

    if not torch.cuda.is_available():
        return False, "torch.cuda.is_available() is False"

    cap = torch.cuda.get_device_capability(0)
    if cap < (7, 5):
        return False, (
            f"GPU compute capability {cap} < (7, 5); VFX SDK requires "
            "Turing-class or newer (RTX)."
        )

    try:
        import nvvfx  # noqa: F401
    except ImportError as exc:
        return False, (
            f"nvvfx not importable: {exc}. Install the [rtx] extra: "
            "`uv sync --extra rtx` (requires NVIDIA Maxine VFX SDK on host)."
        )

    try:
        from nvvfx import VideoSuperRes  # noqa: F401
    except ImportError as exc:
        return False, (
            f"nvvfx.VideoSuperRes not importable: {exc}. Likely missing "
            "the VFX SDK runtime DLLs on the host."
        )

    return True, "ok"


def upscale_frames(
    frames: Any,
    scale: UpscaleScale,
    quality: UpscaleQuality = "HIGH",
    device: int = 0,
) -> Any:
    """Upscale a stack of frames via NVIDIA VFX SDK VideoSuperRes.

    Args:
        frames: numpy array shaped (N, H, W, 3) uint8 or float in [0, 1].
        scale: 1, 2, 3 or 4. 1 = same-resolution denoise/deblur path.
        quality: VideoSuperRes.QualityLevel name. HIGH is the documented
            default in the NVIDIA samples; HIGHEST trades wall for fidelity.
        device: CUDA device ordinal (typically 0).

    Returns:
        numpy array shaped (N, H*scale, W*scale, 3) uint8.

    Raises:
        RuntimeError: VFX SDK unavailable or runtime call fails.
        ValueError: scale outside the supported set.
    """
    if scale not in (1, 2, 3, 4):
        raise ValueError(f"scale must be one of (1, 2, 3, 4); got {scale!r}")

    available, reason = is_rtx_vfx_available()
    if not available:
        raise RuntimeError(f"VFX SDK upscale unavailable: {reason}")

    import numpy as np
    import torch
    from nvvfx import VideoSuperRes  # type: ignore[import-not-found]

    arr = np.asarray(frames)
    if arr.ndim == 5:
        arr = arr[0]
    if arr.ndim != 4 or arr.shape[-1] != 3:
        raise ValueError(
            f"frames must be (N, H, W, 3); got shape {arr.shape}"
        )

    n, h, w, _ = arr.shape
    out_h, out_w = h * scale, w * scale

    try:
        quality_enum = VideoSuperRes.QualityLevel[quality]
    except KeyError as exc:
        raise ValueError(
            f"quality must be one of {list(VideoSuperRes.QualityLevel.__members__)}; "
            f"got {quality!r}"
        ) from exc

    torch.cuda.set_device(device)

    sr = VideoSuperRes(device=device, quality=quality_enum)
    sr.input_width = w
    sr.input_height = h
    sr.output_width = out_w
    sr.output_height = out_h
    sr.load()
    if not sr.is_loaded:
        raise RuntimeError(
            f"VideoSuperRes.load() failed for {w}x{h} -> {out_w}x{out_h} "
            f"@ {quality}; check VFX SDK install + driver version"
        )

    logger.info(
        "upscale_frames: %d frames %dx%d -> %dx%d (scale=%dx, quality=%s)",
        n, w, h, out_w, out_h, scale, quality,
    )

    out = np.empty((n, out_h, out_w, 3), dtype=np.uint8)
    stream_ptr = torch.cuda.current_stream().cuda_stream

    try:
        for idx in range(n):
            frame = arr[idx]
            if frame.dtype == np.uint8:
                rgb_input = torch.from_numpy(frame).to(f"cuda:{device}")
                rgb_input = rgb_input.permute(2, 0, 1).float() / 255.0
            else:
                f = np.clip(frame.astype(np.float32), 0.0, 1.0)
                rgb_input = (
                    torch.from_numpy(f).to(f"cuda:{device}").permute(2, 0, 1).contiguous()
                )
            rgb_input = rgb_input.contiguous()

            result = sr.run(rgb_input, stream_ptr=stream_ptr)
            # `.clone()` takes ownership of the underlying buffer before
            # `result` (the SDK-owned DLPack container) goes out of scope
            rgb_output = torch.from_dlpack(result.image).clone()
            rgb_output = (rgb_output.clamp(0.0, 1.0) * 255.0).byte()
            out[idx] = rgb_output.permute(1, 2, 0).contiguous().cpu().numpy()
    finally:
        # VideoSuperRes pre-pins VRAM I/O surfaces on .load(); without
        # explicit teardown the buffers leak for the lifetime of the
        try:
            unload = getattr(sr, "unload", None)
            if callable(unload):
                unload()
        except Exception as exc:
            logger.warning("VideoSuperRes.unload() failed: %s", exc)
        del sr

    return out
