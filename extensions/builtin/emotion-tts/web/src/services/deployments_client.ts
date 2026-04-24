import { apiFetch } from "./http";

export interface Deployment {
  deploymentId: string;
  displayName: string;
  backendRuntimePreference?: string | null;
  defaultOutputFormat: string;
  defaultSpeedFactor: number;
  createdAt: number;
  updatedAt: number;
}

export async function listDeployments(): Promise<{ deployments: Deployment[] }> {
  return apiFetch("/deployments");
}

export async function getDeployment(id: string): Promise<Deployment> {
  return apiFetch(`/deployments/${id}`);
}
