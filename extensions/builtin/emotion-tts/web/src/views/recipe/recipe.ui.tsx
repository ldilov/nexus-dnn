import type { ReactNode } from "react";
import { Link } from "react-router";
import * as css from "./recipe.css";
import type { Deployment } from "../../services/deployments_client";
import type { RecipeField } from "../../services/workflows_client";

export interface RecipeUiProps {
  deployment: Deployment;
  header: ReactNode;
  scriptEditor: ReactNode;
  emotionPanel: ReactNode;
  settingsPanel: ReactNode;
  runPanel: ReactNode;
  historyPanel: ReactNode;
  workflowCustomised?: boolean;
  unmappableFields?: RecipeField[];
}

export function RecipeUi(props: RecipeUiProps): JSX.Element {
  const customised = props.workflowCustomised ?? false;
  const unmappable = props.unmappableFields ?? [];

  return (
    <div className={css.shell}>
      <header className={css.deploymentHeader}>
        <h1 className={css.deploymentTitle}>{props.deployment.displayName}</h1>
        {props.header}
      </header>
      {customised && (
        <section className={css.warningBanner} aria-live="polite">
          <strong>Workflow customised.</strong>{" "}
          {unmappable.length === 0
            ? "Every recipe field still binds, but the graph topology diverges from the curated template."
            : `These fields are now managed in the graph: ${unmappable.join(", ")}.`}{" "}
          <Link to={`/${props.deployment.deploymentId}/graph`}>Open graph →</Link>
        </section>
      )}
      <div className={css.leftColumn}>
        <section className={css.panel} aria-label="Dialogue script">
          <h2 className={css.panelTitle}>Script</h2>
          {props.scriptEditor}
        </section>
        <section className={css.panel} aria-label="Generation settings">
          <h2 className={css.panelTitle}>Settings</h2>
          {props.settingsPanel}
        </section>
      </div>
      <div className={css.rightColumn}>
        <section className={css.panel} aria-label="Emotion panel">
          <h2 className={css.panelTitle}>Emotion</h2>
          {props.emotionPanel}
        </section>
        <section className={css.panel} aria-label="Run">
          <h2 className={css.panelTitle}>Run</h2>
          {props.runPanel}
        </section>
        <section className={css.panel} aria-label="Recent runs">
          <h2 className={css.panelTitle}>Recent runs</h2>
          {props.historyPanel}
        </section>
      </div>
    </div>
  );
}
