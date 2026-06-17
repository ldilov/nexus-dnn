"""Cross-module shared state for the heavy-import warmer.

The warmer is started in ``__main__.py`` and pre-imports
scipy / sklearn / transformers / indextts.infer_v2 on a daemon thread so
the asyncio event loop's `model.load` handler can do a cached lookup
instead of duplicating the work.

Concurrent first-time imports of the scipy stack from two threads on
Windows can stall indefinitely — the OS DLL loader lock + Python's
per-module import lock interact pathologically when two threads both try
to load the same `.pyd` chain. To avoid that race, ``ensure_model`` waits
on `WARM_DONE` before kicking off its own imports. The warmer is then
the SOLE importer; the asyncio thread sees fully-cached modules.
"""

from __future__ import annotations

import threading

# Set by ``_warm_heavy_imports`` once the import chain has fully run
# (success or first-failure). Consumers waiting on this MUST tolerate
WARM_DONE = threading.Event()
