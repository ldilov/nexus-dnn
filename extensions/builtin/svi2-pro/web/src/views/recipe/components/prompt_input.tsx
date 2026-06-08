import { type ReactElement, useMemo, useState } from "react";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./prompt_input.css";

interface PromptInputProps {
  error?: string | undefined;
}

export function PromptInput({ error }: PromptInputProps): ReactElement {
  const { params, setPrompts } = useRenderRequest();
  const [perClip, setPerClip] = useState(false);
  const prompts = params.prompts ?? [""];
  const numClips = useMemo(() => params.num_clips ?? prompts.length ?? 1, [params.num_clips, prompts.length]);

  const handleSingleChange = (value: string) => {
    setPrompts([value]);
  };

  const handleClipChange = (index: number, value: string) => {
    const next = Array.from({ length: numClips }, (_, i) => prompts[i] ?? "");
    next[index] = value;
    setPrompts(next);
  };

  const togglePerClip = (next: boolean) => {
    setPerClip(next);
    if (!next) {
      setPrompts([prompts[0] ?? ""]);
    } else {
      const seed = prompts[0] ?? "";
      setPrompts(Array.from({ length: numClips }, (_, i) => prompts[i] ?? seed));
    }
  };

  return (
    <div className={styles.root}>
      <div className={styles.modeRow}>
        <label className={styles.modeToggle}>
          <input
            type="checkbox"
            checked={perClip}
            onChange={(e) => togglePerClip(e.target.checked)}
          />
          Per-clip prompts
        </label>
      </div>

      {!perClip ? (
        <textarea
          className={styles.textarea}
          aria-label="single prompt"
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
              className={styles.textarea}
              aria-label={`prompt for clip ${i + 1}`}
              value={prompts[i] ?? ""}
              onChange={(e) => handleClipChange(i, e.target.value)}
            />
          </div>
        ))
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
