-- 019_voice_asset_derived_ref.sql
--
-- Spec 036 / US1 — adds a nullable `derived_artifact_ref` column to
-- `ext_emotion_tts__voice_assets`. When an audio-edit chain is applied,
-- the materialised derived blob's artifact ref is stored here so the
-- source `audio_artifact_ref` remains untouched.
--
-- NULL means "no derived artifact yet — read from `audio_artifact_ref`".
-- DELETE /edit clears this column back to NULL (the source is canonical
-- again).
--
-- The column is opaque to the host (Constitution XIII + spec 036 FR-001).

ALTER TABLE ext_emotion_tts__voice_assets
    ADD COLUMN derived_artifact_ref TEXT;
