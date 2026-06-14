INSERT OR IGNORE INTO workflow_versions
    (workflow_id, version, canonical_hash, operator_schema_hash,
     inputs, outputs, nodes, edges, stages,
     author_kind, extension_id, extension_version, created_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
