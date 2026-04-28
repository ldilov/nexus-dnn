//! Domain layer — pure types + pure functions.
//!
//! Every module in this tree is side-effect-free and deterministic.
//! Business logic that needs I/O lives in `operators/` or `router/`.

pub mod audio_edit;
pub mod cache_key;
pub mod cache_planner;
pub mod chain_digest;
pub mod emotion;
pub mod errors;
pub mod filenames;
pub mod ids;
pub mod manifest;
pub mod parser;
pub mod reference_selection;

pub use audio_edit::{EditChain, EditOp, OperationId};
pub use chain_digest::ChainDigest;
pub use errors::{EmotionTtsError, Result};
pub use ids::{
    ContentHash, DeploymentId, ExportId, MappingId, PresetId, RunId, RuntimeLeaseId, UtteranceId,
    VoiceAssetId,
};
