import { createBrowserRouter, redirect, type LoaderFunctionArgs } from "react-router";
import { listDeployments, getDeployment } from "./services/deployments_client";
import { listMappings } from "./services/mappings_client";
import { getRun, listRuns } from "./services/runs_client";
import { listVoiceAssets } from "./services/voice_assets_client";
import { getDefaultWorkflow } from "./services/workflows_client";
import { DeploymentsIndexView } from "./views/deployments/deployments_index.view";
import { GraphView } from "./views/graph/graph.view";
import { RecipeView } from "./views/recipe/recipe.view";
import { RunDetailView } from "./views/run_detail/run_detail.view";
import { RuntimeQueueView } from "./views/runtime_queue/runtime_queue.view";
import { NewMappingView } from "./views/mapping_editor/new_mapping.view";
import { MappingEditorView } from "./views/mapping_editor/mapping_editor.view";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      loader: async () => {
        const { deployments } = await listDeployments();
        return { deployments };
      },
      Component: DeploymentsIndexView,
    },
    {
      path: "/:deploymentId",
      loader: async ({ params }: LoaderFunctionArgs) => {
        const id = requireParam(params, "deploymentId");
        return redirect(`/${id}/recipe`);
      },
    },
    {
      path: "/:deploymentId/recipe",
      loader: async ({ params }: LoaderFunctionArgs) => {
        const id = requireParam(params, "deploymentId");
        const [deployment, { mappings }, { runs }, workflow] = await Promise.all([
          getDeployment(id),
          listMappings(id),
          listRuns(id, { limit: 10 }),
          getDefaultWorkflow(),
        ]);
        return { deployment, mappings, runs, workflow };
      },
      Component: RecipeView,
    },
    {
      path: "/:deploymentId/runs/:runId",
      loader: async ({ params }: LoaderFunctionArgs) => {
        const dep = requireParam(params, "deploymentId");
        const runId = requireParam(params, "runId");
        const run = await getRun(dep, runId);
        return { run };
      },
      Component: RunDetailView,
    },
    {
      path: "/:deploymentId/mappings",
      loader: async ({ params }: LoaderFunctionArgs) => {
        const id = requireParam(params, "deploymentId");
        const [deployment, { mappings }, { voiceAssets }] = await Promise.all([
          getDeployment(id),
          listMappings(id),
          listVoiceAssets(id),
        ]);
        return { deployment, mappings, voiceAssets };
      },
      Component: MappingEditorView,
    },
    {
      path: "/:deploymentId/mappings/new",
      loader: ({ params, request }: LoaderFunctionArgs) => {
        const dep = requireParam(params, "deploymentId");
        const url = new URL(request.url);
        return {
          deploymentId: dep,
          prefillCharacterName: url.searchParams.get("character") ?? "",
        };
      },
      Component: NewMappingView,
    },
    {
      path: "/:deploymentId/graph",
      loader: async ({ params }: LoaderFunctionArgs) => {
        const deploymentId = requireParam(params, "deploymentId");
        const workflow = await getDefaultWorkflow();
        return { deploymentId, workflow };
      },
      Component: GraphView,
    },
    {
      path: "/runtime/queue",
      Component: RuntimeQueueView,
    },
  ],
  { basename: "/extensions/nexus.audio.emotiontts" },
);

function requireParam(params: Record<string, string | undefined>, key: string): string {
  const value = params[key];
  if (!value) {
    throw new Response(`Missing path parameter: ${key}`, { status: 400 });
  }
  return value;
}
