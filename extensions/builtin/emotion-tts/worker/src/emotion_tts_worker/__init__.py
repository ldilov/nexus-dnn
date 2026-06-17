"""EmotionTTS Python worker.

Speaks NDJSON JSON-RPC 2.0 over stdio to the host-side Rust shim. Delegates
synthesis to upstream IndexTTS-2 through :mod:`indextts_adapter` (Phase 3).
"""

from __future__ import annotations

__version__ = "0.2.0"
__all__ = ["__version__"]
