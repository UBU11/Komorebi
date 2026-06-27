import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { env } from "./env.js";
import * as schema from "./schema.js";

export type Database = NeonHttpDatabase<typeof schema>;

export function createDatabase(url: string = env.DATABASE_URL): Database {
  const sql = neon(url);
  return drizzle(sql, { schema });
}
