import type { ReactNode } from "react";
import * as css from "./recipe.css";
import { sectionLabel } from "../../components/section_label.css";
import { Banner } from "../../components/banner";
import { Panel } from "../../components/panel";
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
        <Banner severity="warning">
          <strong>Workflow customised.</strong>{" "}
          {unmappable.length === 0
            ? "Every recipe field still binds, but the graph topology diverges from the curated template."
            : `These fields are now managed in the graph: ${unmappable.join(", ")}.`}{" "}
          <a href="/#/workflows" target="_top">
            Open workflow canvas →
          </a>
        </Banner>
      )}
      <div className={css.leftColumn}>
        <Panel aria-labelledby="recipe-section-script">
          <h2 id="recipe-section-script" className={sectionLabel}>
            01 / Script
          </h2>
          {props.scriptEditor}
        </Panel>
        <Panel aria-labelledby="recipe-section-settings">
          <h2 id="recipe-section-settings" className={sectionLabel}>
            02 / Settings
          </h2>
          {props.settingsPanel}
        </Panel>
      </div>
      <div className={css.rightColumn}>
        {/* Run sits above the fold so Generate is always reachable. */}
        <Panel aria-labelledby="recipe-section-run">
          <h2 id="recipe-section-run" className={sectionLabel}>
            03 / Run
          </h2>
          {props.runPanel}
        </Panel>
        <Panel aria-labelledby="recipe-section-emotion">
          <h2 id="recipe-section-emotion" className={sectionLabel}>
            04 / Emotion
          </h2>
          {props.emotionPanel}
        </Panel>
        <Panel aria-labelledby="recipe-section-history">
          <h2 id="recipe-section-history" className={sectionLabel}>
            05 / Recent runs
          </h2>
          {props.historyPanel}
        </Panel>
      </div>
    </div>
  );
}
