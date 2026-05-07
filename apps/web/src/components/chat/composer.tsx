import { useEffect, useRef, useState, type ReactNode, type KeyboardEvent } from "react";
import { toast } from "sonner";
import * as styles from "./composer.css";

const MAX_COMPOSER_LINES = 6;
const LINE_HEIGHT_PX = 24;

function formatCharCount(n: number): string {
  if (n < 1000) return String(n);
  const inK = n / 1000;
  return Number.isInteger(inK) ? `${inK}k` : `${inK.toFixed(1)}k`;
}

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
    const max = MAX_COMPOSER_LINES * LINE_HEIGHT_PX;
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
          aria-label="Message"
        />
        {value.length > 0 && (
          <span className={styles.charCount} aria-hidden="true">
            {formatCharCount(value.length)}
          </span>
        )}
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={() => toast.message("Attach not yet supported")}
          aria-label="Attach file"
          title="Attach file"
        >
          <span className="material-symbols-outlined" aria-hidden="true">attach_file</span>
        </button>
        <button
          type="button"
          className={styles.secondaryBtn}
          onClick={() => toast.message("Voice not yet supported")}
          aria-label="Record voice"
          title="Record voice"
        >
          <span className="material-symbols-outlined" aria-hidden="true">mic</span>
        </button>
        {isStreaming && onCancelStream ? (
          <button
            type="button"
            className={styles.cancelBtn}
            onClick={onCancelStream}
            aria-label="Cancel stream"
          >
            <span className="material-symbols-outlined" aria-hidden="true">stop</span>
            <span>Stop</span>
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
            <span className="material-symbols-outlined" aria-hidden="true">arrow_upward</span>
            <span>Send</span>
          </button>
        )}
      </div>
      {showShortcutHint && (
        <div className={styles.hint}>Enter to send · Shift-Enter for newline</div>
      )}
    </div>
  );
}
