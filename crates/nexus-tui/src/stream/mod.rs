//! Event-stream domain types and pure functions for the Nexus TUI.
//!
//! The submodules here own the wire-shape of an event line as the TUI
//! renders it (`event_line`), the identity newtypes that carry stable
//! ULID-based event ids and bounded ring-buffer capacities (`event_id`),
//! the severity ordering (`severity`), the intrinsic significance rating
//! that gates display (`significance`), and the deterministic event-source
//! category mapping (`source_category`).
//!
//! All members are pure data + pure functions. No I/O, no globals.

pub mod client;
pub mod correlation_threader;
pub mod event_id;
pub mod event_line;
pub mod filter;
pub mod hold_queue;
pub mod muted_sources;
pub mod pinned_correlations;
pub mod rate_guard;
pub mod ring_buffer;
pub mod severity;
pub mod significance;
pub mod source_category;
pub mod startup_phase;
