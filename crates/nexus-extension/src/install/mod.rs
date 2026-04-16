//! Extension installation pipelines. v1 ships a single ZIP-install pipeline
//! (spec 019 FR-IE03) alongside helpers (SVG sanitizer, staging-dir RAII,
//! Zip-Slip guard) used by that pipeline and by manifest-icon validation.

pub mod error;
pub mod limits;
pub mod stage;
pub mod svg_sanitize;
pub mod validate_zip;
pub mod zip_install;

pub use error::ZipInstallError;
pub use limits::ZipSizeLimits;
pub use stage::{StagingDir, atomic_rename};
pub use svg_sanitize::{SvgSanitizeError, sanitize_svg};
pub use validate_zip::{ValidatedArchive, staged_target, validate};
pub use zip_install::{ManifestSummary, ZipInstallPipeline, ZipInstallResult};
