import { apiFetch } from "./http";

export type RecipeField =
  | "script_text"
  | "output_format"
  | "speed_factor"
  | "speed_mode"
  | "global_emotion_mode"
  | "global_emotion_vector"
  | "global_emotion_qwen_template"
  | "global_emotion_alpha"
  | "seed_strategy"
  | "base_seed"
  | "cache_policy"
  | "create_zip_bundle"
  | "include_preview_mix"
  | "include_manifest_json"
  | "include_csv_index";

export interface WorkflowNode {
  id: string;
  operatorId: string;
  config: Record<string, unknown>;
}

export interface WorkflowEdge {
  from: string;
  to: string;
}

export interface WorkflowDocument {
  templateId: string;
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  inputs: Record<string, unknown>;
  customised: boolean;
}

export interface DefaultWorkflowResponse {
  templateId: string;
  workflow: WorkflowDocument;
  mappableFields: RecipeField[];
  unmappableFields: RecipeField[];
}

export async function getDefaultWorkflow(): Promise<DefaultWorkflowResponse> {
  return apiFetch("/workflow/default");
}
