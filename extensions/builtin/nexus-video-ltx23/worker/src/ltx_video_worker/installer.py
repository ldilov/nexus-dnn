"""Profile-specific model install via huggingface_hub.

Registered regardless of profile so the install RPC is available from a
fresh fake-mode worker (chicken-and-egg: download the FP8/NVFP4 weights
BEFORE switching to the real profile).

JSON-RPC surface:
  - `ltx.video.install.start` { profile, host_data_dir } → { repo, dest, status: 'started' }
  - `ltx.video.install.status` { profile, host_data_dir } → { installed: bool, dest, has_sentinel }

Notifications during install:
  - `ltx.video.install.progress` { profile, repo, downloaded_files, total_files }
  - `ltx.video.install.done`     { profile, repo, dest }
  - `ltx.video.install.error`    { profile, repo, code, message }

Sentinel file (<dest>/.nexus-install-complete) is written atomically on
success. The Rust side checks for it (or the diffusers pipeline's
config.json + model_index.json) to determine installed-ness.
"""

from __future__ import annotations

import asyncio
import os
from pathlib import Path
from typing import Any

from .rpc import ErrorCodes


PROFILE_REPO: dict[str, str] = {
    "rtx40-fp8": "Lightricks/LTX-2.3-fp8",
    "rtx50-fp8": "Lightricks/LTX-2.3-fp8",
    "rtx50-nvfp4": "Lightricks/LTX-2.3-nvfp4",
}

SENTINEL_NAME = ".nexus-install-complete"


def register_installer_handlers(worker) -> None:
    in_flight: dict[str, asyncio.Task[Any]] = {}

    async def install_status(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        profile = str(params.get("profile", ""))
        host_data_dir = params.get("host_data_dir") or os.environ.get(
            "NEXUS_HOST_DATA_DIR"
        )
        if not host_data_dir:
            raise ValueError("host_data_dir not supplied and NEXUS_HOST_DATA_DIR unset")
        repo = PROFILE_REPO.get(profile)
        if not repo:
            return {
                "installed": False,
                "dest": None,
                "has_sentinel": False,
                "error": f"unknown profile: {profile}",
            }
        dest = _dest_dir(host_data_dir, repo)
        sentinel = dest / SENTINEL_NAME
        return {
            "installed": sentinel.is_file(),
            "dest": str(dest),
            "has_sentinel": sentinel.is_file(),
            "repo": repo,
        }

    async def install_start(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")
        profile = str(params.get("profile", ""))
        host_data_dir = params.get("host_data_dir") or os.environ.get(
            "NEXUS_HOST_DATA_DIR"
        )
        if not host_data_dir:
            raise ValueError("host_data_dir not supplied and NEXUS_HOST_DATA_DIR unset")

        repo = PROFILE_REPO.get(profile)
        if not repo:
            return {
                "status": "rejected",
                "error_code": ErrorCodes.INVALID_PARAMS,
                "error": f"unknown profile: {profile}",
            }

        dest = _dest_dir(host_data_dir, repo)

        if profile in in_flight and not in_flight[profile].done():
            return {
                "status": "already_in_flight",
                "profile": profile,
                "repo": repo,
                "dest": str(dest),
            }

        task = asyncio.create_task(
            _run_install(worker, profile=profile, repo=repo, dest=dest)
        )
        in_flight[profile] = task
        return {
            "status": "started",
            "profile": profile,
            "repo": repo,
            "dest": str(dest),
        }

    worker.register("ltx.video.install.start", install_start)
    worker.register("ltx.video.install.status", install_status)


def _dest_dir(host_data_dir: str, repo: str) -> Path:
    """Convention path: <host_data_dir>/models/<owner>/<name>/."""
    return Path(host_data_dir) / "models" / Path(*repo.split("/"))


async def _run_install(worker, profile: str, repo: str, dest: Path) -> None:
    try:
        from huggingface_hub import snapshot_download  # type: ignore
    except ImportError as e:
        await worker.emit_notification(
            "ltx.video.install.error",
            {
                "profile": profile,
                "repo": repo,
                "code": ErrorCodes.INTERNAL_ERROR,
                "message": f"huggingface_hub not importable: {e}",
            },
        )
        return

    dest.parent.mkdir(parents=True, exist_ok=True)

    def _download_sync() -> str:
        # snapshot_download is sync; run in a thread so the asyncio loop keeps
        # processing JSON-RPC traffic (notifications, cancel).
        return snapshot_download(
            repo_id=repo,
            local_dir=str(dest),
            local_dir_use_symlinks=False,
            allow_patterns=None,
        )

    await worker.emit_notification(
        "ltx.video.install.progress",
        {"profile": profile, "repo": repo, "phase": "starting", "dest": str(dest)},
    )

    try:
        resolved = await asyncio.to_thread(_download_sync)
    except Exception as e:  # noqa: BLE001 — surface anything HF throws
        await worker.emit_notification(
            "ltx.video.install.error",
            {
                "profile": profile,
                "repo": repo,
                "code": ErrorCodes.MODEL_LOAD_FAILED,
                "message": f"snapshot_download failed: {e}",
            },
        )
        return

    sentinel = Path(resolved) / SENTINEL_NAME
    try:
        sentinel.write_text(
            "installed_by=nexus.video.ltx23.installer\nprofile={p}\nrepo={r}\n".format(
                p=profile, r=repo
            ),
            encoding="utf-8",
        )
    except OSError as e:
        await worker.emit_notification(
            "ltx.video.install.error",
            {
                "profile": profile,
                "repo": repo,
                "code": ErrorCodes.INTERNAL_ERROR,
                "message": f"failed to write install sentinel: {e}",
            },
        )
        return

    await worker.emit_notification(
        "ltx.video.install.done",
        {"profile": profile, "repo": repo, "dest": resolved},
    )
