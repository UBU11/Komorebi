import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { subscribe } from "../lib/pubsub.js";

export const stream = new Hono();

stream.get("/stream", (c) =>
  streamSSE(c, async (sse) => {
    const unsubscribe = await subscribe((event) => {
      void sse.writeSSE({ event: event.type, data: JSON.stringify(event.payload) });
    });

    c.req.raw.signal?.addEventListener("abort", () => {
      void unsubscribe();
    });
  }),
);
