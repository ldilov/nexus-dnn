# nexus-api

Axum HTTP surface for the host daemon. Route-level handlers live under
`src/handlers/`; routes are wired in `src/router.rs`.

## Extension dispatcher (spec 030)

The host exposes a single generic route
`/api/v1/extensions/{ext_id}/{*rest}` that forwards to extension-registered
routers. Extensions implement
`nexus_extension::ExtensionRouterProvider`; the host's startup wiring
constructs each provider, hands it to `DefaultRegistry`, and seals the
registry before the HTTP listener binds. After sealing, the dispatcher
looks up the router by `ext_id` and forwards the request unchanged
(method, headers, query, body byte-for-byte preserved).

Module: [`src/extension_router/`](src/extension_router/README.md). Bench:
`cargo bench -p nexus-api --bench dispatcher_overhead` validates SC-007
(p50 added latency ≤ 1 ms; measured 0.001 ms on the reference workload).

The host router contains zero per-extension paths — any host file naming
a specific extension id is a merge blocker per constitution Principle XIII
(see `.specify/memory/constitution.md` and
`.claude/rules/host-extension-boundary.md`). The boundary audit script
at `extensions/builtin/local-llm/scripts/audit-boundary.sh` is the gate.

## Host-runtime endpoints (spec 011/012/016)

- `GET /api/v1/backends` — list every `host_runtime_installs` row + dependents
- `GET /api/v1/backends/{family}/parameters` — versioned launch parameter catalog
- `POST /api/v1/backends/{installId}/lease` — acquire runtime lease
- `DELETE /api/v1/backends/leases/{leaseId}` — release runtime lease
- `DELETE /api/v1/backends/{installId}` — uninstall (with active-lease guard)
- `GET /api/v1/llm/backends/{backendId}/variants` — spec 020 US1: project the
  backend's version-manifest releases into `{release_id, platform,
  accelerator_profile, label, recommended, supported, disabled_reason,
  size_bytes, checksum_sha256}` rows filtered by `MachineDescriptor::detect()`.
  Returns `404 catalog_unavailable` when the on-disk yaml is missing.

## Host-model endpoints (spec 017)

- `GET /api/v1/host-models` — list installs; includes `license_spdx`,
  `license_url`, `source_url`, `source_kind`, `sha256_root`, `source_revision`,
  `private_model`, `owner_extension_id`. Filtered for private-install
  visibility (FR-513). No required extension-scope query param (FR-524).
- `POST /api/v1/host-models/resolve` — side-effect-free dry-run over declared
  `ModelDependency` list; returns matched/missing/unsatisfiable + total bytes.
- `POST /api/v1/host-models/{installId}/leases` — acquire model lease with
  `extension_id`, `device`, `vram_reserved_bytes`, `device_budget_bytes`.
- `DELETE /api/v1/host-models/leases/{leaseId}` — release model lease.

Backend/runtime and model endpoints are independent top-level lists suitable
for a downstream sidebar UI to render as two distinct menus (FR-524).

## Error handling

`http_status_for_model_error` in `handlers/backends/host_models.rs` is an
exhaustive match over `ModelStoreError` (FR-517) — adding a new variant
produces a rustc error here. Every 4xx/5xx response path calls
`handlers::errors::log_handler_error` so the structured event (`error.code`,
`error.detail`, `error.chain`) is emitted alongside `tower_http`'s
classification line. `TraceLayer::on_response` emits an extra
`tracing::error!` on 5xx so operators always see both events together.
