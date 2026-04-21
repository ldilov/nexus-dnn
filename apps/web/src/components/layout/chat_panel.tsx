import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import * as styles from "./layout_styles.css";
import { useModelLoadState } from "../../hooks/use_model_load_state";
import { streamMessage } from "../../services/local_llm_chat";

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
  modelName?: string;
  latencyMs?: number;
  tokensPerSec?: number;
  promptTokens?: number;
  completionTokens?: number;
  params?: {
    temperature: number;
    top_p: number;
    top_k: number;
    max_tokens: number;
    repeat_penalty: number;
  };
};

type ModelChip = {
  label: string;
  type: "model" | "optimize";
};

type ChatPanelProps = {
  showSystemPrompt?: boolean;
  showStopButton?: boolean;
  showRetryButton?: boolean;
  showRegenerateButton?: boolean;
  streamingEnabled?: boolean;
  messages?: ChatMessage[];
  modelChips?: ModelChip[];
  modelName?: string;
  tokenCount?: number;
  welcomeIcon?: string;
  welcomeTitle?: string;
  welcomeDescription?: string;
  children?: ReactNode;
};

function CodeBlock({ code, lang }: { code: string; lang: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  }, [code]);
  return (
    <div className={styles.chatCodeBlock}>
      <div className={styles.chatCodeBlockHeader}>
        <span className={styles.chatCodeBlockLang}>{lang}</span>
        <button
          className={styles.chatCodeBlockCopy}
          onClick={handleCopy}
          type="button"
        >
          <span className={`material-symbols-outlined ${styles.iconInherit}`}>
            {copied ? "check" : "content_copy"}
          </span>
        </button>
      </div>
      <pre className={styles.chatCodeBlockBody}>{code}</pre>
    </div>
  );
}

function MessageContent({ content }: { content: string }) {
  return (
    <div className={styles.chatMarkdown}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        components={{
          code(props) {
            const { className, children, ...rest } = props;
            const inline = !className;
            if (inline) {
              return (
                <code className={styles.chatInlineCode} {...rest}>
                  {children}
                </code>
              );
            }
            const lang = /language-(\w+)/.exec(className ?? "")?.[1] ?? "code";
            return (
              <CodeBlock
                code={String(children).replace(/\n$/, "")}
                lang={lang}
              />
            );
          },
          pre(props) {
            // Our CodeBlock already renders a <pre>; unwrap react-markdown's.
            return <>{props.children}</>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

function iconStyle(size: number): React.CSSProperties {
  return {
    fontSize: `${size}px`,
    fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
  };
}

export function ChatPanel({
  messages: initialMessages = [],
  modelChips = [],
  modelName,
  tokenCount,
  welcomeIcon,
  welcomeTitle,
  welcomeDescription,
  children,
}: ChatPanelProps) {
  const [inputValue, setInputValue] = useState("");
  const [maximized, setMaximized] = useState(false);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [liveMessages, setLiveMessages] = useState<ChatMessage[]>([]);
  const [streamingId, setStreamingId] = useState<string | null>(null);
  const streamAbortRef = useRef<{ abort: () => void } | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const load = useModelLoadState(threadId);

  const messages: ChatMessage[] = useMemo(
    () => [...initialMessages, ...liveMessages],
    [initialMessages, liveMessages],
  );

  useEffect(() => {
    const onSelected = (e: Event) => {
      const ce = e as CustomEvent<{ id?: string }>;
      setThreadId(ce.detail?.id ?? null);
      setLiveMessages([]);
      streamAbortRef.current?.abort();
      streamAbortRef.current = null;
      setStreamingId(null);
    };
    window.addEventListener("local-llm/thread:selected", onSelected);
    return () =>
      window.removeEventListener("local-llm/thread:selected", onSelected);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length, liveMessages]);

  const isStreaming = streamingId !== null;
  const sendDisabled = !threadId || load.phase !== "ready" || isStreaming;
  const placeholder = !threadId
    ? "Select a session to begin."
    : load.phase === "idle"
      ? "Choose a model to enable the composer."
      : load.phase === "loading"
        ? `Loading ${load.label ?? "model"}…`
        : load.phase === "failed"
          ? `Load failed: ${load.reason ?? "unknown"}`
          : isStreaming
            ? "Generating…"
            : "Command spectral...";

  const submit = useCallback(() => {
    if (!threadId || sendDisabled || !inputValue.trim() || !load.port) return;
    const trimmed = inputValue.trim();
    const port = load.port;
    const userId = `u-${Date.now()}`;
    const assistantId = `a-${Date.now()}`;
    const historyTurns = liveMessages.map((m) => ({
      role: m.role,
      content: m.content,
    }));
    setLiveMessages((prev) => [
      ...prev,
      { id: userId, role: "user", content: trimmed },
      { id: assistantId, role: "assistant", content: "" },
    ]);
    setInputValue("");
    setStreamingId(assistantId);
    const handle = streamMessage(
      {
        port,
        messages: [
          ...historyTurns,
          { role: "user", content: trimmed },
        ],
      },
      {
        onToken: (delta) => {
          setLiveMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId ? { ...m, content: m.content + delta } : m,
            ),
          );
        },
        onDone: (stats) => {
          setLiveMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    latencyMs: stats.latencyMs,
                    tokensPerSec: stats.tokensPerSec,
                    promptTokens: stats.promptTokens,
                    completionTokens: stats.completionTokens,
                    params: stats.params,
                  }
                : m,
            ),
          );
          setStreamingId((current) =>
            current === assistantId ? null : current,
          );
          streamAbortRef.current = null;
        },
        onError: (err) => {
          setLiveMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content: m.content
                      ? `${m.content}\n\n_[stream failed: ${err.message}]_`
                      : `_[stream failed: ${err.message}]_`,
                  }
                : m,
            ),
          );
          setStreamingId((current) =>
            current === assistantId ? null : current,
          );
          streamAbortRef.current = null;
        },
      },
    );
    streamAbortRef.current = handle;
  }, [threadId, sendDisabled, inputValue, load.port, liveMessages]);

  const stopStream = useCallback(() => {
    streamAbortRef.current?.abort();
    streamAbortRef.current = null;
    setStreamingId(null);
  }, []);

  useEffect(() => {
    return () => {
      streamAbortRef.current?.abort();
    };
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  const handleFileChange = (_e: React.ChangeEvent<HTMLInputElement>) => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const panelCls = [
    styles.chatPanel,
    maximized ? styles.chatPanelMaximized : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={panelCls}>
      <div ref={scrollRef} className={styles.chatMessages}>
        {messages.length === 0 && welcomeTitle && (
          <div className={styles.chatWelcome}>
            {welcomeIcon && (
              <div className={styles.chatWelcomeIconBox}>
                <span className="material-symbols-outlined" style={iconStyle(32)}>
                  {welcomeIcon}
                </span>
              </div>
            )}
            <h2 className={styles.chatWelcomeTitle}>{welcomeTitle}</h2>
            {welcomeDescription && (
              <p className={styles.chatWelcomeDescription}>{welcomeDescription}</p>
            )}
          </div>
        )}
        {messages.length === 0 && !welcomeTitle && children}
        {messages.map((msg) => {
          if (msg.role === "system") return null;

          const isUser = msg.role === "user";
          const rowCls = [
            styles.chatMessageRow,
            isUser ? styles.chatMessageRowUser : styles.chatMessageRowAssistant,
          ].join(" ");
          const bubbleCls = [
            styles.chatBubbleBase,
            isUser ? styles.chatBubbleUser : styles.chatBubbleAssistant,
          ].join(" ");
          const roleName = isUser ? "You" : msg.modelName ?? modelName ?? "Assistant";
          const iconBoxCls = [
            styles.chatMessageIconBox,
            isUser ? styles.chatMessageIconBoxUser : styles.chatMessageIconBoxAssistant,
          ].join(" ");
          const roleCls = [
            styles.chatRoleBadge,
            isUser ? styles.chatRoleBadgeUser : styles.chatRoleBadgeAssistant,
          ].join(" ");

          return (
            <div key={msg.id} className={rowCls}>
              {!isUser && (
                <div className={iconBoxCls}>
                  <span className="material-symbols-outlined" style={iconStyle(14)}>
                    auto_awesome
                  </span>
                </div>
              )}
              <div className={styles.chatMessageBody}>
                <span className={roleCls}>
                  {!isUser && (
                    <span className={`material-symbols-outlined ${styles.iconBadge}`}>
                      auto_awesome
                    </span>
                  )}
                  {isUser ? roleName : "Assistant"}
                </span>
                <div className={bubbleCls}>
                  {msg.content ? (
                    <MessageContent content={msg.content} />
                  ) : streamingId === msg.id ? (
                    <span
                      aria-label="Generating"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 6,
                        opacity: 0.75,
                      }}
                    >
                      <span
                        className={`material-symbols-outlined ${styles.chatStreamingSpinner}`}
                        style={iconStyle(16)}
                      >
                        progress_activity
                      </span>
                      thinking…
                    </span>
                  ) : null}
                  {streamingId === msg.id && msg.content && (
                    <span aria-hidden className={styles.chatStreamingCursor} />
                  )}
                </div>
                {!isUser && (
                  <details className={styles.chatMessageMetaDetails}>
                    <summary className={styles.chatMessageMeta}>
                      LATENCY:{" "}
                      {msg.latencyMs != null ? `${msg.latencyMs}ms` : "--"}
                      {" · "}
                      TOKENS:{" "}
                      {msg.tokensPerSec != null
                        ? `${msg.tokensPerSec.toFixed(1)}/s`
                        : "--/s"}
                      {msg.completionTokens != null && (
                        <> {" · "}OUT: {msg.completionTokens}</>
                      )}
                      {msg.promptTokens != null && (
                        <> {" · "}IN: {msg.promptTokens}</>
                      )}
                      {msg.params && <> {" · "}▸ params</>}
                    </summary>
                    {msg.params && (
                      <div className={styles.chatMessageParams}>
                        <span>
                          temperature=<b>{msg.params.temperature}</b>
                        </span>
                        <span>
                          top_p=<b>{msg.params.top_p}</b>
                        </span>
                        <span>
                          top_k=<b>{msg.params.top_k}</b>
                        </span>
                        <span>
                          max_tokens=<b>{msg.params.max_tokens}</b>
                        </span>
                        <span>
                          repeat_penalty=<b>{msg.params.repeat_penalty}</b>
                        </span>
                      </div>
                    )}
                  </details>
                )}
                {isUser && msg.timestamp && (
                  <div className={styles.chatMessageTimestamp}>{msg.timestamp}</div>
                )}
              </div>
              {isUser && (
                <div className={iconBoxCls}>
                  <span className="material-symbols-outlined" style={iconStyle(14)}>
                    person
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <input
        ref={fileInputRef}
        type="file"
        className={styles.hidden}
        onChange={handleFileChange}
      />

      <div className={styles.chatInputArea}>
        <div className={styles.chatInputGlass}>
          <div className={styles.chatInputToolsRow}>
            <button
              className={`${styles.chatInputIconButton} ${styles.chatInputIconAttach}`}
              type="button"
              onClick={() => fileInputRef.current?.click()}
            >
              <span className={`material-symbols-outlined ${styles.iconInherit}`}>
                attach_file
              </span>
            </button>
            <button
              className={`${styles.chatInputIconButton} ${styles.chatInputIconScreenshot}`}
              type="button"
            >
              <span className={`material-symbols-outlined ${styles.iconInherit}`}>
                screenshot_region
              </span>
            </button>
            <button
              className={`${styles.chatInputIconButton} ${styles.chatInputIconCode}`}
              type="button"
            >
              <span className={`material-symbols-outlined ${styles.iconInherit}`}>
                code_blocks
              </span>
            </button>

            <div className={styles.chatInputDivider} />

            {modelChips.map((chip, i) => (
              <span
                key={i}
                className={
                  chip.type === "model" ? styles.chatModelChip : styles.chatOptimizeChip
                }
              >
                {chip.label}
              </span>
            ))}

            {tokenCount !== undefined && (
              <>
                <div className={styles.chatInputDivider} />
                <span className={styles.tokenCountLabel}>
                  {tokenCount.toLocaleString()} tokens
                </span>
              </>
            )}

            <span className={styles.marginLeftAuto}>
              <button
                className={styles.chatInputIconButton}
                type="button"
                onClick={() => setMaximized((prev) => !prev)}
              >
                <span className={`material-symbols-outlined ${styles.iconInherit}`}>
                  {maximized ? "close_fullscreen" : "open_in_full"}
                </span>
              </button>
            </span>
          </div>

          <div className={styles.chatInputRow}>
            <textarea
              className={styles.chatInput}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={placeholder}
              rows={1}
              disabled={sendDisabled}
              aria-disabled={sendDisabled}
              aria-label={placeholder}
            />
            {isStreaming ? (
              <button
                className={styles.chatSendButton}
                type="button"
                aria-label="Stop generating"
                title="Stop generating"
                onClick={stopStream}
              >
                <span
                  className={`material-symbols-outlined ${styles.iconInheritFilled}`}
                >
                  stop
                </span>
              </button>
            ) : (
              <button
                className={styles.chatSendButton}
                type="button"
                disabled={sendDisabled || !inputValue.trim()}
                aria-disabled={sendDisabled || !inputValue.trim()}
                aria-label={sendDisabled ? placeholder : "Send message"}
                title={sendDisabled ? placeholder : "Send"}
                onClick={submit}
              >
                <span
                  className={`material-symbols-outlined ${styles.iconInheritFilled}`}
                >
                  send
                </span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
