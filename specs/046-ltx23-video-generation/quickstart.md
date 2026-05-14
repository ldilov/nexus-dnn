# Spec 046 — Quickstart

End-to-end install + first render for the LTX-2.3 video extension on
both fake (CI / dev) and real-GPU paths.

## Prerequisites

See [`docs/requirements.md`](../../docs/requirements.md) for the full
matrix. The minimum needed for this extension:

- **uv** on PATH (`curl -LsSf https://astral.sh/uv/install.sh | sh`)
- **ffmpeg** on PATH (the host will auto-download if missing, but
  PATH-resident is faster + gets security updates)
- For real-GPU profiles: NVIDIA driver supporting CUDA 12.6+ (Ada),
  CUDA 12.8+ (Blackwell), and ≥ 16 GB VRAM

```bash
nvidia-smi --query-gpu=name,driver_version,memory.total,compute_cap --format=csv
```

## Build the host + frontend

```bash
git clone https://github.com/ldilov/nexus-dnn.git
cd nexus-dnn
cargo build --workspace
(cd apps/web && pnpm install && pnpm build)
(cd extensions/builtin/nexus-video-ltx23/web && pnpm install && pnpm build)
```

## First render — fake runtime (no GPU required)

The fake runtime produces a placeholder MP4 (solid colour, ffmpeg-
encoded) and exercises the entire request → planner → worker → MP4
chain. Use it for CI, demos, and frontend dev.

```bash
NEXUS_PORT=3100 ./target/debug/nexus-dnn.exe
# In another shell:
curl -X POST http://127.0.0.1:3100/api/v1/extensions/nexus.video.ltx23/renders \
  -H 'Content-Type: application/json' \
  -d '{
    "prompt": "a slow cinematic dolly shot over a futuristic city at dusk",
    "duration_seconds": 4,
    "runtime_profile": "auto",
    "quality_preset": "draft"
  }'
# → { "id": "01KRG...", "status": "queued", "segment_count": 1, ... }

# Poll until status=completed:
curl http://127.0.0.1:3100/api/v1/extensions/nexus.video.ltx23/renders/01KRG...
# → status=completed, final_artifact_id=ltx23-run-01KRG...-final

# Download the MP4:
curl -o demo.mp4 http://127.0.0.1:3100/api/v1/extensions/nexus.video.ltx23/artifacts/ltx23-run-01KRG...-final
```

Or via the recipe UI: navigate to `http://127.0.0.1:3100/extensions`,
click **LTX 2.3 Video**, fill the form, click **Generate video**.

## First render — real GPU (RTX 40 / RTX 50, 16 GB VRAM)

```bash
# 1. Trigger the unified install — pulls torch+cu128, diffusers,
#    and the dg845/LTX-2.3-Distilled-Diffusers weights (~88 GB).
#    Takes ~9 minutes on a 200 Mbps connection.
curl -X POST http://127.0.0.1:3100/api/v1/extensions/nexus.video.ltx23/profiles/rtx50-fp8/install

# 2. Poll install status — phase advances through:
#      starting → resolving_deps → downloading_weights → done
curl http://127.0.0.1:3100/api/v1/extensions/nexus.video.ltx23/profiles/rtx50-fp8/install

# 3. Once `installed=true`, fire a render with the real profile.
#    Defaults are tuned for 16 GB native VRAM via
#    pipe.enable_sequential_cpu_offload() — peak ~5 GB.
curl -X POST http://127.0.0.1:3100/api/v1/extensions/nexus.video.ltx23/renders \
  -H 'Content-Type: application/json' \
  -H 'Idempotency-Key: my-uuid-here' \
  -d '{
    "prompt": "a slow cinematic dolly shot over a futuristic city at dusk",
    "character_prompt": "a lone figure in a long coat walking forward",
    "style_prompt": "moody noir, deep teal shadows, neon highlights, 35mm film grain",
    "scenes": [
      { "prompt": "she walks down the alley", "duration_seconds": 4 },
      { "prompt": "she stops, looks up at the rain", "duration_seconds": 4 }
    ],
    "duration_seconds": 8,
    "runtime_profile": "rtx50-fp8",
    "quality_preset": "draft",
    "seed": 42,
    "advanced": {
      "guidance_scale": 4.0,
      "num_inference_steps": 8
    }
  }'

# 4. Poll for completion (real renders take 5–15 min/segment on 16 GB):
curl http://127.0.0.1:3100/api/v1/extensions/nexus.video.ltx23/renders/<run_id>
```

The recipe form in the UI exposes every field above with helper text +
defaults, plus an `Advanced` collapsible for `guidance_scale` /
`num_inference_steps` and a `Scenes` editor for multi-scene scripts.

## Long-video chains with character + style preservation

For a render longer than ~15 seconds, supply a `scenes[]` script so
each segment gets a focused action prompt. The character + style
anchors thread through every segment:

```json
{
  "prompt": "a noir mystery unfolds at the docks",
  "character_prompt": "Detective Vance — gray trenchcoat, fedora, brown eyes, mid-40s",
  "style_prompt": "1950s noir film stock, deep shadows, smoke, low key lighting",
  "scenes": [
    { "prompt": "Vance steps out of a taxi in the rain", "duration_seconds": 4 },
    { "prompt": "Vance approaches a moored freighter, looking up at the gangplank", "duration_seconds": 4 },
    { "prompt": "Vance walks up the gangplank, gun drawn, into the fog", "duration_seconds": 4 }
  ],
  "duration_seconds": 12
}
```

Worker composes each segment's prompt as
`"<character>. <scene action>. <style>."` and image-conditions scene
N+1 on scene N's last frame. Scene seeds derive from the master seed
deterministically so RNG-driven lighting/detail stays correlated
across cuts.

## Hyperparameter cheat sheet

| Knob | Default | What it does |
|---|---|---|
| `seed` | random per-run | Master seed; per-scene seeds derive from it via splitmix. |
| `duration_seconds` | required | Total video length. Planner picks segment count. |
| `runtime_profile` | `auto` | Hardware target. `fake` for CI, `rtx40-fp8` / `rtx50-fp8` / `rtx50-nvfp4` for real GPUs. |
| `quality_preset` | `balanced_16gb` | Resolution: `draft` 832×480, `balanced_16gb` 960×544, `quality_16gb` 1280×720, `high` 1920×1088. |
| `advanced.guidance_scale` | `4.0` | LTX-2.3's "temperature". 1.0–7.0 sensible. Higher = stricter prompt adherence. |
| `advanced.num_inference_steps` | `8` | Denoising steps. Distilled is tuned for 8. Higher = better detail, ~linear cost. |
| `advanced.segment_seconds` | `4.0` | Per-segment length in seconds. |
| `advanced.overlap_seconds` | `0.5` | Overlap between consecutive segments for visual continuity. |

## Troubleshooting

| Symptom | Action |
|---|---|
| `uv binary not found` from dep installer | Install uv globally — see `docs/requirements.md`. |
| Pipeline-load timeout | First-load takes 60+ s on cold cache. The host's `RENDER_TIMEOUT` is 30 min. If you hit it, drop `num_inference_steps` and/or `quality_preset` to `draft`. |
| Peak VRAM > 16 GB | Verify `enable_sequential_cpu_offload()` ran (see `pipeline_diffusers.py::_ensure_pipeline_loaded`). Profile should report peak ~5 GB. |
| Garbage / noise frames | Likely `num_inference_steps < 4` (too few denoising steps for the prompt to converge) or `guidance_scale < 1` (CFG too low). Restore defaults. |
| Scene seam drift | Bump `character_prompt` specificity. Set explicit `scenes[i].seed` so the RNG stays correlated. |
| Driver too old | Update NVIDIA driver: 525+ for cu126 (Ada), 565+ for cu128 (Blackwell). |
| Run failed mid-render | `POST /renders/{run_id}/cancel` doesn't recover state — start a fresh render with the same seed for determinism. |
| Duplicate POST /renders | Send `Idempotency-Key: <uuid>` header — repeats within 10 min return the cached run. |

## Live observability

```bash
# Watch the host log:
tail -f /tmp/ltx_host.log | grep -E 'worker\.|segment\.|render|cuda'

# Subscribe to per-step heartbeats via the host SSE bus (if your
# deployment surfaces it). The worker emits ltx.video.segment.step
# every inference step:
#   { run_id, segment_index, segment_count, step, total_steps }
```

## Reference

- Spec: [`spec.md`](spec.md)
- Implementation plan: [`plan.md`](plan.md)
- P0-T001 real-GPU verification: [`verification/p0-t001-results.md`](verification/p0-t001-results.md)
- Extension README: [`extensions/builtin/nexus-video-ltx23/README.md`](../../extensions/builtin/nexus-video-ltx23/README.md)
- Host requirements: [`docs/requirements.md`](../../docs/requirements.md)
- OpenAPI fragment: [`extensions/builtin/nexus-video-ltx23/openapi/extension.openapi.yaml`](../../extensions/builtin/nexus-video-ltx23/openapi/extension.openapi.yaml)
