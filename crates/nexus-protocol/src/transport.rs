use crate::messages::{RpcMessage, RpcNotification, RpcRequest, RpcResponse};

pub trait Transport: Send + Sync {
    type Error: std::error::Error + Send + Sync + 'static;

    fn send_request(
        &self,
        request: &RpcRequest,
    ) -> impl std::future::Future<Output = Result<RpcResponse, Self::Error>> + Send;

    fn send_notification(
        &self,
        notification: &RpcNotification,
    ) -> impl std::future::Future<Output = Result<(), Self::Error>> + Send;

    fn receive_message(
        &self,
    ) -> impl std::future::Future<Output = Result<RpcMessage, Self::Error>> + Send;

    fn close(&self) -> impl std::future::Future<Output = Result<(), Self::Error>> + Send;
}
