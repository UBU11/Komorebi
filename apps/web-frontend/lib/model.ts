import { createOpenAICompatible } from "@ai-sdk/openai-compatible";

// ponytail: one OpenAI-compatible provider covers Groq + any vendor speaking the
// OpenAI /v1/chat/completions shape. Switched entirely by env, no per-vendor dep.
// Swap for a native @ai-sdk/* provider only if you need vendor-specific features.
// Falls back to Groq so the existing GROQ_API key works with zero extra config.
// ponytail: `||` not `??` — .env ships MODEL_* as empty strings, and `??` would
// pass the empties straight through (empty model/URL/key = provider error).
const baseURL =
  process.env.MODEL_BASE_URL || "https://api.groq.com/openai/v1";
const apiKey =
  process.env.MODEL_API_KEY || process.env.GROQ_API || "";
const modelId = process.env.MODEL_ID || "llama-3.3-70b-versatile";

export const provider = createOpenAICompatible({
  name: "komorebi-gateway",
  baseURL,
  apiKey,
});

export const model = provider.chatModel(modelId);
