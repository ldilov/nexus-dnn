-- Phase 1 (storyboard queue → Generate): optional prebuilt segment list.
-- When non-NULL, the dispatcher synthesises these segments verbatim
-- (text + voice_asset_id + emotion) and skips script parsing + character→voice
-- mapping resolution. NULL = the legacy script-snapshot path (unchanged).
ALTER TABLE ext_emotion_tts__runs
    ADD COLUMN prebuilt_segments_json TEXT;
