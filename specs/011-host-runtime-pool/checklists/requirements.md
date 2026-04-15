# Specification Quality Checklist: Backend Runtime Capability & Shared Runtime Channel

**Purpose**: Validate completeness before `/speckit.plan`
**Created**: 2026-04-15
**Feature**: [spec.md](../spec.md)

## Content Quality

- [x] The spec now states that `crates/nexus-local-llm` is removed rather than lingering as an architectural ambiguity.
- [x] Host-owned runtime plumbing and extension-owned domain logic are separated clearly.
- [x] The spec now defines a runtime communication channel, not only process lifecycle.
- [x] The spec explains which launch settings stay typed and host-owned versus opaque passthrough.
- [x] The llama.cpp launch surface is treated as a versioned catalog, not as a giant static Rust API.

## Requirement Completeness

- [x] Runtime install, validation, repair, spawn, shutdown, uninstall, and dependent tracking are all host-owned.
- [x] `spawn()` now returns a `RuntimeLease` with a `RuntimeChannelDescriptor`.
- [x] Reserved launch-setting collisions are defined explicitly.
- [x] Migration from `ext_local_llm_runtime_installs` to `host_runtime_installs` remains idempotent and testable.
- [x] The spec identifies security-sensitive backend settings that should be host-governed.
- [x] The spec introduces a discoverable llama.cpp parameter catalog for UI/tooling.

## Feature Readiness

- [x] Primary user journeys still test independently.
- [x] The removal of `nexus-local-llm` is measurable at workspace level.
- [x] Channel readiness is now a first-class acceptance surface.
- [x] Unknown future llama.cpp flags can still pass through without code churn.
- [x] The spec stays bounded: shared binaries, not shared inference processes.

## Notes

- The highest-risk implementation area remains migration plus reserved-launch-setting policy because both can break upgrades in subtle ways.
- The channel abstraction is the most important addition in this revision; without it, the host can spawn processes but extensions still cannot safely consume them.
- The parameter catalog is intentionally advisory. It should inform UI and documentation, not become an allow-list that blocks new upstream llama.cpp flags.
- The local-llm extension should expose its own presets and advanced settings UI on top of the catalog instead of pushing those semantics into the host crate.
