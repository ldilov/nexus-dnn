use nexus_local_llm_chat_history::chat_history::migrations;
use nexus_local_llm_chat_history::host_client::HostDeploymentsClient;
use nexus_local_llm_chat_history::{
    ChatHistoryStore, ChatHistoryStoreSqlx, DeploymentId, Result, SamplerBlock,
};
use sqlx::SqlitePool;
use std::sync::{Arc, Mutex};

pub struct TestDb {
    pub pool: SqlitePool,
}

impl TestDb {
    pub async fn fresh() -> Self {
        let pool = SqlitePool::connect("sqlite::memory:").await.unwrap();
        migrations::apply_all(&pool).await.unwrap();
        Self { pool }
    }
}

pub struct MockHost {
    state: Arc<Mutex<MockState>>,
}

#[derive(Default, Clone)]
struct MockState {
    current: Option<DeploymentId>,
    known: Vec<DeploymentId>,
}

impl MockHost {
    pub fn new() -> Arc<Self> {
        Arc::new(Self {
            state: Arc::new(Mutex::new(MockState::default())),
        })
    }

    pub fn set_current(&self, current: Option<DeploymentId>) {
        self.state.lock().unwrap().current = current;
    }

    pub fn set_known(&self, known: Vec<DeploymentId>) {
        self.state.lock().unwrap().known = known;
    }
}

#[async_trait::async_trait]
impl HostDeploymentsClient for MockHost {
    async fn current_deployment(&self) -> Result<Option<DeploymentId>> {
        Ok(self.state.lock().unwrap().current.clone())
    }
    async fn known_deployments(&self) -> Result<Vec<DeploymentId>> {
        Ok(self.state.lock().unwrap().known.clone())
    }
}

pub async fn make_store() -> (ChatHistoryStoreSqlx, Arc<MockHost>, SqlitePool) {
    let db = TestDb::fresh().await;
    let host = MockHost::new();
    let store = ChatHistoryStoreSqlx::new(db.pool.clone(), host.clone())
        .await
        .unwrap();
    (store, host, db.pool)
}

pub fn sample_sampler_block(seed: i64) -> SamplerBlock {
    SamplerBlock::new(0.7, 0.05, 64, seed).with_top_p(0.95)
}

pub async fn assert_store<S: ChatHistoryStore>(_s: &S) {}
