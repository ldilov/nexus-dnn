import type { ReactElement } from "react";
import { ModelViewer } from "../../../components/media/model_viewer";
import type { GenerateState } from "../../../domain/generate_state";
import { mediaUrlForRef } from "../../../services/media_url";
import * as styles from "./before_after.css";

interface BeforeAfterProps {
  baseMeshRef: string | null;
  state: GenerateState;
}

/** Side-by-side base mesh (before) vs grafted identity head (after). The after
 * pane shows the live result once the graft job completes; until then it shows
 * a status hint. Boundary-clean — both refs are opaque media refs. */
export function BeforeAfter({ baseMeshRef, state }: BeforeAfterProps): ReactElement {
  const baseUrl = mediaUrlForRef(baseMeshRef);
  const resultUrl = state.phase === "done" ? mediaUrlForRef(state.glbRef) : null;
  const downloadName = state.glbRef ? `${state.glbRef}.glb` : "grafted-head.glb";

  return (
    <div className={styles.wrap}>
      <div className={styles.pane}>
        <span className={styles.paneLabel}>Before · base mesh</span>
        {baseUrl ? (
          <ModelViewer url={baseUrl} alt="Base mesh" className={styles.viewer} />
        ) : (
          <div className={styles.empty}>Pick a base mesh to preview.</div>
        )}
      </div>
      <div className={styles.pane}>
        <span className={styles.paneLabel}>After · identity graft</span>
        {resultUrl ? (
          <ModelViewer url={resultUrl} alt="Grafted identity head" className={styles.viewer} />
        ) : (
          <div className={styles.empty}>{afterHint(state.phase)}</div>
        )}
        {resultUrl ? (
          <a className={styles.download} href={resultUrl} download={downloadName}>
            <span className={styles.downloadIcon} aria-hidden="true">
              download
            </span>
            Download GLB
          </a>
        ) : null}
      </div>
    </div>
  );
}

function afterHint(phase: GenerateState["phase"]): string {
  switch (phase) {
    case "running":
      return "Grafting the identity face — the result appears here when it lands.";
    case "error":
      return "Graft failed — see the progress panel, then try again.";
    case "cancelled":
      return "Graft cancelled.";
    default:
      return "Run a refine to weld the identity head.";
  }
}
