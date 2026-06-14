use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ExtensionRecord {
    pub id: String,
    pub name: Option<String>,
    pub version: String,
    pub description: Option<String>,
    pub publisher: Option<String>,
    pub host_api_compat: String,
    pub protocol_compat: String,
    pub runtime_family: String,
    pub entrypoint: String,
    pub capabilities: Option<String>,
    pub status: String,
    pub directory: String,
    pub installed_at: String,
    pub recipe_count: Option<i32>,
    pub ui_contribution_count: Option<i32>,
    pub validation_errors: Option<String>,
    pub primary_recipe_id: Option<String>,
    pub default_workflow_id: Option<String>,
    pub icon_kind: Option<IconKind>,
    pub icon_symbol: Option<String>,
    pub icon_svg: Option<String>,
}

/// Persisted discriminant for the `extensions.icon_kind` column. `None` at the
/// `ExtensionRecord` level means the host falls back to deterministic FNV-1a
/// hashing at read time (spec 019 FR-I04).
#[derive(Clone, Copy, Debug, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
#[non_exhaustive]
pub enum IconKind {
    Symbol,
    Svg,
}

impl IconKind {
    pub fn as_str(self) -> &'static str {
        match self {
            IconKind::Symbol => "symbol",
            IconKind::Svg => "svg",
        }
    }

    pub fn parse(raw: &str) -> Option<Self> {
        match raw {
            "symbol" => Some(IconKind::Symbol),
            "svg" => Some(IconKind::Svg),
            _ => None,
        }
    }
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct OperatorRecord {
    pub id: String,
    pub version: String,
    pub extension_id: String,
    pub display_name: Option<String>,
    pub description: Option<String>,
    pub category: Option<String>,
    pub inputs: String,
    pub outputs: String,
    pub config_schema: Option<String>,
    pub execution_mode: Option<String>,
    pub cacheable: Option<i32>,
    pub resumable: Option<i32>,
    pub resource_hints: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct WorkflowRecord {
    pub id: String,
    pub title: String,
    pub version: String,
    pub inputs: Option<String>,
    pub outputs: Option<String>,
    pub nodes: String,
    pub edges: String,
    pub stages: Option<String>,
    pub created_at: String,
    pub updated_at: String,
    /// RFC3339 timestamp set when the UI saves a user edit. When `Some(_)`,
    /// boot-time extension re-persistence must skip this row to preserve the
    /// user's graph. `None` means this row is still tracking the shipped YAML.
    pub user_edited_at: Option<String>,
    /// Extension that contributed this workflow. `None` marks a user-authored
    /// workflow or one whose source extension is no longer known.
    pub extension_id: Option<String>,
    /// Extension version captured at contribution time.
    pub extension_version: Option<String>,
    /// RFC3339 timestamp of the first time this workflow was persisted under
    /// its current `extension_id`; preserved across extension upgrades.
    pub extension_version_first_seen: Option<String>,
}

/// An immutable snapshot of a workflow's graph at one point in time. Rows are
/// append-only; `(workflow_id, version)` is the primary key. `version` is a
/// per-workflow monotonic integer string ("1", "2", ...), distinct from the
/// authored semver carried on `WorkflowRecord.version`.
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct WorkflowVersionRecord {
    pub workflow_id: String,
    pub version: String,
    pub canonical_hash: String,
    pub operator_schema_hash: Option<String>,
    pub inputs: Option<String>,
    pub outputs: Option<String>,
    pub nodes: String,
    pub edges: String,
    pub stages: Option<String>,
    pub author_kind: String,
    pub extension_id: Option<String>,
    pub extension_version: Option<String>,
    pub created_at: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RunRecord {
    pub id: String,
    pub workflow_id: String,
    pub workflow_version: String,
    pub status: String,
    pub started_at: Option<String>,
    pub completed_at: Option<String>,
    pub error: Option<String>,
    pub created_at: String,
    pub run_label: Option<String>,
    pub execution_profile: Option<String>,
    pub predecessor_run_id: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct NodeExecutionRecord {
    pub run_id: String,
    pub node_id: String,
    pub status: String,
    pub worker_id: Option<String>,
    pub started_at: Option<String>,
    pub completed_at: Option<String>,
    pub duration_ms: Option<i64>,
    pub error: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ArtifactRecord {
    pub id: String,
    pub artifact_type: String,
    pub run_id: String,
    pub node_id: String,
    pub port_name: String,
    pub content_hash: String,
    pub size_bytes: i64,
    pub blob_path: String,
    pub metadata: Option<String>,
    pub created_at: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct LineageEdgeRecord {
    pub output_artifact_id: String,
    pub input_artifact_id: String,
    pub run_id: String,
    pub node_id: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct RecipeRecord {
    pub id: String,
    pub version: String,
    pub display_name: String,
    pub summary: String,
    pub category: String,
    pub extension_id: String,
    pub extension_version: String,
    pub workflow_template_ref: String,
    pub thumbnail: Option<String>,
    pub input_summary: Option<String>,
    pub bindings: String,
    pub workflow_id: Option<String>,
    pub workflow_version: Option<String>,
    pub projection_schema_version: Option<i64>,
    pub projection: Option<String>,
    pub status: Option<String>,
    pub author_kind: String,
    pub created_at: String,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct UIContributionRecord {
    pub id: String,
    pub kind: String,
    pub extension_id: String,
    pub display_name: String,
    pub description: Option<String>,
    pub target: Option<String>,
    pub supported_types: Option<String>,
    pub priority: i32,
    pub metadata: Option<String>,
    pub availability: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, FromRow)]
pub struct NamespaceRecord {
    pub id: String,
    pub extension_id: String,
    pub extension_version_first_seen: String,
    pub namespace_alias: String,
    pub effective_prefix: String,
    pub engine: String,
    pub storage_spec_version: String,
    pub sql_profile: String,
    pub status: String,
    pub uninstall_policy: String,
    pub created_at: String,
    pub updated_at: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, FromRow)]
pub struct MigrationRecord {
    pub id: String,
    pub namespace_id: String,
    pub extension_id: String,
    pub extension_version: String,
    pub migration_id: String,
    pub path: String,
    pub raw_checksum_sha256: String,
    pub expanded_checksum_sha256: String,
    pub status: String,
    pub applied_at: Option<String>,
    pub error_json: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize, FromRow)]
pub struct ObjectRecord {
    pub id: String,
    pub namespace_id: String,
    pub object_name: String,
    pub object_type: String,
    pub created_by_migration_id: String,
    pub sql_hash: Option<String>,
    pub status: String,
    pub recorded_at: String,
}

#[derive(Clone, Debug, Serialize, Deserialize, FromRow)]
pub struct OperationRecord {
    pub id: String,
    pub namespace_id: String,
    pub operation_type: String,
    pub status: String,
    pub plan_json: Option<String>,
    pub result_json: Option<String>,
    pub started_at: String,
    pub completed_at: Option<String>,
}

#[derive(Clone, Debug, Serialize, Deserialize, FromRow)]
pub struct ArchiveRecord {
    pub id: String,
    pub namespace_id: String,
    pub archive_format: String,
    pub archive_path: String,
    pub content_hash: String,
    pub table_count: i64,
    pub row_count: i64,
    pub created_at: String,
}
