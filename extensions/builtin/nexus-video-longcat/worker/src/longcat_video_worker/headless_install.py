"""Headless installer CLI for the nexus-video-longcat extension.

Bypasses the host JSON-RPC stdio layer so operators can drive the full
install (uv sync + weight download + vendor source-file fetch) from a
plain shell. Useful for offline boxes, CI, and first-boot bootstraps
where the Rust host hasn't been spawned yet.

Usage:
    python -m longcat_video_worker.headless_install \\
        --profile rtx50-fp8 \\
        --host-data-dir D:/nexus_host_data

Or via the console script after `uv sync`:

    nexus-video-longcat-install --profile rtx50-fp8 --host-data-dir D:/...

Exit codes:
    0 ok
    2 bad CLI args / unknown profile
    3 weight download failed
    4 vendor source-files fetch failed
    5 uv sync failed
"""

from __future__ import annotations

import argparse
import asyncio
import json
import os
import subprocess
import sys
import time
from pathlib import Path
from typing import Any

from .installer import (
    InstallerSchemaMismatch,
    PROFILE_REPO,
    VENDOR_COMMIT,
    _download_weights,
    _vendor_dir,
    _vendor_source_files,
)


class _HeadlessWorker:
    """Stand-in for the JSON-RPC `Worker` that drives notifications to stderr.

    The installer module calls `worker.emit_notification(method, payload)`
    expecting an awaitable that ships an event to the host. In headless
    mode we just stream the events as one-line JSON to stderr so an
    operator (or a wrapper script) can tail progress.
    """

    def __init__(self, quiet: bool = False) -> None:
        self.quiet = quiet
        self.t0 = time.monotonic()

    async def emit_notification(self, method: str, payload: dict[str, Any]) -> None:
        if self.quiet:
            return
        elapsed = time.monotonic() - self.t0
        line = json.dumps(
            {"t": round(elapsed, 2), "method": method, "params": payload},
            ensure_ascii=False,
        )
        print(line, file=sys.stderr, flush=True)


def _worker_dir() -> Path:
    return Path(__file__).resolve().parents[2]


def _run_uv_sync(worker_dir: Path, extras: list[str], quiet: bool) -> int:
    cmd: list[str] = ["uv", "sync"]
    for x in extras:
        cmd.extend(["--extra", x])
    if not quiet:
        print(f"[uv-sync] cwd={worker_dir}", file=sys.stderr, flush=True)
        print(f"[uv-sync] {' '.join(cmd)}", file=sys.stderr, flush=True)
    try:
        proc = subprocess.run(cmd, cwd=str(worker_dir), check=False)
    except FileNotFoundError:
        print(
            "[uv-sync] uv executable not found on PATH. Install uv first: "
            "https://docs.astral.sh/uv/getting-started/installation/",
            file=sys.stderr,
            flush=True,
        )
        return 127
    return proc.returncode


async def _run_async(args: argparse.Namespace) -> int:
    profile: str = args.profile
    if profile not in PROFILE_REPO:
        print(
            f"unknown profile {profile!r}; known: {sorted(PROFILE_REPO)}",
            file=sys.stderr,
            flush=True,
        )
        return 2

    host_data_dir = Path(args.host_data_dir).expanduser().resolve()
    host_data_dir.mkdir(parents=True, exist_ok=True)

    worker = _HeadlessWorker(quiet=args.quiet)

    if not args.skip_uv_sync:
        extras = [] if profile == "fake" else ["diffusers"]
        rc = _run_uv_sync(_worker_dir(), extras, quiet=args.quiet)
        if rc != 0:
            print(f"uv sync failed (rc={rc})", file=sys.stderr, flush=True)
            return 5

    if not args.skip_weights:
        repos = PROFILE_REPO[profile]
        if repos:
            result = await _download_weights(
                worker,
                profile=profile,
                repos_patterns=repos,
                host_data_dir=str(host_data_dir),
            )
            if result.get("status") == "error":
                print(
                    f"weight download failed: {json.dumps(result, ensure_ascii=False)}",
                    file=sys.stderr,
                    flush=True,
                )
                return 3

    if not args.skip_vendor and profile != "fake":
        vendor = _vendor_dir(str(host_data_dir))
        vendor.mkdir(parents=True, exist_ok=True)
        try:
            result = await _vendor_source_files(
                worker,
                profile=profile,
                vendor_dir=vendor,
                commit=VENDOR_COMMIT,
            )
        except InstallerSchemaMismatch as e:
            print(f"vendor schema mismatch: {e}", file=sys.stderr, flush=True)
            return 4
        if result.get("status") == "error":
            print(
                f"vendor fetch failed: {json.dumps(result, ensure_ascii=False)}",
                file=sys.stderr,
                flush=True,
            )
            return 4

    summary = {
        "status": "ok",
        "profile": profile,
        "host_data_dir": str(host_data_dir),
        "vendor_dir": str(_vendor_dir(str(host_data_dir))) if profile != "fake" else None,
        "vendor_commit": VENDOR_COMMIT,
    }
    print(json.dumps(summary, ensure_ascii=False), flush=True)
    return 0


def main(argv: list[str] | None = None) -> int:
    parser = argparse.ArgumentParser(
        prog="nexus-video-longcat-install",
        description=(
            "Headless installer for nexus-video-longcat. Runs uv sync, downloads "
            "model weights, and fetches vendored MIT source files from "
            "meituan-longcat/LongCat-Video without requiring the Rust host."
        ),
    )
    parser.add_argument(
        "--profile",
        default="rtx50-fp8",
        choices=sorted(PROFILE_REPO),
        help="Backend runtime profile (default: rtx50-fp8).",
    )
    parser.add_argument(
        "--host-data-dir",
        required=True,
        help=(
            "Absolute path to the host data dir. Models land under "
            "<host_data_dir>/models/<owner>/<name>/; vendored sources land "
            "under <host_data_dir>/extensions/nexus.video.longcat/vendor/longcat/."
        ),
    )
    parser.add_argument(
        "--skip-uv-sync",
        action="store_true",
        help="Skip uv sync (assume the worker venv is already populated).",
    )
    parser.add_argument(
        "--skip-weights",
        action="store_true",
        help="Skip weight downloads (vendor sources only).",
    )
    parser.add_argument(
        "--skip-vendor",
        action="store_true",
        help="Skip vendor source-files fetch (weights only).",
    )
    parser.add_argument(
        "--quiet",
        action="store_true",
        help="Suppress per-event progress notifications on stderr.",
    )
    args = parser.parse_args(argv)
    return asyncio.run(_run_async(args))


if __name__ == "__main__":
    raise SystemExit(main())
