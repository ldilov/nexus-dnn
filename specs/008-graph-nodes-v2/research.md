# Phase 0 Research — Graph Nodes v2

All open questions from `spec.md §18` and two technical unknowns surfaced during planning, each resolved with a decision + rationale + alternatives considered.

---

## Q1. Cache-key derivation across parameter domains

**Question.** Which parameter domains (`structural`, `runtime`, `model_load`, `request`, `ui_only`) participate in an operator's cache key?

**Decision.** `structural + model_load` **only**. `runtime`, `request`, and `ui_only` are excluded.

**Rationale.**
- `structural` (e.g., resize width, prompt template, chunk size) changes the output by definition → must be in the key.
- `model_load` (e.g., model path, quantization, GPU layers) determines which model is loaded; a different model is a different computation → must be in the key.
- `runtime` (e.g., thread count, port, log level, service URL) is where computation happens, not what — same input + same model + same request params on a different port yields byte-identical output.
- `request` (e.g., temperature, top-p, seed, max_tokens) explicitly changes behavior per-invocation; including it would collapse the cache to near-zero hit rate. Users who want deterministic replay set `seed` and `temperature=0`; the cache is a **recomputation shortcut**, not a determinism guarantee.
- `ui_only` must never contaminate execution; this is an explicit invariant from the requirements doc.

**Alternatives considered.**
- *All domains.* Rejected — destroys caching for LLM nodes where `temperature` changes every session.
- *Structural only.* Rejected — a user swapping the model file silently returns cached output from the old model (correctness regression).
- *Operator-author opt-in per field.* Retained as a future escape hatch: each parameter spec may declare `includeInCacheKey: true` to force inclusion outside the defaults. Not in v0 MVP; documented as P1.

**Implementation.** `nexus_workflow_v2::cache::derive_cache_key(node, resolved_inputs) -> Sha256Hex` serializes `{operator_ref, structural_config_canonical_json, model_parameters_canonical_json, inputs_fingerprint}` with `serde_json` in sorted-keys mode, then SHA-256s the bytes.

---

## Q2. Undo/redo granularity

**Question.** Do we expose per-mutation-command undo in the UI, or only workflow-version rollback?

**Decision.** v0 ships **workflow-version rollback only** (coarse-grained). The mutation log is retained so finer-grained undo can be added in P1 without a data migration.

**Rationale.**
- Per-command undo requires inverse-command derivation for every command family (`AddNode` ↔ `RemoveNode`, but `ReplaceOperator` is lossy — the prior operator version might not be installed anymore).
- Coarse rollback is a one-liner: "discard all commands since `version_id = X`" → re-point `workflows.current_version_id`. Trivially correct.
- Users on spec-005's recipe UX rarely edit the graph directly, so fine-grained undo is low ROI for v0. Power users get "revert to last saved" via workflow-version rollback.

**Alternatives considered.**
- *Full command-log undo/redo with inverse derivation.* Valuable but risky (lossy commands, race conditions with concurrent edits). Deferred to P1 when we have real edit-telemetry data.
- *Client-side undo (React state only).* Rejected — violates host authority; breaks on page reload.

---

## Q3. Subgraph reuse scope

**Question.** Can a subgraph be referenced from multiple workflows?

**Decision.** **In-workflow only** in v0. Subgraphs live inside their parent workflow; reuse across workflows is P2.

**Rationale.**
- Cross-workflow reuse requires a separate versioned `components` table, reference-counting, and migration when the shared component changes. Significant scope.
- In-workflow subgraphs already solve the most common use case: "collapse these 8 LLM-prep nodes into one visual box."
- Keeping subgraphs local simplifies the mutation log (no cross-doc CoW).

**Alternatives considered.**
- *First-class shared components.* Explicitly listed as P2 in `spec.md §16`.
- *Copy-on-expand import.* Rejected — leaks abstraction; users can already duplicate nodes manually.

---

## Q4. Workflow inputs/outputs: synthetic nodes vs first-class document fields

**Question.** v1 renders `__inputs__` / `__outputs__` as synthetic boundary nodes with ids baked into React Flow state. Should v2 persist them that way or as first-class `workflow.inputs[]` / `workflow.outputs[]` document fields?

**Decision.** **First-class document fields in the model, synthetic nodes in the canvas renderer only.** The persisted `WorkflowV2` has `inputs: Vec<WorkflowPort>` and `outputs: Vec<WorkflowOutputBinding>`; the canvas maps them to synthetic React Flow nodes at render time, the same way v1 already does.

**Rationale.**
- Boundary ports are **declarations**, not operator invocations — they don't execute, don't have config, don't have attempts. Modeling them as nodes invites category errors (e.g., accidentally scheduling them).
- The canvas translation layer exists already and works; the recent connection-drag bug was caused precisely by leaking the synthetic id into the model. v2 makes that a **model invariant**: `workflow.edges[].source_node === "input"` for workflow-input edges, never `"__inputs__"`.

**Alternatives considered.**
- *Synthetic nodes in the model too.* Rejected as above — we already paid the cost of that bug once in v1.
- *Drop workflow I/O entirely, require everything as explicit operator nodes.* Too hostile to recipe authors; workflow I/O is how recipes bind their fields.

---

## Q5. Conversion-operator insertion UX

**Question.** When two port types are compatible only via an explicit conversion operator, does the host auto-insert the conversion node or does it require the user?

**Decision.** **User-driven.** The validator returns `ValidationResult { code: "conversion_required", suggestedFix: { kind: "insert_conversion_node", operator: "<conv-op-id>" } }`. The inspector renders a one-click "Insert conversion" action that dispatches `AddNode` + `ConnectPorts`.

**Rationale.**
- Auto-insertion creates nodes the user didn't ask for, which later confuse "why is this here?" debugging.
- One-click is nearly as fast as auto and preserves user intent.
- The suggested-fix field is already part of the structured validation result — no new surface area.

**Alternatives considered.**
- *Auto-insert with a banner.* Rejected — hidden mutations violate deterministic-mutation guarantees and make the mutation log lie.
- *Block the connection entirely.* Rejected — punishes users for trying.

---

## Q6. ts-rs namespace strategy for v1/v2 DTO coexistence

**Question.** `apps/web/src/api/generated/WorkflowDto.ts` already exists for v1. Adding v2 naïvely collides.

**Decision.** **Suffix pattern `*V2Dto` + subfolder `generated/v2/*`.** The ts-rs `#[ts(export_to = "...")]` attribute on v2 DTOs points to `../../../apps/web/src/api/generated/v2/` and the Rust type names carry `V2` in their name (`WorkflowV2Dto`, `NodeInstanceV2Dto`, …).

**Rationale.**
- Flat namespace collision is a hard build failure; we found this the hard way when DTOs were mixed.
- Subfolder isolation + name suffix means `import { WorkflowV2Dto } from "../api/generated/v2"` is visibly distinct from `import { WorkflowDto } from "../api/generated"`, and neither file ever needs to edit the other.
- When v1 is deleted (Phase D), the v2 folder can optionally be renamed back to `generated/` — but the name suffix can stay for another release as breadcrumbs.

**Alternatives considered.**
- *Feature flag at ts-rs level to rename outputs per build.* Too clever; hurts IDE navigation.
- *Separate npm package for v2 types.* Overkill for a monorepo.

---

## Q7. Deterministic `workflow_versions.id` hashing scheme

**Question.** How do we guarantee that replaying the same mutation sequence from the same base version yields the same `workflow_versions.id`?

**Decision.** `version_id = blake3(parent_version_id || canonical_json(command) || applied_at_seconds_floor)`. `applied_at_seconds_floor` is the integer UNIX second (not subsecond) captured at apply time.

**Rationale.**
- Blake3 is already a transitive dep via `nexus-artifact`, no new crate.
- Including `parent_version_id` gives a Merkle-chain shape — audit trail is immutable.
- Including `canonical_json(command)` (sorted keys, stable float formatting) ties the id to the exact operation.
- `applied_at_seconds_floor` breaks ties if the identical command is applied to the identical parent twice in a row (user re-runs a script). Second-level precision is coarse enough for human-scale replays to deterministically match when the same fixture fires at t=X on two machines with clock skew <1s (we don't guarantee anything for larger skew — tests use a frozen clock).

**Alternatives considered.**
- *Random UUIDs.* Violates determinism requirement → property tests would fail.
- *Hash without timestamp.* Commits two identical operations to the same id, collapsing the log.
- *Full nanosecond timestamp.* Over-specifies; breaks replay across machines.

**Implementation.** `nexus_workflow_v2::version::derive_version_id(parent, command, clock) -> VersionId`. Tests freeze the clock to assert equality across replays.

---

## Closed — remaining NEEDS CLARIFICATION

All items from `spec.md §18` resolved above (Q1 → cache; Q2 → undo; Q3 → subgraph reuse; Q4 → workflow I/O; Q5 → conversion UX). Q6 and Q7 resolve technical unknowns introduced during planning. No items carry forward into Phase 1 unresolved.
