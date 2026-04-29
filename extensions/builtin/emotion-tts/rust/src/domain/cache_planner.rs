use std::sync::Arc;

use serde::{Deserialize, Serialize};

use crate::domain::cache_key::{self, CacheKeyInput};
use crate::domain::{ContentHash, Result, RunId};
use crate::storage::repo_traits::SynthesisCacheRepo;

#[derive(Debug, Clone, Copy, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum CachePolicy {
    UseCache,
    ForceRegenerate,
    ReadOnlyCache,
}

impl CachePolicy {
    #[must_use]
    pub fn from_wire(raw: &str) -> Option<Self> {
        match raw {
            "use_cache" => Some(Self::UseCache),
            "force_regenerate" => Some(Self::ForceRegenerate),
            "read_only_cache" => Some(Self::ReadOnlyCache),
            _ => None,
        }
    }

    #[must_use]
    pub const fn as_str(self) -> &'static str {
        match self {
            Self::UseCache => "use_cache",
            Self::ForceRegenerate => "force_regenerate",
            Self::ReadOnlyCache => "read_only_cache",
        }
    }

    #[must_use]
    pub const fn reads_cache(self) -> bool {
        matches!(self, Self::UseCache | Self::ReadOnlyCache)
    }

    #[must_use]
    pub const fn writes_cache(self) -> bool {
        matches!(self, Self::UseCache | Self::ForceRegenerate)
    }
}

#[derive(Debug, Clone, PartialEq)]
pub struct PlannedHit<S> {
    pub segment: S,
    pub content_hash: ContentHash,
    pub cached_artifact_ref: String,
    pub source_run_id: Option<RunId>,
}

#[derive(Debug, Clone, PartialEq)]
pub struct PlannedMiss<S> {
    pub segment: S,
    pub content_hash: ContentHash,
}

#[derive(Debug, Clone, PartialEq)]
pub struct CachePlan<S> {
    pub hits: Vec<PlannedHit<S>>,
    pub misses: Vec<PlannedMiss<S>>,
}

impl<S> CachePlan<S> {
    #[must_use]
    pub fn total(&self) -> usize {
        self.hits.len() + self.misses.len()
    }

    #[must_use]
    pub fn hit_ratio(&self) -> f64 {
        let total = self.total();
        if total == 0 {
            return 0.0;
        }
        self.hits.len() as f64 / total as f64
    }
}

pub async fn plan<S>(
    cache: Arc<dyn SynthesisCacheRepo>,
    policy: CachePolicy,
    candidates: Vec<(S, CacheKeyInput)>,
) -> Result<CachePlan<S>> {
    let mut hits = Vec::new();
    let mut misses = Vec::new();

    for (segment, key_input) in candidates {
        let content_hash = cache_key::build(&key_input)?;
        if !policy.reads_cache() {
            misses.push(PlannedMiss {
                segment,
                content_hash,
            });
            continue;
        }
        match cache.get(&content_hash).await? {
            Some(row) => hits.push(PlannedHit {
                segment,
                content_hash,
                cached_artifact_ref: row.audio_artifact_ref,
                source_run_id: None,
            }),
            None => misses.push(PlannedMiss {
                segment,
                content_hash,
            }),
        }
    }

    Ok(CachePlan { hits, misses })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn cache_policy_reads_and_writes_matrix() {
        assert!(CachePolicy::UseCache.reads_cache());
        assert!(CachePolicy::UseCache.writes_cache());

        assert!(!CachePolicy::ForceRegenerate.reads_cache());
        assert!(CachePolicy::ForceRegenerate.writes_cache());

        assert!(CachePolicy::ReadOnlyCache.reads_cache());
        assert!(!CachePolicy::ReadOnlyCache.writes_cache());
    }

    #[test]
    fn from_wire_round_trips_all_variants() {
        for policy in [
            CachePolicy::UseCache,
            CachePolicy::ForceRegenerate,
            CachePolicy::ReadOnlyCache,
        ] {
            assert_eq!(CachePolicy::from_wire(policy.as_str()), Some(policy));
        }
        assert!(CachePolicy::from_wire("garbage").is_none());
    }

    #[test]
    fn cache_plan_counts_and_ratio() {
        let plan: CachePlan<()> = CachePlan {
            hits: vec![],
            misses: vec![],
        };
        assert_eq!(plan.total(), 0);
        assert_eq!(plan.hit_ratio(), 0.0);
    }
}
