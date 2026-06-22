import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ThreadRail, CHAT_THREAD_RAIL_ID } from "./thread_rail";
import { MessageBubble } from "./message_bubble";
import { Composer } from "./composer";
import { ModelPicker } from "./model_picker";
import { SamplerPanel, type SamplerOverride } from "./sampler_panel";
import { media } from "../../theme/breakpoints";
import * as styles from "./chat_surface.css";

export interface ChatThreadSummary {
  id: string;
  title: string;
  updatedAt: string;
  unread?: boolean;
  modelLabel?: string;
  meta?: ReactNode;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  text: string;
  status?: "pending" | "streaming" | "complete" | "failed" | "interrupted";
  interruptedAt?: string;
  createdAt?: string;
  isSchemaMismatch?: boolean;
  authorLabel?: string;
  authorInitials?: string;
  tokens?: number;
  latencyMs?: number;
  cached?: boolean;
  tokensPerSec?: number;
  contextUsed?: number;
  contextMax?: number;
}

export interface ModelOption {
  id: string;
  label: string;
  badge?: string;
  contextUsedPct?: number;
}

export interface ChatSurfaceProps {
  surfaceTitle?: string;
  surfaceMeta?: ReactNode;

  threads: ChatThreadSummary[];
  activeThreadId: string | null;
  onSelectThread: (id: string) => void;
  onCreateThread: () => void;
  onRenameThread?: (id: string, nextTitle: string) => Promise<void>;
  onDeleteThread?: (id: string) => Promise<void>;
  onAttachThreadToDeployment?: (id: string, deploymentId: string) => Promise<void>;

  messages: ChatMessage[];
  isStreaming: boolean;
  onSendMessage: (text: string) => Promise<void>;
  onCancelStream?: () => void;
  onRetryMessage?: (id: string) => void;

  models?: ModelOption[];
  activeModelId?: string | null;
  onSelectModel?: (id: string) => Promise<void>;
  modelPickerStatus?: "ready" | "loading" | "unavailable";
  onOpenBackends?: () => void;

  headerSlot?: ReactNode;
  inspector?: ReactNode;

  samplerOverride?: SamplerOverride;
  onUpdateSamplerOverride?: (next: SamplerOverride) => Promise<void>;

  composerPlaceholder?: string;
  composerDisabled?: boolean;
  composerDisabledReason?: ReactNode;
  composerInitialValue?: string;
  composerDraftRestored?: boolean;
  composerKey?: string;
  onComposerValueChange?: (value: string) => void;
  threadsReconciling?: boolean;

  showCodeBlocks?: boolean;
  showSendShortcutHint?: boolean;

  emptyState?: ReactNode;

  schemaMismatch?: boolean;
  schemaMismatchMessage?: ReactNode;

  ariaLabel?: string;
  testId?: string;
}

const visuallyHidden = {
  position: "absolute",
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: "hidden",
  clip: "rect(0,0,0,0)",
  whiteSpace: "nowrap",
  border: 0,
} as const;

export function ChatSurface(props: ChatSurfaceProps) {
  const {
    surfaceTitle,
    surfaceMeta,
    threads,
    activeThreadId,
    onSelectThread,
    onCreateThread,
    onRenameThread,
    onDeleteThread,
    messages,
    isStreaming,
    onSendMessage,
    onCancelStream,
    onRetryMessage,
    models,
    activeModelId,
    onSelectModel,
    modelPickerStatus,
    onOpenBackends,
    headerSlot,
    inspector,
    schemaMismatch,
    schemaMismatchMessage,
    samplerOverride,
    onUpdateSamplerOverride,
    composerPlaceholder,
    composerDisabled,
    composerDisabledReason,
    composerInitialValue,
    composerDraftRestored,
    composerKey,
    onComposerValueChange,
    threadsReconciling,
    showSendShortcutHint = true,
    emptyState,
    ariaLabel = "Chat surface",
    testId,
  } = props;

  const lastAssistantId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i -= 1) {
      if (messages[i]!.role === "assistant") return messages[i]!.id;
    }
    return null;
  }, [messages]);

  const wasStreamingRef = useRef(false);
  const [streamCompletionAnnouncement, setStreamCompletionAnnouncement] = useState("");
  useEffect(() => {
    if (wasStreamingRef.current && !isStreaming) {
      const tail = lastAssistantId ? messages.find((m) => m.id === lastAssistantId) : null;
      setStreamCompletionAnnouncement(
        tail?.status === "failed" ? "Assistant reply failed." : "Assistant reply complete.",
      );
    }
    wasStreamingRef.current = isStreaming;
  }, [isStreaming, lastAssistantId, messages]);

  const activeThread = useMemo(
    () => threads.find((t) => t.id === activeThreadId) ?? null,
    [threads, activeThreadId],
  );
  const heroTitle = surfaceTitle ?? activeThread?.title ?? "Chat";

  const [threadDrawerOpen, setThreadDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const railRef = useRef<HTMLElement>(null);
  const wasDrawerOpenRef = useRef(false);

  useEffect(() => {
    if (!threadDrawerOpen) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") setThreadDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [threadDrawerOpen]);

  useEffect(() => {
    const mq =
      typeof window.matchMedia === "function"
        ? window.matchMedia(media.maxMobile)
        : null;
    if (!mq) return;
    const sync = () => {
      setIsMobile(mq.matches);
      if (!mq.matches) setThreadDrawerOpen(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (threadDrawerOpen) {
      wasDrawerOpenRef.current = true;
      railRef.current?.focus();
    } else if (wasDrawerOpenRef.current) {
      wasDrawerOpenRef.current = false;
      toggleRef.current?.focus();
    }
  }, [threadDrawerOpen]);

  return (
    <section className={styles.root} aria-label={ariaLabel} data-testid={testId}>
      <ThreadRail
        threads={threads}
        activeThreadId={activeThreadId}
        onSelect={(id) => {
          onSelectThread(id);
          setThreadDrawerOpen(false);
        }}
        onCreate={() => {
          onCreateThread();
          setThreadDrawerOpen(false);
        }}
        onRename={onRenameThread}
        onDelete={onDeleteThread}
        reconciling={threadsReconciling}
        mobileOpen={threadDrawerOpen}
        id={CHAT_THREAD_RAIL_ID}
        navRef={railRef}
        inert={isMobile && !threadDrawerOpen}
      />
      {threadDrawerOpen ? (
        <button
          type="button"
          className={styles.threadScrim}
          aria-label="Close threads"
          onClick={() => setThreadDrawerOpen(false)}
        />
      ) : null}

      <div className={styles.center} inert={threadDrawerOpen || undefined}>
        <header className={styles.header}>
          <div className={styles.headerLeft}>
            <button
              type="button"
              ref={toggleRef}
              className={styles.threadToggle}
              onClick={() => setThreadDrawerOpen(true)}
              aria-label="Show threads"
              aria-controls={CHAT_THREAD_RAIL_ID}
              aria-expanded={threadDrawerOpen}
            >
              <span className="material-symbols-outlined" aria-hidden="true">
                forum
              </span>
            </button>
            <div className={styles.title}>
              {surfaceTitle ? <span className={styles.titleEyebrow}>{surfaceTitle}</span> : null}
              <h2 className={styles.titleText}>{heroTitle}</h2>
              {surfaceMeta ? <div className={styles.titleMeta}>{surfaceMeta}</div> : null}
            </div>
          </div>
          <div className={styles.headerRight}>
            {headerSlot ?? (
              <ModelPicker
                models={models ?? []}
                activeModelId={activeModelId ?? null}
                onSelect={onSelectModel}
                status={modelPickerStatus}
                onOpenBackends={onOpenBackends}
              />
            )}
          </div>
        </header>

        {schemaMismatch ? (
          <div className={styles.banner} role="alert">
            {schemaMismatchMessage ?? "Extension version mismatch — reload after upgrading the extension."}
          </div>
        ) : null}

        <div className={styles.messages} role="log" aria-live={isStreaming ? "off" : "polite"}>
          {messages.length === 0 && emptyState ? (
            <div className={styles.emptyState}>{emptyState}</div>
          ) : (
            messages.map((m) => (
              <MessageBubble
                key={m.id}
                message={m}
                isStreamingTail={isStreaming && m.id === lastAssistantId && m.status !== "complete"}
                onRetry={onRetryMessage}
              />
            ))
          )}
        </div>

        <div role="status" aria-live="polite" style={visuallyHidden as CSSProperties}>
          {streamCompletionAnnouncement}
        </div>

        <div className={styles.composerSlot}>
          <Composer
            key={composerKey ?? activeThreadId ?? "composer"}
            placeholder={composerPlaceholder}
            disabled={composerDisabled}
            disabledReason={composerDisabledReason}
            isStreaming={isStreaming}
            showShortcutHint={showSendShortcutHint}
            initialValue={composerInitialValue}
            draftRestored={composerDraftRestored}
            onValueChange={onComposerValueChange}
            onSend={onSendMessage}
            onCancelStream={onCancelStream}
          />
        </div>
      </div>

      <aside className={styles.inspector} aria-label="Chat settings" inert={threadDrawerOpen || undefined}>
        {inspector ?? (
          <SamplerPanel override={samplerOverride} onUpdate={onUpdateSamplerOverride} />
        )}
      </aside>
    </section>
  );
}
