import { useLoaderData } from "react-router";
import type { DefaultWorkflowResponse } from "../../services/workflows_client";
import { GraphUi } from "./graph.ui";

interface LoaderData {
  deploymentId: string;
  workflow: DefaultWorkflowResponse;
}

export function GraphView(): JSX.Element {
  const { deploymentId, workflow } = useLoaderData() as LoaderData;
  return (
    <GraphUi
      document={workflow.workflow}
      backHref={`/extensions/nexus.audio.emotiontts/${deploymentId}/recipe`}
      title="Workflow graph"
    />
  );
}
