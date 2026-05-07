import { openNexusDb } from "./db";
import type { ComposerDraftRow } from "./schemas";

export async function getDraft(
  deploymentId: string,
  threadId: string,
): Promise<ComposerDraftRow | null> {
  const db = await openNexusDb();
  const row = await db.get("nexus-composer-drafts", [deploymentId, threadId]);
  return row ?? null;
}

export async function putDraft(row: ComposerDraftRow): Promise<void> {
  if (row.text.length === 0) {
    await deleteDraft(row.deploymentId, row.threadId);
    return;
  }
  const db = await openNexusDb();
  await db.put("nexus-composer-drafts", row);
}

export async function deleteDraft(
  deploymentId: string,
  threadId: string,
): Promise<void> {
  const db = await openNexusDb();
  await db.delete("nexus-composer-drafts", [deploymentId, threadId]);
}
