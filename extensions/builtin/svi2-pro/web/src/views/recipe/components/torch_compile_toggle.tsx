import type { ReactElement } from "react";
import { useRenderRequest } from "../../../store/render_request_store";
import * as styles from "./quick_controls.css";

export function TorchCompileToggle(): ReactElement {
  const { params, updateParam } = useRenderRequest();
  const blocked = (params.blocks_to_swap ?? 0) > 0;
  const checked = !blocked && (params.use_torch_compile ?? false);

  return (
    <div className={styles.group}>
      <label className={styles.groupLabel} htmlFor="svi2-torch-compile">
        torch.compile (experimental)
      </label>
      <input
        id="svi2-torch-compile"
        type="checkbox"
        checked={checked}
        disabled={blocked}
        onChange={(e) => updateParam("use_torch_compile", e.target.checked)}
      />
      {blocked && (
        <span className={styles.hint}>Set Blocks to swap = 0 to enable.</span>
      )}
    </div>
  );
}
