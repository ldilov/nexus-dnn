from __future__ import annotations

import hashlib
import json
from typing import Any


def compute_digest(chain: dict[str, Any]) -> str:
    """SHA-256 hex of the chain's canonical JSON (alphabetical keys, compact)."""

    canonical = json.dumps(chain, separators=(",", ":"), sort_keys=True)
    return hashlib.sha256(canonical.encode("utf-8")).hexdigest()
