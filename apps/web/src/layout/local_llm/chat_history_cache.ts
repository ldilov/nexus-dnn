import {
  getCachedMessages,
  getCachedThreads,
  putCachedMessages,
  putCachedThreads,
  removeCachedThread,
} from "../../services/idb/chat_history";
import { getDeltasByRequest } from "../../services/idb/stream_deltas";
import { openNexusDb } from "../../services/idb/db";
import type {
  ChatMessageCacheRow,
  ChatThreadCacheRow,
  StreamDeltaRow,
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

const LOCAL_LLM_EXTENSION_ID = "nexus.local-llm";

function rowToChatThread(row: ChatThreadCacheRow, deploymentId: string): ChatThread {
  return {
    thread_id: row.threadId,
    extension_id: LOCAL_LLM_EXTENSION_ID,
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

export interface InterruptedReply {
  readonly requestId: string;
  readonly text: string;
  readonly lastTimestamp: number;
}

function extractDeltaContent(rawSseFrame: string): string {
  let out = "";
  for (const line of rawSseFrame.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed.startsWith("data:")) continue;
    const payload = trimmed.slice(5).trim();
    if (payload === "[DONE]" || payload.length === 0) continue;
    try {
      const json = JSON.parse(payload) as {
        choices?: Array<{ delta?: { content?: string } }>;
      };
      const delta = json.choices?.[0]?.delta?.content;
      if (typeof delta === "string") out += delta;
    } catch {
      /* skip malformed frame */
    }
  }
  return out;
}

export async function loadInterruptedReply(
  deploymentId: string,
  threadId: string,
): Promise<InterruptedReply | null> {
  try {
    const db = await openNexusDb();
    const lower: [string, string, string, number] = [
      deploymentId,
      threadId,
      "",
      0,
    ];
    const upper: [string, string, string, number] = [
      deploymentId,
      threadId,
      "￿",
      Number.POSITIVE_INFINITY,
    ];
    const range = IDBKeyRange.bound(lower, upper, false, false);
    const rows = (await db.getAll(
      "nexus-stream-deltas",
      range,
    )) as StreamDeltaRow[];
    if (rows.length === 0) return null;
    const groups = new Map<string, StreamDeltaRow[]>();
    for (const row of rows) {
      const list = groups.get(row.requestId) ?? [];
      list.push(row);
      groups.set(row.requestId, list);
    }
    let best: InterruptedReply | null = null;
    for (const [requestId, group] of groups) {
      const isInProgress = group.some((r) => r.status === "in_progress");
      if (!isInProgress) continue;
      const sorted = [...group].sort(
        (a, b) => a.sequenceNumber - b.sequenceNumber,
      );
      const lastTimestamp = sorted[sorted.length - 1]!.timestamp;
      const text = sorted.map((r) => extractDeltaContent(r.chunk)).join("");
      if (text.length === 0) continue;
      if (!best || lastTimestamp > best.lastTimestamp) {
        best = { requestId, text, lastTimestamp };
      }
    }
    return best;
  } catch {
    return null;
  }
}

export async function loadDeltasForRequest(
  deploymentId: string,
  threadId: string,
  requestId: string,
): Promise<string> {
  try {
    const rows = await getDeltasByRequest(deploymentId, threadId, requestId);
    return rows.map((r) => extractDeltaContent(r.chunk)).join("");
  } catch {
    return "";
  }
}
