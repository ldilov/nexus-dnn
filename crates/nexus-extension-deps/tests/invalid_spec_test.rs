//! Spec 035 T077 — handler-side spec validation.
//!
//! Validates that a registered handler's `validate(spec)` returning
//! [`DepError::InvalidSpec`] blocks plan-parse with a structured error
//! naming the offending field (FR-005, FR-011).

mod common;

use nexus_extension_deps::{
    DepError, DependenciesBlock, HandlerRegistry, Step, parse_dependencies_block,
};

use crate::common::test_echo::TestEchoHandler;

#[test]
fn malformed_spec_for_known_handler_blocks_plan_parse() {
    let mut registry = HandlerRegistry::new();
    registry.register(Box::new(TestEchoHandler::new()));

    let block = DependenciesBlock {
        steps: vec![Step {
            id: "echo".into(),
            step_type: "test_echo".into(),
            requires: vec![],
            // missing required `message` field
            spec: serde_json::json!({}),
        }],
    };
    let err = parse_dependencies_block("ext", block, &registry).expect_err("must reject");
    match err {
        DepError::InvalidSpec { step_id, field, reason } => {
            // The runner re-tags step_id when the handler leaves it empty,
            // so the user-facing error names the offending step.
            assert_eq!(step_id, "echo");
            assert_eq!(field, "spec");
            assert!(
                reason.contains("missing field") || reason.contains("message"),
                "reason describes the malformed field: {reason}"
            );
        }
        other => panic!("expected InvalidSpec, got {other:?}"),
    }
}

#[test]
fn empty_string_field_blocked_with_specific_field_name() {
    let mut registry = HandlerRegistry::new();
    registry.register(Box::new(TestEchoHandler::new()));

    let block = DependenciesBlock {
        steps: vec![Step {
            id: "blank".into(),
            step_type: "test_echo".into(),
            requires: vec![],
            spec: serde_json::json!({ "message": "   " }),
        }],
    };
    let err = parse_dependencies_block("ext", block, &registry).expect_err("must reject");
    match err {
        DepError::InvalidSpec { step_id, field, reason } => {
            assert_eq!(step_id, "blank");
            assert_eq!(field, "message");
            assert!(reason.contains("non-empty"), "reason: {reason}");
        }
        other => panic!("expected InvalidSpec, got {other:?}"),
    }
}

#[test]
fn structural_validation_fails_before_handler_is_invoked() {
    // A duplicate id should be caught by structural validation BEFORE the
    // handler's validate() is invoked — handler errors don't mask structural
    // bugs.
    let mut registry = HandlerRegistry::new();
    registry.register(Box::new(TestEchoHandler::new()));

    let block = DependenciesBlock {
        steps: vec![
            Step {
                id: "dup".into(),
                step_type: "test_echo".into(),
                requires: vec![],
                spec: serde_json::json!({}), // would also fail handler validation
            },
            Step {
                id: "dup".into(),
                step_type: "test_echo".into(),
                requires: vec![],
                spec: serde_json::json!({ "message": "fine" }),
            },
        ],
    };
    let err = parse_dependencies_block("ext", block, &registry).expect_err("must reject");
    assert!(
        matches!(err, DepError::DuplicateStepId { .. }),
        "structural error wins over handler validation: got {err:?}"
    );
}
