import type { Extension, Recipe, Workflow } from "../../api/client";
import { RecipeCatalog } from "../../catalog/recipe_catalog";
import * as styles from "./home.css";

export interface HomeUIProps {
  recipes: Recipe[];
  workflows: Workflow[];
  extensions: Extension[];
  activeExtensions: number;
  onOpenRecipe?: (recipe: Recipe) => void;
  onGoToRecipes?: () => void;
  onGoToWorkflows?: () => void;
  onGoToExtensions?: () => void;
}

export function HomeUI({
  recipes,
  workflows,
  extensions,
  activeExtensions,
  onOpenRecipe,
  onGoToRecipes,
  onGoToWorkflows,
  onGoToExtensions,
}: HomeUIProps) {
  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <span className={styles.heroEyebrow}>
          <span className={`material-symbols-outlined ${styles.heroEyebrowIcon}`}>
            hub
          </span>
          Nexus DNN · Local-First AI Runtime
        </span>
        <h1 className={styles.heroTitle}>Welcome back</h1>
        <p className={styles.heroSubtitle}>
          Launch a recipe to start working, inspect a workflow graph, or manage the
          extensions that power your local AI stack.
        </p>
      </section>

      <div className={styles.statGrid}>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Recipes</span>
          <span className={styles.statValue}>{recipes.length}</span>
          <span className={styles.statDelta}>available to run</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Workflows</span>
          <span className={styles.statValue}>{workflows.length}</span>
          <span className={styles.statDelta}>compiled graphs</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Extensions</span>
          <span className={styles.statValue}>{extensions.length}</span>
          <span className={styles.statDelta}>{activeExtensions} active</span>
        </div>
        <div className={styles.stat}>
          <span className={styles.statLabel}>Runs</span>
          <span className={styles.statValue}>0</span>
          <span className={styles.statDelta}>last 24h</span>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured recipes</h2>
          {onGoToRecipes && (
            <button type="button" className={styles.sectionLink} onClick={onGoToRecipes}>
              View all →
            </button>
          )}
        </div>
        <RecipeCatalog onOpenRecipe={onOpenRecipe} />
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Get moving</h2>
        </div>
        <div className={styles.statGrid}>
          <button
            type="button"
            className={`${styles.stat} ${styles.ctaStat}`}
            onClick={onGoToWorkflows}
          >
            <span className={styles.statLabel}>Inspect</span>
            <span className={styles.statValue}>Workflows</span>
            <span className={styles.statDelta}>See node graphs</span>
          </button>
          <button
            type="button"
            className={`${styles.stat} ${styles.ctaStat}`}
            onClick={onGoToExtensions}
          >
            <span className={styles.statLabel}>Manage</span>
            <span className={styles.statValue}>Extensions</span>
            <span className={styles.statDelta}>Enable and install</span>
          </button>
        </div>
      </section>
    </div>
  );
}
