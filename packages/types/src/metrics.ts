import { z } from "zod";

export const KpiMetricSchema = z.object({
  name: z.string(),
  value: z.number(),
  unit: z.string().optional(),
  updatedAt: z.string().datetime(),
});
export type KpiMetric = z.infer<typeof KpiMetricSchema>;

export const KpiSnapshotSchema = z.object({
  generatedAt: z.string().datetime(),
  metrics: z.array(KpiMetricSchema),
});
export type KpiSnapshot = z.infer<typeof KpiSnapshotSchema>;

export type TrendPoint = { timestamp: string; value: number };
