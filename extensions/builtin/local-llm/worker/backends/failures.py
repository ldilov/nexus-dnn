from __future__ import annotations

import re
from dataclasses import dataclass
from enum import Enum


class FailureCategory(Enum):
    MANIFEST_RESOLUTION = "manifest_resolution"
    NETWORK_DOWNLOAD = "network_download"
    CHECKSUM_INTEGRITY = "checksum_integrity"
    ARCHIVE_EXTRACTION = "archive_extraction"
    BINARY_MISSING = "binary_missing"
    LAUNCH_FAILURE = "launch_failure"
    MISSING_DLL = "missing_dll"
    PORT_BIND = "port_bind"
    MODEL_FILE_MISSING = "model_file_missing"
    MODEL_LOAD = "model_load"
    HEALTH_TIMEOUT = "health_timeout"
    UNEXPECTED_EXIT = "unexpected_exit"
    METRICS_UNAVAILABLE = "metrics_unavailable"
    CUDA_INCOMPATIBLE = "cuda_incompatible"


@dataclass(frozen=True)
class StructuredFailure:
    category: FailureCategory
    message: str
    detail: str
    remediation: str
    exit_code: int | None = None
    binary_path: str | None = None
    model_path: str | None = None


_STDERR_PATTERNS: tuple[tuple[re.Pattern[str], FailureCategory, str, str], ...] = (
    (
        re.compile(r"CUDA.*(?:not found|incompatible|mismatch)", re.IGNORECASE),
        FailureCategory.CUDA_INCOMPATIBLE,
        "CUDA toolkit version is incompatible with the installed runtime",
        "Install a compatible CUDA toolkit version or switch to a CPU-only build",
    ),
    (
        re.compile(r"(?:cannot open shared object|DLL.*not found|\.dll.*missing)", re.IGNORECASE),
        FailureCategory.MISSING_DLL,
        "A required shared library or DLL could not be loaded",
        "Install the missing system dependency or use the self-contained runtime build",
    ),
    (
        re.compile(r"(?:address already in use|EADDRINUSE|bind.*fail)", re.IGNORECASE),
        FailureCategory.PORT_BIND,
        "The requested port is already in use by another process",
        "Stop the conflicting process or configure a different port in the profile",
    ),
    (
        re.compile(r"(?:failed to open|model.*not found|no such file.*\.gguf)", re.IGNORECASE),
        FailureCategory.MODEL_FILE_MISSING,
        "The model file referenced by the profile does not exist on disk",
        "Re-download the model or correct the model path in the profile",
    ),
    (
        re.compile(r"(?:failed to load model|model load error|unsupported model)", re.IGNORECASE),
        FailureCategory.MODEL_LOAD,
        "The backend could not load the specified model file",
        "Verify the model format is compatible with the selected backend version",
    ),
    (
        re.compile(r"(?:checksum.*mismatch|hash.*does not match|integrity)", re.IGNORECASE),
        FailureCategory.CHECKSUM_INTEGRITY,
        "Downloaded file checksum does not match the expected value",
        "Delete the corrupted download and retry the installation",
    ),
    (
        re.compile(r"(?:extract.*fail|decompression error|archive.*corrupt)", re.IGNORECASE),
        FailureCategory.ARCHIVE_EXTRACTION,
        "Failed to extract the downloaded archive",
        "Delete the cached archive and retry the installation",
    ),
    (
        re.compile(r"(?:no such file or directory|binary.*not found|exec.*fail)", re.IGNORECASE),
        FailureCategory.BINARY_MISSING,
        "The backend binary could not be found at the expected path",
        "Re-install the runtime or verify the install directory is intact",
    ),
    (
        re.compile(r"(?:connection refused|timeout.*health|health.*check.*fail)", re.IGNORECASE),
        FailureCategory.HEALTH_TIMEOUT,
        "The backend process did not become healthy within the timeout period",
        "Increase the startup timeout or check system resource availability",
    ),
    (
        re.compile(r"(?:network.*error|download.*fail|connection.*reset)", re.IGNORECASE),
        FailureCategory.NETWORK_DOWNLOAD,
        "A network error occurred during file download",
        "Check network connectivity and retry the download",
    ),
    (
        re.compile(r"(?:metrics.*unavailable|prometheus.*error|/metrics.*fail)", re.IGNORECASE),
        FailureCategory.METRICS_UNAVAILABLE,
        "The backend metrics endpoint is not responding",
        "Verify the backend was compiled with metrics support or disable metrics",
    ),
    (
        re.compile(r"(?:manifest.*not found|version.*not found|no matching release)", re.IGNORECASE),
        FailureCategory.MANIFEST_RESOLUTION,
        "Could not resolve a runtime version from the versions manifest",
        "Update the versions manifest or specify an explicit version",
    ),
)


def diagnose(stderr: str, exit_code: int | None) -> StructuredFailure:
    for pattern, category, detail, remediation in _STDERR_PATTERNS:
        match = pattern.search(stderr)
        if match:
            return StructuredFailure(
                category=category,
                message=match.group(0).strip(),
                detail=detail,
                remediation=remediation,
                exit_code=exit_code,
            )

    if exit_code is not None and exit_code != 0:
        return StructuredFailure(
            category=FailureCategory.LAUNCH_FAILURE,
            message=f"Process exited with code {exit_code}",
            detail=_truncate(stderr, 500) if stderr else "No stderr output captured",
            remediation="Check the full backend logs for details",
            exit_code=exit_code,
        )

    if exit_code is None:
        return StructuredFailure(
            category=FailureCategory.UNEXPECTED_EXIT,
            message="Backend process terminated unexpectedly without an exit code",
            detail=_truncate(stderr, 500) if stderr else "No stderr output captured",
            remediation="Check system logs for OOM kills or signal-based termination",
            exit_code=None,
        )

    return StructuredFailure(
        category=FailureCategory.LAUNCH_FAILURE,
        message="Unknown failure with zero exit code",
        detail=_truncate(stderr, 500) if stderr else "No stderr output captured",
        remediation="Review stderr output for warnings that may indicate partial failure",
        exit_code=exit_code,
    )


def _truncate(text: str, max_len: int) -> str:
    if len(text) <= max_len:
        return text
    return text[:max_len] + "..."
