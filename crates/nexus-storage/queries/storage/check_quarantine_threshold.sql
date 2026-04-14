SELECT COUNT(*) FROM (
    SELECT status FROM extension_storage_operations
    WHERE namespace_id = ? AND operation_type = 'apply_plan'
    ORDER BY started_at DESC LIMIT ?
) sub WHERE sub.status = 'failed'