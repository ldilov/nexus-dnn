"""Cooperative-cancel primitive shared by both backends (torch-free).

The sampler loops check `cancel_event.is_set()` between steps and raise
GenerationCancelled, which the start handler maps to the CANCELLED (-32103)
JSON-RPC error code.
"""
from __future__ import annotations


class GenerationCancelled(Exception):
    """Raised cooperatively inside the sparse/shape sampler loops on cancel."""
