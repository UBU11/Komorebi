import { HeroPanel } from "./HeroPanel";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 grid-bg grid-bg-fade opacity-60" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[860px] -translate-x-1/2 rounded-full bg-accent/10 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-16 sm:pt-20 lg:pb-28 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-10">
          <div className="animate-rise">
            <div className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg-elev px-3 py-1 text-xs text-text-dim">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              Solution Challenge 2026 — Functional prototype
            </div>

            <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.04] tracking-tight sm:text-6xl lg:text-[64px]">
              Ask your data{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-accent">anything</span>
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-1 z-0 h-3 bg-accent/15"
                />
              </span>
              .
              <br />
              Get <span className="text-text">live charts</span> back.
            </h1>

            <p className="mt-6 max-w-xl text-balance text-lg leading-relaxed text-text-dim">
              Komorebi is a real-time analytics dashboard where natural language
              becomes a chart, a metric becomes a stream, and an anomaly becomes
              an alert — all rendered by generative UI.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#cta"
                className="group inline-flex items-center gap-2 rounded-md bg-accent px-4 py-2.5 text-sm font-semibold text-bg transition hover:bg-accent/90"
              >
                Start free
                <span
                  aria-hidden
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>
              <a
                href="#how"
                className="inline-flex items-center gap-2 rounded-md border border-border-strong bg-bg-elev px-4 py-2.5 text-sm font-medium text-text transition hover:border-text/30 hover:bg-bg-elev-2"
              >
                <PlayIcon />
                See how it works
              </a>
              <span className="ml-1 text-xs text-text-muted">
                No credit card. Local Docker.
              </span>
            </div>

            <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6 text-sm sm:max-w-md">
              <Stat label="Throughput" value="110K" suffix="req/s" />
              <Stat label="Time to chart" value="<50" suffix="ms" />
              <Stat label="Backends" value="2" suffix="isolated" />
            </dl>
          </div>

          <HeroPanel />
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, suffix }: { label: string; value: string; suffix: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-text-muted">{label}</dt>
      <dd className="mt-1 font-mono text-2xl font-medium text-text">
        {value}
        <span className="ml-1 text-sm font-normal text-text-dim">{suffix}</span>
      </dd>
    </div>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden className="text-accent">
      <path
        d="M3 2.5L9 6L3 9.5V2.5Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}
