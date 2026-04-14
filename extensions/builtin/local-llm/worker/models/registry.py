"""Local model install registry backed by extension storage."""
from __future__ import annotations

import time
from dataclasses import dataclass, field
from enum import Enum
from typing import Any


class InstallStatus(Enum):
    """Lifecycle state of a locally installed model."""

    DOWNLOADING = "downloading"
    READY = "ready"
    FAILED = "failed"
    REMOVED = "removed"


@dataclass(frozen=True)
class InstalledModel:
    """Immutable record of a model install on disk."""

    model_id: str
    repo_id: str
    filename: str
    local_path: str
    size_bytes: int
    quantization: str | None
    backend_hint: str
    status: InstallStatus
    installed_at: float
    metadata: dict[str, Any] = field(default_factory=dict)


class ModelRegistry:
    """Tracks locally installed model files.

    Uses in-memory state. Persistence to the host extension storage
    (ext_local_llm_model_installs) happens via JSON-RPC calls made
    by the operator handlers.
    """

    def __init__(self) -> None:
        self._models: dict[str, InstalledModel] = {}

    def register(
        self,
        model_id: str,
        repo_id: str,
        filename: str,
        local_path: str,
        size_bytes: int,
        quantization: str | None,
        backend_hint: str,
    ) -> InstalledModel:
        """Register a newly downloaded model as READY."""
        model = InstalledModel(
            model_id=model_id,
            repo_id=repo_id,
            filename=filename,
            local_path=local_path,
            size_bytes=size_bytes,
            quantization=quantization,
            backend_hint=backend_hint,
            status=InstallStatus.READY,
            installed_at=time.time(),
        )
        self._models[model_id] = model
        return model

    def get(self, model_id: str) -> InstalledModel | None:
        """Look up a model by its id."""
        return self._models.get(model_id)

    def list_all(self) -> list[InstalledModel]:
        """Return all registered models."""
        return list(self._models.values())

    def list_ready(self) -> list[InstalledModel]:
        """Return only models with READY status."""
        return [m for m in self._models.values() if m.status == InstallStatus.READY]

    def mark_failed(self, model_id: str, error: str) -> InstalledModel | None:
        """Transition a model to FAILED status."""
        existing = self._models.get(model_id)
        if existing is None:
            return None
        updated = InstalledModel(
            model_id=existing.model_id,
            repo_id=existing.repo_id,
            filename=existing.filename,
            local_path=existing.local_path,
            size_bytes=existing.size_bytes,
            quantization=existing.quantization,
            backend_hint=existing.backend_hint,
            status=InstallStatus.FAILED,
            installed_at=existing.installed_at,
            metadata={**existing.metadata, "error": error},
        )
        self._models[model_id] = updated
        return updated

    def remove(self, model_id: str) -> InstalledModel | None:
        """Mark a model as REMOVED (does not delete files)."""
        existing = self._models.get(model_id)
        if existing is None:
            return None
        updated = InstalledModel(
            model_id=existing.model_id,
            repo_id=existing.repo_id,
            filename=existing.filename,
            local_path=existing.local_path,
            size_bytes=existing.size_bytes,
            quantization=existing.quantization,
            backend_hint=existing.backend_hint,
            status=InstallStatus.REMOVED,
            installed_at=existing.installed_at,
            metadata=existing.metadata,
        )
        self._models[model_id] = updated
        return updated

    def load_from_storage(self, rows: list[dict[str, Any]]) -> None:
        """Hydrate the registry from storage query results."""
        for row in rows:
            model = InstalledModel(
                model_id=row["model_id"],
                repo_id=row.get("repo_id", ""),
                filename=row.get("filename", ""),
                local_path=row.get("local_path", ""),
                size_bytes=row.get("size_bytes", 0),
                quantization=row.get("quantization"),
                backend_hint=row.get("backend_hint", ""),
                status=InstallStatus(row.get("status", "ready")),
                installed_at=row.get("installed_at", 0.0),
                metadata=row.get("metadata", {}),
            )
            self._models[model.model_id] = model
