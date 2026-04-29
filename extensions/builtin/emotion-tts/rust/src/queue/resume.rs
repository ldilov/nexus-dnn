//! Partial-run resume logic (FR-142..144, R-11).
//!
//! Given a partial run and the cache lookup result for each planned
//! utterance, decide which segments can be served from cache vs resynthesised.
//! Pure function — no DB calls; caller wires the cache lookup.

use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ResumePlanEntry {
    pub global_index: i64,
    pub content_hash: Option<String>,
    pub cache_hit_audio_ref: Option<String>,
    pub original_run_id: Option<String>,
    pub resolved_status: ResumeDecision,
}

#[derive(Debug, Clone, Copy, Eq, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum ResumeDecision {
    CacheServe,
    Resynthesise,
}

#[derive(Debug, Clone, PartialEq, Serialize, Deserialize)]
pub struct ResumeSummary {
    pub total: i64,
    pub cache_hits: i64,
    pub to_synthesise: i64,
}

pub fn plan_resume(entries: Vec<ResumePlanEntry>) -> (Vec<ResumePlanEntry>, ResumeSummary) {
    let total = entries.len() as i64;
    let mut cache_hits: i64 = 0;
    let mut to_synthesise: i64 = 0;
    let mut out = Vec::with_capacity(entries.len());
    for mut e in entries {
        let decision = if e.cache_hit_audio_ref.is_some() {
            cache_hits += 1;
            ResumeDecision::CacheServe
        } else {
            to_synthesise += 1;
            ResumeDecision::Resynthesise
        };
        e.resolved_status = decision;
        out.push(e);
    }
    (
        out,
        ResumeSummary {
            total,
            cache_hits,
            to_synthesise,
        },
    )
}

#[cfg(test)]
mod tests {
    use super::*;

    fn entry(idx: i64, cache: Option<&str>) -> ResumePlanEntry {
        ResumePlanEntry {
            global_index: idx,
            content_hash: Some(format!("{idx:064}")),
            cache_hit_audio_ref: cache.map(String::from),
            original_run_id: Some("run_01".into()),
            resolved_status: ResumeDecision::Resynthesise,
        }
    }

    #[test]
    fn classifies_hits_vs_misses() {
        let (out, summary) = plan_resume(vec![
            entry(1, Some("artifact://cached_1")),
            entry(2, None),
            entry(3, Some("artifact://cached_3")),
        ]);
        assert_eq!(summary.total, 3);
        assert_eq!(summary.cache_hits, 2);
        assert_eq!(summary.to_synthesise, 1);
        assert_eq!(out[0].resolved_status, ResumeDecision::CacheServe);
        assert_eq!(out[1].resolved_status, ResumeDecision::Resynthesise);
    }

    #[test]
    fn empty_plan_returns_empty_summary() {
        let (out, summary) = plan_resume(vec![]);
        assert!(out.is_empty());
        assert_eq!(summary.total, 0);
    }

    #[test]
    fn all_cache_hits() {
        let (_out, summary) = plan_resume(vec![entry(1, Some("a")), entry(2, Some("b"))]);
        assert_eq!(summary.cache_hits, 2);
        assert_eq!(summary.to_synthesise, 0);
    }

    #[test]
    fn all_resynthesise() {
        let (_out, summary) = plan_resume(vec![entry(1, None), entry(2, None)]);
        assert_eq!(summary.cache_hits, 0);
        assert_eq!(summary.to_synthesise, 2);
    }
}
