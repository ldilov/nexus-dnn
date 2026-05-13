"""Profile-specific runtime + model install.

Two RPC surfaces are exposed (both registered regardless of the active
worker profile, so a fresh fake-mode worker can be used to install
real-profile assets):

  - `ltx.video.install.start` { profile, host_data_dir }
      → only the weight snapshot_download (legacy single-step flow).

  - `ltx.video.runtime.install` { profile, host_data_dir }
      → full "install everything needed to run this profile" flow:
        1. `uv sync --extra diffusers` inside the worker's own
           pyproject (resolves torch/diffusers/transformers/accelerate/
           safetensors/einops). Idempotent — uv exits in seconds when
           the lockfile already matches.
        2. After uv succeeds, the existing snapshot_download path
           downloads the LTX-2.3 FP8/NVFP4 weights.

  - `ltx.video.install.status` { profile, host_data_dir }
      → returns weight-install state (sentinel + dest).

Notifications during a render-runtime install:
  - `ltx.video.runtime.install.progress` { profile, repo, phase, output? }
      where phase ∈ {"resolving_deps", "downloading_weights"}.
  - `ltx.video.runtime.install.done`     { profile, repo, dest }
  - `ltx.video.runtime.install.error`    { profile, repo, code, message, phase }

Notifications during a weights-only install (legacy):
  - `ltx.video.install.progress` { profile, repo, phase, dest }
  - `ltx.video.install.done`     { profile, repo, dest }
  - `ltx.video.install.error`    { profile, repo, code, message }

Sentinel file (<dest>/.nexus-install-complete) is written atomically on
weight-install success. The Rust side checks for it (or the diffusers
pipeline's config.json + model_index.json) to determine installed-ness.
"""

from __future__ import annotations

import asyncio
import os
from pathlib import Path
from typing import Any, Awaitable, Callable

from .rpc import ErrorCodes


# Hugging Face repo per runtime profile.
#
# `Lightricks/LTX-2.3-fp8` and `Lightricks/LTX-2.3-nvfp4` are official
# Lightricks repos but they ship the transformer weights as a single
# safetensors file — NOT diffusers-format multi-folder layout. They have
# no `model_index.json`, no `vae/`, no `text_encoder/`, etc. diffusers'
# `from_pretrained` cannot load them directly, and the override-via-
# `from_single_file` path fails on a transformer-config mismatch against
# the only other LTX-family base repo (`Lightricks/LTX-2`, which has 6
# conditioning channels vs LTX-2.3's 9).
#
# `dg845/LTX-2.3-Distilled-Diffusers` is a community-maintained port of
# the distilled LTX-2.3 weights into diffusers-format with the correct
# transformer config. It's the only repo we've validated end-to-end on
# a real GPU (P0-T001 verification, 2026-05-13). All three real-runtime
# profiles point at it; FP8 / NVFP4 hardware-specific optimization is a
# future rung once diffusers ships native LTX-2.3 quant support.
PROFILE_REPO: dict[str, str] = {
    "rtx40-fp8": "dg845/LTX-2.3-Distilled-Diffusers",
    "rtx50-fp8": "dg845/LTX-2.3-Distilled-Diffusers",
    "rtx50-nvfp4": "dg845/LTX-2.3-Distilled-Diffusers",
}

SENTINEL_NAME = ".nexus-install-complete"

# Bounded buffer so a chatty resolver can't OOM the worker — the most
# recent N lines win; older ones drop silently. The Rust side mirrors
# this cap in its own buffer.
PROGRESS_LINE_LIMIT_BYTES = 1024


# Pluggable for tests: signature is
#   async (cwd: Path, on_line: Callable[[str, str], Awaitable[None]]) -> int
# Returns the subprocess exit code. on_line is called with ("stdout"|"stderr", text)
# for each line read. Default implementation shells out to `uv sync --extra diffusers`.
UvSyncRunner = Callable[[Path, Callable[[str, str], Awaitable[None]]], Awaitable[int]]


def register_installer_handlers(
    worker,
    *,
    uv_sync_runner: UvSyncRunner | None = None,
) -> None:
    """Register installer JSON-RPC handlers on the given worker.

    `uv_sync_runner` may be injected by tests to replace the real uv
    subprocess with a deterministic stub.
    """

    runner: UvSyncRunner = uv_sync_runner or _default_uv_sync_runner
    in_flight_snapshot: dict[str, asyncio.Task[Any]] = {}
    in_flight_runtime: dict[str, asyncio.Task[Any]] = {}

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

        if profile in in_flight_snapshot and not in_flight_snapshot[profile].done():
            return {
                "status": "already_in_flight",
                "profile": profile,
                "repo": repo,
                "dest": str(dest),
            }

        task = asyncio.create_task(
            _run_install(worker, profile=profile, repo=repo, dest=dest)
        )
        in_flight_snapshot[profile] = task
        return {
            "status": "started",
            "profile": profile,
            "repo": repo,
            "dest": str(dest),
        }

    async def runtime_install(params: Any) -> dict[str, Any]:
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

        if profile in in_flight_runtime and not in_flight_runtime[profile].done():
            return {
                "status": "already_in_flight",
                "profile": profile,
                "repo": repo,
                "dest": str(dest),
            }

        task = asyncio.create_task(
            _run_runtime_install(
                worker, profile=profile, repo=repo, dest=dest, uv_runner=runner
            )
        )
        in_flight_runtime[profile] = task
        return {
            "status": "started",
            "profile": profile,
            "repo": repo,
            "dest": str(dest),
        }

    worker.register("ltx.video.install.start", install_start)
    worker.register("ltx.video.install.status", install_status)
    worker.register("ltx.video.runtime.install", runtime_install)


def _dest_dir(host_data_dir: str, repo: str) -> Path:
    """Convention path: <host_data_dir>/models/<owner>/<name>/."""
    return Path(host_data_dir) / "models" / Path(*repo.split("/"))


def _worker_dir() -> Path:
    """Resolve <extension_dir>/worker/ from this module's location.

    Layout: <worker_dir>/src/ltx_video_worker/installer.py
    parents[0]=ltx_video_worker, parents[1]=src, parents[2]=worker.
    """
    return Path(__file__).resolve().parents[2]


def _runtime_venv_dir() -> Path | None:
    """Return the host-managed runtime venv path the worker actually runs from.

    Convention (set by the host's `pkgs` dependency-installer step):
        <NEXUS_HOST_DATA_DIR>/extensions/nexus.video.ltx23/runtime/packages/.venv/

    Returns None when `NEXUS_HOST_DATA_DIR` isn't set — the unified
    install flow still works against the dev `worker/.venv/` in that
    case (test mode).
    """
    host_data = os.environ.get("NEXUS_HOST_DATA_DIR")
    if not host_data:
        return None
    return (
        Path(host_data)
        / "extensions"
        / "nexus.video.ltx23"
        / "runtime"
        / "packages"
        / ".venv"
    )


async def _default_uv_sync_runner(
    cwd: Path, on_line: Callable[[str, str], Awaitable[None]]
) -> int:
    """Spawn `uv sync --extra diffusers` and stream its output.

    The host runs the worker from `<host_data_dir>/extensions/<ext_id>/
    runtime/packages/.venv/`, not from the in-repo `worker/.venv/`.
    uv's default project-env resolution would target the latter — point
    it at the runtime venv via `UV_PROJECT_ENVIRONMENT` so the install
    actually lands where the worker subprocess imports from.

    Returns the process exit code. The on_line callback receives
    ("stdout"|"stderr", text) for each line as it lands. uv writes
    its resolution progress on stderr.
    """
    env = os.environ.copy()
    runtime_venv = _runtime_venv_dir()
    if runtime_venv is not None:
        env["UV_PROJECT_ENVIRONMENT"] = str(runtime_venv)
        await on_line(
            "info",
            f"uv targeting runtime venv: {runtime_venv}",
        )

    cmd = ["uv", "sync", "--extra", "diffusers"]
    # Opt-in: install the practical-rife wheel for GPU-accelerated 2×
    # interpolation. Default-off because the wheel pulls vulkan
    # runtime deps + only builds on linux/windows (excluded on darwin
    # via the pyproject marker). Operators flip this when they want
    # 24→48 fps output for the demo path.
    if os.environ.get("NEXUS_VIDEO_LTX23_INSTALL_INTERPOLATION", "").strip() in (
        "1", "true", "yes", "on"
    ):
        cmd.extend(["--extra", "interpolation"])
        await on_line(
            "info",
            "interpolation extra requested via NEXUS_VIDEO_LTX23_INSTALL_INTERPOLATION",
        )

    proc = await asyncio.create_subprocess_exec(
        *cmd,
        cwd=str(cwd),
        env=env,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
    )

    async def _drain(stream: asyncio.StreamReader | None, channel: str) -> None:
        if stream is None:
            return
        while True:
            raw = await stream.readline()
            if not raw:
                break
            text = raw.decode("utf-8", errors="replace").rstrip()
            if text:
                await on_line(channel, text)

    await asyncio.gather(
        _drain(proc.stdout, "stdout"),
        _drain(proc.stderr, "stderr"),
    )
    return await proc.wait()


async def _run_runtime_install(
    worker,
    *,
    profile: str,
    repo: str,
    dest: Path,
    uv_runner: UvSyncRunner,
) -> None:
    """Run uv sync, then weight snapshot_download. Emit runtime.install.* notes."""

    worker_dir = _worker_dir()

    await worker.emit_notification(
        "ltx.video.runtime.install.progress",
        {
            "profile": profile,
            "repo": repo,
            "phase": "resolving_deps",
            "output": f"running uv sync --extra diffusers in {worker_dir}",
        },
    )

    async def _forward_uv_line(channel: str, text: str) -> None:
        truncated = text if len(text) <= PROGRESS_LINE_LIMIT_BYTES else (
            text[:PROGRESS_LINE_LIMIT_BYTES] + "…"
        )
        await worker.emit_notification(
            "ltx.video.runtime.install.progress",
            {
                "profile": profile,
                "repo": repo,
                "phase": "resolving_deps",
                "stream": channel,
                "output": truncated,
            },
        )

    try:
        exit_code = await uv_runner(worker_dir, _forward_uv_line)
    except FileNotFoundError as e:
        await worker.emit_notification(
            "ltx.video.runtime.install.error",
            {
                "profile": profile,
                "repo": repo,
                "phase": "resolving_deps",
                "code": ErrorCodes.INTERNAL_ERROR,
                "message": f"uv executable not found on PATH: {e}",
            },
        )
        return
    except Exception as e:  # noqa: BLE001 — surface anything uv launcher throws
        await worker.emit_notification(
            "ltx.video.runtime.install.error",
            {
                "profile": profile,
                "repo": repo,
                "phase": "resolving_deps",
                "code": ErrorCodes.INTERNAL_ERROR,
                "message": f"uv launch failed: {e}",
            },
        )
        return

    if exit_code != 0:
        await worker.emit_notification(
            "ltx.video.runtime.install.error",
            {
                "profile": profile,
                "repo": repo,
                "phase": "resolving_deps",
                "code": ErrorCodes.INTERNAL_ERROR,
                "message": f"uv sync exited with code {exit_code}",
            },
        )
        return

    await worker.emit_notification(
        "ltx.video.runtime.install.progress",
        {
            "profile": profile,
            "repo": repo,
            "phase": "downloading_weights",
            "output": f"downloading {repo} to {dest}",
        },
    )

    weights_result = await _do_snapshot_download(profile=profile, repo=repo, dest=dest)
    if isinstance(weights_result, _DownloadFailure):
        await worker.emit_notification(
            "ltx.video.runtime.install.error",
            {
                "profile": profile,
                "repo": repo,
                "phase": "downloading_weights",
                "code": weights_result.code,
                "message": weights_result.message,
            },
        )
        return

    if not _write_sentinel(weights_result.resolved, profile=profile, repo=repo):
        await worker.emit_notification(
            "ltx.video.runtime.install.error",
            {
                "profile": profile,
                "repo": repo,
                "phase": "downloading_weights",
                "code": ErrorCodes.INTERNAL_ERROR,
                "message": "failed to write install sentinel",
            },
        )
        return

    await worker.emit_notification(
        "ltx.video.runtime.install.done",
        {"profile": profile, "repo": repo, "dest": weights_result.resolved},
    )


async def _run_install(worker, profile: str, repo: str, dest: Path) -> None:
    """Legacy weights-only install path. Kept for the old install.start RPC."""

    await worker.emit_notification(
        "ltx.video.install.progress",
        {"profile": profile, "repo": repo, "phase": "starting", "dest": str(dest)},
    )

    weights_result = await _do_snapshot_download(profile=profile, repo=repo, dest=dest)
    if isinstance(weights_result, _DownloadFailure):
        await worker.emit_notification(
            "ltx.video.install.error",
            {
                "profile": profile,
                "repo": repo,
                "code": weights_result.code,
                "message": weights_result.message,
            },
        )
        return

    if not _write_sentinel(weights_result.resolved, profile=profile, repo=repo):
        await worker.emit_notification(
            "ltx.video.install.error",
            {
                "profile": profile,
                "repo": repo,
                "code": ErrorCodes.INTERNAL_ERROR,
                "message": "failed to write install sentinel",
            },
        )
        return

    await worker.emit_notification(
        "ltx.video.install.done",
        {"profile": profile, "repo": repo, "dest": weights_result.resolved},
    )


class _DownloadSuccess:
    __slots__ = ("resolved",)

    def __init__(self, resolved: str) -> None:
        self.resolved = resolved


class _DownloadFailure:
    __slots__ = ("code", "message")

    def __init__(self, code: str, message: str) -> None:
        self.code = code
        self.message = message


async def _do_snapshot_download(
    *, profile: str, repo: str, dest: Path
) -> _DownloadSuccess | _DownloadFailure:
    try:
        from huggingface_hub import snapshot_download  # type: ignore
    except ImportError as e:
        return _DownloadFailure(
            ErrorCodes.INTERNAL_ERROR,
            f"huggingface_hub not importable: {e}",
        )

    dest.parent.mkdir(parents=True, exist_ok=True)

    def _download_sync() -> str:
        return snapshot_download(
            repo_id=repo,
            local_dir=str(dest),
            local_dir_use_symlinks=False,
            allow_patterns=None,
        )

    try:
        resolved = await asyncio.to_thread(_download_sync)
    except Exception as e:  # noqa: BLE001 — surface anything HF throws
        return _DownloadFailure(
            ErrorCodes.MODEL_LOAD_FAILED,
            f"snapshot_download failed for {profile}/{repo}: {e}",
        )
    return _DownloadSuccess(resolved=resolved)


def _write_sentinel(resolved_dir: str, *, profile: str, repo: str) -> bool:
    sentinel = Path(resolved_dir) / SENTINEL_NAME
    try:
        sentinel.write_text(
            "installed_by=nexus.video.ltx23.installer\n"
            f"profile={profile}\n"
            f"repo={repo}\n",
            encoding="utf-8",
        )
        return True
    except OSError:
        return False


__all__ = [
    "register_installer_handlers",
    "PROFILE_REPO",
    "SENTINEL_NAME",
    "PROGRESS_LINE_LIMIT_BYTES",
    "UvSyncRunner",
]
