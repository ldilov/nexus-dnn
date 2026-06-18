//! `/api/v1/model-store/*` handlers. The new universal model catalog
//! surface (spec 025-models-search-refactor).

pub mod backends;
pub mod detail;
pub mod downloads;
pub mod error_map;
pub mod installed;
pub mod resolve;
pub mod search;
pub mod settings;
