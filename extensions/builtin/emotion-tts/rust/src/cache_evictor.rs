use std::sync::Arc;
use std::time::Duration;

use tokio::task::JoinHandle;
use tokio::time::{interval, MissedTickBehavior};
use tokio_util::sync::CancellationToken;

use crate::domain::ContentHash;
use crate::storage::repo_traits::SynthesisCacheRepo;

pub const DEFAULT_BUDGET_BYTES: i64 = 10 * 1024 * 1024 * 1024;
pub const DEFAULT_INTERVAL: Duration = Duration::from_secs(5 * 60);

#[derive(Debug, Clone, Copy)]
pub struct EvictorConfig {
    pub budget_bytes: i64,
    pub interval: Duration,
}

impl Default for EvictorConfig {
    fn default() -> Self {
        Self {
            budget_bytes: DEFAULT_BUDGET_BYTES,
            interval: DEFAULT_INTERVAL,
        }
    }
}

pub async fn evict_once(
    cache: &dyn SynthesisCacheRepo,
    budget_bytes: i64,
) -> crate::domain::Result<Vec<ContentHash>> {
    let total = cache.total_size_bytes().await?;
    if total <= budget_bytes {
        return Ok(Vec::new());
    }
    let to_free = total - budget_bytes;
    cache.evict_lru(to_free).await
}

pub fn spawn(
    cache: Arc<dyn SynthesisCacheRepo>,
    config: EvictorConfig,
    shutdown: CancellationToken,
) -> JoinHandle<()> {
    tokio::spawn(async move {
        let mut ticker = interval(config.interval);
        ticker.set_missed_tick_behavior(MissedTickBehavior::Skip);
        ticker.tick().await;
        loop {
            tokio::select! {
                _ = shutdown.cancelled() => break,
                _ = ticker.tick() => {
                    match evict_once(cache.as_ref(), config.budget_bytes).await {
                        Ok(victims) if !victims.is_empty() => {
                            tracing::info!(
                                evicted = victims.len(),
                                budget_bytes = config.budget_bytes,
                                "synthesis cache LRU eviction"
                            );
                        }
                        Ok(_) => {}
                        Err(err) => {
                            tracing::warn!(error = %err, "synthesis cache eviction failed");
                        }
                    }
                }
            }
        }
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use async_trait::async_trait;
    use std::sync::Mutex;

    use crate::domain::EmotionTtsError;
    use crate::storage::repo_traits::{RepoResult, SynthesisCacheRow};

    #[derive(Default)]
    struct FakeCache {
        total: Mutex<i64>,
        last_target: Mutex<Option<i64>>,
        victims: Mutex<Vec<ContentHash>>,
    }

    #[async_trait]
    impl SynthesisCacheRepo for FakeCache {
        async fn get(&self, _hash: &ContentHash) -> RepoResult<Option<SynthesisCacheRow>> {
            Ok(None)
        }
        async fn lookup_many(
            &self,
            hashes: &[ContentHash],
        ) -> RepoResult<Vec<Option<SynthesisCacheRow>>> {
            Ok(hashes.iter().map(|_| None).collect())
        }
        async fn insert(&self, _row: &SynthesisCacheRow) -> RepoResult<()> {
            Ok(())
        }
        async fn record_hit(&self, _hash: &ContentHash, _at: i64) -> RepoResult<()> {
            Ok(())
        }
        async fn total_size_bytes(&self) -> RepoResult<i64> {
            Ok(*self.total.lock().unwrap())
        }
        async fn evict_lru(&self, target_bytes: i64) -> RepoResult<Vec<ContentHash>> {
            *self.last_target.lock().unwrap() = Some(target_bytes);
            let v = self.victims.lock().unwrap().clone();
            Ok(v)
        }
    }

    #[tokio::test]
    async fn evict_once_is_noop_when_under_budget() {
        let cache = FakeCache::default();
        *cache.total.lock().unwrap() = 500;
        let victims = evict_once(&cache, 1000).await.unwrap();
        assert!(victims.is_empty());
        assert!(cache.last_target.lock().unwrap().is_none());
    }

    #[tokio::test]
    async fn evict_once_asks_to_free_overage_when_over_budget() {
        let cache = FakeCache::default();
        *cache.total.lock().unwrap() = 1_500;
        let h = ContentHash::from_hex("a".repeat(64)).unwrap();
        *cache.victims.lock().unwrap() = vec![h.clone()];

        let victims = evict_once(&cache, 1_000).await.unwrap();
        assert_eq!(victims.len(), 1);
        assert_eq!(*cache.last_target.lock().unwrap(), Some(500));
    }

    #[tokio::test]
    async fn evict_once_propagates_repo_errors() {
        struct FailCache;

        #[async_trait]
        impl SynthesisCacheRepo for FailCache {
            async fn get(&self, _: &ContentHash) -> RepoResult<Option<SynthesisCacheRow>> {
                Err(EmotionTtsError::internal("boom"))
            }
            async fn lookup_many(
                &self,
                hashes: &[ContentHash],
            ) -> RepoResult<Vec<Option<SynthesisCacheRow>>> {
                Ok(hashes.iter().map(|_| None).collect())
            }
            async fn insert(&self, _: &SynthesisCacheRow) -> RepoResult<()> {
                Ok(())
            }
            async fn record_hit(&self, _: &ContentHash, _: i64) -> RepoResult<()> {
                Ok(())
            }
            async fn total_size_bytes(&self) -> RepoResult<i64> {
                Err(EmotionTtsError::internal("boom"))
            }
            async fn evict_lru(&self, _: i64) -> RepoResult<Vec<ContentHash>> {
                Ok(Vec::new())
            }
        }

        let err = evict_once(&FailCache, 1_000).await.unwrap_err();
        assert_eq!(err.status_code(), 500);
    }
}
