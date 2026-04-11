import { useEffect, useState } from "react";
import { fetchRecipes, type Recipe } from "../api/client";
import * as styles from "./catalog.css";

export function RecipeCatalog() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchRecipes()
      .then(setRecipes)
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Failed to load recipes"),
      );
  }, []);

  if (error) return <p className={styles.errorState}>{error}</p>;

  if (recipes.length === 0) {
    return <p className={styles.emptyState}>No recipes available</p>;
  }

  return (
    <div>
      {recipes.map((recipe) => (
        <div key={recipe.id} className={styles.itemCard}>
          <div className={styles.itemName}>{recipe.name}</div>
          <div className={styles.itemMeta}>{recipe.description}</div>
        </div>
      ))}
    </div>
  );
}
