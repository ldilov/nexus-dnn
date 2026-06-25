# trellis2 — Image → 3D (Microsoft TRELLIS.2) builtin extension

Image-to-3D mesh generation. Ported from Microsoft TRELLIS.2 (4B flow-matching over an O-Voxel
sparse structure). Proven end-to-end on the GB10 Spark (aarch64, Blackwell sm_121) in P0 — see
[`docs/research/comfyui-trellis2/2026-06-24-trellis2-P0-COMPLETE.md`](../../../docs/research/comfyui-trellis2/2026-06-24-trellis2-P0-COMPLETE.md).

## Status: SCAFFOLD (P0 done, P1–P4 in progress)
P0 (the make-or-break GB10 native-dep + render spike) is **complete**: the full pipeline renders a
real GLB on the Spark. Frozen contracts: [`…/2026-06-24-trellis2-P0.5-contracts.md`](../../../docs/research/comfyui-trellis2/2026-06-24-trellis2-P0.5-contracts.md).

## Proven runtime stack (build the worker against this)
torch 2.12.0+cu132 · py3.12 · `ATTN_BACKEND=flash_attn` · `transformers==4.56.0` · 4 native sm_121
kernels (`cumesh`, `flex_gemm`, `o_voxel`, `nvdiffrast`) vendored at
[`binaries/linux-aarch64/`](../../../binaries/linux-aarch64/) + vendored `flash_attn-2.8.3`.
dinov3 is gated (mirror fallback `kiennt120/…`); RMBG skipped (`rembg_model=None`, `preprocess_image=False`).

## Layout (mirrors svi2-pro)
- `manifest.yaml` — identity, deps, model_artifacts, backends (`gb10-flash` + `fake`), storage. ✅
- `storage/migrations/001_generation_jobs.sql` — `ext_trellis2__generation_jobs`. ✅
- `rust/` — `trellis2-extension` crate (router, dispatcher, lease, storage repo, `/media` route). **P1**
- `worker/` — `trellis2_worker` (stdio RPC + the P0-COMPLETE pipeline + `fake` backend). **P2**
- `web/` — extension bundle (recipe/DAG, progress/Stop, download; `<model-viewer>` later). **P3**
- `operators/generate_3d.yaml`, `recipes/`, `backends/{gb10-flash,fake}/versions.yaml`. **P1/P4**

## Fan-out tasks (parallel after the P0.5 contract freeze)
- **P1 [∥]** rust shim + `crates/nexus-builtins` wiring (boundary-clean; sole bridge).
- **P2 [∥]** python worker applying the P0-COMPLETE recipe (image→sparse→shape→decode→mesh→GLB) + fake.
- **P3 [∥]** web bundle (Spectral Graphite; `/nexudnn-design`).
- **P4 [∥]** model_artifact install + `worker/uv.lock` (vendored wheels) + aarch64 Dockerfile path.
- **Converge** P5 fake E2E → P6 GB10 real E2E + deploy → P7 review + boundary grep.

## Boundary
Extension-owned. No extension-id literals in host paths; viewer lives here, not the host shell;
`crates/nexus-builtins` is the only host crate that may depend on `rust/`.
See [`.claude/rules/host-extension-boundary.md`](../../../.claude/rules/host-extension-boundary.md).
