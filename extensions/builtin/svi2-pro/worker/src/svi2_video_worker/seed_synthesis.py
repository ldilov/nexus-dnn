"""Text-to-video seed-frame synthesis via stable-diffusion.cpp txt2img.

Reuses the sd.cpp binary, Qwen VAE, and Qwen2.5-VL text encoder vendored for
the edit-then-animate path (``qwen_edit.py``), but swaps in the base Qwen-Image
txt2img diffusion model and drops the ``-r`` reference flag, so the frame is
synthesized from the prompt alone. The result becomes the clip-0 anchor for the
unchanged i2v + SVI chain.

``_QWEN_IMAGE_TXT2IMG`` mirrors the edit model's naming convention but MUST be
confirmed against the installed sd.cpp build and the extension model manifest
before real GPU use; the base Qwen-Image GGUF is not yet registered there.
"""
from __future__ import annotations

import subprocess
from pathlib import Path

_QWEN_IMAGE_TXT2IMG = "Qwen-Image-Q5_K_M.gguf"
_QWEN_VAE = "qwen_image_vae.safetensors"
_QWEN_LLM = "Qwen2.5-VL-7B-Instruct.Q4_K_M.gguf"


def build_seed_txt2img_cmd(
    sd_bin: str,
    models_dir: str,
    out_image: str,
    prompt: str,
    *,
    width: int,
    height: int,
    seed: int | None = None,
    steps: int = 24,
    cfg_scale: float = 2.5,
    flow_shift: float = 3.0,
    sampling_method: str = "euler",
    offload_to_cpu: bool = True,
    diffusion_fa: bool = True,
) -> list[str]:
    md = Path(models_dir)
    cmd = [
        str(sd_bin),
        "--diffusion-model", str(md / _QWEN_IMAGE_TXT2IMG),
        "--vae", str(md / _QWEN_VAE),
        "--llm", str(md / _QWEN_LLM),
        "--cfg-scale", str(cfg_scale),
        "--sampling-method", sampling_method,
        "--flow-shift", str(flow_shift),
        "--steps", str(steps),
        "-W", str(width),
        "-H", str(height),
        "-p", prompt,
        "-o", str(out_image),
    ]
    if seed is not None:
        cmd += ["-s", str(seed)]
    if offload_to_cpu:
        cmd.append("--offload-to-cpu")
    if diffusion_fa:
        cmd.append("--diffusion-fa")
    return cmd


def synthesize_seed_frame(
    sd_bin: str,
    models_dir: str,
    out_image: str | Path,
    prompt: str,
    *,
    width: int,
    height: int,
    seed: int | None = None,
    steps: int = 24,
    cfg_scale: float = 2.5,
    flow_shift: float = 3.0,
    sampling_method: str = "euler",
    offload_to_cpu: bool = True,
    diffusion_fa: bool = True,
) -> Path:
    """Synthesize a single seed frame from ``prompt`` via sd.cpp txt2img.

    Returns the seed image path on success. Raises ``RuntimeError`` if sd.cpp
    produced no output, or an empty file, so a black/empty frame never reaches
    the i2v chain as an anchor.
    """
    out = Path(out_image)
    out.parent.mkdir(parents=True, exist_ok=True)
    cmd = build_seed_txt2img_cmd(
        sd_bin,
        models_dir,
        str(out),
        prompt,
        width=width,
        height=height,
        seed=seed,
        steps=steps,
        cfg_scale=cfg_scale,
        flow_shift=flow_shift,
        sampling_method=sampling_method,
        offload_to_cpu=offload_to_cpu,
        diffusion_fa=diffusion_fa,
    )
    subprocess.run(cmd, check=True)
    if not out.exists():
        raise RuntimeError(f"seed synthesis produced no output at {out}")
    if out.stat().st_size == 0:
        raise RuntimeError(f"seed synthesis produced an empty frame at {out}")
    return out
