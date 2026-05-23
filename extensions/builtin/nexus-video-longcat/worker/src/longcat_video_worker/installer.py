"""Profile-specific runtime + model install for nexus.video.longcat.

Three RPC surfaces are exposed (all registered regardless of the active
worker profile, so a fake-mode worker can be used to install real-profile
assets):

  - `longcat.video.install.start` { profile, host_data_dir }
      -> weights snapshot_download only (legacy single-step flow).

  - `longcat.video.install.status` { profile, host_data_dir }
      -> returns weight-install state (sentinels + vendor presence).

  - `longcat.video.runtime.install` { profile, host_data_dir }
      -> full "install everything needed to run this profile" flow:
        1. `uv sync --extra longcat` inside the worker's own pyproject.
        2. snapshot_download for all profile weight repos.
        3. vendor-source fetch: pulls VENDOR_MODULES files from
           https://raw.githubusercontent.com/meituan-longcat/LongCat-Video
           into <host_data_dir>/extensions/nexus.video.longcat/vendor/longcat/.

Notifications emitted during a runtime install:
  - `longcat.video.runtime.install.progress` { profile, repo, phase, output? }
      phase in {"resolving_deps", "downloading_weights", "vendoring_sources"}.
  - `longcat.video.runtime.install.done`  { profile, repo, dest }
  - `longcat.video.runtime.install.error` { profile, repo, code, message, phase }

Sentinel file (<dest>/.nexus-install-complete) is written atomically on
weight-install success per repo. The Rust side checks it to determine
installed-ness.
"""

from __future__ import annotations

import asyncio
import hashlib
import logging
import os
import tempfile
import urllib.request
from pathlib import Path
from typing import Any, Awaitable, Callable

from .io_safety import safe_subprocess_env, scrub_sensitive
from .rpc import ErrorCodes

logger = logging.getLogger(__name__)

# Pinned to meituan-longcat/LongCat-Video main HEAD as of 2026-05-23.
# Upstream has no `longcat_video/__init__.py` (implicit namespace package);
# the 8 entries below are the complete required surface for build_dit +
# pipeline_longcat. Re-pin + recompute when bumping to a tagged release.
VENDOR_COMMIT: str = "8334da9343fcf9bc8156a35d1df19d4cdfa98615"

VENDOR_MODULES: list[tuple[str, str | None]] = [
    # (repo_relative_path, expected_sha256)
    (
        "longcat_video/pipeline_longcat_video.py",
        "fdcb1ff211744101b8f505830d8b17adb59bab98651c6ba8a44a1ff706ad54c1",
    ),
    (
        "longcat_video/modules/__init__.py",
        # empty file
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
    ),
    (
        "longcat_video/modules/longcat_video_dit.py",
        "cebb2ed2cfc754b4501a36bd4e57969c5fd47f4bf1ce352587dcfac092d4d1e5",
    ),
    (
        "longcat_video/modules/autoencoder_kl_wan.py",
        "f41167750a9d50a45597fa6659f24fff4397b634c2cf546e44fdf585dfa43730",
    ),
    (
        "longcat_video/modules/attention.py",
        "d2d29f468c2b1e998adf39e740cf271e1d8a64b7fda7efb730fc8fcdbee3bd4b",
    ),
    (
        "longcat_video/modules/blocks.py",
        "596f40ba74cb429a0d05987bc75beac9b43a096cbdc37474628d165cb6ccf152",
    ),
    (
        "longcat_video/modules/rope_3d.py",
        "cca72c408d49bbb8abf9dc17784dfed4887c88a87874750a798a61ddeea6661c",
    ),
    (
        "longcat_video/modules/scheduling_flow_match_euler_discrete.py",
        "322cef12d5efa660f839fc173e83eba68b913f031b3f06643d71e5181279be5a",
    ),
    (
        "longcat_video/context_parallel/context_parallel_util.py",
        "af881eaef7e712f63b17bf6bf0f95e11f52c8fd792b5b2f9337d750e36982b1a",
    ),
    (
        "longcat_video/context_parallel/ulysses_wrapper.py",
        "356a04ecca25672df31929b4f624ddb3a7fcdf219a1684129467e526bef4101d",
    ),
    (
        "longcat_video/utils/bukcet_config.py",
        "9f2d2ae584863f9eaee9a8b6fcce80bed2c1415ef5570de62bb8c99f5547dd0b",
    ),
    (
        "longcat_video/modules/lora_utils.py",
        "fba59cd7591b1597ebb2c0517b5000273562cf1574bf0893c7a723feeab849fd",
    ),
    (
        "longcat_video/block_sparse_attention/bsa_interface.py",
        "7590c39b0aeb84d4594d57f62affbe1a92735bf4092960fc49c9a8b7b4ef3ecb",
    ),
    (
        "longcat_video/block_sparse_attention/common.py",
        "9b8d0dd7e93bfee7040b46a26104b0ebe21c10b3dcfe0f8fc71decb14259789a",
    ),
    (
        "longcat_video/block_sparse_attention/communicate.py",
        "fd8f7c3309b911c58bf96b6e563a8d2144ab8abab7b5f271a3e47facc76a548d",
    ),
    (
        "longcat_video/block_sparse_attention/flash_attn_bsa_varlen_mask.py",
        "dad6843a6ebdd0c18257813e3d1781684e62b269fd29fd4dc4d2164d097de56d",
    ),
]

# Upstream uses implicit namespace packages — these __init__.py files do
# NOT exist in the git tree. Create them locally as empty files after the
# fetch step so the vendored dir becomes a regular Python package importable
# via `sys.path.insert + import longcat_video.modules....`.
VENDOR_LOCAL_INIT_PACKAGES: tuple[str, ...] = (
    "longcat_video/__init__.py",
    "longcat_video/context_parallel/__init__.py",
    "longcat_video/utils/__init__.py",
    "longcat_video/block_sparse_attention/__init__.py",
)

PROFILE_REPO: dict[str, list[tuple[str, list[str]]]] = {
    "rtx50-fp8": [
        (
            "Kijai/LongCat-Video_comfy",
            [
                "LongCat_TI2V_comfy_fp8_e4m3fn_scaled_KJ.safetensors",
                # Distill LoRA needed for the 12-step CFG=1 schedule that the
                # distill profile applies; refinement LoRA drives the 720p
                # generate_refine quality-pass. Both are small (~4 GiB total)
                # and downloaded eagerly so any profile can switch into
                # distill / refine mode without a second install pass.
                "LongCat_distill_lora_alpha64_bf16.safetensors",
                "LongCat_refinement_lora_rank128_bf16.safetensors",
            ],
        ),
        (
            "meituan-longcat/LongCat-Video",
            ["vae/*", "text_encoder/*", "tokenizer/*", "scheduler/*", "dit/config.json", "model_index.json", "config.json"],
        ),
    ],
    "rtx50-fp8-distill": [
        (
            "Kijai/LongCat-Video_comfy",
            [
                "LongCat_TI2V_comfy_fp8_e4m3fn_scaled_KJ.safetensors",
                "LongCat_distill_lora_alpha64_bf16.safetensors",
                "LongCat_refinement_lora_rank128_bf16.safetensors",
            ],
        ),
        (
            "meituan-longcat/LongCat-Video",
            ["vae/*", "text_encoder/*", "tokenizer/*", "scheduler/*", "dit/config.json", "model_index.json", "config.json"],
        ),
    ],
    "fake": [],
}

SENTINEL_NAME = ".nexus-install-complete"
PROGRESS_LINE_LIMIT_BYTES = 1024

UvSyncRunner = Callable[[Path, Callable[[str, str], Awaitable[None]]], Awaitable[int]]


class InstallerSchemaMismatch(Exception):
    pass


def _normalize_host_data_dir(host_data_dir: str) -> Path:
    root = Path(host_data_dir).resolve()
    if not root.is_absolute():
        raise InstallerSchemaMismatch(
            f"host_data_dir must resolve to an absolute path; got {host_data_dir!r}"
        )
    return root


def _assert_under_root(candidate: Path, root: Path) -> None:
    try:
        candidate.resolve().relative_to(root)
    except ValueError as e:
        raise InstallerSchemaMismatch(
            f"path traversal blocked: {candidate} escapes host_data_dir {root}"
        ) from e


def _validate_repo_segment(repo: str) -> None:
    if "/" not in repo or repo.count("/") != 1:
        raise InstallerSchemaMismatch(f"repo must be 'owner/name'; got {repo!r}")
    owner, name = repo.split("/", 1)
    for part in (owner, name):
        if not part or part in (".", "..") or "/" in part or "\\" in part:
            raise InstallerSchemaMismatch(f"repo segment {part!r} rejected")


def _dest_dir(host_data_dir: str, repo: str) -> Path:
    _validate_repo_segment(repo)
    root = _normalize_host_data_dir(host_data_dir)
    dest = root / "models" / Path(*repo.split("/"))
    _assert_under_root(dest, root)
    return dest


def _vendor_dir(host_data_dir: str) -> Path:
    root = _normalize_host_data_dir(host_data_dir)
    dest = root / "extensions" / "nexus.video.longcat" / "vendor" / "longcat"
    _assert_under_root(dest, root)
    return dest


def _sentinel_path(resolved_dir: Path, profile: str, repo: str) -> Path:
    return resolved_dir / SENTINEL_NAME


def _write_sentinel(resolved_dir: Path, *, profile: str, repo: str) -> bool:
    if any(c in profile for c in ("\n", "\r", "\x00")):
        raise InstallerSchemaMismatch(f"profile name contains control char: {profile!r}")
    if any(c in repo for c in ("\n", "\r", "\x00")):
        raise InstallerSchemaMismatch(f"repo name contains control char: {repo!r}")
    content = (
        "installed_by=nexus.video.longcat.installer\n"
        f"profile={profile}\n"
        f"repo={repo}\n"
    )
    sentinel = _sentinel_path(resolved_dir, profile, repo)
    try:
        with tempfile.NamedTemporaryFile(
            mode="w",
            encoding="utf-8",
            dir=resolved_dir,
            delete=False,
            prefix=".nexus-tmp-",
        ) as fh:
            tmp = Path(fh.name)
            fh.write(content)
        tmp.replace(sentinel)
        return True
    except OSError:
        return False


def _sha256_file(path: Path) -> str:
    h = hashlib.sha256()
    with path.open("rb") as fh:
        while True:
            chunk = fh.read(1024 * 1024)
            if not chunk:
                break
            h.update(chunk)
    return h.hexdigest()


def _fetch_url_bytes(url: str) -> bytes:
    if not url.startswith("https://"):
        raise InstallerSchemaMismatch(
            f"refusing to fetch non-https URL: {url!r}"
        )
    import ssl

    ctx = ssl.create_default_context()
    ctx.check_hostname = True
    ctx.verify_mode = ssl.CERT_REQUIRED
    with urllib.request.urlopen(url, timeout=60, context=ctx) as resp:  # noqa: S310
        return resp.read()


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
    *, profile: str, repo: str, dest: Path, allow_patterns: list[str] | None = None
) -> _DownloadSuccess | _DownloadFailure:
    try:
        from huggingface_hub import snapshot_download  # type: ignore
    except ImportError as e:
        return _DownloadFailure(
            ErrorCodes.INTERNAL_ERROR,
            f"huggingface_hub not importable: {e}",
        )

    dest.parent.mkdir(parents=True, exist_ok=True)

    def _sync() -> str:
        return snapshot_download(
            repo_id=repo,
            local_dir=str(dest),
            local_dir_use_symlinks=False,
            allow_patterns=allow_patterns,
        )

    try:
        resolved = await asyncio.to_thread(_sync)
    except Exception as e:  # noqa: BLE001
        return _DownloadFailure(
            ErrorCodes.MODEL_LOAD_FAILED,
            f"snapshot_download failed for {profile}/{repo}: {e}",
        )
    return _DownloadSuccess(resolved=resolved)


async def _download_weights(
    worker,
    *,
    profile: str,
    repos_patterns: list[tuple[str, list[str]]],
    host_data_dir: str,
) -> dict[str, Any]:
    results: list[dict[str, Any]] = []
    for repo, patterns in repos_patterns:
        dest = _dest_dir(host_data_dir, repo)
        if _sentinel_path(dest, profile, repo).is_file():
            results.append({"repo": repo, "status": "already_installed", "dest": str(dest)})
            continue

        await worker.emit_notification(
            "longcat.video.runtime.install.progress",
            {
                "profile": profile,
                "repo": repo,
                "phase": "downloading_weights",
                "output": f"downloading {repo} to {dest}",
            },
        )

        result = await _do_snapshot_download(
            profile=profile, repo=repo, dest=dest, allow_patterns=patterns
        )
        if isinstance(result, _DownloadFailure):
            await worker.emit_notification(
                "longcat.video.runtime.install.error",
                {
                    "profile": profile,
                    "repo": repo,
                    "phase": "downloading_weights",
                    "code": result.code,
                    "message": result.message,
                },
            )
            return {"status": "error", "repo": repo, "message": result.message}

        if not _write_sentinel(Path(result.resolved), profile=profile, repo=repo):
            await worker.emit_notification(
                "longcat.video.runtime.install.error",
                {
                    "profile": profile,
                    "repo": repo,
                    "phase": "downloading_weights",
                    "code": ErrorCodes.INTERNAL_ERROR,
                    "message": "failed to write install sentinel",
                },
            )
            return {"status": "error", "repo": repo, "message": "sentinel write failed"}

        await worker.emit_notification(
            "longcat.video.runtime.install.done",
            {"profile": profile, "repo": repo, "dest": result.resolved},
        )
        results.append({"repo": repo, "status": "installed", "dest": result.resolved})

    return {"status": "ok", "repos": results}


async def _vendor_source_files(
    worker,
    *,
    profile: str,
    vendor_dir: Path,
    commit: str,
) -> dict[str, Any]:
    base_url = (
        f"https://raw.githubusercontent.com/meituan-longcat/LongCat-Video/{commit}"
    )
    fetched: list[str] = []
    skipped: list[str] = []

    if commit == "main" or len(commit) != 40 or not all(c in "0123456789abcdef" for c in commit.lower()):
        raise InstallerSchemaMismatch(
            f"vendor commit must be a 40-char SHA-1 (got {commit!r}); refusing to "
            "fetch source files from a moving branch ref. Pin VENDOR_COMMIT before "
            "running install."
        )

    for rel_path, expected_sha256 in VENDOR_MODULES:
        if expected_sha256 is None:
            raise InstallerSchemaMismatch(
                f"vendor file {rel_path!r} has no sha256 pin; refusing to fetch. "
                "Fill VENDOR_MODULES with sha256 digests before running install."
            )
        if ".." in rel_path.split("/") or rel_path.startswith("/"):
            raise InstallerSchemaMismatch(f"vendor rel_path {rel_path!r} rejected")
        dest_file = vendor_dir / rel_path
        _assert_under_root(dest_file, vendor_dir)

        if dest_file.exists() and _sha256_file(dest_file) == expected_sha256:
            skipped.append(rel_path)
            continue

        dest_file.parent.mkdir(parents=True, exist_ok=True)
        url = f"{base_url}/{rel_path}"

        await worker.emit_notification(
            "longcat.video.runtime.install.progress",
            {
                "profile": profile,
                "repo": "meituan-longcat/LongCat-Video",
                "phase": "vendoring_sources",
                "output": f"fetching {rel_path}",
            },
        )

        try:
            data = await asyncio.to_thread(_fetch_url_bytes, url)
        except Exception as e:  # noqa: BLE001
            await worker.emit_notification(
                "longcat.video.runtime.install.error",
                {
                    "profile": profile,
                    "repo": "meituan-longcat/LongCat-Video",
                    "phase": "vendoring_sources",
                    "code": ErrorCodes.INTERNAL_ERROR,
                    "message": f"fetch failed for {rel_path}: {e}",
                },
            )
            return {"status": "error", "path": rel_path, "message": str(e)}

        actual = hashlib.sha256(data).hexdigest()
        if actual != expected_sha256:
            raise InstallerSchemaMismatch(
                f"{rel_path}: expected sha256 {expected_sha256}, got {actual}"
            )

        with tempfile.NamedTemporaryFile(
            dir=dest_file.parent,
            delete=False,
            prefix=".nexus-vendor-tmp-",
        ) as fh:
            tmp = Path(fh.name)
            fh.write(data)
        tmp.replace(dest_file)
        fetched.append(rel_path)

    init_files: list[str] = []
    for rel_init in VENDOR_LOCAL_INIT_PACKAGES:
        if ".." in rel_init.split("/") or rel_init.startswith("/"):
            raise InstallerSchemaMismatch(
                f"vendor init rel_path {rel_init!r} rejected"
            )
        init_path = vendor_dir / rel_init
        _assert_under_root(init_path, vendor_dir)
        if init_path.exists():
            continue
        init_path.parent.mkdir(parents=True, exist_ok=True)
        with tempfile.NamedTemporaryFile(
            dir=init_path.parent,
            delete=False,
            prefix=".nexus-vendor-init-",
        ) as fh:
            tmp = Path(fh.name)
            # explicitly write zero bytes — empty __init__.py
        tmp.replace(init_path)
        init_files.append(rel_init)

    return {
        "status": "ok",
        "fetched": fetched,
        "skipped": skipped,
        "init_files_created": init_files,
    }


def _worker_dir() -> Path:
    return Path(__file__).resolve().parents[2]


def _runtime_venv_dir() -> Path | None:
    host_data = os.environ.get("NEXUS_HOST_DATA_DIR")
    if not host_data:
        return None
    return (
        Path(host_data)
        / "extensions"
        / "nexus.video.longcat"
        / "runtime"
        / "packages"
        / ".venv"
    )


async def _default_uv_sync_runner(
    cwd: Path, on_line: Callable[[str, str], Awaitable[None]]
) -> int:
    env = safe_subprocess_env(os.environ.copy())
    runtime_venv = _runtime_venv_dir()
    if runtime_venv is not None:
        env["UV_PROJECT_ENVIRONMENT"] = str(runtime_venv)
        await on_line("info", f"uv targeting runtime venv: {runtime_venv}")

    cmd = ["uv", "sync", "--extra", "longcat"]

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
                await on_line(channel, scrub_sensitive(text))

    await asyncio.gather(
        _drain(proc.stdout, "stdout"),
        _drain(proc.stderr, "stderr"),
    )
    return await proc.wait()


async def _run_runtime_install(
    worker,
    *,
    profile: str,
    repos_patterns: list[tuple[str, list[str]]],
    host_data_dir: str,
    uv_runner: UvSyncRunner,
) -> None:
    worker_dir = _worker_dir()
    primary_repo = repos_patterns[0][0] if repos_patterns else profile

    await worker.emit_notification(
        "longcat.video.runtime.install.progress",
        {
            "profile": profile,
            "repo": primary_repo,
            "phase": "resolving_deps",
            "output": f"running uv sync --extra longcat in {worker_dir}",
        },
    )

    async def _forward_uv_line(channel: str, text: str) -> None:
        truncated = (
            text if len(text) <= PROGRESS_LINE_LIMIT_BYTES
            else text[:PROGRESS_LINE_LIMIT_BYTES] + "..."
        )
        await worker.emit_notification(
            "longcat.video.runtime.install.progress",
            {
                "profile": profile,
                "repo": primary_repo,
                "phase": "resolving_deps",
                "stream": channel,
                "output": truncated,
            },
        )

    try:
        exit_code = await uv_runner(worker_dir, _forward_uv_line)
    except FileNotFoundError as e:
        await worker.emit_notification(
            "longcat.video.runtime.install.error",
            {
                "profile": profile,
                "repo": primary_repo,
                "phase": "resolving_deps",
                "code": ErrorCodes.INTERNAL_ERROR,
                "message": f"uv executable not found on PATH: {e}",
            },
        )
        return
    except Exception as e:  # noqa: BLE001
        await worker.emit_notification(
            "longcat.video.runtime.install.error",
            {
                "profile": profile,
                "repo": primary_repo,
                "phase": "resolving_deps",
                "code": ErrorCodes.INTERNAL_ERROR,
                "message": f"uv launch failed: {e}",
            },
        )
        return

    if exit_code != 0:
        await worker.emit_notification(
            "longcat.video.runtime.install.error",
            {
                "profile": profile,
                "repo": primary_repo,
                "phase": "resolving_deps",
                "code": ErrorCodes.INTERNAL_ERROR,
                "message": f"uv sync exited with code {exit_code}",
            },
        )
        return

    weights_result = await _download_weights(
        worker,
        profile=profile,
        repos_patterns=repos_patterns,
        host_data_dir=host_data_dir,
    )
    if weights_result.get("status") == "error":
        return

    vdir = _vendor_dir(host_data_dir)
    try:
        await _vendor_source_files(
            worker,
            profile=profile,
            vendor_dir=vdir,
            commit=VENDOR_COMMIT,
        )
    except InstallerSchemaMismatch as e:
        await worker.emit_notification(
            "longcat.video.runtime.install.error",
            {
                "profile": profile,
                "repo": "meituan-longcat/LongCat-Video",
                "phase": "vendoring_sources",
                "code": ErrorCodes.INTERNAL_ERROR,
                "message": f"vendor sha256 mismatch: {e}",
            },
        )


def register_installer_handlers(
    worker,
    *,
    uv_sync_runner: UvSyncRunner | None = None,
) -> None:
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

        repos_patterns = PROFILE_REPO.get(profile)
        if repos_patterns is None:
            return {
                "installed": False,
                "dest": None,
                "has_sentinel": False,
                "error": f"unknown profile: {profile}",
            }

        if not repos_patterns:
            return {"installed": True, "dest": None, "has_sentinel": True, "repos": []}

        dests = [_dest_dir(host_data_dir, repo) for repo, _ in repos_patterns]
        sentinels_ok = [
            _sentinel_path(d, profile, repo).is_file()
            for d, (repo, _) in zip(dests, repos_patterns)
        ]
        vdir = _vendor_dir(host_data_dir)
        vendor_ok = all((vdir / rel).is_file() for rel, _ in VENDOR_MODULES)
        return {
            "installed": all(sentinels_ok) and vendor_ok,
            "dest": [str(d) for d in dests],
            "has_sentinel": all(sentinels_ok),
            "vendor_present": vendor_ok,
            "repos": [repo for repo, _ in repos_patterns],
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

        repos_patterns = PROFILE_REPO.get(profile)
        if repos_patterns is None:
            return {
                "status": "rejected",
                "error_code": ErrorCodes.INVALID_PARAMS,
                "error": f"unknown profile: {profile}",
            }

        if profile in in_flight_snapshot and not in_flight_snapshot[profile].done():
            return {
                "status": "already_in_flight",
                "profile": profile,
                "repos": [r for r, _ in repos_patterns],
            }

        task = asyncio.create_task(
            _download_weights(
                worker,
                profile=profile,
                repos_patterns=repos_patterns,
                host_data_dir=host_data_dir,
            )
        )
        in_flight_snapshot[profile] = task
        return {
            "status": "started",
            "profile": profile,
            "repos": [r for r, _ in repos_patterns],
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

        repos_patterns = PROFILE_REPO.get(profile)
        if repos_patterns is None:
            return {
                "status": "rejected",
                "error_code": ErrorCodes.INVALID_PARAMS,
                "error": f"unknown profile: {profile}",
            }

        if profile in in_flight_runtime and not in_flight_runtime[profile].done():
            return {
                "status": "already_in_flight",
                "profile": profile,
                "repos": [r for r, _ in repos_patterns],
            }

        task = asyncio.create_task(
            _run_runtime_install(
                worker,
                profile=profile,
                repos_patterns=repos_patterns,
                host_data_dir=host_data_dir,
                uv_runner=runner,
            )
        )
        in_flight_runtime[profile] = task
        return {
            "status": "started",
            "profile": profile,
            "repos": [r for r, _ in repos_patterns],
        }

    worker.register("longcat.video.install.start", install_start)
    worker.register("longcat.video.install.status", install_status)
    worker.register("longcat.video.runtime.install", runtime_install)


__all__ = [
    "register_installer_handlers",
    "InstallerSchemaMismatch",
    "PROFILE_REPO",
    "VENDOR_COMMIT",
    "VENDOR_MODULES",
    "SENTINEL_NAME",
    "PROGRESS_LINE_LIMIT_BYTES",
    "UvSyncRunner",
]
