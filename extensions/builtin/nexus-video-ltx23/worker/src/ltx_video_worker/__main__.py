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

    profile = os.environ.get("NEXUS_VIDEO_LTX23_RUNTIME", "fake")

    if profile != "fake":
        try:
            import numpy  # noqa: F401 — pre-import side-effect
            import torch  # noqa: F401 — pre-import side-effect

            try:
                import modelopt.torch.quantization  # noqa: F401
            except ImportError:
                pass
            try:
                import scipy.linalg  # noqa: F401 — pre-import side-effect
                import scipy.optimize  # noqa: F401 — pre-import side-effect
                import scipy.interpolate  # noqa: F401 — pre-import side-effect
            except ImportError:
                pass

            try:
                import bitsandbytes  # noqa: F401 — pre-import side-effect
            except ImportError:
                pass
        except ImportError as e:
            print(
                '{"level":"warn","target":"nexus.video.ltx23",'
                '"event":"pre_import_failed","error":"' + str(e) + '"}',
                file=sys.stderr,
                flush=True,
            )

    worker = Worker(profile=profile)

    # Installer handlers are registered regardless of profile so any fresh
    # worker can drive a model download for ANY profile. The recipe UI's
    # "Download weights" CTA wakes a fake-profile worker (cheapest spawn)
    # and asks IT to fetch the FP8/NVFP4 repo — no need to first install
    # the full diffusers extras just to download files.
    register_installer_handlers(worker)

    if profile == "fake":
        register_fake_handlers(worker)
    elif "ltxv097" in profile:
        # LTX-Video 0.9.7 13B is a SEPARATE model line (T5 encoder, own
        # VAE, diffusers-native LTXConditionPipeline + from_single_file
        # GGUF) — its own isolated module so it can't destabilise the
        # LTX-2.3 path. Mirrors runtime_selection::is_ltxv097_family.
        try:
            from .pipeline_ltxv097 import register_ltxv097_handlers
        except ImportError as e:
            worker.logger.error(
                "ltxv097 profile requested but pipeline_ltxv097 is not "
                "importable (diffusers extras missing?).",
                profile=profile,
                error=str(e),
            )
            return 2
        register_ltxv097_handlers(worker)
    elif "ltx2" in profile:
        # LTX-2 19B (Kijai distilled GGUF stack) is a THIRD model line —
        # diffusers LTX2Pipeline family, Gemma-3-12B encoder + embeddings
        # connector, Kijai video/audio VAE. Its own isolated module so it
        # cannot destabilise the LTX-2.3 or 0.9.7 paths. Mirrors
        # runtime_selection::is_ltx2_family.
        try:
            from .pipeline_ltx2 import register_ltx2_handlers
        except ImportError as e:
            worker.logger.error(
                "ltx2 profile requested but pipeline_ltx2 is not "
                "importable (diffusers extras missing?).",
                profile=profile,
                error=str(e),
            )
            return 2
        register_ltx2_handlers(worker)
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
