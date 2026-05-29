# SVI2-Pro Wan2.2 DiT Vendor Trace (Task 2.1)

Date: 2026-05-29

Goal: vendor the minimal closed set of Wan2.2 model code needed to **instantiate**
the DiT and run **one forward** on CPU, with no runtime dependency on the DiffSynth
framework (no pipeline base, no model-manager, no loader, no offload machinery, no
flash_attn). Attention is forced to `torch.nn.functional.scaled_dot_product_attention`
(SDPA) so the CPU forward works.

## Reference repo

`Stable-Video-Infinity-svi_wan22` (read-only extract at
`%TEMP%/svi-research/Stable-Video-Infinity-svi_wan22/`).

Entry point traced: `diffsynth/pipelines/wan_video_svi_pro.py`. Its DiT-construction
imports were:

```python
from ..diffusion import FlowMatchScheduler
from ..models.wan_video_dit import WanModel, sinusoidal_embedding_1d
```

`WanModel` is the DiT expert class. `FlowMatchScheduler` is the sampler. The pipeline
also imports `rope_precompute` (s2v), the text encoder, the VAE, the image encoder,
vace/mot/animate adapters, and wav2vec — **all out of scope** for instantiate+forward
of the bare DiT, and deliberately NOT vendored.

## Dependency closure

`WanModel` (`wan_video_dit.py`) is almost entirely self-contained. Its only
intra-package import is:

```python
from .wan_video_camera_controller import SimpleAdapter
```

`SimpleAdapter` is only constructed when `add_control_adapter=True` (default `False`),
and it needs only `SimpleAdapter` + `ResidualBlock` from that file (the rest of
`wan_video_camera_controller.py` is camera-pose math, irrelevant to the DiT). To keep
the import valid for all config paths without dragging in the camera machinery, a
2-class minimal `camera_controller.py` was vendored.

`FlowMatchScheduler` (`diffsynth/diffusion/flow_match.py`) is fully self-contained
(only `torch`, `math`, `typing_extensions`).

Final closed set = **4 files**, well under the 8–10 budget.

## Files vendored (upstream -> wan22/)

| Upstream path | Vendored path |
|---|---|
| `diffsynth/models/wan_video_dit.py` | `wan22/dit.py` |
| `diffsynth/models/wan_video_camera_controller.py` (subset) | `wan22/camera_controller.py` |
| `diffsynth/diffusion/flow_match.py` | `wan22/flow_match.py` |
| (new) | `wan22/__init__.py` |

`wan22/__init__.py` exports `WanModel`, `FlowMatchScheduler`, `sinusoidal_embedding_1d`.
The DiT class keeps its upstream name `WanModel` (no alias needed).

## Edits made

### `wan22/dit.py` (from `wan_video_dit.py`)
- **Removed flash_attn / flash_attn_interface / sageattention try-imports** and the
  `FLASH_ATTN_2_AVAILABLE` / `FLASH_ATTN_3_AVAILABLE` / `SAGE_ATTN_AVAILABLE` globals.
- **Rewrote `flash_attention()` to SDPA-only**: it now always does
  `rearrange(b s (n d) -> b n s d)` -> `F.scaled_dot_product_attention(q,k,v)` ->
  `rearrange` back. The `compatibility_mode` kwarg is kept in the signature for source
  compatibility but every branch is now SDPA (a later task adds a flash/SDPA selector).
- **Changed intra-package import** `from .wan_video_camera_controller import SimpleAdapter`
  -> `from .camera_controller import SimpleAdapter`.
- **Fixed `patchify()` return contract.** The upstream `wan_video_dit.py` `patchify`
  returned only `x`, but `forward()` unpacks `x, (f, h, w) = self.patchify(x)`. The
  canonical contract (confirmed against `wan_video_dit_s2v.py:424`) is:
  `grid_size = x.shape[2:]; x = rearrange(x, "b c f h w -> b (f h w) c"); return x, grid_size`.
  The vendored `patchify` now does exactly that. Without this fix the forward raised
  a tuple-unpack error — the upstream base file in this extract is missing the rearrange.
- Added PEP 8 type hints throughout; no logic change beyond the two items above.

### `wan22/camera_controller.py` (subset of `wan_video_camera_controller.py`)
- Vendored **only** `SimpleAdapter` and its dependency `ResidualBlock`.
- Dropped the camera-pose machinery (`Camera`, `get_relative_pose`, `ray_condition`,
  `process_pose_file`, `generate_camera_coordinates`, `SimpleAdapter.process_camera_coordinates`)
  and the unused `numpy` / `os` / `Literal` imports.

### `wan22/flow_match.py` (from `flow_match.py`)
- Verbatim copy of `FlowMatchScheduler`; only added type hints on `__init__`,
  `set_training_weight`, and `set_timesteps`. No DiffSynth hooks were present.

### Removed DiffSynth hooks / machinery (none survived into the vendored set)
- No `ModelConfig`, no `gradient_checkpoint_forward`, no `BasePipeline`/`PipelineUnit`,
  no model-manager registration, no custom autograd-offload import. The
  `use_gradient_checkpointing` / `use_gradient_checkpointing_offload` forward kwargs are
  retained but only fire under `self.training` (never in the inference forward), and use
  stock `torch.utils.checkpoint` + `torch.autograd.graph.save_on_cpu` — no DiffSynth code.

## Real `WanModel.forward()` signature (for downstream tasks)

```python
def forward(
    self,
    x: torch.Tensor,                       # noisy latent (B, 16, F, H, W)  [16 = Wan latent channels]
    timestep: torch.Tensor,                # (B,)  flow-match timestep, 0..1000
    context: torch.Tensor,                 # text embedding (B, L_text, text_dim)
    clip_feature: Optional[torch.Tensor],  # CLIP image feature (B, 257, 1280) -- required when has_image_input
    y: Optional[torch.Tensor],             # image-conditioning latent (B, C_y, F, H, W) -- required when has_image_input
    use_gradient_checkpointing: bool = False,
    use_gradient_checkpointing_offload: bool = False,
    **kwargs,
) -> torch.Tensor:                         # predicted latent, same (B, out_dim, F, H, W) as x
```

Key shape facts:
- When `has_image_input=True`, the forward does `x = torch.cat([x, y], dim=1)`, so the
  constructor's **`in_dim` must equal `x_channels + y_channels`**. For Wan2.2-I2V-A14B
  the real `in_dim` is 36 (16 latent + 20 conditioning).
- `clip_feature` is projected by `img_emb: MLP(1280 -> dim)` and **prepended** to the
  text context (so cross-attention sees `[clip_tokens (257), text_tokens]`; the
  `CrossAttention` slices `y[:, :257]` as the image branch when `has_image_input`).
- `out_dim` is the model's predicted-latent channel count (16 for Wan latents).
- `patch_size` is `(pt, ph, pw)`; the head emits `out_dim * prod(patch_size)` per token
  and `unpatchify` folds it back to `(B, out_dim, F, H, W)`.
- **3D-RoPE constraint**: `head_dim = dim // num_heads` is split by
  `precompute_freqs_cis_3d` into `(head_dim - 2*(head_dim//3))` for frames and
  `head_dim//3` for each of H and W, each as complex pairs. For the rope multiply to
  line up, `head_dim//3` and `head_dim - 2*(head_dim//3)` must both be even. The real
  model uses `head_dim=128` (fine). Tiny test configs must respect this — the test uses
  `dim=48, num_heads=4` (`head_dim=12`: f=4, h=4, w=4 -> 6 complex = 12/2). A naive
  `head_dim=16` fails (5/5/6 split -> odd thirds -> 7 vs 8 complex mismatch).

## Forward-test result

`tests/test_wan22_imports.py` — tiny CPU config (dim=48, 4 heads, 2 layers, fp32),
I2V path (`has_image_input=True`), inputs `x=(1,16,2,8,8)`, `y=(1,20,2,8,8)`,
`timestep=(1,)`, `context=(1,12,32)`, `clip_feature=(1,257,1280)`; asserts output
`== (1, 16, 2, 8, 8)` and all-finite. Also covers import, instantiate, and a
`FlowMatchScheduler(template="Wan")` `set_timesteps` + `step` round-trip.

```
tests/test_wan22_imports.py::test_wanmodel_importable PASSED             [ 25%]
tests/test_wan22_imports.py::test_wanmodel_instantiates_cpu PASSED       [ 50%]
tests/test_wan22_imports.py::test_wanmodel_forward_i2v_shape PASSED      [ 75%]
tests/test_wan22_imports.py::test_flow_match_scheduler_wan PASSED        [100%]
4 passed
```

Full worker suite: `20 passed`.

## Concerns / risks for downstream tasks

1. **`patchify` was buggy upstream.** The base `wan_video_dit.py` in this extract
   returns only `x` from `patchify` while `forward` unpacks a tuple — it would crash
   as-shipped. The fix matches the s2v variant. When the real fp8 weights are loaded
   (Task 2.3), confirm the official Wan2.2 checkpoint's `WanModel` uses the same
   `b c f h w -> b (f h w) c` patch flatten (it should — the head/unpatchify math
   assumes it), otherwise the loaded weights' patch_embedding output ordering must match.
2. **`in_dim=36` is an assumption** for Wan2.2-I2V-A14B (16 latent + 20 cond). The real
   value comes from the checkpoint config; the fp8 loader task must read the actual
   model config rather than hardcoding 36. The forward only requires
   `in_dim == x_channels + y_channels`.
3. **CLIP feature length 257** is hardcoded in `CrossAttention` (`y[:, :257]`) for the
   image branch. The real CLIP image encoder (out of scope here) must emit 257 tokens.
4. **No flash_attn at all yet** — Task 2.2 will add the flash/SDPA selector. The current
   `flash_attention()` keeps the `compatibility_mode` kwarg slot so that selector can
   plug in without changing call sites.
5. **`rope_apply` runs in float64** (`view_as_complex` path). That is fine on CPU/GPU but
   is a perf/precision consideration once fp8 weights + bf16 activations are in play.
