CREATE TABLE IF NOT EXISTS {{prefix}}threads (
    id TEXT PRIMARY KEY,
    title TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL,
    archived INTEGER NOT NULL DEFAULT 0,
    metadata_json TEXT
);

CREATE TABLE IF NOT EXISTS {{prefix}}messages (
    id TEXT PRIMARY KEY,
    thread_id TEXT NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('system', 'user', 'assistant', 'tool')),
    content_artifact_id TEXT,
    content_text_inline TEXT,
    status TEXT NOT NULL CHECK (status IN ('pending', 'completed', 'failed')),
    run_id TEXT,
    created_at TEXT NOT NULL,
    metadata_json TEXT,
    FOREIGN KEY (thread_id) REFERENCES {{prefix}}threads(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS {{prefix}}message_attachments (
    id TEXT PRIMARY KEY,
    message_id TEXT NOT NULL,
    artifact_id TEXT NOT NULL,
    kind TEXT NOT NULL CHECK (kind IN ('image', 'audio', 'document', 'other')),
    created_at TEXT NOT NULL,
    FOREIGN KEY (message_id) REFERENCES {{prefix}}messages(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS {{prefix}}thread_model_profiles (
    thread_id TEXT PRIMARY KEY,
    backend_kind TEXT NOT NULL CHECK (backend_kind IN ('llama_cpp', 'external_service')),
    model_id TEXT NOT NULL,
    temperature REAL,
    context_window INTEGER,
    updated_at TEXT NOT NULL,
    FOREIGN KEY (thread_id) REFERENCES {{prefix}}threads(id) ON DELETE CASCADE
);
