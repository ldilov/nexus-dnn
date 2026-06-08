from __future__ import annotations

import json
from functools import lru_cache
from pathlib import Path
from typing import Any

_PRESETS_RELATIVE = Path("data") / "render_presets.json"


def _extension_root() -> Path:
    return Path(__file__).resolve().parents[3]


def presets_path() -> Path:
    return _extension_root() / _PRESETS_RELATIVE


@lru_cache(maxsize=1)
def load_presets() -> dict[str, Any]:
    return json.loads(presets_path().read_text(encoding="utf-8"))


def register_preset_handlers(worker: Any) -> None:
    async def presets_list(_params: Any) -> dict[str, Any]:
        return load_presets()

    worker.register("svi2.presets.list", presets_list)


__all__ = ["load_presets", "presets_path", "register_preset_handlers"]
