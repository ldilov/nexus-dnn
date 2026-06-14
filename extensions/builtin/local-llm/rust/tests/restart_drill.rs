//! Spec 030 T087 / closes spec 029 deferred T061 — restart drill.
//!
//! Original drill: create thread → append user message → append assistant
//! message with sampler block → kill host → relaunch → reload, verify
//! everything survives byte-identical including the sampler audit data.
//!
//! This test reproduces it with a file-backed sqlite database: the pool
//! is closed (`pool.close().await`) to simulate the host shutting down,
//! then a fresh `ChatHistoryStoreSqlx` is constructed against the same
//! file and the rows are read back. If the migrations or the persistence
//! path lose any field, the assertions fail.
//!
//! No live host needed — the in-process pool is the same `SqlitePool`
//! the LLM extension uses in production via the dispatcher.

use async_trait::async_trait;
use nexus_local_llm_chat_history::chat_history::store_sqlx::ChatHistoryStoreSqlx;
use nexus_local_llm_chat_history::host_client::HostDeploymentsClient;
use nexus_local_llm_chat_history::ids::DeploymentId;
use nexus_local_llm_chat_history::{
    migrations, AppendMessageInput, ChatHistoryStore, CreateThreadInput, MessageRole, SamplerBlock,
    ThreadListFilter,
};
use sqlx::sqlite::SqliteConnectOptions;
use sqlx::SqlitePool;
use std::str::FromStr;
use std::sync::Arc;

#[derive(Default)]
struct StubHostClient;

#[async_trait]
impl HostDeploymentsClient for StubHostClient {
    async fn current_deployment(
        &self,
    ) -> nexus_local_llm_chat_history::Result<Option<DeploymentId>> {
        Ok(None)
    }
    async fn known_deployments(&self) -> nexus_local_llm_chat_history::Result<Vec<DeploymentId>> {
        Ok(Vec::new())
    }
}

async fn open_pool(path: &std::path::Path) -> SqlitePool {
    let url = format!(
        "sqlite://{}?mode=rwc",
        path.to_string_lossy().replace('\\', "/")
    );
    let opts = SqliteConnectOptions::from_str(&url)
        .expect("parse opts")
        .create_if_missing(true);
    let pool = SqlitePool::connect_with(opts)
        .await
        .expect("connect file db");
    migrations::apply_all(&pool).await.expect("migrations");
    pool
}

async fn make_store(pool: SqlitePool) -> Arc<dyn ChatHistoryStore> {
    let host_client: Arc<dyn HostDeploymentsClient> = Arc::new(StubHostClient);
    Arc::new(
        ChatHistoryStoreSqlx::new(pool, host_client)
            .await
            .expect("store init"),
    )
}

fn sampler_with_known_values() -> SamplerBlock {
    let mut s = SamplerBlock::default();
    s.temperature = 0.42;
    s.min_p = 0.05;
    s.top_k = 37;
    s.seed = 123456789;
    s.top_p = Some(0.91);
    s.repeat_penalty = Some(1.07);
    s
}

#[tokio::test(flavor = "multi_thread", worker_threads = 2)]
async fn restart_drill_state_survives_pool_close_and_reopen() {
    let tmp = tempfile::tempdir().expect("tempdir");
    let db_path = tmp.path().join("restart_drill.sqlite");

    let user_text = "what is the cube root of 729?";
    let assistant_text = "9 — three cubed is 27, nine cubed is 729.";
    let title = "restart drill — survival";
    let sampler = sampler_with_known_values();

    let (thread_id, user_msg_id, assistant_msg_id) = {
        let pool = open_pool(&db_path).await;
        let store = make_store(pool.clone()).await;

        let thread = store
            .create_thread(CreateThreadInput {
                deployment_id: None,
                install_id: None,
                title: Some(title.into()),
                system_prompt: Some("you are precise".into()),
                sampler_override: None,
            })
            .await
            .expect("create thread");

        let user_msg = store
            .append_message(
                &thread.thread_id,
                AppendMessageInput {
                    role: MessageRole::User,
                    content: user_text.into(),
                    sampler_effective: None,
                    is_partial: false,
                    retry_of_message_id: None,
                },
            )
            .await
            .expect("append user");

        let assistant_msg = store
            .append_message(
                &thread.thread_id,
                AppendMessageInput {
                    role: MessageRole::Assistant,
                    content: assistant_text.into(),
                    sampler_effective: Some(sampler.clone()),
                    is_partial: false,
                    retry_of_message_id: None,
                },
            )
            .await
            .expect("append assistant");

        pool.close().await;
        (
            thread.thread_id.clone(),
            user_msg.message_id.clone(),
            assistant_msg.message_id.clone(),
        )
    };

    let pool = open_pool(&db_path).await;
    let store = make_store(pool).await;

    let threads = store
        .list_threads(ThreadListFilter {
            deployment_id: None,
            exclude_unbound: false,
            before_updated_at: None,
            limit: 50,
        })
        .await
        .expect("list threads after restart");
    let thread = threads
        .threads
        .into_iter()
        .find(|t| t.thread_id == thread_id)
        .expect("thread survived restart");
    assert_eq!(thread.title.as_deref(), Some(title));
    assert_eq!(thread.title_resolved, title);

    let page = store
        .list_messages(&thread_id, None, 100)
        .await
        .expect("list messages after restart");
    assert_eq!(page.messages.len(), 2, "both messages survived");

    let user_back = page
        .messages
        .iter()
        .find(|m| m.message_id == user_msg_id)
        .expect("user message present");
    assert_eq!(user_back.content, user_text);
    assert_eq!(user_back.role, MessageRole::User);
    assert!(user_back.sampler_effective.is_none());

    let assistant_back = page
        .messages
        .iter()
        .find(|m| m.message_id == assistant_msg_id)
        .expect("assistant message present");
    assert_eq!(assistant_back.content, assistant_text);
    assert_eq!(assistant_back.role, MessageRole::Assistant);
    let recovered = assistant_back
        .sampler_effective
        .as_ref()
        .expect("assistant sampler block survived restart");
    assert_eq!(recovered.temperature, sampler.temperature);
    assert_eq!(recovered.min_p, sampler.min_p);
    assert_eq!(recovered.top_k, sampler.top_k);
    assert_eq!(recovered.seed, sampler.seed);
    assert_eq!(recovered.top_p, sampler.top_p);
    assert_eq!(recovered.repeat_penalty, sampler.repeat_penalty);
}
