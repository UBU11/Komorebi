import { Hono } from "hono";
import { cors } from "hono/cors";
import { env } from "./env.js";
import { health } from "./routes/health.js";
import { stream } from "./routes/stream.js";

const app = new Hono();

app.use("*", cors({ origin: process.env.CORS_ORIGIN ?? "*" }));

app.route("/", health);
app.route("/", stream);

export default {
  port: env.PORT,
  fetch: app.fetch,
};
