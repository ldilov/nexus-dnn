CREATE TABLE IF NOT EXISTS workflow_versions (
    workflow_id TEXT NOT NULL,
    version TEXT NOT NULL,
    label TEXT,
    canonical_hash TEXT NOT NULL,
    operator_schema_hash TEXT NOT NULL,
    nodes TEXT NOT NULL,
    edges TEXT NOT NULL,
    inputs TEXT,
    outputs TEXT,
    stages TEXT,
    author_kind TEXT NOT NULL,
    extension_id TEXT,
    extension_version TEXT,
    created_at TEXT NOT NULL,
    PRIMARY KEY (workflow_id, version)
);

CREATE INDEX IF NOT EXISTS idx_workflow_versions_workflow ON workflow_versions(workflow_id);
