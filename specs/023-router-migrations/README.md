# Spec 023 — Router Migrations (follow-up to 021)

**Status:** not started
**Opened:** 2026-04-18 (filed from spec 021 T082 / Sync Impact Report)

## Goal

Finish the two router migrations spec 021 deliberately deferred.

## Scope

### 023a — Remove `react-router-dom` compat alias

Spec 021 migrated all source imports to `react-router` (unified v7
package). The `react-router-dom` NPM dep is pinned for one release cycle
as a transitional alias. This slice:

1. Greps `apps/web/src/**` for any remaining `react-router-dom` imports.
2. Deletes the dep from `apps/web/package.json`.
3. Runs `pnpm scan:all && pnpm test:regression && pnpm build`.

Expected effort: < 1 hour. Risk: near zero if the initial migration was
complete.

### 023b — Migrate to `createBrowserRouter`

Move from `createHashRouter` (the `/#/foo` scheme) to `createBrowserRouter`
(clean `/foo` URLs). **Blocked on Rust host** serving SPA fallback:

```
GET /anything-the-Rust-API-does-not-own  →  200 index.html
```

Once the host gains this, the web change is ~5 lines in `src/routes.tsx`.
Analytics/deeplinks/social-share all become nicer. All 12 smoke fixtures
and 36 visual baselines need a path rewrite (`/#/` → `/`).

## Ordering

023a can ship any time independent of 023b. 023b requires the host change
first.
