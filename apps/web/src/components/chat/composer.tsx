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
  initialValue?: string;
  draftRestored?: boolean;
  onValueChange?: (value: string) => void;
  onSend: (text: string) => Promise<void>;
  onCancelStream?: () => void;
}

export function Composer({
  placeholder = "Send a message…",
  disabled = false,
  disabledReason,
  isStreaming,
  showShortcutHint = true,
  initialValue = "",
  draftRestored = false,
  onValueChange,
  onSend,
  onCancelStream,
}: ComposerProps) {
  const [value, setValue] = useState(initialValue);
  const [busy, setBusy] = useState(false);
  const [showRestoredHint, setShowRestoredHint] = useState(draftRestored);
  const onValueChangeRef = useRef(onValueChange);
  useEffect(() => {
    onValueChangeRef.current = onValueChange;
  }, [onValueChange]);
  useEffect(() => {
    onValueChangeRef.current?.(value);
  }, [value]);
  useEffect(() => {
    if (!draftRestored) {
      setShowRestoredHint(false);
      return;
    }
    setShowRestoredHint(true);
    const timer = setTimeout(() => setShowRestoredHint(false), 3000);
    return () => clearTimeout(timer);
  }, [draftRestored]);
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
      {showRestoredHint && (
        <div className={styles.restoredHint} role="status" aria-live="polite">
          <span
            className={`material-symbols-outlined ${styles.restoredHintGlyph}`}
            aria-hidden="true"
          >
            history
          </span>
          Restored draft from last session
          <button
            type="button"
            className={styles.restoredHintDismiss}
            onClick={() => setShowRestoredHint(false)}
            aria-label="Dismiss draft restored hint"
          >
            <span className="material-symbols-outlined" aria-hidden="true">
              close
            </span>
          </button>
        </div>
      )}
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
