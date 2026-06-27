export function HeroPanel() {
  return (
    <div className="animate-rise [animation-delay:120ms] [animation-fill-mode:both]">
      <div className="relative">
        <div
          aria-hidden
          className="absolute -inset-6 -z-10 rounded-3xl bg-gradient-to-br from-accent/10 via-blue/5 to-violet/10 blur-2xl"
        />
        <div className="overflow-hidden rounded-xl border border-border-strong bg-bg-elev shadow-[0_30px_80px_-30px_rgba(0,0,0,0.8)]">
          <div className="flex items-center justify-between border-b border-border bg-bg-elev-2 px-4 py-2.5">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="rounded-md border border-border bg-bg px-3 py-0.5 font-mono text-[11px] text-text-muted">
              komorebi / dashboard
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-text-muted">
              <span className="h-1.5 w-1.5 animate-pulse-dot rounded-full bg-accent" />
              live
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr]">
            <div className="border-b border-border p-4 md:border-b-0 md:border-r">
              <div className="mb-3 text-[10px] font-medium uppercase tracking-wider text-text-muted">
                NLQ → Chart
              </div>
              <div className="rounded-md border border-border bg-bg px-3 py-2 text-sm text-text">
                <span className="text-accent">▌</span> Show weekly revenue by
                region for Q3, highlight anomalies.
              </div>

              <div className="mt-3 space-y-2">
                <Trace step="01" label="parse" detail="FastAPI • NLQ router" tone="blue" />
                <Trace
                  step="02"
                  label="nlq→sql"
                  detail="SELECT region, week, SUM(rev)…"
                  tone="violet"
                />
                <Trace
                  step="03"
                  label="stream"
                  detail="Vercel AI SDK → <RevenueChart/>"
                  tone="accent"
                />
              </div>
            </div>

            <div className="p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-medium uppercase tracking-wider text-text-muted">
                    Revenue · Q3 · weekly
                  </div>
                  <div className="mt-0.5 flex items-baseline gap-2">
                    <span className="font-mono text-2xl font-semibold">
                      $1.42M
                    </span>
                    <span className="text-xs text-accent">+12.4%</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-text-muted">
                  <Legend dot="accent" label="EMEA" />
                  <Legend dot="blue" label="AMER" />
                  <Legend dot="violet" label="APAC" />
                </div>
              </div>

              <Sparkline />

              <div className="mt-3 grid grid-cols-3 gap-2 border-t border-border pt-3 text-xs">
                <Mini label="EMEA" value="↑ 8.1%" tone="accent" />
                <Mini label="AMER" value="↑ 4.6%" tone="blue" />
                <Mini label="APAC" value="↑ 24.3%" tone="violet" highlight />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-border bg-bg-elev-2 px-4 py-2 font-mono text-[11px] text-text-muted">
            <div className="flex items-center gap-4">
              <span>SSE <span className="text-text">connected</span></span>
              <span>p95 <span className="text-text">42ms</span></span>
              <span>ws <span className="text-text">2.4k/s</span></span>
            </div>
            <span>komorebi@local</span>
          </div>
        </div>
      </div>
    </div>
  );
}

type Tone = "accent" | "blue" | "violet";

function Trace({
  step,
  label,
  detail,
  tone,
}: {
  step: string;
  label: string;
  detail: string;
  tone: Tone;
}) {
  const toneClass =
    tone === "accent"
      ? "text-accent border-accent/30 bg-accent/5"
      : tone === "blue"
        ? "text-blue border-blue/30 bg-blue/5"
        : "text-violet border-violet/30 bg-violet/5";
  return (
    <div className="flex items-center gap-2 rounded-md border border-border bg-bg px-2.5 py-1.5 font-mono text-[11px]">
      <span className="text-text-muted">{step}</span>
      <span
        className={`rounded border px-1.5 py-px text-[10px] uppercase tracking-wider ${toneClass}`}
      >
        {label}
      </span>
      <span className="truncate text-text-dim">{detail}</span>
    </div>
  );
}

function Legend({ dot, label }: { dot: Tone; label: string }) {
  const color = dot === "accent" ? "bg-accent" : dot === "blue" ? "bg-blue" : "bg-violet";
  return (
    <span className="flex items-center gap-1">
      <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
      {label}
    </span>
  );
}

function Mini({
  label,
  value,
  tone,
  highlight,
}: {
  label: string;
  value: string;
  tone: Tone;
  highlight?: boolean;
}) {
  const color = tone === "accent" ? "text-accent" : tone === "blue" ? "text-blue" : "text-violet";
  return (
    <div
      className={`rounded-md border px-2 py-1.5 ${
        highlight ? "border-violet/40 bg-violet/5" : "border-border bg-bg"
      }`}
    >
      <div className="text-[10px] uppercase tracking-wider text-text-muted">
        {label}
      </div>
      <div className={`font-mono text-sm ${color}`}>{value}</div>
    </div>
  );
}

const SERIES: Array<{ name: string; values: number[]; stroke: string; fill: string }> = [
  { name: "apac", values: [22, 24, 26, 28, 30, 34, 38, 42, 46, 50, 54, 58], stroke: "#b89bff", fill: "url(#g-ap)" },
  { name: "amer", values: [30, 32, 35, 33, 38, 40, 42, 41, 44, 45, 47, 46], stroke: "#7ab7ff", fill: "url(#g-am)" },
  { name: "emea", values: [38, 42, 40, 46, 45, 50, 52, 55, 53, 58, 62, 60], stroke: "#7df9c0", fill: "url(#g-em)" },
];

function Sparkline() {
  return (
    <svg viewBox="0 0 320 110" className="h-32 w-full" preserveAspectRatio="none">
      <defs>
        <linearGradient id="g-em" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7df9c0" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#7df9c0" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g-am" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#7ab7ff" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7ab7ff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="g-ap" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="#b89bff" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#b89bff" stopOpacity="0" />
        </linearGradient>
      </defs>
      {Array.from({ length: 4 }, (_, i) => (
        <line
          key={i}
          x1="0"
          x2="320"
          y1={20 + i * 22}
          y2={20 + i * 22}
          stroke="#1c2530"
          strokeDasharray="2 4"
        />
      ))}
      <line
        x1="240"
        x2="240"
        y1="0"
        y2="110"
        stroke="#ffc46b"
        strokeDasharray="3 3"
        opacity="0.6"
      />
      <text x="244" y="14" fill="#ffc46b" fontSize="9" fontFamily="ui-monospace">
        anomaly ↑
      </text>

      {SERIES.map((s) => (
        <Series key={s.name} {...s} />
      ))}
    </svg>
  );
}

function Series({ values, stroke, fill }: { values: number[]; stroke: string; fill: string }) {
  const max = 70;
  const w = 320;
  const h = 110;
  const stepX = w / (values.length - 1);
  const last = values.length - 1;
  const toY = (v: number) => h - (v / max) * h;
  const path = values
    .map((v, i) => `${i === 0 ? "M" : "L"}${(i * stepX).toFixed(1)},${toY(v).toFixed(1)}`)
    .join(" ");
  const lastY = toY(values[last] ?? 0);

  return (
    <g>
      <path d={`${path} L${w},${h} L0,${h} Z`} fill={fill} />
      <path
        d={path}
        stroke={stroke}
        strokeWidth="1.6"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="draw-line"
      />
      <circle cx={w} cy={lastY} r="3.5" fill={stroke} />
      <circle cx={w} cy={lastY} r="6" fill={stroke} opacity="0.3" />
    </g>
  );
}
