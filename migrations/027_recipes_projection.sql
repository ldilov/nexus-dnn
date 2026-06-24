-- P1 recipes pin/projection/status/author cols added, ext fields made nullable.
-- Rebuild relaxes NOT NULL and is re-run safe (re-copies all cols, no data loss).
ALTER TABLE recipes ADD COLUMN workflow_id TEXT;
ALTER TABLE recipes ADD COLUMN workflow_version TEXT;
ALTER TABLE recipes ADD COLUMN projection TEXT;
ALTER TABLE recipes ADD COLUMN projection_schema_version INTEGER NOT NULL DEFAULT 1;
ALTER TABLE recipes ADD COLUMN status TEXT NOT NULL DEFAULT 'healthy';
ALTER TABLE recipes ADD COLUMN status_reason TEXT;
ALTER TABLE recipes ADD COLUMN author_kind TEXT NOT NULL DEFAULT 'extension';

BEGIN;
DROP TABLE IF EXISTS recipes_rebuild;
CREATE TABLE IF NOT EXISTS recipes_rebuild (
    id TEXT PRIMARY KEY,
    version TEXT NOT NULL,
    display_name TEXT NOT NULL,
    summary TEXT NOT NULL,
    category TEXT NOT NULL,
    extension_id TEXT,
    extension_version TEXT,
    workflow_template_ref TEXT NOT NULL,
    thumbnail TEXT,
    input_summary TEXT,
    bindings TEXT NOT NULL,
    created_at TEXT NOT NULL,
    source_kind TEXT,
    source_extension_id TEXT,
    source_template_ref TEXT,
    availability_state TEXT,
    mapping_contract_json TEXT,
    workflow_id TEXT,
    workflow_version TEXT,
    projection TEXT,
    projection_schema_version INTEGER NOT NULL DEFAULT 1,
    status TEXT NOT NULL DEFAULT 'healthy',
    status_reason TEXT,
    author_kind TEXT NOT NULL DEFAULT 'extension'
);

INSERT INTO recipes_rebuild (id, version, display_name, summary, category, extension_id, extension_version, workflow_template_ref, thumbnail, input_summary, bindings, created_at, source_kind, source_extension_id, source_template_ref, availability_state, mapping_contract_json, workflow_id, workflow_version, projection, projection_schema_version, status, status_reason, author_kind)
SELECT id, version, display_name, summary, category, extension_id, extension_version, workflow_template_ref, thumbnail, input_summary, bindings, created_at, source_kind, source_extension_id, source_template_ref, availability_state, mapping_contract_json, workflow_id, workflow_version, projection, projection_schema_version, status, status_reason, author_kind FROM recipes;

DROP TABLE recipes;
ALTER TABLE recipes_rebuild RENAME TO recipes;

CREATE INDEX IF NOT EXISTS idx_recipes_extension ON recipes(extension_id);
CREATE INDEX IF NOT EXISTS idx_recipes_category ON recipes(category);
COMMIT;
