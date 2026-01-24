import { Document } from "@langchain/core/documents";
import { createOpenAI } from "@ai-sdk/openai";
import { embed, generateText } from "ai";


const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

if (!OPENROUTER_API_KEY) {
  console.warn("⚠️ OPENROUTER_API_KEY not set - AI features disabled");
}

export const openrouter = createOpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: OPENROUTER_API_KEY ?? "",
  headers: {
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
    "X-Title": "DevSage GitHub SaaS",
  },
});
``

const SUMMARIZATION_MODEL = "google/gemini-2.0-flash-exp:free";
const EMBEDDING_MODEL = "thenlper/gte-base";

/* ============================
   COMMIT DIFF SUMMARY
============================ */
export async function aiSummarizeCommit(diff: string) {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const { text } = await generateText({
    model: openrouter(SUMMARIZATION_MODEL),
    temperature: 0.2,
    prompt: `
You are an expert programmer summarizing a git diff.

Rules:
- Use bullet points
- Focus on behavior changes
- Do NOT repeat file names unless necessary

Git diff:
---
${diff}
---
`,
  });

  return text.trim();
}

/* ============================
   CODE FILE SUMMARY
============================ */
export async function summarizeCode(doc: Document) {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const code = doc.pageContent.slice(0, 10_000);

  const { text } = await generateText({
    model: openrouter(SUMMARIZATION_MODEL),
    temperature: 0.3,
    prompt: `
You are a senior engineer onboarding a junior dev.

File: ${doc.metadata.source}

Code:
---
${code}
---

Explain the purpose in under 100 words.
`,
  });

  return text.trim();
}

/* ============================
   EMBEDDINGS (768 DIM)
============================ */
export async function generateEmbedding(text: string): Promise<number[]> {
  if (!OPENROUTER_API_KEY) {
    throw new Error("OPENROUTER_API_KEY is not configured");
  }

  const { embedding } = await embed({
    model: EMBEDDING_MODEL, // ✅ FIXED
    value: text,
  });

  if (embedding.length !== 768) {
    console.warn(
      `⚠️ Embedding dimension mismatch: ${embedding.length} (expected 768)`
    );
  }

  return embedding;
}
