import { Fragment } from "react";

type ChipTone = "accent" | "blue" | "violet" | "text";

const PROMPTS: Array<{ q: string; chip: string; tone: ChipTone }> = [
  { q: "Compare this week's MRR across all plans.", chip: "line · 3 series", tone: "accent" },
  { q: "Where are users dropping off in the funnel?", chip: "funnel · sankey", tone: "blue" },
  { q: "Heatmap of API latency by region × hour.", chip: "heatmap · 24×8", tone: "violet" },
  { q: "Top 10 customers by spend, last 30 days.", chip: "table · sort + filter", tone: "text" },
];

const REGIONS = ["us-east", "us-west", "eu", "apac", "sa"];
const HOURS = ["0", "4", "8", "12", "16", "20"];

const FUNNEL = [
  { label: "Visit", w: 100, value: "42.1k" },
  { label: "Sign up", w: 64, value: "26.9k" },
  { label: "Activate", w: 41, value: "17.3k" },
  { label: "Subscribe", w: 24, value: "10.1k" },
  { label: "Retain 7d", w: 17, value: "7.2k" },
];

export function LiveDemo() {
  return (
    <section className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-text-muted">
              <span className="h-px w-6 bg-text-muted" />
              Generative UI
            </div>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              The LLM picks the chart.{" "}
              <span className="text-text-dim">You pick the question.</span>
            </h2>
            <p className="mt-4 text-text-dim">
              Four prompts, four completely different outputs. The model decides
              whether you need a line, a bar, a heatmap, or a table — then
              streams the React Server Component back. No chart-type selector
              in the UI.
            </p>

            <div className="mt-6 space-y-3">
              {PROMPTS.map((p, i) => (
                <Prompt key={i} {...p} />
              ))}
            </div>
          </div>

          <GenerativePanel />
        </div>
      </div>
    </section>
  );
}

const CHIP_TONE: Record<ChipTone, string> = {
  accent: "border-accent/30 bg-accent/5 text-accent",
  blue: "border-blue/30 bg-blue/5 text-blue",
  violet: "border-violet/30 bg-violet/5 text-violet",
  text: "border-border-strong bg-bg-elev text-text-dim",
};

function Prompt({ q, chip, tone }: (typeof PROMPTS)[number]) {
  return (
    <div className="flex items-start gap-3 rounded-md border border-border bg-bg p-3">
      <span className="mt-0.5 text-accent">▌</span>
      <div className="min-w-0 flex-1">
        <p className="text-sm">{q}</p>
        <span
          className={`mt-1.5 inline-block rounded border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider ${CHIP_TONE[tone]}`}
        >
          → {chip}
        </span>
      </div>
    </div>
  );
}

function GenerativePanel() {
  return (
    <div className="overflow-hidden rounded-xl border border-border-strong bg-bg-elev">
      <div className="flex items-center justify-between border-b border-border bg-bg-elev-2 px-4 py-2">
        <div className="flex items-center gap-2 font-mono text-[11px] text-text-muted">
          <span>tool</span>
          <span className="rounded border border-accent/30 bg-accent/5 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-accent">
            renderChart
          </span>
        </div>
        <span className="font-mono text-[11px] text-text-muted">streaming…</span>
      </div>

      <div className="grid gap-0 lg:grid-cols-2">
        <div className="border-b border-border p-4 lg:border-b-0 lg:border-r">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-wider text-text-muted">
              Funnel · drop-off
            </div>
            <span className="font-mono text-[11px] text-text-dim">7 stages</span>
          </div>
          <Funnel />
        </div>

        <div className="p-4">
          <div className="mb-2 flex items-center justify-between">
            <div className="text-[10px] uppercase tracking-wider text-text-muted">
              Latency heatmap · region × hour
            </div>
            <span className="font-mono text-[11px] text-text-dim">ms</span>
          </div>
          <Heatmap />
        </div>
      </div>

      <div className="border-t border-border bg-bg-elev-2 px-4 py-2 font-mono text-[11px] text-text-muted">
        <span className="text-text">payload:</span>{" "}
        <span className="text-text-dim">
          {"{type:"}
          <span className="text-accent">"auto"</span>
          {" ,rows:312, cols:3}"}
        </span>
      </div>
    </div>
  );
}

function Funnel() {
  return (
    <div className="space-y-1.5">
      {FUNNEL.map((s, i) => (
        <div key={s.label} className="flex items-center gap-3">
          <span className="w-20 font-mono text-[11px] text-text-muted">
            {i + 1}. {s.label}
          </span>
          <div className="relative h-6 flex-1 overflow-hidden rounded-sm border border-border bg-bg">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent/40 to-accent/5"
              style={{ width: `${s.w}%` }}
            />
            <div className="relative flex h-full items-center px-2 font-mono text-[11px] text-text">
              {s.value}
            </div>
          </div>
          <span className="w-12 text-right font-mono text-[11px] text-text-dim">
            {s.w}%
          </span>
        </div>
      ))}
    </div>
  );
}

function heatValue(r: number, h: number): number {
  const v = 40 + ((r * 17 + h * 23) % 9) * 18 + (h > 3 ? 60 : 0);
  return Math.min(220, v);
}

function heatColor(v: number): string {
  if (v < 80) return "bg-accent/30";
  if (v < 120) return "bg-accent/55";
  if (v < 160) return "bg-amber/60";
  if (v < 200) return "bg-rose/55";
  return "bg-rose/80";
}

function Heatmap() {
  return (
    <div className="overflow-x-auto">
      <div
        className="grid gap-px"
        style={{ gridTemplateColumns: `60px repeat(${HOURS.length}, 1fr)` }}
      >
        <div />
        {HOURS.map((h) => (
          <div
            key={h}
            className="pb-1 text-center font-mono text-[10px] text-text-muted"
          >
            {h}h
          </div>
        ))}
        {REGIONS.map((region, ri) => (
          <Fragment key={region}>
            <div className="flex items-center font-mono text-[11px] text-text-dim">
              {region}
            </div>
            {HOURS.map((hour, hi) => {
              const v = heatValue(ri, hi);
              return (
                <div
                  key={`${region}-${hour}`}
                  className={`relative h-7 rounded-sm ${heatColor(v)} flex items-center justify-center`}
                  title={`${v}ms`}
                >
                  <span className="font-mono text-[9px] text-bg/90 mix-blend-screen">
                    {v}
                  </span>
                </div>
              );
            })}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
