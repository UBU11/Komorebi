import type { ReactNode } from "react";
import { SectionHeader } from "./SectionHeader";
import {
  AlertIcon,
  BoltIcon,
  ChatIcon,
  ShieldIcon,
  SparkleIcon,
  StreamIcon,
} from "./icons";

type Accent = "accent" | "blue" | "violet" | "amber";

type Feature = {
  tag: string;
  title: string;
  body: string;
  Icon: (p: { className?: string }) => ReactNode;
  accent: Accent;
};

const FEATURES: Feature[] = [
  {
    tag: "01",
    title: "Natural language to chart",
    body: "Ask a question. The NLQ router translates it into a read-only SQL query, runs it on NeonDB, and streams back the right React component — bar, line, heatmap, table — without you choosing upfront.",
    Icon: ChatIcon,
    accent: "accent",
  },
  {
    tag: "02",
    title: "Real-time KPI streams",
    body: "External sources publish to Redis. Hono on Bun subscribes and broadcasts over SSE at 110K req/s. The dashboard updates without refresh, with Zustand holding the live state.",
    Icon: StreamIcon,
    accent: "blue",
  },
  {
    tag: "03",
    title: "Anomaly alerts as they fire",
    body: "FastAPI runs background analysis week-over-week. When something spikes, it pushes to Redis Pub/Sub. Hono fans the alert out to every connected client instantly.",
    Icon: AlertIcon,
    accent: "amber",
  },
  {
    tag: "04",
    title: "Click-to-explain",
    body: "Click a data point. The chart context — type, range, value — goes to FastAPI as a structured prompt. The explanation streams back, grounded in the actual data you saw.",
    Icon: SparkleIcon,
    accent: "violet",
  },
  {
    tag: "05",
    title: "Read-only by construction",
    body: "The NLQ pipeline runs under a strict read-only Postgres role. Inputs are sanitized and queries are validated before they ever touch NeonDB. SQL injection is not on the table.",
    Icon: ShieldIcon,
    accent: "accent",
  },
  {
    tag: "06",
    title: "Edge-cached summaries",
    body: "AI-generated insights get written to NeonDB and cached in Redis. Hono serves the latest summary in under 50ms on dashboard load — never blocks on the LLM.",
    Icon: BoltIcon,
    accent: "blue",
  },
];

const ACCENT_RING: Record<Accent, string> = {
  accent:
    "group-hover:border-accent/40 group-hover:shadow-[0_0_0_1px_rgba(125,249,192,0.15),0_20px_60px_-20px_rgba(125,249,192,0.25)]",
  blue: "group-hover:border-blue/40 group-hover:shadow-[0_0_0_1px_rgba(122,183,255,0.15),0_20px_60px_-20px_rgba(122,183,255,0.25)]",
  violet:
    "group-hover:border-violet/40 group-hover:shadow-[0_0_0_1px_rgba(184,155,255,0.15),0_20px_60px_-20px_rgba(184,155,255,0.25)]",
  amber:
    "group-hover:border-amber/40 group-hover:shadow-[0_0_0_1px_rgba(255,196,107,0.15),0_20px_60px_-20px_rgba(255,196,107,0.25)]",
};

const ACCENT_TEXT: Record<Accent, string> = {
  accent: "text-accent",
  blue: "text-blue",
  violet: "text-violet",
  amber: "text-amber",
};

export function Features() {
  return (
    <section id="features" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Features"
          title={
            <>
              Everything you need from{" "}
              <em className="not-italic text-accent">prompt</em> to{" "}
              <em className="not-italic text-text">production</em>.
            </>
          }
          subtitle="Six primitives, working together. Each one is a real backend service, not a wrapper around an LLM."
        />

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f) => (
            <FeatureCard key={f.tag} {...f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ tag, title, body, Icon, accent }: Feature) {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl border border-border bg-bg-elev p-6 transition ${ACCENT_RING[accent]}`}
    >
      <div className="absolute right-4 top-4 font-mono text-[11px] text-text-muted">
        {tag}
      </div>
      <div
        className={`inline-flex h-9 w-9 items-center justify-center rounded-md border border-border-strong bg-bg ${ACCENT_TEXT[accent]}`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <h3 className="mt-4 text-[17px] font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-text-dim">{body}</p>
    </div>
  );
}
