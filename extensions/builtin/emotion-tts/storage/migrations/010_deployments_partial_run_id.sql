ALTER TABLE ext_emotion_tts__deployments
    ADD COLUMN partial_run_id TEXT;

CREATE INDEX IF NOT EXISTS idx_deployments_partial_run
    ON ext_emotion_tts__deployments (partial_run_id)
    WHERE partial_run_id IS NOT NULL;
