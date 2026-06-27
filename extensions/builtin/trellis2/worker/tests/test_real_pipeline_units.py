"""Torch-free unit coverage for pipeline_trellis2 helpers + early-exit paths.

The full GPU render can't run here (no torch); these exercise the cancel pbar,
path hardening, and the no-GPU early raise. Seed + pbar wiring gets final
confirmation on the Spark at P6.
"""
import threading

import pytest

from trellis2_worker.cancel import GenerationCancelled
from trellis2_worker.main import WorkerError
from trellis2_worker.pipeline_trellis2 import (
    _CancellingProgressBar,
    _resolve_under_workspace,
    generate_real,
)
from trellis2_worker.rpc import ErrorCodes


def test_progressbar_emits_coarse_stage():
    emitted: list[tuple[str, int, int]] = []
    pbar = _CancellingProgressBar(lambda *a: emitted.append(a), threading.Event())
    pbar.update()
    pbar.update(2)
    assert emitted == [("stage", 1, 0), ("stage", 3, 0)]


def test_progressbar_raises_on_cancel():
    ev = threading.Event()
    ev.set()
    pbar = _CancellingProgressBar(lambda *a: None, ev)
    with pytest.raises(GenerationCancelled):
        pbar.update()


def test_resolve_no_workspace_returns_absolute(monkeypatch, tmp_path):
    monkeypatch.delenv("TRELLIS2_WORKSPACE_DIR", raising=False)
    p = _resolve_under_workspace(str(tmp_path / "sub" / "x.glb"))
    assert p.is_absolute()


def test_resolve_inside_workspace_ok(monkeypatch, tmp_path):
    monkeypatch.setenv("TRELLIS2_WORKSPACE_DIR", str(tmp_path))
    p = _resolve_under_workspace(str(tmp_path / "ok.glb"))
    assert p.is_relative_to(tmp_path.resolve())


def test_resolve_outside_workspace_rejected_generic(monkeypatch, tmp_path):
    monkeypatch.setenv("TRELLIS2_WORKSPACE_DIR", str(tmp_path / "ws"))
    with pytest.raises(WorkerError) as exc:
        _resolve_under_workspace(str(tmp_path / "evil.glb"))
    assert exc.value.code == ErrorCodes.GENERATION_FAILED
    assert str(tmp_path) not in str(exc.value)


def test_generate_real_raises_gpu_not_supported_without_torch(tmp_path):
    params = {"image_path": str(tmp_path / "in.png"), "output_path": str(tmp_path / "o.glb")}
    with pytest.raises(WorkerError) as exc:
        generate_real(params, lambda *a: None, threading.Event())
    assert exc.value.code == ErrorCodes.GPU_NOT_SUPPORTED
