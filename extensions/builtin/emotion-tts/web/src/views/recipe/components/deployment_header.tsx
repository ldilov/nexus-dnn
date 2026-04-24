import type { Deployment } from "../../../services/deployments_client";
import * as css from "../recipe.css";

interface Props {
  deployment: Deployment;
}

export function DeploymentHeader({ deployment }: Props): JSX.Element {
  return (
    <div className={css.controlRow}>
      <span className={css.label}>Runtime</span>
      <span>{deployment.backendRuntimePreference ?? "indextts.python"}</span>
      <span className={css.label}>Default format</span>
      <span>{deployment.defaultOutputFormat}</span>
      <span className={css.label}>Updated</span>
      <span>{new Date(deployment.updatedAt * 1000).toLocaleString()}</span>
    </div>
  );
}
