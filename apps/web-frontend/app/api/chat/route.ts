import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { model } from "../../../lib/model";

// The AI gateway: Next.js fronts the model provider, streams UI parts back to
// the client. Per AGENT.md §3.1 this is the Vercel AI SDK node between client
// and the (future) FastAPI NLQ tool. Generative-UI tools attach here later.
export async function POST(req: Request) {
  let messages: UIMessage[];
  try {
    ({ messages } = (await req.json()) as { messages: UIMessage[] });
  } catch {
    return new Response("Invalid JSON body", { status: 400 });
  }

  const result = streamText({
    model,
    system:
      "You are Komorebi, an analytics assistant. Answer concisely about the user's dashboard data.",
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
