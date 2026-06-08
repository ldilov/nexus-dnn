from __future__ import annotations
import asyncio, os, sys


def _hijack_stdout() -> None:
    sys.__nexus_jsonrpc_stdout__ = sys.stdout
    sys.stdout = sys.stderr
    if hasattr(sys.stderr, "reconfigure"):
        sys.stderr.reconfigure(line_buffering=True)
    if hasattr(sys.__nexus_jsonrpc_stdout__, "reconfigure"):
        sys.__nexus_jsonrpc_stdout__.reconfigure(line_buffering=True)


def cli() -> int:
    os.environ.setdefault("PYTORCH_CUDA_ALLOC_CONF", "expandable_segments:True")
    _hijack_stdout()
    from .installer import register_installer_handlers
    from .main import Worker
    from .pipeline_fake import register_fake_handlers
    from .presets import register_preset_handlers

    profile = os.environ.get("NEXUS_VIDEO_SVI2_RUNTIME", "fake")
    if profile != "fake":
        try:
            import numpy  # noqa: F401
            import torch  # noqa: F401
        except ImportError as e:
            print(
                '{"level":"warn","target":"nexus.video.svi2-pro",'
                '"event":"pre_import_failed","error":"' + str(e) + '"}',
                file=sys.stderr, flush=True,
            )
    worker = Worker(profile=profile)
    register_installer_handlers(worker)
    register_preset_handlers(worker)
    if profile == "fake":
        register_fake_handlers(worker)
    elif profile == "rtx50-fp8":
        try:
            from .pipeline_svi2 import register_svi2_handlers
        except ImportError as e:
            worker.logger.error("pipeline import failed", profile=profile, error=str(e))
            return 2
        register_svi2_handlers(worker)
    else:
        worker.logger.error("unknown profile", profile=profile)
        return 2
    return asyncio.run(worker.run())


if __name__ == "__main__":
    raise SystemExit(cli())
