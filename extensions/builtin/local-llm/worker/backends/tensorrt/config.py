"""Configuration for the TensorRT-LLM inference server."""
from __future__ import annotations

from dataclasses import dataclass


@dataclass(frozen=True)
class TensorRtConfig:
    """Launch parameters for trtllm-serve."""

    host: str = "127.0.0.1"
    port: int = 8081
    max_batch_size: int = 8
    max_input_len: int = 2048
    max_output_len: int = 2048
    tp_size: int = 1
    pp_size: int = 1
    extra_args: tuple[str, ...] = ()

    def to_cli_args(self, model_path: str) -> list[str]:
        """Build the command-line argument list for trtllm-serve."""
        args = [
            "trtllm-serve",
            model_path,
            "--host", self.host,
            "--port", str(self.port),
            "--max_batch_size", str(self.max_batch_size),
            "--max_input_len", str(self.max_input_len),
            "--max_output_len", str(self.max_output_len),
            "--tp_size", str(self.tp_size),
            "--pp_size", str(self.pp_size),
        ]
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
    def from_dict(raw: dict) -> TensorRtConfig:
        """Construct from an untyped config dict."""
        return TensorRtConfig(
            host=raw.get("host", "127.0.0.1"),
            port=raw.get("port", 8081),
            max_batch_size=raw.get("max_batch_size", 8),
            max_input_len=raw.get("max_input_len", 2048),
            max_output_len=raw.get("max_output_len", 2048),
            tp_size=raw.get("tp_size", 1),
            pp_size=raw.get("pp_size", 1),
            extra_args=tuple(raw.get("extra_args", ())),
        )
