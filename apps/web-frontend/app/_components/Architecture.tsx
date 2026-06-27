import type { ReactNode } from "react";

type StepTone = "text" | "accent" | "blue" | "violet";

const STEPS: Array<{ n: string; title: string; body: string; tone: StepTone }> = [
  {
    n: "1",
    title: "Client",
    body: "Next.js submits the prompt as a Server Action.",
    tone: "text",
  },
  {
    n: "2",
    title: "AI Engine",
    body: "FastAPI translates NLQ → SQL, validates against read-only role, executes on NeonDB.",
    tone: "violet",
  },
  {
    n: "3",
    title: "AI SDK",
    body: "Vercel AI SDK renders the matched chart component as a streamed RSC.",
    tone: "blue",
  },
  {
    n: "4",
    title: "Hono SSE",
    body: "Live KPIs continue streaming via Hono + Redis Pub/Sub.",
    tone: "accent",
  },
];

const STEP_TONE: Record<StepTone, string> = {
  text: "border-border-strong bg-bg-elev text-text",
  accent: "border-accent/30 bg-accent/5 text-accent",
  blue: "border-blue/30 bg-blue/5 text-blue",
  violet: "border-violet/30 bg-violet/5 text-violet",
};

export function Architecture() {
  return (
    <section
      id="stack"
      className="relative border-y border-border bg-bg-elev/40 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-text-muted">
            <span className="h-px w-6 bg-text-muted" />
            Architecture
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[40px]">
            Two backends. <span className="text-text">One job each.</span>
          </h2>
          <p className="mt-4 max-w-2xl text-text-dim">
            Heavy AI reasoning and high-frequency traffic share no code path.
            The split is the product — each layer scales on its own axis, fails
            on its own schedule, and is owned by a different team.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-3">
          <Card
            tag="Frontend"
            title="Next.js 16 + Vercel AI SDK"
            accentClass="text-text"
            borderAccent="border-text/30"
          >
            <KV k="UI" v="shadcn/ui · Tailwind v4" />
            <KV k="Charts" v="Tremor · Recharts" />
            <KV k="State" v="Zustand (client) · TanStack Query v6 (server)" />
            <KV k="Gen UI" v="useChat · useUIState · useActions" />
            <CodeFence>
              <span className="text-text-muted">{"// "}</span>
              <span className="text-accent">{`"<RevenueChart region='EMEA' />"`}</span>
              {"\n"}
              <span className="text-text-muted">{"// streamed as RSC"}</span>
            </CodeFence>
          </Card>

          <Card
            tag="Gateway"
            title="Hono.js on Bun"
            accentClass="text-accent"
            borderAccent="border-accent/30"
            badge="110K req/s"
          >
            <KV k="Throughput" v="110K req/s" />
            <KV k="Real-time" v="SSE over Redis Pub/Sub" />
            <KV k="Cache" v="Redis (insights · summaries)" />
            <KV k="Rate limit" v="Redis token bucket" />
            <CodeFence>
              <span className="text-violet">{"app"}</span>.
              <span className="text-text">{"get"}</span>(
              <span className="text-accent">{`"/sse"`}</span>,{" "}
              <span className="text-text">{"sseHandler"}</span>);
              {"\n"}
              <span className="text-text-muted">{"// fans out to all clients"}</span>
            </CodeFence>
          </Card>

          <Card
            tag="AI Engine"
            title="FastAPI · Python"
            accentClass="text-violet"
            borderAccent="border-violet/30"
            badge="Streaming"
          >
            <KV k="NLQ → SQL" v="read-only Postgres role" />
            <KV k="Anomalies" v="background tasks · week-over-week" />
            <KV k="Summaries" v="cached in Redis · <50ms reads" />
            <KV k="Drivers" v="SQLAlchemy async · PgBouncer" />
            <CodeFence>
              <span className="text-violet">{"@app"}</span>.
              <span className="text-text">{"post"}</span>(
              <span className="text-accent">{`"/nlq"`}</span>);
              {"\n"}
              <span className="text-text-muted">{"// streams chart RSC"}</span>
            </CodeFence>
          </Card>
        </div>

        <div className="mt-12 rounded-xl border border-border bg-bg p-6 sm:p-8">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
                Request flow
              </div>
              <h3 className="mt-1 text-lg font-semibold">
                Prompt → chart, in three hops
              </h3>
            </div>
            <span className="rounded-full border border-border-strong bg-bg-elev px-2.5 py-1 font-mono text-[11px] text-text-dim">
              p95 ≈ 380ms
            </span>
          </div>

          <ol className="grid gap-3 sm:grid-cols-5">
            {STEPS.map((s, i) => (
              <FragmentStep key={s.n} step={s} arrow={i < STEPS.length - 1} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function FragmentStep({
  step,
  arrow,
}: {
  step: (typeof STEPS)[number];
  arrow: boolean;
}) {
  return (
    <>
      <li className={`rounded-lg border p-4 ${STEP_TONE[step.tone]}`}>
        <div className="font-mono text-[10px] uppercase tracking-wider opacity-70">
          {step.n}
        </div>
        <div className="mt-1 text-sm font-semibold text-text">{step.title}</div>
        <p className="mt-1 text-xs leading-relaxed text-text-dim">{step.body}</p>
      </li>
      {arrow ? <Arrow /> : null}
    </>
  );
}

function Arrow() {
  return (
    <li
      aria-hidden
      className="hidden items-center justify-center text-text-muted sm:flex"
    >
      <svg width="32" height="12" viewBox="0 0 32 12" fill="none">
        <path
          d="M0 6h28M22 1l5 5-5 5"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.6"
        />
      </svg>
    </li>
  );
}

function Card({
  tag,
  title,
  accentClass,
  borderAccent,
  badge,
  children,
}: {
  tag: string;
  title: string;
  accentClass: string;
  borderAccent: string;
  badge?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`relative rounded-xl border border-border bg-bg p-5 ${borderAccent}`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`text-[10px] font-medium uppercase tracking-[0.18em] ${accentClass}`}
        >
          {tag}
        </span>
        {badge ? (
          <span className="rounded-full border border-border-strong bg-bg-elev px-2 py-0.5 font-mono text-[10px] text-text-dim">
            {badge}
          </span>
        ) : null}
      </div>
      <h3 className="mt-3 text-lg font-semibold tracking-tight">{title}</h3>
      <div className="mt-4 space-y-1.5 text-sm">{children}</div>
    </div>
  );
}

function KV({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-border/60 pb-1.5 last:border-0">
      <span className="text-xs text-text-muted">{k}</span>
      <span className="font-mono text-[12px] text-text-dim">{v}</span>
    </div>
  );
}

function CodeFence({ children }: { children: ReactNode }) {
  return (
    <div className="mt-3 rounded-md border border-border bg-bg p-3 font-mono text-[11px] leading-relaxed text-text-dim">
      {children}
    </div>
  );
}
