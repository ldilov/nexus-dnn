UPDATE node_executions SET status = ?, worker_id = ?, duration_ms = ?, error = ?
WHERE run_id = ? AND node_id = ?