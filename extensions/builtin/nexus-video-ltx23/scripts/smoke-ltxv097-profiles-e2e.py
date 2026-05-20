from __future__ import annotations

import gc
import importlib.util
import os
import sys
import time
import traceback
from pathlib import Path
from types import ModuleType
from typing import Any

_USAGE = """\
smoke-ltxv097-profiles-e2e — render one clip per generation profile

For EVERY profile in generation_profiles.list_profiles() this renders one
representative clip on the LTX-Video 0.9.7 DISTILLED 13B GGUF path, so an
operator can review the outputs side by side and pick which profile to
ship. The distilled pipeline is built ONCE and reused for all profiles.

Each profile drives its own recipe via _sampling_params({"profile": id}).
single-path profiles render one clip; manual_stitch profiles render
NEXUS_I2V_E2E_SEGMENTS segments (default 2 — smaller than the profile's
production segment count, to keep the e2e fast) and stitch them. The
cross-segment colour anchor follows each profile's render.color_anchor.

Metrics policy (matches smoke-ltxv097-multiscene-20s): motion / seam /
sharpness are advisory telemetry and do NOT change the exit code. A
profile hard-FAILS only on a render exception or a wrong decoded frame
count. Every clip is copied to the review folder for human review.

RUN (worker venv; .pth resolves ltx_video_worker from the MAIN repo):
  NEXUS_HOST_DATA_DIR=C:/Users/lazar/.nexus \\
  PYTHONPATH=<ext>/worker/src \\
  <venv>/Scripts/python.exe scripts/smoke-ltxv097-profiles-e2e.py

Env knobs:
  NEXUS_I2V_W (768) NEXUS_I2V_H (512)   gen resolution (snapped /32)
  NEXUS_I2V_FPS (24)        base frame rate
  NEXUS_I2V_SEG_SECONDS (4) per-segment / per-clip duration; frames 8n+1
  NEXUS_I2V_E2E_SEGMENTS (2)  manual_stitch segment count for the e2e
                           (the profile's own render.segments is the
                           production value; the e2e uses fewer)
  NEXUS_I2V_QUANT (ltxv-13b-0.9.7-distilled-Q4_K_M.gguf)
  NEXUS_I2V_SEED (_assets/i2v-possession-seed.jpg)  identity image
  NEXUS_I2V_GLOBAL_SEED (108)  master seed; per-segment seed = master+i*nf
  NEXUS_I2V_VRAM_CEILING (15.0)  GiB; reserved above → loud spill warning

Review folder: <NEXUS_HOST_DATA_DIR>/_ltxv097_profiles_e2e/ holds
profile_<id>.mp4 per profile plus segments/ and frames/ subdirs.

Exit: 0 all profiles pass, 1 any hard-fail, 2 prereq missing (no CUDA /
no seed image). Final line: PROFILES_E2E_RESULT: PASS|FAIL.
"""


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


def _load_sibling(name: str, filename: str) -> ModuleType:
    sibling = Path(__file__).resolve().parent / filename
    spec = importlib.util.spec_from_file_location(name, sibling)
    if spec is None or spec.loader is None:
        raise ImportError(f"cannot load sibling module: {sibling}")
    module = importlib.util.module_from_spec(spec)
    sys.modules[name] = module
    spec.loader.exec_module(module)
    return module


def _render_profile(
    profile: Any,
    *,
    helpers: ModuleType,
    mod: Any,
    motion_mod: Any,
    seam_lib: Any,
    torch: Any,
    stitch_segments: Any,
    pipe: Any,
    seed_img: Any,
    width: int,
    height: int,
    nf: int,
    global_seed: int,
    e2e_segments: int,
    segdir: Path,
    framedir: Path,
    reviewdir: Path,
    vram_ceiling: float,
    log: Any,
) -> dict[str, Any]:
    render = profile.render
    path = render.get("path", "single")
    advanced: dict[str, Any] = {"profile": profile.id}
    samp = mod._sampling_params(advanced)

    if path == "single":
        actions = [helpers.SCENE1_ACTIONS[0]]
    else:
        actions = helpers._seg_actions(e2e_segments)

    os.environ["NEXUS_I2V_COLOR_ANCHOR"] = (
        "1" if render.get("color_anchor", False) else "0"
    )

    sched = samp.get("timestep_schedule")
    print(
        f"\n== profile {profile.id} ({path}) ==\n"
        f"  status={profile.status} min_vram={profile.min_vram_gib}GiB "
        f"clips={len(actions)}\n"
        f"  sampling: steps={samp['num_inference_steps']} "
        f"guidance={samp['guidance_scale']} "
        f"image_cond_noise={samp['image_cond_noise_scale']} "
        f"cond_strength={samp['condition_strength']} "
        f"cond_tail={samp['condition_tail_frames']} "
        f"timesteps={'uniform' if not sched else sched} "
        f"color_anchor={render.get('color_anchor', False)}"
    )

    t0 = time.perf_counter()
    seg_paths, advisories, hard_fail = helpers._render_path_a(
        mod, motion_mod, seam_lib, torch, pipe, seed_img, actions,
        width, height, nf, global_seed, samp, segdir, framedir,
        vram_ceiling, log,
    )

    final_path: Path | None = None
    if seg_paths:
        final_path = reviewdir / f"profile_{profile.id}.mp4"
        stitch_segments(seg_paths, final_path)

    passed = hard_fail == 0 and len(seg_paths) == len(actions)
    advisory = "; ".join(advisories) if advisories else "(none)"
    print(
        f"  result={'PASS' if passed else 'FAIL'} "
        f"clips={len(seg_paths)}/{len(actions)} "
        f"hard_fail={hard_fail} {time.perf_counter() - t0:.0f}s"
    )
    for a in advisories:
        print(f"    {a}")
    if final_path is not None:
        print(f"  review clip: {final_path}")

    return {
        "id": profile.id,
        "name": profile.name,
        "path": path,
        "status": profile.status,
        "passed": passed,
        "advisory": advisory,
    }


def main() -> int:
    print(_USAGE)
    os.environ.setdefault("NEXUS_HOST_DATA_DIR", "C:/Users/lazar/.nexus")

    try:
        helpers = _load_sibling(
            "_ltxv097_multiscene_helpers", "smoke-ltxv097-multiscene-20s.py"
        )
    except Exception as e:  # noqa: BLE001
        print(f"FAIL: cannot load sibling multiscene smoke: {e}")
        traceback.print_exc()
        return 2

    width = helpers._snap32(_int("NEXUS_I2V_W", 768))
    height = helpers._snap32(_int("NEXUS_I2V_H", 512))
    fps = _int("NEXUS_I2V_FPS", 24)
    seg_seconds = _float("NEXUS_I2V_SEG_SECONDS", 4.0)
    nf = helpers._snap_8nplus1(int(round(seg_seconds * fps)))
    e2e_segments = max(1, _int("NEXUS_I2V_E2E_SEGMENTS", 2))
    quant = os.environ.get(
        "NEXUS_I2V_QUANT", "ltxv-13b-0.9.7-distilled-Q4_K_M.gguf"
    )
    here = Path(__file__).resolve().parent
    seed_path = os.environ.get(
        "NEXUS_I2V_SEED", str(here / "_assets" / "i2v-possession-seed.jpg")
    )
    global_seed = _int("NEXUS_I2V_GLOBAL_SEED", 108)
    vram_ceiling = _float("NEXUS_I2V_VRAM_CEILING", 15.0)

    reviewdir = Path(os.environ["NEXUS_HOST_DATA_DIR"]) / "_ltxv097_profiles_e2e"
    segdir = reviewdir / "segments"
    framedir = reviewdir / "frames"
    segdir.mkdir(parents=True, exist_ok=True)
    framedir.mkdir(parents=True, exist_ok=True)

    try:
        import torch
        from ltx_video_worker import generation_profiles  # type: ignore
        from ltx_video_worker import motion as motion_mod  # type: ignore
        from ltx_video_worker import pipeline_ltxv097 as mod  # type: ignore
        from ltx_video_worker import seam as seam_lib  # type: ignore
        from ltx_video_worker.ffmpeg_io import stitch_segments
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

    profiles = generation_profiles.list_profiles()
    if not profiles:
        print("FAIL: profile registry is empty")
        return 2

    log = helpers._Log()
    print(
        f"\ngen={width}x{height} fps={fps} seg_frames={nf} "
        f"(~{nf / fps:.1f}s) e2e_segments={e2e_segments} quant={quant}\n"
        f"profiles={len(profiles)}: {', '.join(p.id for p in profiles)}"
    )

    seed_img = mod._load_input_image(seed_path, width, height)
    offload = os.environ.get("NEXUS_VIDEO_LTX23_OFFLOAD_MODE", "model")
    vae_tiling = mod._resolve_vae_tiling({"vae_tiling": "aggressive"})

    t0 = time.perf_counter()
    pipe = mod._build_ltxv097_pipeline(
        offload, log, model_id=quant, vae_tiling=vae_tiling
    )
    print(f"pipeline built {time.perf_counter() - t0:.0f}s")

    results: list[dict[str, Any]] = []
    for profile in profiles:
        try:
            result = _render_profile(
                profile,
                helpers=helpers, mod=mod, motion_mod=motion_mod,
                seam_lib=seam_lib, torch=torch, stitch_segments=stitch_segments,
                pipe=pipe, seed_img=seed_img, width=width, height=height,
                nf=nf, global_seed=global_seed, e2e_segments=e2e_segments,
                segdir=segdir, framedir=framedir, reviewdir=reviewdir,
                vram_ceiling=vram_ceiling, log=log,
            )
        except Exception as e:  # noqa: BLE001 — render crash is a hard fail
            print(f"  FAIL profile {profile.id}: {e}")
            traceback.print_exc()
            result = {
                "id": profile.id, "name": profile.name,
                "path": profile.render.get("path", "single"),
                "status": profile.status, "passed": False,
                "advisory": f"render crash: {e}",
            }
        results.append(result)
        gc.collect()
        torch.cuda.empty_cache()

    del pipe
    gc.collect()
    torch.cuda.empty_cache()

    id_w = max(len("profile"), *(len(r["id"]) for r in results))
    name_w = max(len("name"), *(len(r["name"]) for r in results))
    path_w = max(len("path"), *(len(r["path"]) for r in results))
    print("\n== PROFILES E2E SUMMARY ==")
    print(
        f"  {'profile'.ljust(id_w)}  {'name'.ljust(name_w)}  "
        f"{'path'.ljust(path_w)}  result  advisory"
    )
    for r in results:
        print(
            f"  {r['id'].ljust(id_w)}  {r['name'].ljust(name_w)}  "
            f"{r['path'].ljust(path_w)}  "
            f"{'PASS' if r['passed'] else 'FAIL'}    {r['advisory']}"
        )
    print(f"  review folder: {reviewdir}")

    verdict = all(r["passed"] for r in results)
    print("PROFILES_E2E_RESULT:", "PASS" if verdict else "FAIL")
    return 0 if verdict else 1


if __name__ == "__main__":
    sys.exit(main())
