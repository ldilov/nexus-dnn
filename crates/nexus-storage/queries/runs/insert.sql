INSERT INTO runs (id, workflow_id, workflow_version, status, started_at,
    completed_at, error, created_at, run_label, execution_profile,
    predecessor_run_id)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)