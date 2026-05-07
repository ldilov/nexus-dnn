import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { ThreadRail } from "./thread_rail";
import { MessageBubble } from "./message_bubble";
import { Composer } from "./composer";
import { ModelPicker } from "./model_picker";
import { SamplerPanel, type SamplerOverride } from "./sampler_panel";
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
  status?: "pending" | "streaming" | "complete" | "failed";
  createdAt?: string;
  isSchemaMismatch?: boolean;
  authorLabel?: string;
  authorInitials?: string;
  tokens?: number;
  latencyMs?: number;
  cached?: boolean;
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

  showCodeBlocks?: boolean;
  showSendShortcutHint?: boolean;

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
    showSendShortcutHint = true,
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

  return (
    <section className={styles.root} aria-label={ariaLabel} data-testid={testId}>
      <ThreadRail
        threads={threads}
        activeThreadId={activeThreadId}
        onSelect={onSelectThread}
        onCreate={onCreateThread}
        onRename={onRenameThread}
        onDelete={onDeleteThread}
      />

      <div className={styles.center}>
        <header className={styles.header}>
          <div className={styles.title}>
            {surfaceTitle ? <span className={styles.titleEyebrow}>{surfaceTitle}</span> : null}
            <h2 className={styles.titleText}>{heroTitle}</h2>
            {surfaceMeta ? <div className={styles.titleMeta}>{surfaceMeta}</div> : null}
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
          {messages.map((m) => (
            <MessageBubble
              key={m.id}
              message={m}
              isStreamingTail={isStreaming && m.id === lastAssistantId && m.status !== "complete"}
              onRetry={onRetryMessage}
            />
          ))}
        </div>

        <div role="status" aria-live="polite" style={visuallyHidden as CSSProperties}>
          {streamCompletionAnnouncement}
        </div>

        <div className={styles.composerSlot}>
          <Composer
            placeholder={composerPlaceholder}
            disabled={composerDisabled}
            disabledReason={composerDisabledReason}
            isStreaming={isStreaming}
            showShortcutHint={showSendShortcutHint}
            onSend={onSendMessage}
            onCancelStream={onCancelStream}
          />
        </div>
      </div>

      <aside className={styles.inspector} aria-label="Chat settings">
        {inspector ?? (
          <SamplerPanel override={samplerOverride} onUpdate={onUpdateSamplerOverride} />
        )}
      </aside>
    </section>
  );
}
