# ComfyUI-Trellis2 Integration And Optimization Review

**Date:** 2026-06-24

**Source archive:** `C:/Users/lazar/Downloads/ComfyUI-Trellis2-main (1).zip`

**Local extraction reviewed:** `.codex/scratch/comfyui-trellis2-main-1/ComfyUI-Trellis2-main`

## Purpose

This note extends the TRELLIS.2 dossier with a focused review of integration opportunities and improvement ideas for a NexusDNN port. It is intentionally split from the PRD because most items here are design inputs, performance hypotheses, or follow-up requirements that should be validated during implementation spikes.

## Review Summary

ComfyUI-Trellis2 is valuable as a runtime and workflow reference, but it should not be copied directly into NexusDNN. The code mixes three concerns that Nexus should separate:

1. ComfyUI node registration and UI-facing node classes.
2. TRELLIS.2 model orchestration, sampling, decoding, and texturing.
3. Native CUDA/mesh/render dependencies plus model and cache lifecycle.

The strongest Nexus design is still a native workflow operator backed by a Python worker. The worker can adapt pipeline primitives from `trellis2/pipelines/*`, while the Rust host owns runtime profiles, artifact targets, cancellation, progress, recipe compilation, and memory lifecycle.

## Source Anchors

| Area | Source evidence |
| --- | --- |
| Heavy import surface | `nodes.py` imports ComfyUI modules, `cumesh`, `o_voxel`, `meshlib`, `pymeshlab`, `nvdiffrast`, and `flex_gemm` near module import. |
| Manual CUDA reset | `nodes.py:137` defines `reset_cuda`; `nodes.py:373`, `nodes.py:5039`, `nodes.py:5196`, and many later nodes call it. |
| Lazy pipeline model loading | `trellis2/pipelines/base.py` initializes model slots as `None`; `trellis2_image_to_3d.py` loads specific models on demand. |
| Sampler switching | `trellis2_image_to_3d.py:147` recreates sampler instances from a selected sampler name. |
| Negative conditioning allocation | `trellis2_image_to_3d.py:577`, `trellis2_image_to_3d.py:646`, and `trellis2_image_to_3d.py:779` allocate zero-like negative conditions. |
| Sparse dense noise allocation | `trellis2_image_to_3d.py:814` and `trellis2_image_to_3d.py:2391` allocate dense 5D noise tensors before sparse coordinate extraction. |
| CPU/GPU sync in hole fill | `trellis2_image_to_3d.py:930` and `trellis2_image_to_3d.py:938` move filled voxel masks between numpy/CPU and torch/GPU. |
| Cascade token pressure | `trellis2_image_to_3d.py:1037`, `trellis2_image_to_3d.py:1113`, and later advanced paths adjust resolution against `max_num_tokens`. |
| Unconditional CUDA calls | `trellis2_image_to_3d.py:1697`, `trellis2_image_to_3d.py:1702`, and `trellis2_image_to_3d.py:1703` call CUDA cache/progress at run end without the same guards used elsewhere. |
| Texturing GPU pressure | `trellis2_texturing.py:297` to `trellis2_texturing.py:325` moves mesh data to CUDA, creates an `nvdiffrast` context, and allocates texture-sized GPU buffers. |
| Large inpaint copies | `trellis2_texturing.py:343` to `trellis2_texturing.py:346` performs OpenCV inpainting on texture maps after GPU raster work. |
| Projection and render nodes | `nodes.py:4806` and `nodes.py:7029` expose high-poly projection and nvdiffrast rendering as separate advanced surfaces. |
| Blackwell patching | `blackwell_fix.py:72` applies env var changes and monkey patches; `blackwell_fix.py:104` to `blackwell_fix.py:106` set backend/cache env vars. |

## Integration Points To Consider

### P0: MVP Integration Points

1. **Single native operator:** expose `trellis2.generate_3d@1.0.0` instead of copying all Comfy nodes. Internally stage the worker around image preprocessing, DINO conditioning, sparse structure, shape SLAT, optional texture SLAT, decode, mesh cleanup, preview/export, and metadata.
2. **Runtime profile catalog:** map Comfy choices such as backend, sparse backend, CUDA profile, FP8, Pixal3D, ReconViaGen, low VRAM, and Blackwell patch into validated runtime profiles. Recipe users should not need to understand wheel compatibility.
3. **Host-managed model store:** replace `folder_paths.models_dir` and implicit Hugging Face downloads with explicit model artifact requirements and install/health checks.
4. **Artifact-first outputs:** write GLB, preview images/video, processed inputs, metadata, and diagnostics only to host-provided artifact targets.
5. **Structured progress:** replace coarse Comfy progress with Nexus phase events and step-level progress inside sampler loops.
6. **Cooperative cancellation:** add worker cancellation checks inside denoising loops, cascade resolution loops, mesh cleanup, texturing, rendering, and artifact writes.
7. **Memory lifecycle API:** expose `runtime.release_memory` and make it worker-local. Do not rely on UI nodes like `Trellis2UnloadAllModels` as the product mechanism.

### P1: Advanced Workflow Integration Points

1. **Split-stage operators:** later expose `encode_image_condition`, `sample_sparse_structure`, `sample_shape_slat`, `sample_texture_slat`, and `decode_latents` for power users.
2. **Multiview recipe:** promote multi-image conditioning and multiview texture projection after the single-image path is stable.
3. **3D artifact viewer:** add a custom Nexus UI only when generated artifacts need an interactive model preview beyond generic artifact display.
4. **Diagnostics recipe panel:** surface GPU, profile, model revision, peak VRAM, stage timing, and patch state from metadata.
5. **Projection texturing workflow:** adapt `Trellis2MultiViewTexturing` and `Trellis2ProjectHighPolyToLowPoly` as separate workflows, not part of MVP generation.

### P2: Experimental Integration Points

1. **Blackwell/CUDA 13.1 profile:** keep `blackwell_fix.py` worker-only and profile-gated. Prefer native compatible wheels when validated.
2. **Pixal3D and MoGe:** enable only after NATTEN/MoGe dependencies are profiled and the camera configuration contract is productized.
3. **ReconViaGen/VGGT:** expose as an advanced mode after model assets, licensing, and dependency interactions are understood.
4. **Benchmark harness:** add repeatable benchmark recipes for quality, runtime, peak VRAM, and failure mode comparison across profiles.

## Performance Improvement Ideas

### Worker Startup And Imports

- Do not import `nodes.py` from the Nexus host. It imports too many ComfyUI and native dependencies at module load.
- Put runtime-profile env vars before any TRELLIS.2/native imports.
- Use a small worker adapter around `trellis2/pipelines/trellis2_image_to_3d.py` and selected mesh/export helpers.
- Load optional texturing, projection, Blender, Pixal3D, MoGe, VGGT, and NATTEN modules only when a profile or operator needs them.
- Keep a fake runtime that never imports torch. This protects CI, recipe validation, and UI work from native dependency churn.

### Sampler And Loop Efficiency

- Add a callback/cancellation hook to sampler loops in `flow_euler.py` so progress and cancellation do not depend on `tqdm`.
- Avoid retaining every intermediate prediction in production mode. Current samplers append `pred_x_t` and `pred_x_0` each step. Keep this only for diagnostics/debug.
- Cache sampler objects per sampler type and resolution where safe instead of recreating them on every run.
- Precompute or cache normalization tensors such as SLAT mean/std per device/dtype.
- Consider a validated "fast preview" preset with fewer sparse/shape/texture steps and lower texture size.

### Decode And Mesh Pipeline

- Keep `use_tiled_decoder=true` by default.
- Make mesh cleanup stages independently configurable: hole fill, shell-only filtering, simplification, remesh, UV unwrap, projection, and export.
- Defer high-poly to low-poly projection from MVP because it adds another heavy CUDA/texture pipeline.
- Add output face/vertex caps by preset so GLB/export and viewer paths do not become unbounded.

## VRAM Improvement Ideas

### Profile-Level Caps

Define profile caps instead of exposing raw knobs without context:

| Profile class | Suggested caps to validate |
| --- | --- |
| Low VRAM | `512` or `1024_cascade`, texture size <= 1024, lower token cap, texture SLAT optional/default off. |
| Standard | `1024_cascade`, texture size 1024-2048, token cap near current default. |
| High VRAM | `1536_cascade`, texture size 2048-4096, higher token cap after smoke tests. |
| Experimental | 2048/4096 code paths only behind explicit profile gates and benchmark evidence. |

### Memory Governor

Add a worker-local memory governor that:

1. estimates stage memory risk from image count, pipeline type, texture size, and token cap
2. checks `torch.cuda.mem_get_info()` before high-risk stages
3. lowers optional outputs or returns a structured OOM-prevention error instead of failing deep inside CUDA
4. records allocated, reserved, and peak memory per phase where available
5. suggests a lower preset in structured error metadata

### Model Residency

- Preserve lazy model loading from the source, but make residency explicit: `eager`, `balanced`, and `low_vram`.
- Do not let `keep_models_loaded` be only a raw user knob. It should be governed by profile and job queue pressure.
- Implement an LRU or phase-owned residency policy for DINO, sparse flow, sparse decoder, shape flow, shape decoder, texture flow, and texture decoder.
- On `runtime.release_memory`, move all resident modules to CPU where possible, delete optional modules, clear caches, and return memory stats.

### Texture Memory

Texturing can be a VRAM cliff. `trellis2_texturing.py` allocates buffers based on `texture_size * texture_size * channels`. Nexus should:

- default MVP texture size to 1024
- profile-gate 2048 and 4096
- hide 8192/16384-style ranges unless a dedicated high-memory profile proves them
- tile or chunk raster/texture work where practical
- explicitly delete raster/intermediate tensors after texture export
- consider CPU inpaint after releasing GPU raster intermediates

## GC And Cache Policy

The source uses several cleanup styles: `gc.collect()`, `torch.cuda.synchronize()`, `torch.cuda.empty_cache()`, Comfy `soft_empty_cache`, and node-level reset helpers. Nexus should centralize this into a worker memory service.

Recommended API:

```text
memory_checkpoint(reason, level)
```

Suggested levels:

| Level | Behavior |
| --- | --- |
| `none` | No forced cleanup; used between tiny stages. |
| `light` | Delete known local tensors and optionally collect Python GC without CUDA sync. |
| `normal` | `gc.collect()` plus `torch.cuda.empty_cache()` when CUDA is available. |
| `aggressive` | Synchronize, collect, empty cache, collect IPC if available; use after OOM, profile switch, or `runtime.release_memory`. |

Guidance:

- Avoid `torch.cuda.synchronize()` on every stage; it can serialize the pipeline and hide performance.
- Guard every CUDA cleanup with `torch.cuda.is_available()`.
- Never call CUDA cleanup in the fake runtime.
- Record cleanup events in diagnostics, especially if aggressive cleanup was needed.
- Keep Triton/cache rotation profile-local. Avoid deleting global caches from host code.

## Quality Improvement Ideas

### Product Presets

Expose quality presets instead of only raw Comfy-style controls:

| Preset | Intended behavior |
| --- | --- |
| Preview | low steps, lower token cap, texture optional, fast preview artifacts. |
| Balanced | current-style defaults: `1024_cascade`, tiled decoder, texture on, reasonable token cap. |
| Detail | higher shape/texture steps, higher token cap, stronger mesh cleanup. |
| Texture Focus | texture SLAT on, higher texture steps, texture size cap based on profile. |
| Geometry Focus | texture optional/off, higher shape/cascade settings and mesh cleanup. |

### Image Conditioning

- Preserve multi-image support, but give users clear modes: single image, multi-image fused, and multiview.
- Keep DINO fusion mode (`concat`/`mean` style behavior) as an advanced control after validation.
- Make background removal explicit. It affects product/object quality and can change silhouettes.
- Store processed input images as artifacts so users can diagnose bad crops/background masks.

### Geometry And Texture Quality

- Surface hole fill and shell-only behavior, but default to stable presets.
- Add metadata for final face count, vertex count, texture size, and cleanup operations applied.
- Treat projection texturing as a quality upgrade path, not an MVP dependency.
- Provide a "no texture SLAT" mode for shape iteration and low VRAM users.

## Reliability Issues To Fix During Port

1. **Progress bar assumption:** `trellis2_image_to_3d.py:1703` calls `pbar.update(1)` unguarded at the end of `run`. Nexus worker calls should not require a Comfy progress bar.
2. **CPU profile safety:** some cleanup calls are guarded, but others call `torch.cuda.empty_cache()` directly. All worker cleanup needs CUDA availability checks.
3. **Direct `.cuda()` usage:** texturing and mesh helper paths use `.cuda()` directly instead of `self.device` or profile device. That limits CPU/fake profile safety and multi-device control.
4. **Import-time native failures:** `nodes.py` and texturing modules import native packages immediately. Optional features should fail at runtime validation, not host startup.
5. **Implicit downloads:** model and auxiliary asset downloads should move to install/health checks.
6. **Unbounded texture sizes:** Comfy nodes expose texture sizes up to 8192 or 16384 in places. Nexus should profile-gate these.
7. **Sampler diagnostics memory:** retaining all per-step predictions is useful for debugging but costly for production.
8. **Blackwell monkey patches:** patching compute capability and kernels is too global for host use. Keep it worker-only and visible in metadata.

## Design Options

### Option A: MVP Single Operator With Internal Stages

Recommended.

Pros:

- fastest path to a product-quality recipe
- keeps host workflow generic
- hides Comfy complexity from normal users
- gives the worker room to optimize memory and cancellation

Cons:

- power users cannot initially wire intermediate latent stages
- worker must define stable internal stage metadata from the start

### Option B: Split-Stage Operators From Day One

Pros:

- closest to the useful parts of the Comfy graph
- supports advanced experimentation and debugging
- makes cached intermediates possible later

Cons:

- much larger API surface
- more artifact/schema questions for sparse/SLAT intermediate types
- more UI complexity before the basic feature is proven

### Option C: Comfy Compatibility Layer

Not recommended.

Pros:

- may reuse examples almost directly
- lower initial semantic mapping work

Cons:

- imports Comfy assumptions into Nexus
- poor fit for runtime profiles, artifact targets, cancellation, and host memory lifecycle
- harder to test without full native environment

## PRD Implications

The PRD should treat the following as real requirements, not optional polish:

- fake runtime with no torch import
- profile-local env setup before imports
- worker memory service and `runtime.release_memory`
- structured progress and cancellation inside sampler loops
- profile caps for texture size, token count, and cascade resolution
- no production dependency on Comfy `nodes.py`
- metadata fields for peak VRAM, stage duration, cleanup level, and patch state
- staged rollout for Pixal3D, ReconViaGen, projection texturing, and Blackwell

## Open Questions For The Next PRD Pass

1. What minimum VRAM should define low, standard, and high profiles?
2. Should texture SLAT be default-on for MVP, or should low-VRAM profiles default it off?
3. Should Nexus expose `dino_lock` and DINO substeps, or keep them preset-only?
4. What intermediate artifact schema is needed before split-stage operators can be public?
5. Should preview rendering use nvdiffrast in MVP, Blender, or a simpler mesh thumbnail path?
6. Which cleanup level should run after every successful job versus only after OOM/cancel/release?
7. Can current recipe controls express quality presets that fan out to multiple config fields with provenance?
