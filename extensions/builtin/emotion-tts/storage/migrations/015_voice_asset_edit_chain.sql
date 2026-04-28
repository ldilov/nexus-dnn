-- 015_voice_asset_edit_chain.sql
--
-- Spec 036 — adds a nullable `edit_chain_json` column to
-- `ext_emotion_tts__voice_assets`. The column stores a declarative chain of
-- audio-edit operations (trim/crop/normalize/speed/fade/mute) applied to the
-- voice asset's source audio. NULL means "no chain — use source directly".
--
-- The chain JSON is opaque to the host (Constitution XIII + spec 036 FR-001).
-- Schema evolution of the chain shape happens entirely inside the extension.

ALTER TABLE ext_emotion_tts__voice_assets
    ADD COLUMN edit_chain_json TEXT;
