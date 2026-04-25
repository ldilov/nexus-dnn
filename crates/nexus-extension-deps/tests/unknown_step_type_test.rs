//! Spec 035 T076 — unknown-step-type rejection.
//!
//! Validates that a manifest declaring `type: <unregistered>` fails the parse
//! step with a structured `DepError::UnknownStepType` and zero state mutation
//! (the host never partially registers, never silently drops the step).

mod common;

use nexus_extension_deps::{
    DepError, DependenciesBlock, HandlerRegistry, Step, parse_dependencies_block,
};

use crate::common::test_echo::TestEchoHandler;

#[test]
fn unknown_step_type_in_otherwise_valid_plan_fails_parse() {
    let mut registry = HandlerRegistry::new();
    registry.register(Box::new(TestEchoHandler::new()));

    let block = DependenciesBlock {
        steps: vec![
            Step {
                id: "valid".into(),
                step_type: "test_echo".into(),
                requires: vec![],
                spec: serde_json::json!({ "message": "ok" }),
            },
            Step {
                id: "broken".into(),
                step_type: "conda_env".into(), // not registered
                requires: vec!["valid".into()],
                spec: serde_json::json!({}),
            },
        ],
    };

    let err = parse_dependencies_block("ext", block, &registry).expect_err("must reject");
    match err {
        DepError::UnknownStepType { step_type } => {
            assert_eq!(step_type, "conda_env", "structured error names the bad type");
        }
        other => panic!("expected UnknownStepType, got {other:?}"),
    }
}

#[test]
fn empty_registry_rejects_any_step_with_unknown_type_error() {
    let registry = HandlerRegistry::new();
    let block = DependenciesBlock {
        steps: vec![Step {
            id: "x".into(),
            step_type: "anything".into(),
            requires: vec![],
            spec: serde_json::Value::Null,
        }],
    };
    let err = parse_dependencies_block("ext", block, &registry).expect_err("must reject");
    assert!(matches!(err, DepError::UnknownStepType { .. }));
}

#[test]
fn registry_validate_step_returns_unknown_step_type() {
    let registry = HandlerRegistry::new();
    let err = registry
        .validate_step("any_step", "missing_type", &serde_json::json!({}))
        .expect_err("must reject");
    match err {
        DepError::UnknownStepType { step_type } => assert_eq!(step_type, "missing_type"),
        other => panic!("expected UnknownStepType, got {other:?}"),
    }
}
