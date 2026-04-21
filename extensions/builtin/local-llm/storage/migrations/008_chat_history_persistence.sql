CREATE TABLE IF NOT EXISTS ext_local_llm_meta (
    key   TEXT PRIMARY KEY NOT NULL,
    value TEXT NOT NULL
);
INSERT OR REPLACE INTO ext_local_llm_meta (key, value) VALUES ('schema_version', '8');

ALTER TABLE ext_local_llm_chat_threads ADD COLUMN deployment_id    TEXT NULL;
ALTER TABLE ext_local_llm_chat_threads ADD COLUMN install_id       TEXT NULL;
ALTER TABLE ext_local_llm_chat_threads ADD COLUMN sampler_override TEXT NULL;
ALTER TABLE ext_local_llm_chat_threads ADD COLUMN title_auto       TEXT NULL;

ALTER TABLE ext_local_llm_chat_messages ADD COLUMN sampler_effective TEXT NULL;

CREATE INDEX IF NOT EXISTS ext_local_llm_idx_threads_deploy
    ON ext_local_llm_chat_threads(deployment_id);
