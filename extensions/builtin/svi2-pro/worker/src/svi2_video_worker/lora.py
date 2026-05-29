import re
from pathlib import Path
from typing import Optional

import torch

_LORA_SUFFIX = re.compile(
    r"\.(?P<half>lora_down|lora_up|lora_A|lora_B)(?:\.weight)?$"
)
_ALPHA_SUFFIX = re.compile(r"\.alpha$")
_DM_PREFIX = "diffusion_model."

_HALF_MAP = {
    "lora_down": "down",
    "lora_A": "down",
    "lora_up": "up",
    "lora_B": "up",
}


def parse_lora_key(key: str) -> Optional[tuple[str, str]]:
    stripped = key.removeprefix(_DM_PREFIX)
    m = _LORA_SUFFIX.search(stripped)
    if m is None:
        return None
    module_path = stripped[: m.start()]
    direction = _HALF_MAP[m.group("half")]
    return (module_path, direction)


def apply_additive_lora(
    base_out: torch.Tensor,
    x: torch.Tensor,
    A: torch.Tensor,
    B: torch.Tensor,
    alpha: float = 1.0,
) -> torch.Tensor:
    A_f = A.to(x.dtype)
    B_f = B.to(x.dtype)
    lora_delta = (x @ A_f.t()) @ B_f.t()
    return base_out + alpha * lora_delta


def load_lora_pairs(path: str | Path) -> dict[str, tuple[torch.Tensor, torch.Tensor, float]]:
    from safetensors.torch import load_file

    tensors = load_file(str(path), device="cpu")

    downs: dict[str, torch.Tensor] = {}
    ups: dict[str, torch.Tensor] = {}
    alphas: dict[str, float] = {}

    for key, tensor in tensors.items():
        stripped = key.removeprefix(_DM_PREFIX)
        if _ALPHA_SUFFIX.search(stripped):
            module_path = _ALPHA_SUFFIX.sub("", stripped)
            alphas[module_path] = tensor.item()
            continue
        parsed = parse_lora_key(key)
        if parsed is None:
            continue
        module_path, direction = parsed
        if direction == "down":
            downs[module_path] = tensor
        else:
            ups[module_path] = tensor

    result: dict[str, tuple[torch.Tensor, torch.Tensor, float]] = {}
    for module_path, A in downs.items():
        if module_path not in ups:
            continue
        B = ups[module_path]
        rank = A.shape[0]
        raw_alpha = alphas.get(module_path)
        scale = (raw_alpha / rank) if raw_alpha is not None else 1.0
        result[module_path] = (A, B, scale)
    return result
