UPDATE recipes
SET display_name = ?,
    summary = ?,
    category = ?,
    workflow_id = ?,
    workflow_version = ?,
    projection = ?,
    projection_schema_version = ?,
    status = ?,
    status_reason = ?
WHERE id = ? AND author_kind = 'user'
