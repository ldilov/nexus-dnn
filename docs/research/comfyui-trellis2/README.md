# ComfyUI-Trellis2 Research Dossier

**Last updated:** 2026-06-24

**Source archive:** `C:/Users/lazar/Downloads/ComfyUI-Trellis2-main (1).zip`

**Local extraction:** `.codex/scratch/comfyui-trellis2-main-1/ComfyUI-Trellis2-main`

**Primary NexusDNN decision:** use ComfyUI-Trellis2 as the product reference for a workflow-driven TRELLIS.2 extension.

## Bottom Line

ComfyUI-Trellis2 is a real ComfyUI custom-node package for Microsoft TRELLIS.2. It exposes a concrete node API through `NODE_CLASS_MAPPINGS`, `NODE_DISPLAY_NAME_MAPPINGS`, and 71 node classes with Comfy-style `INPUT_TYPES`, `RETURN_TYPES`, `RETURN_NAMES`, `FUNCTION`, `CATEGORY`, and `OUTPUT_NODE` fields.

For NexusDNN, the right port is not a literal ComfyUI compatibility layer. The right design is a native Nexus extension:

- Rust/host side: manifest, workflow, recipe projection, generic bindings, runtime lease, artifacts, progress, cancellation, validation, and UI integration.
- Python worker side: TRELLIS.2 pipeline loading, CUDA/PyTorch kernels, DINOv3 conditioning, sparse/SLAT sampling, mesh/voxel conversion, texturing, rendering, and optional projection helpers.
- Product surface: a smaller `trellis2.generate_3d@1.0.0` operator for MVP, with future split-stage operators that mirror the useful Comfy graph boundaries.

## Documents

| Document | Purpose |
| --- | --- |
| [Architecture And Runtime](architecture-and-runtime.md) | ComfyUI-Trellis2 runtime layout, model loading, generation stages, dependency/runtime profile notes. |
| [ComfyUI TRELLIS.2 Node Surface](comfyui-trellis2-node-surface.md) | ComfyUI registration API, node families, key parameters, dependency/runtime implications, and porting conclusions. |
| [Nexus Porting Notes](nexus-porting-notes.md) | TRELLIS.2 porting plan for Rust host plus Python workers. |
| [Integration And Optimization Review](integration-optimization-review.md) | Careful review of Nexus integration points plus brainstormed performance, quality, VRAM, GC, and reliability improvements. |
| [PRD: TRELLIS.2 3D Workflow Extension](prd-trellis-3d-workflow-extension.md) | Product requirements document grounded in this dossier and the workflow-driven recipe contracts. |

## Primary Findings

1. **The API surface is ComfyUI node registration, not HTTP.**
   - `__init__.py` imports `NODE_CLASS_MAPPINGS` and `NODE_DISPLAY_NAME_MAPPINGS`.
   - `nodes.py` registers 71 nodes under the `Trellis2Wrapper` category.
   - Node classes expose `INPUT_TYPES`, `RETURN_TYPES`, `RETURN_NAMES`, `FUNCTION`, `CATEGORY`, and often `OUTPUT_NODE`.
   - Caveat: `__init__.py` lists `WEB_DIRECTORY` in `__all__`, but no `WEB_DIRECTORY` definition was found in the archive.

2. **TRELLIS.2 has a broad model/runtime surface.**
   - Loadable model choices: `microsoft/TRELLIS.2-4B`, `visualbruno/TRELLIS.2-4B-FP8`, and `TencentARC/Pixal3D-T`.
   - Required DINO model: `facebook/dinov3-vitl16-pretrain-lvd1689m`.
   - Auxiliary model/dependency paths include `microsoft/TRELLIS-image-large`, `Stable-X/trellis-vggt-v0-2`, `Ruicheng/moge-2-vitl`, ReconViaGen/VGGT, Pixal3D, and optional NATTEN.

3. **The node graph is richer than one image-to-3D call.**
   - Monolithic generation nodes exist for simple workflows.
   - Split-stage nodes expose image conditioning, sparse structure sampling, shape SLAT, shape cascade, texture SLAT, and latent decoding.
   - Separate nodes handle texturing, high-to-low poly projection, multiview rendering, mesh loading/export, simplification, remeshing, hole filling, image/video utilities, and CUDA/model cleanup.

4. **Dependencies are not complete just from `requirements.txt`.**
   - `requirements.txt` lists only `meshlib`, `requests`, `pymeshlab`, `opencv-python`, `scipy`, `open3d`, `plotly`, and `rembg`.
   - Actual runtime imports require heavy native packages such as PyTorch, ComfyUI, `cumesh`, `o_voxel`, `nvdiffrast`, `nvdiffrec_render`, `flex_gemm`, optional `natten`, plus model weights.
   - The archive includes many wheels under `wheels/`, but they need profile validation, hashes, provenance, and license review before product use.

5. **Blackwell support is actionable but should be an explicit runtime profile.**
   - The archive includes Windows Torch 2.10.0 / CUDA 13.1 wheels and a `blackwell_fix.py` workaround for `sm_120` GPUs.
   - The workaround monkey-patches CUDA capability detection and some kernels, so it should not run in the Nexus host process.
   - Product policy should prefer worker-local runtime profiles and native CUDA 13.1 validation over hidden global monkey-patches.

6. **The port needs a first-class memory and progress design.**
   - Sparse sampling allocates dense 5D noise before sparse extraction, cascade modes are token-limited, and texture postprocessing allocates texture-size CUDA buffers.
   - The source mixes `gc.collect()`, `torch.cuda.empty_cache()`, `torch.cuda.synchronize()`, Comfy cache helpers, and direct `.cuda()` calls.
   - Nexus should centralize cleanup in a worker memory service, add sampler-loop progress/cancellation hooks, and profile-gate texture size, token count, and cascade resolution.

## Dossier Answer To The User Questions

| Question | Finding |
| --- | --- |
| What API surface does the Comfy plugin expose? | A ComfyUI custom-node surface: `NODE_CLASS_MAPPINGS`, `NODE_DISPLAY_NAME_MAPPINGS`, and node classes with `INPUT_TYPES`, `RETURN_TYPES`, `RETURN_NAMES`, `FUNCTION`, `CATEGORY`, and `OUTPUT_NODE`. It does not expose a product-grade HTTP API. |
| Can we port it to Rust plus Python workers? | Yes, but not by porting node classes one-for-one into Rust. Rust should own the generic Nexus extension/workflow/runtime/artifact contract; Python workers should own TRELLIS.2 execution and native CUDA dependencies. |
| Do we have all necessary dependencies? | No. The archive includes many local wheels, but model weights, DINOv3, TRELLIS-image-large decoder files, optional MoGe/ReconViaGen/Pixal3D assets, Blender/video tooling, wheel hashes/provenance, and per-profile lockfiles still need a product install plan. |
| Should we try newer Blackwell-compatible CUDA? | Yes as an explicit experimental profile, not as MVP default. Start with the README-tested Windows Python 3.11 + Torch 2.7.0 + cu128 profile, then validate Blackwell with either Torch 2.8 Blackwell/NATTEN wheels or Torch 2.10/CUDA 13.1 wheels. |
| Integration points with current NexusDNN? | Built-in extension manifest, backend runtime profiles, Python worker protocol, operator definitions, host artifact targets, progress/cancel events, `runtime.release_memory`, generated recipe UI, optional later custom 3D viewer. |
| Integration with workflow-driven NexusDNN? | Ship canonical workflow and recipe projection data using generic `input:<name>` and `node:<node_id>.config.<path>` bindings from `docs/superpowers/plans/2026-06-23-recipes-00-CONTRACTS.md`; keep TRELLIS.2 literals inside extension data, not host crates. |

## Recommended Product Shape

```text
extension id:     nexus.3d.trellis2
primary operator: trellis2.generate_3d@1.0.0
```

MVP behavior:

- input image or image set
- model/runtime profile selection
- seed and sampler controls
- optional texture SLAT generation
- optional GLB export
- preview artifacts
- metadata and diagnostics
- cancellation and memory release

Advanced/future behavior:

- split-stage graph operators mirroring the Comfy nodes
- Pixal3D mode with MoGe camera configuration
- ReconViaGen/VGGT sparse generation
- projection texturing and multiview rendering
- dedicated Blackwell profile
- optional custom model viewer UI

## Evidence Map

- `__init__.py` - ComfyUI entry point importing node mappings.
- `pyproject.toml` - package metadata and declared light dependencies.
- `README.md` - install notes, model requirements, changelog, tested runtime, NATTEN/Pixal3D/Blackwell notes.
- `requirements.txt` - incomplete light dependency list.
- `nodes.py` - 71-node ComfyUI surface, model loader, generation, split stages, mesh processing, texturing, projection, utilities.
- `blackwell_fix.py` - Blackwell workaround and voxel-to-mesh fallback.
- `reconviagen_pipeline.json` - alternate pipeline config for ReconViaGen.
- `trellis2/pipelines/trellis2_image_to_3d.py` - TRELLIS.2 image-to-3D pipeline, DINOv3, MoGe/Pixal3D, cascade sampling, multiview sampling, decode.
- `trellis2/pipelines/trellis2_texturing.py` - mesh texturing pipeline using nvdiffrast/flex_gemm.
- `projection/texture_projection_multiview.py` - multiview texture projection path.
- `projection/blender_render.py` - Blender rendering helper.
- `moge/`, `vggt/` - vendored auxiliary model code.
- `example_workflows/` - concrete ComfyUI workflow JSONs.
- `wheels/` - native wheel bundles for Windows/Linux, multiple Torch/Python/CUDA combinations.

## Open PRD Decisions

- Is Windows Python 3.11 + Torch 2.7.0 + cu128 the first real profile, or should Linux be first?
- Should the extension id be permanently `nexus.3d.trellis2`, or should Nexus use `nexus.3d.trellis` with a `trellis2` backend family?
- Which TRELLIS.2 model is MVP default: Microsoft 4B only, FP8 optional, or Pixal3D hidden until P1?
- Should texture SLAT and GLB export be default-on, or should MVP default to mesh/preview and make GLB export a separate output option?
- Should split-stage operators ship in MVP or remain a future power-user workflow?
- Which native wheels are redistributable, and which must be built during install?
- What minimum VRAM is honest for each runtime profile?
- Can current Nexus artifact schemas represent multi-image input and 3D artifacts cleanly, or do we need provisional MIME types?
- What cleanup level should run after normal completion versus OOM/cancel/runtime release?
- Should low-VRAM profiles default texture SLAT off or keep it on with lower texture caps?
