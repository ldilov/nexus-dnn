from __future__ import annotations

from pathlib import Path
from typing import Any


class _RifeUnavailable(Exception):
    pass


def try_interpolate(
    src: Path, dst: Path, base_fps: int, target_fps: int
) -> bool:
    if target_fps <= base_fps:
        return False
    if _interpolate_recursive_rife(src, dst, base_fps, target_fps):
        return True
    return _interpolate_via_ffmpeg(src, dst, target_fps)


def _interpolate_recursive_rife(
    src: Path, dst: Path, base_fps: int, target_fps: int
) -> bool:
    factor = _doubling_factor(base_fps, target_fps)
    if factor == 0:
        return _interpolate_via_rife(src, dst, base_fps, target_fps)
    try:
        processor = _build_rife_processor()
    except _RifeUnavailable:
        return False
    cur_src = src
    cur_fps = base_fps
    tmp_chain: list[Path] = []
    try:
        for step in range(factor):
            step_fps = cur_fps * 2
            step_dst = (
                dst
                if step == factor - 1
                else dst.parent / f".rife_x{step_fps}_{dst.name}"
            )
            try:
                ok = _run_rife_pipeline(
                    cur_src, step_dst, cur_fps, step_fps, processor
                )
            except Exception:  # noqa: BLE001
                ok = False
            if not ok:
                return False
            if step != factor - 1:
                tmp_chain.append(step_dst)
            cur_src = step_dst
            cur_fps = step_fps
        return dst.is_file()
    finally:
        for p in tmp_chain:
            try:
                p.unlink()
            except OSError:
                pass


def _doubling_factor(base_fps: int, target_fps: int) -> int:
    if base_fps <= 0 or target_fps <= base_fps:
        return 0
    ratio = target_fps / base_fps
    factor = 0
    probe = 1
    while probe * 2 <= ratio + 1e-6:
        probe *= 2
        factor += 1
    return factor if probe == int(round(ratio)) and probe >= 2 else 0


def _interpolate_via_rife(
    src: Path, dst: Path, base_fps: int, target_fps: int
) -> bool:
    if target_fps != base_fps * 2:
        return False
    try:
        processor = _build_rife_processor()
    except _RifeUnavailable:
        return False
    try:
        return _run_rife_pipeline(src, dst, base_fps, target_fps, processor)
    except Exception:  # noqa: BLE001
        return False


def _build_rife_processor() -> Any:
    try:
        import rife_ncnn_vulkan_python as rife_mod  # type: ignore
    except ImportError as e:
        raise _RifeUnavailable("rife-ncnn-vulkan-python not installed") from e

    cls = None
    for name in ("Rife", "RIFE", "RifeNCNNVulkan"):
        cls = getattr(rife_mod, name, None)
        if cls is not None:
            break
    if cls is None:
        raise _RifeUnavailable(
            "no Rife class found in rife_ncnn_vulkan_python module surface"
        )

    last_err: Exception | None = None
    for ctor_kwargs in ({"gpuid": 0}, {"gpu_id": 0}, {}):
        try:
            return cls(**ctor_kwargs)
        except TypeError as e:
            last_err = e
            continue
        except Exception as e:  # noqa: BLE001
            last_err = e
            break
    raise _RifeUnavailable(
        f"rife constructor rejected every probed signature: {last_err}"
    )


def _invoke_rife(processor: Any, img0: Any, img1: Any) -> Any:
    for method_name in ("process", "interpolate", "__call__"):
        method = getattr(processor, method_name, None)
        if callable(method):
            return method(img0, img1)
    raise AttributeError(
        f"rife processor {type(processor).__name__} has no recognised entry point"
    )


def _run_rife_pipeline(
    src: Path,
    dst: Path,
    base_fps: int,
    target_fps: int,
    processor: Any,
) -> bool:
    import ffmpeg  # type: ignore
    from PIL import Image  # type: ignore
    import numpy as np  # type: ignore

    probe = ffmpeg.probe(str(src))
    video_stream = next(
        (s for s in probe.get("streams", []) if s.get("codec_type") == "video"),
        None,
    )
    if video_stream is None:
        return False
    width = int(video_stream["width"])
    height = int(video_stream["height"])

    decoded, _stderr = (
        ffmpeg.input(str(src))
        .output("pipe:", format="rawvideo", pix_fmt="rgb24")
        .run(capture_stdout=True, capture_stderr=True, quiet=True)
    )

    frame_bytes = width * height * 3
    if frame_bytes == 0 or len(decoded) % frame_bytes != 0:
        return False
    num_frames = len(decoded) // frame_bytes
    if num_frames < 2:
        return False

    raw = np.frombuffer(decoded, dtype=np.uint8).reshape(
        num_frames, height, width, 3
    )

    dst.parent.mkdir(parents=True, exist_ok=True)
    encoder = (
        ffmpeg.input(
            "pipe:",
            format="rawvideo",
            pix_fmt="rgb24",
            s=f"{width}x{height}",
            r=str(target_fps),
        )
        .output(
            str(dst),
            vcodec="libx264",
            pix_fmt="yuv420p",
            movflags="+faststart",
            loglevel="error",
        )
        .overwrite_output()
        .run_async(pipe_stdin=True)
    )

    try:
        for i in range(num_frames):
            cur_pil = Image.fromarray(raw[i])
            encoder.stdin.write(np.asarray(cur_pil, dtype=np.uint8).tobytes())
            if i + 1 < num_frames:
                nxt_pil = Image.fromarray(raw[i + 1])
                mid = _invoke_rife(processor, cur_pil, nxt_pil)
                mid_array = np.asarray(mid, dtype=np.uint8)
                if mid_array.shape != (height, width, 3):
                    return False
                encoder.stdin.write(mid_array.tobytes())
        encoder.stdin.close()
        encoder.wait()
    finally:
        if encoder.stdin and not encoder.stdin.closed:
            try:
                encoder.stdin.close()
            except OSError:
                pass

    return dst.is_file()


def _interpolate_via_ffmpeg(src: Path, dst: Path, target_fps: int) -> bool:
    try:
        import ffmpeg  # type: ignore

        dst.parent.mkdir(parents=True, exist_ok=True)
        (
            ffmpeg.input(str(src))
            .filter(
                "minterpolate",
                fps=str(target_fps),
                mi_mode="mci",
                mc_mode="aobmc",
                me_mode="bidir",
                vsbmc="1",
            )
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
        return dst.is_file()
    except Exception:  # noqa: BLE001
        return False
