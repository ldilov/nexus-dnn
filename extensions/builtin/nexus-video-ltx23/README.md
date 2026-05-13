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

| Profile | Hardware | Quant | Status |
|---|---|---|---|
| `nexus.video.ltx23.rtx40-fp8` | RTX 40 Ada (+ Ampere experimental) | FP8 | Production |
| `nexus.video.ltx23.rtx50-fp8` | RTX 50 Blackwell | FP8 | Production |
| `nexus.video.ltx23.rtx50-nvfp4` | RTX 50 Blackwell | NVFP4 | **Experimental — opt-in only** |
| `nexus.video.ltx23.fake` | any | — | CI + frontend dev |

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
