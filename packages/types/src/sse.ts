import { z } from "zod";
import { KpiSnapshotSchema } from "./metrics.js";

export type SseEventType = "kpi.snapshot" | "anomaly.alert" | "summary.updated";

export const SseEventSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("kpi.snapshot"), payload: KpiSnapshotSchema }),
  z.object({
    type: z.literal("anomaly.alert"),
    payload: z.object({
      metric: z.string(),
      severity: z.enum(["low", "medium", "high"]),
      message: z.string(),
      detectedAt: z.string().datetime(),
    }),
  }),
  z.object({
    type: z.literal("summary.updated"),
    payload: z.object({ summary: z.string(), updatedAt: z.string().datetime() }),
  }),
]);

export type SseEvent = z.infer<typeof SseEventSchema>;
