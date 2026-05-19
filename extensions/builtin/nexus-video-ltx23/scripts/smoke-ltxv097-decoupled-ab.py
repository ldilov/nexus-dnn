"""720p A/B: decoupled (Q5_K_S default) vs refined two-pass (Q4_K_M).

Drives the REAL shipped `_generate_segment_dispatch` (not a
reimplementation) so it proves the actual integration of the opt-in
`upscale_mode` knob, end to end:

  A  upscale_mode="decoupled"  + Q5_K_S default GGUF
       stage-1 native → spatial latent upsample → VAE decode, NO 13B
       transformer refine (the stage-3 forward at 1536x1024 that
       overshoots 16 GB — RCA 2026-05-19, resv 16.92 > 16 GiB).
  B  upscale_mode="two_pass"   + Q4_K_M GGUF (the lighter fallback)
       the existing refined render→upsample→refine→decode.

Both at the full 97-frame / 1280x720 config that spilled under
Q5_K_S two-pass. Instruments peak VRAM, per-step latency and the
mid-step `memory_reserved` spill tell (the torch peak counter
under-reports Windows WDDM host-paging — the slowdown is the real
signal). Writes first/mid/last PNGs for BOTH so the quality delta is
judged by eye, never a heuristic: decoupled is expected SOFTER (no
refine) — the question this answers is whether it is soft enough to
recommend the Q4_K_M two-pass instead.

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  PYTHONPATH=<ext>/worker/src \
  <venv>/Scripts/python.exe scripts/smoke-ltxv097-decoupled-ab.py
"""

from __future__ import annotations

import os
import sys
import time
import traceback
from pathlib import Path

_GGUF_DIR = "C:/Users/lazar/.nexus/models/wsbagnsv1/ltxv-13b-0.9.7-dev-GGUF"
_Q4 = f"{_GGUF_DIR}/ltxv-13b-0.9.7-dev-Q4_K_M.gguf"


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


def _run_variant(
    mod, torch, tag: str, gguf_env: str | None, upscale_mode: str,
    outdir: Path, nf: int,
) -> dict:
    if gguf_env:
        os.environ["NEXUS_VIDEO_LTX23_LTXV097_GGUF"] = gguf_env
    else:
        os.environ.pop("NEXUS_VIDEO_LTX23_LTXV097_GGUF", None)
    log = _Log()
    print(f"\n==== variant {tag}: mode={upscale_mode} "
          f"gguf={'Q4_K_M' if gguf_env else mod._DEFAULT_GGUF_BASENAME} ====")
    t0 = time.perf_counter()
    pipe = mod._build_ltxv097_pipeline("model", log)
    print(f"  pipeline built {time.perf_counter()-t0:.0f}s")

    samp = mod._sampling_params({})
    W, H = 768, 512
    prompt = (
        "a calm ocean horizon at sunrise, gentle rolling waves, "
        "warm golden light, cinematic, photorealistic"
    )
    neg = "low quality, worst quality, deformed, blurry, jittery, noise"
    step_t: list[float] = []
    _last = [time.perf_counter()]
    resv_mid = [0.0]

    def _hb(i: int) -> None:
        now = time.perf_counter()
        step_t.append(round(now - _last[0], 1))
        _last[0] = now
        if len(step_t) == 3:
            resv_mid[0] = _gib(torch.cuda.memory_reserved())

    cache: dict = {}
    torch.cuda.reset_peak_memory_stats()
    t = time.perf_counter()
    try:
        frames = list(
            mod._generate_segment_dispatch(
                pipe, cache, True, (1280, 720), None, prompt, neg,
                W, H, nf, 4242, samp, _hb, log, upscale_mode,
            )
        )
    except Exception as e:  # noqa: BLE001
        print(f"  {tag} FAILED: {e}")
        traceback.print_exc()
        return {"tag": tag, "ok": False}
    elapsed = time.perf_counter() - t
    peak = _gib(torch.cuda.max_memory_allocated())
    fell_back = "ltxv097.upscale_fallback" in log.msgs
    dims = frames[0].size if frames else (0, 0)
    for k, ix in {
        "first": 0, "mid": len(frames) // 2, "last": len(frames) - 1
    }.items():
        frames[ix].save(outdir / f"{tag}_{k}.png")
    n_steps = max(1, len(step_t))
    print(
        f"  {tag}: {elapsed:.0f}s peak={peak} GiB dims={dims} "
        f"fallback={fell_back} resv@step3={resv_mid[0]} GiB "
        f"steps/s~{[s for s in step_t[:6]]}"
    )
    del pipe, frames, cache
    import gc

    gc.collect()
    torch.cuda.empty_cache()
    torch.cuda.reset_peak_memory_stats()
    return {
        "tag": tag, "ok": True, "elapsed": round(elapsed),
        "peak": peak, "dims": dims, "fell_back": fell_back,
        "resv_step3": resv_mid[0], "steps": step_t,
    }


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    nf = int(os.environ.get("NEXUS_AB_NF", "97"))
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_decoupled_ab"
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

    a = _run_variant(
        mod, torch, "decoupled_q5ks", None, "decoupled", outdir, nf
    )
    b = _run_variant(
        mod, torch, "twopass_q4km", _Q4, "two_pass", outdir, nf
    )

    print("\n== A/B SUMMARY ==")
    for r in (a, b):
        if not r.get("ok"):
            print(f"  {r['tag']}: FAILED")
            continue
        spill = r["resv_step3"] > 16.0
        print(
            f"  {r['tag']}: {r['elapsed']}s peak={r['peak']} "
            f"dims={r['dims']} resv@3={r['resv_step3']} "
            f"spill={spill}"
        )
    print(f"\n  FRAMES: {outdir} (read decoupled_q5ks_* vs "
          f"twopass_q4km_* — judge softness by eye)")
    print("AB_DONE")
    return 0


if __name__ == "__main__":
    sys.exit(main())
