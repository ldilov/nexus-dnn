import type { Recipe } from "../../api/client";
import { RecipesUI } from "./recipes.ui";

export interface RecipesProps {
  onOpenRecipe?: (recipe: Recipe) => void;
}

export function Recipes(props: RecipesProps) {
  return <RecipesUI onOpenRecipe={props.onOpenRecipe} />;
}
