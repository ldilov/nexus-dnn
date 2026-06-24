INSERT INTO run_resolved_graphs (
    run_id, workflow_id, workflow_version, nodes, edges,
    inputs, outputs, stages, resolved_inputs, created_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
