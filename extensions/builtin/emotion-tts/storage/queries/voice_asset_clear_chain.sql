UPDATE ext_emotion_tts__voice_assets
   SET edit_chain_json      = NULL,
       derived_artifact_ref = NULL,
       updated_at            = strftime('%s', 'now')
 WHERE voice_asset_id = ?
