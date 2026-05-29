import re
from pathlib import Path
from typing import Optional

import torch

_LORA_SUFFIX = re.compile(
    r"\.(?P<half>lora_down|lora_up|lora_A|lora_B)(?:\.[A-Za-z0-9_-]+)?(?:\.weight)?$"
)
_ALPHA_SUFFIX = re.compile(r"(?:\.[A-Za-z0-9_-]+)?\.alpha$")
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
    scale: float = 1.0,
) -> torch.Tensor:
    A_f = A.to(x.dtype)
    B_f = B.to(x.dtype)
    lora_delta = (x @ A_f.t()) @ B_f.t()
    return base_out + scale * lora_delta


class AdditiveLoraLinear(torch.nn.Module):
    def __init__(
        self,
        base: torch.nn.Module,
        A: torch.Tensor,
        B: torch.Tensor,
        scale: float,
    ) -> None:
        super().__init__()
        self.base = base
        self.register_buffer("lora_A", A)
        self.register_buffer("lora_B", B)
        self.scale = float(scale)

    def forward(self, x: torch.Tensor) -> torch.Tensor:
        base_out = self.base(x)
        return apply_additive_lora(base_out, x, self.lora_A, self.lora_B, self.scale)


def wrap_module_with_lora(
    module: torch.nn.Module,
    lora_pairs: dict[str, tuple[torch.Tensor, torch.Tensor, float]],
) -> dict[str, object]:
    wrapped: list[str] = []
    missing: list[str] = []
    for module_path, (A, B, scale) in lora_pairs.items():
        parent_path, _, child = module_path.rpartition(".")
        try:
            parent = module.get_submodule(parent_path) if parent_path else module
        except AttributeError:
            missing.append(module_path)
            continue
        if not hasattr(parent, child):
            missing.append(module_path)
            continue
        base = getattr(parent, child)
        setattr(parent, child, AdditiveLoraLinear(base, A, B, scale))
        wrapped.append(module_path)
    return {"wrapped_count": len(wrapped), "missing_count": len(missing), "missing": missing}


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
