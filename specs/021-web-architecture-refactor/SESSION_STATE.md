# Spec 021 — Session State (2026-04-17 close, US3 complete)

Pick up here in the next session. The working tree is clean on `main`.

## Progress

| Phase | Status | Notes |
|---|---|---|
| Phase 1 Setup | 3/3 ✅ | |
| Phase 2 US5 Regression Harness | 13/13 ✅ | baselines live, scanner in CI |
| Phase 3 US1 Router Migration | 13/14 ✅ | T029 formal SC audit pending (mechanical grep) |
| Phase 4 US2 Backends Pilot | 21/23 ✅ | T044/T045 domain service file-body splits deferred |
| Phase 5 **US3 Sweep** | **18/18 ✅** | all 10 screens migrated; all 9 SR-007 root violations resolved |
| Phase 6 US4 Motion | 0/8 | **unblocked — ready to start** |
| Phase 7 Finalization | 0/4 | |

**Totals: 74/83 tasks complete (89%)**

## Commits on `main` (reverse chronological, recent 13)

1. `91f8cf9` — SR-007 fix for modules trio (blueprint, instance, draft) via `<Shell>` wrapper + modules list full split
2. `746e539` — 5 screens fully split into `.view/.ui` (layout, deployments, detail, models, gallery)
3. `70e7b82` — `.gitignore` + previous SESSION_STATE.md
4. `c156c77` — US3 sweep — every screen in `views/<name>/`, canvas internals under workflows/
5. `6f3ca1f` — gzip + brotli compression on `/api/v1/*`
6. `0b1e5f1` — US2 Backends pilot
7. `4b356b2` — ExtensionInstallModal rename (SR-006 dedup)
8. `b04919a` — 36 visual baselines captured live
9. `36257f6` — createHashRouter data-mode migration
10. `ca5401b` — services/event_streams + 9 domain re-exports
11. `57f764b` — regression harness + api_client relocate + react-router
12. `149ff52` — spec 021 docs (spec/plan/research/contracts/quickstart/tasks)
13. `76f85a3` — install-modal realtime stream + HF `full=true` fixes

## Last verified-green run

- `pnpm tsc --noEmit` green
- `pnpm scan:constitution` — 0 new violations, **133 baseline-allowed**
- `pnpm test:regression` — **48 / 48 pass** (12 smoke + 36 visual across 3 viewports)
- `pnpm build` — green (252 KB gzipped main chunk)
- `cargo check -p nexus-api` — green (CompressionLayer wired)

## Baseline composition

| Rule | Count | Meaning |
|---|---|---|
| SR-007 `.view.tsx` non-PascalCase root | **0** ✅ | completely resolved this session |
| SR-009 static inline styles | 113 | ongoing SR drift — extract per screen as edited |
| SR-004 useEffect + I/O | 13 | screens still using pre-loader pattern |
| SR-005 raw fetch outside services/ | 5 | specific call sites (hooks/use_api + a couple screens) |
| SR-006 duplicate basename | 2 | only `models.css.ts` dup remains |
| **Total** | **133** | down from 194 initial baseline |

## Next session — choose one

### Option A: Phase 6 US4 Motion (unblocked, recommended)

T071–T078. `motion@12.38` is installed; routes are stable; visual baselines use `reducedMotion: reduce` so subtle animation states won't flake.

1. Wrap the router `<Outlet/>` in `root_layout.tsx` with
   `<LazyMotion features={domAnimation}><AnimatePresence mode="popLayout"><m.div key={pathname}>...`
2. Extract motion tokens into `src/theme/motion.css.ts` (durations, easings).
3. Honor `useReducedMotion()` — fall back to zero-duration transitions.
4. Install-modal shared-element: `layoutId="install-modal-<backendId>"` on the triggering BackendCard button + modal dialog root.
5. Bundle-size gate: commit `bundle-baseline.json`, add `scripts/bundle-size-check.mjs` that fails if main chunk grows > 8 KB.
6. Manual Chrome Perf trace on `/` → `/backends` with 4× CPU throttle; attach long-task ≤ 50ms proof to PR.

### Option B: Phase 5 polish / SR-009 inline-style extraction

Walk the 113 SR-009 entries, extract each inline `style={{...}}` with all-static literals into its sibling `.css.ts`. Purely mechanical — each fix shrinks the baseline by 1. Good opportunistic work when Motion needs a break.

### Option C: Modules trio full `.view/.ui` split (structural polish)

blueprint, instance, draft currently use a `<Shell>` wrapper as the SR-007 fix. For true XII.2/FR-011 compliance, each needs its full markup extracted into a `.ui.tsx` with typed props. These files are 200–700 lines each so they're the biggest remaining structural work. Non-blocking.

### Option D: T066 + T070a finish-out

- **T066** — replace the `refreshLayouts` callback chain with a router `action` on `/extensions` for automatic revalidation.
- **T070a** — SWR audit: grep all `useSWR(` outside `hooks/use_polling_metrics.ts` + `hooks/use_event_stream.ts`, document in `apps/web/docs/swr-inventory.md`.

## Commands to re-verify on session start

```bash
cd apps/web

pnpm scan:constitution          # should report 0 new, 133 baseline-allowed
pnpm tsc --noEmit               # should be silent

# optional: start dev server + Rust backend for live smoke
pnpm dev                        # Vite on localhost:5173
cargo run --bin nexus-host      # Rust backend  

pnpm test:regression            # 48/48 pass with dev server up
```

## Files of interest (layout)

```
apps/web/src/
├── assets/
├── components/             cross-view presentational (button, tabs, card, …)
├── hooks/                  use_api, use_event_stream, use_polling_metrics, …
├── services/               THE I/O boundary — api_client + 9 domain re-exports + event_streams
├── utils/
├── theme/                  vanilla-extract tokens
├── api/
│   ├── generated/          TS DTOs from Rust (machine-gen)
│   └── client.ts           1-line re-export shim of services/api_client
├── views/
│   ├── artifacts/          .view + .ui + .css + index
│   ├── backends/           US2 pilot — full template (hooks/, components/)
│   ├── deployments/        detail sub-route
│   │   └── detail/
│   ├── extensions/
│   │   ├── gallery/
│   │   └── layout/
│   ├── home/
│   ├── models/
│   │   └── components/     model_card.tsx
│   ├── modules/            instance_view/, draft/, module_card, blueprint_quick_pick
│   │   └── instance_view/
│   ├── recipes/
│   ├── runs/
│   ├── workflows/
│   │   ├── components/
│   │   │   ├── canvas/     11 canvas internals (operator_node, stage_view, etc.)
│   │   │   └── workflow_catalog.tsx
│   │   └── index.ts
│   └── *_route.tsx         11 router-level wrappers (useParams + pass-through)
├── routes.tsx              createHashRouter single source of truth
├── root_layout.tsx         shell + <Outlet context/>
└── main.tsx                RouterProvider mount
```

## Key files to know

- `.specify/memory/constitution.md` — **v1.2.0** with Principle XII + Appendices E/F
- `specs/021-web-architecture-refactor/tasks.md` — live task tracker
- `apps/web/scripts/scan-constitution.mjs` — 9-rule AST scanner
- `apps/web/scripts/scan-constitution-baseline.json` — 133 pinned pre-existing violations
- `apps/web/playwright.config.ts` — 3-viewport × Chromium × reduced-motion
- `apps/web/tests/smoke/routes.json` — route-smoke fixture (12 entries)
- `apps/web/tests/visual/routes.spec.ts-snapshots/` — 36 baseline PNGs
- `crates/nexus-api/src/router.rs` — `CompressionLayer` wired at the top
