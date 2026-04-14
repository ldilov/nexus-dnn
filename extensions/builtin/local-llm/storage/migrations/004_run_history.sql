CREATE TABLE ext_local_llm_run_history (
    id TEXT PRIMARY KEY NOT NULL,
    profile_id TEXT NOT NULL REFERENCES ext_local_llm_backend_profiles(id),
    action TEXT NOT NULL,
    result TEXT NOT NULL,
    runtime_version TEXT,
    model_reference TEXT,
    summary_message TEXT,
    diagnostics_json TEXT,
    started_at TEXT NOT NULL,
    finished_at TEXT,
    created_at TEXT NOT NULL
);

CREATE INDEX ext_local_llm_idx_history_profile ON ext_local_llm_run_history(profile_id);
CREATE INDEX ext_local_llm_idx_history_action ON ext_local_llm_run_history(action);
