SELECT * FROM workflow_versions WHERE workflow_id = ?
ORDER BY CAST(version AS INTEGER) ASC
