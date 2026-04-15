use sha2::{Digest, Sha256};

use crate::error::InstallError;

#[derive(Debug, Clone)]
pub struct ChecksumVerification {
    pub expected: Option<String>,
    pub actual: String,
}

impl ChecksumVerification {
    pub fn verify(&self) -> Result<(), InstallError> {
        if let Some(expected) = &self.expected
            && !expected.eq_ignore_ascii_case(&self.actual)
        {
            return Err(InstallError::ChecksumMismatch {
                expected: expected.clone(),
                actual: self.actual.clone(),
            });
        }
        Ok(())
    }
}

pub struct Hasher {
    inner: Sha256,
}

impl Default for Hasher {
    fn default() -> Self {
        Self {
            inner: Sha256::new(),
        }
    }
}

impl Hasher {
    pub fn update(&mut self, bytes: &[u8]) {
        self.inner.update(bytes);
    }

    pub fn finalize_hex(self) -> String {
        hex_encode(self.inner.finalize().as_slice())
    }
}

fn hex_encode(bytes: &[u8]) -> String {
    const HEX: &[u8; 16] = b"0123456789abcdef";
    let mut out = String::with_capacity(bytes.len() * 2);
    for b in bytes {
        out.push(HEX[(b >> 4) as usize] as char);
        out.push(HEX[(b & 0xf) as usize] as char);
    }
    out
}
