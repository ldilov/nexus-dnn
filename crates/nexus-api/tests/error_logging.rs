use nexus_api::handlers::errors::log_handler_error;
use tracing_test::traced_test;

#[derive(Debug, thiserror::Error)]
enum FakeError {
    #[error("storage: {0}")]
    Storage(String),
}

#[traced_test]
#[test]
fn log_handler_error_emits_structured_fields() {
    let err = FakeError::Storage("disk full".into());
    log_handler_error(&err, "GET /api/v1/host-models", "STORAGE_ERROR", None);
    assert!(logs_contain("STORAGE_ERROR"));
    assert!(logs_contain("disk full"));
    assert!(logs_contain("GET /api/v1/host-models"));
}

#[traced_test]
#[test]
fn log_handler_error_walks_source_chain() {
    #[derive(Debug, thiserror::Error)]
    #[error("outer")]
    struct Outer(#[source] std::io::Error);

    let outer = Outer(std::io::Error::new(
        std::io::ErrorKind::NotFound,
        "inner detail",
    ));
    log_handler_error(&outer, "test", "CHAIN_CODE", Some("req-42"));
    assert!(logs_contain("CHAIN_CODE"));
    assert!(logs_contain("req-42"));
    assert!(logs_contain("inner detail"));
}
