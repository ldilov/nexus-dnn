"""720p two-pass spill RCA — sub-stage VRAM attribution (diagnostic).

NOT a pass/fail smoke. Reproduces `_generate_segment_2pass`'s EXACT
k1/k3 kwargs (verbatim from pipeline_ltxv097.py:1141-1209, 2026-05-19)
with instrumentation between each sub-stage that the monolithic real
function cannot expose from outside — same approach as
smoke-ltxv097-q6-vram-rca.py.

Attributes the stage-3 spill to the four Phase-1 candidates:
  C1  up.to("cuda") defeats the main pipe's enable_model_cpu_offload
      (shared pipe.vae pinned to cuda / offload hook stripped)
  C2  4x transformer activation at 1536x1024 stage-3 (structural-ish)
  C3  upsampler model co-resident through stage-3 (never freed)
  C4  stage-1 + upscaled latents held on GPU across pipe(**k3)

Q5_K_S default (env GGUF override deliberately unset). Frames written
for eyeball — counters under-report Windows WDDM host-paging, the
per-step time curve is the real spill tell (Q6 RCA precedent).

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  PYTHONPATH=<ext>/worker/src \
  <venv>/Scripts/python.exe scripts/smoke-ltxv097-720p-rca.py
"""

from __future__ import annotations

import os
import sys
import time
import traceback
from pathlib import Path


class _Log:
    def info(self, *a, **k):
        print("  [log]", a[0] if a else "", {x: y for x, y in k.items()})

    def error(self, *a, **k):
        print("  [log:err]", a, k)


def _gib(n: float) -> float:
    return round(n / 1024**3, 2)


def _mem(torch) -> tuple[float, float]:
    return (
        _gib(torch.cuda.memory_allocated()),
        _gib(torch.cuda.memory_reserved()),
    )


def _peak(torch) -> float:
    return _gib(torch.cuda.max_memory_allocated())


def _comp_device(comp) -> str:
    if comp is None:
        return "absent"
    try:
        return str(next(comp.parameters()).device)
    except StopIteration:
        return "no-params"
    except Exception as e:  # noqa: BLE001
        return f"err:{e}"


def _has_offload_hook(comp) -> bool:
    return comp is not None and getattr(comp, "_hf_hook", None) is not None


def _tensor_gib(x) -> float:
    import torch

    tot = 0
    seq = x if isinstance(x, (list, tuple)) else [x]
    for t in seq:
        if isinstance(t, torch.Tensor):
            tot += t.element_size() * t.nelement()
        elif isinstance(t, (list, tuple)):
            tot += int(_tensor_gib(t) * 1024**3)
    return _gib(tot)


def _probe(torch, pipe, label: str) -> None:
    a, r = _mem(torch)
    print(
        f"  [{label}] alloc={a} resv={r} GiB | "
        f"transformer={_comp_device(getattr(pipe,'transformer',None))}"
        f"(hook={_has_offload_hook(getattr(pipe,'transformer',None))}) "
        f"vae={_comp_device(getattr(pipe,'vae',None))}"
        f"(hook={_has_offload_hook(getattr(pipe,'vae',None))}) "
        f"text_enc={_comp_device(getattr(pipe,'text_encoder',None))}"
        f"(hook={_has_offload_hook(getattr(pipe,'text_encoder',None))})"
    )


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    os.environ.pop("NEXUS_VIDEO_LTX23_LTXV097_GGUF", None)
    _tag = os.environ.get("NEXUS_RCA_TAG", "").strip()
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / (
        f"_ltxv097_720p_rca{('_' + _tag) if _tag else ''}"
    )
    outdir.mkdir(parents=True, exist_ok=True)

    try:
        import inspect

        import torch
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
    except Exception as e:  # noqa: BLE001
        print(f"FAIL import: {e}")
        traceback.print_exc()
        return 2
    if not torch.cuda.is_available():
        print("FAIL: CUDA unavailable")
        return 2

    offload = os.environ.get("NEXUS_RCA_OFFLOAD", "model").strip() or "model"
    rca_nf = int(os.environ.get("NEXUS_RCA_NF", "97"))
    log = _Log()
    print(
        f"GGUF default: {mod._DEFAULT_GGUF_BASENAME} | "
        f"offload_mode={offload} | NF={rca_nf}"
    )
    t0 = time.perf_counter()
    pipe = mod._build_ltxv097_pipeline(offload, log)
    print(f"pipeline built {time.perf_counter()-t0:.1f}s")
    _probe(torch, pipe, "RESIDENT FLOOR (post-build, pre-upsampler)")
    floor_a, _ = _mem(torch)

    up = mod._ensure_upsampler(pipe, {}, log)
    up_params_gib = _tensor_gib(
        [p for p in getattr(up, "latent_upsampler", up).parameters()]
        if hasattr(getattr(up, "latent_upsampler", up), "parameters")
        else []
    )
    _probe(torch, pipe, "POST up.to(cuda)  [C1 test: vae device/hook]")
    post_up_a, _ = _mem(torch)
    print(
        f"  C1/C3: up.to(cuda) added {round(post_up_a-floor_a,2)} GiB "
        f"resident; upsampler params ~{up_params_gib} GiB"
    )

    W, H, NF, seed = 768, 512, rca_nf, 4242
    prompt = (
        "a calm ocean horizon at sunrise, gentle rolling waves, "
        "warm golden light, cinematic, photorealistic"
    )
    neg = "low quality, worst quality, deformed, blurry, jittery, noise"
    samp = mod._sampling_params({})
    sig = inspect.signature(pipe.__call__).parameters

    k1 = {
        "prompt": prompt, "negative_prompt": neg, "width": W, "height": H,
        "num_frames": NF, "frame_rate": 24,
        "generator": torch.Generator(device="cuda").manual_seed(seed),
        "guidance_scale": samp["guidance_scale"],
        "num_inference_steps": samp["num_inference_steps"],
        "decode_timestep": samp["decode_timestep"],
        "decode_noise_scale": samp["decode_noise_scale"],
        "image_cond_noise_scale": samp["image_cond_noise_scale"],
        "output_type": "latent",
    }
    k1.update(mod._ltx_conditioning(None, samp, sig))
    k1 = {k: v for k, v in k1.items() if k in sig}

    torch.cuda.reset_peak_memory_stats()
    t = time.perf_counter()
    r1 = pipe(**k1)
    s1_peak = _peak(torch)
    latents = getattr(r1, "frames", None)
    if latents is None and isinstance(r1, dict):
        latents = r1.get("frames")
    held1 = _tensor_gib(latents)
    print(
        f"\n  STAGE1 768x512 latent: {time.perf_counter()-t:.0f}s "
        f"peak={s1_peak} GiB | held r1.latents ~{held1} GiB (C4a)"
    )
    _probe(torch, pipe, "post-stage1")

    torch.cuda.reset_peak_memory_stats()
    t = time.perf_counter()
    up_out = up(latents=latents, output_type="latent")
    upscaled = getattr(up_out, "frames", up_out)
    up_peak = _peak(torch)
    held2 = _tensor_gib(upscaled)
    print(
        f"  UPSCALE -> latent: {time.perf_counter()-t:.0f}s "
        f"peak={up_peak} GiB | held upscaled ~{held2} GiB (C4b)"
    )

    k3 = {
        "prompt": prompt, "negative_prompt": neg,
        "width": W * 2, "height": H * 2, "num_frames": NF, "frame_rate": 24,
        "generator": torch.Generator(device="cuda").manual_seed(seed),
        "guidance_scale": samp["guidance_scale"],
        "num_inference_steps": max(6, samp["num_inference_steps"] // 3),
        "denoise_strength": 0.4, "latents": upscaled,
        "decode_timestep": samp["decode_timestep"],
        "decode_noise_scale": samp["decode_noise_scale"],
        "output_type": "pil",
    }
    step_t: list[float] = []
    if "callback_on_step_end" in sig:
        _last = [time.perf_counter()]

        def _cb(_p, i, _t, cb):  # noqa: ANN001
            now = time.perf_counter()
            step_t.append(round(now - _last[0], 1))
            _last[0] = now
            if i == 0:
                _probe(torch, pipe, "DURING stage3 step0")
            return cb

        k3["callback_on_step_end"] = _cb
    k3 = {k: v for k, v in k3.items() if k in sig}

    torch.cuda.reset_peak_memory_stats()
    t = time.perf_counter()
    r3 = pipe(**k3)
    s3_peak = _peak(torch)
    s3_a, s3_r = _mem(torch)
    s3_wall = time.perf_counter() - t
    frames = getattr(r3, "frames", None)
    if frames is None and isinstance(r3, dict):
        frames = r3.get("frames")
    fl = frames[0] if isinstance(frames, list) and len(frames) == 1 else frames
    out = mod._resize_frames(fl, 1280, 720)
    for tag, ix in {
        "first": 0, "mid": len(out) // 2, "last": len(out) - 1
    }.items():
        out[ix].save(outdir / f"rca720_{tag}.png")

    print(
        f"\n  STAGE3 1536x1024 refine: {s3_wall:.0f}s peak={s3_peak} GiB "
        f"(alloc={s3_a} resv={s3_r} frag={round(s3_r-s3_a,2)})"
    )
    print(f"  stage3 per-step seconds: {step_t}")

    print("\n== ATTRIBUTION ==")
    print(f"  resident floor (GGUF transformer+...) : {floor_a} GiB")
    print(f"  C1 offload-defeat (vae pinned cuda?)  : see POST up.to probe")
    print(f"  C3 upsampler resident                 : ~{up_params_gib} GiB")
    print(f"  C4 held latents (stage1 {held1} + up {held2}) : "
          f"~{round(held1+held2,2)} GiB")
    print(f"  stage1 peak={s1_peak}  upscale peak={up_peak}  "
          f"stage3 peak={s3_peak}")
    dominant = max(
        ("stage1", s1_peak), ("upscale", up_peak), ("stage3", s3_peak),
        key=lambda x: x[1],
    )
    print(f"  DOMINANT sub-stage peak: {dominant[0]} @ {dominant[1]} GiB")
    rising = (
        len(step_t) >= 2 and step_t[-1] > 1.5 * step_t[0]
    )
    print(
        f"  stage3 per-step rising (paging tell): {rising} "
        f"({step_t[0] if step_t else '?'} -> "
        f"{step_t[-1] if step_t else '?'} s)"
    )
    print(f"  C2 activation residual ~ stage3_peak - floor - C3 - C4 = "
          f"{round(s3_peak - floor_a - up_params_gib - held1 - held2, 2)} GiB")
    print(f"\nFRAMES: {outdir} (read rca720_*.png — confirm coherent)")
    print("RCA720_DONE")
    return 0


if __name__ == "__main__":
    sys.exit(main())
