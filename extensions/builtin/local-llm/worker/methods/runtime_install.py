"""Download, extract, and validate runtime binaries."""
from __future__ import annotations

import asyncio
import subprocess
import sys
import zipfile
from io import BytesIO
from pathlib import Path
from urllib.request import Request, urlopen

from worker.backends.llamacpp.resolver import ResolvedAsset, locate_server_binary
from worker.state import InstallTask, RuntimeInstall, WorkerState

_CHUNK_SIZE = 1 << 16  # 64 KiB


async def run_install(
    state: WorkerState,
    runtime: RuntimeInstall,
    task: InstallTask,
    asset: ResolvedAsset,
) -> None:
    try:
        task.state = "downloading"
        task.log(f"Downloading {asset.download_url}")

        buf = await _download(asset.download_url, task)
        if task.cancel_event.is_set():
            task.state = "cancelled"
            runtime.state = "failed"
            runtime.error = "Cancelled by user"
            return

        task.state = "extracting"
        task.log("Extracting archive")
        runtime.install_path.mkdir(parents=True, exist_ok=True)
        await asyncio.to_thread(_extract_zip, buf, runtime.install_path)
        task.progress_percent = 90.0

        task.state = "validating"
        task.log("Locating server binary")
        binary = locate_server_binary(runtime.install_path, asset.server_binary_name)
        runtime.binary_path = binary
        _make_executable(binary)

        task.progress_percent = 100.0
        task.state = "done"
        task.log("Installation complete")
        runtime.state = "installed"
    except Exception as exc:
        task.state = "failed"
        task.error = str(exc)
        task.log(f"Failed: {exc}")
        runtime.state = "failed"
        runtime.error = str(exc)


async def _download(url: str, task: InstallTask) -> bytes:
    def _sync_download() -> bytes:
        req = Request(url, headers={"User-Agent": "nexus-llm-worker/0.1"})
        with urlopen(req, timeout=300) as resp:
            total = int(resp.headers.get("Content-Length", 0))
            task.bytes_total = total
            chunks: list[bytes] = []
            downloaded = 0
            while True:
                if task.cancel_event.is_set():
                    return b""
                chunk = resp.read(_CHUNK_SIZE)
                if not chunk:
                    break
                chunks.append(chunk)
                downloaded += len(chunk)
                task.bytes_downloaded = downloaded
                if total > 0:
                    task.progress_percent = (downloaded / total) * 80.0
            return b"".join(chunks)

    return await asyncio.to_thread(_sync_download)


def _extract_zip(data: bytes, dest: Path) -> None:
    with zipfile.ZipFile(BytesIO(data)) as zf:
        zf.extractall(dest)


def _make_executable(path: Path) -> None:
    if sys.platform != "win32":
        path.chmod(path.stat().st_mode | 0o755)


def validate_runtime(runtime: RuntimeInstall) -> dict:
    checks: list[dict] = []

    dir_exists = runtime.install_path.is_dir()
    checks.append({"check": "install_dir_exists", "passed": dir_exists})

    binary_exists = runtime.binary_path is not None and runtime.binary_path.is_file()
    checks.append({"check": "binary_exists", "passed": binary_exists})

    help_ok = False
    if binary_exists and runtime.binary_path is not None:
        try:
            result = subprocess.run(
                [str(runtime.binary_path), "--help"],
                capture_output=True, timeout=10,
            )
            help_ok = result.returncode == 0
        except (subprocess.TimeoutExpired, OSError):
            pass
    checks.append({"check": "binary_runs", "passed": help_ok})

    all_passed = all(c["passed"] for c in checks)
    if all_passed:
        runtime.state = "validated"
    errors = [c["check"] for c in checks if not c["passed"]]

    return {"valid": all_passed, "checks": checks, "errors": errors}


def extract_acceleration(candidate_id: str) -> str:
    if "cuda12" in candidate_id:
        return "cuda12"
    if "cuda13" in candidate_id:
        return "cuda13"
    return "cpu"
