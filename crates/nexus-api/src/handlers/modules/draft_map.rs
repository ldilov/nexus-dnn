//! Short-TTL idempotency map for `POST /modules/user:draft:{uuid}/materialize`
//! (FR-BM04, contracts/draft-materialize.md §5).
//!
//! Keys are the client-minted draft UUIDs (kept as their string form so the
//! map is agnostic to UUID-crate version). Values capture the durable ids
//! produced by the first successful materialize plus the body hash that
//! created them, so a replay with the same body returns the cached ids
//! (HTTP 200) and a replay with a different body returns 409.
//!
//! The map is process-local — never persisted (FR-BM04 explicit) — and a
//! background task sweeps expired entries every 60 s. Dropping the map
//! aborts the sweeper.

use std::collections::HashMap;
use std::sync::Arc;
use std::time::Duration;

use tokio::sync::RwLock;
use tokio::task::JoinHandle;
use tokio::time::Instant;

const TTL: Duration = Duration::from_secs(10 * 60);
const SWEEP_INTERVAL: Duration = Duration::from_secs(60);

#[derive(Clone, Debug)]
pub struct DraftEntry {
    pub workflow_id: String,
    pub deployment_id: String,
    pub deployment_revision_id: String,
    pub body_hash: [u8; 32],
    pub created_at: Instant,
}

pub struct DraftMaterializeMap {
    entries: Arc<RwLock<HashMap<String, DraftEntry>>>,
    sweeper: JoinHandle<()>,
}

impl DraftMaterializeMap {
    pub fn new() -> Arc<Self> {
        let entries: Arc<RwLock<HashMap<String, DraftEntry>>> = Arc::new(RwLock::new(HashMap::new()));
        let entries_for_sweeper = Arc::clone(&entries);
        let sweeper = tokio::spawn(async move {
            loop {
                tokio::time::sleep(SWEEP_INTERVAL).await;
                let now = Instant::now();
                let mut guard = entries_for_sweeper.write().await;
                guard.retain(|_, entry| now.duration_since(entry.created_at) < TTL);
            }
        });
        Arc::new(Self { entries, sweeper })
    }

    pub async fn lookup(&self, uuid: &str) -> Option<DraftEntry> {
        let guard = self.entries.read().await;
        guard.get(uuid).cloned()
    }

    pub async fn insert(&self, uuid: String, entry: DraftEntry) {
        let mut guard = self.entries.write().await;
        guard.insert(uuid, entry);
    }

    pub fn ttl(&self) -> Duration {
        TTL
    }
}

impl Drop for DraftMaterializeMap {
    fn drop(&mut self) {
        self.sweeper.abort();
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn fake_entry(uuid_seed: u8) -> DraftEntry {
        DraftEntry {
            workflow_id: format!("wfl_{uuid_seed:02x}"),
            deployment_id: format!("dep_{uuid_seed:02x}"),
            deployment_revision_id: format!("rev_{uuid_seed:02x}"),
            body_hash: [uuid_seed; 32],
            created_at: Instant::now(),
        }
    }

    #[tokio::test]
    async fn insert_and_lookup_roundtrip() {
        let map = DraftMaterializeMap::new();
        let uuid = "abcdef12-3456-4789-8abc-def012345678";
        map.insert(uuid.into(), fake_entry(7)).await;
        let found = map.lookup(uuid).await.expect("entry should be present");
        assert_eq!(found.workflow_id, "wfl_07");
        assert_eq!(found.body_hash, [7u8; 32]);
    }

    #[tokio::test]
    async fn missing_uuid_returns_none() {
        let map = DraftMaterializeMap::new();
        assert!(map.lookup("not-present").await.is_none());
    }

    #[tokio::test]
    async fn drop_aborts_sweeper() {
        let map = DraftMaterializeMap::new();
        let handle_aborted = map.sweeper.abort_handle();
        drop(map);
        // Give the runtime a tick to observe the abort.
        tokio::task::yield_now().await;
        assert!(handle_aborted.is_finished());
    }
}
