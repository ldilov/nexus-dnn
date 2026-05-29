from __future__ import annotations

from pathlib import Path
from typing import Any


class VaeWrapper:
    def __init__(self, weights_path: str | Path, device: str = "cpu") -> None:
        self.weights_path = Path(weights_path)
        self.device = device
        self._model: Any = None

    def _ensure_loaded(self) -> None:
        if self._model is not None:
            return
        import torch
        from .wan22.vae_model import WanVideoVAE
        vae = WanVideoVAE(z_dim=16)
        if self.weights_path.exists():
            from safetensors.torch import load_file
            state = load_file(str(self.weights_path))
            prefixed = {"model." + k: v for k, v in state.items()}
            vae.load_state_dict(prefixed, strict=False)
        self._model = vae.to(device=torch.device(self.device), dtype=torch.bfloat16)

    def _model_dtype(self) -> Any:
        return next(self._model.parameters()).dtype

    def encode_image(self, image: Any) -> Any:
        import torch
        self._ensure_loaded()
        if isinstance(image, list):
            frames = image
        else:
            frames = [image]
        tensors = []
        for f in frames:
            if hasattr(f, "convert"):
                import numpy as np
                arr = np.array(f.convert("RGB")).astype("float32") / 127.5 - 1.0
                t = torch.from_numpy(arr).permute(2, 0, 1)
            else:
                t = f
            tensors.append(t)
        video = torch.stack(tensors, dim=1).to(device=self.device, dtype=self._model_dtype())
        return self._model.encode([video], device=self.device)

    def decode_latents(self, latent: Any) -> Any:
        import torch
        self._ensure_loaded()
        latent = latent.to(device=self.device, dtype=self._model_dtype())
        if latent.dim() == 4:
            latent = latent.unsqueeze(0)
        videos = self._model.decode(latent, device=self.device)
        frames = []
        for t in range(videos.shape[2]):
            frame = videos[0, :, t]
            frame = ((frame.clamp(-1, 1) + 1.0) * 127.5).byte()
            frame = frame.permute(1, 2, 0)
            frames.append(frame)
        return frames

    def to_cpu(self) -> "VaeWrapper":
        self.device = "cpu"
        if self._model is not None:
            import torch
            self._model = self._model.to(torch.device("cpu"))
        return self

    def to_cuda(self) -> "VaeWrapper":
        self.device = "cuda"
        if self._model is not None:
            import torch
            self._model = self._model.to(torch.device("cuda"))
        return self
