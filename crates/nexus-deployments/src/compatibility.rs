use serde::{Deserialize, Serialize};
use std::collections::BTreeMap;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Ord, PartialOrd, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum CompatDim {
    HostSchema,
    WorkflowSchema,
    RecipeDefinition,
    Extension,
    OperatorContract,
    RuntimeSettings,
    Profile,
    ModelDescriptor,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum CompatState {
    Exact,
    Compatible,
    Migrated,
    Degraded,
    Incompatible,
    Missing,
}

#[derive(Debug, Clone, Default, PartialEq, Eq, Serialize, Deserialize)]
#[serde(transparent)]
pub struct CompatibilitySummary(pub BTreeMap<CompatDim, CompatState>);
