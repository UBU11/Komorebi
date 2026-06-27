export const env = {
  DATABASE_URL: requireEnv("DATABASE_URL"),
} as const;

function requireEnv(key: string): string {
  const value = process.env[key];
  if (!value) throw new Error(`Missing required env var: ${key}`);
  return value;
}
