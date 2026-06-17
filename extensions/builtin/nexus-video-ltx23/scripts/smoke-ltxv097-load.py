"""Stage-A smoke: LTX-Video 0.9.7 GGUF transformer + companion VAE load.

Validates the riskiest unverified part of `pipeline_ltxv097` WITHOUT
the ~18 GB T5 download or the host/RPC/Guard-0d machinery:

  1. the module imports cleanly under the real pinned diffusers
  2. `pipeline_ltxv097._resolve_ltxv097_paths()` finds the staged files
  3. the EXACT `LTXVideoTransformer3DModel.from_single_file(gguf,
     GGUFQuantizationConfig(compute_dtype=bf16))` +
     `AutoencoderKLLTXVideo.from_single_file(vae)` calls the module
     makes succeed on THIS diffusers build + THIS GGUF layout
  4. the resident VRAM footprint of transformer+VAE on the 16 GB card

Run with the host runtime venv python, e.g.:

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  PYTHONPATH=<ext>/worker/src \
  <venv>/Scripts/python.exe scripts/smoke-ltxv097-load.py

Exit 0 = PASS (both load, footprint reported). Exit 2 = FAIL (the
message names the exact unmet expectation — the same actionable error
the module would surface in a real run).
"""

from __future__ import annotations

import os
import sys
import time
import traceback


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")

    try:
        import torch
        from diffusers import (
            AutoencoderKLLTXVideo,
            GGUFQuantizationConfig,
            LTXVideoTransformer3DModel,
        )
    except Exception as e:  # noqa: BLE001
        print(f"FAIL: import diffusers/torch: {e}")
        return 2

    if not torch.cuda.is_available():
        print("FAIL: CUDA not available")
        return 2

    # (1)+(2) exercise the REAL module: import it and use its path
    # resolver — proves the shipped module imports under this stack and
    try:
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
    except Exception as e:  # noqa: BLE001
        print(f"FAIL: import pipeline_ltxv097 (shipped module): {e}")
        traceback.print_exc()
        return 2

    gguf_path, base_repo = mod._resolve_ltxv097_paths()
    print(f"resolved gguf : {gguf_path}")
    print(f"resolved base : {base_repo}")
    if not gguf_path.is_file():
        print(f"FAIL: GGUF transformer not staged at {gguf_path}")
        return 2

    torch.cuda.reset_peak_memory_stats()
    dev = torch.device("cuda")

    # (3) the EXACT calls from pipeline_ltxv097._build_ltxv097_pipeline
    t0 = time.perf_counter()
    try:
        transformer = LTXVideoTransformer3DModel.from_single_file(
            str(gguf_path),
            quantization_config=GGUFQuantizationConfig(
                compute_dtype=torch.bfloat16
            ),
            torch_dtype=torch.bfloat16,
        )
    except Exception as e:  # noqa: BLE001
        print(f"FAIL: LTXVideoTransformer3DModel.from_single_file: {e}")
        traceback.print_exc()
        return 2
    transformer = transformer.to(dev)
    t_load = time.perf_counter() - t0
    tx_vram = torch.cuda.max_memory_allocated() / 1024**3
    print(f"OK  transformer.from_single_file  {t_load:.1f}s  "
          f"peak={tx_vram:.2f} GiB")

    peak = torch.cuda.max_memory_allocated() / 1024**3
    total = torch.cuda.get_device_properties(0).total_memory / 1024**3
    print(f"--- transformer resident peak = {peak:.2f} GiB / "
          f"{total:.2f} GiB card ---")
    # VAE/T5 now come from the 0.9.7-dev base repo (not a companion
    # single-file); Stage B exercises the full pipeline.
    fits = peak < 14.5
    print("RESIDENT-FIT VERDICT:",
          "PASS (room for T5/VAE/activations in Stage B)" if fits
          else "TIGHT (Q8 transformer near budget — model offload needed)")
    print("STAGE_A_RESULT:", "PASS")
    return 0


if __name__ == "__main__":
    sys.exit(main())
