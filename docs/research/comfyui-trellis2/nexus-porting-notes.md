# Nexus Porting Notes

This document translates the ComfyUI-Trellis2 dossier into NexusDNN design guidance for a future implementation.

For the dedicated performance, quality, VRAM, GC, and reliability brainstorm, see `integration-optimization-review.md`.

## Recommended Product Framing

Build a native NexusDNN extension for TRELLIS.2 image-to-3D generation.

Recommended working identity:

```text
extension id:     nexus.3d.trellis2
primary operator: trellis2.generate_3d@1.0.0
```

Rationale:

- The inspected archive is a real ComfyUI custom-node package for Microsoft TRELLIS.2.
- It exposes a concrete graph surface with 71 nodes and example workflows.
- TRELLIS.2 is the modern model/runtime target, with DINOv3, FP8, Pixal3D, ReconViaGen, multiview, projection, and Blackwell clues.
- Nexus should still expose a native extension contract, not ComfyUI compatibility as the product API.

The ComfyUI package is useful as a graph and runtime reference, but the product surface should still be Nexus-native rather than ComfyUI-compatible.

## Answer To Portability Questions

| Question | Porting answer |
| --- | --- |
| What API surface does the Comfy plugin expose? | ComfyUI node registration in `__init__.py`/`nodes.py`: `NODE_CLASS_MAPPINGS`, `NODE_DISPLAY_NAME_MAPPINGS`, and node classes with `INPUT_TYPES`, `RETURN_TYPES`, `RETURN_NAMES`, `FUNCTION`, `CATEGORY`, `OUTPUT_NODE`. |
| Can we port it to Rust + Python workers? | Yes. Rust should own generic Nexus contracts and lifecycle. Python workers should own TRELLIS.2, PyTorch/CUDA, DINOv3, mesh processing, texturing, rendering, and native wheels. |
| Do we have all dependencies? | No. The zip includes many native wheels, but the product still needs model artifacts, DINOv3, TRELLIS-image-large decoder files, optional MoGe/VGGT/Pixal3D/ReconViaGen assets, lockfiles, wheel hashes/provenance, and runtime validation. |
| Should we try newer Blackwell-compatible CUDA? | Not as the first default. Build the README-tested Windows Torch 2.7.0 + cu128 profile first, then add a profile-gated Blackwell/CUDA 13.1 experiment using the included wheel evidence and `blackwell_fix.py` only inside the worker. |
| Where does it integrate with current NexusDNN? | Built-in extension manifest, backend runtime catalog, Python worker protocol, operator definitions, recipe/workflow YAML, host artifact outputs, run events, cancellation, and `runtime.release_memory`. |
| Where does it integrate with workflow-driven NexusDNN? | Ship a canonical workflow and `RecipeProjection` using generic `input:<name>` and `node:<node_id>.config.<path>` bindings. TRELLIS.2-specific details remain extension data. |

## Proposed Extension Shape

```text
extensions/builtin/trellis2-3d/
|-- manifest.yaml
|-- operators/
|   |-- generate_3d.yaml
|   |-- encode_image_condition.yaml        # future
|   |-- sample_sparse_structure.yaml       # future
|   |-- sample_shape_slat.yaml             # future
|   |-- sample_texture_slat.yaml           # future
|   `-- decode_latents.yaml                # future
|-- workflows/
|   `-- image_to_3d.yaml
|-- recipes/
|   `-- image_to_3d.yaml
|-- ui/
|   `-- layouts/main.yaml
|-- web/
|   `-- dist/                              # optional later 3D viewer/custom element
|-- worker/
|   |-- pyproject.toml
|   |-- uv.lock
|   |-- src/trellis2_worker/
|   |   |-- __main__.py
|   |   |-- worker.py
|   |   |-- pipeline.py
|   |   |-- profiles.py
|   |   |-- models.py
|   |   |-- mesh.py
|   |   |-- texturing.py
|   |   |-- artifacts.py
|   |   |-- cancellation.py
|   |   `-- fake_pipeline.py
|   `-- tests/
|-- vendor/
|   |-- trellis2/                           # if vendored from inspected archive/fork
|   |-- moge/                               # optional profile
|   |-- vggt/                               # optional profile
|   `-- projection/                         # optional profile
`-- backends/
    |-- fake/versions.yaml
    |-- cuda128-win-torch270/versions.yaml
    |-- cuda128-linux-torch270/versions.yaml
    |-- cuda128-win-torch280/versions.yaml  # later
    `-- cuda131-win-torch2100/versions.yaml # experimental Blackwell
```

The exact layout should follow current built-in extension conventions, but the boundary should stay clear: host owns extension/runs/artifacts, worker owns TRELLIS.2 execution.

## Operator Model

### MVP Operator

```text
trellis2.generate_3d@1.0.0
```

Inputs:

| Name | Type | Required | Notes |
| --- | --- | --- | --- |
| `images` | `array<artifact:image>` | yes | One or more object images. If current schema cannot express arrays, MVP can use one required image plus optional additional image ports. |

Outputs:

| Name | Type | Notes |
| --- | --- | --- |
| `model_glb` | `model/gltf-binary` | Optional; present when `emit_glb=true`. |
| `mesh` | `model/mesh` or provisional binary | Optional; intermediate mesh output if supported. |
| `preview_mp4` | `video/mp4` | Optional preview. |
| `preview_images` | `array<image/png>` | Optional multiview render outputs. |
| `processed_inputs` | `array<image/png>` | Optional preprocessed inputs. |
| `metadata_json` | `application/json` | Required. Effective settings, runtime, model ids, warnings, timings. |
| `diagnostics_json` | `application/json` | Optional dependency/kernel/GPU diagnostics. |

### Future Split Operators

The ComfyUI archive proves that split-stage workflows are useful, but MVP should keep them internal unless product needs advanced graph editing immediately.

Future operator candidates:

```text
trellis2.encode_image_condition@1.0.0
trellis2.sample_sparse_structure@1.0.0
trellis2.sample_shape_slat@1.0.0
trellis2.cascade_shape_slat@1.0.0
trellis2.sample_texture_slat@1.0.0
trellis2.decode_latents@1.0.0
trellis2.texture_mesh@1.0.0
trellis2.render_multiview@1.0.0
```

Do not expose ComfyUI node IDs as Nexus operator IDs. Use Nexus operator names and document Comfy node provenance in metadata.

## Suggested MVP Config

`trellis2.generate_3d` config fields:

| Field | Type | Default | Constraints | Source influence |
| --- | --- | ---: | --- | --- |
| `model_family` | enum | `microsoft_trellis2_4b` | MVP: Microsoft 4B only; later FP8/Pixal3D | `Trellis2LoadModel.modelname` |
| `seed` | integer | `0` | `0..2147483647`; UI may add randomize toggle | Comfy generator nodes |
| `pipeline_type` | enum | `1024_cascade` | `512`, `1024`, `1024_cascade`, `1536_cascade`; hide larger code paths until validated | Comfy generation nodes |
| `sparse_structure_steps` | integer | `12` | `1..100` | Comfy nodes |
| `shape_steps` | integer | `12` | `1..100` | Comfy nodes |
| `texture_steps` | integer | `12` | `1..100` | Comfy nodes |
| `sparse_structure_guidance` | number | `6.5` | `0..99.99`; UI should cap lower by preset | Advanced node default |
| `shape_guidance` | number | `6.5` | `0..99.99`; UI should cap lower by preset | Advanced node default |
| `texture_guidance` | number | `6.5` | `0..99.99`; UI should cap lower by preset | Advanced node default |
| `max_num_tokens` | integer | `49152` | profile dependent | Simple node default |
| `max_views` | integer | `4` | `1..16` | Simple node default |
| `sparse_structure_resolution` | integer | `32` | `32..128`, step 4 | Comfy nodes |
| `generate_texture_slat` | boolean | `true` | none | Simple node |
| `use_tiled_decoder` | boolean | `true` | none | Simple node |
| `sampler` | enum | `euler` | `euler`, `heun`, `rk4`, `rk5` | Comfy nodes |
| `fill_holes` | boolean | `true` | none | Comfy nodes |
| `hole_iterations` | integer | `1` | `1..9` | Comfy nodes |
| `hole_fill_algorithm` | enum | `flood_fill` | `morphological_closing`, `flood_fill`, `remove_small_holes` | Comfy nodes |
| `keep_only_shell` | boolean | `true` | none | Comfy nodes |
| `emit_preview` | boolean | `true` | none | Nexus product output |
| `emit_glb` | boolean | `true` | none | Nexus product output |
| `texture_size` | integer | `1024` | `256..4096` by profile | Texturing/export nodes |
| `emit_metadata` | boolean | `true` | locked true | Nexus artifact contract |

Runtime choices such as `backend`, `conv_backend`, `sparse_backend`, precision, and CUDA profile should usually live in the runtime profile, not per-job config. Expose them only as advanced overrides if the host can validate them safely.

## Runtime Profiles

Minimum profile set:

| Runtime ID | Purpose | Status |
| --- | --- | --- |
| `nexus.3d.trellis2.fake` | CI/dev fake pipeline. No torch, no CUDA, no models. Writes deterministic placeholder artifacts. | Required MVP |
| `nexus.3d.trellis2.cuda128-win-torch270` | First real Windows runtime. Matches README tested stack: Windows 11, Python 3.11, Torch 2.7.0 + cu128. | Recommended first real profile |

Follow-up profiles:

| Runtime ID | Purpose | Notes |
| --- | --- | --- |
| `nexus.3d.trellis2.cuda128-linux-torch270` | Linux profile | Archive has Linux Torch270 wheels, but needs import/CUDA smoke. |
| `nexus.3d.trellis2.cuda128-win-torch280` | Newer Windows runtime | Useful for NATTEN/Pixal3D and Blackwell-adjacent validation. |
| `nexus.3d.trellis2.cuda131-win-torch2100` | Experimental CUDA 13.1 / Blackwell | Archive includes CUDA 13.1 wheels; must be gated and validated on RTX 50/Blackwell hardware. |

Runtime profile metadata should include:

- Python version
- PyTorch version/index
- CUDA runtime version
- expected GPU compute capabilities
- wheel list and hashes
- model artifact requirements
- feature flags: FP8, Pixal3D, ReconViaGen, projection, Blender, Blackwell patch
- import smoke commands
- minimal GPU smoke command

## Blackwell Policy

The archive has two Blackwell-related signals:

1. `wheels/Windows/Torch2100/CUDA 13.1` contains multiple cp311/cp312/cp313 native wheels.
2. `blackwell_fix.py` provides monkey patches and CPU voxel-to-mesh fallback for `sm_120`.

Nexus policy:

- Do not enable Blackwell monkey patches globally.
- Do not run `blackwell_fix.patch_all()` in host/Rust.
- If used, apply it only before TRELLIS.2 imports inside a dedicated Python worker profile.
- Record the patch state in `metadata_json`.
- Prefer native Blackwell-compatible wheels and CUDA 13.1 validation once available.
- Keep cu128/Torch270 as the first real profile unless product explicitly prioritizes RTX 50 users.

## Performance, VRAM, And GC Policy

ComfyUI-Trellis2 uses low-VRAM model movement, tiled decoding, cache clearing, and explicit CUDA cleanup in several places, but the behavior is distributed through node and pipeline code. Nexus should turn this into an explicit worker memory policy.

Recommended porting rules:

1. Add a worker memory service with `memory_checkpoint(reason, level)` and `runtime.release_memory`.
2. Guard all CUDA cleanup with `torch.cuda.is_available()`.
3. Avoid `torch.cuda.synchronize()` during normal stage transitions unless diagnostics or error handling require it.
4. Track allocated/reserved/peak VRAM per phase when possible.
5. Profile-gate texture size, cascade resolution, and `max_num_tokens`.
6. Keep `use_tiled_decoder=true` by default.
7. Treat texture SLAT and projection texturing as optional high-memory stages.
8. Add sampler-loop progress and cancellation hooks instead of relying on `tqdm` or Comfy progress bars.
9. Do not retain every sampler intermediate unless diagnostics are enabled.
10. Prefer profile-owned model residency policies over exposing raw `keep_models_loaded` as a primary user knob.

## Dependency Strategy

### Do Not Trust `requirements.txt` As Complete

The ComfyUI archive `requirements.txt` lists only light packages:

```text
meshlib
requests
pymeshlab
opencv-python
scipy
open3d
plotly
rembg
```

Actual runtime also needs ComfyUI modules, PyTorch/CUDA, Hugging Face Hub, `cumesh`, `o_voxel`, `nvdiffrast`, `nvdiffrec_render`, `flex_gemm`, optional `natten`, auxiliary model code, and model weights. Create per-profile lockfiles instead of reusing `requirements.txt`.

### Model/Asset Requirements

Host-managed assets should include:

| Asset | Required for | Notes |
| --- | --- | --- |
| `microsoft/TRELLIS.2-4B` | MVP model | Main model repo. |
| `visualbruno/TRELLIS.2-4B-FP8` | Optional FP8 | Not compatible with ReconViaGen in source logic. |
| `TencentARC/Pixal3D-T` | Optional Pixal3D | Requires NATTEN and MoGe path. |
| `facebook/dinov3-vitl16-pretrain-lvd1689m/model.safetensors` | Required | Source raises if absent. |
| `microsoft/TRELLIS-image-large/ckpts/ss_dec_conv3d_16l8_fp16.{json,safetensors}` | Required for non-Pixal3D sparse decoder | Source downloads if missing; Nexus should preinstall. |
| `Stable-X/trellis-vggt-v0-2` files | Optional ReconViaGen | Includes VGGT condition/sparse model files. |
| `Ruicheng/moge-2-vitl/model.pt` | Optional Pixal3D/MoGe | Source downloads if missing. |
| `rembg` model cache | Optional/preprocess | Needed if background removal is enabled. |

### Native Wheel Requirements

Validate at least:

- `cumesh`
- `o_voxel`
- `nvdiffrast`
- `nvdiffrec_render`
- `flex_gemm`
- `custom_rasterizer` where used
- `natten` for Pixal3D

Each profile needs:

- wheel file hash
- source/provenance
- license/redistribution note
- platform tag check
- Python ABI check
- Torch/CUDA compatibility check
- import smoke
- minimal runtime smoke

## Worker Architecture

Use a long-lived Python worker for real profiles.

Worker responsibilities:

1. Protocol handshake/health/list operators.
2. Validate runtime profile and dependency availability.
3. Resolve host artifact inputs to local paths.
4. Load model artifacts from host-managed directories.
5. Apply profile-local env vars before importing TRELLIS.2.
6. Load TRELLIS.2 pipeline lazily or during runtime validation.
7. Execute generation stages with cooperative cancellation checks.
8. Write outputs only to host-provided artifact targets.
9. Emit structured progress events.
10. Implement `runtime.release_memory`.
11. Keep stdout reserved for worker protocol messages; send logs to stderr or structured events.

Avoid importing `nodes.py` directly in the worker if it drags in ComfyUI-only modules. Prefer adapting `trellis2/pipelines/*` and selected helper modules behind a small worker API. If reusing node code is necessary, isolate or stub ComfyUI dependencies deliberately.

## Suggested Internal Execution Flow

```text
execute trellis2.generate_3d
1. validate images and config
2. choose runtime/model profile
3. import worker dependencies after profile env is set
4. load TRELLIS.2 pipeline if needed
5. preprocess images
6. build DINOv3 condition(s)
7. sample sparse structure
8. sample shape SLAT
9. run cascade if requested
10. sample texture SLAT if requested
11. decode latents to MeshWithVoxel
12. convert/export mesh artifacts
13. render preview if requested
14. export GLB if requested
15. write metadata/diagnostics
16. return artifact refs
```

Progress phases should map to these steps rather than ComfyUI's node-by-node execution.

## Progress Contract

| Percent | Phase |
| ---: | --- |
| 0 | Accepted and validating |
| 5 | Runtime/profile initialization |
| 10 | Model availability check |
| 15 | Image preprocessing |
| 25 | DINOv3 image conditioning |
| 38 | Sparse structure sampling |
| 52 | Shape SLAT sampling |
| 62 | Cascade/high-resolution sampling |
| 70 | Texture SLAT sampling |
| 78 | Latent decoding |
| 84 | Mesh conversion/cleanup |
| 90 | Preview rendering |
| 95 | GLB/export writing |
| 100 | Complete |

For jobs without texture/cascade/GLB, rescale progress but keep phase names honest in events.

## Cancellation Contract

Cancellation should be checked:

- before each image load
- before and after preprocessing
- before DINOv3 conditioning
- inside sparse sampler loops
- inside shape sampler loops
- inside cascade loops
- inside texture sampler loops
- before decode
- during mesh cleanup/remeshing loops
- during render/export loops
- before writing each artifact

Use worker-local cancellation primitives. Do not pass ComfyUI progress/cancel assumptions through the Nexus host boundary.

## Artifact Strategy

Inputs:

- one or more host image artifacts

Outputs:

| Artifact | Extension | Type |
| --- | --- | --- |
| model | `.glb` | `model/gltf-binary` |
| mesh | `.obj`, `.ply`, or `.glb` | provisional mesh type if schema lacks one |
| preview video | `.mp4` | `video/mp4` |
| preview images | `.png` | `image/png` |
| processed input | `.png` | `image/png` |
| metadata | `.json` | `application/json` |
| diagnostics | `.json` | `application/json` |

Metadata should include:

- operator id/version
- extension version
- runtime profile id
- Python/PyTorch/CUDA versions
- GPU name and compute capability
- whether Blackwell patch was applied
- model ids/revisions/local artifact roots
- seed and effective config
- input refs/hashes
- output refs
- stage durations
- warnings
- peak VRAM where measurable

## Workflow-Driven Recipe Integration

Use the authoritative recipe contracts from:

```text
docs/superpowers/plans/2026-06-23-recipes-00-CONTRACTS.md
```

Required alignment:

- `WorkflowVersionSnapshot` is produced by workflow versioning and consumed by recipes.
- `compile_recipe_run` emits `ResolvedRun`.
- control provenance uses `ValueSource`.
- bindings use only `input:<name>` and `node:<node_id>.config.<dot.pointer>`.
- projection data uses `RecipeProjection`.
- recipe health uses `RecipeStatus`.
- custom UI, if added later, submits through `POST /recipes/{id}/run`.
- host crates remain generic and contain no TRELLIS.2 literals.

Suggested canonical workflow node:

```yaml
nodes:
  - id: generate_3d
    operator: trellis2.generate_3d@1.0.0
    inputs:
      images:
        from: input:images
    config:
      model_family: microsoft_trellis2_4b
      seed: 0
      pipeline_type: 1024_cascade
      sparse_structure_steps: 12
      shape_steps: 12
      texture_steps: 12
      max_num_tokens: 49152
      max_views: 4
      sparse_structure_resolution: 32
      generate_texture_slat: true
      use_tiled_decoder: true
      sampler: euler
      fill_holes: true
      hole_iterations: 1
      hole_fill_algorithm: flood_fill
      keep_only_shell: true
      emit_preview: true
      emit_glb: true
      texture_size: 1024
```

Suggested recipe bindings:

| Control id | Target |
| --- | --- |
| `images` | `input:images` |
| `model_family` | `node:generate_3d.config.model_family` |
| `seed` | `node:generate_3d.config.seed` |
| `pipeline_type` | `node:generate_3d.config.pipeline_type` |
| `shape_steps` | `node:generate_3d.config.shape_steps` |
| `texture_steps` | `node:generate_3d.config.texture_steps` |
| `sparse_structure_steps` | `node:generate_3d.config.sparse_structure_steps` |
| `sampler` | `node:generate_3d.config.sampler` |
| `generate_texture_slat` | `node:generate_3d.config.generate_texture_slat` |
| `emit_preview` | `node:generate_3d.config.emit_preview` |
| `emit_glb` | `node:generate_3d.config.emit_glb` |
| `texture_size` | `node:generate_3d.config.texture_size` |

## UI Guidance

MVP generated recipe UI should expose:

- image artifact picker/dropzone with multi-image support
- runtime/model status
- generate/cancel
- progress timeline
- preview video/images
- output artifact list
- metadata summary
- advanced settings drawer

Advanced groups:

- Model/runtime
- Shape structure
- Detail/shape SLAT
- Texture
- Mesh/export
- Diagnostics

Do not render a marketing page. The first screen should be the usable tool.

## Source To Reuse Or Adapt

High-value source:

- `trellis2/pipelines/trellis2_image_to_3d.py`
- `trellis2/pipelines/trellis2_texturing.py`
- selected `trellis2/models/`, `trellis2/modules/`, `trellis2/representations/`
- selected mesh conversion helpers from `nodes.py`
- `projection/texture_projection_multiview.py` only for later projection workflows
- `blackwell_fix.py` only as profile-gated worker workaround/fallback

Avoid as product API:

- ComfyUI node IDs as public operator IDs
- ComfyUI `folder_paths` assumptions
- direct `nodes.py` import in host
- implicit Hugging Face downloads during normal execution
- Blender subprocess rendering in MVP

## Required Refactors

1. Replace ComfyUI `folder_paths.models_dir` with host model artifact directories.
2. Move all environment setup before TRELLIS.2 imports in the worker.
3. Convert implicit downloads into install/validation steps.
4. Add import isolation so missing native wheels fail runtime validation, not host startup.
5. Add worker-local cancellation checks around sampler/export loops.
6. Normalize and validate all config ranges in one place.
7. Make model-family compatibility explicit:
   - FP8 cannot use ReconViaGen in source logic.
   - Pixal3D requires NATTEN/MoGe and does not support every texturing node.
   - ReconViaGen is incompatible with Pixal3D in `Trellis2LoadModel`.
8. Keep Blackwell monkey patches profile-gated and visible in metadata.
9. Add fake runtime that does not import torch.
10. Add artifact-target-only writes.
11. Remove direct product reliance on `.cuda()` calls; route device placement through the worker profile/device.
12. Replace unguarded progress calls with nullable Nexus progress callbacks.
13. Make texture-size and token-cap validation profile-aware.

## Testing Strategy

### Unit/Fake Tests

- operator config validation
- recipe binding target validation
- fake worker handshake/health/list operators
- fake execution writes placeholder artifacts
- cancellation state transitions
- metadata generation
- runtime profile selection rules

### Import/Dependency Smoke

Per real profile:

- import PyTorch and report CUDA
- import `cumesh`, `o_voxel`, `nvdiffrast`, `nvdiffrec_render`, `flex_gemm`
- optionally import `natten`
- import selected `trellis2` pipeline modules without ComfyUI host leakage
- validate model artifact paths
- run a tiny CUDA tensor operation

### Real Runtime Smoke

On target GPU:

- load DINOv3
- load `microsoft/TRELLIS.2-4B`
- preprocess one small image
- run low-step sparse/shape/decode if a smoke mode is feasible
- write metadata
- call `runtime.release_memory`

### Product E2E

- recipe run with one image through fake runtime
- recipe run with multiple images through fake runtime
- cancel during fake run
- validation errors surface as structured recipe/operator errors
- outputs are host artifacts

## Risk Matrix

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Native wheel compatibility | High | Profile-specific wheels, hashes, import smoke, GPU smoke. |
| Model asset sprawl | High | Host-managed model artifacts and validation. |
| ComfyUI import leakage | High | Worker-only imports and direct pipeline adapter. |
| Blackwell instability | High | Experimental profile, no host monkey-patching, metadata flag. |
| OOM/VRAM pressure | High | Preserve low-VRAM loading, tiled decoder, profile caps. |
| Licensing/redistribution | High | Review wheels, TRELLIS.2, Pixal3D, MoGe, VGGT, projection deps. |
| Implicit network downloads | Medium | Disable normal-run downloads; install step owns fetches. |
| Projection/Blender dependency creep | Medium | Defer projection/Blender to later milestone. |
| Schema gap for 3D artifacts | Medium | Use provisional MIME types and document viewer roadmap. |
| Split-stage complexity | Medium | MVP single operator; design worker internals for future split. |

## PRD Acceptance Criteria Draft

- Extension manifest declares `nexus.3d.trellis2`.
- Operator registry includes `trellis2.generate_3d@1.0.0`.
- Fake runtime passes CI without torch/CUDA/models.
- Real runtime profile validates imports and model artifact availability before being marked healthy.
- MVP recipe binds controls only through generic workflow recipe targets.
- Worker writes all outputs to host artifact targets.
- Worker can run without implicit network downloads after install completes.
- Cancellation returns structured cancelled status.
- `runtime.release_memory` is available.
- Metadata records runtime profile, model ids, effective config, GPU info, warnings, and Blackwell patch state.
- Host crates contain no hardcoded TRELLIS.2 extension literals except extension data loading/registration surfaces that already own built-in extension metadata.

## Open Decisions

- Final extension id: `nexus.3d.trellis2` vs `nexus.3d.trellis` with TRELLIS.2 as backend.
- First real platform: Windows cu128 Torch270 vs Linux.
- Whether MVP exposes FP8.
- Whether MVP exposes Pixal3D.
- Whether MVP exposes ReconViaGen.
- Whether MVP emits GLB by default.
- Whether split-stage operators ship in MVP.
- Which wheel bundles can be redistributed.
- Minimum VRAM per profile.
- 3D viewer/custom UI timing.
