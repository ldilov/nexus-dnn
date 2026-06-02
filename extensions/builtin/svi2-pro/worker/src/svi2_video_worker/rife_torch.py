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

        out_idx = 0
        prev = load(paths[0])
        save(prev, out_idx)
        out_idx += 1
        for nxt_path in paths[1:]:
            nxt = load(nxt_path)
            for mid in _pair(prev, nxt, depth):
                save(mid, out_idx)
                out_idx += 1
            save(nxt, out_idx)
            out_idx += 1
            prev = nxt

        _ff(["ffmpeg", "-y", "-nostdin", "-nostats", "-loglevel", "error",
             "-framerate", str(int(src_fps * factor)), "-i", str(out_dir / "%06d.png"),
             "-vf", f"fps={int(target_fps)}", "-c:v", "libx264", "-pix_fmt", "yuv420p",
             "-crf", str(int(crf)), "-movflags", "+faststart", str(out_mp4)])
    return out_mp4
