PRAGMA journal_mode = WAL;
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS extensions (
    id TEXT PRIMARY KEY,
    name TEXT,
    version TEXT NOT NULL,
    description TEXT,
    publisher TEXT,
    host_api_compat TEXT NOT NULL,
    protocol_compat TEXT NOT NULL,
    runtime_family TEXT NOT NULL,
    entrypoint TEXT NOT NULL,
    capabilities TEXT,
    status TEXT NOT NULL DEFAULT 'discovered',
    directory TEXT NOT NULL,
    installed_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS operators (
    id TEXT,
    version TEXT,
    extension_id TEXT NOT NULL REFERENCES extensions(id),
    display_name TEXT,
    description TEXT,
    category TEXT,
    inputs TEXT NOT NULL,
    outputs TEXT NOT NULL,
    config_schema TEXT,
    execution_mode TEXT DEFAULT 'job',
    cacheable INTEGER DEFAULT 1,
    resumable INTEGER DEFAULT 0,
    resource_hints TEXT,
    PRIMARY KEY (id, version)
);

CREATE TABLE IF NOT EXISTS workflows (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    version TEXT NOT NULL,
    inputs TEXT,
    outputs TEXT,
    nodes TEXT NOT NULL,
    edges TEXT NOT NULL,
    stages TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS runs (
    id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL REFERENCES workflows(id),
    workflow_version TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'created',
    started_at TEXT,
    completed_at TEXT,
    error TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS node_executions (
    run_id TEXT NOT NULL REFERENCES runs(id),
    node_id TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    worker_id TEXT,
    started_at TEXT,
    completed_at TEXT,
    duration_ms INTEGER,
    error TEXT,
    PRIMARY KEY (run_id, node_id)
);

CREATE TABLE IF NOT EXISTS artifacts (
    id TEXT PRIMARY KEY,
    artifact_type TEXT NOT NULL,
    run_id TEXT NOT NULL REFERENCES runs(id),
    node_id TEXT NOT NULL,
    port_name TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    blob_path TEXT NOT NULL,
    metadata TEXT,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS lineage_edges (
    output_artifact_id TEXT NOT NULL REFERENCES artifacts(id),
    input_artifact_id TEXT NOT NULL REFERENCES artifacts(id),
    run_id TEXT NOT NULL REFERENCES runs(id),
    node_id TEXT NOT NULL,
    PRIMARY KEY (output_artifact_id, input_artifact_id)
);

CREATE INDEX IF NOT EXISTS idx_runs_workflow_id ON runs(workflow_id);
CREATE INDEX IF NOT EXISTS idx_runs_status ON runs(status);
CREATE INDEX IF NOT EXISTS idx_node_executions_run_id ON node_executions(run_id);
CREATE INDEX IF NOT EXISTS idx_artifacts_run_id ON artifacts(run_id);
CREATE INDEX IF NOT EXISTS idx_lineage_edges_run_id ON lineage_edges(run_id);
