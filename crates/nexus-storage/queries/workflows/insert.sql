INSERT OR REPLACE INTO workflows (id, title, version, inputs, outputs, nodes, edges, stages,
    created_at, updated_at, user_edited_at,
    extension_id, extension_version, extension_version_first_seen)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
