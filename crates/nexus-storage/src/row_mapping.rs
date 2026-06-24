use sqlx::Row;
use sqlx::sqlite::SqliteRow;

use crate::records::{
    ArtifactRecord, ExtensionRecord, IconKind, LineageEdgeRecord, NodeExecutionRecord,
    OperatorRecord, RecipeRecord, RunRecord, UIContributionRecord, WorkflowRecord,
};

pub fn map_extension_row(row: SqliteRow) -> ExtensionRecord {
    let icon_kind_raw: Option<String> = row.try_get("icon_kind").ok().flatten();
    let icon_kind = icon_kind_raw.as_deref().and_then(IconKind::parse);
    ExtensionRecord {
        id: row.get("id"),
        name: row.get("name"),
        version: row.get("version"),
        description: row.get("description"),
        publisher: row.get("publisher"),
        host_api_compat: row.get("host_api_compat"),
        protocol_compat: row.get("protocol_compat"),
        runtime_family: row.get("runtime_family"),
        entrypoint: row.get("entrypoint"),
        capabilities: row.get("capabilities"),
        status: row.get("status"),
        directory: row.get("directory"),
        installed_at: row.get("installed_at"),
        recipe_count: row.try_get("recipe_count").ok().flatten(),
        ui_contribution_count: row.try_get("ui_contribution_count").ok().flatten(),
        validation_errors: row.try_get("validation_errors").ok().flatten(),
        primary_recipe_id: row.try_get("primary_recipe_id").ok().flatten(),
        default_workflow_id: row.try_get("default_workflow_id").ok().flatten(),
        icon_kind,
        icon_symbol: row.try_get("icon_symbol").ok().flatten(),
        icon_svg: row.try_get("icon_svg").ok().flatten(),
    }
}

pub fn map_operator_row(row: SqliteRow) -> OperatorRecord {
    OperatorRecord {
        id: row.get("id"),
        version: row.get("version"),
        extension_id: row.get("extension_id"),
        display_name: row.get("display_name"),
        description: row.get("description"),
        category: row.get("category"),
        inputs: row.get("inputs"),
        outputs: row.get("outputs"),
        config_schema: row.get("config_schema"),
        execution_mode: row.get("execution_mode"),
        cacheable: row.get("cacheable"),
        resumable: row.get("resumable"),
        resource_hints: row.get("resource_hints"),
    }
}

pub fn map_workflow_row(row: SqliteRow) -> WorkflowRecord {
    WorkflowRecord {
        id: row.get("id"),
        title: row.get("title"),
        version: row.get("version"),
        inputs: row.get("inputs"),
        outputs: row.get("outputs"),
        nodes: row.get("nodes"),
        edges: row.get("edges"),
        stages: row.get("stages"),
        created_at: row.get("created_at"),
        updated_at: row.get("updated_at"),
        user_edited_at: row.try_get("user_edited_at").ok().flatten(),
        extension_id: row.try_get("extension_id").ok().flatten(),
        extension_version: row.try_get("extension_version").ok().flatten(),
        extension_version_first_seen: row.try_get("extension_version_first_seen").ok().flatten(),
    }
}

pub fn map_workflow_version_row(row: SqliteRow) -> crate::records::WorkflowVersionRecord {
    crate::records::WorkflowVersionRecord {
        workflow_id: row.get("workflow_id"),
        version: row.get("version"),
        label: row.try_get("label").ok().flatten(),
        canonical_hash: row.get("canonical_hash"),
        operator_schema_hash: row.get("operator_schema_hash"),
        nodes: row.get("nodes"),
        edges: row.get("edges"),
        inputs: row.try_get("inputs").ok().flatten(),
        outputs: row.try_get("outputs").ok().flatten(),
        stages: row.try_get("stages").ok().flatten(),
        author_kind: row.get("author_kind"),
        extension_id: row.try_get("extension_id").ok().flatten(),
        extension_version: row.try_get("extension_version").ok().flatten(),
        created_at: row.get("created_at"),
    }
}

pub fn map_run_row(row: SqliteRow) -> RunRecord {
    RunRecord {
        id: row.get("id"),
        workflow_id: row.get("workflow_id"),
        workflow_version: row.get("workflow_version"),
        status: row.get("status"),
        started_at: row.get("started_at"),
        completed_at: row.get("completed_at"),
        error: row.get("error"),
        created_at: row.get("created_at"),
        run_label: row.try_get("run_label").ok().flatten(),
        execution_profile: row.try_get("execution_profile").ok().flatten(),
        predecessor_run_id: row.try_get("predecessor_run_id").ok().flatten(),
    }
}

pub fn map_node_execution_row(row: SqliteRow) -> NodeExecutionRecord {
    NodeExecutionRecord {
        run_id: row.get("run_id"),
        node_id: row.get("node_id"),
        status: row.get("status"),
        worker_id: row.get("worker_id"),
        started_at: row.get("started_at"),
        completed_at: row.get("completed_at"),
        duration_ms: row.get("duration_ms"),
        error: row.get("error"),
    }
}

pub fn map_artifact_row(row: SqliteRow) -> ArtifactRecord {
    ArtifactRecord {
        id: row.get("id"),
        artifact_type: row.get("artifact_type"),
        run_id: row.get("run_id"),
        node_id: row.get("node_id"),
        port_name: row.get("port_name"),
        content_hash: row.get("content_hash"),
        size_bytes: row.get("size_bytes"),
        blob_path: row.get("blob_path"),
        metadata: row.get("metadata"),
        created_at: row.get("created_at"),
    }
}

pub fn map_lineage_edge_row(row: SqliteRow) -> LineageEdgeRecord {
    LineageEdgeRecord {
        output_artifact_id: row.get("output_artifact_id"),
        input_artifact_id: row.get("input_artifact_id"),
        run_id: row.get("run_id"),
        node_id: row.get("node_id"),
    }
}

pub fn map_recipe_row(row: SqliteRow) -> RecipeRecord {
    RecipeRecord {
        id: row.get("id"),
        version: row.get("version"),
        display_name: row.get("display_name"),
        summary: row.get("summary"),
        category: row.get("category"),
        extension_id: row.get("extension_id"),
        extension_version: row.get("extension_version"),
        workflow_template_ref: row.get("workflow_template_ref"),
        thumbnail: row.get("thumbnail"),
        input_summary: row.get("input_summary"),
        bindings: row.get("bindings"),
        created_at: row.get("created_at"),
        workflow_id: row.get("workflow_id"),
        workflow_version: row.get("workflow_version"),
        projection: row.get("projection"),
        projection_schema_version: row.get("projection_schema_version"),
        status: row.get("status"),
        status_reason: row.get("status_reason"),
        author_kind: row.get("author_kind"),
    }
}

pub fn map_ui_contribution_row(row: SqliteRow) -> UIContributionRecord {
    UIContributionRecord {
        id: row.get("id"),
        kind: row.get("kind"),
        extension_id: row.get("extension_id"),
        display_name: row.get("display_name"),
        description: row.get("description"),
        target: row.get("target"),
        supported_types: row.get("supported_types"),
        priority: row.get("priority"),
        metadata: row.get("metadata"),
        availability: row.get("availability"),
    }
}
