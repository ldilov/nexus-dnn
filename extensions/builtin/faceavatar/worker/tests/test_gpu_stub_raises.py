"""Torch-free unit coverage for the gb10 pipeline surface. The real Arc2Avatar
fit/graft can't run here (no torch/GPU); these assert the real functions fail fast
on bad params (before any heavy lazy import) and that the gb10 handler surface
registers the same methods as the fake backend."""
import threading

import pytest

from faceavatar_worker.graft import graft_real
from faceavatar_worker.main import Worker
from faceavatar_worker.pipeline_arc2avatar import (
    generate_head_real,
    register_arc2avatar_handlers,
)
from faceavatar_worker.rpc import Methods


def test_generate_head_real_fails_fast_on_bad_params():
    with pytest.raises(ValueError, match="image"):
        generate_head_real({"output_path": "o.glb"}, lambda *a: None, threading.Event())


def test_graft_real_fails_fast_on_bad_params():
    with pytest.raises(ValueError, match="base_mesh"):
        graft_real(
            {"image_path": "in.png", "output_path": "o.glb"},
            lambda *a: None,
            threading.Event(),
        )


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
