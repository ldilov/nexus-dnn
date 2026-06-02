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
    # rife-ncnn-vulkan interpolates by frame-doubling; pick the smallest
    # power-of-two factor that reaches >= the requested fps ratio, then a
    # final ffmpeg fps pass trims to the exact target.
    if target_fps <= src_fps:
        return 1
    ratio = target_fps / src_fps
    return 1 << max(0, math.ceil(math.log2(ratio)))


def build_minterpolate_cmd(src: str | Path, out: str | Path, target_fps: int, crf: int = 16) -> list[str]:
    return [
        "ffmpeg", "-y", "-nostdin", "-nostats", "-loglevel", "error",
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


def _extract_cmd(src: str | Path, pattern: str | Path) -> list[str]:
    return ["ffmpeg", "-y", "-nostdin", "-nostats", "-loglevel", "error", "-i", str(src), str(pattern)]


def _assemble_cmd(pattern: str | Path, out: str | Path, in_fps: int, target_fps: int, crf: int = 16) -> list[str]:
    return [
        "ffmpeg", "-y", "-nostdin", "-nostats", "-loglevel", "error",
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
    src_frame_count: Optional[int] = None,
    runner: Optional[Runner] = None,
) -> Path:
    # Frame-interpolation post-process. Native render stays at src_fps; this
    # ADDS frames to reach target_fps (smooth high-fps without speeding motion
    # up). Returns src unchanged when target_fps <= src_fps (no-op).
    src_mp4 = Path(src_mp4)
    out_mp4 = Path(out_mp4)
    run = runner or _default_runner

    if target_fps <= src_fps:
        return src_mp4

    if method == "ffmpeg":
        run(build_minterpolate_cmd(src_mp4, out_mp4, target_fps))
        return out_mp4

    if method == "rife":
        if not rife_bin:
            raise ValueError("method='rife' requires rife_bin (path to rife-ncnn-vulkan)")
        factor = rife_factor_for_fps(src_fps, target_fps)
        with tempfile.TemporaryDirectory() as td:
            tdp = Path(td)
            in_dir = tdp / "in"
            out_dir = tdp / "out"
            in_dir.mkdir()
            out_dir.mkdir()
            run(_extract_cmd(src_mp4, in_dir / "%06d.png"))
            n = src_frame_count if src_frame_count is not None else len(list(in_dir.glob("*.png")))
            run(build_rife_cmd(rife_bin, in_dir, out_dir, target_frame_count(n, factor), rife_model))
            run(_assemble_cmd(out_dir / "%06d.png", out_mp4, src_fps * factor, target_fps))
        return out_mp4

    raise ValueError(f"unknown interpolation method: {method}")
