"""Structured telemetry emitter.

Writes ``log`` notifications on the JSON-RPC stream plus forwards to the
Python ``logging`` module for local stderr inspection. The host-side Rust
shim forwards worker stderr to ``tracing::info!`` so local log lines still
reach the host observability surface.
"""

from __future__ import annotations

import logging
import sys
import time
from typing import Any, Callable

from .rpc import notification


class WorkerLogger:
    def __init__(self, emitter: Callable[[dict[str, Any]], None]) -> None:
        self._emitter = emitter
        self._stderr = logging.getLogger("emotion_tts_worker")
        if not self._stderr.handlers:
            handler = logging.StreamHandler(sys.stderr)
            handler.setFormatter(
                logging.Formatter("%(asctime)s %(levelname)s %(name)s %(message)s")
            )
            self._stderr.addHandler(handler)
            self._stderr.setLevel(logging.INFO)

    def log(
        self,
        level: str,
        event: str,
        **fields: Any,
    ) -> None:
        payload: dict[str, Any] = {
            "level": level,
            "event": event,
            "ts": time.time(),
            "fields": fields,
        }
        self._emitter(notification("log", payload))
        self._stderr.log(_level_name_to_int(level), "%s %s", event, fields)

    def info(self, event: str, **fields: Any) -> None:
        self.log("info", event, **fields)

    def warning(self, event: str, **fields: Any) -> None:
        self.log("warning", event, **fields)

    def error(self, event: str, **fields: Any) -> None:
        self.log("error", event, **fields)


def _level_name_to_int(level: str) -> int:
    return {
        "debug": logging.DEBUG,
        "info": logging.INFO,
        "warning": logging.WARNING,
        "error": logging.ERROR,
    }.get(level.lower(), logging.INFO)
