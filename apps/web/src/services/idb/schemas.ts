import { z } from "zod";

export const chatThreadCacheRowSchema = z.object({
  deploymentId: z.string().min(1),
  threadId: z.string().min(1),
  title: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  lastMessagePreview: z.string().optional(),
  cachedAt: z.number().int().nonnegative(),
});
export type ChatThreadCacheRow = z.infer<typeof chatThreadCacheRowSchema>;

export const chatMessageCacheRowSchema = z.object({
  deploymentId: z.string().min(1),
  threadId: z.string().min(1),
  messageId: z.string().min(1),
  role: z.enum(["user", "assistant", "system"]),
  content: z.string(),
  createdAt: z.string(),
  status: z.enum(["pending", "complete", "error"]).optional(),
  cachedAt: z.number().int().nonnegative(),
});
export type ChatMessageCacheRow = z.infer<typeof chatMessageCacheRowSchema>;

export const composerDraftRowSchema = z.object({
  deploymentId: z.string().min(1),
  threadId: z.string().min(1),
  text: z.string(),
  updatedAt: z.number().int().nonnegative(),
});
export type ComposerDraftRow = z.infer<typeof composerDraftRowSchema>;

export const streamDeltaStatusSchema = z.enum([
  "in_progress",
  "completed",
  "abandoned",
]);
export type StreamDeltaStatus = z.infer<typeof streamDeltaStatusSchema>;

export const streamDeltaRowSchema = z.object({
  deploymentId: z.string().min(1),
  threadId: z.string().min(1),
  requestId: z.string().min(1),
  sequenceNumber: z.number().int().nonnegative(),
  chunk: z.string(),
  timestamp: z.number().int().nonnegative(),
  status: streamDeltaStatusSchema,
});
export type StreamDeltaRow = z.infer<typeof streamDeltaRowSchema>;

export const runtimeLeaderRowSchema = z.object({
  deploymentId: z.string().min(1),
  modelKey: z.string().min(1),
  leaderTabId: z.string().min(1),
  port: z.number().int().positive(),
  pid: z.number().int().positive().nullable(),
  claimedAt: z.number().int().nonnegative(),
  heartbeatAt: z.number().int().nonnegative(),
});
export type RuntimeLeaderRow = z.infer<typeof runtimeLeaderRowSchema>;
