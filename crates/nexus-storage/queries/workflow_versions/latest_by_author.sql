SELECT * FROM workflow_versions
WHERE workflow_id = ? AND author_kind = ?
ORDER BY rowid DESC
LIMIT 1
