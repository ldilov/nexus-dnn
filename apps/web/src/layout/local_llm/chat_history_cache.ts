import {
  getCachedMessages,
  getCachedThreads,
  putCachedMessages,
  putCachedThreads,
  removeCachedThread,
} from "../../services/idb/chat_history";
import type {
  ChatMessageCacheRow,
  ChatThreadCacheRow,
} from "../../services/idb/schemas";
import type { ChatThread } from "../../services/extension_chat";

export interface CachedRuntimeMessage {
  readonly id: string;
  readonly role: "user" | "assistant";
  readonly text: string;
  readonly status: "complete" | "pending" | "failed";
  readonly createdAt: string;
}

function chatThreadToRow(
  thread: ChatThread,
  deploymentId: string,
  cachedAt: number,
): ChatThreadCacheRow {
  return {
    deploymentId,
    threadId: thread.thread_id,
    title: thread.title_resolved,
    createdAt: thread.created_at,
    updatedAt: thread.updated_at,
    cachedAt,
  };
}

function rowToChatThread(row: ChatThreadCacheRow, deploymentId: string): ChatThread {
  return {
    thread_id: row.threadId,
    extension_id: "nexus.local-llm",
    deployment_id: deploymentId,
    install_id: null,
    title: row.title || null,
    title_auto: null,
    title_resolved: row.title || "Untitled",
    system_prompt: null,
    sampler_override: null,
    is_unbound: false,
    created_at: row.createdAt,
    updated_at: row.updatedAt,
  };
}

function runtimeMessageToRow(
  message: CachedRuntimeMessage,
  deploymentId: string,
  threadId: string,
  cachedAt: number,
): ChatMessageCacheRow {
  return {
    deploymentId,
    threadId,
    messageId: message.id,
    role: message.role,
    content: message.text,
    createdAt: message.createdAt,
    status: message.status === "failed" ? "error" : message.status === "pending" ? "pending" : "complete",
    cachedAt,
  };
}

function rowToRuntimeMessage(row: ChatMessageCacheRow): CachedRuntimeMessage | null {
  if (row.role !== "user" && row.role !== "assistant") return null;
  const status: CachedRuntimeMessage["status"] =
    row.status === "error" ? "failed" : row.status === "pending" ? "pending" : "complete";
  return {
    id: row.messageId,
    role: row.role,
    text: row.content,
    status,
    createdAt: row.createdAt,
  };
}

export async function loadCachedThreadsForDeployment(
  deploymentId: string,
): Promise<ChatThread[]> {
  try {
    const rows = await getCachedThreads(deploymentId);
    const threads = rows.map((row) => rowToChatThread(row, deploymentId));
    threads.sort((a, b) => (a.updated_at < b.updated_at ? 1 : -1));
    return threads;
  } catch {
    return [];
  }
}

export async function persistThreadsCache(
  deploymentId: string,
  threads: readonly ChatThread[],
): Promise<void> {
  try {
    const cachedAt = Date.now();
    const incoming = threads.map((thread) => chatThreadToRow(thread, deploymentId, cachedAt));
    const existing = await getCachedThreads(deploymentId);
    const incomingIds = new Set(threads.map((t) => t.thread_id));
    for (const stale of existing) {
      if (!incomingIds.has(stale.threadId)) {
        await removeCachedThread(deploymentId, stale.threadId);
      }
    }
    await putCachedThreads(incoming);
  } catch {
    /* IDB unavailable — non-fatal */
  }
}

export async function loadCachedMessages(
  deploymentId: string,
  threadId: string,
): Promise<CachedRuntimeMessage[]> {
  try {
    const rows = await getCachedMessages(deploymentId, threadId);
    return rows
      .map(rowToRuntimeMessage)
      .filter((message): message is CachedRuntimeMessage => message !== null);
  } catch {
    return [];
  }
}

export async function persistMessagesCache(
  deploymentId: string,
  threadId: string,
  messages: readonly CachedRuntimeMessage[],
): Promise<void> {
  try {
    const cachedAt = Date.now();
    const rows = messages.map((message) =>
      runtimeMessageToRow(message, deploymentId, threadId, cachedAt),
    );
    await putCachedMessages(rows);
  } catch {
    /* IDB unavailable — non-fatal */
  }
}

export async function invalidateCachedThread(
  deploymentId: string,
  threadId: string,
): Promise<void> {
  try {
    await removeCachedThread(deploymentId, threadId);
  } catch {
    /* IDB unavailable — non-fatal */
  }
}
