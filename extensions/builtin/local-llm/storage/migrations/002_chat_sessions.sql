CREATE TABLE ext_local_llm_chat_threads (
    id TEXT PRIMARY KEY NOT NULL,
    title TEXT,
    system_prompt TEXT,
    message_count INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    archived_at TEXT
);

CREATE TABLE ext_local_llm_chat_messages (
    id TEXT PRIMARY KEY NOT NULL,
    thread_id TEXT NOT NULL REFERENCES ext_local_llm_chat_threads(id),
    ordinal INTEGER NOT NULL,
    role TEXT NOT NULL,
    content_text TEXT NOT NULL,
    metadata_json TEXT,
    retry_of_message_id TEXT REFERENCES ext_local_llm_chat_messages(id),
    is_partial INTEGER NOT NULL DEFAULT 0,
    created_at TEXT NOT NULL
);

CREATE TABLE ext_local_llm_chat_sessions (
    id TEXT PRIMARY KEY NOT NULL,
    thread_id TEXT NOT NULL REFERENCES ext_local_llm_chat_threads(id),
    backend_profile_id TEXT NOT NULL REFERENCES ext_local_llm_backend_profiles(id),
    model_install_id TEXT REFERENCES ext_local_llm_model_installs(id),
    state TEXT NOT NULL DEFAULT 'created',
    generation_overrides TEXT,
    attached_corpus_ids TEXT,
    last_metrics_snapshot TEXT,
    last_error TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE INDEX ext_local_llm_idx_messages_thread ON ext_local_llm_chat_messages(thread_id, ordinal);
CREATE INDEX ext_local_llm_idx_messages_retry ON ext_local_llm_chat_messages(retry_of_message_id);
CREATE INDEX ext_local_llm_idx_sessions_state ON ext_local_llm_chat_sessions(state);
CREATE INDEX ext_local_llm_idx_sessions_thread ON ext_local_llm_chat_sessions(thread_id);
CREATE INDEX ext_local_llm_idx_sessions_profile ON ext_local_llm_chat_sessions(backend_profile_id);
CREATE INDEX ext_local_llm_idx_threads_archived ON ext_local_llm_chat_threads(archived_at);
