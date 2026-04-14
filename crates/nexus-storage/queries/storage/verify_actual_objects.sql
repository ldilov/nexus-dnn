SELECT name, type FROM sqlite_master
WHERE name LIKE ?1 AND type IN ('table', 'index')