import { Link, useLoaderData } from "react-router";
import type { Deployment } from "../../services/deployments_client";
import * as css from "./deployments_index.css";

interface LoaderData {
  deployments: Deployment[];
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

      <section className={css.panel}>
        <h2 className={css.sectionLabel}>01 / Deployments</h2>
        {deployments.length === 0 ? (
          <div className={css.empty}>
            <span className={css.emptyGlyph} aria-hidden="true">
              0
            </span>
            <p className={css.emptyTitle}>No deployments yet.</p>
            <p className={css.emptyHint}>Host shell → Extensions → EmotionTTS → New</p>
          </div>
        ) : (
          <ul className={css.list}>
            {deployments.map((d) => (
              <li key={d.deploymentId}>
                <Link to={`/${d.deploymentId}/recipe`} className={css.card}>
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
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

function initialOf(name: string): string {
  const trimmed = name.trim();
  if (!trimmed) return "·";
  return trimmed.slice(0, 1).toUpperCase();
}
