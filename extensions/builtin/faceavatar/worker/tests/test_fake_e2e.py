import asyncio
import threading
from pathlib import Path

import pytest

from faceavatar_worker.cancel import GenerationCancelled
from faceavatar_worker.main import Worker
from faceavatar_worker.pipeline_fake import (
    generate_head_fake_e2e,
    graft_head_fake_e2e,
    register_fake_handlers,
)
from faceavatar_worker.rpc import Methods, Notifications


def _drive(tmp_path: Path, method: str, params: dict):
    worker = Worker(profile="fake")
    notes: list[tuple[str, dict]] = []

    async def _capture(m: str, payload: dict):
        notes.append((m, payload))

    worker.emit_notification = _capture  # type: ignore
    register_fake_handlers(worker)
    handler = worker._handlers[method]
    result = asyncio.new_event_loop().run_until_complete(handler(params))
    return result, notes


def _gen_params(tmp_path: Path, **overrides) -> dict:
    out = tmp_path / "gen" / "head.glb"
    params = {
        "image_path": "x.png",
        "output_path": str(out),
        "seed": 42,
        "expression": "neutral",
        "crop": "bust",
        "texture": True,
        "arc_iters": 5,
        "residency": "balanced",
    }
    params.update(overrides)
    return params


def _graft_params(tmp_path: Path, **overrides) -> dict:
    out = tmp_path / "graft" / "head.glb"
    params = {
        "base_mesh_path": "base.glb",
        "image_path": "x.png",
        "output_path": str(out),
        "seed": 7,
        "seam": "neck",
        "keep_hair": True,
        "blend_ring": 0.3,
        "align": "landmark",
        "texture_blend": True,
        "residency": "balanced",
    }
    params.update(overrides)
    return params


# --- generate_head ---


def test_fake_generate_head_produces_glb_and_metadata(tmp_path: Path):
    result, _ = _drive(tmp_path, Methods.GENERATE_HEAD_START, _gen_params(tmp_path))

    out = Path(result["output_path"])
    assert out.exists() and out.stat().st_size > 0
    assert out.read_bytes()[:4] == b"glTF"

    assert result["status"] == "ok"
    assert result["profile"] == "fake"
    assert result["mesh_glb"] == result["output_path"]
    assert result["mesh"]["vertices"] == 3
    assert result["mesh"]["faces"] == 1

    meta = result["metadata_json"]
    for key in ("operator", "stage_timings", "mesh", "fallbacks", "profile", "models", "perf"):
        assert key in meta, key
    assert meta["operator"] == "generate_head"
    assert meta["models"]["flame"] == "FLAME-2020"
    assert meta["expression"] == "neutral"
    assert meta["crop"] == "bust"
    assert meta["arc_iters"] == 5


def test_fake_generate_head_emits_ordered_progress_then_done(tmp_path: Path):
    _, notes = _drive(tmp_path, Methods.GENERATE_HEAD_START, _gen_params(tmp_path))
    methods = [m for m, _ in notes]

    assert methods[0] == Notifications.PROGRESS
    assert methods[-1] == Notifications.DONE
    assert Notifications.ARTIFACT_CREATED in methods

    stages = [p["stage"] for m, p in notes if m == Notifications.PROGRESS]
    assert stages[0] == "start"
    for expected in ("preprocess", "arcface", "flame_fit", "arc2avatar", "mesh", "texture", "glb"):
        assert expected in stages, expected


def test_fake_generate_head_arc_iters_drives_step_count(tmp_path: Path):
    _, notes = _drive(tmp_path, Methods.GENERATE_HEAD_START, _gen_params(tmp_path, arc_iters=9))
    arc = [p for m, p in notes if m == Notifications.PROGRESS and p["stage"] == "arc2avatar"]
    assert len(arc) == 9
    assert [p["step"] for p in arc] == list(range(1, 10))


def test_fake_generate_head_artifact_is_gltf_binary_mime(tmp_path: Path):
    _, notes = _drive(tmp_path, Methods.GENERATE_HEAD_START, _gen_params(tmp_path))
    artifact = next(p for m, p in notes if m == Notifications.ARTIFACT_CREATED)
    assert artifact["mime_type"] == "model/gltf-binary"
    assert artifact["role"] == "mesh.glb"


def test_fake_generate_head_memory_stats_between_artifact_and_done(tmp_path: Path):
    _, notes = _drive(tmp_path, Methods.GENERATE_HEAD_START, _gen_params(tmp_path))
    methods = [m for m, _ in notes]
    art_idx = methods.index(Notifications.ARTIFACT_CREATED)
    mem_idx = methods.index(Notifications.MEMORY_STATS)
    assert art_idx < mem_idx < methods.index(Notifications.DONE)


def test_fake_generate_head_cancels_and_writes_no_glb(tmp_path: Path):
    params = _gen_params(tmp_path)
    notes: list[tuple[str, dict]] = []

    async def _emit(m: str, p: dict) -> None:
        notes.append((m, p))

    cancel_event = threading.Event()
    cancel_event.set()

    with pytest.raises(GenerationCancelled):
        asyncio.new_event_loop().run_until_complete(
            generate_head_fake_e2e(params, _emit, cancel_event=cancel_event)
        )

    assert not Path(params["output_path"]).exists()
    assert Notifications.DONE not in [m for m, _ in notes]


# --- graft_head ---


def test_fake_graft_head_produces_glb_and_echoes_base_mesh(tmp_path: Path):
    result, notes = _drive(tmp_path, Methods.GRAFT_HEAD_START, _graft_params(tmp_path))

    out = Path(result["output_path"])
    assert out.exists() and out.read_bytes()[:4] == b"glTF"
    assert result["status"] == "ok"
    assert result["mesh_glb"] == result["output_path"]

    meta = result["metadata_json"]
    assert meta["operator"] == "graft_head"
    assert meta["base_mesh"] == "base.glb"
    assert meta["seam"] == "neck"
    assert meta["align"] == "landmark"
    assert meta["keep_hair"] is True
    assert meta["texture_blend"] is True

    done = next(p for m, p in notes if m == Notifications.DONE)
    assert done["base_mesh"] == "base.glb"


def test_fake_graft_head_emits_ordered_progress_then_done(tmp_path: Path):
    _, notes = _drive(tmp_path, Methods.GRAFT_HEAD_START, _graft_params(tmp_path))
    methods = [m for m, _ in notes]

    assert methods[0] == Notifications.PROGRESS
    assert methods[-1] == Notifications.DONE
    assert Notifications.ARTIFACT_CREATED in methods

    stages = [p["stage"] for m, p in notes if m == Notifications.PROGRESS]
    assert stages[0] == "start"
    for expected in ("load_base", "arcface", "flame_fit", "align", "cut", "weld", "blend", "glb"):
        assert expected in stages, expected


def test_fake_graft_head_weld_step_count_is_deterministic(tmp_path: Path):
    _, notes = _drive(tmp_path, Methods.GRAFT_HEAD_START, _graft_params(tmp_path))
    weld = [p for m, p in notes if m == Notifications.PROGRESS and p["stage"] == "weld"]
    assert len(weld) == 4


def test_fake_graft_head_is_byte_deterministic_regardless_of_base_mesh(tmp_path: Path):
    r1, _ = _drive(tmp_path, Methods.GRAFT_HEAD_START, _graft_params(tmp_path, base_mesh_path="a.glb"))
    out2 = tmp_path / "graft2" / "head.glb"
    r2, _ = _drive(
        tmp_path,
        Methods.GRAFT_HEAD_START,
        _graft_params(tmp_path, base_mesh_path="totally-different.glb", output_path=str(out2)),
    )
    assert Path(r1["output_path"]).read_bytes() == Path(r2["output_path"]).read_bytes()


def test_fake_graft_head_cancels_and_writes_no_glb(tmp_path: Path):
    params = _graft_params(tmp_path)
    notes: list[tuple[str, dict]] = []

    async def _emit(m: str, p: dict) -> None:
        notes.append((m, p))

    cancel_event = threading.Event()
    cancel_event.set()

    with pytest.raises(GenerationCancelled):
        asyncio.new_event_loop().run_until_complete(
            graft_head_fake_e2e(params, _emit, cancel_event=cancel_event)
        )

    assert not Path(params["output_path"]).exists()
    assert Notifications.DONE not in [m for m, _ in notes]


def test_fake_both_ops_use_same_validators_as_real(tmp_path: Path):
    from faceavatar_worker.params import (
        validate_generate_head_params,
        validate_graft_head_params,
    )

    validate_generate_head_params(_gen_params(tmp_path))
    validate_graft_head_params(_graft_params(tmp_path))
