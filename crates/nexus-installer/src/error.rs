#[derive(Debug, thiserror::Error)]
pub enum InstallerError {
    #[error("download failed: {0}")]
    Download(String),

    #[error("checksum mismatch: expected {expected}, got {actual}")]
    ChecksumMismatch { expected: String, actual: String },

    #[error("archive extraction failed: {0}")]
    Extraction(String),

    #[error("binary not found: {0}")]
    BinaryNotFound(String),

    #[error("python not found: {0}")]
    PythonNotFound(String),

    #[error("venv creation failed: {0}")]
    VenvCreation(String),

    #[error("pip install failed: {0}")]
    PipInstall(String),

    #[error("io error: {0}")]
    Io(#[from] std::io::Error),

    #[error("http error: {0}")]
    Http(#[from] reqwest::Error),
}
