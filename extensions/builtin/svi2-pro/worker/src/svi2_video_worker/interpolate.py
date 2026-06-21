from __future__ import annotations

import math
import subprocess
import tempfile
from pathlib import Path
from typing import Callable, Optional, Sequence

Runner = Callable[[Sequence[str]], object]


def _default_runner(cmd: Sequence[str]) -> object:
    return subprocess.run(cmd, check=True, stdin=subprocess.DEVNULL, capture_output=True)


def target_frame_count(src_count: int, factor: int) -> int:
    if factor < 1:
        raise ValueError("factor must be >= 1")
    if src_count <= 0:
        return 0
    return (src_count - 1) * factor + 1


def rife_factor_for_fps(src_fps: int, target_fps: int) -> int:
    if target_fps <= src_fps:
        return 1
    ratio = target_fps / src_fps
    return 1 << max(0, math.ceil(math.log2(ratio)))


def _threads_flag(ffmpeg_threads: Optional[int]) -> list[str]:
    """``-threads N`` when a count is given, else empty (today's behavior)."""
    return ["-threads", str(int(ffmpeg_threads))] if ffmpeg_threads else []


def build_minterpolate_cmd(
    src: str | Path, out: str | Path, target_fps: int, crf: int = 16,
    ffmpeg_threads: Optional[int] = None,
) -> list[str]:
    return [
        "ffmpeg", "-y", "-nostdin", "-nostats", "-loglevel", "error",
        *_threads_flag(ffmpeg_threads),
        "-i", str(src),
        "-vf", f"minterpolate=fps={int(target_fps)}:mi_mode=mci:mc_mode=aobmc:vsbmc=1",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", str(int(crf)),
        "-movflags", "+faststart", str(out),
    ]


def build_rife_cmd(
    rife_bin: str | Path, in_dir: str | Path, out_dir: str | Path, out_count: int,
    model: Optional[str] = None,
) -> list[str]:
    cmd = [str(rife_bin), "-i", str(in_dir), "-o", str(out_dir), "-n", str(int(out_count))]
    if model:
        cmd += ["-m", str(model)]
    return cmd


def _extract_cmd(
    src: str | Path, pattern: str | Path, ffmpeg_threads: Optional[int] = None
) -> list[str]:
    return [
        "ffmpeg", "-y", "-nostdin", "-nostats", "-loglevel", "error",
        *_threads_flag(ffmpeg_threads),
        "-i", str(src), str(pattern),
    ]


def _assemble_cmd(
    pattern: str | Path, out: str | Path, in_fps: int, target_fps: int, crf: int = 16,
    ffmpeg_threads: Optional[int] = None,
) -> list[str]:
    return [
        "ffmpeg", "-y", "-nostdin", "-nostats", "-loglevel", "error",
        *_threads_flag(ffmpeg_threads),
        "-framerate", str(int(in_fps)), "-i", str(pattern),
        "-vf", f"fps={int(target_fps)}",
        "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", str(int(crf)),
        "-movflags", "+faststart", str(out),
    ]


def interpolate_video(
    src_mp4: str | Path,
    out_mp4: str | Path,
    *,
    src_fps: int,
    target_fps: int,
    method: str = "ffmpeg",
    rife_bin: Optional[str | Path] = None,
    rife_model: Optional[str] = None,
    rife_weights: Optional[str] = None,
    device: str = "cuda",
    src_frame_count: Optional[int] = None,
    runner: Optional[Runner] = None,
    torch_backend: Optional[Callable[..., Path]] = None,
    ffmpeg_threads: Optional[int] = None,
    fast_parallel: bool = False,
) -> Path:
    src_mp4 = Path(src_mp4)
    out_mp4 = Path(out_mp4)
    run = runner or _default_runner

    if target_fps <= src_fps:
        return src_mp4

    if method == "ffmpeg":
        run(build_minterpolate_cmd(src_mp4, out_mp4, target_fps, ffmpeg_threads=ffmpeg_threads))
        return out_mp4

    if method == "rife_torch":
        backend = torch_backend
        if backend is None:
            from .rife_torch import interpolate_rife_torch as backend  # lazy: torch + weights
        return backend(
            src_mp4, out_mp4, src_fps=src_fps, target_fps=target_fps,
            weights_path=rife_weights, device=device, ffmpeg_threads=ffmpeg_threads,
            fast_parallel=fast_parallel,
        )

    if method == "rife_ncnn":
        if not rife_bin:
            raise ValueError("method='rife_ncnn' requires rife_bin (path to rife-ncnn-vulkan)")
        factor = rife_factor_for_fps(src_fps, target_fps)
        with tempfile.TemporaryDirectory() as td:
            tdp = Path(td)
            in_dir = tdp / "in"
            out_dir = tdp / "out"
            in_dir.mkdir()
            out_dir.mkdir()
            run(_extract_cmd(src_mp4, in_dir / "%06d.png", ffmpeg_threads))
            n = src_frame_count if src_frame_count is not None else len(list(in_dir.glob("*.png")))
            run(build_rife_cmd(rife_bin, in_dir, out_dir, target_frame_count(n, factor), rife_model))
            run(_assemble_cmd(
                out_dir / "%06d.png", out_mp4, src_fps * factor, target_fps,
                ffmpeg_threads=ffmpeg_threads,
            ))
        return out_mp4

    raise ValueError(f"unknown interpolation method: {method}")


def cuda_available(device: str = "cuda") -> bool:
    if device != "cuda":
        return False
    try:
        import torch

        return bool(torch.cuda.is_available())
    except Exception:
        return False


def resolve_rife_method(requested: str, *, device: str = "cuda", rife_bin: Optional[str] = None) -> str:
    if requested in ("ffmpeg", "rife_torch", "rife_ncnn"):
        return requested
    if requested in ("rife", "auto"):
        if cuda_available(device):
            return "rife_torch"
        if rife_bin:
            return "rife_ncnn"
        return "ffmpeg"
    return "ffmpeg"
