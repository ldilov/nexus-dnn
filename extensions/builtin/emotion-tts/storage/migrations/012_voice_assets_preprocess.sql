ALTER TABLE ext_emotion_tts__voice_assets
    ADD COLUMN preprocessed_artifact_ref TEXT;

ALTER TABLE ext_emotion_tts__voice_assets
    ADD COLUMN preprocessing_report_json TEXT;
