import Redis from "ioredis";
import { env } from "../env.js";

export function createClient(): Redis {
  // ponytail: no-op error listener keeps ioredis reconnect retries from crashing
  // the process when Redis is down; replace with real logging/alerting in prod.
  const client = new Redis(env.REDIS_URL, {
    maxRetriesPerRequest: 3,
    enableOfflineQueue: true,
  });
  client.on("error", () => {});
  return client;
}
