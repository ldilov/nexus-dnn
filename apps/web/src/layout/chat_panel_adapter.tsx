import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { ChatSurface, type ChatMessage, type ChatThreadSummary } from "../components/chat";
import { useModelLoadState } from "../hooks/use_model_load_state";
// audit-allow: boundary — adapter is the registry bridge that wires the YAML "chat_panel" entry to the generic ChatSurface; references are load-bearing, not coupling
import { streamMessage, type ChatTurn } from "../services/local_llm_chat";
import {
  createThread,
  deleteThread,
  listThreads,
  patchThread,
  type ChatThread,
} from "../services/extension_chat";

// audit-allow: boundary — extension-defined window-event channel (THREAD_SELECTED / THREAD_CHANGED) consumed by the local-llm extension UI; the literal IS the contract, can't be parameterised
const THREAD_SELECTED_EVENT = "local-llm/thread:selected";
// audit-allow: boundary — paired with THREAD_SELECTED above; same window-event contract
const THREAD_CHANGED_EVENT = "local-llm/thread:changed";

export interface ChatPanelAdapterProps {
  welcomeTitle?: string;
  welcomeDescription?: string;
}

interface RuntimeMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  status: ChatMessage["status"];
}

function toThreadSummary(t: ChatThread): ChatThreadSummary {
  return {
    id: t.thread_id,
    title: t.title_resolved,
    updatedAt: t.updated_at,
  };
}

export function ChatPanelAdapter({
  welcomeTitle,
  welcomeDescription,
}: ChatPanelAdapterProps) {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<RuntimeMessage[]>([]);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const streamHandle = useRef<{ abort: () => void } | null>(null);
  const load = useModelLoadState(activeId);

  const refreshThreads = useCallback(async () => {
    try {
      const page = await listThreads({ limit: 50 });
      setThreads(page.threads);
      if (!activeId && page.threads.length > 0) {
        const first = page.threads[0]!;
        setActiveId(first.thread_id);
        window.dispatchEvent(
          new CustomEvent(THREAD_SELECTED_EVENT, { detail: { id: first.thread_id } }),
        );
      }
    } catch {
      setThreads([]);
      toast.error("Could not load chat sessions");
    }
  }, [activeId]);

  useEffect(() => {
    void refreshThreads();
  }, [refreshThreads]);

  useEffect(() => {
    const onChanged = () => {
      void refreshThreads();
    };
    window.addEventListener(THREAD_CHANGED_EVENT, onChanged);
    return () => window.removeEventListener(THREAD_CHANGED_EVENT, onChanged);
  }, [refreshThreads]);

  useEffect(() => {
    return () => {
      streamHandle.current?.abort();
    };
  }, []);

  useEffect(() => {
    setMessages([]);
    streamHandle.current?.abort();
    streamHandle.current = null;
    setStreamingId(null);
  }, [activeId]);

  const handleSelectThread = useCallback((id: string) => {
    setActiveId(id);
    window.dispatchEvent(new CustomEvent(THREAD_SELECTED_EVENT, { detail: { id } }));
  }, []);

  const handleCreateThread = useCallback(async () => {
    try {
      const created = await createThread({});
      setThreads((prev) => [created, ...prev]);
      setActiveId(created.thread_id);
      window.dispatchEvent(
        new CustomEvent(THREAD_SELECTED_EVENT, { detail: { id: created.thread_id } }),
      );
    } catch {
      toast.error("Could not create a new session");
    }
  }, []);

  const handleRenameThread = useCallback(async (id: string, nextTitle: string) => {
    try {
      const updated = await patchThread(id, { title: nextTitle });
      setThreads((prev) => prev.map((t) => (t.thread_id === id ? updated : t)));
    } catch {
      toast.error("Rename failed");
    }
  }, []);

  const handleDeleteThread = useCallback(async (id: string) => {
    try {
      await deleteThread(id);
      setThreads((prev) => prev.filter((t) => t.thread_id !== id));
      if (activeId === id) setActiveId(null);
    } catch {
      toast.error("Delete failed");
    }
  }, [activeId]);

  const handleSend = useCallback(
    async (text: string) => {
      if (!activeId || load.phase !== "ready" || load.port === undefined) return;
      const userId = `u-${Date.now()}`;
      const assistantId = `a-${Date.now()}`;
      const turns: ChatTurn[] = messages.map((m) => ({
        role: m.role,
        content: m.text,
      }));
      setMessages((prev) => [
        ...prev,
        { id: userId, role: "user", text, status: "complete" },
        { id: assistantId, role: "assistant", text: "", status: "streaming" },
      ]);
      setStreamingId(assistantId);
      const port = load.port;
      const handle = streamMessage(
        { port, messages: [...turns, { role: "user", content: text }] },
        {
          onToken: (delta) => {
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantId ? { ...m, text: m.text + delta } : m)),
            );
          },
          onDone: () => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId ? { ...m, status: "complete" as const } : m,
              ),
            );
            setStreamingId((current) => (current === assistantId ? null : current));
            streamHandle.current = null;
          },
          onError: (err) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? {
                      ...m,
                      text: m.text
                        ? `${m.text}\n\n_[stream failed: ${err.message}]_`
                        : `_[stream failed: ${err.message}]_`,
                      status: "failed" as const,
                    }
                  : m,
              ),
            );
            setStreamingId((current) => (current === assistantId ? null : current));
            streamHandle.current = null;
          },
        },
      );
      streamHandle.current = handle;
    },
    [activeId, load.phase, load.port, messages],
  );

  const handleCancelStream = useCallback(() => {
    streamHandle.current?.abort();
    streamHandle.current = null;
    setStreamingId(null);
  }, []);

  const surfaceThreads = useMemo<ChatThreadSummary[]>(
    () => threads.map(toThreadSummary),
    [threads],
  );

  const surfaceMessages = useMemo<ChatMessage[]>(
    () =>
      messages.map((m) => ({
        id: m.id,
        role: m.role,
        text: m.text,
        status: m.status,
      })),
    [messages],
  );

  const composerDisabled = !activeId || load.phase !== "ready";
  const disabledReason = !activeId
    ? "Create or pick a session to begin."
    : load.phase === "idle"
      ? "Choose a model to enable the composer."
      : load.phase === "loading"
        ? `Loading ${load.label ?? "model"}…`
        : load.phase === "failed"
          ? `Load failed: ${load.reason ?? "unknown reason"}`
          : undefined;

  const isStreaming = streamingId !== null;

  return (
    <ChatSurface
      surfaceTitle={welcomeTitle ?? "Local LLM"}
      surfaceMeta={welcomeDescription ? <span>{welcomeDescription}</span> : undefined}
      threads={surfaceThreads}
      activeThreadId={activeId}
      onSelectThread={handleSelectThread}
      onCreateThread={() => void handleCreateThread()}
      onRenameThread={handleRenameThread}
      onDeleteThread={handleDeleteThread}
      messages={surfaceMessages}
      isStreaming={isStreaming}
      onSendMessage={handleSend}
      onCancelStream={handleCancelStream}
      models={load.label ? [{ id: "active", label: load.label, badge: "local" }] : []}
      activeModelId={load.label ? "active" : null}
      modelPickerStatus={load.phase === "loading" ? "loading" : load.label ? "ready" : "unavailable"}
      composerPlaceholder={isStreaming ? "Generating…" : "Send a message…"}
      composerDisabled={composerDisabled}
      composerDisabledReason={disabledReason}
      ariaLabel="Local LLM chat surface"
    />
  );
}
