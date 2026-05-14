"""Worker process entrypoint.

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


def cli() -> int:
    _hijack_stdout()

    from .installer import register_installer_handlers
    from .main import Worker
    from .pipeline_fake import register_fake_handlers
    from .telemetry import WorkerLogger

    profile = os.environ.get("NEXUS_VIDEO_LTX23_RUNTIME", "fake")
    worker = Worker(profile=profile)

    # Installer handlers are registered regardless of profile so any fresh
    # worker can drive a model download for ANY profile. The recipe UI's
    # "Download weights" CTA wakes a fake-profile worker (cheapest spawn)
    # and asks IT to fetch the FP8/NVFP4 repo — no need to first install
    # the full diffusers extras just to download files.
    register_installer_handlers(worker)

    if profile == "fake":
        register_fake_handlers(worker)
    else:
        try:
            from .pipeline_diffusers import register_diffusers_handlers
        except ImportError:
            worker.logger.error(
                "diffusers profile requested but pipeline_diffusers is not "
                "importable. This is expected during P1 scaffolding; "
                "pipeline_diffusers lands in P2.",
                profile=profile,
            )
            return 2
        register_diffusers_handlers(worker)

    return asyncio.run(worker.run())


if __name__ == "__main__":
    raise SystemExit(cli())
