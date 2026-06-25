# Trellis2 Extension — DEFINE (scope + phase DAG)

> Double Diamond Define phase for porting Microsoft TRELLIS (image/text → 3D) into a nexus-dnn
> builtin extension. Synthesized from 4 Discover sources (3 Claude codebase subagents + codex
> gpt-5.5 external brief) over the PRD, porting notes, upstream `nodes.py`/`blackwell_fix.py`,
> and the svi2-pro / emotion-tts reference extensions. Scope: **Full system**, Focus:
> **Architecture / Performance / UX**.

## 1. Problem statement (reframed)

Give nexus-dnn a first-party, local, GPU-accelerated **image→3D mesh** capability (text→3D as a
follow-on) that runs on the live GB10 Spark, served and rendered entirely inside an extension,
respecting the host↔extension boundary. The ComfyUI-Trellis2 project is the **reference
implementation**, not the thing we ship.

## 2. MVP scope

### IN (MVP)
- Single operator `trellis2.generate_3d@1.0.0` (image→3D). Internal worker stages: preprocess →
  DINOv3 condition → sparse structure → shape SLAT 512 → (optional cascade 1024) → (optional
  texture SLAT) → decode → voxel→mesh → cleanup (fill_holes / keep_only_shell / optional simplify)
  → **GLB** export + metadata JSON.
- Quality presets mapping to the canonical example workflows: `MeshOnly`, `MeshOnly_LowPoly`,
  `MeshOnly_HighQuality(_NoCascade)`, `MeshWithTexturing(_LowPoly)`.
- Two runtime profiles: **`fake`** (no torch, CI/dev) and **GB10 `cuda13-aarch64`** (the real target).
- Recipe + DAG UI in the extension web bundle, with a **3D GLB viewer** (`<model-viewer>` or Three.js
  GLTFLoader), progress/Stop, downloads.
- `runtime.release_memory` + cooperative cancellation in sampler loops.
- Artifacts (GLB/PLY/preview/metadata) via the **generic host artifact store**; served via the
  extension's own `/api/v1/extensions/<id>/media/...` route.

### OUT (deferred — P1/P2, design seams kept)
- ComfyUI graph compatibility / all 71 node registrations.
- Public split-stage operators (`encode_image_condition`, `sample_sparse_structure`, …).
- FP8 quantized model, Pixal3D, MoGe, ReconViaGen/VGGT, multiview.
- Projection texturing, high→low poly projection, Blender render, nvdiffrast preview render.
- Advanced mesh toolbox (remesh/quad/batch/progressive simplify).
- A Windows x86 cu128 profile (useful as known-good *reference* only; not a deliverable here).

## 3. Operator contract — `trellis2.generate_3d@1.0.0` (draft)

Inputs: `image` (artifact ref, required) | `seed` | `preset` (enum) | `generate_texture` (bool) |
`use_cascade` (bool) | `sparse_steps` / `shape_steps` / `texture_steps` | `simplify_target` (opt) |
`residency` (low_vram/balanced/resident, **profile-gated**). Text→3D is P1 (needs a text encoder
path; keep the input seam).

Outputs: `mesh_glb` (artifact, `model/gltf-binary`), optional `preview_png`, `metadata_json`
(timings, GPU/profile, which mesh path + attention backend used, fallbacks triggered).

Caps are **profile-gated**, not raw user knobs: `max_num_tokens`, sparse resolution, `texture_size`
(default 1024, hard-cap 2048 on Blackwell), tiled decoder default-on.

## 4. Runtime / GB10 strategy (the make-or-break)

- GB10 = aarch64 + Blackwell **sm_121** + unified memory. Upstream native wheels are x86 → must be
  **built/validated for aarch64+sm_121**: `spconv`, `flex_gemm`, `cumesh`, `o_voxel`, optionally
  `nvdiffrast` (skip for MVP), flash-attn (skip — default SDPA).
- Apply `blackwell_fix` semantics **inside the worker, before TRELLIS imports**: compute-cap spoof
  → (9,0); `ATTN_BACKEND=sdpa`; `SPARSE_CONV_BACKEND=spconv`; `PYTORCH_CUDA_ALLOC_CONF=expandable_segments:True`;
  flex_gemm Triton→torch fallback; **CPU voxel→mesh fallback** mandatory (CuMesh broken on Blackwell).
- Reuse svi2-pro GB10 lessons: cu13x torch, `attention_backend.py` conditional gating, `vram.py`
  memory tracking, fp8 row-wise scaling (fp8 itself deferred).
- **Every native dep is a runtime-health fact**, not an app error: import smoke + minimal GPU-kernel
  smoke recorded in profile health. A profile that fails smoke is `NotSatisfied`, not a crash.

## 5. Phase DAG (with parallel tags)

```
P0  GB10 NATIVE-DEP SPIKE  ........ [CRITICAL PATH, blocks real runtime]  (serial, do first)
       └─ proves torch/spconv/flex_gemm/cumesh/o_voxel import + kernel smoke + 1 low-step render→GLB on GB10

After P0 unblocks, these run in PARALLEL:
  P1  Rust shim skeleton  .......... [∥ A] (manifest, crate, register in nexus-builtins, routes, storage)
  P2  Python worker + pipeline  .... [∥ B] (RPC, stage pipeline, blackwell shims, fake backend, release_memory)
  P3  Web UI + 3D viewer  .......... [∥ C] (recipe/DAG views, model-viewer, progress/Stop, downloads)
  P4  Model-artifact + install  .... [∥ D] (manifest model_artifact decls, Foundry wiring, GB10 weights)

Converge:
  P5  Wire-up + fake E2E  .......... (depends on P1+P2+P3 contracts; fake backend green end-to-end)
  P6  GB10 real E2E + perf/VRAM  ... (depends on P0+P5; real render on Spark, idle release, deploy)
  P7  Deliver: review + boundary + tests + deploy dgx-fixNN
```

Parallelizable: **P1 ∥ P2 ∥ P3 ∥ P4** once P0 proves feasibility and the operator/RPC/artifact
**contracts are frozen** (a thin "P0.5 contract freeze" gates the fan-out). Serial spine:
P0 → contracts → (fan-out) → P5 → P6 → P7.

## 6. Top risks → de-risk

| Risk | Sev | De-risk |
|---|---|---|
| GB10 aarch64/sm_121 native deps don't build/run | CRIT | **P0 spike first**; record per-dep health; CPU fallbacks |
| CuMesh mesh extraction broken on Blackwell | HIGH | CPU voxel→mesh fallback mandatory (blackwell_fix port) |
| VRAM/unified-memory OOM on big texture/cascade | HIGH | profile-gate caps, tiled decoder, stage-handoff cleanup, memory governor |
| Boundary violations (ext-id in host, host migrations) | HIGH | ext_trellis2__ tables in ext dir; viewer in ext bundle; nexus-builtins sole bridge; grep gate |
| Model sprawl / implicit HF downloads at runtime | MED | declare model_artifact; no network in worker; pre-install gates health |
| Contract churn breaking the parallel fan-out | MED | freeze operator/RPC/artifact contracts before P1-P4 start |

## 7. Open questions for the gate
1. GB10-first vs fake-first ordering — is a contract-freeze enough to safely fan out before P0 proves on hardware?
2. Texture SLAT in MVP or strictly P1? (VRAM cost vs demo value)
3. Single monolithic operator vs 2 (generate + texture) even for MVP?
