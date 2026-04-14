SELECT name FROM sqlite_master
WHERE type IN ('table', 'index') AND name LIKE ?1
    AND name NOT IN (SELECT object_name FROM extension_storage_objects)