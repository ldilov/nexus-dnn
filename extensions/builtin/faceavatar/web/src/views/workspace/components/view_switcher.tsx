import type { ReactElement } from "react";
import { useNavigate, useParams } from "react-router";
import * as styles from "./view_switcher.css";

const VIEWS = [
  { segment: "generate", label: "Generate" },
  { segment: "head-refine", label: "Head refine" },
] as const;

type ViewSegment = (typeof VIEWS)[number]["segment"];

interface ViewSwitcherProps {
  active: ViewSegment;
}

/** In-app switch between the standalone generate and head-refine surfaces.
 * Navigates within the current deployment; the deploy-time recipe only sets
 * the initial view, the user can move freely after. */
export function ViewSwitcher({ active }: ViewSwitcherProps): ReactElement {
  const navigate = useNavigate();
  const params = useParams();
  const deployment = params.deploymentId ?? "default";
  return (
    <div className={styles.segment} role="tablist" aria-label="View">
      {VIEWS.map((view) => {
        const isActive = view.segment === active;
        return (
          <button
            key={view.segment}
            type="button"
            role="tab"
            aria-selected={isActive}
            className={isActive ? styles.tabActive : styles.tab}
            onClick={() => navigate(`/${deployment}/${view.segment}`)}
          >
            {view.label}
          </button>
        );
      })}
    </div>
  );
}
