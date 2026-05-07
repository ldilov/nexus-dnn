import { openDB, type DBSchema, type IDBPDatabase } from "idb";
import type {
  ChatMessageCacheRow,
  ChatThreadCacheRow,
  ComposerDraftRow,
  RuntimeLeaderRow,
  StreamDeltaRow,
} from "./schemas";

export interface NexusIdbSchema extends DBSchema {
  "nexus-chat-threads": {
    key: [string, string];
    value: ChatThreadCacheRow;
  };
  "nexus-chat-messages": {
    key: [string, string, string];
    value: ChatMessageCacheRow;
    indexes: {
      by_thread_created: [string, string, string];
    };
  };
  "nexus-composer-drafts": {
    key: [string, string];
    value: ComposerDraftRow;
  };
  "nexus-stream-deltas": {
    key: [string, string, string, number];
    value: StreamDeltaRow;
    indexes: {
      by_request: [string, string, string];
    };
  };
  "nexus-runtime-leaders": {
    key: [string, string];
    value: RuntimeLeaderRow;
  };
}

export const NEXUS_IDB_NAME = "nexus-dnn";
export const NEXUS_IDB_VERSION = 1;

let dbHandle: Promise<IDBPDatabase<NexusIdbSchema>> | null = null;

export function openNexusDb(): Promise<IDBPDatabase<NexusIdbSchema>> {
  if (dbHandle) return dbHandle;
  dbHandle = openDB<NexusIdbSchema>(NEXUS_IDB_NAME, NEXUS_IDB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains("nexus-chat-threads")) {
        db.createObjectStore("nexus-chat-threads", {
          keyPath: ["deploymentId", "threadId"],
        });
      }
      if (!db.objectStoreNames.contains("nexus-chat-messages")) {
        const store = db.createObjectStore("nexus-chat-messages", {
          keyPath: ["deploymentId", "threadId", "messageId"],
        });
        store.createIndex("by_thread_created", [
          "deploymentId",
          "threadId",
          "createdAt",
        ]);
      }
      if (!db.objectStoreNames.contains("nexus-composer-drafts")) {
        db.createObjectStore("nexus-composer-drafts", {
          keyPath: ["deploymentId", "threadId"],
        });
      }
      if (!db.objectStoreNames.contains("nexus-stream-deltas")) {
        const store = db.createObjectStore("nexus-stream-deltas", {
          keyPath: [
            "deploymentId",
            "threadId",
            "requestId",
            "sequenceNumber",
          ],
        });
        store.createIndex("by_request", [
          "deploymentId",
          "threadId",
          "requestId",
        ]);
      }
      if (!db.objectStoreNames.contains("nexus-runtime-leaders")) {
        db.createObjectStore("nexus-runtime-leaders", {
          keyPath: ["deploymentId", "modelKey"],
        });
      }
    },
    blocking() {
      void closeNexusDb();
    },
  });
  return dbHandle;
}

export async function closeNexusDb(): Promise<void> {
  if (!dbHandle) return;
  const db = await dbHandle;
  db.close();
  dbHandle = null;
}

export async function isNexusIdbAvailable(): Promise<boolean> {
  if (typeof indexedDB === "undefined") return false;
  try {
    const db = await openNexusDb();
    return db.name === NEXUS_IDB_NAME;
  } catch {
    return false;
  }
}
