import type { Recipe } from "../../api/client";
import { RecipeCatalog } from "../../catalog/recipe_catalog";

export interface RecipesUIProps {
  onOpenRecipe?: (recipe: Recipe) => void;
}

export function RecipesUI({ onOpenRecipe }: RecipesUIProps) {
  return <RecipeCatalog onOpenRecipe={onOpenRecipe} />;
}
