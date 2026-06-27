type TraceTone = "text" | "accent" | "blue" | "violet";

const TRACES: Array<{
  service: string;
  tag: string;
  msg: string;
  meta: string;
  tone: TraceTone;
}> = [
  {
    service: "next",
    tag: "server-action",
    msg: 'useChat("show EMEA revenue this quarter")',
    meta: "12ms",
    tone: "text",
  },
  {
    service: "hono",
    tag: "rate-limit",
    msg: "token bucket OK · 14/60",
    meta: "1ms",
    tone: "blue",
  },
  {
    service: "fastapi",
    tag: "nlq",
    msg: 'intent=time_series · entities=["EMEA","revenue"]',
    meta: "24ms",
    tone: "violet",
  },
  {
    service: "fastapi",
    tag: "sql",
    msg: "SELECT region, week, SUM(rev) …  [read-only role]",
    meta: "38ms",
    tone: "violet",
  },
  {
    service: "neon",
    tag: "db",
    msg: "rows=312 · planning_ms=3 · exec_ms=22",
    meta: "22ms",
    tone: "text",
  },
  {
    service: "ai-sdk",
    tag: "tool",
    msg: "tool=renderChart · args={type:'line',series:3}",
    meta: "48ms",
    tone: "accent",
  },
  {
    service: "fastapi",
    tag: "stream",
    msg: "→ RevenueChart RSC chunk · 8/8",
    meta: "118ms",
    tone: "accent",
  },
  {
    service: "hono",
    tag: "sse",
    msg: "fanout 2,418 subscribers · 3 live metrics",
    meta: "ongoing",
    tone: "blue",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-text-muted">
              <span className="h-px w-6 bg-text-muted" />
              How it works
            </div>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              One prompt, four moving parts, all observable.
            </h2>
            <p className="mt-4 text-text-dim">
              Every chart on the dashboard traces back to a single
              request/response cycle across the monorepo. Here's what happens
              when you press enter.
            </p>

            <ul className="mt-8 space-y-3 text-sm">
              <Bullet>
                <span className="font-mono text-text">useChat</span> streams the
                prompt to a Server Action.
              </Bullet>
              <Bullet>
                <span className="font-mono text-accent">FastAPI</span> runs NLQ
                in a sandboxed read-only context.
              </Bullet>
              <Bullet>
                <span className="font-mono text-violet">Vercel AI SDK</span>{" "}
                picks the chart type server-side.
              </Bullet>
              <Bullet>
                <span className="font-mono text-blue">Hono SSE</span> keeps the
                dashboard's other panels live.
              </Bullet>
            </ul>
          </div>

          <DemoSequence />
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3">
      <span className="mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-accent" />
      <span className="text-text-dim">{children}</span>
    </li>
  );
}

function DemoSequence() {
  return (
    <div className="overflow-hidden rounded-xl border border-border-strong bg-bg-elev">
      <div className="flex items-center justify-between border-b border-border bg-bg-elev-2 px-4 py-2">
        <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
          <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
          trace · 1d3a…
        </div>
        <span className="font-mono text-[11px] text-text-muted">382ms</span>
      </div>

      <ol className="divide-y divide-border">
        {TRACES.map((t, i) => (
          <Trace key={i} {...t} />
        ))}
      </ol>

      <div className="border-t border-border bg-bg-elev-2 px-4 py-2.5 font-mono text-[11px] text-text-muted">
        <span className="text-text">rendered:</span>{" "}
        <span className="text-accent">{"<RevenueChart region=\"EMEA\" />"}</span>
        <span className="ml-2 text-text-muted">· SSE active</span>
      </div>
    </div>
  );
}

const TONE_CLASS: Record<TraceTone, string> = {
  text: "border-border-strong bg-bg text-text-dim",
  accent: "border-accent/30 bg-accent/5 text-accent",
  blue: "border-blue/30 bg-blue/5 text-blue",
  violet: "border-violet/30 bg-violet/5 text-violet",
};

function Trace({ service, tag, msg, meta, tone }: (typeof TRACES)[number]) {
  return (
    <li className="grid grid-cols-[88px_1fr_auto] items-center gap-3 px-4 py-2.5 text-sm">
      <span className="font-mono text-[11px] text-text-muted">{service}</span>
      <span className="flex min-w-0 items-center gap-2">
        <span
          className={`flex-none rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${TONE_CLASS[tone]}`}
        >
          {tag}
        </span>
        <code className="truncate font-mono text-[12px] text-text-dim">{msg}</code>
      </span>
      <span className="font-mono text-[11px] text-text-muted">{meta}</span>
    </li>
  );
}
