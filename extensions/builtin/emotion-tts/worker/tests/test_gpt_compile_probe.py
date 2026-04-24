"""T080 — capability-probe tests (spec 034 US4)."""

from __future__ import annotations

import pytest

from emotion_tts_worker.gpt_compile_probe import ProbeResult, probe, reset_cache, snapshot


torch_available = True
try:
    import torch  # type: ignore[import-not-found]  # noqa: F401
except ImportError:
    torch_available = False

requires_torch = pytest.mark.skipif(not torch_available, reason="torch not installed")


@pytest.fixture(autouse=True)
def _reset_probe_cache():
    reset_cache()
    yield
    reset_cache()


@requires_torch
def test_probe_succeeds_on_healthy_torch_install():
    # Note: a truly healthy env also has triton; on Windows without it the
    # probe may still succeed via the "reduced backend" path — either
    # outcome is acceptable. The point is the probe MUST NOT raise.
    result = probe()
    assert isinstance(result, ProbeResult)
    assert result.duration_ms >= 0
    # available may be True or False — environment-dependent — but the
    # detail string must be populated either way so the UI can render it.
    assert result.detail


def test_probe_reports_unavailable_when_torch_missing(monkeypatch):
    """Simulate a bare env where torch isn't installed."""

    import builtins

    real_import = builtins.__import__

    def fake_import(name, *args, **kwargs):
        if name == "torch":
            raise ImportError("No module named 'torch' (simulated)")
        return real_import(name, *args, **kwargs)

    monkeypatch.setattr(builtins, "__import__", fake_import)
    reset_cache()
    result = probe()
    assert result.available is False
    assert "torch" in result.detail


@requires_torch
def test_probe_is_cached_between_calls():
    first = probe()
    second = probe()
    # Cached → same object identity returned from the module-level slot.
    assert first is second


@requires_torch
def test_reset_cache_forces_reprobe():
    first = probe()
    reset_cache()
    second = probe()
    assert first is not second


@requires_torch
def test_snapshot_returns_wire_shape():
    snap = snapshot()
    assert set(snap.keys()) == {"available", "detail", "duration_ms"}
    assert isinstance(snap["available"], bool)
    assert isinstance(snap["detail"], str)
    assert isinstance(snap["duration_ms"], int)
