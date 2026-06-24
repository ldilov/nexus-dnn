-- P3c: snapshot a compiled recipe run's resolved graph + inputs against the run id
-- so execution plans from the frozen graph, not the mutable head. Pure CREATE, all NOT NULL.
CREATE TABLE IF NOT EXISTS run_resolved_graphs (
    run_id TEXT PRIMARY KEY REFERENCES runs(id) ON DELETE CASCADE,
    workflow_id TEXT NOT NULL,
    workflow_version TEXT NOT NULL,
    nodes TEXT NOT NULL,
    edges TEXT NOT NULL,
    inputs TEXT NOT NULL,
    outputs TEXT NOT NULL,
    stages TEXT NOT NULL,
    resolved_inputs TEXT NOT NULL,
    created_at TEXT NOT NULL
);
