---
description: "Tasks for spec 036 — EmotionTTS Audio Editing"
---

# Tasks: EmotionTTS Audio Editing

**Branch**: `036-audio-editing`
**Input**: Design documents from `/specs/036-audio-editing/`
**Prerequisites**: [plan.md](./plan.md), [spec.md](./spec.md), [research.md](./research.md), [data-model.md](./data-model.md), [contracts/](./contracts/), [quickstart.md](./quickstart.md)

**Tests**: TDD requested per Constitution Principle VI. Backend contract tests +
worker pytest cases + cache-key invariant tests are mandatory and authored RED
before implementation. Waveform component tests follow the design-heavy carve-out
documented in plan.md § Test strategy.

**Code review**: After EVERY user-story phase ends (P1, P2, P3, P3-audit), pause
to invoke `/requesting-code-review` per the user's instruction in the
`/speckit-tasks` invocation. The pause is encoded as a checklist task at the end
of each phase — do not skip.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (US1..US5)
- File paths are absolute under repo root unless noted

## Path Conventions

All work lives under `extensions/builtin/emotion-tts/` per Constitution XIII.

- Rust shim: `extensions/builtin/emotion-tts/rust/src/`
- Rust tests: `extensions/builtin/emotion-tts/rust/tests/`
- Python worker: `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/`
- Worker tests: `extensions/builtin/emotion-tts/worker/tests/`
- SQL migrations: `extensions/builtin/emotion-tts/storage/migrations/`
- Web UI: `extensions/builtin/emotion-tts/web/src/`
- Boundary script: `extensions/builtin/emotion-tts/scripts/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Land migrations, dependency wiring, and the shared `audio_edit`
domain module before any user-story work begins. Pure infrastructure — no UI.

- [X] T001 Add migration `extensions/builtin/emotion-tts/storage/migrations/015_voice_asset_edit_chain.sql` adding nullable `edit_chain_json TEXT` column to `ext_emotion_tts__voice_assets`
- [X] T002 [P] Add migration `extensions/builtin/emotion-tts/storage/migrations/016_utterance_edit_chain.sql` adding nullable `edit_chain_json TEXT` column to `ext_emotion_tts__utterances`
- [X] T003 [P] Add migration `extensions/builtin/emotion-tts/storage/migrations/017_audio_edit_log.sql` creating `ext_emotion_tts__audio_edit_log` table with indexes on `(target_id, recorded_at DESC)` and `(deployment_id, recorded_at DESC)` per data-model.md
- [X] T004 [P] Update extension manifest `extensions/builtin/emotion-tts/manifest.yaml` `storage.migrations` array to register migrations 015, 016, 017 (also wired into `rust/src/lib.rs::MIGRATIONS` — the actual loader)
- [X] T005 Update boundary audit script `extensions/builtin/emotion-tts/scripts/audit-boundary.sh` (and `.ps1` variant) to grep for new literals (`ext_emotion_tts__audio_edit_log`, `audio.edit`, `audio.edit.preview`) per [contracts/boundary-audit.md](./contracts/boundary-audit.md)
- [X] T006 [P] Add new RPC method-name constants `AUDIO_EDIT` and `AUDIO_EDIT_PREVIEW` to `extensions/builtin/emotion-tts/rust/src/backend_client/rpc.rs::methods`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Land the typed `EditOp`/`EditChain`/`ChainDigest`/`AuditEntry`
domain core, the audit-log repo, and the cache-key wiring. These are imported
by every user-story phase and MUST be RED-tested first.

**⚠️ CRITICAL**: No user-story phase may begin until this checkpoint passes.

### Tests authored RED before implementation

- [X] T007 [P] Write failing test `extensions/builtin/emotion-tts/rust/tests/audio_edit_chain_digest_test.rs` covering: identical chain → identical digest, op reorder → different digest, empty chain → `ChainDigest::EMPTY` constant, version mismatch → validation error
- [X] T008 [P] Write failing test `extensions/builtin/emotion-tts/rust/tests/audio_edit_cache_key_invalidation_test.rs` covering: chain change shifts cache key (SC-003); chain clear restores original cache key (SC-004)
- [X] T009 [P] Write failing test `extensions/builtin/emotion-tts/rust/tests/audio_edit_audit_log_sequence_test.rs` covering: 3 applies + 1 clear → 4 entries with correct before/after digests (SC-010); audit row survives target deletion

### Implementation

- [X] T010 Create `extensions/builtin/emotion-tts/rust/src/domain/audio_edit.rs` with `EditOp` (`#[serde(tag = "mode", rename_all = "snake_case")] #[non_exhaustive]`), `EditChain { version, ops }`, `OperationId` newtype around ULID, `validate()` enforcing range/length/min-duration rules per data-model.md
- [X] T011 [P] Create `extensions/builtin/emotion-tts/rust/src/domain/chain_digest.rs` with `ChainDigest` newtype, `ChainDigest::of(&EditChain)` SHA-256 over canonical JSON, `ChainDigest::EMPTY` constant for no-chain state
- [X] T012 Update `extensions/builtin/emotion-tts/rust/src/domain/mod.rs` to re-export `audio_edit::*` and `chain_digest::*`
- [X] T013 Extend `extensions/builtin/emotion-tts/rust/src/domain/cache_key.rs` `CacheKeyInput` with `voice_asset_chain_digest: ChainDigest` field; append `|chain={digest}` to canonical string in `build_canonical_string`
- [X] T014 [P] Create `extensions/builtin/emotion-tts/rust/src/storage/audit_log_repo.rs` with `append(entry: AuditEntry)`, `list_for_target(deployment_id, target_kind, target_id, limit)`, no-FK soft references per data-model.md
- [X] T015 Update `extensions/builtin/emotion-tts/rust/src/storage/mod.rs` to re-export `audit_log_repo::*`
- [X] T016 Extend `extensions/builtin/emotion-tts/rust/src/storage/voice_assets_repo.rs` with `read_edit_chain(asset_id) -> Option<EditChain>` and `write_edit_chain(asset_id, chain: Option<&EditChain>) -> ()`
- [X] T017 [P] Extend `extensions/builtin/emotion-tts/rust/src/storage/utterances_repo.rs` with the same chain read/write pair scoped to utterance ids (note: `ext_emotion_tts__utterances` has no `updated_at` column — write does not touch one)
- [X] T018 Run T007/T008/T009 and confirm GREEN; fix any drift before proceeding

**Checkpoint**: Foundation ready — user-story implementation can begin.

---

## Phase 3: User Story 1 — Trim & normalize a voice asset (P1) 🎯 MVP

**Goal**: A user can trim head/tail and normalize loudness on a voice asset; the
synthesis pipeline picks up the derived audio automatically; the cache key
reflects the new chain.

**Independent Test**: Upload a voice asset with obvious head/tail silence, apply
trim + normalize via the editor, run a synthesis using that asset, confirm the
audible effect and a different `content_sha256` for the derived artifact.

### Tests for User Story 1 (RED first)

- [X] T019 [P] [US1] Write failing pytest `extensions/builtin/emotion-tts/worker/tests/test_audio_edit_trim_accuracy.py` asserting first non-silent sample of trimmed output is within ±1 ms of expected boundary for WAV, MP3, and OPUS sources (FR-026, SC-009)
- [X] T020 [P] [US1] Write failing pytest `extensions/builtin/emotion-tts/worker/tests/test_audio_edit_normalize_lufs.py` asserting measured integrated loudness is within ±0.5 LU of `target_lufs` after normalize op
- [X] T021 [P] [US1] Write failing Rust test `extensions/builtin/emotion-tts/rust/tests/http_contract_audio_edit_voice_asset_test.rs` covering the four routes used in US1: `POST .../voice-assets/{id}/edit`, `DELETE .../voice-assets/{id}/edit`, `POST .../voice-assets/{id}/edit/preview`, plus a 404-on-cross-deployment assertion (FR-016, SC-008)

### Worker pipeline implementation (US1)

- [X] T022 [US1] Create `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/audio_edit.py` with `apply_chain(source_abs, output_abs, chain) -> AudioEditReport`; per-op handlers for `trim`, `normalize` only in this slice; ffmpeg-python decode → numpy fold → soundfile encode pipeline per [contracts/rpc-audio-edit.md](./contracts/rpc-audio-edit.md)
- [X] T023 [US1] Register `audio.edit` and `audio.edit.preview` JSON-RPC handlers in `extensions/builtin/emotion-tts/worker/src/emotion_tts_worker/handlers.py` calling into `audio_edit.apply_chain` and a `materialize_to_temp` helper
- [X] T024 [US1] Run T019, T020 → GREEN

### Rust dispatcher + RPC integration (US1)

- [X] T025 [US1] Add `AudioEditParams` and `AudioEditPreviewParams` structs to `extensions/builtin/emotion-tts/rust/src/backend_client/params.rs` matching the contract in [contracts/rpc-audio-edit.md](./contracts/rpc-audio-edit.md)
- [X] T026 [US1] Add `audio_edit(...)` and `audio_edit_preview(...)` methods to `extensions/builtin/emotion-tts/rust/src/backend_client/mod.rs::BackendClient` using existing `BackendClient::call`
- [X] T027 [US1] Extend `extensions/builtin/emotion-tts/rust/src/dispatcher/prepare.rs` voice-path resolution to honor `edit_chain_json`: when chain present, materialize derived artifact via `HostArtifactStore` keyed on `chain_digest` and return derived path; otherwise return source path

### HTTP routes (US1)

- [X] T028 [US1] Extend `extensions/builtin/emotion-tts/rust/src/router/voice_assets.rs` with `POST /voice-assets/{voice_asset_id}/edit` calling `assert_deployment_match`, persisting chain via T016, materializing derived artifact, returning `ApplyEditResponse` per OpenAPI; rejects with 409 + `StaleDigestError` body when `digest_before` mismatches persisted state
- [X] T029 [US1] Extend `voice_assets.rs` with `POST /voice-assets/{voice_asset_id}/edit/preview` streaming bytes from worker temp file via `tokio_util::io::ReaderStream` + RAII `PreviewTempGuard`
- [X] T030 [US1] Extend `voice_assets.rs` with `DELETE /voice-assets/{voice_asset_id}/edit` clearing chain (no-op if already empty) and reverting `audio_artifact_ref`
- [X] T031 [US1] Emit `extension.emotiontts.audio.edited` event on `EventBus` from each apply/clear path with `voice_asset_id`, `operation_count`, `derived_artifact_ref` per FR-019
- [X] T032 [US1] Run T021 → GREEN

### Frontend — voice-asset editor (US1)

- [X] T033 [P] [US1] Create `extensions/builtin/emotion-tts/web/src/services/audio_edit_client.ts` with typed wrappers for the three voice-asset endpoints (apply, preview, clear)
- [X] T034 [P] [US1] Create `extensions/builtin/emotion-tts/web/src/views/mapping_editor/components/waveform_canvas.tsx` rendering peaks via Web Audio `decodeAudioData` + Canvas; expose drag-handle props (start/end) and a vertical playhead; vanilla-extract sibling `waveform_canvas.css.ts`
- [X] T035 [US1] Create `extensions/builtin/emotion-tts/web/src/views/mapping_editor/components/audio_edit_panel.tsx` (presentational) wiring waveform + Apply/Preview/Reset buttons + normalize toggle for the US1 op set; call `audio_edit_client` for actions; vanilla-extract sibling `audio_edit_panel.css.ts`
- [X] T036 [US1] Wire `audio_edit_panel` into `extensions/builtin/emotion-tts/web/src/views/mapping_editor/mapping_editor.view.tsx` so selecting a voice asset opens the editor in the existing 360-px sidebar
- [X] T037 [US1] Surface worker validation errors as inline messages in `audio_edit_panel.tsx` per FR-025 (not generic toasts)

### US1 wrap-up

- [X] T038 [US1] Run quickstart steps 1–5 manually in the browser; capture before/after waveform screenshots for the PR description
- [X] T039 [US1] **Pause for code review**: invoke `/requesting-code-review` with diff `git diff main..HEAD -- extensions/builtin/emotion-tts/` and address findings before moving to US2

**Checkpoint**: User Story 1 fully functional and testable independently.

---

## Phase 4: User Story 2 — Per-utterance edit on a completed run (P2)

**Goal**: A user can edit a single segment of a completed run without
re-synthesising the whole batch; the export ZIP rebuilds with the edited
segment.

**Independent Test**: Run a 3-line batch, edit one segment with a head trim,
download the export, confirm the edited segment is present.

### Tests for User Story 2 (RED first)

- [X] T040 [P] [US2] Write failing test `extensions/builtin/emotion-tts/rust/tests/http_contract_audio_edit_utterance_test.rs` covering `POST /deployments/{dep_id}/runs/{run_id}/utterances/{utt_id}/edit` happy path + 404 on cross-deployment + 409 on stale digest
- [X] T041 [P] [US2] Write failing test `extensions/builtin/emotion-tts/rust/tests/utterance_edit_export_invalidation_test.rs` asserting export ZIP for the run is marked stale after a per-utterance edit

### Implementation (US2)

- [X] T042 [US2] Extend `extensions/builtin/emotion-tts/rust/src/router/runs.rs` with `POST /deployments/{deployment_id}/runs/{run_id}/utterances/{utterance_id}/edit` using `assert_deployment_match`, persisting chain via T017, materializing derived segment audio
- [X] T043 [US2] In the same handler, mark the run's export ZIP stale (set existing `export_status = needs_rebuild` flag in `runs_repo`); reuse export-rebuild path from existing run-detail flow
- [X] T044 [US2] Extend dispatcher `prepare.rs` (or add `dispatcher/utterance_edit.rs`) so the per-utterance derived artifact resolution mirrors the voice-asset path (source preserved, derived computed)
- [X] T045 [P] [US2] Create `extensions/builtin/emotion-tts/web/src/views/run_detail/components/per_utterance_edit.tsx` presentational component reusing `waveform_canvas` + the trim/speed/mute subset; vanilla-extract sibling
- [X] T046 [US2] Wire `per_utterance_edit` into `extensions/builtin/emotion-tts/web/src/views/run_detail/run_detail.view.tsx`: hover-to-reveal Edit button per segment row; opens an inline editor; Apply triggers segment rebuild and re-renders the row with the new derived ref
- [X] T047 [US2] After Apply, surface the run's "Rebuild export" CTA in the run detail header (existing button gains `disabled={export_status !== 'needs_rebuild'}` logic)
- [X] T048 [US2] Run T040, T041 → GREEN
- [X] T049 [US2] Run quickstart step 6 manually
- [X] T050 [US2] **Pause for code review**: invoke `/requesting-code-review` with the US2 diff before US3

**Checkpoint**: User Stories 1 + 2 both work independently.

---

## Phase 5: User Story 3 — Preview before apply (P2)

**Goal**: A user can hear an edit before committing it. Preview discards prior
preview output; only Apply persists.

**Independent Test**: Drag handles, click Preview twice with different handles,
then Apply. Confirm only the final state persists; no preview residue in the
artifact store; reload shows the persisted state only.

### Tests for User Story 3 (RED first)

- [X] T051 [P] [US3] Write failing pytest `extensions/builtin/emotion-tts/worker/tests/test_audio_edit_preview_temp_cleanup.py` asserting the worker's `materialize_to_temp` helper deletes its temp file when the caller closes the stream early (simulated by RAII drop)
- [X] T052 [P] [US3] Write failing Playwright spec `extensions/builtin/emotion-tts/web/tests/e2e/preview_flow.spec.ts` per quickstart step 3 (US3 acceptance scenarios)

### Implementation (US3)

- [X] T053 [US3] In `extensions/builtin/emotion-tts/rust/src/router/voice_assets.rs::edit_preview`, ensure `PreviewTempGuard` Drop cleans up even on dropped HTTP connections; verify with the worker test
- [X] T054 [US3] Add a Web Audio API decoder + `<audio>` element to `audio_edit_panel.tsx` so Preview bytes play in-browser; consecutive previews revoke the previous Object URL to prevent memory leaks
- [X] T055 [US3] In `audio_edit_panel.tsx`, gate the Apply button behind a "preview consumed" UX hint (non-blocking) so users notice the preview/apply distinction per FR-023
- [X] T056 [US3] Add `Cache-Control: no-store` to the preview response in `voice_assets.rs::edit_preview`
- [X] T057 [US3] Run T051, T052 → GREEN
- [ ] T058 [US3] **Pause for code review**: invoke `/requesting-code-review` with the US3 diff before US4

**Checkpoint**: User Stories 1 + 2 + 3 all work; preview-without-persist verified.

---

## Phase 6: User Story 4 — Edit chain inspection & undo (P3)

**Goal**: A user can see the ordered chain of operations applied to an asset,
remove individual ops, and undo the last removal within the editor session.

**Independent Test**: Apply 3 ops, remove the middle one via the chain panel,
confirm rebuilt audio matches the chain with the remaining 2 ops.

### Tests for User Story 4 (RED first)

- [X] T059 [P] [US4] Write failing Rust test `extensions/builtin/emotion-tts/rust/tests/audio_edit_op_remove_rebuild_test.rs` asserting that PATCHing an asset's chain to drop op[id] yields derived audio identical (cross-correlation ≥ 0.99) to a chain built from scratch with the same surviving ops (SC-007)

### Frontend implementation (US4)

- [X] T060 [P] [US4] Create `extensions/builtin/emotion-tts/web/src/views/mapping_editor/components/edit_chain_list.tsx` rendering ordered ops with per-op Remove button + parameter summary; presentational, vanilla-extract sibling
- [X] T061 [US4] Wire `edit_chain_list` into `audio_edit_panel.tsx`; Remove emits an updated chain (drop op by id) and triggers an Apply with `digest_before = current_persisted_digest`
- [X] T062 [US4] Add an in-memory "removal stack" to `audio_edit_panel.tsx`; Undo last removal pushes the op back into the chain at its original position and re-Applies
- [X] T063 [US4] Backend: extend `voice_assets.rs::edit` apply path to accept any chain that re-orders / drops ops (already supported via the generic chain payload — verify with the new test)
- [X] T064 [US4] Run T059 → GREEN
- [X] T065 [US4] **Pause for code review**: invoke `/requesting-code-review` with the US4 diff before US5

**Checkpoint**: Op removal + in-session undo work end-to-end.

---

## Phase 7: User Story 5 — Audit trail per asset (P3)

**Goal**: Every chain change is recorded in the audit log; clearing the chain
does not delete prior entries; the editor exposes the log to the user.

**Independent Test**: Apply 2 edits, clear the chain, open the audit panel,
confirm 3 entries (2 applies + 1 clear) with correct before/after digests.

### Tests for User Story 5 (RED first)

- [X] T066 [P] [US5] Write failing test `extensions/builtin/emotion-tts/rust/tests/http_contract_audio_edit_audit_test.rs` asserting `GET /audit/{kind}/{id}?deploymentId=...` returns expected entries in reverse-chronological order with 404 on cross-deployment
- [X] T067 [P] [US5] Extend `extensions/builtin/emotion-tts/rust/tests/audio_edit_audit_log_sequence_test.rs` (T009) with a "deleted target retains audit entries" case (FR-030 edge case)

### Backend implementation (US5)

- [X] T068 [US5] Wire audit-log appends into `voice_assets.rs::edit` (apply, clear, op-remove paths) and `runs.rs::utterance_edit` per FR-029 — emit one entry per state-changing call; no entry on no-op apply or no-op clear
- [X] T069 [US5] Create `extensions/builtin/emotion-tts/rust/src/router/audit.rs` with `GET /audit/{target_kind}/{target_id}` consuming `?deploymentId=` + `?limit=` query params; mount under main router in `router/mod.rs`
- [X] T070 [US5] Run T066, T067 → GREEN

### Frontend implementation (US5)

- [X] T071 [P] [US5] Create `extensions/builtin/emotion-tts/web/src/views/mapping_editor/components/audit_history_panel.tsx` listing entries (reverse chronological, op-count + chain-digest column, timestamp formatted with the existing `formatRelative` util); presentational, vanilla-extract sibling
- [X] T072 [US5] Wire `audit_history_panel` into `audio_edit_panel.tsx` as a collapsible section under the chain list; fetch via `audio_edit_client.ts::fetchAuditLog`
- [~] T073 [US5] Run quickstart step 7 (audit panel manual check) — punted, requires live deployment
- [X] T074 [US5] **Pause for code review**: invoke `/requesting-code-review` with the US5 diff before polish phase

**Checkpoint**: All user stories work independently.

---

## Phase 8: Waveform precision contract (FR-033..FR-038)

**Goal**: Verify the waveform component meets the precision contract carved out
in plan.md § Test strategy. Not a new user story — an enforcement phase that
covers the requirements all five stories depend on.

- [ ] T075 [P] Write Playwright interaction test `extensions/builtin/emotion-tts/web/tests/e2e/waveform_precision.spec.ts` covering: drag-accuracy ≤ 100 ms at default zoom + ≤ 10 ms at max zoom (FR-033 / SC-011); arrow key nudge = 10 ms (FR-035); Shift+arrow = 100 ms; Ctrl+arrow = 1 ms
- [ ] T076 [P] Write Playwright spec `extensions/builtin/emotion-tts/web/tests/e2e/waveform_overlays.spec.ts` asserting muted regions render a flat horizontal bar; fade regions render a triangular gradient; trimmed regions are dimmed (FR-036)
- [ ] T077 Add `useReducedMotion` honor to `waveform_canvas.tsx` drag-feedback animation per Constitution XII.6
- [ ] T078 Add keyboard-handle focus styling (vanilla-extract `:focus-visible` ring) to `waveform_canvas.css.ts` for accessibility

---

## Phase 9: Polish & cross-cutting concerns

**Purpose**: Documentation, audit-script enforcement, FR-027 verification,
end-of-spec verification.

- [ ] T079 [P] Update `docs/api/openapi.yaml` to inline / `$ref` the spec-036 endpoints from [contracts/openapi-audio-edit.yaml](./contracts/openapi-audio-edit.yaml)
- [ ] T080 [P] Update `docs/api/API.md` extension section with the 6 new endpoints + RPC method names + audit-log shape
- [ ] T081 [P] Update `extensions/builtin/emotion-tts/README.md` with the audio-edit feature summary, op set, edit-chain shape, and links to spec 036
- [ ] T082 [P] Update root `README.md` "Recent specs" list to include 036
- [ ] T083 Update `CLAUDE.md` "Active Technologies" list with one line summarising spec 036 additions
- [ ] T084 [P] Write failing pytest `extensions/builtin/emotion-tts/worker/tests/test_audio_edit_speed_pitch.py` asserting pitch shift ≤ ±5 cents on speed `0.75` and `1.25` (FR-027); implement chained `atempo` if needed; run → GREEN
- [ ] T085 Extend `extensions/builtin/emotion-tts/rust/tests/boundary_test.rs` with three assertions per [contracts/boundary-audit.md](./contracts/boundary-audit.md): no host references to `ext_emotion_tts__audio_edit_log`, `audio.edit`, `audio.edit.preview`
- [ ] T086 Run `extensions/builtin/emotion-tts/scripts/audit-boundary.sh` (or `.ps1`); confirm PASS
- [ ] T087 Run full extension test suite: `cargo test -p emotion-tts-extension`, `pnpm tsc --noEmit`, `pnpm test`, worker `uv run pytest`; confirm all green
- [ ] T088 Run all 8 quickstart steps end-to-end on a fresh deployment; capture demo screen-recording for PR description
- [ ] T089 Run final cross-spec workflow: `cargo test --workspace` to confirm no host-tree regression; `cargo clippy --workspace --all-targets -- -D warnings` on touched files
- [ ] T090 **Final code review pass**: invoke `/requesting-code-review` with full branch diff `git diff main..HEAD`; address findings before merge

---

## Dependencies & Story Completion Order

```text
Phase 1 (Setup)
   ↓
Phase 2 (Foundational) — BLOCKS every user story
   ↓
Phase 3 — US1 (P1, MVP)  ── blocks nothing structurally; ships independently
   ↓
Phase 4 — US2 (P2)       ── reuses domain + worker pipeline; structurally independent UI
   ↓
Phase 5 — US3 (P2)       ── refines US1's preview path; benefits from US1 landed first
   ↓
Phase 6 — US4 (P3)       ── extends US1 chain panel; structurally independent
   ↓
Phase 7 — US5 (P3)       ── adds audit log UI; backend appends already wired in earlier phases (T068)
   ↓
Phase 8 — Waveform precision contract  ── verifies cross-story FR-033..FR-038
   ↓
Phase 9 — Polish & docs + final review
```

**Independent shippability**:
- US1 alone is the MVP and ships everything required for "edit a voice asset".
- US2 ships standalone after US1's worker pipeline lands; the UI is in a different
  view (`run_detail`) and doesn't compete for editor real estate.
- US3 is technically a US1 sub-feature in spec wording but isolates cleanly because
  the preview RPC is independent of apply.
- US4, US5 layer onto the chain panel without changing the underlying contract.

## Parallel Execution Opportunities

Within each phase, `[P]`-tagged tasks touch disjoint files and can run in parallel.

**Phase 1**: T002, T003, T004, T006 are all [P] — single dev or four agents.
**Phase 2 tests**: T007, T008, T009 are all [P] (different test files).
**Phase 2 impl**: T011, T014, T017 are [P] (different modules).
**Phase 3 worker**: T019, T020 [P]; T033, T034 [P] (different services/component files).
**Phase 4–7 tests**: each phase's RED tests are [P] within phase.
**Phase 9 docs**: T079, T080, T081, T082, T084 are all [P].

## MVP Scope Suggestion

**MVP = Phase 1 + Phase 2 + Phase 3 (US1)**. Ships:
- 3 migrations
- Voice-asset edit chain end-to-end (trim + normalize)
- Worker pipeline with the two highest-value ops
- Cache-key invalidation
- Editor sidebar integrated into mapping editor
- Audit log appends already wired (queryable via DB only — UI lands in US5)

**Total tasks**: 90
**Tasks per story**: Setup 6, Foundational 12, US1 21, US2 11, US3 8, US4 7, US5 9, Waveform 4, Polish 12

**Code-review pause points** (per user instruction): T039, T050, T058, T065, T074, T090.
