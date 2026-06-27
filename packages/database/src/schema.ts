import { boolean, pgTable, text, timestamp, numeric } from "drizzle-orm/pg-core";

export const kpis = pgTable("kpis", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  value: numeric("value", { precision: 20, scale: 4 }).notNull(),
  unit: text("unit"),
  recordedAt: timestamp("recorded_at", { withTimezone: true }).notNull(),
});

export const insights = pgTable("insights", {
  id: text("id").primaryKey(),
  summary: text("summary").notNull(),
  periodStart: timestamp("period_start", { withTimezone: true }).notNull(),
  periodEnd: timestamp("period_end", { withTimezone: true }).notNull(),
  isAnomaly: boolean("is_anomaly").notNull().default(false),
  generatedAt: timestamp("generated_at", { withTimezone: true }).notNull(),
});
