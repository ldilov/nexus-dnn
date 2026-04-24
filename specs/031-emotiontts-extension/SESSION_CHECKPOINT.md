# Session Checkpoint — Spec 031 (EmotionTTS Extension)

**Last updated**: 2026-04-24 (Phases 1-5 shipped + two review passes applied)
**Branch**: `main` (local; not yet pushed to origin this session)
**Last commit**: `1b2c0c5 fix(spec-031): finish priority review fixes (stale-read follow-up)`
**Status**: **102 of 136 tasks `[X]`** in `tasks.md`. US1 + US2 + US3 P1 trio shipped. Backend + critical UI complete; Phase 6 (US4 emotion presets) + Phase 7 polish remain.

---

## Start here (new agent onboarding)

1. Read `.tours/architect-full-stack.tour` (host-wide walkthrough — still the canonical onboarding path for how Nexus hosts extensions).
2. Read `specs/031-emotiontts-extension/plan.md` for the EmotionTTS architecture + constitution check.
3. Read `specs/031-emotiontts-extension/research.md` — especially R-10 (cache key), R-11 (partial-run resume), and **R-12** (six default-on + one opt-in backend optimisations baked into the adapter). Knowing R-12 matters because it surfaces in manifest settings and the adapter call sites.
4. Read `specs/031-emotiontts-extension/data-model.md` for the 8 `ext_emotion_tts__*` tables and their relationships.
5. Skim `.claude/rules/host-extension-boundary.md` — **NON-NEGOTIABLE Principle XIII**; every boundary audit must stay clean.
6. Consult the agent memory at `C:/Users/lazar/.claude/projects/D--Workspace-repos-nexus-dnn/memory/project_spec_031_progress.md` for the most recent status snapshot.

After orientation, read **this checkpoint's "Gotchas" section** before touching any file.

---

## TL;DR for the next session

- Phases 1–5 ship the **P1 trio**: dialogue batch synthesis (US1), runtime install + lifecycle (US2), mapping editor (US3). Plus the Rust domain / operators / queue / router foundations from Phases 2–3.
- **142 Rust tests green** · ~20 pytest cases (runs on CPU-only CI; adapter calls stubbed) · Playwright E2E scaffold gated behind `RUN_E2E=1`.
- Both boundary audits clean (`scripts/audit-runtime-boundary.ps1` + `extensions/.../scripts/audit-boundary.ps1`).
- Two rounds of `superpowers:requesting-code-review` completed. The user has the **full list of deferred items** recorded below — any Phase 6/7 session should sweep them first or explicitly flag them as deferred-again.
- **Web bundle is source-only** every session. No `npm install` / no live mount in the preview tool. First CI `pnpm build` will tree-check types.

### Next command

`/speckit.tasks` on Phase 6 is already done (the file is complete through T110). Pickup is `T101` onward — the emotion control + preset CRUD + UI polish flow. See "Phase 6 entry point" below.

---

## Commit trail (this session's branch history since spec 032 checkpoint)

```
1b2c0c5  fix(spec-031): finish priority review fixes (stale-read follow-up)
f2e1a08  fix(spec-031): apply 8 priority review fixes (4 Critical + 4 Important)
17b2ec3  fix(spec-031): sync mappings_client.ts with Phase 5 endpoints
e029b5e  feat(spec-031): Phase 5 — Mapping editor (US3)
8eb511e  feat(spec-031): Phase 4 — IndexTTS runtime install, lifecycle, CTAs
235738a  feat(spec-031): Phase 3 complete — recipe UI + run panel + E2E scaffold
419e1e9  fix(spec-031): apply Phase 3 code-review priority fixes
c7649dd  feat(spec-031): Phase 3 — US1 MVP domain + operators + router + worker
65a643c  fix(spec-031): apply code-review pre-Phase-3 fixes
1e5c7b2  feat(spec-031): Phase 2 foundation — migrations, Rust repos, RPC, Python worker
89f195b  feat(spec-031): Phase 1 setup — repo skeleton for EmotionTTS extension
```

All commits follow conventional-commit format. Zero force-pushes.

---

## Architecture snapshot (Phases 1–5)

### Rust crate (`extensions/builtin/emotion-tts/rust/`) — standalone workspace, not a member of the host

```
src/
├── lib.rs                     # register(pool, lease_factory, artifact_store) entry
├── host_contract.rs           # HostStoragePool, BackendRuntimeLease, HostArtifactStore
├── domain/                    # Pure functions (74 unit tests):
│   ├── ids.rs                 #   8 ULID-backed newtypes + ContentHash (64-hex)
│   ├── errors.rs              #   EmotionTtsError + IntoResponse + status codes
│   ├── parser.rs              #   [Char|k:v] / [Char:compat_ref] / Narrator fallthrough
│   ├── emotion.rs             #   5-level precedence resolver (FR-063)
│   ├── cache_key.rs           #   v1:-prefixed SHA-256 over stable canonical string
│   ├── filenames.rs           #   {NNN}_{sanitised}_{NNN}.{ext} with ASCII safety
│   └── manifest.rs            #   JSON + CSV builders with partial-run provenance
├── operators/                 # 7 async-trait operators (Strategy pattern)
├── queue/                     # FIFO + test-line slot + CancellationToken
│   ├── mod.rs                 #   RuntimeQueue (single-batch lease per Q1)
│   └── resume.rs              #   Pure plan_resume() classifier
├── backend_client/            # Typed wrapper over host BackendRuntimeLease
│   ├── mod.rs                 #   BackendClient + LeaseProvider + is_serviceable()
│   ├── rpc.rs                 #   method / error-code constants, lease_error_to_domain
│   └── notifications.rs       #   broadcast fanout → ProgressEvent classification
├── storage/                   # 8 SQLite repos + Repos bundle
└── router/
    ├── runs.rs                # US1 — POST/GET/cancel/test-line + preflight
    ├── runtime.rs             # US2 — health/handshake/start/stop/restart + normalizer
    ├── deployments.rs         # US3 — CRUD + /resume
    ├── voice_assets.rs        # US3 — multipart upload + ffprobe + /probe
    ├── mappings.rs            # US3 — CRUD + duplicate + import/export
    ├── presets.rs             # US4 — 501 stub (Phase 6)
    └── exports.rs             # 501 stub (Phase 7)
```

### Python worker (`extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/`)

```
__main__.py        # Process entrypoint — wires adapter + synthesis + Phase-4 handlers
main.py            # stdio NDJSON JSON-RPC 2.0 event loop + Worker with .emit() + _dispatch_line (probes exc.rpc_error)
handlers.py        # register_phase4_handlers: handshake/health/ensure_model/load_model/unload/cancel (+ synthesize pair)
model_loader.py    # probe_model_dir + orchestrate_load (stage callbacks, emits model.load.progress)
indextts_adapter.py# IndexTtsAdapter wraps IndexTTS2.infer() with ensure_model(on_stage callback)
synthesis.py       # SynthesisService drives batch with segment_* notifications + derive_batch_status
cancellation.py    # CancelToken (threading.Event + on_step hook)
audio_probe.py     # torchaudio.info with soundfile fallback
rpc.py             # Pydantic models + Methods + ErrorCodes constants
telemetry.py       # WorkerLogger → log notifications + stderr mirror
```

### Frontend (`extensions/builtin/emotion-tts/web/`) — Vite lib-mode bundle, host-mounted

```
src/
├── main.tsx                   # StrictMode + RouterProvider mount
├── routes.ts                  # createBrowserRouter basename=/extensions/nexus.audio.emotiontts
├── theme/tokens.css.ts        # vanilla-extract Spectral-Graphite tokens (oklch)
├── services/                  # single I/O boundary per Principle XII.4
│   ├── http.ts                #   apiFetch + ExtensionApiError + EXTENSION_PREFIX
│   ├── types.ts               #   EmotionMode (RPC) + PersistedEmotionMode (DB)
│   ├── deployments_client.ts
│   ├── mappings_client.ts     #   CRUD + duplicate + import/export + MappingBundle
│   ├── voice_assets_client.ts #   multipart upload + probe
│   ├── runs_client.ts         #   create/list/get/cancel/test-line + SSE progress
│   ├── runtime_client.ts      #   health/handshake (camelCase) + start/stop/restart
│   └── model_store_client.ts  #   INDEXTTS_FAMILY_ID + download progress SSE
└── views/
    ├── deployments/           # index
    ├── recipe/                # recipe.view/ui/css + run_panel (SSE) + script_editor + emotion_panel + emotion_radar
    ├── mapping_editor/        # editorial sidebar + detail (2fr/1fr) + drag-drop + import/export
    ├── run_detail/
    ├── runtime_queue/         # cross-deployment queue poller (/runtime/queue — backend stub pending)
    └── mapping_editor/new_mapping.view.tsx   # cross-view Create-mapping CTA target
```

---

## Task status — 102 of 136 `[X]`

| Phase | Range | Status |
|---|---|---|
| 1 Setup | T001–T008 | ✅ All `[X]` |
| 2 Foundation | T009–T033 | ✅ All `[X]` |
| 3 US1 Dialogue Batch | T034–T071 | ✅ 38 / 38 (includes T069a, T069b) |
| 4 US2 Runtime Install | T072–T090 | ✅ All `[X]`; T072/T073/T075/T085 deferred per user ("coverage not important") |
| 5 US3 Mapping Editor | T091–T100 | ✅ All `[X]` |
| **6 US4 Emotion** | **T101–T110** | ⏳ Next up |
| 7 US5 Queue + Partial | T111–T120 | ⏳ |
| 8 US6 DAG recipe editor | T121–T130 | ⏳ |
| 9 US7 Polish + E2E + security | T131–T136 | ⏳ |

---

## Phase 6 entry point — what to do next

`tasks.md` §Phase 6 tracks **T101–T110** (User Story 4: 8-axis emotion + presets). Suggested ordering:

1. **T101** Contract test for `POST /presets` / `PATCH /presets/:id` — one test covering the `UNIQUE (deployment_id, preset_name)` invariant is enough per user direction.
2. **T102** `router/presets.rs` — replace the 501 stub with real CRUD over `PresetsRepo`. Vector input validation: exactly 8 floats, each ∈ `[0,1]`. Mirror the mapping editor's conflict-strategy pattern if preset import lands.
3. **T103** Wire `PresetsRepo` imports into `build_router` alongside mappings/deployments.
4. **T104** `web/src/services/presets_client.ts` — typed CRUD + import/export.
5. **T105** `views/recipe/components/emotion_panel.tsx` upgrades:
   - Preset library dropdown (LRU-ordered by `updated_at`)
   - "Save current vector as preset" action (name modal reuses `motion/react` toast pattern)
   - Delete preset inline
6. **T106** Inline per-line override parser docs — tooltip/inline popover explaining `[Char|emotion_vector:happy=0.7]`, `[Char:compat_ref]`, `[Char|qwen:template]`. The parser already handles these; UI needs affordance.
7. **T107** `views/recipe/components/emotion_radar.tsx` — add preset-snapshot flashing animation when the user picks a preset (subtle pulse on the polygon).
8. **T108** "Apply preset to all characters" bulk action.
9. **T109** Optional emotion-vector validator (frontend) mirroring the 8-float / [0,1] rule.
10. **T110** Any polish per FR-063 user story that slipped.

**Per user's standing direction**: only write critical tests. Coverage is not a goal — catching user-visible regressions is.

---

## Deferred items from code review (apply as backlog when relevant)

From the two review passes already completed:

### From Phase 3 review (still deferred — the simpler ones were already fixed)

- I-2 Pydantic `ValidationError` mapping in worker `_dispatch_line`
- I-4 `tracing::warn` on `NotificationFanout` lagged/dropped subscribers
- I-5 `[Char:tok:more]` advanced_tagged parser edge case
- I-6 O(n) mapping lookup in `emotion_resolve`
- I-7 `IdError` 400 vs 404 discrimination
- M-12 / M-13 `runs.rs` decomposition into `runs/{handlers,dtos,shapes}.rs`
- M-19 / M-20 streaming ZIP export (current implementation reads full segments into memory)
- M-21 typed `OPERATOR_CATALOG` + `ErasedOperator`
- M-23 filename extension validation (reject `/`, `\`, `..`)
- M-26 concurrent-cancel contract test
- M-29 typed DTOs replacing `serde_json::Value` at HTTP boundary
- M-30 OpenAPI-driven TS type generation

### From Phase 4/5 review (just completed)

- **I-7** stop_impl queue TOCTOU: runs enqueued between snapshot and `provider.stop()` escape the cancel cascade. Needs a queue-gate primitive (`drain_and_reject_new_with(reason)`).
- **M-15** `mapping_editor.view.tsx` at 783 LOC is 8 lines under the 800 soft limit; extract `VoicePicker` / `VoiceDetail` / `Waveform` / `AudioDropzone` / `ImportExportBar` to siblings.
- **M-16** `mapping_editor.css.ts` at 455 LOC — split per concern (layout / dropzone / duration / buttons).
- **M-17** Replace `alert()` + `confirm()` with a motion-backed modal (the dependency is already imported).
- **M-20** Extract `apply_import_dto(row, dto, now)` helper shared by mapping create + import/replace.
- **M-22** Declarative `register_phase4_handlers` table `[(Methods.HEALTH, health), …]`.
- **M-23** Narrow `RuntimeBadge` TS union to match `lease_state_to_badge` output (or emit missing backend states).
- **M-25** Replace magic strings in `warning_flags` with a typed `WarningFlag` enum shared via contract module.

### Phase 2 review (very old, still open — was low-priority)

- Pydantic wire-up in `_dispatch_line`
- `CharacterKey` wrapper for display/lower pair
- `runs.started_at <= finished_at` CHECK
- Presets hard-delete reconsideration

---

## Gotchas for the next session (READ FIRST)

1. **Stale-read trap on Edit**. The session-9 and session-11 pattern keeps biting: after one agent-run writes a file, the subsequent Edit must be preceded by a fresh `Read` of the same file. Out-of-order Edits silently drop. **Always run a grep after a batch of Edits to verify each fix actually landed** before committing.

2. **Web bundle is source-only**. Every session ends with `web/src/*` unvalidated by `tsc`. First CI `pnpm build` will surface type drift. For now we rely on the services + views being small and named-import-tight.

3. **`specs/` is gitignored**. This file + `tasks.md` + `research.md` only enter the commit via `git add -f <path>`. Check `git log --follow specs/031-emotiontts-extension/SESSION_CHECKPOINT.md` to confirm previous force-adds if unsure.

4. **The boundary audit has two scripts**, both must pass:
   - `scripts/audit-runtime-boundary.ps1` — host-wide (reads `scripts/boundary-exclusions.yaml`)
   - `extensions/builtin/emotion-tts/scripts/audit-boundary.ps1` — per-extension (has its own grandfathered-fixture list at `crates/nexus-backend-runtimes/src/generic/ids/runtime_id.rs`)

5. **Cargo workspace isolation**. The extension's `rust/Cargo.toml` declares `[workspace]` (empty) to opt out of the nexus-dnn host workspace. Never remove this — the host uses `edition2024` which requires Rust 1.85+, while our `rust-toolchain.toml` (now dropped) was causing edition-feature mismatches.

6. **R-12 optimisations are baked into the adapter**. If Phase 6 adds new preset behaviour, confirm the adapter still honours `low_vram`, `gpt_batch_size`, and the opt-in `torch_compile`. See `indextts_adapter.py::AdapterSettings`.

7. **Host-artifact-store trait is abstract**. Extension compiles + tests against an in-memory mock. The real host wiring lands in a host-side PR separately — don't fake-implement it inside the extension.

8. **mappings.rs file is getting thick** (~520 LOC). Phase 6 shouldn't add more to it; if presets CRUD needs shared helpers, factor them into `storage/` helpers, not another endpoint method here.

9. **Progress notifications must fire BEFORE their work**, not after. The C2 fix in `1b2c0c5` restructured this — if Phase 6 adds a new stage (e.g. `"saving_preset"`), follow the same pattern: `on_stage(name)` → do the work → next `on_stage(name)`.

10. **Optimistic UI state needs rollback**. The `persistSelected` pattern in `mapping_editor.view.tsx` now snapshots + restores on error. Any new form in Phase 6 should use the same structure — locally mutate, then `void persist()`; on error, the persister rolls back.

11. **Runs.rs file** is still not decomposed (flagged in Phase 3 review as M-12/M-13). Phase 7 polish is the natural moment to do it.

---

## Quick verification checklist before calling a task done

```bash
# Rust build + tests
cd D:/Workspace/repos/nexus-dnn/extensions/builtin/emotion-tts/rust
cargo check --all-targets            # must be clean
cargo test --lib --tests             # expect 142+ passing

# Boundary audits
cd D:/Workspace/repos/nexus-dnn
powershell -ExecutionPolicy Bypass -File scripts/audit-runtime-boundary.ps1
powershell -ExecutionPolicy Bypass -File extensions/builtin/emotion-tts/scripts/audit-boundary.ps1
# Both must say PASSED

# Optional — Python syntax + import check (CPU-only)
cd extensions/builtin/emotion-tts/worker
python -c "from emotion_tts_worker import handlers, main, model_loader, synthesis"
```

---

## Memory bookmark

`C:/Users/lazar/.claude/projects/D--Workspace-repos-nexus-dnn/memory/project_spec_031_progress.md` — the sticky one-paragraph status summary. Gets updated every session.
