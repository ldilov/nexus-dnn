//! Types representing a fully-resolved recipe run: the merged workflow snapshot,
//! applied control values, and their provenance.

use serde::{Deserialize, Serialize};

/// Where a control's effective value came from.
#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ValueSource {
    /// The control's declared default was used.
    Default,
    /// A preset supplied the value.
    Preset,
    /// The user explicitly provided a value.
    User,
}

/// A single control whose value has been resolved and applied.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct AppliedControl {
    pub control_id: String,
    pub targets: Vec<String>,
    pub value: serde_json::Value,
    pub source: ValueSource,
}

/// The output of binding resolution: a workflow snapshot with all control
/// values written in, plus metadata about each applied control.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ResolvedRun {
    pub workflow_id: String,
    pub workflow_version: String,
    pub resolved_workflow: nexus_workflow::Workflow,
    pub resolved_inputs: serde_json::Map<String, serde_json::Value>,
    pub applied_controls: Vec<AppliedControl>,
}
