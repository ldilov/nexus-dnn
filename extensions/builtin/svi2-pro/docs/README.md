# svi2-pro docs

Reference for exposing the SVI2-Pro video render in the UI.

- **[presets.md](presets.md)** — every render preset, what it does, when to use it, and the resolution/length rules. Source: `data/render_presets.json`.
- **[fields.md](fields.md)** — every nudgeable render field (type, default, range, effect, UI tier, gotchas) + the Qwen anchor-edit flags + environment levers. Source: `validate_render_params` in `worker/src/svi2_video_worker/pipeline_svi2.py`.
- **[research/2026-06-03-transformation-levers.md](research/2026-06-03-transformation-levers.md)** — background research on transformation vs identity-lock.

## TL;DR for the UI

- Default to the **`svi-canonical`** preset (832×480, identity-stable). Collapse the canonical coherence fields — they're correct by default.
- Expose one **transformation** path at a time: Qwen anchor edit (recommended), FLF2V `last_image`, or ICN (last resort).
- Surface the **resolution warning** and the **`blocks_to_swap` VRAM-vs-speed** note — both are common footguns.
