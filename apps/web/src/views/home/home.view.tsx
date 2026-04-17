import { useEffect, useState } from "react";
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

export function Home(props: HomeProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [workflows, setWorkflows] = useState<Workflow[]>([]);
  const [extensions, setExtensions] = useState<Extension[]>([]);

  useEffect(() => {
    fetchRecipes().then(setRecipes).catch(() => setRecipes([]));
    fetchWorkflows().then(setWorkflows).catch(() => setWorkflows([]));
    fetchExtensions().then(setExtensions).catch(() => setExtensions([]));
  }, []);

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
