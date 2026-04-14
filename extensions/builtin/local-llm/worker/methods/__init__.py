from __future__ import annotations

from worker.methods.environment import ENVIRONMENT_METHODS
from worker.methods.lifecycle import LIFECYCLE_METHODS
from worker.methods.monitoring import MONITORING_METHODS
from worker.methods.profile import PROFILE_METHODS
from worker.methods.runtime import RUNTIME_METHODS

ALL_METHODS = {
    **ENVIRONMENT_METHODS,
    **RUNTIME_METHODS,
    **PROFILE_METHODS,
    **LIFECYCLE_METHODS,
    **MONITORING_METHODS,
}

__all__ = [
    "ALL_METHODS",
    "ENVIRONMENT_METHODS",
    "LIFECYCLE_METHODS",
    "MONITORING_METHODS",
    "PROFILE_METHODS",
    "RUNTIME_METHODS",
]
