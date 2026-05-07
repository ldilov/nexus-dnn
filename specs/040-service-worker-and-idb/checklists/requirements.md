# Requirements Quality Checklist — Spec 040

**Last reviewed:** 2026-05-07 (Phase 2 — Define gate)

## Coverage

- [x] **All discovered pain points mapped to user stories.** P1→US1, P2→US2, P3→US2, P4→US3, P5→US4, P6→US5, P7 (offline read) collapsed into US4 (cache renders read-only when backend unreachable).
- [x] **All P1 stories have acceptance scenarios.** US1 (4), US2 (5), US6 (5).
- [x] **All P2 stories have acceptance scenarios.** US3 (5), US4 (5), US5 (5).
- [x] **Every functional requirement traces to at least one user story or success criterion.**
  - FR-001..FR-002 → US6, US2, US1
  - FR-003..FR-008 → US2 + US3
  - FR-009..FR-010 → US1
  - FR-011..FR-012, FR-023 → US6
  - FR-013..FR-017, FR-024..FR-025 → US3, US4, US5
  - FR-018, FR-021 → US3, US4
  - FR-019 → US5
  - FR-020 → US2, US6
  - FR-022 → SC-007, SC-011 (build-time)
  - FR-026 → SC-010 (boundary)
- [x] **Every success criterion is independently measurable.** SC-001..SC-011 each describe a concrete observable.

## Clarity

- [x] **No ambiguous "should/may/might" outside Edge Cases.** All FRs use MUST.
- [x] **No undefined terms.** All entities defined in Key Entities; all URL surfaces named explicitly.
- [x] **No backend changes hidden in the wording.** SC-009 makes zero-backend-change a verifiable success criterion.
- [x] **Spec does not prescribe specific code organization beyond boundary.** File paths in FR-001/FR-011/FR-013 are necessary because spec 037 boundary discipline requires location to be part of the spec.

## Boundary discipline

- [x] **No new code under `apps/web/src/components/chat/`.** Confirmed in scope text and SC-010.
- [x] **Generic primitives separated from per-extension wiring.** `apps/web/src/sw/` and `apps/web/src/services/idb/` are explicitly generic; per-extension keys live elsewhere.
- [x] **No new host-side route hardcoding extension IDs.** No backend changes; existing routes unchanged.
- [x] **`audit-allow:` markers planned where needed.** Acknowledged in Notes; will be added in Plan phase if the broker needs to read URL paths containing `nexus.local-llm`.

## Test coverage requirements

- [x] **Independent Test paragraph for every user story.** US1, US2, US3, US4, US5, US6.
- [x] **Acceptance scenarios use Given/When/Then.** All 24 scenarios across 6 user stories.
- [x] **Negative paths covered.** US1 #3 (SW disabled regression-free), US6 (registration error fallback), US3 #3 (SW eviction), US4 #4 (schema migration), US5 #5 (private browsing fallback).

## Out-of-scope discipline

- [x] **Out of Scope is explicit.** Eight items enumerated, each with rationale.
- [x] **No P3 user stories smuggled in.** All P1/P2; if anything emerged as P3 it was moved to Out of Scope.
- [x] **WebWorker work removed per user choice (1b).** Tracked in Out of Scope.

## Risks acknowledged

- [x] **Complexity Tracking section names mitigations for top 7 risks.** SW lifecycle, IDB migrations, lock crash, CORS, kill-switch coverage, bundle bloat, UI confusion (n/a).
- [x] **Edge Cases section names 7 specific failure modes.** SW update mid-stream, cross-origin cookies, IDB migration mid-flight, quota exceeded, lock holder hangs, two-deployment same-port, reverse proxy stripping headers.

## Stretch goals deliberately deferred

- [ ] OPFS staging for resumable model uploads (Theme 4 — Chromium-only).
- [ ] File handlers + protocol handlers (Takeaway 7).
- [ ] Background Sync / Push / Periodic Sync.
- [ ] WebTransport SSE replacement.
- [ ] Migrating `streamMessage` to host-mounted route.

All five flagged in Out of Scope; tracked for future specs.

## Gate readiness

- [x] **Spec is implementable from this document alone.** No external context required.
- [x] **Test coverage targets named.** SC-001..SC-011 are the exit criteria.
- [x] **No unresolved questions blocking Develop phase.** Discovered architectural detail (cross-origin SSE pattern) is addressed in FR-002 and Edge Cases.
- [x] **Estimated task count: 50–65.** Within "Tier-1 + IDB" envelope user picked at gate.

## Verdict

✅ **Ready for Plan/Tasks phase pending human gate approval.**
