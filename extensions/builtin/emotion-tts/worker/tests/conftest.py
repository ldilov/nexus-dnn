"""Put the worker package on sys.path so tests can import
``emotion_tts_worker.*`` without `uv sync` / `pip install -e .` — which fails
in bare CI environments without the `index-tts` git source.

The real package is under ``src/emotion_tts_worker/``; this conftest only
prepends ``src/`` so tests collect cleanly.
"""

from __future__ import annotations

import sys
from pathlib import Path

TESTS_DIR = Path(__file__).resolve().parent
SRC_DIR = TESTS_DIR.parent / "src"
for candidate in (SRC_DIR, TESTS_DIR):
    if candidate.is_dir():
        path_str = str(candidate)
        if path_str not in sys.path:
            sys.path.insert(0, path_str)
