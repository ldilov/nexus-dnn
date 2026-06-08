import { type ReactElement, useMemo, useState } from "react";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./prompt_input.css";

interface PromptInputProps {
  error?: string | undefined;
  textareaId?: string;
}

export function PromptInput({ error, textareaId }: PromptInputProps): ReactElement {
  const { params, setPrompts } = useRenderRequest();
  const [perClip, setPerClip] = useState(false);
  const prompts = params.prompts ?? [""];
  const numClips = useMemo(
    () => Math.max(1, params.num_clips ?? prompts.length ?? 1),
    [params.num_clips, prompts.length],
  );

  const hiddenFilledCount = useMemo(
    () => prompts.slice(numClips).filter((p) => p.trim().length > 0).length,
    [prompts, numClips],
  );

  const handleSingleChange = (value: string) => {
    const next = prompts.length > 0 ? [...prompts] : [""];
    next[0] = value;
    setPrompts(next);
  };

  const handleClipChange = (index: number, value: string) => {
    const length = Math.max(numClips, prompts.length, index + 1);
    const next = Array.from({ length }, (_, i) => prompts[i] ?? "");
    next[index] = value;
    setPrompts(next);
  };

  const togglePerClip = (next: boolean) => {
    setPerClip(next);
    if (next) {
      const seed = prompts[0] ?? "";
      const length = Math.max(numClips, prompts.length);
      setPrompts(Array.from({ length }, (_, i) => prompts[i] ?? seed));
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.modeRow}>
        <span className={styles.modeToggle}>
          <button
            type="button"
            role="switch"
            aria-checked={perClip}
            aria-label="per-clip prompts"
            className={styles.switchBtn}
            onClick={() => togglePerClip(!perClip)}
          >
            <span className={styles.switchThumb} aria-hidden="true" />
          </button>
          Per-clip prompts
        </span>
      </div>

      {!perClip ? (
        <textarea
          id={textareaId}
          className={styles.textarea}
          aria-label="single prompt"
          aria-invalid={error !== undefined || undefined}
          placeholder="One prompt across all clips. Describe MOTION, not appearance change."
          value={prompts[0] ?? ""}
          onChange={(e) => handleSingleChange(e.target.value)}
        />
      ) : (
        Array.from({ length: numClips }, (_, i) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: clip position is the stable identity
          <div className={styles.clipRow} key={`clip-${i}`}>
            <span className={styles.clipLabel}>Clip {i + 1}</span>
            <textarea
              id={i === 0 ? textareaId : undefined}
              className={styles.textarea}
              aria-label={`prompt for clip ${i + 1}`}
              aria-invalid={i === 0 && error !== undefined ? true : undefined}
              value={prompts[i] ?? ""}
              onChange={(e) => handleClipChange(i, e.target.value)}
            />
          </div>
        ))
      )}

      {hiddenFilledCount > 0 && (
        <output className={styles.notice}>
          {hiddenFilledCount} per-clip prompt{hiddenFilledCount > 1 ? "s" : ""} beyond the current
          Clips count {hiddenFilledCount > 1 ? "are" : "is"} kept but hidden. Raise Clips to edit
          {hiddenFilledCount > 1 ? " them" : " it"} again — they are not discarded.
        </output>
      )}

      <p className={styles.hint}>
        Use a single prompt for a coherent long take. To change appearance, edit the anchor
        keyframe (edit-then-animate) — appearance verbs in the prompt fight the anchor and cause
        drift.
      </p>
      {error && (
        <span role="alert" className={styles.errorText}>
          {error}
        </span>
      )}
    </div>
  );
}
