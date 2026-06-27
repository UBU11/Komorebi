import type { ReactNode } from "react";

type Align = "start" | "center";

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "start",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: string;
  align?: Align;
}) {
  const wrapperClass =
    align === "center"
      ? "mx-auto max-w-3xl text-center"
      : "max-w-3xl";
  const eyebrowClass =
    align === "center"
      ? "inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-text-muted"
      : "inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-text-muted";

  return (
    <div className={wrapperClass}>
      <div className={eyebrowClass}>
        <span className="h-px w-6 bg-text-muted" />
        {eyebrow}
      </div>
      <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-[40px]">
        {title}
      </h2>
      {subtitle ? <p className="mt-4 text-text-dim">{subtitle}</p> : null}
    </div>
  );
}
