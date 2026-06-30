import struct
from pathlib import Path

from faceavatar_worker.glb import write_minimal_glb


def test_write_minimal_glb_is_byte_valid(tmp_path: Path):
    out = tmp_path / "fake.glb"
    path, verts, faces = write_minimal_glb(out)

    assert path.exists() and path.stat().st_size > 0
    assert verts == 3
    assert faces == 1

    data = out.read_bytes()
    magic, version, total = struct.unpack_from("<III", data, 0)
    assert magic == 0x46546C67  # b"glTF"
    assert version == 2
    assert total == len(data)
    assert data[:4] == b"glTF"


def test_glb_json_chunk_parses(tmp_path: Path):
    import json

    out = tmp_path / "parse.glb"
    write_minimal_glb(out)
    data = out.read_bytes()

    json_len, json_type = struct.unpack_from("<II", data, 12)
    assert json_type == 0x4E4F534A  # b"JSON"
    json_bytes = data[20 : 20 + json_len]
    gltf = json.loads(json_bytes.decode("utf-8").rstrip())
    assert gltf["asset"]["version"] == "2.0"
    assert gltf["meshes"][0]["primitives"][0]["mode"] == 4
