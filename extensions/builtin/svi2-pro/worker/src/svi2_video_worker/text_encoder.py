from __future__ import annotations

from pathlib import Path
from typing import Any


class TextEncoderWrapper:
    def __init__(
        self,
        weights_path: str | Path,
        tokenizer_path: str | Path | None = None,
        device: str = "cpu",
    ) -> None:
        self.weights_path = Path(weights_path)
        self.tokenizer_path = Path(tokenizer_path) if tokenizer_path is not None else None
        self.device = device
        self._model: Any = None
        self._tokenizer: Any = None

    def _ensure_loaded(self) -> None:
        if self._model is not None:
            return
        import torch
        from .wan22.text_encoder_model import WanTextEncoder, HuggingfaceTokenizer

        encoder = WanTextEncoder()
        if self.weights_path.exists():
            from safetensors.torch import load_file
            state = load_file(str(self.weights_path))
            encoder.load_state_dict(state, strict=False)
        encoder.requires_grad_(False)
        encoder = encoder.to(device=torch.device(self.device), dtype=torch.bfloat16)
        encoder.eval()
        self._model = encoder

        if self.tokenizer_path is not None and Path(self.tokenizer_path).exists():
            self._tokenizer = HuggingfaceTokenizer(
                name=str(self.tokenizer_path),
                seq_len=512,
                clean="whitespace",
            )

    def encode_text(self, prompt: str) -> Any:
        import torch
        self._ensure_loaded()
        if self._tokenizer is None:
            raise RuntimeError(
                "TextEncoderWrapper.encode_text requires tokenizer_path to be set to a "
                "valid umt5-xxl tokenizer directory. See versions.yaml for the artifact."
            )
        ids, mask = self._tokenizer(prompt, return_mask=True, add_special_tokens=True)
        ids = ids.to(torch.device(self.device))
        mask = mask.to(torch.device(self.device))
        with torch.no_grad():
            context = self._model(ids, mask)
        seq_lens = mask.gt(0).sum(dim=1).long()
        for i, v in enumerate(seq_lens):
            context[:, v:] = 0
        return context

    def to_cpu(self) -> "TextEncoderWrapper":
        self.device = "cpu"
        if self._model is not None:
            import torch
            self._model = self._model.to(torch.device("cpu"))
        return self

    def to_cuda(self) -> "TextEncoderWrapper":
        self.device = "cuda"
        if self._model is not None:
            import torch
            self._model = self._model.to(torch.device("cuda"))
        return self
