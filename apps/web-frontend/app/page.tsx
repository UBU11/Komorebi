import { env } from "../lib/env";

export default function Home() {
  return (
    <main className="min-h-screen p-10 font-sans">
      <h1 className="text-3xl font-bold">Komorebi Analytics</h1>
      <p className="mt-2 text-neutral-600">
        Real-time dashboard. Generative UI + dual backends wired.
      </p>
      <ul className="mt-6 space-y-1 text-sm">
        <li>
          High-frequency API: <code>{env.API_HIGH_FREQ_URL}</code>
        </li>
        <li>
          AI engine: <code>{env.API_AI_ENGINE_URL}</code>
        </li>
      </ul>
    </main>
  );
}
