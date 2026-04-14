CREATE TABLE ext_local_llm_runtime_installs (
    id TEXT PRIMARY KEY NOT NULL,
    backend_family TEXT NOT NULL,
    version TEXT NOT NULL,
    source_url TEXT,
    asset_name TEXT,
    checksum TEXT,
    install_root TEXT NOT NULL,
    platform TEXT NOT NULL,
    arch TEXT NOT NULL,
    acceleration TEXT NOT NULL,
    environment_manifest TEXT,
    binary_paths TEXT,
    state TEXT NOT NULL DEFAULT 'installing',
    validation_result TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE ext_local_llm_model_installs (
    id TEXT PRIMARY KEY NOT NULL,
    repo_id TEXT,
    revision TEXT,
    display_name TEXT NOT NULL,
    backend_tags TEXT,
    selected_files TEXT,
    local_paths TEXT NOT NULL,
    source_mode TEXT NOT NULL,
    size_bytes INTEGER,
    quantization_hint TEXT,
    state TEXT NOT NULL DEFAULT 'registered',
    last_used_at TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE ext_local_llm_model_download_tasks (
    id TEXT PRIMARY KEY NOT NULL,
    repo_id TEXT NOT NULL,
    revision TEXT,
    requested_files TEXT,
    download_mode TEXT NOT NULL,
    backend_target TEXT NOT NULL,
    model_install_id TEXT REFERENCES ext_local_llm_model_installs(id),
    status TEXT NOT NULL DEFAULT 'queued',
    bytes_downloaded INTEGER,
    bytes_total INTEGER,
    error TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE ext_local_llm_backend_profiles (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    backend_family TEXT NOT NULL,
    runtime_mode TEXT NOT NULL,
    runtime_install_id TEXT REFERENCES ext_local_llm_runtime_installs(id),
    model_install_id TEXT REFERENCES ext_local_llm_model_installs(id),
    cuda_requirement TEXT,
    generation_defaults TEXT,
    advanced_config TEXT,
    state TEXT NOT NULL DEFAULT 'created',
    last_health_snapshot TEXT,
    last_health_at TEXT,
    last_error TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX ext_local_llm_idx_profiles_state ON ext_local_llm_backend_profiles(state);
CREATE INDEX ext_local_llm_idx_profiles_family ON ext_local_llm_backend_profiles(backend_family);
CREATE INDEX ext_local_llm_idx_models_state ON ext_local_llm_model_installs(state);
CREATE INDEX ext_local_llm_idx_downloads_status ON ext_local_llm_model_download_tasks(status);
CREATE INDEX ext_local_llm_idx_installs_family ON ext_local_llm_runtime_installs(backend_family);
