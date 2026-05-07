import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { ChatSurface, type ChatMessage, type ChatThreadSummary } from "../components/chat";
import { useModelLoadState, type ModelLoadState } from "../hooks/use_model_load_state";
import { useDebounce } from "../hooks/use_debounce";
import {
  cancelInference,
  DEFAULT_GENERATION_PARAMS,
  fetchAvailableModels,
  fetchGenerationSettings,
  fetchRuntimeDefaults,
  setActiveModel,
  setGenerationSettings as setGenerationSettingsApi,
  streamMessage,
  unloadActiveModel,
  type AvailableModel,
  type ChatTurn,
  type GenerationParams,
  type RuntimeDefaults,
  type RuntimeTuning,
// audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
} from "../services/local_llm_chat";
import { useTokenUsage } from "./local_llm/use_token_usage";
import { useLocalLlmRuntimeStatus } from "./local_llm/use_runtime_status";
import { InspectorPanel } from "./local_llm/inspector_panel";
import { getModelMetadata, type ModelMetadata } from "../services/host_api";
import {
  appendMessage,
  createThread,
  deleteThread,
  listMessages,
  listThreads,
  patchThread,
  SchemaVersionMismatchError,
  type ChatThread,
  type SamplerOverride as RawSamplerOverride,
} from "../services/extension_chat";
import type { SamplerOverride } from "../components/chat/sampler_panel";
import { ModelLoadDialog } from "./local_llm/model_load_dialog";
import { HeaderModelButton } from "./local_llm/header_model_button";
import { prettyModelLabel, modelOrgFromLabel } from "./local_llm/model_label";
import { EmptyChatState } from "./local_llm/empty_chat_state";
import {
  clearDeploymentModel,
  persistDeploymentModel,
  readDeploymentModel,
  type StickyModel,
} from "./local_llm/sticky_model";

// audit-allow: boundary — extension-defined window-event channels consumed by the local-llm extension UI
const THREAD_SELECTED_EVENT = "local-llm/thread:selected";
// audit-allow: boundary — grandfathered local-llm coupling per .claude/rules/host-extension-boundary.md
const THREAD_CHANGED_EVENT = "local-llm/thread:changed";
// audit-allow: boundary — extension-defined window-event channel for opening the load dialog
const MODEL_LOAD_DIALOG_OPEN_EVENT = "local-llm/model-load-dialog:open";

const TUNING_STORAGE_KEY = "local-llm:runtime-tuning";

const FALLBACK_DEFAULTS: RuntimeDefaults = {
  hardware_concurrency: 8,
  threads_default: 8,
  supports_cuda: false,
  platform: "linux",
};

export interface ChatPanelAdapterProps {
  welcomeTitle?: string;
  welcomeDescription?: string;
  deploymentId?: string;
}

interface RuntimeMessage {
  id: string;
  role: "user" | "assistant";
  text: string;
  status: ChatMessage["status"];
  createdAt: string;
  tokens?: number;
  latencyMs?: number;
  cached?: boolean;
  tokensPerSec?: number;
  contextUsed?: number;
  contextMax?: number;
}

interface LiveRuntimeSnapshot {
  familyId: string;
  variantId?: string;
  label?: string;
  port?: number;
  capturedAt: number;
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

function loadStoredTunings(): Record<string, RuntimeTuning> {
  try {
    const raw = window.localStorage.getItem(TUNING_STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as unknown;
    if (parsed && typeof parsed === "object") {
      return parsed as Record<string, RuntimeTuning>;
    }
    return {};
  } catch {
    return {};
  }
}

function persistTuningForFamily(familyId: string, tuning: RuntimeTuning): void {
  try {
    const all = loadStoredTunings();
    all[familyId] = tuning;
    window.localStorage.setItem(TUNING_STORAGE_KEY, JSON.stringify(all));
  } catch {
    /* ignore quota / private-mode errors */
  }
}

export function ChatPanelAdapter({
  welcomeTitle,
  welcomeDescription,
  deploymentId,
}: ChatPanelAdapterProps) {
  const [threads, setThreads] = useState<ChatThread[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [messages, setMessages] = useState<RuntimeMessage[]>([]);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const [schemaMismatch, setSchemaMismatch] = useState<{ stored: number; bundled: number } | null>(null);
  const [availableModels, setAvailableModels] = useState<AvailableModel[]>([]);
  const [runtimeDefaults, setRuntimeDefaults] = useState<RuntimeDefaults | null>(null);
  const [metadataByKey, setMetadataByKey] = useState<Record<string, ModelMetadata>>({});
  const [lastTuningByFamily, setLastTuningByFamily] = useState<Record<string, RuntimeTuning>>(() =>
    loadStoredTunings(),
  );
  const [loadDialogOpen, setLoadDialogOpen] = useState(false);
  const [generationSettings, setGenerationSettings_] = useState<GenerationParams>(
    DEFAULT_GENERATION_PARAMS,
  );
  const generationSettingsLoadedRef = useRef(false);
  const streamHandle = useRef<{ abort: () => void } | null>(null);
  const streamingThreadRef = useRef<string | null>(null);
  const messagesRef = useRef<RuntimeMessage[]>([]);
  const stickyModelRef = useRef<StickyModel | null>(readDeploymentModel(deploymentId));

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  const autoBindAttemptedRef = useRef<Set<string>>(new Set());
  const liveRuntimeRef = useRef<LiveRuntimeSnapshot | null>(null);
  const load = useModelLoadState(activeId);
  const globalRuntime = useLocalLlmRuntimeStatus();

  useEffect(() => {
    if (load.phase === "ready" && load.familyId) {
      liveRuntimeRef.current = {
        familyId: load.familyId,
        variantId: load.variantId,
        label: load.label,
        port: load.port,
        capturedAt: Date.now(),
      };
    }
  }, [load.phase, load.familyId, load.variantId, load.label, load.port]);

  useEffect(() => {
    if (globalRuntime.phase === "ready" && globalRuntime.familyId) {
      liveRuntimeRef.current = {
        familyId: globalRuntime.familyId,
        variantId: globalRuntime.variantId,
        label: globalRuntime.label,
        port: globalRuntime.port,
        capturedAt: Date.now(),
      };
    } else if (globalRuntime.phase === "idle") {
      liveRuntimeRef.current = null;
    }
  }, [
    globalRuntime.phase,
    globalRuntime.familyId,
    globalRuntime.variantId,
    globalRuntime.label,
    globalRuntime.port,
  ]);

  const displayedLoad = useMemo<ModelLoadState>(() => {
    const sticky = stickyModelRef.current;
    const live = liveRuntimeRef.current;
    if (globalRuntime.phase === "ready" && globalRuntime.familyId) {
      const globalMatchesSticky =
        !sticky ||
        (sticky.family_id === globalRuntime.familyId &&
          (sticky.variant_id ?? "") === (globalRuntime.variantId ?? ""));
      if (globalMatchesSticky && load.phase !== "loading" && load.phase !== "failed") {
        return {
          phase: "ready",
          familyId: globalRuntime.familyId,
          variantId: globalRuntime.variantId,
          label: globalRuntime.label,
          port: globalRuntime.port,
        };
      }
    }
    if (!live || !sticky) return load;
    const stickyMatchesLive =
      sticky.family_id === live.familyId &&
      (sticky.variant_id ?? "") === (live.variantId ?? "");
    if (!stickyMatchesLive) return load;
    if (load.phase === "ready") return load;
    if (load.phase === "loading" && load.familyId) return load;
    return {
      phase: "ready",
      familyId: live.familyId,
      variantId: live.variantId,
      label: live.label,
      port: live.port,
    };
  }, [
    load,
    globalRuntime.phase,
    globalRuntime.familyId,
    globalRuntime.variantId,
    globalRuntime.label,
    globalRuntime.port,
  ]);

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
    stickyModelRef.current = readDeploymentModel(deploymentId);
    autoBindAttemptedRef.current = new Set();
  }, [deploymentId]);

  useEffect(() => {
    const onChanged = () => {
      void refreshThreads();
    };
    window.addEventListener(THREAD_CHANGED_EVENT, onChanged);
    return () => window.removeEventListener(THREAD_CHANGED_EVENT, onChanged);
  }, [refreshThreads]);

  useEffect(() => {
    const onOpenDialog = () => setLoadDialogOpen(true);
    window.addEventListener(MODEL_LOAD_DIALOG_OPEN_EVENT, onOpenDialog);
    return () => window.removeEventListener(MODEL_LOAD_DIALOG_OPEN_EVENT, onOpenDialog);
  }, []);

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
    streamHandle.current?.abort();
    const lastStreaming = streamingThreadRef.current;
    if (lastStreaming && lastStreaming !== activeId) {
      void cancelInference(lastStreaming);
    }
    streamHandle.current = null;
    streamingThreadRef.current = null;
    setStreamingId(null);
    setMessages([]);

    if (!activeId) return;

    const ctrl = new AbortController();
    listMessages(activeId, { limit: 200 }, ctrl.signal)
      .then((page) => {
        if (ctrl.signal.aborted) return;
        const loaded: RuntimeMessage[] = page.messages
          .filter((m) => m.role === "user" || m.role === "assistant")
          .map((m) => ({
            id: m.message_id,
            role: m.role as "user" | "assistant",
            text: m.content,
            status: m.is_partial ? "failed" : "complete",
            createdAt: m.created_at,
          }));
        setMessages(loaded);
      })
      .catch((err) => {
        if (ctrl.signal.aborted) return;
        toast.error(err instanceof Error ? err.message : "Could not load chat history");
      });
    return () => ctrl.abort();
  }, [activeId]);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchAvailableModels(ctrl.signal)
      .then((models) => setAvailableModels(models))
      .catch(() => {});
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    if (!loadDialogOpen) return;
    const ctrl = new AbortController();
    fetchAvailableModels(ctrl.signal)
      .then((models) => setAvailableModels(models))
      .catch(() => {});
    return () => ctrl.abort();
  }, [loadDialogOpen]);

  useEffect(() => {
    const onFocus = () => {
      const ctrl = new AbortController();
      fetchAvailableModels(ctrl.signal)
        .then((models) => setAvailableModels(models))
        .catch(() => {});
    };
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  useEffect(() => {
    const ctrl = new AbortController();
    fetchRuntimeDefaults(ctrl.signal)
      .then((d) => setRuntimeDefaults(d))
      .catch(() => {
        /* fall back to FALLBACK_DEFAULTS until resolved */
      });
    return () => ctrl.abort();
  }, []);

  useEffect(() => {
    if (availableModels.length === 0) return;
    const ctrl = new AbortController();
    let cancelled = false;
    Promise.allSettled(
      availableModels.map(async (m) => {
        const meta = await getModelMetadata(m.family_id, ctrl.signal);
        return { key: m.family_id, meta };
      }),
    ).then((results) => {
      if (cancelled) return;
      const next: Record<string, ModelMetadata> = {};
      for (const r of results) {
        if (r.status === "fulfilled") {
          next[r.value.key] = r.value.meta;
        }
      }
      if (Object.keys(next).length > 0) {
        setMetadataByKey((prev) => ({ ...prev, ...next }));
      }
    });
    return () => {
      cancelled = true;
      ctrl.abort();
    };
  }, [availableModels]);

  useEffect(() => {
    if (!activeId) return;
    if (load.phase !== "idle") return;
    if (load.familyId) return;
    const sticky = stickyModelRef.current;
    if (!sticky) return;
    const attemptKey = `${activeId}|${sticky.family_id}|${sticky.variant_id}`;
    if (autoBindAttemptedRef.current.has(attemptKey)) return;
    autoBindAttemptedRef.current.add(attemptKey);

    const live = liveRuntimeRef.current;
    const liveMatchesSticky =
      live !== null &&
      live.familyId === sticky.family_id &&
      (live.variantId ?? "") === (sticky.variant_id ?? "");
    if (liveMatchesSticky) {
      return;
    }

    const labelHint = sticky.variant_id
      ? `${sticky.family_id} · ${sticky.variant_id}`
      : sticky.family_id;
    toast.success(`Auto-binding ${labelHint}…`);
    setActiveModel(activeId, sticky.family_id, sticky.variant_id, sticky.tuning).catch((err) => {
      toast.error(err instanceof Error ? err.message : "Auto-bind failed");
    });
  }, [activeId, load.phase, load.familyId]);

  useEffect(() => {
    generationSettingsLoadedRef.current = false;
    setGenerationSettings_(DEFAULT_GENERATION_PARAMS);
    if (!activeId) return;
    const ctrl = new AbortController();
    fetchGenerationSettings(activeId, ctrl.signal)
      .then((params) => {
        setGenerationSettings_(params);
        generationSettingsLoadedRef.current = true;
      })
      .catch(() => {
        generationSettingsLoadedRef.current = true;
      });
    return () => ctrl.abort();
  }, [activeId]);

  const debouncedSettingsKey = useDebounce(
    `${generationSettings.temperature}|${generationSettings.top_p}|${generationSettings.max_tokens}|${generationSettings.system_prompt}`,
    500,
  );

  useEffect(() => {
    if (!activeId) return;
    if (!generationSettingsLoadedRef.current) return;
    void debouncedSettingsKey;
    const ctrl = new AbortController();
    setGenerationSettingsApi(activeId, generationSettings, ctrl.signal).catch((err) => {
      if (ctrl.signal.aborted) return;
      toast.error(err instanceof Error ? err.message : "Could not save chat settings");
    });
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSettingsKey, activeId]);

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

  const handleLoadModel = useCallback(
    async (model: AvailableModel, tuning: RuntimeTuning) => {
      if (!activeId) {
        toast.error("Select a chat session before loading a model");
        return;
      }
      try {
        await setActiveModel(activeId, model.family_id, model.variant_id ?? "", tuning);
        setLoadDialogOpen(false);
        persistTuningForFamily(model.family_id, tuning);
        setLastTuningByFamily((prev) => ({ ...prev, [model.family_id]: tuning }));
        const sticky: StickyModel = {
          family_id: model.family_id,
          variant_id: model.variant_id ?? "",
          tuning,
          saved_at: new Date().toISOString(),
        };
        stickyModelRef.current = sticky;
        persistDeploymentModel(deploymentId, sticky);
        toast.success(`Loading ${model.label}…`);
      } catch (err) {
        toast.error(err instanceof Error ? err.message : "Could not load model");
      }
    },
    [activeId, deploymentId],
  );

  const handleOpenLoadDialog = useCallback(() => {
    setLoadDialogOpen(true);
  }, []);

  const handleCloseLoadDialog = useCallback(() => {
    setLoadDialogOpen(false);
  }, []);

  const handleUnload = useCallback(async () => {
    if (!activeId) return;
    try {
      await unloadActiveModel(activeId);
      clearDeploymentModel(deploymentId ?? null);
      const unloadedFamily = displayedLoad.familyId ?? load.familyId;
      stickyModelRef.current = null;
      liveRuntimeRef.current = null;
      setLastTuningByFamily((prev) => {
        if (!unloadedFamily) return prev;
        if (!(unloadedFamily in prev)) return prev;
        const next = { ...prev };
        delete next[unloadedFamily];
        return next;
      });
      toast.success("Model unloaded");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not unload model");
    }
  }, [activeId, deploymentId, displayedLoad.familyId, load.familyId]);

  const activeMaxContext = useMemo(() => {
    const familyId = displayedLoad.familyId;
    if (!familyId) return 0;
    const tuning = lastTuningByFamily[familyId];
    if (tuning?.ctx_size && tuning.ctx_size > 0) return tuning.ctx_size;
    return 0;
  }, [displayedLoad.familyId, lastTuningByFamily]);

  const tokenUsage = useTokenUsage(activeId, activeMaxContext);

  const handleSend = useCallback(
    async (text: string) => {
      if (!activeId || displayedLoad.phase !== "ready" || displayedLoad.port === undefined) return;
      const threadId = activeId;
      const optimisticUserId = `u-${Date.now()}`;
      const assistantId = `a-${Date.now()}`;
      const turns: ChatTurn[] = messages.map((m) => ({
        role: m.role,
        content: m.text,
      }));
      const now = new Date().toISOString();
      setMessages((prev) => [
        ...prev,
        { id: optimisticUserId, role: "user", text, status: "complete", createdAt: now },
        { id: assistantId, role: "assistant", text: "", status: "streaming", createdAt: now },
      ]);
      setStreamingId(assistantId);
      streamingThreadRef.current = threadId;

      appendMessage(threadId, { role: "user", content: text })
        .then((persisted) => {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === optimisticUserId
                ? { ...m, id: persisted.message_id, createdAt: persisted.created_at }
                : m,
            ),
          );
        })
        .catch((err) => {
          toast.error(err instanceof Error ? err.message : "Could not save user message");
        });

      const port = displayedLoad.port;
      const handle = streamMessage(
        {
          port,
          messages: [...turns, { role: "user", content: text }],
          systemPrompt: generationSettings.system_prompt,
        },
        {
          onToken: (delta) => {
            setMessages((prev) =>
              prev.map((m) => (m.id === assistantId ? { ...m, text: m.text + delta } : m)),
            );
          },
          onDone: (stats) => {
            const usedNow =
              (stats.promptTokens ?? 0) + (stats.completionTokens ?? 0);
            const finalText =
              messagesRef.current.find((m) => m.id === assistantId)?.text ?? "";
            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantId
                  ? {
                      ...m,
                      status: "complete" as const,
                      tokens: stats.completionTokens,
                      latencyMs: stats.latencyMs,
                      cached: false,
                      tokensPerSec: stats.tokensPerSec,
                      contextUsed: usedNow > 0 ? usedNow : undefined,
                      contextMax: activeMaxContext > 0 ? activeMaxContext : undefined,
                    }
                  : m,
              ),
            );
            setStreamingId((current) => (current === assistantId ? null : current));
            streamHandle.current = null;
            streamingThreadRef.current = null;
            tokenUsage.record({
              promptTokens: stats.promptTokens,
              completionTokens: stats.completionTokens,
              tokensPerSec: stats.tokensPerSec,
            });

            if (finalText.length > 0) {
              appendMessage(threadId, { role: "assistant", content: finalText })
                .then((persisted) => {
                  setMessages((prev) =>
                    prev.map((m) =>
                      m.id === assistantId
                        ? { ...m, id: persisted.message_id, createdAt: persisted.created_at }
                        : m,
                    ),
                  );
                })
                .catch((err) => {
                  toast.error(
                    err instanceof Error ? err.message : "Could not save assistant reply",
                  );
                });
            }
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
    [
      activeId,
      displayedLoad.phase,
      displayedLoad.port,
      messages,
      generationSettings.system_prompt,
      tokenUsage.record,
      activeMaxContext,
    ],
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

  const assistantAuthorLabel = displayedLoad.label ?? undefined;

  const surfaceMessages = useMemo<ChatMessage[]>(
    () =>
      messages.map((m) => ({
        id: m.id,
        role: m.role,
        text: m.text,
        status: m.status,
        createdAt: m.createdAt,
        authorLabel: m.role === "user" ? "You" : assistantAuthorLabel,
        authorInitials: m.role === "user" ? "U" : undefined,
        tokens: m.tokens,
        latencyMs: m.latencyMs,
        cached: m.cached,
        tokensPerSec: m.tokensPerSec,
        contextUsed: m.contextUsed,
        contextMax: m.contextMax,
      })),
    [messages, assistantAuthorLabel],
  );

  const activeThread = useMemo(
    () => (activeId ? threads.find((t) => t.thread_id === activeId) ?? null : null),
    [threads, activeId],
  );
  const surfaceSampler = toSamplerOverrideView(activeThread?.sampler_override);

  const currentModelLabel = useMemo(() => {
    if (displayedLoad.phase === "ready" && displayedLoad.label) return displayedLoad.label;
    if (displayedLoad.phase === "loading" && displayedLoad.label) return displayedLoad.label;
    const sticky = stickyModelRef.current;
    if (sticky) {
      return sticky.variant_id
        ? `${sticky.family_id} · ${sticky.variant_id}`
        : sticky.family_id;
    }
    return null;
  }, [displayedLoad.phase, displayedLoad.label]);

  const composerDisabled = !activeId || displayedLoad.phase !== "ready";
  const disabledReason = !activeId
    ? "Create or pick a session to begin."
    : displayedLoad.phase === "idle"
      ? "Choose a model to enable the composer."
      : displayedLoad.phase === "loading"
        ? `Loading ${displayedLoad.label ?? "model"}…`
        : displayedLoad.phase === "failed"
          ? `Load failed: ${displayedLoad.reason ?? "unknown reason"}`
          : undefined;

  const handleSystemPromptChange = useCallback((next: string) => {
    setGenerationSettings_((prev) => ({ ...prev, system_prompt: next }));
  }, []);

  const inspectorSampler = useMemo(
    () => ({
      temperature: generationSettings.temperature,
      topP: generationSettings.top_p,
      maxTokens: generationSettings.max_tokens,
    }),
    [generationSettings.temperature, generationSettings.top_p, generationSettings.max_tokens],
  );

  const handleInspectorSamplerChange = useCallback(
    (next: { temperature: number; topP: number; maxTokens: number }) => {
      setGenerationSettings_((prev) => ({
        ...prev,
        temperature: next.temperature,
        top_p: next.topP,
        max_tokens: next.maxTokens,
      }));
    },
    [],
  );

  const systemPromptInherited =
    !generationSettings.system_prompt ||
    generationSettings.system_prompt === DEFAULT_GENERATION_PARAMS.system_prompt;

  const inspectorModelDisplayLabel = displayedLoad.label
    ? prettyModelLabel(displayedLoad.label)
    : null;
  const inspectorModelSub = displayedLoad.familyId
    ? modelOrgFromLabel(displayedLoad.label) ??
      `${displayedLoad.familyId}${displayedLoad.variantId ? ` · ${displayedLoad.variantId}` : ""}`
    : undefined;

  const inspectorContent = (
    <InspectorPanel
      modelLabel={inspectorModelDisplayLabel}
      modelSub={inspectorModelSub}
      loadPhase={displayedLoad.phase}
      contextUsed={tokenUsage.tokensUsed}
      contextMax={activeMaxContext}
      sampler={inspectorSampler}
      onSamplerChange={handleInspectorSamplerChange}
      systemPromptInherited={systemPromptInherited}
      systemPrompt={generationSettings.system_prompt}
      onSystemPromptChange={handleSystemPromptChange}
      onUnload={handleUnload}
    />
  );

  const isStreaming = streamingId !== null;
  const schemaMismatchMessage = schemaMismatch
    ? `Extension version mismatch — stored ${schemaMismatch.stored}, bundled ${schemaMismatch.bundled}. Reload after upgrading.`
    : undefined;

  return (
    <>
      <ChatSurface
        surfaceTitle={welcomeTitle ?? "Local LLM"}
        emptyState={<EmptyChatState description={welcomeDescription} />}
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
        headerSlot={
          <HeaderModelButton label={currentModelLabel} onClick={handleOpenLoadDialog} />
        }
        samplerOverride={surfaceSampler}
        onUpdateSamplerOverride={handleUpdateSamplerOverride}
        inspector={inspectorContent}
        schemaMismatch={schemaMismatch !== null}
        schemaMismatchMessage={schemaMismatchMessage}
        composerPlaceholder={
          isStreaming
            ? "Generating…"
            : currentModelLabel
              ? `Message ${prettyModelLabel(currentModelLabel).split(" · ")[0] ?? "the model"}…`
              : "Message the model…"
        }
        composerDisabled={composerDisabled}
        composerDisabledReason={disabledReason}
        ariaLabel="Local LLM chat surface"
      />
      <ModelLoadDialog
        open={loadDialogOpen}
        models={availableModels}
        defaults={runtimeDefaults ?? FALLBACK_DEFAULTS}
        metadataByKey={metadataByKey}
        initialTuningByFamily={lastTuningByFamily}
        onLoad={handleLoadModel}
        onClose={handleCloseLoadDialog}
      />
    </>
  );
}
