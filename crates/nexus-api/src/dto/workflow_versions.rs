use serde::Serialize;
use ts_rs::TS;

use nexus_storage::records::WorkflowVersionRecord;

#[derive(Debug, Serialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct WorkflowVersionDto {
    pub workflow_id: String,
    pub version: String,
    pub canonical_hash: String,
    pub author_kind: String,
    pub extension_id: Option<String>,
    pub extension_version: Option<String>,
    pub created_at: String,
    pub is_current: bool,
}

impl WorkflowVersionDto {
    pub fn from_record(r: &WorkflowVersionRecord, current: Option<&str>) -> Self {
        Self {
            workflow_id: r.workflow_id.clone(),
            version: r.version.clone(),
            canonical_hash: r.canonical_hash.clone(),
            author_kind: r.author_kind.clone(),
            extension_id: r.extension_id.clone(),
            extension_version: r.extension_version.clone(),
            created_at: r.created_at.clone(),
            is_current: current == Some(r.version.as_str()),
        }
    }
}
