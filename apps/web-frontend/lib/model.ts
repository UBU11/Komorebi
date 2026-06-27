export const modelConfig = {
  id: process.env.MODEL_ID ?? "",
  apiKey: process.env.MODEL_API_KEY ?? "",
  baseUrl: process.env.MODEL_BASE_URL ?? "",
} as const;

// ponytail: no provider bound yet (model undecided). When you pick one, install
// its @ai-sdk/* package and add a factory here that turns modelConfig into a
// LanguageModel — every call site then imports it from this single file.
