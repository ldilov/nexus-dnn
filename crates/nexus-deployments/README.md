# nexus-deployments

Host-owned crate for the **Deployments** feature (spec 018).

A Deployment is a named, persisted, reloadable execution-context snapshot over a canonical workflow/recipe. This crate owns:

- the domain types (`DeploymentId`, `DeploymentRevisionId`, `EffectiveWorkflowHash`, `PayloadHash`)
- lifecycle + restore + mapping state enums
- the compatibility classifier (8 dimensions × 6 states)
- the diagnostic taxonomy (severity × category × code)
- save / load / validate / execute / clone / export / import services
- the deterministic hashing helper (SHA-256 over RFC 8785 JCS)
- the `DeploymentRepository` trait and its SQLite-backed impl
- the deployment event set

Non-goals:

- HTTP transport (lives in `nexus-api`)
- SQL migrations (live in `nexus-storage`)
- runtime-adapter orchestration (lives in `nexus-backend-runtimes`)
- model file operations (live in `nexus-models-store`)

See `specs/018-deployments/` for the authoritative spec, plan, tasks, and contracts.
