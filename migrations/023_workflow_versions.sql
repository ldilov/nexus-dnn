CREATE TABLE IF NOT EXISTS workflow_versions (
    workflow_id TEXT NOT NULL,
    version TEXT NOT NULL,
    canonical_hash TEXT NOT NULL,
    operator_schema_hash TEXT,
    inputs TEXT,
    outputs TEXT,
    nodes TEXT NOT NULL,
    edges TEXT NOT NULL,
    stages TEXT,
    author_kind TEXT NOT NULL DEFAULT 'extension',
    extension_id TEXT,
    extension_version TEXT,
    created_at TEXT NOT NULL,
    PRIMARY KEY (workflow_id, version)
);

ALTER TABLE workflows ADD COLUMN current_version TEXT;
