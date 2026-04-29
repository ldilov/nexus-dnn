SELECT entry_id,
       deployment_id,
       target_id,
       target_kind,
       digest_before,
       digest_after,
       operation_count,
       recorded_at,
       actor
  FROM ext_emotion_tts__audio_edit_log
 WHERE deployment_id = ?
   AND target_kind   = ?
   AND target_id     = ?
 ORDER BY recorded_at DESC, entry_id DESC
 LIMIT ?
