import { redirect, type LoaderFunctionArgs, type RouteObject } from "react-router";
import { DEFAULT_SETTINGS } from "./domain/settings_defaults";
import { listPresets } from "./services/presets_client";
import { getSettings } from "./services/settings_client";
import type { ExtensionSettings, PresetCatalog } from "./services/types";
import { DagView } from "./views/dag/dag.view";
import { RecipeView } from "./views/recipe/recipe.view";
import { SettingsView } from "./views/settings/settings.view";
import {
  WorkspaceLayout,
  type WorkspaceLoaderData,
} from "./views/workspace/workspace.layout";

async function loadWorkspace(): Promise<WorkspaceLoaderData> {
  const [catalog, settings] = await Promise.all([
    listPresets().catch((): PresetCatalog | null => null),
    getSettings().catch((): ExtensionSettings => DEFAULT_SETTINGS),
  ]);
  return { catalog, settings };
}

export function buildRoutes(): RouteObject[] {
  return [
    {
      path: "/",
      loader: () => redirect("/default/recipe"),
    },
    {
      path: "/:deploymentId",
      loader: loadWorkspace,
      Component: WorkspaceLayout,
      children: [
        {
          index: true,
          loader: ({ params }: LoaderFunctionArgs) =>
            redirect(`/${requireParam(params, "deploymentId")}/recipe`),
        },
        { path: "recipe", Component: RecipeView },
        { path: "dag", Component: DagView },
        { path: "settings", Component: SettingsView },
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
