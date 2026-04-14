from __future__ import annotations

import json
from typing import TYPE_CHECKING, Any

if TYPE_CHECKING:
    from nexus_sdk.worker import ExecutionContext


class ArtifactIO:
    """Read and write artifacts through the execution context's output targets."""

    def __init__(self, context: ExecutionContext) -> None:
        self._context = context

    def resolve_read_path(self, port_name: str) -> str:
        """Resolve the filesystem path for an input artifact port."""
        targets = self._context.output_targets
        port = targets.get(port_name)
        if port is None:
            raise KeyError(f"No output target configured for port: {port_name}")
        path = port.get("path") if isinstance(port, dict) else port
        if not isinstance(path, str):
            raise ValueError(f"Cannot resolve path for port: {port_name}")
        return path

    def read_text(self, port_name: str) -> str:
        """Read the contents of a text artifact."""
        path = self.resolve_read_path(port_name)
        with open(path, encoding="utf-8") as fh:
            return fh.read()

    def read_json(self, port_name: str) -> dict[str, Any]:
        """Read and parse a JSON artifact."""
        raw = self.read_text(port_name)
        return json.loads(raw)

    def _resolve_write_path(self, port_name: str) -> str:
        targets = self._context.output_targets
        port = targets.get(port_name)
        if port is None:
            raise KeyError(f"No output target configured for port: {port_name}")
        path = port.get("path") if isinstance(port, dict) else port
        if not isinstance(path, str):
            raise ValueError(f"Cannot resolve write path for port: {port_name}")
        return path

    def write_text(self, port_name: str, content: str, artifact_type: str = "text") -> None:
        """Write a text artifact to the specified output port."""
        path = self._resolve_write_path(port_name)
        with open(path, "w", encoding="utf-8") as fh:
            fh.write(content)
        self._notify_artifact(port_name, path, artifact_type)

    def write_json(self, port_name: str, data: Any, artifact_type: str = "json") -> None:
        """Write a JSON-serializable artifact to the specified output port."""
        path = self._resolve_write_path(port_name)
        with open(path, "w", encoding="utf-8") as fh:
            json.dump(data, fh, separators=(",", ":"))
        self._notify_artifact(port_name, path, artifact_type)

    def write_bytes(self, port_name: str, data: bytes, artifact_type: str = "binary") -> None:
        """Write raw bytes to the specified output port."""
        path = self._resolve_write_path(port_name)
        with open(path, "wb") as fh:
            fh.write(data)
        self._notify_artifact(port_name, path, artifact_type)

    def _notify_artifact(self, port_name: str, path: str, artifact_type: str) -> None:
        from nexus_sdk.protocol import format_notification

        notification = format_notification("artifact_written", {
            "request_id": self._context.request_id,
            "port_name": port_name,
            "path": path,
            "artifact_type": artifact_type,
        })
        self._context._write_line(notification)
