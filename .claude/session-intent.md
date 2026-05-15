# Session Intent Contract — Operator-controlled VRAM/CPU offload + nvfp4 downgrade fix

**Created:** 2026-05-15
**Goal:** Research a topic (with implementation outcome)
**Scope clarity:** Clear requirements
**Success criteria:** Working solution
**Constraints:** Must fit existing architecture (host↔extension boundary, AdvancedSettings, runtime_selection)

## Job statement

Add operator control over the diffusers pipeline's CPU/GPU offload aggressiveness for the LTX-2.3 video extension. The current default (`enable_sequential_cpu_offload`) under-utilises VRAM and over-thrashes RAM — observed: 7 GB / 16 GB VRAM peak, 23 GB working-set in system RAM, 17.7 s/step for 4 inference steps on RTX 5070 Ti. Alongside the offload control, fix the planner's silent downgrade where `runtime_profile: "rtx50-nvfp4"` gets resolved to `rtx50-fp8` despite both being installed.

## Why now

The first real-GPU render landed successfully on 2026-05-15 (run `01KRNTPCDMQN0J35D3P7VV21WE`, 4-second clip generated to `interpolated.mp4`). The operator immediately surfaced the offload problem after watching the GPU under-utilise. The nvfp4 downgrade was also surfaced in the same render — operator asked for nvfp4 but the worker reported `profile: rtx50-fp8`.

## Success criteria (concrete)

1. New `offload_mode` knob on `AdvancedSettings` reaches the worker and selects the matching diffusers helper.
2. RTX 5070 Ti + nvfp4 + `offload_mode: "none"` renders a 4-second clip in under 60 seconds for 8 inference steps (vs current 17.7 s/step) — proves GPU resident weights actually accelerate.
3. `runtime_profile: "rtx50-nvfp4"` in a render request lands a worker with `profile: "rtx50-nvfp4"` (not silently downgraded).
4. Low-VRAM cards reject `"none"` with a clear error before spawning the worker, falling back gracefully to the profile default.
5. Boundary check stays green (no LTX-specific literal in host scan paths).

## Boundaries

- The new control lives inside `AdvancedSettings` (extension-owned schema). Host stays profile-agnostic.
- Worker chooses the diffusers helper, host does NOT call diffusers APIs.
- Per-profile defaults live in `runtime_selection.rs` (extension-owned).
- No new SQLite migrations needed — `AdvancedSettings` is serialised inside `request_json`, schema is free-form.

## Out of scope

- Changing the diffusers pipeline class itself.
- Auto-tuning offload_mode at render time (operator chooses or accepts the profile default; no closed-loop).
- Multi-GPU offload (single-GPU only this round).
