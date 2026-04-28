ALTER TABLE ext_emotion_tts__deployments
    ADD COLUMN reference_preprocess_enabled INTEGER;

ALTER TABLE ext_emotion_tts__deployments
    ADD COLUMN oas_enabled INTEGER;

ALTER TABLE ext_emotion_tts__deployments
    ADD COLUMN compile_gpt_enabled INTEGER;

ALTER TABLE ext_emotion_tts__deployments
    ADD COLUMN model_family TEXT;

ALTER TABLE ext_emotion_tts__deployments
    ADD COLUMN oas_threshold_learned REAL;

ALTER TABLE ext_emotion_tts__deployments
    ADD COLUMN oas_samples_seen INTEGER NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS ext_emotion_tts_idx_deployments_model_family
    ON ext_emotion_tts__deployments (model_family)
    WHERE model_family IS NOT NULL;
