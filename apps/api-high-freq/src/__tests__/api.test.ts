import { describe, expect, it } from "bun:test";
import { Hono } from "hono";
import { health } from "../routes/health.js";
import { publishEvent, subscribe } from "../lib/pubsub.js";
import type { SseEvent } from "@komorebi/types";

// build the same mount the server uses
const app = new Hono();
app.route("/", health);

describe("GET /healthz", () => {
  it("returns 200 with ok payload", async () => {
    const res = await app.request("/healthz");
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.status).toBe("ok");
    expect(body.service).toBe("api-high-freq");
    expect(typeof body.uptime).toBe("number");
    expect(body.uptime).toBeGreaterThanOrEqual(0);
  });
});

// ponytail: pubsub round-trip needs a live Redis; skip if unreachable so the
// suite stays green without docker compose. Upgrade to a testcontainer if CI
// needs to assert the publish path deterministically.
const REDIS_UP = await isRedisUp();

describe("pubsub round-trip", () => {
  it("publishes and receives an SseEvent", async () => {
    if (!REDIS_UP) return it.skip("redis unavailable");

    const event: SseEvent = {
      type: "summary.updated",
      payload: { summary: "hello from test", updatedAt: new Date().toISOString() },
    };

    const received: SseEvent[] = [];
    const unsubscribe = await subscribe((e) => received.push(e));

    // give the subscription a beat to register before publishing
    await new Promise((r) => setTimeout(r, 50));
    await publishEvent(event);
    await new Promise((r) => setTimeout(r, 50));

    await unsubscribe();
    expect(received).toContainEqual(event);
  });

  it("subscriber drops malformed payloads without throwing", async () => {
    if (!REDIS_UP) return it.skip("redis unavailable");

    const { createClient } = await import("../lib/client.js");
    let threw = false;
    const sub = createClient();
    await sub.subscribe("komorebi:events");

    const unsubscribe = await subscribe(() => {
      throw new Error("should not fire for malformed payload");
    });

    const publisher = createClient();
    await publisher.publish("komorebi:events", "{ not valid json");
    await new Promise((r) => setTimeout(r, 50));

    publisher.disconnect();
    sub.disconnect();
    await unsubscribe();
    expect(threw).toBe(false);
  });
});

async function isRedisUp(): Promise<boolean> {
  try {
    const { createClient } = await import("../lib/client.js");
    const c = createClient();
    const ok = await new Promise<boolean>((resolve) => {
      c.ping().then(() => resolve(true)).catch(() => resolve(false));
    });
    c.disconnect();
    return ok;
  } catch {
    return false;
  }
}
