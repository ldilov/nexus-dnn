//! Mouse-driven triage primitives.
//!
//! Submodules:
//! - [`capture`] — SGR 1006 detection, bypass-modifier predicate, enable/disable.
//! - [`targets`] — `ClickRegistry` mapping (row, col-range) → `ClickTarget`.
//! - [`menu`] — Right-click context menu rendering + dispatch.

pub mod capture;
pub mod dispatch;
pub mod menu;
pub mod targets;
