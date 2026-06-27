# PRD: TRELLIS.2 3D Workflow Extension For NexusDNN

**Date:** 2026-06-24

**Status:** Draft PRD from local dossier review

**Owner:** NexusDNN product/engineering

**Working extension id:** `nexus.3d.trellis2`

**Primary operator:** `trellis2.generate_3d@1.0.0`

## 1. Purpose

Build a native NexusDNN workflow-driven extension that turns one or more input images into a 3D asset using Microsoft TRELLIS.2-style image-to-3D generation.

The feature must:

- use Nexus extension, runtime, worker, artifact, workflow, and recipe contracts
- keep host crates generic
- run heavy TRELLIS.2/PyTorch/CUDA/mesh logic inside Python workers
- expose a simple MVP image-to-3D operator
- preserve a path to future split-stage operators inspired by the ComfyUI node graph

The source is `ComfyUI-Trellis2-main (1).zip`, a real ComfyUI custom-node wrapper for TRELLIS.2.

## 2. Findings Basis

Local research documents:

| Reference | Role |
| --- | --- |
| `docs/research/comfyui-trellis2/README.md` | Dossier index, key findings, decision summary. |
| `docs/research/comfyui-trellis2/architecture-and-runtime.md` | ComfyUI-Trellis2 runtime architecture and dependency profile. |
| `docs/research/comfyui-trellis2/comfyui-trellis2-node-surface.md` | ComfyUI-Trellis2 registration API, 71-node surface, dependencies, Blackwell notes. |
| `docs/research/comfyui-trellis2/nexus-porting-notes.md` | TRELLIS.2 porting plan and Rust/Python split. |
| `docs/research/comfyui-trellis2/integration-optimization-review.md` | Integration brainstorm and performance, quality, VRAM, GC, and reliability recommendations. |
| `docs/superpowers/plans/2026-06-23-recipes-00-CONTRACTS.md` | Workflow-driven recipe contracts used by this PRD. |

Primary inspected source files:

| Source path | Evidence |
| --- | --- |
| `.codex/scratch/comfyui-trellis2-main-1/ComfyUI-Trellis2-main/__init__.py` | ComfyUI entry point. |
| `.codex/scratch/comfyui-trellis2-main-1/ComfyUI-Trellis2-main/nodes.py` | 71 registered nodes and main node behavior. |
| `.codex/scratch/comfyui-trellis2-main-1/ComfyUI-Trellis2-main/pyproject.toml` | Package metadata and declared dependencies. |
| `.codex/scratch/comfyui-trellis2-main-1/ComfyUI-Trellis2-main/requirements.txt` | Minimal/incomplete dependency list. |
| `.codex/scratch/comfyui-trellis2-main-1/ComfyUI-Trellis2-main/README.md` | Runtime notes, model requirements, changelog, wheels, Pixal3D/NATTEN/Blackwell references. |
| `.codex/scratch/comfyui-trellis2-main-1/ComfyUI-Trellis2-main/blackwell_fix.py` | Blackwell compatibility workaround and voxel-to-mesh fallback. |
| `.codex/scratch/comfyui-trellis2-main-1/ComfyUI-Trellis2-main/trellis2/pipelines/trellis2_image_to_3d.py` | TRELLIS.2 pipeline internals. |
| `.codex/scratch/comfyui-trellis2-main-1/ComfyUI-Trellis2-main/trellis2/pipelines/trellis2_texturing.py` | Mesh texturing pipeline. |
| `.codex/scratch/comfyui-trellis2-main-1/ComfyUI-Trellis2-main/projection/` | Projection texturing and Blender rendering helpers. |
| `.codex/scratch/comfyui-trellis2-main-1/ComfyUI-Trellis2-main/example_workflows/` | ComfyUI workflow examples. |
| `.codex/scratch/comfyui-trellis2-main-1/ComfyUI-Trellis2-main/wheels/` | Native wheel evidence for multiple runtime profiles. |

## 3. Problem Statement

NexusDNN needs a workflow-native image-to-3D feature that can generate durable 3D artifacts from images while respecting host-owned runtime, artifact, workflow, recipe, progress, cancellation, and UI contracts.

The ComfyUI-Trellis2 source demonstrates a useful TRELLIS.2 graph surface, but it is not product-ready for Nexus as-is:

- it is tied to ComfyUI runtime modules and `folder_paths`
- it imports heavy CUDA/mesh packages at module import time
- it implicitly downloads models from Hugging Face when missing
- its dependency list is incomplete
- its local wheels need profile validation, hashes, provenance, and license review
- Blackwell support relies partly on monkey patches
- it exposes too many nodes for an MVP product surface

The product must compress this into a small, typed, workflow-driven Nexus extension while preserving the ability to grow into advanced split-stage workflows later.

## 4. Goals

1. Provide image-to-3D generation from one image.
2. Support multiple input images for one final 3D asset where runtime/model mode allows it.
3. Produce durable host artifacts such as GLB, preview media, processed inputs, metadata, and diagnostics.
4. Provide a fake runtime for CI, frontend work, and recipe validation.
5. Provide at least one real CUDA runtime profile.
6. Use host-managed model/dependency installation with no implicit network downloads during normal execution.
7. Expose meaningful progress phases and cooperative cancellation.
8. Support `runtime.release_memory`.
9. Ship a canonical workflow and recipe projection aligned with the workflow-driven recipe contracts.
10. Keep all TRELLIS.2 specifics inside extension data and worker code, not generic host crates.

## 5. Non-Goals For MVP

1. Do not implement general ComfyUI graph compatibility.
2. Do not expose all 71 ComfyUI nodes as public Nexus operators.
3. Do not mount a separate FastAPI server for generation.
4. Do not ship a ComfyUI UI or node graph as the Nexus product UI.
5. Do not support text-to-3D.
6. Do not support training or dataset preparation.
7. Do not support full projection/Blender rendering workflows unless explicitly promoted.
8. Do not make Blackwell/CUDA 13.1 the default real runtime before profile validation.
9. Do not enable worker monkey patches in the host process.
10. Do not silently download model weights during normal execution.

## 6. Product Decision Summary

| Question | Decision |
| --- | --- |
| What API surface does the Comfy plugin expose? | ComfyUI node registration: `NODE_CLASS_MAPPINGS`, `NODE_DISPLAY_NAME_MAPPINGS`, and 71 node classes with `INPUT_TYPES`, `RETURN_TYPES`, `RETURN_NAMES`, `FUNCTION`, `CATEGORY`, and `OUTPUT_NODE`. |
| Do we port ComfyUI directly? | No. Use ComfyUI nodes as source semantics and compress them into Nexus operators/recipes. |
| Can we port it to Rust plus Python workers? | Yes. Rust/host owns generic extension/runtime/workflow/artifact contracts. Python worker owns TRELLIS.2, CUDA, DINOv3, mesh, texturing, and rendering. |
| Do we have all dependencies? | No. Native wheels exist in the archive, but models, DINOv3, decoder files, optional MoGe/VGGT/Pixal3D/ReconViaGen assets, lockfiles, provenance, and profile validation are still required. |
| Should we try newer Blackwell-compatible CUDA? | Yes, but as an experimental profile. MVP should first validate the README-tested Windows Python 3.11 + Torch 2.7.0 + cu128 profile. |
| Integration with current NexusDNN? | Built-in extension manifest, backend runtime profiles, Python worker, operator definition, host artifact targets, progress/cancel events, generated recipe UI, optional later custom viewer. |
| Integration with workflow-based NexusDNN? | Ship workflow and recipe projection using generic bindings from `docs/superpowers/plans/2026-06-23-recipes-00-CONTRACTS.md`. |

## 7. Target Users

1. Creators generating 3D assets from object/product photos.
2. Technical artists producing GLB assets for downstream tools.
3. Workflow authors composing image-to-3D inside larger NexusDNN workflows.
4. Developers validating runtime and UI behavior through a deterministic fake profile.
5. Advanced users who may later need split-stage control over sparse/SLAT/texturing stages.

## 8. MVP User Flows

### 8.1 Single Image To 3D Asset

1. User opens the TRELLIS.2 Image to 3D recipe.
2. User selects or uploads one image artifact.
3. User optionally adjusts seed, quality preset, pipeline type, sampler, texture/export options.
4. User runs the recipe.
5. Host compiles the recipe run through workflow-driven contracts.
6. Host leases the selected runtime.
7. Worker preprocesses the image, runs TRELLIS.2, writes artifacts, and emits progress.
8. UI shows preview/output artifacts and metadata.

### 8.2 Multi-Image To 3D Asset

1. User selects multiple images of the same object.
2. User chooses a multiview or standard multi-image mode where supported.
3. Worker conditions on multiple images.
4. Worker returns one final asset plus metadata.

### 8.3 Preview-First Output

1. User enables preview output.
2. Worker emits preview video/images plus metadata.
3. If GLB export is enabled, worker also writes GLB.
4. If GLB export is disabled, the run is preview-only and can be rerun later with GLB enabled.

MVP should not promise durable resume from preview unless a split intermediate artifact format is explicitly implemented.

### 8.4 Cancel Long Run

1. User cancels during model load, sampling, decoding, mesh cleanup, rendering, or export.
2. Host sends worker cancellation.
3. Worker checks cancellation cooperatively and returns a structured cancelled status.
4. Partial artifacts are not marked complete.

### 8.5 Release VRAM

1. User or host calls `runtime.release_memory`.
2. Worker unloads/moves models as available, clears CUDA cache, and returns memory stats where possible.

## 9. Source Surface To Preserve As Semantics

### 9.1 ComfyUI Node Surface

The source exposes these broad node families:

| Family | Important nodes | Product treatment |
| --- | --- | --- |
| Runtime/model | `Trellis2LoadModel`, `Trellis2UnloadAllModels`, `Trellis2CudaReset` | Map to runtime profile/model setup and `runtime.release_memory`. |
| Monolithic generation | `Trellis2MeshWithVoxelGenerator`, `Trellis2MeshWithVoxelAdvancedGenerator`, `Trellis2MeshWithVoxelCascadeGenerator`, `Trellis2MeshWithVoxelMultiViewGenerator` | Main semantic source for `trellis2.generate_3d`. |
| Split-stage generation | `Trellis2ImageCondGenerator`, `Trellis2SparseGenerator`, `Trellis2ShapeGenerator`, `Trellis2ShapeCascadeGenerator`, `Trellis2TexSlatGenerator`, `Trellis2DecodeLatents` | Internal worker stage boundaries; future public operators. |
| Multiview/Pixal3D/ReconViaGen | multiview nodes, `Trellis2MoGeCameraConfig`, `Trellis2SparseGeneratorWithReconViaGen` | P1/P2 advanced modes. |
| Mesh and export | simplify, remesh, fill holes, convert, export nodes | Use selected helpers for MVP output, defer full mesh tool suite. |
| Texturing/projection/rendering | `Trellis2MeshTexturing`, `Trellis2MultiViewTexturing`, `Trellis2RenderMultiViewNvdiffrast`, Blender render helper | Defer advanced projection/Blender workflows. |

### 9.2 Pipeline Primitives

Worker should adapt these Python primitives:

| Primitive | Product use |
| --- | --- |
| `Trellis2ImageTo3DPipeline.from_pretrained` | Load from host model artifact paths. |
| `preprocess_image` | Image preprocessing stage. |
| `get_cond` | DINOv3 image conditioning. |
| `sample_sparse_structure` | Sparse coordinate generation. |
| `sample_shape_slat` / cascade variants | Shape latent generation. |
| `sample_tex_slat` | Texture latent generation. |
| `decode_latent` | MeshWithVoxel output. |
| multiview sampling variants | Later multiview mode. |
| `Trellis2TexturingPipeline` | Later existing-mesh texturing. |

## 10. Extension Architecture

### 10.1 Package Shape

```text
extensions/builtin/trellis2-3d/
|-- manifest.yaml
|-- operators/
|   `-- generate_3d.yaml
|-- workflows/
|   `-- image_to_3d.yaml
|-- recipes/
|   `-- image_to_3d.yaml
|-- ui/
|   `-- layouts/main.yaml
|-- web/
|   `-- dist/                  # optional later custom model viewer
|-- worker/
|   |-- pyproject.toml
|   |-- uv.lock
|   |-- src/trellis2_worker/
|   |   |-- __main__.py
|   |   |-- worker.py
|   |   |-- pipeline.py
|   |   |-- models.py
|   |   |-- profiles.py
|   |   |-- mesh.py
|   |   |-- texturing.py
|   |   |-- artifacts.py
|   |   |-- cancellation.py
|   |   `-- fake_pipeline.py
|   `-- tests/
|-- vendor/
|   |-- trellis2/
|   |-- moge/                   # optional
|   |-- vggt/                   # optional
|   `-- projection/             # optional
`-- backends/
    |-- fake/versions.yaml
    |-- cuda128-win-torch270/versions.yaml
    |-- cuda128-linux-torch270/versions.yaml
    `-- cuda131-win-torch2100/versions.yaml
```

### 10.2 Host Responsibilities

Nexus host owns:

- manifest validation
- operator registration
- workflow/recipe storage and validation
- runtime profile installation/lease
- dependency/model install orchestration
- artifact storage and target paths
- run status/events
- cancellation routing
- generated recipe UI and optional custom UI mounting
- security boundary and file access policy

### 10.3 Worker Responsibilities

TRELLIS.2 worker owns:

- profile-local environment setup before imports
- dependency import validation
- model artifact path validation
- image loading/validation at worker boundary
- TRELLIS.2 pipeline load/unload
- DINOv3 conditioning
- sparse/shape/texture sampling
- mesh decode/conversion/export
- preview rendering
- metadata/diagnostic writing
- cancellation checks
- `runtime.release_memory`

## 11. Operator Contract

### 11.1 Identity

```text
trellis2.generate_3d@1.0.0
```

### 11.2 Inputs

| Input | Type | Required | Notes |
| --- | --- | --- | --- |
| `images` | `array<artifact:image>` | yes | One or more object images. If schema support is limited, use one required image plus optional image ports for MVP. |

### 11.3 Outputs

| Output | Type | Required | Notes |
| --- | --- | --- | --- |
| `model_glb` | `model/gltf-binary` | optional | Present when `emit_glb=true`. |
| `preview_mp4` | `video/mp4` | optional | Present when preview video rendering is enabled. |
| `preview_images` | `array<image/png>` | optional | Present for multiview/Nvdiffrast render output if enabled. |
| `mesh_artifact` | provisional 3D mesh type | optional | Mesh/PLY/OBJ/GLB depending on chosen export support. |
| `processed_inputs` | `array<image/png>` | optional | Preprocessed/cropped images. |
| `metadata_json` | `application/json` | yes | Effective settings, runtime, model ids, warnings, durations. |
| `diagnostics_json` | `application/json` | optional | Dependency/GPU/kernel diagnostics. |

### 11.4 Config Fields

| Field | Type | Default | Constraints | Binding target |
| --- | --- | ---: | --- | --- |
| `model_family` | enum | `microsoft_trellis2_4b` | MVP may expose only this value | `node:generate_3d.config.model_family` |
| `seed` | integer | `0` | `0..2147483647` | `node:generate_3d.config.seed` |
| `randomize_seed` | boolean | `false` | UI convenience | `node:generate_3d.config.randomize_seed` |
| `pipeline_type` | enum | `1024_cascade` | `512`, `1024`, `1024_cascade`, `1536_cascade` | `node:generate_3d.config.pipeline_type` |
| `sparse_structure_steps` | integer | `12` | `1..100` | `node:generate_3d.config.sparse_structure_steps` |
| `shape_steps` | integer | `12` | `1..100` | `node:generate_3d.config.shape_steps` |
| `texture_steps` | integer | `12` | `1..100` | `node:generate_3d.config.texture_steps` |
| `sparse_structure_guidance` | number | `6.5` | `0..99.99`; presets may use safer caps | `node:generate_3d.config.sparse_structure_guidance` |
| `shape_guidance` | number | `6.5` | `0..99.99` | `node:generate_3d.config.shape_guidance` |
| `texture_guidance` | number | `6.5` | `0..99.99` | `node:generate_3d.config.texture_guidance` |
| `max_num_tokens` | integer | `49152` | profile dependent | `node:generate_3d.config.max_num_tokens` |
| `max_views` | integer | `4` | `1..16` | `node:generate_3d.config.max_views` |
| `sparse_structure_resolution` | integer | `32` | `32..128`, step 4 | `node:generate_3d.config.sparse_structure_resolution` |
| `generate_texture_slat` | boolean | `true` | none | `node:generate_3d.config.generate_texture_slat` |
| `use_tiled_decoder` | boolean | `true` | none | `node:generate_3d.config.use_tiled_decoder` |
| `sampler` | enum | `euler` | `euler`, `heun`, `rk4`, `rk5` | `node:generate_3d.config.sampler` |
| `fill_holes` | boolean | `true` | none | `node:generate_3d.config.fill_holes` |
| `hole_iterations` | integer | `1` | `1..9` | `node:generate_3d.config.hole_iterations` |
| `hole_fill_algorithm` | enum | `flood_fill` | `morphological_closing`, `flood_fill`, `remove_small_holes` | `node:generate_3d.config.hole_fill_algorithm` |
| `keep_only_shell` | boolean | `true` | none | `node:generate_3d.config.keep_only_shell` |
| `emit_preview` | boolean | `true` | none | `node:generate_3d.config.emit_preview` |
| `emit_glb` | boolean | `true` | none | `node:generate_3d.config.emit_glb` |
| `texture_size` | integer | `1024` | `256..4096` by profile | `node:generate_3d.config.texture_size` |
| `emit_diagnostics` | boolean | `false` | none | `node:generate_3d.config.emit_diagnostics` |

Runtime-only or advanced profile fields:

- attention backend: `flash_attn`, `xformers`, `sdpa`, `flash_attn_3`
- sparse attention backend: `xformers`, `flash_attn`
- sparse conv backend: `spconv`, `torchsparse`, `flex_gemm`
- low VRAM
- keep models loaded
- FP8
- Pixal3D
- ReconViaGen
- Blackwell patch

Default policy: keep these in runtime profiles first, not recipe controls.

## 12. Workflow And Recipe Design

### 12.1 Canonical Workflow

```yaml
spec_version: "0.1"

workflow:
  id: "workflow.trellis2.image_to_3d"
  version: "0.1.0"
  title: "TRELLIS.2 Image to 3D"

  inputs:
    - name: "images"
      type: "array<artifact:image>"

  nodes:
    - id: "generate_3d"
      operator: "trellis2.generate_3d@1.0.0"
      inputs:
        images:
          from: "input:images"
      config:
        model_family: "microsoft_trellis2_4b"
        seed: 0
        randomize_seed: false
        pipeline_type: "1024_cascade"
        sparse_structure_steps: 12
        shape_steps: 12
        texture_steps: 12
        sparse_structure_guidance: 6.5
        shape_guidance: 6.5
        texture_guidance: 6.5
        max_num_tokens: 49152
        max_views: 4
        sparse_structure_resolution: 32
        generate_texture_slat: true
        use_tiled_decoder: true
        sampler: "euler"
        fill_holes: true
        hole_iterations: 1
        hole_fill_algorithm: "flood_fill"
        keep_only_shell: true
        emit_preview: true
        emit_glb: true
        texture_size: 1024

  outputs:
    - name: "model_glb"
      from: "generate_3d:model_glb"
    - name: "preview_mp4"
      from: "generate_3d:preview_mp4"
    - name: "metadata_json"
      from: "generate_3d:metadata_json"
```

Exact type strings must be adjusted to current Nexus operator/workflow schema support.

### 12.2 Recipe Projection

Recipe controls must bind only through generic targets:

| Control id | Kind | Target |
| --- | --- | --- |
| `images` | asset | `input:images` |
| `model_family` | enum | `node:generate_3d.config.model_family` |
| `seed` | int | `node:generate_3d.config.seed` |
| `randomize_seed` | bool | `node:generate_3d.config.randomize_seed` |
| `pipeline_type` | enum | `node:generate_3d.config.pipeline_type` |
| `quality_preset` | preset selector | preset data only, not direct node target |
| `sparse_structure_steps` | int | `node:generate_3d.config.sparse_structure_steps` |
| `shape_steps` | int | `node:generate_3d.config.shape_steps` |
| `texture_steps` | int | `node:generate_3d.config.texture_steps` |
| `generate_texture_slat` | bool | `node:generate_3d.config.generate_texture_slat` |
| `sampler` | enum | `node:generate_3d.config.sampler` |
| `emit_preview` | bool | `node:generate_3d.config.emit_preview` |
| `emit_glb` | bool | `node:generate_3d.config.emit_glb` |
| `texture_size` | int | `node:generate_3d.config.texture_size` |
| `emit_diagnostics` | bool | `node:generate_3d.config.emit_diagnostics` |

### 12.3 Contract Alignment

The implementation must align with `docs/superpowers/plans/2026-06-23-recipes-00-CONTRACTS.md`:

- `WorkflowVersionSnapshot` is produced by workflow versioning.
- `ResolvedRun` is emitted by `compile_recipe_run`.
- `ValueSource` records default, preset, and user provenance.
- Binding grammar uses only `input:<name>` and `node:<node_id>.config.<dot.pointer>`.
- `RecipeProjection` stores sections, controls, presets, output, and optional `custom_ui`.
- `RecipeStatus` is the single status name for healthy/outdated/broken.
- Custom UI must submit through `POST /recipes/{id}/run` once available.
- Host crates must not hardcode TRELLIS.2-specific literals.

## 13. Runtime Profiles

### 13.1 Required MVP Profiles

| Runtime id | Purpose | Requirement |
| --- | --- | --- |
| `nexus.3d.trellis2.fake` | CI/dev/runtime-independent testing | No torch, CUDA, native wheels, or model weights. Writes deterministic placeholder artifacts and metadata. |
| `nexus.3d.trellis2.cuda128-win-torch270` | First real runtime candidate | Windows, Python 3.11, Torch 2.7.0 + cu128, native wheels validated from archive or trusted source. |

### 13.2 Follow-Up Profiles

| Runtime id | Purpose | Notes |
| --- | --- | --- |
| `nexus.3d.trellis2.cuda128-linux-torch270` | Linux real runtime | Archive includes Linux Torch270 wheels; must validate independently. |
| `nexus.3d.trellis2.cuda128-win-torch280` | Newer Windows profile | Candidate for Pixal3D/NATTEN and Blackwell-adjacent testing. |
| `nexus.3d.trellis2.cuda131-win-torch2100` | Experimental Blackwell/CUDA 13.1 | Use only after import/GPU smoke on target hardware. |

### 13.3 CUDA/Blackwell Decision

MVP should not jump straight to CUDA 13.1 as default.

Decision:

1. Build fake runtime first.
2. Validate Windows Torch 2.7.0 + cu128 real profile because the README states that stack was tested.
3. Add native dependency import smoke and minimal CUDA smoke.
4. Add Blackwell detection and clear error messages for unsupported profile/GPU combinations.
5. Add `cuda131-win-torch2100` as an experimental profile after cu128 validation.
6. If `blackwell_fix.py` is used, apply it only inside the Python worker, before TRELLIS.2 imports, and record it in metadata.

## 14. Dependency Requirements

### 14.1 Must Not Use Source `requirements.txt` As A Lockfile

`requirements.txt` is incomplete. It omits PyTorch/CUDA, ComfyUI runtime modules, native mesh/render packages, and model assets. Use profile-specific `pyproject.toml` and lockfiles.

### 14.2 Core Python Packages

MVP real profile should include pinned versions for:

- PyTorch / torchvision / torchaudio
- Hugging Face Hub
- safetensors
- rembg and its model cache if background removal is enabled
- numpy, scipy, scikit-image
- trimesh
- opencv-python or opencv-python-headless
- pymeshlab
- open3d
- meshlib
- pillow
- imageio/imageio-ffmpeg if MP4 preview is used

### 14.3 Native Packages

Validate per profile:

- `cumesh`
- `o_voxel`
- `nvdiffrast`
- `nvdiffrec_render`
- `flex_gemm`
- `custom_rasterizer` if used
- `natten` for Pixal3D

Each wheel must have:

- exact filename and platform tag
- hash
- source/provenance
- license/redistribution status
- compatible Python/Torch/CUDA profile
- import smoke result
- GPU smoke result where applicable

### 14.4 Model Artifacts

MVP model install must explicitly handle:

| Asset | Required | Notes |
| --- | --- | --- |
| `microsoft/TRELLIS.2-4B` | yes | Default model repo. |
| `facebook/dinov3-vitl16-pretrain-lvd1689m/model.safetensors` | yes | Source raises if absent. |
| `microsoft/TRELLIS-image-large/ckpts/ss_dec_conv3d_16l8_fp16.json` | yes | Non-Pixal3D sparse decoder config. |
| `microsoft/TRELLIS-image-large/ckpts/ss_dec_conv3d_16l8_fp16.safetensors` | yes | Non-Pixal3D sparse decoder weights. |
| `visualbruno/TRELLIS.2-4B-FP8` | optional | FP8 follow-up. |
| `TencentARC/Pixal3D-T` | optional | Pixal3D follow-up. |
| `Ruicheng/moge-2-vitl/model.pt` | optional | Pixal3D/MoGe follow-up. |
| `Stable-X/trellis-vggt-v0-2` assets | optional | ReconViaGen follow-up. |
| rembg/u2net cache | optional/required by preprocessing mode | Install if background removal is default-on. |

## 15. Worker Design

### 15.1 Protocol

Use the current Nexus Python worker protocol and support:

- `handshake`
- `health`
- `list_operators`
- `validate_config`
- `execute`
- `cancel`
- `runtime.release_memory`

### 15.2 Execution Flow

```text
execute trellis2.generate_3d
1. validate request and config
2. resolve host artifacts
3. set runtime-profile environment
4. import real dependencies
5. validate model artifact paths
6. load TRELLIS.2 pipeline
7. preprocess input images
8. run DINOv3 conditioning
9. sample sparse structure
10. sample shape SLAT
11. cascade if requested
12. sample texture SLAT if requested
13. decode latents
14. convert/cleanup/export mesh
15. render preview if requested
16. write GLB if requested
17. write metadata/diagnostics
18. return artifact refs
```

### 15.3 Progress Phases

| Percent | Phase |
| ---: | --- |
| 0 | Accepted and validating |
| 5 | Runtime/profile initialization |
| 10 | Model and dependency validation |
| 15 | Image preprocessing |
| 25 | DINOv3 conditioning |
| 38 | Sparse structure sampling |
| 52 | Shape SLAT sampling |
| 62 | Cascade/high-resolution sampling |
| 70 | Texture SLAT sampling |
| 78 | Latent decoding |
| 84 | Mesh conversion/cleanup |
| 90 | Preview rendering |
| 95 | Artifact writing/export |
| 100 | Complete |

### 15.4 Cancellation

Cancellation must be checked:

- before each expensive phase
- before loading each image
- before and after preprocessing
- inside sparse, shape, cascade, and texture sampler loops
- before decoding
- inside mesh cleanup/remesh/fill-hole loops
- inside render/export loops
- before writing each artifact

The worker should use a thread-safe local cancellation primitive, not ComfyUI assumptions or a global API event.

### 15.5 Memory Management

Preserve low-VRAM behavior:

- load models lazily where possible
- keep inactive models off GPU where possible
- use tiled decoder by default
- clear CUDA cache after major phases where safe
- expose `runtime.release_memory`
- report allocated/reserved/peak memory when available

Additional requirements from the optimization review:

- implement a worker memory service such as `memory_checkpoint(reason, level)`
- support cleanup levels for light, normal, and aggressive cleanup
- reserve aggressive synchronize/cache clearing for OOM, cancellation, profile switch, or explicit runtime release unless profiling proves otherwise
- profile-gate `texture_size`, `pipeline_type`, cascade resolution, and `max_num_tokens`
- make texture SLAT optional and allow low-VRAM profiles to default it off
- avoid retaining every sampler intermediate unless diagnostics are enabled
- guard all CUDA cleanup and direct CUDA calls for fake/CPU validation safety

## 16. UI Requirements

MVP UI should be a generated recipe-first tool surface.

Required UI:

- image artifact picker/dropzone
- multiple image support where schema permits
- runtime/model status
- run and cancel buttons
- progress timeline
- preview player/gallery
- output artifact list
- metadata summary
- advanced settings drawer

Advanced settings groups:

- Model/runtime
- Generation quality
- Sparse structure
- Shape detail
- Texture
- Mesh/export
- Diagnostics

Custom UI is optional and should be deferred until a 3D viewer/custom element is needed. If added, it must submit through the generic recipe run route and not bypass `compile_recipe_run`.

## 17. Artifacts And Metadata

### 17.1 Artifact Types

| Artifact | Extension | Type |
| --- | --- | --- |
| GLB model | `.glb` | `model/gltf-binary` |
| Preview video | `.mp4` | `video/mp4` |
| Preview image | `.png` | `image/png` |
| Mesh/point/voxel output | `.ply`, `.obj`, `.glb` | provisional 3D type if current schema lacks one |
| Processed input | `.png` | `image/png` |
| Metadata | `.json` | `application/json` |
| Diagnostics | `.json` | `application/json` |

### 17.2 Metadata Fields

Metadata must include:

- operator id/version
- extension id/version
- runtime id/profile
- Python/PyTorch/CUDA versions
- GPU name and compute capability
- Blackwell patch applied flag
- model family, repo ids, revisions, local artifact roots
- seed actually used
- all effective config values
- input artifact refs and hashes where available
- output artifact refs
- phase durations
- warnings
- peak/allocated/reserved VRAM where available

## 18. Error Handling

Return structured errors for:

| Error | Category | Retryable |
| --- | --- | --- |
| invalid image artifact | validation | false |
| image too large | validation | false |
| unsupported image count | validation | false |
| unsupported model/profile combination | validation | false |
| missing runtime dependency | dependency | false until install fixed |
| missing model artifact | model | false until install fixed |
| missing DINOv3 | model | false until install fixed |
| CUDA unavailable | runtime | maybe after profile change |
| unsupported GPU compute capability | runtime | maybe after profile change |
| native kernel incompatible | runtime | false for selected profile |
| out of memory | runtime | maybe after lower settings/profile |
| user cancelled | execution | false |
| mesh/export failure | execution | maybe after lower settings |

Do not leak secrets, tokens, full environment dumps, or unrelated local paths.

## 19. Security, Licensing, And Compliance

Required before implementation approval:

1. Review TRELLIS.2 source/model licenses.
2. Review ComfyUI-Trellis2 license and modifications.
3. Review FP8 model license.
4. Review Pixal3D, MoGe, ReconViaGen, and VGGT licenses before enabling those modes.
5. Review native wheel provenance and redistribution rights.
6. Review `nvdiffrast`, `nvdiffrec_render`, `cumesh`, `o_voxel`, `flex_gemm`, `natten`, MeshLib, PyMeshLab, Open3D terms.
7. Avoid runtime `torch.hub` or implicit code downloads.
8. Validate uploaded images by type, bytes, dimensions, and decoded pixel count.
9. Keep worker writes inside host-provided artifact targets.
10. Keep monkey patches worker-local, profile-gated, and visible in metadata.

## 20. Acceptance Criteria

### 20.1 Manifest And Registration

- Extension manifest validates.
- Extension id is `nexus.3d.trellis2` unless product chooses a final alternative.
- Operator registry includes `trellis2.generate_3d@1.0.0`.
- Runtime catalog includes fake profile and at least one real CUDA profile definition.

### 20.2 Fake Runtime

- Fake runtime runs without torch, CUDA, native wheels, or model weights.
- Fake worker supports handshake, health, list operators, validate config, execute, cancel, and `runtime.release_memory`.
- Fake execution writes deterministic placeholder artifacts and metadata.
- Fake runtime can run through the workflow/recipe path in CI.

### 20.3 Real Runtime Install

- Real profile creates an isolated Python environment.
- Profile installs pinned PyTorch/CUDA stack.
- Profile installs or references validated native wheels with hashes/provenance.
- Model artifacts are present before runtime is healthy.
- DINOv3 artifact is present.
- Import smoke validates every required native dependency.
- Minimal CUDA smoke validates device availability and basic kernel operation.

### 20.4 Real Runtime Execution

- Single-image run produces metadata and requested artifacts.
- Multi-image run produces metadata and requested artifacts where enabled.
- Preview-only run can skip GLB export.
- Cancellation returns structured cancelled result.
- No implicit model downloads occur during normal execution.
- No generation-specific FastAPI server is required.
- All outputs are written to host artifact targets.
- Structured progress is emitted from long sampler loops, not only between coarse phases.
- Real execution metadata includes stage durations and available VRAM statistics.
- `runtime.release_memory` performs worker-local cleanup and reports post-release memory state where available.

### 20.5 Workflow/Recipe

- Canonical workflow validates.
- Recipe projection binds controls only through `input:<name>` and `node:<node_id>.config.<path>`.
- Recipe status can be healthy/outdated/broken through host contracts.
- Custom UI, if present later, uses the generic recipe run route.
- Host crates remain generic and do not gain TRELLIS.2-specific business logic.

### 20.6 UX

- UI shows phases for validation, model/dependency check, preprocessing, conditioning, sparse sampling, shape sampling, texture sampling, decode, preview/export, and completion.
- User can cancel a run.
- User can see runtime/profile missing dependency state.
- User can access final artifacts and metadata.

## 21. Milestones

### M0: Dependency, Legal, And Profile Spike

- Decide final extension id.
- Decide first real profile.
- Review licenses and wheel redistributability.
- Build native wheel/profile inventory with hashes.
- Define model artifact list.
- Decide whether to vendor source or pin a fork.

### M1: Extension Skeleton And Fake Runtime

- Manifest, operator YAML, workflow YAML, recipe YAML.
- Fake worker.
- Generated recipe UI.
- CI tests for fake execution and recipe binding.

### M2: Real Runtime Validation

- Profile-specific Python environment.
- Dependency install steps.
- Model artifact install steps.
- Import/GPU smoke.
- Runtime health and `runtime.release_memory`.

### M3: Real Single-Image Execution

- Load TRELLIS.2 from local artifacts.
- Run one image through low-step/smoke and normal path.
- Emit metadata and requested artifacts.
- Add cancellation checks.

### M4: Multi-Image And Output Options

- Multi-image mode.
- Texture toggle.
- Preview output.
- GLB/export options.
- Better diagnostics.

### M5: Advanced Modes

- FP8 profile/model.
- Pixal3D + MoGe.
- ReconViaGen/VGGT.
- Split-stage operators.
- Projection/Nvdiffrast/Blender rendering.
- CUDA 13.1/Blackwell experimental profile.

## 22. Open Questions

1. Is `nexus.3d.trellis2` the final extension id?
2. Is Windows Torch 2.7.0 + cu128 the first real profile, or should Linux be first?
3. Can current schema represent `array<artifact:image>` and provisional 3D artifact types?
4. Should MVP expose FP8 or keep only Microsoft TRELLIS.2-4B?
5. Should MVP include Pixal3D or defer until NATTEN/MoGe validation?
6. Should MVP include ReconViaGen/VGGT?
7. Should GLB export be default-on?
8. What minimum VRAM should each real profile declare?
9. Which wheels can be redistributed?
10. Should split-stage operators ship in MVP or after the single-operator product works?

## 23. Implementation Notes From Findings

1. Set profile environment variables before importing TRELLIS.2 or native CUDA packages.
2. Do not import `nodes.py` in the Nexus host.
3. Prefer adapting `trellis2/pipelines/*` in a Python worker over embedding ComfyUI.
4. Replace `folder_paths.models_dir` with host model artifact roots.
5. Make `microsoft/TRELLIS-image-large` sparse decoder files explicit install assets.
6. Treat DINOv3 as required for MVP.
7. Treat `blackwell_fix.py` as profile-gated worker code only.
8. Record model/runtime/profile details in metadata.
9. Keep stdout worker-protocol clean.
10. Validate all source-derived config ranges in Nexus schema, not in ad hoc node code.
11. Add sampler-loop cancellation/progress hooks before exposing real long-running generation.
12. Replace direct `.cuda()` assumptions with profile-controlled device placement.
13. Keep texture/projection stages behind profile-aware memory caps.
