"""Worker process entrypoint for longcat-video.

Swaps `sys.stdout` to point at `stderr` BEFORE importing the rest of the
worker so any rogue `print()` from torch / huggingface_hub / numpy can't
corrupt the wire protocol. The original stdout is stashed on `sys` for the
JSON-RPC framer to fetch.

Pattern copied from emotion-tts (battle-tested).
"""

from __future__ import annotations

import asyncio
import os
import sys


def _hijack_stdout() -> None:
    sys.__nexus_jsonrpc_stdout__ = sys.stdout
    sys.stdout = sys.stderr
    # PYTHONUNBUFFERED=1 from the host only unbuffers the C-level FILE*; it
    # does not touch Python's TextIOWrapper. Without this reconfigure, log
    # lines from torch / diffusers / huggingface_hub (which all go through
    # the stdlib `logging` module's StreamHandler) sit in the TextIOWrapper
    # buffer and only flush when tqdm overflows it — observed as a 22-minute
    # dead-silence window during model load on RTX 5070 Ti (2026-05-14).
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(line_buffering=True)
    if hasattr(sys.__nexus_jsonrpc_stdout__, "reconfigure"):
        sys.__nexus_jsonrpc_stdout__.reconfigure(line_buffering=True)


def cli() -> int:
    _hijack_stdout()

    from .installer import register_installer_handlers
    from .main import Worker
    from .pipeline_fake import register_fake_handlers
    from .telemetry import WorkerLogger

    profile = os.environ.get("NEXUS_VIDEO_LONGCAT_RUNTIME", "fake")

    # Windows LoaderLock workaround. The longcat pipeline imports numpy +
    # torch lazily inside `asyncio.to_thread(_ensure_pipeline_loaded)`. On
    # Windows those imports load C extensions whose DllMain spawns helper
    # threads. When the loading thread holds the GIL while waiting on those
    # helper threads (which need the GIL to call back into Python), the
    # process deadlocks. Pre-importing on the MAIN thread BEFORE asyncio.run
    # starts cures this: the GIL contention only happens during initial module
    # load, and once cached, the in-thread `import torch` becomes a no-op.
    # `fake` profile skips this — its render path never touches torch.
    if profile != "fake":
        try:
            import numpy  # noqa: F401 — pre-import side-effect
            import torch  # noqa: F401 — pre-import side-effect
        except ImportError as e:
            # Diffusers extras may not be installed yet for first-boot
            # install flows; log via stderr (telemetry isn't set up yet)
            # and let the worker continue with the lazy path.
            print(
                '{"level":"warn","target":"nexus.video.longcat",'
                '"event":"pre_import_failed","error":"' + str(e) + '"}',
                file=sys.stderr,
                flush=True,
            )

    worker = Worker(profile=profile)

    # Installer handlers are registered regardless of profile so any fresh
    # worker can drive a model download for ANY profile. The recipe UI's
    # "Download weights" CTA wakes a fake-profile worker (cheapest spawn)
    # and asks IT to fetch the FP8 repo — no need to first install the full
    # diffusers extras just to download files.
    register_installer_handlers(worker)

    if profile == "fake":
        register_fake_handlers(worker)
    elif profile == "rtx50-fp8-distill":
        try:
            from .pipeline_longcat import register_longcat_handlers
        except ImportError as e:
            worker.logger.error(
                "rtx50-fp8-distill profile requested but pipeline_longcat is not "
                "importable (diffusers extras missing?).",
                profile=profile,
                error=str(e),
            )
            return 2
        register_longcat_handlers(worker, use_distill=True)
    elif profile == "rtx50-fp8":
        try:
            from .pipeline_longcat import register_longcat_handlers
        except ImportError as e:
            worker.logger.error(
                "rtx50-fp8 profile requested but pipeline_longcat is not "
                "importable (diffusers extras missing?).",
                profile=profile,
                error=str(e),
            )
            return 2
        register_longcat_handlers(worker, use_distill=False)
    else:
        worker.logger.error(
            "unknown profile — no pipeline registered.",
            profile=profile,
        )
        return 2

    return asyncio.run(worker.run())


if __name__ == "__main__":
    raise SystemExit(cli())
