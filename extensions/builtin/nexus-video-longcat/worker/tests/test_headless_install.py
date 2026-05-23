"""Smoke tests for the headless install CLI."""

from __future__ import annotations

import asyncio
import json
from pathlib import Path
from typing import Any

import pytest

from longcat_video_worker import headless_install


def test_main_rejects_unknown_profile(capsys: pytest.CaptureFixture[str]) -> None:
    with pytest.raises(SystemExit) as ei:
        headless_install.main(["--profile", "nonexistent", "--host-data-dir", "/tmp/x"])
    assert ei.value.code == 2
    captured = capsys.readouterr()
    assert "invalid choice" in captured.err


def test_main_requires_host_data_dir(capsys: pytest.CaptureFixture[str]) -> None:
    with pytest.raises(SystemExit) as ei:
        headless_install.main(["--profile", "fake"])
    assert ei.value.code == 2


def test_fake_profile_skips_vendor_and_uv(
    tmp_path: Path, capsys: pytest.CaptureFixture[str]
) -> None:
    rc = headless_install.main(
        [
            "--profile",
            "fake",
            "--host-data-dir",
            str(tmp_path),
            "--skip-uv-sync",
            "--quiet",
        ]
    )
    assert rc == 0
    captured = capsys.readouterr()
    payload = json.loads(captured.out.strip())
    assert payload["status"] == "ok"
    assert payload["profile"] == "fake"
    assert payload["vendor_dir"] is None


def test_headless_worker_emits_to_stderr(capsys: pytest.CaptureFixture[str]) -> None:
    worker = headless_install._HeadlessWorker(quiet=False)
    asyncio.run(worker.emit_notification("longcat.test", {"k": "v"}))
    captured = capsys.readouterr()
    line = captured.err.strip().splitlines()[-1]
    payload = json.loads(line)
    assert payload["method"] == "longcat.test"
    assert payload["params"] == {"k": "v"}
    assert "t" in payload


def test_headless_worker_quiet_suppresses(capsys: pytest.CaptureFixture[str]) -> None:
    worker = headless_install._HeadlessWorker(quiet=True)
    asyncio.run(worker.emit_notification("longcat.test", {"k": "v"}))
    captured = capsys.readouterr()
    assert captured.err == ""
