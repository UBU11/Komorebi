"use client";

import { useState } from "react";
import { useChat } from "@ai-sdk/react";

// ponytail: throwaway smoke test for the /api/chat gateway. Delete once the real
// NLQ-to-chart UI lands — it only proves the stream round-trips.
export default function ChatPage() {
  const { messages, sendMessage, status, error } = useChat(); // POST /api/chat
  const [input, setInput] = useState("");
  const busy = status === "submitted" || status === "streaming";

  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-4 text-xl font-semibold">Komorebi AI gateway</h1>

      <ul className="mb-4 space-y-2">
        {messages.map((m) => (
          <li key={m.id} className={m.role === "user" ? "text-right" : ""}>
            <span className="whitespace-pre-wrap">
              {m.role}:{" "}
              {m.parts.map((p) => (p.type === "text" ? p.text : "")).join("")}
            </span>
          </li>
        ))}
        {busy && <li className="animate-pulse">…</li>}
      </ul>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!input.trim()) return;
          sendMessage({ text: input });
          setInput("");
        }}
        className="flex gap-2"
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask your data…"
          className="flex-1 rounded border px-3 py-2"
          disabled={busy}
        />
        <button
          type="submit"
          disabled={busy}
          className="rounded bg-text px-4 py-2 text-bg"
        >
          Send
        </button>
      </form>

      {error && <p className="mt-2 text-red-500">{String(error.message)}</p>}
    </main>
  );
}
