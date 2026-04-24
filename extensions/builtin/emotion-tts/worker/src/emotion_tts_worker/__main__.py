"""Process entrypoint — runs the worker with the full Phase-4 handler set."""

from __future__ import annotations

import os
import sys
from pathlib import Path

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
