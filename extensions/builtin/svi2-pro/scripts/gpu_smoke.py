from __future__ import annotations

import argparse
import json
import logging
import os
import subprocess
import sys
import time
from pathlib import Path
from typing import Any

_SCRIPT_DIR = Path(__file__).resolve().parent
_EXT_DIR = _SCRIPT_DIR.parent
_WORKER_DIR = _EXT_DIR / "worker"
_DATA_DIR = _EXT_DIR / "data"
_DEFAULT_PROMPTS_FILE = _DATA_DIR / "demonic_nun_prompts.txt"

_ARTIFACT_FILENAMES: dict[str, str] = {
    "dit-high-fp8": "I2V/Wan2_2-I2V-A14B-HIGH_fp8_e4m3fn_scaled_KJ.safetensors",
    "dit-low-fp8": "I2V/Wan2_2-I2V-A14B-LOW_fp8_e4m3fn_scaled_KJ.safetensors",
    "svi-lora-high": "version-2.0/SVI_Wan2.2-I2V-A14B_high_noise_lora_v2.0_pro.safetensors",
    "svi-lora-low": "version-2.0/SVI_Wan2.2-I2V-A14B_low_noise_lora_v2.0_pro.safetensors",
    "text-encoder": "umt5-xxl-enc-bf16.safetensors",
    "vae": "Wan2_1_VAE_bf16.safetensors",
    "tokenizer": "google/umt5-xxl",
}

_VRAM_WARN_GIB = 16.0
_PROFILE = "rtx50-fp8"


def _load_prompts(path: Path, num_clips: int) -> list[str]:
    lines = [l.strip() for l in path.read_text(encoding="utf-8").splitlines() if l.strip()]
    if len(lines) >= num_clips:
        return lines[:num_clips]
    extended = []
    for i in range(num_clips):
        extended.append(lines[i % len(lines)])
    return extended


def _probe_prereqs(models_dir: Path, ref_image: Path) -> list[str]:
    missing: list[str] = []
    if not ref_image.is_file():
        missing.append(f"ref-image not found: {ref_image}")
    for artifact_id, filename in _ARTIFACT_FILENAMES.items():
        candidate = models_dir / filename
        if not candidate.exists():
            missing.append(f"model artifact '{artifact_id}' not found: {candidate}")
    try:
        import torch
        if not torch.cuda.is_available():
            missing.append("CUDA not available (torch.cuda.is_available() = False)")
    except ImportError:
        missing.append("torch not importable — run from inside the worker venv")
    return missing


def _build_rpc(request_id: int, method: str, params: Any) -> str:
    return json.dumps({"jsonrpc": "2.0", "id": request_id, "method": method, "params": params}) + "\n"


def _run_worker(
    prompts: list[str],
    models_dir: Path,
    ref_image: Path,
    output_path: Path,
    num_clips: int,
    height: int,
    width: int,
    fps: int,
    interpolate_fps: int,
    interpolate_method: str,
    rife_bin: str,
    rife_model: str,
    rife_weights: str,
    cfg_scale: float,
    num_overlap_frame: int,
    num_motion_latent: int,
    pixel_re_encode: bool,
    num_motion_frame: int,
    teacache_thresh: float,
    blocks_to_swap: int,
    motion_scale_t: float,
    motion_scale_schedule: list[float] | None,
    adain_factor: float,
    image_cond_noise_scale: float,
    image_cond_noise_schedule: list[float] | None,
    num_inference_steps: int,
    sigma_shift: float,
    switch_boundary: float,
    distill_lora_high: str,
    distill_lora_low: str,
    dit_high_path: str,
    dit_low_path: str,
    fixed_sigmas: list[float] | None,
    log: logging.Logger,
) -> dict[str, Any]:
    env = os.environ.copy()
    env["NEXUS_VIDEO_SVI2_RUNTIME"] = _PROFILE

    cmd = [sys.executable, "-m", "svi2_video_worker"]
    proc = subprocess.Popen(
        cmd,
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=sys.stderr,
        cwd=str(_WORKER_DIR / "src"),
        env=env,
        text=True,
        bufsize=1,
    )
    assert proc.stdin is not None
    assert proc.stdout is not None

    handshake_req = _build_rpc(1, "handshake", {})
    proc.stdin.write(handshake_req)
    proc.stdin.flush()
    hs_line = proc.stdout.readline()
    hs = json.loads(hs_line)
    log.info("handshake: %s", hs.get("result", hs))

    render_params = {
        "ref_image_path": str(ref_image),
        "prompts": prompts,
        "models_dir": str(models_dir),
        "num_clips": num_clips,
        "height": height,
        "width": width,
        "fps": fps,
        "interpolate_fps": interpolate_fps,
        "interpolate_method": interpolate_method,
        "rife_bin": rife_bin or None,
        "rife_model": rife_model or None,
        "rife_weights": rife_weights or None,
        "cfg_scale": cfg_scale,
        "num_overlap_frame": num_overlap_frame,
        "num_motion_latent": num_motion_latent,
        "pixel_re_encode": pixel_re_encode,
        "num_motion_frame": num_motion_frame,
        "teacache_thresh": teacache_thresh,
        "blocks_to_swap": blocks_to_swap,
        "motion_scale_t": motion_scale_t,
        "motion_scale_schedule": motion_scale_schedule,
        "adain_factor": adain_factor,
        "image_cond_noise_scale": image_cond_noise_scale,
        "image_cond_noise_schedule": image_cond_noise_schedule,
        "num_inference_steps": num_inference_steps,
        "sigma_shift": sigma_shift,
        "switch_boundary": switch_boundary,
        "distill_lora_high": distill_lora_high or None,
        "distill_lora_low": distill_lora_low or None,
        "dit_high_path": dit_high_path or None,
        "dit_low_path": dit_low_path or None,
        "fixed_sigmas": fixed_sigmas,
        "output_path": str(output_path),
    }
    render_req = _build_rpc(2, "svi2.video.render.start", render_params)
    proc.stdin.write(render_req)
    proc.stdin.flush()

    final_response: dict[str, Any] = {}
    for raw in proc.stdout:
        raw = raw.strip()
        if not raw:
            continue
        try:
            msg = json.loads(raw)
        except json.JSONDecodeError:
            log.warning("non-json stdout: %s", raw[:200])
            continue
        if "method" in msg:
            method = msg["method"]
            params = msg.get("params", {})
            log.info("[notify] %s %s", method, json.dumps(params)[:120])
        elif "id" in msg and msg.get("id") == 2:
            final_response = msg
            break

    proc.stdin.close()
    proc.wait(timeout=5)
    return final_response


def main() -> int:
    parser = argparse.ArgumentParser(
        prog="gpu_smoke.py",
        description="Operator i2v smoke: demonic nun SVI2-Pro render on RTX 5070 Ti",
    )
    parser.add_argument("--models-dir", required=True, help="path to downloaded model weights")
    parser.add_argument("--ref-image", required=True, help="i2v conditioning image")
    parser.add_argument(
        "--prompts-file",
        default=None,
        help="newline-delimited prompt file (default: bundled demonic_nun_prompts.txt)",
    )
    parser.add_argument("--output", default="videos/svi2_nun.mp4", help="output mp4 path")
    parser.add_argument("--num-clips", type=int, default=4)
    parser.add_argument("--height", type=int, default=832)
    parser.add_argument("--width", type=int, default=480)
    parser.add_argument("--fps", type=int, default=15, help="native render/playback fps")
    parser.add_argument(
        "--interpolate-fps",
        type=int,
        default=0,
        help="post-process frame interpolation target fps (0=off; adds frames, keeps motion speed)",
    )
    parser.add_argument(
        "--interpolate-method",
        default="rife",
        choices=["rife", "rife_torch", "rife_ncnn", "ffmpeg"],
        help="rife=auto (torch IFNet on CUDA, else ncnn bin, else ffmpeg fallback); ffmpeg=minterpolate",
    )
    parser.add_argument("--rife-bin", default="", help="path to rife-ncnn-vulkan binary (rife_ncnn)")
    parser.add_argument("--rife-model", default="", help="optional rife-ncnn model name/dir (-m)")
    parser.add_argument("--rife-weights", default="", help="path to RIFE flownet.pkl (rife_torch; default downloads from HF)")
    parser.add_argument("--cfg-scale", type=float, default=5.0)
    parser.add_argument("--num-overlap-frame", type=int, default=4)
    parser.add_argument("--num-motion-latent", type=int, default=1)
    parser.add_argument(
        "--pixel-re-encode",
        action=argparse.BooleanOptionalAction,
        default=True,
        help="VAE decode->re-encode the motion tail between clips (caps continuation drift); --no-pixel-re-encode to disable",
    )
    parser.add_argument("--num-motion-frame", type=int, default=4, help="pixel frames re-encoded for --pixel-re-encode")
    parser.add_argument(
        "--teacache-thresh",
        type=float,
        default=0.0,
        help="TeaCache accumulated rel-L1 threshold (0=off; try 0.05-0.15, higher=faster/lower quality)",
    )
    parser.add_argument(
        "--blocks-to-swap",
        type=int,
        default=40,
        help="DiT blocks offloaded CPU<->GPU per forward (40=all/lowest VRAM; lower=faster if VRAM fits)",
    )
    parser.add_argument(
        "--motion-scale-t",
        type=float,
        default=1.0,
        help="Wan motion scale: temporal RoPE stretch (1.0=off; 1.3-1.6 adds motion, fights stiff faces)",
    )
    parser.add_argument(
        "--motion-scale-schedule",
        default="",
        help="per-clip temporal motion ramp, comma list e.g. 1.0,1.6,2.2 (overrides --motion-scale-t)",
    )
    parser.add_argument(
        "--adain-factor",
        type=float,
        default=0.0,
        help="latent AdaIN drift control: match later clips' colour stats to clip-0 (0=off, 0.3-0.5 typical)",
    )
    parser.add_argument(
        "--image-cond-noise-scale",
        type=float,
        default=0.0,
        help="ICN: noise the ref/anchor conditioning so prompt transformations (eyes/veins/pose) can override the input image (0=rigid ref-lock; try 0.2-0.6)",
    )
    parser.add_argument(
        "--image-cond-noise-schedule",
        default="",
        help="per-clip ICN ramp, comma list e.g. 0.1,0.3,0.6 (overrides --image-cond-noise-scale)",
    )
    parser.add_argument("--num-inference-steps", type=int, default=50)
    parser.add_argument(
        "--sigma-shift",
        type=float,
        default=5.0,
        help="FlowMatch shift (Wan default 5.0; lower ~3.5-4.0 = more motion, range 3.0-5.0)",
    )
    parser.add_argument(
        "--switch-boundary",
        type=float,
        default=0.9,
        help="MoE high->low expert switch boundary (Wan2.2 i2v = 0.9 / t<900)",
    )
    parser.add_argument(
        "--distill-lora-high",
        default="",
        help="path to high-noise distill (Lightning/lightx2v) LoRA; enables 4-8 step cfg1",
    )
    parser.add_argument("--distill-lora-low", default="", help="path to low-noise distill LoRA")
    parser.add_argument(
        "--dit-high",
        default="",
        help="override high-noise DiT fp8 weights path (e.g. lightx2v distilled model)",
    )
    parser.add_argument("--dit-low", default="", help="override low-noise DiT fp8 weights path")
    parser.add_argument(
        "--fixed-sigmas",
        default="",
        help="comma sigma list for distilled models, e.g. 1.0,0.9375001,0.8333333,0.625,0.0 (overrides shift)",
    )
    args = parser.parse_args()

    logging.basicConfig(
        level=logging.INFO,
        format="[%(asctime)s] %(levelname)s %(message)s",
        datefmt="%H:%M:%S",
        stream=sys.stderr,
    )
    log = logging.getLogger("svi2-smoke")

    models_dir = Path(args.models_dir)
    ref_image = Path(args.ref_image)
    output_path = Path(args.output)
    prompts_file = Path(args.prompts_file) if args.prompts_file else _DEFAULT_PROMPTS_FILE

    missing = _probe_prereqs(models_dir, ref_image)
    if missing:
        for m in missing:
            print(f"[prereq FAIL] {m}", file=sys.stderr)
        return 2

    prompts = _load_prompts(prompts_file, args.num_clips)
    log.info("loaded %d prompts from %s", len(prompts), prompts_file)
    for i, p in enumerate(prompts):
        log.info("  clip%d: %s", i, p[:80])

    output_path.parent.mkdir(parents=True, exist_ok=True)

    t0 = time.monotonic()
    response = _run_worker(
        prompts=prompts,
        models_dir=models_dir,
        ref_image=ref_image,
        output_path=output_path,
        num_clips=args.num_clips,
        height=args.height,
        width=args.width,
        fps=args.fps,
        interpolate_fps=args.interpolate_fps,
        interpolate_method=args.interpolate_method,
        rife_bin=args.rife_bin,
        rife_model=args.rife_model,
        rife_weights=args.rife_weights,
        cfg_scale=args.cfg_scale,
        num_overlap_frame=args.num_overlap_frame,
        num_motion_latent=args.num_motion_latent,
        pixel_re_encode=args.pixel_re_encode,
        num_motion_frame=args.num_motion_frame,
        teacache_thresh=args.teacache_thresh,
        blocks_to_swap=args.blocks_to_swap,
        motion_scale_t=args.motion_scale_t,
        motion_scale_schedule=(
            [float(s) for s in args.motion_scale_schedule.split(",")]
            if args.motion_scale_schedule
            else None
        ),
        adain_factor=args.adain_factor,
        image_cond_noise_scale=args.image_cond_noise_scale,
        image_cond_noise_schedule=(
            [float(s) for s in args.image_cond_noise_schedule.split(",")]
            if args.image_cond_noise_schedule
            else None
        ),
        num_inference_steps=args.num_inference_steps,
        sigma_shift=args.sigma_shift,
        switch_boundary=args.switch_boundary,
        distill_lora_high=args.distill_lora_high,
        distill_lora_low=args.distill_lora_low,
        dit_high_path=args.dit_high,
        dit_low_path=args.dit_low,
        fixed_sigmas=[float(s) for s in args.fixed_sigmas.split(",")] if args.fixed_sigmas else None,
        log=log,
    )
    wall_s = time.monotonic() - t0

    if "error" in response:
        print(f"\n[FAIL] worker returned error: {response['error']}", file=sys.stderr)
        return 1

    result = response.get("result", {})
    out_mp4 = Path(result.get("output_path", str(output_path)))
    report_path = out_mp4.parent / "render_report.json"

    verdict = "PASS"
    concerns: list[str] = []

    if not out_mp4.is_file() or out_mp4.stat().st_size == 0:
        verdict = "FAIL"
        concerns.append(f"output mp4 missing or empty: {out_mp4}")

    model_audit: dict[str, Any] = {}
    if report_path.is_file():
        try:
            report = json.loads(report_path.read_text(encoding="utf-8"))
        except Exception as e:
            concerns.append(f"render_report.json unreadable: {e}")
            report = {}

        model_audit = report.get("model_audit", {})

        if report.get("nan_detected"):
            concerns.append("render_report: nan_detected = true")

        peak_bytes = report.get("peak_vram_bytes", 0)
        peak_gib = peak_bytes / 1024 ** 3
        if peak_gib > _VRAM_WARN_GIB:
            concerns.append(f"peak VRAM {peak_gib:.2f} GiB exceeds {_VRAM_WARN_GIB} GiB (warn only)")
            log.warning("peak VRAM %.2f GiB > %.1f GiB", peak_gib, _VRAM_WARN_GIB)
        else:
            log.info("peak VRAM %.2f GiB — within budget", peak_gib)
    else:
        concerns.append("render_report.json not written (ok for pipeline without report path)")

    print("\n" + "=" * 60)
    print(f"SVI2-Pro GPU smoke — {verdict}")
    print(f"wall time : {wall_s:.1f}s")
    print(f"output    : {out_mp4}")
    if model_audit:
        for expert, audit in model_audit.items():
            if isinstance(audit, dict):
                overlap = audit.get("overlap_pct", "?")
                print(f"  {expert} overlap: {overlap}%")
    if concerns:
        print("concerns (non-fatal unless FAIL above):")
        for c in concerns:
            print(f"  ! {c}")
    print("=" * 60)

    return 0 if verdict == "PASS" else 1


if __name__ == "__main__":
    raise SystemExit(main())
