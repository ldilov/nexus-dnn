from __future__ import annotations

from enum import Enum


class ProfileState(Enum):
    DRAFT = "draft"
    RUNTIME_MISSING = "runtime_missing"
    RUNTIME_INSTALLING = "runtime_installing"
    RUNTIME_VALIDATING = "runtime_validating"
    MODEL_MISSING = "model_missing"
    CONFIG_INVALID = "config_invalid"
    READY = "ready"
    STARTING = "starting"
    RUNNING = "running"
    STOPPING = "stopping"
    STOPPED = "stopped"
    DEGRADED = "degraded"
    FAILED = "failed"
