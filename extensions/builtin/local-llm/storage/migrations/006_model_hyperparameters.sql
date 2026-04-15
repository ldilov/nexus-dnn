ALTER TABLE ext_local_llm_model_installs ADD COLUMN model_limits TEXT;
ALTER TABLE ext_local_llm_model_installs ADD COLUMN hyperparameters TEXT;
ALTER TABLE ext_local_llm_model_installs ADD COLUMN routed_backend TEXT;
ALTER TABLE ext_local_llm_model_installs ADD COLUMN routing_signal TEXT;

CREATE TABLE IF NOT EXISTS ext_local_llm_backend_state_log (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    install_id  TEXT NOT NULL,
    from_state  TEXT,
    to_state    TEXT NOT NULL,
    trigger     TEXT NOT NULL,
    detail      TEXT,
    occurred_at TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS ext_local_llm_idx_state_log_install
    ON ext_local_llm_backend_state_log(install_id);
