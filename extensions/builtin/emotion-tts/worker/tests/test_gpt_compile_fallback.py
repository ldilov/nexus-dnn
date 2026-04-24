"""T081 — compile failure → uncompiled fallback tests (spec 034 US4 FR-232)."""

from __future__ import annotations

import pytest

from emotion_tts_worker.gpt_compile import (
    CompileSettings,
    CompiledGpt,
    compile_gpt_stage,
)


torch_available = True
try:
    import torch  # type: ignore[import-not-found]
    import torch.nn as nn  # type: ignore[import-not-found]
except ImportError:
    torch_available = False

requires_torch = pytest.mark.skipif(not torch_available, reason="torch not installed")


class RecordingEmitter:
    def __init__(self):
        self.events: list[tuple[str, dict]] = []

    def __call__(self, stage: str, payload: dict) -> None:
        self.events.append((stage, payload))


@requires_torch
def test_disabled_toggle_returns_eager_handle_without_emitting():
    module = nn.Linear(4, 4)
    emitter = RecordingEmitter()

    handle = compile_gpt_stage(
        module,
        CompileSettings(enabled=False),
        emitter=emitter,
        request_id="req_1",
    )

    assert isinstance(handle, CompiledGpt)
    assert handle.session_available()  # never attempted compile
    assert handle._compiled is None
    assert emitter.events == []


@requires_torch
def test_compile_failure_falls_back_and_emits_failed():
    module = nn.Linear(4, 4)
    emitter = RecordingEmitter()

    # Force a compile failure by monkey-patching torch.compile.
    original = torch.compile

    def broken_compile(*_args, **_kwargs):
        raise RuntimeError("triton.ImportError: module not found")

    torch.compile = broken_compile  # type: ignore[assignment]
    try:
        handle = compile_gpt_stage(
            module,
            CompileSettings(enabled=True),
            emitter=emitter,
            request_id="req_1",
        )
    finally:
        torch.compile = original  # type: ignore[assignment]

    assert handle.session_available() is False
    failure = handle.last_failure()
    assert failure is not None
    assert "triton" in failure

    stages = [s for s, _ in emitter.events]
    assert "compile.started" in stages
    assert "compile.failed" in stages
    # Subsequent forward calls route to eager — must not raise.
    out = handle.forward(torch.zeros(2, 4), text_len=10)
    assert out.shape == (2, 4)


@requires_torch
def test_missing_torch_marks_session_unavailable(monkeypatch):
    """If torch vanishes between process start and compile_gpt_stage call,
    we must still return a working eager-only handle."""

    module = nn.Linear(4, 4)
    emitter = RecordingEmitter()

    import builtins

    real_import = builtins.__import__

    def fake_import(name, *args, **kwargs):
        if name == "torch":
            raise ImportError("No module named 'torch' (simulated)")
        return real_import(name, *args, **kwargs)

    monkeypatch.setattr(builtins, "__import__", fake_import)

    handle = compile_gpt_stage(
        module,
        CompileSettings(enabled=True),
        emitter=emitter,
    )
    assert handle.session_available() is False
    failure = handle.last_failure()
    assert failure is not None
    assert "torch" in failure


@requires_torch
def test_runtime_compile_error_flips_session_without_raising():
    """A compiled forward call that blows up must route to eager and
    disable the compiled path for the rest of the session."""

    module = nn.Linear(4, 4)
    emitter = RecordingEmitter()
    handle = compile_gpt_stage(module, CompileSettings(enabled=False), emitter=emitter)

    # Inject a 'compiled' callable that always raises — simulates a
    # recompile mid-session hitting a broken shape.
    def boom(_x):
        raise RuntimeError("recompile crash")

    handle._compiled = boom
    handle._session_available = True

    result = handle.forward(torch.zeros(1, 4), text_len=10)
    assert result.shape == (1, 4)  # fallback to eager worked
    assert handle.session_available() is False  # session flipped off
    assert "runtime_compile_error" in (handle.last_failure() or "")


@requires_torch
def test_compile_emits_started_and_complete_on_success(monkeypatch):
    module = nn.Linear(4, 4)
    emitter = RecordingEmitter()

    # Replace torch.compile with identity so compile "succeeds" without
    # needing triton present in the env.
    monkeypatch.setattr(torch, "compile", lambda m, **_kw: m)

    handle = compile_gpt_stage(
        module,
        CompileSettings(enabled=True),
        emitter=emitter,
    )
    assert handle.session_available()
    stages = [s for s, _ in emitter.events]
    assert stages == ["compile.started", "compile.complete"]
    complete_payload = emitter.events[1][1]
    assert complete_payload["stage"] == "compile.complete"
    assert "duration_ms" in complete_payload
