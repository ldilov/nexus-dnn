# nexus.video.ltx23 — LTX 2.3 Video Generator Extension

Generates user-specified-length MP4 videos from a prompt + optional input image using LTX-2.3 backend runtimes managed by the host.

## Quick links

- Spec: [`specs/046-ltx23-video-generation/spec.md`](../../../specs/046-ltx23-video-generation/spec.md)
- Plan: [`specs/046-ltx23-video-generation/plan.md`](../../../specs/046-ltx23-video-generation/plan.md)
- Data model: [`specs/046-ltx23-video-generation/data-model.md`](../../../specs/046-ltx23-video-generation/data-model.md)
- Tasks: [`specs/046-ltx23-video-generation/tasks.md`](../../../specs/046-ltx23-video-generation/tasks.md)

## Architecture (1 sentence)

User → host shell → extension custom-element UI → POST `/api/v1/extensions/nexus.video.ltx23/renders` → Rust extension worker → host backend-runtime lease → isolated Python worker (diffusers + LTX-2.3 + FFmpeg + RIFE) → host artifact store → MP4 download.

## Runtime profiles

| Profile | Target hardware | Compute | Model repo (today) | Peak VRAM | Status |
|---|---|---|---|---|---|
| `nexus.video.ltx23.rtx40-fp8` | RTX 40 Ada | sm_89, CUDA 12.6+ | `dg845/LTX-2.3-Distilled-Diffusers` (BF16) | ~5 GB | Production |
| `nexus.video.ltx23.rtx50-fp8` | RTX 50 Blackwell | sm_120, CUDA 12.8+ | same as above | ~5 GB | Production |
| `nexus.video.ltx23.rtx50-nvfp4` | RTX 50 Blackwell native | sm_120 | same as above today | ~5 GB | **Experimental** |
| `nexus.video.ltx23.fake` | any | — | none | 0 | CI + frontend dev |

The 22B BF16 model fits in ~5 GB peak VRAM via
`pipe.enable_sequential_cpu_offload()` — individual transformer blocks
swap in/out of GPU on demand instead of loading the whole model. The
quant variants (`fp8`, `nvfp4`) all map to the same dg845 BF16 repo
today until upstream diffusers ships a single-file loader for the
official `Lightricks/LTX-2.3-{fp8,nvfp4}` ComfyUI-style checkpoints.
See [`specs/046-ltx23-video-generation/verification/p0-t001-results.md`](../../../specs/046-ltx23-video-generation/verification/p0-t001-results.md)
for the dead-end paths and the architectural reasoning.

### NVFP4 on non-Blackwell hardware — a note

NVFP4 (NVIDIA's 4-bit floating-point format) has **native tensor-core
support only on Blackwell (sm_120+)**. Ada (sm_89, RTX 40) does NOT
have NVFP4 tensor cores.

This does NOT mean Ada cannot consume NVFP4 weights. Two paths exist:

1. **(Recommended for Ada)** Use the `rtx40-fp8` profile + the
   `Lightricks/LTX-2.3-fp8` weights directly. Ada's FP8 tensor cores
   give the best throughput.
2. **(Theoretical)** Load NVFP4 weights and dequantize layer-by-layer
   to FP8 at compute time. Saves disk (~14 GB vs 28 GB) and possibly
   VRAM. Requires an inference engine with NVFP4-aware kernels for
   non-Blackwell hardware — TensorRT-LLM has this; **diffusers 0.37.x
   as of 2026-05-13 does NOT.**

The default `auto` runtime selector picks the conservative path
(Ada → fp8, Blackwell + opt-in → nvfp4). To override and try NVFP4
on Ada anyway, pass `runtime_profile=rtx50-nvfp4` explicitly via the
recipe form AND set the experimental opt-in flag — at your own risk
until validated against a real Ada GPU.

See [`docs/requirements.md`](../../../docs/requirements.md#nvfp4-on-rtx-40--clarification)
for the full hardware/driver matrix.

## Default 16 GB safety presets

- Mode: **external_segments** (resumable, low peak VRAM; native looping sampler deferred)
- Resolution: 960×544 landscape
- Generation: 24 fps × 97 frames/segment (~4 s) × 9 segments for a 30 s video
- Output: 48 fps (RIFE 2× interpolation) trimmed to exact requested duration
- Tiled VAE + CPU offload by default
- 1 render per GPU at a time

## VRAM eviction guarantee (AC13)

Models are cleared from VRAM after every render run via the canonical drop sequence (see [plan.md § VRAM safety details](../../../specs/046-ltx23-video-generation/plan.md)) followed by a forced runtime restart. Mid-run, the supervisor restarts the runtime on threshold breach (allocator retries, fragmentation, low free VRAM, or segment count cap).

## Host-extension boundary

This extension is API-only consumer of the host. Host code contains **zero** LTX-specific logic, types, tables, routes, or file paths. CI runs [`scripts/audit-boundary.sh`](scripts/audit-boundary.sh) to enforce this.

The single host-side addition justified by the acceptance criteria — `apps/web/src/components/media/MediaArtifactPlayer.tsx` — is a generic audio+video player reusable by emotion-tts and any future media-emitting extension.

## Directory layout

```
extensions/builtin/nexus-video-ltx23/
  manifest.yaml
  README.md
  rust/                          # extension worker (Rust)
  backends/                      # 4 backend-runtime profiles + shared Python worker
    rtx40-fp8/backend-runtime.yaml
    rtx50-fp8/backend-runtime.yaml
    rtx50-nvfp4/backend-runtime.yaml
    fake/backend-runtime.yaml
    _shared/worker/              # Python: stdio JSON-RPC, diffusers pipeline, fake mode
  recipes/image_to_long_video.yaml
  workflows/long_video.yaml
  operators/*.yaml
  storage/migrations/*.sql       # ext_nexus_video_ltx23__* tables
  openapi/extension.openapi.yaml
  ui/layouts/main.yaml
  web/                           # extension-owned custom-element bundle
  scripts/audit-boundary.sh
  contracts/                     # JSON-RPC + JSON Schema contracts
```

## Status (this session)

- ✅ P1 vertical-slice scaffolding (this commit).
- ⏳ P0 verification spike (run before P2 — see [tasks.md](../../../specs/046-ltx23-video-generation/tasks.md)).
- ⊘ P2-P6 in subsequent sessions.

## Testing

- Rust: `cargo test -p nexus-video-ltx23-worker`
- Python: `cd worker && uv run pytest`
- Frontend: `pnpm --filter nexus-video-ltx23-web vitest run`
- Boundary audit: `bash scripts/audit-boundary.sh`
- OpenAPI aggregation: `cargo run --bin api_doc_check`
