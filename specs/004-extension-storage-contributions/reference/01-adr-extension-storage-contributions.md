# ADR-012: Host-Owned Extension Storage Contributions

## Status
Proposed

## Context

Nexus already treats the Rust host as the authoritative runtime for workflow state, scheduling, provenance, cache semantics, extension activation, and metadata persistence. SQLite is already the recommended metadata store for extension records, workflows, runs, artifact manifests, lineage, and cache metadata.

The current platform direction supports installable extensions that contribute operators, recipes, UI metadata, and runtime adapters. That model is strong for execution and presentation concerns, but some extension categories need relational state of their own. Examples include:

- chat threads and messages for local LLM packs
- retrieval chunk catalogs and embedding metadata
- model alias catalogs and backend profiles
- import/export history and sync cursors
- extension-owned structured caches that are not artifact blobs

Allowing extension code to open the primary SQLite database directly would weaken host authority, blur metadata ownership, complicate upgrades, and make operational recovery harder.

## Decision

Nexus will support extension-declared schema contributions under a host-owned storage model.

The implementation rules are:

1. Extensions may declare storage contributions in `manifest.yaml`.
2. The declaration may include a namespace alias and a sequence of migration files.
3. The host derives and reserves the effective namespace prefix.
4. The host validates migration files against a constrained SQLite migration profile.
5. The host applies approved migrations using its own connection and migration state tables.
6. The host records all applied extension storage metadata in host-owned core tables.
7. Extension workers never receive direct database file access as a requirement for correctness.
8. If worker-level access is ever allowed later, it must be mediated through explicit host APIs and capability gates.

## Consequences

### Positive

- preserves host authority and storage clarity
- enables richer extension categories without inventing a separate database per extension
- allows UI inspection and support tooling for extension storage state
- keeps upgrade/uninstall behavior auditable
- creates a path for chat, retrieval, and other stateful extensions
- reduces accidental collisions between extension data and host data

### Negative

- implementation is more complex than a raw "extension manages its own tables" approach
- migration validation must be strict and reliable
- uninstall semantics become a product decision, not just a filesystem delete
- some advanced SQL features must be deferred or forbidden in the first version

### Neutral trade-off

The platform gains a powerful storage feature, but only by being explicit that the database remains host-owned infrastructure rather than extension-owned territory.
