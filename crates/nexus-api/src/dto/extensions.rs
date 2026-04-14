use nexus_storage::{ExtensionRecord, OperatorRecord};
use serde::{Deserialize, Serialize};
use ts_rs::TS;

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ExtensionDto {
    pub id: String,
    pub name: Option<String>,
    pub version: String,
    pub description: Option<String>,
    pub publisher: Option<String>,
    pub runtime_family: String,
    pub status: String,
    pub capabilities: Vec<String>,
    pub recipe_count: Option<i32>,
    pub ui_contribution_count: Option<i32>,
    pub validation_errors: Vec<String>,
    pub installed_at: String,
}

impl From<&ExtensionRecord> for ExtensionDto {
    fn from(r: &ExtensionRecord) -> Self {
        Self {
            id: r.id.clone(),
            name: r.name.clone(),
            version: r.version.clone(),
            description: r.description.clone(),
            publisher: r.publisher.clone(),
            runtime_family: r.runtime_family.clone(),
            status: r.status.clone(),
            capabilities: parse_json_array(r.capabilities.as_deref()),
            recipe_count: r.recipe_count,
            ui_contribution_count: r.ui_contribution_count,
            validation_errors: parse_json_array(r.validation_errors.as_deref()),
            installed_at: r.installed_at.clone(),
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct PortSpecDto {
    pub name: String,
    pub port_type: String,
    pub required: Option<bool>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct OperatorDto {
    pub id: String,
    pub version: String,
    pub extension_id: String,
    pub display_name: Option<String>,
    pub description: Option<String>,
    pub category: Option<String>,
    pub inputs: Vec<PortSpecDto>,
    pub outputs: Vec<PortSpecDto>,
    #[ts(type = "unknown | null")]
    pub config_schema: Option<serde_json::Value>,
    pub execution_mode: Option<String>,
    pub cacheable: Option<bool>,
    pub resumable: Option<bool>,
    #[ts(type = "unknown | null")]
    pub resource_hints: Option<serde_json::Value>,
}

impl From<&OperatorRecord> for OperatorDto {
    fn from(r: &OperatorRecord) -> Self {
        Self {
            id: r.id.clone(),
            version: r.version.clone(),
            extension_id: r.extension_id.clone(),
            display_name: r.display_name.clone(),
            description: r.description.clone(),
            category: r.category.clone(),
            inputs: parse_port_specs(Some(r.inputs.as_str())),
            outputs: parse_port_specs(Some(r.outputs.as_str())),
            config_schema: parse_json_value(r.config_schema.as_deref()),
            execution_mode: r.execution_mode.clone(),
            cacheable: r.cacheable.map(|v| v != 0),
            resumable: r.resumable.map(|v| v != 0),
            resource_hints: parse_json_value(r.resource_hints.as_deref()),
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct RefreshReportDto {
    pub activated: Vec<String>,
    pub invalid: Vec<(String, String)>,
}

#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct EnableExtensionResponseDto {
    pub id: String,
    pub status: String,
}

fn parse_json_array(raw: Option<&str>) -> Vec<String> {
    raw.and_then(|s| serde_json::from_str(s).ok())
        .unwrap_or_default()
}

fn parse_json_value(raw: Option<&str>) -> Option<serde_json::Value> {
    raw.and_then(|s| serde_json::from_str(s).ok())
}

fn parse_port_specs(raw: Option<&str>) -> Vec<PortSpecDto> {
    raw.and_then(|s| serde_json::from_str::<Vec<serde_json::Value>>(s).ok())
        .map(|arr| {
            arr.into_iter()
                .map(|v| PortSpecDto {
                    name: v
                        .get("name")
                        .and_then(|n| n.as_str())
                        .unwrap_or_default()
                        .to_owned(),
                    port_type: v
                        .get("port_type")
                        .or_else(|| v.get("type"))
                        .and_then(|n| n.as_str())
                        .unwrap_or_default()
                        .to_owned(),
                    required: v.get("required").and_then(|n| n.as_bool()),
                })
                .collect()
        })
        .unwrap_or_default()
}
