CREATE TABLE IF NOT EXISTS extension_storage_namespaces (
    id TEXT PRIMARY KEY NOT NULL,
    extension_id TEXT NOT NULL,
    extension_version_first_seen TEXT NOT NULL,
    namespace_alias TEXT NOT NULL,
    effective_prefix TEXT NOT NULL UNIQUE,
    engine TEXT NOT NULL DEFAULT 'sqlite',
    storage_spec_version TEXT NOT NULL,
    sql_profile TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'reserved',
    uninstall_policy TEXT NOT NULL DEFAULT 'retain',
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS extension_storage_migrations (
    id TEXT PRIMARY KEY NOT NULL,
    namespace_id TEXT NOT NULL,
    extension_id TEXT NOT NULL,
    extension_version TEXT NOT NULL,
    migration_id TEXT NOT NULL,
    path TEXT NOT NULL,
    raw_checksum_sha256 TEXT NOT NULL,
    expanded_checksum_sha256 TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'planned',
    applied_at TEXT,
    error_json TEXT,
    UNIQUE(namespace_id, migration_id)
);

CREATE TABLE IF NOT EXISTS extension_storage_objects (
    id TEXT PRIMARY KEY NOT NULL,
    namespace_id TEXT NOT NULL,
    object_name TEXT NOT NULL,
    object_type TEXT NOT NULL,
    created_by_migration_id TEXT NOT NULL,
    sql_hash TEXT,
    status TEXT NOT NULL DEFAULT 'present',
    recorded_at TEXT NOT NULL,
    UNIQUE(namespace_id, object_name)
);

CREATE TABLE IF NOT EXISTS extension_storage_operations (
    id TEXT PRIMARY KEY NOT NULL,
    namespace_id TEXT NOT NULL,
    operation_type TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'started',
    plan_json TEXT,
    result_json TEXT,
    started_at TEXT NOT NULL,
    completed_at TEXT
);

CREATE TABLE IF NOT EXISTS extension_storage_archives (
    id TEXT PRIMARY KEY NOT NULL,
    namespace_id TEXT NOT NULL,
    archive_format TEXT NOT NULL,
    archive_path TEXT NOT NULL,
    content_hash TEXT NOT NULL,
    created_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_ext_storage_ns_extension_id ON extension_storage_namespaces(extension_id);
CREATE INDEX IF NOT EXISTS idx_ext_storage_ns_status ON extension_storage_namespaces(status);
CREATE INDEX IF NOT EXISTS idx_ext_storage_mig_ns_mid ON extension_storage_migrations(namespace_id, migration_id);
CREATE INDEX IF NOT EXISTS idx_ext_storage_obj_ns_name ON extension_storage_objects(namespace_id, object_name);
CREATE INDEX IF NOT EXISTS idx_ext_storage_ops_ns_started ON extension_storage_operations(namespace_id, started_at);
