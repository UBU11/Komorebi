import Link from "next/link";
import { env } from "../../lib/env";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-bg/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo />
          <span className="text-[15px] font-semibold tracking-tight">Komorebi</span>
          <span className="hidden rounded-full border border-border-strong px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-text-dim sm:inline">
            Analytics
          </span>
        </Link>

        <nav className="hidden items-center gap-7 text-sm text-text-dim md:flex">
          <a href="#how" className="transition hover:text-text">How it works</a>
          <a href="#stack" className="transition hover:text-text">Architecture</a>
          <a href="#features" className="transition hover:text-text">Features</a>
          <a href="#pricing" className="transition hover:text-text">Pricing</a>
          <a href="#faq" className="transition hover:text-text">FAQ</a>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`${env.API_AI_ENGINE_URL}/docs`}
            className="hidden rounded-md px-3 py-1.5 text-sm text-text-dim transition hover:text-text sm:inline"
          >
            API docs
          </a>
          <a
            href="#cta"
            className="inline-flex items-center gap-1.5 rounded-md bg-text px-3 py-1.5 text-sm font-medium text-bg transition hover:bg-white"
          >
            Get started
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}
