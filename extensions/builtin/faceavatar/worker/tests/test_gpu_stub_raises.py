"""Torch-free unit coverage for the GPU stubs. The real fit/weld can't run here
(no torch); these assert the stubs validate the contract then raise the
TODO(gpu-spike) error with the frozen GENERATION_FAILED code, and that the gb10
handler surface registers the same methods as the fake backend."""
import threading

import pytest

from faceavatar_worker.graft import GPU_SPIKE_MESSAGE, graft_real
from faceavatar_worker.main import Worker, WorkerError
from faceavatar_worker.pipeline_arc2avatar import (
    generate_head_real,
    register_arc2avatar_handlers,
)
from faceavatar_worker.rpc import ErrorCodes, Methods


def test_generate_head_real_validates_then_raises_gpu_spike():
    params = {"image_path": "in.png", "output_path": "o.glb"}
    with pytest.raises(WorkerError) as exc:
        generate_head_real(params, lambda *a: None, threading.Event())
    assert exc.value.code == ErrorCodes.GENERATION_FAILED
    assert exc.value.args[0] == GPU_SPIKE_MESSAGE


def test_generate_head_real_still_fails_fast_on_bad_params():
    with pytest.raises(ValueError, match="image"):
        generate_head_real({"output_path": "o.glb"}, lambda *a: None, threading.Event())


def test_graft_real_validates_then_raises_gpu_spike():
    params = {"base_mesh_path": "b.glb", "image_path": "in.png", "output_path": "o.glb"}
    with pytest.raises(WorkerError) as exc:
        graft_real(params, lambda *a: None, threading.Event())
    assert exc.value.code == ErrorCodes.GENERATION_FAILED
    assert exc.value.args[0] == GPU_SPIKE_MESSAGE


def test_graft_real_still_fails_fast_on_bad_params():
    with pytest.raises(ValueError, match="base_mesh"):
        graft_real({"image_path": "in.png", "output_path": "o.glb"}, lambda *a: None, threading.Event())


def test_gb10_handlers_register_same_surface_as_fake():
    worker = Worker(profile="gb10")
    register_arc2avatar_handlers(worker)
    for method in (
        Methods.GENERATE_HEAD_START,
        Methods.GENERATE_HEAD_CANCEL,
        Methods.GRAFT_HEAD_START,
        Methods.GRAFT_HEAD_CANCEL,
    ):
        assert method in worker._handlers
    assert worker.health_fn is not None
