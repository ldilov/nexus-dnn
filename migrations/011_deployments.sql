-- Migration 011 — Deployments (spec 018)
-- Authoritative schema for the Deployments feature. Additive, idempotent.
-- Owner: nexus-storage (per spec 018 Clarification Q1 / FR-037).
--
-- Skipped per analysis finding I1:
--   host_runtime_installs.schema_version / health_state — not required for v1;
--   compatibility_state is captured per-binding in deployment_runtime_bindings.
--   A future migration can add those columns if the runtime pool needs them.
-- No runtime_settings table exists in the workspace as of migration 010;
--   deployment_runtime_bindings.runtime_settings_id stays NULL for v1.

-- ============================================================================
-- 1. Deployment tables
-- ============================================================================

CREATE TABLE IF NOT EXISTS deployments (
    id                     TEXT PRIMARY KEY,
    workspace_id           TEXT,
    slug                   TEXT NOT NULL,
    display_name           TEXT NOT NULL,
    description            TEXT,
    state                  TEXT NOT NULL,
    restore_state          TEXT NOT NULL,
    is_archived            INTEGER NOT NULL DEFAULT 0,
    is_favorite            INTEGER NOT NULL DEFAULT 0,
    created_at             TEXT NOT NULL,
    updated_at             TEXT NOT NULL,
    created_from_surface   TEXT NOT NULL,
    current_revision_id    TEXT,
    last_validation_id     TEXT,
    last_run_id            TEXT,
    last_successful_run_id TEXT,
    last_failed_run_id     TEXT,
    run_count              INTEGER NOT NULL DEFAULT 0,
    notes_markdown         TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_deployments_slug    ON deployments(workspace_id, slug);
CREATE        INDEX IF NOT EXISTS idx_deployments_updated ON deployments(workspace_id, updated_at DESC);
CREATE        INDEX IF NOT EXISTS idx_deployments_state   ON deployments(state, restore_state);

CREATE TABLE IF NOT EXISTS deployment_revisions (
    id                          TEXT PRIMARY KEY,
    deployment_id               TEXT NOT NULL REFERENCES deployments(id),
    revision_number             INTEGER NOT NULL,
    save_mode                   TEXT NOT NULL,
    created_at                  TEXT NOT NULL,
    created_by_action           TEXT NOT NULL,
    base_workflow_ref           TEXT,
    base_workflow_version_ref   TEXT,
    base_recipe_ref             TEXT,
    base_recipe_version_ref     TEXT,
    base_extension_ref          TEXT,
    mapping_state               TEXT NOT NULL,
    workflow_snapshot_id        TEXT,
    workflow_patch_json         TEXT,
    effective_workflow_hash     TEXT NOT NULL,
    ui_restore_json             TEXT,
    execution_policy_json       TEXT,
    compatibility_summary_json  TEXT,
    change_summary_json         TEXT
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_deployment_revisions_number
    ON deployment_revisions(deployment_id, revision_number);

CREATE TABLE IF NOT EXISTS deployment_snapshots (
    id                     TEXT PRIMARY KEY,
    deployment_revision_id TEXT NOT NULL REFERENCES deployment_revisions(id),
    snapshot_kind          TEXT NOT NULL,
    payload_format         TEXT NOT NULL,
    payload_json           TEXT NOT NULL,
    payload_hash           TEXT NOT NULL,
    created_at             TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_deployment_snapshots_rev_kind
    ON deployment_snapshots(deployment_revision_id, snapshot_kind);

CREATE TABLE IF NOT EXISTS deployment_source_links (
    id                         TEXT PRIMARY KEY,
    deployment_revision_id     TEXT NOT NULL REFERENCES deployment_revisions(id),
    source_kind                TEXT NOT NULL,
    source_id                  TEXT,
    source_version_id          TEXT,
    source_extension_id        TEXT,
    source_template_ref        TEXT,
    source_availability_state  TEXT NOT NULL,
    is_primary_source          INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_deployment_source_links_rev
    ON deployment_source_links(deployment_revision_id);
CREATE INDEX IF NOT EXISTS idx_deployment_source_links_src
    ON deployment_source_links(source_kind, source_id);

CREATE TABLE IF NOT EXISTS deployment_parameters (
    id                     TEXT PRIMARY KEY,
    deployment_revision_id TEXT NOT NULL REFERENCES deployment_revisions(id),
    scope                  TEXT NOT NULL,
    binding_target         TEXT NOT NULL,
    logical_key            TEXT NOT NULL,
    data_type              TEXT NOT NULL,
    value_json             TEXT NOT NULL,
    default_value_json     TEXT,
    is_user_modified       INTEGER NOT NULL DEFAULT 1,
    is_recipe_exposed      INTEGER NOT NULL DEFAULT 0,
    is_runtime_exposed     INTEGER NOT NULL DEFAULT 0,
    validation_state       TEXT NOT NULL,
    validation_message     TEXT
);

CREATE        INDEX IF NOT EXISTS idx_deployment_parameters_scope
    ON deployment_parameters(deployment_revision_id, scope);
CREATE        INDEX IF NOT EXISTS idx_deployment_parameters_target
    ON deployment_parameters(deployment_revision_id, binding_target);
CREATE UNIQUE INDEX IF NOT EXISTS idx_deployment_parameters_unique
    ON deployment_parameters(deployment_revision_id, scope, binding_target, logical_key);

CREATE TABLE IF NOT EXISTS deployment_runtime_bindings (
    id                        TEXT PRIMARY KEY,
    deployment_revision_id    TEXT NOT NULL REFERENCES deployment_revisions(id),
    profile_id                TEXT,
    runtime_adapter_id        TEXT,
    runtime_install_id        TEXT,
    runtime_settings_id       TEXT,
    backend_family            TEXT,
    backend_display_name      TEXT,
    compatibility_state       TEXT NOT NULL,
    capability_snapshot_json  TEXT,
    selection_reason          TEXT
);

CREATE INDEX IF NOT EXISTS idx_deployment_runtime_bindings_rev
    ON deployment_runtime_bindings(deployment_revision_id);
CREATE INDEX IF NOT EXISTS idx_deployment_runtime_bindings_install
    ON deployment_runtime_bindings(runtime_install_id);

CREATE TABLE IF NOT EXISTS deployment_model_bindings (
    id                           TEXT PRIMARY KEY,
    deployment_revision_id       TEXT NOT NULL REFERENCES deployment_revisions(id),
    model_record_id              TEXT,
    model_source_kind            TEXT NOT NULL,
    model_locator                TEXT,
    model_format                 TEXT,
    model_hash                   TEXT,
    model_size_bytes             INTEGER,
    quantization                 TEXT,
    capability_class             TEXT,
    compatibility_snapshot_json  TEXT,
    load_parameters_json         TEXT
);

CREATE INDEX IF NOT EXISTS idx_deployment_model_bindings_rev
    ON deployment_model_bindings(deployment_revision_id);
CREATE INDEX IF NOT EXISTS idx_deployment_model_bindings_record
    ON deployment_model_bindings(model_record_id);

CREATE TABLE IF NOT EXISTS deployment_artifact_bindings (
    id                     TEXT PRIMARY KEY,
    deployment_revision_id TEXT NOT NULL REFERENCES deployment_revisions(id),
    usage_kind             TEXT NOT NULL,
    binding_target         TEXT,
    artifact_id            TEXT,
    artifact_ref           TEXT,
    is_pinned              INTEGER NOT NULL DEFAULT 1
);

CREATE INDEX IF NOT EXISTS idx_deployment_artifact_bindings_rev
    ON deployment_artifact_bindings(deployment_revision_id, usage_kind);

CREATE TABLE IF NOT EXISTS deployment_validations (
    id                          TEXT PRIMARY KEY,
    deployment_revision_id      TEXT NOT NULL REFERENCES deployment_revisions(id),
    validated_at                TEXT NOT NULL,
    overall_state               TEXT NOT NULL,
    restore_state               TEXT NOT NULL,
    diagnostics_json            TEXT NOT NULL,
    missing_dependencies_count  INTEGER NOT NULL DEFAULT 0,
    warnings_count              INTEGER NOT NULL DEFAULT 0,
    errors_count                INTEGER NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_deployment_validations_rev
    ON deployment_validations(deployment_revision_id, validated_at DESC);

CREATE TABLE IF NOT EXISTS deployment_restore_diagnostics (
    id                        TEXT PRIMARY KEY,
    deployment_validation_id  TEXT NOT NULL REFERENCES deployment_validations(id),
    severity                  TEXT NOT NULL,
    category                  TEXT NOT NULL,
    code                      TEXT NOT NULL,
    message                   TEXT NOT NULL,
    subject_ref               TEXT,
    resolution_hint           TEXT
);

CREATE INDEX IF NOT EXISTS idx_deployment_restore_diagnostics_v
    ON deployment_restore_diagnostics(deployment_validation_id);
CREATE INDEX IF NOT EXISTS idx_deployment_restore_diagnostics_sc
    ON deployment_restore_diagnostics(severity, category);

CREATE TABLE IF NOT EXISTS deployment_run_links (
    id                     TEXT PRIMARY KEY,
    deployment_id          TEXT NOT NULL REFERENCES deployments(id),
    deployment_revision_id TEXT NOT NULL REFERENCES deployment_revisions(id),
    run_id                 TEXT NOT NULL REFERENCES runs(id),
    link_kind              TEXT NOT NULL,
    created_at             TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_deployment_run_links_dep
    ON deployment_run_links(deployment_id);
CREATE INDEX IF NOT EXISTS idx_deployment_run_links_run
    ON deployment_run_links(run_id);

CREATE TABLE IF NOT EXISTS deployment_tags (
    deployment_id TEXT NOT NULL REFERENCES deployments(id),
    tag           TEXT NOT NULL,
    PRIMARY KEY (deployment_id, tag)
);

-- ============================================================================
-- 2. Additive ALTER TABLE on existing tables (FR-023, FR-024, FR-026)
--    Idempotent via runner's ignore_duplicate_column=true.
-- ============================================================================

ALTER TABLE workflows ADD COLUMN source_kind         TEXT;
ALTER TABLE workflows ADD COLUMN source_extension_id TEXT;
ALTER TABLE workflows ADD COLUMN source_template_ref TEXT;
ALTER TABLE workflows ADD COLUMN availability_state  TEXT;
ALTER TABLE workflows ADD COLUMN canonical_hash      TEXT;
ALTER TABLE workflows ADD COLUMN parent_workflow_id  TEXT;

ALTER TABLE recipes ADD COLUMN source_kind            TEXT;
ALTER TABLE recipes ADD COLUMN source_extension_id    TEXT;
ALTER TABLE recipes ADD COLUMN source_template_ref    TEXT;
ALTER TABLE recipes ADD COLUMN availability_state     TEXT;
ALTER TABLE recipes ADD COLUMN mapping_contract_json  TEXT;

ALTER TABLE runs ADD COLUMN deployment_id           TEXT;
ALTER TABLE runs ADD COLUMN deployment_revision_id  TEXT;
ALTER TABLE runs ADD COLUMN execution_context_hash  TEXT;

CREATE INDEX IF NOT EXISTS idx_runs_deployment          ON runs(deployment_id);
CREATE INDEX IF NOT EXISTS idx_runs_deployment_revision ON runs(deployment_revision_id);
