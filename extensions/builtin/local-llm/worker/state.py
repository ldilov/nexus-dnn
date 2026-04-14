"""Shared mutable state for the worker process.

Holds runtime installs, backend profiles, active adapters, and install
tasks in memory.  Persistence to the host extension storage happens at
the call-site level via JSON-RPC.
"""
from __future__ import annotations

import asyncio
import time
import uuid
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any

from worker.backends.adapter import BackendAdapter
from worker.backends.states import ProfileState


@dataclass
class RuntimeInstall:
    id: str
    backend_family: str
    version: str
    platform: str
    arch: str
    acceleration: str
    install_path: Path
    binary_path: Path | None
    state: str  # installing, installed, validated, ready, failed
    error: str | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "backend_family": self.backend_family,
            "version": self.version,
            "platform": self.platform,
            "arch": self.arch,
            "acceleration": self.acceleration,
            "install_path": str(self.install_path),
            "binary_path": str(self.binary_path) if self.binary_path else None,
            "state": self.state,
            "error": self.error,
        }


@dataclass
class BackendProfile:
    id: str
    name: str
    backend_family: str
    runtime_install_id: str | None = None
    model_path: str | None = None
    model_name: str | None = None
    state: ProfileState = ProfileState.DRAFT
    config: dict[str, Any] = field(default_factory=dict)
    pid: int | None = None
    endpoint: str | None = None
    created_at: float = field(default_factory=time.time)
    last_failure: dict[str, Any] | None = None

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "name": self.name,
            "backend_family": self.backend_family,
            "runtime_install_id": self.runtime_install_id,
            "model_path": self.model_path,
            "model_name": self.model_name,
            "state": self.state.value,
            "config": self.config,
            "pid": self.pid,
            "endpoint": self.endpoint,
            "created_at": self.created_at,
        }


@dataclass
class InstallTask:
    id: str
    runtime_id: str
    state: str  # pending, downloading, extracting, validating, done, failed, cancelled
    progress_percent: float = 0.0
    bytes_downloaded: int = 0
    bytes_total: int = 0
    error: str | None = None
    started_at: float = field(default_factory=time.time)
    logs: list[str] = field(default_factory=list)
    cancel_event: asyncio.Event = field(default_factory=asyncio.Event)

    def log(self, message: str) -> None:
        self.logs.append(f"[{time.strftime('%H:%M:%S')}] {message}")

    def to_dict(self) -> dict[str, Any]:
        return {
            "id": self.id,
            "runtime_id": self.runtime_id,
            "state": self.state,
            "progress_percent": self.progress_percent,
            "bytes_downloaded": self.bytes_downloaded,
            "bytes_total": self.bytes_total,
            "error": self.error,
            "started_at": self.started_at,
        }


class WorkerState:
    """Shared mutable state for the worker process."""

    def __init__(self, data_dir: Path) -> None:
        self.data_dir = data_dir
        self.runtimes_dir = data_dir / "runtimes"
        self.runtimes: dict[str, RuntimeInstall] = {}
        self.profiles: dict[str, BackendProfile] = {}
        self.active_backends: dict[str, BackendAdapter] = {}
        self.install_tasks: dict[str, InstallTask] = {}
        self.history: list[dict[str, Any]] = []
        self.manifest: dict[str, Any] = {}

    def new_profile_id(self) -> str:
        return str(uuid.uuid4())

    def new_runtime_id(self) -> str:
        return str(uuid.uuid4())

    def new_task_id(self) -> str:
        return str(uuid.uuid4())

    def record_event(self, profile_id: str, event: str, detail: str = "") -> None:
        self.history.append({
            "profile_id": profile_id,
            "event": event,
            "detail": detail,
            "timestamp": time.time(),
        })
