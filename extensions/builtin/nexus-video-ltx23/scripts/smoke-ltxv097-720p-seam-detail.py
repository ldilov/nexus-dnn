"""720p seam + high-detail measurement: v1 decoupled tiled, v2
decoupled untiled (probe only — shipped path untouched), v3 two_pass
Q4_K_M. NEXUS_HOST_DATA_DIR + PYTHONPATH=worker/src + venv python."""

from __future__ import annotations

import os
import sys
import time
import traceback
from pathlib import Path

_GGUF_DIR = "C:/Users/lazar/.nexus/models/wsbagnsv1/ltxv-13b-0.9.7-dev-GGUF"
_Q4 = f"{_GGUF_DIR}/ltxv-13b-0.9.7-dev-Q4_K_M.gguf"

PROMPT = (
    "a weathered fisherman's face in sharp focus, deep wrinkles and "
    "grey stubble, hand-knitted wool sweater with visible stitches, "
    "behind him a cluttered harbour: coiled ropes, barnacled hulls, "
    "a hand-painted sign reading FRESH CATCH, dense green ivy on "
    "brick, golden hour, photorealistic, fine detail"
)
NEG = "low quality, worst quality, deformed, blurry, jittery, noise"


class _Log:
    def __init__(self) -> None:
        self.msgs: list[str] = []

    def info(self, *a, **k):
        m = a[0] if a else ""
        self.msgs.append(m)
        print("  [log]", m, {x: y for x, y in k.items()})

    def error(self, *a, **k):
        self.msgs.append(a[0] if a else "")
        print("  [log:err]", a, k)


def _gib(n: float) -> float:
    return round(n / 1024**3, 2)


def _save(frames, outdir: Path, tag: str) -> tuple[int, int]:
    for k, ix in {
        "first": 0, "mid": len(frames) // 2, "last": len(frames) - 1
    }.items():
        frames[ix].save(outdir / f"{tag}_{k}.png")
    return tuple(frames[0].size)


def _build(mod, gguf_env, log):
    if gguf_env:
        os.environ["NEXUS_VIDEO_LTX23_LTXV097_GGUF"] = gguf_env
    else:
        os.environ.pop("NEXUS_VIDEO_LTX23_LTXV097_GGUF", None)
    return mod._build_ltxv097_pipeline("model", log)


def _decoupled_untiled(mod, torch, pipe, upsampler, samp, nf):
    """Mirror of the shipped _generate_segment_decoupled stage-1 k1
    (verbatim) with tiling disabled ONLY for the upsampler decode."""
    import inspect

    sig = inspect.signature(pipe.__call__).parameters
    gen = torch.Generator(device="cuda").manual_seed(4242)
    k1 = {
        "prompt": PROMPT, "negative_prompt": NEG, "width": 768,
        "height": 512, "num_frames": nf, "frame_rate": 24,
        "generator": gen, "guidance_scale": samp["guidance_scale"],
        "num_inference_steps": samp["num_inference_steps"],
        "decode_timestep": samp["decode_timestep"],
        "decode_noise_scale": samp["decode_noise_scale"],
        "image_cond_noise_scale": samp["image_cond_noise_scale"],
        "output_type": "latent",
    }
    k1 = {k: v for k, v in k1.items() if k in sig}
    r1 = pipe(**k1)
    latents = getattr(r1, "frames", None)
    if latents is None and isinstance(r1, dict):
        latents = r1.get("frames")
    vae = pipe.vae
    had = getattr(vae, "use_tiling", False)
    try:
        if hasattr(vae, "disable_tiling"):
            vae.disable_tiling()
        else:
            vae.use_tiling = False
        up_out = upsampler(
            latents=latents,
            decode_timestep=samp["decode_timestep"],
            decode_noise_scale=samp["decode_noise_scale"],
            generator=torch.Generator(device="cuda").manual_seed(4242),
            output_type="pil",
        )
    finally:
        if had and hasattr(vae, "enable_tiling"):
            vae.enable_tiling()
        elif had:
            vae.use_tiling = True
    frames = getattr(up_out, "frames", None)
    if frames is None:
        frames = up_out[0] if isinstance(up_out, tuple) else up_out
    fl = frames[0] if isinstance(frames, list) and len(frames) == 1 else frames
    return mod._resize_frames(fl, 1280, 720)


def _variant(mod, torch, tag, gguf_env, fn, outdir, log) -> dict:
    print(f"\n==== {tag} ====")
    torch.cuda.reset_peak_memory_stats()
    t = time.perf_counter()
    try:
        frames = list(fn())
    except Exception as e:  # noqa: BLE001
        oom = "out of memory" in str(e).lower()
        print(f"  {tag} FAILED ({'OOM' if oom else 'err'}): {e}")
        traceback.print_exc()
        return {"tag": tag, "ok": False, "oom": oom}
    el = time.perf_counter() - t
    peak = _gib(torch.cuda.max_memory_allocated())
    resv = _gib(torch.cuda.memory_reserved())
    dims = _save(frames, outdir, tag)
    print(f"  {tag}: {el:.0f}s peak={peak} resv={resv} dims={dims}")
    import gc

    del frames
    gc.collect()
    torch.cuda.empty_cache()
    return {"tag": tag, "ok": True, "s": round(el), "peak": peak,
            "resv": resv, "dims": dims}


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    nf = int(os.environ.get("NEXUS_SD_NF", "97"))
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_seam_detail"
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

    res = []
    log = _Log()
    pipe = _build(mod, None, log)
    samp = mod._sampling_params({})
    cache: dict = {}
    up = mod._ensure_upsampler(pipe, cache, log)

    res.append(_variant(
        mod, torch, "v1_decoupled_tiled", None,
        lambda: mod._generate_segment_dispatch(
            pipe, cache, True, (1280, 720), None, PROMPT, NEG,
            768, 512, nf, 4242, samp, None, log, "decoupled"),
        outdir, log))

    res.append(_variant(
        mod, torch, "v2_decoupled_untiled", None,
        lambda: _decoupled_untiled(mod, torch, pipe, up, samp, nf),
        outdir, log))

    del pipe, up, cache
    import gc

    gc.collect()
    torch.cuda.empty_cache()
    torch.cuda.reset_peak_memory_stats()
    log2 = _Log()
    pipe4 = _build(mod, _Q4, log2)
    cache4: dict = {}
    res.append(_variant(
        mod, torch, "v3_twopass_q4km", _Q4,
        lambda: mod._generate_segment_dispatch(
            pipe4, cache4, True, (1280, 720), None, PROMPT, NEG,
            768, 512, nf, 4242, samp, None, log2, "two_pass"),
        outdir, log2))

    print("\n== SUMMARY (#6 seam fix viability + #5 detail A/B) ==")
    for r in res:
        if not r.get("ok"):
            print(f"  {r['tag']}: FAILED oom={r.get('oom')}")
            continue
        spill = r["resv"] > 16.0
        print(f"  {r['tag']}: {r['s']}s peak={r['peak']} "
              f"resv={r['resv']} spill={spill} dims={r['dims']}")
    print(f"\n  FRAMES: {outdir} — read v1 (tiled,seams) vs v2 "
          f"(untiled,seams gone?) vs v3 (Q4 twopass ref). Judge "
          f"seams + high-detail sharpness by eye.")
    print("SEAM_DETAIL_DONE")
    return 0


if __name__ == "__main__":
    sys.exit(main())
