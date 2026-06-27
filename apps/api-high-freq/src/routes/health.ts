import { Hono } from "hono";

export const health = new Hono();

health.get("/healthz", (c) =>
  c.json({ status: "ok", service: "api-high-freq", uptime: process.uptime() }),
);
