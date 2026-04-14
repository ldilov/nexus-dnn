INSERT INTO extension_storage_migrations (id, namespace_id, extension_id,
    extension_version, migration_id, path, raw_checksum_sha256,
    expanded_checksum_sha256, status, applied_at, error_json)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)