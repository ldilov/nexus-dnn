//! Size and count caps for the ZIP install pipeline (spec 019 FR-IE04).
//!
//! Defaults follow `contracts/zip-install-pipeline.md` §1. Overrides exist
//! only for tests that exercise the caps directly; the axum handler layer
//! always uses the defaults.

/// Caps applied during `ZipInstallPipeline::install`.
///
/// All three caps are enforced defensively: the compressed limit is the
/// primary gate at the axum `RequestBodyLimitLayer`, but we mirror it here
/// so a future non-HTTP caller (e.g. local CLI install) stays protected.
#[derive(Debug, Clone, Copy)]
pub struct ZipSizeLimits {
    /// Sum of all entry uncompressed sizes. Guards against zip-bomb blow-up
    /// at extraction time. Default: 256 MiB.
    pub max_uncompressed_bytes: u64,

    /// Upper bound on central directory entry count. Default: 8192.
    pub max_file_count: usize,

    /// Upper bound on the uploaded ZIP byte stream. Default: 64 MiB.
    pub max_compressed_bytes: u64,
}

impl Default for ZipSizeLimits {
    fn default() -> Self {
        Self {
            max_uncompressed_bytes: 256 * 1024 * 1024,
            max_file_count: 8192,
            max_compressed_bytes: 64 * 1024 * 1024,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn defaults_match_spec() {
        let l = ZipSizeLimits::default();
        assert_eq!(l.max_uncompressed_bytes, 256 * 1024 * 1024);
        assert_eq!(l.max_file_count, 8192);
        assert_eq!(l.max_compressed_bytes, 64 * 1024 * 1024);
    }
}
