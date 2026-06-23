from __future__ import annotations

import math
import subprocess
import tempfile
from pathlib import Path
from typing import Optional

_DEFAULT_HF_REPO = "DeepBeepMeep/Wan2.1"
_DEFAULT_HF_FILE = "flownet.pkl"


def resolve_weights(weights_path: Optional[str] = None, hf_repo: Optional[str] = None,
                    hf_file: Optional[str] = None) -> str:
    if weights_path:
        return str(weights_path)
    from huggingface_hub import hf_hub_download

    return hf_hub_download(hf_repo or _DEFAULT_HF_REPO, hf_file or _DEFAULT_HF_FILE)


def _pad_to(mult: int, n: int) -> int:
    return int(math.ceil(n / mult) * mult)


def _ff(cmd: list[str]) -> None:
    subprocess.run(cmd, check=True, stdin=subprocess.DEVNULL, capture_output=True)


def _threads_flag(ffmpeg_threads: Optional[int]) -> list[str]:
    """``-threads N`` when a count is given, else empty (today's behavior)."""
    return ["-threads", str(int(ffmpeg_threads))] if ffmpeg_threads else []


def _load_model(weights_path: str, device: str):
    import torch

    from .rife import IFNet

    state = torch.load(weights_path, map_location=device, weights_only=True)
    state = {k.replace("module.", ""): v for k, v in state.items()}
    model = IFNet()
    model.load_state_dict(state, strict=False)
    model.eval().to(device)
    return model


def interpolate_rife_torch(
    src_mp4: str | Path,
    out_mp4: str | Path,
    *,
    src_fps: int,
    target_fps: int,
    weights_path: Optional[str] = None,
    hf_repo: Optional[str] = None,
    hf_file: Optional[str] = None,
    device: str = "cuda",
    scale: float = 1.0,
    crf: int = 16,
    fast_parallel: bool = False,
    ffmpeg_threads: Optional[int] = None,
) -> Path:
    import torch
    from PIL import Image
    import numpy as np

    src_mp4 = Path(src_mp4)
    out_mp4 = Path(out_mp4)
    if target_fps <= src_fps:
        return src_mp4

    ratio = target_fps / src_fps
    depth = max(0, math.ceil(math.log2(ratio)))
    factor = 1 << depth
    weights = resolve_weights(weights_path, hf_repo, hf_file)
    model = _load_model(weights, device)
    scale_list = (4 / scale, 2 / scale, 1 / scale)

    def _forward(a, b):
        with torch.no_grad():
            return model(torch.cat((a, b), 1), scale_list)

    # bind scale_list into the recursive call without changing IFNet default
    def _pair(a, b, d):
        if d <= 0:
            return []
        mid = _forward(a, b)
        return _pair(a, mid, d - 1) + [mid] + _pair(mid, b, d - 1)

    with tempfile.TemporaryDirectory() as td:
        tdp = Path(td)
        in_dir = tdp / "in"
        out_dir = tdp / "out"
        in_dir.mkdir()
        out_dir.mkdir()
        _ff(["ffmpeg", "-y", "-nostdin", "-nostats", "-loglevel", "error",
             *_threads_flag(ffmpeg_threads),
             "-i", str(src_mp4), str(in_dir / "%06d.png")])
        paths = sorted(in_dir.glob("*.png"))
        if len(paths) < 2:
            raise ValueError(f"need >=2 frames to interpolate, got {len(paths)}")

        first = np.array(Image.open(paths[0]).convert("RGB"))
        h, w = first.shape[:2]
        ph, pw = _pad_to(32, h), _pad_to(32, w)

        def load(p):
            arr = np.array(Image.open(p).convert("RGB")).astype("float32") / 255.0
            t = torch.from_numpy(arr).permute(2, 0, 1).unsqueeze(0).to(device)
            return torch.nn.functional.pad(t, (0, pw - w, 0, ph - h))

        def save(t, idx):
            t = t[:, :, :h, :w].clamp(0, 1)[0].permute(1, 2, 0).mul(255).round().byte().cpu().numpy()
            Image.fromarray(t).save(out_dir / f"{idx:06d}.png")

        # Stream frames from disk and bound the GPU working set: holding every
        # frame (and batching all pairs) resident OOM'd unified GB10 memory.
        if fast_parallel:
            _interpolate_batched(
                paths, load, _pair, depth, save, chunk_pairs=_chunk_pairs_for(ph, pw)
            )
        else:
            _interpolate_serial(paths, load, _pair, depth, save)

        _ff(["ffmpeg", "-y", "-nostdin", "-nostats", "-loglevel", "error",
             *_threads_flag(ffmpeg_threads),
             "-framerate", str(int(src_fps * factor)), "-i", str(out_dir / "%06d.png"),
             "-vf", f"fps={int(target_fps)}", "-c:v", "libx264", "-pix_fmt", "yuv420p",
             "-crf", str(int(crf)), "-movflags", "+faststart", str(out_mp4)])
    return out_mp4


# Cap stacked per-batch input bytes so RIFE activations stay bounded on unified
# GB10 memory (a 244-pair batch of upscaled frames exhausted it).
_RIFE_BATCH_BUDGET_BYTES = 512 * 1024 * 1024


def _chunk_pairs_for(padded_h: int, padded_w: int) -> int:
    """How many consecutive (a, b) pairs to batch per RIFE forward so the stacked
    input stays under [`_RIFE_BATCH_BUDGET_BYTES`]. Returns >= 1."""
    frame_bytes = 3 * padded_h * padded_w * 4
    if frame_bytes <= 0:
        return 1
    return max(1, _RIFE_BATCH_BUDGET_BYTES // frame_bytes)


def _chunk_ranges(num_pairs: int, k: int) -> list[tuple[int, int]]:
    """Contiguous ``[start, end)`` pair-index ranges of width <= ``k`` covering
    every pair exactly once in order (``end`` exclusive; chunk loads frames
    ``start..end`` inclusive). Pure — unit-tested without torch."""
    if num_pairs <= 0:
        return []
    k = max(1, k)
    return [(s, min(s + k, num_pairs)) for s in range(0, num_pairs, k)]


def _interpolate_serial(paths, load, pair_fn, depth, save) -> None:
    """Per-pair RIFE that holds only the current (prev, next) frames + their mids
    on the GPU. Output: f0, mids(f0,f1), f1, mids(f1,f2), f2, ... , f_{N-1}."""
    prev = load(paths[0])
    save(prev, 0)
    out_idx = 1
    for p in paths[1:]:
        nxt = load(p)
        for mid in pair_fn(prev, nxt, depth):
            save(mid, out_idx)
            out_idx += 1
        save(nxt, out_idx)
        out_idx += 1
        prev = nxt


def _interpolate_batched(paths, load, pair_fn, depth, save, chunk_pairs=0) -> None:
    """Batched RIFE that processes at most ``chunk_pairs`` consecutive pairs per
    GPU forward (frames streamed from disk per chunk), freeing the cache between
    chunks. Output frame order and count are identical to the per-pair path:
    f0, mids(f0,f1), f1, mids(f1,f2), f2, ... , f_{N-1}.
    """
    import torch

    if len(paths) < 2:
        save(load(paths[0]), 0)
        return
    num_pairs = len(paths) - 1
    k = chunk_pairs if chunk_pairs and chunk_pairs > 0 else num_pairs
    save(load(paths[0]), 0)
    out_idx = 1
    for start, end in _chunk_ranges(num_pairs, k):
        chunk = [load(paths[i]) for i in range(start, end + 1)]
        a_batch = torch.cat(chunk[:-1], dim=0)
        b_batch = torch.cat(chunk[1:], dim=0)
        mids_batched = pair_fn(a_batch, b_batch, depth)  # list of [P, C, H, W], ordered
        for j in range(end - start):
            for mid in mids_batched:
                save(mid[j : j + 1], out_idx)
                out_idx += 1
            save(chunk[j + 1], out_idx)
            out_idx += 1
        del a_batch, b_batch, mids_batched, chunk
        if torch.cuda.is_available():
            torch.cuda.empty_cache()
