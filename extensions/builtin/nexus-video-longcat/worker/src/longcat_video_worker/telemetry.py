"""Structured JSON logging — emits one line per event to stderr."""

from __future__ import annotations

import json
import sys
import time
from typing import Any


class WorkerLogger:
    def __init__(self, target: str = "nexus.video.longcat") -> None:
        self._target = target

    def _emit(self, level: str, event: str, **fields: Any) -> None:
        line = {
            "ts": time.time(),
            "level": level,
            "target": self._target,
            "event": event,
            **fields,
        }
        try:
            sys.stderr.write(json.dumps(line) + "\n")
            sys.stderr.flush()
        except Exception:
            pass

    def info(self, event: str, **fields: Any) -> None:
        self._emit("info", event, **fields)

    def warn(self, event: str, **fields: Any) -> None:
        self._emit("warn", event, **fields)

    def error(self, event: str, **fields: Any) -> None:
        self._emit("error", event, **fields)

    def debug(self, event: str, **fields: Any) -> None:
        self._emit("debug", event, **fields)
