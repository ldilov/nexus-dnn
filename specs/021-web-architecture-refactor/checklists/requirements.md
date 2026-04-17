# Specification Quality Checklist: Web App Architecture Refactor

**Purpose**: Validate specification completeness and quality before proceeding to planning
**Created**: 2026-04-17
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] No implementation details (languages, frameworks, APIs)
  *Note*: Refactor specs inherently name the current stack (React, vanilla-extract, Motion) because the **subject of the refactor is the stack itself**. Principle XII of the constitution codifies these choices; this spec enforces them. That usage is scoped to the Assumptions and Rollout Discipline sections, not leaking into user-facing Success Criteria.
- [x] Focused on user value and business needs (faster onboarding, no drift, regression-safe)
- [x] Written for non-technical stakeholders where stakeholder = "contributor reading the spec." Success Criteria are measurable without a code read.
- [x] All mandatory sections completed (User Scenarios, Requirements, Success Criteria)

## Requirement Completeness

- [x] No [NEEDS CLARIFICATION] markers remain
- [x] Requirements are testable and unambiguous (each FR has an observable outcome or mechanical grep target)
- [x] Success criteria are measurable (line counts, file counts, viewport-diff thresholds, timing budgets, bundle KB, grep results)
- [x] Success criteria are technology-agnostic where user-facing; technology-pinned where they enforce the constitution
- [x] All acceptance scenarios are defined for each user story
- [x] Edge cases are identified (WebSocket teardown, loader race, sessionStorage drift, reduced-motion, HashRouter constraint, legacy imports)
- [x] Scope is clearly bounded (explicit OUT OF SCOPE: Rust changes, BrowserRouter migration, Storybook, removing the `react-router-dom` npm dep)
- [x] Dependencies and assumptions identified (HashRouter retention, v7 already installed, no SSR, backend tests cover invariants)

## Feature Readiness

- [x] All functional requirements have clear acceptance criteria (FR-### map to user-story acceptance scenarios or SC-### metrics)
- [x] User scenarios cover primary flows (router, pilot screen, sweep, animation, regression harness)
- [x] Feature meets measurable outcomes defined in Success Criteria
- [x] No implementation details leak into user-facing Success Criteria (the technology names that DO appear do so as constitution enforcement, which is the point)

## Notes

All items pass. The spec is ready for `/speckit.plan`. Key design calls baked in:

- **Regression harness lands BEFORE router migration** (US5 has P1 priority alongside US1). Baseline Playwright screenshots captured on `main` per FR-034 are the safety net.
- **Slice-by-slice rollout with bisectable commits** (FR-035, FR-036) — no big-bang merges.
- **HashRouter retained** because the Rust server does not serve SPA fallback; moving to BrowserRouter is a separate follow-up spec.
- **Motion adopted**, NOT `framer-motion`; `LazyMotion + m` keeps bundle growth ≤ 8 KB gzipped (SC-012).
- **Install-modal dedup** keeps the freshly redesigned Spectral Graphite version under `views/backends/components/install_modal/`.
- **Three [NEEDS CLARIFICATION] budget unused** — every ambiguity had a reasonable default (HashRouter, Motion package name, install-modal canonical copy, Storybook out-of-scope).
