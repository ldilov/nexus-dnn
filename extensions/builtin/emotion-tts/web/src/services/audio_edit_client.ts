import { apiFetch, EXTENSION_PREFIX } from "./http";

export type EditOpMode =
  | "trim"
  | "crop"
  | "normalize"
  | "speed"
  | "fade_in"
  | "fade_out"
  | "mute"
  | "gain"
  | "eq3"
  | "pitch_shift"
  | "silence_strip";

export interface EditOpBase {
  id: string;
  mode: EditOpMode;
}

export interface TrimOp extends EditOpBase {
  mode: "trim";
  start_ms: number;
  end_ms: number;
}

export interface CropOp extends EditOpBase {
  mode: "crop";
  start_ms: number;
  end_ms: number;
}

export interface NormalizeOp extends EditOpBase {
  mode: "normalize";
  target_lufs: number;
}

export interface SpeedOp extends EditOpBase {
  mode: "speed";
  factor: number;
}

export interface FadeInOp extends EditOpBase {
  mode: "fade_in";
  duration_ms: number;
}

export interface FadeOutOp extends EditOpBase {
  mode: "fade_out";
  duration_ms: number;
}

export interface MuteOp extends EditOpBase {
  mode: "mute";
  start_ms: number;
  end_ms: number;
}

export interface GainOp extends EditOpBase {
  mode: "gain";
  gain_db: number;
}

export interface Eq3Op extends EditOpBase {
  mode: "eq3";
  low_db: number;
  mid_db: number;
  high_db: number;
}

export interface PitchShiftOp extends EditOpBase {
  mode: "pitch_shift";
  semitones: number;
}

export interface SilenceStripOp extends EditOpBase {
  mode: "silence_strip";
  threshold_db: number;
}

export type EditOp =
  | TrimOp
  | CropOp
  | NormalizeOp
  | SpeedOp
  | FadeInOp
  | FadeOutOp
  | MuteOp
  | GainOp
  | Eq3Op
  | PitchShiftOp
  | SilenceStripOp;

export interface EditChain {
  version: 1;
  ops: EditOp[];
}

export interface ApplyEditRequest {
  chain: EditChain;
  digest_before?: string;
}

export interface PerOpDuration {
  op_id: string;
  duration_ms: number;
}

export interface ApplyEditResponse {
  chain_digest: string;
  derived_artifact_ref: string;
  source_duration_ms: number;
  derived_duration_ms: number;
  measured_lufs?: number | null;
  per_op_durations_ms: PerOpDuration[];
  warnings: string[];
}

export interface StaleDigestErrorBody {
  error: {
    code: "stale_digest";
    message: string;
    current_digest: string;
  };
}

export const MAX_CHAIN_OPS = 32;
export const NORMALIZE_LUFS_MIN = -30.0;
export const NORMALIZE_LUFS_MAX = -6.0;
export const SPEED_FACTOR_MIN = 0.5;
export const SPEED_FACTOR_MAX = 2.0;
export const GAIN_DB_MIN = -24.0;
export const GAIN_DB_MAX = 24.0;
export const EQ3_BAND_DB_MIN = -12.0;
export const EQ3_BAND_DB_MAX = 12.0;
export const PITCH_SHIFT_MIN = -12.0;
export const PITCH_SHIFT_MAX = 12.0;
export const SILENCE_STRIP_THRESHOLD_MIN = -60.0;
export const SILENCE_STRIP_THRESHOLD_MAX = -20.0;

export class StaleDigestError extends Error {
  constructor(public readonly currentDigest: string, message: string) {
    super(message);
    this.name = "StaleDigestError";
  }
}

export interface FetchOptions {
  signal?: AbortSignal;
}

export async function applyVoiceAssetEdit(
  voiceAssetId: string,
  deploymentId: string,
  request: ApplyEditRequest,
  options: FetchOptions = {},
): Promise<ApplyEditResponse> {
  const path = `/voice-assets/${encodeURIComponent(voiceAssetId)}/edit?deploymentId=${encodeURIComponent(deploymentId)}`;
  const url = `${EXTENSION_PREFIX}${path}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(request),
    ...(options.signal ? { signal: options.signal } : {}),
  });
  if (resp.status === 409) {
    const body = (await resp.json().catch(() => null)) as StaleDigestErrorBody | null;
    const current = body?.error?.current_digest ?? "";
    const message =
      body?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new StaleDigestError(current, message);
  }
  if (!resp.ok) {
    throw new Error(await readErrorMessage(resp, "apply"));
  }
  return (await resp.json()) as ApplyEditResponse;
}

export async function applyUtteranceEdit(
  deploymentId: string,
  runId: string,
  utteranceId: string,
  request: ApplyEditRequest,
  options: FetchOptions = {},
): Promise<ApplyEditResponse> {
  const path = `/deployments/${encodeURIComponent(deploymentId)}/runs/${encodeURIComponent(runId)}/utterances/${encodeURIComponent(utteranceId)}/edit`;
  const url = `${EXTENSION_PREFIX}${path}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(request),
    ...(options.signal ? { signal: options.signal } : {}),
  });
  if (resp.status === 409) {
    const body = (await resp.json().catch(() => null)) as StaleDigestErrorBody | null;
    const current = body?.error?.current_digest ?? "";
    const message =
      body?.error?.message ?? "Edit chain has changed in another tab. Reload to continue.";
    throw new StaleDigestError(current, message);
  }
  if (!resp.ok) {
    throw new Error(await readErrorMessage(resp, "apply"));
  }
  return (await resp.json()) as ApplyEditResponse;
}

export async function clearVoiceAssetEdit(
  voiceAssetId: string,
  deploymentId: string,
  options: FetchOptions = {},
): Promise<void> {
  const url = `${EXTENSION_PREFIX}/voice-assets/${encodeURIComponent(voiceAssetId)}/edit?deploymentId=${encodeURIComponent(deploymentId)}`;
  const resp = await fetch(url, {
    method: "DELETE",
    ...(options.signal ? { signal: options.signal } : {}),
  });
  if (!resp.ok && resp.status !== 204) {
    throw new Error(`clear edit failed: ${resp.status}`);
  }
}

export async function previewVoiceAssetEdit(
  voiceAssetId: string,
  deploymentId: string,
  chain: EditChain,
  options: FetchOptions = {},
): Promise<Blob> {
  const url = `${EXTENSION_PREFIX}/voice-assets/${encodeURIComponent(voiceAssetId)}/edit/preview?deploymentId=${encodeURIComponent(deploymentId)}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain }),
    ...(options.signal ? { signal: options.signal } : {}),
  });
  if (!resp.ok) {
    throw new Error(await readErrorMessage(resp, "preview"));
  }
  return resp.blob();
}

export interface AuditEntry {
  entry_id: string;
  target_id: string;
  target_kind: "voice_asset" | "utterance";
  digest_before: string;
  digest_after: string;
  operation_count: number;
  recorded_at: string;
  actor: string;
  chain_snapshot_json?: string | null;
}

export interface AuditLogResponse {
  entries: AuditEntry[];
}

export async function fetchAuditLog(
  deploymentId: string,
  targetKind: "voice_asset" | "utterance",
  targetId: string,
  limit = 50,
  options: FetchOptions = {},
): Promise<AuditLogResponse> {
  const url =
    `${EXTENSION_PREFIX}/audit/${encodeURIComponent(targetKind)}/${encodeURIComponent(targetId)}` +
    `?deploymentId=${encodeURIComponent(deploymentId)}&limit=${encodeURIComponent(String(limit))}`;
  const resp = await fetch(url, {
    method: "GET",
    headers: { accept: "application/json" },
    ...(options.signal ? { signal: options.signal } : {}),
  });
  if (!resp.ok) {
    throw new Error(await readErrorMessage(resp, "audit fetch"));
  }
  return (await resp.json()) as AuditLogResponse;
}

export function newOperationId(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}

export interface ChainValidationError {
  message: string;
  opId?: string;
}

export function validateChain(
  chain: EditChain,
  sourceDurationMs: number,
): ChainValidationError | null {
  if (chain.version !== 1) {
    return { message: "Unsupported chain version." };
  }
  if (chain.ops.length > MAX_CHAIN_OPS) {
    return {
      message: `Chain exceeds the maximum of ${MAX_CHAIN_OPS} operations.`,
    };
  }
  for (const op of chain.ops) {
    const err = validateOp(op, sourceDurationMs);
    if (err) return err;
  }
  return null;
}

function validateOp(op: EditOp, sourceDurationMs: number): ChainValidationError | null {
  switch (op.mode) {
    case "trim":
    case "crop":
    case "mute":
      return validateRange(op.id, op.start_ms, op.end_ms, sourceDurationMs);
    case "normalize":
      if (op.target_lufs < NORMALIZE_LUFS_MIN || op.target_lufs > NORMALIZE_LUFS_MAX) {
        return {
          opId: op.id,
          message: `Normalize target must be between ${NORMALIZE_LUFS_MIN} and ${NORMALIZE_LUFS_MAX} LUFS.`,
        };
      }
      return null;
    case "speed":
      if (op.factor < SPEED_FACTOR_MIN || op.factor > SPEED_FACTOR_MAX) {
        return {
          opId: op.id,
          message: `Speed factor must be between ${SPEED_FACTOR_MIN}× and ${SPEED_FACTOR_MAX}×.`,
        };
      }
      return null;
    case "fade_in":
    case "fade_out":
      if (op.duration_ms < 1) {
        return { opId: op.id, message: "Fade duration must be at least 1 ms." };
      }
      return null;
    case "gain":
      if (op.gain_db < GAIN_DB_MIN || op.gain_db > GAIN_DB_MAX) {
        return {
          opId: op.id,
          message: `Volume must be between ${GAIN_DB_MIN} and ${GAIN_DB_MAX} dB.`,
        };
      }
      return null;
    case "eq3":
      for (const [name, value] of [
        ["low_db", op.low_db],
        ["mid_db", op.mid_db],
        ["high_db", op.high_db],
      ] as const) {
        if (value < EQ3_BAND_DB_MIN || value > EQ3_BAND_DB_MAX) {
          return {
            opId: op.id,
            message: `EQ ${name} must be between ${EQ3_BAND_DB_MIN} and ${EQ3_BAND_DB_MAX} dB.`,
          };
        }
      }
      return null;
    case "pitch_shift":
      if (op.semitones < PITCH_SHIFT_MIN || op.semitones > PITCH_SHIFT_MAX) {
        return {
          opId: op.id,
          message: `Pitch must be between ${PITCH_SHIFT_MIN} and ${PITCH_SHIFT_MAX} semitones.`,
        };
      }
      return null;
    case "silence_strip":
      if (
        op.threshold_db < SILENCE_STRIP_THRESHOLD_MIN ||
        op.threshold_db > SILENCE_STRIP_THRESHOLD_MAX
      ) {
        return {
          opId: op.id,
          message: `Silence threshold must be between ${SILENCE_STRIP_THRESHOLD_MIN} and ${SILENCE_STRIP_THRESHOLD_MAX} dB.`,
        };
      }
      return null;
    default: {
      const exhaustive: never = op;
      void exhaustive;
      return {
        message: "Unknown edit op mode in chain — refusing to apply.",
      };
    }
  }
}

function validateRange(
  opId: string,
  startMs: number,
  endMs: number,
  sourceDurationMs: number,
): ChainValidationError | null {
  if (startMs < 0) {
    return { opId, message: "Start must be ≥ 0 ms." };
  }
  if (endMs <= startMs) {
    return { opId, message: "End must be greater than start." };
  }
  if (sourceDurationMs > 0 && endMs > sourceDurationMs) {
    return { opId, message: "End extends past source duration." };
  }
  return null;
}

async function readErrorMessage(resp: Response, action: string): Promise<string> {
  const body = (await resp.json().catch(() => null)) as
    | { error?: { message?: string }; message?: string }
    | null;
  return body?.error?.message ?? body?.message ?? `${action} failed: ${resp.status}`;
}
