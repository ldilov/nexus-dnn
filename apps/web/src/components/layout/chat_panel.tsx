import { useState, useRef, useEffect, useCallback, type ReactNode } from "react";
import * as styles from "./layout_styles.css";

type ChatMessage = {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
  modelName?: string;
  latencyMs?: number;
  tokensPerSec?: number;
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

type ContentPart =
  | { type: "text"; value: string }
  | { type: "code"; value: string; lang: string };

function extractCodeBlocks(content: string): ContentPart[] {
  const parts: ContentPart[] = [];
  const regex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ type: "text", value: content.slice(lastIndex, match.index) });
    }
    parts.push({ type: "code", value: match[2] ?? "", lang: match[1] || "code" });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push({ type: "text", value: content.slice(lastIndex) });
  }

  if (parts.length === 0) {
    parts.push({ type: "text", value: content });
  }

  return parts;
}

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
        <button className={styles.chatCodeBlockCopy} onClick={handleCopy} type="button">
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
  const parts = extractCodeBlocks(content);

  return (
    <>
      {parts.map((part, i) => {
        if (part.type === "code") {
          return <CodeBlock key={i} code={part.value} lang={part.lang} />;
        }
        return <span key={i}>{part.value}</span>;
      })}
    </>
  );
}

function iconStyle(size: number): React.CSSProperties {
  return {
    fontSize: `${size}px`,
    fontVariationSettings: "'FILL' 1, 'wght' 400, 'GRAD' 0, 'opsz' 24",
  };
}

export function ChatPanel({
  messages = [],
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
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages.length]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      setInputValue("");
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
                  {isUser ? roleName : "SPECTRAL INTELLIGENCE"}
                </span>
                <div className={bubbleCls}>
                  <MessageContent content={msg.content} />
                  {!isUser && (
                    <div className={styles.chatMessageActions}>
                      <button className={styles.chatActionButton} type="button">
                        <span className={`material-symbols-outlined ${styles.iconSm}`}>
                          play_arrow
                        </span>
                        Execute Fix
                      </button>
                      <button className={styles.chatActionButton} type="button">
                        <span className={`material-symbols-outlined ${styles.iconSm}`}>
                          info
                        </span>
                        View Simulation
                      </button>
                    </div>
                  )}
                </div>
                {!isUser && (
                  <div className={styles.chatMessageMeta}>
                    LATENCY: {msg.latencyMs ?? "--"}ms | TOKENS: {msg.tokensPerSec ?? "--"}/s
                  </div>
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
              placeholder="Command spectral..."
              rows={1}
            />
            <button className={styles.chatSendButton} type="button">
              <span
                className={`material-symbols-outlined ${styles.iconInheritFilled}`}
              >
                send
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
