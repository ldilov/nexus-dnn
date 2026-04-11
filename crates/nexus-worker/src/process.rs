use std::time::Duration;

use nexus_protocol::StdioTransport;
use nexus_protocol::messages::{RpcResponse, new_request};
use nexus_protocol::transport::Transport;
use serde::{Deserialize, Serialize};
use tokio::process::Child;
use tokio::sync::Mutex;

use crate::error::WorkerError;

const SHUTDOWN_TIMEOUT: Duration = Duration::from_secs(5);

#[derive(Debug, Clone, PartialEq, Eq, Serialize, Deserialize)]
#[serde(rename_all = "snake_case")]
pub enum WorkerStatus {
    Starting,
    Ready,
    Busy,
    Unhealthy,
    Stopped,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct OperatorInfo {
    pub id: String,
    pub version: String,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct HandshakeResult {
    pub session_id: Option<String>,
    pub supported_methods: Vec<String>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct StructuredExecutionError {
    pub code: i32,
    pub category: String,
    pub message: String,
    pub retryable: bool,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct ValidationResult {
    pub valid: bool,
    pub errors: Vec<String>,
}

pub struct WorkerProcess {
    pub worker_id: String,
    pub extension_id: String,
    child: Mutex<Child>,
    transport: StdioTransport,
    pub status: Mutex<WorkerStatus>,
    pub operator_ids: Mutex<Vec<String>>,
    pub session_id: Mutex<Option<String>>,
    pub supported_methods: Mutex<Vec<String>>,
}

impl WorkerProcess {
    pub fn new(
        worker_id: String,
        extension_id: String,
        child: Child,
        transport: StdioTransport,
    ) -> Self {
        Self {
            worker_id,
            extension_id,
            child: Mutex::new(child),
            transport,
            status: Mutex::new(WorkerStatus::Starting),
            operator_ids: Mutex::new(Vec::new()),
            session_id: Mutex::new(None),
            supported_methods: Mutex::new(Vec::new()),
        }
    }

    pub async fn handshake(
        &self,
        host_version: &str,
        protocol_version: &str,
    ) -> Result<HandshakeResult, WorkerError> {
        let params = serde_json::json!({
            "host_version": host_version,
            "protocol_version": protocol_version,
        });
        let request = new_request(self.transport.next_request_id(), "handshake", params);
        let response = self.send_and_check(&request).await?;
        let result = response
            .result
            .ok_or_else(|| WorkerError::HandshakeFailed("missing result".to_owned()))?;
        let worker_protocol = result
            .get("protocol_version")
            .and_then(|v| v.as_str())
            .unwrap_or("");
        if worker_protocol != protocol_version {
            return Err(WorkerError::ProtocolMismatch {
                expected: protocol_version.to_owned(),
                actual: worker_protocol.to_owned(),
            });
        }

        let session_id = result
            .get("session_id")
            .and_then(|v| v.as_str())
            .map(String::from);

        let supported_methods = result
            .get("supported_methods")
            .and_then(|v| v.as_array())
            .map(|arr| {
                arr.iter()
                    .filter_map(|v| v.as_str().map(String::from))
                    .collect::<Vec<_>>()
            })
            .unwrap_or_default();

        *self.session_id.lock().await = session_id.clone();
        *self.supported_methods.lock().await = supported_methods.clone();
        *self.status.lock().await = WorkerStatus::Ready;

        Ok(HandshakeResult {
            session_id,
            supported_methods,
        })
    }

    pub async fn list_operators(&self) -> Result<Vec<OperatorInfo>, WorkerError> {
        let request = new_request(
            self.transport.next_request_id(),
            "list_operators",
            serde_json::Value::Null,
        );
        let response = self.send_and_check(&request).await?;
        let result = response
            .result
            .ok_or_else(|| WorkerError::ReceiveFailed("missing result".to_owned()))?;
        let operators: Vec<OperatorInfo> = serde_json::from_value(result)
            .map_err(|e| WorkerError::ReceiveFailed(e.to_string()))?;
        let ids: Vec<String> = operators.iter().map(|op| op.id.clone()).collect();
        *self.operator_ids.lock().await = ids;
        Ok(operators)
    }

    pub async fn validate_config(
        &self,
        operator_id: &str,
        config: serde_json::Value,
    ) -> Result<ValidationResult, WorkerError> {
        let params = serde_json::json!({
            "operator_id": operator_id,
            "config": config,
        });
        let request = new_request(
            self.transport.next_request_id(),
            "validate_config",
            params,
        );
        let response = self
            .transport
            .send_request(&request)
            .await
            .map_err(|e| WorkerError::SendFailed(e.to_string()))?;

        if let Some(ref err) = response.error {
            return Ok(ValidationResult {
                valid: false,
                errors: vec![err.message.clone()],
            });
        }

        let result = response
            .result
            .ok_or_else(|| WorkerError::ReceiveFailed("missing result".to_owned()))?;

        Ok(ValidationResult {
            valid: result
                .get("valid")
                .and_then(|v| v.as_bool())
                .unwrap_or(false),
            errors: result
                .get("errors")
                .and_then(|v| v.as_array())
                .map(|arr| {
                    arr.iter()
                        .filter_map(|v| v.as_str().map(String::from))
                        .collect()
                })
                .unwrap_or_default(),
        })
    }

    pub async fn execute(
        &self,
        params: serde_json::Value,
    ) -> Result<serde_json::Value, WorkerError> {
        let request = new_request(self.transport.next_request_id(), "execute", params);
        let response = self
            .transport
            .send_request(&request)
            .await
            .map_err(|e| WorkerError::SendFailed(e.to_string()))?;

        if let Some(ref err) = response.error {
            let structured = parse_structured_error(err);
            return Err(WorkerError::StructuredFailure(structured));
        }

        response
            .result
            .ok_or_else(|| WorkerError::ExecutionFailed("missing result".to_owned()))
    }

    pub async fn health_check(&self) -> Result<(), WorkerError> {
        let request = new_request(
            self.transport.next_request_id(),
            "health",
            serde_json::Value::Null,
        );
        let response = self.send_and_check(&request).await?;
        if response.error.is_some() {
            let msg = response
                .error
                .map(|e| e.message)
                .unwrap_or_else(|| "unknown".to_owned());
            return Err(WorkerError::HealthCheckFailed(msg));
        }
        Ok(())
    }

    pub async fn shutdown(&self) -> Result<(), WorkerError> {
        let _ = self.transport.close().await;
        let mut child = self.child.lock().await;
        let wait_result = tokio::time::timeout(SHUTDOWN_TIMEOUT, child.wait()).await;
        match wait_result {
            Ok(Ok(_)) => {}
            Ok(Err(e)) => return Err(WorkerError::Io(e)),
            Err(_) => {
                child.kill().await.map_err(WorkerError::Io)?;
            }
        }
        *self.status.lock().await = WorkerStatus::Stopped;
        Ok(())
    }

    async fn send_and_check(
        &self,
        request: &nexus_protocol::messages::RpcRequest,
    ) -> Result<RpcResponse, WorkerError> {
        let response = self
            .transport
            .send_request(request)
            .await
            .map_err(|e| WorkerError::SendFailed(e.to_string()))?;
        if let Some(ref err) = response.error {
            return Err(WorkerError::ReceiveFailed(err.message.clone()));
        }
        Ok(response)
    }
}

fn parse_structured_error(err: &nexus_protocol::messages::RpcError) -> StructuredExecutionError {
    let data = err.data.as_ref();

    let category = data
        .and_then(|d| d.get("category"))
        .and_then(|v| v.as_str())
        .unwrap_or("unknown")
        .to_owned();

    let retryable = data
        .and_then(|d| d.get("retryable"))
        .and_then(|v| v.as_bool())
        .unwrap_or(false);

    StructuredExecutionError {
        code: err.code,
        category,
        message: err.message.clone(),
        retryable,
    }
}
