# Feature Specification: EmotionTTS Audio Editing

**Feature Branch**: `036-audio-editing`
**Created**: 2026-04-28
**Status**: Draft
**Input**: User description: "audio editing UI + backend capabilities and dependencies for emotiontts, keep in mind that emotiontts is extension and has to be decoupled from host app"

## User Scenarios & Testing *(mandatory)*

### User Story 1 — Trim & normalize a voice asset (Priority: P1)

A user uploads a 60-second voice sample. The first 4 seconds are room noise before the speaker begins, and the last 8 seconds contain a microphone bump and breath. The user opens the voice asset in the mapping editor, drags the start handle to 4.0s and the end handle to 52.0s on a waveform, and clicks **Apply**. The asset is now usable as a clean reference voice. The user later realizes the result is too quiet, opens the same asset, and toggles **Normalize loudness**. Future synthesis runs that use this voice asset receive the trimmed + normalized version automatically.

**Why this priority**: Voice asset edits are the highest-leverage scope. A single edit improves every future synthesis using that asset across every deployment that owns it. Without this, users are forced to re-record or use an external editor and re-upload.

**Independent Test**: Upload a voice asset that has obvious silence at the head/tail, apply trim + normalize via the UI, run a synthesis using that asset as the speaker reference, and confirm the audible effect (silence removed, perceptible loudness lift). Cache row for the new asset content has a different `content_sha256` than the original. Test deliverable: voice asset can be edited, the edit chain is persisted, and synthesis honors the edited audio.

**Acceptance Scenarios**:

1. **Given** an uploaded voice asset displayed in the mapping editor sidebar, **When** the user drags the trim handles on the waveform and clicks Apply, **Then** the asset is updated with a new derived audio artifact, the original recording is preserved as the source, and the waveform redraws with the new boundaries.
2. **Given** a voice asset with a recorded loudness lower than -23 LUFS, **When** the user toggles Normalize loudness and clicks Apply, **Then** the new derived audio is at the target loudness (default -16 LUFS) and the loudness reading is shown next to the toggle.
3. **Given** an edited voice asset already used by an active character mapping, **When** the next synthesis run referencing that mapping starts, **Then** the worker receives the edited audio file (not the original) and the synthesis cache key reflects the new edit chain so prior cache rows do not falsely hit.
4. **Given** an edit operation that fails inside the worker (e.g. unsupported codec), **When** the user clicks Apply, **Then** the original asset is unchanged, an actionable error is surfaced in the UI, and a structured ERROR event is emitted on the host event bus.

---

### User Story 2 — Per-utterance edit on a completed run (Priority: P2)

After a 200-line batch synthesis, three lines have an unwanted breath spike at the head. The user opens the run detail view, hovers the offending segment, clicks **Edit**, and adjusts a head-trim value. The segment audio is regenerated using the recorded segment audio as the source (no re-synthesis). The edited audio replaces the segment in the export bundle, and the run's content hash is updated so future cache lookups do not return the unedited segment.

**Why this priority**: Targeted fixes save the cost of full re-runs. The synthesis loop is expensive (LLM-driven). Per-utterance edit lets users polish without re-paying that cost.

**Independent Test**: Run a small batch (3 lines), open the run detail, edit one segment with trim, download the export ZIP, and confirm the edited segment is in the ZIP at the expected filename. Cache row for the affected segment is keyed by the edit chain so an unedited re-run gets a fresh synthesis instead of the edited cache.

**Acceptance Scenarios**:

1. **Given** a completed run with N segments, **When** the user opens the run detail and clicks Edit on a segment, **Then** an inline editor appears showing the segment waveform with trim/crop/speed handles.
2. **Given** an edited segment, **When** the user clicks Apply, **Then** the segment row's `audio_artifact_ref` is updated to point to the edited audio, the cache key is recomputed to include the edit chain, and the run's export ZIP rebuild button becomes active.
3. **Given** an edited segment, **When** the user clicks **Revert** on the same segment, **Then** the segment returns to its original audio (the source artifact is preserved across edits) and the cache key returns to the pre-edit value.

---

### User Story 3 — Preview before apply (Priority: P2)

Before committing an edit, a user wants to hear the result. They drag the trim handles on a voice asset, click **Preview**, and the UI plays the edited audio without persisting the change. If the result is wrong, they keep adjusting. When satisfied, they click **Apply**.

**Why this priority**: Without preview, every adjustment requires a destructive write + re-load cycle. Preview is the standard UX for any non-trivial editor. Bundling with US1 makes US1 actually usable.

**Independent Test**: Apply trim handles to a voice asset, click Preview, listen to the result, click Preview again with different handles, then click Apply. Confirm only the final state is persisted; the preview-only states leave no artifact-store residue.

**Acceptance Scenarios**:

1. **Given** unsaved trim handles on a voice asset, **When** the user clicks Preview, **Then** the system materializes the edit to a temporary audio output, plays it in the browser, and the original asset stays unchanged.
2. **Given** a preview that has just played, **When** the user adjusts the handles and clicks Preview again, **Then** the previous preview audio is discarded (no artifact-store accumulation) and a fresh preview is generated.
3. **Given** the user closes the editor without clicking Apply, **When** the page is reloaded, **Then** none of the preview states survive — the asset displays its persisted state.

---

### User Story 4 — Edit chain inspection & undo (Priority: P3)

The user has applied trim → normalize → speed-1.1× to a voice asset. They want to see what was applied and remove just the speed change. They open the asset's edit history, see the three operations listed, click **Remove** on the speed step, and the asset rebuilds from the source applying only trim + normalize.

**Why this priority**: Reversibility is a quality-of-life feature, not a blocker. The declarative edit chain (FR-006) makes it cheap to implement; UI cost is moderate. Defer if it makes US1+US2 ship later.

**Independent Test**: Apply three operations, verify they're listed in the editor's history panel, click Remove on the middle one, and confirm the rebuilt audio matches a manual trim + speed-1.1× without normalize.

**Acceptance Scenarios**:

1. **Given** a voice asset with three applied operations, **When** the user opens the history panel, **Then** the three operations are listed in order with their parameters and a Remove button each.
2. **Given** the history panel, **When** the user clicks Remove on an operation, **Then** the asset is rebuilt from source applying the remaining operations, and the cache key reflects the new chain.
3. **Given** a voice asset whose last operation was just removed, **When** the user clicks the chain's **Undo last removal** button (within the editor session), **Then** the operation is restored.

---

### Edge Cases

- **Empty edit chain after removing all operations**: The asset reverts to the original source audio. The derived `audio_artifact_ref` may equal the source, or be regenerated as a no-op copy — handler decides.
- **Trim handles produce a clip below the minimum duration (100 ms)**: Apply is blocked with a validation message. The preview button stays available so users can still hear what they have so far.
- **Speed change exceeds the supported range (0.5× to 2.0×)**: Apply is blocked. Documentation explains the upstream pitch-preserving algorithm's stable range.
- **Edit applied to an asset currently in use by a queued run**: The queued run completes against the pre-edit audio (it captured the asset reference at enqueue time). New runs after the edit use the new audio. UI should mention this so users don't expect mid-flight updates.
- **Source artifact deleted from the host artifact store** (orphan): Edit operations cannot rebuild from missing source. UI shows an error and offers to upload a replacement source.
- **Preview during another long-running operation**: The runtime's lease serializes; preview joins the queue. UI shows a "queued — N seconds" indicator. Cancel button discards the preview request.
- **Edit chain JSON exceeds a reasonable size (e.g. >100 ops)**: Cap the chain length at 32 ops with a clear validation error. Prevents infinite history growth from accidental loops.
- **Two browser tabs editing the same asset concurrently**: Last write wins. Clear "stale" indicator if the persisted edit chain has changed since the editor loaded.

## Requirements *(mandatory)*

### Functional Requirements

#### Scope & boundary

- **FR-001**: The audio editing capability MUST live entirely within the EmotionTTS extension boundary (`extensions/builtin/emotion-tts/`). No host crate changes, no new top-level routes outside `/api/v1/extensions/nexus.audio.emotiontts/*`, no new host-owned tables. The host integration uses only existing contracts (`HostArtifactStore`, `LeaseProvider`, `EventBus`).
- **FR-002**: All audio processing MUST execute inside the EmotionTTS worker process (the existing IndexTTS-2 venv). The Rust extension code MUST NOT pull in audio-codec dependencies. The worker already ships `ffmpeg-python`, `soundfile`, `pyloudnorm`, and `silero-vad` — these MUST be the only audio-processing primitives used.
- **FR-003**: New worker RPC methods MUST go through the existing `BackendClient::call` typed wrapper and be dispatched via the existing `LeaseProvider` lease serialization. No new transport or process model.

#### Edit operations & data model

- **FR-004**: The system MUST support the following edit operations on voice assets and on per-utterance run output:
  - **Trim** — drop audio before `start_ms` and after `end_ms` (operates on the boundary, doesn't alter intermediate samples).
  - **Crop** — alias for trim with explicit `start_ms`/`end_ms`; provided as a discoverable operation name in the UI.
  - **Normalize loudness** — adjust gain so integrated loudness equals a target (default -16 LUFS, configurable per operation).
  - **Speed change** — pitch-preserving rate adjustment in the range `[0.5×, 2.0×]`. Outside this range, validation rejects the operation.
  - **Fade in / fade out** — linear gain ramp at the head or tail with a duration in milliseconds.
  - **Mute region** — silence a `[start_ms, end_ms]` interval inside the audio (for removing breaths/spikes).
- **FR-005**: Each edit operation MUST be a typed, declarative record (mode + parameters), serializable to JSON, with no executable code stored.
- **FR-006**: A voice asset MUST carry a declarative **edit chain** — an ordered list of operations applied to a source artifact. The chain MUST be:
  - Stored in the existing `ext_emotion_tts__voice_assets` table as a new nullable column (extension-only migration; no host schema change).
  - Reversible: removing operations from the chain rebuilds the derived audio from the source by replaying the remaining operations.
  - Capped at a maximum length (default 32 operations) to prevent runaway growth.
- **FR-007**: A per-utterance edit MUST be stored as a chain on the `ext_emotion_tts__utterances` row, similarly nullable. The source for an utterance edit is the originally-synthesized segment audio, preserved.
- **FR-008**: The original (pre-edit) source artifact MUST always be preserved. Edits are derived; the source is never overwritten.

#### Worker pipeline

- **FR-009**: The worker MUST expose a new `audio.edit` RPC method. Parameters: `source_artifact_abs` (path), `operations` (list of typed ops), `output_artifact_abs` (path), `request_id`. Result: success/failure plus a report containing per-operation duration, the resulting duration, sample rate, and (for normalize) the measured input/output LUFS.
- **FR-010**: A separate `audio.edit.preview` RPC method MUST materialize an edit chain to a worker-local temp file and return the bytes (or a streamable handle) without persisting through the artifact store. The host route exposing this MUST clean up the temp file after streaming completes.
- **FR-011**: The worker MUST report a structured error when an operation cannot be applied (codec unsupported, FFmpeg missing, source corrupt, parameter out of range). The dispatcher MUST surface this as a 400 (validation) or 500 (internal) HTTP error to the UI as appropriate.

#### HTTP surface (under `/api/v1/extensions/nexus.audio.emotiontts/`)

- **FR-012**: A new `POST voice-assets/{voice_asset_id}/edit?deploymentId=…` endpoint MUST persist an edit chain on the asset, materialize the derived audio, and update `audio_artifact_ref` to point at the new derived artifact while preserving the source artifact reference. The endpoint MUST follow the cross-deployment guard (`router::guard::assert_deployment_match`) — 404 on cross-deployment access.
- **FR-013**: A new `POST voice-assets/{voice_asset_id}/edit/preview?deploymentId=…` endpoint MUST return audio bytes for an edit chain without persisting. Same cross-deployment guard.
- **FR-014**: A `DELETE voice-assets/{voice_asset_id}/edit?deploymentId=…` endpoint MUST clear the edit chain, restoring the asset to point at its source artifact.
- **FR-015**: A new `POST deployments/{deployment_id}/runs/{run_id}/utterances/{utterance_id}/edit` endpoint MUST persist a per-utterance edit chain (same data model as voice asset edits) and rebuild the segment audio. The export ZIP for the run becomes invalidated until rebuilt.
- **FR-016**: All new endpoints MUST require a `?deploymentId=…` query parameter and return `404` (not `403`) on cross-deployment access, matching the existing `router::guard` pattern.

#### Cache & integration

- **FR-017**: The synthesis cache key (`domain::cache_key`) MUST include the voice asset's edit chain digest. A change in the chain MUST produce a different cache key so stale cache rows cannot return pre-edit audio.
- **FR-018**: The dispatcher's `prepare()` step MUST resolve the edit chain when threading voice paths to the worker. The worker receives an absolute path to the **derived** audio (post-edit), not the source.
- **FR-019**: When an edit is applied, the system MUST emit an `extension.emotiontts.audio.edited` event on the host event bus carrying `voice_asset_id` (or `utterance_id`), `operation_count`, and the derived artifact reference. Subscribers can invalidate caches or refresh UI state.

#### UI surface

- **FR-020**: The mapping editor's voice asset sidebar MUST gain an editor panel with: a waveform, draggable trim handles, controls for each operation (toggle for normalize, slider for speed, sliders for fade durations, click-and-drag for mute regions), and three buttons: **Preview**, **Apply**, **Reset**.
- **FR-021**: The run detail view MUST gain an inline edit affordance per segment with the same operation set scoped to that one segment.
- **FR-022**: The editor MUST show the current edit chain as an ordered list with each operation's parameters and a per-operation **Remove** button. Removing an operation rebuilds the derived audio.
- **FR-023**: Apply, Preview, and Reset MUST be visually distinct. Apply is the only destructive (state-mutating) action; Reset reverts unsaved UI state but does not modify persisted audio.
- **FR-024**: The UI MUST display the source duration, the post-edit duration, and (when normalize is active) the measured loudness in LUFS.
- **FR-025**: Validation errors from the worker MUST surface as actionable inline messages in the editor (not as a generic toast). Example: "Trim window 4.0s–3.9s is invalid — end must be after start."

### Key Entities

- **Edit operation**: A typed record describing one transformation (mode + parameters). Modes: `trim`, `crop`, `normalize`, `speed`, `fade_in`, `fade_out`, `mute`. Parameters depend on the mode (e.g. trim has `start_ms`, `end_ms`; speed has `factor`; normalize has `target_lufs`).
- **Edit chain**: An ordered list of edit operations, applied left-to-right to a source. Stored as JSON on the parent row (voice asset or utterance). Reversible — removing operations rebuilds derived audio.
- **Source artifact**: The unmodified original audio. For voice assets, the file uploaded by the user. For utterances, the segment audio produced by synthesis. Preserved across all edits.
- **Derived artifact**: The audio file resulting from applying an edit chain to its source. Updated whenever the chain changes. Stored in the host artifact store with a fresh content hash.
- **Edit report**: A diagnostic record returned by the worker per edit operation: duration, input/output sample rate, measured LUFS (if normalize), warnings (e.g. "trim leaves 95 ms remaining — close to minimum"). Persisted alongside the chain or returned in the API response.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: A user can trim head and tail silence from a voice asset, apply normalize, and produce a usable derived audio in under 60 seconds from opening the asset to the next synthesis using the edited audio (excluding worker cold-start).
- **SC-002**: 95% of edit operations on voice assets under 5 minutes long complete in under 5 seconds wall-clock from Apply click to UI update on a developer-class machine. (Excludes initial worker spawn; assumes warm lease.)
- **SC-003**: After applying an edit, a synthesis run that previously returned a cache hit using the unedited audio MUST instead trigger a fresh synthesis. Verified by a test that asserts the cache row count for the new chain digest is zero before the run, then one after.
- **SC-004**: Removing all operations from a voice asset's edit chain returns the synthesis cache to its pre-edit state — runs that previously hit the cache before any edit hit it again. (No "ghost" cache rows from intermediate edit chains contaminate the result.)
- **SC-005**: Boundary audit (`cargo test -p emotion-tts-extension --test boundary_test`) passes after the feature lands. Zero new host-side files under `crates/`. Zero new top-level routes outside `/api/v1/extensions/nexus.audio.emotiontts/*`.
- **SC-006**: Per-utterance edit on a 200-line batch saves at least 95% of wall-clock vs. a full re-synthesis (since only one segment is rebuilt locally — the worker is not invoked for the LLM path, only for the audio-edit pipeline).
- **SC-007**: An edited voice asset's derived audio matches a manually-edited reference (same operations applied via standalone ffmpeg/soundfile invocation) within a tolerance acceptable for human listening (e.g. cross-correlation ≥ 0.99 on the overlapping window).
- **SC-008**: 100% of new endpoints emit a `404` (not `403`) on cross-deployment access — verified by an HTTP contract test analogous to `http_contract_cross_deployment_test.rs` already in the extension test suite.

## Assumptions

- **Worker dependencies are sufficient**: `ffmpeg-python`, `soundfile`, `pyloudnorm`, and `silero-vad` already in `worker/pyproject.toml` cover every operation in scope. No new Python deps required, no host-side audio libraries needed.
- **Worker is the right execution surface**: The existing IndexTTS-2 worker venv is reused for audio editing. A separate "audio editor worker" would multiply runtime install cost — out of scope. If audio-edit RPCs interfere with synthesis throughput in practice, a worker pool is a future spec.
- **Voice asset edits are higher priority than per-utterance edits**: A single voice-asset edit improves all future synthesis using that voice. Per-utterance edits help polish individual outputs but don't scale across runs.
- **Declarative edit chain over imperative file overwrite**: Imperative would require explicit history tracking; declarative gives free undo and audit. Cost of re-materializing the derived audio on every chain change is acceptable for assets up to ~5 minutes.
- **Pitch-preserving speed change**: Speed operations use ffmpeg's `atempo` filter (chained for ranges outside `[0.5×, 2.0×]` if we ever expand the range) — same approach as the existing run-level `speedFactor` with `speedMode: preserve_pitch`. Naïve resampling speed (which changes pitch) is explicitly out of scope.
- **Worker stays single-threaded for audio edits**: Edits go through the same `LeaseProvider` lease as synthesis. No parallel edit channel. If contention becomes a UX issue, add a queue indicator before adding a parallel runtime.
- **No host-level audit log change**: Per the established host-extension boundary, the audio-edit audit trail (who edited what, when) lives in extension-owned storage (the chain itself plus an optional `ext_emotion_tts__audio_edit_log` table). The host's audit pipeline doesn't change.
- **Frontend uses existing component vocabulary**: The mapping editor already has Spectral-Graphite waveform + dropzone primitives (Phase 5 work). New editor controls reuse those primitives' visual language. No new design-system additions.
- **Synthesis cache is the only invalidation surface that matters**: When an edit changes a voice asset, the existing synthesis cache key change is sufficient to prevent stale audio. No separate "edit was applied" cache flag.
- **Web Audio API for in-browser preview playback**: Standard, no new dependencies. Preview audio is fetched via the new `edit/preview` endpoint as raw bytes and decoded client-side.
- **Dependencies stay declared in the existing dependency installer**: No new Spec 035 step types. The worker pyproject change (if any) goes through the existing `package_set` step.

## Dependencies

- **`HostArtifactStore` host trait** (already shipped) — used to persist derived artifacts and resolve source artifact paths.
- **`LeaseProvider` host trait** (already shipped) — used to acquire the worker for audio-edit RPCs, same as for synthesis.
- **`EventBus` host trait** (already shipped) — used for the `extension.emotiontts.audio.edited` event.
- **`router::guard::assert_deployment_match`** (extension-local) — used by every new endpoint for cross-deployment isolation.
- **Worker venv libraries** (already shipped) — `ffmpeg-python`, `soundfile`, `pyloudnorm`, `silero-vad`.
- **Existing migration runner** — a single new additive migration registers the `edit_chain_json` columns. No new migration tooling required.
- **Existing dispatcher `prepare()` voice-path resolution** — extended to honor the `edit_chain_json` column, returning derived-artifact paths when a chain is present and source paths when it isn't.
