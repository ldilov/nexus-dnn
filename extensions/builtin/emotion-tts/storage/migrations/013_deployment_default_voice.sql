-- 013_deployment_default_voice.sql
-- Adds a nullable default_voice_asset_id to deployments. When set, the
-- recipe page's Quick-mode toggle uses this voice for every parsed
-- utterance regardless of character — see G3 for the parser fallback.
ALTER TABLE ext_emotion_tts__deployments
  ADD COLUMN default_voice_asset_id TEXT NULL
  REFERENCES ext_emotion_tts__voice_assets(voice_asset_id) ON DELETE SET NULL;
