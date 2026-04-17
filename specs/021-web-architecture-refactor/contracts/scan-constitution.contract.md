# Contract: `scan:constitution` CI Check

**Consumer**: CI pipeline (`pnpm scan:constitution`), invoked on every PR that
touches `apps/web/`.
**Producer**: `apps/web/scripts/scan-constitution.mjs`.
**Constitution clauses enforced**: Principle XII.1–XII.7, Appendix E, Appendix F.

---

## Invocation Contract

```
pnpm scan:constitution [--baseline] [--fix-suggestions]
```

- Exit code `0`: zero violations (excluding baseline allowances).
- Exit code `2`: one or more violations detected — CI fails.
- Exit code `1`: scanner itself errored (e.g., parser crash). CI fails distinctly
  from a violation so a reviewer can distinguish "broken scanner" from "broken
  code."

`--baseline` rewrites `apps/web/scripts/scan-constitution-baseline.json` with
the current set of pre-existing violations; intended for one-time initialization
in US5 and never in CI.

`--fix-suggestions` prints a human-readable remediation hint per violation; CI
omits the flag for clean output.

---

## Input Contract

- **Source tree**: `apps/web/src/**/*.{ts,tsx}` excluding:
  - `apps/web/src/api/generated/` (Rust-generated DTOs)
  - `apps/web/src/**/*.test.ts[x]`, `apps/web/src/**/*.spec.ts[x]`
  - `apps/web/tests/**`
  - `apps/web/node_modules/**`
- **Parser**: `@typescript-eslint/parser` with `jsx: true`, `sourceType: "module"`.
- **Baseline**: optional JSON file at
  `apps/web/scripts/scan-constitution-baseline.json` with the shape:

  ```json
  {
    "capturedAt": "2026-04-17",
    "capturedOnSha": "abc1234",
    "violations": [
      { "rule": "SR-005", "file": "src/old/legacy_fetch.ts", "line": 42 }
    ]
  }
  ```

  Scanner ignores violations present in the baseline. New violations ALWAYS fail.
  The baseline set is monotonically shrinking — a CI job in `pre-merge` asserts
  the file only loses entries, never gains them.

---

## Output Contract

### Plain-text (default)

```
apps/web/src/backends/install_modal.tsx:12:1 [SR-001] `framer-motion` import forbidden → see constitution Appendix F
apps/web/src/views/backends_view.tsx:45:3 [SR-004] useEffect-fetch-setState forbidden → see constitution § XII.4

2 violations found. See .specify/memory/constitution.md for full clause text.
```

### `--json` flag (future extension)

```json
{
  "violations": [
    {
      "rule": "SR-001",
      "clause": "Appendix F",
      "file": "apps/web/src/backends/install_modal.tsx",
      "line": 12,
      "col": 1,
      "message": "`framer-motion` import forbidden"
    }
  ]
}
```

---

## Rule Catalog (v0, enforced from US5 merge onward)

| ID | Clause | Detection | Remediation Hint |
|---|---|---|---|
| SR-001 | Appx F | ImportDeclaration source `"framer-motion"` | Change to `import { ... } from "motion/react"` |
| SR-002 | Appx F + R-10 | ImportDeclaration source `"react-router-dom"` | Change to `import ... from "react-router"` |
| SR-003 | XII.3 | JSXElement `openingElement.name.name ∈ {BrowserRouter, HashRouter, Routes, Route}` AND file ≠ `src/routes.ts` | Move the route into `src/routes.ts` as a route object |
| SR-004 | XII.4 | `useEffect(() => { ... })` where the arrow body contains a `CallExpression` to `fetch`, OR a `.then(` MemberExpression on an identifier resolved to a fetch-returning service call | Move data fetch into a route loader |
| SR-005 | XII.4 | `CallExpression` to the global `fetch` OR constructor `new WebSocket(...)` / `new EventSource(...)` where file path does NOT start with `src/services/` or `src/api/generated/` | Wrap the call in a `services/` module and import the wrapper |
| SR-006 | XII.7 | Two TS/TSX files with identical basename under `src/`, excluding `index`, `types`, `constants`, `styles`, `utils` | Rename one or merge the two |
| SR-007 | XII.2 | A `.view.tsx` file whose default export body contains more than one JSX root element OR whose root element is `<div>`, `<section>`, `<main>`, `<Fragment>`, etc. (not a PascalCase custom component) | Extract the markup into the matching `.ui.tsx` |
| SR-008 | XII.7 | `export * from "./subdir/index"` OR `export { X } from "./subdir/index"` where `subdir` itself re-exports from a deeper `subdir` | Flatten the barrel chain |
| SR-009 | XII.5 | `JSXAttribute` whose `name.name === "style"` AND whose `value.expression` is an `ObjectExpression` with ALL properties statically evaluable (literal values only — no `Identifier`, no `CallExpression`, no `BinaryExpression`, no `TemplateLiteral` containing expressions). Dynamic inline styles (computed widths, transforms, percentages) are permitted and MUST pass; static inline styles (hardcoded colors, spacing, borders) fail. | Move the style into the sibling `*.css.ts` file using vanilla-extract tokens from `src/theme/` |

---

## Performance Contract

- Scanner completes in ≤ 30 seconds on a 180-file `apps/web/src/` tree, measured
  on a GitHub Actions `ubuntu-latest` runner (2-core).
- Memory footprint ≤ 512 MB.
- Parallel-safe: can be invoked concurrently with other `scan:*` scripts without
  shared state.

---

## Integration Contract

### `apps/web/package.json` scripts

```json
{
  "scripts": {
    "scan:constitution": "node scripts/scan-constitution.mjs",
    "scan:all": "pnpm scan:theme && pnpm scan:terminology && pnpm scan:noop && pnpm scan:constitution"
  }
}
```

### Pre-merge CI job

The existing `scan:all` aggregator runs in the pre-merge pipeline. Adding
`scan:constitution` to it means the constitution check gates merge alongside
theme/terminology/noop scans.

### Pre-commit hook (optional)

A Husky pre-commit hook that runs `pnpm scan:constitution --staged-only` on
touched files is NOT required by this spec — constitution XII.7 is enforced at
PR-time, not on every commit. Contributors who want it can add it in their
personal `~/.huskyrc` without spec changes.
