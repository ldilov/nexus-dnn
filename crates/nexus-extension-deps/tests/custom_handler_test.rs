//! Spec 035 T075 — extensibility-seam test.
//!
//! Validates that a third-party-style handler can be registered into a
//! `HandlerRegistry` and executed end-to-end through the runner with no edits
//! to the host's existing types or routes (FR-005, US3).

mod common;

use std::sync::Arc;

use nexus_extension_deps::{
    DependenciesBlock, HandlerRegistry, InstallRunner, Step, StepStatus, parse_dependencies_block,
};

use crate::common::harness::{HarnessHandles, build_runner_ctx};
use crate::common::test_echo::TestEchoHandler;

#[tokio::test]
async fn custom_handler_registers_and_runs_through_runner() {
    let handler = TestEchoHandler::new();
    let mut registry = HandlerRegistry::new();
    registry.register(Box::new(handler.clone()));

    let block = DependenciesBlock {
        steps: vec![Step {
            id: "echo_one".into(),
            step_type: "test_echo".into(),
            requires: vec![],
            spec: serde_json::json!({ "message": "hello, dep installer" }),
        }],
    };
    let plan = parse_dependencies_block("test.ext", block, &registry).expect("plan parses");
    assert_eq!(plan.steps.len(), 1);
    assert_eq!(plan.steps[0].id, "echo_one");

    let runner = InstallRunner::new(plan, Arc::new(registry));
    let handles = HarnessHandles::new();
    let tmp = tempfile::tempdir().expect("tempdir");
    let mut ctx = build_runner_ctx(&handles, "test.ext", tmp.path());

    let report = runner.run_install(&mut ctx).await;
    assert!(report.all_satisfied, "all steps should succeed");
    assert!(matches!(report.statuses["echo_one"], StepStatus::Ok { .. }));
    assert_eq!(
        handler.invocation_count(),
        1,
        "handler invoked exactly once"
    );
    assert_eq!(
        handler.last_message().as_deref(),
        Some("hello, dep installer")
    );

    // SSE events: step_started, step_completed, install_completed
    let events = handles.sink.events.lock().expect("lock");
    let event_kinds: Vec<&'static str> = events
        .iter()
        .map(|e| match e {
            nexus_extension_deps::ProgressEvent::StepStarted { .. } => "started",
            nexus_extension_deps::ProgressEvent::StepProgress { .. } => "progress",
            nexus_extension_deps::ProgressEvent::StepCompleted { .. } => "completed",
            nexus_extension_deps::ProgressEvent::StepFailed { .. } => "failed",
            nexus_extension_deps::ProgressEvent::InstallCompleted { .. } => "install_completed",
        })
        .collect();
    assert_eq!(
        event_kinds,
        vec!["started", "completed", "install_completed"],
        "runner emits the expected SSE event sequence"
    );
}

#[tokio::test]
async fn custom_handler_can_have_dependents_in_topo_order() {
    let mut registry = HandlerRegistry::new();
    registry.register(Box::new(TestEchoHandler::new()));

    let block = DependenciesBlock {
        steps: vec![
            Step {
                id: "second".into(),
                step_type: "test_echo".into(),
                requires: vec!["first".into()],
                spec: serde_json::json!({ "message": "two" }),
            },
            Step {
                id: "first".into(),
                step_type: "test_echo".into(),
                requires: vec![],
                spec: serde_json::json!({ "message": "one" }),
            },
        ],
    };
    let plan = parse_dependencies_block("ext", block, &registry).expect("plan");
    let order: Vec<&str> = plan.steps.iter().map(|s| s.id.as_str()).collect();
    assert_eq!(order, vec!["first", "second"], "topo order respected");
}
