import { openNexusDb } from "./db";
import type { ChatMessageCacheRow, ChatThreadCacheRow } from "./schemas";

export async function getCachedThreads(
  deploymentId: string,
): Promise<ChatThreadCacheRow[]> {
  const db = await openNexusDb();
  const lower: [string, string] = [deploymentId, ""];
  const upper: [string, string] = [deploymentId, "￿"];
  const range = IDBKeyRange.bound(lower, upper, false, false);
  return db.getAll("nexus-chat-threads", range);
}

export async function putCachedThreads(
  rows: readonly ChatThreadCacheRow[],
): Promise<void> {
  if (rows.length === 0) return;
  const db = await openNexusDb();
  const tx = db.transaction("nexus-chat-threads", "readwrite");
  await Promise.all(rows.map((row) => tx.store.put(row)));
  await tx.done;
}

export async function removeCachedThread(
  deploymentId: string,
  threadId: string,
): Promise<void> {
  const db = await openNexusDb();
  const tx = db.transaction(
    ["nexus-chat-threads", "nexus-chat-messages"],
    "readwrite",
  );
  await tx.objectStore("nexus-chat-threads").delete([deploymentId, threadId]);
  const messagesStore = tx.objectStore("nexus-chat-messages");
  const lower: [string, string, string] = [deploymentId, threadId, ""];
  const upper: [string, string, string] = [deploymentId, threadId, "￿"];
  const range = IDBKeyRange.bound(lower, upper, false, false);
  let cursor = await messagesStore.openCursor(range);
  while (cursor) {
    await cursor.delete();
    cursor = await cursor.continue();
  }
  await tx.done;
}

export async function getCachedMessages(
  deploymentId: string,
  threadId: string,
): Promise<ChatMessageCacheRow[]> {
  const db = await openNexusDb();
  const lower: [string, string, string] = [deploymentId, threadId, ""];
  const upper: [string, string, string] = [
    deploymentId,
    threadId,
    "￿",
  ];
  const range = IDBKeyRange.bound(lower, upper, false, false);
  return db.getAllFromIndex(
    "nexus-chat-messages",
    "by_thread_created",
    range,
  );
}

export async function putCachedMessages(
  rows: readonly ChatMessageCacheRow[],
): Promise<void> {
  if (rows.length === 0) return;
  const db = await openNexusDb();
  const tx = db.transaction("nexus-chat-messages", "readwrite");
  await Promise.all(rows.map((row) => tx.store.put(row)));
  await tx.done;
}
