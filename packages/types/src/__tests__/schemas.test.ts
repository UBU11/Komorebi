import { describe, expect, it } from "bun:test";
import {
  KpiMetricSchema,
  KpiSnapshotSchema,
  SseEventSchema,
} from "../index.js";

const iso = "2026-06-27T00:00:00.000Z";

describe("KpiMetricSchema", () => {
  const valid = { name: "revenue", value: 42.5, unit: "USD", updatedAt: iso };

  it("accepts a complete metric", () => {
    expect(KpiMetricSchema.parse(valid)).toEqual(valid);
  });

  it("accepts without optional unit", () => {
    const { unit, ...rest } = valid;
    expect(KpiMetricSchema.parse(rest)).toEqual(rest);
  });

  it("rejects non-number value", () => {
    expect(() => KpiMetricSchema.parse({ ...valid, value: "42" })).toThrow();
  });

  it("rejects a non-ISO datetime", () => {
    expect(() => KpiMetricSchema.parse({ ...valid, updatedAt: "yesterday" })).toThrow();
  });
});

describe("KpiSnapshotSchema", () => {
  it("accepts a snapshot with metrics array", () => {
    const snap = { generatedAt: iso, metrics: [{ name: "m", value: 1, updatedAt: iso }] };
    expect(KpiSnapshotSchema.parse(snap)).toEqual(snap);
  });

  it("rejects non-array metrics", () => {
    expect(() => KpiSnapshotSchema.parse({ generatedAt: iso, metrics: {} })).toThrow();
  });
});

describe("SseEventSchema (discriminated union)", () => {
  it("parses each variant", () => {
    expect(SseEventSchema.parse({
      type: "kpi.snapshot",
      payload: { generatedAt: iso, metrics: [] },
    })).toBeTruthy();

    expect(SseEventSchema.parse({
      type: "anomaly.alert",
      payload: { metric: "cpu", severity: "high", message: "spike", detectedAt: iso },
    })).toBeTruthy();

    expect(SseEventSchema.parse({
      type: "summary.updated",
      payload: { summary: "ok", updatedAt: iso },
    })).toBeTruthy();
  });

  it("rejects unknown discriminator", () => {
    expect(() => SseEventSchema.parse({ type: "unknown.event", payload: {} })).toThrow();
  });

  it("rejects invalid severity enum", () => {
    expect(() => SseEventSchema.parse({
      type: "anomaly.alert",
      payload: { metric: "cpu", severity: "critical", message: "x", detectedAt: iso },
    })).toThrow();
  });

  it("rejects payload that does not match its variant", () => {
    expect(() => SseEventSchema.parse({ type: "summary.updated", payload: {} })).toThrow();
  });
});
