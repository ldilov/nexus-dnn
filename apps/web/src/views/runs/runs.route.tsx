import { PageHero } from "../../components/base/page_hero";
import { EmptyState } from "../../components/layout/empty_state";
import * as styles from "./runs.css";

export function RunsPlaceholderRoute() {
  return (
    <div className={styles.container}>
      <PageHero
        eyebrow="Operator surface · Run history"
        title="Runs"
        meta={<span>Per-run timelines, traces, and per-node heat across every deployment. Run history surfaces here once it lands.</span>}
      />
      <EmptyState
        count="0"
        line="No runs recorded yet. Trigger a deployment from a recipe to populate this view."
      />
    </div>
  );
}
