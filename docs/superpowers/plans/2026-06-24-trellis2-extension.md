# Plan — `trellis2` builtin extension (Microsoft TRELLIS image→3D) for nexus-dnn

> Produced via `/octo:embrace` (Double Diamond). Discover = 3 Claude codebase subagents + codex
> gpt-5.5 external brief. Define→Develop **debate gate** (codex adversary) ran and **changed this
> plan**: P0 is the contract authority (no paper contract-freeze before it), MVP cut to a vertical
> slice, texture deferred to P1, single operator. Gate artifact:
> `~/.claude-octopus/results/embrace-gate-define-develop-20260624-222716.md`.
> Define doc: [docs/research/comfyui-trellis2/2026-06-24-trellis2-embrace-define.md](../../research/comfyui-trellis2/2026-06-24-trellis2-embrace-define.md).

## 1. Goal & the MVP-0 vertical slice (gate-mandated)

Ship a first-party, local image→3D capability on the live GB10 Spark, fully inside an extension,
boundary-clean. **MVP-0 = the smallest end-to-end slice that proves real value:**

> single image → GB10 real profile → MeshOnly (low-step, **no cascade, no texture**) → CPU-safe
> voxel→mesh fallback if needed → one **GLB** (or fallback mesh) artifact + metadata JSON →
> download through the host media route → `runtime.release_memory`.

No texture, no multiview, no custom 3D viewer, no preview video at MVP-0. Everything else is P1+.
The full operator/UX/texture from the Define doc is the **target**, reached incrementally after the
slice proves the hard part (GB10 native stack + 3D-binary artifact path).

## 2. Revised phase DAG (parallel tags)

```
P0   GB10 NATIVE-DEP + 3D-ARTIFACT SPIKE   [CRITICAL PATH — serial, FIRST, = contract authority]
       proves on real Spark: torch/spconv/flex_gemm/cumesh/o_voxel import+kernel smoke;
       blackwell_fix semantics; load TRELLIS.2-4B + DINOv3 no-network; 1 low-step image→GLB;
       CPU voxel→mesh fallback; AND host artifact store writes/serves a .glb with correct MIME.
                       │
P0.5 CONTRACT FREEZE   [serial, tiny]  freeze operator/RPC/artifact/metadata/profile-health
                       │               schemas FROM OBSERVED P0 facts (not guesses)
        ┌──────────────┼──────────────┬───────────────┐
        ▼              ▼              ▼               ▼
  P1 Rust shim     P2 Worker      P3 Web UI       P4 Model-artifact
   [∥ LANE A]      [∥ LANE B]     [∥ LANE C]       + install [∥ LANE D]
        └──────────────┴──────┬───────┴───────────────┘
                              ▼
                       P5 Wire-up + FAKE E2E   (needs P1+P2+P3 contracts)
                              ▼
                       P6 GB10 REAL E2E + perf/VRAM + deploy dgx-fixNN  (needs P0+P5)
                              ▼
                       P7 Deliver: reviews + boundary grep + tests + live-verify
```

Serial spine: **P0 → P0.5 → (fan-out P1∥P2∥P3∥P4) → P5 → P6 → P7.**
The ONLY parallel-safe fan-out is P1/P2/P3/P4, and ONLY after P0.5. Before P0.5 the only allowed
parallel work is **throwaway** fake/UI prototypes that do not bind contracts.

## 3. Phase tasks

### P0 — GB10 spike (SERIAL, contract authority) — agent: pytorch-build-resolver + manual on Spark
- T0.1 Build/validate aarch64+sm_121 wheels: `torch` (cu13x), `spconv`, `flex_gemm`, `cumesh`,
  `o_voxel`. Record per-dep: import_smoke, kernel_smoke, wheel hash/provenance, ABI/CUDA tags,
  fallback_used. (skip `nvdiffrast`/flash-attn — not in MVP-0.)
- T0.2 Port `blackwell_fix` semantics into a worker preamble (compute-cap spoof→(9,0);
  `ATTN_BACKEND=sdpa`; `SPARSE_CONV_BACKEND=spconv`; `expandable_segments`; flex_gemm torch
  fallback; CPU voxel→mesh + subprocess isolation).
- T0.3 Load `TRELLIS.2-4B` + `dinov3-vitl16` + `TRELLIS-image-large` sparse decoder from local
  paths, **no network**; run 1 low-step image→decode→voxel→mesh→**GLB**.
- T0.4 **Host 3D-binary artifact spike** (gate hidden item): confirm the generic host artifact
  store can write+serve a `.glb`/`.ply` with `model/gltf-binary`, `Content-Disposition`, range/cache,
  and path-confined auth via an extension `/media` route. If not → host-side support is a P0 blocker.
- **Exit:** real GLB on disk from the Spark + downloadable via host route + per-dep health recorded.

### P0.5 — Contract freeze (SERIAL, tiny) — agent: architect
Freeze from observed P0 facts: operator `trellis2.generate_3d@1.0.0` IO; RPC method/notification
set; artifact output shape (glb vs fallback ply/obj + MIME); **metadata schema** (effective vs
actual compute cap, blackwell_patch_applied, attention_backend, sparse_conv_backend,
flex_gemm_fallback, mesh_extractor, cpu_voxel_fallback, stage timings, CPU/GPU peak, warnings);
**per-native-dep runtime-health schema**; profile caps (use_cascade/texture_size/max_num_tokens/
sparse_resolution/residency/tiled_decoder). Verify recipe/workflow schema supports image input +
3D output type. **These frozen contracts are the input every parallel lane builds against.**

### P1 — Rust shim skeleton — [∥ LANE A] — agent: rust-reviewer-guided build
manifest.yaml; `extensions/builtin/trellis2/rust` crate `trellis2-extension`; `EXTENSION_ID`;
register in `crates/nexus-builtins` (sole bridge); router mounting `/api/v1/extensions/<id>/...`;
dispatcher (lease acquire + RPC + SSE progress + Stop); storage repos over `ext_trellis2__*`;
extension `/media/:ref` route. Template = svi2-pro/emotion-tts shim. **Boundary-clean.**

### P2 — Python worker + pipeline — [∥ LANE B] — agent: python-reviewer-guided build
worker `trellis2_worker`: stdout-hijack + JSON-RPC loop; handshake/health; the MVP stage pipeline
(preprocess→DINOv3→sparse→shape→decode→mesh→GLB, **texture path stubbed for P1**); blackwell
preamble (from P0.2); `runtime.release_memory`; cooperative cancel in sampler loops; **fake backend
with zero torch import**; per-stage VRAM tracking (svi2 `vram.py` pattern).

### P3 — Web UI + (later) 3D viewer — [∥ LANE C] — agent: frontend-design
Extension web bundle: recipe + DAG views, generation form, progress/Stop, downloads, run history.
`pnpm-workspace.yaml` allowBuilds. **3D `<model-viewer>` GLB preview is P1** (MVP-0 = download
link + thumbnail); evaluate model-viewer licensing/CSP/bundle/offline + authed-media-URL loading
before adopting. Nexudnn "Spectral Graphite" design (`/nexudnn-design`). Viewer lives **in the
extension bundle**, never the host shell.

### P4 — Model-artifact + install — [∥ LANE D] — agent: general-purpose
manifest `model_artifact` decls (TRELLIS.2-4B, dinov3-vitl16, sparse decoder); Model Foundry /
download-orchestrator wiring; `worker/pyproject.toml` + `uv.lock` with GB10 wheel provenance/hashes;
aarch64 Dockerfile build path for the native wheels (gate hidden item); no-network enforcement once
healthy.

### P5 — Wire-up + fake E2E — agent: tdd-guide
Fake backend green end-to-end (recipe→run→artifact→download→UI) with no GPU. Rust + worker + web
contract tests. `just web-verify`, `just dist-check`, cargo tests.

### P6 — GB10 real E2E + perf/VRAM + deploy — manual on Spark
Real image→GLB on Spark via `just dgx-deploy` (dgx-fixNN); idle-release/lease verified; VRAM caps
hold; live-render confirm.

### P7 — Deliver — agents: code-reviewer + security-reviewer + boundary grep
Reviews; `grep -rn "trellis2" crates/ apps/web/src --exclude-dir=nexus-builtins` == 0; ext tables
prefixed; no host migrations for ext tables; 80%+ coverage on new logic; live-verify.

## 4. What runs in parallel (explicit)

| Lane | Phase | Depends on | Parallel-safe? |
|---|---|---|---|
| — | P0 spike | nothing | NO (serial, first) |
| — | P0.5 freeze | P0 | NO (serial) |
| A | P1 Rust shim | P0.5 contracts | YES (∥ B,C,D) |
| B | P2 Worker | P0.5 contracts + P0.2 preamble | YES (∥ A,C,D) |
| C | P3 Web UI | P0.5 contracts | YES (∥ A,C,D) |
| D | P4 Models/install | P0.5 + P0 wheels | YES (∥ A,B,C) |
| — | P5 fake E2E | P1+P2+P3 | NO (join) |
| — | P6 GB10 E2E | P0+P5 | NO |
| — | P7 Deliver | P6 | NO |

## 5. Risk register (post-gate)

| Risk | Sev | Mitigation |
|---|---|---|
| Fake-first contracts frozen before GB10 reality → costly redo | CRIT | P0 is contract authority; freeze only at P0.5 from observed facts |
| Host artifact stack can't serve 3D binaries | CRIT | P0.4 spike GLB write/serve/MIME/auth BEFORE fan-out |
| Native deps treated as install detail not health contract | HIGH | per-dep health schema in P0.5; NotSatisfied not crash |
| GB10 aarch64/sm_121 wheels don't build | HIGH | P0.1; CPU fallbacks; record provenance/hashes |
| CuMesh broken on Blackwell | HIGH | CPU voxel→mesh + subprocess (blackwell_fix port) |
| VRAM/unified-mem OOM | HIGH | profile-gate caps, tiled decoder, stage cleanup, memory governor |
| Boundary violations | HIGH | ext_trellis2__ tables in ext dir; viewer in ext bundle; grep gate |

## 6. Open decisions for the user
- MVP-0 vertical slice now vs build the fuller operator straight away? (gate strongly: slice first)
- Begin with **P0 GB10 spike on the Spark** (recommended), or scaffold P1/P2/P3 fake-only first as throwaway prototypes in parallel while the spike runs?
