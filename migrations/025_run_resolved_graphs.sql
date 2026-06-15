CREATE TABLE IF NOT EXISTS run_resolved_graphs (
    run_id TEXT PRIMARY KEY,
    workflow_id TEXT NOT NULL,
    workflow_version TEXT NOT NULL,
    workflow_json TEXT NOT NULL,
    inputs_values_json TEXT NOT NULL,
    created_at TEXT NOT NULL
);
