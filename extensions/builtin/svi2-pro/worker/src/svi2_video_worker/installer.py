from __future__ import annotations

import asyncio
import os
import sys
from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Callable

import yaml

SENTINEL_NAME = ".nexus-install-complete"

_background_tasks: set[asyncio.Task[None]] = set()


@dataclass(frozen=True)
class Artifact:
    id: str
    repo: str
    kind: str
    revision: str = "main"
    file: str | None = None
    subfolder: str | None = None


def resolve_artifacts(versions_path: Path) -> list[Artifact]:
    raw: dict[str, Any] = yaml.safe_load(versions_path.read_text(encoding="utf-8"))
    versions: list[dict[str, Any]] = raw.get("versions", [])
    if not versions:
        return []
    first_version: dict[str, Any] = versions[0]
    artifacts_raw: list[dict[str, Any]] = first_version.get("artifacts", [])
    result: list[Artifact] = []
    for entry in artifacts_raw:
        artifact_id: str = entry["id"]
        source: dict[str, Any] = entry.get("source", {})
        result.append(
            Artifact(
                id=artifact_id,
                repo=source["repo"],
                kind=source.get("kind", "huggingface"),
                revision=source.get("revision", "main"),
                file=source.get("file"),
                subfolder=source.get("subfolder"),
            )
        )
    return result


def download_artifacts(
    artifacts: list[Artifact],
    dest_dir: Path,
    hf_download: Callable[..., Any] | None = None,
) -> list[Path]:
    if hf_download is None:
        from huggingface_hub import hf_hub_download  # type: ignore

        hf_download = hf_hub_download

    dest_dir.mkdir(parents=True, exist_ok=True)
    downloaded: list[Path] = []

    for artifact in artifacts:
        if artifact.kind == "huggingface":
            local = hf_download(
                repo_id=artifact.repo,
                filename=artifact.file,
                revision=artifact.revision,
                local_dir=str(dest_dir),
            )
            downloaded.append(Path(local))
        elif artifact.kind == "huggingface_split":
            from huggingface_hub import snapshot_download  # type: ignore

            patterns = [artifact.subfolder + "/*"] if artifact.subfolder else None
            local = snapshot_download(
                repo_id=artifact.repo,
                revision=artifact.revision,
                local_dir=str(dest_dir),
                allow_patterns=patterns,
            )
            downloaded.append(Path(local))

    return downloaded


def write_sentinel(dest_dir: Path) -> Path:
    dest_dir.mkdir(parents=True, exist_ok=True)
    sentinel = dest_dir / SENTINEL_NAME
    sentinel.write_text("installed_by=nexus.video.svi2-pro.installer\n", encoding="utf-8")
    return sentinel


def read_sentinel(dest_dir: Path) -> bool:
    return (dest_dir / SENTINEL_NAME).is_file()


def register_installer_handlers(worker: Any) -> None:
    async def install_start(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")

        versions_path_raw: str | None = params.get("versions_path") or os.environ.get(
            "SVI2_VERSIONS_YAML"
        )
        host_data_dir: str | None = params.get("host_data_dir") or os.environ.get(
            "NEXUS_HOST_DATA_DIR"
        )
        if not versions_path_raw or not host_data_dir:
            raise ValueError("versions_path and host_data_dir are required")

        versions_path = Path(versions_path_raw)
        dest_dir = Path(host_data_dir) / "extensions" / "nexus.video.svi2-pro" / "models"

        async def _run() -> None:
            try:
                artifacts = await asyncio.to_thread(resolve_artifacts, versions_path)
                await asyncio.to_thread(download_artifacts, artifacts, dest_dir)
                await asyncio.to_thread(write_sentinel, dest_dir)
                emit = getattr(worker, "emit_notification", None)
                if emit is not None:
                    await emit(
                        "svi2.video.install.progress",
                        {"status": "done", "count": len(artifacts)},
                    )
            except Exception as exc:
                emit = getattr(worker, "emit_notification", None)
                if emit is not None:
                    await emit(
                        "svi2.video.install.error",
                        {"message": str(exc)},
                    )

        task = asyncio.create_task(_run())
        _background_tasks.add(task)

        def _on_done(t: asyncio.Task[None]) -> None:
            _background_tasks.discard(t)
            exc = t.exception() if not t.cancelled() else None
            if exc is not None:
                logger = getattr(worker, "_logger", None)
                if logger is not None:
                    logger.error("svi2 background install task failed: %s", exc)
                else:
                    print(f"svi2 background install task failed: {exc}", file=sys.stderr)

        task.add_done_callback(_on_done)
        return {"status": "started"}

    async def install_status(params: Any) -> dict[str, Any]:
        if not isinstance(params, dict):
            raise ValueError("params must be an object")

        host_data_dir: str | None = params.get("host_data_dir") or os.environ.get(
            "NEXUS_HOST_DATA_DIR"
        )
        if not host_data_dir:
            raise ValueError("host_data_dir is required")

        dest_dir = Path(host_data_dir) / "extensions" / "nexus.video.svi2-pro" / "models"
        return {"installed": read_sentinel(dest_dir)}

    worker.register("svi2.video.install.start", install_start)
    worker.register("svi2.video.install.status", install_status)


__all__ = [
    "Artifact",
    "resolve_artifacts",
    "download_artifacts",
    "write_sentinel",
    "read_sentinel",
    "register_installer_handlers",
    "SENTINEL_NAME",
]
