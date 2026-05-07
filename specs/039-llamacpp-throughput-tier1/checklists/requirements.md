# Specification Quality Checklist: llama.cpp Throughput Tier-1 Knobs

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-05-07
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details inappropriate for a spec — Rust struct names + flag names appear because the *flag wire contract* and the existing `RuntimeTuning` struct ARE the user-visible interface for power users. Frontend file paths under `apps/web/src/layout/local_llm/` are scoped requirements (per host ↔ extension boundary rule), not implementation choices.
- [x] Focused on user value and business needs — every Tier-1 knob is justified by measured operator-perceptible win (TTFT cuts, fitting 100B+ MoE on consumer GPUs).
- [x] Written for stakeholders who own the chat surface (not abstract end-users — the operators are the audience).
- [x] All mandatory sections completed (Overview, User Scenarios, Functional Requirements, Success Criteria, Assumptions, Out of Scope, Key Entities, Dependencies, Complexity Tracking).

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain.
- [x] Requirements are testable and unambiguous — every FR has a concrete pass/fail rule, every SC has a measurable target.
- [x] Success criteria are measurable — TTFT % deltas, presence/absence of UI elements, command-line argv contents, boundary-grep results.
- [x] Success criteria are technology-agnostic at the user level — operators don't see "argv"; they see TTFT and a slider working. The argv check is for reviewers verifying correctness.
- [x] All acceptance scenarios are defined — Given/When/Then for each user story, including the gating logic for Gemma 3 cache-reuse and the auto-bump for MoE.
- [x] Edge cases identified — missing `expert_layer_count` (fallback 64), unknown host VRAM (read-out adapts), Gemma 3 override (unsafe opt-in path), idempotent re-probe of pre-upgrade artifacts.
- [x] Scope is bounded — Out of Scope explicitly carves out Tier-2 / Tier-3 knobs, sampler changes, multi-GPU, reasoning models, LoRA, real driver probe, live-retune.
- [x] Dependencies + assumptions identified — references to specs 028, 030, 037, the HelpTooltip primitive, the `lastTuningByFamily` persistence shape.

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria — each FR maps to either an acceptance scenario, a unit test name, or both.
- [x] User scenarios cover primary flows — load with cache-reuse, load with prompt-cache-RAM, load MoE with offload, install-time metadata extraction, boundary audit.
- [x] Feature meets measurable outcomes — SC-001 through SC-007 cover throughput wins, gating correctness, boundary discipline, and test green status.
- [x] No implementation details that should be deferred to plan/tasks leak into this spec — flag names are the wire contract; struct field names are the persisted DTO; file path scoping is a non-negotiable boundary rule.

## Notes

- The MoE auto-bump rule (FR-017) is the only non-obvious coupling among the throughput knobs. The spec calls it out explicitly in Complexity Tracking + a dedicated regression test.
- The known-broken-models list for cache-reuse is intentionally narrow — better to require operator override on a working model than to silently corrupt output on a broken one. Same matcher drives the `--swa-full` auto-application path (FR-029).
- The VRAM-budget formula is approximate; this is acknowledged in the spec, the HelpTooltip copy, and the read-out's `~` prefix. A future spec may replace it with a real driver probe.
- The sampler-quality additions (DRY, min-p, profile presets) were added under the user's explicit "real benefit only" filter. XTC, top-nσ, dynatemp, mirostat, logit-bias, samplers chain reorder, and typical-p remain out of scope until there is evidence of broad operator demand.
- Six of seven counter-intuitive pitfalls from the deep-research report are addressed inline as form warnings or auto-applied mitigations. The seventh (containerized-Metal performance) is environmental and is documented in the deep-research checkpoint rather than warned-on.
- Items marked complete here represent the spec author's verdict; `/speckit.plan` and `/speckit.tasks` may surface additional clarifications.
- **2026-05-07 refinement pass** (post-`/speckit-analyze`): five MEDIUM findings remediated — User Story 7 path-list and Backend header now correctly identify host crate touchpoints (I1); `top_k` override toggle scope documented as session-only in `data-model.md` (U1); `n_cpu_moe` schema cap tightened to 256 with form-bound documentation (I2); `sensible_defaults` preservation test added as T009a (C1); RuntimeTuning JSON-shape contract test added as T009b (C2). Total tasks: 112. Checklist re-validated: all items still pass.
