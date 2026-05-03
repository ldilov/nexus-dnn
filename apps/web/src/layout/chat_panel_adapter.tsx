import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { ChatSurface, type ChatMessage, type ChatThreadSummary } from "../components/chat";
import { useModelLoadState } from "../hooks/use_model_load_state";
// audit-allow: boundary — adapter bridges the YAML "chat_panel" entry to the generic ChatSurface
import {
  cancelInference,
  fetchAvailableModels,
  setActiveModel,
  streamMessage,
  unloadActiveModel,
  type AvailableModel,
  type ChatTurn,
// audit-allow: boundary — boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
} from "../services/local_llm_chat";
import {
  createThread,
  deleteThread,
  listThreads,
  patchThread,
  SchemaVersionMismatchError,
  type ChatThread,
  type SamplerOverride as RawSamplerOverride,
} from "../services/extension_chat";
import type { SamplerOverride } from "../components/chat/sampler_panel";

// audit-allow: boundary — extension-defined window-event channels consumed by the local-llm extension UI
const THREAD_SELECTED_EVENT = "local-llm/thread:selected";
// audit-allow: boundary — boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
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

function toSamplerOverrideView(raw: RawSamplerOverride | null | undefined): SamplerOverride | undefined {
  if (!raw) return undefined;
  return {
    temperature: raw.temperature,
    topP: raw.top_p,
  };
}

function fromSamplerOverrideView(next: SamplerOverride): RawSamplerOverride {
  return {
    temperature: next.temperature,
    top_p: next.topP,
  };
}

function buildModelId(m: AvailableModel): string {
  return m.variant_id ? `${m.family_id}:${m.variant_id}` : m.family_id;
}

export function ChatPanelAdapter({
  welcomeTitle,
  welcomeDescription,
}: ChatPanelAdapterProps) {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<RuntimeMessage[]>([]);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [schemaMismatch, setSchemaMismatch] = useState<{ stored: number; bundled: number } | null>(null);
  const [availableModels, setAvailableModels] = useState<AvailableModel[]>([]);
  const streamHandle = useRef<{ abort: () => void } | null>(null);
  const streamingThreadRef = useRef<string | null>(null);
  const load = useModelLoadState(activeId);

  const refreshThreads = useCallback(async () => {
    try {
      const page = await listThreads({ limit: 50 });
      setSchemaMismatch(null);
      setThreads(page.threads);
      if (!activeId && page.threads.length > 0) {
        const first = page.threads[0]!;
        setActiveId(first.thread_id);
        window.dispatchEvent(
          new CustomEvent(THREAD_SELECTED_EVENT, { detail: { id: first.thread_id } }),
        );
      }
    } catch (err) {
      if (err instanceof SchemaVersionMismatchError) {
        setSchemaMismatch({ stored: err.stored, bundled: err.bundled });
        setThreads([]);
        return;
      }
      setThreads([]);
      toast.error(err instanceof Error ? err.message : "Could not load chat sessions");
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
      const lastStreaming = streamingThreadRef.current;
      if (lastStreaming) {
        void cancelInference(lastStreaming);
      }
    };
  }, []);

  useEffect(() => {
    setMessages([]);
    streamHandle.current?.abort();
    const lastStreaming = streamingThreadRef.current;
    if (lastStreaming && lastStreaming !== activeId) {
      void cancelInference(lastStreaming);
    }
    streamHandle.current = null;
    streamingThreadRef.current = null;
    setStreamingId(null);
  }, [activeId]);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchAvailableModels(ctrl.signal)
      .then((models) => setAvailableModels(models))
      .catch(() => {
        /* picker keeps the active-model fallback */
      });
    return () => ctrl.abort();
  }, []);

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
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not create a new session");
    }
  }, []);

  const handleRenameThread = useCallback(async (id: string, nextTitle: string) => {
    try {
      const updated = await patchThread(id, { title: nextTitle });
      setThreads((prev) => prev.map((t) => (t.thread_id === id ? updated : t)));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Rename failed");
    }
  }, []);

  const handleDeleteThread = useCallback(async (id: string) => {
    try {
      await deleteThread(id);
      setThreads((prev) => prev.filter((t) => t.thread_id !== id));
      if (activeId === id) setActiveId(null);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Delete failed");
    }
  }, [activeId]);

  const handleAttachToDeployment = useCallback(
    async (id: string, _deploymentId: string) => {
      try {
        const updated = await patchThread(id, { attach_to_current_deployment: true });
        setThreads((prev) => prev.map((t) => (t.thread_id === id ? updated : t)));
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not attach thread");
      }
    },
    [],
  );

  const handleUpdateSamplerOverride = useCallback(
    async (next: SamplerOverride) => {
      if (!activeId) return;
      try {
        const updated = await patchThread(activeId, {
          sampler_override: fromSamplerOverrideView(next),
        });
        setThreads((prev) => prev.map((t) => (t.thread_id === activeId ? updated : t)));
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not update sampler");
      }
    },
    [activeId],
  );

  const handleOpenBackends = useCallback(() => {
    window.location.assign("/backends");
  }, []);

  const handleSelectModel = useCallback(
    async (modelId: string | null) => {
      if (!activeId) return;
      try {
        if (!modelId) {
          await unloadActiveModel(activeId);
          return;
        }
        const target = availableModels.find((m) => buildModelId(m) === modelId);
        if (!target) {
          toast.error("Model not found in installed list");
          return;
        }
        await setActiveModel(activeId, target.family_id, target.variant_id ?? "");
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not switch model");
      }
    },
    [activeId, availableModels],
  );

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
      streamingThreadRef.current = activeId;
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
            streamingThreadRef.current = null;
          },
          onError: (err) => {
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? {
                      ...m,
                      text: `Stream failed: ${err.message}`,
                      status: "failed" as const,
                    }
                  : m,
              ),
            );
            setStreamingId((current) => (current === assistantId ? null : current));
            streamHandle.current = null;
            streamingThreadRef.current = null;
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
    const lastStreaming = streamingThreadRef.current;
    if (lastStreaming) {
      void cancelInference(lastStreaming);
    }
    streamingThreadRef.current = null;
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

  const activeThread = useMemo(
    () => (activeId ? threads.find((t) => t.thread_id === activeId) ?? null : null),
    [threads, activeId],
  );
  const surfaceSampler = toSamplerOverrideView(activeThread?.sampler_override);

  const surfaceModels = useMemo(() => {
    if (availableModels.length === 0) {
      return load.label ? [{ id: "active", label: load.label, badge: "local" }] : [];
    }
    return availableModels.map((m) => ({
      id: buildModelId(m),
      label: m.label,
      badge: m.format,
    }));
  }, [availableModels, load.label]);

  const surfaceActiveModelId = useMemo(() => {
    if (load.phase !== "ready") return null;
    if (availableModels.length === 0) return load.label ? "active" : null;
    if (!load.familyId) return null;
    const id = load.variantId ? `${load.familyId}:${load.variantId}` : load.familyId;
    return availableModels.some((m) => buildModelId(m) === id) ? id : null;
  }, [availableModels, load.phase, load.label, load.familyId, load.variantId]);

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
  const schemaMismatchMessage = schemaMismatch
    ? `Extension version mismatch — stored ${schemaMismatch.stored}, bundled ${schemaMismatch.bundled}. Reload after upgrading.`
    : undefined;

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
      onAttachThreadToDeployment={handleAttachToDeployment}
      messages={surfaceMessages}
      isStreaming={isStreaming}
      onSendMessage={handleSend}
      onCancelStream={handleCancelStream}
      models={surfaceModels}
      activeModelId={surfaceActiveModelId}
      onSelectModel={handleSelectModel}
      modelPickerStatus={
        load.phase === "loading"
          ? "loading"
          : surfaceModels.length > 0
            ? "ready"
            : "unavailable"
      }
      onOpenBackends={handleOpenBackends}
      samplerOverride={surfaceSampler}
      onUpdateSamplerOverride={handleUpdateSamplerOverride}
      schemaMismatch={schemaMismatch !== null}
      schemaMismatchMessage={schemaMismatchMessage}
      composerPlaceholder={isStreaming ? "Generating…" : "Send a message…"}
      composerDisabled={composerDisabled}
      composerDisabledReason={disabledReason}
      ariaLabel="Local LLM chat surface"
    />
  );
}
