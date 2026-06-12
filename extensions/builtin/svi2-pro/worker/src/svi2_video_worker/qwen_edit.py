from __future__ import annotations

import subprocess
from pathlib import Path

_QWEN_DIFFUSION = "Qwen-Image-Edit-2509-Q5_K_M.gguf"
_QWEN_VAE = "qwen_image_vae.safetensors"
_QWEN_LLM = "Qwen2.5-VL-7B-Instruct.Q4_K_M.gguf"
_QWEN_LLM_VISION = "Qwen2.5-VL-7B-Instruct.mmproj-f16.gguf"


def build_qwen_edit_cmd(
    sd_bin: str,
    models_dir: str,
    ref_image: str,
    out_image: str,
    prompt: str,
    *,
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
        "--diffusion-model", str(md / _QWEN_DIFFUSION),
        "--vae", str(md / _QWEN_VAE),
        "--llm", str(md / _QWEN_LLM),
        "--llm_vision", str(md / _QWEN_LLM_VISION),
        "--cfg-scale", str(cfg_scale),
        "--sampling-method", sampling_method,
        "--flow-shift", str(flow_shift),
        "--steps", str(steps),
        "-r", str(ref_image),
        "-p", prompt,
        "-o", str(out_image),
    ]
    if offload_to_cpu:
        cmd.append("--offload-to-cpu")
    if diffusion_fa:
        cmd.append("--diffusion-fa")
    return cmd


def qwen_edit_image(
    sd_bin: str,
    models_dir: str,
    ref_image: str,
    out_image: str,
    prompt: str,
    **kwargs,
) -> Path:
    out = Path(out_image)
    out.parent.mkdir(parents=True, exist_ok=True)
    cmd = build_qwen_edit_cmd(sd_bin, models_dir, ref_image, str(out), prompt, **kwargs)
    subprocess.run(cmd, check=True)
    if not out.exists():
        raise RuntimeError(f"qwen edit produced no output at {out}")
    return out
