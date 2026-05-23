"""LongCat-Video native DiT instantiation + state-dict remap (stub).

Vendor target (5 files from meituan-longcat/LongCat-Video, MIT):

    longcat_video/modules/longcat_video_dit.py        # transformer
    longcat_video/modules/autoencoder_kl_wan.py       # Wan 2.1 VAE
    longcat_video/modules/attention.py
    longcat_video/modules/blocks.py
    longcat_video/modules/rope_3d.py
    longcat_video/modules/scheduling_flow_match_euler_discrete.py

These live under `worker/vendor/longcat/` once ported. The vendor
copy is licensed MIT (upstream) — preserve the LICENSE header.

State-dict remap (Kijai `_KJ.safetensors` -> upstream attr names):

    The Kijai repack renames the DiT keys to Comfy diffusion_models
    convention. The upstream `LongCatVideoTransformer3DModel`
    expects the meituan-original key naming. The remap mirrors the
    ltx23 worker's `rename_comfy_keys`. Concrete suffix mapping is
    deferred until the vendored module lands and we can diff the
    two key sets directly.
"""

from __future__ import annotations

from pathlib import Path
from typing import Any


def build_dit(config: dict) -> object:
    """Instantiate `LongCatVideoTransformer3DModel` on the meta device.

    Args:
        config: DiT config dict (matches
            ``meituan-longcat/LongCat-Video/dit/config.json``):
            ``depth=48``, ``hidden=4096``, ``heads=32``,
            ``ffn=16384``, ``in_channels=out_channels=16``,
            ``patch=[1,2,2]``.

    Returns:
        Meta-device DiT module ready for state-dict load.
    """

    del config
    raise NotImplementedError(
        "build_dit stub; vendor longcat_video_dit.py from "
        "https://github.com/meituan-longcat/LongCat-Video "
        "(MIT) into worker/vendor/longcat/ then port."
    )


def rename_kj_keys(kj_state_dict_keys: list[str]) -> dict[str, str]:
    """Map Kijai `_KJ.safetensors` keys to upstream DiT attr names.

    Args:
        kj_state_dict_keys: Raw keys read from the FP8 _KJ file.

    Returns:
        ``{kj_key: upstream_key}``. Empty mapping for keys that
        already match (scale_weight, biases, etc.).
    """

    del kj_state_dict_keys
    raise NotImplementedError("rename_kj_keys stub; awaits vendored DiT.")


def _meta_param_names(model: Any) -> list[str]:
    """Return names of params/buffers still on the meta device.

    Used by the FP8 loader to verify a complete state-dict install.
    Port pending: awaits vendored DiT module so the model API is known.
    """
    raise NotImplementedError(
        "_meta_param_names stub; port pending — awaits vendored "
        "LongCatVideoTransformer3DModel."
    )


def _rebind_preprocessor_modules(model: Any) -> None:
    """Re-wire any preprocessor sub-modules after state-dict install.

    LTX-2 needs this for its patchify/unpatchify layers; longcat may
    or may not require an equivalent step.  Implement once the vendored
    DiT module is available and the sub-module graph is known.
    Port pending.
    """
    raise NotImplementedError(
        "_rebind_preprocessor_modules stub; port pending — awaits "
        "vendored LongCatVideoTransformer3DModel."
    )


def read_embedded_config(path: Path) -> dict[str, Any]:
    """Read a DiT config blob embedded in a companion GGUF sidecar.

    LTX-2 embeds its transformer config in a Kijai GGUF when the
    safetensors file lacks a ``__metadata__.config`` key.  Whether
    longcat uses the same convention is TBD once the checkpoint format
    is confirmed.
    Port pending.
    """
    raise NotImplementedError(
        f"read_embedded_config stub; cannot read config from {path}. "
        "Port pending — awaits confirmed longcat checkpoint format."
    )


def rename_comfy_keys(state_dict: dict[str, Any]) -> dict[str, Any]:
    """Remap Comfy/Kijai state-dict keys to the upstream DiT naming.

    For LTX-2 this performs the ``diffusion_model.`` prefix strip and
    several suffix renames.  For longcat the exact mapping is deferred
    until the vendored DiT module is available and a real key-diff can
    be produced.
    Port pending — returns the dict unchanged so callers can still load
    matched keys without a crash.
    """
    raise NotImplementedError(
        "rename_comfy_keys stub; port pending — awaits vendored DiT "
        "and a concrete diff of Kijai vs upstream key names."
    )
