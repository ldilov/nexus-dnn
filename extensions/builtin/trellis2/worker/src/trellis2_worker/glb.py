"""Minimal valid glTF-binary (.glb) writer — pure stdlib, zero torch.

Used by the fake backend so offline E2E produces a byte-valid `model/gltf-binary`
artifact the host store + web `<model-viewer>` can round-trip. The real backend
(gb10-flash) writes its GLB via `o_voxel.postprocess.to_glb` instead — this
module is only the no-GPU stand-in.
"""
from __future__ import annotations

import json
import struct
from pathlib import Path

GLB_MAGIC = 0x46546C67  # b"glTF" little-endian
GLB_VERSION = 2
CHUNK_JSON = 0x4E4F534A  # b"JSON"
CHUNK_BIN = 0x004E4942  # b"BIN\0"


def _pad4(data: bytes, pad_byte: int) -> bytes:
    rem = len(data) % 4
    if rem == 0:
        return data
    return data + bytes([pad_byte]) * (4 - rem)


def patch_glb_metallic(path: Path, metallic_factor: float) -> bool:
    """Rewrite a GLB so every material's `metallicFactor` = `metallic_factor`.

    TRELLIS bakes a uniform fully-metallic map (metallic=1) which renders black
    without strong IBL. Clamping the factor (default 0 = dielectric) lets the
    baked base-color/roughness read correctly in DCCs/engines. Edits only the
    JSON chunk; the BIN chunk (geometry + texture images) is preserved verbatim.
    Returns True if any material was changed.
    """
    factor = max(0.0, min(1.0, float(metallic_factor)))
    data = path.read_bytes()
    magic, _ver, _total = struct.unpack("<III", data[:12])
    if magic != GLB_MAGIC:
        return False
    off = 12
    json_len, json_type = struct.unpack("<II", data[off : off + 8])
    off += 8
    if json_type != CHUNK_JSON:
        return False
    json_bytes = data[off : off + json_len]
    rest = data[off + json_len :]

    gltf = json.loads(json_bytes)
    changed = False
    for mat in gltf.get("materials", []):
        pbr = mat.setdefault("pbrMetallicRoughness", {})
        if pbr.get("metallicFactor") != factor:
            pbr["metallicFactor"] = factor
            changed = True
    if not changed:
        return False

    new_json = _pad4(json.dumps(gltf, separators=(",", ":")).encode("utf-8"), 0x20)
    total = 12 + 8 + len(new_json) + len(rest)
    with path.open("wb") as fh:
        fh.write(struct.pack("<III", GLB_MAGIC, GLB_VERSION, total))
        fh.write(struct.pack("<II", len(new_json), CHUNK_JSON))
        fh.write(new_json)
        fh.write(rest)
    return True


def write_minimal_glb(output_path: Path) -> tuple[Path, int, int]:
    """Write a single-triangle GLB. Returns (path, vertices, faces)."""
    positions = [
        (0.0, 0.0, 0.0),
        (1.0, 0.0, 0.0),
        (0.0, 1.0, 0.0),
    ]
    indices = [0, 1, 2]

    bin_pos = b"".join(struct.pack("<3f", *v) for v in positions)
    bin_idx = b"".join(struct.pack("<H", i) for i in indices)
    idx_offset = len(bin_pos)
    bin_chunk = _pad4(bin_pos + bin_idx, 0x00)

    gltf = {
        "asset": {"version": "2.0", "generator": "nexus.3d.trellis2 fake"},
        "scene": 0,
        "scenes": [{"nodes": [0]}],
        "nodes": [{"mesh": 0}],
        "meshes": [
            {
                "primitives": [
                    {"attributes": {"POSITION": 0}, "indices": 1, "mode": 4}
                ]
            }
        ],
        "buffers": [{"byteLength": len(bin_chunk)}],
        "bufferViews": [
            {"buffer": 0, "byteOffset": 0, "byteLength": len(bin_pos), "target": 34962},
            {
                "buffer": 0,
                "byteOffset": idx_offset,
                "byteLength": len(bin_idx),
                "target": 34963,
            },
        ],
        "accessors": [
            {
                "bufferView": 0,
                "componentType": 5126,
                "count": len(positions),
                "type": "VEC3",
                "min": [0.0, 0.0, 0.0],
                "max": [1.0, 1.0, 0.0],
            },
            {
                "bufferView": 1,
                "componentType": 5123,
                "count": len(indices),
                "type": "SCALAR",
            },
        ],
    }

    json_chunk = _pad4(json.dumps(gltf, separators=(",", ":")).encode("utf-8"), 0x20)
    total = 12 + 8 + len(json_chunk) + 8 + len(bin_chunk)

    output_path.parent.mkdir(parents=True, exist_ok=True)
    with output_path.open("wb") as fh:
        fh.write(struct.pack("<III", GLB_MAGIC, GLB_VERSION, total))
        fh.write(struct.pack("<II", len(json_chunk), CHUNK_JSON))
        fh.write(json_chunk)
        fh.write(struct.pack("<II", len(bin_chunk), CHUNK_BIN))
        fh.write(bin_chunk)

    return output_path, len(positions), len(indices) // 3
