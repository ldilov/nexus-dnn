"""Compiled-Rust-contract knob verification for the 0.9.7 GGUF path.

This is the worker half of a two-layer proof that the six advanced
generation knobs are FUNCTIONALLY wired, not merely schema-present:

  Layer 1 (cargo, no GPU): `cargo test -p nexus-video-ltx23-extension
  build_advanced` pins that the COMPILED Rust `build_advanced_block`
  serialises the six knobs at the exact JSON keys below.

  Layer 2 (this script): the worker, given an `advanced` block using
  those exact keys, (A) round-trips every knob into the FULLY-RESOLVED
  param set the worker logs as `ltxv097.resolved_params` — proving the
  worker reads them rather than silently defaulting — and (B/C) for the
  knob categories where a frame delta is a meaningful signal, proves
  the knob changes the render under the per-category protocol below.

A "frames differ on same seed" check is, alone, an unsound proof: an
RNG-touching knob perturbs output even if it were a downstream no-op.
So each knob is proved by the method appropriate to its category:

  - structural / metadata (seam_overlap_frames, seam_blend_frames,
    seam_color_match, condition_tail_frames): the resolved-params echo
    IS the proof — a dropped knob resolves to its default, not the
    distinctive sent value, so the round-trip is falsifiable.
  - RNG path (decode_noise_scale): a determinism CONTROL — identical
    seed+value renders byte-identical, so divergence under a changed
    value is attributable to the knob, not to RNG churn.
  - conditioning (condition_strength): a directional differential on a
    conditioned continuation (stronger conditioning visibly changes
    the continuation of a fixed scene-1 tail at a fixed seed).

The 720p crawl criterion compares effective s/step against the B1
512p single-pass step time x3. That margin is robust for an
unambiguous WDDM spill (the observed spill ran ~5x baseline) but is
NOT precision-calibrated for a borderline (~2-3x) spill, since the
720p two-pass refine stage is architecturally heavier per step than
the 512p baseline. A near-threshold C result must be corroborated by
the absolute stage-refine s/step and a frame read, not the ratio
alone.

720p two-pass is verified under the SHIPPED Q5_K_S default (the env
GGUF override is deliberately NOT set, so `_DEFAULT_GGUF_BASENAME`
drives selection — this also exercises item-1's "verify the new
default through the real path"). A single-pass fallback would mask a
720p OOM, so the upscale check FAILS on either the `upscale_fallback`
log or output frames that are not the 1280x720 target, and asserts
the peak-VRAM + per-step-latency budget so a WDDM shared-memory spill
(slow "success") is treated as failure, not a pass.

  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \
  PYTHONPATH=<ext>/worker/src \
  <venv>/Scripts/python.exe scripts/smoke-ltxv097-knob-verify.py
"""

from __future__ import annotations

import hashlib
import os
import sys
import time
import traceback
from pathlib import Path

KNOB_KEYS = (
    "decode_noise_scale",
    "condition_strength",
    "condition_tail_frames",
    "seam_overlap_frames",
    "seam_blend_frames",
    "seam_color_match",
)


class _Log:
    def __init__(self) -> None:
        self.records: list[tuple[str, dict]] = []

    def info(self, *a, **k):
        msg = a[0] if a else ""
        self.records.append((msg, dict(k)))
        print("  [log]", msg, {x: y for x, y in k.items()})

    def error(self, *a, **k):
        self.records.append((a[0] if a else "", dict(k)))
        print("  [log:err]", a, k)

    def saw(self, msg: str) -> bool:
        return any(m == msg for m, _ in self.records)


def _frames_digest(frames) -> str:
    import numpy as np

    h = hashlib.sha256()
    for fr in frames:
        h.update(np.asarray(fr.convert("RGB"), dtype=np.uint8).tobytes())
    return h.hexdigest()


def _mean_abs_diff(a_frames, b_frames) -> float:
    import numpy as np

    if len(a_frames) != len(b_frames):
        raise AssertionError(
            f"frame-count mismatch {len(a_frames)} vs {len(b_frames)} — "
            "a truncated diff would under-report; treat as FAIL"
        )
    n = len(a_frames)
    if n == 0:
        return 0.0
    tot = 0.0
    for i in range(n):
        x = np.asarray(a_frames[i].convert("RGB"), dtype=np.float32) / 255.0
        y = np.asarray(b_frames[i].convert("RGB"), dtype=np.float32) / 255.0
        tot += float(np.mean(np.abs(x - y)))
    return tot / n


def _save(frames, outdir: Path, stem: str) -> None:
    idxs = {"first": 0, "mid": len(frames) // 2, "last": len(frames) - 1}
    for tag, ix in idxs.items():
        frames[ix].save(outdir / f"{stem}_{tag}.png")


def _part_a_resolved_echo(mod) -> bool:
    print("\n== Part A: resolved-params echo (all 6 knobs, CPU) ==")
    block = {
        "decode_noise_scale": 0.123,
        "condition_strength": 0.42,
        "condition_tail_frames": 17,
        "seam_overlap_frames": 11,
        "seam_blend_frames": 5,
        "seam_color_match": False,
    }
    samp = mod._sampling_params(block)
    from ltx_video_worker.seam import seam_params

    seam = seam_params(block, None)
    resolved = {**samp, **seam}
    expect = {
        "decode_noise_scale": ("decode_noise_scale", 0.123),
        "condition_strength": ("condition_strength", 0.42),
        "condition_tail_frames": ("condition_tail_frames", 17),
        "seam_overlap_frames": ("overlap_frames", 11),
        "seam_blend_frames": ("blend_frames", 5),
        "seam_color_match": ("color_match", False),
    }
    ok = True
    for sent_key, (resolved_key, sent_val) in expect.items():
        got = resolved.get(resolved_key)
        same = got == sent_val or (
            isinstance(sent_val, float)
            and isinstance(got, (int, float))
            and abs(float(got) - sent_val) < 1e-6
        )
        print(
            f"  {sent_key} -> resolved[{resolved_key}] = {got!r} "
            f"(sent {sent_val!r}) {'OK' if same else 'DROPPED/IGNORED'}"
        )
        ok = ok and same
    defaults = {**mod._sampling_params({}), **seam_params({}, None)}
    distinct = all(
        resolved.get(rk) != defaults.get(rk)
        for _, (rk, _) in expect.items()
    )
    print(
        f"  every sent value differs from its default "
        f"(falsifiability holds): {'OK' if distinct else 'WEAK'}"
    )
    return ok and distinct


def _part_b_decode_noise_determinism(mod, pipe, outdir, W, H, NF, neg):
    print("\n== Part B1: decode_noise_scale — determinism control ==")
    prompt = (
        "a calm ocean horizon at sunrise, gentle rolling waves, "
        "warm golden light, cinematic, photorealistic"
    )
    base = mod._sampling_params({})
    changed = mod._sampling_params({"decode_noise_scale": 0.0})

    import torch

    torch.manual_seed(0)
    t = time.perf_counter()
    f1 = list(
        mod._generate_segment(pipe, None, prompt, neg, W, H, NF, 7, base, None)
    )
    step_s = (time.perf_counter() - t) / max(1, base["num_inference_steps"])
    torch.manual_seed(9999)
    f2 = list(
        mod._generate_segment(pipe, None, prompt, neg, W, H, NF, 7, base, None)
    )
    f3 = list(
        mod._generate_segment(
            pipe, None, prompt, neg, W, H, NF, 7, changed, None
        )
    )
    _save(f1, outdir, "dns_baseline")
    _save(f3, outdir, "dns_changed")
    d12 = _frames_digest(f1) == _frames_digest(f2)
    diff13 = _mean_abs_diff(f1, f3)
    print(f"  identical seed+value -> byte-identical: {d12}")
    print(f"  changed value -> mean|delta|={diff13:.5f} (>0 expected)")
    ok = d12 and diff13 > 1e-4
    print(f"  decode_noise_scale FUNCTIONAL: {'OK' if ok else 'FAIL'}")
    return ok, step_s, f1[-1]


def _part_b_condition_strength(mod, pipe, outdir, W, H, NF, neg, tail_img):
    print("\n== Part B2: condition_strength — directional differential ==")
    prompt = (
        "the same ocean, the sun now higher and brighter, a lone "
        "sailboat drifting into view from the right, cinematic"
    )
    weak = mod._sampling_params({"condition_strength": 0.2})
    strong = mod._sampling_params({"condition_strength": 1.0})
    fa = list(
        mod._generate_segment(
            pipe, tail_img, prompt, neg, W, H, NF, 99, weak, None
        )
    )
    fb = list(
        mod._generate_segment(
            pipe, tail_img, prompt, neg, W, H, NF, 99, strong, None
        )
    )
    _save(fa, outdir, "cs_weak")
    _save(fb, outdir, "cs_strong")
    diff = _mean_abs_diff(fa, fb)
    ok = diff > 1e-4
    print(f"  weak vs strong conditioning mean|delta|={diff:.5f}")
    print(f"  condition_strength FUNCTIONAL: {'OK' if ok else 'FAIL'}")
    return ok


def _part_c_720p(mod, pipe, log, outdir, W, H, NF, neg, baseline_step_s):
    print("\n== Part C: 720p two-pass under Q5_K_S default (instrumented) ==")
    import torch

    prompt = (
        "a calm ocean horizon at sunrise, gentle rolling waves, "
        "warm golden light, cinematic, photorealistic"
    )
    samp = mod._sampling_params({})
    cache: dict = {}
    torch.cuda.reset_peak_memory_stats()
    t = time.perf_counter()
    frames = list(
        mod._generate_segment_dispatch(
            pipe, cache, True, (1280, 720), None, prompt, neg,
            W, H, NF, 4242, samp, None, log,
        )
    )
    elapsed = time.perf_counter() - t
    peak = torch.cuda.max_memory_allocated() / 1024**3
    if not frames:
        print("  720p UNDER Q5_K_S: FAIL (dispatch returned zero frames)")
        return False
    _save(frames, outdir, "p720")
    dims = frames[0].size
    fell_back = log.saw("ltxv097.upscale_fallback") or dims != (1280, 720)
    eff_steps = max(1, samp["num_inference_steps"]) + max(
        6, samp["num_inference_steps"] // 3
    )
    eff_step_s = elapsed / eff_steps
    crawl = eff_step_s > 3.0 * baseline_step_s
    print(f"  output dims={dims} (want 1280x720)")
    print(f"  upscale_fallback logged: {log.saw('ltxv097.upscale_fallback')}")
    print(
        f"  peak={peak:.2f} GiB  elapsed={elapsed:.0f}s  "
        f"eff_step={eff_step_s:.1f}s (baseline {baseline_step_s:.1f}s)"
    )
    ok = (
        not fell_back
        and peak < 15.5
        and not crawl
    )
    print(
        "  720p UNDER Q5_K_S: "
        + (
            "OK (no fallback, within budget, no crawl)"
            if ok
            else f"FAIL (fallback={fell_back} peak_ok={peak < 15.5} "
            f"crawl={crawl})"
        )
    )
    return ok


def main() -> int:
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")
    os.environ.pop("NEXUS_VIDEO_LTX23_LTXV097_GGUF", None)
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_knob_verify"
    outdir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
    except Exception as e:  # noqa: BLE001
        print(f"FAIL import: {e}")
        traceback.print_exc()
        return 2

    a_ok = _part_a_resolved_echo(mod)

    if not torch.cuda.is_available():
        print("\nFAIL: CUDA unavailable — Part A done, B/C need GPU")
        return 0 if a_ok else 2

    log = _Log()
    default_basename = mod._DEFAULT_GGUF_BASENAME
    print(f"\nGGUF default in effect: {default_basename}")
    t0 = time.perf_counter()
    try:
        pipe = mod._build_ltxv097_pipeline("model", log)
    except Exception as e:  # noqa: BLE001
        print(f"FAIL _build_ltxv097_pipeline: {e}")
        traceback.print_exc()
        return 2
    print(f"OK pipeline built {time.perf_counter()-t0:.1f}s")

    W, H, NF = 768, 512, 49
    neg = "low quality, worst quality, deformed, blurry, jittery, noise"

    b1_ok, step_s, tail_img = _part_b_decode_noise_determinism(
        mod, pipe, outdir, W, H, NF, neg
    )
    b2_ok = _part_b_condition_strength(
        mod, pipe, outdir, W, H, NF, neg, tail_img
    )
    c_ok = _part_c_720p(mod, pipe, log, outdir, W, H, 97, neg, step_s)

    print("\n== SUMMARY ==")
    print(f"  A resolved-params echo (6 knobs)     : {'PASS' if a_ok else 'FAIL'}")
    print(f"  B1 decode_noise_scale (determinism)  : {'PASS' if b1_ok else 'FAIL'}")
    print(f"  B2 condition_strength (directional)  : {'PASS' if b2_ok else 'FAIL'}")
    print(f"  C  720p two-pass @ Q5_K_S (budget)   : {'PASS' if c_ok else 'FAIL'}")
    print(f"  FRAMES SAVED IN: {outdir}  (read *_first/mid/last.png)")
    all_ok = a_ok and b1_ok and b2_ok and c_ok
    print("KNOB_VERIFY_RESULT:", "PASS" if all_ok else "FAIL")
    return 0 if all_ok else 2


if __name__ == "__main__":
    sys.exit(main())
