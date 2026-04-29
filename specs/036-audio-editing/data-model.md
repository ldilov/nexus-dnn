# Phase 1 Data Model — EmotionTTS Audio Editing

All schema additions are extension-owned and live under
`extensions/builtin/emotion-tts/storage/migrations/`. No host migration changes.

---

## Domain entities (Rust types)

### `EditOp` — single transformation

```rust
#[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize)]
#[serde(tag = "mode", rename_all = "snake_case")]
#[non_exhaustive]
pub enum EditOp {
    Trim    { id: OperationId, start_ms: u32, end_ms: u32 },
    Crop    { id: OperationId, start_ms: u32, end_ms: u32 },
    Normalize { id: OperationId, target_lufs: f32 },
    Speed   { id: OperationId, factor: f32 },
    FadeIn  { id: OperationId, duration_ms: u32 },
    FadeOut { id: OperationId, duration_ms: u32 },
    Mute    { id: OperationId, start_ms: u32, end_ms: u32 },
}
```

- `OperationId` is a newtype around `ulid::Ulid` (FR-005a).
- `#[non_exhaustive]` keeps the enum forward-compatible per Principle XI.
- `target_lufs` validated to `[-30.0, -6.0]` at the boundary; out-of-range yields
  `EmotionTtsError::validation`.
- `factor` validated to `[0.5, 2.0]` (FR-004).
- `start_ms` < `end_ms` and resulting clip ≥ 100 ms (Edge Cases).
- `duration_ms` ≤ source duration; clamped at apply-time to source length.

### `EditChain` — ordered list

```rust
#[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize)]
pub struct EditChain {
    pub version: u8,         // == 1 in v1
    pub ops: Vec<EditOp>,    // length 0..=32 (FR-006)
}
```

- Length 0 is permitted (deserialized as "no chain"); the persisted form for an
  unedited row is `NULL`, not an empty chain.
- Length cap enforced at boundary; >32 yields validation error.

### `ChainDigest` — deterministic hash

```rust
#[derive(Debug, Clone, PartialEq, Eq, Hash, serde::Serialize, serde::Deserialize)]
pub struct ChainDigest(String);  // 64-char lower-hex SHA-256
```

- Constructed via `ChainDigest::of(chain: &EditChain) -> Self` using the canonical
  JSON form (R5).
- Empty chain (or `NULL` chain column) → constant `ChainDigest::EMPTY` so cache
  keys for "unedited" stay stable across reverts (SC-004).

### `AuditEntry` — audit-log row

```rust
#[derive(Debug, Clone, PartialEq, serde::Serialize, serde::Deserialize)]
pub struct AuditEntry {
    pub entry_id: AuditEntryId,    // newtype around ULID
    pub target_id: String,         // voice_asset_id or utterance_id
    pub target_kind: TargetKind,   // voice_asset | utterance
    pub digest_before: ChainDigest,
    pub digest_after: ChainDigest,
    pub operation_count: u16,
    pub recorded_at: DateTime<Utc>,
    pub actor: String,             // "system" until auth lands (FR-029)
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, serde::Serialize, serde::Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum TargetKind { VoiceAsset, Utterance }
```

---

## SQLite schema additions

### Migration `015_voice_asset_edit_chain.sql`

```sql
ALTER TABLE ext_emotion_tts__voice_assets
  ADD COLUMN edit_chain_json TEXT;
```

- Nullable. Default `NULL` for all existing rows (no chain).
- `audio_artifact_ref` continues to point at the **derived** artifact when a chain
  is present, **source** otherwise. The source artifact reference is implied by
  the row's existing `source_artifact_ref` (already in the table from Spec 031).
  Where Spec 031 stored only one artifact ref, this spec promotes "derived vs
  source" into a runtime computation: when `edit_chain_json IS NULL`, source ==
  derived; otherwise the dispatcher resolves the derived artifact.

### Migration `016_utterance_edit_chain.sql`

```sql
ALTER TABLE ext_emotion_tts__utterances
  ADD COLUMN edit_chain_json TEXT;
```

- Same shape as voice assets. The `source` for an utterance edit is the
  originally-synthesized segment audio, preserved (FR-008).

### Migration `017_audio_edit_log.sql`

```sql
CREATE TABLE IF NOT EXISTS ext_emotion_tts__audio_edit_log (
    entry_id        TEXT PRIMARY KEY,           -- ULID
    deployment_id   TEXT NOT NULL,              -- soft FK
    target_id       TEXT NOT NULL,              -- voice_asset_id or utterance_id
    target_kind     TEXT NOT NULL CHECK (target_kind IN ('voice_asset','utterance')),
    digest_before   TEXT NOT NULL,              -- 64-char lower-hex SHA-256
    digest_after    TEXT NOT NULL,
    operation_count INTEGER NOT NULL CHECK (operation_count >= 0),
    recorded_at     TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
    actor           TEXT NOT NULL DEFAULT 'system'
);

CREATE INDEX IF NOT EXISTS ix_audio_edit_log_target
    ON ext_emotion_tts__audio_edit_log (target_id, recorded_at DESC);

CREATE INDEX IF NOT EXISTS ix_audio_edit_log_deployment
    ON ext_emotion_tts__audio_edit_log (deployment_id, recorded_at DESC);
```

Notes:
- `deployment_id` is a soft foreign key (Appendix G). No physical FK constraint
  crosses the host/extension boundary.
- `target_id` is **not** a physical FK either — when an asset is deleted, the
  audit row remains for forensic value (FR-030, edge case).
- `recorded_at` defaults to ISO-8601 millisecond UTC for round-trip with
  `chrono::DateTime<Utc>`.
- No `updated_at` column: the table is append-only by contract (FR-029).

---

## State transitions

### Voice asset edit-chain lifecycle

```text
[no chain] --apply--> [chain v1]    (audit: digest_before=EMPTY, digest_after=H1)
[chain v1] --apply--> [chain v2]    (audit: digest_before=H1,    digest_after=H2)
[chain v2] --remove op--> [chain v3] (audit: digest_before=H2,    digest_after=H3)
[chain v3] --clear--> [no chain]    (audit: digest_before=H3,    digest_after=EMPTY, op_count=0)
```

Invariants:
- Digest is deterministic over (version, ops) per R5.
- `digest_before` of an Apply equals the row's persisted digest at the moment Apply
  is accepted. Concurrent edits surface a stale-digest validation error (Edge
  Cases: "Two browser tabs editing the same asset concurrently" → last-write-wins
  is the spec ruling, but the audit log still captures the actual transition).
- Apply with chain identical to current persisted state is a **no-op**: skip the
  worker round-trip, do not append an audit entry (Edge Cases).
- Clear with already-empty chain is also a no-op (no audit entry).

### Per-utterance edit lifecycle

Identical state machine to voice asset, scoped to the `ext_emotion_tts__utterances`
row. Source artifact is the originally-synthesized segment audio, preserved on
disk under the run's directory.

---

## Cache key integration (FR-017)

The synthesis cache key `domain::cache_key::CacheKeyInput` gains:

```rust
pub struct CacheKeyInput {
    // ...existing fields...
    pub voice_asset_chain_digest: ChainDigest,  // EMPTY when no chain
}
```

`build_canonical_string` appends `|chain={digest}` to the canonical form. Existing
test `deterministic_same_input_same_hash` extends to cover digest equivalence;
new test `chain_digest_changes_hash` verifies SC-003.

### Cache key evolution & version bump

- Adding a new field changes the canonical string for every input. Existing cache
  rows under the old format become **stale** but harmless (they will simply miss
  on the new key). The `model_version_bump_invalidates_cache` test contract is
  preserved — the new field acts the same way as a model version bump for entries
  that already lacked an explicit chain.
- For unedited assets (`chain == EMPTY`) the digest is constant; the canonical
  string changes by exactly the suffix `|chain=<EMPTY-digest>`. A one-time
  cache-warm regeneration absorbs the cost.
- No migration is required to drop old rows. The `synthesis_cache` table's
  natural cleanup (lru-style or none) applies.

---

## Boundary verification (Principle XIII)

- Every new column lives in an `ext_emotion_tts__*` table. No host-tree change.
- Every new file is under `extensions/builtin/emotion-tts/`.
- The boundary audit script `extensions/builtin/emotion-tts/scripts/audit-boundary.sh`
  receives a one-line update to grep for the new audit-log table name in `crates/`
  and `apps/web/src/` and assert zero hits. (Defined in
  [`contracts/boundary-audit.md`](./contracts/boundary-audit.md).)

---

## Validation rules (boundary)

| Field | Rule | Error code |
|-------|------|-----------|
| `EditChain.ops.len()` | 0..=32 | `VALIDATION_FAILED` |
| `EditOp::Trim/Crop/Mute.start_ms` < `end_ms` | strict | `VALIDATION_FAILED` |
| `EditOp::Trim/Crop` resulting duration | ≥ 100 ms | `VALIDATION_FAILED` |
| `EditOp::Speed.factor` | `[0.5, 2.0]` | `VALIDATION_FAILED` |
| `EditOp::Normalize.target_lufs` | `[-30.0, -6.0]` | `VALIDATION_FAILED` |
| `EditOp::FadeIn/FadeOut.duration_ms` | ≤ source duration after preceding ops | `VALIDATION_FAILED` |
| Chain JSON `version` field | == 1 (v1) | `VALIDATION_FAILED` |
| Stale digest on Apply | `digest_before` matches current persisted | `VALIDATION_FAILED` (with `409`-equivalent body shape) |

All validation runs at the HTTP handler boundary using the existing
`EmotionTtsError::validation` helper; the worker re-validates as defense in depth
but does not swallow caller errors.
