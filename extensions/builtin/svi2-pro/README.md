# SVI 2.0 Pro Video Generator (svi2-pro)

Builtin extension for **one-shot long video**. From a single anchor image it
renders an identity-locked long take by chaining 4n+1-frame clips with the
error-recycling **Stable Video Infinity 2.0 Pro** LoRAs on top of
Wan2.2-I2V-A14B (14B dual-expert MoE), tuned for 16 GB Blackwell (RTX 50) via
Kijai fp8 e4m3fn base weights.

## Modes

Selected per render via `mode` (recipe screen toggle, default `image_to_video`):

- **Image-to-Video** (`image_to_video`) — the operator supplies the anchor image;
  it conditions clip 0. Original behaviour, unchanged.
- **Text-to-Video** (`text_to_video`) — no image required. The worker synthesizes
  a single **seed frame** from the prompt (stable-diffusion.cpp txt2img, base
  Qwen-Image, reusing the same sd-cli + Qwen VAE/text-encoder as the edit path),
  then feeds it as the clip-0 anchor and runs the **unchanged** i2v + SVI chain.
  Length still comes from i2v chaining; there is no native long-T2V model. An
  optional numeric `seed` makes the synthesized frame reproducible. Note: the
  prompt drives content (via the seed) and motion (per-clip), but not mid-take
  appearance changes — appearance is locked to the seed (Wan2.2-i2v ref-lock).
  A supplied image in T2V mode is used as the seed (synthesis skipped).

## Backends

- `nexus.video.svi2-pro.fake` — no-GPU CI/dev backend. Deterministic synthetic
  frames; requires **zero** model weights on disk (`backends/fake/versions.yaml`
  declares no artifacts).
- `nexus.video.svi2-pro.rtx50-fp8` — RTX 50 / Blackwell, 16 GB VRAM, fp8 e4m3fn.

## Install (from the Extensions panel)

Install the extension from the host **Extensions panel**. Installation drives
the full dependency plan declared in `manifest.yaml` to completion —
**everything is fetched on install**:

- An **isolated extension-local venv** (`uv`, `worker/pyproject.toml` +
  `worker/uv.lock`) — nothing leaks into the host interpreter. The heavy ML
  stack (torch, diffusers, …) lives in the `diffusers` extra; the fake backend
  runs on base deps only.
- **All model weights**, auto-downloaded through the host **model-store** (not a
  bespoke downloader): the Kijai Wan2.2-I2V-A14B HIGH/LOW fp8 experts, the SVI
  v2.0 Pro high/low LoRAs (`epfl-vita/svi-model`), the UMT5-XXL text encoder +
  tokenizer, the Wan VAE, the Qwen-Image-Edit-2509 GGUF set + Qwen2.5-VL for the
  edit-then-animate path, and RIFE weights.
- The **ffmpeg** and **sd-cli** (`stable-diffusion.cpp`) system binaries —
  resolved from `PATH` first (`allow_system_path: true`), with a pinned upstream
  download as fallback.
- A `validate` step that runs a **worker handshake** against the worker
  entrypoint. The fake profile validates with no GPU and no real weights.

The gallery shows a "Setup required" badge until every dependency step probes
OK; per-step progress (including model download bytes) appears in the
Dependencies tab.

## Using it

The extension ships a React custom-element app (`svi2-pro-app`, served from
`web/dist`) with two views of one render request:

- **Recipe view** — a preset gallery, a **mode toggle** (Image-to-Video /
  Text-to-Video), the ref-image upload (required for i2v; optional in t2v) plus
  an optional last-image upload (required for FLF2V morph presets), a
  single-prompt-first prompt input, an optional numeric **seed** (t2v only), and
  tier-grouped nudgeable fields. Selecting a preset populates the form; every
  field stays individually adjustable.
- **DAG view** — a live pipeline graph (`@xyflow/react`) of the render:
  anchor → optional Qwen edit → per-clip diffusion → stitch/crossfade →
  interpolation → mux, with node state driven by the same render notifications
  as the progress view.

A **Settings** surface (config widget `svi2.settings` + the app's Settings view)
holds defaults for new renders: models dir, attention backend (`SVI2_ATTENTION`),
fp8 compute mode (`SVI2_FP8_COMPUTE`), `blocks_to_swap`, interpolation
method + fps, and output dir.

### Presets

Eleven presets ship in `data/render_presets.json`, exposed to the UI via the
`svi2.presets.list` RPC (the UI reads them from the contract, it does not
hardcode preset bodies). Families:

- **canonical** ×3 (`svi-canonical` + 704/640 step-downs) — reference-faithful
  identity-locked chaining. `svi-canonical` is the **default / recommended
  baseline** (832×480, the trained 480p budget).
- **natural** ×2 + **natural-lowvram** ×2 — vanilla Wan2.2-I2V look (pixel
  re-encode + crossfade); coherent motion, can drift identity over many clips.
- **forced-motion** ×2 — diagnostic over-driven RoPE motion.
- **flf2v-morph-lowvram** — first→last-frame morph over one clip (last image
  required).
- **chained-single-prompt-lowvram** — long take via one prompt + crossfade seams.

Field-level documentation is the source of truth and is **not duplicated** here:

- [`docs/presets.md`](docs/presets.md) — preset families, when to use each,
  resolution rules.
- [`docs/fields.md`](docs/fields.md) — every `validate_render_params` field with
  tier, default, and nudge guidance.
- [`docs/parameters-audit.md`](docs/parameters-audit.md) — full parameter
  inventory.

## GPU smoke (deferred operator gate)

A real `rtx50-fp8` render is a **separate, deferred operator gate** — it needs an
RTX 50 / Blackwell box with ~16 GB VRAM and is **out of scope for the offline
acceptance bar**. After install, run it from the extension directory:

```bash
cd extensions/builtin/svi2-pro
./scripts/smoke-rtx50-fp8.sh   --models-dir <models> --ref-image <anchor.png>  # Linux
./scripts/smoke-rtx50-fp8.ps1  --models-dir <models> --ref-image <anchor.png>  # Windows
```

The script wraps `scripts/gpu_smoke.py`, expects the worker venv built by
`scripts/install.{sh,ps1}`, and forwards extra args (`--num-clips`, `--width`,
`--height`, `--cfg-scale`, …). Recommended environment on RTX 50:
`SVI2_FP8_COMPUTE=bf16` (Blackwell `torch._scaled_mm` colour fix) and
`SVI2_ATTENTION=flash2` (sdpa fallback).

## Known limitations

- **Text-to-Video seed model is not yet pinned.** The base Qwen-Image **txt2img**
  GGUF used for T2V seed synthesis is referenced as a single constant
  (`_QWEN_IMAGE_TXT2IMG` in `worker/src/svi2_video_worker/seed_synthesis.py`) but
  is **not yet registered** in `manifest.yaml` / `backends/rtx50-fp8/versions.yaml`,
  and the installed sd-cli build's Qwen-Image txt2img support is unconfirmed. The
  exact filename + manifest entry MUST be validated before a real T2V GPU render
  (deferred operator/hardware gate, alongside the GPU smoke).
- **sd-cli on Linux is not pinned.** `leejet/stable-diffusion.cpp` publishes no
  Linux **CUDA** prebuilt (only ROCm / Vulkan / CPU Linux assets), so the
  manifest pins only the Windows CUDA binary. On Linux, `sd-cli` must come from
  `PATH` (`allow_system_path: true`) or a from-source CUDA build — see
  `TODO(svi2-sdcli-linux)` in `manifest.yaml`. The edit-then-animate path is the
  only feature affected; the core render does not need sd-cli.

## Worker architecture

Stdio JSON-RPC (NDJSON) render worker. See `worker/README.md`.
