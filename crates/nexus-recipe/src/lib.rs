//! Host-generic recipe projection + compatibility-status model.
//!
//! `nexus-recipe` owns the normalized `RecipeProjection` document, the
//! `RecipeStatus` compatibility verdict (`healthy`/`outdated`/`broken`), and the
//! pin-resolution primitive that maps a recipe's workflow-template stem onto an
//! immutable workflow version. It is generic by `control_id` + path string only:
//! zero extension-id literals, zero hardcoded node ids (enforced by
//! `tests/boundary_test.rs`). Extension specifics live in projection DATA.

pub mod compiler;
pub mod error;
pub mod explain;
pub mod pin_backfill;
pub mod projection;
pub mod resolved;
pub mod resolver;
pub mod status;

pub use compiler::{ControlValues, compile_recipe_run};
pub use error::BindingError;
pub use explain::{
    ControlDiff, PresetExplainEntry, PresetExplanation, diff_vs_defaults, explain_preset,
};
pub use pin_backfill::{PinResult, StemLookup, normalize_stem, resolve_pin};
pub use projection::{
    Control, ControlKind, ControlMode, CustomUi, Output, Preset, PresetSource, RecipeProjection,
    Section,
};
pub use resolved::{AppliedControl, ResolvedRun, ValueSource};
pub use resolver::{BindingTarget, parse_target, write_node_config};
pub use status::{
    REASON_BROKEN_BINDING, REASON_NEEDS_RE_PIN, REASON_OPERATOR_SCHEMA_DRIFT,
    REASON_PINNED_VERSION_MISSING, RecipeStatus, assess_status, compute_status,
};
