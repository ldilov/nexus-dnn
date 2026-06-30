# faceavatar — Identity Head (Arc2Avatar + face-graft) builtin extension

Single photo → **identity-preserving 3D head** (Arc2Avatar: FLAME + ArcFace), plus an **identity
face-graft** that welds the likeness face onto an existing base **GLB** so the base mesh supplies
hair / back / body while the face supplies the likeness. Outputs a downloadable **GLB**.

> Operators: `faceavatar.generate_head`, `faceavatar.graft_head` · Extension id: `nexus.3d.faceavatar`

## ⚠️ License — NON-COMMERCIAL

This extension depends on **FLAME** (MPI-IS) and **Arc2Avatar** model assets, which are released
**for non-commercial / research use only**. Generated heads inherit that restriction — **do not use
them in a commercial product**. Review and accept the upstream FLAME and Arc2Avatar licenses before
downloading any weights. The extension ships no weights; the `model_artifact` steps fetch them at
install time (gated, or a SHA-verified non-gated mirror).

## Status: scaffold (GPU bring-up deferred)

This pass is a **boundary-clean, torch-free scaffold with a deterministic `fake` backend** — the same
way the sibling image-to-3D extensions shipped their scaffold before live GB10 bring-up. The `fake`
backend returns a deterministic placeholder GLB + metadata so the rust shim, web UI, params validation,
and storage are fully testable offline. Real Arc2Avatar generation + the seam-weld / texture-blend
graft are `TODO(gpu-spike)` (Arc2Avatar CUDA bring-up on GB10 sm_121: pytorch3d / gaussian-splat
rasterizer / FLAME / insightface from source, vendored sm_121 wheels under `binaries/linux-aarch64/`,
uv `override-dependencies` + `environments` pin — reuse the established GB10 playbook).

## What it does

- **Standalone** (`faceavatar_generate` recipe → `generate_head`) — one photo → identity bust GLB.
  Recognizable **frontal-to-three-quarter** bust; unseen geometry (sides, back, hair, ears) is
  hallucinated. No external generator involved.
- **Head refinement** (`faceavatar_head_refine` recipe → `graft_head`) — pick a base mesh from the
  host's generic 3D-mesh artifact picker **or upload a GLB**, add a photo, set graft knobs (seam,
  keep-hair, blend-ring, align, texture-blend) → identity-grafted head GLB with a before/after
  preview. The base mesh is an **opaque input artifact**: faceavatar never names, imports, or calls
  whatever produced it (e.g. another image-to-3D head — the coupling is purely a host-owned artifact id).

## UI surface (Spectral Graphite)

The web bundle mounts as the `faceavatar-app` custom element under the host's generic
`/extensions/:layoutId` route — a persistent **3D preview stage** (`<model-viewer>`, orbit /
auto-rotate / tone-mapping) paired with the recipe form and run history. The head-refine surface adds
a **before/after** view (generic base face vs welded identity) and an `align=manual` fallback +
blend-ring slider, because the graft can fail visibly.

Build / verify the web bundle:

```bash
just ext-build faceavatar                          # refresh committed web/dist from source
just web-verify extensions/builtin/faceavatar/web  # tsc + biome lint (+ vitest)
```

## Layout (mirrors the sibling image-to-3D extension structure)

- `manifest.yaml` — identity, deps, model_artifacts (FLAME / ArcFace / Arc2Avatar — placeholder ids,
  pinned in the GPU spike), backends (`gb10` + `fake`), storage. NON-COMMERCIAL note.
- `storage/migrations/001_jobs.sql` — `ext_faceavatar__jobs`.
- `rust/` — `faceavatar-extension` crate (router, dispatcher, lease, storage repo, `/media` route).
- `worker/` — `faceavatar_worker` (stdio RPC + Arc2Avatar pipeline + graft + `fake` backend).
- `web/` — extension bundle (Generate + Head-refine surfaces, `<model-viewer>` preview, history).
- `operators/{generate_head,graft_head}.yaml`, `recipes/`, `workflows/`, `backends/{gb10,fake}/versions.yaml`.

## Boundary

Extension-owned. **No sibling-extension import in faceavatar; no faceavatar logic in any sibling
extension.** No extension-id literals in host paths; the viewer lives here, not the host shell;
`crates/nexus-builtins` is the only host crate that may depend on `rust/`. The "combination with an
existing head generator" is achieved purely because the user feeds head-refine a GLB they happened to
generate elsewhere.
See [`.claude/rules/host-extension-boundary.md`](../../../.claude/rules/host-extension-boundary.md).
