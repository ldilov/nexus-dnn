import { RecipeCatalog } from "../catalog/recipe_catalog";
import { useRootOutletContext } from "../root_layout";

export default function RecipesRoute() {
  const ctx = useRootOutletContext();
  return <RecipeCatalog onOpenRecipe={ctx.onOpenRecipe} />;
}
