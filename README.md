# Komorebi — AI SaaS Dashboard with Real-Time Analytics

Dual-backend analytics dashboard. Hono/Bun serves high-frequency real-time
streams (SSE); FastAPI handles AI/ML (NLQ→SQL, anomaly detection, summaries);
Next.js renders a generative-UI dashboard.

See `AGENT.md` for architecture and `principle.md` for code standards.

## Layout

| Path | Stack | Responsibility |
|------|-------|----------------|
| `apps/web-frontend` | Next.js 16 · Tailwind v4 · Vercel AI SDK · Bun | Dashboard UI + generative charts |
| `apps/api-high-freq` | Hono · Bun · Drizzle | Real-time data, SSE, CRUD (110K req/s target) |
| `apps/api-ai-engine` | FastAPI · SQLAlchemy | NLQ→SQL, anomaly detection, summaries, reports |
| `packages/database` | Drizzle | Shared NeonDB schema |
| `packages/types` | Zod + TS | Shared SSE/chart envelopes across apps |

## Quick start

```bash
cp .env.example .env
docker compose up -d              # Postgres + Redis
pnpm install
pnpm dev                          # turbo runs all apps (Hono + Next.js under Bun)

# python engine (separate venv)
cd apps/api-ai-engine && uv sync && uv run uvicorn app.main:app --reload --port 8000
```

Ports: web `3000` · high-freq `8787` · ai-engine `8000` · pg `5432` · redis `6379`.
