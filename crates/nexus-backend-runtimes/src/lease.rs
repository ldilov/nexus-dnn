use serde::{Deserialize, Serialize};

use crate::channel::RuntimeChannelDescriptor;

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct RuntimeLease {
    pub lease_id: String,
    pub install_id: String,
    pub extension_id: String,
    pub pid: Option<u32>,
    pub log_channel_id: String,
    pub channel: RuntimeChannelDescriptor,
    pub created_at: String,
    pub released_at: Option<String>,
}

impl RuntimeLease {
    pub fn is_live(&self) -> bool {
        self.released_at.is_none()
    }
}
