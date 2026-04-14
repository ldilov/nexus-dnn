"""Configuration for the llama.cpp inference server."""
from __future__ import annotations

from dataclasses import dataclass, field


@dataclass(frozen=True)
class LlamaCppConfig:
    """Server launch parameters for llama-server."""

    host: str = "127.0.0.1"
    port: int = 8080
    n_gpu_layers: int = -1
    ctx_size: int = 4096
    n_parallel: int = 1
    n_batch: int = 512
    flash_attention: bool = True
    mlock: bool = False
    extra_args: tuple[str, ...] = ()

    def to_cli_args(self, model_path: str, server_binary: str) -> list[str]:
        """Build the full command-line argument list."""
        args = [
            server_binary,
            "--model", model_path,
            "--host", self.host,
            "--port", str(self.port),
            "--n-gpu-layers", str(self.n_gpu_layers),
            "--ctx-size", str(self.ctx_size),
            "--parallel", str(self.n_parallel),
            "--batch-size", str(self.n_batch),
        ]
        if self.flash_attention:
            args.append("--flash-attn")
        if self.mlock:
            args.append("--mlock")
        args.extend(self.extra_args)
        return args

    @property
    def base_url(self) -> str:
        """HTTP base URL for the running server."""
        return f"http://{self.host}:{self.port}"

    @property
    def health_url(self) -> str:
        """Health check endpoint."""
        return f"{self.base_url}/health"

    @staticmethod
    def from_dict(raw: dict) -> LlamaCppConfig:
        """Construct from an untyped config dict, applying defaults for missing keys."""
        return LlamaCppConfig(
            host=raw.get("host", "127.0.0.1"),
            port=raw.get("port", 8080),
            n_gpu_layers=raw.get("n_gpu_layers", -1),
            ctx_size=raw.get("ctx_size", 4096),
            n_parallel=raw.get("n_parallel", 1),
            n_batch=raw.get("n_batch", 512),
            flash_attention=raw.get("flash_attention", True),
            mlock=raw.get("mlock", False),
            extra_args=tuple(raw.get("extra_args", ())),
        )
