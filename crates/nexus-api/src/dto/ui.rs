use nexus_storage::UIContributionRecord;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct LayoutSummaryDto {
    pub id: String,
    pub display_name: String,
    pub extension_id: String,
    pub placement: Option<String>,
    pub is_default: bool,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct UIContributionDto {
    pub id: String,
    pub kind: String,
    pub extension_id: String,
    pub display_name: String,
    pub description: Option<String>,
    pub target: Option<String>,
    pub supported_types: Vec<String>,
    pub priority: i32,
    #[ts(type = "Record<string, unknown> | null")]
    pub metadata: Option<serde_json::Value>,
    pub availability: String,
}

impl From<&UIContributionRecord> for UIContributionDto {
    fn from(r: &UIContributionRecord) -> Self {
        let supported_types = r
            .supported_types
            .as_deref()
            .map(|s| {
                s.split(',')
                    .map(|t| t.trim().to_owned())
                    .filter(|t| !t.is_empty())
                    .collect()
            })
            .unwrap_or_default();
        let metadata = r
            .metadata
            .as_deref()
            .and_then(|s| serde_json::from_str(s).ok());
        Self {
            id: r.id.clone(),
            kind: r.kind.clone(),
            extension_id: r.extension_id.clone(),
            display_name: r.display_name.clone(),
            description: r.description.clone(),
            target: r.target.clone(),
            supported_types,
            priority: r.priority,
            metadata,
            availability: r.availability.clone(),
        }
    }
}
