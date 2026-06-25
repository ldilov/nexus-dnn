import { type LoaderFunctionArgs, redirect, type RouteObject } from "react-router";
import { GenerateView } from "./views/generate/generate.view";
import { PipelineView } from "./views/pipeline/pipeline.view";
import { WorkspaceLayout } from "./views/workspace/workspace.layout";

export function buildRoutes(): RouteObject[] {
  return [
    {
      path: "/",
      loader: () => redirect("/default/generate"),
    },
    {
      path: "/:deploymentId",
      Component: WorkspaceLayout,
      children: [
        {
          index: true,
          loader: ({ params }: LoaderFunctionArgs) =>
            redirect(`/${requireParam(params, "deploymentId")}/generate`),
        },
        { path: "generate", Component: GenerateView },
        { path: "pipeline", Component: PipelineView },
      ],
    },
  ];
}

function requireParam(params: Record<string, string | undefined>, key: string): string {
  const value = params[key];
  if (!value) {
    throw new Response(`Missing path parameter: ${key}`, { status: 400 });
  }
  return value;
}
