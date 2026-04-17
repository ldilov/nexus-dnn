# Spec 021 — Session State (2026-04-17 close)

Pick up here in the next session. The working tree is clean; pull
`main` and continue.

## Progress

| Phase | Status | Notes |
|---|---|---|
| Phase 1 Setup | 3/3 ✅ | |
| Phase 2 US5 Regression Harness | 13/13 ✅ | baselines live, scanner active in CI |
| Phase 3 US1 Router Migration | 13/14 ✅ | T029 formal SC audit pending (mechanical) |
| Phase 4 US2 Backends Pilot | 21/23 ✅ | T044/T045 partial — domain service files are thin re-exports; bodies can move from api_client.ts incrementally |
| Phase 5 US3 Sweep | **15/18 🟡** | structural moves done; see "Next up" |
| Phase 6 US4 Motion | 0/8 | unblocked — ready to start |
| Phase 7 Finalization | 0/4 | README updates + close-out |

**Totals: 65/83 tasks complete (78%)**

## Commits on `main` (reverse chronological)

1. `c156c77` — US3 sweep: every screen → `views/<name>/`, canvas internals under workflows/
2. `6f3ca1f` — gzip + brotli compression for `/api/v1/*` (tower-http CompressionLayer)
3. `0b1e5f1` — US2 Backends pilot (full `.view` + `.ui` split + dedup)
4. `4b356b2` — ExtensionInstallModal rename (SR-006 fix)
5. `b04919a` — 36 visual baselines captured live
6. `36257f6` — createHashRouter data-mode migration (App.tsx → root_layout + routes.tsx)
7. `ca5401b` — services/event_streams + 9 domain re-exports
8. `57f764b` — regression harness + api_client relocate + react-router import migration
9. `149ff52` — spec 021 docs (plan/tasks/research/contracts/quickstart)
10. `76f85a3` — install-modal realtime stream fix + HF `full=true` fix

## Verified-green on last run

- `pnpm tsc --noEmit` green
- `pnpm scan:constitution` — 0 new violations, 147 baseline-allowed
- `pnpm test:regression` — **48 / 48** pass (12 smoke + 12 visual × 3 viewports)
- `pnpm build` green (252 KB gzipped main chunk)
- `cargo check -p nexus-api` green (CompressionLayer + dependencies compile)

## Next up — Phase 5 polish OR jump to Phase 6 US4 Motion

### Option A: finish Phase 5 (9 screens need `.view/.ui` split)

SR-007 baseline entries — each of these has a `<main>` / `<div>` /
`<section>` root in its `.view.tsx` and needs a sibling `.ui.tsx` with
the markup, like `backends.{view,ui}.tsx`:

1. `views/deployments/deployments.view.tsx`
2. `views/deployments/detail/detail.view.tsx`
3. `views/models/models.view.tsx`
4. `views/extensions/gallery/gallery.view.tsx`
5. `views/extensions/layout/layout.view.tsx`
6. `views/modules/modules_view.tsx` (+ rename to `modules.view.tsx`)
7. `views/modules/blueprint_view.tsx` (+ rename to `blueprint.view.tsx`)
8. `views/modules/instance_view/instance_view.tsx` (+ folder reshape)
9. `views/modules/instance_view/draft_view.tsx` (+ folder reshape)

Template: copy the Backends pattern — extract everything under the
`return ( ... )` into `<Screen>UI` in a sibling `.ui.tsx`, pass data
and handlers as props, leave `.view.tsx` returning exactly one
`<ScreenUI {...}/>`.

Other outstanding in Phase 5:
- **T066** — replace the `refreshLayouts` callback chain with a router
  `action` on `/extensions` for automatic revalidation.
- **T069** — run `scan:constitution` after all screens migrated and
  shrink baseline to zero if possible.
- **T070a** — SWR audit (grep all `useSWR(` outside
  `hooks/use_polling_metrics.ts` + `hooks/use_event_stream.ts`,
  document in `apps/web/docs/swr-inventory.md`).

### Option B: Phase 6 — US4 Motion (unblocked, independent)

T071–T078. Add `motion/react` `<AnimatePresence mode="popLayout">`
around the router `<Outlet/>` in `root_layout.tsx`, honor
`useReducedMotion()`, install-modal shared-element `layoutId`,
`LazyMotion + m` for bundle discipline, + bundle-size gate.

All prerequisites in place: `motion@12.38` installed, harness running,
baselines will tolerate the subtle animation states because
`reducedMotion: reduce` is forced in `playwright.config.ts`.

## Known deferred items (non-blocking)

| Item | Count | Rule | Fix plan |
|---|---|---|---|
| SR-007 non-PascalCase `.view.tsx` roots | 9 | XII.2 | Option A above |
| SR-009 static inline styles | 117 | XII.5 | Extract to `.css.ts` per screen as it's touched |
| SR-004 useEffect + I/O | 14 | XII.4 | Replace with route loaders / service-wrapper calls |
| SR-005 raw fetch outside services/ | 5 | XII.4 | Wrap each call site in services/* |
| SR-006 duplicate basename | 2 | XII.7 | `src/models/models.css.ts` vs `src/views/models/models.css.ts` — rename one |

## Commands to re-verify on session start

```bash
cd apps/web

# 1. Confirm scanner is clean
pnpm scan:constitution

# 2. Start dev server (Rust backend also needed if you want data-driven routes)
pnpm dev
# (in another shell) cargo run --bin nexus-host

# 3. Regression harness (48 tests)
pnpm test:regression

# 4. Optional: verify gzip landed
curl -sH 'Accept-Encoding: gzip' -D - http://localhost:5173/api/v1/llm/backends -o /dev/null | grep -i 'content-encoding'
```

## Files of interest

- `specs/021-web-architecture-refactor/` — spec, plan, tasks, contracts
- `specs/021-web-architecture-refactor/tasks.md` — task tracker (checked/unchecked)
- `apps/web/scripts/scan-constitution.mjs` — 9-rule AST scanner
- `apps/web/scripts/scan-constitution-baseline.json` — pinned pre-existing violations
- `apps/web/playwright.config.ts` — 3-viewport visual-regression config
- `apps/web/tests/smoke/routes.json` — route-smoke fixture
- `apps/web/src/routes.tsx` — single router source of truth
- `apps/web/src/root_layout.tsx` — shell owner with `<Outlet context={...}/>`
- `apps/web/src/services/` — I/O boundary (api_client + 9 domain re-exports + event_streams)
- `apps/web/src/views/backends/` — the canonical "layered screen" template
- `crates/nexus-api/src/router.rs` — CompressionLayer wiring
- `.specify/memory/constitution.md` — v1.2.0 with Principle XII + Appendices E/F
