import { useCallback, useEffect, useRef, useState } from "react";
import {
  cancelStream,
  draftId as toDraftId,
  openSuggestionStream,
  type DraftId,
  type StreamId,
  type SuggestionEvent,
  type SuggestionIntent,
  type SuggestionRequest,
  type StartStreamFailure,
} from "../../services/draft_suggestions";

export type SuggestionPhase =
  | "idle"
  | "requesting"
  | "streaming"
  | "ready"
  | "dismissed"
  | "error"
  | "no_backend";

export interface SuggestionState {
  phase: SuggestionPhase;
  text: string;
  errorCode?: string;
  errorMessage?: string;
  errorRetryable?: boolean;
  noBackendCta?: { label?: string; href?: string };
}

export interface UseSuggestionStreamOptions {
  draftId: string;
  cursorLine: number;
  activeLineText: string;
  draftText: string;
  intent?: SuggestionIntent;
  precedingLines?: number;
  maxTokens?: number;
  /** When false, the hook stays idle and never opens a stream. */
  enabled?: boolean;
  /** Debounce window in ms before a settled cursor triggers a request. */
  debounceMs?: number;
}

export interface UseSuggestionStreamResult {
  state: SuggestionState;
  accept: () => string | null;
  dismiss: () => void;
  retry: () => void;
}

const DEFAULT_DEBOUNCE_MS = 600;

const IDLE_STATE: SuggestionState = { phase: "idle", text: "" };

function lineKey(opts: UseSuggestionStreamOptions): string {
  const trimmed = opts.activeLineText.trim();
  return `${opts.draftId}::${opts.cursorLine}::${opts.intent ?? "complete-line"}::${trimmed}`;
}

export function useSuggestionStream(
  opts: UseSuggestionStreamOptions,
): UseSuggestionStreamResult {
  const [state, setState] = useState<SuggestionState>(IDLE_STATE);
  const lastKeyRef = useRef<string | null>(null);
  const dismissedKeysRef = useRef<Set<string>>(new Set());
  const cacheRef = useRef<Map<string, SuggestionState>>(new Map());
  const abortRef = useRef<AbortController | null>(null);
  // Invariant: non-null ⇒ a server-side stream is in flight and the cancel
  // endpoint may target it. Cleared on every terminal event and on abort.
  const streamIdRef = useRef<StreamId | null>(null);
  const optsRef = useRef(opts);
  useEffect(() => {
    optsRef.current = opts;
  });

  const cancelInflight = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    const sid = streamIdRef.current;
    streamIdRef.current = null;
    if (sid) {
      void cancelStream(toDraftId(optsRef.current.draftId), sid);
    }
  }, []);

  const startStream = useCallback(
    (overrideKey?: string) => {
      const current = optsRef.current;
      const key = overrideKey ?? lineKey(current);
      if (dismissedKeysRef.current.has(key)) return;

      const cached = cacheRef.current.get(key);
      if (cached) {
        setState(cached);
        return;
      }

      cancelInflight();

      const controller = new AbortController();
      abortRef.current = controller;
      lastKeyRef.current = key;

      const request: SuggestionRequest = {
        cursor_line: current.cursorLine,
        intent: current.intent ?? "complete-line",
        context: {
          draft_text: current.draftText,
          active_line_text: current.activeLineText,
          preceding_lines: current.precedingLines ?? 5,
        },
        max_tokens: current.maxTokens ?? 96,
      };

      setState({ phase: "requesting", text: "" });

      const draftIdBranded = toDraftId(current.draftId) as DraftId;
      void openSuggestionStream({
        draftId: draftIdBranded,
        request,
        signal: controller.signal,
        handlers: {
          onEvent: (event: SuggestionEvent) => {
            if (lastKeyRef.current !== key) {
              // Superseded: server may have buffered stream_started before observing close.
              if (event.type === "stream_started") {
                void cancelStream(draftIdBranded, event.stream_id);
              }
              return;
            }
            switch (event.type) {
              case "stream_started":
                streamIdRef.current = event.stream_id;
                setState({ phase: "streaming", text: "" });
                break;
              case "token":
                setState((prev) =>
                  prev.phase === "streaming"
                    ? { ...prev, text: prev.text + event.delta }
                    : prev,
                );
                break;
              case "partial":
                setState((prev) =>
                  prev.phase === "streaming"
                    ? { ...prev, text: event.text }
                    : prev,
                );
                break;
              case "complete": {
                const next: SuggestionState = {
                  phase: "ready",
                  text: event.final_text,
                };
                cacheRef.current.set(key, next);
                setState(next);
                break;
              }
              case "error":
                setState({
                  phase: "error",
                  text: "",
                  errorCode: event.code,
                  errorMessage: event.message,
                  errorRetryable: event.retryable,
                });
                break;
              case "cancelled":
                setState((prev) =>
                  prev.phase === "streaming" || prev.phase === "requesting"
                    ? IDLE_STATE
                    : prev,
                );
                break;
            }
          },
          onFailure: (failure: StartStreamFailure) => {
            if (lastKeyRef.current !== key) return;
            if (failure.kind === "no_backend") {
              setState({
                phase: "no_backend",
                text: "",
                errorCode: failure.payload.code,
                errorMessage: failure.payload.message,
                noBackendCta: failure.payload.cta,
              });
              return;
            }
            const errorCode =
              failure.kind === "validation" || failure.kind === "not_found"
                ? failure.payload.code
                : "transport";
            const errorMessage =
              failure.kind === "validation" || failure.kind === "not_found"
                ? failure.payload.message
                : failure.message;
            setState({
              phase: "error",
              text: "",
              errorCode,
              errorMessage,
              errorRetryable: failure.kind === "transport",
            });
          },
          onClose: () => {
            if (abortRef.current === controller) {
              abortRef.current = null;
              streamIdRef.current = null;
            }
          },
        },
      });
    },
    [cancelInflight],
  );

  useEffect(() => {
    if (opts.enabled === false) {
      cancelInflight();
      setState(IDLE_STATE);
      return;
    }
    if (!opts.activeLineText.trim()) {
      cancelInflight();
      setState(IDLE_STATE);
      return;
    }
    const key = lineKey(opts);
    if (key === lastKeyRef.current && state.phase !== "idle") return;

    const timer = window.setTimeout(() => {
      startStream(key);
    }, opts.debounceMs ?? DEFAULT_DEBOUNCE_MS);

    return () => {
      window.clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    opts.draftId,
    opts.cursorLine,
    opts.activeLineText,
    opts.intent,
    opts.enabled,
    opts.debounceMs,
  ]);

  useEffect(() => {
    return () => {
      cancelInflight();
    };
  }, [cancelInflight]);

  const accept = useCallback((): string | null => {
    if (state.phase !== "ready" || !state.text) return null;
    const key = lastKeyRef.current;
    if (key) dismissedKeysRef.current.add(key);
    setState(IDLE_STATE);
    return state.text;
  }, [state]);

  const dismiss = useCallback(() => {
    const key = lastKeyRef.current;
    if (key) dismissedKeysRef.current.add(key);
    cancelInflight();
    setState({ phase: "dismissed", text: "" });
  }, [cancelInflight]);

  const retry = useCallback(() => {
    const key = lastKeyRef.current ?? lineKey(optsRef.current);
    dismissedKeysRef.current.delete(key);
    cacheRef.current.delete(key);
    startStream(key);
  }, [startStream]);

  return { state, accept, dismiss, retry };
}
