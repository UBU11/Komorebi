export const env = {
  PORT: Number(process.env.PORT_HIGH_FREQ ?? 8787),
  REDIS_URL: process.env.REDIS_URL ?? "redis://localhost:6379",
} as const;
