from __future__ import annotations

import os
import platform
import time
from dataclasses import dataclass, field
from enum import Enum
from typing import Any


class HealthStatus(Enum):
    """Possible health states for a service worker."""

    READY = "ready"
    DEGRADED = "degraded"
    FAILED = "failed"
    STARTING = "starting"
    STOPPED = "stopped"


@dataclass
class HealthReporter:
    """Tracks and reports the health state of a service worker."""

    worker_name: str
    _status: HealthStatus = field(default=HealthStatus.STARTING, init=False)
    _backend_info: dict[str, Any] | None = field(default=None, init=False)
    _last_error: str | None = field(default=None, init=False)
    _started_at: float = field(default_factory=time.monotonic, init=False)

    def set_ready(self, backend_info: dict[str, Any] | None = None) -> None:
        """Transition to READY status with optional backend metadata."""
        self._status = HealthStatus.READY
        self._last_error = None
        if backend_info is not None:
            self._backend_info = backend_info

    def set_degraded(self, reason: str, backend_info: dict[str, Any] | None = None) -> None:
        """Transition to DEGRADED status with a human-readable reason."""
        self._status = HealthStatus.DEGRADED
        self._last_error = reason
        if backend_info is not None:
            self._backend_info = backend_info

    def set_failed(self, error: str) -> None:
        """Transition to FAILED status with an error description."""
        self._status = HealthStatus.FAILED
        self._last_error = error

    def to_payload(self) -> dict[str, Any]:
        """Serialize current health state into a notification-ready dict."""
        payload: dict[str, Any] = {
            "status": self._status.value,
            "worker_name": self.worker_name,
            "runtime_info": {
                "python_version": platform.python_version(),
                "pid": os.getpid(),
            },
            "uptime_seconds": int(time.monotonic() - self._started_at),
        }
        if self._backend_info is not None:
            payload["backend_info"] = self._backend_info
        if self._last_error is not None:
            payload["last_error"] = self._last_error
        return payload
