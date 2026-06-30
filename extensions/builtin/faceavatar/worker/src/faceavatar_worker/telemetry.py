"""Structured stderr logging — never writes to the JSON-RPC stdout wire."""
from __future__ import annotations

import json
import sys
from typing import Any

_TARGET = "nexus.3d.faceavatar"


class WorkerLogger:
    def _emit(self, level: str, event: str, **fields: Any) -> None:
        rec = {"level": level, "target": _TARGET, "event": event, **fields}
        print(json.dumps(rec), file=sys.stderr, flush=True)

    def info(self, event: str, **f: Any) -> None:
        self._emit("info", event, **f)

    def warn(self, event: str, **f: Any) -> None:
        self._emit("warn", event, **f)

    def error(self, event: str, **f: Any) -> None:
        self._emit("error", event, **f)
