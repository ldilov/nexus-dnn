"""Deterministic chain digest matching the Rust ``ChainDigest::of`` form (R5).

The canonical form is compact JSON via ``json.dumps(..., separators=(",",":"))``,
which mirrors ``serde_json::to_string`` for the same struct. The hex SHA-256
of the canonical bytes is the digest.

Cross-language contract assumes the chain dict was deserialized from the same
JSON the Rust caller serialized — Python preserves insertion order on dicts
since 3.7, so a JSON payload that arrived over the wire will round-trip with
identical key order on both sides. Callers MUST NOT construct chain dicts in
Python directly with a different key order; the digest would diverge from
Rust silently.
"""

from __future__ import annotations

import hashlib
import json
from typing import Any


def compute_digest(chain: dict[str, Any]) -> str:
    canonical = json.dumps(chain, separators=(",", ":"), sort_keys=False)
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()
