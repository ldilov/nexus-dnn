import { useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from "react";
import * as styles from "./composer.css";

interface ComposerProps {
  placeholder?: string;
  disabled?: boolean;
  disabledReason?: ReactNode;
  isStreaming: boolean;
  showShortcutHint?: boolean;
  onSend: (text: string) => Promise<void>;
  onCancelStream?: () => void;
}

export function Composer({
  placeholder = "Send a message…",
  disabled = false,
  disabledReason,
  isStreaming,
  showShortcutHint = true,
  onSend,
  onCancelStream,
}: ComposerProps) {
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    const max = 6 * 24;
    el.style.height = `${Math.min(el.scrollHeight, max)}px`;
  }, [value]);

  if (disabled) {
    return <div className={styles.disabledNotice} role="note">{disabledReason ?? "Composer disabled."}</div>;
  }

  const submit = async () => {
    const trimmed = value.trim();
    if (!trimmed || busy || isStreaming) return;
    setBusy(true);
    try {
      await onSend(trimmed);
      setValue("");
    } finally {
      setBusy(false);
    }
  };

  const handleKey = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void submit();
    }
  };

  const sendDisabled = !value.trim() || busy || isStreaming;

  return (
    <div>
      <div className={styles.wrap}>
        <textarea
          ref={ref}
          className={styles.textarea}
          rows={1}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKey}
          placeholder={placeholder}
          aria-label={placeholder}
        />
        {isStreaming && onCancelStream ? (
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancelStream}
            aria-label="Cancel stream"
          >
            Stop
          </button>
        ) : (
          <button
            type="button"
            className={styles.sendBtn}
            onClick={() => void submit()}
            disabled={sendDisabled}
            aria-label="Send message"
            title="Send"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              arrow_upward
            </span>
          </button>
        )}
      </div>
      {showShortcutHint && (
        <div className={styles.hint}>Enter to send · Shift-Enter for newline</div>
      )}
    </div>
  );
}
