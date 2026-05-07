/// <reference lib="webworker" />

import { openNexusDb } from "../services/idb/db";

const STREAM_DELTAS_STORE = "nexus-stream-deltas";
const BROADCAST_TOPIC = "nexus-sse-broker";

const DIRECT_LLAMA_PATH = "/v1/chat/completions";
const HOST_LLM_STREAM_PATH = "/inference/stream";

interface BrokerKey {
  readonly deploymentId: string;
  readonly threadId: string;
  readonly requestId: string;
}

interface BrokerSlot {
  readonly key: BrokerKey;
  readonly broadcast: BroadcastChannel;
  readonly subscribers: Set<ReadableStreamDefaultController<Uint8Array>>;
  readonly decoder: TextDecoder;
  upstreamController: AbortController;
  sequenceNumber: number;
  lastSeenAt: number;
  closed: boolean;
}

type BrokerMessage =
  | { type: "delta"; topic: string; sequenceNumber: number; chunk: string }
  | { type: "done"; topic: string }
  | { type: "error"; topic: string; message: string };

const slots: Map<string, Promise<BrokerSlot>> = new Map();

function topicKey(key: BrokerKey): string {
  return `${key.deploymentId}::${key.threadId}::${key.requestId}`;
}

function topicChannel(key: BrokerKey): string {
  return `${BROADCAST_TOPIC}::${topicKey(key)}`;
}

async function persistDelta(
  key: BrokerKey,
  sequenceNumber: number,
  chunk: string,
): Promise<void> {
  try {
    const db = await openNexusDb();
    await db.put(STREAM_DELTAS_STORE, {
      deploymentId: key.deploymentId,
      threadId: key.threadId,
      requestId: key.requestId,
      sequenceNumber,
      chunk,
      timestamp: Date.now(),
      status: "in_progress",
    });
  } catch {
    /* IDB unavailable — best effort */
  }
}

async function markCompleted(key: BrokerKey): Promise<void> {
  try {
    const db = await openNexusDb();
    const tx = db.transaction(STREAM_DELTAS_STORE, "readwrite");
    const lower: [string, string, string, number] = [
      key.deploymentId,
      key.threadId,
      key.requestId,
      0,
    ];
    const upper: [string, string, string, number] = [
      key.deploymentId,
      key.threadId,
      key.requestId,
      Number.POSITIVE_INFINITY,
    ];
    const range = IDBKeyRange.bound(lower, upper, false, false);
    let cursor = await tx.store.openCursor(range);
    while (cursor) {
      if (cursor.value.status === "in_progress") {
        await cursor.update({ ...cursor.value, status: "completed" });
      }
      cursor = await cursor.continue();
    }
    await tx.done;
  } catch {
    /* IDB unavailable — best effort */
  }
}

export interface ParsedBrokerRequest {
  readonly key: BrokerKey;
  readonly upstreamRequest: Request;
}

export function shouldIntercept(request: Request): boolean {
  if (request.method !== "POST") return false;
  try {
    const url = new URL(request.url);
    if (
      url.hostname === "127.0.0.1" ||
      url.hostname === "localhost"
    ) {
      return url.pathname.endsWith(DIRECT_LLAMA_PATH);
    }
    return url.pathname.endsWith(HOST_LLM_STREAM_PATH);
  } catch {
    return false;
  }
}

export async function extractBrokerKey(
  request: Request,
): Promise<BrokerKey | null> {
  try {
    const cloned = request.clone();
    const body = (await cloned.json()) as Record<string, unknown>;
    const deploymentId = readString(body, ["deployment_id", "deploymentId"]);
    const threadId = readString(body, ["thread_id", "threadId"]);
    const requestId = readString(body, ["request_id", "requestId"]);
    if (!deploymentId || !threadId || !requestId) return null;
    return { deploymentId, threadId, requestId };
  } catch {
    return null;
  }
}

function readString(body: Record<string, unknown>, names: string[]): string | null {
  for (const name of names) {
    const value = body[name];
    if (typeof value === "string" && value.length > 0) return value;
  }
  return null;
}

export async function handleBrokerFetch(request: Request): Promise<Response> {
  const key = await extractBrokerKey(request);
  if (!key) {
    return fetch(request);
  }
  const tk = topicKey(key);
  const existing = slots.get(tk);
  if (existing) {
    const slot = await existing;
    return attachSubscriberToSlot(slot).response;
  }
  const slotPromise = openSlot(key, request);
  slots.set(tk, slotPromise);
  const slot = await slotPromise;
  return attachSubscriberToSlot(slot).response;
}

async function openSlot(key: BrokerKey, request: Request): Promise<BrokerSlot> {
  const broadcast = new BroadcastChannel(topicChannel(key));
  const slot: BrokerSlot = {
    key,
    broadcast,
    subscribers: new Set(),
    decoder: new TextDecoder(),
    upstreamController: new AbortController(),
    sequenceNumber: 0,
    lastSeenAt: Date.now(),
    closed: false,
  };

  const upstreamInit: RequestInit = {
    method: request.method,
    headers: request.headers,
    body: await request.clone().text(),
    signal: slot.upstreamController.signal,
    credentials: "omit",
    mode: request.mode === "cors" ? "cors" : undefined,
  };
  void runUpstream(slot, request.url, upstreamInit);
  return slot;
}

async function runUpstream(
  slot: BrokerSlot,
  url: string,
  init: RequestInit,
): Promise<void> {
  let response: Response;
  try {
    response = await fetch(url, init);
  } catch (err) {
    publishError(slot, err);
    closeSlot(slot);
    return;
  }
  if (!response.ok || !response.body) {
    publishError(slot, new Error(`HTTP ${response.status}`));
    closeSlot(slot);
    return;
  }
  const reader = response.body.getReader();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      slot.lastSeenAt = Date.now();
      slot.sequenceNumber += 1;
      const chunk = slot.decoder.decode(value, { stream: true });
      await persistDelta(slot.key, slot.sequenceNumber, chunk);
      publishDelta(slot, chunk);
    }
    const tail = slot.decoder.decode();
    if (tail.length > 0) {
      slot.sequenceNumber += 1;
      await persistDelta(slot.key, slot.sequenceNumber, tail);
      publishDelta(slot, tail);
    }
  } catch (err) {
    publishError(slot, err);
  } finally {
    publishDone(slot);
    await markCompleted(slot.key);
    closeSlot(slot);
  }
}

interface SubscriberAttachment {
  readonly response: Response;
}

function attachSubscriberToSlot(slot: BrokerSlot): SubscriberAttachment {
  let cancelled = false;
  let controller: ReadableStreamDefaultController<Uint8Array> | null = null;
  const onMessage = (event: MessageEvent<BrokerMessage>) => {
    if (cancelled || !controller) return;
    const data = event.data;
    if (data.type === "delta") {
      controller.enqueue(new TextEncoder().encode(data.chunk));
    } else if (data.type === "done") {
      try {
        controller.close();
      } catch {
        /* already closed */
      }
    } else if (data.type === "error") {
      try {
        controller.error(new Error(data.message));
      } catch {
        /* already closed */
      }
    }
  };
  const localChannel = new BroadcastChannel(topicChannel(slot.key));
  localChannel.addEventListener("message", onMessage);

  const stream = new ReadableStream<Uint8Array>({
    start(c) {
      controller = c;
      slot.subscribers.add(c);
    },
    cancel() {
      cancelled = true;
      if (controller) slot.subscribers.delete(controller);
      localChannel.removeEventListener("message", onMessage);
      localChannel.close();
    },
  });
  return {
    response: new Response(stream, {
      status: 200,
      headers: { "Content-Type": "text/event-stream" },
    }),
  };
}

function publishDelta(slot: BrokerSlot, chunk: string): void {
  const message: BrokerMessage = {
    type: "delta",
    topic: topicKey(slot.key),
    sequenceNumber: slot.sequenceNumber,
    chunk,
  };
  slot.broadcast.postMessage(message);
}

function publishDone(slot: BrokerSlot): void {
  if (slot.closed) return;
  const message: BrokerMessage = { type: "done", topic: topicKey(slot.key) };
  slot.broadcast.postMessage(message);
}

function publishError(slot: BrokerSlot, err: unknown): void {
  if (slot.closed) return;
  const message: BrokerMessage = {
    type: "error",
    topic: topicKey(slot.key),
    message: err instanceof Error ? err.message : String(err),
  };
  slot.broadcast.postMessage(message);
}

function closeSlot(slot: BrokerSlot): void {
  if (slot.closed) return;
  slot.closed = true;
  try {
    slot.upstreamController.abort();
  } catch {
    /* already aborted */
  }
  slot.broadcast.close();
  slots.delete(topicKey(slot.key));
}

export async function __resetBrokerForTests(): Promise<void> {
  if (!import.meta.env.TEST) return;
  const pending = Array.from(slots.values());
  slots.clear();
  for (const promise of pending) {
    try {
      const slot = await promise;
      slot.upstreamController.abort();
      slot.broadcast.close();
    } catch {
      /* swallow */
    }
  }
}
