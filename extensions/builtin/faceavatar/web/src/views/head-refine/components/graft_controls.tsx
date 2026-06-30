import type { ReactElement } from "react";
import type { GraftFormHandle } from "../use_graft_form";
import type { AlignMode, SeamMode } from "../../../services/types";
import * as styles from "./graft_controls.css";

interface GraftControlsProps {
  handle: GraftFormHandle;
  disabled?: boolean;
}

export function GraftControls({ handle, disabled = false }: GraftControlsProps): ReactElement {
  const { form, setSeam, setKeepHair, setBlendRing, setAlign, setTextureBlend } = handle;
  return (
    <div className={styles.grid}>
      <label className={styles.ctl}>
        <span className={styles.ctlLabel}>Seam</span>
        <select
          className={styles.input}
          aria-label="Seam"
          value={form.seam}
          disabled={disabled}
          onChange={(e) => setSeam(e.target.value as SeamMode)}
        >
          <option value="neck">Neck</option>
          <option value="hairline">Hairline</option>
        </select>
      </label>

      <label className={styles.ctl}>
        <span className={styles.ctlLabel}>Align</span>
        <select
          className={styles.input}
          aria-label="Align"
          value={form.align}
          disabled={disabled}
          onChange={(e) => setAlign(e.target.value as AlignMode)}
        >
          <option value="landmark">Landmark (auto)</option>
          <option value="manual">Manual</option>
        </select>
      </label>

      <label className={styles.ctlWide}>
        <span className={styles.ctlLabelRow}>
          <span className={styles.ctlLabel}>Blend ring</span>
          <span className={styles.readout}>{form.blendRing.toFixed(2)}</span>
        </span>
        <input
          className={styles.slider}
          type="range"
          aria-label="Blend ring"
          min={0}
          max={1}
          step={0.05}
          value={form.blendRing}
          disabled={disabled}
          onChange={(e) => setBlendRing(Number(e.target.value))}
        />
      </label>

      <div className={styles.toggleRow}>
        <div className={styles.toggleCopy}>
          <span className={styles.toggleTitle}>Keep hair / back</span>
          <span className={styles.toggleHint}>Retain the base mesh's hair and back of head.</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={form.keepHair}
          aria-label="Keep hair"
          disabled={disabled}
          className={styles.toggle}
          onClick={() => setKeepHair(!form.keepHair)}
        >
          <span className={styles.toggleThumb} aria-hidden="true" />
        </button>
      </div>

      <div className={styles.toggleRow}>
        <div className={styles.toggleCopy}>
          <span className={styles.toggleTitle}>Blend textures</span>
          <span className={styles.toggleHint}>Match albedo across the seam between the two meshes.</span>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={form.textureBlend}
          aria-label="Blend textures"
          disabled={disabled}
          className={styles.toggle}
          onClick={() => setTextureBlend(!form.textureBlend)}
        >
          <span className={styles.toggleThumb} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
