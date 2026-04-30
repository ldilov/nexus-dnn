export type DraftId = string & { readonly __brand: "DraftId" };
export type StreamId = string & { readonly __brand: "StreamId" };

export const draftId = (raw: string): DraftId => raw as DraftId;
export const streamId = (raw: string): StreamId => raw as StreamId;

export type SuggestionIntent =
  | "complete-line"
  | "rewrite-line"
  | "next-step-suggestion";

export interface SuggestionRequestContext {
  draft_text: string;
  active_line_text: string;
  preceding_lines?: number;
}

export interface SuggestionRequest {
  cursor_line: number;
  intent?: SuggestionIntent;
  context: SuggestionRequestContext;
  max_tokens?: number;
}

export interface StreamStartedEvent {
  type: "stream_started";
  stream_id: StreamId;
  started_at: string;
  lease_id: string;
}

export interface TokenEvent {
  type: "token";
  delta: string;
}

export interface PartialEvent {
  type: "partial";
  text: string;
  line_offset: number;
}

export interface CompleteEvent {
  type: "complete";
  final_text: string;
  tokens_emitted: number;
  elapsed_ms: number;
}

export interface ErrorEvent {
  type: "error";
  code: string;
  message: string;
  retryable: boolean;
}

export interface CancelledEvent {
  type: "cancelled";
  reason: string;
  tokens_emitted: number;
  elapsed_ms: number;
}

export type SuggestionEvent =
  | StreamStartedEvent
  | TokenEvent
  | PartialEvent
  | CompleteEvent
  | ErrorEvent
  | CancelledEvent;

export interface NoBackendError {
  code: "no_backend_leasable";
  message: string;
  cta?: { label?: string; href?: string };
}

export interface ValidationError {
  code: "validation_error";
  message: string;
  details?: Record<string, string>;
}

export interface NotFoundError {
  code: "not_found";
  message: string;
}

export type StartStreamFailure =
  | { kind: "no_backend"; payload: NoBackendError }
  | { kind: "validation"; payload: ValidationError }
  | { kind: "not_found"; payload: NotFoundError }
  | { kind: "transport"; status: number; message: string };

export interface OpenStreamHandlers {
  onEvent: (event: SuggestionEvent) => void;
  onFailure: (failure: StartStreamFailure) => void;
  onClose: () => void;
}

export interface OpenStreamOptions {
  draftId: DraftId;
  request: SuggestionRequest;
  signal?: AbortSignal;
  handlers: OpenStreamHandlers;
}

const TERMINAL_EVENTS: ReadonlySet<SuggestionEvent["type"]> = new Set([
  "complete",
  "error",
  "cancelled",
]);

export async function openSuggestionStream(opts: OpenStreamOptions): Promise<void> {
  const { draftId, request, signal, handlers } = opts;
  const url = `/api/v1/modules/drafts/${encodeURIComponent(draftId)}/suggestions`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        accept: "text/event-stream",
      },
      body: JSON.stringify(request),
      signal,
    });
  } catch (err) {
    if (signal?.aborted) {
      handlers.onClose();
      return;
    }
    handlers.onFailure({
      kind: "transport",
      status: 0,
      message: err instanceof Error ? err.message : "network error",
    });
    handlers.onClose();
    return;
  }

  if (response.status === 503) {
    const body = await safeJson(response);
    handlers.onFailure({ kind: "no_backend", payload: body as NoBackendError });
    handlers.onClose();
    return;
  }

  if (response.status === 400) {
    const body = await safeJson(response);
    handlers.onFailure({ kind: "validation", payload: body as ValidationError });
    handlers.onClose();
    return;
  }

  if (response.status === 404) {
    handlers.onFailure({
      kind: "not_found",
      payload: {
        code: "not_found",
        message: `Draft "${opts.draftId}" not found.`,
      },
    });
    handlers.onClose();
    return;
  }

  if (!response.ok || !response.body) {
    handlers.onFailure({
      kind: "transport",
      status: response.status,
      message: `HTTP ${response.status}`,
    });
    handlers.onClose();
    return;
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      buffer += decoder.decode(value, { stream: true });
      let frameEnd = buffer.indexOf("\n\n");
      while (frameEnd !== -1) {
        const frame = buffer.slice(0, frameEnd);
        buffer = buffer.slice(frameEnd + 2);
        const event = parseFrame(frame);
        if (event) {
          handlers.onEvent(event);
          if (TERMINAL_EVENTS.has(event.type)) {
            await reader.cancel().catch(() => {});
            handlers.onClose();
            return;
          }
        }
        frameEnd = buffer.indexOf("\n\n");
      }
    }
  } catch (err) {
    if (!signal?.aborted) {
      handlers.onFailure({
        kind: "transport",
        status: 0,
        message: err instanceof Error ? err.message : "stream read failed",
      });
    }
  } finally {
    handlers.onClose();
  }
}

export async function cancelStream(
  draftId: DraftId,
  streamId: StreamId,
  signal?: AbortSignal,
): Promise<void> {
  const url = `/api/v1/modules/drafts/${encodeURIComponent(draftId)}/suggestions/${encodeURIComponent(streamId)}/cancel`;
  // Fire-and-forget by design: the SSE body close is the authoritative
  // cancel signal; this POST is courtesy-only for server-side accounting
  // (per `contracts/draft_suggestions.events.md`). Errors (network,
  // 5xx) are intentionally swallowed.
  await fetch(url, { method: "POST", signal }).catch(() => {});
}

function parseFrame(frame: string): SuggestionEvent | null {
  let eventName: string | null = null;
  const dataLines: string[] = [];
  for (const line of frame.split("\n")) {
    if (line.startsWith(":")) continue;
    if (line.startsWith("event:")) {
      eventName = line.slice(6).trim();
    } else if (line.startsWith("data:")) {
      // SSE spec: strip exactly one optional leading space, never more.
      // `trimStart()` would corrupt JSON whose first character is an
      // intentional indent.
      const rest = line.slice(5);
      dataLines.push(rest.startsWith(" ") ? rest.slice(1) : rest);
    }
  }
  if (!eventName) return null;
  const dataStr = dataLines.join("\n");
  let data: unknown;
  try {
    data = dataStr ? JSON.parse(dataStr) : {};
  } catch {
    return null;
  }
  return assembleEvent(eventName, data);
}

function assembleEvent(name: string, data: unknown): SuggestionEvent | null {
  if (typeof data !== "object" || data === null) return null;
  const obj = data as Record<string, unknown>;
  switch (name) {
    case "stream_started":
      if (typeof obj.stream_id === "string") {
        return {
          type: "stream_started",
          stream_id: streamId(obj.stream_id),
          started_at: String(obj.started_at ?? ""),
          lease_id: String(obj.lease_id ?? ""),
        };
      }
      return null;
    case "token":
      if (typeof obj.delta === "string") {
        return { type: "token", delta: obj.delta };
      }
      return null;
    case "partial":
      if (typeof obj.text === "string") {
        return {
          type: "partial",
          text: obj.text,
          line_offset: Number(obj.line_offset ?? 0),
        };
      }
      return null;
    case "complete":
      return {
        type: "complete",
        final_text: String(obj.final_text ?? ""),
        tokens_emitted: Number(obj.tokens_emitted ?? 0),
        elapsed_ms: Number(obj.elapsed_ms ?? 0),
      };
    case "error":
      return {
        type: "error",
        code: String(obj.code ?? "internal"),
        message: String(obj.message ?? ""),
        retryable: Boolean(obj.retryable),
      };
    case "cancelled":
      return {
        type: "cancelled",
        reason: String(obj.reason ?? ""),
        tokens_emitted: Number(obj.tokens_emitted ?? 0),
        elapsed_ms: Number(obj.elapsed_ms ?? 0),
      };
    default:
      return null;
  }
}

async function safeJson(response: Response): Promise<unknown> {
  // Trust-but-verify: the host typically returns the documented
  // typed envelopes (`NoBackendError` / `ValidationError`), but the
  // body could be malformed under a misconfigured proxy or a future
  // schema drift. Returning a synthetic envelope keeps the consumer's
  // `.code` / `.message` reads safe rather than throwing here.
  try {
    return await response.json();
  } catch {
    return {
      code: "internal",
      message: `HTTP ${response.status} (no JSON body)`,
    };
  }
}

