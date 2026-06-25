//! Maps the trellis2 worker's mesh-generation notifications onto the
//! deployment's Workflow Graph node ids, so the dispatcher can drive the live
//! overlay (spec 057 US2).
//!
//! The worker emits `trellis2.generate.progress` with `stage` + `step`/`total`.
//! The SSE frame relays the worker's `stage` string VERBATIM (this module never
//! filters it). This tracker is only the graph-overlay projection: it folds the
//! worker's fine-grained ordered stages (`preprocess, dinov3, sparse, shape,
//! decode, mesh, glb`, plus `texture` when enabled) onto the 4 coarse overlay
//! nodes. Unrecognized stages are attributed to the currently-active node rather
//! than dropped, so a new worker stage never blanks the overlay.

use serde_json::Value;

/// Workflow node ids — must match `recipes/trellis2_generate.yaml`.
pub mod node {
    pub const SPARSE: &str = "sparse_structure";
    pub const SHAPE: &str = "shape_decode";
    pub const TEXTURE: &str = "texture";
    pub const EXPORT: &str = "glb_export";
}

/// Worker progress stage strings (mirror `worker/.../rpc.py` stages). The full
/// worker set is broader; these are the canonical names per coarse node.
pub mod stage {
    pub const SPARSE: &str = "sparse";
    pub const SHAPE: &str = "shape";
    pub const TEXTURE: &str = "texture";
    pub const EXPORT: &str = "export";
}

/// Worker notification method strings.
mod method {
    pub const PROGRESS: &str = "trellis2.generate.progress";
}

/// A node lifecycle transition the dispatcher should publish.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Transition {
    Started(&'static str),
    Progress(&'static str, u8),
    Completed(&'static str),
    Failed(&'static str),
}

/// The ordered pipeline of nodes a generation walks through.
const PIPELINE: &[&str] = &[node::SPARSE, node::SHAPE, node::TEXTURE, node::EXPORT];

/// Stateful translator from worker notifications to node transitions for one
/// generation. Tracks which node is active so out-of-order stages still emit a
/// monotonic Started→Completed sequence.
#[derive(Debug, Default)]
pub struct StageTracker {
    active_index: Option<usize>,
}

impl StageTracker {
    #[must_use]
    pub fn new() -> Self {
        Self::default()
    }

    /// Fold a worker stage onto a coarse overlay node + its pipeline index.
    /// Unrecognized stages return `None`; the caller attributes them to the
    /// currently-active node so the overlay never loses a worker stage.
    fn stage_to_node(stage_name: &str) -> Option<(usize, &'static str)> {
        match stage_name {
            "preprocess" | "dinov3" | stage::SPARSE => Some((0, node::SPARSE)),
            "shape" | "decode" => Some((1, node::SHAPE)),
            stage::TEXTURE => Some((2, node::TEXTURE)),
            "mesh" | "glb" | stage::EXPORT => Some((3, node::EXPORT)),
            _ => None,
        }
    }

    fn active_node(&self) -> &'static str {
        self.active_index.map_or(node::SPARSE, |i| PIPELINE[i])
    }

    fn percent(step: u64, total: u64) -> u8 {
        if total == 0 {
            return 0;
        }
        let pct = (step.saturating_mul(100) / total).min(100);
        u8::try_from(pct).unwrap_or(100)
    }

    /// Feed one worker notification; returns the transitions to publish.
    pub fn on_notification(&mut self, method_name: &str, params: &Value) -> Vec<Transition> {
        if method_name != method::PROGRESS {
            return Vec::new();
        }
        let Some(stage_name) = params.get("stage").and_then(Value::as_str) else {
            return Vec::new();
        };
        let step = params.get("step").and_then(Value::as_u64).unwrap_or(0);
        let total = params.get("total").and_then(Value::as_u64).unwrap_or(0);

        // Unknown worker stage: don't drop it — emit progress on whichever node
        // is currently active (defaulting to the first), keeping the overlay live.
        let Some((index, target)) = Self::stage_to_node(stage_name) else {
            let active = self.active_index.unwrap_or(0);
            let mut out = Vec::new();
            if self.active_index.is_none() {
                self.active_index = Some(0);
                out.push(Transition::Started(PIPELINE[0]));
            }
            out.push(Transition::Progress(PIPELINE[active], Self::percent(step, total)));
            return out;
        };

        let mut out = Vec::new();
        // Entering a new stage completes every earlier still-open stage and
        // starts the target node once.
        match self.active_index {
            Some(current) if current == index => {}
            Some(current) => {
                for &node in PIPELINE.iter().take(index).skip(current) {
                    out.push(Transition::Completed(node));
                }
                out.push(Transition::Started(target));
                self.active_index = Some(index);
            }
            None => {
                out.push(Transition::Started(target));
                self.active_index = Some(index);
            }
        }

        out.push(Transition::Progress(target, Self::percent(step, total)));
        out
    }

    /// The generation completed successfully — complete every node through export.
    pub fn on_success(&mut self) -> Vec<Transition> {
        let from = self.active_index.unwrap_or(0);
        let mut out = Vec::new();
        for &node in PIPELINE.iter().skip(from) {
            out.push(Transition::Completed(node));
        }
        self.active_index = Some(PIPELINE.len() - 1);
        out
    }

    /// The generation failed — fail whichever node was active.
    pub fn on_failure(&mut self) -> Vec<Transition> {
        vec![Transition::Failed(self.active_node())]
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn prog(stage_name: &str, step: u64, total: u64) -> Value {
        json!({ "stage": stage_name, "step": step, "total": total })
    }

    #[test]
    fn first_progress_starts_sparse() {
        let mut t = StageTracker::new();
        let out = t.on_notification(method::PROGRESS, &prog(stage::SPARSE, 0, 12));
        assert_eq!(out.first(), Some(&Transition::Started(node::SPARSE)));
        assert!(out.contains(&Transition::Progress(node::SPARSE, 0)));
    }

    #[test]
    fn entering_shape_completes_sparse_and_starts_shape() {
        let mut t = StageTracker::new();
        t.on_notification(method::PROGRESS, &prog(stage::SPARSE, 6, 12));
        let out = t.on_notification(method::PROGRESS, &prog(stage::SHAPE, 1, 4));
        assert!(out.contains(&Transition::Completed(node::SPARSE)));
        assert!(out.contains(&Transition::Started(node::SHAPE)));
    }

    #[test]
    fn percent_scales_with_step() {
        let mut t = StageTracker::new();
        let out = t.on_notification(method::PROGRESS, &prog(stage::SPARSE, 6, 12));
        assert!(out.contains(&Transition::Progress(node::SPARSE, 50)));
    }

    #[test]
    fn success_completes_all_remaining_nodes() {
        let mut t = StageTracker::new();
        t.on_notification(method::PROGRESS, &prog(stage::SHAPE, 4, 4));
        let out = t.on_success();
        assert!(out.contains(&Transition::Completed(node::SHAPE)));
        assert!(out.contains(&Transition::Completed(node::TEXTURE)));
        assert!(out.contains(&Transition::Completed(node::EXPORT)));
    }

    #[test]
    fn failure_during_sparse_fails_sparse() {
        let mut t = StageTracker::new();
        t.on_notification(method::PROGRESS, &prog(stage::SPARSE, 1, 12));
        assert_eq!(t.on_failure(), vec![Transition::Failed(node::SPARSE)]);
    }

    #[test]
    fn unknown_stage_is_attributed_not_dropped() {
        let mut t = StageTracker::new();
        let out = t.on_notification(method::PROGRESS, &prog("bogus", 1, 2));
        assert!(
            out.iter()
                .any(|tr| matches!(tr, Transition::Progress(node::SPARSE, _))),
            "unknown stage before any known stage maps to first node: {out:?}"
        );
    }

    #[test]
    fn fine_grained_worker_stages_fold_onto_coarse_nodes() {
        let mut t = StageTracker::new();
        assert!(t
            .on_notification(method::PROGRESS, &prog("preprocess", 1, 2))
            .iter()
            .any(|tr| matches!(tr, Transition::Started(node::SPARSE))));
        assert!(t
            .on_notification(method::PROGRESS, &prog("dinov3", 1, 1))
            .iter()
            .any(|tr| matches!(tr, Transition::Progress(node::SPARSE, _))));
        assert!(t
            .on_notification(method::PROGRESS, &prog("decode", 1, 2))
            .iter()
            .any(|tr| matches!(tr, Transition::Started(node::SHAPE))));
        assert!(t
            .on_notification(method::PROGRESS, &prog("glb", 1, 1))
            .iter()
            .any(|tr| matches!(tr, Transition::Started(node::EXPORT))));
    }
}
