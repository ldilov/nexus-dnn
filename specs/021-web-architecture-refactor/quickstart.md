# Quickstart: Adding a New Screen (Post-Refactor)

This quickstart is the permanent contributor onboarding for frontend work once
spec 021 lands. Follow these eight steps to add a new screen under
`apps/web/src/views/` in a way that passes the constitution check and the
regression harness on the first PR.

---

## Prerequisites

- Spec 021 US1 has merged (router is in data mode).
- You have run `pnpm install` at `apps/web/`.
- Your feature has a route and a data source. If it's UI-only with no data, the
  loader is omitted.

---

## 1. Create the screen folder

```
apps/web/src/views/my_screen/
├── my_screen.view.tsx
├── my_screen.ui.tsx
├── my_screen.css.ts
└── index.ts
```

All files `snake_case.tsx`. Don't create `components/` until you have at least
one screen-scoped component.

---

## 2. Write the service module (if the screen fetches data)

Add a file under `apps/web/src/services/<domain>.ts`:

```ts
import { apiFetch } from "./api_client";
import type { MyThingDto } from "@/api/generated/MyThingDto";

export async function listMyThings(): Promise<MyThingDto[]> {
  return apiFetch<MyThingDto[]>("/api/v1/my-things");
}
```

No JSX in this file. No React imports. Just typed async functions over
`apiFetch` (which enforces the envelope).

---

## 3. Write the loader

In `my_screen.view.tsx`, export the loader alongside the component:

```ts
import type { LoaderFunctionArgs } from "react-router";
import { listMyThings } from "@/services/my_things";

export async function loader(_args: LoaderFunctionArgs) {
  const things = await listMyThings();
  return { things };
}
```

If the service throws a `ContractError` with a status ≥ 400, wrap the call in
`try { … } catch (e) { throw new Response(e.message, { status: e.status }) }`
so the `errorElement` receives it.

---

## 4. Write the `.view.tsx` (smart container)

```tsx
import { useLoaderData, useNavigation } from "react-router";
import { MyScreenUI } from "./my_screen.ui";
import type { loader } from "./my_screen.view";

export function MyScreen() {
  const { things } = useLoaderData() as Awaited<ReturnType<typeof loader>>;
  const nav = useNavigation();
  return <MyScreenUI things={things} isLoading={nav.state !== "idle"} />;
}
```

Rules the scanner enforces:

- Exactly one JSX root element (the `<MyScreenUI .../>` call).
- No imports from `src/services/` here if the loader already imported them
  (clean `view` files).
- Handlers for mutations go here, passed to `MyScreenUI` as props.

---

## 5. Write the `.ui.tsx` (presentational)

```tsx
import type { MyThingDto } from "@/api/generated/MyThingDto";
import * as css from "./my_screen.css";

interface Props {
  things: MyThingDto[];
  isLoading: boolean;
}

export function MyScreenUI({ things, isLoading }: Props) {
  return (
    <section className={css.root}>
      <h1 className={css.title}>My things</h1>
      {isLoading ? <div className={css.skeleton} /> : null}
      <ul>
        {things.map((t) => (
          <li key={t.id}>{t.name}</li>
        ))}
      </ul>
    </section>
  );
}
```

Rules the scanner enforces:

- No `fetch`, `useSWR`, `useLoaderData`, `useNavigate`, or any router hook
  import here (except type-only imports from `react-router`).
- All data comes via props.
- Styles from `*.css.ts` only; no inline `style` except truly dynamic values.

---

## 6. Export from `index.ts`

```ts
export { MyScreen as Component, loader } from "./my_screen.view";
```

If the screen has an action:

```ts
export { MyScreen as Component, loader, action } from "./my_screen.view";
```

---

## 7. Register the route in `src/routes.ts`

```ts
import { createHashRouter } from "react-router";
import * as myScreen from "./views/my_screen";

export const router = createHashRouter([
  {
    // root layout + other routes
    children: [
      // ...
      { path: "my-things", Component: myScreen.Component, loader: myScreen.loader },
    ],
  },
]);
```

For heavy screens, use `lazy`:

```ts
{ path: "my-things", lazy: () => import("./views/my_screen") }
```

---

## 8. Wire the regression harness

Add one entry to `apps/web/tests/smoke/routes.json`:

```json
{
  "path": "/my-things",
  "title": "My things",
  "mustContain": ["My things", "Add", "No things yet"],
  "viewports": [375, 768, 1440]
}
```

Then run `pnpm test:visual --update-snapshots -g "my-things"` to capture the
initial baseline PNGs. Commit the baseline in the same PR with the commit
message `test(visual): capture baseline for /my-things`.

---

## 9. Verify locally

```
pnpm tsc --noEmit
pnpm scan:constitution
pnpm test:visual
pnpm build
```

All four MUST be green before pushing. CI will run the same gates.

---

## Cheat sheet: what NOT to do

| Don't | Do |
|---|---|
| `<Route path="/my-things" element={<MyScreen/>} />` | Add a route object to `src/routes.ts` |
| `useEffect(() => { fetch(...).then(setState) })` | Write a `loader` |
| `fetch("/api/v1/...")` in a view | Call a `services/` function |
| Duplicate `install_modal.tsx` in two folders | One canonical location under the owning screen |
| `import { motion } from "framer-motion"` | `import { m } from "motion/react"` + `LazyMotion` |
| Inline `style={{ background: "#123" }}` | `*.css.ts` with tokens from `theme/` |
| Barrel `index.ts` re-exporting another `index.ts` in a subdir | Flatten |

---

## Related references

- [Spec 021 — Web App Architecture Refactor](./spec.md)
- [Constitution v1.2.0 § Principle XII](../../.specify/memory/constitution.md)
- [scan-constitution contract](./contracts/scan-constitution.contract.md)
- [route-smoke JSON schema](./contracts/route-smoke.schema.json)
- [visual-baseline contract](./contracts/visual-baseline.contract.md)
