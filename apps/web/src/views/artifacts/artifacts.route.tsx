import { PageHero } from "../../components/base/page_hero";
import { EmptyState } from "../../components/layout/empty_state";
import * as styles from "./artifacts.css";

export function ArtifactsPlaceholderRoute() {
  return (
    <div className={styles.container}>
      <PageHero
        eyebrow="Operator surface · Artifact browser"
        title="Artifacts"
        meta={<span>Outputs emitted by deployment runs — images, audio, text, JSON blobs — filtered to what's reachable now.</span>}
      />
      <EmptyState
        count="0"
        line="No artifacts produced yet. Successful runs will surface their outputs here."
      />
    </div>
  );
}
