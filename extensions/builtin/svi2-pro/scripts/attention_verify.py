from __future__ import annotations

import argparse
import json
import sys
from typing import Any

import torch

from svi2_video_worker import attention_backend as ab

# Render-equivalence proxy: cosine similarity of the attention output vs the
# SDPA reference. SSIM>=0.96 on final frames roughly tracks cos>=0.97 here.
_COS_WARN = 0.97
_COS_FAIL = 0.85


def _cosine(a: torch.Tensor, b: torch.Tensor) -> float:
    af = a.float().flatten()
    bf = b.float().flatten()
    denom = af.norm() * bf.norm()
    if denom == 0:
        return 0.0
    return float((af @ bf) / denom)


def _run_backend(spec: ab.BackendSpec, q, k, v, ref) -> dict[str, Any]:
    why = ab._is_usable(spec, q.dtype)
    if why is not None:
        return {"backend": spec.name, "status": "skip", "reason": why}
    try:
        out = spec.fn(q, k, v, False)
    except Exception as exc:  # noqa: BLE001 — surface any kernel/import failure
        return {"backend": spec.name, "status": "error", "reason": f"{type(exc).__name__}: {exc}"}
    finite = bool(torch.isfinite(out).all().item())
    shape_ok = tuple(out.shape) == tuple(ref.shape)
    cos = _cosine(out, ref)
    status = "pass"
    if not finite or not shape_ok:
        status = "fail"
    elif cos < _COS_FAIL:
        status = "fail"
    elif cos < _COS_WARN:
        status = "warn"
    return {
        "backend": spec.name,
        "status": status,
        "cosine_vs_sdpa": round(cos, 5),
        "finite": finite,
        "shape_ok": shape_ok,
    }


def main() -> int:
    ap = argparse.ArgumentParser(description="Verify svi2-pro attention backends.")
    ap.add_argument("--backends", default="all", help="comma list of registry keys, or 'all'")
    ap.add_argument("--heads", type=int, default=12)
    ap.add_argument("--seq", type=int, default=512)
    ap.add_argument("--head-dim", type=int, default=128)
    ap.add_argument("--dtype", default="bfloat16", choices=["bfloat16", "float16"])
    ap.add_argument("--json", action="store_true", help="emit JSON only")
    args = ap.parse_args()

    if not torch.cuda.is_available():
        print("[attn-verify] FAIL: CUDA not available — run inside the worker venv on the GPU box", file=sys.stderr)
        return 2

    dtype = torch.bfloat16 if args.dtype == "bfloat16" else torch.float16
    dev = torch.device("cuda")
    g = torch.Generator(device="cuda").manual_seed(0)
    shape = (1, args.heads, args.seq, args.head_dim)
    q = torch.randn(shape, device=dev, dtype=dtype, generator=g)
    k = torch.randn(shape, device=dev, dtype=dtype, generator=g)
    v = torch.randn(shape, device=dev, dtype=dtype, generator=g)

    ref = ab._attn_sdpa(q, k, v, False)

    if args.backends == "all":
        names = list(ab._REGISTRY.keys())
    else:
        names = [ab._ALIASES.get(n.strip(), n.strip()) for n in args.backends.split(",")]

    results = []
    for name in names:
        spec = ab._REGISTRY.get(name)
        if spec is None:
            results.append({"backend": name, "status": "error", "reason": "unknown backend"})
            continue
        if name == "sdpa":
            results.append({"backend": "sdpa", "status": "pass", "cosine_vs_sdpa": 1.0, "finite": True, "shape_ok": True})
            continue
        results.append(_run_backend(spec, q, k, v, ref))

    sm = ab._SM
    report = {
        "sm": f"{sm[0]}{sm[1]}",
        "blackwell": ab._IS_BLACKWELL,
        "dtype": args.dtype,
        "shape": list(shape),
        "available": {
            "flash2": ab.FLASH_AVAILABLE,
            "sage2": ab.SAGE_AVAILABLE,
            "sage3_fp4": ab.SAGE3_AVAILABLE,
            "flash3_fp4": ab.FLASH3_AVAILABLE,
            "triton": ab.TRITON_AVAILABLE,
        },
        "results": results,
    }

    if args.json:
        print(json.dumps(report, indent=2))
    else:
        print(f"[attn-verify] sm_{report['sm']} blackwell={report['blackwell']} dtype={args.dtype} shape={shape}")
        for r in results:
            line = f"  {r['backend']:<12} {r['status']:<5}"
            if "cosine_vs_sdpa" in r:
                line += f" cos={r['cosine_vs_sdpa']}"
            if "reason" in r:
                line += f"  ({r['reason']})"
            print(line)

    if any(r["status"] == "fail" for r in results):
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
