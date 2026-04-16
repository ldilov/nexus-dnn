use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Ord, PartialOrd, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum Severity {
    Info,
    Warning,
    Error,
    Blocking,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Ord, PartialOrd, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum Category {
    Source,
    RecipeMapping,
    Operator,
    Extension,
    Runtime,
    Model,
    Artifact,
    Profile,
    Security,
    Migration,
}

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
pub struct Diagnostic {
    pub severity: Severity,
    pub category: Category,
    pub code: String,
    pub message: String,
    pub subject_ref: Option<String>,
    pub resolution_hint: Option<String>,
}
