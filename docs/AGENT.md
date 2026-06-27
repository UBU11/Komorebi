
# AI Agent Architecture Guide: AI SaaS Dashboard with Real-Time Analytics

## 1. Project Context & Objectives
**Project:** AI SaaS Dashboard with Real-Time Analytics
**Phase:** Functional Prototype (Solution Challenge 2026 context)
**Primary Goal:** Deliver a high-performance, real-time analytics dashboard utilizing a dual-backend architecture to separate high-frequency API requests from heavy AI/ML processing. Generative UI will be used to dynamically render components based on user queries.

## 2. Tech Stack & Boundaries

**Frontend:**
* **Framework:** Next.js 16 (App Router strictly enforced)
* **UI/Styling:** shadcn/ui, Tailwind CSS
* **Charts:** Tremor + Recharts
* **State Management:** Zustand (Client state) + TanStack Query v6 (Server state/caching)
* **AI Integration:** Vercel AI SDK (specifically Generative UI features: `useChat`, `useUIState`, `useActions`)

**Backend 1: AI & ML Engine (Python)**
* **Framework:** FastAPI
* **ORM:** SQLAlchemy (connecting to NeonDB)
* **Responsibility:** Natural Language to SQL (NLQ), Anomaly Detection, Chart Explanations, AI-generated insights/summaries, PDF/Report generation.

**Backend 2: High-Frequency API (TypeScript)**
* **Framework:** Hono.js (running on Bun)
* **Responsibility:** Serving real-time data, handling 110K req/s throughput, managing Server-Sent Events (SSE), standard CRUD operations.

**Data Layer:**
* **Primary Database:** NeonDB (Serverless Postgres) - Used for all persistent, transactional, and analytical data.
* **ORM (Node/TS):** Drizzle ORM (via Hono/Next.js)
* **Cache & Pub/Sub:** Redis - Used for session caching, rate limiting, and real-time Pub/Sub for SSE.

## 3. Core Workflows (Agent Implementation Rules)

### 3.1. Natural Language Query (NLQ) to Chart
* **Flow:** User submits query (Client) -> Next.js Server Action -> Vercel AI SDK -> FastAPI route.
* **Processing:** FastAPI securely translates the prompt to a read-only SQL query, executes it against NeonDB, and formats the JSON payload.
* **Rendering:** Vercel AI SDK dynamically streams the corresponding React component (Tremor/Rechart) back to the UI. Do not hardcode chart types; let the LLM define the `tool` and UI component.

### 3.2. Real-Time KPIs & SSE
* **Flow:** External data source -> Redis Pub/Sub -> Hono.js -> Server-Sent Events (SSE) -> Next.js Client.
* **Rule:** FastAPI **must not** handle high-frequency polling. All real-time metric streams must route through Hono + Bun using Redis Pub/Sub. Use Zustand to subscribe to the SSE stream on the client.

### 3.3. AI-Generated Summaries & Anomaly Detection
* **Flow (Background):** FastAPI runs scheduled tasks (e.g., Celery/BackgroundTasks) to analyze week-over-week data.
* **Storage:** Write the generated insights (e.g., "Revenue up 12%") into NeonDB and cache the latest summary in Redis.
* **Delivery:** Hono serves the cached summary to the Next.js frontend on load to ensure `< 50ms` response times.
* **Alerts:** If FastAPI detects an anomaly (e.g., "40% spike in APAC"), it pushes an event to Redis Pub/Sub. Hono broadcasts this to the active Next.js clients via SSE.

### 3.4. Chart Explanations (On-Click)
* **Flow:** User clicks chart data point -> Next.js extracts context (Chart Type, Data Range, Selected Value) -> Sends to FastAPI endpoint.
* **Rule:** Pass raw data arrays and schema context to the LLM prompt in FastAPI to generate the "Why did revenue drop?" explanation. Stream the text response back using Vercel AI SDK.

## 4. Proposed Repository Structure
Ensure absolute separation of concerns between the two backends and the frontend.

```text
/
├── /apps
│   ├── /web-frontend        # Next.js 16, shadcn, Vercel AI SDK
│   ├── /api-high-freq       # Hono.js + Bun + Drizzle
│   └── /api-ai-engine       # FastAPI + Python + SQLAlchemy
├── /packages
│   ├── /database            # Shared NeonDB schemas (Drizzle schema)
│   ├── /types               # Shared TypeScript interfaces
│   └── /ui                  # Shared UI components (optional if using shadcn directly in web)
├── docker-compose.yml       # Local Redis and Dev DB orchestration
└── turbo.json               # Monorepo configuration

```

## 5. Coding Standards & Directives for AI Agent

1. **Strict Typing:** Ensure End-to-End type safety. Hono API responses must use Zod for schema validation. Next.js must infer types from Zod schemas.
2. **Generative UI Principles:** When writing Vercel AI SDK code, rely on server-side component generation. Return React Server Components (RSCs) from the AI actions rather than just JSON, where applicable.
3. **Database Connection Management:**
* FastAPI: Use connection pooling (PgBouncer or SQLAlchemy async pools) suited for NeonDB.
* Hono/Next.js: Use Neon's serverless driver over WebSockets for low-latency connections.


4. **Security & Rate Limiting:** Apply Redis-based rate limiting on the Hono gateway. Ensure the FastAPI NLQ-to-SQL logic uses strict read-only roles and sanitizes inputs to prevent SQL injection.
5. **No Hallucinated Libraries:** Only use the libraries explicitly declared in the Tech Stack section.


```
