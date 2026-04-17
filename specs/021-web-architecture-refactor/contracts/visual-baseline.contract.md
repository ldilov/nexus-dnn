# Contract: Visual-Regression Baseline

**Consumer**: Playwright visual-regression suite
(`apps/web/tests/visual/routes.spec.ts`), invoked on every PR that touches
`apps/web/` via `pnpm test:visual`.
**Producer**: Initial capture during US5; per-slice refreshes during US1–US4 only
when visual changes are intentional.
**Constitution clauses enforced**: spec FR-029, FR-034, FR-037, Success Criteria
SC-003, SC-010.

---

## Baseline Capture Procedure

1. Check out `main` at the SHA that immediately precedes the first refactor
   slice merge (the harness itself, US5, lands on that SHA). Run
   `pnpm install` and `pnpm build`.
2. Start the Vite dev server: `pnpm dev`.
3. Run: `pnpm test:visual --update-snapshots`.
4. Playwright iterates every entry in `tests/smoke/routes.json`, at every
   viewport width, with `reducedMotion: 'reduce'` and
   `animations: 'disabled'`.
5. Screenshots are written to
   `apps/web/tests/visual/baselines/<route-slug>/<viewport>.png`.
6. A sibling `metadata.json` is written at
   `apps/web/tests/visual/baselines/metadata.json`:

   ```json
   {
     "capturedAt": "2026-04-17T14:00:00Z",
     "capturedOnSha": "d933cc7",
     "playwrightVersion": "1.50.0",
     "viewports": [375, 768, 1440],
     "reducedMotion": true,
     "chromiumVersion": "131.0.6778.33"
   }
   ```

7. Commit the baselines + metadata in a single commit with the message
   `test(visual): capture baselines at <sha>`. NO other changes in this commit.

---

## Diff Threshold Contract

| Parameter | Value |
|---|---|
| Pixel diff algorithm | Playwright default (ssim) |
| `maxDiffPixelRatio` | `0.005` (0.5%) |
| `threshold` | `0.2` (per-pixel color sensitivity) |
| `animations` | `"disabled"` |
| `caret` | `"hide"` |
| `scale` | `"css"` |
| `fullPage` | `true` for every route — captures below-the-fold regressions too |

A route exceeding 0.5% per-viewport diff ratio fails the PR. The contributor
MUST then either revert the unintended visual change OR follow the Update
Procedure below.

---

## Update Procedure (Intentional Visual Change)

1. Create a dedicated commit on the PR's feature branch:
   `test(visual): update baseline for <route> — <reason>`.
2. Re-run `pnpm test:visual --update-snapshots` locally.
3. Commit the updated PNGs and the same `metadata.json` stamped with the new
   commit SHA.
4. PR description MUST include a side-by-side before/after image for every
   updated baseline so reviewers can eyeball the delta.
5. Reviewer sign-off on the baseline commit is REQUIRED independent of the
   functional code review.

Updating baselines during US1–US3 is ONLY permitted when the visual change is
incidental to a constitution-compliant migration (e.g., a fresh layout caused
by moving a component into a folder). Changes purely to the styling DSL, color
palette, or font stack are NOT scope for this spec and MUST land in a separate
PR with its own design review.

---

## Playwright Config Contract

`apps/web/playwright.config.ts`:

```ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: process.env.CI ? [["github"], ["html"]] : [["html"]],
  use: {
    baseURL: "http://localhost:5173",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },
  projects: [
    {
      name: "chromium-375",
      use: { viewport: { width: 375, height: 812 }, browserName: "chromium" },
    },
    {
      name: "chromium-768",
      use: { viewport: { width: 768, height: 1024 }, browserName: "chromium" },
    },
    {
      name: "chromium-1440",
      use: { viewport: { width: 1440, height: 900 }, browserName: "chromium" },
    },
  ],
  expect: {
    toHaveScreenshot: {
      maxDiffPixelRatio: 0.005,
      threshold: 0.2,
      animations: "disabled",
      caret: "hide",
      scale: "css",
    },
  },
});
```

---

## Baseline Storage Contract

- **Location**: `apps/web/tests/visual/baselines/<route-slug>/<viewport>.png`.
- **Naming**: route slug = `path` with leading `/` removed, remaining `/`
  replaced with `-`, `:` and `*` preserved as-is. Example:
  `/modules/:moduleId/blueprint` → `modules-:moduleId-blueprint/`.
- **Git LFS**: if the repo's `.gitattributes` already tracks `*.png` through
  LFS, baselines flow through it. Otherwise, baselines commit to regular git.
  The US5 PR authors the `.gitattributes` entry only if total baseline size
  exceeds 10 MB; below that threshold, plain git is acceptable.
- **Count**: 16 routes × 3 viewports = 48 PNGs at ≤ 200 KB each → ≤ 10 MB
  total, below the LFS threshold. Plain git expected.

---

## Regression Budget

Per the spec's Success Criteria SC-003 / SC-010: zero per-viewport diffs > 0.5%
across any refactor slice merge, AND zero production-level bug reports filed
against refactored screens in the week following a slice merge. A violation of
either is a RELEASE-BLOCKING regression under the spec's rollout-discipline
clause (FR-037) and the constitution's compliance-review gate.
