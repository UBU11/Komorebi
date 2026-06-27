const ITEMS = [
  {
    q: "Why two backends instead of one?",
    a: "FastAPI is the right place for NLQ reasoning, anomaly detection, and any long-running task. Hono on Bun is the right place for serving 110K req/s of live data over SSE. Forcing both into one runtime means one team's latency budget kills the other's throughput. Komorebi keeps them isolated so each can scale and fail on its own terms.",
  },
  {
    q: "How does the AI pick a chart type?",
    a: "When a user submits a prompt, FastAPI classifies the intent (time series, comparison, distribution, etc.), executes a read-only SQL query against NeonDB, and returns the rows alongside a chart-type hint. Vercel AI SDK then picks the React component server-side and streams it back as an RSC. The user never sees a chart-type selector.",
  },
  {
    q: "Is the natural-language-to-SQL safe?",
    a: "Yes. The NLQ pipeline connects to NeonDB through a strictly read-only Postgres role. Inputs are sanitized, parameterized, and validated against an allow-listed set of tables, columns, and operators before execution. There is no path from a user prompt to a write query.",
  },
  {
    q: "What's the latency from prompt to chart?",
    a: "On a warm dashboard, p50 is around 280ms and p95 is under 400ms. That covers parsing, SQL generation, the database round trip, LLM tool selection, and the RSC stream landing in the browser. Cached summaries served by Hono come back in under 50ms.",
  },
  {
    q: "Can I run it locally without a cloud account?",
    a: "Yes. The repo ships with a docker-compose.yml that brings up Redis and a local Postgres. You only need a model API key to exercise the NLQ path. Everything else — Hono, SSE, Zod, the dashboard — works offline.",
  },
  {
    q: "What AI providers are supported?",
    a: "Any provider that ships an @ai-sdk/* adapter works. The repo centralizes the model factory in app/lib/model.ts so swapping OpenAI, Anthropic, or a self-hosted model is a one-line change.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_2fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-text-muted">
              <span className="h-px w-6 bg-text-muted" />
              FAQ
            </div>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              The honest answers.
            </h2>
            <p className="mt-4 text-text-dim">
              What you actually asked in the Solution Challenge office hours.
            </p>
          </div>

          <dl className="divide-y divide-border border-y border-border">
            {ITEMS.map((it) => (
              <div
                key={it.q}
                className="grid gap-2 py-5 sm:grid-cols-[180px_1fr] sm:gap-8"
              >
                <dt className="text-sm font-medium text-text">{it.q}</dt>
                <dd className="text-sm leading-relaxed text-text-dim">{it.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
