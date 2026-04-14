use serde::{Deserialize, Serialize};
use ts_rs::TS;

/// Timestamp metadata wrapped around every response.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct MetaDto {
    pub timestamp: String,
}

/// Structured error payload surfaced to clients.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ApiErrorPayloadDto {
    pub code: String,
    pub category: String,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none", default)]
    #[ts(type = "unknown | null")]
    pub details: Option<serde_json::Value>,
}

/// Canonical envelope every handler wraps its `data` in. The type parameter is
/// the concrete DTO that the endpoint returns.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ApiEnvelope<T>
where
    T: TS,
{
    #[serde(skip_serializing_if = "Option::is_none", default = "default_data")]
    pub data: Option<T>,
    pub meta: MetaDto,
    #[serde(skip_serializing_if = "Option::is_none", default)]
    pub error: Option<ApiErrorPayloadDto>,
}

fn default_data<T>() -> Option<T> {
    None
}

/// Generic list wrapper used by every `GET /<resource>` endpoint so that the
/// frontend can always destructure `.items` regardless of the resource.
#[derive(Clone, Debug, Serialize, Deserialize, TS)]
#[ts(export, export_to = "../../../apps/web/src/api/generated/")]
pub struct ListResponseDto<T>
where
    T: TS,
{
    pub items: Vec<T>,
}
