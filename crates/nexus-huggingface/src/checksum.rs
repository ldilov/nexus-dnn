use sha2::{Digest, Sha256};

use crate::error::{HfError, HfResult};

#[derive(Debug, Default)]
pub struct Hasher {
    inner: Sha256,
}

impl Hasher {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn update(&mut self, bytes: &[u8]) {
        self.inner.update(bytes);
    }

    pub fn finalize_hex(self) -> String {
        hex_encode(self.inner.finalize().as_slice())
    }
}

pub fn verify_hex(expected: Option<&str>, actual: &str) -> HfResult<()> {
    match expected {
        Some(e) if !e.eq_ignore_ascii_case(actual) => Err(HfError::ChecksumMismatch {
            expected: e.to_owned(),
            actual: actual.to_owned(),
        }),
        _ => Ok(()),
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

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn hasher_matches_known_sha256() {
        let mut h = Hasher::new();
        h.update(b"hello");
        assert_eq!(
            h.finalize_hex(),
            "2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824"
        );
    }

    #[test]
    fn verify_accepts_case_insensitive_match() {
        assert!(verify_hex(Some("AaBb"), "aabb").is_ok());
    }

    #[test]
    fn verify_rejects_mismatch() {
        let err = verify_hex(Some("aa"), "bb").unwrap_err();
        assert!(matches!(err, HfError::ChecksumMismatch { .. }));
    }

    #[test]
    fn verify_skips_when_expected_is_none() {
        assert!(verify_hex(None, "anything").is_ok());
    }
}
