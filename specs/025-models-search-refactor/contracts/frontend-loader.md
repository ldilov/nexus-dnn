# Contract — Frontend loader, action, and URL

**Feature**: 025-models-search-refactor
**Phase**: 1 (design)

Target file: `apps/web/src/views/models-search/index.ts` — re-exports `{ loader, action, Component }` consumed by `routes.tsx` via `lazy: () => import("./views/models-search")`.

## 1. Route entry

```ts
// apps/web/src/routes.tsx (edited, additive)
{
  path: "models-search",
  lazy: () => import("./views/models-search"),
  errorElement: <ModelsSearchErrorBoundary />,
},
```

## 2. `loader({ request })`

```ts
export async function loader({ request }: LoaderFunctionArgs): Promise<ModelsSearchLoaderData> {
  const url = new URL(request.url);
  const params = parseSearchParams(url.searchParams);

  const [backends, page] = await Promise.all([
    fetchBackends(request.signal),
    fetchSearch(params, request.signal),
  ]);

  return { params, backends, page };
}
```

- `fetchBackends` and `fetchSearch` live in `apps/web/src/services/model_store.ts` (sole I/O boundary per Principle XII.4).
- On upstream 4xx/5xx, the service throws a `Response` (per Principle XII.4) that the route's `errorElement` renders.
- `request.signal` is forwarded so navigation cancellation aborts in-flight fetches.

### `ModelsSearchLoaderData`

```ts
export type ModelsSearchLoaderData = {
  params: ParsedSearchParams;            // see §4
  backends: BackendCapability[];         // may be [] with X-ModelStore-Degraded
  page: {
    page: number;
    page_size: number;
    total_results: number | null;
    families: ModelFamily[];
    facets: SearchFacets;
  };
};
```

## 3. `action({ request })`

Used for imperative mutations — creating a download job, pausing, resuming.

```ts
export async function action({ request }: ActionFunctionArgs): Promise<Response> {
  const form = await request.formData();
  const intent = form.get("intent");
  switch (intent) {
    case "download":      return redirectWithToast(await createDownload(form, request.signal));
    case "pause":         return await pauseDownload(form, request.signal);
    case "resume":        return await resumeDownload(form, request.signal);
    default:              throw new Response("unknown intent", { status: 400 });
  }
}
```

- The download UI uses `<Form method="post">` with a hidden `intent` field, not `fetch()` from a component (Principle XII.4).
- On 409 (duplicate), the action returns a 200 with the existing `job_id` surfaced via `sonner` toast, not a URL change.

## 4. URL schema (parsing)

```ts
export type ParsedSearchParams = {
  q: string;
  formats: Format[];
  backends: string[];
  modalities: Modality[];
  licenses: string[];
  compat: CompatibilityStatus[];
  installed: "any" | "installed" | "not_installed";
  showUnsupported: boolean;
  sort: "relevance" | "most_downloaded" | "trending" | "recently_updated" | "alphabetical";
  page: number;
  pageSize: number;
  view: "grid" | "list";
};
```

Defaults per research R10. `pageSize` clamped to `[10, 50]`; `page` clamped to `>= 1`.

**Round-trip invariant** (enforced by `parseSearchParams` + `serializeSearchParams`): for any `p: ParsedSearchParams`, `parseSearchParams(new URLSearchParams(serializeSearchParams(p))) ≡ p`. Unit-tested in `services/model_store.test.ts`.

**Clearing a filter**: setting a filter to its default value removes the key from the URL (FR-093 AS #3).

### Terminology at layer boundaries (I3 codification)

The same concept takes three casings at three layers — each idiomatic for its layer and round-trippable:

| Concept | UI label (copy) | TypeScript field | URL / REST param |
|---|---|---|---|
| Show unsupported toggle | `Show unsupported` | `showUnsupported` | `show_unsupported` |
| Page size | `Page size` | `pageSize` | `page_size` |
| Family identifier | `Model family` | `familyId` | `family_id` |
| Compatibility state | `Compatibility` | `compat` | `compat` |

Rule: **sentence-case UI copy**, **camelCase in TS**, **snake_case on the wire**. The round-trip invariant in §4 (`parseSearchParams` ↔ `serializeSearchParams`) is the mechanical guarantee; any drift is caught by the existing unit tests in `apps/web/src/services/model_store.test.ts` (T090).

## 5. Smart container contract (`models_search.view.tsx`)

- MUST consume `useLoaderData<ModelsSearchLoaderData>()`.
- MUST NOT call `fetch`, `useSWR` except for live per-job progress subscriptions.
- MUST NOT import from `apps/web/src/models/*` (legacy folder is deleted in the same merge).
- MUST pass data down to `ModelsSearchUI` via props; zero JSX markup in `.view.tsx` except `return <ModelsSearchUI ...props />`.
- Mutations use `useFetcher()` (for optimistic UI on download clicks without navigating) and `useSubmit()` (for URL-changing filter mutations).

## 6. Presentational contract (`models_search.ui.tsx`)

- Pure function of props.
- MUST NOT call `fetch`, `useSWR`, `useLoaderData`, `useNavigate`, `useSubmit`, or mutate any router state.
- MUST use vanilla-extract styles from `models_search.css.ts`. No `style={}` except for progress-bar `width: ${pct}%`.
- Motion components imported from `motion/react` with `LazyMotion + m`; reduced-motion gated via `useReducedMotion()`.

## 7. Per-job progress subscription

```ts
function useJobProgress(jobId: JobId | null) {
  return useSWR(
    jobId ? ["model-store/downloads", jobId] : null,
    () => fetchDownloadStatus(jobId!),
    { refreshInterval: (data) => (isTerminalState(data?.state) ? 0 : 1000) },
  );
}
```

Terminal states stop polling. This is the only SWR usage in the screen.

## 8. Error boundary

`ModelsSearchErrorBoundary` receives any `Response` thrown by the loader:
- 502 `upstream_unavailable` → "Hugging Face is unreachable" + Retry button.
- 503 `registry degraded` header path → renders normally with a top-banner notice; not an error page.
- Any other → generic "Something went wrong" with error code visible.

## 9. Scope checklist for review (NFR-010, SC-010)

Reviewer-visible check — a scope-diff script run in CI:

```bash
git diff --name-only origin/main... | \
  grep -vE '^(specs/025-|apps/web/src/(services/model_store|views/models-search|routes\.tsx)|apps/web/src/models/|crates/nexus-(api|models-store|huggingface|storage)/)' && \
  echo "SCOPE VIOLATION" && exit 1 || exit 0
```

Anything outside the allow-list fails the gate. The allow-list explicitly includes `apps/web/src/models/` for the one-time deletion commit only; subsequent commits touching that path fail.
