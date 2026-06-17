import { useLoaderData } from "react-router";
import type { Deployment } from "../../services/deployments_client";
import { EmptyState } from "../../components/empty_state";
import { Panel } from "../../components/panel";
import { sectionLabel } from "../../components/section_label.css";
import * as css from "./deployments_index.css";

interface LoaderData {
  deployments: Deployment[];
}

// Mirror of the host's `apps/web/src/types/host_navigate.ts` contract.
// The extension cannot import host source directly (separate bundle), so the
const NEXUS_HOST_NAVIGATE = "nexus-host-navigate";

interface DeploymentDetailNavigateDetail {
  readonly kind: "deployment-detail";
  readonly deploymentId: string;
}

// Hash-router target for ctrl-/middle-click "open in new tab" semantics.
// Plain-click navigation goes through the dispatched event, which decouples
function buildHostDeploymentHref(deploymentId: string): string {
  return `#/deployments/${encodeURIComponent(deploymentId)}`;
}

function navigateToHostDeployment(
  event: React.MouseEvent<HTMLAnchorElement>,
  deploymentId: string,
): void {
  if (
    event.defaultPrevented ||
    event.button !== 0 ||
    event.metaKey ||
    event.ctrlKey ||
    event.shiftKey ||
    event.altKey
  ) {
    // Let the browser follow the href natively (open-in-new-tab etc).
    return;
  }
  event.preventDefault();
  const detail: DeploymentDetailNavigateDetail = {
    kind: "deployment-detail",
    deploymentId,
  };
  // CustomEvent without `cancelable: true` cannot signal "no listener" via
  // the dispatchEvent return value — it always returns true. Plain dispatch
  window.dispatchEvent(
    new CustomEvent<DeploymentDetailNavigateDetail>(NEXUS_HOST_NAVIGATE, {
      detail,
    }),
  );
}

export function DeploymentsIndexView(): JSX.Element {
  const { deployments } = useLoaderData() as LoaderData;
  const word = deployments.length === 1 ? "deployment" : "deployments";

  return (
    <main className={css.shell}>
      <header className={css.hero}>
        <p className={css.eyebrow}>EmotionTTS · Dialogue synthesis</p>
        <h1 className={css.title}>
          Direct your characters.
          <br />
          Hear them perform.
        </h1>
        <p className={css.lede}>
          Paste a script, map each speaker to a voice, tune emotion per line. The DAG handles
          synthesis, caching, and export — you focus on the take.
        </p>
        <p className={css.heroMeta}>
          <span className={css.heroCount}>{deployments.length}</span>
          <span>{word} ready</span>
        </p>
      </header>

      <Panel
        density="airy"
        elevation="raised"
        className={css.listPanel}
        aria-labelledby="deployments-section-list"
      >
        <h2 id="deployments-section-list" className={sectionLabel}>
          01 / Deployments
        </h2>
        {deployments.length === 0 ? (
          <EmptyState
            title="No deployments yet."
            hint="Host shell → Extensions → EmotionTTS → New"
          />
        ) : (
          <ul className={css.list}>
            {deployments.map((d) => (
              <li key={d.deploymentId}>
                <a
                  href={buildHostDeploymentHref(d.deploymentId)}
                  onClick={(e) => navigateToHostDeployment(e, d.deploymentId)}
                  className={css.card}
                >
                  <span className={css.cardInitial} aria-hidden="true">
                    {initialOf(d.displayName)}
                  </span>
                  <span>
                    <span className={css.cardTitle}>{d.displayName}</span>
                    <span className={css.cardMeta}>{d.deploymentId}</span>
                  </span>
                  <span className={css.chevron} aria-hidden="true">
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </Panel>
    </main>
  );
}

function initialOf(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "·";
  return trimmed.slice(0, 1).toUpperCase();
}
