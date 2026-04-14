import { useEffect, useState } from "react";
import {
  fetchExtensions,
  fetchRecipes,
  fetchWorkflows,
  type Extension,
  type Recipe,
  type Workflow,
} from "../api/client";
import { RecipeCatalog } from "./recipe_catalog";
import * as styles from "./home_dashboard.css";

export type HomeDashboardProps = {
  onOpenRecipe?: (recipe: Recipe) => void;
  onGoToRecipes?: () => void;
  onGoToWorkflows?: () => void;
  onGoToExtensions?: () => void;
};

export function HomeDashboard({
  onOpenRecipe,
  onGoToRecipes,
  onGoToWorkflows,
  onGoToExtensions,
}: HomeDashboardProps) {
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
    <div className={styles.container}>
      <section className={styles.hero}>
        <span className={styles.heroEyebrow}>
          <span className="material-symbols-outlined" style={{ fontSize: "14px" }}>
            hub
          </span>
          Nexus DNN · Local-First AI Runtime
        </span>
        <h1 className={styles.heroTitle}>Welcome back</h1>
        <p className={styles.heroSubtitle}>
          Launch a recipe to start working, inspect a workflow graph, or manage the extensions that
          power your local AI stack.
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
            className={styles.stat}
            onClick={onGoToWorkflows}
            style={{ cursor: "pointer", textAlign: "left" }}
          >
            <span className={styles.statLabel}>Inspect</span>
            <span className={styles.statValue}>Workflows</span>
            <span className={styles.statDelta}>See node graphs</span>
          </button>
          <button
            type="button"
            className={styles.stat}
            onClick={onGoToExtensions}
            style={{ cursor: "pointer", textAlign: "left" }}
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
