//! Maps the svi2 worker's per-clip render notifications onto the deployment's
//! Workflow Graph node ids, so the dispatcher can drive the live overlay
//! (spec 057 US2).
//!
//! The worker (fake + real share one contract) signals only the diffusion loop
//! per clip — `clip.started/step/completed` with `clip_index` + `num_clips`. The
//! surrounding stages (anchor encode, stitch, interpolate, mux) are not
//! individually signalled today, so this tracker brackets them: anchor starts at
//! run begin and completes when the first clip starts; stitch/interpolate/mux
//! complete together on success. Per-stage precision arrives when the worker
//! emits explicit stage markers (FR-006) — wire those into `on_notification`.
//!
//! Pure + stateful + dependency-free: the dispatcher feeds notifications in and
//! emits the returned transitions via a `RunNodeEmitter`. No host types here.

use serde_json::Value;

/// Workflow node ids — must match `workflows/svi2_render.yaml`.
pub mod node {
    pub const ANCHOR: &str = "anchor_encode";
    pub const QWEN_EDIT: &str = "qwen_edit";
    pub const DIFFUSION: &str = "clip_diffusion";
    pub const STITCH: &str = "stitch";
    pub const INTERPOLATE: &str = "interpolate";
    pub const MUX: &str = "mux";
}

/// Worker notification method strings (mirror `worker/.../rpc.py` Notifications).
mod method {
    pub const PROGRESS: &str = "svi2.video.progress";
    pub const CLIP_STARTED: &str = "svi2.video.clip.started";
    pub const CLIP_STEP: &str = "svi2.video.clip.step";
    pub const CLIP_COMPLETED: &str = "svi2.video.clip.completed";
}

/// A node lifecycle transition the dispatcher should publish.
#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Transition {
    Started(&'static str),
    Progress(&'static str, u8),
    Completed(&'static str),
    Failed(&'static str),
}

/// Stateful translator from worker notifications to node transitions for one run.
#[derive(Debug, Default)]
pub struct StageTracker {
    anchor_started: bool,
    anchor_done: bool,
    diffusion_started: bool,
    diffusion_done: bool,
    num_clips: u32,
}

impl StageTracker {
    #[must_use]
    pub fn new() -> Self {
        Self::default()
    }

    /// The node currently considered active (for failure attribution).
    fn active_node(&self) -> &'static str {
        if self.diffusion_started && !self.diffusion_done {
            node::DIFFUSION
        } else if self.anchor_started && !self.anchor_done {
            node::ANCHOR
        } else if self.diffusion_done {
            node::MUX
        } else {
            node::ANCHOR
        }
    }

    /// Integer percent through the diffusion loop. `tick` is the half-step
    /// within a clip: 0 = started, 1 = mid, 2 = completed.
    fn percent_for(&self, clip_index: u32, tick: u32) -> u8 {
        if self.num_clips == 0 {
            return 0;
        }
        let numerator = clip_index.saturating_mul(2).saturating_add(tick);
        let denominator = self.num_clips.saturating_mul(2);
        let percent = (numerator.saturating_mul(100) / denominator).min(100);
        u8::try_from(percent).unwrap_or(100)
    }

    /// Feed one worker notification; returns the transitions to publish.
    pub fn on_notification(&mut self, method: &str, params: &Value) -> Vec<Transition> {
        let mut out = Vec::new();

        // Anchor is implicitly the first thing that runs — mark it started on
        // the very first notification of the run.
        if !self.anchor_started {
            self.anchor_started = true;
            out.push(Transition::Started(node::ANCHOR));
        }

        if let Some(n) = params.get("num_clips").and_then(Value::as_u64) {
            self.num_clips = u32::try_from(n).unwrap_or(u32::MAX);
        }

        let clip_index = || {
            u32::try_from(
                params
                    .get("clip_index")
                    .and_then(Value::as_u64)
                    .unwrap_or(0),
            )
            .unwrap_or(0)
        };

        match method {
            method::CLIP_STARTED => {
                if !self.anchor_done {
                    self.anchor_done = true;
                    out.push(Transition::Completed(node::ANCHOR));
                }
                if !self.diffusion_started {
                    self.diffusion_started = true;
                    out.push(Transition::Started(node::DIFFUSION));
                }
                out.push(Transition::Progress(
                    node::DIFFUSION,
                    self.percent_for(clip_index(), 0),
                ));
            }
            method::CLIP_STEP | method::PROGRESS => {
                if self.diffusion_started && !self.diffusion_done {
                    out.push(Transition::Progress(
                        node::DIFFUSION,
                        self.percent_for(clip_index(), 1),
                    ));
                }
            }
            method::CLIP_COMPLETED => {
                out.push(Transition::Progress(
                    node::DIFFUSION,
                    self.percent_for(clip_index(), 2),
                ));
            }
            _ => {}
        }

        out
    }

    /// The run completed successfully — close out diffusion and the post stages.
    pub fn on_success(&mut self) -> Vec<Transition> {
        let mut out = Vec::new();
        if !self.anchor_done {
            self.anchor_done = true;
            out.push(Transition::Completed(node::ANCHOR));
        }
        if !self.diffusion_done {
            self.diffusion_done = true;
            out.push(Transition::Completed(node::DIFFUSION));
        }
        out.push(Transition::Completed(node::STITCH));
        out.push(Transition::Completed(node::INTERPOLATE));
        out.push(Transition::Completed(node::MUX));
        out
    }

    /// The run failed — fail whichever node was active.
    pub fn on_failure(&mut self) -> Vec<Transition> {
        vec![Transition::Failed(self.active_node())]
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use serde_json::json;

    fn p(num_clips: u32, clip_index: u32) -> Value {
        json!({ "num_clips": num_clips, "clip_index": clip_index })
    }

    #[test]
    fn first_notification_starts_anchor() {
        let mut t = StageTracker::new();
        let out = t.on_notification(method::PROGRESS, &json!({ "num_clips": 3 }));
        assert_eq!(out.first(), Some(&Transition::Started(node::ANCHOR)));
    }

    #[test]
    fn first_clip_completes_anchor_and_starts_diffusion() {
        let mut t = StageTracker::new();
        t.on_notification(method::PROGRESS, &json!({ "num_clips": 2 }));
        let out = t.on_notification(method::CLIP_STARTED, &p(2, 0));
        assert!(out.contains(&Transition::Completed(node::ANCHOR)));
        assert!(out.contains(&Transition::Started(node::DIFFUSION)));
        assert!(out.contains(&Transition::Progress(node::DIFFUSION, 0)));
    }

    #[test]
    fn clip_progress_scales_by_clip_index() {
        let mut t = StageTracker::new();
        t.on_notification(method::CLIP_STARTED, &p(4, 0));
        let mid = t.on_notification(method::CLIP_COMPLETED, &p(4, 1));
        // 2 of 4 clips done → 50%
        assert!(mid.contains(&Transition::Progress(node::DIFFUSION, 50)));
    }

    #[test]
    fn success_completes_diffusion_and_post_stages() {
        let mut t = StageTracker::new();
        t.on_notification(method::CLIP_STARTED, &p(1, 0));
        let out = t.on_success();
        assert!(out.contains(&Transition::Completed(node::DIFFUSION)));
        assert!(out.contains(&Transition::Completed(node::STITCH)));
        assert!(out.contains(&Transition::Completed(node::INTERPOLATE)));
        assert!(out.contains(&Transition::Completed(node::MUX)));
    }

    #[test]
    fn failure_during_diffusion_fails_the_diffusion_node() {
        let mut t = StageTracker::new();
        t.on_notification(method::CLIP_STARTED, &p(3, 1));
        assert_eq!(t.on_failure(), vec![Transition::Failed(node::DIFFUSION)]);
    }

    #[test]
    fn failure_before_first_clip_fails_anchor() {
        let mut t = StageTracker::new();
        t.on_notification(method::PROGRESS, &json!({ "num_clips": 3 }));
        assert_eq!(t.on_failure(), vec![Transition::Failed(node::ANCHOR)]);
    }

    #[test]
    fn full_sequence_is_monotonic_to_all_completed() {
        let mut t = StageTracker::new();
        let mut seen = Vec::new();
        seen.extend(t.on_notification(method::PROGRESS, &json!({ "num_clips": 2 })));
        for idx in 0..2 {
            seen.extend(t.on_notification(method::CLIP_STARTED, &p(2, idx)));
            seen.extend(t.on_notification(method::CLIP_STEP, &p(2, idx)));
            seen.extend(t.on_notification(method::CLIP_COMPLETED, &p(2, idx)));
        }
        seen.extend(t.on_success());
        assert_eq!(seen.first(), Some(&Transition::Started(node::ANCHOR)));
        assert!(seen.contains(&Transition::Completed(node::MUX)));
        assert!(seen.contains(&Transition::Started(node::DIFFUSION)));
    }
}
