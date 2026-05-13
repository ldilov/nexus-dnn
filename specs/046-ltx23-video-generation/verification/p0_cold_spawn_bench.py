"""P0-T003 cold-spawn benchmark — runnable on real 16 GB GPU.

Measures the wall-clock cost of a full Python-cold-start → torch import →
LTX-2.3 checkpoint load → 1 segment of inference → clean exit. Compare
against the projected duration=120s render wall-clock.

DECISION GATE:
  - If cold_spawn_seconds < 0.15 * projected_120s_wall_clock
    → switch D2 to process-per-segment (delete supervisor)
  - Else
    → keep warm-runtime + restart-on-threshold (current scaffold)

Usage:

    # Use the same venv prepared for P0-T001
    python p0_cold_spawn_bench.py

This script measures 3 cold spawns of itself in a sub-mode and reports
median + IQR. Use --inner to run one inner invocation.
"""

from __future__ import annotations

import argparse
import json
import os
import subprocess
import sys
import time
from pathlib import Path
from statistics import median


def run_inner(out_path: Path) -> int:
    t_imports_start = time.time()
    import torch
    from diffusers import LTXImageToVideoPipeline  # type: ignore
    t_imports_end = time.time()

    t_load_start = time.time()
    pipe = LTXImageToVideoPipeline.from_pretrained(  # type: ignore
        "Lightricks/LTX-2.3-fp8",
        torch_dtype=torch.float8_e4m3fn if hasattr(torch, "float8_e4m3fn") else torch.bfloat16,
    )
    if hasattr(pipe, "enable_model_cpu_offload"):
        pipe.enable_model_cpu_offload()
    if hasattr(pipe, "enable_vae_tiling"):
        pipe.enable_vae_tiling()
    t_load_end = time.time()

    t_infer_start = time.time()
    from PIL import Image
    img = Image.new("RGB", (960, 544), (40, 40, 60))
    _ = pipe(
        prompt="A test prompt for cold-spawn benchmark.",
        image=img,
        width=960,
        height=544,
        num_frames=97,
        num_inference_steps=20,
        guidance_scale=3.0,
    )
    t_infer_end = time.time()

    out_path.write_text(json.dumps({
        "imports_seconds": round(t_imports_end - t_imports_start, 2),
        "load_seconds": round(t_load_end - t_load_start, 2),
        "infer_seconds": round(t_infer_end - t_infer_start, 2),
    }))
    return 0


def run_outer(iterations: int = 3) -> int:
    samples = []
    for i in range(iterations):
        out_tmp = Path(f"p0_t003_inner_{i}.json")
        if out_tmp.exists():
            out_tmp.unlink()
        t0 = time.time()
        r = subprocess.run(
            [sys.executable, __file__, "--inner", "--out", str(out_tmp)],
            check=False,
        )
        wall = time.time() - t0
        if r.returncode != 0:
            print(f"iter {i}: inner run failed (code={r.returncode})", file=sys.stderr)
            continue
        inner = json.loads(out_tmp.read_text())
        sample = {
            "iter": i,
            "wall_clock_seconds": round(wall, 2),
            **inner,
        }
        samples.append(sample)
        print(json.dumps(sample), flush=True)

    if not samples:
        return 1

    walls = [s["wall_clock_seconds"] for s in samples]
    summary = {
        "samples": samples,
        "median_wall_seconds": round(median(walls), 2),
        "decision_gate": {
            "median_cold_spawn_seconds": round(median(walls), 2),
            "projected_120s_render_seconds": 1200,
            "ratio": round(median(walls) / 1200.0, 4),
            "process_per_segment_recommended": median(walls) < (0.15 * 1200),
        },
    }
    Path("p0_t003_result.json").write_text(json.dumps(summary, indent=2))
    print(json.dumps(summary, indent=2))
    return 0


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--inner", action="store_true", help="inner cold-start mode")
    parser.add_argument("--out", type=Path, help="inner output JSON")
    parser.add_argument("--iterations", type=int, default=3)
    args = parser.parse_args()

    if args.inner:
        return run_inner(args.out or Path("p0_t003_inner.json"))
    return run_outer(iterations=args.iterations)


if __name__ == "__main__":
    raise SystemExit(main())
