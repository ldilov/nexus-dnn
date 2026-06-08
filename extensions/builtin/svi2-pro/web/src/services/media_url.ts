import { EXTENSION_PREFIX } from "./http";

export function mediaUrlForOutput(outputPath: string | null): string | null {
  if (!outputPath) return null;
  return `${EXTENSION_PREFIX}/media?path=${encodeURIComponent(outputPath)}`;
}
