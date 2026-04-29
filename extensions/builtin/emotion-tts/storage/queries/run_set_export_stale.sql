UPDATE ext_emotion_tts__runs
   SET export_zip_stale_at = ?
 WHERE run_id = ?
