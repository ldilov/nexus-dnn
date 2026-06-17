import type { ProgressEvent, RunStatus } from "./types";

/** Backend run-progress SSE frames are serialized with
 * `#[serde(rename_all = "snake_case")]` (Rust `dispatcher/events.rs`), so the
 * wire keys are `run_id`, `global_index`, `duration_ms`, … while the frontend's
 * `ProgressEvent` is camelCase. This normalizer is the single translation point
 * for the run-progress stream: it maps snake → camel, tolerates already-camel
 * input (so unit fixtures and any future camel producer keep working), and
 * returns null for anything it cannot recognise as a `ProgressEvent`. */
type Raw = Record<string, unknown>;

function asRecord(raw: unknown): Raw | null {
  return typeof raw === "object" && raw !== null ? (raw as Raw) : null;
}

function pickString(r: Raw, ...keys: readonly string[]): string | undefined {
  for (const k of keys) {
    const v = r[k];
    if (typeof v === "string") return v;
  }
  return undefined;
}

function pickNumber(r: Raw, ...keys: readonly string[]): number | undefined {
  for (const k of keys) {
    const v = r[k];
    if (typeof v === "number") return v;
  }
  return undefined;
}

function pickBoolean(r: Raw, ...keys: readonly string[]): boolean | undefined {
  for (const k of keys) {
    const v = r[k];
    if (typeof v === "boolean") return v;
  }
  return undefined;
}

export function parseProgressEvent(raw: unknown): ProgressEvent | null {
  const r = asRecord(raw);
  if (!r) return null;

  const type = pickString(r, "type");
  if (!type) return null;

  const runId = pickString(r, "runId", "run_id");
  const globalIndex = pickNumber(r, "globalIndex", "global_index");
  const utteranceId = pickString(r, "utteranceId", "utterance_id");

  switch (type) {
    case "segment_started": {
      if (runId === undefined || globalIndex === undefined) return null;
      return { type, runId, globalIndex, utteranceId };
    }
    case "segment_completed": {
      if (runId === undefined || globalIndex === undefined) return null;
      return {
        type,
        runId,
        globalIndex,
        utteranceId,
        durationMs: pickNumber(r, "durationMs", "duration_ms") ?? 0,
        cacheHit: pickBoolean(r, "cacheHit", "cache_hit") ?? false,
        audioArtifactRef: pickString(r, "audioArtifactRef", "audio_artifact_ref"),
      };
    }
    case "segment_failed": {
      if (runId === undefined || globalIndex === undefined) return null;
      return {
        type,
        runId,
        globalIndex,
        utteranceId,
        failureCategory: pickString(r, "failureCategory", "failure_category") ?? "error",
        failureDetail: pickString(r, "failureDetail", "failure_detail") ?? "",
      };
    }
    case "run_terminal": {
      if (runId === undefined) return null;
      const status = (pickString(r, "status") ?? "completed") as RunStatus;
      const exportArtifactRef = pickString(r, "exportArtifactRef", "export_artifact_ref") ?? null;
      return { type, runId, status, exportArtifactRef };
    }
    default:
      return null;
  }
}
