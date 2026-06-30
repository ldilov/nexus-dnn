from __future__ import annotations

import asyncio
import os
import sys


def _hijack_stdout() -> None:
    """Isolate the JSON-RPC wire (fd 1) from every subprocess.

    The host lease reads newline-delimited JSON from the worker's stdout (fd 1).
    A child process (or a chatty native kernel) inheriting fd 1 can print bytes
    there and corrupt the NDJSON frame — an oversize line trips the host framer's
    cap and the lease reports the worker "crashed".

    We duplicate fd 1 to a private fd for the RPC writer, then redirect fd 1 (and
    Python-level stdout) to stderr, so subprocess/kernel output can never reach
    the wire. Falls back to a Python-level rebind if the OS dup is unavailable.
    """
    try:
        rpc_fd = os.dup(1)
        os.dup2(2, 1)
        sys.__nexus_jsonrpc_stdout__ = os.fdopen(rpc_fd, "w", encoding="utf-8", buffering=1)
    except OSError:
        sys.__nexus_jsonrpc_stdout__ = sys.stdout
    sys.stdout = sys.stderr
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(line_buffering=True)
    if hasattr(sys.__nexus_jsonrpc_stdout__, "reconfigure"):
        sys.__nexus_jsonrpc_stdout__.reconfigure(line_buffering=True)


def cli() -> int:
    os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")
    _hijack_stdout()
    from .main import Worker
    from .pipeline_fake import register_fake_handlers

    profile = os.environ.get("NEXUS_3D_FACEAVATAR_RUNTIME", "fake")
    if profile != "fake":
        try:
            import torch  # noqa: F401
        except ImportError as e:
            print(
                '{"level":"warn","target":"nexus.3d.faceavatar",'
                '"event":"pre_import_failed","error":"' + str(e) + '"}',
                file=sys.stderr,
                flush=True,
            )

    worker = Worker(profile=profile)
    if profile == "fake":
        register_fake_handlers(worker)
    elif profile == "gb10":
        try:
            from .pipeline_arc2avatar import register_arc2avatar_handlers
        except ImportError as e:
            worker.logger.error("pipeline import failed", profile=profile, error=str(e))
            return 2
        register_arc2avatar_handlers(worker)
    else:
        worker.logger.error("unknown profile", profile=profile)
        return 2
    return asyncio.run(worker.run())


if __name__ == "__main__":
    raise SystemExit(cli())
