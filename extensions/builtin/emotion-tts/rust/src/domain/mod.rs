//! Domain layer — pure types + pure functions.
//!
//! Ids are ULID-backed newtypes with `#[serde(transparent)]`. Business logic
//! lives in sibling modules (parser, emotion, cache_key, filenames, manifest)
//! and is added incrementally per user story.

pub mod errors;
pub mod ids;

pub use errors::{EmotionTtsError, Result};
pub use ids::{
    ContentHash, DeploymentId, ExportId, MappingId, PresetId, RunId, RuntimeLeaseId, UtteranceId,
    VoiceAssetId,
};
