from __future__ import annotations

import gc
import os
import sys
import time
import traceback
from pathlib import Path

_USAGE = """\
smoke-ltxv097-negprompt-verify — does the negative prompt condition?

Verifies the classifier-free-guidance cancellation property on the
LTX-Video 0.9.7 distilled 13B GGUF path. At guidance_scale=1.0 the CFG
formula collapses to v_guided = v_cond — the negative prompt cancels
algebraically and has ZERO effect. Above 1.0 it conditions generation.

For each guidance value this renders the SAME clip twice with the SAME
seed — once with an empty negative prompt, once with a strong one — and
measures the mean per-frame pixel difference:
  guidance 1.0  → diff must be ~0   (negative prompt proven inert)
  guidance >1.0 → diff must be > 0  (negative prompt proven active)

Unlike the multiscene smoke's advisory metrics, the diff threshold here
IS a hard gate: it tests a deterministic mathematical property, not
subjective quality, so it is robust rather than flaky.

RUN (worker venv; .pth resolves ltx_video_worker from the MAIN repo):
  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \\
  PYTHONPATH=<ext>/worker/src \\
  <venv>/Scripts/python.exe scripts/smoke-ltxv097-negprompt-verify.py

Env knobs:
  NEXUS_I2V_W (768) NEXUS_I2V_H (512)  gen resolution (snapped /32)
  NEXUS_I2V_FPS (24)        base frame rate
  NEXUS_I2V_FRAMES (49)     frames per probe clip (8n+1, ~2 s)
  NEXUS_I2V_GUIDANCES (1.0,1.25,3.0)   comma-separated guidance sweep
  NEXUS_I2V_QUANT (ltxv-13b-0.9.7-distilled-Q4_K_M.gguf)
  NEXUS_I2V_SEED (_assets/i2v-possession-seed.jpg)  identity image
  NEXUS_I2V_GLOBAL_SEED (108)   shared seed for every paired render
  NEXUS_I2V_DIFF_EPS (0.002)    diff below → "inert", above → "active"

Exit: 0 PASS, 1 FAIL (a guidance value behaved against the CFG law),
      2 prerequisite missing.
"""

CHARACTER = (
    "the same pale-faced young nun, black veil, white wimple, "
    "dark hollow eyes"
)
ACTION = (
    "she slowly tilts her head, her grin widening as her dark eyes "
    "fix on the camera, candle flames trembling beside her"
)
STYLE = (
    "locked-off camera, candlelit gothic cathedral, volumetric haze, "
    "cinematic 35mm film grain, photorealistic"
)
# A strong, deliberately broad negative — if the negative branch is
# active at all, this many failure modes will perturb the output.
NEG_STRONG = (
    "worst quality, low quality, blurry, jittery, distorted, deformed, "
    "motion smear, bad anatomy, washed out, oversaturated, grainy, "
    "extra limbs, mutated, ugly, watermark, text, monochrome"
)


class _Log:
    def info(self, *a, **k):
        print("  [log]", a[0] if a else "", {x: y for x, y in k.items()})

    def error(self, *a, **k):
        print("  [log:err]", a, k)


def _int(env: str, d: int) -> int:
    try:
        return int(os.environ.get(env, str(d)))
    except ValueError:
        return d


def _float(env: str, d: float) -> float:
    try:
        return float(os.environ.get(env, str(d)))
    except ValueError:
        return d


def _snap32(x: int) -> int:
    return max(32, int(round(x / 32.0)) * 32)


def _snap_8nplus1(x: int) -> int:
    return max(9, ((max(9, x) - 1) // 8) * 8 + 1)


def _guidances() -> list[float]:
    raw = os.environ.get("NEXUS_I2V_GUIDANCES", "1.0,1.25,3.0")
    out: list[float] = []
    for tok in raw.split(","):
        tok = tok.strip()
        if not tok:
            continue
        try:
            out.append(float(tok))
        except ValueError:
            pass
    return out or [1.0, 1.25, 3.0]


def _frame_diff(a_frames, b_frames) -> float:
    """Mean per-frame absolute RGB difference, normalised to 0..1."""
    import numpy as np

    n = min(len(a_frames), len(b_frames))
    if n == 0:
        return 0.0
    total = 0.0
    for i in range(n):
        x = np.asarray(a_frames[i].convert("RGB"), dtype=np.float32)
        y = np.asarray(b_frames[i].convert("RGB"), dtype=np.float32)
        total += float(np.mean(np.abs(x - y)) / 255.0)
    return total / n


def main() -> int:
    print(_USAGE)
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")

    width = _snap32(_int("NEXUS_I2V_W", 768))
    height = _snap32(_int("NEXUS_I2V_H", 512))
    fps = _int("NEXUS_I2V_FPS", 24)
    nf = _snap_8nplus1(_int("NEXUS_I2V_FRAMES", 49))
    guidances = _guidances()
    quant = os.environ.get(
        "NEXUS_I2V_QUANT", "ltxv-13b-0.9.7-distilled-Q4_K_M.gguf"
    )
    here = Path(__file__).resolve().parent
    seed_path = os.environ.get(
        "NEXUS_I2V_SEED", str(here / "_assets" / "i2v-possession-seed.jpg")
    )
    global_seed = _int("NEXUS_I2V_GLOBAL_SEED", 108)
    diff_eps = _float("NEXUS_I2V_DIFF_EPS", 0.002)
    outdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_negprompt"
    framedir = outdir / "frames"
    framedir.mkdir(parents=True, exist_ok=True)

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
    if not Path(seed_path).is_file():
        print(f"FAIL: seed image not found: {seed_path}")
        return 2

    log = _Log()
    prompt = f"{CHARACTER}. {ACTION}. {STYLE}"
    print(
        f"\nverify gen={width}x{height} frames={nf} (~{nf / fps:.1f}s) "
        f"quant={quant} guidances={guidances} diff_eps={diff_eps}"
    )

    t0 = time.perf_counter()
    pipe = mod._build_ltxv097_pipeline(
        os.environ.get("NEXUS_VIDEO_LTX23_OFFLOAD_MODE", "model"),
        log,
        model_id=quant,
        vae_tiling=mod._resolve_vae_tiling({"vae_tiling": "aggressive"}),
    )
    print(f"pipeline built {time.perf_counter() - t0:.0f}s")
    seed_img = mod._load_input_image(seed_path, width, height)

    def _render(guidance: float, negative: str):
        advanced = {"preset": "distilled", "guidance_scale": guidance}
        samp = mod._sampling_params(advanced)
        return list(
            mod._generate_segment_dispatch(
                pipe, {}, False, None, seed_img, prompt, negative,
                width, height, nf, global_seed, samp, None, log,
                "two_pass",
            )
        )

    results: list[tuple[float, float, str, bool]] = []
    failures = 0
    for guidance in guidances:
        t = time.perf_counter()
        try:
            empty = _render(guidance, "")
            strong = _render(guidance, NEG_STRONG)
        except Exception as e:  # noqa: BLE001 — render crash is a hard fail
            print(f"  FAIL guidance={guidance}: {e}")
            traceback.print_exc()
            failures += 1
            continue
        diff = _frame_diff(empty, strong)
        # CFG law: the negative branch is only used when guidance > 1.0.
        # At or below 1.0 it cancels (inert); above it conditions. A
        # violation either way is a hard failure.
        cfg_off = guidance <= 1.0 + 1e-6
        if cfg_off:
            ok = diff < diff_eps
            expect = "inert (diff ~ 0)"
        else:
            ok = diff > diff_eps
            expect = "active (diff > 0)"
        tag = f"g{guidance:g}".replace(".", "_")
        mid = len(empty) // 2
        empty[mid].save(framedir / f"{tag}_neg-empty_mid.png")
        strong[mid].save(framedir / f"{tag}_neg-strong_mid.png")
        verdict = "PASS" if ok else "FAIL"
        if not ok:
            failures += 1
        results.append((guidance, diff, expect, ok))
        print(
            f"  guidance={guidance:<5g} diff={diff:.5f}  expect {expect}"
            f"  -> {verdict}  ({time.perf_counter() - t:.0f}s)"
        )
        del empty, strong
        gc.collect()
        torch.cuda.empty_cache()

    print("\n== NEGATIVE-PROMPT CONDITIONING VERIFICATION ==")
    for guidance, diff, expect, ok in results:
        print(
            f"  guidance={guidance:<5g} diff={diff:.5f}  {expect}  "
            f"{'PASS' if ok else 'FAIL'}"
        )
    print(
        "  Interpretation: a near-zero diff at guidance 1.0 confirms the "
        "negative prompt is inert on the distilled CFG-off path — lean on "
        "positive-prompt detail there. A non-zero diff above 1.0 confirms "
        "negatives condition generation once CFG is engaged."
    )
    print(f"  frames: {framedir}")
    verdict = failures == 0 and len(results) == len(guidances)
    print("NEGPROMPT_VERIFY_RESULT:", "PASS" if verdict else "FAIL")
    return 0 if verdict else 1


if __name__ == "__main__":
    sys.exit(main())
