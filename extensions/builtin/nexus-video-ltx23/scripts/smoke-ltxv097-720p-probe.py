"""Cheap 720p two-pass probe — answers ONE question before integration:

does the GGUF-quantised LTX-Video 0.9.7 transformer emit latents the
official spatial upscaler accepts, and does the
render(768x512,latent) -> LTXLatentUpsamplePipeline -> tiled-decode
chain stay under 16 GB on the RTX 5070 Ti?

This deliberately renders ONE short unconditioned scene (no
LTXVideoCondition — that is a separable concern) so a failure is
unambiguously the latent/upsampler contract or VRAM, not conditioning.
PASS = readable upscaled frames written as PNG + peak < 16 GiB. The
full two-pass is wired into the render loop ONLY after this passes.

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  NEXUS_VIDEO_LTX23_LTXV097_GGUF=<...>/ltxv-13b-0.9.7-dev-Q4_K_M.gguf \
  [NEXUS_VIDEO_LTX23_UPSCALER=<dir or HF id>] \
  PYTHONPATH=<ext>/worker/src <venv>/python.exe \
      scripts/smoke-ltxv097-720p-probe.py
"""

from __future__ import annotations

import inspect
import os
import sys
import time
import traceback
from pathlib import Path

_UPSCALER_REPO = "Lightricks/ltxv-spatial-upscaler-0.9.7"


class _Log:
    def info(self, *a, **k):
        print("  [log]", a[0] if a else "", {x: y for x, y in k.items()})

    def error(self, *a, **k):
        print("  [log:err]", a, k)


_UPSCALER_SINGLE_FILE = (
    "models/Lightricks/LTX-Video/ltxv-spatial-upscaler-0.9.7.safetensors"
)


def _resolve_upscaler() -> tuple[str, bool]:
    """(ref, is_single_file). Precedence: env → the on-disk single-file
    Lightricks checkpoint → a diffusers tree → the bare HF id."""
    env = os.environ.get("NEXUS_VIDEO_LTX23_UPSCALER", "").strip()
    if env:
        return env, env.endswith(".safetensors")
    host = os.environ.get("NEXUS_HOST_DATA_DIR", "")
    single = Path(host).joinpath(_UPSCALER_SINGLE_FILE)
    if single.is_file():
        return str(single), True
    tree = Path(host).joinpath("models", *_UPSCALER_REPO.split("/"))
    if tree.is_dir():
        return str(tree), False
    return _UPSCALER_REPO, False


def _peak_gib(torch) -> float:
    return torch.cuda.max_memory_allocated() / 1024**3


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_720p"
    outdir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
    except Exception as e:  # noqa: BLE001
        print(f"FAIL import: {e}")
        traceback.print_exc()
        return 2
    if not torch.cuda.is_available():
        print("FAIL: CUDA unavailable")
        return 2

    try:
        from diffusers import LTXLatentUpsamplePipeline  # type: ignore
    except Exception as e:  # noqa: BLE001
        print(f"FAIL: LTXLatentUpsamplePipeline not in pinned diffusers: {e}")
        return 2

    W, H, NF = 768, 512, 49
    samp = mod._sampling_params({"num_inference_steps": 25})
    upscaler, up_single = _resolve_upscaler()
    print("samp:", samp, "| upscaler:", upscaler,
          "(single-file)" if up_single else "(tree/id)")

    t0 = time.perf_counter()
    try:
        pipe = mod._build_ltxv097_pipeline("model", _Log())
    except Exception as e:  # noqa: BLE001
        print(f"FAIL build base pipeline: {e}")
        traceback.print_exc()
        return 2
    print(f"OK base pipeline {time.perf_counter()-t0:.1f}s")

    sig = inspect.signature(pipe.__call__).parameters
    if "output_type" not in sig:
        print("FAIL: base pipe.__call__ has no output_type — cannot get "
              "latents for the two-pass path on this diffusers build")
        return 2

    prompt = ("a lone astronaut walks across a windswept red desert at "
              "golden hour, camera slowly cranes up to reveal a vast "
              "canyon, drifting dust, cinematic, highly detailed")
    neg = "low quality, worst quality, blurry, deformed, distorted"
    gen = torch.Generator(device="cuda").manual_seed(7)

    # Stage 1 — low-res, latents out (research: .frames, not .latents)
    k1 = {
        "prompt": prompt, "negative_prompt": neg,
        "width": W, "height": H, "num_frames": NF,
        "num_inference_steps": samp["num_inference_steps"],
        "guidance_scale": samp["guidance_scale"],
        "decode_timestep": samp["decode_timestep"],
        "decode_noise_scale": samp["decode_noise_scale"],
        "generator": gen, "output_type": "latent",
    }
    k1 = {x: y for x, y in k1.items() if x in sig}
    torch.cuda.reset_peak_memory_stats()
    t1 = time.perf_counter()
    try:
        r1 = pipe(**k1)
        latents = getattr(r1, "frames", None)
        if latents is None and isinstance(r1, dict):
            latents = r1.get("frames")
    except Exception as e:  # noqa: BLE001
        print(f"FAIL stage1 latent render: {e}")
        traceback.print_exc()
        return 2
    if latents is None:
        print("FAIL: stage1 returned no latent under .frames")
        return 2
    p1 = _peak_gib(torch)
    shape = tuple(getattr(latents, "shape", ()))
    dtype = str(getattr(latents, "dtype", "?"))
    print(f"stage1 OK {time.perf_counter()-t1:.0f}s peak={p1:.2f}GiB "
          f"latent shape={shape} dtype={dtype}")

    # Stage 2 — load upsampler sharing the SAME vae instance. The
    # on-disk Lightricks checkpoint is a single safetensors (ComfyUI
    # shape), not a diffusers tree — try from_single_file first, then
    # the documented from_pretrained(HF id) path.
    up = None
    load_errs: list[str] = []
    if up_single and hasattr(LTXLatentUpsamplePipeline, "from_single_file"):
        try:
            up = LTXLatentUpsamplePipeline.from_single_file(
                upscaler, vae=pipe.vae, torch_dtype=torch.bfloat16
            )
        except Exception as e:  # noqa: BLE001
            load_errs.append(f"from_single_file: {e}")
    if up is None:
        ref = upscaler if not up_single else _UPSCALER_REPO
        try:
            up = LTXLatentUpsamplePipeline.from_pretrained(
                ref, vae=pipe.vae, torch_dtype=torch.bfloat16
            )
        except Exception as e:  # noqa: BLE001
            load_errs.append(f"from_pretrained({ref}): {e}")
    if up is None:
        print("FAIL load upsampler — the on-disk asset is a single "
              "safetensors and from_single_file is unavailable/incompatible, "
              "and the HF-id from_pretrained path also failed. This is the "
              "integration contract to resolve:")
        for m in load_errs:
            print("  -", m)
        return 2
    up.to("cuda")
    try:
        upscaled = up(latents=latents, output_type="latent")
        upscaled = getattr(upscaled, "frames", upscaled)
    except Exception as e:  # noqa: BLE001
        print(f"FAIL stage2 latent upsample: {e}")
        traceback.print_exc()
        return 2
    p2 = _peak_gib(torch)
    print(f"stage2 OK peak={p2:.2f}GiB upscaled shape="
          f"{tuple(getattr(upscaled, 'shape', ()))}")

    # Stage 3 — short refine + tiled decode at 2x (vae tiling already on)
    uW, uH = W * 2, H * 2
    k3 = {
        "prompt": prompt, "negative_prompt": neg,
        "width": uW, "height": uH, "num_frames": NF,
        "num_inference_steps": 10, "denoise_strength": 0.4,
        "latents": upscaled,
        "decode_timestep": samp["decode_timestep"],
        "decode_noise_scale": samp["decode_noise_scale"],
        "guidance_scale": samp["guidance_scale"],
        "generator": torch.Generator(device="cuda").manual_seed(7),
        "output_type": "pil",
    }
    missing = [x for x in ("latents", "denoise_strength") if x not in sig]
    if missing:
        print(f"FINDING: base pipe lacks {missing} — the refine pass is "
              "unavailable on this diffusers build; the integration must "
              "decode the upscaled latent via the upsampler/vae path "
              "instead. Stages 1+2 still validate the latent contract.")
        print("PROBE_PARTIAL (latent+upsample OK; refine path differs)")
        print(f"FRAMES IN: {outdir}")
        return 0
    k3 = {x: y for x, y in k3.items() if x in sig}
    t3 = time.perf_counter()
    try:
        r3 = pipe(**k3)
        frames = getattr(r3, "frames", None)
        frames = frames[0] if isinstance(frames, list) and frames else frames
    except Exception as e:  # noqa: BLE001
        print(f"FAIL stage3 refine+decode: {e}")
        traceback.print_exc()
        return 2
    p3 = _peak_gib(torch)
    fl = list(frames)
    for tag, ix in {"first": 0, "mid": len(fl) // 2, "last": len(fl) - 1}.items():
        fl[ix].resize((1280, 720)).save(outdir / f"720p_{tag}.png")
    try:
        mod._write_frames_as_mp4(
            [f.resize((1280, 720)) for f in fl], outdir / "720p.mp4", base_fps=24
        )
    except Exception as e:  # noqa: BLE001
        print("mp4 note:", e)
    overall_peak = max(p1, p2, p3)
    verdict = "PASS" if overall_peak < 16.0 else "VRAM_OVER_16GiB"
    print(f"stage3 OK {time.perf_counter()-t3:.0f}s peak={p3:.2f}GiB "
          f"frames={len(fl)} size={fl[0].size}")
    print(f"720P_PROBE {verdict} overall_peak={overall_peak:.2f}GiB")
    print(f"FRAMES IN: {outdir}  (inspect 720p_first/mid/last.png)")
    return 0


if __name__ == "__main__":
    sys.exit(main())
