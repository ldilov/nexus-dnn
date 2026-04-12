# Research: Top Bar Redesign with Live Metrics

## R1: React 19 `use()` Applicability for Polling

**Decision**: `use()` is NOT suitable for periodic polling. It resolves a single Promise via Suspense. For live-updating metrics that refresh every 5s, a ServiceWorker + postMessage pattern is the correct approach per Constitution Principle X.

**Rationale**: `use()` suspends the component until the Promise resolves, which works for one-shot data loading but not for continuous polling. Creating a new Promise every 5s would cause re-suspension cycles. The ServiceWorker pattern keeps polling off the main thread entirely.

**Alternatives considered**:
- `useEffect` + `setInterval` + `fetch`: Works but keeps polling on the main thread, violates Constitution X for <=10s intervals
- `use()` with refreshing cache: React 19 has no built-in cache invalidation for `use()` — would need a state management library
- Server-Sent Events (SSE): Good alternative but overkill for 3 simple metrics; would require a new SSE endpoint on the Rust side

## R2: `useEffectEvent()` Availability

**Decision**: `useEffectEvent()` is available in React 19 as a stable API. It creates a function that always reads the latest render values without causing Effect re-synchronization.

**Rationale**: We will use it for the ServiceWorker message handler — the handler needs to read the latest component state without being a dependency of the effect that sets up the listener.

**Pattern**:
```
const onMetricsUpdate = useEffectEvent((data: Metrics) => {
  setMetrics(data);
});

useEffect(() => {
  navigator.serviceWorker.addEventListener('message', handler);
  return () => navigator.serviceWorker.removeEventListener('message', handler);
}, []); // onMetricsUpdate NOT in deps
```

## R3: ServiceWorker for Metrics Polling

**Decision**: Use a dedicated ServiceWorker (`metrics-worker.js`) that polls `GET /api/v1/metrics` every 5 seconds and posts results to all connected clients via `postMessage`.

**Rationale**: Constitution X mandates ServiceWorker offloading for polling intervals <= 10s. This keeps the main thread free and survives component unmounts. The worker can also batch-update multiple tabs.

**Pattern**:
- ServiceWorker uses `setInterval` + `fetch` internally
- On each successful fetch, calls `self.clients.matchAll()` then `client.postMessage(data)`
- React hook listens via `navigator.serviceWorker.addEventListener('message')`
- Worker registers in `main.tsx` or `index.html`

**Alternatives considered**:
- Web Worker (not ServiceWorker): Simpler but doesn't survive page navigation or share across tabs. ServiceWorker is the right choice for a persistent polling agent.
- SharedWorker: Good fit but less browser support than ServiceWorker. SW is more standard.

## R4: Metrics Endpoint Design

**Decision**: `GET /api/v1/metrics` returns a flat JSON object with system metrics. Values are gathered from AppState fields (worker_manager, db, artifact_store, process uptime). GPU/VRAM values are placeholder stubs until real monitoring is implemented.

**Rationale**: A flat structure is simplest to serialize, parse, and extend. Each metric is a named field, not a nested hierarchy. The endpoint should be fast (<10ms) since it's polled every 5s.

**Alternatives considered**:
- Prometheus-style metrics endpoint (`/metrics` with text format): Standard for observability but overkill for a local-first tool with a single UI consumer
- SSE stream: Real-time but adds complexity; polling is sufficient for 5s resolution
- Extend existing `/health` endpoint: Would conflate health checking with metrics; keep them separate per SOLID

## R5: View Tabs in Top Bar

**Decision**: Move the segmented Tabs control from the canvas area into the top bar. Tabs are: Recipe, Stage, Graph, Trace, Timeline. Only visible when a workflow is open (activeNav === "workflows").

**Rationale**: Matches the reference screenshot. Frees up canvas vertical space. The top bar becomes the primary navigation surface — brand + views + metrics + actions.

**Alternatives considered**:
- Keep tabs in canvas: Wastes vertical space, doesn't match reference
- Separate tab bar below top bar: Adds a third horizontal strip, too busy
