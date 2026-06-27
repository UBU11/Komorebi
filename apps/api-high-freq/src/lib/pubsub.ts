import { createClient } from "./client.js";
import type { SseEvent } from "@komorebi/types";

const CHANNEL = "komorebi:events";

// ponytail: per-call client; switch to a shared pooled publisher when publish volume matters.
export async function publishEvent(event: SseEvent): Promise<void> {
  const client = createClient();
  try {
    await client.publish(CHANNEL, JSON.stringify(event));
  } finally {
    client.disconnect();
  }
}

export async function subscribe(
  onEvent: (event: SseEvent) => void,
): Promise<() => Promise<void>> {
  const sub = createClient();
  await sub.subscribe(CHANNEL);
  sub.on("message", (_channel, raw) => {
    try {
      onEvent(JSON.parse(raw) as SseEvent);
    } catch {
      // ponytail: drop malformed payloads; add DLQ if observability required
    }
  });
  return async () => {
    await sub.unsubscribe(CHANNEL);
    sub.disconnect();
  };
}
