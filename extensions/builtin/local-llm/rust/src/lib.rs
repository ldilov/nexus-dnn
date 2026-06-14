#![deny(rust_2018_idioms, unsafe_code)]

pub mod chat;
pub mod chat_history;
pub mod error;
pub mod host_client;
pub mod ids;
pub mod register;
pub mod router;

pub use chat::{
    build_chat_router, ChatHandlerResources, InferenceCancelRegistry, LoadState, ModelLoadRegistry,
};
pub use register::{LocalLlmProviderResources, LocalLlmRouterProvider, EXTENSION_ID};

pub use chat_history::{
    migrations,
    model::{ChatMessage, ChatThread, MessageRole, SamplerBlock, SamplerOverride},
    sampler_merge::merge_sampler,
    schema_version::{
        assert_compatible, classify_mode, read_stored_version, StoreMode, BUNDLED_SCHEMA_VERSION,
    },
    store_sqlx::ChatHistoryStoreSqlx,
    title_autoderive::derive_title,
    AppendMessageInput, ChatHistoryStore, CreateThreadInput, MessageListPage, PatchThreadInput,
    ThreadListFilter, ThreadListPage,
};
pub use error::{ChatHistoryError, Result};
pub use host_client::{HostDeploymentsClient, HttpHostDeploymentsClient};
pub use ids::{DeploymentId, InstallId, MessageId, ThreadId};
pub use router::build_router;
