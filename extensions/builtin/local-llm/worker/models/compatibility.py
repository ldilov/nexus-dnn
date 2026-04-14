"""Backend-aware compatibility hints and quantization detection."""
from __future__ import annotations

import re
from typing import Any


QUANTIZATION_PATTERNS: tuple[tuple[str, ...], ...] = (
    (r"[_-](q\d+_k_[sml])",),
    (r"[_-](q\d+_k)",),
    (r"[_-](q\d+_\d+)",),
    (r"[_-](q\d+)",),
    (r"[_-](f16)",),
    (r"[_-](f32)",),
    (r"[_-](bf16)",),
    (r"[_-](iq\d+_[a-z]+)",),
)

QUANT_QUALITY_ORDER: dict[str, int] = {
    "Q4_K_S": 10,
    "Q4_K_M": 20,
    "Q5_K_S": 30,
    "Q5_K_M": 40,
    "Q6_K": 50,
    "Q8_0": 60,
    "F16": 70,
    "F32": 80,
}


def parse_quantization(filename: str) -> str | None:
    """Extract a quantization label (e.g. Q4_K_M) from a GGUF filename."""
    lower = filename.lower()
    for pattern_group in QUANTIZATION_PATTERNS:
        for pattern in pattern_group:
            match = re.search(pattern, lower)
            if match:
                return match.group(1).upper()
    return None


def compute_hints(model: Any) -> list[str]:
    """Derive compatibility hints from a HuggingFace model info object."""
    hints: list[str] = []
    tags = getattr(model, "tags", []) or []
    model_id = getattr(model, "id", "") or ""

    if "gguf" in tags or "gguf" in model_id.lower():
        hints.append("gguf-compatible")
        hints.append("single-file install")

    if any(t in tags for t in ("transformers", "pytorch", "safetensors")):
        hints.append("hf-checkpoint candidate")

    return hints


def recommend_file(
    files: list[dict[str, Any]],
    backend: str,
    prefer_quality: str = "balanced",
) -> dict[str, Any] | None:
    """Pick the best model file for a given backend from a file listing.

    For llama.cpp, prefer GGUF files; rank by quantization quality.
    For tensorrt, prefer safetensors checkpoints.
    """
    if backend == "llama.cpp":
        gguf_files = [f for f in files if f.get("is_gguf", False)]
        if not gguf_files:
            return None

        def gguf_sort_key(f: dict[str, Any]) -> int:
            quant = f.get("quantization_hint", "")
            quality = QUANT_QUALITY_ORDER.get(quant, 0)
            if prefer_quality == "small":
                return quality
            if prefer_quality == "large":
                return -quality
            return abs(quality - 40)

        return sorted(gguf_files, key=gguf_sort_key)[0]

    if backend == "tensorrt-llm":
        safetensor = [
            f for f in files
            if f.get("filename", "").endswith(".safetensors")
        ]
        if safetensor:
            return safetensor[0]
        return files[0] if files else None

    return files[0] if files else None
