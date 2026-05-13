"""Tests for the unified `ltx.video.runtime.install` flow.

The flow chains `uv sync --extra diffusers` and `huggingface_hub.snapshot_download`.
Neither real dependency is invoked here:

  - uv is replaced by a fake `UvSyncRunner` that emits canned lines and
    returns a configurable exit code.
  - `snapshot_download` is monkeypatched onto the `huggingface_hub` module
    so the installer's lazy import lands on the stub.
"""

from __future__ import annotations

import asyncio
import sys
import types
from pathlib import Path
from typing import Any, Awaitable, Callable

import pytest

from ltx_video_worker import installer


class FakeWorker:
    """Captures notifications + lets handlers be registered like the real Worker."""

    def __init__(self) -> None:
        self.handlers: dict[str, Callable[[Any], Awaitable[Any]]] = {}
        self.notifications: list[tuple[str, dict[str, Any]]] = []

    def register(self, method: str, handler: Callable[[Any], Awaitable[Any]]) -> None:
        if method in self.handlers:
            raise ValueError(f"duplicate handler for {method}")
        self.handlers[method] = handler

    async def emit_notification(self, method: str, params: dict[str, Any]) -> None:
        self.notifications.append((method, params))


@pytest.fixture
def install_hf_stub(monkeypatch: pytest.MonkeyPatch) -> dict[str, Any]:
    """Install a fake `huggingface_hub` module exposing snapshot_download."""

    captured: dict[str, Any] = {}

    def _fake_snapshot_download(**kwargs: Any) -> str:
        captured["call_kwargs"] = kwargs
        local_dir = Path(kwargs["local_dir"])
        local_dir.mkdir(parents=True, exist_ok=True)
        (local_dir / "model_index.json").write_text("{}", encoding="utf-8")
        return str(local_dir)

    fake_mod = types.ModuleType("huggingface_hub")
    fake_mod.snapshot_download = _fake_snapshot_download  # type: ignore[attr-defined]
    monkeypatch.setitem(sys.modules, "huggingface_hub", fake_mod)
    return captured


def _make_stub_uv_sync(
    *, exit_code: int = 0, lines: list[tuple[str, str]] | None = None
) -> tuple[installer.UvSyncRunner, list[tuple[Path, list[tuple[str, str]]]]]:
    """Build a fake UvSyncRunner that emits canned lines + returns `exit_code`.

    Returns the runner and a capture list. Each entry is (cwd, emitted_lines).
    """

    invocations: list[tuple[Path, list[tuple[str, str]]]] = []

    async def _runner(
        cwd: Path, on_line: Callable[[str, str], Awaitable[None]]
    ) -> int:
        emitted: list[tuple[str, str]] = []
        for channel, text in lines or []:
            emitted.append((channel, text))
            await on_line(channel, text)
        invocations.append((cwd, emitted))
        return exit_code

    return _runner, invocations


@pytest.mark.asyncio
async def test_runtime_install_chains_uv_sync_then_snapshot_download(
    tmp_path: Path, install_hf_stub: dict[str, Any]
) -> None:
    worker = FakeWorker()
    runner, invocations = _make_stub_uv_sync(
        exit_code=0,
        lines=[
            ("stderr", "Resolved 47 packages in 102ms"),
            ("stderr", "Audited 47 packages in 0.01ms"),
        ],
    )
    installer.register_installer_handlers(worker, uv_sync_runner=runner)

    result = await worker.handlers["ltx.video.runtime.install"](
        {"profile": "rtx40-fp8", "host_data_dir": str(tmp_path)}
    )
    assert result["status"] == "started"
    await asyncio.sleep(0.01)
    while any(
        not getattr(t, "done", lambda: True)()
        for t in asyncio.all_tasks()
        if t is not asyncio.current_task()
    ):
        await asyncio.sleep(0.01)

    assert len(invocations) == 1
    methods = [m for m, _ in worker.notifications]
    assert "ltx.video.runtime.install.progress" in methods
    assert "ltx.video.runtime.install.done" in methods
    assert "ltx.video.runtime.install.error" not in methods

    done = next(p for m, p in worker.notifications if m == "ltx.video.runtime.install.done")
    assert done["profile"] == "rtx40-fp8"
    assert done["repo"] == "Lightricks/LTX-2.3-fp8"
    assert install_hf_stub["call_kwargs"]["repo_id"] == "Lightricks/LTX-2.3-fp8"

    expected_dest = tmp_path / "models" / "Lightricks" / "LTX-2.3-fp8"
    assert (expected_dest / installer.SENTINEL_NAME).is_file()


@pytest.mark.asyncio
async def test_runtime_install_emits_progress_per_uv_line(
    tmp_path: Path, install_hf_stub: dict[str, Any]
) -> None:
    worker = FakeWorker()
    runner, _ = _make_stub_uv_sync(
        exit_code=0,
        lines=[
            ("stdout", "uv-line-one"),
            ("stderr", "uv-line-two"),
            ("stderr", "uv-line-three"),
        ],
    )
    installer.register_installer_handlers(worker, uv_sync_runner=runner)

    await worker.handlers["ltx.video.runtime.install"](
        {"profile": "rtx40-fp8", "host_data_dir": str(tmp_path)}
    )
    await _drain_pending_tasks()

    progress = [
        params
        for m, params in worker.notifications
        if m == "ltx.video.runtime.install.progress"
        and params.get("phase") == "resolving_deps"
        and "stream" in params
    ]
    outputs = [p["output"] for p in progress]
    assert "uv-line-one" in outputs
    assert "uv-line-two" in outputs
    assert "uv-line-three" in outputs
    streams = {p["stream"] for p in progress}
    assert streams == {"stdout", "stderr"}


@pytest.mark.asyncio
async def test_runtime_install_reports_error_when_uv_exits_non_zero(
    tmp_path: Path, install_hf_stub: dict[str, Any]
) -> None:
    worker = FakeWorker()
    runner, _ = _make_stub_uv_sync(
        exit_code=2,
        lines=[("stderr", "uv: failed to resolve")],
    )
    installer.register_installer_handlers(worker, uv_sync_runner=runner)

    await worker.handlers["ltx.video.runtime.install"](
        {"profile": "rtx40-fp8", "host_data_dir": str(tmp_path)}
    )
    await _drain_pending_tasks()

    errors = [p for m, p in worker.notifications if m == "ltx.video.runtime.install.error"]
    assert len(errors) == 1
    assert errors[0]["phase"] == "resolving_deps"
    assert "exit" in errors[0]["message"]

    methods = [m for m, _ in worker.notifications]
    assert "ltx.video.runtime.install.done" not in methods
    assert "call_kwargs" not in install_hf_stub


@pytest.mark.asyncio
async def test_runtime_install_reports_error_when_uv_executable_missing(
    tmp_path: Path, install_hf_stub: dict[str, Any]
) -> None:
    worker = FakeWorker()

    async def _missing_uv(
        _cwd: Path, _on_line: Callable[[str, str], Awaitable[None]]
    ) -> int:
        raise FileNotFoundError("uv: command not found")

    installer.register_installer_handlers(worker, uv_sync_runner=_missing_uv)

    await worker.handlers["ltx.video.runtime.install"](
        {"profile": "rtx40-fp8", "host_data_dir": str(tmp_path)}
    )
    await _drain_pending_tasks()

    errors = [p for m, p in worker.notifications if m == "ltx.video.runtime.install.error"]
    assert len(errors) == 1
    assert errors[0]["phase"] == "resolving_deps"
    assert "uv executable not found" in errors[0]["message"]


@pytest.mark.asyncio
async def test_runtime_install_rejects_unknown_profile(tmp_path: Path) -> None:
    worker = FakeWorker()
    runner, _ = _make_stub_uv_sync()
    installer.register_installer_handlers(worker, uv_sync_runner=runner)

    result = await worker.handlers["ltx.video.runtime.install"](
        {"profile": "imaginary", "host_data_dir": str(tmp_path)}
    )
    assert result["status"] == "rejected"
    assert "imaginary" in result["error"]


@pytest.mark.asyncio
async def test_runtime_install_dedupes_in_flight_requests(
    tmp_path: Path, install_hf_stub: dict[str, Any]
) -> None:
    worker = FakeWorker()

    release = asyncio.Event()

    async def _blocking_runner(
        _cwd: Path, _on_line: Callable[[str, str], Awaitable[None]]
    ) -> int:
        await release.wait()
        return 0

    installer.register_installer_handlers(worker, uv_sync_runner=_blocking_runner)

    first = await worker.handlers["ltx.video.runtime.install"](
        {"profile": "rtx40-fp8", "host_data_dir": str(tmp_path)}
    )
    second = await worker.handlers["ltx.video.runtime.install"](
        {"profile": "rtx40-fp8", "host_data_dir": str(tmp_path)}
    )

    assert first["status"] == "started"
    assert second["status"] == "already_in_flight"

    release.set()
    await _drain_pending_tasks()


async def _drain_pending_tasks() -> None:
    for _ in range(50):
        pending = [
            t
            for t in asyncio.all_tasks()
            if t is not asyncio.current_task() and not t.done()
        ]
        if not pending:
            return
        await asyncio.sleep(0.01)
