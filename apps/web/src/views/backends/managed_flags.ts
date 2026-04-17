export const MANAGED_FLAGS: readonly string[] = [
  "--host",
  "--port",
  "--threads",
  "--threads-batch",
  "--ctx-size",
  "--parallel",
  "--n-gpu-layers",
  "-m",
  "--model",
  "--lora",
  "--draft-model",
  "--embedding",
  "--rerank",
  "--grammar",
  "--grammar-file",
  "--chat-template",
  "--chat-template-file",
];

export function isManagedFlag(token: string): boolean {
  const head = token.split("=")[0] ?? token;
  return MANAGED_FLAGS.includes(head);
}
