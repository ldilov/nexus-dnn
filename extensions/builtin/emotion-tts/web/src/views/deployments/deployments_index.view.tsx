import { Link, useLoaderData } from "react-router";
import type { Deployment } from "../../services/deployments_client";

interface LoaderData {
  deployments: Deployment[];
}

export function DeploymentsIndexView(): JSX.Element {
  const { deployments } = useLoaderData() as LoaderData;

  if (deployments.length === 0) {
    return (
      <main>
        <h1>EmotionTTS</h1>
        <p>No deployments yet. Create one from the host shell to begin.</p>
      </main>
    );
  }

  return (
    <main>
      <h1>Deployments</h1>
      <ul>
        {deployments.map((d) => (
          <li key={d.deploymentId}>
            <Link to={`/${d.deploymentId}/recipe`}>{d.displayName}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
