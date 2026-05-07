import { openNexusDb } from "./db";
import type { RuntimeLeaderRow } from "./schemas";

export async function getLeader(
  deploymentId: string,
  modelKey: string,
): Promise<RuntimeLeaderRow | null> {
  const db = await openNexusDb();
  const row = await db.get("nexus-runtime-leaders", [deploymentId, modelKey]);
  return row ?? null;
}

export async function claimLeader(row: RuntimeLeaderRow): Promise<void> {
  const db = await openNexusDb();
  await db.put("nexus-runtime-leaders", row);
}

export async function updateHeartbeat(
  deploymentId: string,
  modelKey: string,
  leaderTabId: string,
  heartbeatAt: number,
): Promise<boolean> {
  const db = await openNexusDb();
  const tx = db.transaction("nexus-runtime-leaders", "readwrite");
  const existing = await tx.store.get([deploymentId, modelKey]);
  if (!existing || existing.leaderTabId !== leaderTabId) {
    await tx.done;
    return false;
  }
  await tx.store.put({ ...existing, heartbeatAt });
  await tx.done;
  return true;
}

export async function releaseLeader(
  deploymentId: string,
  modelKey: string,
  leaderTabId: string,
): Promise<boolean> {
  const db = await openNexusDb();
  const tx = db.transaction("nexus-runtime-leaders", "readwrite");
  const existing = await tx.store.get([deploymentId, modelKey]);
  if (!existing || existing.leaderTabId !== leaderTabId) {
    await tx.done;
    return false;
  }
  await tx.store.delete([deploymentId, modelKey]);
  await tx.done;
  return true;
}
