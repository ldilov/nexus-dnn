"""Stage-A smoke: native LTX-2 19B Kijai Q4 GGUF stack load.

Validates the riskiest unverified part of `pipeline_ltx2` WITHOUT the
~7 GB Gemma encode stage or the host/RPC machinery:

  1. the module imports cleanly under the real pinned ltx-core + diffusers
  2. `pipeline_ltx2._resolve_paths()` finds the staged files
  3. the EXACT native loader calls the pipeline makes succeed:
       `ltx2_native_loader.load_native_ltx2_transformer` (GGUF → LTXModel,
       lazy per-op dequant) + `build_embeddings_processor` (connector
       merge) + the native `VideoDecoder` config build
  4. the resident VRAM footprint of the 19B transformer on the 16 GB card

Run with the host runtime venv python, e.g.:

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  NEXUS_VIDEO_LTX23_RUNTIME=rtx50-ltx2-gguf \
  PYTHONPATH=<ext>/worker/src \
  <venv>/Scripts/python.exe scripts/smoke-ltxv2-load.py

Exit 0 = PASS (loader + connector + VAE-config all succeed, footprint
reported). Exit 2 = FAIL/prereqs-missing (the message names the exact
unmet expectation — the same actionable error the module surfaces).
"""

from __future__ import annotations

import json
import os
import sys
import time
import traceback


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    os.environ.setdefault("NEXUS_VIDEO_LTX23_RUNTIME", "rtx50-ltx2-gguf")

    try:
        import torch
    except Exception as e:  # noqa: BLE001
        print(f"FAIL: import torch: {e}")
        return 2

    if not torch.cuda.is_available():
        print("FAIL: CUDA not available")
        return 2

    # (1)+(2) exercise the REAL module: import it and use its path
    # resolver — proves the shipped module imports under this stack.
    try:
        from ltx_video_worker import pipeline_ltx2 as mod  # type: ignore
    except Exception as e:  # noqa: BLE001
        print(f"FAIL: import pipeline_ltx2 (shipped module): {e}")
        traceback.print_exc()
        return 2

    paths = mod._resolve_paths()
    print(f"resolved transformer gguf : {paths.transformer_gguf}")
    print(f"resolved connector        : {paths.connector}")
    print(f"resolved video vae        : {paths.video_vae}")
    print(f"resolved gemma dir        : {paths.gemma_dir}")

    if not paths.transformer_gguf.is_file():
        print(f"FAIL: LTX-2 transformer GGUF not staged at {paths.transformer_gguf}")
        return 2
    if not paths.connector.is_file():
        print(f"FAIL: LTX-2 embeddings connector not staged at {paths.connector}")
        return 2
    if not paths.video_vae.is_file():
        print(f"FAIL: LTX-2 video VAE not staged at {paths.video_vae}")
        return 2

    torch.cuda.reset_peak_memory_stats()

    # (3a) the EXACT native transformer load from pipeline_ltx2.
    t0 = time.perf_counter()
    try:
        from ltx_video_worker.ltx2_native_loader import (  # type: ignore
            build_embeddings_processor,
            load_native_ltx2_transformer,
        )

        bundle = load_native_ltx2_transformer(
            paths.transformer_gguf,
            compute_dtype=torch.bfloat16,
            install_device="cuda",
            audio=True,
            strict_schema=True,
        )
    except Exception as e:  # noqa: BLE001
        print(f"FAIL: load_native_ltx2_transformer: {e}")
        traceback.print_exc()
        return 2
    t_load = time.perf_counter() - t0
    tx_vram = torch.cuda.max_memory_allocated() / 1024**3
    print(
        f"OK  load_native_ltx2_transformer  {t_load:.1f}s  "
        f"peak={tx_vram:.2f} GiB  type={type(bundle.transformer).__name__}"
    )

    # (3b) the embeddings connector merge.
    t1 = time.perf_counter()
    try:
        processor = build_embeddings_processor(
            paths.connector,
            bundle.config,
            device="cuda",
            dtype=torch.bfloat16,
            audio=True,
        )
    except Exception as e:  # noqa: BLE001
        print(f"FAIL: build_embeddings_processor: {e}")
        traceback.print_exc()
        return 2
    print(
        f"OK  build_embeddings_processor  {time.perf_counter() - t1:.1f}s  "
        f"type={type(processor).__name__}"
    )

    # (3c) the native VideoDecoder config build (no weight load — that is
    # exercised in the full render smoke; here we prove the config maps).
    try:
        from safetensors import safe_open
        from ltx_core.loader.helpers import create_meta_model
        from ltx_core.model.video_vae import VideoDecoderConfigurator

        with safe_open(str(paths.video_vae), framework="pt") as f:
            vae_meta = f.metadata() or {}
        if "config" not in vae_meta:
            print("FAIL: video VAE safetensors has no 'config' metadata")
            return 2
        decoder = create_meta_model(
            VideoDecoderConfigurator, json.loads(vae_meta["config"])
        )
        print(
            f"OK  native VideoDecoder config build  "
            f"type={type(decoder).__name__} "
            f"params={sum(1 for _ in decoder.parameters())}"
        )
    except Exception as e:  # noqa: BLE001
        print(f"FAIL: native VideoDecoder config build: {e}")
        traceback.print_exc()
        return 2

    # (3d) the native VideoEncoder load + evict (spec 048 i2v keyframe
    # encode). The encoder is a small transient — it loads on top of the
    # resident transformer here purely to prove the load path and the
    # per-channel-statistics extraction, then is freed immediately.
    try:
        import gc as _gc

        from ltx_video_worker import ltx2_conditioning as cond  # type: ignore

        class _EncLog:
            def info(self, *a, **k):
                print("  [enc]", a[0] if a else "", k)

        encoder = cond.load_video_encoder(
            paths.video_vae, torch.device("cuda"), _EncLog()
        )
        enc_params = sum(1 for _ in encoder.parameters())
        del encoder
        _gc.collect()
        torch.cuda.empty_cache()
        print(f"OK  native VideoEncoder load + evict  params={enc_params}")
    except Exception as e:  # noqa: BLE001
        print(f"FAIL: native VideoEncoder load: {e}")
        traceback.print_exc()
        return 2

    peak = torch.cuda.max_memory_allocated() / 1024**3
    total = torch.cuda.get_device_properties(0).total_memory / 1024**3
    print(
        f"--- transformer+connector resident peak = {peak:.2f} GiB / "
        f"{total:.2f} GiB card ---"
    )
    # Gemma-3-12B adds ~7 GB transiently in Stage 1 of the full pipeline
    # but is unloaded before the transformer loads; the VAE decoder is
    # loaded only after the transformer is evicted — so the bound that
    # matters here is transformer+connector+activations.
    fits = peak < 15.0
    print(
        "RESIDENT-FIT VERDICT:",
        "PASS (room for denoise activations + staged VAE decode)" if fits
        else "TIGHT (transformer near budget — denoise activations may spill)",
    )
    print("STAGE_A_RESULT:", "PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
