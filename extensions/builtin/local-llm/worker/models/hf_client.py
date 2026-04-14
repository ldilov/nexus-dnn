"""HuggingFace Hub client for model search, inspection, and download."""
from __future__ import annotations

from dataclasses import dataclass
from typing import Any

from worker.models.compatibility import compute_hints, parse_quantization


@dataclass(frozen=True)
class ModelSearchResult:
    """A single model search hit from HuggingFace Hub."""

    repo_id: str
    display_name: str
    summary: str
    downloads: int
    likes: int
    compatibility_hints: tuple[str, ...]


@dataclass(frozen=True)
class RepoFileInfo:
    """Metadata for one file within a HuggingFace repo."""

    filename: str
    size_bytes: int
    is_gguf: bool
    quantization_hint: str | None


class HfClient:
    """Encapsulates all HuggingFace Hub operations.

    Lazily imports huggingface_hub so the worker can still boot
    without the package installed (useful for unit testing).
    """

    def search(self, query: str, limit: int = 20) -> list[ModelSearchResult]:
        """Search Hub models, sorted by download count."""
        from huggingface_hub import HfApi

        api = HfApi()
        models = api.list_models(
            search=query,
            sort="downloads",
            direction=-1,
            limit=limit,
        )

        results: list[ModelSearchResult] = []
        for model in models:
            hints = compute_hints(model)
            name = model.id
            display = name.split("/")[-1] if "/" in name else name
            results.append(ModelSearchResult(
                repo_id=name,
                display_name=display,
                summary=getattr(model, "pipeline_tag", "") or "",
                downloads=getattr(model, "downloads", 0) or 0,
                likes=getattr(model, "likes", 0) or 0,
                compatibility_hints=tuple(hints),
            ))
        return results

    def inspect_files(self, repo_id: str) -> list[RepoFileInfo]:
        """List files in a repo with GGUF detection and quantization parsing."""
        from huggingface_hub import HfApi

        api = HfApi()
        siblings = api.model_info(repo_id).siblings or []

        files: list[RepoFileInfo] = []
        for sibling in siblings:
            filename = sibling.rfilename
            size = getattr(sibling, "size", None) or 0
            is_gguf = filename.lower().endswith(".gguf")
            quant_hint = parse_quantization(filename) if is_gguf else None

            files.append(RepoFileInfo(
                filename=filename,
                size_bytes=size,
                is_gguf=is_gguf,
                quantization_hint=quant_hint,
            ))

        return sorted(files, key=lambda f: (not f.is_gguf, f.filename))

    def download_file(
        self,
        repo_id: str,
        filename: str,
        cache_dir: str | None = None,
    ) -> str:
        """Download a single file from a repo, returning the local path."""
        from huggingface_hub import hf_hub_download

        return hf_hub_download(
            repo_id=repo_id,
            filename=filename,
            cache_dir=cache_dir,
        )

    def download_snapshot(
        self,
        repo_id: str,
        allow_patterns: list[str] | None = None,
        cache_dir: str | None = None,
    ) -> str:
        """Download a filtered snapshot of a repo, returning the local directory."""
        from huggingface_hub import snapshot_download

        return snapshot_download(
            repo_id=repo_id,
            allow_patterns=allow_patterns,
            cache_dir=cache_dir,
        )
