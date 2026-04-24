import { EXTENSION_PREFIX } from "./http";

export function downloadExportUrl(exportId: string): string {
  return `${EXTENSION_PREFIX}/exports/${exportId}/download`;
}

export async function downloadExportBlob(exportId: string, filename: string): Promise<void> {
  const resp = await fetch(downloadExportUrl(exportId));
  if (!resp.ok) throw new Error(`download failed: ${resp.status}`);
  const blob = await resp.blob();
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
