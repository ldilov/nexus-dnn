import { type LoaderFunctionArgs, redirect, type RouteObject } from "react-router";
import { GenerateView } from "./views/generate/generate.view";
import { HeadRefineView } from "./views/head-refine/head_refine.view";
import { WorkspaceLayout } from "./views/workspace/workspace.layout";

/** Map a deploy-time recipe id to its default in-app view path segment. */
export function defaultViewForRecipe(recipe: string | null): "generate" | "head-refine" {
  return recipe === "faceavatar_head_refine" ? "head-refine" : "generate";
}

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
        { path: "head-refine", Component: HeadRefineView },
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
