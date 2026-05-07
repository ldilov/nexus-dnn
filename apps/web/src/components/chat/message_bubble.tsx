import { useCallback, useState, type ComponentPropsWithoutRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { CodeBlock } from "./code_block";
import * as styles from "./message_bubble.css";
import type { ChatMessage } from "./chat_surface";

interface MessageBubbleProps {
  message: ChatMessage;
  isStreamingTail: boolean;
  onRetry?: (id: string) => void;
}

const TIME_FORMATTER = new Intl.DateTimeFormat(undefined, {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

function formatTimestamp(value: string | undefined): string | null {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return TIME_FORMATTER.format(date);
}

function defaultAuthorLabel(role: ChatMessage["role"]): string {
  if (role === "user") return "You";
  if (role === "assistant") return "Assistant";
  return "System";
}

function defaultAvatarGlyph(role: ChatMessage["role"]): string {
  if (role === "assistant") return "auto_awesome";
  if (role === "system") return "info";
  return "person";
}

interface AvatarProps {
  role: ChatMessage["role"];
  initials?: string;
}

function Avatar({ role, initials }: AvatarProps) {
  const cls =
    role === "user" ? styles.avatarUser : role === "system" ? styles.avatarSystem : styles.avatarAssistant;
  const trimmed = initials?.trim();
  if (role === "user" && trimmed) {
    return (
      <span className={`${styles.avatar} ${cls}`} aria-hidden="true">
        {trimmed.slice(0, 2)}
      </span>
    );
  }
  return (
    <span className={`${styles.avatar} ${cls}`} aria-hidden="true">
      <span className={`material-symbols-outlined ${styles.avatarGlyph}`}>
        {defaultAvatarGlyph(role)}
      </span>
    </span>
  );
}

type CodeProps = ComponentPropsWithoutRef<"code"> & { inline?: boolean };

const markdownComponents = {
  code({ inline, className, children, ...rest }: CodeProps) {
    const isBlock = inline === false || /\n/.test(String(children ?? ""));
    if (!isBlock) {
      return (
        <code className={`${className ?? ""} ${styles.inlineCode}`.trim()} {...rest}>
          {children}
        </code>
      );
    }
    const lang = /language-([\w-]+)/.exec(className ?? "")?.[1];
    return <CodeBlock code={String(children).replace(/\n$/, "")} lang={lang} />;
  },
  a({ href, children }: ComponentPropsWithoutRef<"a">) {
    return (
      <a className={styles.link} href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

export function MessageBubble({ message, isStreamingTail, onRetry }: MessageBubbleProps) {
  const [copied, setCopied] = useState(false);

  const isUser = message.role === "user";
  const isSystem = message.role === "system";
  const isAssistant = !isUser && !isSystem;
  const isFailed = message.status === "failed";
  const isMismatch = !!message.isSchemaMismatch;

  const rowCls = [
    styles.row,
    isUser ? styles.rowUser : isSystem ? styles.rowSystem : styles.rowAssistant,
  ].join(" ");

  const bubbleCls = [
    styles.bubble,
    isUser ? styles.bubbleUser : isSystem ? styles.bubbleSystem : styles.bubbleAssistant,
    isMismatch ? styles.bubbleSchemaMismatch : "",
    isFailed ? styles.bubbleFailed : "",
  ]
    .filter(Boolean)
    .join(" ");

  const authorLabel = message.authorLabel ?? defaultAuthorLabel(message.role);
  const formattedTime = formatTimestamp(message.createdAt);

  const handleCopy = useCallback(() => {
    const text = message.text;
    if (!text) return;
    const clipboard = typeof navigator !== "undefined" ? navigator.clipboard : undefined;
    if (clipboard?.writeText) {
      clipboard
        .writeText(text)
        .then(() => {
          setCopied(true);
          window.setTimeout(() => setCopied(false), 1200);
        })
        .catch(() => {
          /* ignore clipboard failures */
        });
    }
  }, [message.text]);

  const showFooterStats =
    isAssistant && !isStreamingTail && (message.tokens != null || message.latencyMs != null || message.cached);
  const showFooter = isAssistant && !isStreamingTail && !isMismatch;

  const showMetaRow = isMismatch;

  return (
    <div className={rowCls} role="article">
      <div className={bubbleCls}>
        {!isMismatch && (
          <header className={styles.header}>
            <Avatar role={message.role} initials={message.authorInitials} />
            <span className={styles.name}>{authorLabel}</span>
            {isStreamingTail && !isFailed ? (
              <span className={styles.statusChip} data-tone="streaming" aria-live="polite">
                <span className={styles.statusDot} aria-hidden="true" />
                generating
              </span>
            ) : isFailed ? (
              <span className={styles.statusChip} data-tone="failed" role="status">
                <span className={styles.statusDot} aria-hidden="true" />
                failed
              </span>
            ) : formattedTime ? (
              <time className={styles.timestamp} dateTime={message.createdAt}>
                {formattedTime}
              </time>
            ) : null}
          </header>
        )}

        <div className={styles.body}>
          {isMismatch ? (
            <span>{message.text}</span>
          ) : (
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={markdownComponents}
            >
              {message.text}
            </ReactMarkdown>
          )}
          {isStreamingTail && <span className={styles.cursor} aria-hidden="true" />}
        </div>

        {showFooter && (
          <footer className={styles.footer}>
            <button
              type="button"
              className={styles.iconBtn}
              onClick={handleCopy}
              aria-label="Copy message"
            >
              <span className={`material-symbols-outlined ${styles.iconBtnGlyph}`} aria-hidden="true">
                {copied ? "check" : "content_copy"}
              </span>
              <span>{copied ? "Copied" : "Copy"}</span>
            </button>
            <button type="button" className={styles.iconBtn} aria-label="Mark helpful">
              <span className={`material-symbols-outlined ${styles.iconBtnGlyph}`} aria-hidden="true">
                thumb_up
              </span>
            </button>
            <button type="button" className={styles.iconBtn} aria-label="Mark unhelpful">
              <span className={`material-symbols-outlined ${styles.iconBtnGlyph}`} aria-hidden="true">
                thumb_down
              </span>
            </button>
            <span className={styles.spacer} />
            {showFooterStats && (
              <span className={styles.stats}>
                {[
                  message.tokens != null ? `${message.tokens} tok` : null,
                  message.latencyMs != null ? `${(message.latencyMs / 1000).toFixed(1)}s` : null,
                  message.cached ? "cached" : null,
                ]
                  .filter(Boolean)
                  .join(" · ")}
              </span>
            )}
            {isFailed && onRetry && (
              <button
                type="button"
                className={styles.retryBtn}
                onClick={() => onRetry(message.id)}
              >
                Retry
              </button>
            )}
          </footer>
        )}
      </div>
      {showMetaRow && (
        <div className={styles.meta}>
          {message.createdAt ? <time dateTime={message.createdAt}>{message.createdAt}</time> : null}
          {isFailed && onRetry ? (
            <button
              type="button"
              className={styles.retryBtn}
              onClick={() => onRetry(message.id)}
            >
              Retry
            </button>
          ) : null}
        </div>
      )}
    </div>
  );
}
