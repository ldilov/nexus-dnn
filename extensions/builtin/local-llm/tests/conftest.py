"""pytest fixture root for the local-llm extension.

Wires `sys.path` so tests can import the in-repo `nexus_sdk` package
(`sdk/python/`) and the extension's own `worker` / `backends` modules
without requiring a venv install. Production code is unaffected — this
file only runs when pytest is collecting tests under this directory.
"""
from __future__ import annotations

import sys
from pathlib import Path

_HERE = Path(__file__).resolve().parent
_EXTENSION_ROOT = _HERE.parent
_REPO_ROOT = _EXTENSION_ROOT.parent.parent.parent
_SDK_PATH = _REPO_ROOT / "sdk" / "python"

for path in (_SDK_PATH, _EXTENSION_ROOT):
    p = str(path)
    if p not in sys.path:
        sys.path.insert(0, p)
