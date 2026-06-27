export const env = {
  API_HIGH_FREQ_URL:
    process.env.NEXT_PUBLIC_API_HIGH_FREQ_URL ?? "http://localhost:8787",
  API_AI_ENGINE_URL:
    process.env.NEXT_PUBLIC_API_AI_ENGINE_URL ?? "http://localhost:8000",
} as const;
