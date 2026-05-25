# Storyboard Improvement Backlog
## Council synthesis 2026-05-25 — landed after `800f771`

Constraint: only stable, low-blast-radius improvements. No risky experiments. Every item must be additive or behind opt-in flag — the validated pipeline (209/209 pytest, GPU smoke 253f/10.54s) is the floor.

5 personas voted: Quality, Observability, DevEx, Product/UX, Performance. 47 raw items → deduped to 27 → ranked into 3 sprints by value × (1/effort) × (1/risk).

User priorities (recap): (1) no melt/deform (2) coherence (3) motion diversity (4) 10-15s (5) i2v>t2v.

---

## Sprint 1 — Close the 18.9-min black box + tighten validator (1-2 days)

Highest-value, lowest-effort, lowest-risk. Land all of these first.

| # | Title | Effort | Value | Source | Rationale |
|---|---|---|---|---|---|
| **S1-1** | Wire scene-loop into PROGRESS/SEGMENT_STARTED/SEGMENT_COMPLETED notifications (already declared in rpc.py) | S | 5 | Obs-1 | User cannot see what's happening for 18.9 min. Notification names exist; just emit them. |
| **S1-2** | Emit MEMORY_STATS per scene boundary (cuda + rss + peak via existing telemetry pattern) | S | 4 | Obs-2 | Direct evidence for VRAM creep; supports priority #2 RCA. |
| **S1-3** | Emit ADAIN_STATS notification (anchor + pre/post stats already computed, currently log-only) | S | 4 | Obs-3 | Already in logs — route through notifier. Smoke output bit-for-bit identical. |
| **S1-4** | Standalone `validate-plan` CLI under `[project.scripts]` | S | 4 | DevEx-1 | Pre-render validation in <1s, no torch, no GPU. |
| **S1-5** | `--dry-run` flag on gpu_smoke.py | S | 4 | DevEx-2 | Sanity check storyboard before 25-min commit. |
| **S1-6** | Add `fix_hint` field to warning records (additive key, ignored by old consumers) | S | 4 | P/UX-5 | Maps 8 warning codes to actionable sentences. |
| **S1-7** | Doc `docs/warning_codes.md` — each code: trigger + severity + fix recipe + JSON before/after | S | 3 | DevEx-4 | Operator interprets warnings without source-diving. |
| **S1-8** | Doc `docs/storyboard.md` — 5 priorities → schema knobs → recommended ranges → warning codes | S | 4 | P/UX-9 | Single-page reference for tuning. |
| **S1-9** | Chaining-loop integration test (purge_kv_cache + damp_adain_drift on 4-scene mock plan) | S | 3 | Q5 | Pure-python; locks marker semantics. |
| **S1-10** | Seed-offset property test sweep (10K samples, no collisions) | S | 2 | Q10 | Cheap insurance against `_build_scene_generator` regression. |
| **S1-11** | Per-scene perf telemetry dump (wall/denoise/vae_decode/peak_mb/free_mb/attn_mode/swap) | S | 4 | Perf-1 | Read-only, single emit per scene. |
| **S1-12** | Verify `_set_distill_active` no-op fast path (explicit guard + unit test) | S | 3 | Perf-6 | All-distill plans (v6) shouldn't pay LoRA-toggle cost. |

**Sprint 1 effort total: ~12 × S ≈ 1.5-2 dev-days.** All non-mutating, all additive.

---

## Sprint 2 — Productise + speed up iteration loop (2-3 days)

Operator wants "Auto Storyboard" feel. These shape the surface so existing wire is easier to USE without changing what it does.

| # | Title | Effort | Value | Source | Rationale |
|---|---|---|---|---|---|
| **S2-1** | `compile_storyboard.py` deterministic compiler (prompt+duration+count → scenes JSON, regex+heuristic, no LLM) | M | 5 | P/UX-2 | The "one prompt → storyboard" Auto-Storyboard product promise without LLM risk. |
| **S2-2** | `longcat.video.preset.expand` RPC method (preset_name+prompt+duration+count → scenes[]) | S | 4 | P/UX-3 | Wire entry-point for S2-1 callable from any host. |
| **S2-3** | `longcat.video.render.estimate` RPC (heuristic wall + peak_vram from current datapoint ±25%) | S | 4 | P/UX-4 | Tell user "this will take 18 min" before they hit go. |
| **S2-4** | `scenes_templates.py` library: 2-scene-fast, 3-scene-cinematic, 4-scene-montage, dialogue-2scene | S | 3 | P/UX-1 | Templates seed S2-1's compiler + S2-2's preset RPC. |
| **S2-5** | Example storyboard JSONs under `examples/` (5 patterns, each validator-clean) | S | 3 | P/UX-6 + DevEx-6 | Repo-internal fixtures separate from D:/longcat_install/. Onboarder copies an example. |
| **S2-6** | `fast-preview` profile (height=384, width=672, steps=8, scene_count_cap=2, ~3min wall) | S | 5 | P/UX-7 | The 18.9-min wall kills iteration. Need a sub-5-min path. |
| **S2-7** | `preview_only_first_scene` request flag (renders scene 0 in ~6 min, skip chaining) | M | 4 | Perf-7 | Validate i2v anchor quality before committing full storyboard wall. |
| **S2-8** | Per-render manifest sidecar JSON (request + per-scene wall + warnings + peak_vram next to .mp4) | M | 5 | Obs-4 | Replayable evidence for every smoke. Out.json next to out.mp4. |
| **S2-9** | `--dump-scenes` flag on gpu_smoke.py (writes per-scene .mp4 between concat steps) | M | 4 | Obs-8 | Debug WHICH scene introduces melt — critical for priority #1. |
| **S2-10** | Text-encoder embedding cache across scenes (LRU 8 entries, keyed by prompt+neg+seq+dtype) | S | 2 | Perf-4 | Same character anchor across scenes ⇒ free reuse. |
| **S2-11** | Adaptive max_sequence_length (clamp to next multiple of 64 ≥ token_count+8, floor 128) | S | 2 | Perf-3 | Short prompts pay less attention compute. |
| **S2-12** | Pre-warm worker on boot (env-gated `LONGCAT_PREWARM=1`, default off) | M | 3 | Perf-5 | First render latency drops from 18.9 → 18 min — minor but stacks. |
| **S2-13** | `migrate-storyboard.py` CLI (rewrite legacy duration_seconds → per_scene_generated_seconds) | S | 2 | DevEx-3 | Silences DEPRECATED_FIELD_ALIAS on every smoke. |
| **S2-14** | Negative-prompt catalog `negative_prompts.py` — MELT/DEFORM/IDENTITY_DRIFT/MOTION_ARTIFACT frozensets + `compose()` | S | 4 | P/UX-8 + Q4 | Curated anti-melt vocabulary, opt-in merge into user negatives. |

**Sprint 2 effort total: ~14 items, mix of S+M ≈ 3 dev-days.** Big leverage on iteration speed (S2-3/S2-6/S2-7/S2-9) and Auto-Storyboard surface (S2-1/S2-2/S2-4/S2-5).

---

## Sprint 3 — Quality probes + regression armour (2-3 days)

Once visibility (Sprint 1) and iteration speed (Sprint 2) exist, lock in quality with detection probes and regression armour.

| # | Title | Effort | Value | Source | Rationale |
|---|---|---|---|---|---|
| **S3-1** | Frame-stats melt detector (numpy-only post-mux probe, opt-in flag, emits warnings) | M | 5 | Q1 | Automated melt-suspicion signal from luma_variance + edge_energy_ratio + frame_to_frame_l1. |
| **S3-2** | Golden-frame regression harness (committed PNG fixtures + pHash ±8 tolerance, CPU-only) | M | 4 | Q2 | Detects FP8 numerical drift, scheduler regressions, conditioning changes. |
| **S3-3** | AdaIN factor auto-suggest warning (≥4 scenes ∧ factor>0.6 → drift; 2-scene ∧ <0.3 → under-locked) | S | 3 | Q3 | Catches mis-tuned chains before render. |
| **S3-4** | Cumulative-drift report inside validator's normalized output (`drift_report` key) | S | 3 | Q6 | Predicted residual + recommended purge count. |
| **S3-5** | Per-scene refine heuristic warning (distill+refine+steps<6 OR refine=false+duration>4s) | S | 2 | Q8 | Refinement strategy guidance. |
| **S3-6** | Scene-failure classifier expansion (VAE_NAN_FRAME, KV_CACHE_DTYPE_MISMATCH, OFFLOAD_STREAM_DEADLOCK) + regression guard | S | 2 | Q7 | Hypothesis-style test asserts existing fixture strings keep their current classification. |
| **S3-7** | Frame-level invariant probe in ffmpeg_io (fps_exact + frame_count + duration_s assertion against plan) | S | 3 | Q9 | Catches off-by-N at file level. |
| **S3-8** | Denoise step progress notification (throttled ≤2 Hz) | M | 4 | Obs-6 | Closes the remaining black-box gap inside each scene's 6-min denoise. |
| **S3-9** | Structured failure event from classifier (in addition to log/raise) | S | 2 | Obs-7 | UI gets actionable error category, not raw stack. |
| **S3-10** | Replayable event-stream dump (`--event-log` flag tees NDJSON to file) | S | 3 | Obs-9 | Replay smoke runs offline; diff event streams between runs. |
| **S3-11** | `capabilities.describe` RPC (profile + offload_mode + fp8_mode + distill_lora_loaded + supported_notifications) | S | 2 | Obs-10 | Host renders capability-aware UI without empirical probing. |
| **S3-12** | JSON Schema export for IDE autocomplete (`storyboard.schema.json` generated from validator constants) | M | 3 | DevEx-7 | VSCode users get inline validation via `$schema` ref. |
| **S3-13** | Cache distill-LoRA path resolution (memoize filesystem glob per profile_id+lora_kind) | S | 1 | Perf-2 | Micro-optimization; ~10ms saved per render. |
| **S3-14** | Consolidated `FakePipeline` fixture in conftest.py (3 inline fakes → 1 shared) | M | 2 | DevEx-8 | Test scaffolding refactor; reduces 3-way drift. |
| **S3-15** | Repo-root justfile recipes (`longcat-test`, `longcat-validate <file>`, `longcat-smoke-dry <file>`) | S | 2 | DevEx-9 | One-line operator commands. |
| **S3-16** | pytest `gpu` marker (separate GPU smoke from unit tests; current tests stay green) | S | 1 | DevEx-5 | Future-proofs CI separation. |

**Sprint 3 effort total: ~16 items, mix of S+M ≈ 3 dev-days.**

---

## Rejected / out of scope

These came up in council discussion and were explicitly NOT proposed:

- **Pre-commit/pre-push hooks** — cross-platform .sh+.ps1 doubling overhead, blocks exploratory work
- **Frontend storyboard editor in apps/web/** — deferred to a separate spec
- **LLM-backed planner** — rejected by SOTA review for v1; deterministic regex compiler covers 80% (S2-1)
- **Migration to different package manager** — out of scope
- **New attention kernel / FP8 path / scheduler changes** — anything that needs fresh GPU smoke validation
- **torch.compile** — Blackwell + FP8 compile path unverified; opt-in only as future spec
- **OpenTelemetry / Jaeger / web dashboard** — overkill; stdio NDJSON is enough
- **Custom CUDA kernels** — out of scope

---

## Cross-cutting safety rules (apply to every item)

1. **Existing 209/209 pytest must stay green.** No item lands without re-running the suite.
2. **GPU smoke output mp4 sha256 must be identical** for any change claiming "observability-only" (S1-1..S1-3, S1-9..S1-11, Obs items). Verifies non-mutation.
3. **No edits to FP8 loader, scheduler, attention path, or chaining math.** New helpers add to `chaining.py`; pipeline math stays untouched.
4. **Every new .sh has paired .ps1** (cross-platform memory note).
5. **Every new module: zero docstrings, zero inline comments** (no-comments user preference). Self-documenting names + type hints.
6. **Backward compat with legacy v3/v4/v5 JSONs** preserved on every validator change.
7. **All new RPC methods registered alongside existing ones** in `register_longcat_handlers`. No removal of public API.

---

## Sequencing rationale

- **Sprint 1 first** because observability + validator hardening unblock everything else: you can see what's happening, what's wrong, and what to fix.
- **Sprint 2 second** because productisation surface (compile_storyboard + preset.expand + fast-preview) closes the "one prompt → movie" UX gap.
- **Sprint 3 last** because quality probes need the visibility from Sprint 1 + faster iteration from Sprint 2 to be effective.

**Total estimated effort: ~7-8 dev-days across 3 sprints, ~42 deliverables.**

---

## Top 5 "if you only have 1 day"

If only one day available, ship these 5 (all S, all zero-risk, all priority ≥4):

1. **S1-1** Scene-loop progress notifications wired (closes 18.9-min black box)
2. **S1-4** `validate-plan` CLI (pre-render <1s sanity check)
3. **S1-6** Warning `fix_hint` field (every warning becomes actionable)
4. **S1-8** `docs/storyboard.md` priority→knob map (operator reference)
5. **S2-6** `fast-preview` profile (3-min iteration loop vs 19-min full render)

These 5 unblock 80% of the user's day-to-day pain.
