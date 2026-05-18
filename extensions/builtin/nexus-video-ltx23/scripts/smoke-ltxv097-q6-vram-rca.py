"""Q6+conditioning >16 GiB — root-cause diagnostic via the REAL path.

Hypothesis (reference-confirmed in autoencoder_kl_ltx.py): the scene-2
conditioning tail is VAE-ENCODED with the whole temporal block in one
forward. `enable_tiling()` only sets spatial knobs, never
`use_framewise_*` (no public API does), so tiling cannot bound the
temporal-depth activation. Q4 (~8 GB resident) absorbs it (~12 GiB);
Q6 (~10 GB) + the SAME transient spills >16 GiB.

Faithful repro: render a short scene-1 (real frames, low steps) →
take the 24-frame tail → render a conditioned scene-2 with
pipe.vae.{encode,_encode,tiled_encode} monkeypatched to log input
shape + alloc/reserved/peak around EVERY VAE call. An abort-on-spill
guard raises after a >15.0 GiB VAE call so Q6 cannot fall into the
~80 s/step shared-mem crawl. Then it flips
use_framewise_encoding/decoding=True and re-runs scene-2 (single
variable) to measure the candidate fix.

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  NEXUS_VIDEO_LTX23_LTXV097_GGUF=<...-Q4_K_M.gguf|...-Q6_K.gguf> \
  PYTHONPATH=<ext>/worker/src <venv>/python.exe \
      scripts/smoke-ltxv097-q6-vram-rca.py
"""

from __future__ import annotations

import os
import sys
import time
import traceback
from pathlib import Path


class _Spill(BaseException):
    """Not an Exception — diffusers/pipeline try/excepts won't swallow
    it, so we abort cleanly the moment a VAE call crosses the fence."""


class _Log:
    def info(self, *a, **k):
        print("  [log]", a[0] if a else "", {x: y for x, y in k.items()})

    def error(self, *a, **k):
        print("  [log:err]", a, k)


_FENCE_GIB = 15.0


def _instrument(torch, vae, tag: dict) -> None:
    """Wrap encode/_encode/tiled_encode to log shape + memory and trip
    the spill fence. Idempotent-ish: stores originals on the vae."""
    if getattr(vae, "_rca_wrapped", False):
        return
    vae._rca_wrapped = True

    def wrap(name):
        orig = getattr(vae, name, None)
        if orig is None or not callable(orig):
            return
        import functools

        @functools.wraps(orig)
        def w(*a, **k):
            x = a[0] if a else None
            shp = tuple(getattr(x, "shape", ()))
            a0 = torch.cuda.memory_allocated() / 1024**3
            r0 = torch.cuda.memory_reserved() / 1024**3
            try:
                out = orig(*a, **k)
            finally:
                torch.cuda.synchronize()
            a1 = torch.cuda.memory_allocated() / 1024**3
            r1 = torch.cuda.memory_reserved() / 1024**3
            pk = torch.cuda.max_memory_allocated() / 1024**3
            print(
                f"  [{tag['v']}|{name}] in={shp} "
                f"alloc {a0:.2f}->{a1:.2f} resv {r0:.2f}->{r1:.2f} "
                f"peak={pk:.2f} frag={r1 - a1:.2f}"
            )
            if pk > _FENCE_GIB:
                print(f"  [{tag['v']}|{name}] >FENCE {pk:.2f}GiB — abort")
                raise _Spill()
            return out

        setattr(vae, name, w)

    for nm in ("encode", "_encode", "tiled_encode"):
        wrap(nm)


def _run_scene2(torch, mod, pipe, tail, samp, label, tag) -> None:
    tag["v"] = label
    torch.cuda.reset_peak_memory_stats()
    a0 = torch.cuda.memory_allocated() / 1024**3
    print(f"--- {label}: before scene2 alloc={a0:.2f}GiB ---")
    t0 = time.perf_counter()
    try:
        f2 = mod._generate_segment(
            pipe, tail,
            "the same scene continues, gentle camera move, same style",
            "low quality, blurry", 768, 512, 49, 7, samp, None,
        )
        n = len(list(f2))
        pk = torch.cuda.max_memory_allocated() / 1024**3
        print(f"  [{label}] scene2 OK {n}f peak={pk:.2f}GiB "
              f"{time.perf_counter() - t0:.0f}s (did NOT spill)")
    except _Spill:
        print(f"  [{label}] ABORTED at VAE fence "
              f"{time.perf_counter() - t0:.0f}s — spill reproduced")
    except Exception as e:  # noqa: BLE001
        pk = torch.cuda.max_memory_allocated() / 1024**3
        print(f"  [{label}] scene2 ERROR peak={pk:.2f}GiB: {e}")
        traceback.print_exc()


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    gguf = os.environ.get("NEXUS_VIDEO_LTX23_LTXV097_GGUF", "(default)")
    quant = Path(gguf).name if gguf != "(default)" else "default"

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

    print(f"=== Q6 VRAM RCA (real path) :: quant={quant} ===")
    t0 = time.perf_counter()
    try:
        pipe = mod._build_ltxv097_pipeline("model", _Log())
    except Exception as e:  # noqa: BLE001
        print(f"FAIL build: {e}")
        traceback.print_exc()
        return 2
    print(f"built {time.perf_counter() - t0:.1f}s")
    vae = pipe.vae
    print(
        f"vae flags: use_tiling={getattr(vae, 'use_tiling', '?')} "
        f"fw_enc={getattr(vae, 'use_framewise_encoding', '?')} "
        f"fw_dec={getattr(vae, 'use_framewise_decoding', '?')} "
        f"tile_min_frames={getattr(vae, 'tile_sample_min_num_frames', '?')}"
    )

    samp = mod._sampling_params({"num_inference_steps": 6})
    tag = {"v": "scene1"}
    try:
        s1 = list(mod._generate_segment(
            pipe, None,
            "a calm wide river through a green valley at dawn, slow "
            "camera push-in, cinematic",
            "low quality, blurry", 768, 512, 49, 7, samp, None,
        ))
    except Exception as e:  # noqa: BLE001
        print(f"FAIL scene1: {e}")
        traceback.print_exc()
        return 2
    pk1 = torch.cuda.max_memory_allocated() / 1024**3
    tail = s1[-24:]
    print(f"scene1 OK {len(s1)}f uncond_peak={pk1:.2f}GiB tail={len(tail)}")

    _instrument(torch, vae, tag)

    alloc_conf = os.environ.get("PYTORCH_CUDA_ALLOC_CONF", "(unset)")
    print(f"PYTORCH_CUDA_ALLOC_CONF={alloc_conf}")

    # A — production state (spatial tiling on, framewise OFF)
    _run_scene2(torch, mod, pipe, tail, samp, "A_framewise_OFF", tag)

    if os.environ.get("RCA_SKIP_B"):
        print("RCA_SKIP_B set — skipping framewise-ON pass")
        print("Q6_VRAM_RCA_DONE")
        return 0

    # B — single variable: framewise encode/decode ON
    import gc

    gc.collect()
    torch.cuda.empty_cache()
    torch.cuda.reset_peak_memory_stats()
    vae.use_framewise_encoding = True
    vae.use_framewise_decoding = True
    print(f"flip: fw_enc={vae.use_framewise_encoding} "
          f"fw_dec={vae.use_framewise_decoding} "
          f"tile_min_frames={getattr(vae, 'tile_sample_min_num_frames', '?')}")
    _run_scene2(torch, mod, pipe, tail, samp, "B_framewise_ON", tag)

    print("Q6_VRAM_RCA_DONE")
    return 0


if __name__ == "__main__":
    sys.exit(main())
