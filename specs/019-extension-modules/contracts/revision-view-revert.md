# Contract: Revision Viewing & Revert (Instance editor)

**Feature**: 019-extension-modules
**Status**: Draft (Phase 1)
**Spec ref**: FR-RV01..FR-RV06, SC-016

## 1. State machine (`apps/web/src/instance_editor/instance_editor_reducer.ts`)

```ts
type InstanceEditorSession =
  | { mode: "editing";   deployment_id: DeploymentId; current_revision_id: RevisionId;
      active_tab: Tab; recipe_segment: "overlay" | "blueprint";
      dirty_draft_payload: WorkflowPayload | null; last_save_attempt: SaveStatus | null }
  | { mode: "viewing";   deployment_id: DeploymentId; current_revision_id: RevisionId;
      viewed_revision_id: RevisionId; active_tab: Tab;
      preserved_draft: WorkflowPayload | null }
  | { mode: "draft";     draft_uuid: string;
      active_tab: "graph"; dirty_draft_payload: WorkflowPayload };

type Action =
  | { t: "open_deployment";  deployment_id: DeploymentId; current_revision_id: RevisionId }
  | { t: "open_draft";       draft_uuid: string }
  | { t: "edit_overlay";     patch: Partial<WorkflowPayload> }
  | { t: "switch_tab";       tab: Tab }
  | { t: "toggle_recipe_seg"; segment: "overlay" | "blueprint" }  // Cmd/Ctrl+B
  | { t: "pick_revision";    revision_id: RevisionId }  // may be current or non-current
  | { t: "back_to_current" }
  | { t: "save_draft_ack";    new_revision_id: RevisionId }         // after auto_draft POST
  | { t: "deploy_changes_ack"; new_revision_id: RevisionId }        // after save_as_version POST advances current
  | { t: "make_current_ack";  new_current_revision_id: RevisionId } // after FR-RV04 POST
  | { t: "materialize_ack";   deployment_id: DeploymentId; current_revision_id: RevisionId };
```

## 2. Transition rules

| From | Action | To | Side effect |
|---|---|---|---|
| `editing` | `pick_revision(r)` where `r == current` | unchanged | — |
| `editing` | `pick_revision(r)` where `r != current` | `viewing` with `preserved_draft = dirty_draft_payload` | — |
| `viewing` | `back_to_current` | `editing` with `dirty_draft_payload = preserved_draft` | — |
| `viewing` | `pick_revision(r')` | `viewing` with new `viewed_revision_id = r'`, `preserved_draft` unchanged | — |
| `viewing` | `make_current` with no dirty draft | POST `/deployments/{id}/revisions` with `save_mode=save_as_version`, body=copy-forward of `viewed_revision_id`; on ack → `editing` at new current | 1 network call |
| `viewing` | `make_current` with dirty draft, "Save draft & revert" | POST auto_draft carrying `preserved_draft` → POST save_as_version copy-forward; on both acks → `editing` at new current, `dirty_draft_payload = null` | 2 network calls |
| `viewing` | `make_current` with dirty draft, "Discard draft & revert" | POST save_as_version copy-forward only; on ack → `editing` at new current, `dirty_draft_payload = null` | 1 network call |
| `viewing` | `make_current` on a revision with `compatibility_state ∈ {incompatible, missing}` | blocked — CTA disabled, banner surfaces diagnostic | — |
| `draft` | `materialize_ack` | `editing` with supplied ids, `dirty_draft_payload = null` | clear sessionStorage |

Any other transition is a bug (assertion in the reducer rejects it with `console.error` in dev builds; silent no-op in prod — FR-TP04 forbids outbound beacons).

## 3. Write-affordance gating (FR-RV02)

In `viewing` mode, every write affordance is `disabled`:

| Affordance | Location | Disable mechanism |
|---|---|---|
| Parameter input fields | Recipe tab overlay section | `disabled` attr + `opacity: 0.6` |
| Node drag handles | Graph tab | `pointer-events: none` on `.react-flow__node` |
| Port reconnects | Graph tab | same |
| Save Draft | Identity banner | `disabled` + `cursor: not-allowed` |
| Deploy Changes | Identity banner | same |
| Recipe tab Overlay segment | segmented control | `aria-disabled="true"` — user can still click but no effect; tooltip explains |
| Stage tab step bindings | Stage tab | `disabled` on every input |

The Trace tab stays fully interactive (telemetry is always safe to view).

## 4. Revision picker UI (FR-RV01)

```tsx
<RevisionPicker
  deployment_id={...}
  current_revision_id={...}
  viewed_revision_id={...}
  onPick={(r) => dispatch({ t: "pick_revision", revision_id: r })}
/>
```

- Populated by `GET /api/v1/deployments/{id}/revisions?limit=50&order=desc` (existing 018 endpoint).
- Renders newest-first; the currently-viewed revision carries a `primary_dim` dot on its left edge.
- Keyboard: arrow keys navigate, Enter picks, Escape closes.
- Rendered in a glass-panel popover anchored to the revision "▾" in the identity banner.

## 5. Viewing-mode banner (FR-RV02)

```tsx
<ViewingModeBanner
  viewed_revision_number={...}
  compatibility_warning={...}  // optional
  onBackToCurrent={() => dispatch({ t: "back_to_current" })}
  onMakeCurrent={() => openMakeCurrentModal()}
  makeCurrentDisabled={compatibility_blocks}
/>
```

- Sticky at top of the editor, below the identity banner.
- Layout: `[ "Viewing revision 7 — read-only" ] [ warning chip if any ] [ spacer ] [ "Back to current" ghost btn ] [ "Make this the current revision" primary btn ]`.
- Background: `secondary_container`; text: `on_secondary_container`.

## 6. Make-current modal (FR-RV05)

```tsx
<MakeCurrentConfirmModal
  hasDirtyDraft={...}
  onSaveDraftAndRevert={...}
  onDiscardDraftAndRevert={...}
  onCancel={...}
/>
```

- Only appears when `hasDirtyDraft=true`. When no draft, the CTA short-circuits straight to the revert POST.
- Focus trap: Tab cycles among the three buttons; Escape == Cancel.
- Default focus: "Save draft & revert" (the non-destructive choice).
- All three CTAs show a spinner while the POST(s) are in flight.

## 7. Copy-forward payload shape (FR-RV04)

The make-current POST body is a byte-stable copy-forward of revision N's snapshot as returned by `GET /deployments/{id}/revisions/{N}`:

```json
{
  "save_mode": "save_as_version",
  "workflow_patch": null,
  "parameter_overlays": [ /* revision N's */ ],
  "runtime_bindings": [ /* revision N's */ ],
  "model_bindings": [ /* revision N's */ ],
  "artifact_bindings": [ /* revision N's */ ],
  "change_summary": "reverted to revision N"
}
```

The server SHOULD recompute `effective_workflow_hash` from the materialized snapshot; it SHOULD equal revision N's hash byte-for-byte (because the payload is a copy). The `change_summary` is the only field that differs across the two revisions — plus of course `revision_number`, `created_at`, and `save_mode`.

## 8. Compatibility blocks (FR-RV06)

Before rendering the Make-current CTA enabled, the banner checks `viewed_revision.compatibility_state_json` (018 FR-020). If any dimension is `incompatible` or `missing`, the CTA disables and the banner surfaces the specific dimension + code as a `warning`-level diagnostic. The user can still view the revision but must first resolve the compatibility issue (e.g., re-install the missing runtime) before reverting to it.

## 9. Contract test (SC-016)

```rust
#[tokio::test]
async fn revision_view_and_revert_with_dirty_draft_preserves_both() {
    let state = seed_app_state().await;

    let deployment = create_deployment(&state).await;
    let rev_k = deployment.current_revision_id;

    // client dirties a param; no POST yet
    let dirty = dirty_param(&deployment, "temperature", 0.99);

    // open a prior revision for viewing
    let rev_k_minus_1 = previous_revision(&state, &deployment).await;
    // (no HTTP call for just viewing; the editor reducer handles it client-side by rehydrating `revision_k_minus_1` from GET /revisions/{k-1})

    // trigger make-current with "Save draft & revert"
    let auto_draft_resp = post_revision(&state, &deployment, SaveMode::AutoDraft, dirty.clone()).await;
    assert_eq!(auto_draft_resp.status, 201);
    // current_revision_id NOT advanced yet
    assert_eq!(current_revision_id(&state, &deployment).await, rev_k);

    let revert_resp = post_revision(&state, &deployment, SaveMode::SaveAsVersion,
        copy_forward_of(&state, &deployment, rev_k_minus_1).await).await;
    assert_eq!(revert_resp.status, 201);

    let new_current = current_revision_id(&state, &deployment).await;
    assert_ne!(new_current, rev_k);
    assert_ne!(new_current, rev_k_minus_1);
    assert_ne!(new_current, auto_draft_resp.revision_id);

    // all three historical revisions remain readable
    for r in [rev_k, rev_k_minus_1, auto_draft_resp.revision_id] {
        assert!(get_revision(&state, &deployment, r).await.is_ok());
    }

    // effective_workflow_hash of new current equals rev_k_minus_1's
    assert_eq!(
        hash_of_revision(&state, &deployment, new_current).await,
        hash_of_revision(&state, &deployment, rev_k_minus_1).await,
    );
}
```

Extra Playwright test `tests/e2e/revision_view_revert.spec.ts` covers the UI-state assertions (banner visible, all write affordances disabled, Cmd/Ctrl+B still works in Viewing mode, etc.).
