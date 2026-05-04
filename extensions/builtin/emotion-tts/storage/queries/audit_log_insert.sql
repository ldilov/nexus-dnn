INSERT INTO ext_emotion_tts__audio_edit_log (
    entry_id,
    deployment_id,
    target_id,
    target_kind,
    digest_before,
    digest_after,
    operation_count,
    recorded_at,
    actor,
    chain_snapshot_json
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
