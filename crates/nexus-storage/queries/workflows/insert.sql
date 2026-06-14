INSERT INTO workflows (id, title, version, inputs, outputs, nodes, edges, stages,
    created_at, updated_at, user_edited_at,
    extension_id, extension_version, extension_version_first_seen)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
ON CONFLICT(id) DO UPDATE SET
    title = excluded.title,
    version = excluded.version,
    inputs = excluded.inputs,
    outputs = excluded.outputs,
    nodes = excluded.nodes,
    edges = excluded.edges,
    stages = excluded.stages,
    created_at = excluded.created_at,
    updated_at = excluded.updated_at,
    user_edited_at = excluded.user_edited_at,
    extension_id = excluded.extension_id,
    extension_version = excluded.extension_version,
    extension_version_first_seen = excluded.extension_version_first_seen
