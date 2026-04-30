//! Spec 037 / Phase 8 — integration test entry-point for the Draft AI
//! suggestion stream handler family. Cargo treats each top-level file
//! under `tests/` as a separate integration test crate; this file mods
//! the per-scenario sub-tests at `tests/draft_suggestions/*.rs` so the
//! file names match the spec without each scenario costing a fresh
//! compile-link cycle.

#[path = "draft_suggestions/common.rs"]
mod common;

#[path = "draft_suggestions/boundary_audit_test.rs"]
mod boundary_audit_test;

#[path = "draft_suggestions/start_stream_test.rs"]
mod start_stream_test;

#[path = "draft_suggestions/cancel_stream_test.rs"]
mod cancel_stream_test;

#[path = "draft_suggestions/no_backend_test.rs"]
mod no_backend_test;

#[path = "draft_suggestions/lease_failure_test.rs"]
mod lease_failure_test;

#[path = "draft_suggestions/client_disconnect_test.rs"]
mod client_disconnect_test;
