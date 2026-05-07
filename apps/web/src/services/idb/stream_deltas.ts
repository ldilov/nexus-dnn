import { openNexusDb } from "./db";
import type { StreamDeltaRow, StreamDeltaStatus } from "./schemas";

export async function appendDelta(row: StreamDeltaRow): Promise<void> {
  const db = await openNexusDb();
  await db.put("nexus-stream-deltas", row);
}

export async function getDeltasByRequest(
  deploymentId: string,
  threadId: string,
  requestId: string,
): Promise<StreamDeltaRow[]> {
  const db = await openNexusDb();
  const lower: [string, string, string, number] = [
    deploymentId,
    threadId,
    requestId,
    0,
  ];
  const upper: [string, string, string, number] = [
    deploymentId,
    threadId,
    requestId,
    Number.MAX_SAFE_INTEGER,
  ];
  const range = IDBKeyRange.bound(lower, upper, false, false);
  const rows = await db.getAll("nexus-stream-deltas", range);
  return [...rows].sort((a, b) => a.sequenceNumber - b.sequenceNumber);
}

export async function setRequestStatus(
  deploymentId: string,
  threadId: string,
  requestId: string,
  status: StreamDeltaStatus,
): Promise<number> {
  const db = await openNexusDb();
  const tx = db.transaction("nexus-stream-deltas", "readwrite");
  const lower: [string, string, string, number] = [
    deploymentId,
    threadId,
    requestId,
    0,
  ];
  const upper: [string, string, string, number] = [
    deploymentId,
    threadId,
    requestId,
    Number.MAX_SAFE_INTEGER,
  ];
  const range = IDBKeyRange.bound(lower, upper, false, false);
  let cursor = await tx.store.openCursor(range);
  let updated = 0;
  while (cursor) {
    if (cursor.value.status !== status) {
      await cursor.update({ ...cursor.value, status });
      updated += 1;
    }
    cursor = await cursor.continue();
  }
  await tx.done;
  return updated;
}

export async function evictDeltasOlderThan(
  cutoffTimestamp: number,
): Promise<number> {
  const db = await openNexusDb();
  const tx = db.transaction("nexus-stream-deltas", "readwrite");
  let cursor = await tx.store.openCursor();
  let removed = 0;
  while (cursor) {
    if (cursor.value.timestamp < cutoffTimestamp) {
      await cursor.delete();
      removed += 1;
    }
    cursor = await cursor.continue();
  }
  await tx.done;
  return removed;
}
