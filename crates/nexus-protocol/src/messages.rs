use serde::{Deserialize, Serialize};

pub const PARSE_ERROR: i32 = -32700;
pub const INVALID_REQUEST: i32 = -32600;
pub const METHOD_NOT_FOUND: i32 = -32601;
pub const INVALID_PARAMS: i32 = -32602;
pub const INTERNAL_ERROR: i32 = -32603;
pub const VALIDATION_ERROR: i32 = -32000;
pub const RUNTIME_DEPENDENCY_MISSING: i32 = -32001;
pub const MODEL_UNAVAILABLE: i32 = -32002;
pub const OUT_OF_MEMORY: i32 = -32003;
pub const EXECUTION_CANCELLED: i32 = -32004;

const JSONRPC_VERSION: &str = "2.0";

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RpcRequest {
    pub jsonrpc: String,
    pub id: u64,
    pub method: String,
    pub params: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RpcResponse {
    pub jsonrpc: String,
    pub id: u64,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub result: Option<serde_json::Value>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub error: Option<RpcError>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RpcNotification {
    pub jsonrpc: String,
    pub method: String,
    pub params: serde_json::Value,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RpcError {
    pub code: i32,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub data: Option<serde_json::Value>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(untagged)]
pub enum RpcMessage {
    Request(RpcRequest),
    Response(RpcResponse),
    Notification(RpcNotification),
}

pub fn new_request(id: u64, method: &str, params: serde_json::Value) -> RpcRequest {
    RpcRequest {
        jsonrpc: JSONRPC_VERSION.to_owned(),
        id,
        method: method.to_owned(),
        params,
    }
}

pub fn new_success_response(id: u64, result: serde_json::Value) -> RpcResponse {
    RpcResponse {
        jsonrpc: JSONRPC_VERSION.to_owned(),
        id,
        result: Some(result),
        error: None,
    }
}

pub fn new_error_response(id: u64, code: i32, message: String) -> RpcResponse {
    RpcResponse {
        jsonrpc: JSONRPC_VERSION.to_owned(),
        id,
        result: None,
        error: Some(RpcError {
            code,
            message,
            data: None,
        }),
    }
}

pub fn new_notification(method: &str, params: serde_json::Value) -> RpcNotification {
    RpcNotification {
        jsonrpc: JSONRPC_VERSION.to_owned(),
        method: method.to_owned(),
        params,
    }
}
