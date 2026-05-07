# nexus-run-events

Versioned, sequence-numbered structured event protocol emitted by every nexus-dnn worker scraper. The shapes defined here are the ground truth for every UI surface introduced by spec 042 (Neo-Terminal Desktop Shell).

## Purpose

A worker (model loader, dependency installer, synth pipeline, GGUF probe, ...) emits a stream of `RunEventItem` records describing its operations. The frontend tiered store ingests those records and renders the Lattice, Pulse-Floor, Block stack, and inspector surfaces. The crate is generic — no extension-id literals, no UI assumptions.

## Schema versioning policy

- The current schema string is `nexus.run-event.v1`, exposed as the `SCHEMA_V1` constant.
- **Additive changes are non-breaking**: new variants on existing `#[non_exhaustive]` enums and new optional fields on existing variants are tolerated by older deserialisers and ship under the same `v1` string.
- **Breaking changes mint a new schema version**. Old payloads continue to validate against `nexus.run-event.v1`; new payloads carry a new constant (e.g. `nexus.run-event.v2`) and downstream consumers route through a migration adapter.
- Consumers MUST reject events whose `schema` string they do not recognise rather than silently mis-render.

## Adding a new worker scraper

1. Implement the `WorkerScraper` trait from the `store` module.
2. Return a stable identifier from `id()` (used as the `source` field on every emitted event).
3. Buffer partial input inside the scraper struct; emit a `Vec<RunEventItem>` from `ingest_line` for every complete event detected, and flush remaining buffered state from `flush()`.
4. Unrecognised input lines should produce a `RunEventItem::ScraperUnknown` event so the UI can surface lossless raw output.

## Constitutional notes

- Every public enum is `#[non_exhaustive]` (Principle V).
- Identifiers (`SeqNum`, `RunId`, `SourceId`, `LayerIndex`) are newtypes (Principle VII).
- Errors use `thiserror` (Principle VII).
- No inline comments; only module- and item-level docstrings (Principle IV).
