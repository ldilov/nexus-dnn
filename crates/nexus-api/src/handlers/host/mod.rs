//! Spec 028 — read-only host-facing introspection endpoints.
//!
//! Exposes information that originates inside the host itself (not an
//! extension): multi-format model metadata extracted from installed
//! artifacts and detected CPU core facts used to seed thread-count
//! defaults in extension UIs.

pub mod cpu_cores;
pub mod metrics_stream;
pub mod models_metadata;
pub mod run_events;
