//! Native-binary runtime family (T063).
//!
//! Family for runtimes that ship a pre-built native binary and need no
//! bootstrap / dependency install. The handler is a lightweight
//! [`RuntimeFamilyHandler`] impl that exists to prove the generic
//! pipeline is family-agnostic — the same orchestrator drives both
//! Python and native installs.

pub mod handler;

pub use handler::FamilyNativeHandler;
