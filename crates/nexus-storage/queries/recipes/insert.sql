INSERT OR REPLACE INTO recipes
    (id, version, display_name, summary, category, extension_id, extension_version,
     workflow_template_ref, thumbnail, input_summary, bindings,
     workflow_id, workflow_version, projection_schema_version, projection, status, author_kind,
     created_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
