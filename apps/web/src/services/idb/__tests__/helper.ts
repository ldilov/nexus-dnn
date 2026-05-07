import "fake-indexeddb/auto";
import { closeNexusDb, NEXUS_IDB_NAME } from "../db";

export async function resetIdb(): Promise<void> {
  await closeNexusDb();
  await new Promise<void>((resolve, reject) => {
    const req = indexedDB.deleteDatabase(NEXUS_IDB_NAME);
    req.onsuccess = () => resolve();
    req.onerror = () => reject(req.error ?? new Error("deleteDatabase failed"));
    req.onblocked = () => resolve();
  });
}
