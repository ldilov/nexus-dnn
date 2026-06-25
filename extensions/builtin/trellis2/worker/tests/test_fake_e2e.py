import asyncio
import threading
from pathlib import Path

import pytest

from trellis2_worker.cancel import GenerationCancelled
from trellis2_worker.main import Worker
from trellis2_worker.pipeline_fake import generate_fake_e2e, register_fake_handlers
from trellis2_worker.rpc import Notifications


def _base_params(tmp_path: Path, **overrides) -> dict:
    out = tmp_path / "gen" / "mesh.glb"
    params = {
        "image_path": "x.png",
        "output_path": str(out),
        "seed": 42,
        "sparse_steps": 4,
        "shape_steps": 3,
        "simplify_target": 1_000_000,
        "texture": False,
        "residency": "balanced",
    }
    params.update(overrides)
    return params


def _drive(tmp_path: Path, params: dict):
    worker = Worker(profile="fake")
    notes: list[tuple[str, dict]] = []

    async def _capture(method: str, payload: dict):
        notes.append((method, payload))

    worker.emit_notification = _capture  # type: ignore
    register_fake_handlers(worker)
    handler = worker._handlers["trellis2.generate.start"]
    result = asyncio.new_event_loop().run_until_complete(handler(params))
    return result, notes


def test_fake_generate_produces_glb_and_metadata(tmp_path: Path):
    result, _ = _drive(tmp_path, _base_params(tmp_path))

    out = Path(result["output_path"])
    assert out.exists() and out.stat().st_size > 0
    assert out.read_bytes()[:4] == b"glTF"

    assert result["status"] == "ok"
    assert result["profile"] == "fake"
    assert result["mesh"]["vertices"] == 3
    assert result["mesh"]["faces"] == 1

    meta = result["metadata_json"]
    for key in (
        "attention_backend",
        "compute_cap",
        "native_sm121",
        "stage_timings",
        "mesh",
        "fallbacks",
        "profile",
        "models",
    ):
        assert key in meta, key
    assert meta["profile"] == "fake"
    assert meta["models"]["trellis"] == "microsoft/TRELLIS.2-4B"
    assert "load_s" in meta["stage_timings"] and "run_s" in meta["stage_timings"]


def test_fake_generate_emits_ordered_progress_then_done(tmp_path: Path):
    _, notes = _drive(tmp_path, _base_params(tmp_path))
    methods = [m for m, _ in notes]

    assert methods[0] == Notifications.PROGRESS
    assert methods[-1] == Notifications.DONE
    assert Notifications.ARTIFACT_CREATED in methods

    stages = [p["stage"] for m, p in notes if m == Notifications.PROGRESS]
    assert stages[0] == "start"
    for expected in ("preprocess", "dinov3", "sparse", "shape", "decode", "mesh", "glb"):
        assert expected in stages, expected


def test_fake_generate_progress_steps_match_param_counts(tmp_path: Path):
    _, notes = _drive(tmp_path, _base_params(tmp_path, sparse_steps=6, shape_steps=5))

    sparse = [p for m, p in notes if m == Notifications.PROGRESS and p["stage"] == "sparse"]
    shape = [p for m, p in notes if m == Notifications.PROGRESS and p["stage"] == "shape"]
    assert len(sparse) == 6
    assert len(shape) == 5
    assert [p["step"] for p in sparse] == [1, 2, 3, 4, 5, 6]


def test_fake_generate_artifact_is_gltf_binary_mime(tmp_path: Path):
    _, notes = _drive(tmp_path, _base_params(tmp_path))
    artifact = next(p for m, p in notes if m == Notifications.ARTIFACT_CREATED)
    assert artifact["mime_type"] == "model/gltf-binary"
    assert artifact["role"] == "mesh.glb"


def test_fake_generate_memory_stats_after_artifact(tmp_path: Path):
    _, notes = _drive(tmp_path, _base_params(tmp_path))
    methods = [m for m, _ in notes]
    art_idx = methods.index(Notifications.ARTIFACT_CREATED)
    mem_idx = methods.index(Notifications.MEMORY_STATS)
    assert art_idx < mem_idx < methods.index(Notifications.DONE)


def test_fake_generate_cancels_cooperatively_and_writes_no_glb(tmp_path: Path):
    params = _base_params(tmp_path)
    notes: list[tuple[str, dict]] = []

    async def _emit(method: str, payload: dict) -> None:
        notes.append((method, payload))

    cancel_event = threading.Event()
    cancel_event.set()

    with pytest.raises(GenerationCancelled):
        asyncio.new_event_loop().run_until_complete(
            generate_fake_e2e(params, _emit, cancel_event=cancel_event)
        )

    assert not Path(params["output_path"]).exists()
    assert Notifications.DONE not in [m for m, _ in notes]


def test_fake_generate_uses_same_validator_as_real(tmp_path: Path):
    from trellis2_worker.params import validate_generate_params

    params = _base_params(tmp_path)
    validate_generate_params(params)
    result, _ = _drive(tmp_path, params)
    assert result["status"] == "ok"
