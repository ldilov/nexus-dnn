"""Model install orchestration (extension-owned).

Ported from the Rust ModelInstaller that briefly lived in nexus-local-llm.
The install flow is:

  1. Resolve the HF repo's siblings + architectures via HfClient.
  2. Route to a backend via router.route_model.
  3. Refuse install if NoRoute.
  4. Download via the host HF capability (called through the host's
     /api/v1/huggingface/* surface).
  5. Extract model_limits from config.json when present.
  6. Commit to ext_local_llm_model_installs via the existing extension
     storage binding.

This module defines the shapes and the commit logic. Download and host-HF
capability calls go through whatever HTTP client the worker already uses.
"""
from __future__ import annotations

import json
from dataclasses import dataclass
from pathlib import Path
from typing import Iterable

from worker.models.router import RoutingDecision, route_model


@dataclass
class InstallRequest:
    repo_id: str
    revision: str | None
    files: list[str]
    display_name: str | None


@dataclass
class ModelLimits:
    max_context: int | None = None
    vocab_size: int | None = None
    hidden_size: int | None = None
    num_heads: int | None = None
    num_layers: int | None = None

    def to_dict(self) -> dict:
        return {
            "max_context": self.max_context,
            "vocab_size": self.vocab_size,
            "hidden_size": self.hidden_size,
            "num_heads": self.num_heads,
            "num_layers": self.num_layers,
        }


def extract_model_limits(artifact_paths: Iterable[Path]) -> ModelLimits | None:
    for p in artifact_paths:
        name = p.name.lower()
        if name != "config.json":
            continue
        try:
            data = json.loads(p.read_text(encoding="utf-8"))
        except Exception:
            continue
        return ModelLimits(
            max_context=data.get("max_position_embeddings"),
            vocab_size=data.get("vocab_size"),
            hidden_size=data.get("hidden_size"),
            num_heads=data.get("num_attention_heads"),
            num_layers=data.get("num_hidden_layers"),
        )
    return None


def plan_install(
    request: InstallRequest,
    siblings: Iterable[str],
    architectures: Iterable[str],
    trt_allowlist_path: Path | None = None,
) -> RoutingDecision:
    return route_model(siblings, architectures, trt_allowlist_path)
