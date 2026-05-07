import { useCallback, useEffect, useRef, useState } from "react";
import {
  deleteDraft,
  getDraft,
  putDraft,
} from "../../services/idb/composer_drafts";

const DEBOUNCE_MS = 300;

export interface UseComposerDraftOptions {
  readonly deploymentId: string | null;
  readonly threadId: string | null;
  readonly debounceMs?: number;
}

export interface UseComposerDraftResult {
  readonly initialValue: string;
  readonly hydrated: boolean;
  readonly notifyValueChange: (value: string) => void;
  readonly clear: () => Promise<void>;
}

const SESSION_STORAGE_PREFIX = "nexus.composer.draft:";

function sessionKey(deploymentId: string, threadId: string): string {
  return `${SESSION_STORAGE_PREFIX}${deploymentId}:${threadId}`;
}

function readSessionFallback(
  deploymentId: string,
  threadId: string,
): string | null {
  try {
    return window.sessionStorage.getItem(sessionKey(deploymentId, threadId));
  } catch {
    return null;
  }
}

function writeSessionFallback(
  deploymentId: string,
  threadId: string,
  value: string,
): void {
  try {
    if (value.length === 0) {
      window.sessionStorage.removeItem(sessionKey(deploymentId, threadId));
      return;
    }
    window.sessionStorage.setItem(sessionKey(deploymentId, threadId), value);
  } catch {
    /* private browsing or quota — non-fatal */
  }
}

export function useComposerDraft(
  options: UseComposerDraftOptions,
): UseComposerDraftResult {
  const { deploymentId, threadId } = options;
  const debounceMs = options.debounceMs ?? DEBOUNCE_MS;
  const [initialValue, setInitialValue] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cancelledRef = useRef(false);

  useEffect(() => {
    cancelledRef.current = false;
    return () => {
      cancelledRef.current = true;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setHydrated(false);
    setInitialValue("");
    if (!deploymentId || !threadId) {
      setHydrated(true);
      return;
    }
    let cancelled = false;
    const fallback = readSessionFallback(deploymentId, threadId);
    void getDraft(deploymentId, threadId)
      .then((row) => {
        if (cancelled) return;
        if (row) {
          setInitialValue(row.text);
        } else if (fallback) {
          setInitialValue(fallback);
        }
      })
      .catch(() => {
        if (!cancelled && fallback) setInitialValue(fallback);
      })
      .finally(() => {
        if (!cancelled) setHydrated(true);
      });
    return () => {
      cancelled = true;
    };
  }, [deploymentId, threadId]);

  const notifyValueChange = useCallback(
    (value: string) => {
      if (!deploymentId || !threadId) return;
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
      debounceTimerRef.current = setTimeout(() => {
        debounceTimerRef.current = null;
        writeSessionFallback(deploymentId, threadId, value);
        void putDraft({
          deploymentId,
          threadId,
          text: value,
          updatedAt: Date.now(),
        }).catch(() => {
          /* IDB unavailable — sessionStorage fallback already applied */
        });
      }, debounceMs);
    },
    [deploymentId, threadId, debounceMs],
  );

  const clear = useCallback(async () => {
    if (!deploymentId || !threadId) return;
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }
    writeSessionFallback(deploymentId, threadId, "");
    try {
      await deleteDraft(deploymentId, threadId);
    } catch {
      /* IDB unavailable */
    }
  }, [deploymentId, threadId]);

  return {
    initialValue,
    hydrated,
    notifyValueChange,
    clear,
  };
}
