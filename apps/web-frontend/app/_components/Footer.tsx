import { Logo } from "./Logo";

const COLUMNS: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "Product",
    links: [
      { label: "Features", href: "#features" },
      { label: "Architecture", href: "#stack" },
      { label: "Pricing", href: "#pricing" },
      { label: "Changelog", href: "#" },
    ],
  },
  {
    title: "Build",
    links: [
      { label: "GitHub", href: "https://github.com" },
      { label: "Quickstart", href: "#cta" },
      { label: "API docs", href: "#" },
      { label: "Discord", href: "#" },
    ],
  },
  {
    title: "Stack",
    links: [
      { label: "Next.js 16", href: "https://nextjs.org" },
      { label: "Hono + Bun", href: "https://hono.dev" },
      { label: "FastAPI", href: "https://fastapi.tiangolo.com" },
      { label: "NeonDB", href: "https://neon.tech" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-elev/40">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <Logo />
              <span className="font-semibold tracking-tight">Komorebi</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-text-dim">
              Real-time AI analytics with generative UI. Built as a Solution
              Challenge 2026 functional prototype.
            </p>
            <p className="mt-4 font-mono text-[11px] text-text-muted">
              komorebi@local · v0.1.0-prototype
            </p>
          </div>

          {COLUMNS.map((col) => (
            <FooterCol key={col.title} {...col} />
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-text-muted sm:flex-row sm:items-center">
          <span>© 2026 Komorebi. Prototype — not for production use.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="transition hover:text-text">Privacy</a>
            <a href="#" className="transition hover:text-text">Terms</a>
            <a href="#" className="transition hover:text-text">Status</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: Array<{ label: string; href: string }>;
}) {
  return (
    <div>
      <div className="text-[11px] font-medium uppercase tracking-[0.18em] text-text-muted">
        {title}
      </div>
      <ul className="mt-4 space-y-2.5 text-sm text-text-dim">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="transition hover:text-text">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
