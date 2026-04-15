"""Hyperparameter validation.

Ported from the Rust install_models::validate_profile_against_limits. Rules:

  temperature        in (0, 2]
  top_p              in (0, 1]
  top_k              > 0
  repetition_penalty in (0, 5]
  max_context_length <= model_limits.max_context (when both present)
  n_gpu_layers       <= model_limits.num_layers (when both present)

Raises HyperparametersOutOfRange with field name + diagnostic on first
violation. Returns None on success.
"""
from __future__ import annotations

from dataclasses import dataclass


@dataclass
class HyperparametersOutOfRange(Exception):
    field: str
    message: str

    def __str__(self) -> str:
        return f"{self.field}: {self.message}"


def _check_bound(field, value, *, min_exclusive=None, max_inclusive=None):
    if value is None:
        return
    if min_exclusive is not None and value <= min_exclusive:
        raise HyperparametersOutOfRange(field, f"{value} must be > {min_exclusive}")
    if max_inclusive is not None and value > max_inclusive:
        raise HyperparametersOutOfRange(field, f"{value} exceeds max {max_inclusive}")


def validate(profile: dict, limits: dict | None) -> None:
    common = profile.get("common") or {}
    _check_bound("common.temperature", common.get("temperature"), min_exclusive=0, max_inclusive=2.0)
    _check_bound("common.top_p", common.get("top_p"), min_exclusive=0, max_inclusive=1.0)
    _check_bound("common.top_k", common.get("top_k"), min_exclusive=0)
    _check_bound(
        "common.repetition_penalty",
        common.get("repetition_penalty"),
        min_exclusive=0,
        max_inclusive=5.0,
    )

    if limits is not None:
        max_ctx_limit = limits.get("max_context")
        requested_ctx = common.get("max_context_length")
        if (
            max_ctx_limit is not None
            and requested_ctx is not None
            and requested_ctx > max_ctx_limit
        ):
            raise HyperparametersOutOfRange(
                "common.max_context_length",
                f"{requested_ctx} exceeds model max_context {max_ctx_limit}",
            )

        num_layers_limit = limits.get("num_layers")
        llamacpp = profile.get("llamacpp") or {}
        n_gpu_layers = llamacpp.get("n_gpu_layers")
        if (
            num_layers_limit is not None
            and n_gpu_layers is not None
            and n_gpu_layers > num_layers_limit
        ):
            raise HyperparametersOutOfRange(
                "llamacpp.n_gpu_layers",
                f"{n_gpu_layers} exceeds model layer count {num_layers_limit}",
            )
