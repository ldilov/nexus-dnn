import { useNavigate, useParams } from "react-router";
import { DeploymentsView } from "./deployments/deployments.view";
import { DeploymentDetailPlaceholder } from "./deployments/detail/detail.view";

export function DeploymentsIndexRoute() {
  return <DeploymentsView />;
}

export function DeploymentDetailRoute() {
  const { deploymentId = "" } = useParams();
  const navigate = useNavigate();
  return (
    <DeploymentDetailPlaceholder
      deploymentId={decodeURIComponent(deploymentId)}
      onBack={() => navigate("/deployments")}
    />
  );
}
