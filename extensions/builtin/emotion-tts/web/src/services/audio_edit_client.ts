/**
 * Spec 036 / US1 — typed wrappers for the EmotionTTS audio-edit HTTP surface.
 *
 * Three voice-asset routes are mounted under the host's generic dispatcher
 * prefix; see `extensions/builtin/emotion-tts/rust/src/router/audio_edit.rs`
 * and `specs/036-audio-editing/contracts/openapi-audio-edit.yaml`.
 *
 * Apply uses the JSON envelope wrapper (`apiFetch`); preview returns a binary
 * blob and clear returns 204 — both bypass `apiFetch` to keep the contract
 * predictable.
 */

import { apiFetch, EXTENSION_PREFIX } from "./http";

export type EditOpMode =
  | "trim"
  | "crop"
  | "normalize"
  | "speed"
  | "fade_in"
  | "fade_out"
  | "mute";

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

export type EditOp =
  | TrimOp
  | CropOp
  | NormalizeOp
  | SpeedOp
  | FadeInOp
  | FadeOutOp
  | MuteOp;

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

export class StaleDigestError extends Error {
  constructor(public readonly currentDigest: string, message: string) {
    super(message);
    this.name = "StaleDigestError";
  }
}

/** Apply a chain. Throws `StaleDigestError` on 409, generic Error otherwise. */
export async function applyVoiceAssetEdit(
  voiceAssetId: string,
  deploymentId: string,
  request: ApplyEditRequest,
): Promise<ApplyEditResponse> {
  const path = `/voice-assets/${encodeURIComponent(voiceAssetId)}/edit?deploymentId=${encodeURIComponent(deploymentId)}`;
  const url = `${EXTENSION_PREFIX}${path}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(request),
  });
  if (resp.status === 409) {
    const body = (await resp.json().catch(() => null)) as StaleDigestErrorBody | null;
    const current = body?.error?.current_digest ?? "";
    const message =
      body?.error?.message ??
      "Edit chain has changed in another tab. Reload to continue.";
    throw new StaleDigestError(current, message);
  }
  if (!resp.ok) {
    const body = (await resp.json().catch(() => null)) as
      | { error?: { message?: string } }
      | null;
    const message = body?.error?.message ?? `apply failed: ${resp.status}`;
    throw new Error(message);
  }
  return (await resp.json()) as ApplyEditResponse;
}

/**
 * Apply an edit chain to a single utterance within a completed run.
 * Mirrors `applyVoiceAssetEdit` but scoped to the per-segment endpoint
 * defined by spec 036 / US2. Throws `StaleDigestError` on 409.
 */
export async function applyUtteranceEdit(
  deploymentId: string,
  runId: string,
  utteranceId: string,
  request: ApplyEditRequest,
): Promise<ApplyEditResponse> {
  const path = `/deployments/${encodeURIComponent(deploymentId)}/runs/${encodeURIComponent(runId)}/utterances/${encodeURIComponent(utteranceId)}/edit`;
  const url = `${EXTENSION_PREFIX}${path}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "application/json" },
    body: JSON.stringify(request),
  });
  if (resp.status === 409) {
    const body = (await resp.json().catch(() => null)) as StaleDigestErrorBody | null;
    const current = body?.error?.current_digest ?? "";
    const message =
      body?.error?.message ??
      "Edit chain has changed in another tab. Reload to continue.";
    throw new StaleDigestError(current, message);
  }
  if (!resp.ok) {
    const body = (await resp.json().catch(() => null)) as
      | { error?: { message?: string } }
      | null;
    const message = body?.error?.message ?? `apply failed: ${resp.status}`;
    throw new Error(message);
  }
  return (await resp.json()) as ApplyEditResponse;
}

export async function clearVoiceAssetEdit(
  voiceAssetId: string,
  deploymentId: string,
): Promise<void> {
  const url = `${EXTENSION_PREFIX}/voice-assets/${encodeURIComponent(voiceAssetId)}/edit?deploymentId=${encodeURIComponent(deploymentId)}`;
  const resp = await fetch(url, { method: "DELETE" });
  if (!resp.ok && resp.status !== 204) {
    throw new Error(`clear edit failed: ${resp.status}`);
  }
}

export async function previewVoiceAssetEdit(
  voiceAssetId: string,
  deploymentId: string,
  chain: EditChain,
): Promise<Blob> {
  const url = `${EXTENSION_PREFIX}/voice-assets/${encodeURIComponent(voiceAssetId)}/edit/preview?deploymentId=${encodeURIComponent(deploymentId)}`;
  const resp = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json", accept: "audio/wav, audio/mpeg" },
    body: JSON.stringify({ chain }),
  });
  if (!resp.ok) {
    const body = (await resp.json().catch(() => null)) as
      | { error?: { message?: string } }
      | null;
    const message = body?.error?.message ?? `preview failed: ${resp.status}`;
    throw new Error(message);
  }
  return resp.blob();
}

/** Generate an opaque alphanumeric op id, ULID-shaped (26 chars, upper-case). */
export function newOperationId(): string {
  return crypto.randomUUID().replace(/-/g, "").slice(0, 26).toUpperCase();
}

export interface ChainValidationError {
  message: string;
  opId?: string;
}

/**
 * Client-side chain validation. Mirrors the server-side rules so the UI can
 * surface inline errors without a round-trip. Returns null when the chain is
 * valid; never throws.
 */
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
      if (
        op.target_lufs < NORMALIZE_LUFS_MIN ||
        op.target_lufs > NORMALIZE_LUFS_MAX
      ) {
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
