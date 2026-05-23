from __future__ import annotations

from pathlib import Path
from typing import Any


def synth_fp8_safetensors(
    tmp_path: Path,
    num_layers: int = 2,
    hidden: int = 64,
    include_comfy_prefixed_dup: bool = True,
) -> Path:
    """Write a minimal FP8-quantized DiT-shaped safetensors fixture.

    State-dict contents:
      For i in range(num_layers):
        blocks.{i}.attn.to_q.weight        float8_e4m3fn (hidden, hidden)
        blocks.{i}.attn.to_q.weight_scale  bfloat16 ()
        blocks.{i}.attn.to_q.input_scale   bfloat16 ()
        blocks.{i}.attn.to_kv.weight       float8_e4m3fn (hidden*2, hidden)
        blocks.{i}.attn.to_kv.weight_scale bfloat16 ()
        blocks.{i}.ff.net.0.proj.weight    float8_e4m3fn (hidden*4, hidden)
        blocks.{i}.ff.net.0.proj.weight_scale bfloat16 ()
        blocks.{i}.norm1.weight            bfloat16 (hidden,)
        blocks.{i}.norm1.bias              bfloat16 (hidden,)
      patchify_proj.weight                 float8_e4m3fn (hidden, hidden)
      patchify_proj.weight_scale           bfloat16 ()
      conv3d_in.weight                     bfloat16 (hidden, 1, 3, 3, 3)
      [optional duplicate w/ "model.diffusion_model." prefix on blocks.0.attn.to_q.weight]
    """
    import torch
    from safetensors.torch import save_file

    def _fp8(shape: tuple[int, ...]) -> Any:
        raw = torch.randn(shape, dtype=torch.bfloat16)
        return raw.clamp(-448.0, 448.0).to(torch.float8_e4m3fn)

    def _scale(value: float = 1.0) -> Any:
        return torch.tensor(value, dtype=torch.bfloat16).reshape(())

    def _bf16(shape: tuple[int, ...]) -> Any:
        return torch.randn(shape, dtype=torch.bfloat16)

    tensors: dict[str, Any] = {}

    for i in range(num_layers):
        prefix = f"blocks.{i}"
        tensors[f"{prefix}.attn.to_q.weight"] = _fp8((hidden, hidden))
        tensors[f"{prefix}.attn.to_q.weight_scale"] = _scale()
        tensors[f"{prefix}.attn.to_q.input_scale"] = _scale()
        tensors[f"{prefix}.attn.to_kv.weight"] = _fp8((hidden * 2, hidden))
        tensors[f"{prefix}.attn.to_kv.weight_scale"] = _scale()
        tensors[f"{prefix}.ff.net.0.proj.weight"] = _fp8((hidden * 4, hidden))
        tensors[f"{prefix}.ff.net.0.proj.weight_scale"] = _scale()
        tensors[f"{prefix}.norm1.weight"] = _bf16((hidden,))
        tensors[f"{prefix}.norm1.bias"] = _bf16((hidden,))

    tensors["patchify_proj.weight"] = _fp8((hidden, hidden))
    tensors["patchify_proj.weight_scale"] = _scale()
    tensors["conv3d_in.weight"] = _bf16((hidden, 1, 3, 3, 3))

    if include_comfy_prefixed_dup:
        tensors["model.diffusion_model.blocks.0.attn.to_q.weight"] = _fp8(
            (hidden, hidden)
        )

    out_path = tmp_path / "synth_fp8.safetensors"
    save_file(tensors, str(out_path))
    return out_path
