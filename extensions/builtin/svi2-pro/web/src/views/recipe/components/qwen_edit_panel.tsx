import type { ReactElement } from "react";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./qwen_edit_panel.css";

export function QwenEditPanel(): ReactElement {
  const { qwenEdit, setQwenEdit } = useRenderRequest();

  return (
    <div className={styles.root}>
      <div className={styles.toggleRow}>
        <button
          type="button"
          role="switch"
          aria-checked={qwenEdit.enabled}
          aria-label="enable anchor edit"
          className={styles.switchBtn}
          onClick={() => setQwenEdit({ enabled: !qwenEdit.enabled })}
        >
          <span className={styles.switchThumb} aria-hidden="true" />
        </button>
        <span className={styles.toggleLabel}>
          <span className={styles.toggleTitle}>Transform anchor (edit-then-animate)</span>
          <span className={styles.toggleHint}>
            Edit the reference keyframe with Qwen-Image-Edit before animating. Coherent
            transformation without per-frame flicker.
          </span>
        </span>
      </div>
      {qwenEdit.enabled && (
        <textarea
          className={styles.textarea}
          aria-label="anchor edit prompt"
          placeholder="Edit instruction — keep face geometry/pose/framing; change only appearance."
          value={qwenEdit.prompt}
          onChange={(e) => setQwenEdit({ prompt: e.target.value })}
        />
      )}
    </div>
  );
}
