import useSWR from "swr";
import type { Extension, Recipe, Workflow } from "../../api/client";
import { fetchExtensions } from "../../services/extensions";
import { fetchRecipes } from "../../api/client";
import { fetchWorkflows } from "../../services/workflows";
import { HomeUI } from "./home.ui";

export interface HomeProps {
  onOpenRecipe?: (recipe: Recipe) => void;
  onGoToRecipes?: () => void;
  onGoToWorkflows?: () => void;
  onGoToExtensions?: () => void;
}

const EMPTY_RECIPES: Recipe[] = [];
const EMPTY_WORKFLOWS: Workflow[] = [];
const EMPTY_EXTENSIONS: Extension[] = [];

export function Home(props: HomeProps) {
  const { data: recipes = EMPTY_RECIPES } = useSWR<Recipe[]>(
    "home:recipes",
    () => fetchRecipes(),
  );
  const { data: workflows = EMPTY_WORKFLOWS } = useSWR<Workflow[]>(
    "home:workflows",
    () => fetchWorkflows(),
  );
  const { data: extensions = EMPTY_EXTENSIONS } = useSWR<Extension[]>(
    "home:extensions",
    () => fetchExtensions(),
  );

  const activeExtensions = extensions.filter((e) => {
    const s = e.status.toLowerCase();
    return s === "active" || s === "enabled";
  }).length;

  return (
    <HomeUI
      recipes={recipes}
      workflows={workflows}
      extensions={extensions}
      activeExtensions={activeExtensions}
      onOpenRecipe={props.onOpenRecipe}
      onGoToRecipes={props.onGoToRecipes}
      onGoToWorkflows={props.onGoToWorkflows}
      onGoToExtensions={props.onGoToExtensions}
    />
  );
}
