"""N2 lightweight equivalence gate for the official NVFP4 single-file checkpoint.

Blueprint step N2 (`plans/ltx23-native-nvfp4-and-gguf.md`). The official
`Lightricks/LTX-2.3-nvfp4` is a *single-file* transformer-only safetensors,
not a diffusers tree, so the tree-vs-tree OzzyGT gate (model_index.json +
transformer/config.json byte parity) cannot apply verbatim. This gate is the
documented single-file adaptation:

  1. File present and fully sized (single ``.safetensors``).
  2. Safetensors header only (no body read) parsed for:
     - an NVFP4 / ModelOpt quantisation marker, and
     - a tensor topology consistent with the dg845 reference
       ``LTX2VideoTransformer3DModel`` contract (num_layers depth).
  3. On-disk absolute path + byte size emitted for the checkpoint record.

Exit codes: 0 PASS, 1 FAIL (gate not satisfied), 2 prerequisite missing.
Pure stdlib + a struct-unpacked safetensors header read; no torch, no model
materialisation, so it is cheap to re-run.
"""

from __future__ import annotations

import argparse
import json
import re
import struct
import sys
from pathlib import Path
from typing import Any

# Render-critical architecture keys taken from the dg845 reference
# transformer config (the contract the single-file must satisfy).
_DG845_TRANSFORMER_CONTRACT: dict[str, Any] = {
    "_class_name": "LTX2VideoTransformer3DModel",
    "in_channels": 128,
    "out_channels": 128,
    "num_layers": 48,
    "num_attention_heads": 32,
    "attention_head_dim": 128,
    "caption_channels": 3840,
    "cross_attention_dim": 4096,
}

# Quant markers that prove the weights are pre-quantised NVFP4 (NVIDIA
# ModelOpt FP4) on disk — so the resolver MUST skip on-the-fly quant.
_NVFP4_DTYPE_TOKENS = {"F4", "FP4", "F4_E2M1", "U8", "I8", "F8_E4M3", "F8_E5M2"}
_MODELOPT_META_HINTS = ("modelopt", "nvfp4", "fp4", "quant", "amax", "scale")

# Transformer block index pattern, e.g. "transformer_blocks.47.attn1...".
_BLOCK_IDX_RE = re.compile(r"(?:^|\.)(?:transformer_)?blocks?\.(\d+)\.")


def _read_safetensors_header(path: Path) -> tuple[dict[str, Any], dict[str, Any]]:
    """Return (tensor_index, metadata) from the safetensors header only.

    Safetensors layout: u64 little-endian header length, then that many
    bytes of JSON. We never touch the >20 GB tensor body.
    """
    with path.open("rb") as fh:
        raw_len = fh.read(8)
        if len(raw_len) != 8:
            raise ValueError("file too short to contain a safetensors header")
        (header_len,) = struct.unpack("<Q", raw_len)
        if header_len <= 0 or header_len > 200 * 1024 * 1024:
            raise ValueError(f"implausible safetensors header length: {header_len}")
        header_json = fh.read(header_len)
        if len(header_json) != header_len:
            raise ValueError("truncated safetensors header (file still downloading?)")
    header = json.loads(header_json)
    meta = header.pop("__metadata__", {}) or {}
    return header, meta


def _detect_nvfp4_marker(tensor_index: dict[str, Any], meta: dict[str, Any]) -> tuple[bool, str]:
    """True iff the header proves NVFP4/ModelOpt pre-quantisation.

    Two independent signals; either is sufficient:
      - explicit metadata hint (format/quant keys), or
      - sub-byte / FP4 / FP8 tensor dtypes plus per-tensor scale tensors
        (ModelOpt emits ``*.weight_scale`` / ``*.input_scale`` siblings).
    """
    meta_blob = json.dumps(meta).lower()
    for hint in _MODELOPT_META_HINTS:
        if hint in meta_blob:
            return True, f"metadata hint '{hint}' in __metadata__"

    dtypes: set[str] = set()
    has_scale_tensor = False
    for name, spec in tensor_index.items():
        if isinstance(spec, dict):
            dt = str(spec.get("dtype", "")).upper()
            if dt:
                dtypes.add(dt)
        lname = name.lower()
        if lname.endswith(("weight_scale", "input_scale", "amax")) or "_scale" in lname:
            has_scale_tensor = True

    quant_dtypes = dtypes & _NVFP4_DTYPE_TOKENS
    if quant_dtypes and has_scale_tensor:
        return True, f"sub-byte dtypes {sorted(quant_dtypes)} + per-tensor scale tensors"
    if "F4" in dtypes or "FP4" in dtypes or "F4_E2M1" in dtypes:
        return True, f"explicit FP4 tensor dtype present ({sorted(dtypes)})"
    return False, f"no NVFP4 marker (dtypes={sorted(dtypes)}, scale_tensors={has_scale_tensor})"


def _infer_block_depth(tensor_index: dict[str, Any]) -> int:
    """Max transformer block index + 1, inferred from tensor key names."""
    max_idx = -1
    for name in tensor_index:
        m = _BLOCK_IDX_RE.search(name)
        if m:
            max_idx = max(max_idx, int(m.group(1)))
    return max_idx + 1


def validate(ckpt_path: Path, reference: dict[str, Any]) -> tuple[bool, list[str]]:
    notes: list[str] = []
    ok = True

    size = ckpt_path.stat().st_size
    size_gib = size / 1024**3
    notes.append(f"checkpoint: {ckpt_path}")
    notes.append(f"size: {size_gib:.2f} GiB ({size} bytes)")
    # Official file is ~21.7 GB; reject an obviously partial download.
    if size_gib < 18.0:
        ok = False
        notes.append(f"FAIL: file is {size_gib:.2f} GiB, expected ~21.7 GiB (partial download?)")

    try:
        tensor_index, meta = _read_safetensors_header(ckpt_path)
    except (OSError, ValueError) as exc:
        return False, notes + [f"FAIL: cannot parse safetensors header: {exc}"]

    n_tensors = len(tensor_index)
    notes.append(f"tensors in header: {n_tensors}")

    marker_ok, marker_why = _detect_nvfp4_marker(tensor_index, meta)
    notes.append(f"NVFP4 marker: {'PRESENT' if marker_ok else 'ABSENT'} — {marker_why}")
    if not marker_ok:
        ok = False
        notes.append("FAIL: no NVFP4/ModelOpt quant marker — not a pre-quantised tree")

    depth = _infer_block_depth(tensor_index)
    expected_layers = reference["num_layers"]
    notes.append(f"inferred transformer block depth: {depth} (dg845 contract: {expected_layers})")
    if depth != expected_layers:
        ok = False
        notes.append(
            f"FAIL: block depth {depth} != dg845 contract {expected_layers} "
            "— not the same LTX-2.3 transformer architecture"
        )

    notes.append(
        "NOTE: single-file has no model_index.json/config.json; equivalence is "
        "tensor-topology vs the dg845 LTX2VideoTransformer3DModel contract "
        "(documented N2 single-file gate adaptation). Companion VAE + Gemma-3 + "
        "scheduler come from the dg845 tree at load time (N3)."
    )
    return ok, notes


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument(
        "--checkpoint",
        type=Path,
        default=Path.home() / ".nexus" / "models" / "Lightricks" / "LTX-2.3-nvfp4"
        / "ltx-2.3-22b-dev-nvfp4.safetensors",
        help="path to the single-file NVFP4 safetensors",
    )
    args = ap.parse_args(argv)

    if not args.checkpoint.is_file():
        print(f"PREREQ MISSING: checkpoint not found at {args.checkpoint}", file=sys.stderr)
        return 2

    ok, notes = validate(args.checkpoint, _DG845_TRANSFORMER_CONTRACT)
    for line in notes:
        print(line)
    print(f"\nN2 EQUIVALENCE GATE: {'PASS' if ok else 'FAIL'}")
    return 0 if ok else 1


if __name__ == "__main__":
    raise SystemExit(main())
