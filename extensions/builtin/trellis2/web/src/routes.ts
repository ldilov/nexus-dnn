import { type LoaderFunctionArgs, redirect, type RouteObject } from "react-router";
import { DagView } from "./views/dag/dag.view";
import { GenerateView } from "./views/generate/generate.view";
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
        { path: "dag", Component: DagView },
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
