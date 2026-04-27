"""Process entrypoint — runs the worker with the full Phase-4 handler set."""

from __future__ import annotations

import os
import sys
from pathlib import Path

# Pre-import torch BEFORE the asyncio event loop and stdin pump thread
# spin up. On Windows, `sys.stdin.buffer.readline()` from a daemon
# thread can hold the GIL during the blocking read, which deadlocks
# any subsequent `import torch` call from the asyncio coroutine that
# wants the GIL to dlopen CUDA libraries. Importing torch synchronously
# at module-load time happens BEFORE the thread starts, so the dlopen
# completes cleanly. Wrapped in try/except because torch is not a hard
# dependency of the intrinsic protocol — if it's not installed we fall
# back to the optional-import path inside the handshake handler.
try:
    import torch as _torch_preload  # noqa: F401 — side-effect-only preload
except ImportError:
    pass

from .handlers import register_phase4_handlers
from .indextts_adapter import AdapterSettings, IndexTtsAdapter
from .main import Worker
from .synthesis import SynthesisService


def main() -> int:
    worker = Worker()
    model_dir = os.environ.get("EMOTIONTTS_MODEL_DIR_ABS")
    adapter: IndexTtsAdapter | None = None
    synthesis: SynthesisService | None = None

    if model_dir and Path(model_dir).exists():
        adapter = IndexTtsAdapter(AdapterSettings(model_dir_abs=model_dir))
        synthesis = SynthesisService(adapter=adapter, emitter=worker._emit_sync)

    register_phase4_handlers(worker, adapter=adapter, synthesis=synthesis)

    import asyncio

    return asyncio.run(worker.run())


if __name__ == "__main__":
    sys.exit(main())
