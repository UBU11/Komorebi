import { env } from "../../lib/env";

export function CTA() {
  return (
    <section id="cta" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="relative overflow-hidden rounded-2xl border border-border-strong bg-bg-elev px-6 py-14 sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-32 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-40"
          />

          <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-16">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg px-3 py-1 text-xs text-text-dim">
                <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
                Repo · Monorepo · Docker
              </div>
              <h2 className="mt-5 text-balance text-4xl font-semibold leading-tight tracking-tight sm:text-5xl lg:text-[56px]">
                Ship a dashboard that{" "}
                <span className="text-accent">answers back.</span>
              </h2>
              <p className="mt-5 max-w-xl text-balance text-text-dim">
                Clone the monorepo, run{" "}
                <code className="rounded bg-bg px-1.5 py-0.5 font-mono text-[12.5px] text-text">
                  docker compose up
                </code>
                , and ask your first question in under five minutes.
              </p>
              <div className="mt-7 flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com"
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition hover:bg-accent/90"
                >
                  Get the repo
                  <span aria-hidden>→</span>
                </a>
                <a
                  href={`${env.API_AI_ENGINE_URL}/docs`}
                  className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-bg px-4 py-2.5 text-sm font-medium text-text transition hover:border-text/30"
                >
                  Read the API docs
                </a>
              </div>
            </div>

            <Terminal />
          </div>
        </div>
      </div>
    </section>
  );
}

function Terminal() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-xl border border-border-strong bg-bg">
        <div className="flex items-center justify-between border-b border-border bg-bg-elev-2 px-4 py-2 font-mono text-[11px] text-text-muted">
          <span>~/komorebi</span>
          <span>install · 4m 12s</span>
        </div>
        <pre className="overflow-x-auto p-4 font-mono text-[12px] leading-relaxed text-text-dim">
{`git clone https://github.com/you/komorebi
cd komorebi
cp .env.example .env
docker compose up -d
pnpm install
pnpm dev

`}<span className="text-text-muted"># dashboard at http://localhost:3000</span>
{`
`}<span className="text-accent">→</span>{` ask: "revenue by region, last 30 days"
`}<span className="text-text-muted"># chart renders · SSE connected</span>
        </pre>
      </div>
      <div
        aria-hidden
        className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-xl border border-accent/20"
      />
    </div>
  );
}
