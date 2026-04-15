"""Model-to-backend routing.

Ported from the Rust ModelInstaller that briefly lived in nexus-local-llm.
Routing is a domain decision and belongs to the extension, not the host
runtime pool (see spec 011 US2). Tiered signals:

  1. any `.gguf` file present        -> llama.cpp (signal: gguf)
  2. any `.engine` file or trt_llm/  -> tensorrt-llm (signal: trt-prebuilt)
  3. config.json architecture in the
     TRT-supported allowlist         -> tensorrt-llm (signal: trt-architecture)
  4. otherwise                        -> no compatible backend

The allowlist ships with the extension at
`extensions/builtin/local-llm/backends/trt-llm/supported_architectures.yaml`.
"""
from __future__ import annotations

from dataclasses import dataclass
from pathlib import Path
from typing import Iterable


DEFAULT_TRT_ALLOWLIST = (
    "LlamaForCausalLM",
    "MistralForCausalLM",
    "MixtralForCausalLM",
    "Qwen2ForCausalLM",
    "Qwen2MoeForCausalLM",
    "GPT2LMHeadModel",
    "GPTNeoXForCausalLM",
    "FalconForCausalLM",
    "BaichuanForCausalLM",
    "ChatGLMForConditionalGeneration",
    "GemmaForCausalLM",
    "Gemma2ForCausalLM",
    "Phi3ForCausalLM",
)


@dataclass(frozen=True)
class RoutingDecision:
    backend: str | None
    signal: str
    reason: str


def _has_file(files: Iterable[str], predicate) -> bool:
    return any(predicate(f) for f in files)


def _load_allowlist_from(yaml_path: Path) -> tuple[str, ...]:
    if not yaml_path.exists():
        return DEFAULT_TRT_ALLOWLIST
    try:
        import yaml
    except ImportError:
        return DEFAULT_TRT_ALLOWLIST
    try:
        data = yaml.safe_load(yaml_path.read_text(encoding="utf-8"))
        archs = data.get("architectures", []) if isinstance(data, dict) else []
        return tuple(a for a in archs if isinstance(a, str)) or DEFAULT_TRT_ALLOWLIST
    except Exception:
        return DEFAULT_TRT_ALLOWLIST


def route_model(
    siblings: Iterable[str],
    architectures: Iterable[str],
    trt_allowlist_path: Path | None = None,
) -> RoutingDecision:
    files = list(siblings)

    if _has_file(files, lambda p: p.lower().endswith(".gguf")):
        return RoutingDecision("llama.cpp", "gguf", "GGUF file present")

    if _has_file(
        files, lambda p: p.lower().endswith(".engine") or "trt_llm" in p.lower()
    ):
        return RoutingDecision(
            "tensorrt-llm", "trt-prebuilt", "prebuilt TRT engine present"
        )

    allowlist = (
        _load_allowlist_from(trt_allowlist_path)
        if trt_allowlist_path is not None
        else DEFAULT_TRT_ALLOWLIST
    )
    arch_set = set(architectures)
    if arch_set & set(allowlist):
        matched = sorted(arch_set & set(allowlist))[0]
        return RoutingDecision(
            "tensorrt-llm",
            "trt-architecture",
            f"architecture {matched} in supported allowlist",
        )

    file_sample = ", ".join(files[:3]) if files else "(no files)"
    return RoutingDecision(
        None,
        "none",
        (
            "no compatible backend; "
            f"architectures={sorted(arch_set) or 'unknown'} files~[{file_sample}]"
        ),
    )
