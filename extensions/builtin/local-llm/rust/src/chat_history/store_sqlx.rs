use super::model::{ChatMessage, ChatThread, MessageRole, SamplerBlock, SamplerOverride};
use super::schema_version::{classify_mode, read_stored_version, StoreMode, BUNDLED_SCHEMA_VERSION};
use super::title_autoderive::derive_title;
use super::{
    AppendMessageInput, ChatHistoryStore, CreateThreadInput, MessageListPage, PatchThreadInput,
    ThreadListFilter, ThreadListPage,
};
use crate::error::{ChatHistoryError, Result};
use crate::host_client::HostDeploymentsClient;
use crate::ids::{DeploymentId, InstallId, MessageId, ThreadId};
use async_trait::async_trait;
use chrono::{DateTime, Utc};
use sqlx::{Row, SqlitePool};
use std::sync::Arc;

pub struct ChatHistoryStoreSqlx {
    pool: SqlitePool,
    host: Arc<dyn HostDeploymentsClient>,
    mode: StoreMode,
}

impl ChatHistoryStoreSqlx {
    pub async fn new(pool: SqlitePool, host: Arc<dyn HostDeploymentsClient>) -> Result<Self> {
        let stored = read_stored_version(&pool).await?;
        let mode = classify_mode(stored, BUNDLED_SCHEMA_VERSION);
        Ok(Self { pool, host, mode })
    }

    pub fn mode(&self) -> StoreMode {
        self.mode
    }

    fn require_write(&self) -> Result<()> {
        if self.mode == StoreMode::ReadOnly {
            let stored = 0;
            return Err(ChatHistoryError::SchemaVersionMismatch {
                stored,
                bundled: BUNDLED_SCHEMA_VERSION,
            });
        }
        Ok(())
    }
}

fn ts_now() -> String {
    Utc::now().to_rfc3339()
}

fn parse_ts(s: &str) -> DateTime<Utc> {
    DateTime::parse_from_rfc3339(s)
        .map(|dt| dt.with_timezone(&Utc))
        .unwrap_or_else(|_| Utc::now())
}

fn parse_sampler_override(raw: Option<&str>) -> Result<Option<SamplerOverride>> {
    match raw {
        None => Ok(None),
        Some(s) if s.is_empty() => Ok(None),
        Some(s) => serde_json::from_str::<SamplerOverride>(s)
            .map(Some)
            .map_err(ChatHistoryError::from),
    }
}

fn parse_sampler_block(raw: Option<&str>) -> Result<Option<SamplerBlock>> {
    match raw {
        None => Ok(None),
        Some(s) if s.is_empty() => Ok(None),
        Some(s) => serde_json::from_str::<SamplerBlock>(s)
            .map(Some)
            .map_err(ChatHistoryError::from),
    }
}

fn row_to_thread(
    id: String,
    title: Option<String>,
    title_auto: Option<String>,
    system_prompt: Option<String>,
    deployment_id: Option<String>,
    install_id: Option<String>,
    sampler_override_raw: Option<String>,
    created_at: String,
    updated_at: String,
) -> Result<ChatThread> {
    let sampler_override = parse_sampler_override(sampler_override_raw.as_deref())?;
    let title_resolved = ChatThread::resolve_title(title.as_deref(), title_auto.as_deref());
    let is_unbound = deployment_id.is_none();
    Ok(ChatThread {
        thread_id: ThreadId::new(id),
        extension_id: "nexus.local-llm".to_owned(),
        deployment_id: deployment_id.map(DeploymentId::new),
        install_id: install_id.map(InstallId::new),
        title,
        title_auto,
        title_resolved,
        system_prompt,
        sampler_override,
        is_unbound,
        created_at: parse_ts(&created_at),
        updated_at: parse_ts(&updated_at),
    })
}

#[async_trait]
impl ChatHistoryStore for ChatHistoryStoreSqlx {
    async fn create_thread(&self, input: CreateThreadInput) -> Result<ChatThread> {
        self.require_write()?;
        let thread_id = ThreadId::new_random();
        let now = ts_now();
        let sampler_override_json = input
            .sampler_override
            .as_ref()
            .map(serde_json::to_string)
            .transpose()?;

        sqlx::query(
            "INSERT INTO ext_local_llm_chat_threads
                (id, title, system_prompt, message_count, created_at, updated_at,
                 deployment_id, install_id, sampler_override, title_auto)
             VALUES (?, ?, ?, 0, ?, ?, ?, ?, ?, NULL)",
        )
        .bind(thread_id.as_str())
        .bind(&input.title)
        .bind(&input.system_prompt)
        .bind(&now)
        .bind(&now)
        .bind(input.deployment_id.as_ref().map(|d| d.as_str()))
        .bind(input.install_id.as_ref().map(|i| i.as_str()))
        .bind(sampler_override_json.as_deref())
        .execute(&self.pool)
        .await?;

        self.get_thread(&thread_id).await
    }

    async fn get_thread(&self, thread_id: &ThreadId) -> Result<ChatThread> {
        let row = sqlx::query(
            "SELECT id, title, title_auto, system_prompt, deployment_id, install_id,
                    sampler_override, created_at, updated_at
             FROM ext_local_llm_chat_threads WHERE id = ?",
        )
        .bind(thread_id.as_str())
        .fetch_optional(&self.pool)
        .await?
        .ok_or_else(|| ChatHistoryError::NotFound(format!("thread {thread_id}")))?;

        row_to_thread(
            row.try_get("id")?,
            row.try_get("title")?,
            row.try_get("title_auto")?,
            row.try_get("system_prompt")?,
            row.try_get("deployment_id")?,
            row.try_get("install_id")?,
            row.try_get("sampler_override")?,
            row.try_get("created_at")?,
            row.try_get("updated_at")?,
        )
    }

    async fn list_threads(&self, filter: ThreadListFilter) -> Result<ThreadListPage> {
        let limit = if filter.limit == 0 { 50 } else { filter.limit.min(200) };
        let fetch_limit = (limit as i64) + 1;

        let mut query_str = String::from(
            "SELECT id, title, title_auto, system_prompt, deployment_id, install_id,
                    sampler_override, created_at, updated_at
             FROM ext_local_llm_chat_threads WHERE 1=1",
        );

        if let Some(ref dep) = filter.deployment_id {
            if filter.exclude_unbound {
                query_str.push_str(" AND deployment_id = ?");
            } else {
                query_str.push_str(" AND (deployment_id = ? OR deployment_id IS NULL)");
            }
            let _ = dep;
        } else if filter.exclude_unbound {
            query_str.push_str(" AND deployment_id IS NOT NULL");
        } else {
            query_str.push_str(" AND deployment_id IS NULL");
        }

        if filter.before_updated_at.is_some() {
            query_str.push_str(" AND updated_at < ?");
        }
        query_str.push_str(" ORDER BY updated_at DESC LIMIT ?");

        let mut q = sqlx::query(&query_str);
        if let Some(ref dep) = filter.deployment_id {
            q = q.bind(dep.as_str());
        }
        if let Some(ref before) = filter.before_updated_at {
            q = q.bind(before.to_rfc3339());
        }
        q = q.bind(fetch_limit);

        let rows = q.fetch_all(&self.pool).await?;
        let mut threads = Vec::with_capacity(rows.len());
        for row in rows.iter().take(limit as usize) {
            threads.push(row_to_thread(
                row.try_get("id")?,
                row.try_get("title")?,
                row.try_get("title_auto")?,
                row.try_get("system_prompt")?,
                row.try_get("deployment_id")?,
                row.try_get("install_id")?,
                row.try_get("sampler_override")?,
                row.try_get("created_at")?,
                row.try_get("updated_at")?,
            )?);
        }
        let has_more = rows.len() > limit as usize;
        let next_before_updated_at = if has_more {
            threads.last().map(|t| t.updated_at)
        } else {
            None
        };
        Ok(ThreadListPage {
            threads,
            has_more,
            next_before_updated_at,
        })
    }

    async fn patch_thread(
        &self,
        thread_id: &ThreadId,
        patch: PatchThreadInput,
    ) -> Result<ChatThread> {
        self.require_write()?;
        let _ = self.get_thread(thread_id).await?;

        let mut any_change = false;

        if let Some(title) = patch.title.as_deref() {
            sqlx::query("UPDATE ext_local_llm_chat_threads SET title = ?, updated_at = ? WHERE id = ?")
                .bind(title)
                .bind(ts_now())
                .bind(thread_id.as_str())
                .execute(&self.pool)
                .await?;
            any_change = true;
        }

        if patch.clear_sampler_override {
            sqlx::query(
                "UPDATE ext_local_llm_chat_threads SET sampler_override = NULL, updated_at = ? WHERE id = ?",
            )
            .bind(ts_now())
            .bind(thread_id.as_str())
            .execute(&self.pool)
            .await?;
            any_change = true;
        } else if let Some(ref ov) = patch.sampler_override {
            let json = serde_json::to_string(ov)?;
            sqlx::query(
                "UPDATE ext_local_llm_chat_threads SET sampler_override = ?, updated_at = ? WHERE id = ?",
            )
            .bind(&json)
            .bind(ts_now())
            .bind(thread_id.as_str())
            .execute(&self.pool)
            .await?;
            any_change = true;
        }

        if patch.attach_to_current_deployment {
            let current = self
                .host
                .current_deployment()
                .await?
                .ok_or_else(|| ChatHistoryError::Conflict("no deployment currently bound".into()))?;
            sqlx::query(
                "UPDATE ext_local_llm_chat_threads SET deployment_id = ?, updated_at = ? WHERE id = ?",
            )
            .bind(current.as_str())
            .bind(ts_now())
            .bind(thread_id.as_str())
            .execute(&self.pool)
            .await?;
            any_change = true;
        }

        let _ = any_change;
        self.get_thread(thread_id).await
    }

    async fn delete_thread(&self, thread_id: &ThreadId) -> Result<()> {
        self.require_write()?;
        let mut tx = self.pool.begin().await?;
        let res = sqlx::query("DELETE FROM ext_local_llm_chat_messages WHERE thread_id = ?")
            .bind(thread_id.as_str())
            .execute(&mut *tx)
            .await?;
        let _ = res;
        let thread_res = sqlx::query("DELETE FROM ext_local_llm_chat_threads WHERE id = ?")
            .bind(thread_id.as_str())
            .execute(&mut *tx)
            .await?;
        if thread_res.rows_affected() == 0 {
            return Err(ChatHistoryError::NotFound(format!("thread {thread_id}")));
        }
        tx.commit().await?;
        Ok(())
    }

    async fn append_message(
        &self,
        thread_id: &ThreadId,
        input: AppendMessageInput,
    ) -> Result<ChatMessage> {
        self.require_write()?;

        match (input.role, &input.sampler_effective) {
            (MessageRole::Assistant, None) => {
                return Err(ChatHistoryError::ValidationFailed(
                    "assistant messages MUST carry sampler_effective".into(),
                ));
            }
            (MessageRole::User | MessageRole::System, Some(_)) => {
                return Err(ChatHistoryError::ValidationFailed(
                    "user/system messages MUST NOT carry sampler_effective".into(),
                ));
            }
            _ => {}
        }

        let mut tx = self.pool.begin().await?;

        let exists: Option<(String,)> =
            sqlx::query_as("SELECT id FROM ext_local_llm_chat_threads WHERE id = ?")
                .bind(thread_id.as_str())
                .fetch_optional(&mut *tx)
                .await?;
        if exists.is_none() {
            return Err(ChatHistoryError::NotFound(format!("thread {thread_id}")));
        }

        let next_ordinal: i64 = sqlx::query_scalar(
            "SELECT COALESCE(MAX(ordinal) + 1, 0) FROM ext_local_llm_chat_messages WHERE thread_id = ?",
        )
        .bind(thread_id.as_str())
        .fetch_one(&mut *tx)
        .await?;

        let message_id = MessageId::new_random();
        let now = ts_now();
        let sampler_effective_json = input
            .sampler_effective
            .as_ref()
            .map(serde_json::to_string)
            .transpose()?;

        sqlx::query(
            "INSERT INTO ext_local_llm_chat_messages
                (id, thread_id, ordinal, role, content_text, metadata_json,
                 retry_of_message_id, is_partial, created_at, sampler_effective)
             VALUES (?, ?, ?, ?, ?, NULL, ?, ?, ?, ?)",
        )
        .bind(message_id.as_str())
        .bind(thread_id.as_str())
        .bind(next_ordinal)
        .bind(input.role.as_db_str())
        .bind(&input.content)
        .bind(input.retry_of_message_id.as_ref().map(|m| m.as_str()))
        .bind(if input.is_partial { 1_i64 } else { 0_i64 })
        .bind(&now)
        .bind(sampler_effective_json.as_deref())
        .execute(&mut *tx)
        .await?;

        if next_ordinal == 0 && input.role == MessageRole::User {
            let auto = derive_title(&input.content);
            sqlx::query(
                "UPDATE ext_local_llm_chat_threads
                 SET title_auto = COALESCE(title_auto, ?), updated_at = ?
                 WHERE id = ?",
            )
            .bind(&auto)
            .bind(&now)
            .bind(thread_id.as_str())
            .execute(&mut *tx)
            .await?;
        } else {
            sqlx::query(
                "UPDATE ext_local_llm_chat_threads SET updated_at = ? WHERE id = ?",
            )
            .bind(&now)
            .bind(thread_id.as_str())
            .execute(&mut *tx)
            .await?;
        }

        tx.commit().await?;

        Ok(ChatMessage {
            message_id,
            thread_id: thread_id.clone(),
            ordinal: next_ordinal as u32,
            role: input.role,
            content: input.content,
            sampler_effective: input.sampler_effective,
            is_partial: input.is_partial,
            retry_of_message_id: input.retry_of_message_id,
            created_at: parse_ts(&now),
        })
    }

    async fn list_messages(
        &self,
        thread_id: &ThreadId,
        after_ordinal: Option<u32>,
        limit: u32,
    ) -> Result<MessageListPage> {
        let limit = if limit == 0 { 100 } else { limit.min(500) };
        let fetch_limit = (limit as i64) + 1;

        let rows = sqlx::query(
            "SELECT id, thread_id, ordinal, role, content_text, sampler_effective,
                    is_partial, retry_of_message_id, created_at
             FROM ext_local_llm_chat_messages
             WHERE thread_id = ? AND ordinal > ?
             ORDER BY ordinal ASC LIMIT ?",
        )
        .bind(thread_id.as_str())
        .bind(after_ordinal.map(|n| n as i64).unwrap_or(-1))
        .bind(fetch_limit)
        .fetch_all(&self.pool)
        .await?;

        let take = rows.iter().take(limit as usize);
        let mut messages = Vec::new();
        for row in take {
            let role_str: String = row.try_get("role")?;
            let role = MessageRole::from_db_str(&role_str).ok_or_else(|| {
                ChatHistoryError::ValidationFailed(format!("unknown role: {role_str}"))
            })?;
            let sampler_effective_raw: Option<String> = row.try_get("sampler_effective")?;
            let ordinal: i64 = row.try_get("ordinal")?;
            let is_partial: i64 = row.try_get("is_partial")?;
            messages.push(ChatMessage {
                message_id: MessageId::new(row.try_get::<String, _>("id")?),
                thread_id: ThreadId::new(row.try_get::<String, _>("thread_id")?),
                ordinal: ordinal as u32,
                role,
                content: row.try_get("content_text")?,
                sampler_effective: parse_sampler_block(sampler_effective_raw.as_deref())?,
                is_partial: is_partial != 0,
                retry_of_message_id: row
                    .try_get::<Option<String>, _>("retry_of_message_id")?
                    .map(MessageId::new),
                created_at: parse_ts(&row.try_get::<String, _>("created_at")?),
            });
        }
        let has_more = rows.len() > limit as usize;
        let next_after_ordinal = if has_more {
            messages.last().map(|m| m.ordinal)
        } else {
            None
        };
        Ok(MessageListPage {
            messages,
            has_more,
            next_after_ordinal,
        })
    }
}
