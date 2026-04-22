# `extension_router`

Generic dispatcher for extension HTTP routers. Implements spec 030.

## What lives here

| File | Role |
|---|---|
| `id.rs` | `ExtensionId` newtype + validation (`[a-z][a-z0-9.-]*`, ≤128 chars) |
| `registry.rs` | `DefaultRegistry` — in-memory `RwLock<HashMap>` + sealing flag |
| `dispatcher.rs` | `dispatch` axum handler bound to `/api/v1/extensions/{ext_id}/{*rest}` |
| `mod.rs` | `ExtensionRouterRegistry` trait + `RegistryError` enum |

## Design

1. Each extension that wants an HTTP surface implements
   `nexus_extension::router_hook::ExtensionRouterProvider`.
2. Host startup constructs a `Vec<Arc<dyn ExtensionRouterProvider>>` and
   calls each `build_router(ctx)`. The result is forwarded to
   `registry.register(id, router, http_routes)` (Ok) or
   `registry.register_failure(id, reason)` (Err).
3. `registry.seal()` is the last call before `axum::serve(listener, app)`
   binds. After sealing, mutations are rejected with `RegistryError::Sealed`.
4. The dispatcher handler looks up `ext_id` in the registry and forwards
   the request to the registered `axum::Router` after rewriting the URI
   to drop the host prefix. Body, headers, method, and query pass through
   byte-for-byte unchanged (FR-013).

## Boundary discipline

This module is the host's *only* extension-aware route. It never names a
specific extension — every reference is parameterized by `ext_id`. See
constitution Principle XIII (Host ↔ Extension Boundary, NON-NEGOTIABLE)
and `.claude/rules/host-extension-boundary.md` for the operational
checklist.

The audit script
`extensions/builtin/local-llm/scripts/audit-boundary.sh` is the merge
gate: if it finds any extension-id literal in this module, the PR is
blocked.
