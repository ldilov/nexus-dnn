"""LongCat-Video native DiT instantiation + state-dict remap.

Structural-mismatch design decision: the Kijai _KJ.safetensors packs attention
weights as split q/k/v/o tensors (Comfy convention) while the upstream
LongCatVideoTransformer3DModel uses a fused qkv Linear in Attention and a fused
kv_linear + q_linear in MultiHeadCrossAttention.  Rather than re-packing tensors
at load time, we patch the upstream modules in-place after meta-device
instantiation so that block.attn exposes individual q/k/v attributes and
block.cross_attn exposes q/k/v instead of q_linear/kv_linear.  The patched
forward methods reconstruct the original computation graph; the upstream
FP8-scaled load path then copies each split tensor directly.
"""

from __future__ import annotations

import inspect
import json
import logging
import sys
import types
from dataclasses import dataclass
from pathlib import Path
from typing import Any, Iterable

logger = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Key-rename tables
# ---------------------------------------------------------------------------

KJ_TOP_LEVEL_PREFIX_RENAMES: dict[str, str] = {
    "patch_embedding": "x_embedder.proj",
    "time_embedding": "t_embedder",
    "text_embedding": "y_embedder.y_proj",
    "head": "final_layer",
}

KJ_BLOCK_INTERNAL_RENAMES: list[tuple[str, str]] = [
    # longest/most-specific first — avoids substring collisions on shorter patterns.
    (".self_attn.o.",       ".attn.proj."),
    (".self_attn.norm_q.",  ".attn.q_norm."),
    (".self_attn.norm_k.",  ".attn.k_norm."),
    (".self_attn.",         ".attn."),
    (".cross_attn.o.",      ".cross_attn.proj."),
    (".cross_attn.norm_q.", ".cross_attn.q_norm."),
    (".cross_attn.norm_k.", ".cross_attn.k_norm."),
    (".modulation.",        ".adaLN_modulation."),
    (".norm3.",             ".pre_crs_attn_norm."),
    # final_layer: Kijai packs final proj as head.head.* → after top-level
    # rename that becomes final_layer.head.* → remap to final_layer.linear.*
    (".head.",              ".linear."),
]

KJ_DROP_KEYS: frozenset[str] = frozenset({"scaled_fp8"})

# Vendor module paths relative to the vendor_dir root.
VENDOR_MODULES: tuple[str, ...] = (
    "longcat_video/__init__.py",
    "longcat_video/modules/__init__.py",
    "longcat_video/modules/longcat_video_dit.py",
    "longcat_video/modules/attention.py",
    "longcat_video/modules/blocks.py",
    "longcat_video/modules/rope_3d.py",
    "longcat_video/modules/autoencoder_kl_wan.py",
    "longcat_video/modules/scheduling_flow_match_euler_discrete.py",
)


# ---------------------------------------------------------------------------
# Exceptions
# ---------------------------------------------------------------------------


class VendorMissing(Exception):
    pass


class VendorImportError(Exception):
    pass


class BuildDitPatchFailed(Exception):
    pass


# ---------------------------------------------------------------------------
# Key rename
# ---------------------------------------------------------------------------


def rename_kj_keys(state_dict: dict) -> dict:
    out: dict[str, Any] = {}
    for raw_key, value in state_dict.items():
        if raw_key in KJ_DROP_KEYS:
            continue
        key = raw_key
        # Top-level prefix: match start-of-key + dot boundary.
        for kj_prefix, up_prefix in KJ_TOP_LEVEL_PREFIX_RENAMES.items():
            dot_prefix = kj_prefix + "."
            if key.startswith(dot_prefix):
                key = up_prefix + "." + key[len(dot_prefix):]
                break
        # Block-internal substring replacements.
        for old, new in KJ_BLOCK_INTERNAL_RENAMES:
            if old in key:
                key = key.replace(old, new)
        # Warn on un-handled patterns that indicate a missed remap case.
        if ".self_attn." in key:
            logger.warning("rename_kj_keys: unmapped self_attn key %r — dropping", key)
            continue
        out[key] = value
    return out


# ---------------------------------------------------------------------------
# Vendor verification + import
# ---------------------------------------------------------------------------


def _verify_vendor(vendor_dir: Path) -> None:
    missing = [m for m in VENDOR_MODULES if not (vendor_dir / m).exists()]
    if missing:
        raise VendorMissing(
            f"Vendor modules missing under {vendor_dir}: {missing}. "
            "Run the installer to download the LongCat-Video vendor files."
        )


def _import_dit_class(vendor_dir: Path) -> Any:
    vstr = str(vendor_dir)
    if sys.path[0] != vstr:
        sys.path.insert(0, vstr)
    try:
        from longcat_video.modules.longcat_video_dit import (  # type: ignore[import]
            LongCatVideoTransformer3DModel,
        )
        return LongCatVideoTransformer3DModel
    except ImportError as exc:
        raise VendorImportError(
            f"Cannot import LongCatVideoTransformer3DModel from {vendor_dir}. "
            f"Ensure vendor files are present and all dependencies are installed. "
            f"Original error: {exc}"
        ) from exc


# ---------------------------------------------------------------------------
# Attention patching
# ---------------------------------------------------------------------------


def _patch_attention_to_split_qkv(model: Any) -> int:
    try:
        import torch.nn as nn
    except ImportError:
        return 0

    patched = 0
    for block in model.blocks:
        attn = getattr(block, "attn", None)
        if attn is None:
            continue
        qkv = getattr(attn, "qkv", None)
        if not isinstance(qkv, nn.Linear):
            continue
        in_f = qkv.in_features
        # Kijai splits equally; upstream fuses to 3×dim.
        if qkv.out_features != 3 * in_f:
            continue
        has_bias = qkv.bias is not None
        dtype = qkv.weight.dtype
        device = qkv.weight.device

        # Replace fused qkv with three split Linears on meta device to avoid
        # materialising memory before the real weights arrive.
        attn.q = nn.Linear(in_f, in_f, bias=has_bias, device=device, dtype=dtype)
        attn.k = nn.Linear(in_f, in_f, bias=has_bias, device=device, dtype=dtype)
        attn.v = nn.Linear(in_f, in_f, bias=has_bias, device=device, dtype=dtype)
        del attn.qkv

        # Verify the original forward uses the expected qkv call pattern so
        # that our replacement is safe.
        try:
            src = inspect.getsource(type(attn).forward)
        except OSError:
            src = ""
        if "self.qkv" not in src and "qkv" not in src:
            raise BuildDitPatchFailed(
                f"block.attn.forward source does not reference qkv; "
                f"cannot safely patch split q/k/v forward. Source: {src[:200]!r}"
            )

        # Bind a replacement forward that uses the three split linears.
        # The original logic: qkv = self.qkv(x), reshape, unbind → q, k, v.
        # Our replacement is equivalent without the fused tensor.
        def _split_forward(
            self: Any,
            x: Any,
            shape: Any = None,
            num_cond_latents: Any = None,
            return_kv: bool = False,
        ) -> Any:
            import torch

            B, N, C = x.shape
            # replicate original shape→permute→unbind
            q = self.q(x).view(B, N, self.num_heads, self.head_dim).permute(0, 2, 1, 3)
            k = self.k(x).view(B, N, self.num_heads, self.head_dim).permute(0, 2, 1, 3)
            v = self.v(x).view(B, N, self.num_heads, self.head_dim).permute(0, 2, 1, 3)
            q, k = self.q_norm(q), self.k_norm(k)

            if return_kv:
                k_cache, v_cache = k.clone(), v.clone()

            q, k = self.rope_3d(q, k, shape)

            if num_cond_latents is not None and num_cond_latents > 0:
                num_cond_latents_thw = num_cond_latents * (N // shape[0])
                q_cond = q[:, :, :num_cond_latents_thw].contiguous()
                k_cond = k[:, :, :num_cond_latents_thw].contiguous()
                v_cond = v[:, :, :num_cond_latents_thw].contiguous()
                x_cond = self._process_attn(q_cond, k_cond, v_cond, shape)
                q_noise = q[:, :, num_cond_latents_thw:].contiguous()
                x_out = self._process_attn(q_noise, k, v, shape)
                x_out = torch.cat([x_cond, x_out], dim=2).contiguous()
            else:
                x_out = self._process_attn(q, k, v, shape)

            x_out = x_out.transpose(1, 2).reshape(B, N, C)
            x_out = self.proj(x_out)

            if return_kv:
                return x_out, (k_cache, v_cache)
            return x_out

        attn.forward = types.MethodType(_split_forward, attn)

        # generate_vc with use_kv_cache=True calls Attention.forward_with_kv_cache
        # which also dereferences self.qkv. Patch it to use the split linears
        # too, otherwise continuation crashes with "'Attention' object has no
        # attribute 'qkv'". Mirror the upstream body exactly (including the
        # cached-batch broadcast and rope_3d pad-and-slice trick).
        def _split_forward_with_kv_cache(
            self: Any,
            x: Any,
            shape: Any = None,
            num_cond_latents: Any = None,
            kv_cache: Any = None,
        ) -> Any:
            import torch

            B, N, C = x.shape
            q = self.q(x).view(B, N, self.num_heads, self.head_dim).permute(0, 2, 1, 3)
            k = self.k(x).view(B, N, self.num_heads, self.head_dim).permute(0, 2, 1, 3)
            v = self.v(x).view(B, N, self.num_heads, self.head_dim).permute(0, 2, 1, 3)
            q, k = self.q_norm(q), self.k_norm(k)

            T, H, W = shape
            k_cache, v_cache = kv_cache
            assert k_cache.shape[0] == v_cache.shape[0] and k_cache.shape[0] in [1, B]
            if k_cache.shape[0] == 1:
                k_cache = k_cache.repeat(B, 1, 1, 1)
                v_cache = v_cache.repeat(B, 1, 1, 1)

            if num_cond_latents is not None and num_cond_latents > 0:
                k_full = torch.cat([k_cache, k], dim=2).contiguous()
                v_full = torch.cat([v_cache, v], dim=2).contiguous()
                q_padding = torch.cat(
                    [torch.empty_like(k_cache), q], dim=2
                ).contiguous()
                q_padding, k_full = self.rope_3d(
                    q_padding, k_full, (T + num_cond_latents, H, W)
                )
                q = q_padding[:, :, -N:].contiguous()
            else:
                # Upstream omits this branch (relies on num_cond_latents>0).
                # Apply rope on current q/k and concat cache + current for KV.
                q, k = self.rope_3d(q, k, shape)
                k_full = torch.cat([k_cache, k], dim=2).contiguous()
                v_full = torch.cat([v_cache, v], dim=2).contiguous()

            x_out = self._process_attn(q, k_full, v_full, shape)
            x_out = x_out.transpose(1, 2).reshape(B, N, C)
            x_out = self.proj(x_out)
            return x_out

        attn.forward_with_kv_cache = types.MethodType(
            _split_forward_with_kv_cache, attn
        )
        patched += 1

    return patched


def _patch_cross_attention_to_split_kv(model: Any) -> int:
    try:
        import torch.nn as nn
    except ImportError:
        return 0

    patched = 0
    for block in model.blocks:
        cross = getattr(block, "cross_attn", None)
        if cross is None:
            continue
        q_linear = getattr(cross, "q_linear", None)
        kv_linear = getattr(cross, "kv_linear", None)
        if not isinstance(q_linear, nn.Linear) or not isinstance(kv_linear, nn.Linear):
            continue
        in_f = q_linear.in_features
        has_bias = q_linear.bias is not None
        dtype = q_linear.weight.dtype
        device = q_linear.weight.device

        # Rename q_linear → q.
        cross.q = cross.q_linear
        del cross.q_linear

        # Replace fused kv_linear with two split Linears.
        cross.k = nn.Linear(in_f, in_f, bias=has_bias, device=device, dtype=dtype)
        cross.v = nn.Linear(in_f, in_f, bias=has_bias, device=device, dtype=dtype)
        del cross.kv_linear

        # Patch _process_cross_attn to use self.q, self.k, self.v.
        def _split_cross_forward(
            self: Any,
            x: Any,
            cond: Any,
            kv_seqlen: Any,
            num_cond_latents: Any = None,
            shape: Any = None,
        ) -> Any:
            import torch

            if num_cond_latents is None or num_cond_latents == 0:
                return self._process_cross_attn_split(x, cond, kv_seqlen)

            B, N, C = x.shape
            num_cond_latents_thw = num_cond_latents * (N // shape[0])
            x_noise = x[:, num_cond_latents_thw:]
            output_noise = self._process_cross_attn_split(x_noise, cond, kv_seqlen)
            return torch.cat(
                [
                    torch.zeros(
                        (B, num_cond_latents_thw, C),
                        dtype=output_noise.dtype,
                        device=output_noise.device,
                    ),
                    output_noise,
                ],
                dim=1,
            ).contiguous()

        def _split_process_cross_attn(
            self: Any,
            x: Any,
            cond: Any,
            kv_seqlen: Any,
        ) -> Any:
            B, N, C = x.shape
            q = self.q(x).view(1, -1, self.num_heads, self.head_dim)
            k = self.k(cond).view(1, -1, self.num_heads, self.head_dim)
            v = self.v(cond).view(1, -1, self.num_heads, self.head_dim)
            q, k = self.q_norm(q), self.k_norm(k)

            if self.enable_flashattn3:
                import torch
                from flash_attn_interface import flash_attn_varlen_func

                x_out = flash_attn_varlen_func(
                    q=q[0],
                    k=k[0],
                    v=v[0],
                    cu_seqlens_q=torch.tensor(
                        [0] + [N] * B, device=q.device
                    ).cumsum(0).to(torch.int32),
                    cu_seqlens_k=torch.tensor(
                        [0] + kv_seqlen, device=q.device
                    ).cumsum(0).to(torch.int32),
                    max_seqlen_q=N,
                    max_seqlen_k=max(kv_seqlen),
                )[0]
            elif self.enable_flashattn2:
                import torch
                from flash_attn import flash_attn_varlen_func

                x_out = flash_attn_varlen_func(
                    q=q[0],
                    k=k[0],
                    v=v[0],
                    cu_seqlens_q=torch.tensor(
                        [0] + [N] * B, device=q.device
                    ).cumsum(0).to(torch.int32),
                    cu_seqlens_k=torch.tensor(
                        [0] + kv_seqlen, device=q.device
                    ).cumsum(0).to(torch.int32),
                    max_seqlen_q=N,
                    max_seqlen_k=max(kv_seqlen),
                )
            elif self.enable_xformers:
                import xformers.ops

                attn_bias = xformers.ops.fmha.attn_bias.BlockDiagonalMask.from_seqlens(
                    [N] * B, kv_seqlen
                )
                x_out = xformers.ops.memory_efficient_attention(q, k, v, attn_bias=attn_bias)
            else:
                raise RuntimeError("Unsupported attention operations.")

            x_out = x_out.view(B, -1, C)
            x_out = self.proj(x_out)
            return x_out

        cross._process_cross_attn_split = types.MethodType(_split_process_cross_attn, cross)
        cross.forward = types.MethodType(_split_cross_forward, cross)
        patched += 1

    return patched


# ---------------------------------------------------------------------------
# build_dit
# ---------------------------------------------------------------------------


def build_dit(config: dict, vendor_dir: Path, install_device: str = "meta") -> Any:
    _verify_vendor(vendor_dir)
    dit_cls = _import_dit_class(vendor_dir)

    try:
        import torch
        ctx = torch.device(install_device)
        with torch.device(ctx):
            try:
                model = dit_cls(**config)
            except TypeError:
                # Fallback: some diffusers versions wrap config in a config object.
                from diffusers.configuration_utils import FrozenDict  # type: ignore[import]
                cfg_obj = FrozenDict(config)
                model = dit_cls(cfg_obj)
    except ImportError:
        # torch absent: return a simple namespace for offline testing.
        model = dit_cls(**config)

    _patch_attention_to_split_qkv(model)
    _patch_cross_attention_to_split_kv(model)
    # SDPA / sage / flashattn2 monkey-patch is engaged only when no upstream
    # backend (xformers / native flashattn2 / native flashattn3 / bsa) is
    # enabled on the model itself. NEXUS_VIDEO_LONGCAT_ATTN env var picks
    # the kernel for the monkey-patch path.
    if not _any_upstream_attn_enabled(model):
        import os

        attn = os.environ.get("NEXUS_VIDEO_LONGCAT_ATTN", "auto").lower()
        # Map env-var values onto monkey-patch backends. 'auto' tries sage
        # → flashattn2 → sdpa fallback at module-load time.
        if attn == "auto":
            for candidate in ("sage", "flashattn2", "sdpa"):
                if _attn_backend_importable(candidate):
                    attn = candidate
                    break
        if attn not in ("sdpa", "sage", "flashattn2"):
            attn = "sdpa"
        _patch_attention_to_use_sdpa(model, backend=attn)
    return model


def _attn_backend_importable(name: str) -> bool:
    if name == "sdpa":
        return True
    if name == "sage":
        try:
            import sageattention  # noqa: F401
            return True
        except ImportError:
            return False
    if name == "flashattn2":
        try:
            import flash_attn  # noqa: F401
            return True
        except ImportError:
            return False
    return False


def _any_upstream_attn_enabled(model: Any) -> bool:
    for block in getattr(model, "blocks", []):
        attn = getattr(block, "attn", None)
        if attn is None:
            continue
        if (
            getattr(attn, "enable_xformers", False)
            or getattr(attn, "enable_flashattn2", False)
            or getattr(attn, "enable_flashattn3", False)
            or getattr(attn, "enable_bsa", False)
        ):
            return True
    return False


def _patch_attention_to_use_sdpa(model: Any, backend: str = "sdpa") -> int:
    # Upstream attention.py has no torch-native SDPA branch — it supports
    # bsa / flashattn3 / flashattn2 / xformers only, raising "Unsupported
    # attention operations." when none are enabled. We override the inner
    # kernels on every Attention + MultiHeadCrossAttention to dispatch
    # through F.scaled_dot_product_attention or sageattention so the
    # worker can run on any CUDA device without flash-attn-2 wheels.
    #
    # `backend` argument:
    #   "sdpa"       — torch.nn.functional.scaled_dot_product_attention
    #   "sage"       — sageattention.sageattn (int8 quantized attn)
    #   "flashattn2" — flash_attn.flash_attn_func (only patches if importable)
    import types

    try:
        import torch
        import torch.nn.functional as F
    except ImportError:
        return 0

    sage_fn = None
    flash_fn = None
    if backend == "sage":
        try:
            from sageattention import sageattn as sage_fn  # type: ignore
        except ImportError:
            logger.warning(
                "_patch_attention_to_use_sdpa: backend=sage requested but "
                "sageattention not importable; falling back to sdpa."
            )
            backend = "sdpa"
    elif backend == "flashattn2":
        try:
            from flash_attn import flash_attn_func as flash_fn  # type: ignore
        except ImportError:
            logger.warning(
                "_patch_attention_to_use_sdpa: backend=flashattn2 requested but "
                "flash_attn not importable; falling back to sdpa."
            )
            backend = "sdpa"

    def _sdpa_self(self: Any, q: Any, k: Any, v: Any, shape: Any) -> Any:
        # q/k/v shape: [B, H, S, D]. SDPA / sage / flash-attn-2 accept variants.
        scale = getattr(self, "scale", None)
        if backend == "sage" and sage_fn is not None:
            # sageattn expects [B, H, S, D] (HND layout) like SDPA. Returns
            # same shape. softmax_scale not exposed in v1; v2 accepts
            # `sm_scale=` kwarg. Try with kwarg + fall back without.
            try:
                return sage_fn(q, k, v, sm_scale=scale)
            except TypeError:
                return sage_fn(q, k, v)
        if backend == "flashattn2" and flash_fn is not None:
            # flash_attn expects [B, S, H, D].
            from einops import rearrange  # noqa: F401  ensured by upstream deps
            q2 = q.transpose(1, 2).contiguous()
            k2 = k.transpose(1, 2).contiguous()
            v2 = v.transpose(1, 2).contiguous()
            out = flash_fn(q2, k2, v2, dropout_p=0.0, softmax_scale=scale)
            return out.transpose(1, 2)
        return F.scaled_dot_product_attention(q, k, v, scale=scale)

    def _sdpa_cross(self: Any, x: Any, cond: Any, kv_seqlen: Any) -> Any:
        # Cross-attn split-KV path. x: [B, N_q, C], cond: [1, sum(kv_seqlen), C].
        # Mirrors upstream view layout (B-flattened single sequence) when
        # all kv_seqlen entries are equal (B=1 always satisfies). For B>1
        # with ragged kv lengths SDPA cannot model the block-diagonal mask
        # without padding; we pad cond to max(kv_seqlen) and apply a
        # boolean mask. Single-batch path is the common smoke / inference
        # case.
        B, N_q, C = x.shape
        H, D = self.num_heads, self.head_dim
        max_kv = max(kv_seqlen)

        if B == 1 and len(kv_seqlen) == 1:
            q = self.q(x).view(1, N_q, H, D).permute(0, 2, 1, 3)
            k = self.k(cond).view(1, kv_seqlen[0], H, D).permute(0, 2, 1, 3)
            v = self.v(cond).view(1, kv_seqlen[0], H, D).permute(0, 2, 1, 3)
            q, k = self.q_norm(q), self.k_norm(k)
            x_out = F.scaled_dot_product_attention(q, k, v)
            x_out = x_out.permute(0, 2, 1, 3).reshape(1, N_q, C)
            return self.proj(x_out)

        # Multi-batch / ragged path: pad cond to [B, max_kv, C] then mask.
        device = x.device
        cond_padded = torch.zeros((B, max_kv, C), dtype=cond.dtype, device=device)
        cond_flat = cond.view(-1, C)
        offsets = torch.tensor([0] + list(kv_seqlen[:-1]), device="cpu").cumsum(0)
        for b in range(B):
            start = int(offsets[b].item())
            end = start + int(kv_seqlen[b])
            cond_padded[b, : kv_seqlen[b]] = cond_flat[start:end]

        q = self.q(x).view(B, N_q, H, D).permute(0, 2, 1, 3)
        k = self.k(cond_padded).view(B, max_kv, H, D).permute(0, 2, 1, 3)
        v = self.v(cond_padded).view(B, max_kv, H, D).permute(0, 2, 1, 3)
        q, k = self.q_norm(q), self.k_norm(k)

        attn_mask = torch.zeros((B, max_kv), dtype=torch.bool, device=device)
        for b in range(B):
            attn_mask[b, : kv_seqlen[b]] = True
        attn_mask = attn_mask.view(B, 1, 1, max_kv)

        x_out = F.scaled_dot_product_attention(q, k, v, attn_mask=attn_mask)
        x_out = x_out.permute(0, 2, 1, 3).reshape(B, N_q, C)
        return self.proj(x_out)

    patched = 0
    for block in model.blocks:
        attn = getattr(block, "attn", None)
        if attn is not None and hasattr(attn, "_process_attn"):
            attn._process_attn = types.MethodType(_sdpa_self, attn)
            patched += 1
        cross = getattr(block, "cross_attn", None)
        if cross is not None and hasattr(cross, "_process_cross_attn_split"):
            cross._process_cross_attn_split = types.MethodType(_sdpa_cross, cross)
            patched += 1
    return patched


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _meta_param_names(model: Any) -> list[str]:
    names: list[str] = []
    for name, param in model.named_parameters():
        if param.device.type == "meta":
            names.append(name)
    for name, buf in model.named_buffers():
        if buf.device.type == "meta":
            names.append(name)
    return sorted(names)


def _rebind_preprocessor_modules(model: Any) -> None:
    # LongCat-Video has no separate preprocessor wrapper module around the DiT
    # (unlike LTX-2 which has a patchify/unpatchify split); PatchEmbed3D is a
    # plain sub-module of the transformer. Nothing to rebind.
    return None


def read_embedded_config(path: Path) -> dict:
    config_path = path.parent / "dit" / "config.json"
    return json.loads(config_path.read_text(encoding="utf-8"))


# ---------------------------------------------------------------------------
# Legacy alias kept for longcat_safetensors_loader import compatibility
# ---------------------------------------------------------------------------

rename_comfy_keys = rename_kj_keys
