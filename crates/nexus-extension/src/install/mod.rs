//! Extension installation pipelines. v1 ships a single ZIP-install pipeline
//! (spec 019 FR-IE03) alongside helpers (SVG sanitizer, staging-dir RAII,
//! Zip-Slip guard) used by that pipeline and by manifest-icon validation.

pub mod svg_sanitize;

pub use svg_sanitize::{SvgSanitizeError, sanitize_svg};
