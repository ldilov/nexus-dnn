# Session Plan — Operator-controlled VRAM/CPU offload + nvfp4 downgrade fix
## **v2 — debate-corrected (2026-05-15)**

**Created:** 2026-05-15
**Revised:** 2026-05-15 after multi-voice adversarial debate (verdict: APPROVE-WITH-CHANGES)
**Intent contract:** `.claude/session-intent.md`
**Debate folder:** `~/.claude-octopus/debates/ltx23-offload-plan-20260515-155719/`

## What you'll end up with

A new `offload_mode` field on `AdvancedSettings` that lets the operator pick between three documented diffusers strategies (or accept the per-profile default). The recipe form gets a dropdown. The worker dispatches to the matching diffusers helper. The silent `nvfp4 → fp8` downgrade is fixed at its actual root cause (`api.rs`, NOT `runtime_selection.rs`). Boundary stays clean.

## What CHANGED from v1 (debate findings folded in)

| # | Original claim | Debate correction |
|---|---|---|
| 1 | "Fix the downgrade in `runtime_selection.rs`" | Bug is in `api.rs:246,304` — hardcoded `experimental_nvfp4_opt_in: false` at the call site. Fix: drop the gate (nvfp4 proven on real hardware 2026-05-15) or thread an opt-in field through the request. |
| 2 | "rtx50-fp8 → Model, rtx40-fp8 → Model" | `pipeline_diffusers.py:401-414` documents model_cpu_offload spilled to unified memory on RTX 5070 Ti. Both fp8 profiles default to `Sequential` until measured otherwise. Only `rtx50-nvfp4 → None`. |
| 3 | `pub offload_mode: Option<OffloadMode>` + `Auto` variant | Redundant. Use `OffloadMode` (no Option) with `Auto` as `#[default]` + `#[serde(default)]` on the field. |
| 4 | "Smoke verifies VRAM > 9 GB" | `nvidia-smi` proves nothing about weight residency. Replace with `torch.cuda.memory_reserved()` + `next(pipe.transformer.parameters()).device.type == "cuda"`. |
| 5 | "Reject None when `mem_get_info()[1] < threshold`" | `mem_get_info()` is `(free, total)`. Plan referenced `[1]` (total) but check should consider both. Honest threshold: reject `None` only when total VRAM < 16 GB (card class doesn't fit). |
| 6 | "Surface a warning via existing PlanWarning" | Concrete: `plan_render` in `planning.rs:263+` needs both `RuntimeProfilePreference` (user intent) AND resolved id, then `push(PlanWarning { code: "runtime_profile_substituted", ... })` when they differ. |
| 7 | "Touch `build_render_params` + `build_render_params_offset`" | Also `retry_segment_via_lease` (`runner.rs:972+`). Auto-propagates via shared helper, but test must explicitly verify retry payload carries the field. |

## Phase weights (unchanged)

```
DISCOVER ██████████ 25%       ↓ Reduced from 35% — debate already did much
                                of the research; remaining work is measuring
                                real model-offload behaviour on the user's
                                actual hardware
DEFINE   ████ 10%             ↓ Reduced from 15% — design locked by debate
DEVELOP  ███████████████ 40%  ↑ Increased — more concrete code surface
DELIVER  ██████████ 25%       ↑ Increased — sharper validation criteria
```

## DISCOVER (25%) — Reduced scope

Skip the offload-mode taxonomy survey (the debate already did that). The remaining DISCOVER work:

1. **Measure actual model_cpu_offload VRAM behaviour on the user's RTX 5070 Ti** for both fp8 and nvfp4. The codebase comment claims spill — verify or refute on the live hardware. If model offload actually fits in 16 GB without spill, lift the defaults from `Sequential` to `Model` for fp8 profiles.
2. **Confirm nvfp4 fits in 16 GB under `None`.** The first real-GPU render ran with `Sequential` and peaked at 7 GB worker working-set. With `None`, expect ~11-13 GB resident.

Both measurements: kick off a render with `advanced.offload_mode` explicitly set + watch `torch.cuda.memory_reserved()` via a `runtime.memory_stats` notification.

## DEFINE (10%) — Final design

### Rust schema

```rust
// extensions/builtin/nexus-video-ltx23/rust/src/schemas.rs

#[derive(Debug, Clone, Copy, Default, Deserialize, Serialize, PartialEq, Eq)]
#[serde(rename_all = "snake_case")]
pub enum OffloadMode {
    /// Use the profile's documented default. Resolved away in
    /// `runner.rs::build_render_params` before the worker sees the payload.
    #[default]
    Auto,
    /// `pipe.to("cuda")` — full pipeline resident on GPU. Fastest, requires
    /// most VRAM. Rejected by the worker pre-check on cards with < 16 GB total.
    None,
    /// `pipe.enable_model_cpu_offload()` — one major submodule on GPU at a
    /// time. Mid-grained, mid-speed.
    Model,
    /// `pipe.enable_sequential_cpu_offload()` — one layer on GPU at a time.
    /// Slowest, lowest VRAM. Current default for fp8 profiles.
    Sequential,
}

// Existing AdvancedSettings struct — append:
#[serde(default)]
pub offload_mode: OffloadMode,
```

NOT `Option<OffloadMode>`. The `#[serde(default)]` + `#[default] Auto` gives identical "missing key → use default" semantics with one fewer indirection. Survives `parse_request_for_retry` round-trips cleanly because `"auto"` is a real wire value.

### Per-profile defaults (corrected)

```rust
// extensions/builtin/nexus-video-ltx23/rust/src/runtime_selection.rs

pub const fn default_offload_mode_for_profile(profile: &str) -> OffloadMode {
    match profile {
        // FP4 weights ~11 GB on a 16 GB Blackwell card — fits resident with
        // headroom for activations + VAE + text encoder. None is the right
        // default; operator can downgrade to Model if they're tight.
        "rtx50-nvfp4" => OffloadMode::None,
        // FP8 weights ~14 GB. On the user's RTX 5070 Ti, code comments at
        // pipeline_diffusers.py:401-414 documented model_cpu_offload spilled
        // to unified memory. Default Sequential until a fresh benchmark proves
        // Model fits. Operator can opt into Model when they've measured.
        "rtx50-fp8" | "rtx40-fp8" => OffloadMode::Sequential,
        // CI / no GPU
        "fake" => OffloadMode::Sequential,
        // Unknown profile — safest mode
        _ => OffloadMode::Sequential,
    }
}
```

NOTE: `&str` here is the SHORT slug (e.g. `"rtx50-nvfp4"`). The caller must strip the `nexus.video.ltx23.` prefix before calling. Match the existing `short_profile()` helper in `runner.rs:1335`.

### nvfp4 downgrade fix (Option C — drop the gate)

Rationale: 2026-05-15 real-GPU render proved nvfp4 path works end-to-end. The `experimental_nvfp4_opt_in` gate was a P0 guardrail; we're past P0.

```rust
// extensions/builtin/nexus-video-ltx23/rust/src/runtime_selection.rs

// REMOVE the experimental_nvfp4_opt_in parameter from:
//   pub const fn resolve_runtime_id(pref: RuntimeProfilePreference, _: bool) -> &'static str
// to:
//   pub const fn resolve_runtime_id(pref: RuntimeProfilePreference) -> &'static str
// AND the Rtx50Nvfp4 → rtx50-fp8 fallback arm.

// extensions/builtin/nexus-video-ltx23/rust/src/api.rs:246
//   was: resolve_runtime_id(req.runtime_profile, false)
//   to:  resolve_runtime_id(req.runtime_profile)

// Same change at api.rs:304
```

If `Rtx50Nvfp4` is requested but `nexus.video.ltx23.rtx50-nvfp4` isn't installed, the existing profile-install check returns 503 with a clear error. That's the right failure mode — surface "install the profile" instead of silently substituting.

### Frontend

```typescript
// extensions/builtin/nexus-video-ltx23/web/src/api.ts
export type OffloadMode = "auto" | "none" | "model" | "sequential";

export interface AdvancedSettings {
  // ... existing fields ...
  offload_mode?: OffloadMode;  // optional on the wire; backend defaults to "auto"
}
```

Recipe form: native `<select>` with four options + help text. NOT a slider.

## DEVELOP (40%) — Files to touch, in build order

### Layer 1 — Rust schema

1. **`schemas.rs`** — add `OffloadMode` enum + `#[serde(default)]` field on `AdvancedSettings`.

### Layer 2 — Rust runtime selection (downgrade fix)

2. **`runtime_selection.rs`** — drop `experimental_nvfp4_opt_in` parameter from `resolve_runtime_id`. Add `default_offload_mode_for_profile(&str) -> OffloadMode`.
3. **`api.rs:246` + `api.rs:304`** — remove the `false` argument.
4. **Regression test in `runtime_selection.rs::tests`** — `Rtx50Nvfp4` resolves to `"nexus.video.ltx23.rtx50-nvfp4"`.

### Layer 3 — Rust runner (payload propagation)

5. **`runner.rs::build_render_params`** — resolve `OffloadMode::Auto` → `default_offload_mode_for_profile(short_profile(profile))` BEFORE serialising. Worker only ever sees `none`/`model`/`sequential` (never `auto`). Include in the `advanced` block of the JSON payload.
6. **`build_render_params_offset`** — same logic (resume path).
7. **Test propagation through `retry_segment_via_lease`** — `runner.rs:972+` calls `build_render_params` directly so the field propagates automatically, but add a test that verifies retry payloads include the right `offload_mode`.

### Layer 4 — Worker dispatch

8. **`pipeline_diffusers.py::_ensure_pipeline_loaded`** — accept new `offload_mode: str` parameter. Dispatch:
   ```python
   if offload_mode == "none":
       free, total = torch.cuda.mem_get_info()
       if total < 16 * 1024**3:
           raise _ModelLoadFailed(
               f"offload_mode=none requires 16 GB+ VRAM, got {total / 1e9:.1f} GB"
           )
       pipe = pipe.to("cuda")
   elif offload_mode == "model":
       pipe.enable_model_cpu_offload()
   elif offload_mode == "sequential":
       pipe.enable_sequential_cpu_offload()
   else:
       raise _ModelLoadFailed(f"unknown offload_mode: {offload_mode!r}")
   ```
9. **`_load_then_render` + `_load_then_retry_segment`** — pull `raw_params["advanced"]["offload_mode"]` (no `_or_default` needed; host now resolves Auto so it's always a concrete string), thread through.

### Layer 5 — PlanWarning surface (deferred — only needed if a downgrade is ever re-introduced)

Skipped per Option C above. If the gate is ever re-added, `plan_render` accepts the original preference + resolved id and emits `PlanWarning { code: "runtime_profile_substituted" }`.

### Layer 6 — Frontend

10. **`api.ts`** — `OffloadMode` type + field on `AdvancedSettings`.
11. **`App.tsx`** — advanced form section: `<select>` with four options + 1-line help string per option.

### Layer 7 — Tests

12. **Rust unit tests**:
    - `schemas` — `OffloadMode` round-trips through serde as snake_case strings.
    - `AdvancedSettings` — deserialises from `{"advanced": {}}` with `offload_mode = Auto` (via `#[serde(default)]`).
    - `default_offload_mode_for_profile` — exhaustive per-profile assertions.
    - `build_render_params` — when input is `Auto`, payload contains the per-profile concrete string. When input is `None`/`Model`/`Sequential`, payload contains exactly that.
    - `retry_segment_via_lease` test — payload carries `offload_mode`.
    - `resolve_runtime_id(Rtx50Nvfp4)` returns `"nexus.video.ltx23.rtx50-nvfp4"`.
13. **Python unit tests** (`test_diffusers_resolver.py` or new file):
    - For each of `{none, model, sequential}`, `_ensure_pipeline_loaded` calls the matching diffusers helper (mock the pipe via `MagicMock`).
    - `none` + insufficient VRAM raises `_ModelLoadFailed`.
14. **Frontend test**: form's dropdown selection lands as `advanced.offload_mode` string in the request body.

## DELIVER (25%) — Sharper validation gate

Standard gate:
- `cargo clippy -p nexus-video-ltx23-extension --all-targets -- -D warnings`
- `cargo test -p nexus-video-ltx23-extension --lib`
- `bash extensions/builtin/nexus-video-ltx23/scripts/audit-boundary.sh`
- `uv run --extra test python -m pytest tests/ --ignore=tests/test_gguf_loader.py` in `worker/`
- `pnpm tsc --noEmit && pnpm build` in `web/`

**Real-GPU smoke (rewritten per debate finding 4):**

```python
# In a new pytest or a manual script run against the live host.
# Submit a render with runtime_profile="rtx50-nvfp4", offload_mode="none".
# Worker should emit a new runtime.weights_resident notification carrying:
#   {
#     "transformer_device": "cuda",
#     "memory_reserved_bytes": <int>,
#     "expected_min_bytes": 9 * 1024**3
#   }
# emitted right after _ensure_pipeline_loaded returns, before first SEGMENT_STARTED.

# Assertions:
assert run["status"] == "completed"
# worker reported transformer on cuda
assert weights_resident["transformer_device"] == "cuda"
# at least 9 GB reserved (NVFP4 transformer ~11 GB but allocator may share)
assert weights_resident["memory_reserved_bytes"] >= 9 * 1024**3
# worker logs reported profile=rtx50-nvfp4, not rtx50-fp8 (downgrade fix)
assert "profile\": \"rtx50-nvfp4\"" in worker_log
# inference faster than baseline 17.7 s/step
inference_secs_per_step = (run_end - first_segment_started) / num_inference_steps
assert inference_secs_per_step < 10.0
```

NEW notification needed: `Notifications.WEIGHTS_RESIDENT` in `rpc.py` + emit in `_load_then_render` after the dispatch.

## Provider availability (debate)

🔴 Codex CLI: Available ✓ — secondary cross-check during DEVELOP
🟡 Gemini CLI: Not installed ✗
🟤 OpenCode: Not installed ✗
🟣 Copilot CLI: Available ✓
🔵 Claude: Available ✓ — primary

## Time estimate (revised)

- DISCOVER: 30 min (real-GPU measurement of model_cpu_offload behaviour, not survey)
- DEFINE: 0 min (locked above)
- DEVELOP: 90-120 min (4 layers + tests, ~14 small changes)
- DELIVER: 30 min validation + ~5 min real-GPU smoke render

**Total: ~2.5 hours**

## Execution

```bash
/octo:embrace "Implement operator-controlled offload + drop nvfp4 gate per session-plan.md v2"
```

or run phases individually:
- `/octo:discover` — measure model_cpu_offload behaviour on the live RTX 5070 Ti
- `/octo:develop` — implement the schema + plumbing + UI + downgrade fix
- `/octo:deliver` — validation gate + real-GPU smoke
