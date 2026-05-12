use std::collections::BTreeMap;

use nexus_events::redaction::{REDACTION_MARKER, SensitiveNameAllowlist};
use nexus_events::types::NexusEvent;

#[test]
fn host_log_message_field_is_preserved_verbatim() {
    let event = NexusEvent::HostLog {
        level: "error".to_string(),
        target: "nexus_core::panic_hook".to_string(),
        message: "token=abc-secret-123 failed".to_string(),
        fields: BTreeMap::from([("token".to_string(), REDACTION_MARKER.to_string())]),
        span_path: None,
        timestamp_ms: 1_746_681_600_000,
    };

    match event {
        NexusEvent::HostLog {
            message, fields, ..
        } => {
            assert_eq!(message, "token=abc-secret-123 failed");
            assert_eq!(fields.get("token"), Some(&REDACTION_MARKER.to_string()));
        }
        other => panic!("expected HostLog variant, got {other:?}"),
    }
}

#[test]
fn redacts_default_password_pattern() {
    let allowlist = SensitiveNameAllowlist::default();
    let mut fields = BTreeMap::from([("password".to_string(), "super-secret".to_string())]);

    allowlist.redact_in_place(&mut fields);

    assert_eq!(fields.get("password"), Some(&REDACTION_MARKER.to_string()));
}

#[test]
fn redacts_builtin_wildcard_api_key_patterns() {
    let allowlist = SensitiveNameAllowlist::default();
    let mut fields = BTreeMap::from([
        ("api_key".to_string(), "xxx".to_string()),
        ("x_api_key".to_string(), "yyy".to_string()),
    ]);

    allowlist.redact_in_place(&mut fields);

    assert_eq!(fields.get("api_key"), Some(&REDACTION_MARKER.to_string()));
    assert_eq!(fields.get("x_api_key"), Some(&REDACTION_MARKER.to_string()));
}

#[test]
fn redacts_extra_sensitive_patterns() {
    let allowlist = SensitiveNameAllowlist::new(["session_*"]);
    let mut fields = BTreeMap::from([("session_id".to_string(), "abc".to_string())]);

    allowlist.redact_in_place(&mut fields);

    assert_eq!(
        fields.get("session_id"),
        Some(&REDACTION_MARKER.to_string())
    );
}

#[test]
fn defaults_cannot_be_removed_by_extra_patterns() {
    let allowlist = SensitiveNameAllowlist::new(["session_*"]);
    let mut value = "still-secret".to_string();

    let redacted = allowlist.redact_field_value("password", &mut value);

    assert!(
        redacted,
        "password should stay redacted even with additive extras"
    );
    assert_eq!(value, REDACTION_MARKER);
}

#[test]
fn matching_is_case_insensitive() {
    let allowlist = SensitiveNameAllowlist::default();
    let mut fields = BTreeMap::from([("Authorization".to_string(), "Bearer xyz".to_string())]);

    allowlist.redact_in_place(&mut fields);

    assert_eq!(
        fields.get("Authorization"),
        Some(&REDACTION_MARKER.to_string())
    );
}
