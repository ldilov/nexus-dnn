# Contract: Draft Blank Module — materialize flow

**Feature**: 019-extension-modules
**Status**: Draft (Phase 1)
**Spec ref**: FR-BM01..FR-BM07, SC-019, SC-020

## 1. Client-side lifecycle

```ts
// 1. User clicks "Blank Module" on Modules page.
const uuid = crypto.randomUUID();                    // FR-BM01
window.history.pushState({}, "", `#/modules/user:draft:${uuid}`);
initializeEditorSession({ mode: "draft", draft_uuid: uuid, workflow_payload: EMPTY });

// 2. Every debounced edit (≤ 500 ms) mirrors to sessionStorage. FR-BM03
sessionStorage.setItem(`nexus.module.draft.${uuid}`, JSON.stringify({
  uuid, workflow_payload, display_name, created_at,
}));
if (serialized.length > 512 * 1024) surfaceSizeCapWarning();

// 3. On page reload while URL still matches /modules/user:draft:{uuid}, re-hydrate. FR-BM03
const cached = sessionStorage.getItem(`nexus.module.draft.${uuid}`);
if (cached) restore(cached);

// 4. First Save Draft / Deploy Changes. FR-BM04
const resp = await fetch(`/api/v1/modules/user:draft:${uuid}/materialize`, {
  method: "POST",
  headers: { "content-type": "application/json" },
  body: JSON.stringify({ workflow_payload, display_name, ... }),
});
const { module_id, deployment_id, deployment_revision_id } = await resp.json().data;

// 5. Rewrite URL without reload. FR-BM05
window.history.replaceState({}, "", `#/modules/${module_id}`);
sessionStorage.removeItem(`nexus.module.draft.${uuid}`);
queryClient.invalidateQueries(["modules"]);

// 6. Discard path. FR-BM06
function discardDraft() {
  if (!confirm("Discard this draft?")) return;
  sessionStorage.removeItem(`nexus.module.draft.${uuid}`);
  navigate("/modules");
}
```

## 2. Server-side materialize handler

```rust
#[axum::debug_handler]
pub async fn materialize(
    State(state): State<AppState>,
    Path(uuid_str): Path<String>,
    Json(body): Json<MaterializeRequest>,
) -> Result<(StatusCode, Json<ApiResponse<MaterializeResponse>>), ApiError>;
```

**Steps**:

1. Validate `uuid_str` matches UUID-v4 regex. On mismatch → 400 `module.draft_uuid_invalid`.
2. Hash `body` canonically (SHA-256 over RFC 8785 JCS, reusing 018's hasher).
3. Acquire the `DraftMaterializeMap` read lock. If `{uuid → (workflow_id, deployment_id, created_at, body_hash)}` exists AND `body_hash` matches AND `created_at > now - 10min`:
   - Return HTTP 200 with the cached `{module_id, deployment_id, deployment_revision_id}`.
4. If `{uuid, body_hash}` exists but `body_hash` differs → 409 `module.draft_uuid_conflict`.
5. Otherwise, acquire a new SQLite transaction and:
   - `INSERT INTO workflows (id, title, ..., source_kind='user', ...)` using a freshly-minted `WorkflowId` (NOT the UUID — `workflows.id` format is independent).
   - Call `DeploymentSaveService::save(SaveRequest { source_workflow_id, save_mode: Create, ... })` with body-supplied overlays.
   - Commit.
6. Insert `{uuid → (workflow_id, deployment_id, now, body_hash)}` into the map; set TTL sweeper to remove after 10 min.
7. Return HTTP 201 with `{module_id: "user:{workflow_id}", deployment_id, deployment_revision_id}`.

## 3. Transactional invariants

- The materialize transaction creates exactly one `workflows` row and exactly one `deployments` row (plus one `deployment_revisions` row + child rows per 018).
- If any step 5 operation fails, the entire transaction rolls back AND the map is not updated. The client sees a normal `ApiError` and MAY retry (the next retry mints a fresh transaction; if the user retried quickly with the same body, idempotency kicks in via step 3 and they get the successful response they'd have seen otherwise).

## 4. Idempotency guarantees (SC-020)

| Second POST | Same uuid? | Same body_hash? | Within 10 min? | Result |
|---|---|---|---|---|
| ✓ | ✓ | ✓ | ✓ | HTTP 200, echo original `{module_id, deployment_id, deployment_revision_id}` |
| ✓ | ✓ | ✗ | ✓ | HTTP 409 `module.draft_uuid_conflict` |
| ✓ | ✓ | — | ✗ (TTL expired) | Map entry gone; new transaction runs → HTTP 201 with new ids |
| ✓ | ✗ (different uuid) | — | — | Treated as fresh call → HTTP 201 with new ids |

**Rationale for the body-hash check**: without it, a legitimate client that fixed a typo in `display_name` before the draft expired would get the *original* wrong-name deployment back. With it, the client is forced to mint a new UUID for a new intent — which matches the client-side behavior: the UUID lives in sessionStorage alongside the payload, so a payload change paired with a UUID re-mint is the natural flow.

## 5. TTL map implementation

```rust
pub struct DraftMaterializeMap {
    entries: Arc<RwLock<HashMap<Uuid, DraftEntry>>>,
    sweeper: JoinHandle<()>,
}

struct DraftEntry {
    workflow_id: WorkflowId,
    deployment_id: DeploymentId,
    deployment_revision_id: RevisionId,
    body_hash: [u8; 32],
    created_at: Instant,
}

const TTL: Duration = Duration::from_secs(10 * 60);
const SWEEP_INTERVAL: Duration = Duration::from_secs(60);
```

- Constructor spawns the sweeper via `tokio::spawn` — the sweeper iterates, evicts expired, sleeps `SWEEP_INTERVAL`.
- `Drop` for `DraftMaterializeMap` aborts the sweeper (`JoinHandle::abort`). In practice the map lives for the whole process, but unit tests create + drop instances.

## 6. Forbidden

- The UUID MUST NOT be persisted in any durable table (FR-BM04 explicit).
- The client-minted UUID MUST NOT be used as the `workflows.id` or `deployments.id`; those stay in their existing independent identity spaces.
- The server MUST NOT accept `user:draft:*` on any other endpoint (see FR-BM01, `module.draft_id_not_allowed` in `contracts/http-api.md`).
- The TTL value (10 min) is a constant; do not make it configurable via user-facing setting in v1 (keeps the idempotency window predictable).

## 7. Test matrix (SC-019, SC-020)

| Test | File | Asserts |
|---|---|---|
| 50 orphan clicks | `tests/e2e/blank_module_zero_orphan.spec.ts::orphans_never_created` | `SELECT COUNT(*) FROM workflows WHERE source_kind='user'` unchanged |
| Single materialize happy | `modules_materialize_idempotency.rs::materialize_happy` | 201, 1 new `workflows`, 1 new `deployments`, URL rewrites |
| Idempotent replay | `modules_materialize_idempotency.rs::materialize_idempotent_same_body` | 2nd POST → 200, same ids, 0 new rows |
| Conflict replay | `modules_materialize_idempotency.rs::materialize_conflict_on_body_diff` | 2nd POST w/ different body → 409 |
| TTL expiry | `modules_materialize_idempotency.rs::materialize_after_ttl` | 2nd POST after TTL → 201, new ids (no dup prevention after expiry) |
| Invalid uuid | `modules_materialize_idempotency.rs::materialize_rejects_bad_uuid` | 400 `module.draft_uuid_invalid` |
| Page reload mid-draft | `tests/e2e/blank_module_zero_orphan.spec.ts::reload_preserves_draft` | sessionStorage re-hydrate restores payload byte-identically |
