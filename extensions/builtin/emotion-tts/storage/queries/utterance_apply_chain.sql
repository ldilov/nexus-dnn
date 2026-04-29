UPDATE ext_emotion_tts__utterances
   SET edit_chain_json      = ?,
       derived_artifact_ref = ?,
       updated_at            = strftime('%s', 'now')
 WHERE utterance_id = ?
