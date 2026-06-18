import type { ReactElement } from "react";
import * as fc from "../../../components/form/field_control.css";
import { TORCH_COMPILE_MODE_OPTIONS } from "../../../domain/settings_defaults";
import type { TorchCompileMode } from "../../../services/types";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./quick_controls.css";

export function TorchCompileToggle(): ReactElement {
  const { params, updateParam } = useRenderRequest();
  const blocked = (params.blocks_to_swap ?? 0) > 0;
  const checked = !blocked && (params.use_torch_compile ?? false);
  const mode = params.torch_compile_mode ?? "default";

  return (
    <div className={styles.group}>
      <label className={styles.groupLabel} htmlFor="svi2-torch-compile">
        torch.compile (experimental)
      </label>
      <div className={fc.toggleRow}>
        <button
          type="button"
          id="svi2-torch-compile"
          role="switch"
          aria-checked={checked}
          disabled={blocked}
          className={fc.toggle}
          onClick={() => updateParam("use_torch_compile", !checked)}
        >
          <span className={fc.toggleThumb} aria-hidden="true" />
        </button>
        <span className={styles.hint}>{checked ? "On" : "Off"}</span>
      </div>
      {checked && (
        <div className={styles.selectWrap}>
          <select
            aria-label="torch.compile mode"
            className={styles.select}
            value={mode}
            onChange={(e) => updateParam("torch_compile_mode", e.target.value as TorchCompileMode)}
          >
            {TORCH_COMPILE_MODE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <span className={styles.selectChevron} aria-hidden="true">
            <svg viewBox="0 0 16 16" width="100%" height="100%" fill="none" aria-hidden="true">
              <title>open</title>
              <path
                d="M4 6l4 4 4-4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>
      )}
      <span className={styles.hint}>
        {blocked
          ? "Set Blocks to swap = 0 to enable — compile needs both experts VRAM-resident (no offload)."
          : "Compiles the DiT for faster steps; CUDA graphs via reduce-overhead. Falls back to eager if the backend is unavailable. Render report shows whether it engaged."}
      </span>
    </div>
  );
}
