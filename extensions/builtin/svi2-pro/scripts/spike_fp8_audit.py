from __future__ import annotations

import argparse
import sys
from pathlib import Path

_SCRIPT_DIR = Path(__file__).resolve().parent
_EXT_DIR = _SCRIPT_DIR.parent
_SRC_DIR = _EXT_DIR / "worker" / "src"

_ARTIFACT_HIGH_FP8 = "I2V/Wan2_2-I2V-A14B-HIGH_fp8_e4m3fn_scaled_KJ.safetensors"
_ARTIFACT_LORA_HIGH = "version-2.0/SVI_Wan2.2-I2V-A14B_high_noise_lora_v2.0_pro.safetensors"

_FP8_OVERLAP_THRESHOLD = 95.0
_LORA_HIT_THRESHOLD = 95.0
_VRAM_LIMIT_GIB = 16.0

_WAN22_A14B_CONFIG: dict = {
    "has_image_input": False,
    "patch_size": (1, 2, 2),
    "in_dim": 36,
    "dim": 5120,
    "ffn_dim": 13824,
    "freq_dim": 256,
    "text_dim": 4096,
    "out_dim": 16,
    "num_heads": 40,
    "num_layers": 40,
    "eps": 1e-6,
    "require_clip_embedding": False,
}


def _probe_prereqs(models_dir: Path) -> list[str]:
    missing: list[str] = []
    for fname in (_ARTIFACT_HIGH_FP8, _ARTIFACT_LORA_HIGH):
        p = models_dir / fname
        if not p.exists():
            missing.append(f"missing: {p}")
    try:
        import torch
        if not torch.cuda.is_available():
            missing.append("CUDA not available")
    except ImportError:
        missing.append("torch not importable — run from inside the worker venv")
    return missing


def main() -> int:
    parser = argparse.ArgumentParser(
        prog="spike_fp8_audit.py",
        description=(
            "T2.5 spike: load high fp8 expert into WanModel, "
            "audit key overlap + LoRA hit-rate, run one forward pass."
        ),
    )
    parser.add_argument("--models-dir", required=True, help="path to downloaded model weights")
    parser.add_argument("--blocks-to-swap", type=int, default=20, help="transformer blocks to offload to CPU")
    args = parser.parse_args()

    models_dir = Path(args.models_dir)

    missing = _probe_prereqs(models_dir)
    if missing:
        for m in missing:
            print(f"[prereq FAIL] {m}", file=sys.stderr)
        return 2

    if str(_SRC_DIR) not in sys.path:
        sys.path.insert(0, str(_SRC_DIR))

    import torch
    from svi2_video_worker.wan22 import WanModel
    from svi2_video_worker.fp8_loader import (
        load_fp8_state_dict,
        build_fp8_linears,
        apply_fp8_linears_to_module,
        audit_key_overlap,
    )
    from svi2_video_worker.lora import load_lora_pairs, wrap_module_with_lora

    print("[spike] building WanModel (A14B config)…")
    dit = WanModel(**_WAN22_A14B_CONFIG).eval()

    fp8_path = models_dir / _ARTIFACT_HIGH_FP8
    print(f"[spike] loading fp8 state dict from {fp8_path.name}…")
    state = load_fp8_state_dict(fp8_path)

    fp8_audit = audit_key_overlap(state, dit)
    overlap_pct: float = fp8_audit["overlap_pct"]
    print(
        f"[spike] fp8 overlap: {fp8_audit['matched_count']}/{fp8_audit['target_count']} "
        f"= {overlap_pct:.1f}%"
    )
    if overlap_pct < _FP8_OVERLAP_THRESHOLD:
        print(f"[FAIL] fp8 overlap {overlap_pct:.1f}% < threshold {_FP8_OVERLAP_THRESHOLD}%", file=sys.stderr)
        return 1

    linears = build_fp8_linears(state)
    apply_fp8_linears_to_module(dit, linears)
    print(f"[spike] applied {len(linears)} fp8 linears to WanModel")

    lora_path = models_dir / _ARTIFACT_LORA_HIGH
    print(f"[spike] loading high SVI LoRA from {lora_path.name}…")
    lora_pairs = load_lora_pairs(lora_path)
    lora_audit = wrap_module_with_lora(dit, lora_pairs)

    lora_total = lora_audit["wrapped_count"] + lora_audit["missing_count"]
    lora_hit_pct = 100.0 * lora_audit["wrapped_count"] / lora_total if lora_total > 0 else 0.0
    print(
        f"[spike] LoRA hit-rate: {lora_audit['wrapped_count']}/{lora_total} "
        f"= {lora_hit_pct:.1f}%"
    )
    if lora_hit_pct < _LORA_HIT_THRESHOLD:
        print(f"[FAIL] LoRA hit-rate {lora_hit_pct:.1f}% < threshold {_LORA_HIT_THRESHOLD}%", file=sys.stderr)
        return 1

    for p in dit.parameters():
        if p.dtype == torch.float32:
            p.data = p.data.to(torch.bfloat16)

    print(f"[spike] block-swapping {args.blocks_to_swap} blocks (CPU offload) for forward pass…")
    dit.block_swap(
        args.blocks_to_swap,
        main_device=torch.device("cuda"),
        offload_device=torch.device("cpu"),
    )
    torch.cuda.reset_peak_memory_stats()

    height, width = 832, 480
    frames = 81
    lat_h = height // 8
    lat_w = width // 8
    total_latent_frames = (frames - 1) // 4 + 1

    batch = 1
    in_dim = _WAN22_A14B_CONFIG["in_dim"]
    out_dim = _WAN22_A14B_CONFIG["out_dim"]
    text_dim = _WAN22_A14B_CONFIG["text_dim"]

    x = torch.randn(batch, out_dim, total_latent_frames, lat_h, lat_w, device="cuda", dtype=torch.bfloat16)
    timestep = torch.tensor([500.0], device="cuda")
    context = torch.randn(batch, 77, text_dim, device="cuda", dtype=torch.bfloat16)
    y = torch.zeros(batch, in_dim - out_dim, total_latent_frames, lat_h, lat_w, device="cuda", dtype=torch.bfloat16)

    print(f"[spike] running forward pass: x={list(x.shape)} t={timestep.tolist()} context={list(context.shape)} y={list(y.shape)}…")
    with torch.no_grad():
        out = dit(x=x, timestep=timestep, context=context, clip_feature=None, y=y)

    peak_gib = torch.cuda.max_memory_allocated() / 1024 ** 3
    finite = torch.isfinite(out).all().item()

    print(f"[spike] output shape: {list(out.shape)}")
    print(f"[spike] finite:       {finite}")
    print(f"[spike] peak VRAM:    {peak_gib:.2f} GiB")

    fail = False
    if not finite:
        print("[FAIL] output contains NaN or Inf", file=sys.stderr)
        fail = True
    if peak_gib > _VRAM_LIMIT_GIB:
        print(f"[FAIL] peak VRAM {peak_gib:.2f} GiB > {_VRAM_LIMIT_GIB} GiB", file=sys.stderr)
        fail = True

    print()
    print("=" * 50)
    print(f"fp8 overlap  : {overlap_pct:.1f}%  (threshold {_FP8_OVERLAP_THRESHOLD}%)")
    print(f"LoRA hit-rate: {lora_hit_pct:.1f}%  (threshold {_LORA_HIT_THRESHOLD}%)")
    print(f"forward NaN  : {not finite}")
    print(f"peak VRAM    : {peak_gib:.2f} GiB  (limit {_VRAM_LIMIT_GIB} GiB)")
    print("=" * 50)
    print("PASS" if not fail else "FAIL")
    return 1 if fail else 0


if __name__ == "__main__":
    raise SystemExit(main())
