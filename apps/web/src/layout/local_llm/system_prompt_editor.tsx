import * as styles from "./system_prompt_editor.css";

interface SystemPromptEditorProps {
  value: string;
  onChange: (next: string) => void;
  placeholder?: string;
}

export function SystemPromptEditor({
  value,
  onChange,
  placeholder,
}: Readonly<SystemPromptEditorProps>) {
  const tokenEstimate = Math.ceil(value.length / 4);
  return (
    <div className={styles.wrap}>
      <label className={styles.label} htmlFor="system-prompt">
        System Prompt
      </label>
      <textarea
        id="system-prompt"
        className={styles.textarea}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "You are a helpful assistant."}
        rows={4}
      />
      <div className={styles.foot}>
        <span className={styles.muted}>~{tokenEstimate} tokens</span>
        {value.length > 0 ? (
          <button
            type="button"
            className={styles.clear}
            onClick={() => onChange("")}
          >
            Clear
          </button>
        ) : null}
      </div>
    </div>
  );
}
