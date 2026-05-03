import { CodeBlock } from "./code_block";
import * as styles from "./message_bubble.css";
import type { ChatMessage } from "./chat_surface";

interface MessageBubbleProps {
  message: ChatMessage;
  isStreamingTail: boolean;
  onRetry?: (id: string) => void;
}

const CODE_FENCE = /```([\w-]*)\n([\s\S]*?)```/g;

function renderText(text: string): Array<{ kind: "text" | "code"; value: string; lang?: string }> {
  const out: Array<{ kind: "text" | "code"; value: string; lang?: string }> = [];
  let last = 0;
  CODE_FENCE.lastIndex = 0;
  let match: RegExpExecArray | null;
  while ((match = CODE_FENCE.exec(text)) !== null) {
    if (match.index > last) {
      out.push({ kind: "text", value: text.slice(last, match.index) });
    }
    out.push({ kind: "code", value: match[2] ?? "", lang: match[1] || undefined });
    last = CODE_FENCE.lastIndex;
  }
  if (last < text.length) {
    out.push({ kind: "text", value: text.slice(last) });
  }
  return out;
}

export function MessageBubble({ message, isStreamingTail, onRetry }: MessageBubbleProps) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";
  const rowCls = [
    styles.row,
    isUser ? styles.rowUser : isSystem ? styles.rowSystem : styles.rowAssistant,
  ].join(" ");
  const isFailed = message.status === "failed";
  const isMismatch = !!message.isSchemaMismatch;

  const bubbleCls = [
    styles.bubble,
    isUser ? styles.bubbleUser : styles.bubbleAssistant,
    isMismatch ? styles.bubbleSchemaMismatch : "",
    isFailed ? styles.bubbleFailed : "",
  ]
    .filter(Boolean)
    .join(" ");

  const segments = renderText(message.text);
  const showTimestamp = isMismatch || isFailed;

  return (
    <div className={rowCls} role="article">
      {!isUser && !isSystem && !isMismatch && <span className={styles.eyebrow}>AI</span>}
      <div className={bubbleCls}>
        {segments.map((seg, i) =>
          seg.kind === "code" ? (
            <CodeBlock key={i} code={seg.value} lang={seg.lang} />
          ) : (
            <span key={i}>{seg.value}</span>
          ),
        )}
        {isStreamingTail && <span className={styles.cursor} aria-hidden="true" />}
      </div>
      {showTimestamp && (
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
