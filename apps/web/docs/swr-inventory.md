# SWR Call-Site Inventory (Spec 021 FR-019, refined 2026-04-18)

Every `useSWR` call site in `apps/web/src/` is enumerated here with its
cadence, cache key, and rationale. New `useSWR` usage outside this roster
MUST ship with a PR-time inventory entry.

FR-019 permits two classes of use:

1. **Live-polling surfaces** — periodic re-fetch with `refreshInterval` or an
   interval-owning hook.
2. **Cached-query surfaces** — one-shot read with SWR's focus/reconnect
   revalidation, shared cache across components, and optimistic mutation
   hooks.

All other patterns (one-shot reads with no revalidation need, mutation
refresh chains) MUST use a router `loader` / `action` instead.

## Live-polling

| Hook | File | Cadence | Key | Notes |
|---|---|---|---|---|
| `usePollingMetrics` | `hooks/use_polling_metrics.ts` | `setInterval` every POLL_INTERVAL_MS | `/api/v1/metrics` | Custom interval loop, not SWR directly. Counts as live-polling per FR-019. |
| `useEventStream` | `hooks/use_event_stream.ts` | EventSource / SSE stream | `/api/v1/events` | Not SWR-backed; live push stream. FR-019-allowed category 1 by analogy. |

## Cached-query surfaces

All cached-query sites live in `apps/web/src/hooks/use_api.ts` (sole entry point).

| Hook | Cache key | Upstream service | Rationale |
|---|---|---|---|
| `useModules` | `modules?q=…&kind=…&status=…&page=…` | `services/api_client.ts` → modules aggregator | List + facet filter. Needs on-focus revalidation when users return from the detail screen and mutations happen elsewhere. |
| `useModule` | `module:{id}` | modules detail | Shared across Module summary, Blueprint view, Instance view — SWR cache prevents triple-fetch. |
| `useWorkflow` | `workflow:{id}` | workflows | Same cache shared across Workflow catalog re-open + editor mount; revalidates on focus. |
| `useDeploymentsList` | `deployments?q=…&status=…&modules=…&page=…` | deployments list | Mutations (save/clone/delete) trigger SWR revalidation via `mutate(key)`. |
| `useDeployment` | `deployment:{id}` | deployments detail | Detail pane + sidebar summary share the cache. |
| `useLayouts` | `layouts` | extensions/layouts | Sidebar navigation + extensions gallery both read this; revalidates on extension toggle. |
| `useHostModels` | `host-models` | host models store | Models page + Blueprint model picker share this cache; SWR dedup prevents double-fetch. |
| `useHostBackends` | `host-backends` | backends listing | Backends page + install modal + DAG picker all read; SWR de-dup is load-bearing. |

## Rules of the road

- **No new `useSWR(` outside `hooks/use_api.ts`, `hooks/use_polling_metrics.ts`, or `hooks/use_event_stream.ts`** without adding a row to this table in the same PR.
- Reads that are naturally one-shot (e.g. fetched once inside a `loader`)
  MUST use the router `loader`, never `useSWR`.
- Writes MUST use a router `action` (preferred) or a `services/*.ts`
  function + explicit `mutate(key)` on the SWR cache.

## Enforcement

A lightweight check can be added later:
`grep -rn "useSWR(" apps/web/src/ | grep -v "hooks/use_api.ts" | grep -v "hooks/use_polling_metrics.ts" | grep -v "hooks/use_event_stream.ts"` — if non-empty, fail CI.
For spec 021 close, human-gated via this document is sufficient.
