pub mod chat_turn;
pub mod embed_text;
pub mod output_persist;
pub mod prompt_compose;
pub mod rag_retrieve;

use std::sync::Arc;

use reqwest::Client;

use crate::host_rpc::HostClient;
use crate::pool::RuntimePool;

#[derive(Clone)]
pub struct OperatorCtx {
    pub host: HostClient,
    pub pool: Arc<RuntimePool>,
    pub http: Client,
}

impl OperatorCtx {
    pub fn new(host: HostClient, pool: Arc<RuntimePool>) -> Self {
        Self {
            host,
            pool,
            http: crate::proxy::build_client(),
        }
    }
}
