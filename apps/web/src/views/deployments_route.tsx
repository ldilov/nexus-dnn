import { useNavigate, useParams } from "react-router";
import { DeploymentsView } from "./deployments_view";
import { DeploymentDetailPlaceholder } from "./deployment_detail_placeholder";

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
