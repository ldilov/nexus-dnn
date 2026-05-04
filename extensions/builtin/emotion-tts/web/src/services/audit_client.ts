import type { AuditEntry } from "./audio_edit_client";
import { fetchAuditLog } from "./audio_edit_client";

export type { AuditEntry };

export interface AuditEvent {
  id: string;
  targetKind: "voice_asset" | "utterance";
  targetId: string;
  chainDigest: string;
  digestBefore: string;
  opCount: number;
  actor: string | null;
  action: "create" | "update" | "revert";
  at: number;
}

export interface ListAuditEventsRequest {
  deploymentId: string;
  targetKind: "voice_asset" | "utterance";
  targetId: string;
  limit?: number;
  cursor?: string;
}

export interface ListAuditEventsResponse {
  events: AuditEvent[];
  nextCursor: string | null;
}

export async function listAuditEvents(
  request: ListAuditEventsRequest,
): Promise<ListAuditEventsResponse> {
  const limit = request.limit ?? 50;
  const log = await fetchAuditLog(
    request.deploymentId,
    request.targetKind,
    request.targetId,
    limit,
  );
  const events = log.entries.map(toAuditEvent);
  return { events, nextCursor: null };
}

function toAuditEvent(entry: AuditEntry): AuditEvent {
  const at = parseRecordedAt(entry.recorded_at);
  return {
    id: entry.entry_id,
    targetKind: entry.target_kind,
    targetId: entry.target_id,
    chainDigest: entry.digest_after,
    digestBefore: entry.digest_before,
    opCount: entry.operation_count,
    actor: entry.actor || null,
    action: classifyAction(entry.digest_before, entry.digest_after),
    at,
  };
}

function classifyAction(before: string, after: string): "create" | "update" | "revert" {
  if (!before || before === "") return "create";
  if (before === after) return "revert";
  return "update";
}

function parseRecordedAt(raw: string): number {
  const parsed = Date.parse(raw);
  if (Number.isFinite(parsed)) return Math.floor(parsed / 1000);
  const numeric = Number(raw);
  return Number.isFinite(numeric) ? Math.floor(numeric) : 0;
}
