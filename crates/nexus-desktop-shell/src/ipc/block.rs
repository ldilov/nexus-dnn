//! `cmd_block_register_mnemonic` — register a 4-letter mnemonic for a Block instance.
//!
//! Phase 2 stub. Real handler delegates to the host's command-palette index
//! (delivered by spec 041).

use crate::errors::{IpcError, IpcResult};
use serde::{Deserialize, Serialize};

#[derive(Debug, Deserialize)]
pub struct RegisterMnemonicInput {
    pub schema: String,
    pub block_id: String,
    pub mnemonic: String,
    pub prompt_header: String,
    pub primary_metric: Option<String>,
}

#[derive(Debug, Serialize)]
pub struct RegisterMnemonicOutput {
    pub schema: String,
    pub registered: bool,
    pub conflict_with: Option<String>,
}

#[tauri::command]
pub async fn cmd_block_register_mnemonic(
    _input: RegisterMnemonicInput,
) -> IpcResult<RegisterMnemonicOutput> {
    Err(IpcError::not_implemented("cmd_block_register_mnemonic"))
}
