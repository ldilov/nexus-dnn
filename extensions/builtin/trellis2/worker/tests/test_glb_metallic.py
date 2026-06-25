"""patch_glb_metallic rewrites material metallicFactor, preserving the BIN chunk."""
from __future__ import annotations

import json
import struct
from pathlib import Path

from trellis2_worker.glb import (
    CHUNK_BIN,
    CHUNK_JSON,
    GLB_MAGIC,
    GLB_VERSION,
    patch_glb_metallic,
)


def _write_glb(path: Path, metallic: float) -> None:
    gltf = {
        "asset": {"version": "2.0"},
        "materials": [
            {"pbrMetallicRoughness": {"metallicFactor": metallic, "roughnessFactor": 0.5}}
        ],
    }
    json_chunk = json.dumps(gltf, separators=(",", ":")).encode("utf-8")
    while len(json_chunk) % 4:
        json_chunk += b" "
    bin_chunk = b"\x01\x02\x03\x04"
    total = 12 + 8 + len(json_chunk) + 8 + len(bin_chunk)
    with path.open("wb") as fh:
        fh.write(struct.pack("<III", GLB_MAGIC, GLB_VERSION, total))
        fh.write(struct.pack("<II", len(json_chunk), CHUNK_JSON))
        fh.write(json_chunk)
        fh.write(struct.pack("<II", len(bin_chunk), CHUNK_BIN))
        fh.write(bin_chunk)


def _read_factor(path: Path) -> float:
    data = path.read_bytes()
    off = 12
    jl, _ = struct.unpack("<II", data[off : off + 8])
    off += 8
    gltf = json.loads(data[off : off + jl])
    return gltf["materials"][0]["pbrMetallicRoughness"]["metallicFactor"]


def test_patch_sets_metallic_factor_and_preserves_bin(tmp_path: Path) -> None:
    glb = tmp_path / "m.glb"
    _write_glb(glb, 1.0)
    assert patch_glb_metallic(glb, 0.0) is True
    assert _read_factor(glb) == 0.0
    data = glb.read_bytes()
    assert data[-4:] == b"\x01\x02\x03\x04"
    assert data[:4] == b"glTF"


def test_patch_clamps_and_is_idempotent(tmp_path: Path) -> None:
    glb = tmp_path / "m.glb"
    _write_glb(glb, 0.0)
    assert patch_glb_metallic(glb, 5.0) is True  # clamped to 1.0
    assert _read_factor(glb) == 1.0
    assert patch_glb_metallic(glb, 1.0) is False  # already 1.0 → no change


def test_patch_noop_without_materials(tmp_path: Path) -> None:
    glb = tmp_path / "empty.glb"
    json_chunk = b'{"asset":{"version":"2.0"}}'
    while len(json_chunk) % 4:
        json_chunk += b" "
    total = 12 + 8 + len(json_chunk)
    with glb.open("wb") as fh:
        fh.write(struct.pack("<III", GLB_MAGIC, GLB_VERSION, total))
        fh.write(struct.pack("<II", len(json_chunk), CHUNK_JSON))
        fh.write(json_chunk)
    assert patch_glb_metallic(glb, 0.0) is False
