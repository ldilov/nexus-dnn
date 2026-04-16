use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum DeploymentState {
    Draft,
    Saved,
    Validated,
    Ready,
    Degraded,
    Stale,
    Archived,
    Deleted,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum RestoreState {
    FullyRestorable,
    RestorableWithRebase,
    RestorableWithDegradedFeatures,
    RestorableReadOnly,
    NotRestorable,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum MappingState {
    FullyMapped,
    PartiallyMapped,
    Custom,
}
