INSERT INTO workflow_versions (
    workflow_id, version, label, canonical_hash, operator_schema_hash,
    nodes, edges, inputs, outputs, stages,
    author_kind, extension_id, extension_version, created_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
