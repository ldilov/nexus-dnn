#!/usr/bin/env python3
"""Per-Layer Numeric Gate for the NVFP4 weight loader.

WHY THIS EXISTS
---------------
The NVFP4 path renders pure noise while the FP8 path works. The only number
ever measured on the dequant was a global *correlation* of ~0.92 against the FP8
base — and correlation is invariant to scale and offset (``corr(w, a*w+b)==1``),
so it is structurally blind to the two most likely bugs: a global ``weight_scale_2``
slip and a per-block scale transpose / swizzle mismatch.

This tool settles decode-vs-schedule WITHOUT rendering. For one real DiT linear it
decodes the NVFP4 weight under every plausible convention permutation
(nibble order x scale axis x weight_scale_2 application) and ranks each by
*relative L2* against a trusted oracle (the FP8/bf16 weight). The winning
permutation reveals the correct convention; if even the winner is far from the
oracle the bug is in the E2M1 table or the byte packing, not the schedule.

A flow-match sigma schedule cannot move ANY number this tool reports — the
weights are identical regardless of sigmas — so a red gate here proves the
problem is the decode, full stop.

USAGE
-----
    python nvfp4_numeric_gate.py \
        --nvfp4  /path/to/wan22_dit.nvfp4.safetensors \
        --oracle /path/to/wan22_dit.fp8_e4m3.safetensors \
        [--layer blocks.0.self_attn.q] \
        [--threshold 0.02] \
        [--inhouse]              # also diff the in-house nvfp4_loader decode

Exit code is non-zero when the best achievable relative-L2 exceeds --threshold,
so it can gate CI / a smoke step.
"""

from __future__ import annotations

import argparse
import sys
from dataclasses import dataclass
from typing import Optional

import torch

# E2M1 (FP4: 1 sign, 2 exp, 1 mantissa, bias=1) magnitude table indexed by the
# low 3 bits. Subnormal (exp==0, m==1) -> 0.5; max finite -> 6.0.
_E2M1_MAG: tuple[float, ...] = (0.0, 0.5, 1.0, 1.5, 2.0, 3.0, 4.0, 6.0)


def _build_e2m1_lut() -> torch.Tensor:
    """Return the 16-entry signed FP4 E2M1 decode table as float32."""
    vals = []
    for code in range(16):
        mag = _E2M1_MAG[code & 0x7]
        vals.append(-mag if (code >> 3) & 0x1 else mag)
    return torch.tensor(vals, dtype=torch.float32)


_E2M1_LUT = _build_e2m1_lut()


def _to_float(t: torch.Tensor) -> torch.Tensor:
    """Coerce any stored scale tensor (fp8 / bf16 / fp16 / fp32) to float32."""
    return t.detach().to(torch.float32)


def decode_fp4_nibbles(packed: torch.Tensor, out_features: int, in_features: int, *, upper_first: bool) -> torch.Tensor:
    """Unpack a uint8 [out, in/2] tensor into FP4 values [out, in].

    ``upper_first=True`` means logical element 0 is the high nibble of byte 0.
    """
    if packed.dtype != torch.uint8:
        packed = packed.view(torch.uint8)
    packed = packed.reshape(out_features, in_features // 2).to(torch.int64)
    hi = (packed >> 4) & 0xF
    lo = packed & 0xF
    first, second = (hi, lo) if upper_first else (lo, hi)
    interleaved = torch.stack([first, second], dim=-1).reshape(out_features, in_features)
    return _E2M1_LUT.to(interleaved.device)[interleaved]


def _expand_block_scale(block_scale: torch.Tensor, out_features: int, in_features: int, *, axis_in: bool) -> Optional[torch.Tensor]:
    """Broadcast a per-block scale to [out, in].

    ``axis_in=True`` treats the stored tensor as [out, in/16] (block axis = input).
    ``axis_in=False`` treats it as [in/16, out] (transposed) and corrects it.
    """
    bs = _to_float(block_scale)
    if not axis_in:
        bs = bs.t().contiguous()
    if bs.shape[0] != out_features:
        return None
    expanded = torch.repeat_interleave(bs, 16, dim=1)
    if expanded.shape[1] < in_features:
        return None
    return expanded[:, :in_features]


@dataclass(frozen=True)
class Candidate:
    """One decode-convention hypothesis and its score against the oracle."""

    upper_first: bool
    axis_in: bool
    scale2_mode: str
    rel_l2: float
    weight_cos: float
    rms_ratio: float

    @property
    def label(self) -> str:
        nib = "upper-first" if self.upper_first else "lower-first"
        axis = "[out,in/16]" if self.axis_in else "[in/16,out]^T"
        return f"nibble={nib:<11} scale_axis={axis:<13} scale2={self.scale2_mode:<6}"


def _apply_scale2(weight: torch.Tensor, scale2: Optional[torch.Tensor], mode: str) -> torch.Tensor:
    if scale2 is None or mode == "none":
        return weight
    s2 = _to_float(scale2)
    if s2.numel() == 1:
        s2 = s2.reshape(())
    return weight * s2 if mode == "mul" else weight / s2


def _rel_l2(a: torch.Tensor, b: torch.Tensor) -> float:
    denom = b.norm().clamp(min=1e-12)
    return float((a - b).norm() / denom)


def _cosine(a: torch.Tensor, b: torch.Tensor) -> float:
    return float(torch.nn.functional.cosine_similarity(a.flatten(), b.flatten(), dim=0))


def _rms(t: torch.Tensor) -> float:
    return float(t.pow(2).mean().sqrt())


def enumerate_candidates(
    packed: torch.Tensor,
    block_scale: torch.Tensor,
    scale2: Optional[torch.Tensor],
    ref: torch.Tensor,
) -> list[Candidate]:
    """Score every (nibble order x scale axis x scale2 mode) permutation vs ref."""
    out_features, in_features = ref.shape
    results: list[Candidate] = []
    for upper_first in (True, False):
        fp4 = decode_fp4_nibbles(packed, out_features, in_features, upper_first=upper_first)
        for axis_in in (True, False):
            expanded = _expand_block_scale(block_scale, out_features, in_features, axis_in=axis_in)
            if expanded is None:
                continue
            base = fp4 * expanded
            for scale2_mode in ("mul", "div", "none"):
                w = _apply_scale2(base, scale2, scale2_mode)
                results.append(
                    Candidate(
                        upper_first=upper_first,
                        axis_in=axis_in,
                        scale2_mode=scale2_mode,
                        rel_l2=_rel_l2(w, ref),
                        weight_cos=_cosine(w, ref),
                        rms_ratio=_rms(w) / max(_rms(ref), 1e-12),
                    )
                )
    return sorted(results, key=lambda c: c.rel_l2)


# --- safetensors plumbing --------------------------------------------------

_COMFY_PREFIXES: tuple[str, ...] = ("diffusion_model.", "model.diffusion_model.", "model.")


def _strip_prefix(key: str) -> str:
    for prefix in _COMFY_PREFIXES:
        if key.startswith(prefix):
            return key[len(prefix) :]
    return key


def _load(path: str) -> dict[str, torch.Tensor]:
    from safetensors.torch import load_file

    raw = load_file(path, device="cpu")
    return {_strip_prefix(k): v for k, v in raw.items()}


_SCALE2_SUFFIXES = (".weight_scale_2", ".weight_scale_2_inv", ".scale_2")
_BLOCKSCALE_SUFFIXES = (".weight_scale", ".scale_weight", ".weight_scale_inv")
_ORACLE_SCALE_SUFFIXES = (".scale_weight", ".weight_scale", ".scale", ".weight_scale_inv")


def _find_nvfp4_bases(sd: dict[str, torch.Tensor]) -> list[str]:
    bases: list[str] = []
    for key, value in sd.items():
        if not key.endswith(".weight") or value.dtype != torch.uint8:
            continue
        base = key[: -len(".weight")]
        has_scale2 = any(f"{base}{s}" in sd for s in _SCALE2_SUFFIXES)
        has_block = any(f"{base}{s}" in sd for s in _BLOCKSCALE_SUFFIXES)
        if has_scale2 and has_block:
            bases.append(base)
    return sorted(bases)


def _first(sd: dict[str, torch.Tensor], base: str, suffixes: tuple[str, ...]) -> Optional[torch.Tensor]:
    for s in suffixes:
        if f"{base}{s}" in sd:
            return sd[f"{base}{s}"]
    return None


def _oracle_weight(sd: dict[str, torch.Tensor], base: str) -> Optional[torch.Tensor]:
    """Reconstruct the bf16 oracle weight [out, in] for ``base`` from the FP8 file."""
    wkey = f"{base}.weight"
    if wkey not in sd:
        return None
    w = sd[wkey]
    if w.dtype == torch.uint8:
        return None
    w = _to_float(w)
    scale = _first(sd, base, _ORACLE_SCALE_SUFFIXES)
    if scale is not None:
        w = w * _to_float(scale)
    return w


def _infer_in_features(packed: torch.Tensor, block_scale: torch.Tensor) -> Optional[int]:
    return packed.shape[1] * 2 if packed.dim() == 2 else None


# --- reporting -------------------------------------------------------------


def _per_block_error_map(w: torch.Tensor, ref: torch.Tensor, rows: int = 16, cols: int = 16) -> str:
    """Text heatmap of per-block-16 mean abs error; hot stripes = transpose/swizzle."""
    out_f, in_f = ref.shape
    blocks = in_f // 16
    err = (w - ref).abs().reshape(out_f, blocks, 16).mean(dim=2)
    err = err / err.max().clamp(min=1e-12)
    ramp = " .:-=+*#%@"
    r_idx = torch.linspace(0, out_f - 1, min(rows, out_f)).long()
    c_idx = torch.linspace(0, blocks - 1, min(cols, blocks)).long()
    lines = []
    for r in r_idx:
        row = "".join(ramp[min(int(err[r, c] * (len(ramp) - 1)), len(ramp) - 1)] for c in c_idx)
        lines.append(row)
    return "\n".join(lines)


def _activation_test(w: torch.Tensor, ref: torch.Tensor) -> tuple[float, float]:
    gen = torch.Generator().manual_seed(0)
    x = torch.randn(64, ref.shape[1], generator=gen)
    y_ref = x @ ref.t()
    y = x @ w.t()
    ratio = float((y / y_ref.clamp(min=1e-9)).median())
    return _rel_l2(y, y_ref), ratio


def _inhouse_decode(packed, block_scale, scale2, out_f, in_f) -> Optional[torch.Tensor]:
    """Best-effort: import the in-house nvfp4_loader and decode the same layer."""
    try:
        from svi2_video_worker import nvfp4_loader  # type: ignore
    except Exception as exc:  # noqa: BLE001
        print(f"[gate] in-house nvfp4_loader not importable: {exc}", file=sys.stderr)
        return None
    for fn_name in ("dequantize_nvfp4", "dequant_nvfp4", "decode_nvfp4"):
        fn = getattr(nvfp4_loader, fn_name, None)
        if fn is None:
            continue
        try:
            return _to_float(fn(packed, block_scale, scale2))
        except Exception as exc:  # noqa: BLE001
            print(f"[gate] in-house {fn_name} raised: {exc}", file=sys.stderr)
    print("[gate] no usable dequant entry point on nvfp4_loader", file=sys.stderr)
    return None


def run_gate(nvfp4_path: str, oracle_path: str, layer: Optional[str], threshold: float, inhouse: bool) -> int:
    nv = _load(nvfp4_path)
    oracle = _load(oracle_path)

    bases = _find_nvfp4_bases(nv)
    if not bases:
        print("[gate] no NVFP4 (uint8 weight + block-scale + weight_scale_2) tensors found", file=sys.stderr)
        return 2

    if layer is None:
        layer = next((b for b in bases if _oracle_weight(oracle, b) is not None), bases[0])

    ref = _oracle_weight(oracle, layer)
    if ref is None:
        print(f"[gate] oracle has no usable weight for '{layer}'", file=sys.stderr)
        return 2

    packed = nv[f"{layer}.weight"]
    block_scale = _first(nv, layer, _BLOCKSCALE_SUFFIXES)
    scale2 = _first(nv, layer, _SCALE2_SUFFIXES)
    out_f, in_f = ref.shape
    if packed.shape[1] * 2 != in_f:
        print(f"[gate] WARN packed cols*2 ({packed.shape[1] * 2}) != oracle in_features ({in_f})", file=sys.stderr)

    print(f"[gate] layer        = {layer}")
    print(f"[gate] shape        = [{out_f}, {in_f}]  (block_scale {tuple(block_scale.shape)}, "
          f"scale2 {tuple(scale2.shape) if scale2 is not None else None})")
    print(f"[gate] oracle rms   = {_rms(ref):.6g}\n")

    candidates = enumerate_candidates(packed, block_scale, scale2, ref)

    print("rank  rel_L2     w_cos    rms_ratio  convention")
    print("----  ---------  -------  ---------  " + "-" * 50)
    for i, c in enumerate(candidates[:12]):
        flag = "  <-- BEST" if i == 0 else ""
        print(f"{i:>4}  {c.rel_l2:>9.5f}  {c.weight_cos:>7.4f}  {c.rms_ratio:>9.4f}  {c.label}{flag}")

    best = candidates[0]
    best_w = _apply_scale2(
        decode_fp4_nibbles(packed, out_f, in_f, upper_first=best.upper_first)
        * _expand_block_scale(block_scale, out_f, in_f, axis_in=best.axis_in),
        scale2,
        best.scale2_mode,
    )

    act_rel, act_ratio = _activation_test(best_w, ref)
    print(f"\n[gate] BEST convention: {best.label}")
    print(f"[gate] weight  rel_L2 = {best.rel_l2:.5f}   weight_cos = {best.weight_cos:.4f}")
    print(f"[gate] act     rel_L2 = {act_rel:.5f}   median(y/y_ref) = {act_ratio:.4f}")
    print("\n[gate] per-block error map (rows=out, cols=in/16; hot ~ wrong block):")
    print(_per_block_error_map(best_w, ref))

    if inhouse:
        w_inhouse = _inhouse_decode(packed, block_scale, scale2, out_f, in_f)
        if w_inhouse is not None and w_inhouse.shape == ref.shape:
            print(f"\n[gate] in-house decode rel_L2 vs oracle = {_rel_l2(w_inhouse, ref):.5f}")
            print(f"[gate] in-house decode rel_L2 vs BEST   = {_rel_l2(w_inhouse, best_w):.5f}")

    ok = best.rel_l2 <= threshold
    verdict = "PASS" if ok else "FAIL"
    print(f"\n[gate] {verdict}: best rel_L2 {best.rel_l2:.5f} "
          f"{'<=' if ok else '>'} threshold {threshold}")
    if not ok:
        print("[gate] decode is wrong — this is NOT a sigma-schedule problem. "
              "Fix the convention above (or the E2M1/byte-packing if even BEST is far).")
    return 0 if ok else 1


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--nvfp4", required=True, help="NVFP4 safetensors checkpoint")
    ap.add_argument("--oracle", required=True, help="FP8/bf16 safetensors of the same model (ground truth)")
    ap.add_argument("--layer", default=None, help="layer base name (default: first matchable)")
    ap.add_argument("--threshold", type=float, default=0.02, help="max best rel_L2 to PASS (default 0.02)")
    ap.add_argument("--inhouse", action="store_true", help="also diff the in-house nvfp4_loader decode")
    args = ap.parse_args()
    return run_gate(args.nvfp4, args.oracle, args.layer, args.threshold, args.inhouse)


if __name__ == "__main__":
    raise SystemExit(main())
