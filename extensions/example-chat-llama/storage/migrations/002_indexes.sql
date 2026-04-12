CREATE INDEX IF NOT EXISTS {{prefix}}idx_threads_updated_at
ON {{prefix}}threads(updated_at);

CREATE INDEX IF NOT EXISTS {{prefix}}idx_messages_thread_created_at
ON {{prefix}}messages(thread_id, created_at);

CREATE INDEX IF NOT EXISTS {{prefix}}idx_messages_status
ON {{prefix}}messages(status);

CREATE INDEX IF NOT EXISTS {{prefix}}idx_attachments_message_id
ON {{prefix}}message_attachments(message_id);
