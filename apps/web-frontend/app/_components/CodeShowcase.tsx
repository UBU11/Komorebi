import { Fragment } from "react";
import { CheckIcon } from "./icons";

export function CodeShowcase() {
  return (
    <section className="relative border-y border-border bg-bg-elev/40 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-12">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-text-muted">
              <span className="h-px w-6 bg-text-muted" />
              The wiring
            </div>
            <h2 className="mt-4 text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
              Frontend, gateway, and AI engine —{" "}
              <span className="text-text-dim">in one conversation.</span>
            </h2>
            <p className="mt-4 text-text-dim">
              Komorebi runs as a Turborepo monorepo. The Next.js client speaks
              to Hono on Bun for live data, and to FastAPI for reasoning. The
              types are shared. The Redis URL is shared. The product is the
              contract.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-text-dim">
              <Bullet>End-to-end Zod-inferred types</Bullet>
              <Bullet>Docker Compose brings up Redis + dev DB</Bullet>
              <Bullet>No hardcoded chart types — the LLM picks</Bullet>
              <Bullet>NLQ runs under a read-only Postgres role</Bullet>
            </ul>
          </div>

          <CodeTabs />
        </div>
      </div>
    </section>
  );
}

function Bullet({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-2">
      <CheckIcon className="mt-0.5 flex-none text-accent" />
      <span>{children}</span>
    </li>
  );
}

type Token = {
  t: "kw" | "str" | "num" | "com" | "fn" | "op" | "pun" | "plain";
  v: string;
};

const KEYWORDS = new Set([
  "import", "from", "export", "const", "let", "var", "function", "return",
  "async", "await", "new", "class", "extends", "if", "else", "for", "while",
  "in", "of", "as", "default", "true", "false", "null", "None", "self",
  "def", "with", "try", "except", "raise", "pass", "type", "interface",
]);

const TONE: Record<Token["t"], string> = {
  kw: "text-violet",
  str: "text-accent",
  num: "text-amber",
  com: "text-text-muted italic",
  fn: "text-blue",
  op: "text-text-dim",
  pun: "text-text-dim",
  plain: "text-text-dim",
};

function tokenize(src: string): Token[][] {
  return src.split("\n").map(tokenizeLine);
}

function tokenizeLine(line: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  const len = line.length;

  while (i < len) {
    const ch = line[i];

    if (line.startsWith("//", i) || line.startsWith("#", i)) {
      out.push({ t: "com", v: line.slice(i) });
      break;
    }

    if (ch === '"' || ch === "'" || ch === "`") {
      const quote = ch;
      let j = i + 1;
      while (j < len && line[j] !== quote) {
        if (line[j] === "\\") j += 2;
        else j++;
      }
      j = Math.min(j + 1, len);
      out.push({ t: "str", v: line.slice(i, j) });
      i = j;
      continue;
    }

    if (ch && /\d/.test(ch)) {
      const j = scanWhile(line, i, (c) => /[\d.]/.test(c));
      out.push({ t: "num", v: line.slice(i, j) });
      i = j;
      continue;
    }

    if (ch && /[A-Za-z_$]/.test(ch)) {
      const j = scanWhile(line, i, (c) => /[A-Za-z0-9_$]/.test(c));
      const word = line.slice(i, j);
      if (KEYWORDS.has(word)) out.push({ t: "kw", v: word });
      else if (line[j] === "(") out.push({ t: "fn", v: word });
      else out.push({ t: "plain", v: word });
      i = j;
      continue;
    }

    if (ch && /[+\-*/%=<>!&|^~]/.test(ch)) {
      const j = scanWhile(line, i, (c) => /[+\-*/%=<>!&|^~]/.test(c));
      out.push({ t: "op", v: line.slice(i, j) });
      i = j;
      continue;
    }

    if (ch && /[{}()[\];:,.]/.test(ch)) {
      out.push({ t: "pun", v: ch });
      i++;
      continue;
    }

    out.push({ t: "plain", v: ch ?? "" });
    i++;
  }
  return out;
}

function scanWhile(line: string, start: number, accept: (c: string) => boolean): number {
  let j = start;
  while (j < line.length) {
    const c = line[j];
    if (c && accept(c)) j++;
    else break;
  }
  return j;
}

function CodeBlock({ code }: { code: string }) {
  const lines = tokenize(code);
  return (
    <pre className="overflow-x-auto p-5 font-mono text-[12.5px] leading-[1.7]">
      <code>
        {lines.map((line, li) => (
          <Fragment key={li}>
            <span>
              {line.length === 0 ? (
                <span>{"\u00A0"}</span>
              ) : (
                line.map((tok, ti) => (
                  <span key={ti} className={TONE[tok.t]}>
                    {tok.v}
                  </span>
                ))
              )}
            </span>
            {li < lines.length - 1 ? "\n" : null}
          </Fragment>
        ))}
      </code>
    </pre>
  );
}

const TABS = [
  {
    label: "Server Action",
    file: "apps/web-frontend/app/actions/ask.ts",
    lang: "typescript",
    code: `import { createAI, streamUI } from "ai/rsc";
import { openai } from "@ai-sdk/openai";
import { neon } from "@neondatabase/serverless";
import { NLQRouter } from "@komorebi/ai-client";
import { z } from "zod";

export async function ask(question: string) {
  const sql = neon(process.env.NEON_URL!);
  const nlq = new NLQRouter({ sql, role: "readonly" });

  return streamUI({
    model: openai("gpt-4o"),
    messages: [{ role: "user", content: question }],
    tools: {
      renderChart: {
        description: "Render a chart from a SQL result",
        parameters: z.object({
          type: z.enum(["line","bar","heatmap","table"]),
          rows: z.array(z.record(z.any())),
        }),
        render: async ({ type, rows }) => {
          const Chart = charts[type];
          return <Chart data={rows} />;
        },
      },
    },
  });
}`,
  },
  {
    label: "Hono SSE gateway",
    file: "apps/api-high-freq/src/sse.ts",
    lang: "typescript",
    code: `import { Hono } from "hono";
import { streamSSE } from "hono/streaming";
import { redis } from "./redis";

export const sse = new Hono().get("/sse", (c) =>
  streamSSE(c, async (stream) => {
    const sub = redis.duplicate();
    await sub.subscribe("metrics:*");

    sub.on("message", async (channel, payload) => {
      await stream.writeSSE({
        event: channel,
        data: JSON.stringify(payload),
      });
    });

    stream.onAbort(() => sub.quit());
  })
);`,
  },
  {
    label: "FastAPI NLQ",
    file: "apps/api-ai-engine/app/nlq.py",
    lang: "python",
    code: `from fastapi import FastAPI, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from .nlq import NLQRouter
from .schemas import NLQRequest, ChartPayload

app = FastAPI()
nlq = NLQRouter(model="gpt-4o")

@app.post("/nlq", response_model=ChartPayload)
async def nlq_endpoint(req: NLQRequest, db: AsyncSession = Depends(get_ro_db)):
    intent = await nlq.parse(req.question)
    rows = await nlq.execute(db, intent)            # read-only role enforced
    payload = await nlq.to_chart(intent, rows)       # streamed back to Next
    return payload`,
  },
] as const;

function CodeTabs() {
  const [active] = TABS;
  return (
    <div className="overflow-hidden rounded-xl border border-border-strong bg-bg-elev">
      <div className="flex items-center gap-1 overflow-x-auto border-b border-border bg-bg-elev-2 px-2 py-1.5">
        {TABS.map((t, i) => (
          <Tab key={t.file} tab={t} active={i === 0} />
        ))}
      </div>

      <div className="flex items-center justify-between border-b border-border bg-bg px-4 py-2">
        <code className="font-mono text-[11px] text-text-muted">{active.file}</code>
        <span className="font-mono text-[11px] text-text-muted">{active.lang}</span>
      </div>

      <CodeBlock code={active.code} />
    </div>
  );
}

function Tab({ tab, active }: { tab: (typeof TABS)[number]; active: boolean }) {
  return (
    <button
      type="button"
      className={`flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-1.5 font-mono text-[11px] transition ${
        active
          ? "bg-bg text-text ring-border"
          : "text-text-dim hover:bg-bg-elev hover:text-text"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${active ? "bg-accent" : "bg-text-muted/50"}`} />
      {tab.label}
    </button>
  );
}
