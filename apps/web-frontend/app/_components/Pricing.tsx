type Tier = {
  name: string;
  price: string;
  period: string;
  blurb: string;
  cta: string;
  href: string;
  accent: boolean;
  badge?: string;
  features: readonly string[];
};

const TIERS: readonly Tier[] = [
  {
    name: "Free",
    price: "$0",
    period: "/month",
    blurb: "Run Komorebi locally with Docker. Great for prototypes and the Solution Challenge.",
    cta: "Get the repo",
    href: "https://github.com",
    accent: false,
    features: [
      "Unlimited local development",
      "Single NeonDB branch",
      "All six generative UI tools",
      "Community Discord",
    ],
  },
  {
    name: "Team",
    price: "$49",
    period: "/seat · month",
    blurb: "Production analytics for small teams. Hosted Hono gateway + Redis included.",
    cta: "Start free trial",
    href: "#cta",
    accent: true,
    badge: "Most popular",
    features: [
      "Hosted Hono on Bun (multi-region)",
      "Up to 50K req/s",
      "Anomaly alerts over Slack & email",
      "10 connected data sources",
      "Audit log + read-only roles",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "annual",
    blurb: "Dedicated tenancy, 110K+ req/s, SSO, custom NLQ models, on-call support.",
    cta: "Talk to us",
    href: "#cta",
    accent: false,
    features: [
      "Dedicated cluster",
      "SSO + SCIM",
      "Custom NLQ model fine-tune",
      "99.95% SLA + on-call",
      "Dedicated solutions engineer",
    ],
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-text-muted">
            <span className="h-px w-6 bg-text-muted" />
            Pricing
          </div>
          <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[40px]">
            Start free. Pay when real users hit the dashboard.
          </h2>
          <p className="mt-4 text-text-dim">
            No usage-based surprises. One number per seat. Cancel anytime.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {TIERS.map((t) => (
            <TierCard key={t.name} tier={t} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TierCard({ tier }: { tier: Tier }) {
  const { name, price, period, blurb, cta, href, accent, badge, features } = tier;
  const cardClass = accent
    ? "border-accent/40 bg-bg-elev shadow-[0_30px_80px_-30px_rgba(125,249,192,0.35)]"
    : "border-border bg-bg-elev";
  const ctaClass = accent
    ? "bg-accent text-bg hover:bg-accent/90"
    : "border border-border-strong bg-bg text-text hover:border-text/30";

  return (
    <div className={`relative rounded-xl border p-6 transition ${cardClass}`}>
      {badge ? (
        <span className="absolute -top-2.5 right-5 rounded-full bg-accent px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-bg">
          {badge}
        </span>
      ) : null}

      <div className="flex items-baseline justify-between">
        <h3 className="text-lg font-semibold">{name}</h3>
        <div className="flex items-baseline gap-1">
          <span className="font-mono text-3xl font-semibold tracking-tight">
            {price}
          </span>
          <span className="text-sm text-text-muted">{period}</span>
        </div>
      </div>
      <p className="mt-2 text-sm text-text-dim">{blurb}</p>

      <ul className="mt-5 space-y-2 border-t border-border pt-5 text-sm">
        {features.map((f) => (
          <li key={f} className="flex gap-2 text-text-dim">
            <CheckBullet />
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href={href}
        className={`mt-6 inline-flex w-full items-center justify-center rounded-md px-4 py-2.5 text-sm font-semibold transition ${ctaClass}`}
      >
        {cta} →
      </a>
    </div>
  );
}

function CheckBullet() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      className="mt-0.5 flex-none text-accent"
      aria-hidden
    >
      <path
        d="M3 7.5l2.5 2.5L11 4.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
