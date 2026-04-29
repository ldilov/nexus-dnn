UPDATE ext_emotion_tts__voice_assets
   SET edit_chain_json     = ?,
       derived_artifact_ref = ?,
       updated_at           = strftime('%s', 'now')
 WHERE voice_asset_id = ?
