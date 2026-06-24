import { type ReactElement } from "react";
import { useSearchParams } from "react-router";
import { RecipeBuilder } from "./RecipeBuilder";
import * as styles from "./recipe_builder.css";

/**
 * Generic builder route: `/recipe-builder?workflow_id=<id>&version=<v>`. Host-
 * owned and parameterised by id — renders the builder for any workflow version.
 */
export function Component(): ReactElement {
  const [params] = useSearchParams();
  const workflowId = params.get("workflow_id") ?? "";
  const version = params.get("version") ?? "";

  if (workflowId.length === 0) {
    return (
      <div className={styles.root}>
        <p className={styles.emptyNote}>
          Open the builder with a <code>?workflow_id=</code> query parameter to
          author a recipe from a workflow version.
        </p>
      </div>
    );
  }

  return <RecipeBuilder workflowId={workflowId} initialVersion={version} />;
}
