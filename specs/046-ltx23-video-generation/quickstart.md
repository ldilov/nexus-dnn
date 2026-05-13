# Spec 046 — Quickstart

> Backfill after P2 ships. Below is the target shape.

## First render in 60 seconds (fake runtime)

```bash
# 1. Build host + worker
cargo build --workspace -p nexus-api -p nexus-video-ltx23-worker

# 2. Build frontend
pnpm install
pnpm --filter nexus-video-ltx23-web build

# 3. Start the host with fake runtime preference
NEXUS_VIDEO_LTX23_RUNTIME=fake pnpm dev

# 4. Open http://localhost:5173/extensions/nexus.video.ltx23
# 5. Fill the recipe form:
#    - prompt: "A cinematic painterly shot of a traveler walking through neon rain"
#    - duration: 10
#    - quality: balanced_16gb
# 6. Click "Plan" → see plan preview banner
# 7. Click "Generate" → watch segment timeline progress
# 8. On completion: preview the MP4 + download
```

## First render on real hardware (RTX 40 / 16 GB) — post P2

```bash
# 1. Install the rtx40-fp8 backend runtime via the host UI
#    Settings → Backends → "LTX 2.3 FP8 Runtime for RTX 40 / CUDA 12.x" → Install
#    Host downloads torch+cu128 + diffusers + LTX-2.3 FP8 checkpoint (~22 GB)

# 2. Open Extensions → LTX 2.3 Video Generator → Image to Long Video
# 3. Upload a 16:9 image
# 4. Prompt + 30s duration + balanced_16gb preset
# 5. Plan preview should show: external_segments, 9 segments, 30s exact, VRAM risk: safe
# 6. Generate
# 7. Final MP4 download
```

## Troubleshooting (post P2)

| Symptom | Action |
|---|---|
| "Driver too old" | Update NVIDIA driver to R580+ (Windows: ≥ 580.88). UI provides one-click link. |
| "Runtime unhealthy" | Settings → Backends → rtx40-fp8 → Repair. Re-runs install validator. |
| "OOM mid-segment" | Apply "Safe Settings" — drops to 832×480 / 73 frames per segment. |
| "Model missing" | Settings → Model Store → re-download `Lightricks/LTX-2.3` FP8 checkpoint. |
| "Bad seam at 45s" | Retry segment N+1 with stronger image conditioning. |
