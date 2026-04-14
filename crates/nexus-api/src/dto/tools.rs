use nexus_extension::Tool;
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ToolDto {
    pub id: String,
    pub kind: String,
    pub target_id: String,
    pub display_name: String,
    pub description: Option<String>,
    pub category: String,
    pub tags: Vec<String>,
    pub icon: Option<String>,
    pub extension_id: String,
    pub availability: String,
}

impl From<&Tool> for ToolDto {
    fn from(t: &Tool) -> Self {
        Self {
            id: t.id.clone(),
            kind: t.kind.clone(),
            target_id: t.target_id.clone(),
            display_name: t.display_name.clone(),
            description: t.description.clone(),
            category: t.category.clone(),
            tags: t.tags.clone(),
            icon: t.icon.clone(),
            extension_id: t.extension_id.clone(),
            availability: t.availability.clone(),
        }
    }
}
